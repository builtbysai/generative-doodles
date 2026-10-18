# No.149 Ninety Over Six

## Concept
Her SES-APPS grammar at work: a 90 degree corner divided into equal
rays, and the fold those rays imply blooming into a rosette at every
node of a square plus root-3 grid, tiling out k-uniform across the
field. The construction corner itself is marked on a cleared inset at
the lower left, rays and all, the way her sheets keep the generating
corner on the page. One tile in twelve is burnt orange.

## Construction
Canvas 2D, single self-contained page. The field is a triangular
lattice (row height s times root-3 over 2) over a faint square plus
diagonal grid drawn in pale tan. Each node carries an n-fold rosette:
petal arcs between neighbouring vertices, the {n/2} star drawn as its
two interleaved components (two triangles at n=6, two squares at
n=8), and a centre circle; a half-scale rosette sits in each cell at
half alpha. The division n takes the values 4, 6, 8, 12 and the piece
opens at 6. Horizontal drag steps the division (110px per step,
clamped at the ends); on a step the whole field rebuilds together
with a 0.8s draw-on (grid first, rosettes fading and settling from
0.85 scale), so folds never mix in one view. The orange accent is
chosen by a hash of node position, index in twelve equal to the
accent seed, so accents scatter as single tiles; double-tap advances
the seed. The corner inset is a paper patch with a tan border holding
the 90 degree bracket, the n rays at 90/n degrees, its construction
arc, and an orange corner point. House rules held: Visual Viewport
sizing with both resize listeners, canvas pinned in px, window.screen
phone check with aspect fallback, field full-bleed on phones,
synchronous first frame with the rebuild complete, typeof-guarded
requestAnimationFrame, lowercase hint.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720 and
inspected all three. Two fixes from the first pass. The accent rule
originally ran on a sequential tile counter, and with roughly thirteen
nodes per row the orange tiles stacked into a near-vertical stripe;
the accent is now hashed by node position and the orange tiles
scatter across the field one at a time. The construction corner
originally fanned its rays straight over the field and read as a
glitch in the pattern's corner; it now sits on its own cleared inset
panel, legible as a construction diagram. A third fix during
building: the {n/2} star was first drawn as a single component,
which at n=4 degenerated to one diagonal; it is drawn as both
interleaved components for every n. Final frames: dense indigo
rosette field on warm paper, tan grid under it, orange singles
scattered, corner inset clean at lower left. Palette audit: grid
#C9BFA8, rosette ink #22335C, accent #B3552E, paper #F4EFE3,
background #0C0C0E only. Interaction is horizontal drag (division
step) plus double-tap accent reseed; no click-to-reload.
Gallery entry ready: 2002 · 06 · 09, "A ninety degree corner divided
into six rays blooms into six fold rosettes across a square and root
three grid, one tile in twelve burnt orange. Drag to change the
division."
