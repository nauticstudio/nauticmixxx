export const SITE_URL = 'https://nauticmixxx.nauticboy.top';
export const SOURCE_REPO = 'https://github.com/nauticsoftware/NauticMixxx';
export const RELEASE_VERSION = '1.5.0';
export const SOURCE_TAG = `${SOURCE_REPO}/tree/v${RELEASE_VERSION}`;
export const RELEASE_PAGE = `${SOURCE_REPO}/releases/tag/v${RELEASE_VERSION}`;
export const RELEASE_DOWNLOADS = `${SOURCE_REPO}/releases/download/v${RELEASE_VERSION}`;
export const MAC_DOWNLOAD = `${RELEASE_DOWNLOADS}/NauticMixxx-${RELEASE_VERSION}-macOS-arm64.dmg`;
export const WINDOWS_DOWNLOAD = `${RELEASE_DOWNLOADS}/NauticMixxx-${RELEASE_VERSION}-Windows-x64-Setup.exe`;
export const SOURCE_ARCHIVE = `${RELEASE_DOWNLOADS}/NauticMixxx-${RELEASE_VERSION}-source.tar.gz`;
export const CHECKSUMS = `${RELEASE_DOWNLOADS}/SHA256SUMS.txt`;
export const CONTROLLER_GUIDE = `${SOURCE_REPO}/blob/v${RELEASE_VERSION}/docs/CONTROLLERS-RX3-1.5-EN.md`;
export const TEST_REPORT = `${SOURCE_REPO}/blob/v${RELEASE_VERSION}/TEST_REPORT.md`;
export const INSTALLATION_GUIDE = `${SOURCE_REPO}/blob/v${RELEASE_VERSION}/docs/INSTALLATION-EN.md`;

export const PAGE_SEO = {
  es: {
    path: '/',
    locale: 'es_AR',
    title: 'NauticMixxx | Software DJ para USB Rekordbox',
    description: 'Descargá NauticMixxx, software DJ open source para USB Rekordbox basado en Mixxx. Vista previa para macOS Apple Silicon y Windows x64, con guías y fuentes.',
  },
  en: {
    path: '/en/',
    locale: 'en_US',
    title: 'NauticMixxx | DJ software for Rekordbox USB drives',
    description: 'Download NauticMixxx, open-source DJ software for Rekordbox USB drives. Explore the RX3-style interface, controller presets and macOS/Windows installers.',
  },
} as const;
