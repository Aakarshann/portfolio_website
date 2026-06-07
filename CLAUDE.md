# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Site

No build step. Open `index.html` directly in a browser. For live-reload dev, any static server works:

```bash
python3 -m http.server 8000
# or
npx serve .
```

## Architecture

Single-page static site — no framework, no bundler, no dependencies to install.

- **`index.html`** — entire page structure; all sections (Home, About, Projects, Contact) live here as `<section id="...">` anchors
- **`assets/css/style.css`** — all styles; uses CSS custom properties (`:root` vars) for theming; `body.dark-theme` overrides swap the palette
- **`assets/js/main.js`** — all interactivity wrapped in one `DOMContentLoaded` listener; covers scroll header, active nav highlighting, dark/light theme (persisted via `localStorage`), skills accordion, qualification tabs, project filtering, ScrollReveal animations, scroll-up button, skill bar widths
- **`assets/img/`** — local project images; placeholder images use `placehold.co` URLs inline in HTML
- **`assets/pdf/`** — CV download target

## Key Patterns

**Theme system**: toggling `dark-theme` class on `<body>` drives all color changes via CSS vars. Theme preference stored in `localStorage` keys `selected-theme` and `selected-icon`.

**Skills bars**: widths are set via `data-width` attribute in HTML, applied by JS on load — not pure CSS — so changes to skill percentages require editing both the `data-width` attribute and the displayed `<span class="skills__number">` text.

**Project filtering**: cards carry CSS classes `professional` or `personal` alongside `mix`; the filter buttons use `data-filter` values (e.g. `.professional`) matched against card class names.

**ScrollReveal**: loaded from CDN (`unpkg.com/scrollreveal`); configured once in `main.js`; targets are comma-separated selectors passed to `sr.reveal()`.

## Content Updates

All content is hardcoded in `index.html`. To update:
- **Experience/Education**: edit `.qualification__data` blocks inside `#experience` / `#education`
- **Projects**: edit `.project__card` blocks; add `professional` or `personal` class for filtering
- **Skills**: edit `.skills__data` blocks; update both `data-width` and `skills__number` together
- **CV**: replace `assets/pdf/Aakarshan_Khadka_CV.pdf`
