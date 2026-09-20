# Anders Hoff (inconvergent): Study Notes

**Site:** inconvergent.net/generative | Norwegian mathematician-artist | Pen-plotter ink drawings

## Core techniques

### 1. Differential line growth (signature)
A polyline of nodes where each node feels short-range repulsion from neighbors plus
attraction along the path. New nodes inserted when an edge stretches past a threshold,
the line buckles and folds into brain-coral convolutions. Deeply documented; seeded
countless reimplementations.

**Takeaway:** Growth algorithms > static composition. Local rules (repel near, attract
along path, subdivide when stretched) produce forms no human would draw. This is
emergence as an art material.

### 2. Hyphae (space colonization)
Non-overlapping circle growth spawning root/vein networks. His recreation of Nervous
System's Hyphae algorithm. Veins grow toward attractors, branch, avoid each other.

### 3. Differential mesh (2D/3D)
Lichen-like sheet growth. Vertices of a triangular mesh attract neighbors and avoid
unconnected vertices, the whole network evolves. Resembles flower petals, cabbage,
intestines. "Nature doesn't solve differential equations, but nature does evolve."

### 4. Sandpaint rendering (signature look)
Accumulate MILLIONS of translucent points to build continuous tonal density and grain.
Gradients emerge as stippled, dusty accumulation. Flat (no shading), texture entirely
from mark density.

### 5. Fractures, sand splines, orbital/attractor fields
Line fields bent around attractors/orbits; crack-like fracture patterns.

## Aesthetic logic
- **Near-monochrome:** black ink on white (or inverted). Density carries tone.
  Occasional single ink accent. Structure and line-density do ALL the work.
- **Plotter-precise:** fine hairlines, high line counts, delicate. Built for pen plotters,
  every mark is a physical pen stroke.
- **Naive rules:** "I've tried to make it as naive as possible and still see if I can
  get that behavior." Beginner's mind as method.

## Philosophy
- Simple rules → complex patterns (nature's own trick).
- Usually starts with NO end result in mind, plays until tired of it.
- Builds his own tools (snek, lin, weir libraries) in Python/Common Lisp rather than
  frameworks. Owns the full stack.

## Techniques to steal (not copy)
- Differential growth (line + mesh) for organic emergent forms
- Sandpaint: tonal rendering via point-density accumulation
- Space colonization for vein/root networks
- Attractor-warped line fields
- Monochrome discipline: let density carry the image
- Pen-plotter thinking: every mark must be drawable (great constraint for plotter/)

## Visual study pass (2026-09-20, deep)

Inspected inconvergent.net gallery pages live (differential-line,
sand-creatures), screenshots read in full.

### Differential Line, the 40-hour circle

- The signature render is a huge disc of fine concentric wavy lines, moire
  dense at the center, opening up toward the edge. Zoomed out it reads as a
  stippled grey ball; up close it is thousands of non-touching hairlines.
- The page documents the two knobs that matter: how often new nodes are
  introduced, and the avoidance radius. The third knob, where to insert
  (uniform vs curvature-prioritized), is "the most interesting one" and the
  40-hour image uses curvature-based insertion.
- Painting the curve's position at every timestep (a time-lapse trace) gives
  a dramatically different texture from the same system. Same rules, second
  piece for free.

### Sand Creatures, procedure read in full

The whole recipe is three lines:
1. Random control points from a uniform distribution, confined in a sphere.
2. Put them in an arbitrary order.
3. Draw a B-spline through them in that order.

That yields cursive, almost-legible glyphs. The texture pass: clone the
control points, offset them slightly at random, build a second spline, then
draw the "sandstroke" lines between equally spaced points on the two
splines. Result: dusty, grainy blobs that look hand-shaded.

- Two grids on the page: thin-line cursive creatures, and the grainy
  blob variant. The grainy ones are the stronger images.
- Hoff notes the texture only really lands at large print sizes. Honest
  craft note: density rendering needs physical scale.
- The arbitrariness is the point: uniform randomness plus one spline is
  enough to get "writing-like" marks. No linguistics, no gesture data.

### Confirmed aesthetic

- Black ink on white, everything else carried by mark density. The
  sand-creatures color version exists on the generative index page
  (sand-creatures-color.jpg) but the galleries stay monochrome.
- His site itself is the anti-portfolio: plain text, big images, github
  links. The work carries everything.

## What NOT to do
- Differential growth is heavily imitated, use it as a *component*, not the whole piece.
- Don't fake the plotter aesthetic with blur/filters; earn it with real line counts.
