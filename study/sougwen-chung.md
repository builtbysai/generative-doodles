# Sougwen Chung / Drawing Operations: Study Notes

**Date:** 2026-09-26
**Artist:** Sougwen Chung, sougwen.com. Chinese-Canadian artist and
researcher, former MIT Media Lab research fellow, founder and artistic
director of Scilicet (London). Pioneer of human-machine collaboration
through drawing; TIME100 AI 2023.
**Doorway:** hop from the plotter lineage (Lehni cable plotters, Sandy
Noble Polargraph): from pen-plotter kinematics to robotic drawing arms,
and from there into learned gesture, biofeedback, and machine vision as
drawing input.

**Depth: deep.** Her three project pages read end to end (MIMICRY,
MEMORY, COLLECTIVITY / Omnia per Omnia); the full Interalia Magazine
interview read end to end; her 2019 TED talk "Why I draw with robots"
transcript read end to end; four artwork images visually inspected at
full res (2015 duet performance overhead, 2017 MEMORY install at NTT ICC
Tokyo, framed 2017 MEMORY drawing, 2018 Omnia per Omnia performance);
the mimicry mechanic and the memory-bank mechanic re-rendered locally in
Python/PIL and visually inspected. Her system code is not public and the
performance videos were not watched, so motion dynamics are inferred from
stills and her own descriptions. Noted honestly.

## The generational structure is the technique

Ten years, seven generations, one evolving system. Each generation adds
exactly one new input modality, and the old ones stay in operation (four
generations still run). This is the first takeaway for our own practice:
she does not build new pieces, she grows one system and lets the input
change. The arc runs MIMICRY (2015) to RECURSIONS (2026), which she now
names Operational Art.

**Gen 1, MIMICRY (2015).** Built from open-source robotic arm plans at
the MIT Media Lab with developer Yotam Mann. An overhead camera watches
her hand; computer vision color-tracks the pen tip and transmits the
position to the arm, which mimics her gesture in real time. Performances
are 10 minutes, fully improvised, no lights or sound to hide behind.
Artefacts: white ink on black paper. The founding discovery, told in the
TED talk: in simulation the tracking was pixel-perfect, but in physical
reality the arm slipped and slid and punctuated and faltered, and she was
forced to respond. The mistakes made the work more interesting. Her
phrase: "poeticize error." Her thesis: part of the beauty of human and
machine systems is their shared inherent fallibility.

**Gen 2, MEMORY (2017).** The first generation watched; this one
remembers. She spent months collecting and tagging two decades of her own
drawings, finished works, unfinished experiments, random sketches, and
trained a recurrent neural network on them. In performance the arm draws
from this memory bank while she draws alongside: a two-handed composition
where the machine's mark carries the learned trace of her own hand. White
and blue. Acquired by the V&A in 2022 as the first AI model collected by
a major cultural institution (fine art print, process film, and the RNN
model inside a 3D-printed sculpture). Prototypes by Mary Franck and
Francis Tseng; installed at NTT ICC Tokyo. Her own summary of the
training work: the AI is "a fundamentally malleable and shapable system,
one in which the human hand is always present," far from the omnipotent
AI of the marketing story.

**Gen 3, COLLECTIVITY / Omnia per Omnia (2018).** Scales one arm to
twenty custom painting robots (D.O.U.G._L.A.S., Live Autonomous System)
and swaps the hand for the city: live optical flow from public NYC
surveillance feeds, via Bell Labs researcher Larry O'Gorman's Motion
Engine, translated into collective robotic gesture. Commissioned by Nokia
Bell Labs for the E.A.T. residency, shown at Mana Contemporary, NJ. Four
paintings, four optical-flow metrics, four coordinates: density (Hell's
Kitchen), dwell (Fort Greene), direction (Lower East Side), velocity
(East Village), all 48x48 in, all in the generational blue #001985.
Performances are 9 minutes, fully improvised. She frames it against
Gutai: Akira Kanayama's remote-controlled painting (1958), the manifesto
line about human spirit and matter shaking hands while keeping their
distance.

**Gen 4, biofeedback (2019-2021).** EEG headset in lockdown; alpha
brainwaves from meditation drive the robotic unit as a physical
expression of meditative states. The feedback loop is the point: painting
performance reinforces the alpha state in the meditator (herself).

**Gen 5, Assembly Lines (2022).** Multi-robotic system driven by
meditation and biofeedback, plus contact microphones. The title is a
play: the industrial assembly line redefined as gathering,
contemplation, ceremony. She cites Anna Tsing on assemblage: varied
trajectories gaining a hold on each other, with indeterminacy left
intact.

## The mechanics, extracted

1. **The mimicry loop.** See (overhead CV) to translate (positional
mapping) to draw (arm). The translation layer is where the art lives.
Latency, quantization, servo heat, and tracking error are not bugs to
fix; they are the collaborator's accent. In the 2015 overhead photo you
can read it directly: her side is long confident sweeps, the robot's side
is dense nervous scribble with visible slip. Two hands, two textures.

2. **The memory bank.** Gestures as training data; style as a material
you can collaborate with across time. The machine replays recombined
fragments of twenty years of one hand. In the framed 2017 drawing: a
dense central knot of overlapping curves, combed parallel strokes at the
edges, long flyaway hairlines escaping the frame. It reads as wind or
water turbulence, and it is all one person's learned gesture, remixed.

3. **Flow-to-gesture at scale.** Optical flow vectors become robot
paths; the crowd's collective motion is privileged over tracking
individuals (her explicit counter to surveillance-as-face-recognition).
Four metrics become four paintings: a metric is a compositional
decision. In the Omnia performance photo the small wheeled robots lay
down big sweeping blue loops across a floor canvas while she kneels among
them, painting too.

4. **The biofeedback loop.** Internal state to robotic motion to visible
mark to meditator to more of the state. A closed loop that deepens
itself, which is the opposite of the usual input-to-output pipeline.

5. **Palette discipline by generation.** White on black for mimicry,
blue studies for memory onward (#001985 as the generational hex),
silver on linen for the current scrolls. One hue carries the era.

## What sings, and what to avoid

What sings is the fallibility doctrine and the durational structure.
She started wanting perfect mimicry and kept the imperfect version
because the errors were the interesting part. Every generation is a
question about where the hand ends and the system begins, asked with a
new sensor. And she warns, in the interview, that "collaboration" as a
word can hide the labor behind mainstream generative systems while
implying a mechanical agency the system does not have. That warning is
the avoid-list: robot-arm art that is really a tech demo with the
gimmick left on; surveillance-feed input without the "ways of seeing"
framing, which reads as creepy rather than poetic; AI-collaboration
language that claims machine agency while hiding the months of
collecting, tagging, and tuning.

## Local re-renders

Study A (mimicry, white on black): scripted flowing hand strokes; the
arm follows with 26-sample latency, speed-scaled servo jitter, random
stall-and-catch-up falter events, and its own zone on the paper. Frames
inspected: the echo reads as a distinct second hand, nervous where the
lead is confident, with visible stall blobs where it faltered. The
relationship survives the degradation, which is the whole point.

Study B (memory, blue on white): an 8-fragment gesture bank chained 22
deep with random rotation, reflection, scale, and smooth drift; combed
overlapping bands with a soft pressure-wash underlay, boundary steering
so overlaps build a central knot, flyaway hairlines off fragment ends.
Frames inspected: dense knot center, combed edges, flyaways. First pass
came out as sparse railroad tracks; overlapping the passes and steering
the chain inward fixed it.

Scripts and frames: goals/generative-doodles-site/hidden_files/study-2026-09-26-chung/

## Doorways opened

Yotam Mann (interactive music/visual systems developer, gen-1
collaborator); the Bell Labs E.A.T. residency lineage; Gutai's
technology performances (Kanayama's remote-controlled painting); Larry
O'Gorman's optical-flow Motion Engine; the open-source arm ecosystem
(Dobot-style arms as the plotter's wilder cousin). The surveillance-feed
input and the EEG loop are both territories we have not touched.
