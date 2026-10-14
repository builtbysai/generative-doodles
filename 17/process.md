# №17 · Weave - process notes

## Concept
Plain weave as a drawing rule: a grid of cells, each holding one
capsule, horizontal or vertical, alternating in checkerboard parity
the way warp and weft alternate over and under. A few seeded rows
flip the parity: faults in the cloth where the pattern restarts. Ink
per cell comes from a slow seeded field between charcoal, brown and
ochre on cream, so the cloth has weather as well as structure.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 17. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style; field
  full-bleed on phones via the screen check, square on desktop.
- 26x26 cells; capsule inset so neighbors never touch; 2 to 4 fault
  rows per piece.

## Differentiation
- vs No.9063 (Loom): threads strung between nested rings. Weave's
  threads never leave their cells; the cloth is a grid, not a loom.
- Family name: "parity weave with faults".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `17/index.html`, `17/thumb.png` (720x720, rendered from the live script), `17/process.md`. Gallery entry appended at the end of page3.html with the formula date.
