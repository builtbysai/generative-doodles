# №1696 "Rayhatch Field" - process notes

PP943, EXPANSION #223 piter-pasma. Date: 2006 · 09 · 03.
Gallery note: "A morphing SDF creature drawn entirely as hatch strokes. Drag to dimple the field."

## Build
Canvas 2D, single self-contained index.html modeled on live №1695
(structure, plates, sizing, loop). The SDF scene is three analytic
primitives blended with smooth-min: a wobbling blob (upper left), a tube
worm on a quadratic Bezier spine (diagonal), and a rotated rounded-box
pillow (lower right). All parameters are pure functions of piece-time t,
so the creature breathes and twists continuously.

Each frame the field is evaluated on a CPU grid (cell = min(VW,VH)/170,
min 4px). Per cell inside the form, the gradient is estimated by forward
differences and a short stroke is drawn along the surface tangent
(perpendicular to the gradient). Stroke probability rises as the surface
turns away from the top-left light; a second shorter offset stroke is
added in darker regions. The single indigo ink (#2E3A8F) appears only as
a sparse accent (45% of strokes) where shade < 0.08, the deepest shadow.
Every mark comes from the field: per-cell offsets and placement use a
deterministic hash of the cell index, no random jitter.

Drag: pointerdown sets a dent target at the pointer; the dent eases in
(depth 0 to 1) and subtracts a Gaussian bump from the SDF, dimpling the
field locally, with extra strokes crowded around the dent. On release the
dent springs back to 0. No click-to-reload, no reseed button.

Frame one is t = 30, fixed phase, seeded/deterministic throughout (no
Date.now, no Math.random). Title/date/hint plates drawn on canvas;
stroke counter lower right reads actual strokes drawn against the fixed
budget of 10,844 (the prompt's stroke count for the reference work).

## Deviation: WebGL-to-2D substitution
The prompt's rayhatcher is a WebGL ray-marched SDF. node-canvas has no
WebGL, so the piece is built in Canvas 2D: the SDF is evaluated
analytically on a CPU grid and rendered as hatch strokes. This is the
substitution the house rules anticipate, and it matches the piece's own
premise: the same field drives shading and stroke placement, and the
form never reads as shaded pixels, only as strokes. No smooth shading
anywhere; no crosshatch laid everywhere (strokes follow tangents only).

## QA (node-canvas renders of the final file)
- Desktop 1280x900: creature centered, about 70% of frame, generous
  paper margins; strokes tangent-aligned, denser on the shadow side;
  indigo a sparse accent in the deepest shadow; plates and counter
  legible. Stroke counter: 8,138 / 10,844, inside the 8,000-12,000
  budget per cycle.
- Mobile 390x844: same form centered, plates and hint fit, counter
  reads 2,812 / 10,844 (fewer cells on the smaller canvas; the budget
  is per cycle at full resolution).
- Thumb 720x720: the 720x720 render itself; form legible, counter
  8,138 / 10,844.

Two fix rounds before the final gate: first pass drew 3,701 strokes at
desktop with indigo covering too much of the shadow side; density was
raised (finer grid, higher placement probability, wider second pass)
and indigo thinned to a sparse accent. Final file re-gated after the
last edit; all three renders above are from the shipped file.
