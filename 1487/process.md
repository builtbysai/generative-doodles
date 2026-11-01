# №1487 "The Long Room, 1975 to Now" (ioana-wieder IW8, PP734)

## Prompt
A long horizontal corridor of rooms receding into the distance: the nearest
room is a 1970s interior (seated figures, a monitor wall), the middle rooms
are archive shelves, the farthest room is a bright screening room with a new
crowd of shapes. A voice-line travels the corridor's length, from the nearest
room to the farthest, unchanged in shape, passing through each room in turn.
Palette: nearest room cream #e8e0d0 and brick #a8674a; shelves wood #8a6a48
with spines #4a5a7a, #6b4a3a; far room pale #f2ead8; voice-line gold
#d9a441; figures' clothes muted #4a5a7a, #6b4a3a, #2f4636. No other color.
Corridor in one-point perspective, rooms as nested rectangles receding to a
bright vanishing point; voice-line drawn along the corridor's center line,
foreshortened by perspective. Watch-first, journey loop: the voice-line
travels the corridor over a long loop, pausing briefly in each room (the
room's figures turn toward it), then continues; on reaching the far room it
dissolves and a new line starts in the nearest room. Dragging along the
corridor scrubs the line's position (forward or back); releasing resumes the
journey. Drag never restarts the corridor and never changes the line's
shape. Avoid: text, dates on walls, a timeline UI, a line that changes shape
as it travels.

Study rules (ioana-wieder, THE TRANSLATOR'S CUT): never click-to-restart,
never click-to-reload, never photorealism, never decorative gradients, never
text unless a prompt says otherwise (this prompt says no text, no dates on
walls). No visible text except `<title>`. Fully silent. Abstracted figures
only, no likenesses, no real names on screen, no nudity, no violence shown.

## Build
- Self-contained `index.html`, no external assets. Vanishing point at
  (0.86W, 0.5H); rooms as nested rectangles interpolated from the full frame
  to a small rect around the vanishing point, boundaries at depths 0, 0.30,
  0.58, 0.82, 1.0.
- Nearest room: four seated figures on a bench along the bottom (torso,
  thigh, shin, cream head disc) plus a monitor wall of three stacked monitors
  at the left edge, screens cycling on loop-local time (2 s steps, period
  divides the loop).
- Shelf rooms: spine columns hugging the left/right edges of each room rect
  (upper portion), seeded muted colors, some with a thin gold stripe.
- Far room: pale fill inside rect(0.82) with a nine-shape crowd clustered
  near the vanishing point.
- Voice-line: one fixed 25-point polyline literal in corridor space, never
  mutated. Screen mapping foreshortens it: x advances toward the vanishing
  point as (1-d)^1.35 and undulation amplitude shrinks as (1-d). The drawn
  prefix grows with journey progress; segment stroke width shrinks with
  depth; a leading tip dot marks the line's current end.
- Journey timeline, 72 s loop, all loop-local (t modulo 72, so the loop
  closes exactly): travel 0→0.30 (14 s), dwell room 0 (4 s), travel
  0.30→0.58 (14 s), dwell room 1 (4 s), travel 0.58→0.82 (12 s), dwell room 2
  (4 s), travel 0.82→1.00 (10 s), dwell room 3 (4 s), dissolve (6 s, line
  alpha fades 1→0, then a new line starts). During any dwell, figures'
  heads shift a few pixels toward the line's tip.
- Drag: pointer x maps to journey time (x/W × 72 s). While dragging, the
  journey follows the pointer; on release it resumes advancing from the
  scrubbed value via a closed-form event list. Drag never restarts the
  corridor and never changes the line's shape.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, getUserMedia, or text drawing. Fading alphas rounded to 4
  decimals; dots as own-beginPath arcs; no Math.random anywhere (mulberry32,
  seed 1487000). Frame one = draw(0) via boot flag; rAF loop is a plain
  function declaration behind a typeof guard. Canvas sized from
  visualViewport with resize listeners; canvas pinned in draw(); phone
  layout is the same full-bleed composition.

## Verification (forced-time probe, tmp/probe1487.js)
- t=0 redraw 0 px; fresh instance t=0 identical; t=72 vs t=0 = 0 px;
  t=144 vs t=0 = 0 px (loop closes exactly).
- Progress: travels advance (0.107 at t=5, 0.340 at t=20, 0.660 at t=40,
  0.874 at t=55); dwells hold exactly (0.300 at t=14→17, 0.580 at t=32→35,
  0.820 at t=48→51, 1.000 at t=62→65); dissolve fades alpha (0.667 at t=68,
  0.167 at t=71).
- Shape invariance: partial-line gold pixels (x ≥ 0.12W, excluding the
  cycling monitor column) vs the full line at t=63: 3,166 px partial, only
  38 px outside, in one 8×10 px blob at the leading tip dot — the line's
  shape never changes.
- Drag: down at t=10, x=0.8W → journey 57.60, progress 0.921; release at
  t=11 (x=0.85W) → journey resumes (t=12 progress 1.000 in the far-room
  dwell, t=20 in dissolve), never jumping back; second drag at t=30→31
  re-anchors cleanly (progress 0.300).
- Token scan clean: no fillText/strokeText, AudioContext, getUserMedia,
  createElement, Path2D, shadowBlur, gradients, or Math.random() calls.
- Renders inspected at 1280×900, 390×844, 720×720; thumb byte-identical
  across repeated renders.

## Fix rounds (2, both composition, before final QA)
1. First shelf rendering scattered wide horizontal bars across the middle:
   spine width was derived from the (wide) band thickness. Reworked to
   spine columns hugging each room rect's left/right edges.
2. First column build stacked spines into touching stripes (height 0.09 vs
   spacing 0.075 of rect height). Spacing moved to 0.10, height to 0.08, so
   spines read as separate tapes. All renders re-done after each fix;
   frame-one geometry otherwise unchanged.
