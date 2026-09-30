# Process notes · №8970 · Greedy Squiggle (2026-08-02)

## Concept
A plotter-style line hunts the darkest remaining area in a generated tone
field. At every step the pen probes eight candidate directions, scores each
by the darkness sampled ahead of it (plus a little momentum and hand-like
wobble), commits to the darkest, draws one short segment, then erases the
working buffer behind itself so eaten darkness never attracts it twice.
When the local ground goes pale, the pen lifts and relocates to the darkest
pixel left anywhere in the field. On load the line draws itself with a
plotter-like reveal; clicking or tapping anywhere builds a fresh seeded
driver field and a brand new squiggle.

## How the greedy hunt works
- The tone field is a 1280x800 float buffer painted by a seeded driver
  (see below). Darker values attract the pen.
- Each step samples three points along eight candidate rays (6, 12, 20 px
  out), weighted 0.5 / 0.3 / 0.2, and picks the darkest ray, biased toward
  continuing the current heading (momentum 0.07) with a breath of
  deterministic noise so open areas wander like a hand, not a ruler.
- After moving, the pen erases a disc (radius 3.6) at its old position.
  It eats where it has been, never where it is going, which is what keeps
  the line hunting instead of circling one dark spot forever.
- A lift triggers when the best probe score drops below 0.045, or every
  700 steps as a relocation check. The pen then jumps to the darkest
  remaining pixel (scanned on a stride-6 grid). The run ends when the
  darkest pixel left is below the stop threshold or 30,000 steps are done.
- Line weight follows the sampled darkness (heavier in dark zones), with
  per-segment jitter for an inked, hand-drawn edge. A red pen dot marks
  the live tip during the reveal.

## Driver designs tried
Three seeded tone-field painters were built and compared:

1. **landscape**: layered mountain ridges, a spiral sun, drifting cloud
   wisps, and a dense forest band along the base. Reads as a woodcut
   mountain scene, but the forest fill runs heavy and the composition is
   the least surprising of the three.
2. **koi**: a pond scene: one koi (elliptical body, tail, spots), ripple
   rings, pond stones, and weed strokes. The fish reads clearly at good
   seeds, though the body can turn scribbly when the pen overworks it.
3. **storm**: a storm front over a hill: dark cloud whorls across the top,
   diagonal rain streaks, a jagged lightning bolt, a grassy hill, one tree,
   and a small house. The most dramatic driver by far.

## Seeds tried and the winner
Seeds rendered and inspected for storm: 49, 7, 123, 2026, 5 (plus koi 7
and landscape 7 as cross-driver checks after the algorithm fix).

- Seed 2026 (pre-fix) had a beautiful bolt striking to the hill, but the
  pen escaped the field (see Bugs below) and the fix changed trajectories.
- Seed 123: the tree drifted mid-air and read as a floating blob. Rejected.
- Seed 5: bolt strikes the house roof, dramatic, but the cloud bank merged
  into one heavy mass. Runner-up.
- Seed 49: clean bolt left of the tree, distinct cloud whorls. Strong.
- **Seed 7 (winner):** the lightning bolt drops from the cloud bank and
  strikes straight through the tree down to the hill, a single dramatic
  diagonal that organizes the whole frame. The clouds stay as distinct
  spiral whorls with breathing room between them, the rain reads as wind
  blown streaks, and the little house anchors the right side. It is the
  most composed and most narrative of the set, so storm with seed 7 is the
  shipped default.

Typical storm run: 30,000 segments with roughly 47 to 69 pen lifts, mostly
one long continuous line per dark region.

## Bugs found and fixed
- **Reversed edge steering.** The frame-edge repulsion term rewarded motion
  *away* from the canvas center, so a pen reaching an edge accelerated
  outward and escaped the field entirely (measured bounds as far as
  x -2385..1650, y -1118..2817 on a 1280x800 field). Signs corrected, and a
  hard clamp now keeps every step inside the frame as a backstop.
- **Paper-cache render bug.** An optimization that cached the paper
  background redrew it every animation frame and then painted only the
  newest segments, erasing the accumulated line, so the animated reveal
  ended on a blank page. Fixed with a separate ink accumulation layer:
  new segments append to the ink canvas, each frame composites
  paper + ink + pen dot.
- **Stale compositor screenshots.** Headless CDP screenshots sometimes
  returned frozen frames; final verification used direct
  `canvas.toDataURL()` reads instead.

## Differentiation
- **№8990 Tone Rows** is a boustrophedon raster: the pen sweeps the field
  row by row, laying down vertical ticks whose length follows local tone,
  like a printer head. The path is fully predetermined by the scan order;
  the image emerges from tick modulation, not from any hunting behavior.
- **№8979 Almost Perfect** is a single continuous nested-square path with
  rotational drift: one unbroken line spirals through concentric squares
  that slowly rotate, and the drawing is the geometry of the path itself.
  There is no tone field, no probing, and no pen lift.
- **№8970 Greedy Squiggle** differs from both: the path is not planned at
  all. It is discovered step by step by a greedy agent that probes for
  darkness, eats the buffer behind it, and lifts to relocate when the
  ground goes pale. The composition is an emergent record of that hunt.

## QA
- Desktop 1280x800 and mobile 390x844 inspected via direct canvas capture.
- No scroll or overflow at either size; plate caption shows number and
  title; no date text on the page; no em dashes in page copy.
- Plotter reveal animates on load (~110 steps/frame, completes in seconds);
  click/tap regenerates a fresh random driver and seed (verified: storm/7
  became landscape with a new random seed, full redraw, no errors).
- `cdp_exceptions.py` exit 0 at both widths (2026-09-29).
- thumb.png is exactly 1280x800, rendered from the shipped default.
