# NauticMixxx

## Your Rekordbox USB. Straight to the dancefloor.

NauticMixxx is an open-source DJ application for macOS and Windows, based on Mixxx 2.5.6 and featuring an interface inspired by the XDJ-RX3. Plug in a Rekordbox-exported USB drive, browse your playlists, and load tracks onto two decks to practice or prepare your next set.

**[Visit Website](https://nauticmixxx.nauticboy.top/) · [English](https://nauticmixxx.nauticboy.top/en/) · [Download NauticMixxx](https://github.com/nauticsoftware/NauticMixxx/releases/latest)**

![NauticMixxx playing two tracks with waveforms and Hot Cues](public/media/nauticmixxx-waveforms-playing.webp)

**Read-only USB · No local library scan · No registration · Open source**

## Prepare your set once. Play it anywhere.

The website presents a workflow designed for DJs who prepare their music in Rekordbox and want to bring that preparation to a computer with DJ controllers.

- **Direct USB reading.** Browse your Rekordbox-exported catalog and playlists without importing tracks into the local library.
- **Your prep work, front and center.** Waveforms, beatgrids, track overviews, and up to eight Hot Cues per deck.
- **Two mixing decks.** Remaining time, BPM, tempo, and playback controls, along with the Beat FX section.
- **Hardware control.** Dedicated mapping for Hercules Inpulse 500 and RX3 presets for various Pioneer and Roland controllers.
- **Downloads and documentation.** Access installers, source code, release notes, guides, and test reports published on GitHub.

## The interface in action

On the website, you can view playback and navigation as continuous, silent looping animations. You can also explore the screenshots and zoom in to inspect interface details.

[Explore the gallery and animations](https://nauticmixxx.nauticboy.top/#screens)

| Rekordbox Browser | Mixing & Waveforms |
| --- | --- |
| ![Playlists and track preview](public/media/nauticmixxx-browser.webp) | ![Two decks during a mix](public/media/nauticmixxx-waveforms-mixing.webp) |
| Playlists, tracks, and waveform previews. | Beatgrid, tempo, and waveforms for both decks. |

### Before loading tracks

![NauticMixxx home screen with both decks empty](public/media/nauticmixxx-empty-decks.webp)

### Dual-deck controls

![Detail of remaining time, tempo, BPM, and Hot Cues](public/media/nauticmixxx-decks-overview.webp)

## Your USB remains untouched

The USB workflow is designed to operate in read-only mode. NauticMixxx does not rewrite audio files, metadata, playlists, or analysis data on the drive, maintaining its catalog as a transient session.

The local library remains outside of this browser. Keep a backup of your working USB drive and stop playback before ejecting it from your operating system.

## Download NauticMixxx

The website displays the latest release published on GitHub and links to the available files for that release.

| Platform | Download |
| --- | --- |
| macOS Apple Silicon | ARM64 installer. |
| Windows x64 | Native Windows installer. |
| Source code | Source files to build and review the project. |

**[View the latest release and downloads](https://github.com/nauticsoftware/NauticMixxx/releases/latest)**

From the downloads section, you can also review release notes, test reports, and checksums when available. Please check the installation instructions for each release: community builds may trigger operating system security warnings.

## Getting started

1. **Install the application.** Download the installer for your operating system from the latest release.
2. **Configure audio output.** Select your device and channels in `Preferences → Sound Hardware`. If using a controller, configure it under `Controllers`.
3. **Connect your Rekordbox-exported USB drive.** Wait for the catalog to finish loading and open `SOURCE`.
4. **Browse and load a track.** Select a playlist, press `ENTER` to view its tracks, and use `LOAD 1/2` to load the corresponding deck.

The website includes links to the installation guide, controller guide, and the [GitHub support channel](https://github.com/nauticsoftware/NauticMixxx/issues).

## Frequently Asked Questions

**Does NauticMixxx install directly on a Pioneer XDJ-RX3?**

It runs on your computer. It does not install on Pioneer hardware or modify its firmware.

**Which controllers are featured on the website?**

The Hercules Inpulse 500 has a dedicated mapping. The website also provides presets for DDJ-400, DDJ-SX, DDJ-SX2, DDJ-SX3, DDJ-WeGO3, DDJ-FLX4, and Roland DJ-505. Physical testing for these presets is pending; SX3 is experimental. Refer to the release guide and test report to check their current limitations.

**Where can I find the latest installers?**

On [GitHub Releases](https://github.com/nauticsoftware/NauticMixxx/releases/latest). If a release does not include a prebuilt installer for your platform, the website directs you to its available downloads.

## Open Source & Credits

NauticMixxx is an independent community project. The adaptation is distributed under GNU GPL v3.0, and the Mixxx 2.5.6 engine is under GNU GPL v2.0 or later. The [NauticMixxx project](https://github.com/nauticsoftware/NauticMixxx) publishes the source code, patches, and attributions.

It is not affiliated with, sponsored by, certified, or endorsed by AlphaTheta, Pioneer DJ, Hercules, rekordbox, or the Mixxx project. Brand and product names are used solely to describe compatibility, technical origin, or workflow.

<details>
<summary>Website development</summary>

The website is built with React and Vite, with content available in English and Spanish.
