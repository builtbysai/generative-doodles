# No.163 Najm Rosette

## Concept
Kaplan's two-step star-pattern engine (Najm, 2004) performed
as the piece. A hexagonal tiling draws in hairline grey; an
8-pointed rosette blooms at every hexagon centre; straps join
the rosettes across the shared edges through the contact
points; then the tiling is erased to nothing and the finished
interlaced field stands unsupported, one gold rosette at its
heart. Watch only: the erasure is the point.

## Construction
Canvas 2D, single self-contained page. 45 second loop: scaffold
draws (5s), rosettes bloom outward from the centre (10s),
straps interlace (8s), scaffold fades to zero (5s), the finished
field holds with a 0.5 percent breathing scale (12s), soft
reset (5s). Each rosette is two polylines: the 8-pointed star
outline (outer points joined through the {8/3} silhouette
valleys) and a small {8/3} chord star turning inside it. For
every neighbouring pair of hexagons, the two closest vertex
pairs are joined by straps that run star point, contact point
on the shared edge, star point: one continuous band kinked at
the boundary, as in Kaplan's polygons-in-contact recipe. Every
crossing between a strap and another strand is computed by
segment intersection at build time; the under-strand is gapped
and the over-strand restruck, alternating along each strap.
Crossings inside a rosette's own line work are left ungapped:
the weave lives between the rosettes. Palette only: warm white
#F5F2EA, lapis #1B3A6B, gold #C9A227, scaffold #B9B4A6. House
rules held: Visual Viewport sizing with both resize listeners,
canvas pinned in px, window.screen phone check with aspect
fallback, synchronous first frame opened on the held finished
field, typeof-guarded requestAnimationFrame, and no pointer
listeners at all (the renderer's listener report shows only
the two resize listeners).

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720
and inspected all three, plus diagnostic renders (weave off,
connectors off, stars only) to isolate faults. Three faults
were caught and fixed. First pass rosettes used a single {8/3}
chord star at half radius with straight vertex-to-vertex
joins: the field read as triangles and rails, the rosettes
lost. The motif was rebuilt as outline star plus inner chord
star at 0.78 of the hexagon radius. Second, the gap punches
shredded the inner chord stars, whose sixteen self-crossings
sit inside an 84 pixel disc; gapping is now restricted to
crossings involving a connector strap. Third, straight
connectors doubled the outline points into parallel rails and
flipped the figure-ground; straps now kink through the shared
edge's contact point, and crossings too close to a segment end
are filtered so punches never eat a strap tip. Frame one is
the finished field, scaffold fully erased, gold rosette at the
centre.
