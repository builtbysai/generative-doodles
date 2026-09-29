# Diana Deutsch / The Speech-to-Song Illusion - Deep Study Notes

**Date:** 2026-09-29 (study pass)
**Artist:** Diana Deutsch (born 1938, London). Professor of Psychology at
UC San Diego. This pass is a single-illusion deep dive, following the hop
explicitly named by the 2026-09-29 Diana Deutsch study. The earlier
`diana-deutsch.md` note covers the paradox catalog at large; this one
stays inside one illusion and reads it the way Deutsch presents it: as a
demonstration with a score, an experiment, and a punchline.
**Hop path:** the Diana Deutsch study named the speech-to-song illusion as
the next doorway, the one illusion in her catalog that turns a listener
into a singer without changing a single sample of sound.
**Depth:** deep on text plus visual inspection of figures and a local
re-render of the technique. Her official speech-to-song page read end to
end; the Deutsch, Henthorn, and Lapidis 2011 JASA paper read substantially
end to end; the Tierney, Dick, Deutsch, and Sereno 2012 Cerebral Cortex
paper read substantially; the Tierney, Patel, and Breen 2018 abstract and
institutional page excerpts read. All six figures on her page downloaded
and visually inspected at full resolution (the notation figure, the two
judgment graphs, the two pitch-comparison plots). A local re-render of the
stimulus was synthesized and its pitch structure verified (see below).

**Honest gaps:** no audio auditioned (no speakers in-session; the demo WAV
was verified structurally via F0 tracking, not heard); Deutsch's original
recording not heard, so syllable timing, absolute pitch, and formants in
the re-render are reconstructed from the paper's parameters; the JASA PDF
text extraction garbled minus signs in the printed interval sequence,
corrected by cross-reading the notation figure against the red curves of
Figures 4 and 5 (documented in the re-render script); Tierney, Patel, and
Breen 2018 read from abstract and excerpts, not the full text; the WNYC
RadioLab interview and the fifth-graders video noted but not watched.

## The thesis, stated plainly

The boundary between speech and song is drawn by the listener, not the
signal. Deutsch's formulation: the brain normally suppresses musical
information when it decides it is hearing speech, and exact repetition
lifts that suppression. Nothing in the sound changes across ten
repetitions; what changes is the mode of listening. The illusion is
therefore not a trick played on the ear but a demonstration that the ear
has two rendering pipelines for the same input, and that the switch
between them can be thrown by the cheapest possible operation: playing the
thing again, exactly.

## The discovery and the demonstration

In 1995 Deutsch was fine-tuning the spoken commentary on her CD
*Musical Illusions and Paradoxes* when the phrase "sometimes behave so
strangely" came around on a loop and turned into song. The full sentence
it sits in: "The sounds as they appear to you are not only different from
those that are really present, but they sometimes behave so strangely as
to seem quite impossible."

The classic demonstration, as staged on her page and the 2003 CD
*Phantom Words and Other Curiosities*, has a three-part structure worth
studying as composition:

1. The full sentence, heard as ordinary speech.
2. The embedded phrase, "sometimes behave so strangely," repeated ten
   times in isolation.
3. The full sentence again, unchanged. The phrase that was repeated now
   "bursts into song" inside the otherwise identical sentence.

The third step is the masterstroke. The sentence in step 3 is physically
identical to step 1, but the listener hears it differently. The piece is
a palindrome with a changed listener, and the reveal is composed, not
accidental.

## The experiments (Deutsch, Henthorn, and Lapidis, 2011)

Experiment I tested whether the transformation survives perturbation.
Fifty-four musically trained subjects in three groups of eighteen heard
the full sentence, then ten presentations of the phrase with 2300 ms
pauses between them, judging each pause on a five-point scale from
"exactly like speech" to "exactly like song." Three conditions:

* Exact repetition: judgments moved from about 1.3 (speech) at
  iteration 1 to about 3.8 (song) at iteration 10, crossing the
  scale midpoint.
* Transposed repetition (each repeat shifted by 2/3 or 1 1/3 semitones,
  pitch relationships preserved): judgments stalled around 1.9, still
  firmly speech.
* Jumbled syllables (same syllables, shuffled order): judgments stayed
  flat around 1.5.

The gate is brutal: a drift of two-thirds of a semitone, or a shuffled
syllable order, kills the transformation. Exactness is not a nicety; it
is the entire mechanism.

Experiment II tested what the subjects actually heard, by making them
sing it. Eleven experienced female singers heard the full sentence
followed by the phrase either once or ten times (780 ms pauses), then
reproduced the phrase exactly as they heard it. Two findings:

* The ten-hearing renditions were more consistent across subjects and
  closer to the original phrase's F0 contour than the one-hearing
  renditions.
* All six sung intervals sat closer to a hypothesized tonal melody (the
  notated Figure 1) than to the original speech intervals. Binomial test
  across the six intervals: p < 0.016.

A control group heard the phrase *sung* once and reproduced it; their
pitches matched the ten-times-spoken group almost exactly (her Figure 5,
red and green curves overlapping). People who heard speech ten times sang
back the same pitches as people who heard song once. That overlap is the
most elegant validation in Deutsch's catalog: the percept, not the
stimulus, is what the singers reproduce.

## The notation (her Figure 1)

The figure shows the phrase as it is generally heard after repetition:
seven quarter notes under the seven syllables, treble clef, common time,
and a five-sharp key signature. B major, as the Chronicle profile put it:
"a simple melody playing in B major." The contour, read from the figure
and confirmed against the sung-back curves: the first two syllables level,
then down, down, up, down, and a large final drop to a note on a ledger
line below the staff.

The interval ladder across the syllables, in semitones: 0, -2, -2, 4, -2,
-7. A note on sourcing: the JASA PDF's text extraction prints this
sequence with most minus signs dropped, and the surviving fragment reads
like a different melody. The corrected signs come from cross-reading three
things that all agree: the notation figure's contour, the red average
curves of Figures 4 and 5, and the B major key signature (every step of
the corrected ladder lands on a B major scale degree). The re-render
script documents this correction explicitly rather than silently
adopting the garbled text.

## The brain data and the acoustic follow-up

Tierney, Dick, Deutsch, and Sereno (2012, journal issue 2013) took the
illusion into the scanner. They found 24 naturally transforming and 24
non-transforming audiobook phrases, closely matched for talker, syllable
count, phoneme distribution, duration, and acoustic dimensions, and played
them repeated to listeners in fMRI. Phrases heard as song recruited
pitch-processing and auditory-motor regions more strongly: bilateral
anterior superior temporal gyrus, right posterior STG, middle temporal
gyrus, left supramarginal gyrus, left inferior frontal gyrus, and lateral
precentral regions. The interpretation: detecting pitch patterns across
syllables, holding them in pitch memory, and covertly coupling the vocal
system to what is heard. Song, in this reading, is speech plus the
listener's own voice getting involved.

Tierney, Patel, and Breen (2018) asked which acoustic properties make a
phrase transformable. Flatter within-syllable pitch slopes causally
strengthened song-like perception for some stimuli; initial ratings
correlated with beat regularity and slope. But directly manipulating
melodic fit to Western scales, or regularizing timing, did not
significantly change repetition-driven ratings. Keep that nuance: the
2011 paper's tonal-regularization story is the headline, but the 2018
follow-up says the causal drivers are narrower than "fits a scale." The
mechanism is real; the gloss should stay modest.

## Composition, palette, and diagram choices

Her page is an instrument, not an article. Seven sound demos do the real
work; the text is the lab notebook around them. The figures are austere:
black axes on white, primary red, blue, and green lines, the judgment
graphs split at the scale midpoint into labeled SONG and SPEECH regions.
No decoration anywhere. The austerity is deliberate and correct: when the
stimulus is this trivial, any visual noise would imply the effect lives
in the presentation. It does not.

The notation figure is the emotional center of the page. After paragraphs
about rating scales and transposition conditions, there it is: seven plain
quarter notes, the song the subjects heard, drawn as if it had always been
there. It functions exactly like a reveal in a magic trick, placed where
a results figure would go.

The demo structure itself deserves a composer's attention. Sentence,
phrase times ten, sentence. The middle section is pure process; the outer
sections are identical; the transformation happens in the listener between
them. It is the cleanest possible form for an illusion about perception:
the control condition and the experimental condition are the same audio.

## What makes it sing

The nothing-changes structure. Every other illusion in the catalog tweaks
the stimulus; this one holds the stimulus fixed and moves the listener.
The exactness gate gives it teeth: the effect is not "repetition makes
things musical" but "exact repetition, and nothing else, flips the
rendering mode." And the Figure 5 overlap, speech-heard-ten-times tracing
song-heard-once, is a kind of proof you rarely get in perception science:
two different histories converging on one percept, drawn as two lines that
lie on top of each other.

## What is overdone

The "distinct neural circuits" framing reaches a little far. Deutsch
concludes that speech and song are processed by circuitry that is at some
point "distinct and separate," accepting the same input and producing
different outputs. The fMRI data shows differential recruitment, which is
not the same as separate circuitry, and the 2018 acoustic results counsel
against a tidy story in which the brain simply snaps contours to a tonal
grid. The tonal-regularization claim of 2011 is stated more strongly than
the follow-up literature supports. None of this touches the core
demonstration, which needs no neural gloss to be convincing.

## Findings for the practice

* Repetition as a perceptual operator. A loop is not neutral
  infrastructure; ten exact repetitions change the listening mode. Any
  piece that loops a spoken-like motif is, whether it wants to be or not,
  running this experiment on its audience.
* Exactness as a compositional constraint. The 2/3-semitone kill threshold
  is a usable number: drift below it and the spell holds, drift above it
  and the piece stays speech. That is a parameter with a known edge, and
  edges are where pieces live.
* The A-B-A' return as punchline. Bringing back identical material after
  a transformation section and letting the listener's changed state do the
  work is a structure worth stealing outright.
* Quantization as revelation. The song was always inside the contour; the
  listener needed ten passes to hear the grid. Smoothing versus stepping
  the same curve is a visual idea as much as an auditory one: one
  dataset, two renderings.

## Local re-render

Built `study-2026-09-29-speech-to-song/rerender.py` (private working
files): a formant source-filter synthesis of a seven-syllable
speech-like phrase whose syllable-center pitches follow the corrected
interval ladder 0, -2, -2, 4, -2, -7, looped ten times with 780 ms pauses
(the Experiment II timing), plus three figures.

* R1: the ten loops' F0 tracks correlate 1.00000 with loop 1. The sound
  never changes; only the listener would. Verified, not asserted.
* R2: the measured F0 contour, quantized to semitones, reveals the
  hidden ladder. The smooth (speech) and stepped (song) readings of one
  curve, drawn together.
* R3: a data plot of the paper's Table I result: all six sung intervals
  sit closer to the hypothesized melody than to the original speech.

Limits, stated plainly: this is not Deutsch's recording; syllable
timing, absolute pitch, and formants are reconstructed from the paper's
parameters. The WAV was verified structurally via autocorrelation F0
tracking (with standard median-filter octave cleanup and masking of the
unvoiced consonant onsets); it was not auditioned, and the perceptual
switch itself cannot be demonstrated in a silent session. The interval
signs were corrected from the garbled PDF extraction as documented above.

## Outbound doorways

* The WNYC RadioLab interview with Jad Abumrad and Robert Krulwich on
  "Sometimes Behave So Strangely" and perfect pitch (linked from her
  page): the popular telling, and the perfect-pitch connection the papers
  only touch.
* Deutsch (2019), "Crossing the Borderline between Speech and Song,"
  chapter 10 of *Musical Illusions and Phantom Words* (Oxford University
  Press): her own long-form telling, with the Korean (2023) and Chinese
  (2024) translations noted on her page.
* Tierney, Patel, and Breen (2018), "Acoustic foundations of the
  speech-to-song illusion": the full text, for the causal acoustic
  drivers behind the headline result.
* Her phantom words page: the next illusion in the catalog, and the
  closest cousin (repetition turning noise into voices).
