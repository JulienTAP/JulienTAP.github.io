# Auto dark mode via CSS media query

**Status:** Superseded by [ADR-0002](0002-three-state-theme-switch.md)

Dark mode follows the OS `prefers-color-scheme` setting automatically, implemented purely in CSS with no JavaScript toggle or theme provider. The shadcn/ui default of a `.dark` class was replaced with `@media (prefers-color-scheme: dark) :root` in `src/index.css`, and the `@custom-variant dark` override was removed so Tailwind v4's default media-query `dark:` variant applies.

This was chosen over a JS toggle because the portfolio is a read-only showcase with no user accounts or persisted preferences: every visitor gets the theme their OS is already set to, with no flash of unstyled content and no client JS cost. The trade-off is that users who want a different theme from their OS setting cannot override it — acceptable for a portfolio, not for an app.
