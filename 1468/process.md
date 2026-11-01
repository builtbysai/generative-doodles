# №1468 "The Listening Grid" (delphine-seyrig DS5, PP715)

A grid of twelve portrait frames, each holding a still woman's face drawn as
a flat, minimal portrait (hair shape, brow line, mouth line, nothing more).
One frame at a time is "speaking": its portrait moves subtly (mouth line
shifts, head tilts a few degrees) while the other eleven hold perfectly still
and face toward it. The voice is visual only; the piece is fully silent.

## Composition

- Warm grey ground (#d8d2c4); 4-by-3 grid of equal charcoal (#2a2a30)
  frames with generous margins; speaking frame outlined in gold (#d9a441).
- Portraits use only the prompt palette: skin tones #f2ead8, #e0c4a0,
  #c49a6a, #8a5a3a; hair black #1c1c22, brown #5a3a28, grey #9a9a9a.
- Four hair styles, seeded: bob, long, bun, short. Faces are abstracted
  minimal sprites: no real likenesses, no real names, no text anywhere
  except `<title>`.

## Motion

- Watch-first, voice-passing loop. The speaking state moves from frame to
  frame in a fixed but irregular rhythm: a seeded permutation order and
  seeded per-speaker durations (2.8–5.2 s), 44.44 s for the full cycle,
  which repeats exactly.
- The speaker's mouth line shifts and widens on a 1.4 s sine and its head
  tilts gently; listeners tilt a few degrees toward the speaker (tilt as a
  function of speaker position, clamped to 0.07 rad).
- Dragging across the grid passes the voice to the frame under the finger;
  releasing resumes the automatic rhythm from the next frame in the order
  after the dragged one. Drag never restarts the grid and never silences a
  speaker mid-gesture: the dragged speaker holds until release, then the
  rhythm continues. Never click-to-reload.

## Adaptations

- Portraits as parameterized face sprites (hair shape, tilt, mouth offset);
  speaking state as an index with a timer; listener tilt as a function of
  speaker position; drag maps pointer x/y to the nearest frame.
- Speaking state is closed-form over piece time and the recorded event
  list (drag/release events), never frame-integrated state, so every frame
  is reproducible from the same event list.
- Brow line sits on skin just below the hair-cap edge: the cap covers the
  top half of the head, so a brow drawn there in hair colour would vanish
  against the cap (caught in QA; the first render showed mouth lines only).
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing; fading
  alphas are literal fixed decimals, dots as filled rects or own-beginPath
  arcs with moveTo first (node-canvas quirks).
- Determinism: synchronous first frame at a constant phase via a boot flag
  (frame one = draw(0), clock starts only with the rAF loop, plain function
  declaration behind a typeof guard); all randomness from mulberry32
  (seed 1468000), never Math.random.
- House rules: canvas size from Visual Viewport API with resize listeners
  on visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px; phone detection via window.screen
  physical size (min dimension < 700px) with aspect h > w*1.15 fallback;
  field-like composition goes full-bleed on phones, checked at 390 wide.

## Verification (forced-time probe harness, vm-isolated instance)

- t = 0 redraw 0 px; t = full cycle (44.44 s) vs t = 0 = 0 px (loop closes
  exactly); t = 0 vs t = 0.5 differs by 1,184 px (speaker gesture live).
- Speaker order at t = 0 is frame 8 (gold outline, 7,848 gold px at frame
  one); drag at t = 2 passes the voice to frame 5; release at t = 3 resumes
  to frame 6, the next frame in the order after 5.
- 0 green-dominant stray pixels (gold is the only accent colour).
- Thumb byte-identical across repeated renders; desktop, mobile, and thumb
  renders all inspected. No fix rounds beyond the brow-line correction
  above (frame one otherwise unchanged).
