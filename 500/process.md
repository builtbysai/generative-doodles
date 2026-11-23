# №1581 Noise, Voronoi, Weave, Subdivide (AN6, #208 ayumu-nagamatsu)

Formula date: 2006 · 05 · 11. Gallery note cue: "Drag vertically to scrub the stack."

## What the piece does
A single matte-white icosahedron on a grey ground, run through a visible
processing pipeline. Down the left edge sits a vertical stack of five
named modifier chips: NOISE / VORONOI / TRIANGULATE / WOVEN / SUBDIV.
Each chip lights up amber as its deformation takes over the mesh in
turn, then the stack resets and the loop begins again. The mesh ripples
under noise displacement, cells out with Voronoi spokes, triangulates
through its edge midpoints, weaves dashed diagonals across its faces,
and subdivides with a second level of edges. Watch-only otherwise, the
stack auto-plays on a 40 second loop. Dragging vertically anywhere
scrubs the stack by hand: drag down to push deeper into the
deformations, drag up to unwind back to the pristine polyhedron. On
release the auto-play resumes from the scrubbed position.

## Mechanism
- Closed-form projected icosahedron on canvas 2D, no WebGL: 12 vertices
  from the golden-ratio table, 20 faces, painter-sorted far-to-near,
  faces shaded matte white by face-normal depth, charcoal edge lines.
- Stack pointer 0..5, a pure function of time (40 s per pass, wraps to
  0). Each modifier's weight is clamp(stackPos - i, 0, 1), so stages
  accumulate in order and each reads as a legible step. The active chip
  is the floored stage; a dark underline on it shows the blend progress.
- Noise is a deterministic closed-form sine product over each vertex
  position, displacing vertices radially. Voronoi draws centroid-to-
  vertex spokes per face. Triangulate draws the inner triangle through
  edge midpoints. Woven draws dashed diagonals with alternating dash
  phase per face. Subdivide draws centroid-to-midpoint edges.
- Rotation is a slow fixed-phase function of time only, so the mesh
  turns gently while the stack advances.
- Determinism: frame one is drawn synchronously at t = 0 with the
  stack at position 0 (pristine mesh, NOISE chip lit, zero progress).
  No Math.random anywhere; no Date.now in the frame path. Thumb
  byte-compares identical across two renders.
- Chips are drawn on the canvas with fillText, per the №1576 precedent
  in this study. No HTML elements, no in-piece hint text besides the
  chip labels, no artist signature.

## Deviation from the prompt
None material. The prompt's "chips as HTML/canvas labels" is resolved
as canvas-drawn chips, per the batch spec's adaptation flag and the
standing no-HTML rule. The mesh is centered-right at 65% on desktop
and 58% on phones so the chip stack stays clear of it.
