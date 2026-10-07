# 9065 Chrysanthemum Engine

A raymarched fractal bloom in a realtime GLSL fragment shader. Thousands of tiny faceted crystal buds form a spherical flower, pale pink and lavender on near-black, drifting over dark nebula wisps.

## Technique

Mandelbulb distance estimator (power 7-9, 9 iterations, seeded) raymarched in a single fragment shader. The fractal is colored by iteration count and orbit traps, giving the faceted crystalline buds. Slow rotation and a subtle fbm nebula background complete the ambient loop.

Click reseeds the fractal parameters (power, bailout, color shift). `?seed=` makes a variation shareable. The default seed 7 was chosen after comparing renders.

## Iteration

Five earlier directions were killed: a KIFS sponge (muddy), a bead field (flat), and Mandelbox framings (composition problems). The Mandelbulb won because it reads as a flower, not a math demo, with real depth and light in the buds.

## Interaction

Click/tap for a new bloom. The motion is a slow seamless ambient drift.
