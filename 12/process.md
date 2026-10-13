# №12 · Globe - process notes

## Concept
An icosphere drawn as wireframe only, per the brief's wording: an
icosahedron subdivided once, vertices pushed back onto the sphere,
the unique edges projected in orthographic view. A seeded share of
the edges is dropped so the net tears in places, back edges are
dimmed, and a few surviving edges are gold. Thin warm-white lines on
near-black; the sphere is implied by its net, never filled (brief
concept 12, triangle globe).

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 12. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style.
  Centered composition on near-black.
- 42 vertices, 120 unique edges after one subdivision. Rotation from
  two seeded angles; dropout and gold rolls from a second seeded
  stream so layout and tearing vary independently.
- Iterated once: v1 dropped 18 to 32 percent of edges and the ball
  shattered past recognition at the silhouette. Dropout now 9 to 19
  percent, gold 2.5 to 5.5 percent.

## Differentiation
- vs No.2 (Orb): a sphere suggested by dots on a Fibonacci lattice,
  nothing joined. Globe is the dual habit: only joins, no dots, and
  the joins form a true geodesic net.
- Family name: "torn icosphere wireframe".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `12/index.html`, `12/thumb.png` (720x720, rendered from the live script), `12/process.md`. Gallery entry appended at the end of page3.html with the formula date.
