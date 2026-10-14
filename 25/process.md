# №25 · Interference - process notes

## Concept
A plain dot grid whose radii are set by the product of two linear
waves, one running across and one running down. Where both waves
crest the dots are fat; where either troughs they vanish, so the
grid breaks into islands of tone. Single indigo ink on cream.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 25. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style.
  Centered composition on cream.
- 44x44 grid; wave numbers 2 to 5 cycles across the field.
- Compositional safety: the two wave numbers may differ by at most
  2, so neither wave dominates and the piece cannot collapse into
  stripes.

## Differentiation
- vs No.11 (Halftone): one radial cosine from a single center.
  Interference has no center; two straight waves multiply, and the
  islands tile the whole square.
- Family name: "two-wave product dot grid".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `25/index.html`, `25/thumb.png` (720x720, rendered from the live script), `25/process.md`. Gallery entry appended at the end of page3.html with the formula date.
