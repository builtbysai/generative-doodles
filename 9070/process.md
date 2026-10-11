# №9070 · Orchard - process notes

## Concept
A canopy from above: circles packed by dart throwing, big trees first,
then smaller ones fitted into the gaps, down a seven-rung radius ladder
from 0.085 to about 0.013 of the square. Each tree is a flat disc colored
by size: the largest are deep green, mid trees lighter, the smallest
infill pale yellow-green. About one tree in five carries a smaller rust
disc inside it, fruit seen from above. The ground is a dark soil green,
visible only in the gaps the packing could not close.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 9070. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing per the standing rule.
- Packing: per rung, 900 to 3900 darts; a dart is placed if it clears
  every placed tree by its radius plus a 0.004 gap. Fruit dots are
  placed at a seeded angle at 0.38 of the tree radius, radius 0.26 of
  the tree, minimum 1.5px.
- Compositional safety: placed count and total disc coverage are
  measured; seeds under 150 trees or under 0.50 coverage are rejected
  (10 derived-seed attempts, best coverage kept), because a sparse
  packing reads as a diagram of circles.

## Differentiation
- vs No.9064 (Grainfield): dots there are un-sized grain settling in a
  current; here every disc is a placed object with a size rank, a color
  by rank, and a non-overlap guarantee.
- vs No.9068 (Quarry): nested shapes around one center. Orchard has no
  center and no nesting; its order is a packing, not a stack.
- Family name: "ladder-packed canopy discs".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected at each size before pushing. Mobile letterboxes the square
  correctly; hint legible.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `9070/index.html`, `9070/thumb.png` (720x720, rendered from the live script), `9070/process.md`. Gallery index updated with the №9070 entry.
