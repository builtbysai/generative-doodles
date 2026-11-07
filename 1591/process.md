# №1591 The Last Input

EXPANSION #209 che-yu-wu, prompt PP838 / CW8. The virus fight is the mechanism.
Gallery date: 2006 · 05 · 21 (formula 2002-01-10 + 1592 days).

## Mechanism

A dark void (#050508) holds a faint blue grid plain (#1E2A4E) seen
from low altitude under a slow closed-form orbiting camera (yaw
0.22 + 0.004t). A ghost pianist plays an autonomous score: a
pentatonic random-walk melody (degrees 0, 2, 4, 7, 9, 12, 14, 16,
19, 21, 24) with seeded rests, one note every 0.8 to 1.7 seconds
for the first 58 seconds of each cycle. Every note is born as a
tower: a canvas-2D wireframe box in an oblique pseudo-3D
projection, height from pitch (0.18 to 0.73 world units), glow
from velocity, with a grow-in animation and a hot white
(#FFF5E0) top face, center spine, and cap dot. Towers occupy 27
slots in three depth rows of nine. The score is a pure function
of fixed-phase piece time, so the birth rhythm is visible and
reproducible.

At 58 seconds the score goes quiet and the virus starts. A red
(#D9283A) particle agent infects the tallest tower, which
collapses to an ash grey (#3A3A40) stub after 1.2 seconds, and
two agents split off to hunt the next tallest towers. Agents fly
in straight lines at 0.45 world units per second, up to 6 in
flight at once, each claiming the tallest remaining live tower,
eating it on arrival and splitting again. The whole city falls
in about 18.6 seconds (collapse at 76.59 s in the first cycle).
Then the plain goes dark for 3 seconds, a single soft low note
sounds, and the first seed tower rises at the center slot as the
next cycle begins. The arc repeats with a new seeded schedule
each cycle.

## Interaction

Watch-only by default: the ghost score plays itself and the
virus fight runs without input. Drag anywhere and your finger
becomes the pianist: dragging up and down the frame plays notes
(height from pointer height, quantized to the pentatonic scale)
and spawns towers at the pointer position on a movement
threshold (14 px vertical or 26 px horizontal). Drag towers join
the city and the virus can hunt them. No clicking; no UI; no
click-to-reload or restart.

## Palette

Black ground #050508; grid faint blue #1E2A4E; towers amber
#E8A93A with hot white #FFF5E0 cores; virus red #D9283A; stubs
ash grey #3A3A40. Nothing else.

## Determinism

First frame is drawn synchronously at a constant loop phase of
64.0 s, mid-fight: 21 live towers, 6 stubs, 6 red agents in
flight. The rAF loop is anchored as phase + elapsed-since-load.
All note times, pitches, slot orders, and virus events come
from fixed-seed LCGs and a deterministic event simulation. No
Math.random, no Date.now, no wall-clock input anywhere. The
ghost score is visible only: there is no WebAudio at all, per
the brief, so the visual timing works silent.

## Deviations from the prompt

- First frame phase is 64.0 s (mid-fight) rather than the start
  of the build, so the thumb shows the virus fight in progress
  instead of a quiet empty plain.
- Virus speed and agent cap are tuned values (0.45 world units
  per second, 6 agents in flight). At the first values the
  fight dragged past the 40 second force-collapse cap; at these
  values the city falls in about 18.6 seconds.
- The virus targets by claiming the tallest remaining live
  tower at each split, rather than retargeting in flight; a
  tower is claimed once and eaten on arrival, so no two agents
  ever chase the same tower.
- Drag towers born during the virus phase join the target pool
  (the virus simulation is recomputed each frame from current
  state), but the segment boundary and collapse time are
  computed from ghost towers only, so a drag tower can outlive
  the cached collapse into the darkness window and is cleared
  at the reseed.
- The projection is oblique (yaw plus a fixed tilt term), not
  true perspective; the camera orbit is a closed-form yaw angle,
  so frame one is reproducible.

## Proposed gallery note

"Amber towers rise on a ghost pianist's notes while a red virus eats the city. Drag to play."

## QA

Rendered from the actual script with node render-piece.js at
1280x900 desktop, 390x844 mobile, and 720x720 thumb. All three
read as amber wireframe boxes with hot white cores on a faint
blue grid plain, grey stubs and red virus agents with trails
visible, the city sitting in the middle band; the mobile frame
keeps the same centered-band composition. Thumb rendered twice:
byte-identical (md5 4c6f3803fa3c933ffaf8f78eff095f65).
index.html md5 e43e4995deccdf13e65d8c87c6b74d9e.

Forced-time renders verified the arc: t=30 shows the build in
progress (20 towers, no virus); t=64 shows the fight (6 eats,
6 agents in flight); t=71.5 shows the late fight (19 of 27
towers eaten, mostly grey stubs); t=78 is total darkness after
the collapse at 76.59; t=84 shows the reseed (segment 1, 4
towers rising including the center seed tower). A node probe
confirmed the ghost score births 42 notes over 58 seconds and
the virus eats all 27 towers with no runtime errors. A drag
probe (pointerdown plus three pointermoves) spawned 4 towers at
the pointer and they render as tall amber boxes at the drag
position.
