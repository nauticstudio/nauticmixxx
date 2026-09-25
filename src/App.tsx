import { FormEvent, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  ArrowRight,
  AudioLines,
  Check,
  ChevronRight,
  CircleHelp,
  Gauge,
  Headphones,
  Mail,
  MousePointer2,
  Play,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Waves,
} from 'lucide-react';

type Language = 'es' | 'en';

const CONTACT_EMAIL = 'support@nauticstudio.xyz';

const copy = {
  es: {
    navVision: 'Visión',
    navExperience: 'Experiencia',
    navAccess: 'Acceso',
    navCta: 'Quiero probarla',
    eyebrow: 'Una nueva app de Nautic Studio',
    titleA: 'Mezclá con',
    titleB: 'intención.',
    hero: 'NauticMixxx está tomando forma: una experiencia de mezcla enfocada, elegante y diseñada para mantener tus oídos —y no la interfaz— en el centro.',
    comingSoon: 'Próximamente para macOS',
    requestAccess: 'Solicitar acceso anticipado',
    explore: 'Conocer la visión',
    local: 'Local first',
    private: 'Privado por diseño',
    focused: 'Sin distracciones',
    previewLabel: 'Vista conceptual · Interactiva',
    previewHint: 'Probá los faders',
    visionEyebrow: 'La idea',
    visionTitle: 'Menos mirar. Más escuchar.',
    visionText: 'Una herramienta no debería imponerse entre vos y la música. NauticMixxx explora un flujo donde cada control tiene un propósito y cada decisión se siente inmediata.',
    cardOneTitle: 'Balance visible',
    cardOneText: 'Una lectura clara de tu sesión, sin paneles compitiendo por atención.',
    cardTwoTitle: 'Control táctil',
    cardTwoText: 'Interacciones directas, rápidas y familiares para no perder el hilo creativo.',
    cardThreeTitle: 'Tu mezcla, en contexto',
    cardThreeText: 'La información justa para tomar decisiones con confianza.',
    experienceEyebrow: 'Diseñada alrededor del oído',
    experienceTitle: 'Precisa cuando importa. Invisible cuando no.',
    experienceText: 'El producto todavía está evolucionando. Esta primera web establece su lenguaje visual y deja el escenario listo para sumar capturas, videos y funciones reales a medida que estén disponibles.',
    pointOne: 'Interfaz nativa y enfocada',
    pointTwo: 'Flujo pensado para audio',
    pointThree: 'Detalles de producto próximamente',
    mediaPlaceholder: 'Espacio reservado para el product film',
    mediaHint: 'Video o captura principal · 16:9',
    accessEyebrow: 'Sé de los primeros',
    accessTitle: 'Escuchá lo que viene.',
    accessText: 'Dejanos tu email y prepararemos una solicitud para que puedas recibir novedades y oportunidades de acceso temprano.',
    emailPlaceholder: 'tu@email.com',
    send: 'Solicitar invitación',
    openingMail: 'Abriendo tu aplicación de correo…',
    mailNote: 'Tu dirección no se guarda en esta demo. El botón abre un email dirigido a Nautic Studio.',
    footerLine: 'Audio software, hecho con oído.',
    backTop: 'Volver arriba',
    status: 'En desarrollo',
    channels: ['DRUMS', 'BASS', 'SYNTH', 'VOCAL'],
  },
  en: {
    navVision: 'Vision',
    navExperience: 'Experience',
    navAccess: 'Access',
    navCta: 'Try it first',
    eyebrow: 'A new app by Nautic Studio',
    titleA: 'Mix with',
    titleB: 'intention.',
    hero: 'NauticMixxx is taking shape: a focused, elegant mixing experience designed to keep your ears —not the interface— at the center.',
    comingSoon: 'Coming soon for macOS',
    requestAccess: 'Request early access',
    explore: 'Discover the vision',
    local: 'Local first',
    private: 'Private by design',
    focused: 'Zero distraction',
    previewLabel: 'Concept preview · Interactive',
    previewHint: 'Try the faders',
    visionEyebrow: 'The idea',
    visionTitle: 'Look less. Listen more.',
    visionText: 'A tool should never stand between you and the music. NauticMixxx explores a workflow where every control has a purpose and every decision feels immediate.',
    cardOneTitle: 'Visible balance',
    cardOneText: 'A clear reading of your session, without panels competing for attention.',
    cardTwoTitle: 'Tactile control',
    cardTwoText: 'Direct, fast and familiar interactions that keep the creative thread alive.',
    cardThreeTitle: 'Your mix, in context',
    cardThreeText: 'Just enough information to make decisions with confidence.',
    experienceEyebrow: 'Designed around your ears',
    experienceTitle: 'Precise when it matters. Invisible when it doesn’t.',
    experienceText: 'The product is still evolving. This first website establishes its visual language and is ready for real captures, films and features as they become available.',
    pointOne: 'Focused, native interface',
    pointTwo: 'A workflow made for audio',
    pointThree: 'Product details coming soon',
    mediaPlaceholder: 'Reserved for the product film',
    mediaHint: 'Hero video or screenshot · 16:9',
    accessEyebrow: 'Be among the first',
    accessTitle: 'Hear what’s coming.',
    accessText: 'Leave your email and we’ll prepare a request so you can receive news and early access opportunities.',
    emailPlaceholder: 'you@email.com',
    send: 'Request an invitation',
    openingMail: 'Opening your email app…',
    mailNote: 'Your address is not stored by this demo. The button opens an email addressed to Nautic Studio.',
    footerLine: 'Audio software, made by ear.',
    backTop: 'Back to top',
    status: 'In development',
    channels: ['DRUMS', 'BASS', 'SYNTH', 'VOCAL'],
  },
} as const;

const initialLevels = [72, 58, 66, 78];
const waveBars = [20, 34, 52, 28, 64, 74, 42, 86, 58, 36, 70, 48, 90, 62, 40, 76, 54, 30, 68, 84, 46, 72, 38, 60, 82, 50, 32, 66, 44, 78, 56, 26];

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-mark ${compact ? 'brand-mark--compact' : ''}`} aria-hidden="true">
      {[42, 70, 52, 78, 38].map((height, index) => (
        <i key={index} style={{ height: `${height}%` }} />
      ))}
    </span>
  );
}

function MixerPreview({ labels }: { labels: readonly string[] }) {
  const [levels, setLevels] = useState(initialLevels);
  const [muted, setMuted] = useState<number[]>([]);

  const updateLevel = (channel: number, nextLevel: number) => {
    setLevels((current) => current.map((value, index) => (index === channel ? nextLevel : value)));
  };

  const toggleMute = (channel: number) => {
    setMuted((current) =>
      current.includes(channel) ? current.filter((item) => item !== channel) : [...current, channel],
    );
  };

  return (
    <div className="mixer-shell">
      <div className="window-bar">
        <div className="traffic-lights" aria-hidden="true"><i /><i /><i /></div>
        <span className="window-project">MIDNIGHT STUDY — MIX 03</span>
        <span className="window-state"><i /> LIVE</span>
      </div>

      <div className="mixer-toolbar">
        <div className="transport">
          <button type="button" aria-label="Reset preview levels" onClick={() => setLevels(initialLevels)}><RotateCcw size={13} /></button>
          <button type="button" className="transport-play" aria-label="Play preview"><Play size={12} fill="currentColor" /></button>
          <span>01:42:18</span>
        </div>
        <div className="tempo"><span>124.00</span><small>BPM</small></div>
        <div className="toolbar-tools"><MousePointer2 size={14} /><SlidersHorizontal size={14} /></div>
      </div>

      <div className="waveform" aria-label="Audio waveform preview">
        <div className="waveform-grid" />
        <div className="wave-bars">
          {waveBars.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
        </div>
        <span className="playhead" />
        <small className="marker marker-one">VERSE</small>
        <small className="marker marker-two">DROP</small>
      </div>

      <div className="mixer-body">
        <aside className="session-panel">
          <span className="panel-label">SESSION</span>
          <strong>28 tracks</strong>
          <div className="session-stat"><Waves size={13} /><span>44.1 kHz</span></div>
          <div className="session-stat"><Gauge size={13} /><span>24 bit</span></div>
          <div className="mini-spectrum" aria-hidden="true">
            {[35, 52, 28, 72, 46, 82, 60, 38, 70, 48, 58, 32].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
          </div>
        </aside>

        <div className="channel-bank">
          {labels.map((label, channel) => {
            const isMuted = muted.includes(channel);
            return (
              <div className={`channel ${isMuted ? 'channel--muted' : ''}`} key={label}>
                <div className="channel-pan"><i style={{ transform: `rotate(${(levels[channel] - 50) * 1.8}deg)` }} /></div>
                <div className="channel-meter" aria-hidden="true">
                  <i style={{ height: `${isMuted ? 2 : levels[channel] * 0.88}%` }} />
                  <i style={{ height: `${isMuted ? 2 : levels[channel]}%` }} />
                </div>
                <input
                  aria-label={`${label} level`}
                  type="range"
                  min="0"
                  max="100"
                  value={levels[channel]}
                  onChange={(event) => updateLevel(channel, Number(event.target.value))}
                />
                <span className="channel-value">{isMuted ? '−∞' : `${Math.round((levels[channel] - 75) / 2)}.0`}</span>
                <div className="channel-controls">
                  <button type="button" aria-pressed={isMuted} onClick={() => toggleMute(channel)}>M</button>
                  <button type="button">S</button>
                </div>
                <strong>{label}</strong>
              </div>
            );
          })}

          <div className="channel master-channel">
            <span className="master-tag">MASTER</span>
            <div className="master-orbit"><span>−8.2</span><small>LUFS</small></div>
            <div className="master-meter" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, index) => <i className={index > 13 ? 'hot' : ''} key={index} />)}
            </div>
            <span className="master-peak">−0.8 dBTP</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState<Language>('es');
  const [email, setEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const t = copy[language];

  const handleEarlyAccess = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent('NauticMixxx — Early access');
    const body = encodeURIComponent(`Hi Nautic Studio,\n\nI would like to receive NauticMixxx updates.\nMy email: ${email}`);
    setFormMessage(t.openingMail);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const switchLanguage = () => {
    const nextLanguage = language === 'es' ? 'en' : 'es';
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
    setFormMessage('');
  };

  return (
    <div className="site-shell" id="top">
      <div className="grain" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="NauticMixxx — home">
          <img src="/app-icon.svg" width="38" height="38" alt="" />
          <span>NauticMixxx</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#vision">{t.navVision}</a>
          <a href="#experience">{t.navExperience}</a>
          <a href="#access">{t.navAccess}</a>
        </nav>
        <div className="header-actions">
          <button className="language-button" onClick={switchLanguage} type="button" aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a español'}>
            {language === 'es' ? 'EN' : 'ES'}
          </button>
          <a className="header-cta" href="#access">{t.navCta}<ChevronRight size={14} /></a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-glow" aria-hidden="true" />
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="eyebrow"><Sparkles size={13} />{t.eyebrow}</div>
            <h1>{t.titleA}<br /><em>{t.titleB}</em></h1>
            <p>{t.hero}</p>
            <div className="hero-actions">
              <a className="button button--primary" href="#access">{t.requestAccess}<ArrowRight size={17} /></a>
              <a className="button button--quiet" href="#vision">{t.explore}<ArrowDown size={16} /></a>
            </div>
            <div className="hero-meta">
              <span><i />{t.comingSoon}</span>
              <small>{t.status}</small>
            </div>
          </motion.div>

          <motion.div
            className="hero-product"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="preview-caption"><span>{t.previewLabel}</span><span><MousePointer2 size={12} />{t.previewHint}</span></div>
            <MixerPreview labels={t.channels} />
          </motion.div>

          <div className="trust-row" aria-label="Product principles">
            <span><Headphones size={16} />{t.local}</span>
            <span><Check size={16} />{t.private}</span>
            <span><Sparkles size={16} />{t.focused}</span>
          </div>
        </section>

        <section className="vision section" id="vision">
          <div className="section-intro">
            <span className="section-number">01</span>
            <div>
              <p className="section-eyebrow">{t.visionEyebrow}</p>
              <h2>{t.visionTitle}</h2>
              <p>{t.visionText}</p>
            </div>
          </div>

          <div className="principle-grid">
            <article className="principle-card principle-card--wide">
              <span className="card-icon"><AudioLines size={19} /></span>
              <div className="balance-visual" aria-hidden="true">
                <span className="balance-axis" />
                {[28, 48, 72, 58, 82, 64, 38, 74, 52, 32, 68, 44].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
              </div>
              <h3>{t.cardOneTitle}</h3>
              <p>{t.cardOneText}</p>
            </article>
            <article className="principle-card principle-card--dark">
              <span className="card-icon"><SlidersHorizontal size={19} /></span>
              <div className="dial-visual" aria-hidden="true"><i /><span>72</span></div>
              <h3>{t.cardTwoTitle}</h3>
              <p>{t.cardTwoText}</p>
            </article>
            <article className="principle-card principle-card--accent">
              <span className="card-icon"><Gauge size={19} /></span>
              <div className="context-visual" aria-hidden="true">
                <strong>−8.2</strong><small>LUFS</small><span><i /></span>
              </div>
              <h3>{t.cardThreeTitle}</h3>
              <p>{t.cardThreeText}</p>
            </article>
          </div>
        </section>

        <section className="experience section" id="experience">
          <div className="experience-copy">
            <p className="section-eyebrow">{t.experienceEyebrow}</p>
            <h2>{t.experienceTitle}</h2>
            <p>{t.experienceText}</p>
            <ul>
              {[t.pointOne, t.pointTwo, t.pointThree].map((point) => <li key={point}><Check size={15} />{point}</li>)}
            </ul>
          </div>
          <div className="media-placeholder">
            <div className="placeholder-grid" aria-hidden="true" />
            <button type="button" aria-label="Product film placeholder"><Play size={20} fill="currentColor" /></button>
            <div><strong>{t.mediaPlaceholder}</strong><span>{t.mediaHint}</span></div>
          </div>
        </section>

        <section className="access section" id="access">
          <div className="access-orbit" aria-hidden="true"><BrandMark /><i /><i /></div>
          <div className="access-content">
            <p className="section-eyebrow">{t.accessEyebrow}</p>
            <h2>{t.accessTitle}</h2>
            <p>{t.accessText}</p>
            <form onSubmit={handleEarlyAccess}>
              <label className="sr-only" htmlFor="early-access-email">Email</label>
              <Mail size={18} aria-hidden="true" />
              <input
                id="early-access-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t.emailPlaceholder}
              />
              <button type="submit">{t.send}<ArrowRight size={16} /></button>
            </form>
            {formMessage ? <p className="form-message" role="status">{formMessage}</p> : null}
            <small><CircleHelp size={13} />{t.mailNote}</small>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand" href="#top"><img src="/app-icon.svg" width="34" height="34" alt="" /><span>NauticMixxx</span></a>
        <p>{t.footerLine}</p>
        <a href="#top">{t.backTop}<ArrowRight size={14} /></a>
      </footer>
    </div>
  );
}
