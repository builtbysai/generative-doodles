# Roman Verostko - Deep Study Notes

**Date:** 2026-09-28 (study pass)
**Artist:** Roman Verostko (1929-2024), Minneapolis. Benedictine monk turned
painter turned plotter artist. Coined the Algorists with Jean-Pierre Hebert
in 1995. SIGGRAPH Distinguished Artist Award 2009, Golden Plotter Award 1994.
**Hop path:** Vera Molnar study (named as her direct inheritor) and Jean
Tinguely / Metamatics study (the pen-plotter pole of the drawing-machine
lineage).
**Depth:** deep on text. Full "Epigenetic Painting: Software as Genotype"
(Leonardo 23:1, 1990) read end to end via the DAM mirror, full artist
statement "Algorithmic Fine Art: Composing A Visual Arts Score" (2000) read
end to end, DAM biography read, Hebert's algorist statement and manifesto
read, Grant Taylor's "Curating the American Algorists" read in the relevant
sections, one real Hodos code excerpt recovered from a UCSB course page.
One artwork visually inspected at full res: Pathway Series, Bird 2 (1990) via
the V&A, page screenshot plus a cropped close view. Three local procedural
re-renders of the Hodos recipe, all visually inspected; the third corrected
against the real artwork.

**Honest gaps:** verostko.com was unreachable in-session from every network
available (browser.open fetch failure, managed live browser got a chrome
error page, the session proxy hung on the host), so his gallery pages and
writings beyond the DAM mirrors were not read, and the site map came from
the search index only. "Epigenetic Art Revisited" (Ars Electronica 2003)
was read only in fragments. His other series (Gaia, Glyph, Scarab,
Apocalypse, Ezekiel, Diamond Lake, Flowers of Learning, Rocktown Scrolls,
the Mergings, the illuminated Turing machine manuscripts) were not visually
inspected. The brinkster text mirror of the Revisited essay is dead (404).
No plotter was driven; the re-renders are PIL stand-ins of the described
recipe, not his code.

## Who he was, in technique terms

Verostko spent the 1960s as a painter working a dialectic of control and
uncontrol: carefully delineated rectangular fields on wood panels, then
intense sessions of spontaneous gestural marks with brushes, crayons, and
pencils, no conscious editing allowed. When he got computer access he did
not change the art concept. He coded it. The rectangles became algorithmic
placement routines with weighted dice; the gestures became scribble routines
rotating randomly within tuned parameters. The throughline of his whole
career is one sentence from the essay: the art concept is the formal system,
and the code is that formal system written arithmetically. Everything else
is execution detail.

His program was called **Hodos**, Greek for path or road, root of "method."
It ran a PC driving a Houston Instruments DMP 52 with 14 pen stalls in two
banks of 7 (later 8-pen machines). The program kept rules about which pen
stall to draw from; the artist could alter the defaults at startup. Works
ran thousands of lines with software-controlled pen changes. Inks were
permanent, mixed for refillable cartridges, arranged on the plotter in a
classical warm-to-cool palette. Technical pens from size 2 to 000. Rag paper
with moderate tooth. Standard frame 21.5 by 32 inches on 24 by 36 paper, two
frames lengthwise making a six-foot work.

The piece of his practice that matters most for the doodles work: **in 1987
he mounted oriental brushes on the plotter's drawing arm.** He designed
sleeves to hold Chinese brushes in the pen carriage and wrote interactive
brush routines. At first it felt clumsy and pointless, his own words, but
trial and error with mounts, software, inks, and paper opened what he called
a vast untapped potential. The software knows exactly where a stroke begins
and ends, remembers the stroke, and can improvise with the same stroke at
other scales without failure. In 1995 self-inking Sumi brushes made
continuous brush scripting possible. He was the first to do this.

## Core techniques, as stealable recipes

**The genotype/phenotype split.** He borrowed "epigenesis" from biology in
1987 after a year of searching for the right term. The software is the
genotype, the artwork the phenotype, the plotting the epigenesis. The
practical upshot: write one form generator, grow a family. He reports over
40 works generated with the same code for one show, each one of a kind, all
familially related. The series names in the statement read as genotype
lineages: Pathway, Gaia, Glyph, Scarab, Apocalypse, Ezekiel. For a seeded
piece practice this is the doctrine: the seed is not the artwork, the
generator is, and the family resemblance across outputs is the quality bar.

**Control and uncontrol as two coded registers.** The rectangles are control:
fixed parameters, random selection within them, opposing hues kept near
neutral for "precarious balance," spacing rules relative to the whole field.
The gestures are uncontrol: weighted dice for start points (he gives the
recipe in plain English as "tossing dice weighted for not more than a 25%
deviation from the center of a preferred region"), rotation randomized
within parameters set by experience. The artist reviews scores of outputs
and adjusts the routine. The feedback loop is the art-making. Note the
discipline: the uncontrol is never uniform. It is always dice inside
parameters, tuned by looking.

**Distributions keyed to one set of control points.** From the essay's
figure captions: each pen stroke generated from a single set of control
points, distributions keyed to the same set, "yielding a self-similarity
that permeates the whole." This is the technique the re-render confirmed.
One curl vocabulary, one master path, 2400 marks all derived from it, and
the field coheres into a family instead of a mess. The unit of authorship is
the vocabulary, not the mark.

**Physical glazing through layered lines.** He lists four reasons the
plotter beat the monitor, and the third is the stealable one: the plotter
builds color tones through multiple layers of lines, a physical overlapping
that glazes the inks, "a strong visual effect which cannot be achieved by
the single layer of pixels in raster graphics." In code terms: draw the same
hue family over itself with low alpha and let the accumulation, not the
pixel blend, carry the tone. The re-render's second pass confirmed how much
density this takes: the first 700-line pass looked anemic; 1500 lines at
higher alpha started to read as woven tone.

**Scalar reuse of a master gesture.** The software remembers a brush stroke
and re-improvises it at other scales. The V&A's Pathway Bird 2 shows the
compositional payoff: one large black brush ribbon arcs over a cloud of
thousands of tiny curls, and the ribbon is the same gesture family as the
curls, scaled up. Big and small are the same drawing. He also paired a
full-size brush stroke with a scaled-down pen version of the same data as a
study figure. The compositional rule: the hero mark and the field texture
share one gesture. Never invent a separate hero.

**The burst, not the band.** The visual inspection corrected my first
re-render. Bird 2's uncontrol field is centrifugal: a burst of short curly
hair-lines radiating from a weighted center, densest in the middle,
splaying outward, in warm ochres, rusts, greyed teals, and mauves. The
control accents are three small solid saturated bars (chartreuse,
orange, slate blue) tilted at the periphery, plus a small red seal-like
mark. The composition is: dense warm burst at center, one black ribbon over
it, color bars holding the edges. My pass-3 re-render with a gaussian
burst center, radial-plus-curl jitter, and one shared curl template lands
visibly in the family. The lesson: derive the field shape from looking at
the actual work, not from the prose description. The essay describes
"pathways"; the 1990 work is a burst.

**Software as score, hardware as instrument.** His central metaphor: the
code is a musical score, the plotter the instrument. He reviewed code
behavior through crude monitor simulations first, then committed to the
plotter, because pixels had "only a token relationship to paintings." The
workflow for a physical practice: simulate cheap, execute on the real
medium, and treat the medium's properties (tooth, ink, speed) as part of
the instrument. He is explicit that studio virtuosity with pens, inks,
papers, and plotting speeds changes the finished quality, and by the late
90s he was intervening mid-plot rather than letting it run unattended.
"My personal expert system has become a companion with which I improvise."

**The real code is elementary.** The recovered Hodos excerpt is plain
BASIC with DMPL plotter commands: pick a radius and angle by INT(RND*...),
compute control-point coordinates with COS/SIN, chain the points. No
frameworks, no libraries, just arithmetic for "the very nature of the
drawing process." His quote: "you learn a lot about how to draw by writing
drawing code and you can learn a lot about how to write drawing code, by
drawing." And: he considers the code for every single line, so each plotted
mark is an artwork in itself. The avoid-list corollary: a generative piece
with 50 dependencies has 50 authors. His had one.

**The Algorist manifesto is code.** Hebert wrote it in 1995 after SIGGRAPH
LA, and it reads as a filter function: if you create an object of art with
an algorithm and the algorithm is your own, you are an algorist, else not.
The group named themselves to separate from the new wave of artists using
off-the-shelf paint programs and GUIs. The boundary that mattered was
authorship of the procedure. That boundary is still the useful one.

**Titles are arbitrary, assigned after the fact.** "None of the works are
made with intentional representations in mind... Titles are therefore
arbitrary and often derived from evocative qualities associated with the
work." Name the family, not the picture. The doodles practice already does
this; keep it.

## What makes it sing

The line quality at 1000 increments to the inch, which he says can match the
nuances of gentle hand or arm movement. The warmth of the ink palette
against rag paper. The moment in Bird 2 where the single black ribbon
confirms that the thousands of tiny curls were one gesture all along.
And the discipline of the two registers: the control bars are few, small,
and saturated; the uncontrol is total but bounded by weighted dice. Molnar
budgeted disorder at 1 to 2 percent. Verostko's version: total freedom
inside tuned parameters, and the tuning is done by looking at scores of
outputs.

## Overdone, per this study (avoid-list additions)

- Raster-blend fakery for layered tone. If you want glazing, layer actual
  strokes; a multiply blend mode over one pass is not the same mechanic and
  it reads flat.
- Uniform random scatter labeled as gesture. His uncontrol is always a
  distribution with a center and a weight. Scatter without a center is not
  his technique, it is the absence of technique.
- Hero marks in a different visual language from the field. If the big
  stroke and the small strokes are not the same gesture, the piece splits
  in two.
- Calling the output the artwork. His doctrine, stated flatly in the UCSB
  writeup of his work: the coded procedures are the true art form, not the
  generated image. Judge the generator, curate the family.

## The work visually inspected

**Pathway Series, Bird 2, 1990** (V&A E.943-2008, multi-pen plotter drawing
with brush, 28 by 21.8 cm). Full page screenshot plus a cropped close
view. What the pixels show: a centrifugal burst of thousands of short
curly hair-lines in warm ochre, rust, greyed teal, and mauve, densest at a
center left of middle, splaying outward with fine flyaway ends; one bold
black brush ribbon with rounded turns arcing across the cloud, painted over
it; three small solid bars at the periphery (chartreuse upper left, orange
right, slate blue lower right), each tilted; a small red seal-like square
at the cloud's lower left; pencil signature "Roman 90" lower right. The
brush stroke uses visibly the same curl vocabulary as the tiny lines. The
paper is warm white. The whole piece is control/uncontrol in one glance:
the burst is free, the bars and the ribbon's placement are decided.

## Local re-renders

Three passes in Python/PIL, seeded, all visually inspected. Evidence in
hidden_files/study-2026-09-28-verostko/.

- **Pass 1** (verostko_study.py): one 12-point master path, 700 lines keyed
  to it with perpendicular noise, pen-grouped drawing (all lines of one
  pen before the pen change), three large control rectangles, one brush
  stroke plus a scaled pen echo. Confirmed the self-similarity mechanic but
  read anemic: too pale, rectangles too large, field too band-like.
- **Pass 2**: 1500 lines, higher alpha, fixed brush pressure profile
  (attack near t=0, long taper, dry drag-off). The woven glazed tone
  appeared. Density finding: layered-line tone needs roughly 3 to 4 times
  the line count a first guess suggests.
- **Pass 3** (verostko_study3.py): rebuilt from the Bird 2 pixels.
  Gaussian burst center, 2400 short curls from one 40-template curl
  vocabulary, radial-plus-jitter placement, pen-grouped, small tilted
  peripheral bars, black ribbon over the cloud, red seal mark. Visibly in
  the family of the original. This pass is the keeper for the technique:
  weighted center plus one curl vocabulary plus scalar hero gesture.

## Doors onward

- **Jean-Pierre Hebert**: co-founder of the Algorists, sand tables
  (Sisyphus), the 1998 Saint Thomas mural collaboration where Hebert's sand
  plotter traced Verostko's master brush stroke. The collaboration door:
  two machines, one gesture.
- **Manfred Mohr and Mark Wilson**: the other American Algorists in
  Taylor's exhibition. Mohr's cube work is the systematic pole to
  Verostko's gestural pole.
- **Hans Dehlinger**: the fifth algorist named in Verostko's statement.
  Under-studied everywhere; a genuine gap in the literature.
- **The illuminated manuscripts**: his series of code-generated digital
  scripts with gold and silver leaf applied by hand, plus the Manchester
  Illuminated Universal Turing Machine. Code plus hand illumination is a
  whole unexplored compositional register.
- **The Mergings (2009+)**: plotter first session, his own hand second
  session, on the same sheet, hunting for formal continuity between mind
  guiding machine and mind guiding hand. The Molnar "Lettres de ma mere"
  collision, twenty years later, from the plotter side.
