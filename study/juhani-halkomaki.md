# Juhani Halkomäki: Study Notes

**Site:** juhani.halkomaki.com ("A creative coding scrapbook") | **Profile:** x.com/JuhaniHalkomaki | **OpenProcessing:** openprocessing.org/user/208584 | **Instagram:** instagram.com/juhani.halkomaki | **Bluesky:** bsky.app/profile/juhani.halkomaki.com

**Depth:** deep. Four artworks visually inspected at full resolution: the
single-continuous-line self portrait (from his homepage via the screenshot
rig), and Kratta #3, Untitled #14, and Sun Scribble (high-res images from the
STIRworld profile, downloaded and viewed directly). His tweets about the
spring-line technique were read via a TwStalker mirror, and the STIRworld
interview (May 2023) was read in full. Not reached: the X profile itself
(login-walled), his OpenProcessing profile page (fetch failed, needs revisit),
his YouTube process video ("Untitled", 2022, I7pnzu6Ngt4). No GitHub account
found under his handle.

## Who he is

A Helsinki-based digital artist, born in Southern Finland. He started as a
kid writing QBasic programs that drew moving circles and rectangles, studied
Media Engineering, then worked as a front-end web developer until a colleague
suggested he apply to the New Media program at Aalto University in 2017. That
is where the art practice started properly. Day job is still web development;
the generative work is a side practice and a way to unwind. He has shown in
pop-up exhibitions in Japan arranged by 3XHIBITION. He cites Aleksandra Jovanic,
Kwame Bruce Busia, Melissa Wiederrecht, Erik Swahn, and Zach Lieberman as
inspirations.

His stated process is a feedback loop: start with a simple question like "how
could I make something that looks like Japanese sand raking" or "how could I
mimic that real-world phenomenon", code it, get surprised by the output, and
layer the ideas that work. For color, he is honest that he is not good at it:
black and white is the easiest choice, muted colors second. When a piece needs
a wider palette he generates random color combinations, renders a huge batch
of test versions, and keeps the best-looking ones as palettes.

## Core techniques

Everything he makes is line work. The mark is the whole practice, and the
techniques are constraint games around how a line can carry an image.

### Density-modulated single-line drawing (Self portrait, 2024)

One continuous black line on white draws a full tonal portrait. Dark areas are
dense overlapping loops of scribble, light areas are sparse long curves, and
the line never lifts. What is visible in the pixels is a wandering line whose
loop-back density tracks image brightness: hair and shadow are tight nests of
overlapping strokes, skin is open wandering curves. It reads like a
pen-plotter stipple piece done with scribble density instead of dots. The
algorithm was not published, but the visible behavior is consistent with a
walker steered by the source image's brightness gradient, spending more
pen-time (tighter loops) where the image is dark. Treat that as an inference,
not a confirmed implementation.

### Contour extraction from a noise height field (Kratta series, 2022)

Kratta #3 is white contour lines on a flat ochre ground, looking exactly like
raked sand in a zen garden or rippled wood grain. The lines are smooth closed
and open curves that follow a height field, the classic marching-squares
contour output from Perlin/simplex noise. The signature detail: lines break
into dashed and dotted segments where contours would crowd or cross, giving it
a raked, hand-made feel instead of a clean topographic map. The question behind
it was literally "how could I make something that looks like Japanese sand
raking".

### Perspective-warped line fields (Untitled #14, 2022)

Black on white again, this time a corridor or tunnel rendered purely with line
density. Hundreds of near-parallel lines converge toward a bright opening at
center-right; line spacing and wobble follow a radial perspective field, and
the tonal shading of the tunnel walls emerges from line crowding and slight
moiré interference. It is the same density-shading idea as the portrait but
geometric: the "image" being drawn is a perspective transform, and lines
displaced by it produce the 3D read for free.

### Asemic-writing gradients (Sun Scribble, 2022)

A sunset over the ocean built entirely from tiny unreadable scribble marks,
like fragments of handwriting. Each mark is a small wiggly glyph, and its
color is sampled from a sunset gradient: deep indigo and violet sky at top,
magenta and pink at the horizon, orange and yellow sun disc, dark blue ocean
below with a golden reflection path under the sun. Density modulates too,
sparser at the edges. The piece started as an asemic writing algorithm; the
gradient came from playing with line heights and densities, and the blue made
him think of the ocean, so he aimed the piece at a sunset. Color carries the
image, the marks carry the texture.

### Spring-relaxed lines (from his own tweets)

He describes his line smoothing directly: lines are made of points connected
by springs, each point connected to five neighboring points, and the springs
try to keep their rest length, which straightens curves. It is a physical
relaxation applied to generated polylines. He also replied to a rope-physics
thread saying he would like to move the physics to the GPU when he has the
energy. So the pipeline is: generate noisy polyline, relax with a spring
network, then render. That explains why his lines look hand-drawn rather than
mathematically crisp.

## Palette and composition

Default mode is black line on white paper, or white line on one flat muted
ground (the Kratta ochre). He says so himself: black and white is the easiest
choice for him. Sun Scribble is the colorful outlier and it works because the
palette is doing narrative work, a sunset needs its gradient, and because he
curated it from a big batch of test renders. Compositions are portrait-format,
full-bleed fields of marks with no frames or borders, usually one dominant
read (a face, a tunnel, a sunset, a raked field). Negative space does a lot of
the work: the self portrait lets the white paper be the light.

## What makes it sing

The work is fully coded but reads as expressionistic and hand-made, Van Gogh
is the comparison the STIRworld piece reaches for, and it is fair. The secret
is that every piece starts from a physical question (raking sand, scribbling
like writing, a corridor of lines) rather than from an algorithm, so the
output keeps a physical metaphor instead of looking like a math demo. The
spring relaxation is the quiet technical move underneath it all: slightly
imperfect, slightly hand-wobbly lines.

## What to steal / avoid-list

Steal:
- The constraint-game framing: one continuous line, marks sampled from an
  image's color, lines relaxed by springs. Pick one physical metaphor per
  piece and let it drive the algorithm.
- Density as shading: scribble-loop density for tone is a fresh alternative
  to dot stipple and reads beautifully at large sizes.
- Breaking contour lines into dashes where they crowd (the Kratta trick),
  which turns a sterile topographic look into something raked and tactile.
- The palette workflow when color is needed: batch-render many random
  combinations and keep the winners, instead of agonizing over one palette
  up front.
- Spring-relaxation of generated polylines (each point tied to N neighbors)
  as a general-purpose "make it look hand-drawn" pass.

Avoid:
- Straight noise flow fields with uniform stroke: the generic hairball look.
  His lines always serve an image (a face, a tunnel, a sunset); the field is
  the means, not the subject.
- His comfort zone is also his trap: endless black-on-white line pieces would
  blur together. He knows this and says he wants a more recognizable style.
  For our work, when the palette is muted, make the mark itself do something
  new.
- Do not copy the asemic-scribble sunset directly; that piece is his, and the
  technique is now his signature. Use the gradient-sampling idea on a
  different subject.
