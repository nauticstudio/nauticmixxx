export const SITE_URL = 'https://nauticmixxx.nauticboy.top';
import snapshot from './lib/release/snapshot.json';
import { normalizeRelease, RELEASE_REPO } from './lib/release/release.mjs';

export const CURRENT_RELEASE = normalizeRelease(snapshot);
export const SOURCE_REPO = RELEASE_REPO;
export const RELEASE_VERSION = CURRENT_RELEASE.version;
export const SOURCE_TAG = CURRENT_RELEASE.sourceTag;
export const RELEASE_PAGE = CURRENT_RELEASE.page;
export const MAC_DOWNLOAD = CURRENT_RELEASE.mac?.url;
export const WINDOWS_DOWNLOAD = CURRENT_RELEASE.windows?.url;
export const INSTALLATION_GUIDE = CURRENT_RELEASE.installationGuide;

export const PAGE_SEO = {
  es: {
    path: '/',
    locale: 'es_AR',
    title: 'NauticMixxx | Software DJ para USB Rekordbox',
    description: 'Descargá NauticMixxx, software DJ open source para USB Rekordbox basado en Mixxx. Descargas para macOS Apple Silicon y Windows x64, con guías y fuentes.',
  },
  en: {
    path: '/en/',
    locale: 'en_US',
    title: 'NauticMixxx | DJ software for Rekordbox USB drives',
    description: 'Download NauticMixxx, open-source DJ software for Rekordbox USB drives. Explore the RX3-style interface, controller presets and macOS/Windows installers.',
  },
} as const;
