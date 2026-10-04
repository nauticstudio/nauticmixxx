import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const root = document.getElementById('root')!;
const language = /^\/en(?:\/|$)/.test(window.location.pathname) ? 'en' : 'es';
const app = <StrictMode><App initialLanguage={language} /></StrictMode>;

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
