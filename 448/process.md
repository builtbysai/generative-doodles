# №1454 "Cook's Palms, Glued Self-Portrait" (tabea-blumenschein TB7, PP679–PP686 study, PP685)

## What it is

A flat drawing of a Pacific scene in strong contours and flat colour — pale sky,
teal sea, cream sand, two tall palms, a pirate figure in a navy coat and black
hat shifting his weight, and a Hawaiian girl in pink with bobbing gold and pink
flowers — with a small gray-toned photographic portrait tile pasted slightly
crooked at the lower right, and a narrow strip of short hand-drawn dash marks
running down the left edge, standing in for a little story.

## Prompt fidelity

- Scene, palette, and composition follow PP685 verbatim: paper cream `#f2ead8`,
  palm green `#2a7a3a`, trunk brown `#7a5a2a`, sea teal `#1a7a6a`, sky pale
  `#d8e8e8`, pirate coat navy `#1a2a5a`, hat black `#1a1a1a`, flower pink
  `#e85a8a` and gold `#e8a81a`, portrait tile grays `#3a3a3a` / `#8a8a8a` /
  `#d8d8d8`, story-mark ink `#2a2a2a`.
- Story strip marks are abstract dashes only — never readable words, never
  captions. The portrait tile is a gray-toned face, never a realistic
  photograph. Figures are stylised flat shapes with strong ink contours, never
  photorealistic; the Hawaiian girl is a flat costume figure with flowers,
  never eroticised.
- No visible text besides `<title>`. Fully silent (no AudioContext at all).
- Motion per the prompt: palms sway, pirate shifts weight, flowers bob, the
  story strip grows one mark at a time then gently fades and restarts. Drag
  across the drawing rustles the palms; drag on the portrait tile lifts its
  corner slightly — it stays pasted, never removed. Never click-to-reload,
  never a travel-poster layout.

## Adaptations

- Scene as contour shapes with flat fills; palms as frond paths with sway;
  portrait tile as a gray-toned face tile with a pasted-edge shadow (flat
  alpha offset rect, never `shadowBlur`); story strip as short dash marks
  appended on a timer.
- Spotlight-style gradients do not occur here; all halos are flat alpha.
- Story cycle is phase-shifted +12 s so frame one already holds ~7 marks
  instead of an empty strip; the 60 s cycle still grows, fades (48–56 s), and
  restarts exactly.
- Loop is 60 s; every ambient period divides 60 (sway 4/5 s, bob 3 s, weight
  shift 6 s, story 60 s), so frame one reproduces exactly at t = 60.
- Interaction is closed-form over piece time and recorded events: rustle is a
  sum of exponentially decaying impulses from recorded drag points (proximity
  weighted); tile lift is the live drag distance while dragging and an
  exponential decay after release. No frame-integrated state.

## House rules

- Canvas size from the Visual Viewport API with resize listeners on
  `visualViewport` and `window`; canvas pinned in `draw()` via
  `canvas.style.width/height` in px.
- Phone detection via `window.screen` physical size (min dimension < 700 px)
  with aspect `h > w*1.15` as fallback; field-like composition goes full-bleed
  on phones, verified at 390 wide with no clipping.
- Determinism: synchronous first frame at a constant phase via a boot flag
  (frame one = `draw(0)`, clock starts only with the rAF loop, plain function
  declaration behind a `typeof` guard). All randomness from seeded mulberry32
  (seed 1454000 + index·7919), never `Math.random`.
- Node-canvas quirks honoured: fading alphas rounded to 4 decimals before
  stringifying; dots as filled rects or own-`beginPath` arcs with a `moveTo`
  before every batched arc. No offscreen canvas, gradients, `shadowBlur`,
  `Path2D`, `createElement`, `AudioContext`, or `getUserMedia`.

## Verification (forced-time probe harness, `tmp/probe1454.js`)

- Two fresh instances byte-identical at t = 0; t = 0 redraw 0 px diff.
- t = 60 vs t = 0 = 0 px diff (loop closes exactly).
- Palm sway live (green px differ t = 0 vs t = 3); rustle drag near the left
  palm crown changes 46,607 px at the same t.
- Story strip dark px: 405 at t = 0 (~7 marks) → 681 at t = 30 (~22 marks) →
  243 at t = 50 (cycle restarted, ~2 marks) — grows, fades, restarts.
- Tile drag changes 1,771 px at the same t; tile gray px 49,001 before →
  50,073 during drag → 49,147 3 s after release (tile stays pasted, settles).
- Token scan clean: the single `Math.random` and `shadowBlur` hits are
  comments stating they are never used.
- Renders inspected at 1280×900, 390×844, and 720×720; thumb byte-identical
  across repeated renders including a final re-verify after the last fix.

## Fix rounds (1)

- First render: figures' legs were hidden behind coat/dress hems (floating
  robes), sea ripples bunched on the left, and the left palm's outer frond
  touched the frame edge. Fixed: legs extended below the hems, ripples spread
  across the full sea width, palms moved inward (0.17 / 0.85 of width), dot
  eyes added to both figures. All renders re-done after the fix.
