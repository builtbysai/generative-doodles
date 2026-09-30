# James Tenney / Clang (1972) - Deep Study Notes

**Date:** 2026-09-29 (study pass)
**Artist:** James Tenney (1934-2006). Composer, theorist, performer, teacher.
Bell Labs 1961-1964 with Max Mathews. This pass covers his first great
instrumental piece: the 1972 orchestral work that made him, in Wannamaker's
reading, the first North American spectralist, three years before Grisey's
Partiels.
**Hop path:** named by the Tenney For Ann, Tenney tuning-theory, Pierce,
and AMY studies, four times over. The piece is the doctrine of the tuning
theory turned into an orchestra.
**Depth:** deep on text plus two local procedural re-renders visually
inspected. Read: the Clang/Quintext passage of the Kalvos and Damian 1997
Toronto interview on eContact (first 166 of 390 lines: "based on the
harmonic series," "didn't dare to ask players in an orchestra to do very
much except kind of bend their pitches a little bit in certain
directions"), the opening of Assaf Shatil's Single Instrumental Gesture
essay (first 164 of 546 lines: SIG category 2, works where a continuous
shape is realized through the recurrence of one gesture), the full Clang
section of Wannamaker/Hasegawa "The Spectral Music of James Tenney" via
live-browser extraction (print pp. 94-98, endnotes 8-10, and the
Conclusions mention; score instructions quoted verbatim, pitch
collection, formal scheme, Figures 1 and 2 described in words), the
plainsound.org catalog entry (CLANG 1972, 12', orchestra), Sethares
"Relating Tuning and Timbre" opening (Mathews and Pierce on the
thirteenth root of three with odd-partial timbres), and the
Bohlen-Pierce conference account (Bohlen's 1972-73 thirteen-step organ,
Pierce's "P3579" recreation). Two local procedural re-renders built from the
published definitions and visually inspected: a 4:1 scale-model synthesis of
the available-pitch process (180 s, 16 players, prime-partial pitch set,
swell-fade tones, three percussive clangs, accumulative then dissolutive
arc, spectrogram and formal-scheme diagram), and a Plomp-Levelt dissonance
curve for an odd-harmonic timbre over the 3:1 tritave with 3^(n/13) steps.

**Honest gaps:** Wannamaker's Figures 1-2 known only from the browser
task's written description, not from my own pixels; no recording of Clang
heard (none found in session); the full score not read; no player count
established from the sources read; dissonance-curve re-render uses five
partials, so shallow dips are incomplete; WAV never auditioned.

## The piece, stated plainly

Clang is roughly fifteen and a half minutes (Wannamaker gives "roughly
15'30""; the Plainsound catalog lists 12'), for orchestra, based on the
harmonic series on E. The title is borrowed from Tenney's own temporal
gestalt perception research, but Wannamaker reads it here as more
onomatopoeic than technical. Three fortississimo percussive clangs frame
it: one to open,
one about two-thirds of the way through, one to close. Between the first
and second clang runs an accumulative process; between the second and
third, a dissolutive one. The second clang sits at the golden section.
Inside the processes, every sustained-tone player works the same tiny
ritual, quoted from the score: each player chooses, at random, one after
another of the available pitches (when within the range of his or her
instrument), and plays it beginning very softly (almost inaudibly),
gradually increasing the intensity to the dynamic level indicated for that
section, then gradually decreasing the intensity again to inaudibility.
After a pause at least as long as the previous tone, each player then
repeats this process.

That is the whole machine. Random choice of pitch, swell, fade, pause.
The piece is the accumulation and dissolution of that ritual across an
orchestra.

## The available-pitch process as generative method

Tenney called this, for the first time in his output, an "available pitch
process." Read it as an algorithm and it is shockingly modern:

1. A fixed menu of options (the pitch collection, below).
2. Each agent picks uniformly at random, with replacement, filtered by its
   own range.
3. Each event is a swell: 0 to the section dynamic level and back to 0.
4. A refractory pause at least as long as the event.
5. The only composed parameters are the menu, the section dynamic level,
   and the large-scale density curve.

The ritual has a name in Shatil's reading: a Single Instrumental Gesture
(piece category 2, a continuous shape realized through recurrence of one
gesture). Tenney's own word for the continuity it creates comes from the
early texts: similarity and proximity as the unifying forces, the clang
as a holarchy of inclusions rather than a hierarchy of power. The orchestra
never plays a melody, never develops a theme. It swells and fades, and the
form is only the density of that swelling. This is the "one-idea piece"
doctrine from the For Ann study, now carried by the full orchestra.

The indeterminacy is post-Cageian but not Cage's: Tenney does not care
about the local decisions (who plays what when) because he has decided
the global statistical shape. Wannamaker notes this is absent from the
European spectralists, who composed every note. Tenney composed the
distribution. For generative work this is the cleaner model: specify the
sampling process and the density curve, let the local events be random.

## The pitch collection: prime partials only

The available pitches are the first eight prime-numbered harmonics of E
(partials 2, 3, 5, 7, 11, 13, 17, 19) plus their octave equivalents,
octave-folded into one octave:

- 2 -> E (unison)
- 3 -> B (702 cents, the fifth)
- 5 -> G# (386 cents, the just major third)
- 7 -> D, 969 cents, 31 cents flat of D (approximated as a quartertone-flat D)
- 11 -> A, 551 cents, 51 cents sharp of A (quartertone-sharp A, one cent
  above the quartertone grid)
- 13 -> C, 841 cents, 41 cents sharp of C (quartertone-sharp C)
- 17 -> F, 105 cents (F)
- 19 -> G, 298 cents (G)

Eight pitch classes: E F G G# A(quarter-sharp) B C(quarter-sharp)
D(quarter-flat). A just-intoned octatonic scale. Figure 2 in Wannamaker's
article tabulates each harmonic's deviation from its quartertone
approximation in cents: F +5, G -2, G# -14, A-quarter-sharp +1, B +2,
C-quarter-sharp -9, D-quarter-flat +19. The odd, "out" partials 7, 11, and 13 are
notated as equal-tempered quartertones because Tenney would not ask an
orchestra for more precision than that. And the score is explicit that
great precision is obviously not expected: in fact, the beats resulting
from slight discrepancies from the actual ratios are welcomed as part of
the texture.

Technique notes for the palette-minded: this is a palette built by a
multiplicative rule (primes only) folded into a range. The restriction is
the identity. The slight detunings are not errors, they are the
roughness that makes the consonant field shimmer. And the approximation
strategy (quartertones for the hard partials) is a designed degradation:
use the coarse grid for what the fine grid cannot hold.

## Form: the golden-section hinge

Three clangs. Accumulative, then dissolutive. The second clang at two
thirds. The form is one swell with an asymmetric peak, the same shape as
a single player's tone writ large across the whole piece: soft, louder,
gone. Tenney's "swell" pieces (Koan, Swell) do this at the gesture level;
Clang does it at the section level. The hinge is not a climax, it is a
percussive marker that says: now the other direction. For generative
pieces this is a form worth stealing outright: no development, no
recapitulation, just accumulation then dissolution with a marked hinge,
and the hinge placed off-center so the piece leans.

The accumulative process starts from a single pitch class. The opening
clang is a unison of all the Es from E1 to E7, and the available gamut
then expands symmetrically above and below E4 in stages, like widening
the bandwidth of a bandpass filter so it passes more and more frequency
components. The orchestration is staged so the change is extraordinarily
smooth: instruments enter fractions of a choir at a time, the percussion
delayed to varying degrees, the timpani last. The score's intended
effect: a single continuous pitch with gradually changing timbre,
followed by a gradually expanding, quasi-random texture of changing
timbres and pitches. The result is what Wannamaker calls a churning ocean
of sound, with varied and haunting harmonic efflorescences rising out of
it.

The second clang is deliberately unlike the other two. Where the opening
and closing clangs are extreme consonances, the middle one is an extreme
dissonance: approximations to partials 1, 3, 17, and 11 of E, with
tempered B-flat accepted as the 11th partial, voiced as interlocking
tempered major sevenths and minor ninths. Its voicing is a symmetrical
cyclical stacking of semitone intervals, 7, 6, 5, 6, 7, 6, 5, 6, 7, 6, 5
from the bass, an alternation of interval classes 5 and 6. All sustaining
instruments fall silent for about three seconds in response, then
continue as before, and the dissolutive process begins.

The dissolutive half runs on what Wannamaker calls the conceptual
fundamental. At the second clang, every available pitch can be heard as a
harmonic of an infrasonic E-3; each stage of the dissolution then raises
that conceptual fundamental by an octave, and any pitch that cannot be
read as a harmonic of the new fundamental drops out of the available set.
The first to go are F1 and G1 (partials 17 and 19 of E-3); pitches in
pitch class E are treated specially and all are retained. The set is
weeded stage by stage until only the Es from E1 to E7 remain, at which
point the final clang reinforces and releases them. The texture grows
progressively less noiselike and more tonal, until the available pitches
are all harmonics of a single sounding tone. The large-scale trajectory
is a broad arc: from the simplicity of one tone, through a complex welter
of pitches and fleeting harmonic relationships, back to a unitary
percept by a different route.

The re-render confirms the shape reads: the 4:1 model's RMS rises
steadily from 0.067 to 0.185 across the first two thirds, the 2/3 clang
lands as the peak, and the last third falls to 0.080. The spectrogram
shows individual swell-fade tones as lens-shaped blobs, exactly the
"available pitch process" made visible.

## Publication and afterlife

Clang is published, but despite modest technical demands it never had a
concert premiere. It got a reading by the Los Angeles Philharmonic soon
after it was written, and a bootleg-quality cassette of that reading
survives. Near the end of his life, Tenney, guessing the indeterminate
aspects of the score had kept orchestras away, re-realized Clang's
accumulative and dissolutive processes in a conventionally notated
12-tone equal-tempered work, Panacousticon (2005) for orchestra. It
builds its opening cluster upward from the bass rather than outward from
the middle register and invents new kinds of clang events; the processes
are the same. Panacousticon was premiered in Munich in July 2007 by the
Bavarian Radio Symphony Orchestra.

One lineage note, from Wannamaker's endnote 10: Tenney's structural use
of the ascending conceptual fundamental in Clang predates its appearance
in the music of composers such as Gerard Grisey. Clang and Quintext, both
1972, are the earliest examples of paradigmatic spectral music in North
America.

## Hop 2: the thirteenth root of three (Mathews/Pierce, and Bohlen)

The Pierce study named the Pierce/Mathews thirteenth-root-of-three work as
its last open doorway, and it closes here. Sethares, in the opening of
"Relating Tuning and Timbre," reports that Mathews and Pierce examined a
scale with steps based on the thirteenth root of three (3^(1/13), 146.3
cents per step), designed to be played with timbres containing only odd
partials. The reasoning is the dissonance curve: for an odd-harmonic
timbre, the local consonance dips fall on the equal divisions of the 3:1
tritave, not the 2:1 octave. The "octave" of this world is the twelfth
plus a fifth.

Bohlen found the same scale independently a decade earlier, worked out
the just and equal-tempered versions on paper (chromatic and diatonic
forms, defect under 1 percent against 3^(n/13)), then built a thirteen-step
electronic organ in 1972-73 to hear it, the same year Tenney wrote Clang.
Pierce recreated Bohlen's scale and called it "P3579." The re-render
verifies the core claim from scratch: computing the Plomp-Levelt
dissonance curve for partials 1, 3, 5, 7, 9 over the interval range 1 to
3, the deep dips land within a few cents of the 3^(n/13) steps (434, 583,
733, 885, 1018, 1467, 1628 cents confirmed; steps 1 and 2 hide inside the
unison shoulder at this partial count, noted honestly).

The technique moral is the twin of Tenney's: consonance is not a property
of the scale, it is a property of the scale-timbre pair. Change the
partials and the same steps go from consonant to rough. For visual work:
the frame and the material must be designed together; a palette has no
harmony outside the structure it sits in.

## What makes it sing

- The single ritual. The whole orchestra doing the same swell-fade with random
  pitch choice is a texture no composed line can produce: statistically
  smooth, locally unpredictable.
- The menu is small and strange. Eight pitch classes, three of them
  quartertone-off, all derived from one multiplicative rule. Small menus
  with internal logic beat large menus with none.
- The hinge. One percussive event at the golden section turns a gradual
  process into a form you can remember.
- Beats as texture. Detune is not corrected, it is the shimmer. Design
  the tolerance, not just the target.
- The distribution, not the events. Tenney composes density and dynamics;
  the pitches and timings are sampled. This is the generative contract
  in its cleanest historical form.
- The dissonant hinge. The middle clang is the one extreme dissonance in
  a piece of extreme consonances, and it sits exactly on the structural
  joint. Contrast placed at the turn does double work.

## Avoid-list additions

- Process pieces that accumulate and dissolve symmetrically around the
  middle. The off-center hinge is the whole point.
- Random pitch choice over a menu with no internal relation (chromatic
  soup). The menu needs a generative rule.
- Hiding the process. Clang's score prints the ritual as instructions;
  the mechanism is legible. A process piece whose mechanism is invisible
  reads as arbitrary texture.

## Seeds

253. **Available Pitch Process**: from the score ritual (random choice
    from a menu, swell from inaudible to the section level, fade, pause
    at least as long as the tone): a piece where N agents each pick at
    random from a small fixed menu of marks, swell them in, fade them
    out, while density follows a 2/3 accumulative, 1/3 dissolutive arc
    with three percussive punctuations, the middle one at the golden
    section. Success: the viewer feels the hinge without being told
    where it is.
254. **Prime Partial Palette**: from the pitch collection (prime-numbered
    partials only, octave-folded, the hard ones quartertone-approximated):
    a generative palette where the only allowed hues are prime-numbered
    divisions of the spectrum folded into one wheel, with the awkward
    members snapped to the nearest coarse grid and their detune left
    audible as shimmer. Success: the restriction reads as an identity,
    not a limitation.
255. **The 3:1 Frame**: from the Pierce/Mathews scale (thirteen equal
    steps to the tritave for odd-partial timbres): a piece whose
    structure repeats at 3x instead of 2x, elements spaced at 3^(n/13),
    with the "home" interval a twelfth plus a fifth rather than an
    octave. Success: the piece feels self-consistent inside a frame the
    viewer never consciously notices.
