# SEO de NauticMixxx

Auditoría y cambios del 3 de octubre de 2026. Objetivo: búsquedas de marca y de software DJ para leer USB exportados por Rekordbox. No se dispone de datos de Search Console, volumen de palabras clave ni métricas de tráfico; no se infieren posiciones a partir de esas ausencias.

## Hallazgos y cambios

| Prioridad | Evidencia | Cambio |
| --- | --- | --- |
| Alta | El dominio público devolvía HTML con un `root` vacío; contenido y enlaces dependían de JavaScript. | HTML completo generado durante la compilación e hidratado para las interacciones. |
| Alta | El inglés sólo existía detrás de un botón en la URL española. | Página `/en/`, enlace de idioma rastreable, metadatos por idioma y canonical propio. |
| Alta | El sitemap sólo incluía la página española. | Incluye `/` y `/en/`; hreflang recíproco y `x-default` en el HTML. |
| Media | El título no describía en español la intención principal y la descripción era extensa. | Títulos y descripciones centrados en NauticMixxx, software DJ y USB Rekordbox. |
| Media | La entrada animada ocultaba texto hasta la ejecución de React y aumentaba el paquete. | Contenido visible sin JavaScript; retirada de Motion del paquete. |
| Media | La página cargaba PNG completos incluso como miniaturas. | WebP sin pérdida, variantes de 512 px, miniaturas y carga diferida. |
| Media | Faltaban pasos concretos de instalación y navegación. | Guía visible de inicio, enlaces a documentación y soporte del repositorio. |

El dominio, robots.txt y sitemap respondieron HTTP 200 con HTTPS durante la auditoría. Una búsqueda `site:nauticmixxx.nauticboy.top` no devolvió resultados; esto no demuestra por sí solo que Google no haya indexado el sitio. El estado debe confirmarse mediante Search Console.

## Páginas y búsquedas objetivo

| URL | Idioma | Intención |
| --- | --- | --- |
| `/` | Español | NauticMixxx, descargar NauticMixxx, software DJ para USB Rekordbox, usar USB Rekordbox en Mixxx |
| `/en/` | Inglés | NauticMixxx download, DJ software for Rekordbox USB drives, Rekordbox USB browsing in Mixxx |

Las palabras se utilizan en títulos, descripciones y contenido útil, sin repetición artificial. No se crean páginas vacías para variantes de una misma búsqueda.

## Datos estructurados

La compilación incluye `WebSite`, `WebPage` y `SoftwareApplication`, con la versión, sistemas publicados, descarga gratuita, licencia y documentación reales. No hay valoraciones inventadas. Google exige una valoración o reseña para la elegibilidad del resultado enriquecido de software; el marcado actual describe el producto y no garantiza ese resultado.

## Después de publicar

1. Verificar una propiedad de dominio `nauticboy.top` en Google Search Console o la propiedad con prefijo `https://nauticmixxx.nauticboy.top/` si se prefiere limitar el alcance. La verificación requiere acceso del propietario.
2. Enviar `https://nauticmixxx.nauticboy.top/sitemap.xml`.
3. Inspeccionar `/` y `/en/`, ejecutar la prueba de URL publicada y solicitar indexación cuando el HTML nuevo esté público.
4. Revisar indexación, canonical elegido y consultas reales. Evaluar posiciones, impresiones y clics por página y consulta; el posicionamiento necesita tiempo de rastreo y señales externas.
5. Vincular esta web desde el README del repositorio del producto y desde la página de software de Nautic. Obtener menciones relevantes a través de documentación, demostraciones y pruebas reales del producto.

Las dos páginas estáticas y el 404 se publican con el workflow de GitHub Pages existente. Las comprobaciones locales no equivalen a Core Web Vitals de usuarios reales ni a una comprobación de indexación.

## Fuentes

- [Google: SEO con JavaScript y HTML prerenderizado](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google: páginas multilingües](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Google: hreflang y versiones localizadas](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google: títulos en los resultados](https://developers.google.com/search/docs/appearance/title-link)
- [Google: datos estructurados de software](https://developers.google.com/search/docs/appearance/structured-data/software-app)
