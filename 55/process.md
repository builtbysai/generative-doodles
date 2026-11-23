# №56 · Egg Trace - process notes

## Concept
A parametric egg after automination's formula piece, drawn as a
3D point cloud that stitches itself together ring by ring.

## Construction
- Single self-contained page, canvas 2D, no libraries, no 3D
  library. The surface x = (0.9 + 0.2v) sin(v) cos(u),
  y = 1.65 cos(v), z = (0.9 + 0.2v) sin(v) sin(u) is sampled on a
  40 by 30 grid, 1,200 points, projected with a fixed tilt and a
  simple perspective divide.
- Seamless 8s loop: 4s draw-in in v-band order with the newest
  ring in flat amber, 2s hold rotating one full turn, 2s dissolve
  along per-point phase offsets. Ring lines connect u-neighbors
  in dim gray; points are flat warm white. No shading, no filled
  triangles, no gradients.
- Drag x bends the surface v-frequency between 0.05 and 0.45,
  drag y tilts the axis; release eases both back over 3s.
- Full-bleed on phones via the screen-size check where the
  composition is a field, otherwise centered on the matching
  ground color; Visual Viewport sizing; canvas pinned by style.

## QA log
- First QA render clipped the egg at the bottom; the surface
  scale was reduced and the render re-inspected clean.
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before pushing. Hans's real-device check is the
  final gate.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs; hint is lowercase and short.
- Files: `56/index.html`, `56/thumb.png` (720x720, rendered from the live script), `56/process.md`. Gallery entry added to pieces.json with the formula date.
