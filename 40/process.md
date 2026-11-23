# №41 · Light Orbit - process notes

## Concept
Three great circles of a sphere drawn as if by a moving point of
light (after mathiaskrissmer; prompt 6 in Bug's ig-artist-study
queue). Each ring turns around a different axis at an integer
rate, so the 28 second loop closes exactly. The glow is layered
additive strokes (alphas 0.08, 0.25, 0.7, decreasing width), never
a blur filter; crossings brighten from blending alone. White on
#050505, no other color, no markers, no axes.

## Construction
- Single self-contained page, canvas 2D, no libraries. Rings are
  128-sample polylines rotated in 3D and projected orthographically.
- Drag orbits the viewpoint; on release the offset eases back to
  the auto-loop. Visual Viewport sizing; canvas pinned by style;
  full-bleed on phones via the screen-size check.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing. Hans's real-device check is the final
  gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short. (No.42's caption is the
  generated binary string the prompt specifies.)
- Files: `41/index.html`, `41/thumb.png` (720x720, rendered from the live script), `41/process.md`. Gallery entry added to pieces.json with the formula date.
