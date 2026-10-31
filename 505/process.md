# No.505 — Cracking Monument

EXPANSION #61 alice-piaggio, prompt AP1. After her "Watching the news"
(2018): a monumental surreal figure smashing through a grid floor.

## Concept

A colossal marble-white figure, assembled from a union of overlapping
circles, stands broken on a newspaper plinth. Dark violet crack
polylines cross the body and slowly extend and retreat. The figure has
already lost a leg: the detached fragment lies on the orange graph-grid
floor below, rocking gently, crushing a tiny bicycle wheel under it.
The collapse is the piece; the figure never stands straight.

Palette (flat fills only, no gradients): violet ground #4A1C66,
grid-floor orange #E07B00, marble white #F2F0EA, crack ink #2A0F3A.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets,
  no text of any kind (the newsprint is line blocks, not letters).
- Composition lives on a 1080 x 1080 square stage, letterboxed and
  centered at any viewport size; the page ground is the violet, so
  letterbox bands read as more upper field.
- Body: 8 seeded circles (head, chest, belly, two shoulder masses,
  standing thigh, broken stump) with mulberry32 jitter on position and
  radius, drawn as one path and filled once so the union reads as a
  single marble mass. Feet sit at the plinth top (~62% height).
- Cracks: 5-6 random-walk polylines of 3-5 segments, generated with a
  seeded walk that tests each new point against the circle union
  (with margin) and rejects anything at or below the plinth line, so
  cracks stay on the body and never cross the plinth. Each crack is
  drawn to a sine-phased fraction (0.8-1.0) of its full length, so
  cracks breathe in and out on staggered phases.
- Plinth: two stacked marble slabs; the lower slab's face carries
  four columns of glyph-like newsprint line blocks (seeded lengths,
  ink at 55% alpha).
- Grid floor: orange band from 70% to 100% height with a violet line
  lattice at 18-unit pitch (18px at the 1080 stage).
- Fragment: two overlapping marble circles with its own crack,
  rotating +/-~3.4 degrees on a sine around its center. The crushed
  prop is drawn first so the fragment overlaps it. Prop set is wheel /
  cup / shoe by seed; the shipped seed rolls the bicycle wheel, the
  prompt's named prop (squashed to 72% height, three spokes).
- Motion is watch-only. Double-tap reseeds the layout (new crack
  layout, new prop, new jitter) via an LCG step on the seed; never a
  page reload.
- House rules: canvas size from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas style width/height
  pinned in px inside draw() every frame; phone detection via
  window.screen (min dimension < 700px) with aspect fallback (the
  centered square stage needs no separate phone layout).
- Determinism: the first frame is drawn synchronously at the constant
  phase PHASE0 = 4.0s; the rAF loop (typeof-guarded, absent in the QA
  renderer) is anchored as PHASE0 + elapsed since load, never from
  Date.now().

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb rendered twice, `cmp` byte-identical,
  re-verified after the prop fix below; second render deleted.
- Desktop/thumb read-back: colossal white cracked figure on the
  newsprint plinth, orange grid floor in the lower third, detached
  fragment on the floor rocking over the crushed wheel, cracks on the
  body only, nothing clipped.
- Mobile read-back: square stage centered in the tall frame over the
  violet ground, whole composition in frame, nothing clipped.
- Fix during QA: the shipped seed's first prop roll landed on the
  shoe glyph, whose occluded lower half read as a squared stand
  under the fragment. Remapped the prop indices so the shipped seed
  rolls the bicycle wheel (the prompt's named prop); cup and shoe
  remain in the reseed set. Layout, cracks, and all other seeded
  values unchanged.
- Deviations: newsprint columns sit on the lower slab face only; the
  upper slab is a plain cap step (keeps the figure's feet visually
  grounded). Crack growth amplitude is a phased 20% of each crack's
  length rather than a single segment per cycle; same extend/retreat
  read, smoother at loop rate.
