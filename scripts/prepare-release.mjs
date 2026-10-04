import { readFile, writeFile } from 'node:fs/promises';
import { fetchLatestRelease, normalizeRelease } from '../src/lib/release/release.mjs';

const snapshotFile = new URL('../src/lib/release/snapshot.json', import.meta.url);
let snapshot;
try {
  // This token, when supplied by Actions, is only used by Node during the build.
  const headers = process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {};
  snapshot = await fetchLatestRelease(globalThis.fetch, headers);
  await writeFile(snapshotFile, JSON.stringify(snapshot, null, 2) + '\n');
} catch (error) {
  // Never deploy an older fallback over a newer public site during a GitHub outage.
  if (process.env.CI) throw error;
  console.warn('GitHub unavailable; building from the last validated local release snapshot.');
  snapshot = JSON.parse(await readFile(snapshotFile, 'utf8'));
}
const release = normalizeRelease(snapshot);
await writeFile(new URL('../public/release-snapshot.json', import.meta.url), JSON.stringify(snapshot, null, 2) + '\n');
console.log(`NauticMixxx release: ${release.tag} (${release.name})`);
