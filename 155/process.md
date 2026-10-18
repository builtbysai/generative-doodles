# No.155 Delete the Base

## Concept
Jay Bonner's polygonal technique performed as a five-move recipe
on tracing paper, watch-only. The 4.8.8 base tessellation draws
itself in pencil; contact points mark in red; pattern rays grow
from the midpoints at the median angle; then the move the whole
method turns on: the base is deleted, entirely, and what looked
like scaffolding leaves a woven star-and-strap field standing on
its own. One ribbon, the star woven inside the central octagon, is
picked out in construction red. The deletion is the climax and it
is total: in the finished hold there is no base anywhere.

## Construction
Canvas 2D, single self-contained page, watch-only. The geometry is
computed, not drawn from a picture. Octagons sit on a square
lattice (centre spacing derived from the octagon apothem plus side,
so every edge is shared) with squares in the diagonal gaps; edges
are deduplicated across polygons, contact points are their true
midpoints. From each midpoint two rays leave into each adjacent
polygon at the median angle for that polygon (90 minus 180/n:
67.5 degrees in the octagons, 45 in the squares), each ray clipped
to its convex polygon by segment intersection. The chords are
stroked as ribbons; crossings are found by pairwise intersection
inside each polygon, ordered along each strand, and assigned
alternating over/under, and the braid is rendered by leaving a gap
in the under-strand at each crossing and laying the over-strand's
piece back across it. The 40 second loop runs the recipe in order:
grid draws (6s), contact points mark (9s), rays grow (16s), base
fades to zero (21s), ribbons widen (26s), braid weaves (34s), hold
(38s), soft reset to blank paper (40s). The clock is offset 30
seconds so frame one opens mid-braid with the base already gone.
House rules held: Visual Viewport sizing with both resize
listeners, canvas pinned in px, window.screen phone check with
aspect fallback, synchronous first frame, typeof-guarded
requestAnimationFrame. No pointer listeners and no hint element
exist in the page.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720 and
inspected all three. Two construction faults were caught and fixed
during QA. First, the initial weave pass punched paper-coloured
slots wider than the ribbons, which scalloped every strand; the
braid now works by splitting the under-strand around its crossings
and redrawing the over-strand across the gap, and the crossings
read as true over-under weaving. Second, the first grid density
(2.35 cells across) made the stars crowd the panel; the field now
runs 3.1 cells across and the star field has room to read as
strapwork. Frame one: nine woven eight-pointed stars and the
square rings on open paper, central star in construction red, no
trace of the base. Palette audit: tracing paper #F4F1E8, pencil
#8A8A8A, construction red #B03A2E, ink #1A1A1A only. Watch-only: no
interaction, no hint. Gallery entry ready: 2002 · 06 · 15,
"Bonner's five moves performed on tracing paper: the octagon
square grid draws, midpoints mark in red, rays grow at the median
angle, then the base deletes itself entirely and the ribbons
braid. Watch only: the deletion is the climax."
