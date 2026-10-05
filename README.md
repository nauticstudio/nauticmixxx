# NauticMixxx Web

## Tu USB de Rekordbox. Directo a la pista.

NauticMixxx es una aplicación DJ de código abierto para macOS y Windows, basada en Mixxx 2.5.6 y con una interfaz inspirada en la XDJ-RX3. Conectá un USB exportado por Rekordbox, navegá tus playlists y cargá pistas en dos decks para practicar o preparar tu próximo set.

**[Visitar la web](https://nauticmixxx.nauticboy.top/) · [English](https://nauticmixxx.nauticboy.top/en/) · [Descargar NauticMixxx](https://github.com/nauticsoftware/NauticMixxx/releases/latest)**

![NauticMixxx reproduciendo dos pistas con formas de onda y Hot Cues](public/media/nauticmixxx-waveforms-playing.webp)

**USB en modo lectura · Sin escaneo local · Sin registro · Código abierto**

## Preparaste el set una vez. Usalo en todas partes.

La web presenta un flujo de trabajo pensado para DJs que preparan su música en Rekordbox y quieren usar esa preparación en una computadora con controladoras DJ.

- **Lectura directa del USB.** Navegación del catálogo y las playlists exportadas por Rekordbox, sin importar las pistas a la colección local.
- **Tu preparación, a la vista.** Formas de onda, beatgrid, overviews y hasta ocho Hot Cues por deck.
- **Dos decks para mezclar.** Tiempo restante, BPM, tempo y controles de reproducción, junto con la sección Beat FX.
- **Control desde el hardware.** Mapeo dedicado para Hercules Inpulse 500 y presets RX3 para distintas controladoras Pioneer y Roland.
- **Descargas y documentación.** Acceso a instaladores, código fuente, notas de versión, guías e informes de pruebas publicados en GitHub.

## La interfaz en acción

En la web podés ver la reproducción y la navegación como animaciones continuas, en bucle y sin sonido. También podés recorrer las capturas y ampliarlas para observar los detalles de la interfaz.

[Explorar la galería y las animaciones](https://nauticmixxx.nauticboy.top/#screens)

| Navegador Rekordbox | Mezcla y formas de onda |
| --- | --- |
| ![Playlists y previsualización de pistas](public/media/nauticmixxx-browser.webp) | ![Dos decks durante una mezcla](public/media/nauticmixxx-waveforms-mixing.webp) |
| Playlists, pistas y previews de formas de onda. | Beatgrid, tempo y formas de onda de ambos decks. |

### Antes de cargar las pistas

![Pantalla de inicio de NauticMixxx con ambos decks vacíos](public/media/nauticmixxx-empty-decks.webp)

### Los controles de los dos decks

![Detalle de tiempo restante, tempo, BPM y Hot Cues](public/media/nauticmixxx-decks-overview.webp)

## Tu USB permanece intacto

El flujo USB está diseñado para operar en modo lectura. NauticMixxx no reescribe el audio, los metadatos, las playlists ni los análisis del dispositivo, y mantiene su catálogo como una sesión transitoria.

La colección local queda fuera de este navegador. Conservá una copia de seguridad de tu USB de trabajo y detené la reproducción antes de expulsarlo desde el sistema operativo.

## Descargá NauticMixxx

La web muestra la última versión publicada en GitHub y enlaza los archivos disponibles de esa release.

| Plataforma | Descarga |
| --- | --- |
| macOS Apple Silicon | Instalador para ARM64. |
| Windows x64 | Instalador nativo para Windows. |
| Código fuente | Fuentes para compilar y revisar el proyecto. |

**[Ver la última release y sus descargas](https://github.com/nauticsoftware/NauticMixxx/releases/latest)**

Desde la sección de descargas también podés consultar las notas de versión, el informe de pruebas y los checksums cuando estén disponibles. Revisá las indicaciones de instalación de cada release: las builds comunitarias pueden mostrar avisos de seguridad del sistema.

## Cómo empezar

1. **Instalá la aplicación.** Descargá el instalador correspondiente a tu sistema desde la última release.
2. **Configurá la salida de audio.** Elegí tu dispositivo y los canales en `Preferences → Sound Hardware`. Si usás una controladora, revisá su configuración en `Controllers`.
3. **Conectá tu USB exportado por Rekordbox.** Esperá a que termine de cargar el catálogo y abrí `SOURCE`.
4. **Navegá y cargá una pista.** Seleccioná una playlist, pulsá `ENTER` para abrir sus pistas y usá `LOAD 1/2` para cargar el deck correspondiente.

La web incluye enlaces a la guía de instalación, la guía de controladoras y el [canal de soporte en GitHub](https://github.com/nauticsoftware/NauticMixxx/issues).

## Preguntas frecuentes

**¿NauticMixxx se instala en una Pioneer XDJ-RX3?**

Se ejecuta en tu computadora. No se instala en equipos Pioneer ni modifica su firmware.

**¿Qué controladoras se presentan en la web?**

Hercules Inpulse 500 tiene un mapeo dedicado. La web también presenta presets para DDJ-400, DDJ-SX, DDJ-SX2, DDJ-SX3, DDJ-WeGO3, DDJ-FLX4 y Roland DJ-505. La validación física de esos presets está pendiente; SX3 es experimental. Consultá la guía y el informe de pruebas de la release para conocer sus límites.

**¿Dónde encuentro los instaladores actualizados?**

En [GitHub Releases](https://github.com/nauticsoftware/NauticMixxx/releases/latest). Si una release no incluye un instalador para tu plataforma, la web lleva a sus descargas disponibles.

## Software libre y créditos

NauticMixxx es un proyecto comunitario independiente. La adaptación se distribuye bajo GNU GPL v3.0 y el motor Mixxx 2.5.6 bajo GNU GPL v2.0 o posterior. El [proyecto de NauticMixxx](https://github.com/nauticsoftware/NauticMixxx) publica el código, los parches y las atribuciones.

No está afiliado, patrocinado, certificado ni respaldado por AlphaTheta, Pioneer DJ, Hercules, rekordbox ni el proyecto Mixxx. Los nombres y marcas describen compatibilidad, procedencia técnica o flujo de trabajo.

<details>
<summary>Desarrollo de la web</summary>

La web está construida con React y Vite, con contenido en español e inglés.

```bash
npm install
npm run dev
npm run build
```

</details>
