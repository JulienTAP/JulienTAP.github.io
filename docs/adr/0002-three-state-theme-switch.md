# Three-state theme switch (light / dark / browser preference)

Dark mode is no longer CSS-only. A three-state `ThemeSwitch` in the header lets the user pick light, dark, or browser preference (the default). The choice persists to `localStorage` and is applied by an inline script in `index.html` before React mounts, preventing a flash of unstyled content.

The CSS strategy in `src/index.css` uses three layers: light tokens on `:root` by default, dark tokens applied via `@media (prefers-color-scheme: dark) :root:not(.light)` for the browser-preference path, and a `.dark` class that forces dark tokens regardless of media query. A `.light` class forces light by excluding that root from the dark media query. This supersedes ADR-0001, which mandated no JS toggle; the trade-off is a small amount of client JS (an anti-FOUC script + the toggle component) in exchange for user agency.
