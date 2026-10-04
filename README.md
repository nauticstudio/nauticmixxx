# NauticMixxx Web

Landing de NauticMixxx. Está construida como una aplicación Vite + React independiente para publicarse en `nauticmixxx.nauticboy.top`.

## Desarrollo

```bash
npm install
npm run dev
```

## Contenido y recursos

- `public/media/`: capturas de inicio y PERFORMANCE del [README oficial](https://github.com/nauticsoftware/NauticMixxx/blob/56267f5f838a555f97e734bc3b5223d7eaa6fe70/README.md), copiadas de `branding/NauticMixxx_Home.png` y `branding/NauticMixxx_Performance.png`. Se muestran completas con versiones WebP sin pérdida. Las capturas adicionales de waveforms y navegador se identifican como históricas.
- `src/App.tsx`, componente `ScreenshotViewer`: visualizador interactivo de capturas de la aplicación con pestañas y zoom lightbox.
- `branding/`: fuente del icono oficial de NauticMixxx, verificada por SHA-256 contra el repositorio del producto.
- `public/icons/`: tamaños del icono oficial para cabecera, footer, favicon, Apple Touch y datos estructurados.
- `index.html`: canonical, metadatos Open Graph y Twitter Cards con imagen de previsualización social.

## SEO y páginas estáticas

`npm run build` compila Vite y ejecuta `scripts/prerender.mjs`. Genera el contenido completo en `dist/index.html` (español) y `dist/en/index.html` (inglés). React hidrata ese HTML para activar las pestañas y el zoom. Los enlaces de idioma son URLs rastreables; cada versión tiene metadatos propios, canonical, hreflang y datos estructurados.

`src/product.ts` centraliza URLs, versión y metadatos. `public/sitemap.xml` contiene las dos páginas y debe actualizar su `lastmod` cuando cambie el contenido. Las imágenes visibles usan WebP sin pérdida y versiones adaptadas al tamaño de pantalla; los PNG originales se conservan para las previsualizaciones sociales.

Ver [SEO.md](SEO.md) para la auditoría y los pasos de indexación después de publicar.

Las afirmaciones de producto y los enlaces de descarga se contrastaron con el [README de NauticMixxx 1.5.0](https://github.com/nauticsoftware/NauticMixxx/blob/v1.5.0/README.md), su [release](https://github.com/nauticsoftware/NauticMixxx/releases/tag/v1.5.0), la [guía de controladoras](https://github.com/nauticsoftware/NauticMixxx/blob/v1.5.0/docs/CONTROLLERS-RX3-1.5-EN.md) y el [informe de pruebas](https://github.com/nauticsoftware/NauticMixxx/blob/v1.5.0/TEST_REPORT.md). Al publicar otra versión, actualizar `RELEASE_VERSION` en `src/product.ts`, los enlaces y el contenido bilingüe de `src/App.tsx`.

## Publicación

El workflow `.github/workflows/deploy.yml` compila y publica automáticamente el contenido de `dist` en GitHub Pages después de cada push a `main`. El archivo `public/CNAME` configura el dominio `nauticmixxx.nauticboy.top`.

En el proveedor DNS de `nauticboy.top`, el subdominio debe tener un registro `CNAME` que apunte a `nauticstudio.github.io`.
