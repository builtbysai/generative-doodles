# №1159 — Kopimashin

Antonio Roberts study block AR8, after Peter Sunde's *Kopimashin* (shown in
Roberts's *Copy/Paste*, 2020, Piksel Norway) — the machine that makes
infinite copies and produces nothing: *"copying is natural."* The piece is
the futility loop itself: exponential copying, inevitable gray mush, one
hard wipe, silence, repeat.

## Composition

A square field centered on `#0A0A0A`. One flat shape (circle, square or
triangle) sits at the center in a full-strength generation-1 color —
`#FF2E88`, `#00F0FF` or `#FFD800`. Every 0.5 s tick, every living shape is
copied: children land one radial step beyond their parent at a seeded
angular offset, rotated +3° from the parent plus seeded jitter, so the
cascade fans outward as a loose spiral that fills the square. Size shrinks
per generation (`×0.92^gen`, clamped). No gradients, no fades, no text —
flat shapes only.

## The copying is a precomputed tree

The whole cascade is built once at load from a seeded mulberry32,
breadth-first: generation 0 is the single seed (birthTick 0); each shape
spawns two children with birthTick = parent + 1 until the tree reaches the
**60-shape cap** (generations 0–4 complete, generation 5 partial; the cap
is first fully alive at tick 5). A shape's color is decided by its
generation alone: each generation sits 15% closer to the `#555555` mush
than the last (`factor = 1 − 0.85^gen`), precomputed as a hex table per
base color — vivid at the center, visibly grayed at the rim. Type and base
color are mostly inherited from the parent (copies of copies), with seeded
mutation. State at time *t* is closed-form: `tick = floor(t / 0.5)`, a
shape is on screen iff `birthTick ≤ tick`. Nothing is integrated
frame-to-frame.

## Loop shape (12 s)

- **0–8 s, cascade.** Doubling ticks until the cap; once capped, shapes
  hold their slots and jitter in place — the jitter is a precomputed
  per-shape, per-tick offset table (ticks 6–15), a step function of tick,
  never accumulated state.
- **8–8.5 s, the hard wipe.** A solid `#0A0A0A` vertical bar sweeps
  right-to-left. Shapes whose centers the front has passed are simply not
  drawn, and the bar is painted after the shapes, so anything straddling
  the front is hard-clipped by it. Positions freeze at the last cascade
  tick — the mush is swept as it stood. Not a fade.
- **8.5–12 s, silence.** Empty canvas. The machine "thinking." Then the
  loop turns and the seed shape appears again.

## Determinism and house rules

- First frame is drawn synchronously at fixed phase **T0 = 4.6 s** (tick
  9): the full 60-shape spiral mid-cascade, generation-1 cyan vivid at the
  center, outer generations degraded toward gray. The rAF loop is
  `typeof`-guarded and anchored as T0 + elapsed since load.
- Watch-only — no pointer handlers, no audio, silent by design.
- Canvas size comes from the Visual Viewport API with resize listeners on
  both `visualViewport` and `window`; `canvas.style.width/height` are
  pinned in px on every draw. Phone detection via `window.screen` physical
  size (min dimension < 700 px) with the `h > w·1.15` aspect fallback;
  phones get the square near full-bleed.
- All randomness is the seeded mulberry32; no `Math.random`, no offscreen
  canvas, no ImageData, no `createElement`, no gradients, no `ctx.filter`,
  no shadowBlur, no microphone. Circles are drawn as standalone paths
  (`beginPath` + `moveTo` before each `arc`, per the node-canvas subpath
  lesson). The only text in the piece is the `<title>`.
- QA: `thumb.png` rendered twice at 720×720 and byte-compared (`cmp`
  identical; duplicate deleted). Desktop (1280×800) and mobile (390×844)
  renders read by eye. Throwaway phase probes (T0 edited in scratch
  copies, deleted after) verified the mid-wipe state at t = 8.25 — right
  half swept clean, a shape hard-clipped at the front — and the silence
  state at t = 10.5, a single-color `#0A0A0A` frame.
