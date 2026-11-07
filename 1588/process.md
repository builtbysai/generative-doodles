# №1588 Each Answer Becomes a Frequency

EXPANSION #209 che-yu-wu, prompt PP835 / CW5. Tap is an answer.
Gallery date: 2006 · 05 · 18 (formula 2002-01-10 + 1589 days).

## Mechanism

A dark blue water surface (#0A2A5E) fills the frame. On a fixed
schedule, a new concentric ripple mandala blooms every 3.0 seconds of
loop time at a position from a fixed 12-point table (a 4 x 3 grid,
ordered so consecutive blooms jump across the frame; nearest
simultaneous pair is always well over 15% of frame apart). Each
mandala carries two frequency components: ring spacing and petal
count (6-12 petals on the first component, more on the second), a
speed, and a violet accent interval, all derived from a fixed-seed
LCG keyed by bloom index. Rings are drawn as polylines whose radius
is modulated by cos(petals * theta), so they read as geometric
cymatic mandalas, not plain pond circles. Two components per source
mean the overlapping rings interfere into ever-changing lace. About
4-5 mandalas are active at any time (active life 14 s).

Residue: each mandala deposits five faint rings at fixed radii
(0.055 to 0.223 of the short frame dimension) on a fixed deposit
schedule (ages 1.5, 3.7, 5.9, 8.1, 10.3 s). Residue rings are kept
as a JS array of ring records with alpha decaying on a 55 s time
constant, drawn directly every frame. There is no offscreen canvas
and no decay layer; the surface accumulates history as data.

Standing-wave flash: every frame, each pair of active mandalas is
checked for ring-front crossings (first-component radii rA + rB
equal to the distance between centers, within 10 px). At the
crossing point on the line between centers, expanding white rings
and a bright core are drawn directly. No bloom sprite, no gradient.

## Interaction

Tap anywhere: the tap IS an answer. A new mandala blooms at the
touch point with a frequency from a fixed authored 8-entry tap
table, advancing one entry per tap (tap count indexes the table).
Tap mandalas use the same ring, residue, and flash paths as
autonomous ones. No click-to-reload; taps only add answers.

## Palette

Water #0A2A5E ground; rings cyan #5AC8F5, ice white #DDF4FF, deep
violet #4A2A9E accents; flash white #FFFFFF. Nothing else.

## Determinism

First frame is drawn synchronously at a constant loop phase of
15.0 s, so five mandalas are already active and residue is visible.
The rAF loop is anchored as phase + elapsed-since-load. All
positions, frequencies, and schedules come from fixed authored
tables and a fixed-seed LCG. No Math.random, no Date.now, no
wall-clock input anywhere.

## Deviations from the prompt

- Tap frequency: the prompt derives it from tap-interval entropy.
  Wall-clock intervals are not reproducible, so tap count indexes a
  fixed authored frequency table instead. The same tap sequence
  always gives the same mandalas.
- Residue is a JS array of ring records with decaying alpha, not a
  separate offscreen decay layer (per the spec adaptation).
- Flashes are computed from actual ring-front crossings each frame,
  not scheduled; they occur when two rings genuinely meet.

## Proposed gallery note

"Ripple mandalas bloom on dark water and leave glowing residue. Tap to answer."

## QA

Rendered from the actual script with node render-piece.js at
1280x900 desktop, 390x844 mobile, and 720x720 thumb. All three
read as concentric petal-modulated cymatic mandalas with visible
faint residue lace and white standing-wave flashes at ring
intersections. Thumb rendered twice: byte-identical
(md5 79d46d324bc7f4aa96b1a311bde477bc). Tap probed with a node
harness: a pointerdown at (640, 450) bloomed a new mandala at the
touch point (tap-table entry 0, lam1 0.030, 6 petals), and a second
tap advanced the table (lam1 0.042, 8 petals). First frame phase
was moved from 9.0 s to 15.0 s after inspection showed the 9 s
frame left the top-right of the frame empty; at 15 s the mandalas
cover the frame.
