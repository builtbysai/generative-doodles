# №13 · Pack - process notes

## Concept
Circle packing under one strict rule: circles are offered largest
first, each at a seeded random spot, and placed only if they overlap
nothing already placed and stay inside the square. Radii descend
until the offers run out. Flat Bauhaus colors (black, red, yellow,
blue) on cream, fully opaque, no strokes.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 13. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style.
  Centered composition on cream.
- Up to 2600 offers with radius decaying geometrically from 0.155 of
  the field; a small constant gap keeps every circle visibly separate.
- Compositional safety: total disc area divided by field area (the
  coverage) must land between 0.42 and 0.78, else derived-seed retry
  (16 attempts, closest kept).

## Differentiation
- vs No.9070 (Orchard): circles there sit on a jittered orchard grid
  with rule-based fills. Pack's circles sit nowhere until the
  no-overlap rule admits them; position is earned, not assigned.
- Family name: "descending-offer circle packing".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `13/index.html`, `13/thumb.png` (720x720, rendered from the live script), `13/process.md`. Gallery entry appended at the end of page3.html with the formula date.
