# №1509 "Little Girl Blue: The Cello Takes the Voice" (sonia-wieder-atherton SW6, PP756)

Gallery date: 2006 · 02 · 28 (formula date; not drawn in the piece).

## Palette (exactly as specced, no other color)

Stage charcoal #2a2a30; melody line gold #d9a441; piano blocks slate
#4a5a7a; percussion taps cream #e8e0d0; mood-shift accent brick #a8674a
(used only when the melody turns raw).

## Composition

- Melody line across the upper portion, x from 0.08W to 0.92W, baseline
  0.30H with two expressive sine components (2 and 5 cycles across the line).
  The stage centre stays empty: no singer, no microphone, no figure.
- Piano blocks along the bottom: 8 slate blocks, x from 0.08W to 0.92W,
  tops at 0.82H minus a per-block height.
- Percussion taps: 8 small cream squares at the bottom edge (0.93H),
  aligned with the piano blocks.
- Full-bleed on phones and desktop alike; page ground is the stage charcoal.

## Motion: the song loop (48 s, all loop-local time)

- Roughness schedule R(lt): sweet (R=0) 0–16 s; smoothstep rise 16–24 s;
  raw hold (R=1) 24–32 s; smoothstep fall 32–48 s. Every period divides
  48 s, so the loop closes exactly.
- Roughness renders as: per-point jitter (seeded mulberry32 signs, seed
  1509000) scaled by 0.020H × R, plus a 28-cycle sine ripple scaled by
  0.014H × R, plus a brick core stroke (0.6× the gold width, alpha
  0.9 × R) drawn over the gold line. At R=0 the line is pure smooth gold.
- Piano: each block pulses on a 4 s sine, phase-staggered by block index
  (alpha 0.55–1.0). The pattern never stops, in every phase of the arc.
- Percussion: 6 s tap cycle, 8 taps at 0.75 s intervals; the tapped dot is
  full cream for 0.3 s, then dims to 0.25 alpha. The pattern never stops.

## Interaction: vertical drag over the melody

- Drags starting inside the melody band (0.08H–0.55H) map pointer y to a
  roughness bias: bias = clamp((y − 0.30H) / 0.22H, −1, 1). Drag down
  (toward raw) increases roughness; drag up (toward sweet) decreases it.
  Effective roughness = clamp(schedule + bias, 0, 1).
- On release the bias decays exponentially (tau 2 s) back to the schedule,
  computed closed-form over the recorded drag (latest drag only). Drag
  never adds a singer, never changes the tempo (the 48 s loop is fixed),
  never silences the piano or percussion. Drags starting outside the
  melody band are ignored.

## House-rule compliance

- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect h > w*1.15 fallback; checked at 390 wide.
- Determinism: synchronous first frame drawAt(0); rAF loop anchored as
  offset + elapsed-since-load; every animation sine on loop-local time;
  no Math.random, no Date.now, no performance.now for anything visible.
  Per-point jitter signs come from the seeded mulberry32 stream, so every
  loop index renders identically.
- rAF loop is a plain function declaration with a typeof guard; no
  top-level W/H globals (avoids the renderer-scope collision).
- Fully silent: no AudioContext at all. No offscreen canvas, gradients,
  shadowBlur, Path2D, document.createElement, WebGL, getUserMedia, or
  localStorage. No visible text except <title>. Fading alphas rounded to
  4 decimals; dots drawn as filled rects (node-canvas quirk).
- Never click-to-reload / click-to-restart; interaction is drag only.

## QA results (probe-1509.js, forced-time harness, real node-canvas)

- P1 frame-one redraw identical: 0 px.
- P2 loop closure: t=48 vs t=0 = 0 px; t=96 vs t=0 = 0 px.
- P3 song arc: rough 0 / 0.5 / 1 / 0.5 at t=0 / 20 / 28 / 40; brick-core
  pixels 0 at t=0, 10,638 at t=28.
- P4 drag down at sweet time (t=8): rough 0 → 0.909; release resumes
  schedule (t=60 vs fresh instance = 0 px).
- P5 drag up at raw time (t=28): rough 1 → 0.268; brick-core pixels
  10,638 → 0.
- P6 percussion: dot 0 bright at t=0 and dim at t=0.8; dot 1 dim at t=0
  and bright at t=0.8 (tap advances on schedule).
- P7 off-band drag leaves roughness unchanged.
- Thumb byte-compare: three independent 720×720 renders byte-identical.
- Desktop (1280×720) and mobile (390×844) renders inspected: gold
  expressive melody, slate piano blocks, cream percussion dots, empty
  stage centre, no clipping on phones.

## Fix rounds

None to the piece. One probe-harness correction only: the first brick
classifier (loose RGB box) counted gold/charcoal antialiasing blends as
brick (627 px at sweet time); tightened to the brick-over-gold core color
box (r 160–186, g 95–120, b 60–86), after which all probes pass. The piece
file was unchanged.

## Deviations from the prompt

None, apart from the documented house-rule adaptations above (canvas 2D
throughout, closed-form drag state, flat-alpha layers instead of any
gradient, fully silent, fixed-phase first frame).
