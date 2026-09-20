# Interactive Classics, Batch 1: Study Notes

**Pieces:** KoalasToTheMax, drilian lightning bolts, paper.js Tadpoles, paper.js Chain |
**Sites:** koalastothemax.com, drilian.com/2009/02/25/lightning-bolts/, paperjs.org/examples/tadpoles/, paperjs.org/examples/chain/

**Depth:** deep. The live pages are either JS-walled (koalastothemax rendered
empty through the fetch tools) or long-moved, so all four pieces were rebuilt
from scratch in plain canvas from the documented algorithms and visually
inspected at 640x640. The koala target is a procedurally drawn stand-in, not
the original photo; the algorithms are the real thing.

These four are worth studying together because they are the canonical answers
to one question: how do you make a web page that is fun to touch? Each one is
built around a single gesture the visitor already knows: moving the mouse.

## KoalasToTheMax

By Vincent Ricard, 2013. One huge circle on a blank page. Move your pointer
over it and the circle splits into four smaller circles, each filled with the
average color of the photo region it covers. Split again, and again, until a
koala photograph resolves out of the circles. Finish it and a surprise video
plays.

### Core technique

Recursive circle subdivision over a sampled image, essentially a quadtree
rendered as circles instead of squares. The pieces:

- The source image is loaded into an offscreen canvas; `getImageData` gives
  the pixel buffer.
- Each circle maps to a square region of the image. On split, the region is
  quartered and each quadrant becomes a circle with radius half the parent,
  filled with the mean RGB of its pixels (sample every 2nd or 4th pixel; exact
  precision never matters, perceived color does).
- On pointer move, test each live circle: if the pointer is inside its radius,
  remove it and append the four children. A minimum radius stops the recursion.
- The reveal is pure discovery pacing. The visitor does the work of rendering
  with their hand, so the payoff at full resolution feels earned.

### Palette and composition

The composition is the gag: near-empty frame, one giant neutral circle,
a title that promises nothing. The color comes entirely from the source photo.
The technique is palette-agnostic, which is why clones work with any image.

### What makes it sing

The interaction IS the image loader. There is no progress bar, no "generating"
state; the visitor's curiosity is the render engine. The circles give a
satisfying organic feel that squares would not: a quadtree of rectangles reads
as a loading artifact, a quadtree of circles reads as a living thing dividing
("MITOSIS BABY", as one 2013 forum poster put it). Also note the restraint:
one mechanic, no UI, no score, one joke at the end.

### What is overdone (avoid list)

- Reveal-on-hover is now a cliche. Doing the same trick today needs a new
  twist: a different primitive (hexagons, triangles), a different reveal rule
  (split on scroll velocity, on sound, on time), or a genuinely surprising
  source image.

## drilian Lightning Bolts

Josh "drilian" posted the canonical lightning tutorial in 2009, aimed at game
developers. The version studied here is the algorithm writeup plus the
flashkit-era explanation of the same routine, both describing midpoint
displacement with halving offsets.

### Core technique

Fractal line generation by recursive midpoint displacement:

- Start with a segment from A to B. Find the midpoint, push it off the line
  along the perpendicular by a random amount in [-d, +d].
- Replace the segment with the two halves, halve d, repeat.
- Stop when d drops below a few pixels; draw the polyline.

That is the whole trick. Each generation contributes half the displacement of
the last, so the bolt has big sweeping bends and fine jitter at once, which is
exactly what real lightning looks like. Lay the same bolt sideways and it is a
mountain ridgeline, which is how you know the math is right.

Rendering sells it: draw the bolt three times, a wide soft blue glow pass, a
medium pass, then a thin near-white core. Branches spawn from random midpoints
of early generations with shorter, fainter bolts. Regenerate every frame or
two and the bolt flickers alive; hold one frame and it is a crisp illustration.

### Palette and composition

Near-black blue ground, pale blue-white bolt. Two colors, three passes of
stroke. The original demo ran bolts across the whole page as a storm effect;
the reconstruction stacks several vertical strikes with branches.

### What makes it sing

Ten lines of code that everyone believes is complicated. The technique is
endlessly reusable: terrain, cracks, veins, rivers, handwriting wobble. The
insight for doodles is that believable randomness needs structure at multiple
scales, and halving displacement is the cheapest way to get it.

### What is overdone (avoid list)

- White-blue lightning on black is the default "my first fractal" demo. If a
  doodle uses midpoint displacement, change the subject (cracks in clay,
  river deltas from above, root systems) or change the palette.

## paper.js Tadpoles

The paper.js examples page is a teaching gallery from Jurg Lehni's vector
framework (Scriptographer lineage, 2011). Tadpoles is the friendliest one: a
school of discs follows your pointer, each lagging the one ahead, so the
cluster stretches and swims like tadpoles.

### Core technique

Follow-the-leader with per-index lag:

- Keep an array of N points. Each frame the head chases the pointer:
  `p += (target - p) / k`, with small k (fast).
- Every other point chases the point ahead of it with a larger divisor, so
  lag grows down the chain.
- Add a small sinusoidal wiggle perpendicular to travel, phase-shifted per
  index. That wiggle is what makes them read as swimming rather than sliding.

The visual is discs shrinking down the chain, bright head to small tail, which
together with the motion gives the tadpole read. The original paper.js version
uses the framework's vector items and `onFrame` handler; the math is identical
in raw canvas.

### What makes it sing

The technique turns one input (pointer position) into N interesting outputs
through nothing but delayed following. It is the cheapest possible "alive"
motion. The wiggle matters more than it looks: without it the school reads as
a dragged rope; with it, as a living thing.

## paper.js Chain

The Chain example is the stricter cousin of Tadpoles: segments of FIXED length
connected joint to joint, head pinned to the pointer. This is one step of
inverse kinematics per joint, the same math as a rope, a spine, or a tentacle.

### Core technique

- Array of N joint positions, segment length L fixed.
- Each frame: joint 0 = pointer. For each next joint, place it exactly L away
  from the previous joint along the direction from previous to current:
  `b = a + normalize(b - a) * L`.
- Draw as a thick stroked polyline with round joins, or as tapered segments.

Where Tadpoles is soft exponential easing, Chain is geometric constraint.
The result curls, loops, and drapes like a real cord. The reconstruction drew
it as a two-tone rope with joint dots and it reads instantly as something
physical.

### What makes it sing

Constraint is character. The fixed segment length is one rule and it produces
all the interesting behavior: the coil when you circle the pointer, the whip
snap when you fling it, the drape when you stop. For doodles, this is the
technique behind tentacles, tails, hair, and vines.

## Shared takeaways for the doodle sketchbook

- One gesture, one rule, no UI. All four pieces are complete experiences with
  essentially no interface. A doodle does not need a control panel.
- Delayed following (exponential, per-index lag, or fixed-length constraint)
  is the fastest route to motion that feels alive. Three flavors documented
  above, each with a different personality: school, rope, and everything
  between.
- Image-driven pieces (koala) and pure-math pieces (lightning) both benefit
  from hiding the machinery: no sliders, no labels, just the thing.
- Midpoint displacement belongs in the permanent toolkit: lightning, terrain,
  cracks, rivers, roots. One function, many subjects.
