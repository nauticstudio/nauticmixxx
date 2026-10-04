import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { normalizeRelease } from '../src/lib/release/release.mjs';
const snapshot = JSON.parse(await readFile(new URL('../src/lib/release/snapshot.json', import.meta.url), 'utf8'));
const release = normalizeRelease(snapshot);
for (const path of ["dist/index.html", "dist/en/index.html"]) {
  const html = await readFile(new URL('../' + path, import.meta.url), 'utf8');
  const nodes = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap((match) => { const data = JSON.parse(match[1]); return data['@graph'] ?? [data]; });
  const software = nodes.find((node) => node['@type'] === 'SoftwareApplication' && node.name === 'NauticMixxx');
  assert.ok(software, path + ': SoftwareApplication is present before JavaScript');
  assert.equal(software.softwareVersion, release.version);
  assert.equal(software.releaseNotes, release.page);
  assert.deepEqual(software.downloadUrl, [release.mac?.url, release.windows?.url].filter(Boolean));
  assert.ok(html.includes('href="' + release.page + '"'), path + ': current release link is rendered');
  console.log(path + ': release version, links and structured data verified');
}
