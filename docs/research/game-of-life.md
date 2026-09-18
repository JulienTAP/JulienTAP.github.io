# Research: Conway's Game of Life as a portfolio background

Investigation for implementing a live, auto-evolving Game of Life grid as a full-viewport background behind portfolio content. Primary sources cited per claim.

## A. Conway's Game of Life: rules, topology, update semantics

**Source:** Wikipedia, "Conway's Game of Life," https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

### Topology

The universe is "an infinite, two-dimensional orthogonal grid of square _cells_, each of which is in one of two possible states, _live_ or _dead_." Every cell interacts with its eight neighbours (Moore neighborhood) — "the cells that are horizontally, vertically, or diagonally adjacent" [Wikipedia, "Rules"].

### The four rules (B3/S23)

1. "Any live cell with fewer than two live neighbours dies, as if by underpopulation."
2. "Any live cell with two or three live neighbours lives on to the next generation."
3. "Any live cell with more than three live neighbours dies, as if by overpopulation."
4. "Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction."

The rulestring is B3/S23: "the numbers before the slash signify conditions for dead cells becoming alive, and the ones after it signifying survival conditions for cells that are already alive" [Wikipedia, "Rules"].

### Update semantics (simultaneous tick)

"The first _generation_ is created by applying the above rules simultaneously to every cell in the seed, live or dead; births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a _tick_. Each generation is a _pure function_ of the preceding one" [Wikipedia, "Rules"]. This simultaneous-update requirement is why double-buffering is mandatory.

### Famous patterns

| Pattern           | Class                 | Behavior                                                                                                  | Source                       |
| ----------------- | --------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Block             | Still life            | 2x2 square; never changes                                                                                 | Wikipedia "Pattern taxonomy" |
| Blinker           | Oscillator (period 2) | 3 cells in a row rotating horizontal/vertical                                                             | Wikipedia "Pattern taxonomy" |
| Toad              | Oscillator (period 2) | 6-cell cycling pattern                                                                                    | Wikipedia "Pattern taxonomy" |
| Beacon            | Oscillator (period 2) | Two 2x2 blocks corner-to-corner blinking                                                                  | Wikipedia "Pattern taxonomy" |
| Pulsar            | Oscillator (period 3) | "The most common period-3 oscillator"                                                                     | Wikipedia "Pattern taxonomy" |
| Glider            | Spaceship             | Smallest spaceship; moves diagonally one cell every 4 generations                                         | Wikipedia "Pattern taxonomy" |
| Gosper glider gun | Gun                   | "Produces its first glider on the 15th generation, and another glider every 30th generation from then on" | Wikipedia "Pattern taxonomy" |

For a portfolio background, gliders, blinkers, blocks, toads, beacons, and pulsars are practical seeds — small, stable, visually recognizable. The Gosper glider gun provides sustained emergent activity; on a toroidal field it "eventually wraps around and destroys the gun" [Wikipedia, "Algorithms"] — a visually interesting self-termination.

## B. Rendering approach: Canvas 2D

**Sources:** MDN Canvas API https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API ; MDN CanvasRenderingContext2D https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

**Recommendation: Canvas 2D.** Rationale:

- A grid of solid-color squares is precisely `fillRect` + `fillStyle` + `clearRect`. No shaders, no buffers.
- The Canvas API is a Baseline "Widely available" Web API, available "across browsers since July 2015" [MDN, Canvas API]. No npm install needed.
- A single `<canvas>` is one DOM node; React never reconciles individual cells. The rAF loop mutates pixels directly.
- Performance is sufficient: with typed-array storage and dirty-cell redraw, Canvas 2D handles a full-viewport grid at 60fps in the background.

WebGL would only be justified for >500k live cells or per-cell gradients — neither applies here. DOM (a div grid) is ruled out: React reconciliation of tens of thousands of nodes per tick is catastrophic.

## C. React integration

**Source:** MDN requestAnimationFrame https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame

### rAF loop lifecycle

- `requestAnimationFrame(callback)` "requests the browser to call a user-supplied callback function before the next repaint" [MDN].
- **One-shot:** "Your callback function must call `requestAnimationFrame()` again if you want to animate another frame. `requestAnimationFrame()` is one-shot." [MDN, Note].
- **Cancellation:** Returns a request ID; "You can pass this value to `window.cancelAnimationFrame()` to cancel the refresh callback request" [MDN, "Return value"]. Use `null` as the sentinel for "no active frame" [MDN, "Warning" under Return value].
- **Auto-pauses when hidden:** "calls are paused in most browsers when running in background tabs or hidden iframes" [MDN].
- **Frame-rate independence:** "Be sure always to use the first argument... to calculate how much the animation will progress in a frame — otherwise, the animation will run faster on high refresh-rate screens" [MDN, "Warning"]. Drive the simulation tick from elapsed time, not once per rAF callback.

### StrictMode (React 19)

`src/main.tsx` mounts `<StrictMode>`. StrictMode double-invokes effects in dev (mount → unmount → mount). The cleanup must fully tear down: cancel rAF, disconnect ResizeObserver, null out context.

### ResizeObserver + devicePixelRatio

- `ResizeObserver` (Baseline, in the TS DOM lib) reports actual content-box size. Observe `document.documentElement`; on resize recompute cols/rows, reallocate typed arrays, re-seed, reset the canvas backing store.
- `window.devicePixelRatio`: set canvas backing store to `cssWidth * dpr × cssHeight * dpr` and use `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)` so drawing operates in CSS pixels while the bitmap is high-resolution. Cap dpr at ~2 to limit memory.

## D. Performance

**Source:** Wikipedia, "Algorithms" section, https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Algorithms

- **Typed array storage:** "Typically, two arrays are used: one to hold the current generation, and one to calculate its successor. Often 0 and 1 represent dead and live cells." A `Uint8Array(cols * rows)` is the JS equivalent — flat, contiguous, GC-friendly.
- **Double-buffering with swap:** "For the next iteration, the arrays may swap roles so that the successor array in the last iteration becomes the current array in the next iteration" [Wikipedia]. Mandatory for simultaneous-update semantics. Swap references rather than copying.
- **Dirty-cell redraw:** "A cell that did not change at the last time step, and none of whose neighbours changed, is guaranteed not to change at the current time step as well, so a program that keeps track of which areas are active can save time by not updating inactive zones" [Wikipedia]. Lighter version: only `fillRect`/`clearRect` cells whose value changed since last frame. After a soup settles, most of the grid is static.
- **Toroidal grid:** "Consider the left and right edges of the field to be stitched together, and the top and bottom edges also, yielding a toroidal array. The result is that active areas that move across a field edge reappear at the opposite edge" [Wikipedia]. Recommended for a background: gliders re-enter, keeping the field populated.
- **Tick throttling:** Run the sim at a fixed cadence (e.g. 6 gen/sec) driven by a time accumulator in the rAF loop, not once per rAF callback. Keeps evolution speed consistent across 60/120/144Hz displays.

## E. Codebase fit

- **Stack:** Vite 8, React 19, TS 6, Tailwind v4, shadcn/ui. No canvas/animation deps installed; no `src/components/` or `src/hooks/` dirs yet.
- **`@/*` alias** → `./src/*` (in `vite.config.ts` and `tsconfig.app.json`).
- **`verbatimModuleSyntax: true`** → must use `import type` for type-only imports.
- **`erasableSyntaxOnly: true`** (TS 6) → no `enum` (use const objects + unions), no parameter properties.
- **`noUnusedLocals`/`noUnusedParameters`** → no leftover refs.
- **Theme tokens:** `--foreground`, `--primary`, `--accent` etc. as oklch values under `:root` and `@media (prefers-color-scheme: dark)` in `src/index.css`. Read via `getComputedStyle(document.documentElement).getPropertyValue('--foreground')` — automatically returns the dark value when OS is in dark mode.
- **ADR-0001 (CSS-only dark mode):** No `.dark` class, no theme provider, no JS toggle. The canvas reads colors from `getComputedStyle` so the same JS works in both themes; re-read on `prefers-color-scheme` change. This does NOT add a JS toggle — it only reactively picks up the OS-driven CSS change.

## F. Architecture

Three-file split: engine (pure TS), hook (React lifecycle), component (declarative wrapper).

### `src/lib/game-of-life.ts`

Pure engine, no React/DOM. `createGameOfLife(opts)` → engine with `step()`, `resize()`, `reseed()`, `stampPattern()`. Two `Uint8Array(cols*rows)`, swap on step, toroidal boundaries. `PATTERNS` library: glider, blinker, toad, beacon, pulsar, gosperGliderGun as coordinate arrays.

### `src/hooks/useGameOfLife.ts`

Owns rAF loop, ResizeObserver, devicePixelRatio, theme-color re-reading. Returns a canvas ref. Time-accumulator drives sim tick at configurable cadence; render only changed cells. Cleanup cancels rAF, disconnects ResizeObserver, removes matchMedia listener — StrictMode-safe.

### `src/components/GameOfLifeBackground.tsx`

Thin presentational component calling the hook, rendering `<canvas aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none" />`. MDN: "Canvas content is not exposed to accessibility tools" — it's decorative, so hide from AT. `pointer-events-none` so it never blocks clicks.

### `src/App.tsx`

Import `GameOfLifeBackground`, render as first child. Switch outer `div` from `bg-background` to `bg-transparent` so the canvas shows through (the `body` `@layer base` background still paints the page base).

## Sources

- Wikipedia, "Conway's Game of Life": https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life (Rules, Pattern taxonomy, Algorithms)
- MDN, Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- MDN, CanvasRenderingContext2D: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
- MDN, Window.requestAnimationFrame(): https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
