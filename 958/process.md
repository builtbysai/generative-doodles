# No.958 — Still Life (HSB D, After)

Study #117 reas, PP119 "Still Life (HSB)". After Casey Reas's Still Life
series: the five Platonic solids as a seamless HSB motion loop.

## Concept

Five solids — tetrahedron, cube, octahedron, dodecahedron, icosahedron —
orbit a common center on a tilted ring over a near-black ground. Each is a
translucent wash in its jewel hue (tetra #E8433C, cube #D8B93C, octa
#3CC86B, dodeca #3C7BE8, icosa #B43CE8) with a brighter wireframe over it.
Faces are filled with the canvas 'lighter' composite, so where shells pass
through each other the overlap brightens additively; nothing white is
painted directly except the 20 percent white lightening in the edge color.
The whole configuration is one perfect 60-second loop: at second 60 the
configuration matches second 0 exactly. Five shapes, nothing else — no
particles, no text, no extras. The mood is contemplative and slow.

Interactions: tap a solid to hold it (its orbit pauses for 8 s while it
keeps spinning, then a 4 s catch-up ease restores it to the loop-true
angle); drag to tilt the orbital plane, easing back over about 3 s;
double-tap for a new still life (fresh radii, rates, phases and a permuted
hue assignment, loop clock restarting at 0). Sound, started only by the
first gesture: a five-note just-intonation chord around A3 (ratios 1, 5/4,
3/2, 5/3, 2, one pitch per solid) whose gains breathe with the wash
saturations, plus a soft bell when two solids' centers come close.

## Construction

- Geometry is built programmatically at load and verified: triangle faces
  for tetrahedron/octahedron/icosahedron are the triples whose three sides
  equal the minimum pairwise vertex distance; cube faces come from its six
  axis planes; dodecahedron faces come from duality — for each of the 12
  (1,0,phi)-orientation directions, the five vertices with the largest dot
  product form the pentagon (all five dots equal, checked). Counts:
  tetrahedron 4 faces / 6 edges, cube 6/12, octahedron 8/12, dodecahedron
  12/30, icosahedron 20/30. All vertices normalized to unit circumradius.
- Loop closure by construction: every autonomous phase is an integer
  number of cycles per 60 s. Generation 0 (seed 144987): orbit revolutions
  per loop k = -1, -2, +2, -1, +1 (sign = direction); spin revolutions 2, 2,
  2, 3, 3 about seeded axes (Rodrigues rotation over a seeded fixed base
  orientation); wash-alpha breathing alpha = 0.35 + 0.07 sin with cycle
  counts 3, 3, 1, 2, 3, so alpha stays in [0.28, 0.42]. Orbit radii
  0.167-0.279 of the frame's smaller dimension. Autonomous state is a
  function of t mod 60, so closure is exact, not approximate.
- Projection: orthographic after a fixed global tilt (0.42 rad X, -0.28 rad
  Y) plus drag tilt. Faces from all five solids are painter-sorted together
  by mean depth and filled back-to-front with 'lighter'; edges are stroked
  afterwards at alpha 0.9 in the hue lightened 20 percent toward white, so
  the wireframe reads as a diagram over the washes.
- Hold deficit: orbit angle = base angle - deficit(t). A tap records
  {tau, freeze} with freeze the angle drawn at the tap instant; during the
  8 s pause the deficit equals base - freeze (angle constant), then it
  eases to zero over 4 s with a smoothstep, returning the solid exactly to
  its loop-true angle. A tap during an earlier hold re-freezes from the
  currently drawn angle. Per-generation configuration is drawn from a
  mulberry32 stream (seed 144987 + generation * 7919); generation 0 keeps
  the specced solid-to-hue assignment, later generations permute the hues.
- Frame one is the synchronous draw at a fixed 14 s offset into the loop;
  no wall clock feeds any drawn state. The rAF loop (typeof-guarded)
  advances the same closed-form functions. Canvas size comes from the
  Visual Viewport API with resize listeners on both it and window; the
  canvas style size is pinned in px on every draw; the ring scales to the
  smaller dimension, so phones (screen min dimension < 700 px, aspect
  fallback) keep the whole configuration in frame over the ground tone.

## QA log

- Renders via the house renderer at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png), all in silence (no audio context is
  created without a gesture). Read-back: near-black ground; five distinct
  translucent wireframe solids arranged in a ring — red tetrahedron upper
  left, violet icosahedron upper right, green octahedron lower right, blue
  dodecahedron bottom center, gold cube lower left overlapping the
  dodecahedron with a bright additive sliver where the shells cross;
  generous dark margin; mobile shows the same ring scaled to the smaller
  dimension, nothing clipped.
- Determinism: thumb.png rendered twice, byte-identical (cmp clean); the
  duplicate was deleted.
- Loop closure: a temporary copy in /tmp with the frame-one offset changed
  from 14 s to 74 s (14 + 60) rendered at 720x720 is byte-identical to
  thumb.png (cmp clean). The shipped file was not modified for the test;
  the temporary copies were deleted.
- 'lighter' verified in node-canvas with a pixel probe: over the ground
  (11,12,16), one rgba(232,67,60,0.35) wash gives (92,35,37) and the
  overlap with rgba(60,123,232,0.35) gives (113,78,118) — exactly the
  additive sums, so overlaps genuinely brighten in this renderer. No
  fallback to source-over was needed.
- Hygiene greps on the shipped file: no gradients, no shadowBlur, no
  ctx.filter, no offscreen canvas, no fillText, no Date.now, no
  getUserMedia, no external references, no em dashes; the only text in the
  file is the <title>.

## Deviations

1. Frame-one seed selection. The first seed tried (958117) put the cube
   and octahedron nearly concentric at frame one (centers 24 px apart at
   720 px), hiding two of the five solids inside one blended blob. I
   scanned seeds for pairwise center separation, spread, and at least one
   genuine shell overlap, and adopted seed 144987: all five solids legible
   in a ring, one true overlap (cube over dodecahedron). Only the seed
   changed; the mechanism and parameter ranges are as specced.
2. Hold timing at the loop edge (recorded per the brief): if a tap lands
   in the last 12 s of a loop, its catch-up ease completes just after the
   wrap, so that one loop closes a few seconds late for that solid. Also,
   once any interaction has occurred, hold deficits run on the generation's
   absolute clock rather than the wrapped clock; the two agree mod 2*pi at
   every boundary, and the untouched piece closes exactly (verified above).
3. Double-tap reseed takes over immediately with the loop clock restarting
   at 0, per the brief's correction, rather than waiting for the next loop
   boundary.
4. The global tilt is a fixed constant pair (~0.4 rad) instead of values
   drawn from the seed stream, so reseeds keep the same viewing geometry;
   only radii, rates, phases and hues change.
