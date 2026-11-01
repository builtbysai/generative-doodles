# №1470 "The Cutting Room" — delphine-seyrig DS7 (PP717)

## Prompt

A woman reads aloud at a desk, center-frame, from an open book. Between her
and the viewer, a small television flickers with abstract news images:
marching blocks, flashing borders, maps with arrows. Every time she turns a
page, the television image jump-cuts to a new abstract scene; the cut itself
is visible as a one-frame white flash and a slight image shift.

## What was built

- **Composition:** ivory wall ground, horizontal wood desk band across the
  lower frame. Reader centered and large: black dress trapezoid, ivory face
  with black hair cap, dot eyes, mouth line, ivory hands resting at the desk.
  Open book (two ivory pages, black spine) centered on the desk in front of
  her. TV small at lower right, rotated −0.06 rad (angled toward the viewer),
  blue-grey screen.
- **Motion:** watch-first page-turn loop. Head bobs slightly on a 4 s sine.
  Hand turns a page every 6 s (0.9 s page-lift animation: the right page
  narrows and lifts, then settles). Each page turn advances the TV to the
  next abstract news scene and flashes white over the TV only for 0.08 s.
- **TV scenes (cycle of 4):** marching blocks (rows of scarlet/gold/teal
  rects drifting right); flashing border (scarlet/gold alternating border);
  map with arrows (teal field, gold arrow, scarlet block); borders + blocks
  mix. Each scene carries a small seeded positional shift, so the cut reads
  as a jump, not a dissolve.
- **Interaction:** drag on the book's right-page edge triggers an early page
  turn at once (TV cuts immediately, flash fires, turn animation runs).
  Drag never restarts the reading; the auto-turn rhythm continues from the
  recorded turn list. No click-to-reload, no buttons.
- **Silence:** fully silent, no AudioContext. The "reads aloud" beat is
  visual only: head movement and page turns.

## Adaptations

- Face outline: the prompt's skin ivory equals the wall ivory, so the bare
  face disc vanished into the wall (eyes and mouth floated). The head disc
  now carries a thin black outline — same palette, no new colour — so the
  face reads.
- Delayed-history/buffer mechanics from other pieces do not apply here; the
  turn list is closed-form over piece time and recorded drag events, so
  frame one and every later frame are reproducible from the same event list.
- TV flash is 0.08 s rather than literally one browser frame, so it survives
  frame-rate variation while still reading as a single flash; the probe
  confirms white over the TV only at the turn instant and 0 px by +0.2 s.

## House-rule compliance

- Canvas sized from Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect h > w*1.15 fallback; centered composition keeps its shape,
  page ground is the piece's own ivory; verified at 390 wide with no clipping.
- Determinism: synchronous first frame at constant phase via boot flag
  (frame one = draw(0), clock starts only with the rAF loop, written as a
  plain function declaration behind a typeof guard). All decoration from a
  seeded mulberry32 PRNG (seed 1470000 + scene × 7919), never Math.random.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, getUserMedia, or text drawing. No visible text except
  `<title>`. Fading alphas: none used (all fills opaque); dots are filled
  rects or own-beginPath arcs with moveTo first (node-canvas quirks).

## Verification

- Rendered with node ~/workspace/tools/render-piece.js at 1280×900,
  390×844, and 720×720; all three inspected. Thumb byte-identical across
  repeated renders.
- Forced-time probe harness (tmp/probe1470.js, vm-isolated instance, piece
  driven via window.__piece.draw(t)): t=0 redraw 0 px; t=0 vs t=3 differs by
  5,336 px (head bob live); flash at t=6.0 fills the TV zone white
  (18,668 px) and is gone by t=6.2 (0 px); scene advances 0 → 1 → 2 across
  the t=6 and t=12 turns; t=5.9 vs t=6.2 differs by 17,766 px (jump-cut);
  drag at t=20 cuts immediately (flash + scene change at the same t,
  turn count 3 → 4). Token scan clean.
- Fix rounds (2): (1) face-outline fix above — all renders re-done after
  it. (2) Probe caught a scene-index bug: the t=0 pseudo-entry in the turn
  list inflated the scene index (scene read 2 after the first turn instead
  of 1); the index now counts real turns only. All renders re-done after
  the fix; frame one unchanged by it.
