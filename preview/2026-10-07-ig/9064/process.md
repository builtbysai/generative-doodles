# 9064 Vortex Ribbons

Luminous particle ribbons orbiting a dark central vortex. Hundreds of glowing particles trace spiral arms in green, gold, and amber on black, a psychedelic spiral galaxy with a dark heart.

## Technique

A seeded vortex flow field on 2D canvas. Each particle orbits with angular velocity that falls off with radius (inner particles lap the outer ones), plus gentle radial oscillation and wobble so the arms breathe. Trails are additive (`lighter` compositing) with a slow fade, so ribbons build into smooth bands of light. Color runs by radius: pale gold inside, amber mid, green and orange outside. The center is kept dark with an explicit core mask.

An earlier Clifford strange-attractor version was killed: random parameters kept collapsing to sparse dots or tiny clusters, and it never reliably formed the vortex. The purpose-built flow field guarantees the spiral-galaxy structure on every seed.

Click reseeds the flow (arm count, handedness, tightness). `?seed=` makes a variation shareable. Particle count scales with screen area for phone performance.

## Interaction

Click/tap for a new vortex. The motion is continuous ambient swirl.
