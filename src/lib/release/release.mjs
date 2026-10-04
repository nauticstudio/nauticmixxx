// Kept identical in the two independent website repositories.
export const RELEASE_REPO = 'https://github.com/nauticsoftware/NauticMixxx';
export const RELEASE_API = 'https://api.github.com/repos/nauticsoftware/NauticMixxx/releases/latest';
export const RELEASE_CACHE_KEY = 'nauticmixxx-release-v1';
export const RELEASE_TTL = 5 * 60 * 1000;

/** Validate a published, non-prerelease GitHub release and its actual uploaded assets. */
export function normalizeRelease(raw) {
  if (!raw || raw.draft !== false || raw.prerelease !== false ||
      typeof raw.tag_name !== 'string' || !raw.tag_name.trim() ||
      !Number.isFinite(Date.parse(raw.published_at)) || !Array.isArray(raw.assets)) {
    throw new Error('Invalid published NauticMixxx release');
  }
  const tag = raw.tag_name;
  const ref = encodeURIComponent(tag);
  const page = `${RELEASE_REPO}/releases/tag/${ref}`;
  if (raw.html_url !== page) throw new Error('Unexpected release repository');
  const assets = raw.assets.filter((asset) =>
    asset && asset.state === 'uploaded' && typeof asset.name === 'string' &&
    asset.browser_download_url === `${RELEASE_REPO}/releases/download/${ref}/${encodeURIComponent(asset.name)}`
  );
  const find = (pattern) => assets.find((asset) => pattern.test(asset.name));
  const download = (asset) => asset ? {
    name: asset.name, url: asset.browser_download_url,
    format: asset.name.endsWith('.tar.gz') ? 'TAR.GZ' : asset.name.split('.').at(-1).toUpperCase(),
  } : null;
  const mac = download(find(/NauticMixxx.*(?:macos|darwin).*(?:arm64|aarch64|apple.silicon).*\.dmg$/i)
    ?? find(/NauticMixxx.*(?:macos|darwin).*(?:arm64|aarch64|apple.silicon).*\.zip$/i));
  const windows = download(find(/NauticMixxx.*(?:windows|win).*(?:x64|x86_64|amd64).*\.exe$/i)
    ?? find(/NauticMixxx.*(?:windows|win).*(?:x64|x86_64|amd64).*\.(?:msi|zip)$/i));
  const source = download(find(/NauticMixxx.*source\.tar\.gz$/i)
    ?? find(/NauticMixxx.*source\.zip$/i)) ?? {
      name: `${tag}.tar.gz`, url: `${RELEASE_REPO}/archive/refs/tags/${ref}.tar.gz`, format: 'TAR.GZ',
    };
  return {
    tag, version: tag.replace(/^v(?=\d)/, ''), name: typeof raw.name === 'string' ? raw.name : tag,
    page, publishedAt: raw.published_at, sourceTag: `${RELEASE_REPO}/tree/${ref}`,
    mac, windows, source,
    checksums: download(find(/^SHA256SUMS(?:\.txt)?$/i))?.url ?? null,
    testReport: download(find(/^TEST_REPORT\.md$/i))?.url ?? `${RELEASE_REPO}/blob/${ref}/TEST_REPORT.md`,
    installationGuide: `${RELEASE_REPO}/blob/${ref}/docs/INSTALLATION-EN.md`,
    controllerGuide: `${RELEASE_REPO}/blob/${ref}/docs/CONTROLLERS-RX3-1.5-EN.md`,
    license: `${RELEASE_REPO}/blob/${ref}/LICENSE.md`,
    trademarks: `${RELEASE_REPO}/blob/${ref}/TRADEMARKS.md`,
  };
}

/** Small, public payload used for builds and the browser's last successful response. */
export function releaseSnapshot(raw, checkedAt = new Date().toISOString()) {
  normalizeRelease(raw);
  return {
    tag_name: raw.tag_name, name: raw.name, html_url: raw.html_url,
    draft: false, prerelease: false, published_at: raw.published_at, checked_at: checkedAt,
    assets: raw.assets.filter((a) => a.state === 'uploaded').map((a) => ({
      name: a.name, state: a.state, browser_download_url: a.browser_download_url,
    })),
  };
}

export async function fetchLatestRelease(fetcher = globalThis.fetch, headers = {}) {
  const response = await fetcher(RELEASE_API, {
    headers: { Accept: 'application/vnd.github+json', ...headers },
    cache: 'no-store', signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`GitHub release request failed (${response.status})`);
  return releaseSnapshot(await response.json());
}

/** No secrets in the browser. Coalesce requests and keep working through API/cache failures. */
export function createReleaseClient(fallback, { fetcher = globalThis.fetch, storage, now = Date.now } = {}) {
  let last = normalizeRelease(fallback);
  let checkedAt = 0;
  let pending;
  try {
    const cached = JSON.parse(storage?.getItem(RELEASE_CACHE_KEY) ?? 'null');
    // A newly deployed snapshot supersedes a cache saved before that build.
    if (cached && cached.checkedAt > Date.parse(fallback.checked_at) && cached.checkedAt <= now()) {
      last = normalizeRelease(cached.payload);
      checkedAt = cached.checkedAt;
    }
  } catch { /* Storage may be unavailable or contain an invalid old response. */ }
  return {
    current: () => last,
    refresh: () => {
      if (pending) return pending;
      if (checkedAt && now() - checkedAt < RELEASE_TTL) return Promise.resolve(last);
      pending = fetchLatestRelease(fetcher).then((payload) => {
        last = normalizeRelease(payload);
        checkedAt = now();
        try { storage?.setItem(RELEASE_CACHE_KEY, JSON.stringify({ checkedAt, payload })); } catch { /* Private browsing/quota. */ }
        return last;
      }).catch(() => {
        // Back off for five minutes on errors, preserving the most recent validated release.
        checkedAt = now();
        return last;
      }).finally(() => { pending = undefined; });
      return pending;
    },
  };
}

/** Also update the already rendered SoftwareApplication graph when a newer release arrives. */
export function syncReleaseSchema(release, document) {
  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const data = JSON.parse(script.textContent);
      const nodes = Array.isArray(data['@graph']) ? data['@graph'] : [data];
      let changed = false;
      for (const node of nodes) {
        if (node['@type'] !== 'SoftwareApplication' || node.name !== 'NauticMixxx') continue;
        Object.assign(node, {
          softwareVersion: release.version, releaseNotes: release.page, license: release.license,
          softwareHelp: release.installationGuide,
          downloadUrl: [release.mac?.url, release.windows?.url].filter(Boolean),
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: release.page },
        });
        changed = true;
      }
      if (changed) script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
    } catch { /* Other schemas should not affect release links. */ }
  }
}
