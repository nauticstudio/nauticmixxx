export interface DownloadAsset { name: string; url: string; format: string }
export interface NauticRelease {
  tag: string; version: string; name: string; page: string; publishedAt: string; sourceTag: string;
  mac: DownloadAsset | null; windows: DownloadAsset | null; source: DownloadAsset;
  checksums: string | null; testReport: string; installationGuide: string; controllerGuide: string;
  license: string; trademarks: string;
}
export interface ReleaseSnapshot {
  tag_name: string; name: string; html_url: string; draft: false; prerelease: false;
  published_at: string; checked_at: string;
  assets: { name: string; state: string; browser_download_url: string }[];
}
export const RELEASE_REPO: string;
export const RELEASE_API: string;
export const RELEASE_CACHE_KEY: string;
export const RELEASE_TTL: number;
export function normalizeRelease(raw: unknown): NauticRelease;
export function releaseSnapshot(raw: unknown, checkedAt?: string): ReleaseSnapshot;
export function fetchLatestRelease(fetcher?: typeof fetch, headers?: Record<string, string>): Promise<ReleaseSnapshot>;
export function createReleaseClient(fallback: ReleaseSnapshot, options?: {
  fetcher?: typeof fetch; storage?: Pick<Storage, 'getItem' | 'setItem'>; now?: () => number;
}): { current(): NauticRelease; refresh(): Promise<NauticRelease> };
export function syncReleaseSchema(release: NauticRelease, document: Document): void;
