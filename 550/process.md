# Monaco Colorway, Running - №1686 (KG7, #221 kjetil-golid, PP933)

Date: 2006 · 08 · 24
Interaction: watch-only. "Watch the machine idle."

## What it feels like

A cutaway of a machine that does something unknowable. Three layers
recede in a shallow diagonal section: arches slide along a track at the
back, cylinders stand and turn in the middle, and three toothed gears
mesh and turn at the front, with a strip of small rollers running along
the bottom. Nothing hurries. Every twelve seconds the whole machine
changes its coat: Monaco, then Casino, then Block Work, each swap
crossfading over one second, and the machine keeps idling through all
three.

## Mechanism

- Layers: three horizontal bands, each shifted a little further right
  than the one behind it, on a cream ground with rivets marking the
  grid intersections (5 by 4). The back band carries three arches, the
  middle band three cylinders, the front band three gears; a roller
  strip of seven small discs runs along the bottom.
- Arches: thick semicircle segments (outer radius 7.5 units, band
  2.6 units) in teal, plum, teal, standing on small feet on a guide
  rail. Each slides along its track as a sine with a 12 second period
  and its own phase, amplitude 2.2 units.
- Cylinders: stacked ellipses, sage body with teal bands, plum top
  face, teal bottom ellipse. A vermilion marker dot orbits the rim of
  the top face with a 9 second period, so each cylinder visibly rotates
  in place; a cream hub dot marks the center.
- Gears: toothed discs, teeth 12 / 18 / 12, the middle gear 1.35 times
  the radius of the outer two. Centers are spaced by the sum of the tip
  radii so the teeth just interleave. The outer gears turn once per 12
  seconds; the middle gear counter-rotates at the 12/18 tooth ratio
  with a half-tooth phase offset, so the mesh stays interleaved.
  Spokes and vermilion hubs make the turn readable.
- Rollers: seven small discs turning together with a 6 second period,
  each with its own spoke phase.
- Colorways: named palettes swapped on a 36 second cycle, 12 seconds
  each, 1 second smooth crossfade at each boundary. Monaco: deep teal
  #1F6E64, sage #7BA889, cream #F2EAD8, dark plum #4A2A3A, vermilion
  #D9481F. Casino: dark felt #17181C with chip-stack red #C1272D,
  blue #2456A6, yellow #F2B705, green #1E7A34, cream #F2EAD8.
  Block Work: monochrome ink #23201C, grays #6E6A63 and #3A362F on
  cream. Plates use the current colorway's dark color with its ground
  color as text.
- Whole-machine loop: every track period (12, 9, 18, 6 seconds) divides
  the 36 second colorway cycle, so the machine returns to its exact
  starting state every 36 seconds.
- First frame: t = 0, Monaco colorway, all parts at rest phase, so
  re-rendering the thumb is byte-identical.

## Asserted counts

- 3 arches, 3 cylinders, 3 gears (12 / 18 / 12 teeth), 7 rollers,
  verified by partCounts in the script.
- 3 named colorways: Monaco, Casino, Block Work.
- 1 interaction: none. Watch-only, no click, no reload.

## Deviations from the prompt

None material. Two judgment calls: the prompt names the Casino and
Block Work palettes only by spirit, so both are hand-built named sets
in the same spirit as Monaco (Casino as a saturated chip stack on dark
felt, Block Work as monochrome ink and grays on cream). On phones the
parts scale up by 1.45 so the machine still fills the tall frame, per
house rules; the gear centers are computed from the tip radii so the
mesh stays exact at either scale.

## QA

Rendered the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, and 720x720 thumb; all three inspected visually.
Mid-cycle frames rendered at t = 13 (Casino) and t = 30 (Block Work)
and inspected: both colorways read, the gears have visibly turned, the
arches have slid, and the cylinder marker dots have moved. Thumb
re-rendered twice, md5-identical: ad4d9ecc4cecc11d7be3729418fe8f57.
