# №1476 "The Listening Room" (carole-roussopoulos CR5, PP723)

## What it is
A plain room with twelve chairs in a circle, seen from slightly above. Eleven
chairs hold still figures; one chair holds the speaker, whose head tilts and
whose mouth line moves slowly. The other figures all turn a few degrees toward
the speaker. A thin gold line runs along the floor from the speaker to each
listener and back. The speaking state moves from chair to chair every few
seconds in a fixed but irregular rhythm. Fully silent: the "voice" is visual
only (gold lines, mouth movement). No visible text except `<title>`.

## Palette (prompt only, no other color)
Floor pale #d8cfc0; chairs wood #8a6a48; figures' clothes #4a5a7a, #6b4a3a,
#2f4636; skin #f2ead8, #e0c4a0; gold line #d9a441. Mouth/eye marks use #2f4636,
a clothes color already in the palette, so no new color is introduced.

## Composition
Circle centered with generous margins; speaker's chair marked only by the gold
lines, never by a label; all figures the same size. Centered composition keeps
its shape on phones, with the page ground taking the floor color.

## Motion / interaction
- Watch-first voice-passing loop: seeded speaking order (a permutation of the
  twelve chairs) and seeded per-speaker durations (2.8–5.2 s), 48.43 s full
  cycle, repeating exactly.
- Speaker: head tilts on slow sines and mouth line shifts/widens; listeners
  turn a few degrees toward the speaker (clamped to 0.12 rad from
  center-facing).
- Gold lines: one quadratic curve from speaker to each listener, plus a second
  offset strand back, so the line reads as running to each listener and back.
- Drag across the circle passes the voice to the chair under the finger;
  release resumes the automatic rhythm from the next chair in the order after
  the dragged one. Drag never silences a speaker mid-gesture (it passes the
  voice, it does not mute it) and never restarts the circle. Never
  click-to-reload.

## Technical
- Figures as parameterized sprites (head tilt, mouth offset); speaking index
  with a timer; listener orientation as a function of speaker angle; gold
  lines as quadratic curves; drag maps pointer position to the nearest chair.
- Everything closed-form over piece time and recorded drag/release events,
  never frame-integrated state.
- Speaker gesture runs on gesture-local time (time since the current speaker's
  turn began), so the whole frame repeats exactly every cycle: t = cycle vs
  t = 0 differs by 0 px.
- Frame one = draw(0) via a boot flag; the clock starts only with the rAF
  loop (plain function declaration behind a typeof guard).
- All randomness from one seeded mulberry32 stream (seed 1476000), never
  Math.random.
- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() with style width/height
  in px; phone detection via window.screen physical size (min dimension <
  700px) with aspect h > w*1.15 as fallback.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, getUserMedia, or text drawing. No fading alphas are used at
  all (every fill opaque); dots as filled rects or own-beginPath arcs with
  moveTo first (node-canvas quirks).

## Verification (forced-time probe harness, vm-isolated instance, real
node-canvas, piece driven via window.__piece)
- Rendered at 1280x900, 390x844, 720x720 and inspected all three; thumb
  byte-identical across repeated renders, including a final re-verify after
  the fix below.
- t = 0 redraw diff 0 px; 5,672 gold px at frame one.
- t = full cycle (48.43 s) vs t = 0 = 0 px (loop closes exactly).
- t = 1.0 vs t = 1.6 differs by 285 px (speaker gesture live).
- Speaker order 1,5,8,0,6,4,10,11,7,9,2,3; speakerAt 0 = 1, at 10 = 8.
- Drag at t = 2 onto chair 5 passes the voice to chair 5 immediately; release
  at t = 3 resumes to chair 8 (the next chair in the order after 5).
- Token scans clean: no AudioContext, getUserMedia, createElement, Path2D,
  shadowBlur, gradients, fillText, or strokeText. The single "Math.random"
  token hit is the code comment "never Math.random"; grep confirms no
  Math.random() call exists.

## Fix rounds (1)
First build drove the speaker's head/mouth sines from absolute piece time, so
the frame at t = cycle would not match t = 0 (sine phases misaligned at the
loop boundary). The gesture was moved to gesture-local time (time since the
current speaker's turn began); the probe then confirmed t = cycle vs t = 0 =
0 px, and frame one was unchanged by the fix (identical desktop render hash
before and after). All renders re-done after the fix.
