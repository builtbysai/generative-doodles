# №32 · Sixteen Trees - process notes

## Concept
Four dots have exactly 16 spanning trees (Cayley: 4 to the power
4 minus 2). This piece generates all of them at load from Pruefer
sequences of length 2 over 4 nodes, which map one to one onto the
trees: 16 trees, 3 edges each, all acyclic. They sit in a 4 by 4
grid with the dots in identical diamond positions in every panel
(two filled, two open), so the eye compares edges, not dots. A
highlight sweep travels panel by panel; in the lit panel the three
edges draw in sequence, pen on paper, then settle. Ground #f4f1ea,
ink #1a1a1a, no accent.

## Construction
- Single self-contained page, canvas 2D, no libraries. The sweep
  runs 1.6 seconds per panel and loops forever. Drag horizontally
  to scrub the sweep; on release it holds for 4 idle seconds, then
  resumes from the scrubbed position.
- Visual Viewport sizing; canvas pinned by style; full-bleed on
  phones via the screen-size check, square on desktop.

## Differentiation
- Second piece in the ruuddotorg enumeration series. vs No.31
  (Eleven Nets): there the complete set folds; here the complete set
  is scanned, one tree at a time, by the drawing hand of the sweep.

## QA log
- Default frame rendered from the actual page script (node-canvas)
  at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size,
  and inspected before pushing; for No.31 a mid-fold frame was also
  rendered and inspected. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `32/index.html`, `32/thumb.png` (720x720, rendered from the live script), `32/process.md`. Gallery entry added to pieces.json with the formula date.
