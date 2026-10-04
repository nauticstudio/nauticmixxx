import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  normalizeRelease, fetchLatestRelease, createReleaseClient, syncReleaseSchema,
  RELEASE_REPO, RELEASE_TTL, RELEASE_CACHE_KEY,
} from '../src/lib/release/release.mjs';

const snapshot = JSON.parse(await readFile(new URL('../src/lib/release/snapshot.json', import.meta.url), 'utf8'));
const futureRelease = () => {
  const next = structuredClone(snapshot);
  next.tag_name = 'v9.8.7';
  next.name = 'NauticMixxx 9.8.7';
  next.html_url = `${RELEASE_REPO}/releases/tag/v9.8.7`;
  next.published_at = '2030-01-01T00:00:00Z';
  const previousVersion = normalizeRelease(snapshot).version;
  next.assets = next.assets.map((asset) => {
    const name = asset.name.split(previousVersion).join('9.8.7');
    return { ...asset, name, browser_download_url: `${RELEASE_REPO}/releases/download/v9.8.7/${encodeURIComponent(name)}` };
  });
  // The next release changes its installer name as well as its version.
  const windows = next.assets.find((asset) => asset.name.endsWith('.exe'));
  windows.name = 'NauticMixxx-9.8.7-Windows-x64-Installer.exe';
  windows.browser_download_url = `${RELEASE_REPO}/releases/download/v9.8.7/${windows.name}`;
  return next;
};
const response = (payload, status = 200) => new Response(JSON.stringify(payload), { status });
const memoryStorage = () => {
  const values = new Map();
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
};

test('new releases update version, exact asset names, source and document links together', () => {
  const release = normalizeRelease(futureRelease());
  assert.equal(release.version, '9.8.7');
  assert.equal(release.windows.url, `${RELEASE_REPO}/releases/download/v9.8.7/NauticMixxx-9.8.7-Windows-x64-Installer.exe`);
  assert.match(release.mac.url, /9\.8\.7.*\.dmg$/);
  assert.match(release.source.url, /9\.8\.7-source\.tar\.gz$/);
  assert.match(release.checksums, /v9\.8\.7\/SHA256SUMS\.txt$/);
  assert.match(release.license, /blob\/v9\.8\.7\/LICENSE\.md$/);
});

test('missing installer or checksum uses release navigation without inventing file URLs', () => {
  const next = futureRelease();
  next.assets = next.assets.filter((asset) => !/windows|sha256/i.test(asset.name));
  const release = normalizeRelease(next);
  assert.equal(release.windows, null);
  assert.equal(release.checksums, null);
  assert.equal(release.windows?.url ?? release.page, next.html_url);
  next.assets = [];
  assert.equal(normalizeRelease(next).source.url, `${RELEASE_REPO}/archive/refs/tags/v9.8.7.tar.gz`);
});

test('ZIP/MSI formats reflect the actual published files when DMG/EXE are absent', () => {
  const next = futureRelease();
  next.assets = next.assets.filter((asset) => !asset.name.endsWith('.dmg') && !asset.name.endsWith('.exe'));
  next.assets.push({ name: 'NauticMixxx-9.8.7-win-amd64.msi', state: 'uploaded', browser_download_url: `${RELEASE_REPO}/releases/download/v9.8.7/NauticMixxx-9.8.7-win-amd64.msi` });
  assert.equal(normalizeRelease(next).mac.format, 'ZIP');
  assert.equal(normalizeRelease(next).windows.format, 'MSI');
});

test('drafts, prereleases, malformed responses and foreign URLs are not trusted', () => {
  for (const patch of [{ draft: true }, { prerelease: true }, { tag_name: '' }, { published_at: 'bad' }, { html_url: 'https://example.com/release' }]) {
    assert.throws(() => normalizeRelease({ ...snapshot, ...patch }));
  }
  const next = futureRelease();
  for (const asset of next.assets) asset.browser_download_url = 'javascript:alert(1)';
  assert.equal(normalizeRelease(next).mac, null);
  const incomplete = futureRelease();
  for (const asset of incomplete.assets) asset.state = 'new';
  assert.equal(normalizeRelease(incomplete).windows, null);
});

test('rate limiting and network failure preserve the last good release, even without storage', async () => {
  let calls = 0;
  const client = createReleaseClient(snapshot, { fetcher: async () => {
    calls++;
    return response({}, 403);
  }});
  assert.equal((await client.refresh()).version, normalizeRelease(snapshot).version);
  await client.refresh();
  assert.equal(calls, 1, 'back off rather than repeatedly hitting a limited API');
  await assert.rejects(fetchLatestRelease(async () => { throw new Error('offline'); }));
});

test('concurrent refreshes share one request; a cached release expires after five minutes', async () => {
  let calls = 0;
  let time = Date.now() + 10000;
  const storage = memoryStorage();
  const fetcher = async () => { calls++; return response(futureRelease()); };
  const client = createReleaseClient(snapshot, { fetcher, storage, now: () => time });
  const results = await Promise.all([client.refresh(), client.refresh()]);
  assert.equal(calls, 1);
  assert.ok(results.every((release) => release.version === '9.8.7'));
  const cached = createReleaseClient(snapshot, { fetcher, storage, now: () => time });
  assert.equal(cached.current().version, '9.8.7');
  await cached.refresh();
  assert.equal(calls, 1);
  time += RELEASE_TTL + 1;
  await cached.refresh();
  assert.equal(calls, 2);
});

test('a newly deployed snapshot supersedes an older cache; corrupt/private storage is safe', () => {
  const storage = memoryStorage();
  const time = Date.now();
  storage.setItem(RELEASE_CACHE_KEY, JSON.stringify({ checkedAt: time - 1000, payload: snapshot }));
  const newer = { ...futureRelease(), checked_at: new Date(time).toISOString() };
  assert.equal(createReleaseClient(newer, { storage }).current().version, '9.8.7');
  storage.setItem(RELEASE_CACHE_KEY, '{bad json');
  assert.equal(createReleaseClient(snapshot, { storage }).current().version, normalizeRelease(snapshot).version);
  const blocked = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
  assert.doesNotThrow(() => createReleaseClient(snapshot, { storage: blocked }));
});

test('structured data updates to the same release as the links', () => {
  const script = { textContent: JSON.stringify({ '@graph': [
    { '@type': 'WebSite', name: 'Nautic Boy' },
    { '@type': 'SoftwareApplication', name: 'NauticMixxx', softwareVersion: 'old' },
  ] }) };
  const release = normalizeRelease(futureRelease());
  syncReleaseSchema(release, { querySelectorAll: () => [script] });
  const nodes = JSON.parse(script.textContent)['@graph'];
  assert.equal(nodes[1].softwareVersion, '9.8.7');
  assert.equal(nodes[1].releaseNotes, release.page);
  assert.deepEqual(nodes[1].downloadUrl, [release.mac.url, release.windows.url]);
  assert.equal(nodes[0].name, 'Nautic Boy');
});
