# №1474 "Rewind Until It Collapses" (carole-roussopoulos CR3, PP721)

## Prompt

A television screen inside the frame plays a pompous broadcast: rows of
identical suited figures making pronouncements (abstract shapes, mouth lines
opening and closing). Below the screen, a rewind control drawn as a tape reel.
Each time a pronouncement finishes, the broadcast visibly scrubs backwards at
increasing speed and replays it, and with each replay the suited figures lose
a little color and a little size. Palette: broadcast grey #b8bcc0, suits
charcoal #2a2a30, studio backdrop teal #2e6f6a, screen frame black #1c1c22,
rewind reel gold #d9a441, drained figures pale #d8d2c4. No other color.
Composition: TV screen upper two-thirds, tape reel and control strip below;
suited figures in a row inside the screen; no other furniture. Motion:
watch-first with drag-to-rewind. The broadcast loops on its own; dragging the
reel left scrubs the broadcast backwards (pronouncements replay in reverse),
dragging right plays forward. Each completed rewind pass drains the figures
one step (color, then size). After three passes the figures are small and
pale, and the loop restarts at full color. Drag never restarts the broadcast
from the top except through the normal loop. Broadcast as a segment timeline
with a playhead; rewind as negative playhead velocity mapped from drag; drain
as a per-pass step value applied to figure color/size; loop resets drain to
zero. Avoid: real politicians, real logos, real broadcast footage, text, a
voiceover denouncing anyone.

## Build

Self-contained canvas 2D, no external assets, fully silent. TV screen in the
upper two-thirds: black frame, teal studio backdrop, grey floor band. Two rows
of five identical suited figures (head circle + torso rect + grey mouth line).
Below, a control strip on the black ground: a gold tape reel with black spokes
at the left, a grey timeline track with a gold playhead marker, and three
drain pips (one filled gold square per completed rewind pass) below the track.

Timeline, all closed-form over piece time and recorded drag events: a 36 s
cycle = 3 passes x 12 s. Each pass: 8 s of play (playhead 0 to 1, mouths
opening and closing on four beats per segment), then a 4 s rewind in which the
playhead runs 1 - rt^2, so it scrubs backwards at increasing speed and the
pronouncement replays in reverse. Drain grows from pass/3 during play to
(pass+1)/3 across the rewind, so after three passes the figures are fully pale
and at 65% size, and the cycle restarts at full color. The reel rotates with
the playhead (playhead x 4pi + pass x pi), so it visibly runs backwards
during a rewind. No randomness anywhere, so every frame is reproducible.

Interaction: pointerdown on the control strip starts a drag; pointermove
scrubs the timeline (0.02 timeline-seconds per pixel, left = backwards,
right = forwards); pointerup re-anchors the timeline at the scrubbed position
and the broadcast continues from there. Drag never restarts the broadcast
from the top except through the normal loop; drag outside the strip is
ignored. Never click-to-reload.

## House-rule compliance

- Canvas size from Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() with style width/height.
- Phone detection via window.screen physical size (min dimension < 700px)
  with aspect h > w*1.15 as fallback; field-like composition goes full-bleed
  on phones (margin 0), checked at 390 wide with no clipping.
- Determinism: synchronous first frame at a constant phase via a boot flag
  (frame one = draw(0), clock starts only with the rAF loop); no Math.random
  anywhere. rAF loop as a plain function declaration behind a typeof guard.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, getUserMedia, or text drawing of any kind (no fillText /
  strokeText calls; the only text is <title>). No fading alphas at all —
  every fill is opaque — so the node-canvas scientific-notation alpha quirk
  cannot arise. Dots/circles drawn as own-beginPath arcs with moveTo first.

## Adaptations

- The prompt's "segment timeline with a playhead" is literal: the control
  strip carries a grey track with a gold marker at the playhead position,
  plus the gold reel whose rotation follows the playhead.
- Drain is a smooth per-pass interpolation (pass/3 to (pass+1)/3 across each
  rewind) rather than a single step at the rewind boundary, so the collapse
  is visible as it happens and the end state (fully pale, 65% size) is
  reached exactly at the cycle boundary before the full-color restart.
- The prompt's "color, then size" ordering is applied together through one
  drain value (color lerp charcoal to pale, size scale 1 - 0.35 x drain);
  the two effects stay in lockstep per pass, which keeps the figures
  identical to each other at every moment, as the prompt requires.

## Verification

Rendered with node ~/workspace/tools/render-piece.js at 1280x900,
390x844, and 720x720; all three inspected. Thumb byte-identical across
repeated renders. Forced-time probe harness (vm-isolated instance, piece
driven via window.__piece.draw(t), pointer events to its own listeners):

- t=0 redraw diff 0 px; t=36 vs t=0 diff 0 px (loop closes exactly).
- state(0): pass 0, play, playhead 0, drain 0, full charcoal figures
  (107,713 charcoal px, 0 pale px inside the screen).
- state(4): play, playhead 0.5; state(8): rewind start, playhead 1;
  state(10): rewind, playhead 0.75 (1 - 0.5^2); state(12): pass 1,
  drain 1/3; state(35): pass 2 rewind, drain 0.917, playhead 0.4375.
- End state: t=35.9 figures pale (45,007 pale px) at roughly half the
  pixel area of frame one (67,828 vs 131,850 px) — small and pale — then
  the loop restarts at full color.
- Mouths live: t=4 vs t=0 differs by 696 px.
- Drag left on the strip (-150 px) moves P(5) from 5 to 2 (playhead 0.625
  to 0.25), frame differs, and state(6) shows P 3 — the timeline keeps
  advancing from the scrubbed position, never restarted.
- Drag right (+200 px) moves P(5) to 9, rewind phase, playhead 0.9375.
- Drag outside the strip leaves P(5) unchanged.
- Token scan clean: no fillText/strokeText, AudioContext, getUserMedia,
  createElement, Path2D, shadowBlur, gradient, Math.random, or localStorage.

## Fix rounds

None needed. One probe expectation was corrected, not the piece: at t=35
(drain 0.917) the figure color is an intermediate lerp, so it matched
neither the charcoal nor the pale pixel predicate; a follow-up check at
t=35.9 confirmed the fully pale end state.
