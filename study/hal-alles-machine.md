# Hal Alles / the Alles Machine - Deep Study Notes

**Date:** 2026-09-29 (study pass)
**Subject:** Harold G. Alles (Bell Labs, Murray Hill), engineer, and his
1970s digital additive synthesizer, the Bell Labs Digital Synthesizer,
better known as the Alles Machine or Alice. The machine Risset and
Mathews and Spiegel shared, and the doorway the Risset study named next.
**Hop path:** from the Jean-Claude Risset / Endless Illusions study,
which listed him as the hardware pole of the Bell Labs circle: Mathews
built the software orchestra, Risset built the perceptual paradoxes, and
Alles built the first real-time digital instrument they all played.
**Depth:** deep on text plus visual inspection of photos and locally
re-rendered technique. Wikipedia's Bell Labs Digital Synthesizer article
read end to end (its technical section follows Alles's own 1976 Computer
Music Journal paper, "A Portable Digital Sound Synthesis System");
120years.net's Alles page read end to end, including the long 2017 Simon
Crab interview quotes where Alles explains the origin himself; Robert
Moog's 1977 "Understanding Electronic Music" description of the machine
read in its technical section; SonicState's 2015 "Hear the World's
First Digital Additive Synth" piece read; Laurie Spiegel's own 1977
description of playing it read verbatim. Three machine photos visually
inspected at full res (Oberlin TIMARA console, Spiegel at the machine
1977, the Palladium 1977 still). Three local re-render sets, all frames
visually inspected. No em dashes anywhere in this file, per house rule.

**Honest gaps:** the 1976 CMJ paper itself not read (only its contents
via Wikipedia's citations, and Moog's 1977 summary); the 1977
Palladium video and the Spiegel 1977 video watched only as thumbnails,
not played; the Alles synth 1977 PDF on retiary.org unreachable
in-session; the Don Slepian 1980 photo of the machine 404'd on
Wikimedia; the Oberlin refurbishment details only via press summaries;
the Atari AMY chip documented from secondary sources only.

## The thesis, stated plainly

The machine exists because a telephone engineer got tired of being
ignored. Alles was tasked with selling digital design inside a company
with a hundred year history of analog design. He developed one of the
first programmable digital filters, which could do all the end telephone
office filtering and tone generation and could also be configured to
play digitally synthesized music in real time. He gave thirty-minute
demos of the telephone hardware several times a week, ending each with
synthesized music, and reports that people eventually came to just hear
the music. Max Mathews witnessed one of these demonstrations and
excitedly encouraged him to build a musical instrument out of purely
digital technology. Alles proposed the instrument project to his boss
while walking back from lunch. His boss approved it before they reached
their offices.

The stealable thesis is the demo-bait structure. The serious artifact
was boring to its audience; the side effect was not. Rather than argue
for the serious artifact, he let the side effect carry the pitch, and
the side effect became the instrument. For a builder of tools this is a
doctrine: ship the boring mechanism with the delightful mode attached,
and let the audience's pleasure recruit the resources the mechanism
needs.

## The machine, technically

Per Alles 1976 via Wikipedia: three parts. An LSI-11 microcomputer with
two 8-inch floppy drives (from Heathkit's H11) and an AT&T color video
terminal. A custom ADC sampling the input devices at 7-bit resolution
250 times a second. And the programmable sound generator: roughly 1,400
integrated circuits, operating at 30k samples per second, 16-bit.

The voice architecture is the part worth understanding. A bank of 32
master oscillators, generally meaning up to 32-note polyphony. A second
set of 32 oscillators slaved to the masters, each generating the first
N harmonics of its master, N programmable from 1 to 127. Plus 32
programmable filters, 32 amplitude multipliers, and 256 envelope
generators, all mixable in arbitrary fashion into 192 accumulators,
then to four 16-bit output channels and a DAC. Waveforms came from a
64 kWord ROM lookup table, and Alles used arithmetic tricks inside the
table to keep the controller CPU out of the loop, including replacing a
multiplication with two table lookups and a subtraction when the numbers
happened to allow it. Event handling was 255 timers with 16 FIFO event
queues, sorted by timestamp.

Moog's 1977 description (written while the machine was current state of
the art) counts 64 oscillators, 32 filters, 32 amplifiers, and 256
envelope generators, and describes the control surface: two five-octave
touch-sensitive keyboards, 72 slide levers, and four 3-axis joysticks.
The input ADC could process about 1,000 parameter changes per second
before the LSI-11 bogged down, so the architecture is a fast dumb
synthesis engine fed by a slow smart controller through narrow
parameter streams. That controller/event-queue split is the ancestor of
every modern plugin's parameter model: real-time DSP core, queued
control messages, GUI too slow to touch the audio thread.

## The control surface as technique

The photos show what the numbers describe. The Oberlin console (IMG_0344,
inspected at 640x480): two 61-key keyboards, a huge bank of sliders on
the left rack (the 72 slide levers), a CRT terminal with a piano-roll
style display, a numeric entry keypad, and joysticks with red ball tops.
The machine is furniture-scale: Wikipedia quotes 300 pounds, and the
designers optimistically called it portable. The Spiegel 1977 still
shows her hand on the slider bank, body turned toward the rack of
sliders while the keyboards sit below. The Palladium 1977 still shows
both hands on the keyboards with the CRT glowing amber in a dark
theater.

The doctrine in the hardware: the additive engine is exposed as
fingers. Seventy-two sliders is an interface that says each harmonic is
a thing you can grab. The joystick axes and the switch banks give the
macro gestures; the sliders give the partial-level truth. Spiegel's own
1977 description confirms how she used it: her interactive "concerto
generator" software recycled her keyboard input into an accompaniment
to her continued playing, and the sliders were the per-voice FM
controls, number of harmonics and the amplitude and frequency of the
modulator and carrier for each voice. So the same bank drove two
synthesis routes: additive partial amplitudes and FM voice parameters.

## The FM bridge (Set B finding)

My re-render (alles_setB_fm_vs_additive.png, visually inspected)
computes both routes for one voice at carrier 220 Hz, 1:1 ratio.
At modulation index 1.5 the FM spectrum is five meaningful sidebands,
matched by five hand-set additive partials. At index 6.0 it is ten,
matched by ten. The render makes the machine's design decision visible:
FM reaches a rich spectrum from two oscillators plus one index knob;
additive reaches it from N amplitudes. The machine shipped both,
because the knob route and the slider route are different instruments
even when they produce the same spectrum. The knob route is a gesture,
the slider route is a drawing. A generative instrument should offer
both macro and micro access to the same voice, and it matters which
one the hand touches first.

## The slider-bank voice (Set A finding)

The re-render (alles_setA_slider_bank.png, visually inspected) draws
one 32-partial voice as the physical slider bank across three time
slices of a brass-profile ADSR note: attack at 0.08s, sustain at 1.2s,
release at 5.85s. The spectral centroid rides the envelope, which is
the trumpet behavior Risset measured with his pitch-synchronous
spectrum analysis: partial amplitudes change with loudness and duration,
so the stack brightens as it rises and dulls as it sinks. The three
panels confirm the mechanism visually: the attack panel has a bright
rising stack, the sustain panel the full 32-partial spread, the release
panel the same shape sinking and dulling. The machine's architecture
made this visible by construction, because every partial had its own
control and its own envelope generator (256 of them).

## The synthesized note (Set C finding)

alles_additive_note.wav: six seconds, 110 Hz fundamental, 32 partials,
brass spectral profile with per-partial envelope brightening,
22.05 kHz 16-bit mono, structurally verified via waveform and
spectrogram frames (alles_setC_waveform.png, visually inspected):
clean harmonic lines to 3.5 kHz, brighter upper partials in the attack,
dulling in the release. The WAV was verified structurally, not
auditioned (no speakers in-session, honest gap). It is a stand-in for
the machine's output path, not a claim about its sound.

## The lineage, which is the second half of the technique

The machine was never a product and was almost never a composition
tool. Sources disagree on exactly how much music it made: Wikipedia's
lead says only one full-length composition was recorded for it, while
the article's own artist section credits Don Slepian, Artist in
Residence in the Acoustics and Behavioral Research department under
Max Mathews from 1979 to 1982, with two full-length pieces based on
the machine, Sea of Bliss and Rhythm of Life. I record the
contradiction rather than resolve it. What is not contradicted: Roger
Powell gave the first public live performance (unrecorded); Laurie
Spiegel's 1977 performance is the surviving document; Larry Fast's
Synergy album Games includes sessions recorded at Bell Labs on the
digital synthesizer.

The influence ran through commercialization, not composition. Crumar
of Italy and Music Technologies of New York formed Digital Keyboards
to repackage the machine as the Crumar General Development System
(1980, $30,000, 16-bit, 32 oscillators, additive plus FM, Wendy Carlos
used it on the Tron soundtrack). The cheaper DKI Synergy (1981,
around $5,300) dropped the external computer. Then Yamaha's DX7 (1983,
$2,000, six FM operators) ended the additive line, because FM could
generate evolving spectra from a few oscillators where additive
needed one oscillator per partial. Production of the Synergy ended in
1985. Atari's Sierra project built a single-chip Alles implementation,
the AMY 1 with 64 oscillators plus noise generators for game effects;
it was never released, and a third-party low-cost synth effort died
when Atari threatened a lawsuit.

The lineage's lesson: additive lost the 1980s to FM on hardware cost,
won it back everywhere in software, where an oscillator costs nothing.
Every additive resynthesis tool, every spectral morph, every modern
wavetable's per-partial editor is the Alles Machine's argument finally
affordable. The machine was right too early, which is a different
failure from being wrong.

## What to steal and what to avoid

Steal: the demo-bait structure. Ship the serious mechanism with the
delightful mode attached and let pleasure recruit resources.

Steal: the fast dumb engine, slow smart controller split. Real-time
core, queued parameter events, the GUI never touching the audio
thread. The machine did this in 1,400 ICs; the pattern is unchanged.

Steal: both routes to the same voice. One knob (gesture) and N
sliders (drawing) addressing the same spectrum. A generative
instrument should expose the macro and the micro of the same
parameter, not choose between them.

Steal: the parameter event queue with timestamps. 255 timers, 16
FIFOs, sorted before feeding the generator. Musical timing as
ordered events, not as a loop.

Steal: partials as fingers. Seventy-two sliders say each harmonic is
grabbable. A visual additive interface should look like a hand can
play it, because on this machine a hand did.

Avoid: the $30,000 lesson. Additive's cost was per-oscillator; FM won
by generating the same spectrum from fewer. When a technique is
expensive in one substrate, check whether the substrate changed
before abandoning the technique.

Avoid: treating the controller as the instrument. The LSI-11 was
replaceable (Oberlin's refurbishment swapped it for a Mac Mini); the
1,400-IC synthesis engine and the slider bank were the instrument.
Design the engine and the hands, not the computer.

## Next doorways

Atari AMY chip: the single-chip Alles, 64 oscillators, never shipped,
the unbuilt doorway. John Pierce and the inharmonic-timbre experiments
Mathews cited, still unstudied. Diana Deutsch's paradox catalog beyond
the tritone, still unstudied. James Tenney's For Ann (rising), the
minimalist extreme of the glissando, still unstudied. Risset's own
visual and video work, still unseen. The 1967 Shepard-Zajac AT&T film.
Don Slepian's Sea of Bliss and Rhythm of Life as Alles Machine
repertoire, read about only, unheard.
