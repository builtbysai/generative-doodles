# Marc Sabat / Three Tables for Bob - Deep Study Notes

**Date:** 2026-09-30 (study pass)
**Artist:** Marc Sabat (b. 1965). Canadian composer, based in Berlin,
co-developer with Wolfgang von Schweinitz of the Helmholtz-Ellis JI
pitch notation. This pass covers his 2016 TEMPO article "Three Tables
for Bob," written for Bob Gilmore: a practical manual for tuning and
notating just intonation, built as three lookup tables.
**Hop path:** named by the 2026-09-29 Tenney tuning-theory study's
next-doorways (Helmholtz-Ellis notation, Sabat, Schweinitz). It is also
the notation system Tenney's late music is written in, so it closes the
loop the Tenney studies opened: the theory had a geometry (the lattice),
and Sabat's tables are its street map.
**Depth:** deep on text plus visual inspection and local re-derivation.
The full 20-page PDF read end to end, page 20 rendered and visually
inspected (the 53-comma Table 3 figure, the only page whose text layer
was image-only). Two local procedural re-renders built from the paper's
own data and visually inspected: the Table 2b proximity ladder (all 19
enharmonic proximities recomputed and confirmed) and the 53-comma octave
strip. A reverse-lookup search implemented from Sabat's described method
and tested against textbook and Sabat ratios.

**Honest gaps:** Table 3 itself (the full 53-region ratio chart) was
seen only on page 20, not transcribed; its garbled text layer was not
fully recoverable. Sabat's method was re-derived on clean samples, not
by re-running his whole table. No HE-notation score was read in this
pass beyond the paper's examples. No audio auditioned.

## What the article is

A working musician's manual in three parts, addressed to performers who
need to tune just intervals by ear and composers who need to notate
them. Table 1: a well-temperament for keyboards and fretted instruments,
twelve exact ratios plus the octave, tuned so every fifth is close to
pure except one diminished fifth (D to Ab) that absorbs the whole
Pythagorean comma via the prime 577. Table 2: the Helmholtz-Ellis
accidentals, i.e. the complete sign system for prime-by-prime tuning
offsets, with a table of the 19 primary 23-limit enharmonic
proximities. Table 3: a reverse lookup. Given a cents value, find the
simplest ratio: the octave divided into 53 comma regions, each region
listing the tuneable 23-limit ratios that live there, with
Helmholtz-Ellis spellings reduced to at most two accidentals.

## Table 1: the well-temperament with one comma-eater

The temperament is Pythagorean at heart, then adjusted. The chromatic
steps use high-prime ratios that sit near 12-tone equal temperament:
Db is 18/17 (99.0c, paper says 99), Bb is 19/18 (93.6c, paper says 94),
and the 16:17 semitone is 105c. The masterstroke is the diminished
fifth D-Ab: instead of spreading the Pythagorean comma across the
fifths, Sabat tunes eleven fifths near-pure and lets one interval eat
the entire comma by introducing the prime 577, making D-Ab =
600.003c, three-thousandths of a cent from a perfect tritone. The
prose claims check out exactly: 16:17 = 104.96c, 17:18 = 98.95c,
18:19 = 93.60c, 577:576 = 3.00c.

The compositional lesson is architectural: when a system cannot close,
do not distribute the error evenly. Concentrate it in one place you can
name. Twelve-tone equal temperament spreads the comma everywhere and
hides it; Sabat puts it all in one interval and marks it with a prime.
For generative systems with an irreducible inconsistency (a tiling that
almost closes, a palette that almost harmonizes), the elegant move is
the marked seam, not the invisible fudge.

## Table 2: Helmholtz-Ellis accidentals, verified

HE notation extends the staff with microtonal accidentals, one per
prime: arrows for 3-limit (Pythagorean) adjustments, and dedicated
signs for 5 (syntonic comma), 7, 11, 13, 17, 19, 23. Sabat's Table 2a
lays them on the 5-limit Euler lattice against the 53-tone Pythagorean
spine; Table 2b lists the 19 primary 23-limit enharmonic proximities,
the small commas by which enharmonic spellings differ. Every one of the
19 cents values was recomputed in this pass from the published ratios:
all match within 0.05c, worst case 0.046c. The ladder runs from 0.4c
(4374:4375, 4095:4096) up to 7.7c (224:225), every entry far below the
21.5c syntonic comma. These are the tolerances a performer navigates:
the notation's job is to make each of these distinctions writable and
therefore tunable.

## Table 3: the reverse lookup, and what it really is

Table 3 is the most original object in the article: a cents-to-ratio
dictionary. The octave is cut into 53 comma-sized regions (5 wholetones
of 9 commas, 2 limmas of 4 commas, apotome of 5 commas; the two limmas
hold the 4.2c schisma seam where the Pythagorean chain does not quite
close). For each region, the table lists the simplest tuneable ratios
that fall there, spelled in HE notation with at most two accidentals,
so a musician with a cents readout can find the nearest singable ratio.

A simplicity-ordered search was implemented in this pass to test
Sabat's method: for a target cents value, find the 23-limit ratio
nearby minimizing Tenney's harmonic distance. It recovers 1/1, 9/8,
5/4, 4/3, and 3/2 exactly. But it does not recover Sabat's 18/17 or
19/18, and it answers 577/576's 3.0c target with 1/1. That failure is
the finding: Sabat's tables are not the output of a pure simplicity
sort. His picks are constrained by the musical system around them (the
Pythagorean spine, the well-temperament's closure, the prime-577 fifth).
Simplicity is the ranking; the system is the filter. A reverse lookup
that ignores the system returns correct ratios that are musically
wrong.

## Lessons for generative visual work

1. **Mark the seam.** Sabat's comma-eater fifth is a general principle:
   when a parametric system cannot close, concentrate the error in one
   named place instead of smearing it. A visible, deliberate seam reads
   as craft; an invisible distributed fudge reads as sloppiness once
   found.

2. **Reverse lookups beat forward tables.** Table 3 inverts the usual
   reference: instead of ratio -> cents, it is cents -> simplest ratio.
   For generative tools, build the inverse index too: given a color,
   the nearest palette entry; given a position, the nearest grid point;
   given a duration, the nearest rhythmic value. The forward table
   serves the author; the reverse table serves the performer.

3. **Tolerance is a design material.** The 19 proximities from 0.4c to
   7.7c are all below the threshold of the syntonic comma, yet each is
   notated distinctly because performers can hear them. The visual
   analogue: differences below the obvious threshold (a few pixels, a
   few percent of saturation) are still perceivable in context. Notate
   them anyway; the eye, like the ear, resolves more than the spec
   sheet admits.

4. **Systems filter simplicity.** The reverse-lookup experiment showed
   that the globally simplest answer is often not the right one; the
   surrounding system (spine, closure, convention) overrules it. In
   generative work, a global optimizer (simplest, shortest, most even)
   needs the same kind of filter: local rules that veto the optimum
   when it breaks the system's grammar.

5. **53 as a working resolution.** The 53-comma octave is not mystical;
   it is the resolution at which the Pythagorean chain usefully closes
   for human purposes. Every generative system needs its working
   resolution: fine enough that the important distinctions survive,
   coarse enough that the lookup stays human-usable. 53 divisions of the
   octave is Sabat's answer to that tradeoff.

## What makes it sing

The article's voice. Sabat writes like a musician talking to musicians:
"a C# that is 4 cents flat of the piano's C# is not a wrong note, it is
a different note." The tables are exact, but the prose keeps saying the
tables are a means, not an end. The rigor serves the ear, never the
other way around.

## What is overdone / avoid

Table 3's density is its own warning: 53 regions, each with a stack of
ratios and multi-accidental spellings, is at the edge of what a human
can use in real time. Sabat knows this and caps spellings at two
accidentals, but the table still reads as a reference work, not a
performance tool. The avoid-list: do not build a lookup system so
complete that nobody looks anything up. Completeness is for the
archive; the working tool is the subset.

## Sources

- Sabat, Marc. "Three Tables for Bob." TEMPO 70/278, October 2016.
  http://masa.plainsound.org/pdfs/3Tables.pdf
- Tenney, James. "John Cage and the Theory of Harmony" (1983), figures
  transcribed by Sabat and von Schweinitz (context for HE notation's
  origins in Tenney's lattice thinking).

## Evidence

Private evidence folder (not published):
~/workspace/goals/generative-doodles-site/hidden_files/study-2026-09-30-spectral-canon/
Contains the Three Tables PDF, rerender_sabat.py, the two inspected
Sabat frames, and the verification output.
