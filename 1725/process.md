# №1725 Shards (PP972 / ZB6, study #226 zach-bodtorf)

Seven faceted polyhedral shards drift and tumble on near-black, catching warm
rim light on their facets. Drag rotates the whole shard cloud.

## Build log

- Plain canvas 2D only, no external scripts. The 3D is hand-rolled: displaced
  icosahedron meshes (12 vertices, 20 faces, per-vertex radial displacement
  0.78 to 1.28), Rodrigues rotation per shard, weak perspective projection,
  painter-sorted faces, flat shading from a fixed light direction, warm rim
  stroke on facets turned away from the light.
- First attempt used seeded random placement with a 1.15 unit minimum 3D
  distance; two pairs still overlapped in projection. Replaced with seven
  hand-placed positions on a staggered grid, verified by eye: all seven
  shards read as separate bodies on desktop, mobile, and thumb.
- Split schedule verified by rendering a copy at t = 32 s: shard 2 is gone,
  replaced by two smaller children drifting apart. Split at t = 75 s (shard
  5) uses the same code path.

## Fixed-seed / split-schedule decisions

- All randomness comes from mulberry32 with seed 1725000. No Date.now, no
  unseeded Math.random, no wall clock anywhere.
- Frame one is a pure function of t = 0: fixed shard positions, axes, spin
  rates, phases, and vertex displacements. Two desktop renders of the first
  frame are byte-identical (md5 b8acf1669248cc4612da7e6690a187b6).
- Splits run on a fixed 120 s cycle: shard 2 splits at cycle time 30 s,
  shard 5 at 75 s. Each parent is replaced by two children at 0.55 scale
  that grow in over 2.5 s with a smoothstep, then the cycle resets to the
  original seven shards. Split times, shard indices, split directions, and
  child spin rates are constants in the file.
- Drag accumulates rotation offsets on the whole cloud (0.005 rad per px,
  vertical clamped to +/-1.1 rad) plus a slow fixed cloud drift of 0.03 rad/s.

## Deviations from the prompt

- The prompt allows three.js or p5.js WEBGL; this build uses plain canvas 2D
  with a hand-written projector instead, because the QA harness renders the
  actual script with node-canvas and external 3D libraries cannot run there.
  The mechanism (displaced icosahedra, flat shading, warm rim, slow tumble,
  fixed-schedule splits, drag rotates the cloud) is built as specced.
- Shard count fixed at 7, inside the prompt's 5 to 9 range.

## QA

- Rendered the actual script with node-canvas at 1280x900 desktop, 390x844
  mobile, and 720x720 thumb. All three inspected: seven clearly faceted
  shards with warm rim light, wide separation, no clipping, plates legible
  (title top-left, formula date under it, hint bottom-left).
- Plates: title "Shards", date "2006 · 10 · 02" (formula date 2002-01-10 +
  1726 days), hint "Drag to rotate the shard cloud."
- Gallery note: "Seven faceted shards drift and tumble on near-black, split
  on a fixed schedule, and catch warm rim light. Drag to rotate the shard
  cloud."
