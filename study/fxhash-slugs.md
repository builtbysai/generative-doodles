# fxhash slugs: five-project survey: Study Notes

**Site:** fxhash.xyz/generative/slug/{harmony-clock, rotating-system-01,
endless-whisp, hills-and-mountains, stroll} (fxhash 1.0, Tezos)

**Depth:** deep. All five projects identified and their artist descriptions
recovered from token metadata via the objkt public indexer; one output from
each project visually inspected at full resolution from its IPFS display
image (Harmony Clock #2, ROTATING SYSTEM 01 #180, Hills and Mountains #71,
Endless whisp #2, Stroll #1). The generator source code was not recoverable
in session: fxhash.xyz pages are JavaScript-heavy and blocked to the fetch
tools, and the fxhash GraphQL API did not respond. Techniques below are
reconstructed from the artist-written descriptions plus the inspected
outputs, which is stated per project. No visual claim is made beyond what
was seen.

## Recovery method (for future passes)

The fxhash site itself stayed unreachable, but every project leaves two
public trails. First, the objkt indexer (data.objkt.com v3 GraphQL) answers
token queries by name on the fxhash v1 contract
KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE, returning the artist's own
description, the verified creator address, and ipfs:// display and
thumbnail URIs. Second, those display URIs load through public IPFS
gateways (Pinata worked this session; ipfs.io and dweb.link rate-limited).
So a blocked fxhash pass can still get artist descriptions and real output
images. The code itself lives on IPFS too, but the parent generative token
ids were not resolved this pass.

## The five projects

### Harmony Clock, by meodai

Token description: "Harmony Clock shows a freshly generated palette every
minute. To do so it uses generative color harmonies based on color theory.
Expect for the background color, none of the color is hardcoded. The color
sequence is unique to each buyer. There are different watch style
variations and a tiny (0.05%) chance of showing the palette as a
background. (from center) seconds -> minutes -> hours"

Harmony Clock #2, inspected: concentric annular sector rings on an
off-white field, three rings read center-outward as seconds, minutes,
hours. Each ring is divided into time segments, and every segment wears a
color drawn from a freshly generated color-theory harmony, warm reds,
pinks, browns and golds in this output. The composition is a working clock
painted entirely in palette.

Technique: a color-harmony engine (complementary, analogous, triadic
rotations around a random base hue, presumably) feeding a fixed radial
time structure. The novelty budget goes to palette, not form, and that is
the smart call: a clock you can read stays a clock in any palette, so
every minute-mint is coherent by construction. The 0.05% palette-as-
background variation is a nice rarity mechanic, cheap to implement.

What sings: color theory doing the compositional work. What is overdone:
the clock trope itself is one of the most mined generative ideas; this one
survives because the harmony engine is genuinely generative rather than a
cycled gradient.

### ROTATING SYSTEM 01, by Camille Roux (@camillerouxart)

Token description gives only the artist credit, so this one is read from
the output alone. ROTATING SYSTEM 01 #180, inspected: bold flat-vector
concentric system on deep navy, a mandala with clockwork manners. Outer
sparse orange dots, a wide red band carrying an orange dot ring, a teal
band with large red dots, an inner ring of small orange dots, a ring of
large red dots, then an inner teal ring of small red dots around a solid
orange center. Palette is disciplined poster work: navy, teal, red, orange.

Technique: radial symmetry with alternating ring types, dot rings versus
solid bands, dot density and dot size varied per ring (sparse large dots
outside, dense small dots inside). The "rotating" in the title suggests
the live view animates, rings counter-rotating at different speeds, which
is the classic way to make this construction hypnotic rather than static.

What sings: the restraint of flat vector and the four-color palette; the
alternation of dot rings and bands gives it rhythm. What is overdone: the
mandala is a crowded room; the difference between this and a thousand
others is entirely the palette discipline and the motion, and the still
image only proves the first.

### Hills and Mountains, artist unknown (verified creator tz2SLavn...7KmDe)

Token description: "Peaceful landscapes with a range of different color
schemes. An attempt to make a minimalist and realistic landscape using
generative art."

Hills and Mountains #71, inspected: about ten stacked ridgelines from a
bright teal-green sky down to a near-black purple foreground. Aerial
perspective done purely as value stepping, each ridge darker than the one
behind it. Every ridge silhouette carries a scalloped, stippled edge, a
fine jitter along the contour that reads as tree line texture without a
single tree being drawn.

Technique: 1D noise ridgelines stacked in depth order, value-gradient
atmospheric perspective, contour jitter for texture. The ridgeline-stack
is one of the most common generative tropes, and this one works because of
palette discipline: a single teal-to-plum ramp carries the whole piece.

What sings: the contour stipple, a small trick with large payoff. What is
overdone: the composition itself is the genre default; there is nothing
here that a dozen other landscape generators do not also do.

### Endless whisp, artist unknown (verified creator tz1dXovd...qAegpNg)

Token description, in full: "This is an infinite loop."

Endless whisp #2, inspected: a black field with sparse small white
gestural strokes, hooks, commas, short dashes scattered thinly. The still
image is deliberately uninformative: the work is the loop, wisps drifting
and fading on black, and a captured frame shows almost nothing.

Technique, inferred: short curved strokes with fading alpha trails, the
standard wisp construction, seeded to loop seamlessly. The honesty of the
description is the point: no composition claim, just the loop.

What sings, presumably: the motion, which was not seen. Marked honestly:
this is the one project of the five where the still sells nothing and the
loop sells everything, and judging it from the display image alone would
be wrong. The lesson for the sketchbook: some pieces only exist in time,
and their thumbnails will always undersell them.

### Stroll, by overmothered

Token description: "A generative nod to the rubber hose cartoons of the
1920s. Each animated character is composed from a unique set of
characteristics including height, bodily shapes, bodily sizes and walk
tempos. There are three core shapes (circles, squares and octagons) which
can, on occasion, be found in unison. There is also a chance of the
character having the famous 'double-bounce' walk. All animation is created
in code using a combination of math functions, bezier curves, and a simple
IK system for the legs. Please view the live sketch for the full
experience. Controls: Spacebar = Play/Pause, 0 = Toggle Walk Cycle Path,
1 = Download Still Image, 2 = Download Looping Video. Libraries used:
P5.js, CCapture.js & WebM Writer"

Stroll #1, inspected: a circle body with a smaller circle head, thick
black stick legs and white shoe shapes caught mid-stride, framed inside a
bold black octagon on a gray field. It reads instantly as a 1920s cartoon
title card.

Technique: a tiny constraint vocabulary (three shapes) crossed with a
procedural character rig: randomized proportions, a walk-cycle generator
with variable tempo, simple two-bone IK for the legs, bezier-eased limb
motion, and the double-bounce as a rare variant. The octagon frame is one
of the three core shapes doing double duty as the stage, which is the
kind of economy that makes the whole thing feel designed rather than
random.

What sings: the frame choice and the walk cycle, character animation is
rare in generative art and this is genuinely charming. What is overdone:
nothing here; it is the strongest piece of the five.

## Cross-cutting takeaways for the doodles

- Constrain the vocabulary, free the parameters. Stroll's three shapes and
  Harmony Clock's fixed clock form are the same move: one hard constraint
  keeps every output coherent while the random parameters do the varying.
- Animation-first pieces (Endless whisp, Stroll, Harmony Clock) treat the
  still as a frame, not the work. Their thumbnails undersell them by
  design.
- A color-harmony engine beats a hardcoded palette. Harmony Clock's
  "nothing hardcoded except the background" is a reusable pattern for any
  seeded piece.
- The long-form constraint in action: five projects, five different
  answers to "what does one algorithm explore", and the best ones (Stroll,
  Harmony Clock) are the ones where the algorithm's answer is a system,
  not a picture.

## Avoid-list additions

- Stacked ridgeline landscapes are the genre default; only attempt with a
  palette or texture trick that earns it (Hills and Mountains barely
  clears the bar on palette discipline alone).
- Static mandalas need motion or an unusual palette to justify themselves;
  dotted-ring symmetry alone is not enough.
