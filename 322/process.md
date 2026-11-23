# No.808 "The Foggy Mirror" — EXPANSION #99 jacob-kassay, block 1

## Concept

Kassay's silver painting has no image of its own: the electroplated surface
is a foggy, low-sharpness mirror, and the work is whatever the room gives
back to it. This piece stages that condition. One tall silver panel floats
on a near-black ground; inside the metal, a simulated room ghosts through
the fog — a bright window rectangle with a faint mullion cross, a dark
doorway, a warm patch and a cool patch — all blurred past recognition into
soft tonal weather. Amber-brown oxidation creeps the top, bottom, and left
margins, the plating bath's chemical memory. Dragging turns the room: the
reflection slides with depth parallax, brighter shapes travelling further.
Untouched, the view drifts gently. The reflection never sharpens; fog is
the medium.

## Construction

- Single self-contained `index.html`, canvas 2D only. The prompt's WebGL
  fragment-shader approach is adapted to layered canvas shapes under house
  renderer limits (no WebGL, no gradients, no `ctx.filter`, no shadowBlur,
  no offscreen canvas): softness is built from many nested flat-alpha
  rects and ellipses. Each soft shape carries precomputed per-layer center
  jitter, so the layers mottle instead of ringing concentrically.
- All data is seeded (mulberry32, seed 808001) and precomputed at load:
  26 clouding patches in the silver, 4 room shapes with parallax depths
  (window 1.00, warm patch 0.65, cool patch 0.60, doorway 0.55), 2600
  weave speckle ghosts, and the oxidation field: a per-cell threshold
  field along the top, bottom, and left edge bands (the construction
  standard of No.809 Burnt Edge). Each cell's alpha is a seeded
  low-frequency value-noise field times an inward falloff — densest at
  the edge line, feathering to an irregular, noise-undulated front
  roughly 10–20% inward — and cells are drawn as small overlapping
  rects in two passes (coarse body, fine mottle) with seeded position
  jitter, so the aggregate is one continuous creeping stain with no
  units of any shape. Stain tone runs #8A5A2A at the feather front to
  #4A2E12 at the saturated edge. Stains are fixed to the panel surface
  and never slide with the reflection.
- Palette is strict: silver #C8C8C8 / #A9A9A9, weave #BDBDBD, oxidation
  #8A5A2A → #4A2E12, ground #1A1A1A. Tint mixes used, all derived from
  those tones: warm patch = silver mixed 0.16 toward the oxidation tone;
  cool patch = low silver mixed 0.10 toward the ground; doorway = low
  silver mixed 0.52 toward the ground; mullion seams = low silver mixed
  0.25 toward the ground; panel base = the two silvers mixed 0.45.
- Viewpoint is a closed-form function of recorded drag samples and t:
  during a drag the offset follows the pointer (0.55 gain); after release
  it decays exponentially (tau 2.4s) back to rest; an independent slow
  two-sine idle drift runs underneath. The composed shift is clamped so
  the room slides inside the fog but never leaves it.
- Viewport sizing uses the Visual Viewport API with resize listeners on
  both visualViewport and window; the canvas CSS size is pinned in px
  inside `draw()` every frame. Phone detection uses `window.screen`
  (min dimension < 700px) with the aspect fallback; on phones the panel
  takes a wider share of the narrow frame and stays tall and centered.
- Frame one is the synchronous `draw(0)`: drift phase 0, window visible
  in the panel's upper area, oxidation present at the edges. No
  `Date.now()` anywhere; the animation clock is anchored at load and the
  rAF loop is typeof-guarded.

## QA log

- Renders: qa-desktop.png 1280x900, qa-mobile.png 390x844, thumb.png
  720x720, all via `node ~/workspace/tools/render-piece.js`.
- Determinism: thumb.png rendered twice, `cmp` byte-identical (second
  render deleted).
- Read-backs: all three sizes show the tall silver panel on near-black,
  the bright window ghost upper-left with its faint contained cross, the
  dark doorway right-center, warm/cool patches as fog weather, and
  mottled amber-brown oxidation at the top, left, and bottom edges.
  Nothing clipped on mobile; panel stays tall and centered.
- Fix rounds during QA: (1) first pass oxidation drew as discrete rings
  and bubbles — rebuilt as wide low-alpha mottled clusters with jitter;
  (2) the window first read as a bare cross icon — window body brightened
  (alpha 0.74) and the mullion seams made wider, fainter, and contained
  inside the window bounds (an intermediate version let the seams escape
  across the whole panel; caught and fixed before final renders).
- Gate fix round (fly's gate): the mottled-cluster oxidation still read
  as a chain of distinct translucent circles along the margins —
  overlapping ellipse outlines like bubbles or coins. Rebuilt from
  scratch as the per-cell threshold field described under Construction
  (seeded value noise × inward falloff, irregular front, two rect
  passes). A first cell-field render showed a woven plaid from the
  regular overlap lattice; seeded per-cell position jitter, wider
  overlap, and a lower mottling frequency broke the lattice, leaving a
  grainy amorphous stain. All three sizes re-rendered; desktop and
  mobile read back by eye: stain densest at the top, bottom, and left
  edge lines, feathering inward, no circles and no grid at any size.
  Determinism re-verified after the fix: thumb.png rendered twice,
  `cmp` byte-identical (duplicate deleted).
- Deviations: the WebGL shader of the prompt is replaced by the layered
  2D construction above (house renderer limit), recorded here and in the
  brief's own terms. No other deviations; no sound, no text beyond the
  title, no color outside the silver/oxidation family.
