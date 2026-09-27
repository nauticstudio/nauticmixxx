# NauticMixxx Web

Landing de lanzamiento de NauticMixxx. Está construida como una aplicación Vite + React independiente para publicarse en `nauticmixxx.nauticboy.top`.

## Desarrollo

```bash
npm install
npm run dev
```

## Contenido y recursos

- `public/media/`: capturas reales de NauticMixxx v1.0.0 (`nauticmixxx-waveforms.png`, `nauticmixxx-browser.png`, `nauticmixxx-standby.png`).
- `src/App.tsx`, componente `ScreenshotViewer`: visualizador interactivo de capturas de la aplicación con pestañas y zoom lightbox.
- `public/app-icon.svg`: icono de la marca y favicon.
- `index.html`: canonical, metadatos Open Graph y Twitter Cards con imagen de previsualización social.

El formulario no simula una base de datos: prepara un email real en el cliente de correo del visitante. Cuando exista un servicio de newsletter o waitlist, el manejador `handleEarlyAccess` es el punto de integración.

## Publicación

El workflow `.github/workflows/deploy.yml` compila y publica automáticamente el contenido de `dist` en GitHub Pages después de cada push a `main`. El archivo `public/CNAME` configura el dominio `nauticmixxx.nauticboy.top`.

En el proveedor DNS de `nauticboy.top`, el subdominio debe tener un registro `CNAME` que apunte a `nauticstudio.github.io`.
