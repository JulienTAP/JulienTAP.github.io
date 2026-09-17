# Working on the JulienTAP portfolio

Read [CONTEXT.md](CONTEXT.md) first — it's the project glossary and state. ADRs in [docs/adr/](docs/adr/) record hard-to-reverse decisions.

## Commands

```bash
pnpm install          # install deps (uses Corepack-pinned pnpm 11)
pnpm dev              # dev server with HMR
pnpm build            # type-check (tsc -b) then vite build → dist/
pnpm preview          # serve the production build locally
pnpm lint              # oxlint (fast, zero-config)
pnpm format            # Prettier write
pnpm format:check      # Prettier check (CI gate)
```

After implementation, run `pnpm lint && pnpm build && pnpm format:check` — all three must pass.
Do not commit code by yourself, user should handle commits and PRs alone.

## Conventions

- **No comments in code** unless asked for.
- **Prettier formats everything** — the `.prettierignore` excludes `.agents/`, `.opencode/`, `node_modules`, `dist`, `public`, and `pnpm-lock.yaml`.
- Use the `@/*` alias for imports inside `src/` (e.g. `import { cn } from '@/lib/utils'`), not relative paths.
- Components go in `src/components/` (or `src/components/ui/` for shadcn primitives added via the CLI).
- shadcn/ui is configured in `components.json` (New York style, lucide icons). Add components with `pnpm dlx shadcn@latest add <name>`.

## Theme and dark mode

Dark mode is **CSS-only**, driven by `@media (prefers-color-scheme: dark)` in `src/index.css`. There is no JS toggle. Do not add a `.dark` class or a theme provider — see [ADR-0001](docs/adr/0001-auto-dark-mode.md). Any `dark:` utility class in Tailwind follows the OS setting automatically.

## Deploy

Merge to `main` triggers `.github/workflows/deploy.yml` → build → GitHub Pages. The `dev` branch is the working branch; merge `dev` → `main` to publish. This is a **user page** repo (`<username>.github.io`), so `base: '/'` in `vite.config.ts` is correct — don't change it to a project path.
