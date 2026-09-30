# A. Michael Noll / Bell Labs computer art - Deep Study Notes

**Date:** 2026-09-30 (study pass)
**Artist:** A. Michael Noll (born 1939), Bell Telephone Laboratories,
Murray Hill, New Jersey, 1961-1971; later Nixon's science advisor staff,
AT&T, then USC Annenberg.
**Hop path:** the Bell Labs circle (Mathews, Pierce, Alles, Deutsch,
Tenney, Risset, Shepard/Zajac), through the one gap Noll himself names:
Mathews made the computer sing, so Noll made it draw. Also a hop from
the Le Random "When It All Started" interview (2026), where Noll names
Knowlton, VanDerBeek, Paik, Reichardt, Nees, Nake, and the 1965 Howard
Wise show in his own words.
**Depth:** deep. Noll's own Leonardo memoir "The Beginnings of Computer
Art in the United States" (1994) read end to end. His "Computers Visual
Arts" writeup read end to end (exact recipes for Gaussian-Quadratic and
the Vertical-Horizontal series). The Psychological Record Mondrian paper
read in full via OCR copy. The Le Random interview read end to end.
Three artworks visually inspected at full res: Gaussian-Quadratic (V&A
print scan, 1875x2500), Computer Composition with Lines (dada archive),
Vertical-Horizontal Number Three (Le Random/V&A scan, 1400x1851).
Three local procedural re-renders built from Noll's own recipes and
visually inspected.

**Honest gaps:** no plotter output run (no SC-4020; re-renders are PIL,
not microfilm). The original IBM 7090 Fortran never recovered; recipes
come from Noll's prose, not his code. Ninety Parallel Sinusoids inspected
only as a thumbnail; the stereoscopic 3D films, the 1965 computer ballet,
and the Incredible Machine title sequence were not watched. Patterns by
7090 (MM-62-1234-14) read only via quoted passages. No audio auditioned
(this is a visual study).

---

## The accident that became a program

Summer 1962. Noll is 22, a fresh hire from Newark College of
Engineering, on an internship to the research division of Bell Labs,
implementing Manfred Schroeder's cepstrum pitch-detection idea on the
IBM 7090. The machine has a Stromberg-Carlson SC-4020 microfilm plotter
hanging off it, mostly used for text and data graphs. His officemate,
fellow intern Elwyn Berlekamp, has a programming bug; his plot comes out
as a random jumble of lines everywhere. Berlekamp, who knew abstract
art, jokes: "Oh, it's computer art." The light goes off. Do it
deliberately.

Noll's own gloss in the Le Random interview: people at Bell Labs were
making computer music, so he asked why not computer art. He was doing
this in the evenings; there was no department of art and new media, and
management told him not to call it art. Art, they said, was whatever a
museum blessed. He called the first series Patterns by 7090 and wrote
it up as a Bell Labs technical memorandum, dated August 28, 1962. One
thing Bell Labs teaches: if you don't write it up, it's lost.

He then did the most Bell Labs thing imaginable: he ran aesthetic
experiments. Computer art as stimuli in human-factors studies.

## Gaussian-Quadratic (1962-63): the recipe, verbatim

Noll gives the recipe in his own writeup, and it is complete enough to
re-run verbatim:

- 100 points joined by 99 straight lines.
- Horizontal coordinates: Gaussian, mean at center, standard deviation
  150, on a 1024 by 1024 picture.
- Vertical coordinate of point n: y = n^2 + 5n, measured from the
  bottom. The 30th point would land at 1050, off the picture, so points
  that reach the top are reflected to the bottom and continue rising.
- The exact proportions came from trial and error: the computer
  produced series of pictures with the factors changed uniformly, and
  Noll picked the one that felt right.

The line starts at the bottom of the picture and zigzags to the top in
continually increasing steps, then translates back to the bottom and
climbs again. Because x is Gaussian, the tangle concentrates in a
central column with occasional long sweeps to the edges. The quadratic
rise makes vertical gaps between successive points grow, so the line
slows down visually as it climbs. That is the cubist quality Noll saw:
it reminded him of Picasso's Ma Jolie, unplanned. He traced over
printouts with colored markers and signed them for colleagues' offices.

He registered it with the Copyright Office. They refused twice: first
because a machine generated it, then because "randomness was not
acceptable." He explained that the pseudorandom numbers came from a
perfectly mathematical algorithm, deterministic, not random at all. The
copyright was accepted. Possibly the first registered piece of
copyrighted art made with a digital computer.

## The Mondrian experiment (1964): the Turing test for pictures

Management suggested the subject: pick a black-and-white painter and
have the computer imitate them. Mondrian's horizontal-vertical theme
fit the plotter's native stroke set. Noll read a book on Mondrian,
studied Composition with Lines (1917), and wrote a program.

His recipe, from the Psychological Record paper (1966):

- Bars placed uniformly at random within a circle of radius 450 units;
  every location equiprobable.
- Orientation vertical or horizontal, 50/50.
- Bar widths equiprobable between 7 and 10 plotter lines (drawn as
  closely spaced overlapping line segments).
- Bar lengths equiprobable between 10 and 60 points.
- Bars falling inside a parabolic region at the top of the picture were
  shortened, length reduced in proportion to distance from the
  parabola's edge. (Noll had noticed that in the Mondrian the bars get
  smaller toward the top, and reproduced the observation, not just the
  layout.)
- Trial and error until the effect felt close to Mondrian's.

Then the experiment: reproductions of the Mondrian and the computer
picture shown to 100 Bell Labs subjects. Result: only 28 percent could
correctly identify which was the computer picture; 59 percent preferred
the computer picture. Both significant against chance by binomial test.
Noll called it, in essence, a Turing experiment. He later varied the
program so bars sat on a jittered uniform grid, the perturbation range
growing geometrically to plus or minus 250, and tested trained artists
against untrained subjects: no meaningful difference found.

The compositional insight: the circle matters. The real Mondrian is
rectangular; Noll's bars live inside a disc, density tapering to the
edge, which is why the print reads as a constellation rather than a
grid.

## Vertical-Horizontal No. 1-3 (1964): one rule, one constraint

The recipe is even simpler:

- Move from point to point, but change only one coordinate at a time,
  alternating which one changes.
- Otherwise the coordinates are uniform random. No. 1: 50 lines, equal
  ranges. No. 2: 300 lines. No. 3: 100 lines, x in [-200, 200],
  y in [-500, 500].

The alternation constraint turns pure randomness into nested
rectangles, hairpin corridors, overlapping U-turns. No. 3 at full res
reads like a floor plan drawn by someone who forgot the building:
every corner is a clean right angle, every edge overshoots. It is the
whole trick in one sentence: constrain the degrees of freedom of the
random walk and the eye supplies the architecture.

## Ninety Parallel Sinusoids with Linearly Increasing Period (1964)

Bridget Riley's Current (1964) was the provocation. Noll wrote the
mathematical version: ninety sine curves, periods increasing linearly
down the picture, presumably slight jitter. I did not inspect this one
beyond a thumbnail, so the period schedule is reconstructed, not
verified. The doctrine here is opposition as method: he saw Op art and
asked what the equation was.

## The depth stack: stereo, ballet, 4D

- Stereoscopic projections (1964, MM-64-1234-2): software for the 7090
  that rendered left/right pairs of 3D data, including random 3D
  shapes, viewed in his childhood stereoscope. He found stereo
  versions were preferred over flat ones in his subject tests.
- 3D movies: random objects changing shape, plus a rotating
  4-dimensional hypercube (suggested by Doug Eastwood), projected
  perspectively 4D to 3D to two eyes. Prism-Stereo adapter, polarized
  glasses.
- Computer-generated ballet (1965): six stick figures, three large
  "male," three small "female," moving with random motion around a
  stage. Originally a stereoscopic 3D movie; a 2D version made for
  easy showing. He showed it to dance-notation organizations, to
  Rebekah Harkness, to Merce Cunningham. He wanted the choreographer
  to compose with the computer in real time and have the result
  transcribed to dance notation. The hardware for that feedback loop
  did not exist yet.
- 4D title sequence (1968): words placed in 4D space, rotated in four
  dimensions, projected down to 3D to 2D, for the AT&T short Incredible
  Machine. The words "incredible machine" rotate around each other
  doing things that would be physically impossible. Early flying-logo
  energy, derived from pure geometry.
- Computer holography (with Michael C. King): strip of perspective
  views combined into a hologram viewable with a flashlight.

## The stance: teach the artist to program

Noll taught himself no collaboration doctrine at all. Billy Kluever's
E.A.T. philosophy said artists can't understand technology and
engineers can't understand art, so they must collaborate. Noll's
answer: "I didn't want an artist collaborating with me. I wanted the
artists to learn programming." Aaron Marcus came to Bell Labs in the
mid-60s, learned Fortran, and made his own computer art. Nam June Paik
came in 1967-68 to learn programming from Noll; years later Greg Zinman
found Paik's Fortran programs and plotter art, now in the Smithsonian.
His paper "Art Ex Machina" is the polemic: the computer is "an
intellectual and active creative partner," and the artist's job is to
program it, not to be paired with someone who does.

Note the tension honestly: Stan VanDerBeek worked with Ken Knowlton on
Poemfields, and they credited both, always. Noll respected Knowlton's
animation enough to call him an artist against Knowlton's own
protest ("I'm not an artist, I work with an artist"). Noll's position
was not anti-collaboration so much as anti-dependency.

## Core techniques

1. **Mixed randomness and determinism.** Gaussian on one axis,
   quadratic on the other. Random placement, fixed grammar. The art
   is in choosing which axis gets the distribution and which gets
   the function.
2. **One-constraint walks.** The Vertical-Horizontal rule (change one
   coordinate at a time) shows how little constraint it takes to turn
   noise into structure.
3. **Imitation as analysis.** The Mondrian program is not a fake; it
   is a hypothesis about Mondrian's method, tested on subjects. "It
   looks like Mondrian almost used an algorithm to create that."
   Reverse-engineering the style into a procedure, then measuring the
   gap.
4. **Trial-and-error parameter selection, honestly owned.** The
   computer generates the family fast; the human picks. Noll never
   pretended otherwise. The artist is the curator of the parameter
   sweep.
5. **Projection as composition.** Stereo pairs, 3D movies, 4D to 2D
   titles. Dimensionality reduction is treated as a creative act, not
   a loss.

## Palette and composition

Black on white, always. The plotter was a line device, and Noll never
fought it. Composition is statistical: Gaussian column, jittered grid,
disc boundary, parabola ceiling. The frame is earned by the
distribution, not drawn.

## What makes it sing

The restraint. One distribution, one equation, one constraint. Every
piece in this study is legible: you can hold the whole program in your
head while looking at the output, and the output still surprises you.
That legibility is the aesthetic. It is also why the copyright office
had to accept it: the "randomness" was a choice, and the choice was
visible.

## What is overdone (avoid list)

- Plotter nostalgia as style. The thin black line on white is a
  constraint of 1962 hardware, not a moral choice. Copying the look
  without the reasoning is costume.
- The "Turing test for art" framing gets recycled endlessly now; the
  interesting move in 1966 was running the experiment, not the
  headline.
- Gaussian-everything. Noll used one distribution per piece on purpose.
  Stacking normal jitter on every parameter is the default look of
  lazy generative work today; it all melts into the same porridge.

## Re-render findings (visually inspected)

- Gaussian-Quadratic, 5 seeds, exact recipe: the tangle concentrates
  in a central column with long horizontal sweeps to the edges, exactly
  like the V&A print. The quadratic rise creates visibly widening
  vertical gaps up each climb, and the wrap points read as long
  diagonal slashes. Seed choice matters enormously; two of five seeds
  looked muddy. Noll's trial-and-error was the real algorithm.
- Mondrian stand-in, 3 seeds, adjusted proportions (recipe scale
  reconstructed, not verbatim): matches the real print's character
  once bars are short (25-90 units), sparse (200 placements), and the
  top parabola shortens them. First pass with long dense bars read as
  a Mondrian grid, not the scattered constellation. The disc boundary
  is doing half the compositional work.
- Vertical-Horizontal No. 3, 3 seeds, exact recipe: nearly
  indistinguishable in character from the real piece. Nested right
  angles, hairpin corridors, tall narrow column. The simplest recipe
  in the whole study, and the most faithful re-render.

## Next doorways

- Ken Knowlton and Stan VanDerBeek's Poemfields (the BEFLIX mosaic
  films; Noll calls Knowlton an artist, Knowlton disagrees; the
  collaboration Noll refused is the one that made Poemfields).
- Frieder Nake and Georg Nees (the German exhibits of 1965, months
  before Howard Wise; the parallel invention story).
- Bela Julesz (the random-dot stereogram work Noll shared the 1965
  gallery with; perception science as the other half of the show).
- Nam June Paik's Fortran period at Bell Labs (the Zinman recovery;
  what Paik actually plotted).
- Reichardt's Cybernetic Serendipity (the book that told the story;
  Noll's essays as the movement's founding documents).
