# Patrick Tresset / Paul the Robot: Study Notes

**Date:** 2026-09-26
**Artist:** Patrick Tresset, French artist-scientist based in London,
Goldsmiths. AIkon-II project with Frederic Fol Leymarie, funded by the
Leverhulme Trust.
**Doorway:** hop from the Sougwen Chung study, continuing the
drawing-machine lineage: from Chung's learned-gesture robotic arms to
Tresset's observational portrait robots, the other pole of machine
drawing (perception-driven rather than memory-driven).

**Depth: deep.** The two core papers read end to end ("Sketches by Paul
the Robot", Eurographics 2012, Best Paper; "Portrait drawing by Paul the
robot", Computers & Graphics 37, 2013); the "Artistically Skilled
Embodied Agents" book chapter read for the e-David / Paul's Memories
material; press and exhibition writeups read (artnet on the embodiment
study, highlike, Gizmodo, Galleries West); 4 installation/action photos
visually inspected at full res (Paul mid-drawing with servo arm and
ballpoint, Tresset at the desk with the portrait wall, 3RNP robot
drawing a face, robot arm close-up); 2 PDF technique figures visually
inspected (the salient-lines feedback grid, two finished Paul
portraits); the full drawing cycle re-rendered locally in Python from
the papers' parameters and visually inspected. No physical robot was
run, and performance video was not watched; motion is inferred from
stills and the papers. Noted honestly.

## The backstory matters to the work

Tresset painted and drew from an early age, exhibited in Paris and
London 1991 to 2003, then in 2003 lost his ability to paint and draw.
Paul was originally built to palliate that painter's block. The
highlike bio frames it as creative prosthetics, or behavioral
self-portraits. This is not a lab demo that wandered into a gallery;
it is a painter rebuilding his own hand out of servos, and the
obsessive, slightly clumsy drawing style is a deliberate
self-portrait of a hand relearning to draw.

## The drawing cycle (5 steps, published verbatim)

1. Localise the sitter: the eye moves until OpenCV (Viola-Jones)
   finds a face, then focuses on it.
2. Take a picture, convert to gray, apply a contrast curve.
3. Draw salient lines with increasing precision (coarse to fine).
4. Perform the shading behavior.
5. Execute the signing script. Paul signs its drawings.

Paul is a three-jointed planar arm with a fourth joint to lift the
pen, holding a cheap ballpoint. The 2013 paper is explicit that the
thresholds were set by trial and error on lab test images and then
fixed for all sitters: "we do not seek great levels of accuracy in
the final results... we remain distinct from photographic portraiture."
Accuracy was never the goal; the stylistic signature was.

## Salient lines: a pyramid, Gabors, and a skeleton

The line extraction is the technical heart and it is fully specified:

- Image pyramid: 320x464, 160x232, 80x116, 40x58. Processing runs
  top-down, coarse to fine, which the paper frames as an approximation
  of how an artist resolves large then small features.
- Oriented Gabor kernels (gamma 0.5, lambda 5, sigma 2.5, phase pi):
  4 orientations at the coarse top level, 8 at the lower levels.
  Max response across orientations, then threshold, connected
  components, and a medial-axis transform per blob (they used Gamera's
  `medial_axis_transform_hs`; the longest axial branch is kept).
- Each branch becomes an array of points sent to motor planning.

The paper gives four reasons for Gabors, and the second is the one
that matters for us: **the limited orientation palette is a
stylising device**. Curves get built from a small set of allowed
angles, which harmonises the drawing the way a restricted color
palette harmonises a painting. They also note Gabor responses
accentuate high-curvature regions (corners, junctions), which carry
the facial information and improve readability, and that tangents are
how artists actually measure curves when drawing from life.

In my re-render (104 strokes across the 4 levels), this reads
exactly as described: sparse contour fragments that catch the
important bends and leave the rest out. The coarsest level alone
carries the whole gesture.

## Shading: budgeted randomness under feedback

Tone is built in 5 discrete values (white = absence of pattern, light
gray, mid gray, dark gray, black). The sitter image is thresholded at
4 levels; the white map is discarded; each remaining blob is shaded
by a random point-sampling walk:

- Points are chosen one by one inside the blob, with two acceptance
  criteria: the step between consecutive points must be under a value
  proportional to the blob's size, and the fraction of the segment
  lying outside the blob must stay under a threshold.
- The walk stops when the total path length reaches a budget
  proportional to the tone times the blob area. A cubic spline is
  interpolated through the points.
- An internal model of the blob tracks what has been drawn; if a
  relatively large sub-area is still undrawn, it triggers a new
  line-drawing step for that sub-area as a fresh blob.

Two shading strategies are named: pattern layering (progressively
darker patterns overlaid for a sfumato-like blur) and non-overlapping
patterns of various densities (sparse light tone first, darker
overlays after). My re-render used the second: 21 scribbles, 191.7k
px of ink path, 3 feedback second-passes triggered. Visually it is
immediately Paul-like: dense non-oriented scribble masses where the
dark regions are, sparse contours elsewhere, the face emerging from
scribble density rather than from outlines. Shading is additive with
a single pen, so tones can only darken; the tonal curve of the
drawing differs from the tonal curve of the subject, and the paper
is honest that the artist works around this by evaluating tones
only relatively, never absolutely.

## The feedback question: two kinds

The 2013 paper distinguishes computational feedback (an internal
memory-based model of what has been drawn, which is what Paul
mostly uses) from physical feedback (looking at the actual drawing
in progress and correcting from it). Paul's shading uses the
internal model; only motor control gets real sensor feedback. The
later e-David work pushes physical feedback harder, and tests
showed it let them use simpler stroke simulation and adapt the
stroke placement to different strategies. Takeaway: internal-model
feedback is enough for a convincing drawing, but only if the model
is honest about coverage. Paul's model is a binary array of drawn
vs undrawn; that simplicity is why the undrawn-sub-area recursion
exists.

## The eye theater, and why it works

In "5 Robots Named Paul" (2012 Merge festival, 2014 NTAA public
award, BOZAR Brussels 2015), five desk-robots with webcam eyes
alternate between studying the sitter and drawing, pausing,
wobbling. Press accounts report the eyes were choreography: the
drawing came from a single photo taken at the start, and the arm
never saw the video. But the theater is load-bearing. Researchers
borrowed the installation for the study "Putting the art in
artificial" (artnet, 2018): sitters who watched the robots draw
valued the portraits more than people who were only told robots
made them, or who saw the drawings with no provenance at all.
Connection to the maker, even a theatrical one, is what makes
people invest in the artifact. Tresset's own line, quoted in
Gizmodo: "a robot that slightly fails is more interesting, more
touching, it encourages empathy in the viewer."

## Paul's Memories and e-David: the painting branch

A 9-month residency in Konstanz with Oliver Deussen's team put
Tresset on e-David, an industrial robot arm that can hold 5
brushes, dip into paint, and use up to 24 colors (ink, acrylic,
oil). The team lists what they had to model: brush pressure, touch
angle, stroke path and velocity, paint load, viscosity, mixing,
travel time, brush cleaning. Calibration in XYZ color space:
geometric within a pixel, color within 5 percent. The resulting
"Painting Paul's Memories" series is the color counterpart to the
ballpoint sketches. The chapter is frank about the ceiling: these
systems show "the lowest level of artistic autonomy"; they execute
a style-space but cannot develop their own.

## Human Study #2: La Vanite

Three robot artists on school desks around a still life: a
taxidermied fox and raven beside a human skull, a La Fontaine
fable (2014-2017). Same drawing cycle, but the subject is not a
face, which is the interesting test: the salient-line machinery
was tuned for faces, and pointing it at fur, feather, and bone
shows where the style-space ends.

## What makes it sing

- The 4-orientation constraint at the coarse level: the whole
  stylistic signature lives in one parameter choice.
- Tone from density, not from value: five discrete budgets of
  scribble, no gray ink anywhere.
- The wobble is the author: cheap servos plus trial-and-error
  thresholds produce drawings a precise plotter never would, and
  the papers treat that as the point, not a defect.
- The drawing order (big lines, then tone, then signature) mirrors
  a human session, which is why the 40-minute sitting feels like
  a sitting and not a print job.

## Avoid-list additions

- Do not chase photographic accuracy in observational generators;
  the papers are explicit that accuracy was never the goal, and
  the good results come from the fixed, fallible parameters.
- Do not present the mechanism as the performance unless the
  mechanism is actually running; if the drawing is computed from
  one capture, say so in the notes, and design the performance
  honestly around it.
- Do not smooth out the actuator: a perfect pen path kills the
  handwriting that makes the work read as drawn.

## Honest gaps

No physical robot was run; my shading used an internal coverage
model only (no camera looking at a real page), matching the
paper's computational-feedback variant. Performance videos were
not watched. Thresholds were set by the same trial-and-error the
paper admits to. The sitter was synthetic, so likeness was not
tested, only mechanics.

## Sources

- Tresset & Fol Leymarie, "Sketches by Paul the Robot",
  Eurographics Workshop on Computational Aesthetics 2012 (Best Paper).
- Tresset & Fol Leymarie, "Portrait drawing by Paul the robot",
  Computers & Graphics 37 (2013).
- Tresset & Fol Leymarie, "Artistically Skilled Embodied Agents"
  chapter (e-David / Painting Paul's Memories section).
- artnet, "Putting the art in artificial" study coverage; highlike
  Tresset text; Gizmodo "Meet Paul, the Clumsy Robo-Artist";
  Galleries West "Art and Robotics"; MDPI Arts 8(33) on
  La Grande Vanite.
- patricktresset.com project pages (6 Robots Named Paul).
