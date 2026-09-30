# Frieder Nake / Georg Nees / the Stuttgart circle - Deep Study Notes

**Date:** 2026-09-30 (study pass)
**Artists:** Frieder Nake (born 1938, Stuttgart; math student, then
Rechenzentrum programmer, ER56/Z64, ALGOL/Fortran), Georg Nees (1926
to 2016, Nuremberg/Erlangen; Siemens industry mathematician, ALGOL,
Zuse Graphomat Z64; first PhD in computer art, under Max Bense,
defended 1968, published 1969), around Max Bense's information
aesthetics at the Technische Hochschule Stuttgart.
**Hop path:** the German half of the 1965 circuit, named as a next
doorway by the A. Michael Noll study the same morning. Noll named
Nees and Nake himself in the Le Random interview; the three are the
"3N" (Nake, Nees, Noll), and their 1965 shows bookend the year:
Nees in Stuttgart in February, Noll and Julesz in New York in April,
Nake and Nees together in Stuttgart in November.
**Depth:** deep. Nake's own account in Mario Verdicchio's "The Role
of Computers in Visual Art" (HaPoC 2015, HAL) read end to end. Nake's
full Digital Art Museum interview with Bettina Munk (Lines Fiction)
read end to end. The DADA Database of Digital Art entries for the
February 1965 Nees show, the November 1965 Nake/Nees show, and Nake's
13/9/65 Nr. 2 read end to end. Wikipedia's Nees entry read end to end.
Blogger zellyn's June 2024 reconstruction of the original Schotter
ALGOL-60 listing read end to end (the recipe itself, from a 2016
German presentation). Media Art Net's Schotter page read end to end.
Two artworks visually inspected at full res: Nees's Schotter (the
V&A-era circulating reproduction, 693x1080, clean vector edges),
Nake's 13/9/65 Nr. 2 "Hommage a Paul Klee" (DADA scan, 387x400; small
but legible down to the buckling lines and the auto-plotted
NAKE/ER56/Z64 signature). Two local procedural re-renders built and
visually inspected: Schotter from the verbatim recipe, and a Hommage
reconstruction from Nake's PI-21 random-element list.

**Honest gaps:** the original ALGOL/Fortran sources were read only
through transcriptions and reconstructions, not from Nees's or Nake's
own printouts. The RNG in my Schotter re-render is Python's random,
not Nees's G2/G3 library generator, so exact layouts cannot match.
Kreisbogengewirre (Locken) read about through Nake's quoted account,
not seen as a print. Bense's "Projekte generativer Aesthetik"
(rot 19) read about, not in full. The blue-pencil censorship anecdote
about the rot 19 proofs could not be verified in-session and is left
out entirely. No plotter output run; re-renders are PIL, not ink.

---

## The February show

February 5, 1965, Hahn building, Stuttgart. Ten to twelve small
graphics by Georg Nees on the walls of Bense's Studiengalerie. Two
months before Howard Wise opens in New York. Nake stresses, in the
DAM interview, that it was not even an official exhibition: it
happened in the gallery's rooms, open to the public, but without the
institutions' blessing. The university rented two floors of a private
building for philosophy and literature; Bense ran his Aesthetisches
Colloquium there; concrete art, text, typography. Algorithmic
drawings were, in DADA's phrase, "the most natural and consequential
continuation of what Bense's radical rationalism called for."

For the opening, Bense and Elisabeth Walther published rot 19,
*computer-grafik*: a few of Nees's drawings plus short precise
pseudocode, and Bense's "Projekte generativer Aesthetik," which Nake
later called the manifesto of algorithmic art. At the opening, an
artist-professor from the Stuttgart academy asked Nees whether he
could make his computer draw in the man's own manner, his Duktus.
Nees paused, then: yes, of course, under one condition, you must
tell me how you draw. The irritation that followed pushed Bense to
coin, on the spot, the phrase "artificial art."

Nees's temptation story is the cleanest origin statement in early
computer art. In 1963 he got Siemens to buy a Zuse Graphomat Z64
flatbed plotter for the data center. He wrote ALGOL graphics
libraries G1, G2, G3 for it. And then, in his own words at the 2006
ZKM show: "There it was, the great temptation for me, for once not
to represent something technical with this machine but rather
something 'useless', geometrical patterns." Useless on purpose. The
plotter was built for technical drawings; Nees was the first to ask
it to draw something that meant nothing and was everything.

## Schotter, the recipe

Schotter ("Gravel", 1968) is the famous one, and thanks to zellyn's
digging we have something close to the actual generator. The ALGOL
program is two procedures. QUAD draws one square. SERIE calls it
across a grid: SERIE(10.0, 10.0, 22, 12, QUAD), so 22 columns by
12 rows, 264 squares, each in a 10 by 10 cell. A global counter I
runs 0 to 263 and steers the disorder:

- position jitter: uniform in plus or minus 5 times I/264. Zero at
  the first square, half a cell at the last.
- angle jitter: uniform between PI/4 times (1 minus I/264) and PI/4
  times (1 plus I/264). At I=0 the angle is exactly PI/4, no
  randomness at all. At I=263 it spans 0 to PI/2, fully random.

The square itself is drawn from its four corners on a circle of
radius 5 times sqrt(2), so at I=0 the corners land exactly on the
cell corners. And then the plotter quirk that explains the portrait
orientation: LEER and LINE plot (y, x), swapping the axes, so the
22-long column axis runs vertically. Top row: perfect tessellation.
Bottom row: gravel.

My re-render from this recipe reads exactly like the original:
a clean grid dissolving, in a straight vertical gradient, into
tumbled stones. The key finding from building it: the disorder is
not applied to the squares, it is applied to the grid. One square
does not know about its neighbors; there is no interaction, no
accumulation model. The order-to-chaos reading is purely a function
of the single global counter I. That is the whole trick, and it is
why the piece is so economical. Nees's own comment on the mechanism:
the successively increasing variation of P, Q, and PSI is controlled
by the counter index I, invoked by each call of QUAD.

Why it sings: the gradient is the composition. Anyone can scatter
squares; Nees parameterizes the *amount* of scatter and walks it.
The top of the piece teaches you how to read the bottom. Also the
top row is not quite mechanical-looking, because plotter lines have
a hand in them, and the bottom is not quite noise, because the
cell grid still ghosts through. The piece lives in that middle band,
roughly rows 8 to 15, where the squares are drunk but still
standing.

## The error that became Locken

Nees's 1965 Kreisbogengewirre ("Arc confusion", also called Locken,
"curls") is, per Nake's account quoted on Wikipedia, one continuous
path of arcs whose lengths and radii were randomly chosen within
programmer-set limits, and "the picture in its present form is due
to a fairly serious programming error. It was designed to be less
complex and it had to be ended manually because of the error."
The error was kept. It was kept because it was better. This is the
1965 version of the lesson every generative artist re-learns: the
bug is not the enemy of the program, it is the program's way of
telling you what it wanted to be.

## Nake's polygons and his distributions

Nake started on the ER56 mainframe in 1963, machine language first,
later ALGOL 60 on the Telefunken TR4, then Fortran IV and PL/I on
the IBM 360. The early series have date-stamp titles: 25/2/65,
13/9/65. The Zufalliger Polygonzug (random polygon walk) pieces,
Geradenscharen (line bundles), Rechteckschraffuren (rectangle
hatchings). His own description of the random machinery, quoted in
the research literature: he used uniform, exponential, Gaussian,
Poisson, and arbitrary discrete distributions to control the myriads
of random decisions, and as a further source of variability he used
several different uniform generators, so the program first had to
decide which distribution and which generator to use. The system
clock seeded everything at startup.

That is the palette doctrine: a random number is not one thing.
The choice of distribution is a compositional choice, the way a
painter chooses between a flat brush and a round one. Uniform gives
jitter. Gaussian gives clustering with rare excursions. Exponential
gives decay. The macro-aesthetics (the overall geometry) plus the
set of probability distributions plus mediating random numbers:
that triad, in the Media Art Net formulation, is the whole Stuttgart
theory of a picture.

Nake's Nietzsche quote, the one he uses to explain why the three
N's independently produced such similar-looking broken-line
polygons: Nietzsche wrote to his secretary in 1882 about a
typewriter with only uppercase letters that "our writing instrument
attends to our thought." The 1960s computer could little more than
trace segments between two points. Anybody with artistic ambitions
and that instrument, Nake says, would have arrived at results like
his Random Polygons No. 20. The tool is the style's co-author.

## 13/9/65 Nr. 2, the Hommage

Nake's most cited early work, after Klee's Hauptweg und Nebenwege
(1929). His PI-21 (Programm-Information, page 10) lists the random
elements, and it reads like a score:

1. the widths of the horizontal bands at the left boundary
2. the buckling of the bands left to right, never intersecting
3. per quadrilateral: empty, vertical-line fill, or triangle fill
4. the number of signs per quad
5. the positions of the signs
6. the number of circles
7. the position of each circle
8. the radius of each circle

Looking at the DADA scan: roughly nine horizontal bands, their
edges bending gently from vertex to vertex, quads delineated by
verticals at irregular x positions. Some quads are empty. Some
carry tight vertical hatching. Some carry clusters of triangle
scribbles. Circles float over everything, about seven of them,
various sizes, the way Klee's painting has none. The signature at
lower left is plotted by the machine itself: NAKE/ER56/Z64.

The DADA entry corrects a long-standing misprint: many books,
including Nake's own 1974 book, titled it after Klee's painting,
"Haupt- und Nebenwege." Wrong on both counts, since Klee's title
means one main road and several side roads. Nake fixed it in his
own publications from 2001 on. Forty years to correct a caption,
and he did it.

My reconstruction from the PI-21 list reads correctly in
character: buckling bands, quad fills, circles. What the exercise
taught: the piece is a hierarchy of decisions, not a texture. The
band edges are drawn once, shared between adjacent bands. The
verticals divide. The fills decorate. The circles ignore all of it.
Four independent layers, one picture. That layering is why it does
not dissolve into hatch soup: the emptiness of the empty quads is
doing as much work as the scribbles.

## The selection doctrine

From the DAM interview, the passage that matters most for anyone
making generative work today. Munk asks about editions: a hundred
prints, a silkscreen edition of 40, the famous 13/9/65 Nr. 2. Was
there a predetermined limit? Nake: "No, never. I write a program.
I decide on its completion. I let it run, once or many times. I
choose the images that I like, and of which I keep one copy."
People liked 13/9/65 Nr. 2, so he had the punched tape redraw it,
"a doubling of the original," three hours on the plotter, sold
cheap. Twenty or thirty such runs, then the silkscreen edition.

And the harder line, the one he will not soften: "A computer leaves
nothing to chance. Never ever. For the computer is the machine of
computability. Period. Everything on the computer is computed, even
what we call 'chance.' To talk about chance on the computer is
pretty much nonsense! Instead, we should talk about
'pseudo-chance.' That is a kind of chance pretending to be
chance."

Then the philosophical frame he built around it: the algorithmic
image exists in the form of a double. There is the surface, what we
see, and the subface, the computable part that exists for the
software. "Think the image, don't make it": to think an image is to
think the infinity of all images the algorithm can generate. The
single image is only a representative of its class. "The program is
the operational description of the work... the operational
description of an infinite number of images. That was a
revolution."

The practical upshot, stated plainly: the program generates the
class, the artist curates the instance. Every edition of 150 unique
plots, which Nake actually did with 25/2/65, is the selection
doctrine made literal: run the class, keep the ones that sing.

## What makes it sing, what is overdone

Sing: the single-counter gradient (Schotter's I). The distribution
as brush (Nake's palette of uniform/Gaussian/exponential/Poisson).
The layered independence (Hommage's bands, fills, circles not
knowing about each other). The kept error (Locken). The machine
signature (NAKE/ER56/Z64, authorship stamped by the instrument
itself). The economy: Schotter's entire program fits in twenty
lines of ALGOL, and the idea fits in one sentence.

Overdone (avoid-list): randomness as decoration rather than
structure. The three N's all warn, in their own ways, that random
numbers are the easiest thing to add and the hardest thing to mean.
A jittered grid with no gradient, no distribution choice, and no
selection is not Schotter, it is wallpaper. Nake's complaint about
nonsense talk around computers and art applies: if the random
element could be swapped for any other random element without
changing the piece, the piece is not using randomness, it is
wearing it.

---

## Technique seeds for future pieces

See FUTURE_PIECES.md, seeds 271-273: Disorder Ledger, Distribution
Palette, The Kept Error.
