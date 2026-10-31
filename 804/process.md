# No.804 "The Fold" — EXPANSION #98 olivier-mosset, PP5

## Concept

Mosset's stripe paintings are flat pigment and nothing else, except in the
folded-corner variant, the one place he allows illusionism: a field of even
red/white horizontal stripes whose lower corner appears to fold back into a
striped box. This piece keeps the illusion painted, never photoreal. At rest
the fold is closed and the field reads flat, betrayed only by a hairline seam
and a whisper of shadow in the lower-right. Dragging peels the corner open;
the stripes continue across the fold edge onto both revealed faces, because
continuity is built into the geometry rather than drawn in afterward.

## Construction

Single self-contained `index.html`, canvas 2D only, strict palette: stripe
red #C02E24, stripe white #F2EEE6, box shadow #8A2119. No gradients, no
shadowBlur, no filters, no offscreen canvas; all softness is layered alpha
shapes in the shadow tone. Sixteen even horizontal bands fill the frame.

Fold geometry. The hinge runs from A = (W, H − fl) on the right edge to
B = (W − fl, H) on the bottom edge, where the fold leg fl is 0.30 of the
smaller frame dimension (0.36 on phones, so the fold stays grabbable and
legible on a small frame). C = (W, H) is the corner; T = (A, B, C) is the
triangle that lifts. Because the legs are equal, the hinge sits at 45
degrees, with unit vectors d = (−1, 1)/√2 along A→B and n = (1, 1)/√2
toward C.

Band projection. Stripes are never redrawn per face; each face is painted by
clipping polygons to the same horizontal band strips (Sutherland–Hodgman
against y ≥ y0, y ≤ y1, strips widened 0.5 px so no hairline opens between
bands) and mapping the clipped vertices through the face's transform:

- Flap: foldMap(P) rotates P about the hinge axis by the fold angle θ and
  projects orthographically. With v = P − A split into par = v·d and
  per = v·n, the image is A + par·d + cos θ · per·n. At θ = 0 this is the
  identity, so the closed flap reproduces the flat pattern exactly; as θ
  grows the flap foreshortens toward the hinge, the bands keeping their
  order and spacing ratios.
- Revealed underside: the corner triangle T, painted with the front pattern
  of the mirrored point: colour at P is the band of reflect(P), where
  reflect mirrors across the hinge. On the hinge reflect(P) = P, so the
  underside's stripes agree with the field's stripes exactly on the fold
  line; beyond it they run mirrored (horizontal bands read as vertical on
  this face), which is what makes the region read as a second, differently
  turned face of the box.
- The cast shadow is the flap triangle (A, B, foldMap(C)) shifted toward
  the corner in two layered passes (offsets 0.10·fl and 0.05·fl, alphas
  0.16 and 0.22, both scaled by the opening), over a flat 0.14-alpha shade
  wash on the underside. The flap's free edges get one painted line each in
  the shadow tone.

Interaction. A drag may start anywhere on the canvas (chosen over
corner-only grabbing: the corner is small on desktop frames, and the
gesture is a peel, so the whole surface accepts it). Pulling toward the
upper left opens; pushing back closes. Opening o ∈ [0, 1] maps to
θ = o · 65°. Drag state is recorded as {t, o} samples on the piece's
load-anchored timeline (never Date.now), and the opening at any time is
piecewise-linear between samples with the last held after release: the fold
stays exactly where it was left, no snap, no spring, never click-to-reload.
Frame one is the synchronous draw at opening 0.

Sizing follows the house rules: canvas from the Visual Viewport API with
resize listeners on visualViewport and window, canvas pinned in px inside
draw(), phone detection via window.screen (min dimension < 700 px) with the
aspect fallback. Page ground is the stripe white. The rAF loop is
typeof-guarded; no audio, no text except the title.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280×900
  (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png).
- Determinism: thumb.png rendered twice and compared with cmp:
  byte-identical. Frame one is the closed fold, drawn synchronously at
  t = 0 with no drag samples.
- Read-back, closed state (all three sizes): a flat, even red/white stripe
  field, full-bleed; the only marks in the lower-right are the hinge
  hairline and the soft shadow whisper along it. Mobile keeps the fold in
  the lower-right quadrant, nothing clipped.
- Throwaway check, opening forced to 1 (samples patched in a /tmp copy,
  rendered, inspected, deleted): the flap stands at the corner with its
  stripes foreshortened and unbroken across the hinge; the underside shows
  the mirrored (vertical-reading) stripes under the layered shadow; the two
  faces plus shadow read as the painted box corner.
- Throwaway check, opening forced to 0.5 at 720×720 (same method, deleted):
  the peel is progressive, bands cross the fold line without a break, and
  the underside sliver appears at the right and bottom edges.

## Deviations

- Full opening is θ = 65° rather than a right-angle 90° box corner: at 90°
  the flap's projection collapses onto the hinge line and the corner reads
  as a sliver instead of a face. 65° keeps both faces legible while staying
  inside the frame; the illusion remains painted geometry, per the prompt.
- The prompt describes the corner as occupying the lower-right quadrant;
  the fold leg is 30% of the smaller dimension, so the fold sits inside
  that quadrant at every aspect tested rather than spanning it fully.
