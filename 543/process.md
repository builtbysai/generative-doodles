# No.543 Shadow Pools

EXPANSION #65 nadia-hafid, prompt NH7. Her black-pool device as the whole composition.

## Concept

A still life of five simple flat objects (bottle, cup, shoe, book, chair) stands
on an empty flat ground and never moves. Each object casts an exaggerated
solid-black blob shadow, larger and more graphic than physics allows. Over a
30-second seamless loop an unseen light source makes one full orbit: the pools
stretch, shrink, and swing around their anchors in response. The shadows are
the composition; the objects are just what pins them down. Watch-only, no
interaction, no hint text, no text anywhere in the piece.

Palette phase: the fixed seed (mulberry32, seed 543065) draws 0.9858 on its
first call, which under the piece's rule (draw >= 0.5) selects the BLUE phase.
The piece always opens in this phase and never changes: ground #A8C8CC, objects
in pink #F2B3C0 + white #FFFFFF, pools pure black #111111. Nothing else.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets.
- Design space 1080x1080, contain-fitted and centred; the ground colour fills
  the whole canvas first, so the page ground and the stage ground are one
  surface and the letterbox is invisible at any aspect.
- Pools: each is a closed blob path of 8 seeded points (radius wobble
  0.88-1.12, fixed forever) smoothed with midpoint quadratic curves, drawn in
  local space anchored at the object's base: tucked 0.16 of its length under
  the object, reaching 1.0 lengths out. Per frame the pool is rotated to the
  shadow direction and scaled by the light factors. Hard edges only: no blur,
  no gradient, no ambient occlusion anywhere.
- Light model: one angle makes a full 2pi turn per 30s loop; elevation rides
  the same cycle (sin of the same angle, integer ratio, so the loop is
  seamless). Length factor runs 0.55 (high light, short wide puddle) to 1.5
  (low light, long narrow rake); width factor runs inversely, 1.22 to 0.72.
- Objects are flat-shape functions drawn around their base point: bottle
  (label band), cup (saucer, ink coffee surface, white band, handle), shoe
  (upper with clipped white toe cap, white laces, ink sole), book (ink spine,
  white pages, ink text lines, bookmark ribbon), chair (backrest with white
  rail stripe, white seat cushion, two legs). All five pools are drawn first,
  then all five objects, so pools merge into one black field where they cross.
- Sizing follows the house rules: Visual Viewport API with resize listeners
  on visualViewport and window; canvas.style.width/height pinned in px inside
  draw(); phone detection via window.screen physical size (min dimension
  < 700px) with aspect h > w*1.15 as fallback only. On phones the stage spans
  the full width and centres vertically on the same ground colour.
- Determinism: frame one is drawn synchronously at the constant phase
  PHASE0 = 22.5s (light at its lowest, pools at full stretch, the most
  legible state of the piece). The rAF loop is typeof-guarded and anchored as
  PHASE0 + elapsed since load; frame one is never derived from Date.now().

## QA log

- Rendered with ~/workspace/tools/render-piece.js (node-canvas) at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp:
  identical. The second render was deleted.
- Desktop read-back: blue ground; five pink objects in two loose rows (bottle,
  cup, shoe across the back; book, chair in front) with generous negative
  space; five oversized hard black pools raking down-right at full stretch,
  merging where they cross; the pools clearly dominate the composition.
- Mobile read-back: stage spans the full 390px width centred on the same blue
  ground; all five objects whole and legible, pools swinging off the right
  edge read as shadows leaving the frame, nothing essential clipped.
- Thumb read-back matches the desktop composition.

## Deviations

- Ink black #111111, the specced pool colour, is also used for thin object
  outlines and small details (coffee surface, shoe sole, book spine and text
  lines). It introduces no new colour; it is how the flat objects stay legible
  against the ground, and it matches Hafid's own black-outlined flat shapes.
- Frame one sits at the loop's longest-shadow instant rather than at phase 0,
  so the thumbnail shows the pools at their most graphic. The loop itself is
  unchanged; only the entry point differs.
