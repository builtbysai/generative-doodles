# No.166 Parquet Drift

## Concept
A horizontal strip of parquet that cannot decide what it is:
a square grid on one side, a rhomb tiling on the other, and
between them a melt front that takes half a minute to cross.
Every intermediate stage is still a legal tiling. The slowness
is the piece; there is nothing else in it, just ink on paper
and a front moving at glacial speed.

## Construction
Canvas 2D, single self-contained page, watch only. The strip
occupies the middle 55 percent of the viewport and bleeds off
both sides, its segments fading to nothing at the extreme
edges. Each grid vertex owns two positions: its square-grid
position, and its rhomb position, the same point with its row
sheared by 0.6 of a cell per step away from the middle row,
which turns the verticals into the diagonals of a 59 degree
rhomb. A front sweeps the strip left to right over 30 seconds
and returns over the next 30 (smoothstep eased, 60 second
loop, closing exactly). A vertex's blend is a clamped ramp of
its own x against the front, so all vertices in a column
share one blend value and every column at every instant is a
true tiling of trapezoids leaning a little more or a little
less; edges are drawn straight between blended vertices, 2px
ink #111111 on paper #FAFAF7. Cell size is capped by width as
well as strip height, so narrow screens get more, smaller
cells instead of a cropped few. House rules held: Visual
Viewport sizing with both resize listeners, canvas pinned in
px, synchronous first frame opened with the front mid-strip
(offset 15s: rhombs on the left, squares on the right, the
melt zone in the middle), typeof-guarded rAF, no pointer
listeners (the renderer confirms only the two resize
listeners).

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720
and inspected all three. The desktop frame passed as drawn:
rhombs left, squares right, legal trapezoid columns through
the melt zone, edges dissolving at both sides. The first
mobile render failed: with the strip height fixing the cell
at 77px, a 390px screen held only five columns and the shear
threw the pattern off the left edge, reading as cropped
rather than full-bleed. Cell size is now the minimum of
strip-height/6 and width/9 with the row count recomputed to
keep the strip at its full height; the re-rendered mobile
frame holds eleven rows and the full melt, front mid-strip,
and the thumb matches the desktop composition.
