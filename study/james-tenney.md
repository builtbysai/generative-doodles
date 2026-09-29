# James Tenney / For Ann (rising) - Deep Study Notes

**Date:** 2026-09-29 (study pass)
**Artist:** James Tenney (1934-2006, Silver City NM). Composer, theorist,
performer, teacher. Bell Labs 1961-1964 with Max Mathews, inventing
computer music from the inside; trained pianist (Steuermann, Chou
Wen-Chung, Partch, Cage, Varese among his teachers); theorist of tuning
and perception (Meta (+) Hodos 1961, A History of Consonance and
Dissonance 1988). For Ann (rising), 1969, was his last piece of
electronic or computer music, and the calm center of an entire
compositional doctrine.
**Hop path:** the closing doorway of the Bell Labs circle, named by both
the Diana Deutsch / paradox catalog study and the Hal Alles / Alles
Machine study. Deutsch showed the listener brings the illusion to the
concert; Tenney built the illusion into the signal and then handed the
listening back to the listener. Mathews built the orchestra, Alles the
synthesizer, Risset the paradoxes, Deutsch the listening. Tenney asked
what a piece becomes when its form is fully determinate and its content
is your own perception.
**Depth:** deep on text plus visual inspection of published spectrograms
and two local procedural re-renders. The full Wikipedia entry read end to
end, the codehop Erbe writeup with its SuperCollider one-liner read end
to end, Tenney's own 1992 Ars Electronica note read end to end, the
François-Xavier Féron ICMC 2014 paper ("Could the endless progressions in
James Tenney's music be viewed as sonic koans?") read end to end in all
six pages including all five figures, and the Polansky UbuWeb liner notes
for the Postal Pieces read end to end (Koan, Swell Pieces, Beast, the
1978 Gayle Young interview). The paper's Figure 2 spectrograms of the
real piece (0-14000 Hz whole-piece and first-90-seconds views, Hanning
4096, Audiosculpt) visually inspected at full resolution, as were Figure
4 (Koan's dovetail geometry with open-string pitches G3 D4 A4 E5) and
Figure 5 (Marc Sabat's Koan recording spectrogram 0-5000 Hz with the D5
harmonic halo). Two local procedural re-renders visually inspected: a
60-second numpy synthesis of the piece per Erbe's specs rendered to WAV
and plotted as a log-frequency STFT spectrogram, plus a log-domain
structural diagram of the staggered voices.

**Honest gaps:** no audio auditioned (the 60 s WAV was verified
structurally via its spectrogram, never played); the original 1969 tape
realization read about, not heard (the reversed-piano attempt, the
Lafayette oscillator splice, the Risset computer-glissando plus tape
superimposition version, all from the ICMC paper); Tom Erbe's 1990s
single-process/Csound regeneration read about via the codehop writeup,
not via Erbe's own notes; the Wannamaker spectral-Tenney PDF failed to
fetch in-session (recorded, not retried), so For 12 Strings (rising) and
Clang specifics rest on the ICMC paper and Wikipedia; Koan, the Swell
Pieces, Beast, and the rest of the Postal Pieces read about, not heard.

## The thesis, stated plainly

Tenney's doctrine is the one-idea piece, stated as doctrine. After twenty
seconds you can predict the whole rest of it. That is not a limitation, it
is the composition. In his own words from the 1978 Gayle Young interview:
after the first twenty seconds the audience can almost determine what
will happen the whole rest of the time, and when they know that, they stop
sitting on the edge of their seats waiting for the big bang and begin to
listen to the sounds, get inside them, meditate on the shape. In the
Féron paper he says it even more plainly: "I'm interested in a form that
as soon as you've heard a couple of minutes of it, you get a pretty good
idea of what you're going to hear later. So you can sit back and relax and
get inside the sound."

The 1992 note gives the philosophical frame. For Ann (rising) was a
reaction away from the complexities of his earlier work and of New York
life in the sixties, a turning inward in which old dichotomies start to
dissolve when carried to an extreme: continuity versus discontinuity,
determinacy versus indeterminacy. In life, nothing is truly determinate
but the past, and the future is indeterminacy. But music can suspend the
indeterminate character of the future for a while, thereby suspending
anticipation, surprise, and thus drama, leaving nothing to be concerned
with but the present. The present, in For Ann (rising) and the Koans, is
microvariations in the sounds themselves, made more perceptible by the
determinate forms, plus the listener's internal subjective processes. "The
music is IN YOU."

The doctrine has a name in his later writing: ergodic structure, where any
given temporal slice is equally likely to have the same statistical
characteristics as any other slice. The piece lays out all its elements at
the start, and then nothing new happens for twelve minutes. The art is
what the ear does in the meantime. This is Deutsch's stimulus program
pushed one step further: not only is the audience the renderer, the score
is a single sentence and the entire musical content is the rendering.

## The machinery, technique by technique

**The stagger (the piece in one paragraph of numbers).** Erbe's
regeneration, per Tenney's specs, is 240 sine-wave sweeps. Each sweep runs
33.6 seconds, from 40 Hz to 10240 Hz, exactly 8 octaves at 4.2 seconds
per octave, with a trapezoidal envelope: 8.4 seconds in, 16.8 seconds
sustain, 8.4 seconds out. A new sweep starts every 2.8 seconds. Since
33.6 / 2.8 = 12, there are always 12 voices sounding (spectral analysis
in the ICMC paper counts about 13). The 2.8-second stagger is chosen so
each new voice enters a minor sixth below the voice born just before it:
in 2.8 seconds the older voice has risen 8 semitones, since the rate is
12 semitones per 4.2 seconds. The codehop writeup compresses the whole
piece into a SuperCollider one-liner (Env.new([40,10240],[33.6],\exp),
Env.linen(8.4,16.8,8.4), 240 voices, 2.8.wait), which is the sound of a
twelve-minute piece fitting in a tweet.

**The dovetail.** The fades are the seam of the illusion. The 8.4-second
attack and release sit at the extreme ends of each sweep's range, where
the ear is least sensitive (the very bottom near 40 Hz, the very top near
10 kHz), so voices enter and leave imperceptibly. Nobody counts the
voices. Philip Corner's quoted question in the paper, how many voices can
be heard at any time and how many voices are there, has no perceptual
answer; the analysis shows twelve or thirteen, and the listener cannot
detect a single extinction. The same principle, acoustic: Koan (1971,
postal piece for violinist Malcolm Goldstein) is a miniature For Ann
(rising), a perpetually ascending tremolando double-stop where continuity
is achieved by dovetailing the glissandi on adjacent strings. Figure 4 of
the paper draws the geometry: the low string rises toward the open string
below the next pair before the next pair starts, bars 1 through 7, until
the final ascent toward E6 is handed to a general fade-out and a timbre
transition ("gradually move toward bridge, until nothing but noise is
heard"). Dovetail is the verb of Tenney's mature music: Swell Piece
(1967, for Alison Knowles) is the swell idea in its simplest form, and
Swell Piece #2 and #3 (1971, for Pauline Oliveros and La Monte Young) are
lemmas on the same theorem. The fade is never decoration. It is the
device that makes the infinite continuable.

**The golden-ratio regeneration.** In later years Tenney suggested the
piece could be "regenerated" with the inter-voice distance, the minor
sixth, tuned to phi (1.618) instead of 1.6 (just) or 1.587 (equal
tempered). The reason is difference tones. The first-order difference
tone of two voices at ratio r is (r - 1) times the lower frequency. With
r = phi, phi - 1 = 1/phi, so the difference tone of two adjacent voices
is the lower voice divided by phi: exactly where a lower voice of the
same ladder would sit. The byproducts of the piece fold back into the
piece. With a minor sixth the difference tones fall between the voices
and smear the illusion; with phi they reinforce it, which is why he said
it would be "more illusory." For a generative artist this is a design
principle with a name: let the combination products of your system land
inside your system's own grid. Make the residue a voice.

**The genesis, via the paper.** The ICMC paper reconstructs three
attempts. First, Tenney recorded himself playing a descending chromatic
scale on piano with the tonal pedal down, played the tape backwards to
get a rising scale with erased attacks: "That was a mess and it was noisy,
and it wasn't smooth enough." Second, a Lafayette oscillator, but the
range needed switching, so two segments were spliced. Third, he asked
Risset to generate one slow computer glissando, which he superimposed with
tape techniques, but "due to a tiny imprecision, the harmonic character
of the set of pitches was slightly different at the end than it was at
the beginning." Finally he asked Tom Erbe to regenerate the whole piece
in a single process, which became the Csound version on Selected Works
1961-1969. The paper's honest footnote: spectral analysis shows the
recorded regeneration actually sweeps about 25 Hz to 14300 Hz over 37.8
seconds (a 9-octave sweep), not the 33.6-second 8-octave spec. Even the
canonical version drifts from its own numbers. The perception is the
spec.

**Koan's harmonic halos.** Figure 5 of the paper, the spectrogram of Marc
Sabat's Koan recording, shows what happens when the one idea meets real
strings: harmonics of the two tremolo tones intersect and produce
complex beats and unnoted combination tones, like a "halo of sound"
around D5 where the G3 third harmonic and the D4 second harmonic meet and
drift. The score is one ascending double-stop; the sound is full of
things the notation does not contain. Beast (1971, for bassist Buell
Neidlinger) works the same seam deliberately: two bowed strings slowly
changing intonation, the piece's content is the slow beats between them,
structured on the Fibonacci sequence (four humps of 1, 1, 2, 3 minutes),
straddling the 16-20 Hz line where beats fuse into pitch. Tenney's
interest was always the psychoacoustic residue, not the written tones.

**For 12 Strings (rising) (1971).** The orchestra-side thread. Scored for
2 double basses, 3 cellos, 3 violas, 4 violins, each player an upwards
glissando ostinato, parts dovetailed in pitch and dynamics to give an
ensemble gliding more than five octaves, F1 to A6, in tempered minor
sixths. Per Wannamaker, via the ICMC paper, an early example of spectral
music: the orchestra used to render an evolving spectrum, not melodies.
It has never been performed, so the audible effect cannot be reliably
assessed. That is a real gap in the record and worth saying: the most
ambitious version of the idea exists only as a score.

## What sings

The proportion of means to ends. One process (the stagger), one seam
(the dovetail), one illusion (endless rising), and everything else, the
twelve minutes, the golden-ratio idea, the string orchestra, the violin
miniature, follows from sitting with that one sentence long enough. The
SuperCollider one-liner is the review copy: a piece that complex in
perception can be that short in code is a piece whose complexity is
correctly placed.

The other thing that sings is the 1992 note's present tense. The
generative contract in this project is usually novelty: new forms, new
surprises. Tenney inverts it. Maximum predictability is the instrument
that turns listening inward. "After they have heard the first twenty
seconds they can almost determine what will happen the whole rest of the
time. When they know that is the case, they do not have to worry about
it anymore." That sentence is a usable design rule for any piece that
wants attention on texture instead of plot.

## What is overdone (avoid-list additions)

- Barber-pole slop. Endless-rise illusions only work at constant velocity
in the perceptual domain. Tenney's sweep is exponential in frequency,
which is constant in log frequency, which is constant in perceived
pitch. A naive linear-position barber pole, or a drift whose speed
wobbles, reads as machinery, not infinity. The fade zones must sit at
the perceptual extremes, where the sensor is least sensitive, or the
seam shows.
- Fetishizing the parameters. The spec says 33.6 seconds and 8 octaves;
the actual canonical recording runs 37.8 seconds over 9 octaves. The
numbers serve the illusion; the illusion does not serve the numbers.
- Explaining before experiencing. Same note as Deutsch: the illusion
lands when the listener commits to a judgment first. The ICMC paper's
spectrograms are the reveal after the listening, not the listening.
- Calling it a Shepard tone demo. The technology is the doorway, not the
piece. The piece is the thesis: suspend drama, get inside the sound.

## Technique seeds for the practice

Seeds 232-234 in FUTURE_PIECES.md. The throughline: one fully stated
process, seams hidden by fades at the perceptual extremes, and a form so
predictable the viewer stops watching for plot and starts watching for
texture. The dovetail is a loop-making device, the phi ladder is a rule
for folding system residue back into the system, and the ergodic slice
means any window of the piece is the piece.

**Honest depth mark:** deep. Primary texts read end to end (Tenney's 1992
note, the ICMC 2014 paper in full with all figures inspected at full
resolution, Polansky's Postal Pieces liners, the codehop Erbe writeup,
the Wikipedia entry), two local procedural re-renders visually inspected
(60-second numpy synthesis per Erbe's specs to WAV with log-frequency
STFT spectrogram, plus the log-domain stagger diagram), specs verified
numerically (12 simultaneous voices exactly, 8 semitones at birth).
Audio never auditioned; the 1969 tape attempts and Erbe's regeneration
known from descriptions; the Wannamaker PDF unreachable in-session.
