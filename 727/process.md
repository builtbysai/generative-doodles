# No.727 "Toy City" — EXPANSION #88 okazzsp, block 8

## Concept

A skyline of toy buildings on pale sky blue, pure geometry with a
building-block feel. Every tower is a stack of flat shapes (rectangles,
squares, circles, diamonds, arches) finished with a triangle,
semicircle, or diamond roof; wide rectangles carry window-dot grids,
some blocks carry checkerboard bands. The city builds one shape at a
time, left to right, holds while the window dots twinkle, then sinks
below the baseline and rebuilds from a new seed. No outlines, no
perspective, no people or vehicles, nothing casts a shadow.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets.
  Palette is exactly eight tones: sky `#BFE6F5` and blocks `#EF476F`,
  `#FFC300`, `#118AB2`, `#06D6A0`, `#F78FB3`, `#22223B`, `#FFFFFF`.
  Decorations use a palette contrast partner only (`#22223B` on the
  light blocks, `#FFFFFF` on the rest).
- Canvas sized from the Visual Viewport API with resize listeners on
  both `visualViewport` and `window`; the canvas is pinned in px inside
  `draw()` every frame. Phone detection via `window.screen` min
  dimension < 700px, aspect fallback only; page ground is the sky tone.
- Stack generation: a mulberry32 stream keyed by (seed, W, H, phone)
  fully determines the city at a given size. Tower widths are a base
  fraction of the frame width (1/12 desktop, 1/10 phone) jittered
  ±10% and renormalized to fill the frame exactly, so widths stay
  inside 6–11% of frame width. Each tower's target height is a seeded
  35–95% of frame height. Shape heights are kept in tower-width units
  and slots stack flush from the shared baseline at the bottom edge:
  body shapes are drawn into their full slot (circles and semicircles
  use radius = half the tower width, which equals their slot height),
  so neighbours touch with no gaps. Adjacent shapes in a tower never
  share a color. Decorations: window-dot grids (3–5 columns, 1–3 rows,
  seeded per-dot twinkle phase and period) only on wide rectangles
  (height < 0.8 tower widths); checkerboard bands on a seeded subset of
  rectangles and squares. A signature check guarantees no two towers
  repeat within a city.
- Build-clock schedule: shapes are flattened in build order (towers
  left to right, shapes bottom to top, roof last). In the 60 s loop,
  build runs 0–36 s: shape *i* starts its drop at *i · (36/N)* and
  falls from just above its slot (slot height + 5% of frame height)
  with an ease-out-cubic over at most 0.5 s, so drops are essentially
  serial. Hold runs 36–51 s (15 s): window dots toggle individually on
  their seeded periods. Sink runs 51–56 s: the whole city translates
  down by (tallest tower + 10% of frame height) on an ease-in-out, so
  it passes fully below the baseline; 56–60 s is empty sky. The next
  cycle's seed advances, so the rebuilt city is a new city.
- Determinism: frame one is the synchronous draw at loop t=0 (the
  first tower's base shape at its drop start), never derived from
  `Date.now()` or the live clock. All motion is a closed-form function
  of (seed, t): drops, twinkle, and sink are pure functions of loop
  time, and elapsed time comes only from `performance.now()` relative
  to the epoch anchor. The animation loop is guarded by a
  `typeof requestAnimationFrame` check. TAP reseeds immediately: it
  advances the epoch and restarts the build at t=0 with a fresh city;
  it never reloads. An inert `?seed=tNN` hook (QA only) pins a forced
  loop time for state checks.
- No microphone, no audio, no gradients, no text anywhere except
  `<title>`.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js`:
  - `qa-desktop.png` (1280×900): frame one: empty sky with the first
    tower's base shape (a pink circle) at its drop start, hovering
    just above its slot at bottom-left; a pixel probe confirms the
    shape is fully inside the frame (bbox x 0–104, y 645–750).
  - `qa-mobile.png` (390×844): frame one: the first shape (a
    checkerboard square) at its drop start at bottom-left, fully
    inside the frame (probe bbox x 0–37, y 769–785); nothing clipped.
  - `thumb.png` (720×720): same frame-one state at square size.
- Determinism: `thumb.png` rendered twice and `cmp` byte-compared —
  identical; the duplicate was deleted.
- Forced states (throwaway renders via the `?seed=tNN` hook, read
  back, then deleted):
  - t=42 (hold phase, desktop): the completed city — twelve distinct
    towers of stacked rects, squares, circles, diamonds, and arches
    with triangle, semicircle, and diamond roofs; checkerboard bands
    and window-dot grids in place; heights span roughly 35–95% of the
    frame; a pixel-column probe confirms slots stack flush with no
    gaps. Window dots show a mix of on/off states (twinkle active).
  - t=42 (hold phase, mobile): the phone city refills the tall frame,
    ten towers, dense stacks, nothing clipped.
  - t=20 (mid-build): left towers complete, right side still sky, one
    base shape caught mid-drop — the left-to-right build reads.
  - t=54 (sink): only the tallest towers' tops remain above the
    bottom edge; the rest of the city has passed below the baseline.
- Two fixes during QA: frame one initially skipped the first shape
  (a `p <= 0` guard dropped the t=0 drop-start state; now a shape is
  drawn from its exact start time), and the drop duration was trimmed
  (from up to 0.55 s / 1.6× slot to 0.5 s / 1.1× slot) so consecutive
  shapes no longer chase each other down in overlapping flight.

## Deviations

- None from the prompt's substance. The prompt leaves the loop timing
  at "~60 s" with a "~15 s" hold; both are fixed at exactly 60 s and
  15 s (build 36 s, sink 5 s, empty-sky rest 4 s) so every phase is a
  closed-form function of loop time and the determinism gate holds.
  Stack generation is keyed to the render size as well as the seed,
  because tower heights are specified as fractions of frame height
  while shape proportions are kept in tower-width units; at any fixed
  size a seed reproduces its city exactly.
