# No.164 Zellij Skeleton

## Concept
The zellij skeleton without the picture: a field of cut tiles,
8-pointed stars and shuttle-shaped safts among plain filler
stones, grout showing between every tile, the way a Moroccan
courtyard wall is a skeleton of geometry before it is an image.
Each composition is generated fresh from a seed; a tap reseeds
and the wall rebuilds itself. Between reseeds the piece is
perfectly still.

## Construction
Canvas 2D, single self-contained page, still by default. A
jittered seed lattice is partitioned into convex cells (the
dual of the point set, computed by successive bisector
clipping, then clipped to a panel occupying 88 percent of the
viewport). Each cell is classified by its geometry:
many-sided or large cells become cobalt 8-pointed star tiles,
elongated cells become emerald saft shuttles fitted along the
cell's principal axis, and the rest become filler stones in
alternating warm white and ochre. A promotion pass keeps at
least a quarter of the tiles stars. Every tile is fitted
inside its own cell with clearance: fillers by exact polygon
inset, stars by scaling the silhouette until every point and
valley clears the boundary along its own ray, saft vertices
clamped along their rays the same way, so the grout gap
(about 2px of the #2B2B2B ground) survives everywhere. A tap
(press under 500ms, under 12px of travel) reseeds: old tiles
shrink and fade in 300ms, the new composition assembles
centre-out over 1.2s, and the animation loop stops the moment
the field is complete; there is no idle animation. First
frame is a finished composition. House rules held: Visual
Viewport sizing with both resize listeners, canvas pinned in
px in the draw path, page ground equal to the grout colour.
One recorded deviation: the partition is the dual of a seeded
point set rather than a literal multigrid line arrangement.
The prompt asks for the dual of a line arrangement in effect
(a freeform field of polygonal cells to be tiled); the seeded
dual produces the same class of irregular convex cells the
tile fitting needs, and the classification, fitting and grout
are all computed from the actual cells either way.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720
and inspected all three. Four faults were caught and fixed.
First, star tiles sized from the cell's inradius floated small
in dark voids; sizing from the circumradius then overlapped
neighbouring tiles by up to 18px on irregular cells; the
ray-fitted silhouette scaling replaced both. Second, thin
clipped slivers at the panel boundary were classified as
safts and read as green leaves; small-area cells are now
forced to fillers and safts must clear length and width
guards. Third, the saft class vanished entirely at the
original elongation threshold (vertex covariance reads lower
than the visual aspect); the threshold was retuned to 1.5.
Fourth, a saft corner combining full length and full width
crossed its cell's diagonal edge into the next tile; every
saft vertex is now ray-clamped inside its own cell. Final
renders show all three tile classes with a continuous grout
network and no overlaps, on desktop, mobile and thumb.
