# Zdenek Sykora: Study Notes

**Profile:** Zdenek Sykora (1920 to 2011), Czech painter from Louny, one of
the first artists anywhere to use a computer in the preparation of
paintings. Trained as a teacher of art and descriptive geometry (Charles
University, Prague; docent of painting 1966 to 1980). Painted landscapes of
the Central Bohemian Highlands through the 1940s and 50s, then geometric
abstraction. Co-founder of the Krizovatka group (1963). First Structure,
Seda struktura (Grey Structure), 1963. From 1964, programmed Structures in
collaboration with the mathematician Jaroslav Blazek on an LPG-30 computer.
From July 1973, the Line paintings, which he made until his death. Banned
from exhibiting in Czechoslovakia 1970 to 1988. Documenta participant.
Knight of the French Order of Arts and Letters (2003), Herbert Boeckl Prize
(2005). His wife Lenka became his collaborator from their marriage in 1983.
Died in Louny, 12 July 2011, aged 91.

**Depth:** deep. Read end to end: the Karlovy Vary gallery text on Linie 97
(Czech and English, the fullest account of the Line working method), the
GHMP page for Lines No. 39 (the 50th anniversary text: first line painting
July 1973, the move from structure to randomness, the lianas interview
quote), the Emil Schumacher Museum press release (documenta participant,
computer-art pioneer since the 1960s, Lines from 1973), the CVUT gallery
biography (1963 Grey Structure, Krizovatka, Blazek and the computer in the
mid 60s, line count/width/color/course set by random numbers), the AP
obituary, and Lempertz and Invaluable lot notes. The Pardubice thesis
(Hencl, 2019) supplied key passages via search-result quotation only: its
host is behind an Anubis bot-check that defeated both a live browser task
(20+ navigation retries, then closed) and a direct fetch, so the full text
was not read this session. Four artworks visually inspected at full
resolution: Lines No. 39 (1986, GHMP), Linien Nr. 31 (1985, Lempertz), a red
Structure-family print (Lempertz lot titled "Linien Nr. 72", see the
attribution note below), and Linie 226 (citybee, late sparse style). Two
re-render families built and inspected in PIL (rerender_lines.py with airy,
dense, and fixed-width variants; rerender_structures.py with exhaustive and
random arc grids plus a red chevron-band study).

**Core technique 1: the programmed Structure (1963 on).** Geometric elements
organized into a grid, with the stated goal of combinatorial exhaustion:
every possible mutual position and property of the elements, tried according
to given rules. The computer's role was precisely bounded. It did not draw.
It generated random numbers, which became the input parameters of Sykora's
algorithms; the artist kept the rules, the selection, and the hand. This is
the honest version of "computer art": the machine supplies the parameter
stream, the human owns the instrument. The Macrostructure was the second
move: take a finished Structure, rotate it, zoom in, crop it, and save the
result as a new work. The composition is found inside the field, not built
on the canvas.

**Core technique 2: the Line painting (July 1973 on).** The method, from the
Karlovy Vary text, runs in four acts. First, the artist chooses a random
series of numbers, originally by rolling dice, later from a random number
generator. Second, the computer processes them and the resulting sjetina
(printout) fixes the painting's DNA: how many lines, how wide each is, what
course each follows, in what colors. Third, Sykora draws the tangle in
pencil on the white canvas, exactly: the lines, angles, and curves the
ribbons will twist and cross through. Fourth, the meditative painting phase:
he paints each line from his own swatch book of colors and values, slowly
and precisely, until almost all the construction lines have disappeared and
only the color composition remains. The underlines vanish. The plan erases
itself in the execution.

The philosophical turn is the point. In the Structures, randomness was
eliminated; in the Lines, "the principle of randomness is fundamental"
(GHMP). He replaced the principle of structure, where everything is defined
by clear rules, with the principle of randomness. His own description of the
result is the best criticism of it: "They have a purely vegetative
character, as if my painting had returned to nature... I can't extricate
myself from them. It is as if I fell into the jungle among the lianas"
(interview with Petr Volf, Reflex 1998). The hidden referent was always
nature: river and stream flows, roads and paths, contour lines, flight lines
in the sky, "current-forming processes" abstracted into graceful curves.

**What the re-renders taught.** The Lines mechanism decomposes cleanly into
random waypoints, smooth interpolation between them, constant width per
line, and sequential painting so crossings read as over and under. My
generator (seeded RNG, momentum walk with bounded turn angle, Catmull-Rom
smoothing, round caps, paint order) produces the same species of image
without copying any work, which confirms the decomposition. Three findings:

1. The width dial is doing compositional work, not decoration. The airy and
dense variants both read as Sykora's family; the fixed-width variant (all
ribbons 24 to 26 px) flattens the hierarchy and reads as wallpaper. In the
real paintings the thickest ribbon is usually the dominant gesture and the
thin lines are accents.
2. The grace constraint is the turn bound. Unbounded random turns make
kinks; Sykora's lines never kink. The random input was coordinates, but the
hand drew the course between them as one continuous graceful motion. The
smoothness is the human half of the instrument.
3. The Structures arc grid has a trap. A bare combinatorial grid of quarter
arcs reads instantly as Truchet tiling (Smith, 1987), which Sykora predates
by twenty years but which owns the look now. His Structures avoided the
Truchet reading through stricter symmetry and element choice. A bare arc
grid study must not ship as a Sykora piece.

**Palette and composition.** White ground always, for the Lines. The palette
mixes muted earth (olive, rust, ochre, dark teal) with saturated accents
(cobalt blue, orange red) plus black and white lines. Early Lines are dense
and colorful (Linien Nr. 31, 1985: reds dominant, the canvas nearly covered).
Late Lines are sparse and calligraphic (Linie 226: seven or eight lines,
huge white space, thin loops that almost close, small curled terminations).
The evolution from jungle to drawing is the whole late career in one dial:
fewer lines, more air. Lines mostly enter and exit at the frame edges; some
terminate mid-canvas with rounded caps. Crossings are opaque and clean,
later lines over earlier ones, which is the visible trace of the sequential
painting phase.

**What makes it sing.** The surrender is structural, not theatrical. The
artist commits to the printout before seeing the painting, then spends
weeks executing a tangle he did not design, and the tangle comes out
looking like river systems and lianas. The white ground is doing half the
composition: the lines need the emptiness to breathe, which is why the late
sparse works are the strongest argument for the method. And the vanished
underlines: the finished painting hides its own construction, so the
randomness reads as nature rather than as a system.

**Avoid-list additions.** Bare arc grids (reads as Truchet now, family
taken). Fixed-width ribbon fields with no width hierarchy. Random squiggles
with no width, color, or paint-order discipline sold as generative lines.
Any line tangle presented as Sykora-like without the commitment structure
(the printout, the surrender, the vanished plan). Technique-demo "random
lines" with no point of view stays on the list.

**Honest gaps.** The Hencl thesis via quoted passages only; its full text
was not read (Anubis bot-check, see above). No original handled; the red
print was inspected as a web reproduction. The Lempertz lot image titled
"Linien Nr. 72" shows a red-on-white concentric chevron structure print,
which belongs visually to the Structure family; whether the lot title or
the image is wrong is left open. No dice-era workprint, program listing, or
sjetina seen. The documenta edition number was not verified. The Kappel
2015 monograph was not read. Linie 226's date is unconfirmed (late style,
likely 2000s). No Czech-language monograph sources read.

**Next doorways.** Jaroslav Blazek (the mathematician half of the
instrument); Vladislav Mirvald (kankaze and zmrzlaze as the possible seed
of the Structures); the Krizovatka group as a network node; Vera Molnar
(the parallel structures practice, already studied, worth a direct
comparison pass); Max Bense (still open from the Kawano study); the
Tendencies 4/5 New Tendencies network (still open from Kawano).
