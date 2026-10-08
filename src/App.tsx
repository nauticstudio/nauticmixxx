import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Coffee,
  Download,
  ExternalLink,
  Headphones,
  Menu,
  Play,
  ShieldCheck,
  SlidersHorizontal,
  Usb,
  Waves,
  X,
} from "lucide-react";
import { SOURCE_REPO, DONATE_URL } from "./product";
import { useNauticRelease } from "./lib/release/useNauticRelease";

type Language = "es" | "en";
const content = {
  es: {
    nav: ["Funciones", "En acción", "Cómo empezar", "Ayuda"],
    download: "Descargar gratis",
    menu: "Abrir menú",
    closeMenu: "Cerrar menú",
    skip: "Ir al contenido",
    eyebrow: "TU MÚSICA. TU MOMENTO.",
    title: "Del USB",
    titleAccent: "a tu próximo set.",
    lead: "Mezclá tu música de Rekordbox en tu computadora. Conectá tu USB, elegí tus pistas y disfrutá de una experiencia DJ familiar.",
    watch: "Conocé la app",
    available: "Para macOS Apple Silicon y Windows",
    free: "Gratis, sin registro",
    latest: "Versión",
    heroCaption: "Así se ve tu próximo set.",
    heroHint: "Captura real de NauticMixxx",
    zoom: "Ampliar imagen",
    close: "Cerrar imagen",
    trust: [
      "Tu USB permanece intacto",
      "Sin importar tu biblioteca",
      "Libre y de código abierto",
    ],
    aboutLabel: "CONOCÉ NAUTICMIXXX",
    aboutTitle: "Tu preparación ya está hecha.\nAhora, a mezclar.",
    aboutText:
      "NauticMixxx es una aplicación DJ para tu computadora, basada en Mixxx y con una interfaz inspirada en la XDJ-RX3. Usá la música que ya preparaste en Rekordbox para practicar en casa o preparar tu próxima sesión.",
    features: [
      {
        title: "Conectá y encontrá tu música",
        text: "Abrí las playlists de tu USB exportado por Rekordbox, sin volver a importar ni organizar tus pistas.",
      },
      {
        title: "Toda tu mezcla, a la vista",
        text: "Dos decks, formas de onda y hasta ocho Hot Cues por deck. Tus puntos de referencia, donde los necesitás.",
      },
      {
        title: "Sentí el control",
        text: "Usá el teclado, el mouse o una controladora compatible. Hercules Inpulse 500 cuenta con un mapeo dedicado.",
      },
    ],
    controllers: "¿Tenés una controladora?",
    controllerText:
      "Consultá los modelos, presets y el estado de compatibilidad antes de conectar tu equipo.",
    controllerLink: "Ver controladoras compatibles",
    screensLabel: "MIRÁ CÓMO FUNCIONA",
    screensTitle: "Menos vueltas. Más música.",
    screensText:
      "Explorá la app antes de descargarla. De tus playlists a la mezcla, en una misma pantalla.",
    shots: [
      {
        tab: "Mezcla",
        title: "Dos pistas. Una misma energía.",
        text: "Seguí las formas de onda, ajustá el tempo y encontrá el momento de tu próxima transición.",
        alt: "NauticMixxx reproduciendo dos pistas, con formas de onda y Hot Cues",
      },
      {
        tab: "Playlists",
        title: "Tu música, tal como la preparaste.",
        text: "Navegá las playlists de tu USB y previsualizá tus pistas antes de cargarlas.",
        alt: "Navegador de playlists de un USB Rekordbox en NauticMixxx",
      },
      {
        tab: "Hot Cues",
        title: "Cada punto de tu set, a mano.",
        text: "Consultá el tiempo restante, el tempo y los Hot Cues de ambos decks de un vistazo.",
        alt: "Controles de los dos decks, tempo, BPM y Hot Cues de NauticMixxx",
      },
      {
        tab: "Inicio",
        title: "Todo listo para empezar.",
        text: "Conectá tu USB y elegí la primera pista de tu sesión.",
        alt: "NauticMixxx con ambos decks listos para cargar una pista",
      },
      {
        tab: "Mezcla",
        title: "La transición, a tu ritmo.",
        text: "Ajustá el tempo y seguí las formas de onda de ambos decks. Una vista dedicada para concentrarte en la próxima mezcla.",
        alt: "Vista de mezcla de NauticMixxx con formas de onda, tempo y Beat FX",
      },
    ],
    videoLabel: "Ver demostraciones",
    videos: ["La mezcla en movimiento", "Recorré tus playlists"],
    usbTitle: "Tu USB sigue siendo tuyo.",
    usbText:
      "NauticMixxx lee tu música sin modificar los archivos, las playlists ni el análisis de tu USB. Tu preparación se conserva para la próxima sesión.",
    usbLink: "Más sobre el uso del USB",
    downloadLabel: "EMPEZÁ TU PRÓXIMO SET",
    downloadTitle: "Elegí tu computadora.\nLa música la ponés vos.",
    downloadText:
      "Descargá gratis la última versión disponible. Sin cuentas ni suscripciones.",
    mac: "Apple Silicon · chip M1 o posterior",
    windows: "Windows 10 / 11 · 64 bits",
    macDownload: "Descargar para Mac",
    windowsDownload: "Descargar para Windows",
    fallback: "Ver archivos disponibles",
    macNote: "Abrí el archivo .dmg y arrastrá NauticMixxx a Aplicaciones.",
    windowsNote:
      "Abrí el instalador y seguí los pasos que aparecen en pantalla.",
    installHelp: "Ayuda con la instalación",
    installNote:
      "Las versiones comunitarias pueden mostrar un aviso de seguridad al abrirlas por primera vez. Consultá la guía de instalación de tu versión.",
    installGuide: "Leer la guía de instalación (inglés)",
    advanced: "Otras descargas y detalles de la versión",
    source: "Código fuente",
    release: "Novedades de esta versión",
    checksums: "Verificación de archivos",
    tests: "Pruebas y compatibilidad",
    linux:
      "Linux y Raspberry Pi: guía de compilación experimental; sin instalador de esta versión.",
    setupLabel: "DE CERO A TU PRIMERA MEZCLA",
    setupTitle: "Tres pasos. Y dale play.",
    setupText:
      "Solo necesitás tu computadora y un USB con música exportada desde Rekordbox.",
    steps: [
      {
        title: "Instalá la app",
        text: "Elegí la descarga para tu computadora e instalá NauticMixxx.",
      },
      {
        title: "Elegí tu salida de audio",
        text: "En Preferencias, abrí Sound Hardware para seleccionar tus parlantes o auriculares. Si usás una controladora, configurala en Controllers.",
      },
      {
        title: "Conectá el USB y cargá tu música",
        text: "Abrí SOURCE, elegí una playlist y pulsá ENTER. Cargá una pista con LOAD 1 o LOAD 2 y empezá a mezclar.",
      },
    ],
    faqLabel: "ESTAMOS PARA AYUDARTE",
    faqTitle: "Antes de darle play.",
    faqText: "Las respuestas a lo que quizás te estés preguntando.",
    support: "Reportar un problema",
    supportText: "Encontrá ayuda o contanos qué está pasando en GitHub.",
    faqs: [
      {
        q: "¿Es gratis?",
        a: "Sí. NauticMixxx es gratuito y de código abierto. No necesitás crear una cuenta ni contratar una suscripción para usarlo.",
      },
      {
        q: "¿Qué necesito para usarlo?",
        a: "Una Mac con Apple Silicon o una computadora con Windows de 64 bits, y un USB con música exportada desde Rekordbox. Podés empezar con teclado y mouse; una controladora es opcional.",
      },
      {
        q: "¿Puedo usar música de una carpeta de mi computadora?",
        a: "El navegador de NauticMixxx está pensado para USB exportados desde Rekordbox. El escaneo de carpetas y la biblioteca de música local están desactivados.",
      },
      {
        q: "¿Modifica la música o las playlists de mi USB?",
        a: "El USB se usa en modo lectura: NauticMixxx no reescribe archivos de audio, playlists ni datos de análisis. Conservá una copia de tu música y detené la reproducción antes de expulsar el USB desde tu sistema.",
      },
      {
        q: "¿Funciona con mi controladora?",
        a: "Hercules DJControl Inpulse 500 tiene un mapeo dedicado. También hay presets para DDJ-400, DDJ-SX, SX2, SX3, WeGO3, FLX4 y Roland DJ-505, pendientes de validación física; SX3 es experimental. El preset FLX6 controla solo el navegador. Revisá la guía de compatibilidad de tu versión.",
      },
      {
        q: "¿Se instala en una Pioneer XDJ-RX3?",
        a: "NauticMixxx se instala en tu computadora. Su interfaz se inspira en la XDJ-RX3, pero no se instala en el equipo Pioneer ni modifica su sistema.",
      },
    ],
    donateTitle: "Hecho por pasión. Compartido con todos.",
    donateText:
      "Si NauticMixxx acompaña tus sets, un café ayuda a seguir desarrollando y probando nuevas funciones.",
    donate: "Invitar un café",
    footer: "Software DJ libre, hecho para tocar.",
    project: "El proyecto en GitHub",
    legal: "Créditos y marcas",
    credits:
      "NauticMixxx: GNU GPL v3. Motor Mixxx 2.5.6: GNU GPL v2 o posterior.",
    disclaimer:
      "Proyecto comunitario independiente, sin afiliación ni respaldo de AlphaTheta, Pioneer DJ, Hercules, rekordbox ni Mixxx. Los nombres de marcas describen compatibilidad y referencias del producto.",
    licenses: "Licencias",
    trademarks: "Marcas",
    top: "Volver arriba",
  },
  en: {
    nav: ["Features", "In action", "Get started", "Help"],
    download: "Download for free",
    menu: "Open menu",
    closeMenu: "Close menu",
    skip: "Skip to content",
    eyebrow: "YOUR MUSIC. YOUR MOMENT.",
    title: "From your USB",
    titleAccent: "to your next set.",
    lead: "Mix your Rekordbox music on your computer. Plug in your USB, choose your tracks and enjoy a familiar DJ experience.",
    watch: "Explore the app",
    available: "For macOS Apple Silicon and Windows",
    free: "Free, no account needed",
    latest: "Version",
    heroCaption: "Meet your next set.",
    heroHint: "An actual NauticMixxx screenshot",
    zoom: "Expand image",
    close: "Close image",
    trust: [
      "Your USB stays untouched",
      "No library import",
      "Free and open source",
    ],
    aboutLabel: "MEET NAUTICMIXXX",
    aboutTitle: "You already prepared the music.\nNow, make it a mix.",
    aboutText:
      "NauticMixxx is a DJ app for your computer, based on Mixxx with an XDJ-RX3-inspired interface. Use the music you already prepared in Rekordbox to practice at home or get ready for your next session.",
    features: [
      {
        title: "Plug in. Find your music.",
        text: "Open playlists from your Rekordbox-exported USB without importing or organizing your tracks again.",
      },
      {
        title: "See your whole mix",
        text: "Two decks, waveforms and up to eight Hot Cues per deck. Your reference points, right where you need them.",
      },
      {
        title: "Feel in control",
        text: "Use your keyboard, mouse or a compatible controller. Hercules Inpulse 500 has a dedicated mapping.",
      },
    ],
    controllers: "Have a DJ controller?",
    controllerText:
      "Check supported models, presets and compatibility status before connecting your gear.",
    controllerLink: "Explore compatible controllers",
    screensLabel: "SEE HOW IT WORKS",
    screensTitle: "Less setup. More music.",
    screensText:
      "Explore the app before you download it. From playlists to mixing, all in one place.",
    shots: [
      {
        tab: "Mixing",
        title: "Two tracks. One shared energy.",
        text: "Follow the waveforms, adjust the tempo and find the moment for your next transition.",
        alt: "NauticMixxx playing two tracks with waveforms and Hot Cues",
      },
      {
        tab: "Playlists",
        title: "Your music, just as you prepared it.",
        text: "Browse your USB playlists and preview tracks before loading them.",
        alt: "Rekordbox USB playlist browser in NauticMixxx",
      },
      {
        tab: "Hot Cues",
        title: "Every cue, within reach.",
        text: "See remaining time, tempo and Hot Cues for both decks at a glance.",
        alt: "NauticMixxx dual-deck controls, tempo, BPM and Hot Cues",
      },
      {
        tab: "Getting ready",
        title: "Ready for your first track.",
        text: "Connect your USB and choose the opening track for your session.",
        alt: "NauticMixxx with both decks ready to load a track",
      },
      {
        tab: "Mixing",
        title: "The transition, at your pace.",
        text: "Adjust the tempo and follow both decks’ waveforms. A dedicated view to focus on your next mix.",
        alt: "NauticMixxx mixing view with waveforms, tempo and Beat FX",
      },
    ],
    videoLabel: "Watch the demos",
    videos: ["The mix in motion", "Browse your playlists"],
    usbTitle: "Your USB stays yours.",
    usbText:
      "NauticMixxx reads your music without changing your USB files, playlists or analysis. Your preparation stays ready for the next session.",
    usbLink: "More about using your USB",
    downloadLabel: "START YOUR NEXT SET",
    downloadTitle: "Choose your computer.\nBring your music.",
    downloadText:
      "Get the latest available version for free. No accounts or subscriptions.",
    mac: "Apple Silicon · M1 chip or later",
    windows: "Windows 10 / 11 · 64-bit",
    macDownload: "Download for Mac",
    windowsDownload: "Download for Windows",
    fallback: "View available files",
    macNote: "Open the .dmg file and drag NauticMixxx to Applications.",
    windowsNote: "Open the installer and follow the steps on screen.",
    installHelp: "Installation help",
    installNote:
      "Community builds may show a security notice when first opened. Check the installation guide for your version.",
    installGuide: "Read the installation guide",
    advanced: "More downloads and release details",
    source: "Source code",
    release: "What’s new in this version",
    checksums: "File verification",
    tests: "Tests and compatibility",
    linux:
      "Linux and Raspberry Pi: experimental build guide; no installer for this release.",
    setupLabel: "FROM ZERO TO YOUR FIRST MIX",
    setupTitle: "Three steps. Then press play.",
    setupText:
      "All you need is your computer and a USB with music exported from Rekordbox.",
    steps: [
      {
        title: "Install the app",
        text: "Choose the download for your computer and install NauticMixxx.",
      },
      {
        title: "Choose your audio output",
        text: "In Preferences, open Sound Hardware to select speakers or headphones. If you use a controller, set it up in Controllers.",
      },
      {
        title: "Plug in your USB. Load your music.",
        text: "Open SOURCE, choose a playlist and press ENTER. Load a track using LOAD 1 or LOAD 2 and start mixing.",
      },
    ],
    faqLabel: "HERE TO HELP",
    faqTitle: "Before you press play.",
    faqText: "Answers to the things you might be wondering.",
    support: "Report a problem",
    supportText: "Find help or tell us what’s happening on GitHub.",
    faqs: [
      {
        q: "Is it free?",
        a: "Yes. NauticMixxx is free and open source. You don’t need an account or a subscription to use it.",
      },
      {
        q: "What do I need to get started?",
        a: "A Mac with Apple Silicon or a 64-bit Windows computer, and a USB with music exported from Rekordbox. You can start with a keyboard and mouse; a DJ controller is optional.",
      },
      {
        q: "Can I use music from a folder on my computer?",
        a: "The NauticMixxx browser is designed for Rekordbox-exported USB drives. Local folder scanning and the local music library are disabled.",
      },
      {
        q: "Does it change my USB music or playlists?",
        a: "Your USB is read-only: NauticMixxx does not rewrite audio files, playlists or analysis data. Keep a backup of your music and stop playback before ejecting the USB through your operating system.",
      },
      {
        q: "Does it work with my controller?",
        a: "Hercules DJControl Inpulse 500 has a dedicated mapping. Presets for DDJ-400, DDJ-SX, SX2, SX3, WeGO3, FLX4 and Roland DJ-505 await physical hardware validation; SX3 is experimental. The FLX6 preset controls browsing only. Check the compatibility guide for your version.",
      },
      {
        q: "Does it install on a Pioneer XDJ-RX3?",
        a: "NauticMixxx runs on your computer. Its interface is inspired by the XDJ-RX3, but it does not install on Pioneer hardware or change its system.",
      },
    ],
    donateTitle: "Made with passion. Shared with everyone.",
    donateText:
      "If NauticMixxx is part of your sets, a coffee helps us keep developing and testing new features.",
    donate: "Buy us a coffee",
    footer: "Free DJ software, made to play.",
    project: "The project on GitHub",
    legal: "Credits and trademarks",
    credits:
      "NauticMixxx: GNU GPL v3. Mixxx 2.5.6 engine: GNU GPL v2 or later.",
    disclaimer:
      "Independent community project, without affiliation or endorsement from AlphaTheta, Pioneer DJ, Hercules, rekordbox or Mixxx. Brand names describe compatibility and product references.",
    licenses: "Licenses",
    trademarks: "Trademarks",
    top: "Back to top",
  },
};
const images = [
  {
    src: "/media/nauticmixxx-waveforms-playing.webp",
    width: 1392,
    height: 874,
  },
  { src: "/media/nauticmixxx-browser.webp", width: 1024, height: 640 },
  { src: "/media/nauticmixxx-decks-overview.webp", width: 1392, height: 238 },
  { src: "/media/nauticmixxx-empty-decks.webp", width: 1392, height: 874 },
  { src: "/media/nauticmixxx-waveforms-mixing.webp", width: 1392, height: 874 },
];
const featureIcons = [Usb, Waves, SlidersHorizontal];
const navTargets = ["features", "screens", "start", "faq"];
const videos = [
  { src: "/media/nauticmixxx-playing.mp4", poster: images[0].src },
  { src: "/media/nauticmixxx-browsing.mp4", poster: images[1].src },
];

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="NauticMixxx">
      <img src="/icons/nauticmixxx-96.png" width="36" height="36" alt="" />
      <span>NauticMixxx</span>
    </a>
  );
}

function Screenshot({
  index,
  alt,
  zoomLabel,
  onZoom,
}: {
  index: number;
  alt: string;
  zoomLabel: string;
  onZoom: (index: number) => void;
}) {
  const image = images[index];
  return (
    <div className="product-shot">
      <button
        className="image-button"
        type="button"
        aria-label={`${alt} — ${zoomLabel}`}
        onClick={() => onZoom(index)}
      >
        <img
          src={image.src}
          srcSet={`${image.src.replace(".webp", "-512.webp")} 512w, ${image.src} ${image.width}w`}
          sizes="(max-width: 760px) calc(100vw - 50px), (max-width: 1000px) 60vw, 730px"
          width={image.width}
          height={image.height}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
        <span className="zoom-hint">
          <ExternalLink size={16} />
          {zoomLabel}
        </span>
      </button>
    </div>
  );
}

export default function App({
  initialLanguage = "es",
}: {
  initialLanguage?: Language;
}) {
  const t = content[initialLanguage];
  const release = useNauticRelease();
  const [menuOpen, setMenuOpen] = useState(false);
  const [zoomShot, setZoomShot] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (zoomShot === null) return;
    const dialog = dialogRef.current;
    lastFocused.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      lastFocused.current?.focus();
    };
  }, [zoomShot]);

  return (
    <div id="top">
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <header
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setMenuOpen(false);
            document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus();
          }
        }}
      >
        <div className="header-inner">
          <Brand />
          <nav
            className={menuOpen ? "main-nav is-open" : "main-nav"}
            id="main-navigation"
            aria-label={
              initialLanguage === "es"
                ? "Navegación principal"
                : "Main navigation"
            }
          >
            {t.nav.map((label, index) => (
              <a
                key={label}
                href={`#${navTargets[index]}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <a
              className="language-link"
              href={initialLanguage === "es" ? "/en/" : "/"}
              hrefLang={initialLanguage === "es" ? "en" : "es"}
              lang={initialLanguage === "es" ? "en" : "es"}
              aria-label={
                initialLanguage === "es"
                  ? "Switch to English"
                  : "Cambiar a español"
              }
            >
              {initialLanguage === "es" ? "EN" : "ES"}
            </a>
            <a
              className="button button-small platform-cta platform-cta--other"
              href="#download"
            >
              <Download size={15} />
              <span>{initialLanguage === "es" ? "Descargar" : "Download"}</span>
            </a>
            <a
              className="button button-small platform-cta platform-cta--mac platform-brand-button platform-brand-button--mac"
              href="#download"
              aria-label={t.macDownload}
            >
              <img src="/icons/apple.svg" width="16" height="16" alt="" />
              <span>{initialLanguage === "es" ? "Descargar" : "Download"}</span>
            </a>
            <a
              className="button button-small platform-cta platform-cta--windows platform-brand-button platform-brand-button--windows"
              href="#download"
              aria-label={t.windowsDownload}
            >
              <img src="/icons/windows.svg" width="16" height="16" alt="" />
              <span>{initialLanguage === "es" ? "Descargar" : "Download"}</span>
            </a>
            <button
              className="menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="main-navigation"
              aria-label={menuOpen ? t.closeMenu : t.menu}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <a
            className="release-pill"
            href={release.page}
            target="_blank"
            rel="noreferrer"
          >
            <span className="status-dot" />
            NauticMixxx {release.version}
            <ArrowRight size={13} />
          </a>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 id="hero-title">
            {t.title}
            <br />
            <span>{t.titleAccent}</span>
          </h1>
          <p className="hero-lead">{t.lead}</p>
          <div className="hero-actions">
            <a className="button" href="#download">
              <Download size={18} />
              {t.download}
            </a>
            <a className="button button-secondary" href="#screens">
              <Play size={16} />
              {t.watch}
            </a>
          </div>
          <p className="hero-meta">
            <span>{t.available}</span>
            <span className="meta-separator" aria-hidden="true">
              ·
            </span>
            <span>{t.free}</span>
          </p>
          <div className="hero-preview">
            <div className="preview-topline">
              <span>
                <span className="status-dot" />
                {t.heroCaption}
              </span>
              <span>{t.heroHint}</span>
            </div>
            <button
              className="image-button"
              type="button"
              aria-label={t.zoom}
              onClick={() => setZoomShot(0)}
            >
              <img
                src={images[0].src}
                srcSet={`${images[0].src.replace(".webp", "-512.webp")} 512w, ${images[0].src} 1392w`}
                sizes="(max-width: 760px) calc(100vw - 60px), (max-width: 1120px) calc(100vw - 90px), 934px"
                width={images[0].width}
                height={images[0].height}
                alt={t.shots[0].alt}
                fetchPriority="high"
                decoding="async"
              />
              <span className="zoom-hint">
                <ExternalLink size={16} />
                {t.zoom}
              </span>
            </button>
          </div>
          <ul className="trust-row">
            {t.trust.map((item) => (
              <li key={item}>
                <Check size={16} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="section container" id="features">
          <div id="about" className="section-heading split-heading">
            <div>
              <p className="eyebrow">{t.aboutLabel}</p>
              <h2>{t.aboutTitle}</h2>
            </div>
            <p>{t.aboutText}</p>
          </div>
          <div className="feature-grid">
            {t.features.map((feature, index) => {
              const Icon = featureIcons[index];
              return (
                <article className="feature" key={feature.title}>
                  <span className="feature-icon">
                    <Icon size={23} strokeWidth={1.6} />
                  </span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              );
            })}
          </div>
          <figure className="deck-detail">
            <Screenshot
              index={2}
              alt={t.shots[2].alt}
              zoomLabel={t.zoom}
              onZoom={setZoomShot}
            />
            <figcaption>
              <strong>{t.shots[2].title}</strong>
              <span>{t.shots[2].text}</span>
            </figcaption>
          </figure>
          <div className="controller-note">
            <SlidersHorizontal size={22} />
            <div>
              <h3>{t.controllers}</h3>
              <p>{t.controllerText}</p>
            </div>
            <a
              className="text-link"
              href={release.controllerGuide}
              target="_blank"
              rel="noreferrer"
            >
              {t.controllerLink}
              <ArrowRight size={16} />
            </a>
          </div>
        </section>

        <section className="gallery-section" id="screens">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">{t.screensLabel}</p>
              <h2>{t.screensTitle}</h2>
              <p>{t.screensText}</p>
            </div>
            <div className="showcase-rows">
              {[1, 4].map((index) => (
                <article className="showcase-row" key={index}>
                  <Screenshot
                    index={index}
                    alt={t.shots[index].alt}
                    zoomLabel={t.zoom}
                    onZoom={setZoomShot}
                  />
                  <div className="showcase-copy">
                    <p className="eyebrow">{t.shots[index].tab}</p>
                    <h3>{t.shots[index].title}</h3>
                    <p>{t.shots[index].text}</p>
                  </div>
                </article>
              ))}
            </div>
            <details className="video-details">
              <summary>
                <Play size={16} />
                {t.videoLabel}
                <ChevronDown size={17} />
              </summary>
              <div className="video-grid">
                {videos.map((video, index) => (
                  <figure key={video.src}>
                    <video
                      controls
                      playsInline
                      preload="none"
                      poster={video.poster}
                      width="1728"
                      height="1080"
                      aria-label={t.videos[index]}
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>
                    <figcaption>{t.videos[index]}</figcaption>
                  </figure>
                ))}
              </div>
            </details>
          </div>
        </section>

        <aside className="usb-note container">
          <span className="usb-icon">
            <ShieldCheck size={32} strokeWidth={1.5} />
          </span>
          <div>
            <h2>{t.usbTitle}</h2>
            <p>{t.usbText}</p>
          </div>
          <a className="text-link" href="#faq">
            {t.usbLink}
            <ArrowRight size={16} />
          </a>
        </aside>

        <section className="download-section" id="download">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">{t.downloadLabel}</p>
              <h2>{t.downloadTitle}</h2>
              <p>{t.downloadText}</p>
              <a
                className="version-link"
                href={release.page}
                target="_blank"
                rel="noreferrer"
              >
                <span className="status-dot" />
                {t.latest} {release.version}
                <ExternalLink size={13} />
              </a>
            </div>
            <div className="download-grid">
              <article className="download-card download-card--mac">
                <img
                  className="platform-logo platform-logo--mac"
                  src="/icons/apple.svg"
                  width="32"
                  height="32"
                  alt=""
                />
                <h3>macOS</h3>
                <p className="platform-meta">{t.mac}</p>
                <a
                  className="button platform-brand-button platform-brand-button--mac"
                  href={release.mac?.url ?? release.page}
                >
                  <img src="/icons/apple.svg" width="18" height="18" alt="" />
                  {release.mac ? t.macDownload : t.fallback}
                </a>
                <p className="download-note">{t.macNote}</p>
              </article>
              <article className="download-card download-card--windows">
                <img
                  className="platform-logo"
                  src="/icons/windows.svg"
                  width="32"
                  height="32"
                  alt=""
                />
                <h3>Windows</h3>
                <p className="platform-meta">{t.windows}</p>
                <a
                  className="button platform-brand-button platform-brand-button--windows"
                  href={release.windows?.url ?? release.page}
                >
                  <img src="/icons/windows.svg" width="18" height="18" alt="" />
                  {release.windows ? t.windowsDownload : t.fallback}
                </a>
                <p className="download-note">{t.windowsNote}</p>
              </article>
            </div>
            <div className="download-details">
              <details>
                <summary>
                  {t.installHelp}
                  <ChevronDown size={17} />
                </summary>
                <div className="detail-content">
                  <p>{t.installNote}</p>
                  <a
                    className="text-link"
                    href={release.installationGuide}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.installGuide}
                    <ExternalLink size={14} />
                  </a>
                </div>
              </details>
              <details>
                <summary>
                  {t.advanced}
                  <ChevronDown size={17} />
                </summary>
                <div className="detail-content">
                  <div className="resource-links">
                    <a href={release.mac?.url ?? release.page}>
                      {t.macDownload}
                      <ArrowDown size={14} />
                    </a>
                    <a href={release.windows?.url ?? release.page}>
                      {t.windowsDownload}
                      <ArrowDown size={14} />
                    </a>
                    <a href={release.source.url}>
                      {t.source}
                      <ArrowDown size={14} />
                    </a>
                    <a href={release.page} target="_blank" rel="noreferrer">
                      {t.release}
                      <ExternalLink size={14} />
                    </a>
                    {release.checksums && (
                      <a
                        href={release.checksums}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t.checksums}
                        <ExternalLink size={14} />
                      </a>
                    )}
                    <a
                      href={release.testReport}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t.tests}
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  <p>
                    <a
                      href={`${SOURCE_REPO}/blob/main/docs/LINUX-RASPBERRY-PI.md`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t.linux} <ExternalLink size={12} />
                    </a>
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>

        <section className="section container setup-section" id="start">
          <div className="section-heading centered">
            <p className="eyebrow">{t.setupLabel}</p>
            <h2>{t.setupTitle}</h2>
            <p>{t.setupText}</p>
          </div>
          <div className="setup-content">
            <figure className="setup-preview">
              <Screenshot
                index={3}
                alt={t.shots[3].alt}
                zoomLabel={t.zoom}
                onZoom={setZoomShot}
              />
              <figcaption>{t.shots[3].title}</figcaption>
            </figure>
            <ol className="setup-steps">
              {t.steps.map((step, index) => (
                <li key={step.title}>
                  <span className="step-number">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <a
            className="text-link setup-link"
            href={release.installationGuide}
            target="_blank"
            rel="noreferrer"
          >
            {t.installGuide}
            <ArrowRight size={16} />
          </a>
        </section>

        <section className="faq-section container" id="faq">
          <div className="faq-heading">
            <p className="eyebrow">{t.faqLabel}</p>
            <h2>{t.faqTitle}</h2>
            <p>{t.faqText}</p>
            <div className="support-note">
              <Headphones size={22} />
              <p>{t.supportText}</p>
              <a
                className="text-link"
                href={`${SOURCE_REPO}/issues`}
                target="_blank"
                rel="noreferrer"
              >
                {t.support}
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div className="faq-list">
            {t.faqs.map((faq) => (
              <details key={faq.q}>
                <summary>
                  {faq.q}
                  <ChevronDown size={18} />
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="donate-section container" id="donate">
          <Coffee size={29} strokeWidth={1.5} />
          <div>
            <h2>{t.donateTitle}</h2>
            <p>{t.donateText}</p>
          </div>
          <a
            className="button button-secondary"
            href={DONATE_URL}
            target="_blank"
            rel="noreferrer"
          >
            {t.donate}
            <ArrowRight size={16} />
          </a>
        </section>
      </main>

      <footer className="site-footer container">
        <div className="footer-main">
          <div>
            <Brand />
            <p>{t.footer}</p>
          </div>
          <div className="footer-links">
            <a href={SOURCE_REPO} target="_blank" rel="noreferrer">
              {t.project}
              <ExternalLink size={13} />
            </a>
            <a href="#download">
              {t.download}
              <ArrowDown size={13} />
            </a>
            <a href="#top">
              {t.top}
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
        <details className="footer-legal">
          <summary>
            {t.legal}
            <ChevronDown size={14} />
          </summary>
          <p>{t.credits}</p>
          <p>{t.disclaimer}</p>
          <div className="resource-links">
            <a href={release.license} target="_blank" rel="noreferrer">
              {t.licenses}
              <ExternalLink size={12} />
            </a>
            <a href={release.trademarks} target="_blank" rel="noreferrer">
              {t.trademarks}
              <ExternalLink size={12} />
            </a>
          </div>
        </details>
        <p className="footer-bottom">
          Nautic Software<span>Made for the music.</span>
        </p>
      </footer>

      {zoomShot !== null && (
        <dialog
          ref={dialogRef}
          className="lightbox"
          aria-label={t.shots[zoomShot].title}
          onCancel={() => setZoomShot(null)}
          onClose={() => setZoomShot(null)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setZoomShot(null);
          }}
        >
          <div className="lightbox-top">
            <h2>{t.shots[zoomShot].title}</h2>
            <button
              type="button"
              className="icon-button"
              aria-label={t.close}
              onClick={() => setZoomShot(null)}
              autoFocus
            >
              <X size={22} />
            </button>
          </div>
          <img
            src={images[zoomShot].src}
            width={images[zoomShot].width}
            height={images[zoomShot].height}
            alt={t.shots[zoomShot].alt}
          />
          <p>{t.shots[zoomShot].text}</p>
        </dialog>
      )}
    </div>
  );
}
