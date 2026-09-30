# James Tenney / Spectral CANON for CONLON Nancarrow - Deep Study Notes

**Date:** 2026-09-30 (study pass)
**Artist:** James Tenney (1934-2006). Composer, theorist, performer, teacher.
This pass covers his 1974 player-piano piece Spectral CANON for CONLON
Nancarrow, the purest realization of Tenney's pitch-rhythm analogy: a
canon in which harmonic pitch proportions become temporal proportions,
played on a piano retuned to the harmonic series itself.
**Hop path:** named by the 2026-09-29 Tenney tuning-theory study's
next-doorways (Spectral CANON, pitch-rhythm analogues, Nancarrow). The
doorway sat there for one day before being taken. Also named by the
Quintext study, which shares the dedication logic: pieces written as
gifts for the composers who formed Tenney's thinking.
**Depth:** deep on text plus full local reconstruction. Charles de Paiva
Santana, Jean Bresson, and Moreno Andreatta's SMC 2013 paper "Modeling
and Simulation: The Spectral CANON for CONLON Nancarrow by James Tenney"
read end to end (8 pages), the IRCAM Music Representations page on the
piece read end to end, four figures from that page downloaded and
visually inspected (canonic-entry diagrams, the durational-series
derivation, Cowell's Rhythmicon sketch), Robert Wannamaker's "The
Spectral Music of James Tenney" consulted in indexed search snippets
(the full PDF would not download), the plainsound.org work chronology
and IRCAM work catalog consulted for dating. Five local procedural
re-renders built from the paper's own formulas and visually inspected:
the full 24-voice onset map, the 140-second entry zoom, the linear
accelerando curve, the Rhythmicon spectrogram, the attack-density arch.
Two WAV files synthesized (a 55 Hz x 24 partial Rhythmicon demo and the
canon's final 40 seconds), structurally inspected via spectrogram, not
auditioned by ear.

**Honest gaps:** the Wannamaker PDF could not be downloaded (server-side
failure, three attempts); its argument was recovered only through search
index snippets. No score of the piece itself was consulted. No audio was
auditioned; the WAVs were checked as spectrograms. The Nancarrow roll
was not seen. Three of the seven IRCAM figures could not be downloaded
intact (server truncated the PNGs); the four that survived were enough
to confirm the paper's claims. De Paiva's OpenMusic patch itself was
not run; the reconstruction was rebuilt from the published formulas.

## What the piece is, concretely

Player piano, composed 1972-1974, roll realized in 1974 with Gordon
Mumma punching assistance from Conlon Nancarrow himself, who hand-punched
the final roll. The piano is retuned so its keys sound the first 24
harmonics of A1. There are 24 voices. Each voice repeats one partial,
over and over. Voice 1 plays A1 (partial 1), voice 2 plays A2, voice 3
plays E3, and so on up the series to partial 24.

Every voice runs through the same decreasing duration series:

    duration(n) = k * log2((8+n)/(7+n))

with k = 4 / log2(9/8) = 23.5398 seconds, so the first duration is
exactly 4 seconds. Read that formula slowly: each step is the log of a
superparticular ratio, the temporal analogue of stacking harmonic
intervals. A "durational major second" (the 9:8 of time) is the unit,
and k scales it to 4 seconds.

Voice entries are canonic. Each new voice enters after eight durations
of voice 1, so voice j enters at the accumulated time of 8(j-1)
durations. Because the series is built from logs, that accumulated time
has a closed form: entry_j = k * log2(j). Voice 2 enters at 23.54 s,
voice 4 at 47.08 s, voice 8 at 70.62 s, voice 24 at 107.93 s. The
24th voice enters after 184 durations, and each voice appends the whole
series in retrograde. The original version ends where voice 1 finishes
its retrograde and voice 24 finishes its forward series: all 24 voices
attack in total synchronism at t = 215.86 s. The local reconstruction
confirmed this synchronism exactly, to floating-point precision.

## The 184 vs 185 discrepancy, resolved

The sources disagree on the length of the series. The IRCAM web page
says 185 duration elements and 186 attacks; the SMC paper says 184
durations and builds its entries on 8 x 23 = 184. The reconstruction
settled it functionally: with 184 elements the final synchronism is
exact (every voice lands on the same attack at 215.86 s), the series
total is exactly k * log2(24) = 107.93 s, and the last duration is
177.3 ms against the paper's reported ~176 ms. With 184 elements the
piece is a closed, self-consistent mechanism. The discrepancy is noted
honestly rather than silently chosen: the web page's 185 may count the
initial attack as an element, an off-by-one between "durations" and
"attacks."

## Why the acceleration feels natural

De Paiva's paper calls the series "an exceptionally natural and almost
unperceived accelerando," and the reconstruction shows why. Instantaneous
tempo is 60/duration(n), and duration(n) is k * log2(1 + 1/(7+n)), which
for large n is approximately k / ((7+n) * ln 2). So the tempo is
essentially linear in n: a straight-line ramp from 15 attacks per minute
to 338 attacks per minute. The log-of-superparticular construction,
which sounds abstract, produces the most perceptually neutral
accelerando possible: a constant rate of tempo increase. Tenney did not
tune the curve by ear. The curve tuned itself.

The perceptual findings from the modeling study matter for visual work.
De Paiva tested variants: starting the series from 2:1 instead of 9:8
made the opening more chordal; keeping 9:8 but narrowing the ambitus
lost timbral richness; the 3-6 second opening-duration region is the
viable zone, with 4 seconds near ideal. The lesson: the first value of a
parametric series sets the perceptual frame for everything after it,
and "ideal" is findable by testing the neighborhood, not by theory.

## The Rhythmicon connection

Cowell's Rhythmicon (1931) is the acknowledged ancestor: periodicities
in the ratios of the harmonic series, so that pitch and rhythm are the
same structure heard two ways. The IRCAM page's Cowell sketch shows the
idea, and the local Rhythmicon demo (55 Hz fundamental x 24 partials,
one note per partial per period) renders the classic symmetric parabola
in the spectrogram: descending glissandi mirrored by ascending ones as
each partial's attack train sweeps past the others. In Spectral CANON,
Tenney inverts the emphasis. Cowell used the series to make rhythm from
pitch. Tenney uses rhythm to make pitch audible as structure: the
retuned piano makes every attack a partial, so the accelerating
polyrhythm is literally the harmonic series happening in time.

## Coda: Three Harmonic Studies, III (1974)

The same year's companion experiment, for small orchestra. Each player
sounds just one pitch; the score's staves are ordered by pitch height.
Wannamaker's analysis describes harmonic and subharmonic series
"palimpsestically inscribed" as local pitch structure, local rhythmic
structure, global pitch structure, and global rhythmic structure, with
divisive polyrhythms in the harmonic tempo series 1:2:3:...:12
undergoing a general ritardando. Where Spectral CANON maps the harmonic
series onto durations in a closed canon, Three Harmonic Studies III maps
the harmonic series onto orchestral tempi in an open texture. Same
doctrine, two media. A small local re-render of the 1:2:...:12
polyrhythm lattice would be the honest next step; it was not built in
this pass.

## Lessons for generative visual work

1. **One series, two domains.** The whole piece is a single function
   (log of superparticular ratios) read as pitch in one instrument and
   as duration in the score. The visual analogue: one parametric curve
   driving both geometry and timing, so the eye feels the same structure
   twice. This is stronger than mapping data to visuals; it is the same
   math wearing two materials.

2. **The canon as a scheduling primitive.** Entry_j = k * log2(j) is a
   closed-form entry schedule. No timeline editing, no hand-placed
   cues: 24 voices placed by one equation, and the ending (total
   synchronism) falls out for free. For visual canons, prefer entry
   rules that guarantee their own endings.

3. **Linearize through logs.** If you want a constant perceived rate of
   change, put the log inside the series, not outside. Tenney's
   accelerando is linear in tempo because the durations are logarithmic
   in superparticular ratios. For animation easing, the equivalent move
   is choosing the parameterization whose perceptual derivative is
   constant, then letting the visible curve be whatever it is.

4. **Retrograde as closure.** Each voice appends the series backwards,
   so the piece is an arch: acceleration mirrored into deceleration,
   ending in unison. Palindromic structure is the cheapest way to make a
   generative piece feel composed rather than merely running.

5. **The first value is the frame.** De Paiva's 3-6 second finding: the
   opening parameter is a perceptual commitment. In visual parametric
   work, test the neighborhood of the initial value; the "ideal" is
   empirical.

6. **Density has a fusion point.** The attack-density arch peaks near 88
   attacks per second around t = 205 s, then the texture fuses: discrete
   attacks become a continuous band. Every accelerating visual process
   has the same threshold where dots become tone. Decide deliberately
   whether the piece ends before, at, or past fusion.

## What makes it sing

The ending. 216 seconds of strictly mechanical process, and the
mechanics guarantee that 24 independent accelerating voices land on one
simultaneous attack. The total synchronism is not conducted; it is
proved. There is a particular beauty in a structure whose most dramatic
moment is a theorem.

## What is overdone / avoid

The closed form is the whole piece, which is also its limit: once you
have seen the mechanism, there is nothing left to hear that the formula
did not already say. The SMC paper's variants (harmonic-series
distortion, filtering) are analytical toys, not improvements, and they
read as such. The avoid-list for generative work: do not mistake a
beautiful invariant for a beautiful piece. Tenney gets away with it
because the invariant is genuinely beautiful and the retuned piano
makes it sensuous. A visual piece built on one equation needs the same
two things: an invariant worth contemplating, and a material that makes
contemplation pleasurable.

## Sources

- Santana, de Paiva; Bresson, Jean; Andreatta, Moreno. "Modeling and
  Simulation: The Spectral CANON for CONLON Nancarrow by James Tenney."
  SMC 2013. https://hal.science/hal-01170066v1/file/santana-smc13.pdf
- IRCAM Music Representations: Spectral CANON for Conlon Nancarrow.
  http://repmus.ircam.fr/depaiva/spectralcanon
- Wannamaker, Robert. "The Spectral Music of James Tenney." Contemporary
  Music Review. https://lit.gfax.ch/The%20Spectral%20Music%20of%20James%20Tenney.pdf
  (unreachable in this pass; consulted via search index)
- James Tenney work chronology. https://plainsound.org/pdfs/JTcatalog.pdf
- IRCAM works by date: James Tenney.
  https://ressources.ircam.fr/en/composer/james-tenney/worksByDate

## Evidence

Private evidence folder (not published):
~/workspace/goals/generative-doodles-site/hidden_files/study-2026-09-30-spectral-canon/
Contains the SMC paper PDF, Sabat's Three Tables PDF, the four
recovered IRCAM figures, rerender_canon.py and rerender_sabat.py, five
inspected CANON frames, two Sabat frames, and two synthesized WAVs.
