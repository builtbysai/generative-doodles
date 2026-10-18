# No.161 Polygons in Contact

## Concept
Hankin's 1905 discovery as Jay Bonner reclaimed it: a Turkish-bath
wall of lightly drawn polygonal tiling in pencil, with small star
motifs blooming inside each tile. The motifs are not contained by
their tiles: at every shared edge they meet at a contact point on
the boundary, marked by a short red link, so the finished pattern
links across the tiling into one quiet tapestry.

## Construction
Canvas 2D, single self-contained page. Four tessellation
generators cycle on tap, each with a fixed seed so the result is
stable: 4.8.8 (octagons with squares in the gaps), 3.6.3.6
(hexagons with triangles), 3.4.6.4 (hexagons, squares and
triangles), and a decagon, pentagon and hexagon mix. Tiles are
stroked in pencil (#B9B2A0) on plaster (#EFE9DA). Inside each tile
a star motif ({n/k} with the true inner radius, k chosen per tile
size so small tiles stay legible) is stroked in ink (#1A1A1A) at
about half the tile radius. Cross-boundary linking is by
construction: neighbouring tiles whose boundaries nearly touch
share a contact point at the midpoint between their centres, and
a short red (#B03A2E) link is drawn across it with a red dot at
the point itself. Tap (a press under half a second that does not
travel) advances the family and the motifs re-bloom with a one
second staggered grow. The first family opens fully grown. House
rules held: Visual Viewport sizing with both resize listeners,
canvas pinned in px, window.screen phone check with aspect
fallback, synchronous first frame, typeof-guarded
requestAnimationFrame.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720
and inspected all three. One fault was caught and fixed during
QA: the 4-point star parameter for the smallest tiles drove the
inner radius to zero and the square motifs collapsed into thin
crosses; the step parameter is now chosen per tile size and the
squares carry small diamond motifs. Frame one: the 4.8.8 wall
fills the frame, eight-point stars in the octagons, diamonds in
the squares, red links stitching every shared boundary. Palette
audit: plaster #EFE9DA, pencil tiling #B9B2A0, motifs #1A1A1A,
link accents #B03A2E only. Gallery entry ready: 2002 · 06 · 21,
"Hankin's polygons in contact: a pencil tiling with small stars
blooming inside each tile and linking across the boundaries into
one tapestry. Tap to change the tiling family."
