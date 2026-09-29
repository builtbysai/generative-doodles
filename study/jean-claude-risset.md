# Jean-Claude Risset / Endless Illusions - Deep Study Notes

**Date:** 2026-09-29 (study pass)
**Artist:** Jean-Claude Risset (1938-2016, Le Puy-en-Velay, France). Pianist,
composer, and physicist. Composition with Andre Jolivet in parallel with
scientific studies at the Ecole Normale Superieure. Bell Labs from 1964,
working with Max Mathews on the MUSIC IV software. Built the first European
digital sound synthesis system at Orsay. Head of the computer music
department at IRCAM 1975-1979 at Pierre Boulez's invitation. Composer in
residence at the MIT Media Lab, 1989. First Golden Nica (Ars Electronica,
1987), CNRS Gold Medal in science (1999), Grand Prix National de la Musique
(1990), Giga-Hertz Grand Prize (2009). 70 compositions, from solo tape
(Mutations 1969, Songes 1979, Sud 1985) to mixed works to the interactive
Duo pour un pianiste (1989), where a pianist is accompanied on the same
acoustic piano by a computer double that listens to what and how they play.
**Hop path:** the Laurie Spiegel / Music Mouse study, which named him as the
next doorway, the sound-illusion pole of the Bell Labs circle. He is the
perception-side answer to her instrument-side answer: Mathews built the
orchestra, Spiegel built the instrument, Risset built the paradoxes the ear
cannot resolve.
**Depth:** deep on text plus visual inspection of locally re-rendered
technique. Wikipedia biographies read, Roger Shepard's tone construction
read in full, the Frontiers in Psychology paper on the emotional response
to the Shepard-Risset glissando read, the CCRMA Stanford biography read,
Michael Bach's 1991 c't Pascal implementation article read through the
implementation sections, the PLOS ONE eternal-tempo paper skimmed for the
level mechanism, the hal.science structure-versus-randomness paper's
Risset section read. No Risset portrait photo was inspected in-session
(honest gap), and his pieces were read about, not heard. The visual study
is the technique itself: three local re-renders, all frames visually
inspected, because for this artist the spectrogram IS the artwork's
diagram.

**Honest gaps:** no audio auditioned (no speakers in-session, the WAV was
verified structurally, not heard); the 1969 Introductory Catalogue of
Computer Synthesized Sounds not read in full; the Alles Machine and John
Pierce inharmonic work still unstudied; Mutations / Little Boy / Sud read
about only; the 1967 Shepard-Zajac AT&T film with the Penrose stair not
watched.

## The thesis, stated plainly

Risset's doctrine is that perception is the material. The CCRMA biography
says he realized "auditory equivalents of the etchings of Escher," and the
formulation worth stealing is his two-stage compositional order: "he goes
beyond composing with sounds in order to compose sound itself, playing with
the time that is in the sounds rather than merely playing sounds in time."
Stage one is synthesis research as composition (the trumpet partials, the
glissando, the beat). Stage two is music made from the invented sounds.
Most generative work inverts this: it composes with ready-made materials
and calls the arrangement the piece. His career argues the opposite, that
the material deserves the composing first, and that the ear's failure
modes are a legitimate building site.

The biographical structure matters too. He arrived at Bell Labs in 1964 as
a physicist-composer and did imitation first: digital recordings of
trumpets, then pitch-synchronous spectrum analysis of their partials,
which revealed that the amplitude and frequency of the partials change
with pitch, duration, and loudness. The imitation research is what
produced the illusions. He found the brass family has no fixed spectrum;
the spectrum IS the instrument's behavior. The paradoxes came from
measuring a real thing carefully, not from theorizing. The lesson for
tool-building: study one real mechanism until its variables show, and the
illusions fall out of the measurement.

## The Shepard-Risset glissando: the mechanism

Roger Shepard's 1964 construction: a tone made of octave-spaced partials
of one pitch class (C is only Cs, in many octaves), with partial
amplitudes following a raised-cosine window that peaks mid-band and
tapers to silence at the extremes. Play the twelve pitch classes in
sequence and the ear hears a scale that ascends forever while going
nowhere. Risset's 1968 contribution: make the steps continuous, a single
gliding tone whose partials all rise one octave while the amplitude
window stays fixed. The tone returns to its starting point having
apparently climbed an octave. The BBC's Bang Goes the Theory called it
"a musical barber's pole," and that is the correct visual: my local
spectrogram render (risset_spectrogram.png) is diagonal parallel lines
rising forever on a log-frequency axis, brightest in the middle band,
fading top and bottom, exactly like stripes on a pole seen through a
window. Frame 0 and frame 12 of the cycle are pixel-identical, yet the
ear reports uninterrupted ascent between them. That is the whole trick
drawn: continuity of motion plus ambiguity of position equals perpetual
travel.

Three implementation facts worth pocketing. First, Bach's 1991 Pascal
version on a Macintosh used four voices at octave spacing with the
amplitude of each voice ramping 0 to 11, 12 to 24, 24 to 12, 12 to 0 on a
0-24 scale across one octave of ascent, logarithmic loudness (1.26, the
24th root of 127, per step), and a decrescendo-crescendo pair around each
pitch change to kill clicks. The recipe fits in a paragraph. Second, the
brass-trio reading of the mechanism: trumpet, horn, and tuba all climb
the same scale in different octaves, and each instrument drops an octave
exactly when the other two cover it, so no instrument ever leaves its
range and the scale never stops rising. Every implementation is a
variation on this covering idea: something must silently descend while
something else rises, and the descents must be inaudible. Third, the
window shape barely matters. Shepard himself wrote that almost any smooth
distribution tapering to subthreshold at the extremes would do. The
mechanism is the covering, not the curve. Steal the covering, not the
cosine.

## The Risset rhythm: the same trick in time

Risset's second illusion applies the identical covering idea to tempo. A
rhythm that seems to accelerate forever is built from several copies of
the same pattern playing simultaneously at tempos related by powers of
two, with a fixed bell curve of loudness over the tempo copies. All the
copies speed up together; the bell curve does not move. The ear locks to
whatever tempo copy is loudest and reports acceleration, forever. The
YouTube-era explanation puts it well: it is like zooming into a fractal
rhythm of infinitely many identical rhythms at tempos differing by all
powers of two, with the audible window fixed. My local spiral render
(risset_rhythm_spiral.png) shows the structure: three pattern
repetitions with inter-onset intervals halving continuously, dot size
marking the temporal levels (every second event louder is the next level
up), arranged so the ear's attention ring sits at fixed radius while the
events migrate inward.

The collaboration note: a secondary source attributes the first drum
version to Kenneth Knowlton and Risset together, with a Pierce 1983
reference. Treat that as unverified but plausible, Knowlton made the
first computer-animated films at Bell Labs and shared the building. Dan
Stowell's 2011 paper gives the modern implementation recipe: variable
playback rates and amplitudes distributed across synchronized sample
streams. Recent mainstream uses: Hans Zimmer and Nolan's Dunkirk Shepard
tones for endless intensity, and Ludwig Goransson's accelerating Risset
rhythm in Nolan's 2026 The Odyssey, during the sacking of Troy and the
suitors sequence, explicitly to create the sensation of being pursued.
The Frontiers paper measured the affect: students played the endless
glissando reported disruption of equilibrium and a sensation of falling,
with musical expectancy constantly aroused and never fulfilled. The
illusion has a body. That is why it works in film.

## The visual analogs, which are the real doorway

The taggedwiki history puts it plainly: the illusion is "similar to the
Penrose stairs optical illusion (as in M. C. Escher's lithograph
Ascending and Descending) or a barber's pole." The network:

- Escher's Ascending and Descending (1960), the Penrose stairs made
  drawable. In 1967 Shepard and E. E. Zajac made an AT&T film pairing a
  Shepard tone with the ascent of an analogous Penrose stair. Sound and
  drawing were cross-wired at Bell Labs sixty years ago.
- Hofstadter's Godel, Escher, Bach named Escher's "Treppauf, treppab"
  (up the down staircase) the visual analog of the Shepard tone, and
  Bach's 1991 article repeats the pairing for its readers. The strange
  loop and the endless scale are the same structure in different
  senses.
- The barber pole itself: my local render (barber_pole_0/1/2.png) is
  diagonal stripes drifting upward in a window, frames 0 and 2
  identical, perpetual motion from a static loop. It is the one-frame
  summary of the whole study.
- The tritone paradox (Diana Deutsch, 1986): two Shepard tones a tritone
  apart are heard as ascending or descending, never both, the auditory
  Necker cube. Bistability as a sibling mechanism: ambiguity of
  direction rather than of position.
- Esqueda's variant from the hal.science paper: the same barber-pole
  ascent built from octave-spaced spectral NOTCHES on white noise
  instead of peaks. Inversion as a design move: the mechanism survives
  with the signal negated.

The generative-art payoff is that every one of these is a visual piece
waiting to happen, not just a sound piece. The Shepard tone's
spectrogram is already a drawing. The Risset rhythm's spiral is already
a composition. His illusions are drawings that happen to be audible.

## What makes it sing, and what is overdone

What sings is the economy. One mechanism (fixed window, moving
contents, silent covering) generates the glissando, the scale, the
rhythm, the tritone paradox, the notched-noise variant, and the barber
pole. Five phenomena, one recipe. The study method generalizes: when you
find a perceptual mechanism, exhaust its rotations before inventing a
new one. Risset rotated pitch to time to rhythm; the rotations took
twenty years and are still being used in film scores.

What sings in the doctrine is the two-stage order. Compose the sound,
then compose with the sound. His mixed works (Duo pour un pianiste,
Passages, Voilements) marry instruments to computer sounds that were
themselves composed first. The Interactive-piano piece is the Spiegel
parallel: a computer double that listens to the pianist's playing and
accompanies on the same instrument. Both Bell Labs alumni ended up
building listening machines.

What is overdone: the riser cliche. The Shepard tone has become film
trailer furniture (the "braaam" era's subtler cousin), and the Frontiers
paper's negative pleasure ratings hint why: endless arousal with no
release reads as anxiety, not wonder. The mechanism is a spice, and
spices are not meals. Also overdone in reconstructions: obsessing over
the window curve when Shepard said any smooth taper works. The covering
is the illusion; the curve is garnish.

**Avoid-list additions:** riser-as-composition (endless ascent with no
arrival and no release); window-curve fetishism when the mechanism is
the covering; film-score cliché usage without a dramatic reason for the
anxiety; treating the illusion as the piece instead of as one movement.

## Local re-renders (evidence)

`goals/generative-doodles-site/hidden_files/study-2026-09-29-risset/`:
script /tmp/risset.py (not committed to the repo). Three sets, all
frames visually inspected.

Set A, the glissando as drawing (risset_spectrogram.png, plus
risset_gliss.wav): eight octave-spaced sine partials gliding one octave
over 12 seconds under a raised-cosine amplitude window, synthesized in
numpy, the WAV verified structurally (44.1 kHz, normalized, no clips;
not auditioned, honest gap). The log-frequency track plot is diagonal
parallel lines rising left to right, brightest mid-band, fading at the
edges. The render confirms the BBC's description: it is a barber pole
on paper. The paradox is visible, not just audible: the first and last
columns of the image are identical, yet every line between them climbs.

Set B, the visual barber pole (barber_pole_0/1/2.png): diagonal
red-on-black stripes drifting upward in a vertical window. Frames 0 and
2 are identical by construction (offset modulo one stripe period);
frame 1 sits halfway. Between identical frames the eye reports
continuous upward motion. The one-image summary of the mechanism:
motion without displacement.

Set C, the rhythm as drawing (risset_rhythm_spiral.png): 288 events in
three pattern repetitions with inter-onset intervals halving
continuously, plotted angular position against log interval, dot size
encoding the temporal level (every doubling of the event index is the
next louder level). The structure reads as nested rings, loud events
marking the slow levels, the whole spiral tightening inward. The
render confirms the YouTube-era fractal description: the audible
tempo is wherever the bell curve sits, and the bell curve never moves.

## What to steal and what to avoid

Steal: the covering. Any perpetual-motion illusion in any medium needs
one thing rising and one thing silently resetting under cover of the
first. In visuals, that is the barber pole window, the Penrose
staircase's viewpoint, the wrap seam. Name the cover before drawing the
motion.

Steal: the two-stage order. Compose the material, then compose with the
material. A generative piece can show both stages: first the system
builds its instrument (its palette, its envelope, its grammar) in the
open, then it performs with it. The audience gets the instrument and
the piece.

Steal: rotate the mechanism across senses. Pitch became rhythm; the
rhythm can become zoom (a fractal zoom that never arrives), brightness
(a light that brightens forever without blinding), density. One
verified mechanism is worth five invented ones.

Steal: ambiguity as material, not as bug. The tritone paradox shows
that a bistable stimulus is a feature: the listener's brain completes
the piece. Build stimuli the perceiver has to resolve, and the piece
happens in them.

Avoid: the riser cliche, endless ascent as cheap tension. Avoid:
mistaking the window curve for the mechanism. Avoid: endless
stimulation without release; the Frontiers finding is that unfulfilled
expectancy reads as anxiety, which is only useful when anxiety is the
point.

## Next doorways

Hal Alles and the Alles Machine, the hardware Risset and Mathews and
Spiegel shared, the first digital additive synthesizer she programmed;
John Pierce and the inharmonic-timbre experiments Mathews cited; Diana
Deutsch's paradox catalog beyond the tritone; James Tenney's For Ann
(rising), the minimalist extreme of the glissando as a whole piece;
Risset's own visual and video work, still unseen; the 1967 Shepard-Zajac
AT&T film as an early audiovisual-illusion artifact.
