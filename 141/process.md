# No.141 Goodman Strauss Sevens

## Concept
An endless swirling field of silver-grey rhombs in the 7-fold
Goodman-Strauss manner: identical-edge rhombs joined edge to edge,
angles always multiples of a seventh of a half-turn, forming serpentine
paths. One rhomb in seven is a dim violet accent marking the
substitution centres. It is a system to explore: dragging scrubs the
substitution resolution, the whole field stepping together from coarse
rhombs down through three finer generations; double-tap reseeds the
accent placement.

## Construction
Canvas 2D, single self-contained page. The patch is the canonical
zonogon rhomb tiling from 7 unit generators at angles k*pi/7 (rotated a
half-step): for each pair of generators one rhomb, offset by the sum of
the generators between them, giving all C(7,2) rhomb orientations and
angles edge to edge with no gaps. Subdivision is exact and self-similar:
each rhomb splits into 4 congruent rhombs through its edge midpoints and
centre, so every generation is the same field at a finer grain. Four
generations are precomputed into arrays (336 / 1,344 / 5,376 / 21,504
rhombs); the coarsest displayed generation is the second, so the field
bleeds off the frame at roughly ten rhombs across while the raw first
generation stays as the mathematical parent. Dragging vertically moves
a level parameter; on each whole step the view re-anchors on the touch
point and eases a small scale pulse. Accents are chosen by a seeded hash
at one in seven, flat #7C6BA0 with no glow. The piece redraws on demand
only (no ambient loop), so the finest generation costs nothing while
idle. Documented deviations: the subdivision rule is the congruent
midpoint split rather than Goodman-Strauss's exact asymmetric
substitution (which needs three rhomb shapes and non-congruent children);
the field reads and behaves as specified (edge-to-edge, whole-field
steps, self-similar) at canvas scale. House rules held: Visual Viewport
sizing with both resize listeners, canvas pinned in px, window.screen
phone check with aspect fallback, synchronous first frame,
typeof-guarded requestAnimationFrame.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720 and
inspected all three. Two fixes during QA: the first framing left the
14-gon patch floating as a medallion with background corners, fixed by
rotating the patch a half-step and scaling to cover, which made the
coarsest rhombs too large, so the displayed ladder was shifted one
generation finer (see Construction). Final frames: full-bleed silver
rhomb field with dark seams, serpentine swirl around the centre,
violet accents scattered at about one in seven, phone frame full-bleed
with the field running off every edge. Palette audit: rhomb #B9BEC6,
seam #2A2D33, accent #7C6BA0, background #101114 only. Interaction:
drag to subdivide (whole field steps together, never mixed levels),
double-tap reseeds accents; no click-to-reload. Gallery entry ready:
2002 · 06 · 01, "An endless field of silver grey rhombs in the seven
fold Goodman Strauss tiling, one in seven dim violet at the
substitution centres. Drag to subdivide the field."
