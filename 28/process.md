# №28 · Braids - process notes

## Concept
Three sine strands running down the page, phase-shifted by a third
of a period, woven: segments are drawn slice by slice down the page,
and within each slice the strand order rotates, so each strand
passes over, then under, then over at the crossings. Two strands are
charcoal; the third, weaving against both, is vermilion on cream.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 28. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style; field
  full-bleed on phones via the screen check, square on desktop.
- 240 slices per strand; the weave turn advances with the pair
  crossing rhythm (1.5 turns per wave period).

## Differentiation
- vs No.5 (Contours): many parallel lines sharing one travelling
  wave. Braids are three strands crossing each other; the over-under
  order is the drawing.
- Family name: "three-strand weave".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `28/index.html`, `28/thumb.png` (720x720, rendered from the live script), `28/process.md`. Gallery entry appended at the end of page3.html with the formula date.
