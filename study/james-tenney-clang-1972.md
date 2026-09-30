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
inspected. Read end to end: Kalvos and Damian 1997 Toronto interview on
eContact (the Clang/Quintext passage: "based on the harmonic series," "didn't
dare to ask players in an orchestra to do very much except kind of bend their
pitches a little bit in certain directions"), Assaf Shatil's Single Instrumental
Gesture essay (SIG category 2: works where a continuous shape is realized
through the recurrence of one gesture; Pre-Meta+Hodos prose; Meta+Hodos
holarchy correction), Wannamaker/Hasegawa "The Spectral Music of James
Tenney" via its searchable full text (score instructions quoted verbatim,
pitch collection, formal scheme; Figure 1 and Figure 2 descriptions pending
live-browser read), the plainsound.org catalog entry (CLANG 1972, 12',
orchestra), Sethares "Relating Tuning and Timbre" opening (Mathews and
Pierce on the thirteenth root of three with odd-partial timbres), and the
Bohlen-Pierce conference account (Bohlen's 1972-73 thirteen-step organ,
Pierce's "P3579" recreation). Two local procedural re-renders built from the
published definitions and visually inspected: a 60:1 scale-model synthesis of
the available-pitch process (180 s, 16 players, prime-partial pitch set,
swell-fade tones, three percussive clangs, accumulative then dissolutive
arc, spectrogram and formal-scheme diagram), and a Plomp-Levelt dissonance
curve for an odd-harmonic timbre over the 3:1 tritave with 3^(n/13) steps.

**Honest gaps:** Wannamaker's Figures 1-2 seen only via the browser task's
description, not my own pixels; no recording of Clang heard (none found in
session); the full score not read; the 15-30 minute duration in the
article's OCR versus the catalog's 12' left unresolved; dissonance-curve
re-render uses five partials, so shallow dips are incomplete; WAV never
auditioned.

## The piece, stated plainly

Clang is twelve minutes (catalog) for orchestra, based on the harmonic
series on E. Three fortississimo percussive clangs frame it: one to open,
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
doctrine from the For Ann study, now carried by eighty people.

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
- 11 -> A, 551 cents, 49 cents flat of A (quartertone-flat A)
- 13 -> C, 841 cents, 41 cents sharp of C (quartertone-sharp C)
- 17 -> F, 105 cents (F)
- 19 -> G, 298 cents (G)

Eight pitch classes: E F G G# A(quarter-flat) B C(quarter-sharp) D(quarter-flat).
A just-intoned octatonic scale. The odd, "out" partials 7, 11, and 13 are
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
a single player's tone writ large across twelve minutes: soft, louder,
gone. Tenney's "swell" pieces (Koan, Swell) do this at the gesture level;
Clang does it at the section level. The hinge is not a climax, it is a
percussive marker that says: now the other direction. For generative
pieces this is a form worth stealing outright: no development, no
recapitulation, just accumulation then dissolution with a marked hinge,
and the hinge placed off-center so the piece leans.

The re-render confirms the shape reads: the 60:1 model's RMS rises
steadily from 0.067 to 0.185 across the first two thirds, the 2/3 clang
lands as the peak, and the last third falls to 0.080. The spectrogram
shows individual swell-fade tones as lens-shaped blobs, exactly the
"available pitch process" made visible.

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

- The single ritual. Eighty players doing the same swell-fade with random
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
