# Herbert W. Franke: Study Notes

**Profile:** Herbert W. Franke (1927-2022), Austrian physicist (PhD 1950,
electron optics), science-fiction writer, computer-art pioneer and theorist.
Co-founder of Ars Electronica (1979). Author of *Computergrafik -
Computerkunst / Computer Graphics - Computer Art* (1971, 2nd ed. 1985), one
of the first books treating computer graphics as art. Lecturer in
"Cybernetical Aesthetic" at Munich University (1973-1997). His collection of
early computer art sits at the Kunsthalle Bremen. Minted 100 works of his
*Math Art* series as NFTs in 2022, months before he died, still arguing that
mathematics, art, and computer science go together. This is the root system
the whole generative-doodles practice grows out of: mainframe plotter,
one bit per turn, art as measured information.

**Depth:** deep on text, deep on four images, three local re-renders. Read in
full: his own cybernetic-art-model essay (via art-meets-science.io), the
ZORA ZINE interview with Tyler Hobbs (one of his last interviews),
dam.org's artist and Biennale-serigraphs pages, the p55.art obituary, and
the art-meets-science "Big Bang of European Computer Art" account. Four
artwork images inspected at full resolution: *DRAKULA* 21/71 (500px, from
the Foundation's archive), *KAES 1 Algebraic Curves* (800x1105, V&A
framemark), a 10x10 color-grid plotter piece (1030x1000, Kiefer auction
catalogue), and a grain-rendered serigraph from the Biennale series
(771x1024, dam.org). Three PIL re-renders built and visually inspected:
paperfold dragon curves marked with triangles, a twelve-frame algebraic
curve superposition, and a rotating-band color grid. NOT seen: the 1971 book
itself, the Herbert W. Franke Archive web application, his *Math Art* NFTs,
*Serie Gruen*, *Einstein Digital*, any of his films or animations. The
images below are the solid ground; the book's ideas come through quoted
summaries and his own essays, not firsthand reading.

## The rational art model: his whole theory in numbers

Franke approached art as a scientist, and the model is startlingly concrete.
From psychological testing he took two numbers: the human brain can
consciously absorb about **16 bits per second**, and the apparent contents of
consciousness hold about **160 bits**. A work of art, in his definition, is
an information stream tuned to that channel:

- **Boredom:** fewer than ~16 bits/sec reach consciousness; the viewer goes
  looking for a more productive information source.
- **Irritation:** more than ~16 bits/sec; the viewer strains, then abandons
  the source.
- **Interest:** about 16 bits/sec; the situation feels desirable.

So a work of art is "so structured as to evoke a successful perceptual
response, awaken interest, and stimulate the appropriate emotions of
perceptual behavior." He got the information part from Max Bense and Abraham
Moles, then broke with pure information aesthetics: information flow alone
does not cover emotion, which he considered an essential component of art
perception with its own, much harder, hidden code. His 1960s art model based
on information theory was, by his own account, not enough for him. The
emotion had to be brought back in alongside the data.

The doctrine that falls out of it, stated to Hobbs in plain words: **"A
mere algorithm is usually boring, so it must be broken, for example, by
random processes."** The algorithm supplies order (low information), the
random break supplies novelty (high information), and the artist tunes the
ratio to sit on the 16-bit channel. Every generative practice since is
arguing with this sentence, whether it knows it or not.

## The work, phase by phase

**1. Analog oscillographs (1950s).** Before any computer, he was doing
generative photography with scientific equipment borrowed from his day job
in Siemens advertising. An analog computer (built for him by a fellow
physics student in 1954) drove a 5cm oscillograph screen; he moved a camera
in front of it with the aperture open during extra-long exposures, producing
"curve multiplications and superimpositions," ghostly Escher-like waveforms.
First solo show *Experimentelle Aesthetik*, Vienna 1959, the first art-museum
exhibition of electronically generated visual art in Europe. By his own
definition, already algorithmic art: the artist "constructs" images
analytically, with or without a computer.

**2. Quadrate / Squares (1967/1969).** The first two digital series were
plotter work, done on time begged from a Siemens mainframe with a plotter
(a colleague, F. Faeber, granted him access). Quadrate is the interplay of
chance and algorithm made visible. Two forms are documented: the flat
10x10 color-grid silkscreen (shown at the 1970 Venice Biennale, German
Pavilion) and, per his cybernetic essay, a version where a random generator
distributes red, yellow and orange circles, with the complexity of each of
the three distributions countable. The 10x10 piece I inspected: exact mirror
symmetry on both axes, flat saturated squares (yellow, black, red, green,
orange, blue, white, grey), colors arranged in rotating pairs that read as
a spin around a checkered white/grey/black core. The rule is strict and the
restraint is total: no outlines, no shading, no margin tricks, just the
grid and the palette.

**3. DRAKULA (1970/1971).** His own chosen example for the information
theory of art. Dragon curves (paperfold sequences): "sequences of lines that
make turns to the right or left at regular intervals, and their information
content is obtained by simply counting the turns, each of which takes up
just one bit: right or left, which corresponds to the 0,1 scheme of bits."
The plot I inspected: two mirrored curves set apart on white, each step
marked not with a line but with a small black triangle, so the filled curve
interior reads as dense spiky lattice and the sparser regions as
crystallographic scatter. The triangles are doing compositional work: they
turn a path into a point field, and the point field is what makes it feel
organic instead of geometric. In my PIL re-render at 8192 steps the markers
merged into a solid mass; his actual plot (a few hundred steps) stays airy.
Lesson: the marker size is the compositional parameter, not the curve.

**4. KAES (Kurven, AESthetische), 1969.** "Aesthetic Curves," with
programmer Peter Henne, his first digitally produced graphics. One algebraic
curve as the basic element; the program applies slow, step-by-step
superpositions and transformations (enlarge, lengthen, reduce), producing
sequences and patterns as silkscreens. The V&A print I inspected: a single
thin black curve stacked twelve-ish times with a slow drift, reading like
a feathered flame or a flickering wing. The beauty is in the slowness of
the gradient: neighboring frames nearly coincide, so the eye reads motion
and moire instead of twelve drawings. My re-render confirmed the effect in
minutes: one curve, one slow transform, the stack is the piece.

**5. The machines (1973 onward).** Sicograph at the Siemens research labs
(one of the first digital picture-processing systems, with an early inkjet
plotter and a small monochrome preview screen; used evenings) gave *Serie
Gruen*. The Bildspeicher N with a large color screen gave *Einstein Digital*
(1974) and *Digitale Impressionen* (1973). He insists, to Hobbs, that
immediate feedback was possible and mattered to him even then: working
interactively with algorithms, not waiting for batch output. All his 1980s
PC programs were interactive. Later decades: game-theory 2D diagrams (early
1990s, "like millennia-long family trees"), 3D models of complex equations
placed like statues in virtual worlds (2000s), and the brightly colored
*Math Art* pop series (1980s-90s, minted as NFTs in 2022).

**Curator and theorist.** *Ways to Computer Art* (Wege zur Computerkunst),
1968: he exhibited concrete painting, photography and computer art together
as one rational-approximation lineage, touring 150 cities through 1986 with
the Goethe-Institut. The 1971 book placed early computer art in a lineage of
"mathematically conceived figuration" from Leonardo and Duerer through
Mondrian and Le Corbusier, legitimizing the medium before arguing for
entirely original digital forms via animation, mixed media, and especially
interactivity.

## Palette and composition habits

Early work is monochrome by constraint and by choice: black plotter ink or
white grain on black. When color arrives it is flat and counted, never
blended: the Quadrate grid's eight flat squares, the red/yellow/orange
circle distributions. Margins are generous on the prints (paper, mats,
signatures), tight inside the work: the image is the system, edge to edge
within its frame. Symmetry is a compositional device, not a crutch: the
10x10 grid mirrors on both axes, DRAKULA mirrors the curve against itself.
Everything is countable, and the count is part of the honesty.

## What to steal (study, not copy)

- The broken-algorithm doctrine as a working instrument: one deterministic
  system, one named random break, and a control for the ratio. Make the
  break the subject, not the accident.
- One bit per turn: the smallest possible information unit as a drawing
  rule. A piece can be built on counting alone.
- Markers instead of paths: rendering a curve's steps as point marks
  (triangles, dots) turns geometry into texture. The marker is the
  compositional parameter.
- Slow superposition: one curve transformed in tiny steps, neighbors nearly
  coinciding. The gradient is the subject; speed would kill it.
- Stating the mechanism on its face. He tells you the information is one
  bit per turn. The honesty is part of the pleasure, and it is why the work
  reads as art rather than puzzle.
- Interactive feedback as doctrine, not convenience: he preferred machines
  he could work with live, and built the 1980s programs that way.

## What NOT to do

- Do not ship a dragon curve and call it a Franke study. DRAKULA exists;
  the curve itself is his signature the way the clock gauge is okazz_'s.
  The *mechanism* (one bit per step, mirrored pair, triangle markers) is
  free, the *look* is not.
- Do not ship a pure algorithm without the break. He said it himself: a
  mere algorithm is usually boring. Symmetry and order alone read as
  diagram, not art.
- Do not confuse his simplicity with primitivism. The 10x10 grid looks
  like a child's color square; the discipline (exact symmetry, rotating
  pairs, counted palette) is what makes it hold a wall.
- Do not treat the theory as the art. The 16-bit model is a tuning
  instrument, not a subject; a piece about information theory that forgets
  the eye is exactly the diagram he warned against.

## Next doorways

Max Bense (information aesthetics, Franke's cited source) and Abraham Moles
(information theory and perception); Frieder Nake and Georg Nees (shown
alongside Franke at the 1970 Venice Biennale, fellow early plotter artists
with their own aesthetic theories); the Herbert W. Franke Archive web
application presented at the Generative Art Summit (his manuscripts in
digital form).
