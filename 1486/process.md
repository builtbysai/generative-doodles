# №1486 "Two Hands, One Camera" (ioana-wieder IW7, PP733)

Build-only; nothing pushed, no repo touched.

## Frame one (exactly t = 0 via boot flag, verified at 1280x900, 390x844, 720x720)

Cream #e8e0d0 ground. Charcoal camera box centered upper-middle with a
small viewfinder bump on top, a gold lens circle, and a charcoal pupil dot.
Two pairs of abstract hands enter from the left and right edges at camera
height (skin tones #f2ead8 / #e0c4a0, palm bars with three finger bumps at
the camera end). Below, a charcoal-framed miniature scene: four seated
figures (clothes #4a5a7a / #6b4a3a, cream heads with dot eyes and mouth
lines) on a bench line. Mobile keeps the same centered composition with no
clipping. No visible text besides `<title>`.

## Mechanics, all closed-form over piece time and recorded events

- Watch-first sway loop, 24 s: the camera sways horizontally
  (amplitude 3% of width) with a small vertical bob. Every animation sine
  runs on loop-local time `lt = t % 24`, so the loop closes exactly.
- Grip alternation: gripL = 0.5 + 0.25·sin(2π·lt/24), gripR = 1 − gripL.
  The two grip values always sum to 1, so the camera is never held by one
  pair alone and never dropped. Grip scales each pair's hand-bar
  thickness; the far pair also stretches naturally because each hand bar
  spans from its frame edge to the camera's side.
- Miniature scene below (12 s loop, divides 24 s): four seated figures;
  the speaker cycles every 3 s of scene time, tilting its head and
  shifting/widening its mouth line while listeners hold still.
- Drag: a pointerdown on (or near) the camera box starts a drag; moving
  sideways shifts the camera, and both hand pairs follow (far pair
  stretches, near pair compresses). Release springs the camera back to
  center sway with an exponential ease (tau 1.5 s) computed closed-form
  over the recorded down/move/up event list. Drags starting off-camera
  are ignored. Drag never hands the camera to one pair alone, never drops
  it, never restarts anything. Never click-to-reload.

## Adaptations

- Camera as a sprite with x offset and sway sine; hand pairs as
  parameterized shapes with grip values summing to a constant; scene as a
  miniature looping sprite below; drag maps pointer x to camera offset
  with spring return — all as specced.
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing; all
  fills opaque; dots as filled rects or own-beginPath arcs with moveTo
  first (node-canvas quirks). No fading alphas are used at all.
- Determinism: frame one = draw(0) via boot flag, clock starts only with
  the rAF loop (plain function declaration behind a typeof guard); all
  decoration from mulberry32 (seed 1486000), never Math.random.
- Loop-closure discipline (the №1482 lesson, applied from the start):
  every sine — sway, bob, grip, scene bob, speaker mouth — runs on
  loop-local time, never absolute piece time.

## Verification

Rendered at 1280x900, 390x844, and 720x720 and inspected all three; thumb
byte-identical across repeated renders. Forced-time probe harness
(vm-isolated instance, real node-canvas, piece driven via
window.__piece, `tmp/probe1486.js`): t = 0 redraw 0 px; t = 24 vs t = 0 =
0 px; t = 48 vs t = 0 = 0 px (loop closes exactly, twice over); t = 0 vs
t = 6 differs by 85,165 px (sway/scene live); charcoal present in the
camera band at t = 0/6/12/18 (86,873 / 90,595 / 86,873 / 84,067 px —
camera never drops); gold lens 22,300 px at frame one; grip alternation
measured in the upper hand bands (left skin 11,632 → 14,400 → 8,588 px
at t = 0/6/18 while right skin moves inversely, 11,632 → 8,548 →
12,400 px); drag on the camera (+200 px) shifts the frame (147,764 px
diff) with offset 200 during the drag, decaying 198.67 → 9.96 → 0.496
over 0/4.5/9 s after release (tau 1.5 s spring return); off-camera drag
leaves the offset at 0. Token scan clean (the single "Math.random" hit
is the code comment stating it is never used).

## Fix rounds

None needed.
