# No.601 — Herringbone Garden

EXPANSION #73 paz-tamburrini, prompt block 1 "Retícula y Morfología".

## Concept

Tamburrini's 2026 embossing register treated as a light instrument. A sheet of
fibrous beige paper fills the frame. Two relief layers are embossed into it: a
strict herringbone grid block centered at about 60% of the frame width, and
organic teardrop, leaf, and circle forms scattered around it and overlapping
its edges. The relief carries no drawn line and no ink: it is only visible
because a raking light moves across the sheet, picking facets up and letting
them sink back as it passes. One faint red smudge in the upper-right third is
the single color event. The piece is about the light, not the shapes.

Watch-only: the light orbits once every ~36 seconds. Dragging anywhere takes
control of the light azimuth (the light sits toward the pointer, measured from
frame center); on release the slow orbit resumes from that angle. The relief
pattern itself never changes.

## Construction

- **Facet relief (precomputed, fixed).** All geometry is built once per size
  from a mulberry32 RNG with fixed seed 601073, so the pattern is identical
  every load and at every size. No per-pixel image data, no offscreen canvas,
  no ctx.filter.
- **Herringbone.** The block is tiled in cells of paired planks: a cell holds
  two horizontal planks or two vertical planks, alternating by cell parity
  (basketweave herringbone). Each plank is split along its long axis into two
  bevel facets whose normals tilt to opposite sides (plus/minus 0.66 on the
  cross axis). Planks are slightly inset over a fiber-gray groove bed, so the
  gaps read as depth. Per frame, each facet is flat-filled with a blend of the
  palette colors driven by the dot of its normal with the light direction:
  facing facets rise toward paper beige, turned facets fall toward warm
  shadow gray, fiber gray is the mid tone. Nothing is ever stroked, so the
  grid can only be read through light and shadow.
- **Organic forms.** Seventeen teardrop/leaf/circle blobs sit on a fixed
  hand-placed anchor layout orbiting the block. Outlines are 28-point seeded
  radial blobs (tapered for teardrops, pinched for leaves). Each form is a fan
  of six wedge facets from its centroid, normals fanned around and shaded at
  reduced strength (0.62) so the forms read as soft domes. Each form also gets
  two offset silhouette copies per frame: a warm-shadow copy shifted away
  from the light and a pale highlight copy shifted toward it, which is what
  makes the emboss lift off the sheet under raking light.
- **Paper fiber.** Seeded speckles and short strokes in fiber gray at low
  alpha, drawn directly under the relief. Density scales with area.
- **The smudge.** Twenty-six overlapping soft ellipses in the red, seeded,
  clustered at (0.685, 0.285) of the frame. Fixed position.
- **Palette (strict).** Paper beige #E8DFD2, fiber gray #C9BFAE, shadow warm
  gray #8A7E6E, red smudge #A63A2E. Facet fills are blends of these three
  neutrals only; the one highlight copy uses a near-paper tint at 16% alpha.
- **Light and time.** Frame one is drawn synchronously at a fixed phase
  (PHASE0 = 0, light azimuth THETA0 = 0.86 pi, raking in from the left) so the
  herringbone reads clearly on load. The rAF loop is typeof-guarded and
  anchored as PHASE0 plus elapsed-since-load; the first frame is never
  derived from Date.now() (there is no Date usage at all). Drag state is
  pointer-driven; on release the orbit re-anchors to the released angle.
- **House rules.** Canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas.style.width/height
  pinned in px inside draw(); phone detection via window.screen physical
  size (min dimension < 700px) with aspect fallback (h > w * 1.15). The sheet
  is full-bleed at every size and the page ground is the paper beige. Small
  lowercase "drag" hint, bottom-right, in shadow gray.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png). All three read back and inspected.
- Determinism gate: thumb.png rendered twice and cmp byte-compared:
  identical (repeated after the refinement pass; second render deleted).
- Desktop/thumb: herringbone block reads as embossed weave through facet
  shading alone, no drawn outlines; organic domes orbit the block and overlap
  its edges; the red smudge sits over the block's upper right, faint and
  singular; fiber visible at full size.
- Mobile: full-bleed sheet, block and all seventeen forms inside the frame,
  smudge visible, hint legible, nothing clipped.
- Refinement pass after first read-back: softened plank normals (0.92 to
  0.66) and capped the shadow blend so the weave reads as matte embossing
  rather than a graphic textile pattern; organic outlines raised from 18 to
  28 points with lower wobble and the fan widened from 3 to 6 wedges at
  reduced shading strength, so the forms read as soft embossed domes instead
  of angular crystals. Re-rendered all sizes and re-verified determinism.

## Deviations

- The herringbone is realized as a basketweave of paired planks rather than
  a literal 45-degree rotated herringbone twill: at gallery scale the paired
  weave gives the same strict-grid-versus-organic dual grammar and a much
  clearer relief read under a moving light, with honest axis-aligned bevel
  normals. Recorded here per house practice.
- Facet fills blend between the three specced neutrals (that blending is the
  shading mechanism the prompt's technical approach calls for: relief read
  through shadow). No hue outside the palette is introduced; the organic
  highlight copy is a near-paper tint at low alpha, inside the beige family.
