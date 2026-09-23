# Differential line growth: practice notes

Sources: inconvergent (Anders Hoff) differential-line pages (existing study
note), plus a current reimplementation recipe (technical-1/all-about-me
portfolio qa.md, crawled 2026-09): forces are repulsion (nodes push apart when
too close), attraction (connected nodes pull together), alignment (nodes stay
smooth with neighbors); insert a node when an edge exceeds threshold; stop
when growth rate drops below ~0.5 nodes/frame averaged over 20 frames.

## Knobs that matter (from Hoff + recipe)
- Insertion frequency (how often new nodes are introduced).
- Avoidance radius (repulsion distance).
- Where to insert: uniform vs curvature-prioritized. Curvature insertion is
  "the most interesting one" (Hoff); the 40-hour circle uses it.
- Painting the curve's position at every timestep (time-lapse trace) gives a
  dramatically different texture from the same system. Same rules, second
  piece for free.

## My implementation choices (for №9013)
- Closed loop(s), one array of nodes each; spatial hash grid for repulsion,
  rebuilt each substep; all forces accumulated in fixed node order so the
  stream stays deterministic under mulberry32.
- Per substep: brownian jitter (gaussian) -> attraction toward midpoint of
  two path-neighbors -> repulsion from all nodes inside radius (push i only,
  half-strength, order fixed) -> soft circular boundary (pull toward center
  past bound radius) -> apply -> subdivide edges longer than maxEdge.
- Stop: 20 consecutive substeps with zero insertions, or 4200 nodes, or 900
  substeps. Whichever comes first.
- Render: trace the whole polyline after substeps at very low alpha
  (0.06-0.09) onto a persistent canvas, so density builds where the line
  lingers. One deep-ink loop, one warm-grey loop. Final single pass at
  higher alpha to set the edges.
- Two loops instead of one (Hoff's "component, not the whole piece" rule):
  large ink loop + smaller offset grey loop that grows into the gaps.
- Deterministic `?t=` = fraction of a 600-substep budget; reduced-motion
  runs the full growth synchronously once.

## New seeds this yields
- Growth constrained to a non-circular boundary (e.g. a drawn glyph path).
- Time-lapse-only piece: hide the line, show only accumulated traces.
- Mesh variant: triangular differential mesh (lichen sheets) later.
