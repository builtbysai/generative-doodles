# №59 · Six Twenty Five - process notes

## Concept
A 25 by 25 field of 625 tiles after automination's tile solver,
scrambling and solving itself in a ripple from the center.

## Construction
- Single self-contained page, canvas 2D, no libraries. Each tile
  has a home position and a seeded scrambled position (a full
  permutation of the 625 cells). Solving animates each tile along
  an L-shaped Manhattan path, staggered by distance from center.
- 12s loop: solve ripple over 8s (moving tiles flat amber, solved
  tiles flat paper, waiting tiles flat slate, a thin white pulse
  ring marks the wavefront), 2s hold, 2s rescramble.
- Drag paints a local scramble zone; those tiles re-solve over
  the following seconds while the global loop keeps running.
  Tiles stay square on every layout, centered on the black ground.
- Full-bleed on phones via the screen-size check where the
  composition is a field, otherwise centered on the matching
  ground color; Visual Viewport sizing; canvas pinned by style.

## QA log
- First QA render stretched the tiles on phones and let the
  pulse ring spill outside the grid; tiles are square on every
  layout now and the pulse is clipped to the grid.
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing. Hans's real-device check is the
  final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `59/index.html`, `59/thumb.png` (720x720, rendered from the live script), `59/process.md`. Gallery entry added to pieces.json with the formula date.
