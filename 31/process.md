# №31 · Eleven Nets - process notes

## Concept
There are exactly 11 distinct nets of a cube. This piece enumerates
them at load: hexominoes grown by Redelmeier expansion, deduplicated
under the square's 8 symmetries, then passed through a fold test
that assigns each square a cube-face normal and rejects any shape
whose squares collide. 35 hexominoes go in; 11 come out. One net is
the hero: it folds into a cube and unfolds on a 6 second loop, drawn
as flat ink faces in orthographic projection. The hero advances to
the next net every 12 seconds; the other ten sit in a grid below.
Ground #f4f1ea, ink #1a1a1a, the root square in flat rust #b5542d.

## Construction
- Single self-contained page, canvas 2D, no libraries, no 3D engine:
  the fold is a hinge tree over the net (each square rotates about
  its shared edge with its parent, staggered by depth), projected
  orthographically and painted back to front.
- Motion and interaction per Hans's direction: perfect loop, never
  click-to-reload. Drag on the hero scrubs the fold timeline; drag
  on the grid and release on a panel makes that net the hero.
- Visual Viewport sizing; canvas pinned by style; full-bleed on
  phones via the screen-size check, square on desktop.

## Differentiation
- An enumeration piece in the ruuddotorg study series (prompts by
  Bug, 2026-10-14): the complete set is the content, nothing is
  sampled. Distinct from every field piece in the series so far.

## QA log
- Default frame rendered from the actual page script (node-canvas)
  at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size,
  and inspected before pushing; for No.31 a mid-fold frame was also
  rendered and inspected. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `31/index.html`, `31/thumb.png` (720x720, rendered from the live script), `31/process.md`. Gallery entry added to pieces.json with the formula date.
