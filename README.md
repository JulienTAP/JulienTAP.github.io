# JulienTAP — Portfolio

Personal portfolio site, deployed to GitHub Pages at <https://julientap.github.io>.

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (New York style)
- **oxlint** for linting, **Prettier** for formatting

## Getting started

```bash
pnpm install
pnpm dev
```

## Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `pnpm dev`          | Start the dev server                 |
| `pnpm build`        | Type-check and build for production  |
| `pnpm preview`      | Preview the production build locally |
| `pnpm lint`         | Run oxlint                           |
| `pnpm format`       | Format the codebase with Prettier    |
| `pnpm format:check` | Check formatting without writing     |

## Adding shadcn/ui components

```bash
pnpm dlx shadcn@latest add button
```

The CLI is configured via `components.json` and uses the `@/*` path alias.

## Deploy

Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`) which builds and deploys to GitHub Pages.
