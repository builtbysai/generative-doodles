# No.364 Dandelion Medallions

## Concept

After Julianne Haness's "Dandelions" (EXPANSION #38,
jmarie.creates prompt 4): a two-scale vine medallion
system. The macro scale is a bold purple vine
scrollwork lattice on a salmon ground; the micro
scale is the inserts, giant coral dandelion-seed-head
medallions framed by the lattice. The medallions are
crisp radial starbursts with dot fills, never blobs:
straight arms, tufted tips, dotted centres.

Palette, flat only: ground salmon #F2A58A, vine purple
#6B4C8E, medallion coral #E0574E, and a darker coral
#A83A32 used only for the dot fills the prompt calls
for. Nothing else.

## Construction

One canvas, no offscreen canvas, no filters, no
gradients, no shadowBlur. Everything is JS data or
closed-form functions of grid indices, drawn directly
each frame.

- Node grid: 5 columns (352 apart) by 5 rows (275
  apart), half-drop: odd rows shift half a column.
  The world is authored oversized at 1760x1260
  against the 1280x900 design view so drag panning
  always stays covered.
- Vines: one Catmull-Rom spline per column and per
  row through the node points, each running one
  phantom node past both ends so the curves cross the
  world edges without pinching. Stroked at 26px in
  vine purple. Hanging leaves sit at horizontal
  segment midpoints, outward leaves at vertical
  segment midpoints, tendril curls at the quarter
  points of horizontal segments on even rows.
- Medallions: radial starbursts. Each arm is a
  straight coral line at one of three length steps,
  ending in a three-spoke tuft, with one darker dot
  on the arm and a ring of darker dots between arms;
  the centre is a coral disc with a dotted ring.
- Arrangements: a fixed table of three. Arrangement
  0 (full bloom) puts a medallion on all 25 nodes,
  arms 12 to 24, radius 92 to 108. Arrangement 1
  (checker) puts 13 larger medallions (radius 112,
  arms 15 to 24) on even-parity nodes. Arrangement 2
  (sparse) puts 17 smaller medallions (radius 78,
  arms 12 or 16). Arm counts are asserted in range at
  load. Double-tap steps the table; drag pans;
  neither ever reloads.
- Motion: one seamless 36s master loop. Node sway is
  a whole-cycle sinusoid of the loop phase (7px in x,
  5px in y, phase offset per node) and each medallion
  rotates plus/minus about 4 degrees on a whole-cycle
  sinusoid, so frame 36s is pixel-identical to
  frame 0.
- Determinism: frame one is drawn synchronously at
  the constant phase T = 9s (a quarter cycle:
  medallions mid-rotation, vines mid-sway), and the
  rAF clock (typeof-guarded) advances from that
  anchor in fixed 1/60 ticks. Never a wall-clock
  offset.
- Sizing: Visual Viewport API with resize listeners
  on visualViewport and window; canvas pinned every
  frame via style width/height in px; cover-fit;
  phone detection via window.screen min dimension
  under 700px with the h > w*1.15 aspect fallback.
  Pointer coordinates convert through the stored
  cover transform (S, OX, OY).

## QA log

- Rendered with the node-canvas renderer at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and
  720x720 (thumb.png), and inspected all three.
- Desktop: the lattice reads as one woven system,
  verticals weaving through the half-drop nodes,
  horizontals straight through their rows; medallions
  sit exactly on intersections; leaves and curls read
  as foliage, not noise.
- Mobile: cover-fit centre slice, medallions large
  and crisp at 390 wide, no distortion or letterbox.
- Thumb: the two-scale system (macro lattice, micro
  starbursts) stays legible at gallery size.
- Thumb rendered twice and byte-compared: identical.
- Double-tap states probed with temporary copies
  (not shipped): arrangement 1 reads airier and
  bolder, arrangement 2 denser and smaller; both
  compose cleanly with no clipped or empty nodes.
- Palette audit: the file contains exactly the four
  hexes above. No em dashes, no absolute URLs, no
  text anywhere in the piece.
