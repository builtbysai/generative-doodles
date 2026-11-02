# №1520 "The Circle That Refuses to Close" (bintou-dembele BD1, PP767)

Gallery date: 2006 · 03 · 11 (recorded here only, never drawn in the piece).

## Spec

Eight abstract dancer-marks (short articulated glyphs: torso line + arm lines +
leg lines) move in a slow circle on a dark field, each tracing a slightly
different radius so the ring wobbles and breathes. A thin bright ring-line
tries to close around them: it draws itself, nearly completes, then a mark
steps out of line, the ring breaks open at that point, and the drawing starts
over. The circle never closes; the dancers never stop.

Palette: field near-black plum #17141c; dancer-marks warm ochre #c98f3d and
brick #a34a2e alternating; ring-line pale bone #e0d6c0; ground shadow #2a2430.
No other color. Composition: circle centered, large, filling most of the
frame; generous dark margins; the ring-line drawn just outside the dancers'
path.

Motion: watch-first, slow circling loop, about 50 seconds per ring attempt.
Marks circle counter-clockwise at slightly different speeds; every cycle one
mark steps outward and the ring breaks. Dragging along the circle speeds or
slows the circling (all marks follow together); dragging outward on a mark
pulls it out of the ring (the ring breaks at that mark, then re-forms its
attempt when released). Drag never stops a mark, never closes the ring, never
adds a mark.

## Implementation

- Canvas 2D only. One 50 s ring attempt per cycle: the ring-line draws from
  the top counter-clockwise to 95% over 0-42 s; during 42-46 s the stepping
  mark moves out (0 to 40 px, smoothstep) and a gap opens in the ring at its
  angle (0 to 1.1 rad); during 46-50 s the mark returns and the ring fades
  out, so the next attempt starts clean. Frame one is phase-shifted 20 s into
  an attempt, so the ring reads half drawn in the thumbnail.
- Stepping mark: one fixed permutation of the 8 marks (mulberry32, seed
  1520000), one mark per attempt, repeating every 8 attempts.
- Marks share one angular speed (one full counter-clockwise turn per
  attempt) with per-mark sinusoidal angle wobble and radius breathing; the
  wobble gives each mark a slightly different instantaneous speed while all
  variation periods (50 s, 25 s) divide the attempt, so frame one repeats
  exactly at every attempt boundary (probes: t=50, t=100, t=400 byte-identical
  to t=0).
- Drag is closed-form over recorded events and piece time, never
  frame-integrated: a tangent drag adds 0.45 x the pointer's unwrapped angle
  travel to every mark's angle while held, decaying with tau 3 s on release;
  an outward drag adds a clamped radial offset (max 110 px) to the grabbed
  mark and opens a 0.9 rad gap in the ring at its angle, both decaying on
  release (tau 1.5 s). Drag state returns exactly to schedule after release.
- Ground shadow is a flat disc in #2a2430 under the circle. No gradients, no
  canvas fading, no audio of any kind. No visible text except the title.
  Dancer-marks are abstract line glyphs only: no faces, no likenesses, no
  real names, nothing readable on screen.

## Deviations and readings

- "Slightly different speeds" is realized as per-mark angle wobble on a
  shared base speed, rather than permanently different speeds, so the loop
  closes exactly. The effect (marks speeding and slowing relative to each
  other through the cycle) is preserved.
- The ring draws to 95%, never 100%: the remaining 5% plus the break gap is
  what keeps the circle open, per the prompt's "nearly completes".
- A drag gap is only drawn where the ring itself is drawn: if the grabbed
  mark's angle falls in the arc's undrawn remainder, no gap appears there
  (the mark still moves outward). This is correct behavior, not a bug.

## Fix rounds (piece changes)

1. Scheduled step-out added: the first build opened the ring gap at break
   time but never moved the stepping mark itself. The mark now steps out
   0-40 px during 42-46 s and returns during 46-50 s (probe: radius jump
   18.3 px between t=22 and t=24 for exactly one mark, rest under 4 px).
2. Ring-gap angle mapping fixed: the first build's wrap loop could place a
   gap outside the drawn arc (or cycle forever when the mark fell in the
   undrawn remainder). Gap centers are now mapped by trying the center and
   its +-2PI equivalents and keeping the one inside the drawn interval, if
   any (probe: break gap 0.54 rad at t=24, exceeding the 0.31 rad undrawn
   remainder).

## Fix rounds (probe-side only, piece untouched)

- Cluster detection switched from exact mark colors to a tolerant warm-pixel
  test (anti-aliased glyph edges split exact-color cores into fragments).
- Settle checks compare big pixel changes (any channel > 8 levels) instead
  of raw differing-pixel counts, since the tangent drag's exponential decay
  leaves only sub-pixel rounding flips.
- Outward-drag target selection requires bone at the mark's own angle
  (narrow wedge), not a wide wedge that can pass by overlapping the arc's
  endpoint.
- Outward-drag expected position accounts for the mark's one-second
  counter-clockwise travel between press and measurement.

## QA (probe-1520.js, vm-isolated, real node-canvas, 32/32 pass)

- Frame one identical across fresh instances; loop closure at t=50, t=100,
  t=400 byte-identical to t=0.
- Exactly 8 mark clusters at t=0; radii spread 31.1 px.
- Counter-clockwise motion: a mark near angle 0 lands 4.2 px from its
  CCW-predicted position at t=2 and vacates its old spot (67.3 px away).
- Ring never completes: bone gap at t=0, 10, 20, 24, 29, 30; bone present
  mid-attempt.
- Tangent drag: held frame differs 2527 px; at t=11 all 8 marks shift by
  -0.161 rad uniformly (max deviation 0.002); settles with zero big pixel
  changes by t=40.
- Outward drag: mark lands 3.4 px from its target; wedge bone 752 to 7 px;
  frame differs 3786 px; settles with zero big pixel changes by t=40, 8
  marks throughout.
- Forbidden-API grep clean: no AudioContext, getUserMedia, Path2D,
  createElement, localStorage, Math.random, Date.now, performance.now,
  fillText, strokeText, gradients.
- Thumb byte-compare: two independent 720x720 renders byte-identical to the
  shipped thumb.

Files: index.html (md5 c10c814edeaf645479fadba09f3aaee6), thumb.png (md5
39234f356fa1d85ae8742d0029cdd7ce). Desktop (1280x720) and mobile (390 wide)
renders inspected personally: no clipping, circle centered with generous
margins on both.
