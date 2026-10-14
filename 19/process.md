# №19 · Stitch - process notes

## Concept
Cross-stitch as a system: a grid of cells, each either empty or
holding one X of two crossed strokes. A smooth seeded field read
against a threshold decides stitching, so the stitches gather into
a soft continent with a ragged coast; where the field runs highest
the stitches turn vermilion on cream, the rest charcoal.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 19. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style; field
  full-bleed on phones via the screen check, square on desktop.
- 34x34 cells. The threshold is not fixed: it is read from the
  field's own sampled distribution to hit a target coverage of 34 to
  48 percent, so every seed's continent fills its band.

## Differentiation
- vs No.9074 (Hatch): single-direction engraved lines weighted
  around a disc. Stitch's atom is the X, its order is a thresholded
  field, and its ground is paper, not a disc.
- Family name: "threshold cross-stitch field".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `19/index.html`, `19/thumb.png` (720x720, rendered from the live script), `19/process.md`. Gallery entry appended at the end of page3.html with the formula date.
