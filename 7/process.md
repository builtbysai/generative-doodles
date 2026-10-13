# №7 · Vanishing - process notes

## Concept
A floor of dots in perspective receding to one off-center vanishing
point. Rows are placed by a perspective power curve so they crowd near
the horizon and stride apart near the viewer; each dot's x is pulled
toward the vanishing point by the same depth factor, and radius grows
with approach. Warm white on black: depth from dots alone (brief
concept 7, dotted vanishing).

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 7. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style; field
  full-bleed on phones via the screen check, square on desktop.
- 25 columns by 16 rows; depth factor starts at 0.16 so the far rows
  compress into a band near the vanishing point instead of smearing
  into it.
- Iterated twice in review: v1's first rows piled invisibly onto the
  vanishing point (pure power curve from zero), leaving a dirt smudge
  and dead space above. Floored the depth factor and reduced the rows.
- Vanishing point gated to the middle band (x 0.28 to 0.72, y 0.22 to
  0.58) so the floor always has a horizon inside the frame.

## Differentiation
- vs No.9073 (Raster): a flat dot grid with interference radii.
  Vanishing's grid is a projected floor; position, spacing and size
  all encode one depth.
- Family name: "perspective dot floor".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `7/index.html`, `7/thumb.png` (720x720, rendered from the live script), `7/process.md`. Gallery entry appended at the end of page3.html with the formula date.
