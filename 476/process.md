# No.1551 "The Turning Away" (elissa-blount-moorhead EM8, PP798)

Gallery date: 2006 · 04 · 11. Completes expansion study #204 (elissa-blount-moorhead).

## What it is

A dark field (near-black #121014) with a rigid system on the left: a row of 7 tall,
even bars in cold grey #5a5a62, ticking up and down in lockstep. On the right, a
loose circle of 9 dots dances in bone #e0d6c0, gold #c9a86a, and muted red
#a34a2e, varied sizes and speeds. A slow band of pale gold light (#c9a86a at 0.18
alpha, flat translucent rect, never a gradient) drifts left to right over 60 s,
then resets. Wherever it passes over the bars, they soften: they tilt (bend),
shorten, warm in color (toward ochre #c98f3d or brick #a34a2e), and drift toward
the circle, joining its dance. When the band passes, the bars firm up again —
except one bar per cycle, which stays soft and stays with the circle.

## Loop

240 s super-loop = 4 cycles of 60 s. Each cycle has one latched convert, chosen
by a seeded mulberry32 stream (seed 1551000), so the loop closes exactly. The
band position is a closed-form function of band-clock time (piece time minus
accumulated band-hold durations); without drags, band-clock time equals piece
time. Bar stiffness is a closed-form function of band overlap (smoothstepped)
and the latched convert schedule. Dot orbits use periods dividing 240 s
(30/40/48/60/80/120/240), so every dot closes exactly. Bar tick period is 8 s
(lockstep, same phase for all bars). Frame one is draw(0): band off-frame left,
bars tall, even, cold grey, circle dots at base angles.

## Drag

- Dragging along the band (grab inside the band's x-range, above the bars) holds
  the band in place: the band clock freezes while held, so the softened scene
  holds longer; on release the band resumes from the frozen position.
- Dragging a bar rightward toward the circle by more than 0.06 of the width
  converts that bar early: it stays soft for the remainder of the super-loop
  (the drag convert is keyed to its band-cycle and persists into later cycles,
  resetting only at the super-loop boundary). Exactly one bar per drag
  gesture; dragging away from the circle converts nothing. A drag gesture
  never converts all bars at once, never freezes the band permanently, and
  never makes the circle rigid (dots dance throughout).

## Adaptations

- Canvas 2D only; closed-form motion over piece time and recorded events, never
  frame-integrated state; every sine on loop-local time; flat colors only, the
  light band a flat translucent rect, never a gradient; fully silent, no
  AudioContext at all; fading alphas rounded to 4 decimals; dots drawn each
  with their own beginPath plus a moveTo before the arc; fixed-phase first
  frame; rAF loop as a plain function declaration; viewport from the Visual
  Viewport API with canvas pinned in draw(); phone detection via window.screen
  with aspect fallback (layout is fractional full-bleed on all sizes, so the
  left-third/right-third composition holds on phones too).
- Convert selection from the seeded stream, never Math.random. Converts
  accumulate within the super-loop: at the end of cycle k exactly k+1 bars
  stay soft (cycles 0..k's converts), and the whole convert set resets only
  at the super-loop boundary (t=240 = t=0, all bars rigid again), so the loop
  closes exactly. The four converts are drawn one per cycle from the
  remaining bars, so they are always distinct: the raw seeded draws repeat
  (bar 0 twice), which would have capped the accumulation count, so the
  mapping draws an index into the not-yet-converted bars instead. Seed
  (1551000) and draw positions are unchanged — exactly one draw per cycle —
  so every later seeded value (dot sizes, phases, bar dance phases) is
  untouched and frame one is byte-identical to the pre-fix build. A
  bar-drag convert is recorded under its band-cycle and persists for the
  remainder of its super-loop pass; it does not suppress that cycle's
  scheduled convert.

## QA

probe-1551.js (vm-isolated, real node-canvas, driving the piece's own rAF loop):
all 46 probes pass, including loop closure byte-identical at t=240 and t=480;
bars equal height and cold grey at t=0 with a lockstep tick to 1.05 at t=2;
band monotonic over 0–50 s, centered at t=30, reset at t=60; a bar under the
band soft (>0.9), shorter, tilted, warmed (R > 150), drifted right; converts
accumulate: exactly 1 bar soft at the end of cycle 0 (convert 0), 2 at the end
of cycle 1 (converts 0–1), 3 at the end of cycle 2, 4 at the end of cycle 3,
and all bars rigid again at t=240; the 4 converts are all distinct
([0, 1, 6, 3]); band hold freezes band center and all soft values, resumes
exactly (held t=30 equals control t=20), and never freezes permanently; bar
drag converts exactly that bar early, stays soft after release, stays soft
into cycles 1 and 2 (t=70, t=130), and resets at t=240; drag away from the
circle converts nothing; all 9 dots move between t=10–12 and t=200–202;
identical drag sequences byte-identical; thumb byte-identical across two
independent renders (and byte-identical to the pre-fix thumb: frame one is
unchanged). Forbidden-API grep: 0 hits.

Fix rounds: one probe-side correction in the original build (the bar-center
pixel check first sampled x=130, the antialiased right edge of bar 3, instead
of its center x=122; the piece was correct). One piece fix round after the
gate: the convert latch reset at each cycle boundary, so a convert stayed soft
for its own cycle only; the latch now accumulates within the super-loop and
resets only at its boundary, the convert draw now picks an index into the
remaining bars so the four converts are distinct, and drag converts persist
for their super-loop pass (pass-scoped, so they do not leak into the next
pass). Desktop and mobile re-rendered after the fix and inspected: identical
to the pre-fix renders (same file hashes), bars left third, dots right third,
empty middle, no clipping, no text, no numbers.
