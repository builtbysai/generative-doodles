# No. 1683 The Maze of Symmetries

## What it feels like

You watch a maze teach itself symmetry. A single thick path pushes in from the
top edge, feeling its way cell by cell, and every move it makes is answered at
once across the whole frame: the same turn appears mirrored and rotated in
every quarter, a little late, so the pattern blooms outward from the entry
like a rumor spreading. Dead ends are not erased. The path folds back along
them and the retraced route comes back thicker, a trunk the maze learned from
a wrong turn. Where the mirrored paths cross, a small greek-key spiral knots
itself into the weave. After a while the rules change: the symmetry group
swaps, the old maze is gone, and a new one grows under new laws. It never
finishes. That is the point.

## Mechanism

A seeded depth-first walk grows a spanning tree on a 16 by 16 lattice, one
step every 70 ms, starting from the top edge. Every step is drawn together
with all its images under the active planar symmetry group, each image
staggered 120 ms behind the last, so the symmetry is seen propagating. The
group cycles p4m (8 transforms), cmm (4 transforms), p4 (4 transforms) every
150 seconds, and each cycle reseeds the walk, so the maze regrows under new
rules. Forward edges draw at 0.40 cell widths; backtracked edges, the folded
wrong turns, draw at 0.62 cell widths in the same color as the edge they
retrace, so trunks are visibly thicker. About one step in eight carries a
dark-green shadow underlay, offset by 0.06 cell. Two seeded junction cells
are chosen per cycle and drawn as greek-key spiral knots, mirrored with the
steps, so the knots sit at symmetric positions. Entry stubs bleed from the
start cell to the frame edge, one per mirror. Frame one is a fixed phase at
t = 26 s, with the maze 73 percent grown. Colors are flat fills only, no
gradients: vermilion, mustard, and cream paths over a dark teal ground.

## Asserted counts

- Lattice 16 by 16, 256 cells, 255 forward edges, 510 steps total per cycle.
- Frame one at t = 26 s: 372 of 510 steps revealed, maze 73 percent grown.
- Symmetry groups: p4m with 8 transforms, cmm with 4, p4 with 4; group
  changes every 150 s; seed is 1683 + cycle x 7919.
- Step interval 70 ms; mirror stagger 120 ms per image; full growth takes
  about 36 s, then the maze holds until the next group change.
- Two spiral knots per cycle, each mirrored under the group, so up to 16
  knot glyphs appear at symmetric positions.
- Path colors: vermilion 45 percent, mustard 32 percent, cream 23 percent;
  dark-green shadow underlay on about 12 percent of edges.
- Group label in the top-right plate always names the symmetry group in
  force: p4m, cmm, or p4.

## Deviations from the prompt

- The prompt lists p6 among the groups. p6 needs a triangular lattice, which
  conflicts with the prompt's own rule that the paths are rectilinear, so the
  piece cycles the three square-lattice groups p4m, cmm, and p4 instead. The
  group-change and regrow behavior is preserved exactly as specced.
- The prompt says the symmetry grid fills the frame; the piece keeps a square
  composition, 0.94 of the short side on desktop and full width on phones,
  with the page ground the same dark teal, so the grid reads as the frame.

## Interaction

Watch only. The maze never finishes.
