# №57 · Spirograph Knot - process notes

## Concept
A hypotrochoid drawing itself pen-on-paper after automination's
spirograph pieces, one ratio laying lace over the ghost of the last.

## Construction
- Single self-contained page, canvas 2D, no libraries. Two
  hypotrochoids (R=5, r=3, d=2.2 in ink; R=7, r=5, d=3 in flat
  indigo) are drawn progressively with about 2,400 samples each
  at 1.5px; each loop starts from a slightly larger rotation so
  consecutive loops read as a slowly turning rosette.
- 12s cycle: the first curve draws over about 5.5s and holds,
  then fades to pale gray while the second draws on top.
- Drag moves the hole offset d in real time, morphing the figure
  under the finger; release returns to the loop values.
- Full-bleed on phones via the screen-size check where the
  composition is a field, otherwise centered on the matching
  ground color; Visual Viewport sizing; canvas pinned by style.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing. Hans's real-device check is the
  final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `57/index.html`, `57/thumb.png` (720x720, rendered from the live script), `57/process.md`. Gallery entry added to pieces.json with the formula date.
