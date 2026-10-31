# No.768 "Inner Band" — EXPANSION #94 mary-corse, prompt block 1

## Concept

Mary Corse's Inner Band paintings hold a center band that is only there from
one spot in the room: stand in the right place and a column of light stands
up in the white field; step aside and it dissolves back into the field. This
piece rebuilds that perception mechanic directly. A near-white square panel
hovers on a pale gallery wall over a thin floor strip. The panel carries
three vertical fields, the center one a gray-taupe band under a fine layer
of horizontal strokes, and the band's presence is a smooth function of a
viewer parameter v. Idle, v sways slowly through its range on a 20 s cycle,
so the band fades in, warms, and vanishes on its own. Dragging horizontally
is the visitor's body walking past the painting: v follows the drag, and on
release the view eases back into the idle sway. Nothing is stepped and
nothing reloads; the band only ever breathes.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets.
- Canvas size comes from the Visual Viewport API, with resize listeners on
  both `visualViewport` and `window`. `draw()` pins
  `canvas.style.width/height` in px every frame.
- Phone detection via `window.screen` physical size (min dimension
  < 700 px), aspect `h > w * 1.15` as fallback only. On phones the square
  panel keeps its shape and centering; the page ground is the wall tone.
- Palette is strict: field white #F5F4F0, inner band #D8D4CC warming to
  flare #FFFDF6, shadow gray #8A8A88, wall #EFEFED, floor #DAD7D2.
- Panel: square, ~70% of frame height (width-capped on narrow screens),
  centered just above the floor strip. Hover shadow is three layered alpha
  rects of shadow gray (total ~12% at core, 6-8 px offset); the offset
  shifts subtly with v. Bevel is a 3 px inner shadow on the right and
  bottom panel edges plus a 1 px flare catch on the top and left.
- Presence lobe (closed form): `p(v) = 0.03 + 0.97 * exp(-((v - 0.35)^2) / (2 * 0.14^2))`.
  It peaks at exactly 1.0 when v = 0.35 and falls to the ~0.03 floor by
  v = 0 and past v = 0.75, matching the prompt's appear/vanish profile
  with smooth gaussian falloff instead of a stepped fade.
- The band is drawn in 48 vertical slices whose alpha follows a
  `pow(sin(pi*u), 0.55)` profile, so the band's edges feather into the
  flanking fields with no hard stripe edge. Band tone is the field color
  mixed toward a taupe/flare blend in proportion to p, so at low presence
  the band literally becomes the field. Above p = 0.55 a flare wash is
  added in 32 slices under a `pow(sin(pi*u), 1.6)` profile (an early build
  drew it as one rect and its hard vertical edges showed; the sliced
  version has no visible seam).
- Stroke texture: 900 short horizontal strokes precomputed from a
  mulberry32 stream (seed 768001), positioned inside the band, each with
  seeded length, weight, tone (shadow gray or flare), and alpha. Their
  drawn alpha multiplies by p, so the texture exists only while the band
  does.
- Time model: v(t) is a closed-form function of recorded drag samples.
  Idle sway is `v = 0.35 + 0.32 * sin(2*pi*t/20)`. On release, the
  sample (t, v) is recorded and the offset from the sway decays as
  `exp(-dt/1.4)`, anchored to the sway value at release time so the blend
  never jumps. Frame one is the synchronous `draw(0)`: v = 0.35, p = 1,
  the band at full presence. No `Date.now()` anywhere; rAF is
  `typeof`-guarded and the animation is anchored to elapsed time since
  load, never to a wall clock.

## QA log

- Rendered with `~/workspace/tools/render-piece.js` (node-canvas):
  qa-desktop.png at 1280x900, qa-mobile.png at 390x844, thumb.png at
  720x720.
- Determinism gate: thumb.png rendered twice and byte-compared with
  `cmp` — identical both before and after the flare-wash fix. Duplicate
  render deleted.
- Read-back, desktop: pale wall and floor strip; centered near-white
  square panel with a visible layered hover shadow and thin right/bottom
  bevel; soft taupe center band clearly present with fine horizontal
  stroke texture and a gentle central warm flare; no hard edges anywhere.
- Read-back, mobile: same composition in the tall frame, panel square
  (pixel-scanned: 329 x 330 field region, vs 623 x 624 on desktop),
  band and strokes legible, nothing clipped.
- One fix during QA: the first flare wash was a single rect whose hard
  vertical edges read as seams inside the band; replaced with the
  32-slice smooth-profile wash and re-rendered all three sizes.

## Deviations

- None from the prompt's substance. The prompt's numbers (band alpha
  peak/ floor, 20 s sway, ~6 px / 12% hover shadow, 3 px bevel) are
  implemented as specified; the alpha profile is realized through the
  presence lobe and slice feathering above rather than a single rect
  alpha, which is what keeps the band edgeless as the prompt's
  "no hard-edged stripes" rule requires.
