# №9013 · Growth — process

Date: 2026-09-14. Differential line growth in near-monochrome ink on paper,
after Anders Hoff (inconvergent). Two seed loops: one large deep-ink circle,
one smaller warm-grey loop set inside it.

## Algorithm (own implementation)
- Closed polylines of nodes. Per substep, each node integrates a velocity:
  brownian acceleration + attraction toward the midpoint of its two
  path-neighbors + repulsion from non-neighbor nodes inside a radius
  (spatial hash grid, deterministic order) + a soft circular boundary.
  Damping plus a speed clamp. Path neighbors are exempt from repulsion so
  cohesion and separation do not fight each other directly.
- Subdivision: a new node (midpoint, tiny jitter, averaged parent velocity)
  is inserted when an edge exceeds maxEdge, or at 0.45x maxEdge when the
  local turning angle is sharp (curvature-prioritized insertion, Hoff's
  "most interesting" knob).
- Centroid anchoring (0.004x offset per substep) keeps the composition
  centered without visibly constraining local motion.
- Stop: 60 consecutive substeps with zero insertions after at least 300
  steps, or 4200 nodes, or 1200 substeps.

## Rendering
- The growth is traced live: every few substeps the whole polyline is drawn
  at low alpha onto a persistent canvas, so density builds where the line
  lingers (time-lapse trace). A single darker pass at the end sets the edges.
- The drawn trace is Chaikin-smoothed (2 iterations); the simulation stays
  raw. This turns noisy growth into flowing folds.
- Paper speckle, warm paper (#f7f3e9), ink rgba(24,20,16), grey
  rgba(122,112,96).

## What the iteration taught
- Six parameter rounds failed the same way: a closed loop with direct
  position updates relaxes into a stable ring and stalls. Two structural
  fixes unlocked it: velocity integration with damping (inertia lets folds
  develop momentum instead of being damped out), and exempting path
  neighbors from repulsion (the classic cohesion/separation split).
- `?t=` freezes a fraction of a 600-substep budget; `?t=1` runs the full
  growth synchronously and matches the animated end state.
- prefers-reduced-motion renders the full growth once, no animation.

Default seed 90130913. Click for a new growth; the seed is kept in the URL.
