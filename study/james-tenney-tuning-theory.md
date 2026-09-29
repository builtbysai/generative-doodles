# James Tenney / Meta+Hodos and the tuning theory - Deep Study Notes

**Date:** 2026-09-29 (study pass)
**Artist:** James Tenney (1934-2006). Composer, theorist, performer, teacher.
Bell Labs 1961-1964 with Max Mathews. This pass covers the other half of
him: the 1961 theory book and the tuning theory that made him the
patron saint of just intonation. The For Ann (rising) study covered the
piece as doctrine; this one covers the doctrine as math.
**Hop path:** named by the Tenney, Pierce, and AMY studies, three times
over, the last open doorway of the Bell Labs circle. Tenney's tuning
theory is where the whole circle converges: Mathews's machine made the
ratios playable, Pierce's stretched octaves questioned them, Deutsch's
tolerance is the ear's version of the same idea, and the AMY chip was
built to synthesize exactly these spectra. Tenney gave the whole
question its geometry.
**Depth:** deep on text plus visual inspection of published diagrams and
three local procedural re-renders. The Percorsi Musicali review of
Meta+Hodos read end to end, Joseph Sowa's "Music Theory for the
Twentieth-First Century: James Tenney's Meta-Hodos" read substantially
end to end, the Assaf Shatil SIG page on Meta+Hodos read end to end,
Marc Sabat and Wolfgang von Schweinitz's transcription of all six
figures from Tenney's "John Cage and the Theory of Harmony" (1983)
visually inspected at full resolution across all four PDF pages, the
2006 Frog Peak second-edition cover visually inspected, the key passages
of Tenney's "About Changes" (harmonic distance formula, pitch-class
projection, the tolerance rule) read in quoted text, Nicholson and
Sabat's "Fundamental Principles of Just Intonation" harmonic-distance
section read, Andrew C. Smith's tf-harmonic-distance theory summary read
(parabolic tolerance model implementing Tenney), the Leibniz 1712 letter
excerpts on harmonic distance and tolerance read. Three local procedural
re-renders built from Tenney's own definitions and visually inspected:
the 3,5 plane lattice, the harmonic-distance ladder, the
tuning-tolerance trough envelope.

**Honest gaps:** Meta+Hodos itself read only through the review and Sowa's
exposition, not the full text; "About Changes" read in quoted passages
only (paywalled); "John Cage and the Theory of Harmony" read through the
transcription and quoted passages, not the original typescript; the six
figures seen only in Sabat and von Schweinitz's Helmholtz-Ellis
transcription, not Tenney's original hand; Ervin Wilson's own
harmonic-space writings not read in full; no audio auditioned.

## The thesis, stated plainly

Tenney did two things that look unrelated and are the same thing. In
1961 he wrote a phenomenology of how listeners carve sound into units
(the clang, the temporal gestalt). In 1983 he drew pitch as a lattice in
which every interval is a shortest path. Both are the same move: stop
asking what the material is made of, and ask what the listener does with
it. The clang is the unit the ear makes. Harmonic distance is the
distance the ear feels. Tuning tolerance is the ear rounding the world
to the nearest thing it can hold. The theory is not about ratios. It is
about the rounding.

## Meta+Hodos: the clang and the temporal gestalt

The title is an etymology of the word "method": meta (after) + hodos
(way). Tenney's 1961 master's thesis at the University of Illinois,
published 1964, second edition by Frog Peak in 2006. A conceptual
framework for musical description and analysis, built on phenomenology
and Gestalt psychology at a moment when theory had, in his words, a
nearly complete hiatus from musical practice.

The core unit is the clang: a sound or complex of sounds the hearer
perceives as a primary musical unit, from Koffka's perceptual gestalt.
It deliberately includes timbre and texture, not just pitch, which is
why the framework still works on music that has no notes in it. Clangs
group into sequences, sequences into segments, segments into sections,
sections into the piece. Each level is a temporal gestalt, and form is
temporal gestalts occurring on successively larger scales, nothing more.

Grouping runs on two primary factors, borrowed from Wertheimer:
proximity (temporal placement; things close together group) and
similarity (aural resemblance; things that sound alike group).
Four secondary factors: intensity (a parameter's rise or fall marks
focal points and clang boundaries), repetition (a repeated profile
divides the whole into parts), objective set (expectations the piece
itself sets up, like hemiola), subjective set (expectations the listener
brings in from a lifetime of listening).

Two sentences carry the whole book's weight for a generative artist.
First: "It is the differences between the successive elements of a
clang, (and between the successive clangs of a sequence), which
determine the form of the clang (or sequence), not the similarities."
Form comes from contrast, not unity. Second: "the formative parameter
in a given configuration is generally distinct from the cohesive
parameter in that same configuration." The thing that holds a passage
together is never the thing that gives it its shape. If your piece's
glue and its drama are the same knob, Tenney says, you have one idea
doing two jobs badly.

The 2006 cover is worth one look: nearly blank, a thin black frame, the
title set twice in a serif face, one long vertical rule down the right
side, the author's name at the bottom. It is a gestalt diagram wearing
a book jacket. Proximity, similarity, and one figure against an empty
ground.

## Harmonic space: the lattice

"John Cage and the Theory of Harmony" (1983) proposes that the network
of pitch relations is a discontinuous lattice, not a continuum. Every
prime number gets a dimension: 2 is octave equivalence, 3 is the fifth,
5 is the major third, 7 adds a fourth dimension, Partch's 11-limit
implies five dimensions. A pitch is an integer vector of prime-factor
exponents: 3/2 is [-1, 1] over the primes (2, 3). The one-dimensional
continuum of pitch height is just a central axis of projection through
this space.

The six figures, as transcribed: Figure 1 and 2 show the 2,3 plane with
two crossing axes, the pitch-height projection axis running diagonal and
the pitch-class projection axis vertical, 1/1 near the crossing, every
nodehead carrying Helmholtz-Ellis just-intonation accidentals. Figure 3
is the 3,5 plane as a pitch-class projection plane inside 2,3,5 space: a
grid of noteheads with 1/1 near the center and octave-folding arrows
everywhere, the syntonic comma made visible as ink. Figures 4 and 5 list
the primary harmonic relations within the chromatic scale, diatonic
major and minor side by side: 5/3, 5/4, 15/8, 45/32 over 4/3, 1/1, 3/2,
9/8 over 16/15, 8/5, 6/5, 9/5. Figure 6 is the strange one: the harmonic
containment "cone" in 2,3,5 space, dozens of transposed noteheads at 8va
and 15ma with diagonal lines all converging down to a single low bass
pitch. Every lattice point falls into one fundamental. It is the visual
form of Tenney's whole cosmology: multiplicity above, unity below.

Re-render 1 rebuilds Figure 3 computationally: nodes at integer (3,5)
exponents, octave-reduced to pitch class, edges along single prime
steps, nodes colored by harmonic distance with 1/1 at the center.
Visually inspected. The color field reads exactly as the theory claims:
distance from 1/1 grows smoothly in every direction, and the diagonal
bands are lines of constant 3-exponent, the pitch-class projection Tenney
drew as a vertical axis.

## Harmonic distance: one formula

For an interval a/b in maximally reduced, relatively prime form:

Hd(a/b) = log2(a * b)

With base-2 logarithms the unit is octaves. As a city-block distance in
harmonic space it is the sum over primes of |exponent| * log2(prime):
the length of the shortest lattice path between the two pitches.
Examples, verified in the re-render: octave 1:2 gives 1.0, fifth 2:3
gives 2.585, fourth 3:4 gives 3.585, major sixth 3:5 gives 3.907, major
third 4:5 gives 4.322, septimal seventh 4:7 gives 4.807, minor third 5:6
gives 4.907, minor sixth 5:8 gives 5.322, whole tone 8:9 gives 6.170,
major seventh 8:15 gives 6.907, minor second 15:16 gives 7.907.

The product ab has a physical reading: it is the lowest partial shared
by the two tones' harmonic series. The fifth shares partial 6, the
major third shares partial 20, the minor second shares partial 240.
Consonance, in this model, is literally how soon the two harmonic
series meet. Tenney held that the measure works for successive and
simultaneous intervals alike, and for sine waves as well as rich
timbres.

Re-render 2 is the ladder, sorted, each bar annotated with its shared
partial. Visually inspected. The surprise it keeps delivering: the
septimal tritone 7:10 (6.129) sits nearer than the whole tone 8:9
(6.170). The ear's geometry does not respect the staff.

## Tuning tolerance: the troughs

The About Changes rule: in a tempered system, assume the simplest
integer ratio within the tolerance range around a pitch to be the
harmonically effective one. Tenney's working tolerance was plus or minus
half the smallest step, 1/144 of an octave, about 8.33 cents. Pitches
are first projected into pitch-class space by dividing out all powers
of 2, then the winning ratio is the one with the smallest product ab
inside the window. This is the formal version of what Deutsch's
research shows the ear doing: categorical perception snapping a
continuum onto a few stable points.

Smith's implementation makes the geometry explicit: around each
candidate ratio draw a parabola, take the lower envelope, and the
troughs are the tuneable intervals. Widen the parabolas and the simple
ratios eat their neighbors; narrow them and the complex ratios survive.

Re-render 3 builds exactly this for Tenney's own chromatic ratio set
from Figures 4 and 5, in pitch-class form, and takes the minimum.
Visually inspected. The envelope keeps twelve troughs, and the finding
is honest: 45/32 never touches the envelope. It is subsumed by 4/3 on
one side and 3/2 on the other, its parabola floating above the surface
the whole way. 9/5 barely survives, holding a narrow slot between 972
and 1013 cents. The model reproduces Tenney's doctrine without being
told it: tolerance is a competition, and complexity has to earn its
place.

## What sings

The lattice as a compositional instrument: Tenney turned tuning from a
list of ratios into a navigable space with a distance metric, which
means a piece can move through harmony the way a melody moves through
pitch. The containment cone (Figure 6) as a formal idea: everything
falling into one fundamental is a shape a listener can feel without
knowing any ratios. The clang as an analytical tool that survives the
death of the note: any parameter that changes over time can be the
formative one. The formative/cohesive split as a diagnostic for
generative work: check which knob glues and which knob shapes, and make
sure they are not the same knob.

The Leibniz letter of 1712, quoted in the tuning literature, reads like
a preface Tenney never wrote: "I do not believe that irrational ratios
are pleasing to the soul in themselves, except when they are very close
to the rational ones which give pleasure." Tolerance, three centuries
early, plus the prediction that music would eventually need the primes
11 and 13, which is Tenney's "extended harmonic spaces with higher
dimensions" in period dress.

## Overdone, and the avoid-list

Temperament treated as nature rather than as one projection of the
lattice. Complexity worship in tuning writing, where higher primes are
paraded as profundity without any perceptual claim. Diagrams that
decorate instead of compute: if the figure cannot be regenerated from a
definition, it is illustration, not theory. Added to the avoid-list:
the 12-TET grid drawn as if it were the territory; ratio lists with no
distance metric attached.

## Seeds (250-252)

Seeds 250-252 appended to FUTURE_PIECES.md.

## Next doorways

Tenney's Clang (1972), the remaining named Tenney doorway. The
Pierce/Mathews thirteenth-root-of-three work in full, named by the
Pierce study. Ervin Wilson's harmonic-space writings (combination
product sets, the anaphoria concept) as the lattice's other inventor.
Marc Sabat's "Three Tables for Bob" as the living notation. The
Wannamaker spectral-Tenney PDF, still unfetched, for For 12 Strings
(rising). Tierney/Patel/Breen 2018 in full and Deutsch's 2019 book
chapter 10, from the speech-to-song study. The WNYC RadioLab
perfect-pitch interview, still unwatched.

## Evidence

Re-renders and working files in
goals/generative-doodles-site/hidden_files/study-2026-09-29-tenney-tuning/.
