# №9081 · Swell

A Jason Anderson-inspired seascape in the impasto series: the stained-glass
jigsaw composition, thick palette-knife daubs, and a raking light that slides
across the ridges as you move.

## Composition

- **Misty sky** (top ~30%): pale blue-grey cells, soft and luminous
- **Foam horizon** (~14%): near-white breaking band where sea meets sky
- **Deep water** (bottom ~56%): teal to ultramarine to near-black, the swell

## Technique

- Jittered grid of seed points, Lloyd-relaxed twice, Voronoi cells clipped by
  half-planes. Dark leading between cells like stained glass.
- Each cell filled flat, then 4-7 chunky palette-knife blades laid inside
  (clipped to the cell), each a rotated ellipse in a hue/lightness variant.
  A dark lee-side shadow gives the paint thickness.
- Every cell stores a ridge highlight along its knife direction. Each frame
  the highlight alpha is recomputed from the knife-to-light angle, so
  brightness slides across the surface like walking past the canvas.

## Interaction

- Drag or move the pointer: the light swings toward you.
- Idle: the light drifts on its own slow orbit.
- Double-tap: a new seed, another from the series.

Deterministic seed 9081. 60fps, DPR capped at 2, full-bleed, touch-safe.
