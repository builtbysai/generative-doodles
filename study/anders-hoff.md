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

## What NOT to do
- Differential growth is heavily imitated, use it as a *component*, not the whole piece.
- Don't fake the plotter aesthetic with blur/filters; earn it with real line counts.
