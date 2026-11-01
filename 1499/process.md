# №1499 "A World Without Words" (claire-atherton CA4, PP746)

## Frame one
Three horizontal bands stacked, each a long take, generous sky and snow:
- Top band: train platform — slate train with snow-cream windows on a charcoal
  platform, small standing figures in muted coats; one scarlet train door, the
  single scarlet accent in the piece.
- Middle band: waiting room — snow-cream wall, sky-grey window, slate bench
  with seated abstract figures (sky-grey heads, charcoal eye dots).
- Bottom band: queue outside a sky-grey building with charcoal door, small
  standing figures, a charcoal road through snow at the base.
No visible text besides `<title>`. No mouths drawn at all, so no mouth can move.
No falling snow. Faces carry a charcoal eye dot that drifts slowly side to
side on a 30 s sine, offering and looking away, never staring.

## Motion
Watch-first, 90 s drift loop: 30 s per band (24 s slow pan with smoothstep
easing, 6 s hold at full pan, then the cut to the next band). All three bands
stay visible; only the active band pans, the others rest at offset 0.
Strip width is 2.2x the viewport; max pan is 1.2x viewport width.
Drag horizontally pans the active band by hand at 0.25x pointer travel
(clamped slow, never a swipe); release eases the manual offset back to the
automatic drift with tau 3 s, computed closed-form over the recorded
down/move/up events. Drag never zooms, never makes a figure speak or gesture
at the viewer, never restarts anything. Never click-to-reload.

## Adaptations
- The prompt's "wide offscreen canvases" are drawn directly: each band's
  content is drawn with the pan offset applied, no stored bitmaps, because
  the QA renderer provides no offscreen canvas. Same visible result.
- Waiting-room heads are sky grey, not snow cream: snow-cream heads vanished
  against the snow-cream wall (fix round 2 below). Sky grey is a prompt
  palette color.
- Seated figures use a true seated pose: torso above the bench seat, thigh
  horizontal at seat level, shin vertical to the floor (fix round 3 below).
- The scarlet door sits at strip fraction 0.30 so it is visible at frame one
  (fix round 1 below); it remains the only scarlet shape anywhere.
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing; no
  fading alphas at all (every fill opaque); dots as filled rects or
  own-beginPath arcs with moveTo first (node-canvas quirks).

## Determinism
Frame one = draw(0) via boot flag, clock starts only with the rAF loop
(plain function declaration behind a typeof guard). Every animation value
derives from loop-local time (t mod 90); pan smoothstep, holds, and the
30 s eye sine all divide the loop. All figure positions and coats from
mulberry32 (seed 1499000 + index x 7919), never Math.random. The №1482
loop-closure lesson was applied from the start.

## Verification
Rendered at 1280x900, 390x844, and 720x720 and inspected all three; mobile
keeps the same full-bleed composition with no clipping; thumb byte-identical
across repeated renders including a final re-verify.
Forced-time probe harness (vm-isolated instance, real node-canvas, piece
driven via window.__piece; tmp/probe1499.js):
- t = 0 redraw 0 px; t = 90 vs t = 0 = 0 px; t = 180 vs t = 0 = 0 px (loop
  closes exactly, twice over).
- Band index 0/1/2 at t = 0/30/60; auto pan 0 at t = 0, 768 at t = 12,
  1536 (max) at t = 27, cut to 0 at t = 30.
- Scarlet: exactly one region, 14,364 px, bbox within the top band at
  t = 0, t = 12, and t = 45 (the door, 0.045 strip-widths wide, full train
  height); no scarlet anywhere else.
- Drag: +200 px at t = 10 adds exactly +50 manual offset (0.25 factor);
  after release the manual offset decays 50 to 1.78 by t = 20 (tau 3 s),
  and the automatic drift resumes from the dragged position.
- t = 0 vs t = 12 differs 80,679 px (pan alive).
- Token scan clean: no fillText, no Math.random, no createElement, no
  gradients, no AudioContext, no getUserMedia; rAF behind a typeof guard.

## Fix rounds (3)
1. Scarlet door: first build put the door at strip fraction 0.52, which is
   off-frame at offset 0, so frame one carried no scarlet. Moved to 0.30;
   re-verified scarlet present at frame one with the same single-region
   pixel count.
2. Waiting-room heads: first build drew cream heads on the cream wall, so
   only eye dots showed. Heads in that band are now sky grey (a palette
   color); eye dots stay charcoal.
3. Seated pose: first build hung torsos below the bench line. Seated
   figures now sit on the bench: torso above the seat, thigh horizontal at
   seat level, shin vertical to the floor. All renders re-done after each
   fix; frame one composition otherwise unchanged.
