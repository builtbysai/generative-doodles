# №1570 - Interference Is the Drawing

- Title: Interference Is the Drawing
- Prompt code: SB3 / PP817, EXPANSION #207 (senbaku-deconbatch)
- Formula date: 2006 · 04 · 30
- Gallery note: "Stark black ground; concentric white circles overlaid with concentric white squares, their interference generating violent moire bands, interrupted by punched big holes. Drag to shift the moire."
- Reference study: senbaku-deconbatch Moire Magic "Big Holes" 2022-07-30

## Spec

Stark black ground; a field of concentric white circles overlaid with
concentric white squares, their interference generating violent moire bands
that swirl and shimmer. At the intersections, punched "big holes", clean
circular voids, interrupt the pattern like rests in music. Palette: pure
black #0A0A0A and white #F5F5F5. Nothing else. Composition: the circle set
centered, the square set slightly offset; moire does the composing.
Motion/interaction: drag anywhere and the square lattice offsets under your
finger, the moire pattern boils and re-forms live around the touch point
(her rule: drag only where the system earns it; here the offset IS the
instrument). Watch-only otherwise, with a slow autonomous drift so the
interference never sits still. Technical: two stroked-lattice layers (rings
and square rings), drawn each frame; pointer drag sets the square layer's
offset with eased follow; big holes via destination-out punches at seeded
positions. Avoid: color; decorative gradients; easing the moire into
prettiness (it should stay slightly violent); click-to-reload.

## Mechanism

Two stroked layers redrawn every frame on a #0A0A0A ground. Layer one:
concentric white circles centered on the canvas, spacing minDim/34 (21 px
at 720, 26 px at 1280x900), line width 9 percent of spacing. Layer two:
concentric white squares centered on the same point plus the live offset,
same spacing, so the two lattices beat against each other and the moire
bands do the composing. Seven big holes at seeded positions (mulberry32,
seed 1570), radii 0.04 to 0.072 of minDim, placed by rejection sampling so
no two holes overlap and none covers the caption corner. The caption line
carries title, formula date, and the hint "Drag to shift the moire."

## Deviation from the prompt: holes

The prompt specifies the holes as destination-out punches. Implemented
instead as solid black filled circles drawn OVER the lattices, in exactly
the ground color #0A0A0A. Reason: destination-out on the main canvas would
punch through to transparency, breaking the black ground in the thumb PNG
(and in any composited view). The visible result is identical: clean
circular voids interrupting the pattern, indistinguishable from punches
because the fill matches the ground exactly.

## Drag and drift: closed-form model

No frame-integrated state anywhere. The square-layer offset is a closed
form of piece time plus the recorded drag list:

- Autonomous drift: drift(t) = (14 sin(0.11t) + 6 sin(0.043t + 1.7),
  12 sin(0.093t + 0.6) + 5 cos(0.051t + 2.2)), a pure function of t.
- Fixed base offset: +0.45 step in x, -0.35 step in y, so the square set
  is slightly off the circle set from frame one and the moire is violent
  before any drift or drag.
- Completed drags: each records {dx, dy, ease}, where ease is the eased
  fraction applied at release; the offset adds dx * ease, dy * ease.
- Active drag: the pointer delta from drag start is scaled by
  1 - exp(-(t - t0) / 0.12), eased follow toward the finger.
- On release the applied fraction is frozen into the completed drag, so
  the offset never jumps. A tap without movement records a zero delta and
  changes nothing: no reseed, no reload, no click-to-reload anywhere.

Frame one is deterministic: fixed phase, drift at t = 0, holes at seeded
positions. The piece draws one synchronous frame at load and guards every
requestAnimationFrame call with a typeof check, so node-canvas QA works.

## Palette

Pure black #0A0A0A and white #F5F5F5 only. Probe-verified: zero
non-monochrome pixels in the dragged frame. No gradients, no shadowBlur,
no Path2D, no color of any kind. The page ground is the piece's own black.

## Interaction

Drag anywhere: the square lattice offsets under the finger and the moire
boils and re-forms live. Watch-only otherwise, with the slow autonomous
drift. A tap does nothing.

## House rules

Visual Viewport sizing (visualViewport/window, resize listened to on
both); canvas element pinned in draw() via canvas.style.width/height in
px; phone detection via window.screen (min dimension under 700 px) with
aspect fallback (h > w*1.15); field-like composition full-bleed on phones
and desktop alike; caption in white on the black ground. No em dashes in
visible copy. No AI-signature language.

## QA

Rendered from the actual script with node ~/workspace/tools/render-piece.js
at 1280x900 desktop, 390x844 mobile, and 720x720 for thumb.png; all three
inspected visually. Desktop: violent moire bands, circles centered,
squares slightly offset, seven clean separate voids, caption legible.
Mobile: same centered composition, no clipping, caption readable.
Thumb: clean, moire and holes read at small size.

Forced-time probe harness (vm-isolated instance, real node-canvas, piece
driven via its own rAF loop, pointer events to its own listeners):

- Determinism: two fresh instances at t = 0 differ in 0 px.
- Drift: t = 0 vs t = 10 differ in 130,512 px; offset moves from
  (15.4, -3.5) at t = 0 to (27.0, 0.1) at t = 10.
- Drag: a 120 px right, 80 px up drag at t = 2 to 3 shifts the square
  layer offset from (19.8, -1.6) to (139.7, -81.6); dragged vs undragged
  frames at the same clock t = 3 differ in 131,079 px, and the dragged
  render shows the square lattice visibly shifted with the moire re-formed
  around it while the holes stay fixed.
- Tap: pointer down and up at the same point changes 0 px and leaves the
  offset identical to the undragged frame.
- Monochrome: 0 non-monochrome pixels in the dragged frame.

## Fix rounds

1. First build: the seven seeded holes overlapped into three merged blobs
   clustered on the right side, and the frame-one moire was mild because
   the drift at t = 0 is near zero. Fixed by placing holes with rejection
   sampling (minimum separation of r1 + r2 + 0.035, caption corner
   excluded, radii narrowed to 0.04-0.072 of minDim) and by adding the
   fixed base offset of +0.45 step x / -0.35 step y so the square set is
   slightly off the circle set from frame one. All three renders re-done
   after the fix; no further rounds needed.
