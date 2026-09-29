# Atari AMY / the 64-oscillator chip that never shipped - Deep Study Notes

**Date:** 2026-09-29 (study pass)
**Subject:** the Atari AMY (Additive Music sYnthesizer), the 64-oscillator
single-IC additive synthesizer developed inside Atari's Sunnyvale
Research Lab in 1983-84, direct engineering heir of Hal Alles's Bell
Labs Digital Synthesizer. Never shipped in anything. Named as the next
doorway by the Hal Alles, James Tenney, John Pierce, and Diana Deutsch
studies.
**Hop path:** from the Hal Alles / the Alles Machine study, which closed
with the AMY as its named hardware heir: Mathews wrote the software
orchestra, Alles built the room-sized machine, and the SRL team tried to
fold the whole thing onto one chip. Wikipedia's phrasing is explicit:
"Amy's system design was based on Hal Alles' experimental work at Bell
Labs during the 1970s... Several of Alles' solutions to particularly
thorny implementation issues were used in Amy."
**Depth:** deep on text plus visual inspection of the surviving hardware
photos and locally re-rendered technique. Wikipedia's Atari AMY article
read end to end; the AtariAge "AMY Chip has been found" thread read end
to end, including R0ger's November 2019 technical summary of the chip's
architecture and his critique of it; the "CURT'S UPDATE" thread's
manufacturing debate read; the Atari 8-bit FAQ timeline entries on the
65XEM read; the March 1986 Z*Magazine contemporary note read;
shorepine/AMY's synth.md partials sections read end to end as the
living descendant. Two hardware photos visually inspected at full res:
the AMY 1 ceramic DIP on its Atari Semiconductor Group log sheet, and
the 65XEM prototype (a badged 65XE). Three local re-render sets, all
frames visually inspected. No em dashes anywhere in this file, per
house rule.

**Correction to earlier notes:** the Hal Alles study's queue entry named
this doorway "(Sam Paglia, Alles's heir)". There is no Sam Paglia on the
AMY project. The search for one surfaces an Italian jazz organist, not
an Atari engineer. Wikipedia, citing 120years, names the team as: led
by Gary Sikorski, primary architects Scott Foster and Steve Saunders,
single-chip implementation by Sam Nicolino, support software by Jack
Palevich (of Dandy fame) and Tom Zimmerman. The Sam-first-name slip is
mine to record and correct: the single-chip engineer is Sam Nicolino.
The "Alles's heir" part survives the correction; the name does not.

**Honest gaps:** the 120years.net AMY page (Wikipedia's deep source for
the whole history section) was not found in-session; the Tom Zimmerman
YouTube interview exists and was not watched; the Atari Museum's 65XEM
page failed to fetch; no AMY hardware was ever heard, the WAVs below
are stand-ins; the 2400-baud voice experiment is rebuilt from its
description, not reproduced with a real codec; R0ger notes the noise
generator section of the spec is not well described; the Synergy
keyboard forum claim (closest surviving sound to AMY) is unverified
secondhand.

## The thesis, stated plainly

Alles proved additive synthesis could run in real time; AMY asked
whether the proof could fit in one chip and sell for dollars. The
answer, technically, was yes-ish: a working design in wire-wrapped
discrete logic, ceramic prototype ICs that existed but each failed
differently, and a paper trail of three intended hosts. The answer,
commercially, was no: the Tramiel buyout in July 1984 dismantled the
lab, the 520ST shipped with an off-the-shelf Yamaha YM2149 instead, the
65XEM was announced and then shelved, and the sold-off design died under
a lawsuit threat before Sight and Sound could ship their 32-oscillator
rack version. The stealable thesis is the budget model. Sixty-four
oscillators is a fixed resource that must be spent; the architecture is
really a budgeting discipline for partials, and R0ger's critique shows
the budget had blind spots. For a builder, the lesson is that a voice
architecture is a spending policy, and the spending policy is the
instrument's character.

## The chip, technically

Per Wikipedia and R0ger's summary, which agree on the shape:

The engine is 64 sine oscillators. Sines come from a 16-bit ROM table
lookup, not computed, which is the classic Alles trick carried forward:
replace math with memory. Eight of the oscillators are "fundamentals",
voices. The other 64 are harmonics, assigned to voices in pairs: a voice
can hold 2, 4, 6, up to all 64, and each harmonic belongs to exactly one
voice. Harmonic k of a voice sits at k times the fundamental frequency,
and its phase is computed directly as k times the fundamental's phase.
There is no independent phase control.

Envelopes are brutally minimal: one target value plus one slope per
oscillator for amplitude, and the same target/slope pair for frequency
on the fundamental. The slopes interpolate in exponential space, which
means constant dB per second, the perceptually honest way to fade.
Only eight frequency ramps made it into the design; the rest were judged
too hard to implement in hardware. The oscillators can be combined two
at a time into up to eight output channels, with an external DAC.
Because additive synthesis cannot do explosions and jet engines, two
configurable noise generators could be mixed into the master oscillator
to randomly shift the output. Sound programs were sequences of
instructions setting the master frequency and ramp rates, with the
slaves following.

The standout application claim: feed an input sample through an FFT,
extract the spectral pattern, hand the handful of parameters to the
AMY, and get a highly accurate rendition that can be pitch-shifted just
by moving the master frequency, slaves following naturally. The cited
experiment produced telephone-quality voice at 2400 baud. This is the
resynthesis-as-compression idea, a decade before it went mainstream,
and it is the single most modern thing about the chip.

## What the re-renders showed

Frame 1, the budget: I drew a typical harmonic assignment across the
8 voices and then R0ger's critique as a bar chart. Want an odd-partials
only voice (square-wave family)? AMY has no sparse spectra: you must
take harmonics 1 through 16 and mute the eight you do not want, and the
muted oscillators are still spent from the budget. A bass that wants
lots of high harmonics has to starve the other voices. His summary
sentence lands: compared to FM there is much less variation, and
compared to the SID ("one poke" for a PWM square bass) it is laborious.
But there is room, he says, and 30 years of Pokey/SID-style culture
might have found the tricks. The chip died before its folk music
could be written.

Frame 2, the envelopes: exponential minus 8 dB per second against naive
linear, for one 110 Hz voice with 8 partials. The exponential curve
stays loud longer and then lets go, which reads in the waveform as a
longer body and a cleaner tail. The WAV was verified structurally:
FFT peaks land at exactly 110 times 1 through 8.

Frame 3, the 2400-baud idea: a synthetic /a/-ish vowel analyzed for
its 12 strongest partials, resynthesized, then re-rooted from a 120 Hz
master to 180 Hz. The spectrograms show the low partials shifting by
exactly 1.5x with the spectral shape intact. That is the whole pitch:
the timbre is a recipe, the master is a handle, and moving the handle
never smears the recipe. It is a lovely mechanic and it deserves a
piece.

## The afterlife

Two things survived the chip. First, the name. shorepine's AMY is an
open-source music synthesizer library (DAn Ellis, Brian Whitman) whose
FAQ says AMY once stood for "Additive Music synthesizer librarY" and
calls it a nod to the Atari chip. Its partials system is the AMY idea
grown up: BYO_PARTIALS parents steering PARTIAL oscs every block,
INTERP_PARTIALS rewriting each partial's frequency and envelope per
note so that velocity changes the spectrum, not just the level. The
Atari chip's one target/slope pair per oscillator became seven
breakpoints plus release per partial, but the shape is the same: a
parent owns the pitch, the partials own the color. Second, the Alles
multi-speaker mesh synth by the same people, named for Hal Alles
himself, which closes the circle: the Bell Labs machine and the Atari
chip now share one software family.

## What sings, what is overdone

What sings: the master-follows-slaves model as an interface. One
number moves everything and nothing breaks. The 2400-baud voice
experiment is the purest statement of additive synthesis as
compression, and it is still underused as a compositional mechanic.
The exponential target/slope envelope is the right minimal envelope;
it is honest about loudness in a way ADSR is not.

What is overdone: nothing in the chip itself, because it never got its
thirty years. The avoid-list entry here is the failure mode around it:
the masked chips that each failed differently, the committee-bound
Sierra, the 520ST cost-down to the YM2149, the lawsuit that killed the
Sight and Sound version. The technology was ready enough; the
institutions were not. When building on AMY ideas, do not rebuild the
institutional failure, rebuild the folk music R0ger wished for.

## Next doorways

Tenney's Meta (+) Hodos and tuning theory, named by both the Pierce
and Tenney studies; Diana Deutsch's speech-to-song illusion, named by
the Deutsch study; the Pierce/Mathews thirteenth-root-of-three work in
full, named by the Pierce study; Tenney's Clang (1972), named by the
Tenney study. The Bell Labs circle is now closed: Mathews, Spiegel,
Risset, Alles, Deutsch, Tenney, Pierce, Shepard and Zajac, and the AMY
heir. Future sessions can leave the circle or dig its remaining four
names deeper.
