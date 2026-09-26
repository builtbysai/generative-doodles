# Harold Cohen / AARON: Study Notes

**Date:** 2026-09-26
**Artist:** Harold Cohen (1928-2016), British painter; Slade School of
Fine Art, represented Great Britain at the Venice Biennale, Documenta 3,
the Paris Biennale. Moved to UC San Diego in 1968, taught himself to
program by 1971, and spent 1972-2016 building AARON, a rule-based
program that draws and paints autonomously. No training data, no
learned model: forty years of hand-written rules.
**Doorway:** hop backward from the Patrick Tresset study, up the
drawing-machine lineage to its root. Chung's robots gesture from a
memory bank; Tresset's draw from perception; Cohen's draw from a
programmed knowledge of how drawing itself works.

**Depth: deep with one honest gap.** Sources read end to end: Paul
Cohen's AAAI memoriam "Harold Cohen and AARON" (the full 4-page paper,
with its four figures); Cohen's own online publications index and all
the quoted passages for "What is an Image" (1979), "How to Make a
Drawing" (1982), "How to Draw Three People in a Botanical Garden"
(1988), "The Further Exploits of AARON, Painter" (1994), "Colouring
Without Seeing" (1999), the 2006-2010 talks on color and autonomy;
the Whitney 2024 exhibition page; the Art Newspaper on the Whitney and
Gazelli shows; the Outland review; the Wiggins AARON essay; the
Najmeddin/Moghanipour paper. Three artworks visually inspected at full
res: the 1983 signed turtle plotter drawing (bre.art collection,
1600x1210), the 2021 AARON-for-KCat figurative still, and the 1995
Boston Computer Museum painting-machine photo (the machine mid-painting,
plus two finished works on the wall). The motif vocabulary re-rendered
locally in Python and visually inspected. The gap: Cohen's full paper
PDFs sit behind a bot check on aaronshome.com, so "How to Draw Three
People" was worked from long verbatim excerpts surfaced in search plus
the memoriam and secondary coverage, not a page-by-page read. Noted,
not glossed.

## The core idea, in Cohen's own framing

Cohen's lifelong question: "What are the minimum conditions under
which a set of marks functions as an image?" and its practical twin:
"What makes an image evocative?" He concluded that intentionality is
felt in the marks themselves: open and closed shapes, implied figure
and ground, lines that look drawn by hand rather than like Bezier
curves. AARON was his attempt to program the cognitive primitives of
a painter, not to simulate creativity in general but to encode his own
specific judgment about where a line should go.

The architecture is hierarchical. High levels make decisions that
constrain what lower levels can do. The drawing is not a scene rendered
from a model; it is a plan executed downward.

## The drawing pipeline, stage by stage

**1. Planning on a cell matrix.** AARON maintains an internal
representation of the drawing as a coarse matrix of cells, onto which
it maps both lines and enclosed spaces. Composition happens here:
where things go, what regions are taken. The rule set includes hard
constraints like "no closed shape may overlap another closed shape"
and "never cross two lines." The 1983 drawing shows the result
directly: clusters of marks sit in separate regions with real white
space between them. Nothing touches.

**2. The conceptual core (figuration).** To draw a figure, AARON starts
from conceptual tokens ("hand", "pointing", "large", "some") and moves
to a specific, plausible instantiation. It first builds what Cohen
calls the conceptual core, functionally like a young child's scribble:
a skeleton of axes and masses. Example from the paper: the single line
representing the hip-to-hip axis of a schematic figure is expanded into
a diagrammatic pelvis. Arcs associated with musculature and skeletal
features guarantee the figure has sufficient bulk from whatever
posture and viewpoint. The core is then recorded as a mass of marked
cells on the planning matrix.

**3. Embodying.** Around each part of the core, closest-first, AARON
generates a path that develops the outline. The feedback parameter is
the distance of the path from the core mass, and it carries the
"carefulness" of the element. A thigh is drawn loosely: far from the
core, low sampling rate. A hand is drawn tightly: close to the core,
high sampling rate. Sampling rate and correction also scale with the
element's size relative to the whole image. This is why AARON's figures
have that particular quality: big masses rendered in broad, slightly
wayward sweeps, small features in fussier, tighter linework. The hand
knows what it is drawing.

**4. The freehand line.** The lowest level is what Cohen called the
freehand line algorithm. Every drawn stroke is a multitude of short
straight line segments, each steered toward its target with lateral
wobble and corrective feedback, like a servo that overshoots and
recovers. At 100% zoom on the 1983 drawing the tremor is unmistakable:
corners overshoot, long runs drift then correct, closed shapes don't
quite meet. This single trick does more for the "evocative" quality
than anything above it. The whole program could draw perfect geometry
and nobody would read intention in it; the jitter is where the hand
lives. It is the direct ancestor, spiritually, of every "hand-drawn
look" algorithm since.

**5. Plants from morphology.** AARON's plants are not drawn from models
either. Cohen coded morphological knowledge: branches get thinner as
they get longer, growth rules for how foliage fills. The
representational knowledge (how a person is built, how a plant grows)
stays separate from the representational strategy (how to turn
knowledge into marks). That separation is the program's real
architecture: sparse domain knowledge in, rich marks out.

## Color, the hard problem

Color nearly broke the project. For twenty years AARON drew in black
and white and Cohen colored by hand (fabric dye, Procion), or scaled
the drawings into murals. Teaching the program color meant replacing a
growing rule base that kept breaking whenever one part was touched.
The breakthrough was embarrassingly simple, in Cohen's telling: match
the brightness (luminance) of randomly generated hues to get color
harmony. In 2006 he threw out the whole color expert system and replaced
it with an algorithm a novice could have written in a couple of hours,
once someone knew what to write. The KCat still shows the mature
vocabulary: flat saturated masses (red ground, blue shirt, green
shorts), heavy black outlines, washes that deliberately spill past the
line. The 1995 painting-machine photo shows the division of labor: ink
line first, robotic dye fill after, mixing its own colors from 17 dyes.

## The machines

Cohen was a skilled engineer and built his own output devices: the
early turtle (retired because it was "too friendly" and stole the
show), flatbed plotters, and the 1995 painting machine: an XY gantry
with a brush effector, a paint cup on the beam, dye bottles along the
side. Tsukuba, 1984: AARON ran unattended for six months on another
continent from Cohen and produced over 7,000 unique drawings.

## What makes it sing

The sparseness. The 1983 drawing is mostly paper. Each motif cluster
is allowed to exist alone, and the white space does the composing.
The line has genuine nervousness without ever reading as noise; the
feedback keeps every stroke pointed at its target, so the tremor reads
as effort, not randomness. And the whole thing is a system where
knowledge is thin and procedure is rich: a few hundred anatomical rules
and a path-walker produce a lifetime of distinct drawings. Nobody has
to tell it what a hand looks like beyond distances between landmarks.

## What is overdone (avoid list)

- The figurative-phase faces. Once AARON learned anatomy its people
  turned into stiff 1960s-comic mannequins; the angular blasé faces of
  the late 80s/90s are the program's most dated look. The early
  petroglyph drawings and the late minimalist plant abstractions age
  far better than the people.
- Explaining the mechanism as the content. Cohen himself worried the
  spectacle of the machine detracted from the art. The program is
  interesting; the drawings have to stand without it.
- Closed-shape non-overlap as a visible tic. In weaker AARON drawings
  the motifs look like stickers placed on a page, never touching,
  which reads as timidity. The constraint should organize, not
  quarantine.

## Seeds for pieces

139. **Careful Hand** : the embodying-stage mechanic, derived not
    copied. A figure builder where every limb is first a skeleton
    segment, then an outline drawn at an offset distance set by the
    part's "carefulness" budget: thighs at wide offset with sparse
    sampling, hands at tight offset with dense sampling. Success: a
    viewer can read which parts the program "cares about" from the
    linework alone, and turning all parts to one carefulness
    collapses the drawing into mush.
140. **Cell Matrix** : planning as the art. The composition is decided
    entirely on a coarse grid before any mark is made: motif regions
    claimed like territory, hard no-overlap rules, then the marks
    execute the plan. The piece shows the grid and the drawing side
    by side. Success: the drawing looks composed rather than
    scattered, and the grid alone reads as an interesting artifact.
141. **Servo Line** : the freehand-line algorithm as the whole piece.
    Every stroke the program ever draws is short straight segments
    with lateral wobble and corrective steering, and the piece is a
    study of that one mechanic across geometries: circles, grids,
    letterforms, all in the same tremulous hand. Success: at full
    zoom every curve visibly resolves into segments; at arm's length
    it reads as hand-drawn.

Evidence: goals/generative-doodles-site/hidden_files/study-2026-09-26-aaron/
(rerender.png, the three source images, rerender.py)
