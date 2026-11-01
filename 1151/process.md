# №1151 — Monglot Machine

Rosa Menkman study block RM8, after *monglot* (2011, with Johan Larsby) — the
glitch-design tool "for anybody, without extensive data corruption skills."
A clean piece of rule-based geometry runs down a visible pipeline of three
glitch operations, each stage's output feeding the next, so the machine
diagram is the artwork.

## Composition

Portrait stack of four equal stages on black `#0A0A0A`, separated by 1px
`#2A2A2A` lines, centered on wide canvases and near full-bleed on phones.
No labels anywhere — stages are identified by color and by a thin progress
line on the left edge that marks the currently active stage.

- **Stage 0 — source.** Concentric arcs + radial spokes in phosphor green
  `#39FF6A`, drawn clean.
- **Stage 1 — datamosh.** Row smear, orange `#FF6A00`.
- **Stage 2 — block shift.** Cyan `#00D0FF`.
- **Stage 3 — channel swap.** White `#F2F2F2`.

## The pipeline is data, not pixels

Per the house renderer limits, there is no offscreen canvas, no ImageData,
no real pixel pipeline. The image lives as a **data grid**, 120 × 30 cells
per stage, and every operation is grid math:

- Stage 0's grid is sampled from a geometry function `geo(x, y)` — ring radii,
  ring width, spoke count/phase/width all seeded.
- Stage 1 shifts each row right by `depth × seeded per-row offset`, with a
  smear trail: each lit cell bleeds into the following cells under a seeded
  decay (max-kernel, trail length 9). One tuning pass during QA shortened the
  trail and thinned the spokes after the first render smeared the rings into
  a solid disc; the shipped frame keeps the ring structure ghosting through
  the smear.
- Stage 2 copies 8×5-cell blocks to depth-scaled seeded offset positions.
- Stage 3 is the honest hard one: a channel swap is a color operation, and
  the grid is monochrome. It is rendered as a two-tone read of the swapped
  result — bright cells in full white, the low band in a dim gray tone — over
  faint cyan *channel ghosts*: the stage-2 signal offset ±2 cells at low
  alpha, the displaced channel made visible as a fringe rather than faked
  as a hue rotation.

Cells are drawn as flat rects in exactly 4 hard shade steps per stage,
batched per step. No gradients, no blur, no glow.

## Motion and interaction

- **Corruption depth** is the global parameter, scaling all three operations
  together. Idle, it drifts on a slow 24 s loop
  (`0.45 + 0.3·sin(2πt/24)`).
- **Drag vertically** to scrub depth directly (top = clean, bottom = deep).
  On release the idle drift resumes from the released value: the drift is a
  closed-form function of an anchor phase re-derived from the release depth,
  so there is no jump.
- **Active stage** cycles 0→1→2→3 every ~2 s; the progress line on the left
  edge spans it, and the active stage's operation runs ~18% stronger.
- **Double-tap** reseeds the geometry and all operation parameters.
- Watch-only otherwise. Silent by design — no audio at all.

## Determinism and house rules

- First frame is drawn synchronously at fixed phase T0 = 11.3 s: depth ≈ 0.50,
  active stage 1 (progress line on the orange stage). The rAF loop is
  `typeof`-guarded and anchored as T0 + elapsed since load.
- Canvas size comes from the Visual Viewport API with resize listeners on
  both `visualViewport` and `window`; `canvas.style.width/height` are pinned
  in px on every draw. Phone detection via `window.screen` physical size
  (min dimension < 700 px) with the `h > w·1.15` aspect fallback.
- All randomness is a seeded mulberry32; no `Math.random`, no offscreen
  canvas, no `createElement`, no gradients, no `ctx.filter`, no shadowBlur,
  no microphone. The only text in the piece is the `<title>`.
- QA: `thumb.png` rendered twice at 720×720 and byte-compared (`cmp`
  identical); desktop (1280×800) and mobile (390×844) renders read by eye —
  clean green mandala on top, orange smear, cyan block-shift, and the white
  swap with its gray dim tone and cyan ghosts at the base.
