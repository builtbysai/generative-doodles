# Inigo Quilez (iq): Study Notes

**Date:** 2026-09-26
**Artist:** Inigo Quilez, iquilezles.org. Spanish software engineer, veteran
demoscener, co-creator of Shadertoy (with Pol Jeremias, 2013), later Pixar
and Oculus. Behind Quill (VR painting) and Pixar's Wonder Moss generator.
**Doorway:** Char Stiles study, "the scene around the shader" - Stiles
livecodes raymarched SDF scenes on stage; iq wrote the reference the whole
scene stands on.

**Depth: deep.** Both foundational articles read end to end in full
("Raymarching Distance Fields" gallery essay, 2008-2022 works with his own
production notes; "Distance Functions" complete SDF reference); six works
visually inspected at full resolution (Sea Creature 2022, Selfie Girl 2020,
Sculpture III 2015, Greek Temple 2017, Insect 2013, Angels 2013); the core
loop re-rendered locally in Python/numpy at 480x300, a CPU sphere-marcher
with his smooth-min union, soft shadows, AO and 3-light rig, rendered twice,
smooth vs hard boolean, and both frames visually inspected.

## What the articles actually say

The raymarching essay corrects the history everyone gets wrong: boolean
combinations of implicit surfaces by min/max date to A. Ricci (1972) and
B./G. Wyvill (1989); the first raymarching of SDFs was Sandin, Hart and
Kauffman rendering 3D fractals (John Hart coined "Sphere Tracing" in 1995,
a misnomer iq complains about, since we trace rays, not spheres). iq's own
story starts in the demoscene around 2001 raymarching signed fields for
fractals and metaballs; the turn came from Alex Evans (2006) and Keenan
Crane (2005) constraining the field to be Euclidean distance. In 2007 he
went in, and the first four recognizable modern SDF images appeared with
soft shadows, smooth blending and domain repetition already working.

The distfunctions page is the reference the whole shader community quotes:
a catalog of primitives (sphere, round box, box frame, torus, capped torus,
link, cylinders, cones, hex prism, capsules, solid angle, cut/death-star
spheres, rhombus, octahedron, pyramid, triangle, quad), split honestly into
**exact true SDFs** versus **lower bounds** (triangular prism and friends:
zero at the surface, safe for basic marching, but they need more steps and
break shadow/occlusion queries that assume true distances). He names bad
SDF implementations as a real problem in the wild.

## The operators (the actual technique)

- **Union is min(), subtraction max(-a,b), intersection max(a,b).**
  Union of two SDFs is a true SDF; subtraction and intersection are only
  bounds, and union is only exact in the exterior. Non-commutativity of
  subtraction matters.
- **Smooth union** replaces min() with a polynomial smin: k is in actual
  distance units, it defines the width of the blend zone. This is the move
  that makes his creatures possible: spheres and ellipsoids melt into
  single organic bodies. Smooth subtraction and intersection are defined
  through the smooth union.
- **Elongation** (a capsule is an elongated sphere), **rounding** (subtract
  distance, jump to a different isosurface), **onion-ing** (abs(sdf) minus
  thickness gives concentric shells, exact, no boolean cost).
- **Repetition** via domain folding: p minus s times round(p/s). Infinite
  copies at one evaluation cost, but naive use artifacts on asymmetric
  shapes; the fix and the instance-id trick (per-cell variation) live in
  the separate domain-repetition article. Limited repetition clamps the
  instance count.
- **Deformations** (displacement, twist, bend) warp the domain before
  evaluation. They make the field non-Euclidean, so the marcher needs
  smaller steps (Lipschitz constant); iq's discipline is to get as close as
  possible with exact primitives first and distort as little as possible.
- **Soft shadow:** a second march toward the light, res = min(res, k*h/t)
  over 24 steps. The penumbra comes from the cone-ratio h/t, not from
  sampling an area light.
- **AO:** five taps along the normal, weighted by an exponential falloff.

## What the works show (his own production notes, verified on the pixels)

- **Sea Creature 2022** (one-nighter): classic KIFS recursive fractal
  schema like Angels, but smooth-min AND smooth-abs blend every sphere into
  one organic body. He did a second volumetric pass for transparencies,
  noting he will pay 4x render time for 10% better look. The frame is
  flesh-colored, translucent, internally glowing against deep blue.
- **Selfie Girl 2020**: second human SDF, first facial animation. 32
  primitives total for the whole painting. A girl in a winter hood with
  purple-tipped braids, freckles, knit texture, snowy bridge background,
  all from math. Modeled to the camera; rough from other angles.
- **Sculpture III 2015**: domain distortion, a sphere warped by four
  octaves of sine waves. The lesson in one image: displacement alone is a
  complete medium.
- **Greek Temple 2017** (UPenn livecoding session): the temple is basic
  domain repetition of 6 or 7 boxes and cylinders. No GI: the rich bounce
  light is painted by hand-positioned colors, and the light direction on
  the temple differs from the light direction on the ocean and terrain.
  Composition over physical correctness, stated openly.
- **Insect 2013**: one of the first to use smooth-min for organic blending
  (legs into body); analytic inverse kinematics positions the legs on the
  terrain without simulation. Desert rock creature, painted coloration.
- **Angels 2013**: domain repetition spawns the flock from one creature;
  per-cell ids offset the cosine-wave animation so each copy flies at a
  different phase. Rocks done the same way in Fruxis/Leizex: 3D voronoi
  marched directly.

## What makes it sing

1. **Primitive-count bragging as aesthetic discipline.** 32 primitives for
   a human face; the constraint is the style. Every work reads as "math
   you can count."
2. **Painted lighting.** He computes the honest parts (occlusion, shadow
   direction) and hand-injects the expensive parts (bounce, subsurface,
   fog color). The lie is art-directed, never random.
3. **Light direction as compositional choice**, not a physical constant
   (Greek Temple: two suns, one for the architecture, one for the sea).
4. **Multi-stage scenes**: distinct sections share one field but the
   foreground/background get different treatment.

## Avoid-list additions

- Raymarched SDF "toy demos": infinite repetition of symmetric boxes,
  chrome spheres, single-sun default lighting. The technique is public;
  the art is in the painting.
- Non-uniform scaling and L-infinity metric hacks: he explicitly warns
  they stop being true SDFs and silently degrade marching and shadows.
- Using smooth-min everywhere at large k: it turns distinct parts into
  mush. His k values stay small relative to the primitive sizes.

## Doorways (hop targets)

- The Shadertoy community he founded: nimitz, BigWIngs (Martijn
  Steinrucken, shader coding adventures), TDM (Seascape; iq credits TDM's
  cut-sphere rock technique in Mushroom), Kali, otaviogood.
- His video tutorials (SDF derivations on his YouTube channel); the
  "Interior Distances" and "Domain Repetition" companion articles.
- Demoscene lineage: 4KB procedural graphics parties (Euskal Party 2008
  first prize, Slisesix), Function Demoparty (Organix 2008), Trsac (Fruxis
  2012 with a pathtracer pass).
