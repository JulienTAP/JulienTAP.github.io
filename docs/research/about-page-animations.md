# Research: About Page Animations & Visual Effects

Investigation for the landing page (About section) of the JulienTAP portfolio. Primary sources cited per claim.

## A. Rotating / typing text — CSS vs JS approaches

### CSS animation API

The `animation` shorthand sets `animation-name | duration | timing-function | delay | iteration-count | direction | fill-mode | play-state | timeline` (MDN, _`animation` CSS property_). `@keyframes` defines waypoints via `from`/`to` or percentage selectors (MDN, _`@keyframes`_). MDN warns: "Animating CSS box model properties is discouraged as it leads to layout reflow and repaints… consider animating the `transform` property instead."

### CSS transition API

`transition` is the shorthand for `property | duration | timing-function | delay | behavior`, defaulting to `all … ease 0s` (MDN, _`transition` CSS property_). Fires on state change (pseudo-class or JS-set class).

### Patterns

1. **Typewriter (CSS `steps()`)**: `steps(n, jump-position)` divides progress into N equal intervals (MDN, _`<easing-function>`_). Animates `width` of a clipped container — a layout/paint property, not compositor-only.
2. **Fade/slide word cycling (pure CSS)**: Animate `opacity` and `transform: translateY()` per word with staggered `animation-delay`. Both are compositor-friendly (MDN, _`transform`_). **Most performant** over an already-running canvas.
3. **React `useState` + `setInterval`**: Each tick triggers React reconciliation + DOM mutation. More main-thread work than a declarative CSS animation.

### Recommendation

Use **Pattern 2** (CSS fade-up word cycling): `@keyframes` cycling `opacity 0→1→0` and `translateY(8px)→0→-8px` per word, staggered with `animation-delay`, `ease-out`, `infinite`. Keeps the main thread free for the Game of Life canvas. Gate behind `@media (prefers-reduced-motion: reduce)` (MDN, `animation` page, _Accessibility_).

## B. Scroll-triggered reveals — IntersectionObserver + CSS vs Framer Motion

### IntersectionObserver API

`new IntersectionObserver(callback, options)` asynchronously observes a target's intersection with a `root`. Options: `root`, `rootMargin`, `thresholds`. Baseline since March 2019 (MDN, _`IntersectionObserver`_). The codebase already uses this in `Header.tsx`.

### Reveal recipe

Element starts `opacity: 0; transform: translateY(20px)`, gets `.is-visible` class (toggled by IntersectionObserver) that sets `opacity: 1; transform: none`, with `transition: opacity 600ms ease-out, transform 600ms ease-out`. Stagger via `transition-delay`.

### will-change (MDN)

MDN is emphatic: use as a **last resort** for _existing_ perf problems; "Don't apply `will-change` to too many elements" (extra memory). Add only to elements that animate repeatedly (e.g. rotating-title), not one-shot reveals.

### Is a library needed?

**No.** IntersectionObserver + CSS transition of `opacity`/`transform` is the textbook minimalist approach, Baseline since 2019. The only things a library adds: exit animations, scroll-linked parallax, spring physics, declarative variants. For reveal-on-scroll of static sections, CSS+IO covers 100%.

## C. Status badge — shadcn/ui Badge API

**Import:** `import { Badge } from "@/components/ui/badge"`
**Install:** `pnpm dlx shadcn@latest add badge`
**Usage:** `<Badge variant="default | secondary | destructive | outline | ghost | link">…</Badge>`
Features: With Icon (`data-icon="inline-start|inline-end"`), Custom Colors (Tailwind classes directly). For "Available for work", use `<Badge variant="secondary">` with a small emerald dot.

## D. CTA button — shadcn/ui Button API & scroll-to-next-section

**Import:** `import { Button } from "@/components/ui/button"`
**Install:** `pnpm dlx shadcn@latest add button`
**Usage:** `<Button variant="outline" size="lg">Button</Button>`
Variants: `default | outline | ghost | destructive | secondary | link`. Sizes: `default | xs | sm | lg | icon`.
**As Link:** use `buttonVariants()` helper with a plain `<a>`; do not use `<Button render={<a />} nativeButton={false} />` (breaks semantics).
**scrollIntoView** (MDN): `Element.scrollIntoView({ behavior: 'smooth' })` — already proven in `Header.tsx`. Works within `snap-y snap-mandatory` scroll container.

## E. Text readability over animated canvas

### backdrop-filter (MDN)

Applies a filter to "the area behind an element"; "the element or its background needs to be transparent or partially transparent" (MDN, _`backdrop-filter`_). Baseline 2024. Use `backdrop-filter: blur(8px)` + `background: rgb(… / 0.4)` for glassmorphism. **Gotcha**: a parent with `opacity < 1`, `filter`, `mask`, `clip-path`, `mix-blend-mode`, or `will-change` becomes a **backdrop root**, capping blur to the subtree (MDN).

### text-shadow (MDN)

Takes `<offset-x> <offset-y> <blur-radius>? <color>?`; applies to text (MDN, _`text-shadow`_). A tight low-blur shadow lifts text off moving cells without filter cost.

### drop-shadow() (MDN)

Conforms to the alpha shape (MDN, _`drop-shadow()`_) — right for icons/SVG, not pure text.

### mix-blend-mode — caution (MDN)

Blends with "content rendered behind the element within the same stacking context" (MDN, _`mix-blend-mode`_). Unpredictable over a moving multi-shade Game-of-Life field. **Not recommended** for body text.

### Recommendation

Layer: (1) `bg-background/30` full-hero scrim, (2) `backdrop-blur` + `bg-background/40` glass card for the CTA block, (3) subtle `text-shadow` on the headline. Avoid `mix-blend-mode` on body text.

## F. Framer Motion (Motion) assessment

### What Motion offers

`motion` components with `initial`/`animate`/`whileInView`/`exit` props, `useInView()` hook, `AnimatePresence` for exit animations, `useScroll`/`useTransform` for scroll-linked effects (motion.dev docs). Pooled IntersectionObserver for low overhead.

### Bundle cost

~30 kB gzipped. Project currently ships 0 kB of animation JS.

### Verdict

**Do not add Motion for the landing page.** Required animations (rotating title, reveal-on-scroll, badge, CTA) are all expressible in CSS + IntersectionObserver with 0 bytes. The canvas already consumes main-thread time; adding 30 kB that re-renders React on viewport changes is the wrong trade. Revisit only for exit animations or scroll-linked parallax.

## G. Recommended animation set

1. **Rotating job title** — `@keyframes rotate-title { 0% { opacity:0; transform:translateY(0.5rem) } 15%,85% { opacity:1; transform:none } 100% { opacity:0; transform:translateY(-0.5rem) } }`, staggered `animation-delay: calc(var(--i) * 3s)`, `ease-in-out`, `infinite`. `will-change: transform, opacity` on container only.
2. **Reveal on load** — `useEffect` adds `.is-visible` class; `transition: opacity 600ms ease-out, transform 600ms ease-out`; stagger via `transition-delay: calc(var(--i) * 80ms)`.
3. **Status badge** — shadcn `Badge variant="secondary"` with emerald dot.
4. **CTA button** — shadcn `Button size="lg"` + `ArrowRight` icon + `scrollIntoView`.
5. **Text readability** — scrim + glass card + text-shadow.

## H. Performance notes

1. Animate only `opacity` + `transform` (compositor-friendly, no reflow — MDN).
2. Prefer CSS keyframes over `setInterval`+`setState` for continuous loops.
3. Use `IntersectionObserver`, not scroll listeners (async, batched — MDN).
4. `will-change` sparingly and transiently (MDN: last resort, not premature optimization).
5. **Backdrop-root trap**: don't wrap a `backdrop-filter` card in an opacity-faded reveal — apply reveal to the card's children, or animate `transform` only on the card and keep opacity at 1.
6. One-shot observers: `unobserve` after first reveal to shrink the observer list.
7. `@media (prefers-reduced-motion: reduce)` — disable all decorative animations, show final state.

## Sources

- MDN — `animation`: https://developer.mozilla.org/en-US/docs/Web/CSS/animation
- MDN — `@keyframes`: https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes
- MDN — `transition`: https://developer.mozilla.org/en-US/docs/Web/CSS/transition
- MDN — `transform`: https://developer.mozilla.org/en-US/docs/Web/CSS/transform
- MDN — `will-change`: https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
- MDN — `backdrop-filter`: https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
- MDN — `mix-blend-mode`: https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode
- MDN — `drop-shadow()`: https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/drop-shadow
- MDN — `text-shadow`: https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow
- MDN — `Element.scrollIntoView()`: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
- MDN — `IntersectionObserver`: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
- MDN — `<easing-function>`: https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function
- shadcn/ui — Badge: https://ui.shadcn.com/docs/components/badge
- shadcn/ui — Button: https://ui.shadcn.com/docs/components/button
- Motion (Framer Motion) — Docs: https://motion.dev/docs
