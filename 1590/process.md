# №1590 Entropy, Running

EXPANSION #209 che-yu-wu, prompt PP837 / CW7. The code wall is the
live brain of the room.
Gallery date: 2006 · 05 · 20 (formula 2002-01-10 + 1591 days).

## Mechanism

A dark room (#050506) in three walls, full-bleed triptych with
slightly slanted seams, floor in the lower third carrying a soft
reflection of the center wall at 30% alpha.

The simulation is a seeded curl-noise-style particle system, run
for real. A new whirl spawns every 4.0 s of loop time (up to 8);
each whirl has a fixed center, rotation direction and speed, reach,
and arm count, all from a fixed-seed LCG keyed by whirl index.
Each whirl owns 36 particles; a particle's position is a pure
function of loop time (orbit angle advances with whirl rotation,
radius grows from its seed to the whirl reach, plus a sinusoidal
curl wobble), drawn as a short white or grey streak along its
orbit. When a whirl spawns, its 36 streaks appear on the center
wall as a new swirl arm, and its entry is appended to the code
wall. At the fixed first frame (t = 15.0 s) four whirls are live,
144 particles, and the marble swirls fill the center wall.

The left wall displays the piece's own running source as live
text, built each frame from real state variables: u_time (two
decimals, a pure function of fixed-phase piece time), tick
(floor of t * 30), whirl count, active particle count, burst
count, one line per live whirl (center x/y, rotation), and a
spawn log (whirl spawns and burst events with real times). Line
numbers advance as the log grows and the window scrolls slowly.
Nothing on the code wall is faked: every number is read from the
same variables that draw the swirls.

The right wall shows the word "Entropy" in huge bold monospace
white. Firework bursts in white-gold pop off the letters: a burst
spawns every 2.5 s (offset 1.25 s so one is always mid-flight)
from a letter position cycling through the seven letters, 12
particles with seeded directions and speeds, fading over 2.0 s.
Below the word, a scrolling list of the last spawn events
(whirl spawns and bursts, newest last) in grey monospace.

The floor mirrors the center-wall streaks, flipped and
compressed vertically under the floor line at 30% alpha, clipped
to the center wall's footprint.

## Interaction

Watch-only. No pointer interaction of any kind: no tap, no drag,
no click-to-reload. It is a performance, not an app. A small grey
"watch only" caption sits at the bottom of the floor.

## Palette

Black ground #050506; code and swirls white #F5F5F2 and grey
#8A8A92; Entropy type white; burst particles white-gold
#F2E8C4; floor reflection at 30% alpha. Nothing else.

## Determinism

First frame is drawn synchronously at a constant loop phase of
15.0 s. The rAF loop is anchored as phase + elapsed-since-load.
All whirl parameters, particle seeds, burst directions, and
schedules come from fixed-seed LCGs and authored tables. No
Math.random, no Date.now, no wall-clock input anywhere. The
u_time display is a pure function of fixed-phase piece time.

## Deviations from the prompt

- Code lines are shortened on phones (abbreviated labels, whirl
  lines drop the rotation value) so every line fits the narrow
  left wall; desktop shows the full lines.
- Burst schedule is offset by 1.25 s from the 2.5 s grid so a
  burst is always visibly mid-flight in the first frame, rather
  than a burst landing exactly on t = 15.0 with zero spread.
  Burst life is 2.0 s so one burst is visible at a time.
- The "curl-noise" field is an analytic orbit plus sinusoidal
  wobble, not a sampled noise texture; the swirl arms read as
  marble streaks and every streak is a pure function of loop
  time.
- Perspective is carried by slanted wall seams and the floor
  line; wall text itself is drawn upright for legibility.

## Proposed gallery note

"The code wall runs the room: live source, marble swirls, and Entropy shedding sparks. Watch only."

## QA

Rendered from the actual script with node render-piece.js at
1280x900 desktop, 390x844 mobile, and 720x720 thumb. All three
inspected: code wall legible at both widths (phone lines fit
after the abbreviation fix), Entropy type clear, burst sparks
visible popping off the letters, floor reflection legible.
Thumb rendered twice: byte-identical
(md5 ba7af0be3467b6c35626abe616403d60). Time-change probe with
forced phases: t=0 shows u_time 0.00, whirls 1, parts 36, one
barely-formed swirl; t=5 shows u_time 5.00, whirls 2, parts 72,
two swirl arms plus bursts, a different image. A burst-count
display bug (showing -1 before the first burst) was caught in
the t=0 probe and fixed by clamping to zero; the thumb md5 is
unchanged by the fix since t=15 is past the first burst.
