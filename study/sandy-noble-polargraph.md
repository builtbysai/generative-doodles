# Sandy Noble's Polargraph: Study Notes

**Artist / maker:** Sandy Noble (UK). Polargraph, 2012: an open source
drawing machine (Arduino firmware + Processing controller + server), the
cable plotter as a kit and a community. Doorway: the Jurg Lehni study
ended with "the idea is bigger than you, and the idea also visits other
people" (his SFPC 2013 framing of Hektor clones). The Polargraph is the
proof: Noble lists Hektor, the AS200 drawbot, and Harvey Moon's machines
as his inspirations, then built the version the community actually ran
with. Wikipedia's polar plotter lineage now reads: Lehni and Franke
(2002), Ben Leduc-Mills' HSADbot (2010), Alex Weber's Der Kritzler
(2011), Harvey Moon, Noble (2012), Maslow CNC. Territory: plotter
rasterization, machine control, drawing-machine community.

**Depth: preliminary (text-based, plus one local technique
reconstruction).** This session could not reach polargraph.co.uk itself
(the live page fetch failed outright), so none of Noble's own drawings
were seen, and the original controller source was not read end to end.
What follows comes from his mirrored "What's a polargraph?" essay text,
the detailed README of the modern polargraph-js port (which documents the
original's geometry and pixel pipeline as it ports them), the Melt
controller README, and the beardicus awesome-plotters survey. The density
rasterization was re-implemented locally from the documented behavior and
visually inspected. A full visual pass on actual Polargraph drawings is
still wanted.

## The machine, in his own framing

"Only just good enough to get the job done." That is the whole design
brief. Two motors, some string, a normal pen, a gondola with a
pen-lift servo, gravity doing the rest. The famous honesty passage: it
is called a polargraph because he thought of it as dual-polar
coordinates, "in fact, it doesn't use a polar system at all, it's
actually a kind of double-triangulation coordinate system. The angle of
each cord is controlled by the length of both cords, rather than by
specifying angle and distance as in with a true polar coordinate. The
name 'Polargraph' remains as an evocative term, but it isn't accurate."
Keep a wrong name because it sounds right: the kind of decision an
artist makes and an engineer has to be talked out of.

Note the positioning against Lehni. Hektor is a spray-can robot as
service and artwork; the Polargraph is a tool for other people's
pictures. Noble's contribution is not the mechanism (he says so
plainly: Hektor, AS200, Harvey Moon, and "draftsmen will recognise this
as a primitive, gravity assisted pen plotter") but the software stack
that made the machine drawable by normal people: load an image or SVG,
pick a render style, queue it, watch the preview, walk away for the
hours it takes.

## The controller's technique (from the documented port)

The polargraph-js port is a clean-room reimplementation of the original
Processing 2 controller, and its README documents the original's math
as it ports it:

- **Cord-length geometry, exactly.** `inSteps` / `inMM` truncation
  (including the Java truncation quirks, preserved for identical
  output), `asNativeCoords` / `asCartesianCoords` conversion between
  cartesian points and cord lengths. The machine's native space is
  (L1, L2); everything drawn passes through that conversion.
- **Native-space pixel grid.** Bitmap images are not drawn in screen
  pixels; they are resampled onto a grid defined in native cord space,
  so the pixel commands are issued where the machine actually lives.
- **Boustrophedon pixel command generation.** Rows are walked
  alternately left-to-right and right-to-left, so the gondola never
  makes a wasted return trip. The drawing direction is the composition.
- **Masked-pixel pen lifts.** White (or below-threshold) pixels lift
  the pen; the queue only carries commands for marks. Tone images
  become lift choreography.
- **Density scaling.** The mark drawn per pixel scales with local
  darkness. This is the signature: tone encoded as pen extent, not
  spacing.
- **Vector low-pass filter.** SVG paths are smoothed before drawing,
  because the gondola is a pendulum and sharp vertices would ring.
- **The queue and flow control.** One command in flight; the firmware
  answers READY / DRAWING / RESEND over a 57600 8N1 serial line, with a
  realtime priority queue that can preempt the stream. A drawing takes
  hours, and the protocol treats interruption as a first-class event.

The config model (machine geometry, page, home, pen sizes) persists to
EEPROM with variant commands, and the legacy `.properties.txt` import
keeps a decade of old setups loadable.

## The density raster, reconstructed

Script: hidden_files/study-renders/polargraph_density.py. A procedural
driver field (soft dark orb over sine texture, 120x80 native grid)
drawn as one vertical tick per dark pixel, tick length following
density^0.8, rows alternating direction, threshold-masked whites lifted.
3,110 strokes rendered at 1600x1100 and visually inspected.

Findings, read off the frame:

- The orb's tone survives entirely in tick length. From a few feet back
  it reads as a smooth gradient; up close it is a field of identical
  ticks, no two adjacent rows aligned.
- The masked texture band around the orb is the interesting part: tiny
  ticks where the noise barely clears the threshold. The threshold is a
  compositional choice, not a technical one: it decides what the machine
  notices.
- Boustrophedon is invisible in the output and everything in the pacing.
  Half the travel of a naive raster, and the pen approaches each tick
  from alternating sides. Any technique that encodes direction into its
  marks would show this; the tick's symmetry hides it.
- The atom is the tick: a pen stroke whose extent is proportional to
  one sample. Everything else (grid, lifts, row order) is logistics.

## The inheritors: render vocabularies that grew up around the machine

The polargraph-js port bundles eleven bitmap-to-line algorithms, ten
adapted from mitxela's plotterfun and one from DrawingBotV3. This is
the modern descendant of Noble's handful of render styles, and it is
worth more study on its own:

- **Squiggle:** horizontal scanlines wobbling into sine waves whose
  amplitude and frequency follow local brightness.
- **Stipple:** weighted-Voronoi stippling, particles relaxing toward
  darkness-weighted centroids, rendered as circles, spirals, or one
  continuous TSP-optimized line.
- **Linedraw:** Sobel edges traced into contours plus 4-direction
  threshold hatching with Perlin jitter.
- **Halftone / Spiral / Polygon spiral / Delaunay / Subline / Waves /
  Implode:** the plotterfun family, each a different contract between
  tone and one continuous or structured line.
- **Sketch Lines (DrawingBotV3):** greedily finds the darkest
  remaining pixel, grows a squiggle by testing candidate directions and
  lengths and keeping the darkest, then "erases" what it drew by
  brightening a working buffer, so later squiggles fill in what is
  left. Two-phase "sketch then shade" mode. This is the loveliest
  algorithm in the list: a machine that draws like it is sketching,
  hunting the dark.

Melt (tags07) is the other branch: a live-coding controller with a
Processing-flavored API (line, ellipse, beginShape/vertex/endShape,
curve, text) and Hershey stroke fonts (astrology, futura variants,
gothic, greek, japanese, music, scriptc, symbolic, times...). Plotter
typography done right: text as vector strokes, not outlines.

## Technique takeaways

- Compose in the actuator's native space. The Polargraph thinks in
  cord lengths, Lehni's Hektor in belt lengths; both communities
  converged on double-triangulation independently. The machine's
  coordinate system is the style, whether you compose in it or fight
  it.
- Pen-lift economy is compositional. The queue only carries marks;
  everything else is travel and lifts. Masked-pixel lifts mean the
  negative space is decided by threshold, and the threshold is an
  artistic parameter.
- One atom, well chosen, carries the whole piece. The density tick is
  a single rule (mark extent follows tone) applied thousands of times.
  Compare Hoff's grain discipline: constrain the mark, spend the
  variation budget on placement.
- Interruption as a first-class event. RESEND, the realtime priority
  queue, the pen-lift servo: a machine that draws for hours must be
  steerable mid-drawing. Long-running generative work wants the same
  affordance (pause, reseed, redirect).
- The community is the artwork's distribution channel. Noble's real
  invention was the preview-plus-queue interface that let other
  people's pictures onto the machine. Tool design as a multiplier:
  one good controller outdraws a hundred good drawings.

## Avoid-list additions

- Do not clone the density portrait. The tick-raster headshot is the
  Polargraph's signature look; it belongs to a decade of other
  people's walls. Derive the atom (tone as pen extent) and the
  logistics (native grid, masked lifts), not the artifact.
- Do not fetishize fidelity. His own brief was "only just good enough."
  A plotter piece that chases photorealism misses the point; the
  machine's coarseness is the medium.
- Do not inherit the hours without the patience. Real cable plots take
  hours. Any piece concept in this family must be worth the runtime, or
  be designed for the runtime as part of the experience.

## Doorways for next sessions

- Maslow CNC: the same double-triangulation math scaled to
  4x8-foot plywood, a router instead of a pen. What changes when the
  mark gets violent.
- mitxela / plotterfun: deep dive on Squiggle and Stipple source; the
  weighted-Voronoi stipple with TSP line is a piece waiting to happen.
- DrawingBotV3: the full Sketch Lines algorithm and its other
  pathfinders; open source, documented.
- Alex Weber's Der Kritzler (Tinkerlog, 2011) and Harvey Moon's
  machines: the other branches of the family tree.
- beardicus/awesome-plotters: the full survey (saxi, Makelangelo,
  Line-us, GRBL-Plotter) as a hardware tour.
- Follow-up: full visual pass on actual Polargraph drawings
  (polargraph.co.uk gallery, the Flickr group) and a read of the
  original controller's pixel-style code.
