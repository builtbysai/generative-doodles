# №22 · Bricks - process notes

## Concept
A stretcher-bond brick wall drawn as outlines only: rows of bricks,
alternate rows offset by half a brick, each brick a stroked rounded
rectangle in warm charcoal on cream, mortar showing as the paper
between. Imperfections by rule: slight seeded drift per row, brick
heights varying a breath per row, and exactly one vermilion brick
hidden in every row.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 22. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style; field
  full-bleed on phones via the screen check, square on desktop.
- 14 rows, bricks 1/5.5 of the field width, edges clipped by the
  field boundary so the wall runs off the page.

## Differentiation
- vs No.9069 (Alluvium) and the deleted No.9069 Bastion (not
  recreated): no masonry masses or sediment here; Bricks is the
  bond pattern itself, outline only, at doodle scale.
- Family name: "stretcher bond outline wall".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `22/index.html`, `22/thumb.png` (720x720, rendered from the live script), `22/process.md`. Gallery entry appended at the end of page3.html with the formula date.
