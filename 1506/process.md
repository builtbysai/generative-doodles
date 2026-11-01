# №1506 "Chants d'Est: The Road East to West" (sonia-wieder-atherton SW3, PP753)

Gallery date: 2006 · 02 · 25 (formula date; not drawn in the piece).
Build: self-contained canvas 2D, no push (parent ships).

## Palette (prompt-verbatim, no other color)

- Road cream #e8e0d0.
- Forest/snow section: charcoal #2a2a30, deep green #2f4636, grey #b8bcc0.
- Field section: gold #d9a441, olive #2f4636 (same hex as the forest green,
  used as the field olive).
- Town section: brick #a8674a, walnut #6b4a3a, warm gold #d9a441.
- Travelling dot: charcoal centre with a gold ring (both palette colors).

## Composition

- A single cream road band runs left to right through the middle on a gentle
  fixed sine wave (amplitude 0.02H, 1.5 cycles across the width). The road is
  one filled path and never breaks.
- Country fills the whole frame above and below the road. A small travelling
  dot (charcoal centre, gold ring) moves along the road from east to west.
- Field-like composition, full-bleed on phones; checked at 390 wide.

## Journey timing and crossfade weights

- Journey loop: 48 s. Journey parameter p = phase mod 1, phase in journeys.
- Crossfade weights driven by p (smoothstep blends, no border lines):
  - forest weight = 1 - smoothstep(0.22, 0.48, p)
  - town weight = smoothstep(0.52, 0.78, p)
  - field weight = 1 - forest - town
  - Weights sum to 1. Forest is drawn opaque as the base; field is drawn over
    it at the field weight; town over that at the town weight. All alphas are
    rounded to 4 decimals.
- Layers: forest = charcoal ground, grey snow discs, deep-green three-tier
  pines above the road and rooted near the bottom edge below it; field = gold
  ground, olive crop-row stripes and dots; town = walnut ground, brick roof
  triangles along the top and bottom edges, warm-gold window lights.
- The road is drawn over the layers, then the dot.

## Per-loop variation ("slightly changed" restart)

- Motif layouts come from a fixed base seed (mulberry32, seed 1506000 + salt),
  so the country is the same each journey.
- Only small details vary per loop index: snow discs, field dots, and town
  window lights shift by at most 0.005 of the min frame dimension, from a
  mulberry32 stream seeded with the loop index (seed + loopIndex * 7919).
  No Math.random anywhere, so a given loop index always renders identically.
- Measured: same loop index re-rendered = 0 px difference; loop 0 vs loop 1
  at the same loop-local time = 5,794 px of 518,400 (about 1.1%).

## Drag mapping

- Pointer down within grab radius (max(60 px, 0.08 * min dimension)) of the dot
  grabs it, grab-style: the dot follows pointer movement by its grab offset,
  so a drag never jumps the dot anywhere, including never to the end.
- While dragging, the journey parameter follows the dot, so the country
  morphs with the scrub. On release, automatic travel resumes from the
  scrubbed position: phase continues closed-form from the release anchor
  (release phase + elapsed / 48). Drag state is a recorded event list
  (start/end times, grab offset, pointer samples); nothing is
  frame-integrated. Drag never reverses the road's direction permanently and
  never draws a border between sections.
- Dot travel is inset by a margin (max(12 px, 0.02 * width)) at both ends so
  the dot is never clipped by the frame edge.

## Determinism and house rules

- Frame one = draw(0) at a constant phase; the rAF loop (plain function
  declaration, typeof-guarded) anchors its clock on its first call.
- Every animation value is a closed-form function of piece time and recorded
  events; every sine is on loop-local time.
- Fully silent: no AudioContext at all. No offscreen canvas, Path2D,
  gradients, shadowBlur, document.createElement, WebGL, getUserMedia,
  localStorage, fillText, or visible text except <title>.
- Dots are own-beginPath arcs with moveTo first; fading alphas rounded to
  4 decimals (node-canvas quirks).
- Viewport from the Visual Viewport API with canvas pinned in draw();
  phone detection via window.screen with aspect fallback.
- Never click-to-reload / click-to-restart. No place names, borders, flags,
  maps, vehicles, or compasses; no likenesses, real names, or readable text.

## Probe results (probe-1506.js, vm-isolated, real node-canvas, 720x720)

- Frame-one redraw: 0 px difference.
- Dot travel east to west: dotX at t = 0 / 12 / 24 / 36 / 47 s =
  14 / 187 / 360 / 533 / 691 px (fully inside the frame at both ends).
- Weights at p = 0.05 / 0.35 / 0.5 / 0.65 / 0.95:
  forest 1 / 0.5 / 0 / 0 / 0; field 0 / 0.5 / 1 / 0.5 / 0;
  town 0 / 0 / 0 / 0.5 / 1; weights sum to 1.0000 at mid-transition.
- Gold-classified pixels: t = 0 (forest) 162 px (dot ring only);
  t = 24 (field) 352,797 px; t = 44 (town) 1,163 px (window lights + ring).
- Drag: dotX t = 10 s: 158 px; during drag t = 11 s: 358 px (exactly +200);
  after release t = 13 s: 373 px; t = 20 s: 474 px (travel resumed).
- Loop determinism: loop 1 at loop-local 10 s re-rendered = 0 px;
  loop 0 vs loop 1 at the same loop-local time = 5,794 px (about 1.1%).
- Mid-loop render at t = 16.8 s inspected: forest/field blend with no border
  line; dot mid-road.
- Forbidden-API grep clean: no AudioContext, getUserMedia, Path2D,
  createElement, gradients, shadowBlur, fillText, Math.random, Date.now,
  or localStorage.
- Thumb: three independent 720x720 renders byte-identical.

## Fix rounds (2, both re-verified after)

1. Below-road pines first hung downward from the road (roots at the road).
   Re-rooted below-road trees near the bottom edge so all trees stand
   upright; above-road trees unchanged.
2. The dot was half-clipped at both ends of its travel (centre at x = 0 and
   x = W). Added a travel margin (max(12 px, 0.02 * width)) at both ends so
   the dot is fully visible throughout.
3. Probe-harness correction (not a piece change): the first loop-comparison
   ran in the same env as the drag probe, so recorded drag events shifted
   later phases and the comparison measured different journey positions
   (475,895 px). Re-ran the comparison in a fresh env: 5,794 px, as above.

## Deviations from the prompt

None, apart from the documented house-rule adaptations above (canvas 2D,
closed-form drag state, seeded per-loop jitter for the "slightly changed"
restart, dot travel inset, no text/audio).
