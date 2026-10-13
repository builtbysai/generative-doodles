# №2 · Orb - process notes

## Concept
A sphere made of nothing but dots: points spread over a sphere by the
Fibonacci lattice, turned by a seeded tilt, drawn in orthographic
projection. A dot's size is set by how directly it faces the viewer,
and its color is sampled from an iridescent ramp (cyan, pearl,
magenta) by facing and latitude together. Back dots are culled; there
is no sphere underneath (brief concept 2, stipple orb).

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 2. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style.
  Centered composition, page ground is the piece's near-black.
- 2600 lattice points, seeded rotation around Y then tilt around X;
  dots sorted back to front, alpha by facing.

## Differentiation
- vs No.9073 (Raster): a flat grid whose radii carry a 2D interference
  field. Orb's dots live on a 3D surface; size and color carry facing.
- Family name: "fibonacci stipple sphere".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `2/index.html`, `2/thumb.png` (720x720, rendered from the live script), `2/process.md`. Gallery entry appended at the end of page3.html with the formula date.
