# №1413 "The Borrowed Voice" (christine-sun-kim CS6, PP636)

## What it is

Two hands drawing the same line. A leader hand in front draws a loose looping
course across a paper field; a follower hand trails behind, re-drawing the
leader's path a beat late and slightly wrong. The gap between the two lines
is the piece.

## Frame one

Paper field with seeded charcoal smudges. A faint ghost of the full looping
course underneath. The leader's black trail (last 10 s) with the gold-rimmed
leader hand at its head; the follower's red trail, visibly wobbling and broken
by dropped segments, with the red follower hand trailing behind. A thin gray
ghost line connects the two hands. Bottom-left: a lag gauge (steel track,
gold fill proportional to the current head-to-head gap, leader/follower dots)
— drawn as shapes, never text. No visible text except `<title>`.

## Mechanics (all closed-form over piece time and recorded events)

- Leader course: a closed parametric curve (seeded harmonic phases), one full
  loop per 36 s. The leader head is `course(t / 36)` plus a drag offset.
- Follower: replays the leader's path with a fixed 2.5 s time lag, plus
  seeded error — a perpendicular wobble whose amplitude grows with local
  curvature, a corner overshoot proportional to curvature squared, and
  ~15% of trail segments dropped (deterministic per-segment hash).
  The gap is therefore widest at corners and narrowest on straights, and
  the two lines never merge or sync.
- Drag the leader's hand (pointerdown within 44 px of it): the leader follows
  the pointer while dragged, re-routing the course. On release the offset
  decays exponentially (tau 4 s) and the follower's error boost (3x while
  dragging, decaying tau 2.5 s after release) settles. Because of the lag,
  the follower's deviation peaks a few seconds after the re-route, then
  settles — verified by probe (leader shift 168 px at t=7, 29 px at t=14,
  4 px at t=22; follower shift 11 → 55 → 8 px).
- Trails are stored history (10 s windows) drawn as fading segments with
  alphas rounded to 4 decimals; never canvas-fade.

## Adaptations

- Leader path as a parametric looping curve; follower as a delay buffer over
  the leader's path samples with per-sample error injection; drag re-routes
  the leader's control points (via a recorded drag-offset function evaluated
  at any time, including the follower's lagged source time).
- Lag and error exposed as the piece's visible subject: a small lag gauge
  drawn as shapes, not text.
- Fully silent: no AudioContext, no getUserMedia. No offscreen canvas,
  gradients, shadowBlur, Path2D, createElement, localStorage, or fillText.
- Node-canvas quirks honored: fading alphas rounded to 4 decimals before
  stringifying; dots as filled rects or single arcs with their own
  beginPath (moveTo before every batched arc — here every arc is isolated).

## Determinism

Frame one = draw(0) via boot flag; the rAF clock starts only with the rAF
loop (plain function declaration behind a typeof guard). All randomness from
mulberry32 (seed 1413000), never Math.random.

## House rules

Canvas size from the Visual Viewport API with resize listeners on
visualViewport and window; canvas pinned in draw() via style width/height.
Phone detection via window.screen physical size (min dimension < 700 px)
with aspect h > w*1.15 as fallback; centered composition keeps its shape,
page ground takes the piece's own paper color. Checked at 390 wide.

## Verification

Rendered at 1280x900, 390x844, 720x720 and inspected all three; thumb
byte-identical across repeated renders including a final re-verify.
Forced-time probe harness (stubbed rAF driving the piece's own loop,
pointer events to its own listeners): two fresh instances byte-identical
at t=0; head-to-head gap over a full cycle ranges 35–206 px and never
closes (never merges, never syncs); drag re-routes the leader (168 px
shift at t=7) and settles (4 px at t=22); follower deviation peaks after
the re-route via the lag (55 px at t=14) and settles (8 px at t=22).
One probe fix, not a piece fix: the first probe's gold-centroid search
caught the gauge's gold bar; restricting the search above the gauge zone
gave the clean numbers above. No piece fix rounds needed.
