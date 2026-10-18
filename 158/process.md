# No.158 The Puzzling Unstructured

## Concept
Bonner's dual-level mechanism, the one Bultheel called
"puzzlingly unstructured": a coarse polygonal grid is drawn in
faint pencil, wide ribbons grow along its edges, and a fine grid
of small red stars blooms at its intersections, registered to
the coarse level. Then the coarse grid is deleted, entirely, and
the pattern stands alone with nothing visible holding it up.
Later the ghost of the scaffolding breathes back for a moment,
at a quarter of its strength, and leaves again. Watch-only: the
viewer should feel that the scaffolding was there.

## Construction
Canvas 2D, single self-contained page, watch-only. The coarse
level is a 4.8.8 scaffolding, octagons on a square lattice with
squares in the diagonal gaps, only about three cells across the
panel so the deletion is dramatic; edges are deduplicated across
polygons so every polygon vertex is a true grid intersection.
The fine level is an 8-point rosette ({8/3} inner radius) sitting
on every vertex, nested inside the ribbon band. The coarse
layer's alpha is the animated parameter of the 36 second loop:
grid draws on (4s), ribbons widen over it (9s), rosettes bloom
with per-vertex delays (to 16s), grid fades to zero (21s), the
puzzling field holds alone (to 28s), the ghost breathes back to
25% and out (34s), soft reset to blank paper (36s). While the
ribbons are wide the grid is stroked just wider than they are, so
the pencil underdrawing peeks out as a halo around every strap
and its deletion genuinely shows. The clock is offset 24 seconds
so frame one opens on the hold: ribbons and rosettes standing on
open paper, no trace of the grid. House rules held: Visual
Viewport sizing with both resize listeners, canvas pinned in px,
window.screen phone check with aspect fallback, synchronous
first frame, typeof-guarded requestAnimationFrame. No pointer
listeners and no hint element exist in the page.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720
and inspected all three. One fault was caught and fixed during
QA: the first rosette radius was scaled to the cell spacing
rather than the edge length, so the fine stars came out at 55px
on a 65px vertex spacing and smeared into red zigzag scribble
across the whole panel. Rescaled to the edge (0.08 of the cell
unit), the rosettes now sit inside the ribbon band as fine
detail, one at every vertex. Frame one: three-by-three ribbon
octagons and their square diamonds on open paper, red rosettes
studding the joints, the deleted grid nowhere in sight. Palette
audit: paper #F4F1E8, coarse grid #C9C4B4, ribbons #1A1A1A, fine
stars #B03A2E only. Watch-only: no interaction, no hint. Gallery
entry ready: 2002 · 06 · 18, "A coarse pencil grid, wide black
ribbons over it, fine red stars nested at the intersections,
then the coarse grid deletes and the pattern stands puzzlingly
unstructured, its ghost breathing back now and then. Watch
only."
