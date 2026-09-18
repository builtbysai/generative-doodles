# Gorillasun (Ahmad Moussa): Study Notes

**Site:** gorillasun.de | **Key works:** Vestige, Grand Canyon, Neo Supremus, Behind the Canvas, Exotic Quarpets, Parasite

## Why he matters for this project
Unlike most masters, Gorillasun documents EVERYTHING. His "Making of" series is a
free masterclass in generative technique. He is the single best study resource on the list.

## Core techniques

### 1. Radial Perlin noise (tree rings)
Concentric rings where each vertex is displaced by Perlin noise sampled at (x, y).
Randomly break and rejoin rings (`if (random() > threshold) { endShape(); beginShape(); }`).
Modulate the break threshold with radius or a sine wave for organic variation.
Result: fingerprints, tree rings, topographic contours.

**Takeaway:** Tiny conditional breaks transform a boring perfect shape into something
organic. The "disconnect/rejoin" trick is broadly applicable to any closed-loop drawing.

### 2. Grainy textures
Co-wrote the fxtext article "All About That Grain" and championed meezwhite's p5.grain
library. Grain is the difference between "flat digital" and "printed artwork."

**Takeaway:** ALWAYS consider a grain pass. Multiple methods: overlay noise, per-pixel
manipulation, library (p5.grain). Grain unifies disparate elements and adds tactility.

### 3. Marching squares for contours
Extended marching squares to find contours of arbitrary polygonal shapes, raycast to
test if grid vertices fall inside shapes, then extract contours. Point-line distance
gives rounded contour falloff.

**Takeaway:** Iso-contour extraction turns any scalar field into beautiful line art.
Applicable to noise fields, distance fields, image brightness.

### 4. Irregular grids + rectangle subdivision
"Somewhere in Between", approached rectangle divisions in a new manner. Recursive
subdivision with irregular splits, filled with varied treatments.

### 5. Art-history translation (Neo Supremus)
Generative ode to Malevich's Suprematist compositions. Studied the source compositions,
extracted the *rules* (floating geometric shapes, limited palette, dynamic diagonals),
then generated new instances.

**Takeaway:** This is the correct way to be "inspired by", extract compositional rules
from art history, generate new work from the rules.

### 6. Boolean grid + Perlin noise minimalism (Grand Canyon)
Minimal aesthetic from the simplest possible ingredients: a boolean grid modulated
by noise. Restraint as a feature.

### 7. Squiggly movement (Parasite)
Step-by-step tutorial on organic squiggle motion, sine-driven wandering with noise.

## Philosophy
- Relentless documenter; weekly newsletter with technique explorations.
- Draws inspiration from Pinterest/browsing, then asks "what would this look like
  in generative form?", then figures out the algorithm for the SHAPE first.
- Shape-first thinking: "The first step would be to figure out how to create the
  shape of a puzzle tile algorithmically."

## Techniques to steal (not copy)
- Disconnect/rejoin trick for organic line breaks
- Grain pass on everything
- Marching squares / iso-contours from scalar fields
- Art-history rule extraction (pick a movement, extract rules, generate)
- Shape-first: solve the geometry, then decorate

## What NOT to do
- Don't reproduce his specific tutorials 1:1 as "doodles", that IS copying.
  Use the techniques with new subjects.
