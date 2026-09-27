import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  AppWindow,
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  Code2,
  Database,
  Download,
  ExternalLink,
  FolderLock,
  Gauge,
  Github,
  Laptop,
  Maximize2,
  Monitor,
  MousePointer2,
  Play,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  Terminal,
  Usb,
  Waves,
  X,
} from 'lucide-react';

type Language = 'es' | 'en';
type ScreenshotTab = 'waveforms' | 'browser' | 'standby';

interface ScreenshotItem {
  id: ScreenshotTab;
  tabLabel: string;
  badge: string;
  title: string;
  description: string;
  src: string;
  alt: string;
}

const SOURCE_REPO = 'https://github.com/nauticsoftware/NauticMixxx';
const SOURCE_TAG = `${SOURCE_REPO}/tree/v1.0.0`;
const RELEASE_DOWNLOADS = `${SOURCE_REPO}/releases/download/v1.0.0`;
const MAC_DOWNLOAD = `${RELEASE_DOWNLOADS}/NauticMixxx-1.0.0-macOS-arm64.dmg`;
const WINDOWS_DOWNLOAD = `${RELEASE_DOWNLOADS}/NauticMixxx-1.0.0-Windows-x64.zip`;
const SOURCE_ARCHIVE = `${RELEASE_DOWNLOADS}/NauticMixxx-1.0.0-source.tar.gz`;

const copy = {
  es: {
    navAbout: 'Qué es', navFeatures: 'Funciones', navScreens: 'Capturas', navDownload: 'Descargas', navFaq: 'FAQ', navCta: 'Descargar v1.0.0',
    eyebrow: 'v1.0.0 · Fork open source de Mixxx 2.5.6',
    titleA: 'Tu USB de Rekordbox.', titleB: 'Directo a la pista.',
    hero: 'NauticMixxx es una aplicación de escritorio para macOS, Windows y Linux —no es firmware ni una simple skin— que lleva el flujo standalone inspirado en la XDJ-RX3 a tu laptop y controladora.',
    heroDetail: 'Conectá tu pendrive exportado, navegá playlists y cargá pistas sin importar tu biblioteca ni tocar el mouse.',
    primaryCta: 'Descargar v1.0.0', secondaryCta: 'Ver código en GitHub',
    readOnly: 'USB 100% Read-Only', noFiles: 'No modifica tus archivos', noAccount: 'Sin registro obligatorio', free: 'Libre · GPL',
    previewLabel: 'Capturas reales · NauticMixxx 1.0.0', previewHint: 'Clic para cambiar o ampliar',
    zoomLabel: 'Ampliar captura', closeZoom: 'Cerrar vista previa', releaseStatus: 'Release estable disponible',
    galleryEyebrow: 'Capturas de pantalla', galleryTitle: 'La interfaz en acción.',
    galleryText: 'Tres pantallas reales capturadas directamente de NauticMixxx en funcionamiento, mostrando el flujo standalone de decks, playlists y waveforms.',
    screenshots: [
      {
        id: 'waveforms' as const,
        tabLabel: 'Waveforms & FX',
        badge: 'DECK 1 & 2 EN VIVO',
        title: 'Waveforms tri-banda ANLZ y sincronización',
        description: 'Visualización dual con formas de onda coloreadas por frecuencia Rekordbox, beatgrids PQTZ sincronizados a 138.0 BPM y panel Beat FX con Echo en Master.',
        src: '/media/nauticmixxx-waveforms.png',
        alt: 'NauticMixxx reproduciendo dos decks con waveforms tri-banda y sección de efectos',
      },
      {
        id: 'browser' as const,
        tabLabel: 'Navegador Rekordbox',
        badge: 'LECTURA DIRECTA USB',
        title: 'Navegación nativa de playlists y preview de pistas',
        description: 'Exploración directa de export.pdb sin importar a tu laptop: previsualización de ondas, tono musical y artistas de tu pendrive.',
        src: '/media/nauticmixxx-browser.png',
        alt: 'Navegador de playlists y tracks de Rekordbox en NauticMixxx',
      },
      {
        id: 'standby' as const,
        tabLabel: 'Inicio / Standby',
        badge: 'STANDALONE WORKFLOW',
        title: 'Pantalla de inicio y detección USB',
        description: 'Interfaz limpia inspirada en la XDJ-RX3: conectás tu pendrive y los decks quedan listos para cargar sin tocar la biblioteca local.',
        src: '/media/nauticmixxx-standby.png',
        alt: 'Pantalla de espera y standby de NauticMixxx con decks listos',
      },
    ],
    aboutEyebrow: 'Antes que nada', aboutTitle: 'Es una app. No toca tu XDJ.',
    aboutText: 'NauticMixxx corre en tu computadora y se controla con hardware DJ convencional. No reemplaza el sistema de una Pioneer real y su experiencia completa va mucho más allá de un cambio visual.',
    clarifyAppTitle: 'Aplicación de escritorio', clarifyAppText: 'Se instala en macOS, Windows o Linux y funciona con controladoras compatibles con Mixxx.',
    clarifyForkTitle: 'Fork funcional, no una skin', clarifyForkText: 'Incluye cambios en el motor, navegador USB, mapping, efectos, interfaz y políticas de seguridad.',
    clarifyUsbTitle: 'Tu USB permanece intacto', clarifyUsbText: 'Las pistas se abren en modo lectura: no reescribe audio, metadatos, playlists ni análisis.',
    whyEyebrow: 'Por qué NauticMixxx', whyTitle: 'Preparaste el set una vez. Usalo en todas partes.',
    whyText: 'Para DJs que preparan en Rekordbox y quieren practicar o tocar con una laptop y controladoras accesibles, sin repetir horas de organización.',
    featureOneTitle: 'Cero importaciones. Cero escrituras.', featureOneText: 'Lee export.pdb directamente en una sesión transitoria. El USB no se incorpora a la biblioteca local ni se envía a trabajos de análisis.',
    featureTwoTitle: 'Tu preparación, preservada.', featureTwoText: 'Interpreta waveforms ANLZ de tres bandas, beatgrids PQTZ y hasta ocho Hot Cues por deck con colores coordinados.',
    featureThreeTitle: 'Hecho para hardware.', featureThreeText: 'Navegá SOURCE, playlists, carpetas y pistas con el encoder y los botones de tu controladora, sin depender del ratón.',
    featureFourTitle: 'Motor probado en directo.', featureFourText: 'Basado en Mixxx 2.5.6, con pitch, Keylock, baja latencia y diez parches reproducibles para la experiencia NauticMixxx.',
    contractEyebrow: 'Contrato USB-only', contractTitle: 'Lectura estricta. Sin sorpresas antes del bolo.',
    contractText: 'La colección local queda fuera del navegador. NauticMixxx mantiene únicamente el estado interno necesario para operar e historial, pero nunca persiste tus pistas USB como colección ni escribe sobre el dispositivo.',
    contractOne: 'Catálogo transitorio en memoria', contractTwo: 'Sin escaneo de carpetas locales', contractThree: 'Sin reescritura de USB', contractFour: 'Rutas protegidas incluso tras desconectar',
    downloadEyebrow: 'Release 1.0.0', downloadTitle: 'Descargá el primer release.',
    downloadText: 'La versión estable v1.0.0 ya está disponible para macOS Apple Silicon y Windows x64, con fuentes correspondientes y checksums públicos.',
    macTitle: 'macOS', macMeta: 'Apple Silicon · macOS 11+', macFormat: 'DMG / ZIP',
    winTitle: 'Windows', winMeta: 'Windows 10 / 11 · x64', winFormat: 'ZIP / instalador',
    sourceTitle: 'Código fuente', sourceMeta: 'Linux · compilación reproducible', sourceFormat: 'TAR.GZ · tag v1.0.0',
    macDownload: 'Descargar DMG', winDownload: 'Descargar ZIP', sourceDownload: 'Descargar fuentes', browseCode: 'Explorar repositorio',
    macNote: 'Build comunitaria firmada ad hoc y sin notarizar. Si macOS la bloquea, intentá abrirla y luego usá Ajustes del Sistema → Privacidad y seguridad → Abrir igualmente.',
    winNote: 'Build nativa validada en Windows x64. Extraé todo el ZIP y ejecutá INSTALL-WINDOWS.cmd.',
    sourceNote: 'Incluye los diez parches, skin, mappings, efectos, scripts y documentación de compilación.',
    releaseNote: 'Release estable público. Verificá siempre la descarga con SHA256SUMS.txt disponible en GitHub Releases.',
    faqEyebrow: 'Preguntas frecuentes', faqTitle: 'Lo importante, sin letra chica.',
    faqs: [
      { q: '¿NauticMixxx reemplaza el sistema de una Pioneer XDJ-RX3 real?', a: 'No. Es una aplicación para computadoras que recrea un flujo de trabajo inspirado en la XDJ-RX3 para usarlo con una laptop y controladoras convencionales. No se instala en equipos Pioneer ni modifica su firmware.' },
      { q: '¿Es solamente una skin para Mixxx?', a: 'No. La interfaz es una parte del proyecto, pero NauticMixxx también modifica el navegador, la lectura de USB Rekordbox, estados de decks, políticas de pistas, mappings, efectos y distribución nativa.' },
      { q: '¿Puede dañar o desconfigurar la música de mi pendrive?', a: 'El flujo USB está diseñado como Read-Only. No persiste las pistas en la colección local, no las exporta, no las reescribe y no las entrega a trabajos locales de análisis. Aun así, conservá siempre una copia de seguridad de cualquier USB de trabajo.' },
      { q: '¿Qué pasa si desconecto el pendrive?', a: 'La sesión USB se invalida, el dispositivo desaparece del navegador y las rutas permanecen protegidas contra escritura. Para una actuación segura, detené la reproducción y expulsá el dispositivo desde el sistema antes de retirarlo.' },
      { q: '¿Qué controladoras son compatibles?', a: 'El flujo sin mouse está optimizado para Hercules DJControl Inpulse 500. Otras controladoras compatibles con Mixxx pueden mapearse; la cobertura exacta depende de cada mapping.' },
      { q: '¿Dónde están los binarios v1.0.0?', a: 'Los binarios estables para macOS Apple Silicon y Windows x64 están disponibles en esta página y en GitHub Releases, junto con las fuentes y sus checksums SHA-256.' },
    ],
    footerLine: 'Software DJ libre, hecho para tocar.', creditsTitle: 'Créditos open source',
    credits: 'Adaptación GNU GPL v3.0. Motor Mixxx 2.5.6 bajo GNU GPL v2.0 o posterior. Código, parches y atribuciones disponibles públicamente.',
    disclaimerTitle: 'Marcas y relación con otros proyectos',
    disclaimer: 'NauticMixxx es un proyecto comunitario independiente. No está afiliado, patrocinado, certificado ni respaldado por AlphaTheta Corporation, Pioneer DJ, Hercules, rekordbox ni el proyecto Mixxx. Sus nombres y marcas se mencionan únicamente para describir compatibilidad, procedencia técnica o flujo de trabajo.',
    backTop: 'Volver arriba',
  },
  en: {
    navAbout: 'What it is', navFeatures: 'Features', navScreens: 'Screenshots', navDownload: 'Downloads', navFaq: 'FAQ', navCta: 'Download v1.0.0',
    eyebrow: 'v1.0.0 · Open-source Mixxx 2.5.6 fork',
    titleA: 'Your Rekordbox USB.', titleB: 'Straight to the decks.',
    hero: 'NauticMixxx is a desktop application for macOS, Windows and Linux —not firmware or a simple skin— that brings an XDJ-RX3-inspired standalone flow to your laptop and controller.',
    heroDetail: 'Connect your exported drive, browse playlists and load tracks without importing your library or touching the mouse.',
    primaryCta: 'Download v1.0.0', secondaryCta: 'View code on GitHub',
    readOnly: '100% Read-Only USB', noFiles: 'Does not modify files', noAccount: 'No account required', free: 'Free · GPL',
    previewLabel: 'Real captures · NauticMixxx 1.0.0', previewHint: 'Click to switch view or expand',
    zoomLabel: 'Expand capture', closeZoom: 'Close preview', releaseStatus: 'Stable release available',
    galleryEyebrow: 'Interface screenshots', galleryTitle: 'The interface in action.',
    galleryText: 'Three real screens captured straight from running NauticMixxx, showing the standalone workflow across decks, playlists, and waveforms.',
    screenshots: [
      {
        id: 'waveforms' as const,
        tabLabel: 'Waveforms & FX',
        badge: 'LIVE DECKS 1 & 2',
        title: '3-Band ANLZ Waveforms & Sync',
        description: 'Dual-deck display with Rekordbox frequency-colored waveforms, PQTZ beatgrids locked at 138.0 BPM and Beat FX unit with Master Echo.',
        src: '/media/nauticmixxx-waveforms.png',
        alt: 'NauticMixxx running dual decks with 3-band waveforms and Beat FX section',
      },
      {
        id: 'browser' as const,
        tabLabel: 'Rekordbox Browser',
        badge: 'DIRECT USB READ',
        title: 'Native Playlist Navigation & Track Previews',
        description: 'Browse export.pdb directly without local library imports: track waveforms, musical keys and artists straight from your USB.',
        src: '/media/nauticmixxx-browser.png',
        alt: 'Rekordbox playlist and track browser in NauticMixxx',
      },
      {
        id: 'standby' as const,
        tabLabel: 'Startup / Standby',
        badge: 'STANDALONE WORKFLOW',
        title: 'Startup Screen & USB Detection',
        description: 'Clean XDJ-RX3-inspired interface: plug in your drive and decks are immediately ready without touching your local library.',
        src: '/media/nauticmixxx-standby.png',
        alt: 'NauticMixxx standby screen with ready decks',
      },
    ],
    aboutEyebrow: 'First things first', aboutTitle: 'It’s an app. It never touches your XDJ.',
    aboutText: 'NauticMixxx runs on your computer and is controlled with everyday DJ hardware. It does not replace a real Pioneer system, and the complete experience goes far beyond a visual reskin.',
    clarifyAppTitle: 'Desktop application', clarifyAppText: 'Installs on macOS, Windows or Linux and works with Mixxx-compatible controllers.',
    clarifyForkTitle: 'Functional fork, not a skin', clarifyForkText: 'Includes engine, USB browser, mapping, effects, interface and security-policy changes.',
    clarifyUsbTitle: 'Your USB stays intact', clarifyUsbText: 'Tracks open read-only: audio, metadata, playlists and analyses are never rewritten.',
    whyEyebrow: 'Why NauticMixxx', whyTitle: 'Prepare once. Play everywhere.',
    whyText: 'For DJs who prepare in Rekordbox and want to practice or perform with a laptop and accessible controllers, without repeating hours of organization.',
    featureOneTitle: 'Zero imports. Zero writes.', featureOneText: 'Reads export.pdb directly into a transient session. USB tracks never become part of the local collection or local analysis jobs.',
    featureTwoTitle: 'Your preparation, preserved.', featureTwoText: 'Reads three-band ANLZ waveforms, PQTZ beatgrids and up to eight Hot Cues per deck with coordinated colors.',
    featureThreeTitle: 'Made for hardware.', featureThreeText: 'Navigate SOURCE, playlists, folders and tracks from your controller encoder and buttons without relying on the mouse.',
    featureFourTitle: 'A proven live engine.', featureFourText: 'Built on Mixxx 2.5.6 with pitch, Keylock, low latency and ten reproducible patches powering the NauticMixxx experience.',
    contractEyebrow: 'USB-only contract', contractTitle: 'Strictly read-only. No pre-gig surprises.',
    contractText: 'The local collection stays outside the browser. NauticMixxx keeps only the internal state and history required to operate, but never persists USB tracks as a collection or writes to the device.',
    contractOne: 'Transient in-memory catalog', contractTwo: 'No local-folder scanning', contractThree: 'No USB rewriting', contractFour: 'Paths remain protected after unplug',
    downloadEyebrow: 'Release 1.0.0', downloadTitle: 'Get the first release.',
    downloadText: 'Stable version v1.0.0 is now available for Apple Silicon macOS and Windows x64, with corresponding source and public checksums.',
    macTitle: 'macOS', macMeta: 'Apple Silicon · macOS 11+', macFormat: 'DMG / ZIP',
    winTitle: 'Windows', winMeta: 'Windows 10 / 11 · x64', winFormat: 'ZIP / installer',
    sourceTitle: 'Source code', sourceMeta: 'Linux · reproducible build', sourceFormat: 'TAR.GZ · v1.0.0 tag',
    macDownload: 'Download DMG', winDownload: 'Download ZIP', sourceDownload: 'Download source', browseCode: 'Browse repository',
    macNote: 'Community build, ad-hoc signed and not notarized. If macOS blocks it, try opening it once, then use System Settings → Privacy & Security → Open Anyway.',
    winNote: 'Native Windows x64 build validated. Extract the entire ZIP and run INSTALL-WINDOWS.cmd.',
    sourceNote: 'Includes all ten patches, the skin, mappings, effects, scripts and build documentation.',
    releaseNote: 'Public stable release. Always verify your download with SHA256SUMS.txt from GitHub Releases.',
    faqEyebrow: 'Frequently asked questions', faqTitle: 'The important details, upfront.',
    faqs: [
      { q: 'Does NauticMixxx replace the system on a real Pioneer XDJ-RX3?', a: 'No. It is a computer application recreating an XDJ-RX3-inspired workflow for laptops and conventional controllers. It is never installed on Pioneer hardware and does not modify its firmware.' },
      { q: 'Is it only a skin for Mixxx?', a: 'No. The interface is one part of the project, but NauticMixxx also changes the browser, Rekordbox USB reading, deck states, track policies, mappings, effects and native distribution.' },
      { q: 'Can it damage or reconfigure the music on my drive?', a: 'The USB workflow is designed as read-only. It does not persist tracks in the local collection, export them, rewrite them or submit them to local analysis jobs. Still, always keep a backup of any performance drive.' },
      { q: 'What happens if I unplug the drive?', a: 'The USB session is invalidated, the device is removed from the browser and its paths remain write-protected. For safe performance practice, stop playback and eject the device from the operating system first.' },
      { q: 'Which controllers are compatible?', a: 'The mouse-free flow is optimized for the Hercules DJControl Inpulse 500. Other Mixxx-compatible controllers can be mapped; exact coverage depends on each mapping.' },
      { q: 'Where are the v1.0.0 binaries?', a: 'Stable Apple Silicon macOS and Windows x64 binaries are available on this page and on GitHub Releases, together with corresponding source and SHA-256 checksums.' },
    ],
    footerLine: 'Free DJ software, made to perform.', creditsTitle: 'Open-source credits',
    credits: 'Adaptation under GNU GPL v3.0. Mixxx 2.5.6 engine under GNU GPL v2.0 or later. Code, patches and attributions are publicly available.',
    disclaimerTitle: 'Trademarks and project relationships',
    disclaimer: 'NauticMixxx is an independent community project. It is not affiliated with, sponsored, certified or endorsed by AlphaTheta Corporation, Pioneer DJ, Hercules, rekordbox or the Mixxx project. Names and marks are mentioned solely to describe compatibility, technical origin or workflow.',
    backTop: 'Back to top',
  },
} as const;

function ScreenshotViewer({
  items,
  activeId,
  onChangeTab,
  onOpenZoom,
  zoomLabel,
}: {
  items: readonly ScreenshotItem[];
  activeId: ScreenshotTab;
  onChangeTab: (id: ScreenshotTab) => void;
  onOpenZoom: () => void;
  zoomLabel: string;
}) {
  const current = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <div className="screenshot-shell">
      <div className="window-bar">
        <div className="traffic-lights" aria-hidden="true"><i /><i /><i /></div>
        <span className="window-project">NAUTICMIXXX 1.0.0 — REKORDBOX USB MODE</span>
        <span className="window-state"><i /> 100% READ ONLY</span>
      </div>

      <div className="screenshot-tab-bar" role="tablist" aria-label="Pantallas de NauticMixxx">
        <div className="screenshot-tabs">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`screenshot-tab ${isActive ? 'screenshot-tab--active' : ''}`}
                onClick={() => onChangeTab(item.id)}
              >
                {item.id === 'waveforms' && <Waves size={13} />}
                {item.id === 'browser' && <Database size={13} />}
                {item.id === 'standby' && <Monitor size={13} />}
                <span>{item.tabLabel}</span>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className="screenshot-action-btn"
          onClick={onOpenZoom}
          aria-label={zoomLabel}
          title={zoomLabel}
        >
          <Maximize2 size={13} />
        </button>
      </div>

      <div
        className="screenshot-viewport"
        onClick={onOpenZoom}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenZoom();
          }
        }}
        aria-label={`${current.title} — ${zoomLabel}`}
      >
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          className="screenshot-image"
          width="1024"
          height="640"
          loading="eager"
        />
        <div className="screenshot-hover-hint">
          <span><Maximize2 size={14} />{zoomLabel}</span>
        </div>
      </div>

      <div className="screenshot-footer">
        <div className="screenshot-info">
          <div className="screenshot-badge-line">
            <span className="screenshot-badge">{current.badge}</span>
            <strong>{current.title}</strong>
          </div>
          <p>{current.description}</p>
        </div>
        <div className="screenshot-thumbs" aria-hidden="true">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`screenshot-thumb ${item.id === activeId ? 'screenshot-thumb--active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onChangeTab(item.id);
              }}
              title={item.tabLabel}
            >
              <img src={item.src} alt="" width="72" height="45" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState<Language>('es');
  const [activeTab, setActiveTab] = useState<ScreenshotTab>('waveforms');
  const [zoomOpen, setZoomOpen] = useState(false);
  const t = copy[language];
  const currentScreenshot = t.screenshots.find((item) => item.id === activeTab) ?? t.screenshots[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomOpen(false);
    };
    if (zoomOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [zoomOpen]);

  const switchLanguage = () => { const next = language === 'es' ? 'en' : 'es'; setLanguage(next); document.documentElement.lang = next; };
  const clarityCards = [
    { icon: AppWindow, title: t.clarifyAppTitle, text: t.clarifyAppText },
    { icon: Code2, title: t.clarifyForkTitle, text: t.clarifyForkText },
    { icon: FolderLock, title: t.clarifyUsbTitle, text: t.clarifyUsbText },
  ];
  const features = [
    { icon: Database, title: t.featureOneTitle, text: t.featureOneText, code: 'export.pdb' },
    { icon: Waves, title: t.featureTwoTitle, text: t.featureTwoText, code: 'ANLZ · PQTZ' },
    { icon: SlidersHorizontal, title: t.featureThreeTitle, text: t.featureThreeText, code: 'MIDI · SOURCE' },
    { icon: Gauge, title: t.featureFourTitle, text: t.featureFourText, code: 'Mixxx 2.5.6' },
  ];
  const contractPoints = [t.contractOne, t.contractTwo, t.contractThree, t.contractFour];

  return <div className="site-shell" id="top">
    <div className="grain" aria-hidden="true" />
    <header className="site-header">
      <a className="brand" href="#top" aria-label="NauticMixxx — home"><img src="/app-icon.svg" width="38" height="38" alt="" /><span>NauticMixxx</span></a>
      <nav aria-label="Main navigation"><a href="#about">{t.navAbout}</a><a href="#features">{t.navFeatures}</a><a href="#screens">{t.navScreens}</a><a href="#download">{t.navDownload}</a><a href="#faq">{t.navFaq}</a></nav>
      <div className="header-actions"><button className="language-button" onClick={switchLanguage} type="button" aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a español'}>{language === 'es' ? 'EN' : 'ES'}</button><a className="header-cta" href="#download">{t.navCta}<ArrowDown size={14} /></a></div>
    </header>
    <main>
      <section className="hero hero--release">
        <div className="hero-glow" aria-hidden="true" />
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
          <div className="eyebrow"><BadgeCheck size={13} />{t.eyebrow}</div><h1>{t.titleA}<br /><em>{t.titleB}</em></h1>
          <p className="hero-lead">{t.hero}</p><p className="hero-detail">{t.heroDetail}</p>
          <div className="hero-actions"><a className="button button--primary" href="#download"><Download size={17} />{t.primaryCta}</a><a className="button button--quiet" href={SOURCE_REPO} target="_blank" rel="noreferrer"><Github size={16} />{t.secondaryCta}</a></div>
          <div className="hero-meta"><span><i />{t.releaseStatus}</span><small>macOS · Windows · Linux</small></div>
        </motion.div>
        <motion.div className="hero-product" initial={{ opacity: 0, y: 32, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
          <div className="preview-caption"><span>{t.previewLabel}</span><span><MousePointer2 size={12} />{t.previewHint}</span></div>
          <ScreenshotViewer
            items={t.screenshots}
            activeId={activeTab}
            onChangeTab={setActiveTab}
            onOpenZoom={() => setZoomOpen(true)}
            zoomLabel={t.zoomLabel}
          />
        </motion.div>
        <div className="trust-row trust-row--release" aria-label="Release principles"><span><ShieldCheck size={16} />{t.readOnly}</span><span><Check size={16} />{t.noFiles}</span><span><Code2 size={16} />{t.noAccount}</span><span><Code2 size={16} />{t.free}</span></div>
      </section>

      <section className="clarity section" id="about">
        <div className="clarity-heading"><p className="section-eyebrow">{t.aboutEyebrow}</p><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p></div>
        <div className="clarity-grid">{clarityCards.map(({ icon: Icon, title, text }, index) => <motion.article key={title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.55, delay: index * 0.08 }} className="clarity-card"><span><Icon size={20} /></span><h3>{title}</h3><p>{text}</p></motion.article>)}</div>
      </section>

      <section className="features section" id="features">
        <div className="section-intro"><span className="section-number">01</span><div><p className="section-eyebrow">{t.whyEyebrow}</p><h2>{t.whyTitle}</h2><p>{t.whyText}</p></div></div>
        <div className="feature-grid">{features.map(({ icon: Icon, title, text, code }, index) => <article className={`feature-card ${index === 0 ? 'feature-card--accent' : ''}`} key={title}><div className="feature-card-top"><span>0{index + 1}</span><code>{code}</code></div><Icon size={27} /><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="gallery section" id="screens">
        <div className="section-intro">
          <span className="section-number">02</span>
          <div>
            <p className="section-eyebrow">{t.galleryEyebrow}</p>
            <h2>{t.galleryTitle}</h2>
            <p>{t.galleryText}</p>
          </div>
        </div>
        <div className="gallery-grid">
          {t.screenshots.map((s, index) => (
            <article
              key={s.id}
              className={`gallery-card ${activeTab === s.id ? 'gallery-card--active' : ''}`}
              onClick={() => {
                setActiveTab(s.id);
                setZoomOpen(true);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveTab(s.id);
                  setZoomOpen(true);
                }
              }}
            >
              <div className="gallery-card-media">
                <img src={s.src} alt={s.alt} width="1024" height="640" loading="lazy" />
                <span className="gallery-card-zoom"><Maximize2 size={16} /></span>
              </div>
              <div className="gallery-card-body">
                <div className="gallery-card-header">
                  <span className="gallery-card-number">0{index + 1}</span>
                  <span className="screenshot-badge">{s.badge}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="usb-contract">
        <div className="usb-contract-art" aria-hidden="true"><div className="usb-stick"><Usb size={58} /><span>REKORDBOX</span><i>READ ONLY</i></div><div className="usb-orbit"><i /><i /><i /></div></div>
        <div className="usb-contract-copy"><p className="section-eyebrow">{t.contractEyebrow}</p><h2>{t.contractTitle}</h2><p>{t.contractText}</p><ul>{contractPoints.map((point) => <li key={point}><Check size={15} />{point}</li>)}</ul></div>
      </section>

      <section className="downloads section" id="download">
        <div className="download-heading"><div><p className="section-eyebrow">{t.downloadEyebrow}</p><h2>{t.downloadTitle}</h2></div><p>{t.downloadText}</p></div>
        <div className="download-grid">
          <article className="download-card"><div className="download-platform"><Laptop size={24} /><span>{t.macFormat}</span></div><h3>{t.macTitle}</h3><p className="download-meta">{t.macMeta}</p><a className="download-active" href={MAC_DOWNLOAD}><Download size={17} />{t.macDownload}</a><p className="download-note">{t.macNote}</p></article>
          <article className="download-card"><div className="download-platform"><Monitor size={24} /><span>{t.winFormat}</span></div><h3>{t.winTitle}</h3><p className="download-meta">{t.winMeta}</p><a className="download-active" href={WINDOWS_DOWNLOAD}><Download size={17} />{t.winDownload}</a><p className="download-note">{t.winNote}</p></article>
          <article className="download-card download-card--source"><div className="download-platform"><Terminal size={24} /><span>{t.sourceFormat}</span></div><h3>{t.sourceTitle}</h3><p className="download-meta">{t.sourceMeta}</p><a className="download-active" href={SOURCE_ARCHIVE}><Download size={17} />{t.sourceDownload}</a><a className="download-code-link" href={SOURCE_TAG} target="_blank" rel="noreferrer">{t.browseCode}<ExternalLink size={13} /></a><p className="download-note">{t.sourceNote}</p></article>
        </div>
        <div className="release-honesty"><ShieldCheck size={18} /><p>{t.releaseNote}</p></div>
      </section>

      <section className="faq section" id="faq">
        <div className="faq-heading"><p className="section-eyebrow">{t.faqEyebrow}</p><h2>{t.faqTitle}</h2></div>
        <div className="faq-list">{t.faqs.map((item, index) => <details key={item.q} open={index === 0}><summary><span>0{index + 1}</span>{item.q}<ChevronDown size={18} /></summary><p>{item.a}</p></details>)}</div>
      </section>
    </main>
    <footer className="site-footer">
      <div className="footer-top"><a className="brand" href="#top"><img src="/app-icon.svg" width="38" height="38" alt="" /><span>NauticMixxx</span></a><p>{t.footerLine}</p><a href="#top">{t.backTop}<ArrowRight size={14} /></a></div>
      <div className="footer-legal"><div><h3>{t.creditsTitle}</h3><p>{t.credits}</p><a href={`${SOURCE_REPO}/blob/v1.0.0/LICENSE.md`} target="_blank" rel="noreferrer">LICENSE.md <ExternalLink size={12} /></a></div><div><h3>{t.disclaimerTitle}</h3><p>{t.disclaimer}</p><a href={`${SOURCE_REPO}/blob/v1.0.0/TRADEMARKS.md`} target="_blank" rel="noreferrer">TRADEMARKS.md <ExternalLink size={12} /></a></div></div>
    </footer>

    {zoomOpen && (
      <div
        className="lightbox-overlay"
        role="dialog"
        aria-modal="true"
        onClick={() => setZoomOpen(false)}
      >
        <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
          <div className="lightbox-top">
            <div className="lightbox-title-wrap">
              <span className="screenshot-badge">{currentScreenshot.badge}</span>
              <h3>{currentScreenshot.title}</h3>
            </div>
            <div className="lightbox-actions">
              <div className="lightbox-nav-tabs">
                {t.screenshots.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`lightbox-tab ${s.id === activeTab ? 'lightbox-tab--active' : ''}`}
                    onClick={() => setActiveTab(s.id)}
                  >
                    {s.tabLabel}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="lightbox-close"
                onClick={() => setZoomOpen(false)}
                aria-label={t.closeZoom}
              >
                <X size={18} />
              </button>
            </div>
          </div>
          <div className="lightbox-viewport">
            <img
              src={currentScreenshot.src}
              alt={currentScreenshot.alt}
              className="lightbox-image"
              width="1024"
              height="640"
            />
          </div>
          <div className="lightbox-caption">
            <p>{currentScreenshot.description}</p>
          </div>
        </div>
      </div>
    )}
  </div>;
}
