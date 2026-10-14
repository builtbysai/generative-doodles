# №14 · Armature

Two wireframe solids turning against each other: an outer frame and an inner
frame, counter-rotating, drawn in two flat neons on near-black.

## Method

- Seeded PRNG (mulberry32, default seed 14; click mints a new form).
- Outer solid: icosahedron or torus (seeded). Inner solid: octahedron or small
  icosahedron (seeded), counter-rotating.
- Each frame: rotate vertices about X and Y, perspective-project, sort every
  edge far-to-near, draw with depth-cued alpha and line weight.
- The whole figure breathes (slow scale pulse) and wobbles on its tilt axis.
- Two flat neon colors, no gradients. Ground is near-black.

## Motion

requestAnimationFrame loop; rotation speeds ~0.2–0.5 rad/s, slow enough to
read as a physical armature turning in space. ~600 edges max: trivial for
phones at 60fps.

## Phone rules

Canvas pinned via style width/height (no doubling), sizing from visualViewport
with window fallback, DPR capped at 2. On tall portrait viewports the figure
scales up 1.55x so it fills the frame instead of floating small and centered.
