# Max Mathews / Bell Labs Computer Music - Deep Study Notes

**Date:** 2026-09-28 (study pass)
**Artist:** Max Vernon Mathews (1926-2011). Electrical engineer, Caltech then
MIT ScD, Bell Labs Acoustics Research from 1955, later Stanford CCRMA.
Invented computer music synthesis as a practice: MUSIC I (1957) through
Music V (1968), the GROOVE hybrid system, the Radio Baton.
**Hop path:** Billy Kluever / E.A.T. study, which named Max Mathews / Bell
Labs computer music as a next doorway. Territory break into sound after the
drawing-machine streak.
**Depth:** deep on text. Full Curtis Roads Computer Music Journal interview
(Winter 1980) read end to end, the "Max Mathews and Me" Synth and Software
memoir read end to end, the Science 1963 paper "The Digital Computer as a
Musical Instrument" read in its technical sections, Music V orchestra/score
syntax from the Frontiers in Signal Processing archaeology paper and the
Bang book excerpt, unit generator lineage from Wikipedia and the SFU course
notes. Two photos visually inspected at full res: the ca. 1972 Bell Labs
photo of Mathews at the GROOVE console, and the CHM photo of Mathews
demonstrating the Radio Baton. One local re-render of the Music V
orchestra/score mechanic (original four-note etude), waveform, zoomed
wavetable steps, spectrogram, and score ladder all visually inspected.

**Honest gaps:** the synthesized WAV was verified byte-clean but never
auditioned (no speaker check in-session), so its sound is unverified; Music
V's machine-language inner loops were not re-derived, only the structure;
GROOVE's internals are from Mathews' own interview description, no console
ran; the Daisy Bell 1961 recording was read about, not heard; documentary
films unwatched; the Roads interview's final pages on harmonic theory
contradictions were skimmed.

## Who he was, in technique terms

Mathews was a violinist who found his instrument inefficient (his word: you
have to practice more to get a given performance out of it than with almost
any other) and an engineer who loved large complex systems. He spent his
career trying to give musicians a new instrument that kept the expressivity
and dropped the inefficiency. Every one of his systems is a negotiation
between two demands: give the musician total generality, and never make a
simple thing expensive to say. His own formulation in the Roads interview:
he wanted the complexity of the program to vary with the complexity of the
musician's desires.

## The systems, as stealable mechanics

**MUSIC I (1957).** One waveform, an equilateral triangle, same rise and
decay. Each note took pitch, amplitude, duration, nothing else. Newman
Guttman, a psychologist, made one brave composition. Mathews called the
result "terrible bloops for 17 seconds." The IBM 704 sat at IBM headquarters
on Madison Avenue; they ran the program there and carried the digital tape
back to Bell Labs, where a 12-bit vacuum-tube Epsco converter turned it into
sound. An hour of computation for 17 seconds of audio, then the tape was
sped up to tempo. Compute now, hear later: the founding workflow of
computer music was offline rendering.

**Music II.** Four independent voices, 16 stored waveforms. More of the same
shape.

**Music III (1960): the unit generator.** This is the big one. Mathews
realized he should not build instruments himself and impose his taste on
musicians. Instead he built universal building blocks and handed the
musician the job of wiring them into instruments. The blocks correspond to
analog synthesizer modules: OSC (table-lookup oscillator), AD2 (two-input
adder), RAND (random generator), and friends. His point, worth quoting
because it kills a lazy history: he did not copy the analog synthesizer
builders, they developed the blocks fairly simultaneously, which was
fortunate because a Moog patcher already knew how to wire unit generators.

The engineering move inside Music III is the one to steal: almost all of
the program was written in Fortran, portable, while the inner loops of the
unit generators, simple code that runs millions of times, were written in
machine language. Abstraction on the outside, speed on the inside. When the
Fortran compiler spread, that sandwich made Music V the first music program
that could travel between machines.

**The orchestra/score split.** Music V divides every piece into two
things that never touch each other. The orchestra is the instrument: a list
of unit generators wired so one's output feeds another's input, writing into
audio buffers (Bn, 512 samples each by default). The score is the music: a
list of NOT statements, one per note, carrying p-fields. P1 is the NOT
opcode, P2 the action time, P3 the instrument number, P4 the duration, P5
onward the note parameters. A real example from the Bang book: an orchestra
of `INS 01; OSC P5 P6 B3 F1 P30; OUT B3 B1; END` (oscillator reads frequency
from P5, function table F1, phase from P30, writes buffer B3, OUT sends B3
to the output bus B1) and a score line like `NOT <time> 1 <dur> <freq>
<amp>`. Mathews said in 1980 that the Music V language mattered more than
the Music V program: anybody in computer music could read a score or an
instrument description and translate it into whatever system they used.
Csound's orchestra/score files are this idea, still alive.

**Daisy Bell (1961).** The IBM 7094 sang "A Bicycle Built for Two."
John Kelly and Carol Lochbaum programmed the voice with their vocal-tract
model; Mathews programmed the accompaniment with MUSIC. It was the first
computer-synthesized singing, entered the National Recording Registry in
2009, and Arthur C. Clarke heard it and gave the tune to HAL 9000's death
scene in 2001. Song choice mattered: simple melody, well known, out of
copyright, and the Bell Labs in-joke of "Daisy Bell."

**The Science 1963 paper** ("The Digital Computer as a Musical Instrument")
is the manifesto: the computer is a meta-instrument, and simultaneous
instruments simply add their sample streams together, exactly like pressure
waves adding in air. The cost model is stated plainly: computation time is
proportional to the number of generators, and the composer pays for fancy
instruments twice, in compute time and in parameters typed per note. That
compromise between interest, cost, and work is still the design pressure on
every procedural piece.

**Graphical input (7094 era).** Mathews tried drawing composition instead of
typing it. An accelerando was one sloped line, ordinate as tempo: slope up
means speeding up. Melodic lines drawn directly. He judged the experiment
honestly: interesting, but the graphic languages never reached the
universality of the Music V score language. The lesson is not "graphics
failed," it is that a notation has to be readable by other people's tools
to survive.

**GROOVE (1968 onward, with F. R. Moore).** After a decade of offline
rendering, Mathews went the other way: a hybrid system, a minicomputer
driving an analog synthesizer, built for live performance. The conceptual
core is beautiful and directly stealable. GROOVE treats the score as a
recording of control functions, the functions of time that drive the
synthesizer's knobs, sampled at 100 to 200 Hz, fast enough to capture human
gesture, stored on disk. Then it plays those functions back, mixed with
fresh functions coming from the performer's live sensors (joysticks, knobs,
keyboards). The functions were shown on a scope; you could step to one
sample of one function, hear it as a sustained sound, flip an edit switch,
and change that single sample without touching anything else. Realtime
improvisation with sample-level editing and immediate audition. Emmanuel
Ghent was the heaviest user; Boulez worked with Mathews on the Conductor
program in 1975-76. The system ran until 1979, killed by an unmaintainable
computer, and Mathews refused to port it, saying a digital synthesizer and
a better score representation were the right future. The famous color photo
inspected for this study shows him at the console: small CRT terminal with
a light keyboard at his right hand, organ-style keyboard at his left, racks
of patched analog modules behind, a red Lissajous figure glowing on a wall
display. Two rooms of equipment to do what a laptop does now, but the
architecture, gestures recorded as sampled time functions and mixed live
with stored ones, is still how performance systems think.

**The Sequential Drum (IRCAM, with Curtis Abbott's 4CED).** A hit sensor
sends three numbers: when and how hard the drum was hit, and where in x/y.
The computer holds a sequence of pitches in memory; each hit advances one
step. Mathews built it this way on purpose: traditional music has a rigid
pitch line the player may not deviate from, so let the machine own the
pitches and let the player own time, force, and position. Scores grew into
tree structures: climb the trunk, side branches fire subscores, branches
end, the trunk continues, synchronization stays simple because everything
depends on how fast you climb. This is the intelligent-instrument doctrine
from the interview's best passage: the score and the player's control are
separate inputs to the instrument. The score no longer passes through the
performer, and it no longer stands between the musician and the instrument
the way it did in Music V. A much more powerful and flexible arrangement,
his words.

**The electronic violins.** Same doctrine, hardware edition. Regular violin
strings and bows as the vibration source, then electronic modification
afterward: carefully measured violin body resonances re-created with
circuits (the 1971 summer work used the brand-new U741 op-amp), volume
expansion applied to part of the spectrum instead of all of it so the
timbre changes with the dynamics, enough energy for any room, and the
ability to make the thing sound like a brass instrument or a human voice.
Played vertically like a cello, which Mathews insisted was the superior
physiological position, with low frets you feel but that do not fix the
pitch, so vibrato and glissando survive.

**Late work.** Inharmonic timbre experiments with John Pierce: overtones
stretched apart or squeezed together (a pseudooctave of 2.2 to 1 instead
of 2 to 1). The finding that surprised him: the sense of key carried over
better than expected, which told him some harmonic theories were less cogent
than their proponents thought. Then the Radio Baton (late 1980s): two
radio-transmitting batons tracked in 3D over a plate, used to conduct MIDI
files. The CHM photo inspected here shows the setup plainly: baton with a
black tip over a flat metal antenna plate, a second antenna on the table,
sheet music on a stand, and a whiteboard behind him covered in hand-drawn
waveform plots with "10,000 Hz," "4,000 Hz," "12 bit," and "73 dB S/N" in
marker. A conductor's instrument, not a typist's.

**The scene.** The Synth and Software memoir fills in what the interview
does not. By day the machines did speech research, by night music; Mathews
handed out passes for the third shift. The Hal Alles digital synthesizer
(the Alles Machine, 1977) got moved into Mathews' cubbyhole lab in room
2D529 when it became an embarrassment, and Laurie Spiegel, Larry Fast, and
Roger Powell came to record on it; Bob Moog visited and was shown the
software. Ghent's line from the Bell Labs panel is worth keeping: "If I
were a better programmer, I would simply have programmed things that I
wanted to do. But because I wasn't very good, I had to simplify. But then
things came out that I never would have dreamed of by myself. So there's
something to be said for not being a master of the technology." Mathews'
own epitaph for the first program: "The timbres and notes were not
inspiring, but the technical breakthrough is still reverberating."

## Core techniques, as stealable recipes

**The orchestra/score split.** Separate the instrument from the music, in
files and in the head. One orchestra must play many scores; one score must
run on many orchestras. The interface between them is a flat parameter
list per event (the p-fields), and that contract is the whole API. For a
seeded piece practice: write the generator once, then write scores against
it. The re-render below implements exactly this: an `INS 1` orchestra (sine
OSC times a breakpoint ENV, plus a triangle OSC an octave up at low level
through an AD2 adder, into OUT) driven by five NOT statements with P2 start,
P4 duration, P5 frequency, P6 amplitude. 22050 Hz, 12-bit DAC quantization
like the Epsco converter.

**Gesture bandwidth.** GROOVE sampled control functions at 100 to 200 Hz
because that is fast enough to record a human gesture. Steal the number as
a design rule: sample the pointer, the sensor, the crowd at gesture rate,
not at render rate; store the gesture; replay it through a different
instrument than the hand that made it. The piece becomes the space between
the gesture and its re-voicing.

**Sample-level editing with realtime audition.** The GROOVE scope let you
move to one sample of one stored function and hear it sustained while you
changed it. The principle generalizes: every parameter of a piece should be
grabbable at its own resolution and auditionable immediately. A piece whose
parameters you can only set blind is a piece you cannot tune.

**The Sequential Drum decoupling.** Fix the pitch line in memory; give the
performer only time, force, and position. Constraint in one dimension buys
freedom in the others. For interactive pieces: decide which dimension the
system owns and which the player owns, and make the ownership visible.

**Score as tree, not as list.** Subscores attached to events, side branches
that end while the trunk continues. Synchronization falls out of the climb
rate. For pieces with phases or movements: nest, do not sequence.

**The abstraction/speed sandwich.** Fortran outside, machine code inside.
Write the structure in the most readable language available and the hot
loops in the fastest. Do not invert this.

## What makes it sing, and what is overdone

What sings is the restraint about control: Mathews kept finding the
smallest contract that could carry the music (p-fields, sampled time
functions, three numbers from a drum hit) and then built everything above
it. The unit generator is the purest form of this. Thousands of computer
music systems later, the idea has not been surpassed in flexibility, his
1980 claim, and it is still true.

What is overdone, in his own work and the field he founded: the
Stradivarius emulation impulse. He spent real years making an electronic
violin sound like a good acoustic one, and it is the least interesting
thing he did next to GROOVE and the unit generator. Imitating the old
instrument is a warmup; the new instrument is the point. Also overdone: the
offline workflow as an aesthetic. Compute now, hear later was a hardware
limitation, and every system he built after 1968 was an attempt to escape
it. Do not romanticize the render queue.

**Avoid-list additions:** skeuomorphic instrument imitation as the goal;
offline-only workflows treated as a virtue; parameter contracts that leak
the instrument's internals into the score.

## Local re-render (evidence)

`goals/generative-doodles-site/hidden_files/study-2026-09-28-mathews/`:
musicv.py (orchestra of OSC/ENV/AD2/OUT, NOT score, 12-bit quantization,
writes etude.wav, 4.6 seconds, original etude), viz.py, study_frames.png
(waveform at full length, 0.12s zoom showing wavetable steps and the
octave-up shimmer, spectrogram with note entries and decays, score ladder
with the NOT p-field statements and the orchestra wiring line). The WAV
decodes clean (1ch, 16-bit, 22050 Hz, 123479 frames). Not cycle-accurate to
Music V: ugens run per note in Python/numpy, not per 512-sample buffer in
Fortran plus machine code, and the envelope is a breakpoint list rather
than a table function. The structure, orchestra wires, score instantiates,
is faithful.
