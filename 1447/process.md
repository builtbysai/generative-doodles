# №1447 "The Ordered State, Re-Ordered" (kathe-kruse KK8, PP678)

## What it is

A specimen tray on a pale gray ground: 24 small everyday objects — cup,
key, spoon, button, stone, scrap of paper, length of thread, cycling in
that order — arranged in strict rows of 6, ordered, labelled by position,
calm. But the order is hand-made: the third row is baked crooked (a 1.5°
rotation about the row centre plus a 6 px y offset, applied to every slot
of that row by constant geometry), one object (slot 7, a key) sits a few
degrees off, and one gap — after column 3 — is wider than the rest. The
order holds, and the hand shows.

## Motion

- Slow loop. Every object trembles almost imperceptibly (±0.6 px sine,
  as if the tray were being carried).
- Every ~8 s one object quietly swaps places with its neighbour (a small
  0.6 s eased slide, no fanfare) and the grid re-settles, still ordered,
  slightly different. Swap pairs come from a seeded sequence, so the
  progression is reproducible.
- Dragging an object lifts it (drawn last, on top, with a soft flat
  shadow) and lets the user place it anywhere in the grid; neighbours
  slide to make room. The grid re-orders around the drop but keeps the
  crooked row crooked: slot geometry is a pure function of constants,
  computed fresh on every call, so no swap, tween or drag can ever
  straighten row 3 or fix the wider gap.

## Adaptations

- Objects as simple filled shapes with hand-drawn wobble outlines
  (seeded per-object polygon jitter, stable across loops, never
  flickering); cup, key, spoon, button (4 holes), stone blob, paper
  with folded corner and pseudo-type dashes, thread as coiled arcs.
- Drag = pick-up, move, drop with neighbour slide tween; the timed swap
  picks a seeded adjacent pair.
- Fully silent by design (no AudioContext at all); no offscreen canvas,
  gradients, shadowBlur, Path2D, createElement, fillText/strokeText, or
  getUserMedia. The only visible text is `<title>`.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window, pinned in draw() via
  style.width/height; phone detection via window.screen physical size
  (min dimension < 700 px); centered composition keeps its shape, page
  ground takes the piece's own background colour; checked at 390 wide.
- Determinism: frame one = draw(0) via boot flag, clock starts only
  with the rAF loop (plain function declaration behind a typeof guard);
  all randomness from mulberry32 (seed 1447000 + index·7919), never
  Math.random. Fading alphas rounded to 4 decimals; dots as filled
  rects or own-beginPath arcs (node-canvas quirks).

## Verification (forced-time probe harness, vm-isolated instance)

- Two fresh instances byte-identical at t = 0; thumb byte-identical
  across repeated renders.
- Row 2 slot y rises 540 → 566 across the row (crooked); row 0 level.
- Order changes after the first 8 s swap (slots 14/15 swapped) and
  re-settles; frame changes with time (tremble).
- Drag from slot 0 to slot 23 moves that object to slot 23; the crooked
  row's geometry is unchanged after the drag.
- Corner pixels are the ground colour #d8d2c8 — nothing outside the tray.

## Fix rounds

- (1) Objects first rendered at cell/72 scale, so cup handles and key
  bows nearly touched in neighbouring cells — rescaled to cell/84 for
  clean cell spacing. All renders re-done after the fix.
- (2) The ambient-swap counter first restarted at 0 on every draw()
  call, which would have repeated the same swap pair — fixed with a
  persistent swap counter. (Caught in code review before probing.)
