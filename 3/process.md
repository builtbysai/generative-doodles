# №3 · Desordres - process notes

## Concept
A homage to Vera Molnar's (Des)Ordres, which Hans saved: a strict grid
of squares on cream, and one rule of subversion. Disorder grows across
the grid from one corner to the other (power 1.9): near the calm
corner each square sits almost exactly on its point, barely turned; by
the far corner squares are rotated up to about 36 degrees and shoved
off their points by layered sine noise. A seeded 4 percent of squares
are vermilion (brief concept 3).

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 3. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style.
  Centered composition on the piece's own cream ground.
- 12x12 grid; rotation and offset scaled by the disorder gradient;
  jitter from a separate seeded stream so the vermilion gate does not
  eat the layout randomness.
- Compositional safety: vermilion share gated to 1.5 to 7 percent of
  the grid. Iterated once: v1's gradient was too gentle to read, so
  the curve steepened and the maxima rose.

## Differentiation
- vs No.9075 (Warp): a checkerboard deformed by waves, filled cells.
  Desordres squares are stroked outlines that rotate and drift in
  place; the grid points themselves never move.
- Family name: "gradient-disorder square grid".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `3/index.html`, `3/thumb.png` (720x720, rendered from the live script), `3/process.md`. Gallery entry appended at the end of page3.html with the formula date.
