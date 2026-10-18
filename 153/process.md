# No.153 Kündekâri Wings

## Concept
The Süleymaniye window wings: kündekâri joinery, geometric wooden
pieces interlocked with no nails, no metal, nothing but the fit.
Eight-pointed stars locked into a field by horizontal and vertical
strap pieces, small diamonds closing the diagonal gaps, warm wood
against near-black. Nothing in the lattice moves. What moves is a
light source orbiting above it, so the shadows swing through the
joints and one joint at a time catches the light full on.

## Construction
Canvas 2D, single self-contained page, watch-only. Each star is the
true outline of two overlaid squares (outer points at the square
corners, notches at the computed edge-intersection radius,
0.7654 of the corner radius). Straps are pointed hexagons drawn
under the stars so the pieces read as locked over and under each
other; seams are stroked in the dark seam tone #2E1F14. Every piece
is filled flat twice: shadowed wood #5A3A20 first, then wood
#8A5A33 at an alpha set by the piece's light value. Each piece
carries a small fixed tilt (stars vary by hash, straps tilt across
their width, diamonds tilt diagonally), and the light value is the
dot of the tilt direction against the orbiting light azimuth,
exactly the flat-shading model the prompt specifies. The azimuth
turns a full 360 degrees over 22 seconds, then the piece holds for
6, a seamless 28 second loop; the clock is offset 5 seconds so
frame one already has varied shading. The piece nearest the
light's travelling focal point is boosted toward full wood and its
seam is stroked in wood colour: the one highlighted joint. House
rules held: Visual Viewport sizing with both resize listeners,
canvas pinned in px, window.screen phone check with aspect
fallback (the field goes full-bleed on phones), synchronous first
frame, typeof-guarded requestAnimationFrame. No pointer listeners
and no hint element exist in the page.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720 and
inspected all three. The lattice fills every frame edge to edge,
stars and straps interlocking, diamonds seated in the gaps, seams
dark throughout; per-piece brightness visibly varies with the
light and the highlighted joint reads on the right side of the
desktop frame and mid-right on phone. Palette audit: wood #8A5A33,
shadowed wood #5A3A20, seam #2E1F14, background #0E0E10 only.
Watch-only: no interaction, no hint. Gallery entry ready:
2002 · 06 · 13, "Interlocking wooden star lattice from the
Süleymaniye window wings, no nails, warm wood against dark while a
slow light orbits and shadows swing through the joints. Watch
only: the joinery is the piece."
