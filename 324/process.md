# No.812 "Footage"

EXPANSION #99 jacob-kassay, block 5 "Footage" (Hallwalls 2019): a photograph
of an OSB panel's own surface, printed back onto the panel with a small
offset, so the actual and the depicted collapse onto one stratum.

## Concept

A tall wood-flake panel stands on a thin saturated blue floor strip
against a white gallery wall. The panel's surface exists twice: the
actual layer of procedural flakes, and a printed layer of the same kind
of surface, laid over it slightly darker and shifted by a few pixels.
At zero shift the panel is one surface; as the shift grows toward 30px
the flakes double, a misregistered print shimmering at a marginally
different depth. Dragging sideways is the whole interaction: the
visitor controls the schism, and the offset stays where it is left.
Frame one opens at an 8px offset, so the doubling already whispers
before anyone touches it.

## Construction

- Single self-contained `index.html`, canvas 2D only. No external
  assets, no gradients, no shadowBlur, no ctx.filter, no offscreen
  canvas, no blend modes. No visible text except `<title>`.
- Canvas sized from the Visual Viewport API with resize listeners on
  both `visualViewport` and `window`; the canvas CSS size is pinned in
  px on every draw. Phone detection uses `window.screen` physical size
  (min dimension < 700px), with the aspect fallback `h > w*1.15`.
- Flake generation: both layers are precomputed polygon data from a
  seeded mulberry32 stream (actual layer seed 81201, printed layer
  seed 81277, 700 flakes each). A flake is an elongated strand chip:
  centre in unit panel coordinates, length 0.085-0.20 of panel width,
  width 0.013-0.030 of panel width (aspect roughly 5:1 to 8:1), a
  jittered 9-point outline, and an orientation drawn from OSB's loose
  directional clustering (55% near-horizontal, 45% near-vertical,
  scatter ±0.24 rad). The same unit-space data is scaled to whatever
  panel rect the current frame gives, so resizes never re-randomise.
- Actual layer tones follow the prompt palette weights: #8A5A2E 40%,
  #A9713A 30%, #6B4220 22%, deep shadow chips #3A2410 8%, over a
  #6B4220 base coat so no inter-flake gap shows the wall. Flakes are
  drawn fully opaque and sharp.
- Printed layer: an independent flake field (different seed, so it is
  a photograph of *a* surface of this kind, not a traced copy), drawn
  clipped to the panel and translated by the offset, every flake in
  the single darker print tone #5E3A1C at per-flake alpha 0.42-0.64.
  The flat darkening stands in for the prompt's multiply blend, which
  the house renderer rules exclude; perceptually it does the same
  work: where a printed flake crosses an actual one the wood darkens,
  and its displaced edge reads as the print's misregistration.
- Offset model: recorded pointer samples only. `offsetAt()` folds the
  grab/move/release list into one number: grab stores the current
  offset as its base, move sets offset = clamp(base + dx, 0, 30).
  There is no time term, no spring, and no reset; on release the
  offset simply persists. The printed layer also takes a small
  vertical component, 0.35 x the horizontal offset, so the
  misregistration is diagonal, like a sheet fed slightly askew.
- Composition: panel width is min(0.56 x frame width, 0.64 x panel
  height) on desktop, 0.82 x frame width on phones; the panel runs
  from 6% of frame height down to the top of the floor strip (strip
  height 3.5% of frame height, full width, #1F4FD6). A soft offset
  rect in the shadow tone at low alpha floats the panel off the
  #F5F5F5 wall, and a hairline of the same tone seats its edge.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and compared with `cmp`:
  byte-identical. Frame one is the synchronous draw at the initial
  8px offset with an empty event list; nothing in the drawing reads
  the clock, and the rAF loop is `typeof`-guarded (the QA renderer
  has no rAF, AudioContext, `document.createElement`, or offscreen
  canvas, and the piece uses none of them).
- First pass fix: the first build's flakes were sized as fractions of
  panel height for width, which on a tall panel gave ~2:1 chips that
  read as rounded pebbles, not strands. Rebuilt with width measured
  in panel-width fractions (true 5:1-8:1 strands), tighter angular
  scatter, and 700 flakes per layer; the cross-hatched OSB character
  and the long strand edges the offset needs became legible.
- Throwaway check (deleted after use): a copy with the initial offset
  patched to the 30px maximum was rendered at 720x720; the printed
  layer's dark strands sit visibly displaced against the actual
  strands across the whole field, edges doubling without turning
  into a glitch. The 8px frame one keeps the same effect at a
  whisper, as specced.
- Read-backs: desktop and thumb show the tall brown strand panel
  centered on white margins, float shadow at the right and bottom
  edges, blue strip full-width at the bottom; mobile keeps the panel
  tall and centered with both margins and the strip intact, nothing
  clipped. No text anywhere except the document title.

## Deviations

- Wall tone: the prompt names white wall margins without a hex; the
  ground-family white #F5F5F5 is used (the same wall tone as the
  study's Codax block), recorded here per the brief.
- Multiply blend replaced by flat alpha darkening (see Construction):
  the house renderer rules bar blend-mode dependence; the darker
  print tone #5E3A1C is the prompt's own print-layer colour.
- Initial offset 8px: the prompt fixes frame one only as "a small
  initial offset"; 8px was chosen as the smallest shift at which the
  doubling is already perceptible on close strands in the thumbnail
  without reading as damage.
