import { useEffect, useState } from 'react';
import { SOURCE_REPO } from './product';
import { useNauticRelease } from './lib/release/useNauticRelease';
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
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  Terminal,
  Usb,
  Waves,
  X,
} from 'lucide-react';

type Language = 'es' | 'en';
type ScreenshotTab = 'performance' | 'waveforms' | 'browser' | 'standby' | 'decks';

interface ScreenshotItem {
  id: ScreenshotTab;
  tabLabel: string;
  badge: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

const copy = {
  es: {
    navAbout: 'Qué es', navFeatures: 'Funciones', navScreens: 'En acción', navDownload: 'Descargas', navFaq: 'FAQ', navCta: 'Descargar v{version}',
    eyebrow: 'v{version} · Última versión publicada · Mixxx 2.5.6',
    titleA: 'Tu USB de Rekordbox.', titleB: 'Directo a la pista.',
    hero: 'NauticMixxx es una edición comunitaria de Mixxx 2.5.6 para macOS y Windows, con dos decks y una interfaz inspirada en la XDJ-RX3.',
    heroDetail: 'Conectá un USB exportado por Rekordbox, navegá sus playlists y cargá pistas desde la app. La versión 1.5 suma navegación con más controladoras.',
    primaryCta: 'Descargar v{version}', secondaryCta: 'Ver código en GitHub',
    readOnly: 'USB en modo lectura', noFiles: 'Sin escaneo local', noAccount: 'Sin registro', free: 'Código abierto · GPL',
    previewLabel: 'Capturas reales de NauticMixxx', previewHint: 'Clic para cambiar o ampliar',
    zoomLabel: 'Ampliar captura', closeZoom: 'Cerrar vista previa', releaseStatus: 'Última versión publicada',
    galleryEyebrow: 'La interfaz en movimiento', galleryTitle: 'La interfaz en acción.',
    galleryText: 'Explorá la reproducción y la navegación en movimiento, junto con las capturas de mezcla, playlists y controles de los decks.',
    screenshots: [
      {
        id: 'performance' as const,
        tabLabel: 'Reproducción',
        badge: 'DECKS EN ACCIÓN',
        title: 'Dos decks, formas de onda y Hot Cues',
        description: 'Vista completa de reproducción con dos pistas cargadas, beatgrid y Hot Cues en ambos decks.',
        src: '/media/nauticmixxx-waveforms-playing.webp',
        alt: 'NauticMixxx reproduciendo dos pistas con formas de onda y Hot Cues',
        width: 1392, height: 874,
      },
      {
        id: 'waveforms' as const,
        tabLabel: 'Mezcla',
        badge: 'WAVEFORMS & BEATGRID',
        title: 'La mezcla, a la vista',
        description: 'Formas de onda de ambos decks, tempo y sección Beat FX durante una mezcla.',
        src: '/media/nauticmixxx-waveforms-mixing.webp',
        alt: 'Vista de mezcla de NauticMixxx con dos formas de onda, tempo y Beat FX',
        width: 1392, height: 874,
      },
      {
        id: 'browser' as const,
        tabLabel: 'Navegador Rekordbox',
        badge: 'LECTURA DIRECTA USB',
        title: 'Playlists y previsualización de pistas',
        description: 'Navegador de playlists y pistas de un USB exportado por Rekordbox, con previews de formas de onda.',
        src: '/media/nauticmixxx-browser.webp',
        alt: 'Navegador de playlists y pistas de Rekordbox en NauticMixxx',
        width: 1024, height: 640,
      },
      {
        id: 'standby' as const,
        tabLabel: 'Inicio / Standby',
        badge: 'LISTO PARA CARGAR',
        title: 'Dos decks listos para tu set',
        description: 'Pantalla de inicio con el logotipo NauticMixxx y los dos decks antes de cargar pistas.',
        src: '/media/nauticmixxx-empty-decks.webp',
        alt: 'Pantalla de inicio de NauticMixxx con los dos decks sin pistas cargadas',
        width: 1392, height: 874,
      },
      {
        id: 'decks' as const,
        tabLabel: 'Detalle de decks',
        badge: 'TEMPO & HOT CUES',
        title: 'Los controles de los dos decks',
        description: 'Detalle de tiempo restante, tempo, BPM, Hot Cues y formas de onda de resumen de ambos decks.',
        src: '/media/nauticmixxx-decks-overview.webp',
        alt: 'Detalle de los dos decks de NauticMixxx con BPM, tempo, Hot Cues y formas de onda',
        width: 1392, height: 238,
      },
    ],
    videos: [
      { id: 'playing', title: 'Reproducción en vivo', description: 'Dos decks reproduciendo pistas, con formas de onda y Hot Cues en acción.', src: '/media/nauticmixxx-playing.mp4', poster: '/media/nauticmixxx-waveforms-playing.webp' },
      { id: 'browsing', title: 'Navegación de playlists', description: 'Recorré el navegador y las pistas de un USB exportado por Rekordbox.', src: '/media/nauticmixxx-browsing.mp4', poster: '/media/nauticmixxx-browser.webp' },
    ],
    aboutEyebrow: 'Antes que nada', aboutTitle: 'Es una app. No toca tu XDJ.',
    aboutText: 'NauticMixxx corre en tu computadora y se controla con hardware DJ convencional. No reemplaza el sistema de una Pioneer real y su experiencia completa va mucho más allá de un cambio visual.',
    clarifyAppTitle: 'Aplicación de escritorio', clarifyAppText: 'Hay instaladores nativos para macOS Apple Silicon y Windows x64. El código fuente está disponible para compilar.',
    clarifyForkTitle: 'Fork funcional, no una skin', clarifyForkText: 'Incluye cambios en el motor, navegador USB, mapping, efectos, interfaz y políticas de seguridad.',
    clarifyUsbTitle: 'Tu USB permanece intacto', clarifyUsbText: 'Las pistas se abren en modo lectura: no reescribe audio, metadatos, playlists ni análisis.',
    whyEyebrow: 'Por qué NauticMixxx', whyTitle: 'Preparaste el set una vez. Usalo en todas partes.',
    whyText: 'Para DJs que preparan en Rekordbox y quieren practicar o tocar con una laptop y controladoras accesibles, sin repetir horas de organización.',
    featureOneTitle: 'Cero importaciones. Cero escrituras.', featureOneText: 'Lee export.pdb directamente en una sesión transitoria. El USB no se incorpora a la biblioteca local ni se envía a trabajos de análisis.',
    featureTwoTitle: 'Tu preparación, a la vista.', featureTwoText: 'Muestra formas de onda, beatgrid, overviews y hasta ocho Hot Cues por deck. La versión 1.4 corrigió el timing de MP3 Rekordbox en macOS.',
    featureThreeTitle: 'Navegación desde la controladora.', featureThreeText: 'Inpulse 500 tiene un mapeo dedicado. La versión 1.5 incluye presets RX3 para DDJ-400, SX, SX2, SX3, WeGO3, FLX4 y Roland DJ-505.',
    featureFourTitle: 'Base abierta y verificable.', featureFourText: 'Basado en Mixxx 2.5.6, con parches reproducibles. Los resultados y límites de cada build están documentados en el informe de pruebas de su release.',
    whatsNewLabel: 'Novedades de 1.5',
    whatsNew: [
      { title: 'Volvé a PERFORMANCE', text: 'En Inpulse 500, mantener ASSISTANT 600 ms sale de BROWSE sin cargar una pista.' },
      { title: 'Jog Inpulse 500', text: 'El borde responde mejor a giros suaves y comprime los rápidos; la calibración física sigue pendiente.' },
      { title: 'Idioma inicial', text: 'Las configuraciones nuevas abren la app en inglés; una elección de idioma explícita se conserva.' },
    ],
    contractEyebrow: 'Contrato USB-only', contractTitle: 'Lectura estricta. Sin sorpresas antes del bolo.',
    contractText: 'La colección local queda fuera del navegador. NauticMixxx mantiene únicamente el estado interno necesario para operar e historial, pero nunca persiste tus pistas USB como colección ni escribe sobre el dispositivo.',
    contractOne: 'Catálogo USB transitorio', contractTwo: 'Sin escaneo de carpetas locales', contractThree: 'Sin reescritura de USB', contractFour: 'Análisis y caché de ondas desactivados',
    downloadEyebrow: 'Versión {version}', downloadTitle: 'Descargá NauticMixxx.',
    downloadText: 'La versión {version} es la última publicada en GitHub. Elegí una descarga disponible o consultá las notas oficiales de esta release.',
    macTitle: 'macOS', macMeta: 'Apple Silicon · ARM64', macFormat: 'DMG',
    winTitle: 'Windows', winMeta: 'Windows x64', winFormat: 'Instalador EXE',
    sourceTitle: 'Código fuente', sourceMeta: 'Para compilar y revisar el proyecto', sourceFormat: 'TAR.GZ · tag v{version}',
    macDownload: 'Descargar DMG', winDownload: 'Descargar EXE', sourceDownload: 'Descargar fuentes', browseCode: 'Explorar código',
    macNote: 'Build comunitaria firmada ad hoc y sin notarizar. Si macOS la bloquea, intentá abrirla y luego usá Ajustes del Sistema → Privacidad y seguridad → Abrir igualmente.',
    winNote: 'Instalador nativo por usuario. Ejecutá el EXE; Windows SmartScreen puede pedir confirmación porque no está firmado.',
    sourceNote: 'Fuentes correspondientes, skin, mapeos, efectos, scripts y documentación. No hay binario Linux publicado.',
    releaseNote: 'Los siete presets Pioneer/Roland y la calibración del jog Inpulse 500 aún requieren validación física. Verificá el archivo con SHA256SUMS.txt.',
    guideLink: 'Guía de controladoras', testLink: 'Informe de pruebas', checksumsLink: 'Checksums SHA-256', releaseLink: 'Ver release en GitHub',
    setupEyebrow: 'Primeros pasos', setupTitle: 'Cómo usar tu USB de Rekordbox en NauticMixxx.',
    setupIntro: 'Usá un USB exportado por Rekordbox. NauticMixxx lee su catálogo y sus playlists; no necesita escanear una carpeta de música local.',
    setupSteps: [
      { title: 'Instalá NauticMixxx', text: 'En macOS Apple Silicon, abrí el DMG y arrastrá la app a Aplicaciones. En Windows 10/11 x64, ejecutá el instalador EXE completo.' },
      { title: 'Configurá la salida de audio', text: 'Elegí el dispositivo y los canales en Preferences → Sound Hardware. El mapeo RX3 se selecciona por el nombre MIDI del modelo; también podés elegirlo en Controllers.' },
      { title: 'Abrí SOURCE y cargá una pista', text: 'Conectá el USB y esperá a que termine la lectura del catálogo. Resaltá una playlist para previsualizarla y pulsá ENTER para abrir sus pistas. LOAD 1/2 carga el deck correspondiente.' },
    ],
    installationLink: 'Guía de instalación completa (inglés)', supportLink: 'Reportar un problema en GitHub',
    faqEyebrow: 'Preguntas frecuentes', faqTitle: 'Lo importante, sin letra chica.',
    faqs: [
      { q: '¿NauticMixxx reemplaza el sistema de una Pioneer XDJ-RX3 real?', a: 'No. Es una aplicación para computadoras que recrea un flujo de trabajo inspirado en la XDJ-RX3 para usarlo con una laptop y controladoras convencionales. No se instala en equipos Pioneer ni modifica su firmware.' },
      { q: '¿Es solamente una skin para Mixxx?', a: 'No. La interfaz es una parte del proyecto, pero NauticMixxx también modifica el navegador, la lectura de USB Rekordbox, estados de decks, políticas de pistas, mappings, efectos y distribución nativa.' },
      { q: '¿Puede dañar o desconfigurar la música de mi pendrive?', a: 'El flujo USB está diseñado como Read-Only. No persiste las pistas en la colección local, no las exporta, no las reescribe y no las entrega a trabajos locales de análisis. Aun así, conservá siempre una copia de seguridad de cualquier USB de trabajo.' },
      { q: '¿Qué pasa si desconecto el pendrive?', a: 'La sesión USB se invalida, el dispositivo desaparece del navegador y las rutas permanecen protegidas contra escritura. Para una actuación segura, detené la reproducción y expulsá el dispositivo desde el sistema antes de retirarlo.' },
      { q: '¿Qué controladoras tienen presets RX3?', a: 'Inpulse 500 tiene un mapeo dedicado. La versión 1.5 incluye presets para DDJ-400, DDJ-SX, DDJ-SX2, DDJ-SX3, DDJ-WeGO3, DDJ-FLX4 y Roland DJ-505. Su validación física está pendiente; el SX3 es experimental. El FLX6 conserva un preset limitado al navegador.' },
      { q: '¿Dónde están los últimos instaladores?', a: 'En GitHub Releases. Los botones de esta página consultan la última release publicada y enlazan sus archivos disponibles. Si falta un instalador, el enlace lleva a las descargas de la release.' },
    ],
    footerLine: 'Software DJ libre, hecho para tocar.', creditsTitle: 'Créditos open source',
    credits: 'Adaptación GNU GPL v3.0. Motor Mixxx 2.5.6 bajo GNU GPL v2.0 o posterior. Código, parches y atribuciones disponibles públicamente.',
    disclaimerTitle: 'Marcas y relación con otros proyectos',
    disclaimer: 'NauticMixxx es un proyecto comunitario independiente. No está afiliado, patrocinado, certificado ni respaldado por AlphaTheta Corporation, Pioneer DJ, Hercules, rekordbox ni el proyecto Mixxx. Sus nombres y marcas se mencionan únicamente para describir compatibilidad, procedencia técnica o flujo de trabajo.',
    backTop: 'Volver arriba',
  },
  en: {
    navAbout: 'What it is', navFeatures: 'Features', navScreens: 'In action', navDownload: 'Downloads', navFaq: 'FAQ', navCta: 'Download v{version}',
    eyebrow: 'v{version} · Latest published release · Mixxx 2.5.6',
    titleA: 'Your Rekordbox USB.', titleB: 'Straight to the decks.',
    hero: 'NauticMixxx is a community edition of Mixxx 2.5.6 for macOS and Windows, with two decks and an XDJ-RX3-inspired interface.',
    heroDetail: 'Connect a Rekordbox-exported USB, browse its playlists and load tracks in the app. Version 1.5 adds navigation for more controllers.',
    primaryCta: 'Download v{version}', secondaryCta: 'View code on GitHub',
    readOnly: 'Read-only USB mode', noFiles: 'No local scanning', noAccount: 'No account', free: 'Open source · GPL',
    previewLabel: 'Real NauticMixxx screenshots', previewHint: 'Click to switch view or expand',
    zoomLabel: 'Expand capture', closeZoom: 'Close preview', releaseStatus: 'Latest published release',
    galleryEyebrow: 'The interface in motion', galleryTitle: 'The interface in action.',
    galleryText: 'See playback and browsing in motion, alongside screenshots of mixing, playlists and deck controls.',
    screenshots: [
      {
        id: 'performance' as const,
        tabLabel: 'Playback',
        badge: 'DECKS IN ACTION',
        title: 'Two decks, waveforms and Hot Cues',
        description: 'Full playback view with two loaded tracks, beatgrid and Hot Cues on both decks.',
        src: '/media/nauticmixxx-waveforms-playing.webp',
        alt: 'NauticMixxx playing two tracks with waveforms and Hot Cues',
        width: 1392, height: 874,
      },
      {
        id: 'waveforms' as const,
        tabLabel: 'Mixing',
        badge: 'WAVEFORMS & BEATGRID',
        title: 'See the mix unfold',
        description: 'Waveforms for both decks, tempo and the Beat FX section during a mix.',
        src: '/media/nauticmixxx-waveforms-mixing.webp',
        alt: 'NauticMixxx mixing view with two waveforms, tempo and Beat FX',
        width: 1392, height: 874,
      },
      {
        id: 'browser' as const,
        tabLabel: 'Rekordbox Browser',
        badge: 'DIRECT USB READ',
        title: 'Playlists and track previews',
        description: 'Playlist and track browser for a Rekordbox-exported USB, with waveform previews.',
        src: '/media/nauticmixxx-browser.webp',
        alt: 'Rekordbox playlist and track browser in NauticMixxx',
        width: 1024, height: 640,
      },
      {
        id: 'standby' as const,
        tabLabel: 'Startup / Standby',
        badge: 'READY TO LOAD',
        title: 'Two decks ready for your set',
        description: 'Startup screen with the NauticMixxx logo and both decks before loading tracks.',
        src: '/media/nauticmixxx-empty-decks.webp',
        alt: 'NauticMixxx startup screen with both decks empty',
        width: 1392, height: 874,
      },
      {
        id: 'decks' as const,
        tabLabel: 'Deck details',
        badge: 'TEMPO & HOT CUES',
        title: 'Both decks, in detail',
        description: 'A closer look at remaining time, tempo, BPM, Hot Cues and overview waveforms on both decks.',
        src: '/media/nauticmixxx-decks-overview.webp',
        alt: 'NauticMixxx deck details showing BPM, tempo, Hot Cues and overview waveforms',
        width: 1392, height: 238,
      },
    ],
    videos: [
      { id: 'playing', title: 'Live playback', description: 'Two decks playing tracks, with waveforms and Hot Cues in action.', src: '/media/nauticmixxx-playing.mp4', poster: '/media/nauticmixxx-waveforms-playing.webp' },
      { id: 'browsing', title: 'Playlist browsing', description: 'Explore the browser and tracks on a Rekordbox-exported USB.', src: '/media/nauticmixxx-browsing.mp4', poster: '/media/nauticmixxx-browser.webp' },
    ],
    aboutEyebrow: 'First things first', aboutTitle: 'It’s an app. It never touches your XDJ.',
    aboutText: 'NauticMixxx runs on your computer and is controlled with everyday DJ hardware. It does not replace a real Pioneer system, and the complete experience goes far beyond a visual reskin.',
    clarifyAppTitle: 'Desktop application', clarifyAppText: 'Native installers are available for Apple Silicon macOS and Windows x64. Source code is available to build.',
    clarifyForkTitle: 'Functional fork, not a skin', clarifyForkText: 'Includes engine, USB browser, mapping, effects, interface and security-policy changes.',
    clarifyUsbTitle: 'Your USB stays intact', clarifyUsbText: 'Tracks open read-only: audio, metadata, playlists and analyses are never rewritten.',
    whyEyebrow: 'Why NauticMixxx', whyTitle: 'Prepare once. Play everywhere.',
    whyText: 'For DJs who prepare in Rekordbox and want to practice or perform with a laptop and accessible controllers, without repeating hours of organization.',
    featureOneTitle: 'Zero imports. Zero writes.', featureOneText: 'Reads export.pdb directly into a transient session. USB tracks never become part of the local collection or local analysis jobs.',
    featureTwoTitle: 'See your preparation.', featureTwoText: 'Displays waveforms, beatgrid, overviews and up to eight Hot Cues per deck. Version 1.4 corrected Rekordbox MP3 timing on macOS.',
    featureThreeTitle: 'Browse from a controller.', featureThreeText: 'Inpulse 500 has a dedicated mapping. Version 1.5 includes RX3 presets for DDJ-400, SX, SX2, SX3, WeGO3, FLX4 and Roland DJ-505.',
    featureFourTitle: 'Open and verifiable.', featureFourText: 'Based on Mixxx 2.5.6 with reproducible patches. Each release documents its build results and limitations in its test report.',
    whatsNewLabel: 'New in 1.5',
    whatsNew: [
      { title: 'Return to PERFORMANCE', text: 'On Inpulse 500, hold ASSISTANT for 600 ms to leave BROWSE without loading a track.' },
      { title: 'Inpulse 500 jog', text: 'The rim responds more readily to slow turns and compresses fast turns; physical calibration is pending.' },
      { title: 'Initial language', text: 'New configurations start in English; an explicit language choice remains in effect.' },
    ],
    contractEyebrow: 'USB-only contract', contractTitle: 'Strictly read-only. No pre-gig surprises.',
    contractText: 'The local collection stays outside the browser. NauticMixxx keeps only the internal state and history required to operate, but never persists USB tracks as a collection or writes to the device.',
    contractOne: 'Transient USB catalog', contractTwo: 'No local-folder scanning', contractThree: 'No USB rewriting', contractFour: 'Analysis and waveform cache disabled',
    downloadEyebrow: 'Version {version}', downloadTitle: 'Download NauticMixxx.',
    downloadText: 'Version {version} is the latest published on GitHub. Choose an available download or read the official release notes.',
    macTitle: 'macOS', macMeta: 'Apple Silicon · ARM64', macFormat: 'DMG',
    winTitle: 'Windows', winMeta: 'Windows x64', winFormat: 'EXE installer',
    sourceTitle: 'Source code', sourceMeta: 'Build and inspect the project', sourceFormat: 'TAR.GZ · v{version} tag',
    macDownload: 'Download DMG', winDownload: 'Download EXE', sourceDownload: 'Download source', browseCode: 'Browse code',
    macNote: 'Community build, ad-hoc signed and not notarized. If macOS blocks it, try opening it once, then use System Settings → Privacy & Security → Open Anyway.',
    winNote: 'Native per-user installer. Run the EXE; unsigned builds may trigger Windows SmartScreen.',
    sourceNote: 'Corresponding source, skin, mappings, effects, scripts and documentation. No Linux binary is published.',
    releaseNote: 'The seven Pioneer/Roland presets and Inpulse 500 jog calibration still need physical validation. Verify downloads with SHA256SUMS.txt.',
    guideLink: 'Controller guide', testLink: 'Test report', checksumsLink: 'SHA-256 checksums', releaseLink: 'View GitHub release',
    setupEyebrow: 'Getting started', setupTitle: 'How to use your Rekordbox USB in NauticMixxx.',
    setupIntro: 'Use a Rekordbox-exported USB drive. NauticMixxx reads its catalog and playlists without scanning a local music folder.',
    setupSteps: [
      { title: 'Install NauticMixxx', text: 'On an Apple Silicon Mac, open the DMG and drag the app to Applications. On Windows 10/11 x64, run the complete EXE installer.' },
      { title: 'Set your audio output', text: 'Choose your device and channels in Preferences → Sound Hardware. RX3 mappings are selected by MIDI model name; you can also select one under Controllers.' },
      { title: 'Open SOURCE and load a track', text: 'Connect the USB and wait for its catalog to finish loading. Highlight a playlist to preview it, then press ENTER to open its tracks. LOAD 1/2 loads the corresponding deck.' },
    ],
    installationLink: 'Full installation guide', supportLink: 'Report an issue on GitHub',
    faqEyebrow: 'Frequently asked questions', faqTitle: 'The important details, upfront.',
    faqs: [
      { q: 'Does NauticMixxx replace the system on a real Pioneer XDJ-RX3?', a: 'No. It is a computer application recreating an XDJ-RX3-inspired workflow for laptops and conventional controllers. It is never installed on Pioneer hardware and does not modify its firmware.' },
      { q: 'Is it only a skin for Mixxx?', a: 'No. The interface is one part of the project, but NauticMixxx also changes the browser, Rekordbox USB reading, deck states, track policies, mappings, effects and native distribution.' },
      { q: 'Can it damage or reconfigure the music on my drive?', a: 'The USB workflow is designed as read-only. It does not persist tracks in the local collection, export them, rewrite them or submit them to local analysis jobs. Still, always keep a backup of any performance drive.' },
      { q: 'What happens if I unplug the drive?', a: 'The USB session is invalidated, the device is removed from the browser and its paths remain write-protected. For safe performance practice, stop playback and eject the device from the operating system first.' },
      { q: 'Which controllers have RX3 presets?', a: 'Inpulse 500 has a dedicated mapping. Version 1.5 includes presets for DDJ-400, DDJ-SX, DDJ-SX2, DDJ-SX3, DDJ-WeGO3, DDJ-FLX4 and Roland DJ-505. Physical validation is pending; SX3 is experimental. FLX6 retains a browser-only preset.' },
      { q: 'Where are the latest installers?', a: 'On GitHub Releases. This page checks the latest published release and links to its available files. If an installer is missing, its link opens the release downloads.' },
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
        <span className="window-project">NAUTICMIXXX — {current.tabLabel}</span>
        <span className="window-state"><i /> 100% READ ONLY</span>
      </div>

      <div className="screenshot-tab-bar" role="tablist" aria-label="NauticMixxx screenshots">
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
                {(item.id === 'waveforms' || item.id === 'performance') && <Waves size={13} />}
                {item.id === 'browser' && <Database size={13} />}
                {item.id === 'standby' && <Monitor size={13} />}
                {item.id === 'decks' && <SlidersHorizontal size={13} />}
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
        style={{ aspectRatio: `${current.width} / ${current.height}` }}
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
          srcSet={`${current.src.replace('.webp', '-512.webp')} 512w, ${current.src} ${current.width}w`}
          sizes="(max-width: 960px) calc(100vw - 48px), 800px"
          alt={current.alt}
          className="screenshot-image"
          width={current.width}
          height={current.height}
          loading="eager"
          fetchPriority="high"
          decoding="async"
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
        <div className="screenshot-thumbs">
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
              aria-label={item.tabLabel}
            >
              <img src={item.src.replace('.webp', '-thumb.webp')} alt="" width="72" height="45" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App({ initialLanguage = 'es' }: { initialLanguage?: Language }) {
  const language = initialLanguage;
  const [activeTab, setActiveTab] = useState<ScreenshotTab>('performance');
  const [zoomOpen, setZoomOpen] = useState(false);
  const release = useNauticRelease();
  const localCopy = copy[language];
  const versionText = (text: string) => text.replaceAll('{version}', release.version);
  const viewDownloads = language === 'es' ? 'Ver descargas' : 'View downloads';
  const t = {
    ...localCopy,
    navCta: versionText(localCopy.navCta), primaryCta: versionText(localCopy.primaryCta),
    eyebrow: versionText(localCopy.eyebrow), downloadEyebrow: versionText(localCopy.downloadEyebrow),
    downloadText: versionText(localCopy.downloadText),
    sourceFormat: `${release.source.format} · ${release.tag}`,
    macFormat: release.mac?.format ?? 'GitHub Releases', winFormat: release.windows?.format ?? 'GitHub Releases',
    macDownload: release.mac ? `${language === 'es' ? 'Descargar' : 'Download'} ${release.mac.format}` : viewDownloads,
    winDownload: release.windows ? `${language === 'es' ? 'Descargar' : 'Download'} ${release.windows.format}` : viewDownloads,
  };
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
      <a className="brand" href="#top" aria-label="NauticMixxx — home"><img src="/icons/nauticmixxx-64.png" srcSet="/icons/nauticmixxx-64.png 64w, /icons/nauticmixxx-128.png 128w" sizes="38px" width="38" height="38" alt="" /><span>NauticMixxx</span></a>
      <nav aria-label={language === 'es' ? 'Navegación principal' : 'Main navigation'}><a href="#about">{t.navAbout}</a><a href="#features">{t.navFeatures}</a><a href="#screens">{t.navScreens}</a><a href="#download">{t.navDownload}</a><a href="#faq">{t.navFaq}</a></nav>
      <div className="header-actions"><a className="language-button" href={language === 'es' ? '/en/' : '/'} hrefLang={language === 'es' ? 'en' : 'es'} lang={language === 'es' ? 'en' : 'es'} aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a español'}>{language === 'es' ? 'EN' : 'ES'}</a><a className="header-cta" href="#download">{t.navCta}<ArrowDown size={14} /></a></div>
    </header>
    <main>
      <section className="hero hero--release">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><BadgeCheck size={13} />{t.eyebrow}</div><h1>{t.titleA}<br /><em>{t.titleB}</em></h1>
          <p className="hero-lead">{t.hero}</p><p className="hero-detail">{t.heroDetail}</p>
          <div className="hero-actions"><a className="button button--primary" href="#download"><Download size={17} />{t.primaryCta}</a><a className="button button--quiet" href={SOURCE_REPO} target="_blank" rel="noreferrer"><Github size={16} />{t.secondaryCta}</a></div>
          <div className="hero-meta"><span><i />{t.releaseStatus}</span><small>macOS Apple Silicon · Windows x64</small></div>
        </div>
        <div className="hero-product">
          <div className="preview-caption"><span>{t.previewLabel}</span><span><MousePointer2 size={12} />{t.previewHint}</span></div>
          <ScreenshotViewer
            items={t.screenshots}
            activeId={activeTab}
            onChangeTab={setActiveTab}
            onOpenZoom={() => setZoomOpen(true)}
            zoomLabel={t.zoomLabel}
          />
        </div>
        <div className="trust-row trust-row--release" aria-label="Release principles"><span><ShieldCheck size={16} />{t.readOnly}</span><span><Check size={16} />{t.noFiles}</span><span><Code2 size={16} />{t.noAccount}</span><span><Code2 size={16} />{t.free}</span></div>
      </section>

      <section className="clarity section" id="about">
        <div className="clarity-heading"><p className="section-eyebrow">{t.aboutEyebrow}</p><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p></div>
        <div className="clarity-grid">{clarityCards.map(({ icon: Icon, title, text }) => <article key={title} className="clarity-card"><span><Icon size={20} /></span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="features section" id="features">
        <div className="section-intro"><span className="section-number">01</span><div><p className="section-eyebrow">{t.whyEyebrow}</p><h2>{t.whyTitle}</h2><p>{t.whyText}</p></div></div>
        <div className="feature-grid">{features.map(({ icon: Icon, title, text, code }, index) => <article className={`feature-card ${index === 0 ? 'feature-card--accent' : ''}`} key={title}><div className="feature-card-top"><span>0{index + 1}</span><code>{code}</code></div><Icon size={27} /><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className="release-changes"><span>{t.whatsNewLabel}</span><div>{t.whatsNew.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div>
        <div className="evidence-links"><a href={release.controllerGuide} target="_blank" rel="noreferrer">{t.guideLink}<ExternalLink size={14} /></a><a href={release.testReport} target="_blank" rel="noreferrer">{t.testLink}<ExternalLink size={14} /></a></div>
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
        <div className="video-grid">
          {t.videos.map((video) => (
            <article className="video-card" key={video.id}>
              <video
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                disableRemotePlayback
                tabIndex={-1}
                preload="auto"
                poster={video.poster}
                width="1728"
                height="1080"
                aria-label={video.title}
                aria-describedby={`video-${video.id}-description`}
              >
                <source src={video.src} type="video/mp4" />
              </video>
              <div className="gallery-card-body">
                <h3>{video.title}</h3>
                <p id={`video-${video.id}-description`}>{video.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="gallery-grid">
          {t.screenshots.map((s, index) => (
            <article
              key={s.id}
              className={`gallery-card ${s.id === 'decks' ? 'gallery-card--decks' : ''} ${activeTab === s.id ? 'gallery-card--active' : ''}`}
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
              <div className="gallery-card-media" style={{ aspectRatio: `${s.width} / ${s.height}` }}>
                <img src={s.src} srcSet={`${s.src.replace('.webp', '-512.webp')} 512w, ${s.src} ${s.width}w`} sizes={s.id === 'decks' ? '(max-width: 960px) calc(100vw - 48px), 1200px' : '(max-width: 960px) calc(100vw - 48px), 600px'} alt={s.alt} width={s.width} height={s.height} loading="lazy" decoding="async" />
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
        <p className="release-title"><a href={release.page} target="_blank" rel="noreferrer">{release.name} <ExternalLink size={14} /></a></p>
        <div className="download-grid">
          <article className="download-card"><div className="download-platform"><Laptop size={24} /><span>{t.macFormat}</span></div><h3>{t.macTitle}</h3><p className="download-meta">{t.macMeta}</p><a className="download-active" href={release.mac?.url ?? release.page}><Download size={17} />{t.macDownload}</a><p className="download-note">{t.macNote}</p></article>
          <article className="download-card"><div className="download-platform"><Monitor size={24} /><span>{t.winFormat}</span></div><h3>{t.winTitle}</h3><p className="download-meta">{t.winMeta}</p><a className="download-active" href={release.windows?.url ?? release.page}><Download size={17} />{t.winDownload}</a><p className="download-note">{t.winNote}</p></article>
          <article className="download-card download-card--source"><div className="download-platform"><Terminal size={24} /><span>{t.sourceFormat}</span></div><h3>{t.sourceTitle}</h3><p className="download-meta">{t.sourceMeta}</p><a className="download-active" href={release.source.url}><Download size={17} />{t.sourceDownload}</a><a className="download-code-link" href={release.sourceTag} target="_blank" rel="noreferrer">{t.browseCode}<ExternalLink size={13} /></a><p className="download-note">{t.sourceNote}</p></article>
        </div>
        <div className="release-honesty"><ShieldCheck size={18} /><p>{t.releaseNote}</p></div>
        <div className="evidence-links evidence-links--downloads"><a href={release.page} target="_blank" rel="noreferrer">{t.releaseLink}<ExternalLink size={14} /></a>{release.checksums && <a href={release.checksums} target="_blank" rel="noreferrer">{t.checksumsLink}<ExternalLink size={14} /></a>}</div>
      </section>

      <section className="setup section" id="start">
        <div className="setup-heading"><p className="section-eyebrow">{t.setupEyebrow}</p><h2>{t.setupTitle}</h2><p>{t.setupIntro}</p></div>
        <ol className="setup-steps" role="list">{t.setupSteps.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
        <div className="evidence-links"><a href={release.installationGuide} target="_blank" rel="noreferrer">{t.installationLink}<ExternalLink size={14} /></a><a href={`${SOURCE_REPO}/issues`} target="_blank" rel="noreferrer">{t.supportLink}<ExternalLink size={14} /></a></div>
      </section>

      <section className="faq section" id="faq">
        <div className="faq-heading"><p className="section-eyebrow">{t.faqEyebrow}</p><h2>{t.faqTitle}</h2></div>
        <div className="faq-list">{t.faqs.map((item, index) => <details key={item.q} open={index === 0}><summary><span>0{index + 1}</span>{item.q}<ChevronDown size={18} /></summary><p>{item.a}</p></details>)}</div>
      </section>
    </main>
    <footer className="site-footer">
      <div className="footer-top"><a className="brand" href="#top"><img src="/icons/nauticmixxx-64.png" srcSet="/icons/nauticmixxx-64.png 64w, /icons/nauticmixxx-128.png 128w" sizes="38px" width="38" height="38" alt="" loading="lazy" /><span>NauticMixxx</span></a><p>{t.footerLine}</p><a href="#top">{t.backTop}<ArrowRight size={14} /></a></div>
      <div className="footer-legal"><div><h3>{t.creditsTitle}</h3><p>{t.credits}</p><a href={release.license} target="_blank" rel="noreferrer">LICENSE.md <ExternalLink size={12} /></a></div><div><h3>{t.disclaimerTitle}</h3><p>{t.disclaimer}</p><a href={release.trademarks} target="_blank" rel="noreferrer">TRADEMARKS.md <ExternalLink size={12} /></a></div></div>
    </footer>

    {zoomOpen && (
      <div
        className="lightbox-overlay"
        role="dialog"
        aria-modal="true"
        aria-label={currentScreenshot.title}
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
          <div className="lightbox-viewport" style={{ aspectRatio: `${currentScreenshot.width} / ${currentScreenshot.height}` }}>
            <img
              src={currentScreenshot.src}
              alt={currentScreenshot.alt}
              className="lightbox-image"
              width={currentScreenshot.width}
              height={currentScreenshot.height}
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
