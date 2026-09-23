# JulienTAP Portfolio

Personal portfolio site for JulienTAP, deployed to GitHub Pages at https://julientap.github.io. The repo is a GitHub **user page** (`<username>.github.io`), so it serves at the domain root, not under a project path.

## Language

**Portfolio**:
The site itself — a single-page React app showcasing JulienTAP's work, structured as full-viewport scroll-snap sections.
_Avoid_: site, page, app (use these for the literal HTML/React meaning)

**User page**:
A GitHub Pages repo named `<username>.github.io` that serves at the domain root (`https://julientap.github.io/`), as opposed to a project page which serves under `/<repo>/`. This decides the Vite `base` config.
_Avoid_: personal page, main page

**Theme tokens**:
The set of CSS custom properties (`--background`, `--foreground`, `--primary`, etc.) defined in `src/index.css` that shadcn/ui components consume. Light values live under `:root`; dark values apply via `@media (prefers-color-scheme: dark) :root:not(.light)` (browser preference) or the `.dark` class (forced).
_Avoid_: color variables, theme variables

**Soup**:
The random initial population of the Game of Life canvas (~20% of cells). It stands in for "the mess" — the About-page metaphor for unstructured problems. Do not confuse with **patterns** (curated structures like gliders/pulsars), which live in `PATTERNS` in `src/lib/game-of-life.ts` but are NOT stamped on startup.
_Avoid_: random seed, initial state

**Section**:
A full-viewport routing unit (`src/components/Section.tsx`: `h-svh snap-start snap-always`). Order: about → skills → work → education → experience → contact. Each lives in `src/sections/`.

## What's built

- **Scroll-snap SPA** (`src/App.tsx`): `<main>` with `snap-y snap-mandatory`, one `<Section>` per route, hidden scrollbar. Also owns the **background fade**: an `onScroll` handler sets the Game of Life wrapper's opacity to `max(0, 1 - progress) ** 2` (ease-out, clamped) so the canvas is visible on About only.
- **Game of Life background** (`src/lib/game-of-life.ts` + `src/hooks/useGameOfLife.ts` + `src/components/GameOfLifeBackground.tsx`): toroidal `Uint8Array` double-buffer engine, soup-seeded, rAF loop with time-accumulator (6 gen/s), dirty-cell redraw diffed against a `renderedState` array (NOT `engine.previous` — multi-step frames made that stale), `getComputedStyle` colors re-read on OS-theme change AND `.dark`/`.light` class mutations (MutationObserver). Zero animation deps.
- **Landing page** (`src/sections/About.tsx`): glass-card hero (badge "available", large name, `RotatingTitle` cycling 4 domains, location + bio placeholders), bottom-right glass card with CTA button scrolling to `#skills`. Reveals via `Reveal` (IntersectionObserver + CSS transition, staggered).
- **Header** (`src/components/Header.tsx`): desktop = centered nav + `ThemeSwitch` right; mobile = floating hamburger → right side panel (theme switch top-left, routes in big text). Active section tracked by IntersectionObserver.
- **Three-state theme** (`src/components/ThemeSwitch.tsx`): light / dark / browser-preference, persisted to `localStorage('theme')`, applied pre-mount by an inline script in `index.html` (anti-FOUC). See [ADR-0002](docs/adr/0002-three-state-theme-switch.md).
- **Footer** (`src/components/Footer.tsx`): only on Contact (pinned inside that section, which needs `relative`). Brand icons via **react-icons** (`FaGithub`, `FaLinkedin`, `FaInstagram`) — lucide v1+ ships no brand icons and Simple Icons dropped LinkedIn. Social hrefs are `#` placeholders.

## Stack

- **Vite 8** + **React 19** + **TypeScript 6**
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin, not PostCSS) + **shadcn/ui** (New York style)
- **oxlint** for linting, **Prettier** for formatting (with `prettier-plugin-tailwindcss` for class sorting)
- **pnpm 11** as package manager (pinned via `packageManager` field for Corepack)
- Path alias `@/*` → `./src/*` (configured in `vite.config.ts` and both `tsconfig*.json`)
- **react-icons** for brand icons; **lucide-react** for everything else

## Repo layout

```
src/
  App.tsx            # Scroll-snap shell + background fade logic
  main.tsx           # Entry point, mounts <App /> (StrictMode on)
  index.css          # Tailwind + theme tokens (3-state) + keyframes/reveal utilities
  sections/          # One component per route (About, Skills, Work, Education, Experience, Contact)
  components/        # Header, ThemeSwitch, Footer, Section, GameOfLifeBackground,
                     #   RotatingTitle, Reveal, ui/ (shadcn: badge, button)
  hooks/
    useGameOfLife.ts # Canvas lifecycle: rAF, resize, DPR, theme-color re-reads
  lib/
    game-of-life.ts  # Engine + PATTERNS + seedRandomPatterns (unused on startup, kept for later)
    utils.ts         # cn() helper
public/
  favicon.svg        # Custom "J" favicon
docs/
  adr/               # Architecture Decision Records
  research/          # Cited research notes (game-of-life.md, about-page-animations.md)
.github/workflows/
  deploy.yml         # Build + deploy to GitHub Pages on push to main
components.json      # shadcn/ui CLI config
```

## Decisions recorded

- [ADR-0001: Auto dark mode via CSS media query](docs/adr/0001-auto-dark-mode.md) (superseded)
- [ADR-0002: Three-state theme switch](docs/adr/0002-three-state-theme-switch.md)

## Research notes

- [docs/research/game-of-life.md](docs/research/game-of-life.md) — rules, canvas rendering, rAF lifecycle, performance patterns (cited)
- [docs/research/about-page-animations.md](docs/research/about-page-animations.md) — CSS vs Framer Motion, reveal patterns, readability over canvas (cited)
