import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const root = resolve(import.meta.dirname, '..');
const server = await createServer({
  root,
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true },
  appType: 'custom',
});

const escapeAttribute = (value) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const product = await server.ssrLoadModule('/src/product.ts');
  const template = await readFile(resolve(root, 'dist/index.html'), 'utf8');
  const headMarker = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/;
  if (!template.includes('<div id="root"></div>') || !headMarker.test(template)) {
    throw new Error('The HTML template must contain the root and SEO markers.');
  }

  for (const [language, seo] of Object.entries(product.PAGE_SEO)) {
    const canonical = product.SITE_URL + seo.path;
    const preview = product.SITE_URL + '/media/nauticmixxx-performance.png';
    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': product.SITE_URL + '/#website',
          name: 'NauticMixxx',
          url: product.SITE_URL + '/',
          inLanguage: ['es', 'en'],
        },
        {
          '@type': 'SoftwareApplication',
          '@id': product.SITE_URL + '/#software',
          name: 'NauticMixxx',
          url: product.SITE_URL + '/',
          description: seo.description,
          image: product.SITE_URL + '/icons/nauticmixxx-512.png',
          applicationCategory: 'MultimediaApplication',
          operatingSystem: 'macOS Apple Silicon, Windows x64',
          softwareVersion: product.RELEASE_VERSION,
          license: product.SOURCE_REPO + '/blob/v' + product.RELEASE_VERSION + '/LICENSE.md',
          sameAs: product.SOURCE_REPO,
          softwareHelp: product.INSTALLATION_GUIDE,
          downloadUrl: [product.MAC_DOWNLOAD, product.WINDOWS_DOWNLOAD],
          releaseNotes: product.RELEASE_PAGE,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: product.RELEASE_PAGE },
        },
        {
          '@type': 'WebPage',
          '@id': canonical + '#webpage',
          url: canonical,
          name: seo.title,
          description: seo.description,
          inLanguage: language,
          isPartOf: { '@id': product.SITE_URL + '/#website' },
          mainEntity: { '@id': product.SITE_URL + '/#software' },
        },
      ],
    };
    const metadata = [
      '<!-- seo:start -->',
      '<title>' + escapeAttribute(seo.title) + '</title>',
      '<meta name="description" content="' + escapeAttribute(seo.description) + '" />',
      '<meta name="robots" content="index, follow, max-image-preview:large" />',
      '<link rel="canonical" href="' + canonical + '" />',
      '<link rel="alternate" hreflang="es" href="' + product.SITE_URL + '/" />',
      '<link rel="alternate" hreflang="en" href="' + product.SITE_URL + '/en/" />',
      '<link rel="alternate" hreflang="x-default" href="' + product.SITE_URL + '/" />',
      '<meta property="og:site_name" content="NauticMixxx" />',
      '<meta property="og:title" content="' + escapeAttribute(seo.title) + '" />',
      '<meta property="og:description" content="' + escapeAttribute(seo.description) + '" />',
      '<meta property="og:type" content="website" />',
      '<meta property="og:url" content="' + canonical + '" />',
      '<meta property="og:locale" content="' + seo.locale + '" />',
      '<meta property="og:locale:alternate" content="' + (language === 'es' ? 'en_US' : 'es_AR') + '" />',
      '<meta property="og:image" content="' + preview + '" />',
      '<meta property="og:image:width" content="1392" />',
      '<meta property="og:image:height" content="874" />',
      '<meta property="og:image:alt" content="' + (language === 'es' ? 'Vista PERFORMANCE de NauticMixxx del README oficial' : 'NauticMixxx PERFORMANCE view from the official README') + '" />',
      '<meta name="twitter:card" content="summary_large_image" />',
      '<meta name="twitter:title" content="' + escapeAttribute(seo.title) + '" />',
      '<meta name="twitter:description" content="' + escapeAttribute(seo.description) + '" />',
      '<meta name="twitter:image" content="' + preview + '" />',
      '<script type="application/ld+json">' + JSON.stringify(graph).replace(/</g, '\\u003c') + '</script>',
      '<!-- seo:end -->',
    ].join('\n    ');
    const content = renderToString(React.createElement(App, { initialLanguage: language }));
    const html = template
      .replace('<html lang="es">', '<html lang="' + language + '">')
      .replace(headMarker, metadata)
      .replace('<div id="root"></div>', '<div id="root">' + content + '</div>');
    const destination = resolve(root, 'dist', language === 'es' ? 'index.html' : 'en/index.html');
    await mkdir(resolve(destination, '..'), { recursive: true });
    await writeFile(destination, html);
    console.log('Prerendered ' + seo.path + ' (' + language + ')');
  }
} finally {
  await server.close();
}
