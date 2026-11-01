# №1377 "Hunter's Moon" (adam-piron AP2, PP600)

A rain-darkened street scene drowned in expired-film hunter's-moon red, with
loose handwritten cipher script in bright blue scrawled across the center
like a letter being decoded.

## What the piece shows

- Full-frame street scene: dark red building rectangles with small flat
  windows (some lit hunter red), a near-black street band below a horizon at
  0.55H, wet-light streaks shimmering on the street, thin rain streaks
  falling throughout, and a flat-alpha hunter-red grade wash over everything.
- Cipher script: 9 glyphs in a loose overlapping 3x3 cluster at center,
  each glyph a set of seeded strokes — wobbly loops, arrows with head ticks,
  dot-trails, irregular-amplitude zigzags, open arc sweeps — drawn in script
  blue (#3d6fe0), large and overlapping. No readable text anywhere except
  `<title>`; the script is cipher, never words.
- Dust motes drift across the whole field; seeded film grain dots flicker
  on a quantized 2 s index; vignette edges are nested flat-alpha frames.
- Motion: a 48 s seamless loop. The script re-draws itself stroke by stroke
  (each stroke reveals over 1.6 s on a staggered schedule), holds, then
  fades over the last 8 s and begins again. The draw clock is phase-shifted
  +12 s so frame one is already mid-draw: most of the script visible and
  still re-drawing, never an empty center.
- Interaction: drag moves the script glyphs (slight per-glyph parallax) while
  the loop keeps running; on release the offset decays exponentially
  (tau 3 s) back to zero. Never click-to-reload; no buttons, no UI.

## Adaptations from the prompt (QA-renderer constraints)

- Per-frame flicker envelope replaced by a seeded function of quantized
  time (0.12 s steps hashed), never per-frame random.
- Grain replaced by seeded dots keyed by (dot, quantized 2 s time index),
  never per-frame noise overlay.
- Dust as closed-form drifting motes; rain as closed-form falling streaks;
  script re-draw as a closed-form progressive stroke function of piece time.
- No WebAudio: the prompt specs no audio for this piece, so it ships fully
  silent (no AudioContext exists in it).
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  localStorage, or getUserMedia. Canvas 2D throughout.
- Determinism: frame one = draw(0) via a boot flag; the clock starts only
  with the rAF loop (plain function declaration behind a typeof guard). All
  randomness from mulberry32 (seed 1377000 + index*7919), never Math.random.
- Viewport from the Visual Viewport API with canvas pinned in draw();
  phone detection via window.screen physical size with aspect fallback.
  Field-like composition goes full-bleed on phones.

## Verification

- Rendered with node-canvas at 1280x900, 390x844, 720x720; all three
  inspected. Thumb byte-identical across repeated renders.
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  pointer events to its own listeners), center-region blue-pixel counts:
  t=0: 21,907 px (mid-draw); t=5 (draw complete): 24,462 px; t=30
  (fading): 20,933 px; t=36 (cycle restart): 0 px — the cycle closes
  exactly; t=44 (re-drawing): 12,882 px. Rain/flicker motion: t=0 vs t=1
  differ in 4,972 px.
- Drag probe: a 120x60 px drag at t=10 changes 63,239 px; 15 s after
  release the center blue count is 24,491 px vs 24,527 px undragged
  (0.15% apart) — the offset fully decays.
- Token scan clean: no fillText/strokeText, gradients, shadowBlur, Path2D,
  createElement, AudioContext, getUserMedia, or unseeded randomness
  (matches are only comments stating the constraints).

## Fix rounds

1. Frame one initially showed no script (stroke 0 of glyph 0 starts at
   t=0 with reveal fraction 0). Fixed with the +12 s phase shift; all
   renders re-done.
2. The first vignette (8 nested frames, heavy line width) read as a
   mechanical picture-frame border. Softened to 6 rings with lighter
   alpha and wider spacing; all renders re-done.
3. The first zigzag glyphs were perfectly regular and read as Latin W
   shapes. Amplitudes are now irregular per point; all renders re-done.
