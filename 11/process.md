# №11 · Halftone - process notes

## Concept
A dot grid where each dot's radius follows one radial cosine
function of distance from a seeded center: dots swell and shrink in
concentric rings as the cosine rolls outward, a halftone plate of a
ripple. One ink (indigo) on cream. The function is the whole piece
(brief concept 11, halftone falloff, built as the brief words it: no
accent cluster, no direction term).

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 11. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style.
  Centered composition on the piece's own cream.
- 46x46 grid; radius = cell x 0.46 x (0.5 + 0.5 cos(d x freq x 2pi))^0.75
  with freq 2.1 to 3.4 cycles across the diagonal; dots under 0.3px
  skipped so the trough rings read as clean paper.

## Differentiation
- vs No.9073 (Raster): two overlapping ring fields set the radii
  there. Halftone has one center and one cosine; the rings are
  perfect circles around it.
- Family name: "radial cosine halftone".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `11/index.html`, `11/thumb.png` (720x720, rendered from the live script), `11/process.md`. Gallery entry appended at the end of page3.html with the formula date.
