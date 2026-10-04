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

## Automatic NauticMixxx releases

Both websites use GitHub's public `releases/latest` API for `nauticsoftware/NauticMixxx`, which selects the latest published release and excludes drafts and prereleases. Publish a normal GitHub Release to update the websites; changing a Git tag or the README alone does not publish a release.

- `npm run build` / `npm run dev` first run `scripts/prepare-release.mjs`. This retrieves the release and its uploaded assets into `src/lib/release/snapshot.json`. Versions, release URLs, installer names, source and checksums come from that response; no manual version edits are required.
- The generated static HTML includes this version before JavaScript loads. `public/release-snapshot.json` is generated for inspection and is not committed.
- After hydration, `useNauticRelease` checks GitHub from the browser, with a five-minute cache, shared requests, and refreshes while the page is visible or regains focus. Version labels, download links and `SoftwareApplication` structured data update together.
- Missing installers point to the release page with “View downloads”; missing checksums are omitted. Only uploaded assets from the official repository are accepted. No asset filename is invented.
- A browser API failure keeps the most recent validated response or the compiled snapshot. During local builds, an API failure uses the checked-in snapshot. CI instead stops the deployment, preserving the live site if GitHub is unavailable.
- GitHub Actions also rebuilds and publishes hourly, so static HTML and SEO catch up without a website commit. Scheduled runs are subject to GitHub queue delays and default-branch schedule policies; browser updates continue independently.
- `GITHUB_TOKEN` is used only in Node during CI, never shipped to the browser. The browser uses the public endpoint; API rate limits or offline access can delay refreshes.

Run `npm run test:release` to verify a future release with renamed assets, missing installers, rate limits, caching, storage failures and synchronized structured data. The release integration under `src/lib/release/` is intentionally identical in both independent website repositories; keep it synchronized when changing the mechanism.

Release notes use the official release title and link. Product feature descriptions and screenshots remain editorial content and should be reviewed if the product changes its capabilities.

## Publicación

El workflow `.github/workflows/deploy.yml` compila y publica automáticamente el contenido de `dist` en GitHub Pages después de cada push a `main`, cada hora o mediante ejecución manual. El archivo `public/CNAME` configura el dominio `nauticmixxx.nauticboy.top`.

En el proveedor DNS de `nauticboy.top`, el subdominio debe tener un registro `CNAME` que apunte a `nauticstudio.github.io`.
