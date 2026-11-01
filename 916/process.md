# No.916 "Fused Grid"

Study #112 duncan_geere, PP77 "The Fused City".

## Concept

Geere's Ekistics "Fused Grid" (2020) is a city plan drawn as a circuit
board: four diamond quadrants, each a dense maze of rectilinear street
modules with rotational symmetry, hatch-filled feeder blocks, and two
avenues crossing the whole composition diagonally. White ink on black
paper. This build keeps the plotter at the center of it: the city is
not shown, it is drawn, quadrant by quadrant, in about 24 seconds, and
then the finished board stays on the table. The randomness is the
subject, held inside strict limits: every module is a random street
tree, but only ever rectilinear, only ever ink, only ever inside its
diamond.

## Construction

- Composition space is the big diamond |x| + |y| <= 1. The four
  quadrants (E, S, W, N) are the radius-0.5 diamonds centered on the
  axes; they tile the big diamond exactly. Each quadrant carries a
  local frame (a = radial, b = tangential) and a 4x4 grid of modules
  in (a, b), clipped to the quadrant diamond.
- Module model: a spanning tree grown by randomized depth-first search
  on a 5x5 node lattice inside the module square (24 orthogonal edges,
  grown in DFS order), folded back on itself by rotational symmetry,
  order 2 or order 4 per module by seeded coin, duplicates merged. So
  every module is a small symmetric circuit of streets, and no two
  modules share a seed. Some modules also hatch 0, 1 or 2 of their 16
  lattice squares with diagonal lines. All segments are clipped to the
  quadrant diamond with an exact L1-ball clip (candidate parameters:
  segment ends, axis crossings, and the four signed roots of
  +/-x(t) +/- y(t) = 1, midpoint-tested per elementary interval).
- Avenues: two straight chords across the whole composition at double
  line weight, at a seeded angle (18 to 72 degrees) and its
  perpendicular, each with a small seeded offset from center, clipped
  to the big diamond. They are scheduled early in the plot, like
  feeder roads: the first runs 1.0 to 4.2 s, the second 6.0 to 9.2 s.
- Plot model: quadrants plot in the order N, E, S, W, starts staggered
  5.2 s apart. Inside a quadrant, modules plot center-out on heavily
  overlapping windows (each module spreads its segments over 4.6 s;
  module starts stagger by about 0.147 s), so a part-plotted quadrant
  reads as a density gradient across its whole diamond rather than a
  finished miniature in the middle. Each segment takes 0.4 s to draw;
  the last segment lands at 22.4 s.
- Hold reading (chosen, per the study note's ambiguity): the plot runs
  once per generation, on load and on each re-fuse. After the plot
  completes there is a hold, and the finished board then simply stays;
  it does not erase or re-plot itself. Generation 0's plot clock is
  pre-advanced by 8.6 s, so frame one shows the N quadrant complete,
  the E quadrant a little over half plotted across its diamond, the
  first avenue complete, the second about four fifths drawn, and the
  S and W quadrants still empty paper.
- Generations are pure functions of an index: generation g is built
  from mulberry32(BASE_SEED + g * 7919), avenues first in the stream,
  then quadrants in fixed order, modules in fixed (row, col) order.
  The current generation is derived from the recorded tap log on every
  frame and its geometry rebuilt only when the index changes.
- Gestures, all derived closed-form from the recorded pointer logs:
  taps resolve 0.35 s after landing; two taps inside the window pair
  into a double-tap. A lone tap is a re-fuse: a new random city (next
  generation) whose plot restarts at the resolve time. A double-tap
  inverts the piece (black ink on white paper) for 8 s. Dragging runs
  the tracer: recorded drag points are converted to composition
  space and snapped to the nearest already-plotted street or avenue
  segment (falling back to all streets early in the plot); the snapped
  path is redrawn fresh each frame as a three-pass trail whose alpha
  decays with point age (about 1.3 s), with a head dot. No offscreen
  buffer anywhere.
- Sound starts on the first pointer gesture only, lazily created and
  typeof-guarded. While the current generation is still plotting, a
  sawtooth servo whine runs through a lowpass at low gain, its pitch
  wobbling slowly. The tracer carries a soft triangle hum whose level
  follows the drag speed measured over the last 0.3 s of the drag log.
  A re-fuse fires a paper-feed burst: a short band-passed noise swish,
  triggered when the audio updater sees the derived generation index
  change.
- Sizing follows the house rules: Visual Viewport API first, resize
  listeners on visualViewport and window, canvas style pinned in px
  in every draw, phone detection from window.screen physical size
  (min dimension under 700 px) with the aspect fallback. The diamond
  is centered on the smaller dimension with a black margin at every
  size (paper margin while inverted). Palette is strict: ground
  #0A0A0A, ink #F5F5F2; inversion swaps to ink #111111 on #FAFAF8.
- Determinism: frame one is the synchronous draw at t = 0. No
  Date.now, no Math.random, no gradients, no shadowBlur, no
  ctx.filter, no offscreen canvas. All randomness is the per-
  generation mulberry32 stream, consumed in a fixed order.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). The
  harness has no AudioContext and fires no gestures; the piece renders
  complete in silence.
- First render round caught two faults. (1) The L1 clip classified
  elementary intervals by midpoint using only the axis crossings as
  breakpoints, but the inside/outside boundary sits at the
  |x| + |y| = 1 roots, not at the crossings: avenues came out as
  degenerate stubs near the center and clipped street pieces leaked
  outside their quadrant diamonds. Fixed with the exact clip (signed
  roots added as candidates); verified numerically in node: a test
  chord clips to its exact endpoints, and both avenues measure 1.418
  composition units. (2) Segments were spread by index across a whole
  quadrant in center-out module order, so the half-plotted E quadrant
  read as a finished miniature square. Fixed with the overlapping
  per-module windows above; the E quadrant now plots as a gradient
  across its full diamond (179 of 317 segments down at frame one,
  bounding box spanning the whole quadrant diamond).
- Frame one read-back (all three sizes): black field with margin; N
  quadrant fully plotted as a diamond of white rectilinear street
  modules with a hatched block; E quadrant part-plotted across its
  diamond; both double-weight avenues crossing diagonally, one
  complete, one ending mid-frame; S and W quadrants empty.
- Mobile read-back: the diamond sits centered in the tall frame,
  whole, nothing clipped; streets and avenues legible at phone scale.
- Determinism gate: thumb.png rendered twice and cmp byte-compared,
  identical. The duplicate render was deleted.

## Deviations

- Hold reading: the source note leaves open whether a finished board
  loops; this build holds the finished board indefinitely (plot runs
  on load and on re-fuse only), which is the reading the brief for
  this piece directed. Recorded here as instructed.
- Avenues are scheduled early in the plot (as feeder roads, the role
  the study assigns them) rather than last, so frame one at the
  specced phase offset shows them drawn and partially drawn across
  the composition.
- Hatch squares are chosen per module from its 16 lattice squares
  independently of the street tree's symmetry fold; the tree itself
  always carries the symmetry. The hatch count per module (0, 1 or 2)
  follows the seeded 45/35/20 split.
- The tracer snaps to already-plotted streets first and only falls
  back to unplotted streets when nothing near the finger has been
  drawn yet; the study says "nearest street path", and a tracer that
  runs on invisible streets would read as a freehand line.
