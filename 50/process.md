# №50 · Mandelbulb Orbit - process notes

## Concept
A ray-marched Mandelbulb fractal filling the frame, lit from one
side, on a slow closed orbit (after darien.brito; prompt 15 in
Bug's ig-artist-study queue, after his Genuary 2026 day 31 piece).
Bone #e8e4d8 shading to shadow on #000000, one neon rim in cyan
#3dd6e8 where the surface turns away. The AV-show feel, kept to
three colors.

## Construction
- Single self-contained page, canvas 2D, no libraries, no WebGL:
  the prompt's own CPU fallback route. The power-8 Mandelbulb SDF
  is sphere-traced over a coarse aspect-correct grid (about 104
  cells across), normals come from the depth buffer, so the same
  code runs in the node-canvas QA harness and on any device.
  The camera rides a closed 30 second orbit; drag tilts the
  orbit plane and dollies within safe bounds, easing back on
  release.
- Full-bleed on phones via the screen-size check (the bulb bleeds
  off the tall frame), square on desktop; Visual Viewport sizing;
  canvas pinned by style.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing. First mobile pass stretched the bulb
  (square grid on a tall rect); the grid is now aspect-correct.
  Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `50/index.html`, `50/thumb.png` (720x720, rendered from the live script), `50/process.md`. Gallery entry added to pieces.json with the formula date.
