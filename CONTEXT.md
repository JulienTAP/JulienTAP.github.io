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
The random initial population of the Game of Life canvas on the **Intro** page (~20% of cells). It stands in for "the mess" — the Intro-page metaphor for unstructured problems. Do not confuse with **patterns** (curated structures like gliders/pulsars), which live in `PATTERNS` in `src/lib/game-of-life.ts` and are stamped by the **ornament engine**, not by the soup.
_Avoid_: random seed, initial state

**Intro**:
The brief landing overlay (`src/sections/Intro.tsx`): full-screen soup canvas with no text or CTA. Plays on every page load (~1.65s total, skipped immediately under `prefers-reduced-motion: reduce`), then automatically simplifies via cellular-automaton decay (`conway` → `stabilize` B∅/S23 → `erode` B∅/S3 → `extinguish` B∅/S∅) until the grid clears to empty background, unmounting the overlay and unlocking the portfolio underneath.
_Avoid_: landing page, splash screen

**Portfolio-ready**:
The `PortfolioReadyContext` boolean (default `true`, set from App's `introDone` state). `Reveal` won't observe or reveal anything while it's `false`; `RotatingTitle` mounts only when ready; `GameOfLifePatternBackground` passes it as `active` so ornament engines don't run during the Intro.
_Avoid_: introDone flag, ready state

**Ornament engine**:
The scoped, bounded Game of Life renderer (`src/hooks/useGameOfLifePattern.ts` + `GameOfLifePatternBackground`): a small non-toroidal engine sized to one pattern + padding, stamped once, stepped forever at ~3 gen/s. Pauses via IntersectionObserver when its section is off-screen and sleeps (`active` gate) until the portfolio is ready. Hidden below `sm` — on phones the pattern dominated 65% of the viewport and collided with content, so mobile keeps a plain background. Currently one pulsar top-right on About and Work (removed from Skills, Education, Experience, and Contact); per-section pattern/position configs come later.
_Avoid_: static background, mini game

**Section**:
A full-viewport routing unit (`src/components/Section.tsx`: `h-svh snap-start snap-always`). Order: about → skills → work → education → experience → contact. Each lives in `src/sections/`.

## What's built

- **Intro** (`src/sections/Intro.tsx`): fixed overlay with the animated soup (`useGameOfLife`) that runs for ~1s then self-simplifies through cellular automaton decay (`stabilize` → `erode` → `extinguish`) and unmounts at ~1.65s, destroying the soup engine and revealing the portfolio.
- **App shell** (`src/App.tsx`): owns `introDone`; provides `PortfolioReadyContext`; mounts `Header` and unlocks `<main>` scrolling only after the wipe; `<main>` is `inert` during the Intro.
- **Game of Life soup** (`src/lib/game-of-life.ts` + `src/hooks/useGameOfLife.ts` + `src/components/GameOfLifeBackground.tsx`): toroidal `Uint8Array` double-buffer engine, soup-seeded, rAF loop with time-accumulator (6 gen/s), dirty-cell redraw diffed against a `renderedState` array, `getComputedStyle` colors re-read on OS-theme change AND `.dark`/`.light` class mutations (shared `src/lib/theme-observer.ts`). Zero animation deps.
- **Ornament engine** (`src/hooks/useGameOfLifePattern.ts` + `GameOfLifePatternBackground.tsx`): bounded non-toroidal engine per ornament; pulsar top-right on About and Work (excluded on Skills, Education, Experience, and Contact); IntersectionObserver pauses off-screen engines; `active` gating means no computation during the Intro.
- **Education** (`src/sections/Education.tsx` + `src/lib/resume-data.ts`): pulsar removed; architectural staggered roadmap tree with current studies at the top (NTU Academic Exchange & Polytech Paris-Saclay M.Eng. highlighted via solid trunk/ring nodes) down to PeiP and Baccalaureate foundations, collapsing to a left-rail roadmap on mobile. No pill/badge clutter.
- **Experience** (`src/sections/Experience.tsx` + `src/lib/resume-data.ts`): pulsar removed; reverse-chronological horizontal peek carousel (Jeulin 2026 → LISN 2024 → 3SP Technologies 2023) with wide editorial cards (`lg:grid-cols-12` media placeholder + narrative + lorem ipsum expansion room + monospace stack footer), active card always horizontally centered (`snap-center`) with neighboring cards peeking on the sides for affordance, click/drag/swipe + right/left arrow navigation, and centered timeline year stops.
- **Landing hero** (`src/sections/About.tsx`): full-height editorial hero filling the viewport, left-anchored (never vertically centered — user decision): huge name, `RotatingTitle` cycling 4 domains (mounts only when portfolio-ready), location + bio pinned to the card's bottom edge via `mt-auto`. Reveals gated on portfolio-ready.
- **Skills** (`src/sections/Skills.tsx` + `src/lib/resume-data.ts`): pulsar removed; interactive 5-domain index (`01`–`05`: Languages, AI & Robotics, Web & UI, Systems & IoT, 3D & Engines) paired with a hairline-grid Spotlight Card showing real CV provenance/context per skill (with mobile underline tabs), followed by a 4-column spoken languages strip using Conway-cell proficiency squares (`French`, `English`, `Spanish`, `Mandarin`). No badge clutter.
- **Header** (`src/components/Header.tsx`): bar layout ≥`md` = labeled icon links pill (GitHub + Resume) + centered nav + `ThemeSwitch`, evenly distributed via flex `justify-between`; below `md` = floating hamburger → right side panel with `ThemeSwitch`, nav routes in big text, and the labeled GitHub/Resume links (`PanelLinks`) under the navigation. Icon SVGs in `public/icons/` (dark/light variants swapped via `useResolvedTheme`). GitHub href = `GITHUB_URL` (`https://github.com/JulienTAP`); resume downloads `/resume/out/CV-EN-JulienTAP.pdf` (from the `public/resume` git submodule) via the `download` attribute. Mounted only after the wipe (fade-in entrance). Active section tracked by IntersectionObserver.
- **Three-state theme** (`src/components/ThemeSwitch.tsx`): light / dark / browser-preference, persisted to `localStorage('theme')`, applied pre-mount by an inline script in `index.html` (anti-FOUC). See [ADR-0002](docs/adr/0002-three-state-theme-switch.md).
- **Contact** (`src/sections/Contact.tsx` + `src/lib/contact.ts`): pulsar ornament removed; left-anchored heading/subtitle matching the other sections above a horizontally and vertically centered pair of equal-height cards (`max-w-5xl`, `lg:grid-cols-[1fr_auto_1fr]`) separated by shadcn's `Separator` (horizontal on mobile, vertical on desktop). Left card houses direct email (`contact@julientap.dev`) + copy button and social channels (`GitHub`, `LinkedIn`, `Instagram`; LinkedIn/Instagram hrefs are still `#` placeholders); right card houses the contact form (`field-sizing-fixed` textarea) composing a pre-filled `mailto:contact@julientap.dev` draft on submit. Full-width flow-positioned `Footer` at the bottom prevents overlap on all viewport sizes.
- **Footer** (`src/components/Footer.tsx`): only on Contact — copyright + "made with ❤" line; socials moved to the Contact "Reach me directly" column.

## Stack

- **Vite 8** + **React 19** + **TypeScript 6**
- **Typography**: self-hosted **Archivo Black** (`public/fonts/`, single weight) as the display font for headings via the `font-display` utility (`--font-display` token); all other text keeps Tailwind's default sans stack
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin, not PostCSS) + **shadcn/ui** (New York style)
- **oxlint** for linting, **Prettier** for formatting (with `prettier-plugin-tailwindcss` for class sorting)
- **pnpm 11** as package manager (pinned via `packageManager` field for Corepack)
- Path alias `@/*` → `./src/*` (configured in `vite.config.ts` and both `tsconfig*.json`)
- **react-icons** for brand icons; **lucide-react** for everything else

## Repo layout

```
src/
  App.tsx            # Intro gate state + PortfolioReadyContext + scroll-snap shell
  main.tsx           # Entry point, mounts <App /> (StrictMode on)
  index.css          # Tailwind + theme tokens (3-state) + reveal/wipe keyframes
  context/
    portfolio-ready.ts # Portfolio-ready context + usePortfolioReady hook
  sections/          # Intro (gate) + one component per route (About, Skills, Work,
                     #   Education, Experience, Contact)
  components/        # Header, ThemeSwitch, Footer, Section, GameOfLifeBackground,
                     #   GameOfLifePatternBackground, RotatingTitle, Reveal,
                     #   ui/ (shadcn: badge, button, tooltip)
  hooks/
    useGameOfLife.ts       # Soup canvas lifecycle: rAF, resize, DPR, theme re-reads
    useGameOfLifePattern.ts # Bounded ornament engine: stamp once, step, pause off-screen
    useResolvedTheme.ts    # Effective light/dark across the three-state theme
  lib/
    game-of-life.ts  # Engine + PATTERNS + seedRandomPatterns (unused on startup, kept for later)
    contact.ts       # CONTACT_EMAIL + GITHUB_URL + CONTACT_CHANNELS (placeholders)
    resume-data.ts   # EDUCATION_ROADMAP + EXPERIENCES sourced from the CV submodule
    theme-observer.ts # readFillColor + observeThemeColor (shared by both GOL hooks)
    utils.ts         # cn() helper
public/
  favicon.svg        # Custom "J" favicon
docs/
  adr/               # Architecture Decision Records
  research/          # Cited research notes (game-of-life.md, about-page-animations.md)
.github/workflows/
  deploy.yml         # Build + deploy to GitHub Pages on push to main
components.json      # shadcn CLI config
```

## Decisions recorded

- [ADR-0001: Auto dark mode via CSS media query](docs/adr/0001-auto-dark-mode.md) (superseded)
- [ADR-0002: Three-state theme switch](docs/adr/0002-three-state-theme-switch.md)

## Research notes

- [docs/research/game-of-life.md](docs/research/game-of-life.md) — rules, canvas rendering, rAF lifecycle, performance patterns (cited)
- [docs/research/about-page-animations.md](docs/research/about-page-animations.md) — CSS vs Framer Motion, reveal patterns, readability over canvas (cited)
