# Abraham A. Moles: Study Notes

**Profile:** Abraham Moles (19 August 1920 to 22 May 1992), French
electrical engineer, sociologist, and philosopher with two doctorates, one
in physics (1952, the physical structure of the musical and phonetic
signal) and one in philosophy (1954, *La creation scientifique*, under
Bachelard). CNRS acoustics lab in Marseille, Rockefeller fellowships to
Columbia's music department, director of the Scherchen electroacoustics
lab in Gravesano 1954 to 1960, taught at Stuttgart alongside Max Bense,
Bonn, Berlin, and Utrecht, full professor at the Ulm School of Design,
then from 1966 Strasbourg where he founded the Institute of Social
Psychology of Communication (the Ecole de Strasbourg). President of the
French Society of Cybernetics. Alongside Bense he is one of the two
founders of information aesthetics; where Bense measured the object,
Moles started from the observer and allowed subjective measures. His
books include *Art et ordinateur* (1971, from a 1970 article, German
edition *Kunst und Computer* 1973), *Psychologie du Kitsch* (1971), and
*Theorie de l'information et perception esthetique* (1973). He wrote the
prologue to the 1972 *Art ex machina* portfolio. Wikipedia gives his
birthplace as Touzac; the Database of Digital Art says Paris. Left as
found.

**Depth:** deep on text, deep on seven images, two local re-renders. Read
in full: the DADA agent entry and the DADA Information Aesthetics article
(includes Bense's four generative-aesthetics methods and Giannetti's five
Moles creative-machine models), the full Wikipedia biography and works
list, and Michael Schwab's *Early Computer Art and the Meaning of
Information* (2003) across the Moles passages, which quote *Kunst und
Computer* pp. 17 to 18 and *Informationstheorie und asthetische
Wahrnehmung* p. 93 verbatim. Seven images visually inspected: the *Art ex
machina* portfolio cover (DADA, 312x400), the Barbadillo print at full
resolution (Buffalo AKG, 2005x2500, signed, 145/200), and five AKG part
thumbs (200px) of the remaining prints. Two PIL re-renders built and
visually inspected: a permutational-art panel sorted by Birkhoff's
aesthetic measure, and a 16 bits/sec channel strip. NOT seen: *Art et
ordinateur* or *Kunst und Computer* firsthand (doctrine via Schwab's
quotations), Moles's own statement of the five creative-machine models
(only Giannetti's list), any verified example of his permutational art in
code or print, the V&A portfolio pages (proxy timeouts this session), any
original plotter drawing. Two attributions below are marked uncertain and
stay that way.

## The doctrine: art as a message in a narrow channel

Moles took Shannon's communication theory and pointed it at the viewer.
The artwork is a message; the human is a receiver with a measured
capacity. The numbers, quoted by Schwab from *Kunst und Computer* p. 18:

- **16 bits per second** is what a human can register in a given time
  span. An artwork demanding more is too complex; demanding much less is
  banal.
- **Redundancy + entropy = 1.** Everything in the work is either
  information (entropy, the part that does not repeat) or redundancy
  (the part that lets the information be read). Nothing else exists.
- **White noise is not empty, it is too full.** The random artwork holds
  maximum information. The lack of any spontaneous interpretation is,
  in Moles's phrase, linked with too much informational content, not too
  little (*Informationstheorie und asthetische Wahrnehmung*, p. 93).
- His Fig. 22 pairs two images with the same pixel count: the left one
  carries complexity, the right one redundancy (a house). Structure is
  what obstructs the even spreading of information.

This is also where he breaks from Bense. Bense wanted objective measures
of the artefact, signs broken into primitives and computed. Moles kept
the math but started from perception: super-signs, signs grouped the way
the eye groups them, and room for subjective measures. His nested
perceptual grouping idea (a composed work is built of nested, increasingly
fine sub-components that the listener groups into phrase, passage,
composition) comes straight out of his 1952 acoustics thesis.

Giannetti lists five models Moles used for the generation of artworks:

1. **The machinic viewer** (a machine that looks, the receiver
   mechanized),
2. **the amplifier of complexity** (start simple, turn the complexity
   up),
3. **permutational art** (enumerate the combinations of a small set),
4. **the simulation of artistic creation**,
5. **the creation machine based on successive integration**.

Number 3 is the one with teeth for our practice, and it comes with a
built-in warning. Frieder Nake, quoted in the same paper, contemplated
"a simple algorithm that could create all objects of a class by going
through all possible combinations. Such an algorithm would be as simple
as it was useless." Enumeration is trivial. Selection is the art. John
F. Simon's *Every Icon* (1997) later ran Nake's "useless" algorithm for
real, counting through all 2^1024 black-and-white icons.

The pushback matters too. Rudolf Arnheim's *Entropy and Art* (1971)
answered the information theorists directly: information lives in the
line the artist draws, in structure, not in disorder. He called them two
economies, the economy of meaning and the economy of information, and
accused the information camp of stripping meaning out to count what was
left. Moles survives this better than Bense does, because the observer
and the super-sign were in his model from the start.

## Birkhoff's measure, the part everyone misuses

Birkhoff's *Aesthetic Measure* (1933) gives M = O / C, order divided by
complexity: the density of order, relations per unit of stuff. The DADA
article notes the obvious computational dream: calculate M for many
designs and keep the winner. My re-render shows why that dream fails
unattended. With 81 sequences (length 4, three motifs with repetition),
the raw measure crowns the uniform row, M = 4.0, maximum order, minimum
complexity, and Moles's own channel verdict on it is banal. The
interesting rows sit at M around 0.5: symmetric but varied, like
disc-square-square-disc. The measure is a sorter, not a judge. The judge
is the channel band the artist draws on top of it. First attempt at the
re-render used four distinct motifs with no repetition and every
permutation scored zero symmetries, a good reminder that a permutation
space with no repeated elements has no order to find.

The second re-render draws the channel itself: a 10x10 cell field inked
with probability p from 0.50 down to 0.01, each frame labeled with its
measured bit rate and a meter carrying the band. At p = 0.50 the field
is white noise, 100 bits, unreadable. At p = 0.01 it is nearly blank, 8
bits, nothing to read. The frames the eye keeps are p = 0.06 and 0.03,
scattered marks reading as constellations, which is exactly the band the
meter predicted. The numbers are toy scale, the shape of the finding is
not: noise becomes legible and blank becomes interesting at the same
boundary, from opposite sides.

## The portfolio: Art ex machina, 1972

Gilles Gheerbrant's Montreal portfolio is the one place Moles's name
physically sits next to the work: six silkscreens by Manuel Barbadillo,
Hiroshi Kawano, Ken Knowlton, Manfred Mohr, Frieder Nake, and Georg
Nees, each with a short text by the artist and a prologue by Moles,
printed by Pierre Foisy in an edition of 200. Copies at the V&A (gift of
the Computer Arts Society), ZKM Karlsruhe, the Spalter collection, and
Buffalo AKG (P2023:47.1-6, Mathews Fund, 2023), whose photography I
worked from.

The cover is a black folio with the title set vertically in spaced blue
capitals, ART EX MACHINA, running down the right side. Minimal,
typographic, no image. It reads like a Bense sentence: the sign is the
object.

The Barbadillo print, seen at 2005x2500, signed and numbered 145/200, is
the strongest of the six: a brown sepia ground carrying large
interlocking organic modules drawn as fields of tiny white star-like
marks. The modules are blobby, amoebic, puzzle-like, arranged in loose
rows, and the white marks vary in a way that reads as halftone shading
across each module. It is Op-adjacent but the computer is doing something
a hand cannot: the same module family repeated with systematic variation
until the field holds together as one surface. Barbadillo is the fresh
doorway here; his module work is unstudied in our notes.

The remaining five, from 200px AKG thumbs:

- **Nake, *Walk-Through-Raster*:** interlocking hard-edge rectangles in
  white, blue, red, yellow, and orange, the palette matching the V&A
  record exactly. Confident attribution.
- **Kawano, tree:** purple ground, green branching lines drawing a tree
  canopy, jittery hand-like line quality. Subject matches his *Red Tree*
  title. Confident.
- **Sparse scatter on yellow:** tiny black and red glyphs scattered thin
  across a yellow ground. Unassigned from the thumbs.
- **Blue wireframe rectangles with orange diagonals on white:**
  overlapping rectangular frames, plotter-line quality. Likely Mohr, his
  rectilinear period, but the V&A describes his portfolio print as a
  yellow ground with black marks, so this stays uncertain.
- **Red-orange ground with a yellow square density gradient:** small
  squares thinning from dense yellow at right to sparse at left.
  Likely Nees, the gradient-is-the-composition move his *Schotter*
  made famous, but uncertain from a thumb.

Also inspected: a red branching tree on gold ground (450x317, image
search result), consistent with Kawano's described *Red Tree* but not
verified as the portfolio impression; and a bookseller photo of a
mustard hardcover with a white robot figure assembled from machine
parts, listed against the *Art et ordinateur* query, attribution to the
1971 edition unverified. Both are recorded as labeled, not as confirmed.

What the portfolio teaches as a set: six artists, six completely
different answers to the same prologue, and the computer is doing a
different job in each, modules for Barbadillo, branching for Kawano,
color raster for Knowlton, frames for Mohr, raster-walk for Nake,
distribution for Nees. The variety is the argument. A portfolio is a
permutation space with a selector, which is to say it is Moles's model
number 3 with Gheerbrant as the aesthetic measure.

## Technique breakdown

- **Core techniques:** the aesthetic channel (16 bits/sec band between
  noise and banal), redundancy + entropy = 1 as a compositional
  partition, permutational art with an explicit selector, super-signs
  (perceptual grouping as the unit, not the pixel), the amplifier of
  complexity (simple seed, turned-up rule).
- **Palette and composition choices:** Moles himself made no images, so
  the visual record is the portfolio: flat grounds, tight palettes,
  systematic variation of one family per print. The Barbadillo brown and
  white is the palette lesson: two inks, one module family, variation
  doing all the work.
- **What makes it sing:** the channel is a falsifiable instrument. You
  can build the meter, point it at your own work, and be wrong in public.
  Few aesthetic theories of that era survive contact with an actual
  measurement.
- **What is overdone (avoid list):** white noise presented as profound
  (for Moles it is the failure mode, too much information, not depth);
  enumerating a whole space with no selector (Nake's "useless"
  algorithm); maximizing Birkhoff's M unattended (it picks the boring
  extreme); calling any random-dot field "information aesthetics" without
  the channel thinking; redundancy treated as waste instead of the part
  that lets the information be read.

## Honest gaps

*Art et ordinateur* and *Kunst und Computer* not read firsthand; the
doctrine above comes through Schwab's verbatim quotations and the
Wikipedia works list. The five creative-machine models are Giannetti's
list, not Moles's own text. No verified example of Moles's
permutational art found, no computer-poetry code recovered. Two of the
five AKG part-thumb attributions are guesses with stated reasons. The
book-cover photo is a bookseller image matched by query, not a confirmed
1971 edition. V&A portfolio pages unreachable this session (proxy
timeouts on collections.vam.ac.uk). No plotter original handled, nothing
seen in motion.

## Next doorways

Manuel Barbadillo (the module family, completely fresh), Hiroshi Kawano
(programmed tree branching, the Bense-line Japanese pioneer), Max Bense
himself (the philosopher pole, still unstudied, coined "artificial art"
at Nees's 1965 opening), Jean-Pierre Hebert (plotter line, the living
end of this lineage). The Franke study already named Bense and Moles
together; Bense remains the open half of that pair.
