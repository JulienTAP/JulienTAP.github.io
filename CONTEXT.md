# JulienTAP Portfolio

Personal portfolio site for JulienTAP, deployed to GitHub Pages at https://julientap.github.io. The repo is a GitHub **user page** (`<username>.github.io`), so it serves at the domain root, not under a project path.

## Language

**Portfolio**:
The site itself — a single-page React app showcasing JulienTAP's work. Currently a placeholder; sections will be added over time.
_Avoid_: site, page, app (use these for the literal HTML/React meaning)

**User page**:
A GitHub Pages repo named `<username>.github.io` that serves at the domain root (`https://julientap.github.io/`), as opposed to a project page which serves under `/<repo>/`. This decides the Vite `base` config.
_Avoid_: personal page, main page

**Theme tokens**:
The set of CSS custom properties (`--background`, `--foreground`, `--primary`, etc.) defined in `src/index.css` that shadcn/ui components consume. Light values live under `:root`; dark values override them under a media query.
_Avoid_: color variables, theme variables

## What's built

- **Placeholder page** (`src/App.tsx`): centered "Portfolio under construction" message. No sections yet.
- **Auto dark mode** (`src/index.css`): theme follows the OS `prefers-color-scheme` setting via CSS media query — no JS, no toggle, no flash. See [ADR-0001](docs/adr/0001-auto-dark-mode.md).
- **Deploy pipeline** (`.github/workflows/deploy.yml`): merges to `main` trigger a build → deploy to GitHub Pages.

## Stack

- **Vite 8** + **React 19** + **TypeScript 6**
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin, not PostCSS) + **shadcn/ui** (New York style)
- **oxlint** for linting, **Prettier** for formatting (with `prettier-plugin-tailwindcss` for class sorting)
- **pnpm 11** as package manager (pinned via `packageManager` field for Corepack)
- Path alias `@/*` → `./src/*` (configured in `vite.config.ts` and both `tsconfig*.json`)

## Repo layout

```
src/
  App.tsx          # Placeholder page — single React component
  main.tsx         # Entry point, mounts <App />
  index.css        # Tailwind import + shadcn/ui theme tokens (light/dark)
  lib/utils.ts     # cn() helper for class merging (shadcn convention)
public/
  favicon.svg       # Custom "J" favicon
.github/workflows/
  deploy.yml        # Build + deploy to GitHub Pages on push to main
components.json     # shadcn/ui CLI config (for adding components later)
docs/adr/           # Architecture Decision Records
```

## Decisions recorded

- [ADR-0001: Auto dark mode via CSS media query](docs/adr/0001-auto-dark-mode.md)
