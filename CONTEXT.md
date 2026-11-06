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
The gated landing overlay (`src/sections/Intro.tsx`): full-screen soup canvas + centered glass card presenting the Conway inspiration and the "clean up the mess" pitch. Plays on every page load. It is a fixed overlay above the portfolio — the portfolio renders underneath but is inert (`<main inert>`), scroll-locked, and fully hidden until the **wipe** completes.
_Avoid_: landing page, splash screen

**Wipe**:
The curtain-lift transition from Intro to portfolio (`.intro-wipe` in `src/index.css`): card fades/lifts, then a `clip-path: inset()` transition raises the overlay's bottom edge upward. `onFinish` fires on `transitionend` (fallback timeout for reduced-motion) → the overlay unmounts, destroying the soup engine (no GOL computation afterward), and `introDone` flips.
_Avoid_: fade, scroll transition

**Portfolio-ready**:
The `PortfolioReadyContext` boolean (default `true`, set from App's `introDone` state). `Reveal` won't observe or reveal anything while it's `false`; `RotatingTitle` mounts only when ready; `GameOfLifePatternBackground` passes it as `active` so ornament engines don't run during the Intro.
_Avoid_: introDone flag, ready state

**Ornament engine**:
The scoped, bounded Game of Life renderer (`src/hooks/useGameOfLifePattern.ts` + `GameOfLifePatternBackground`): a small non-toroidal engine sized to one pattern + padding, stamped once, stepped forever at ~3 gen/s. Pauses via IntersectionObserver when its section is off-screen and sleeps (`active` gate) until the portfolio is ready. Hidden below `sm` — on phones the pattern dominated 65% of the viewport and collided with content, so mobile keeps a plain background. Currently one pulsar top-right per portfolio section; per-section pattern/position configs come later.
_Avoid_: static background, mini game

**Section**:
A full-viewport routing unit (`src/components/Section.tsx`: `h-svh snap-start snap-always`). Order: about → skills → work → education → experience → contact. Each lives in `src/sections/`.

## What's built

- **Intro gate** (`src/sections/Intro.tsx`): fixed overlay with the animated soup (existing `useGameOfLife`), centered glass card (Conway inspiration, mess metaphor, "Let's clean that" CTA) and the **wipe** to enter. Unmounting destroys the soup engine.
- **App shell** (`src/App.tsx`): owns `introDone`; provides `PortfolioReadyContext`; mounts `Header` and unlocks `<main>` scrolling only after the wipe; `<main>` is `inert` during the Intro.
- **Game of Life soup** (`src/lib/game-of-life.ts` + `src/hooks/useGameOfLife.ts` + `src/components/GameOfLifeBackground.tsx`): toroidal `Uint8Array` double-buffer engine, soup-seeded, rAF loop with time-accumulator (6 gen/s), dirty-cell redraw diffed against a `renderedState` array, `getComputedStyle` colors re-read on OS-theme change AND `.dark`/`.light` class mutations (shared `src/lib/theme-observer.ts`). Zero animation deps.
- **Ornament engine** (`src/hooks/useGameOfLifePattern.ts` + `GameOfLifePatternBackground.tsx`): bounded non-toroidal engine per ornament; pulsar top-right on every portfolio section; IntersectionObserver pauses off-screen engines; `active` gating means no computation during the Intro.
- **Landing hero** (`src/sections/About.tsx`): glass-card hero (badge "available", large name, `RotatingTitle` cycling 4 domains, location + bio placeholders), bottom-right glass "Scroll to explore" pill scrolling to `#skills`. Reveals gated on portfolio-ready.
- **Skills** (`src/sections/Skills.tsx` + `src/lib/skills.ts`): tech-stack icon tiles (react-icons/si, brand colors via `useResolvedTheme` light/dark hex pairs, hover lift) and abstract-skill pills (lucide icons), staggered `Reveal` entrances.
- **Header** (`src/components/Header.tsx`): desktop = centered nav + `ThemeSwitch` right; mobile = floating hamburger → right side panel. Mounted only after the wipe (fade-in entrance). Active section tracked by IntersectionObserver.
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
    skills.ts        # TECH_STACK + ABSTRACT_SKILLS data
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
