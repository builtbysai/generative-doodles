# №46 · Voronoi Drift - process notes

## Concept
Points on a Fibonacci sphere, projected to a disk, each visible
point grown into its Voronoi cell (after darien.brito; prompt 11 in
Bug's ig-artist-study queue, a direct homage to the saved post).
The point count breathes 120 to 260 over a 20 second loop, so the
rare pentagon cells (flat amber #e8a33d) and heptagon cells (flat
cyan #3dd6e8) wander through the hexagon lattice. The defects are
the subject. Hairline edges #e8e4d8 on #0b0b0e, nothing else.

## Construction
- Single self-contained page, canvas 2D, no libraries. Cells are
  built per frame by half-plane clipping against the 12 nearest
  neighbours, then clipped to the disk; side counts are read from
  the cleaned polygon (near-duplicate points dropped, near-collinear
  edges merged) and only interior cells are colored, so boundary
  clipping cannot fake a defect.
- Drag rotates the sphere and the release velocity decays into a
  spin. Visual Viewport sizing; canvas pinned by style; the disk
  grows on phones via the screen-size check.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing. First pass colored too many cells;
  the polygon cleanup and interior-only coloring fixed it. Hans's
  real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `46/index.html`, `46/thumb.png` (720x720, rendered from the live script), `46/process.md`. Gallery entry added to pieces.json with the formula date.
