# №9082 · Afterglow

A Jason Anderson-inspired sunset in the impasto series: the stained-glass
jigsaw composition, thick palette-knife bands of blazing color, and a raking
light that slides across the ridges as you move.

## Composition

- **Violet sky** (top ~52%): deep purple-magenta cells, dramatic and brooding
- **Sun band** (~12%): blazing orange-gold, the last light
- **Silhouette land** (bottom ~36%): near-black plum, the dark shore

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

Deterministic seed 9082. 60fps, DPR capped at 2, full-bleed, touch-safe.
