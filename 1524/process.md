# №1524 "The Apartment That Remembers" (bintou-dembele BD5, PP771)

Gallery date: 2006 · 03 · 15 (recorded here only, never drawn in the piece).
Expansion study #201, network chain from clement-cogitore (#200).

## Spec

A small floor-plan of rooms drawn in thin pale lines — three connected
rectangles, like an apartment seen from above. Inside, one dancer-mark
moves slowly from room to room, and wherever it has been, a faint
trace-line stays behind in a second color, so the plan gradually fills
with the history of its own movement. After a long while the traces fade
one room at a time, oldest first, and the wandering starts fresh — never
fully erased, never fully full.

Palette: plan background warm off-white #e6e0d2; room lines ink #33302a;
dancer-mark deep plum #5a2e3a; trace-lines ochre #c98f3d; faded traces
pale #c9c2b0. No other color.

Composition: floor plan centered, modest size, generous empty margins;
the dancer-mark small against the rooms; traces thin, never thick.

Motion: watch-first, wandering loop. The mark drifts room to room on a
slow schedule, pausing at thresholds; traces accumulate behind it and
fade oldest-first. Dragging inside a room pulls the mark toward the
pointer (it wanders there, then resumes its own path when released);
dragging across a threshold hurries a room change. Drag never erases a
trace instantly, never teleports the mark, never adds a room.

Technical: canvas 2D. Rooms as three rectangles with door gaps; mark as a
glyph with waypoint wandering; traces as a fading polyline with
per-segment age; drag maps pointer to a temporary waypoint.

Avoid: furniture, a dollhouse look, text labels on rooms, a map pin, a
second mark.

## Build

- 120 s loop, periodic. The wandering schedule is built once from a
  mulberry32 stream (seed 1524000): 12 room visits, each in a different
  room from the previous one; between visits the mark walks through
  every door on the way and dwells 2.2 s at each threshold (door gaps
  sit on the shared walls at 1/3 and 2/3 of the plan width, centred
  vertically); interior waypoints dwell 1.2–2.8 s. All durations are
  scaled so the schedule tiles exactly [0, 120). Position is a
  smoothstep interpolation over the schedule — a pure function of
  loop-local time, so frame one is draw(0) and t=120 / t=240 are
  byte-identical to t=0.
- Traces are the trailing 75 s of the path, sampled every 0.25 s.
  Segments younger than 40 s draw in ochre (alpha 0.8 → 0.5); older
  segments draw in pale (alpha 0.5 → 0.15); segments older than 75 s
  drop out. Rooms therefore fade one at a time, oldest first, and the
  plan is never fully erased (the window always holds recent path) nor
  fully full (thin lines over a 75 s window of a 120 s loop).
- Drag is closed-form over recorded sessions: while held, the mark
  eases from its drag-start position toward the pointer (clamped to the
  plan interior) over 1.2 s; on release it blends back to the scheduled
  path over 1.5 s. A drag across a threshold pulls the mark into the
  new room immediately, ahead of schedule — that is the hurried room
  change; on release the mark resumes its own path.
- The dancer-mark is a small articulated glyph in deep plum: torso line
  plus two arm lines and two leg lines. No text, no labels, no
  furniture, no second mark.
- House rules: canvas size from the Visual Viewport API with a guarded
  fallback (visual viewport, else window, else 720×720); canvas pinned
  in draw(); phone detection via window.screen with aspect fallback;
  centred composition kept on phones with the page ground in the
  plan's own background color. rAF loop is a plain function declaration.
  Fully silent; no AudioContext, no microphone, no gradients, no
  canvas-fade, no offscreen canvas, no Path2D, no localStorage. Fading
  alphas rounded to 4 decimals; all marks drawn as strokes/rects (no
  batched arcs). No Math.random anywhere — all variation comes from
  the seeded stream.

## QA (probe-1524.js, vm-style harness driving the piece's own loop)

16/16 probes pass: frame one identical across fresh instances; loop
closure at t=120 and t=240; exactly one mark (plum core 163/138/136/159
px at t=0/30/60/90); mark visits all three rooms with pauses at door
centres and stationary dwells; traces present in both young (ochre) and
old (pale) states at t=0/30/60/90, bounded (total ≈ 3,100 px), and
frames differ over time; drag pulls the mark to 7.7 px from the pointer
(control 66.5 px) and release resumes the scheduled path exactly
(0.0 px); drag across a door enters the new room while the control is
still in the old room; drag leaves room-line pixels identical (1940),
does not erase traces instantly, and never steps the mark more than
12.7 px per 0.25 s frame; forbidden-API grep clean; palette grep finds
only the five specced hex values.

Thumb byte-compare: two independent 720×720 renders byte-identical to
the shipped thumb. Desktop (1280×720) and mobile (390 wide) renders
inspected personally: centred plan, traces inside the walls, plum glyph
legible, no clipping.

## Fix rounds

1. Piece fix: interior waypoints first used an x-range 0.18–0.82 across
   the whole plan width instead of within one room-third, so waypoints
   and traces spilled through walls and past the outer edge. Fixed to
   room/3 + (0.18 + 0.64·rand)/3. All renders and probes re-run after
   the fix.
2. Probe-harness fixes only (no piece changes): the centroid divided by
   the loose plum count instead of the strict count, collapsing all
   positions toward the origin; the rAF stub let driving one instance
   overwrite another instance's captured loop callback; the trace
   "evolution" check wrongly expected totals to vary, when a fixed
   75 s window at near-constant speed keeps totals near-constant
   (evolution is now proven by frames differing over time).

## Deviations from the prompt

None beyond documented house-rule adaptations, plus two readings:
"traces fade one room at a time, oldest first" is implemented as
per-segment age fading over a trailing window, so the oldest room's
traces always fade out first; "dragging across a threshold hurries a
room change" is implemented as the drag pulling the mark into the new
room immediately, ahead of schedule, with the scheduled path resuming
on release.
