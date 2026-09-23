# Doodle №9009: Corridor (2026-09-10)

**File:** `index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
Raven Kwok's 189D0 system, rebuilt from the study notes: a quadtree does the
composing, five small geometric solvers do the drawing, and a camera move
turns the flat index into architecture. One recursive subdivision (split
chance falls with depth, occasional golden-ratio slab splits, huge cells
forced to keep splitting) covers a 1408px square; every leaf gets exactly one
motif: concentric rings, circle clipped by inset square, offset-circle
rosette, dot grid, or nested rotated squares. Strict black and white, stroke
weight scaled to leaf size so small leaves stay legible, and about one leaf in
eight is inverted, a lit panel in the dark.

The flat index is then flown through. The texture is precomputed once per
seed; each frame the four tunnel walls are drawn as depth slices (spaced
evenly in 1/z so the perspective taper stays clean) with the texture locked to
world coordinates, so the flight is endless and seamless. Heavy arch ribs land
on every segment seam and hide the tile joint; light ribs sit between them.
The flat index itself hangs at the vanishing point like a framed poster, which
is the conceptual punchline: the diagram at the end of the corridor is the
same system as the walls.

## Technique synthesis (from study, not copied)
- **Spatial index + motif solver** (Kwok portable technique 3): the quadtree
  decides where and how big; the solver decides what. Depth variance makes the
  focal hierarchy, big calm leaves against dense detail zones.
- **2D to 3D camera move as compositional device** (technique 7): the camera
  is half the piece. This is what separates it from №9021, which is a flat
  subdivision with texture fills and no camera.
- Canvas-2D perspective projection instead of three.js: one precomputed
  texture, ~240 drawImage slices per frame, no per-frame geometry. Measured
  ~28ms/frame in headless software rendering; real devices accelerate the
  drawImage path, so this stays smooth on phones.

## Seeds tried
Rendered flat + tunnel frames for seeds 7, 99, 424242, 20260910, plus one
random click reseed (938460647).
- **7**: too sparse, the tunnel read as empty scaffolding. Rejected.
- **20260910**: rich and balanced, beautiful flat index. Strong second.
- **424242**: dense and electric, almost too busy on the walls.
- **938460647** (random): coherent, diagonal energy, good robustness signal.
- **99**: won. Best balance of calm and detail: big quiet leaves (inverted
  ring panel, circle-in-square, rosette) against dense detail zones, clean rib
  frames, crisp index poster. The flat index has the clearest Kwok-like focal
  hierarchy of the set.

Default seed is 99. Click the piece for a new variation (`?seed=` in the URL).

## Bugs found while building
- The quadtree IIFE was invoked with four arguments instead of five, so
  `depth` was `undefined` and the root became a single giant leaf. Caught by
  looking at the first render, fixed by passing the initial depth.
- First tunnel pass used a deep dense tree (depth 6, 27px minimum leaf): the
  walls turned to static near the camera. Retuned to depth 5 with a larger
  minimum leaf, narrower field of view, and a slightly farther near plane, so
  walls read as panels instead of noise.

## Verification
- Frames captured at t = 0, 2000, 2500, 3000, 5690, 5714, 5740, 6000 ms via
  a `?t=` freeze parameter: forward flight reads at every timestamp
  (parallax, approaching ribs, streaming walls).
- Loop seam: frame at t=0 vs t=5714 (one full 8-unit period) pixel-diffed at
  0.57 mean gray levels, effectively identical; a 50ms pair straddling the
  wrap diffed the same as a 50ms mid-loop pair. No popping.
- Click reseed verified via CDP: new composition drawn, URL updated to the
  new seed, zero console errors.
- Zero console errors on load, animation, click, desktop and 390px mobile.
- 390px mobile: no overflow, composition holds.
- Thumb: 720x720 canvas crop of seed 99 at t=2500, from final code.

## Final screenshots (local)
- `../hidden_files/9009_final_flat_seed99.png`: the flat quadtree index
- `../hidden_files/9009_final_tunnel_t2500_seed99.png`: tunnel frame (thumb source)
- `../hidden_files/9009_final_tunnel_t6000_seed99.png`: tunnel frame, later timestamp
- `../hidden_files/9009_final_desktop_live.png`: live animation, desktop
- `../hidden_files/9009_final_mobile_live.png`: live animation, 390px mobile
