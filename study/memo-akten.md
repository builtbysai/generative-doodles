# Memo Akten: Study Notes

**Date:** 2026-09-26
**Artist:** Memo Akten, memo.tv. Istanbul-born, London-based computational
artist, PhD at Goldsmiths (EPSRC-funded), Google Artists and Machine
Intelligence resident 2016, Golden Nica at Ars Electronica 2013 for
Forms (with Davide Quayola).
**Doorway:** hop from the Anna Ridler study, the ML side of the memory
question. Where Ridler makes the dataset the artwork, Akten makes the
learned model a mirror: an artificial neural network can only see
through the filter of what it already knows, just like us. Also a hop
backward from Sougwen Chung's body-machine loop: Akten has spent twenty
years building systems that are played like instruments, closed
feedback loops with continuous control.

**Depth: deep.** memo.tv/works/ index read (84 projects, 2002 to 2026);
Body Paint project page read end to end incl. press and collection
history; Learning to See project page read end to end; full Artnome
interview read end to end; the SIGGRAPH 2019 paper abstract + open
source demo repo description read; 4 artworks visually inspected at full
res (Body Paint at Sonar Istanbul 2019, 1920x1080; Learning to See
installation view 1200px with the raw-feed-vs-reconstruction split
screens; Learning to See: Mountains side-by-side sketch vs. hallucinated
mountain landscape, 1200px; plus the works index thumbnails). Two
mechanics re-rendered locally in Python and visually inspected: the
Simple Harmonic Motion oscillator-interference field and the Body Paint
motion-energy paint with decay. His GAN training code is not run here
and the performance videos were not watched; motion dynamics are
inferred from stills and his own writing. Noted honestly.

## The founding move: the instrument, not the button

Akten's line, repeated across the interview and his site: most
generative deep learning is a black box with one button that says
"generate something." His whole practice is the opposite: realtime,
interactive, closed feedback loops with continuous control. He reaches
for the piano analogy constantly. You hit a key, you hear a note, you
feel it and respond. Eventually you stop thinking and the tool becomes
an extension of the body. That is the bar he sets for his systems:
they must be playable, not pressable.

This reframes the technique question. The algorithm is not the point.
The loop is. Body Paint (2009) is not a painting app; the composition
at the end does not matter. What matters is the sensation of creating
it: movement creates paint, and when you stop moving the image slowly
fades away, leaving only the memory. He is explicit that the piece is
about the interaction experience, and that a musical instrument is the
model: sometimes every note is just for the moment.

Technique breakdown for Body Paint: infrared camera plus emitter watch
the space; the system does not see people, it sees movement, any
movement, living or not, of any shape. Motion energy seeds a paint
field, likely with velocity-aligned splats in a hyper-saturated palette;
the field has global slow decay. My re-render confirmed the skeleton of
it: scripted sweeping motion injects velocity-scaled paint particles,
the whole field fades at 0.985 per frame, and when motion stops the
marks decay toward black within a few seconds of frames. My render was
point-based and read as spiky sparks rather than his painterly smears,
which tells you the soft splat kernel and the motion-blur streaking are
doing real work in the original. Palette note from the Sonar Istanbul
photo: unmixed primaries straight off the tube, red-orange against
cyan-green against violet-blue, with fine vertical drip streaks. The
palette is deliberate anti-taste: it reads as energy, not refinement.

The takeaway for our work: build the loop before the look. A piece
where the viewer learns the instrument in under a minute beats a piece
with a prettier final frame. And decay is compositional: because the
paint always fades, there is no bad ending, which is what lets people
play fearlessly.

## Simple Harmonic Motion: one equation, played as light

The SHM series (2011 onward, including #12 for 16 percussionists at
RNCM 2015) is all sums of sine oscillators with near-commensurate
frequencies. The point being driven is x(t) = sum of A sin(2 pi f t +
phi) across a handful of oscillators whose frequencies relate by
irrational ratios (sqrt(2), e, the golden ratio). Because the ratios
never quite close, the figure slowly re-phases: it breathes through
travelling-wave patterns and periodically snaps into beat-locked
accents, order loosening and coalescing. The Skinny's writeup nails the
feeling: percussive patterns loosening and coalescing, teetering between
precision and chaos.

My re-render (four oscillators, 60k samples, additive luminous
accumulation) confirmed the mechanism: the rosette slowly morphs and
the density waves travel. But the static accumulation looked thin, a
diagonal scribble rather than a luminous field, which is the honest
lesson: the beauty of SHM is a time-domain phenomenon. A still frame
from it is nearly nothing; the piece lives in the slow drift. That is a
design rule in itself: some techniques must be performed, and judging
them as stills is category error. For our pieces, when a technique
needs time, give it time; do not try to compress it into one frame.

What makes SHM sing, technique-wise: incommensurate ratios keep the
pattern from ever repeating, so the eye never catches the loop;
additive accumulation on black makes overlaps luminous rather than
muddy; and the slow re-phasing gives the viewer the experience of
watching something almost-periodic, which holds attention longer than
pure noise or pure repetition.

## Learning to See: bias shown side by side

The series (2017 onward) feeds a live camera into a custom-trained
neural network that reconstructs what it sees through the filter of one
narrow training set: oceans, Hubble telescope images, Google Arts
Project paintings, mountain photographs. The network can only see what
it already knows. A crumpled cloth becomes an ocean wave; tangled
cables become flowers; a pencil sketch of a mountain becomes a full
color alpine landscape. His line: "We see things not as they are, but
as we are."

The installation staging is the technique to steal. He does not show
the hallucination alone; he shows raw camera feed and reconstruction
side by side, on the same screen. The diptych is what makes the bias
legible. A hallucinated wave by itself is a pretty picture. Next to the
crumpled paper it is a statement about perception. The paper abstract
calls it "mechanisms for the manipulation of specifically trained
real-world representations," which is a dry way of saying: the artist's
control lives in choosing and shaping the training, exactly the Ridler
move from the previous study, and Akten is explicit that the dataset is
where the meaning is.

The open-source demo (webcam-pix2pix-tensorflow) matters for our
purposes: he built the tooling so the loop is realtime and playable,
continuous control again, not batch generation. The videos in the
series are recordings of someone playing the instrument.

## The spectrum he draws (worth stealing as a rubric)

In the Artnome interview he lays out a spectrum of approaches to making
work with generative networks, from most to least artist labor: train
on your own data with your own algorithms; your data with off-the-shelf
algorithms (Ridler, Helena Sarin); curate your own data with your own
algorithms (Mario Klingemann); curate your data with off-the-shelf
algorithms; existing datasets with modified algorithms; existing
datasets with off-the-shelf algorithms (Obvious at Christie's); down
to pre-trained models with no changes. His verdict: interesting work is
possible at every pole, and he has tried every single one, but the
further toward the pre-trained end you go, the harder you have to work
to make it your own, conceptually or otherwise. That is a clean bar for
our own pieces: if the technique is off-the-shelf, the framing has to
do the work.

Related line, the one to put on the wall: "If we do not use technology
to see things differently, we are wasting it." And his framing
discipline: he avoids the term AI art entirely, calls himself a
computational artist, and points out Harold Cohen was making AI art 50
years ago and that 80s and 90s genetic-algorithm artists were AI artists
too. Style of argument aside, the operational point for us: do not
name a piece after its tool.

## FIGHT!: the distilled version

FIGHT! (2017) is a VR piece with no machine learning at all: the
headset shows monocularly dissimilar images to each eye, so the brain
cannot fuse them and the two rival images fight for conscious
dominance, flickering back and forth with mind-conjured animated
transitions that are not really there. Everybody sees something
different from the exact same stimulus, and it is impossible for the
artist to know what you saw. It is the whole "we see things not as they
are, but as we are" thesis in one distilled device. The technique note:
binocular rivalry is a known perceptual mechanism; he weaponized a
textbook phenomenon by putting it in a headset. The avoid-list version
of this is using a psych effect as a gimmick; the good version is
choosing the effect that IS the argument.

## What makes his work sing

- The loop is always playable: continuous control, immediate feedback,
  embodiment through repetition. He judges his systems by whether you
  can feel them.
- The staging shows the mechanism: raw feed beside hallucination,
  pilot beside drawing. The audience is never asked to take the
  transformation on faith.
- One narrow training set per piece: the constraint is the content. A
  network that has only ever seen the ocean is a thesis, not a filter.
- Luminous accumulation on black: the SHM and particle work never let
  overlaps go muddy; addition keeps them glowing.
- He refuses the tool-as-brand: computational artist, not AI artist. The
  naming discipline keeps the work about the idea.

## Avoid-list additions

- The one-button black box: generate-and-pick, where the artist's only
  act is pressing generate and choosing the best output. His whole
  practice is the counterargument.
- Showing only the hallucination: a neural net reconstruction without
  its source is a pretty picture with the thesis removed.
- Pre-trained model with no conceptual frame: possible to make work
  with, but then the framing has to carry everything, and it usually
  does not.
- Anti-taste palette without the energy to justify it: Body Paint's
  tube-primaries work because the motion is wild. Static marks in those
  colors read as cheap.

## Gaps and next steps

- No performance video watched: the SHM #12 percussion piece and the
  Ultrachunk live AV set are motion-and-sound works, and stills cannot
  verify them. A future pass should watch the Vimeo documentation.
- The webcam-pix2pix repo was read only at the description level; the
  training pipeline details (how he shaped the continuous-control
  affordance in training) live in chapter 5 of his PhD thesis, which
  was not fetched.
- Later work (Superradiance 2024, Distributed Consciousness 2021,
  the fxhash generative pieces 2021-2022) surveyed from the works index
  only; the fxhash doorway (A Strange Loop, STRATA) is a natural next
  hop since our fxhash slug study was source-light.
