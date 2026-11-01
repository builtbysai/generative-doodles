# №1508 "Odyssey: One Woman Against the Elements" (sonia-wieder-atherton SW5, PP755)

Gallery date: 2006 · 02 · 27 (formula date; not drawn in the piece).

## Palette (strict, no other color)

- Field charcoal #2a2a30; figure cream #e8e0d0; held line gold #d9a441;
  wind slate #4a5a7a; waves teal #2e6f6a; storm grey #b8bcc0; chaos fragments brick #a8674a.

## Composition

- Full-bleed charcoal field. Small abstract figure-shape at left (plain circle head
  with no features, torso rect, two leg rects, one horizontal arm rect), feet at 0.66H.
  The held gold line spans the middle from 0.18W to 0.88W at 0.50H, starting where
  the arm ends. Elements enter from the right, large, against the empty field.
  All sizes scale from U = min(W, H); mobile keeps the same full-bleed composition
  with no clipping (verified at 390 wide).

## Motion: 48 s weather loop, phase-shifted +6 s

- Four 12 s slots, one element at a time, each with a smoothstep envelope
  (in 0–2 s, full 2–10 s, out 10–12 s), then the line straightens:
  wind (diagonal slate streaks flowing right to left), waves (four teal sine bands),
  storm (220 grey speckle marks jittering in place), chaos (40 brick fragments
  drifting on sine offsets). Pressures: wind 0.55, waves 0.70, storm 1.00, chaos 0.80.
- Frame one is phase-shifted +6 s into the wind slot, so the thumb shows the line
  already bent under wind rather than an empty field; loop closure is unaffected
  because every function runs on phase-shifted loop-local time.
- Bend: deflection = capped amplitude × pressure × envelope / stiffness, shaped as
  sin(pi·u) along the line, plus a small idle sway (0.008H, 48 s period) and a
  ripple term in the waves slot only. Maximum deflection is capped at 0.12H, so no
  element ever breaks the line or wins.
- Drag: pointer x maps to stiffness, clamp(1.05 − 0.8·x/W, 0.25, 1.0) — dragging
  toward the figure steadies the line (bends less), dragging toward the elements
  lets it bend further. On release, stiffness eases back to the 0.7 base with
  tau 1.5 s, computed closed-form over the recorded down/move/up events.
  Drag never moves the figure, never stops an element, never poses the figure.

## Determinism and house rules

- Synchronous first frame = draw(0); the rAF loop (plain function declaration)
  anchors its clock on its first callback and never feeds Date.now() /
  performance.now() into frame one. Every animation sine runs on loop-local time;
  all element motion is closed-form over slot time and seeded constants;
  all drag state is closed-form over recorded events. Per-loop variation: none
  beyond the fixed seeded layout (mulberry32, seed 1508000) — the loop repeats
  exactly. No Math.random anywhere.
- Fully silent (no AudioContext at all). No offscreen canvas, gradients,
  shadowBlur, Path2D, document.createElement, WebGL, getUserMedia, localStorage,
  or text drawing. Viewport from the Visual Viewport API with canvas pinned in
  draw(); phone detection via window.screen with aspect fallback. Fading alphas
  rounded to 4 decimals; dots as filled rects or own-beginPath arcs with moveTo
  first (node-canvas quirks). Never click-to-reload / click-to-restart.
- Study guard: abstract figure-shape only, no face, no features, no likeness,
  no real names, no readable text, no depiction of segregation, exile violence,
  or any identifiable event; the figure never moves and never strikes a hero pose.

## Probe results (probe-1508.js, forced-time harness, real node-canvas, 720×720)

- t = 0 redraw 0 px; fresh instance t = 0 identical; t = 48 vs t = 0 = 0 px;
  t = 96 vs t = 0 = 0 px (loop closes exactly, twice over).
- Elements one at a time, mid-slot vs empty slot boundary: wind slate 1038 vs 0;
  waves teal 2285 vs 0; storm blended-speckle 1048 vs 0; chaos brick 6798 vs 230
  (residue is gold-line antialiasing). Storm marks confirmed right-side only:
  slate pixels with x < 0.30W are 0 at storm time vs 233 at wind time.
- Bend (strict-gold bbox height, middle third): straight slot boundary 7 px;
  bent wind frame 21 px; drag toward figure 17 px (steadied); drag toward
  elements 30 px (bends further); line continuity check 0 gaps at maximum bend.
- Figure static: figure-region pixel diff after a drag = 0 px.
- Released drag: at lt = 3 after a toward-elements drag and release, bbox 23 px
  vs 22 px undragged — eased stiffness still below base, direction correct.
- Forbidden-API grep clean: no AudioContext, getUserMedia, Path2D, createElement,
  localStorage, fillText, gradients, shadowBlur, Math.random, Date.now,
  performance.now.
- Renders inspected: desktop 1280×720 (figure, bent gold line, wind streaks),
  mobile 390×844 (same composition, no clipping), thumb 720×720.

## Fix rounds

- None to the piece. One probe-harness correction: the first probe run's loose
  color classifiers counted blended storm speckle as slate and brick fragments
  as gold; the harness was tightened (strict gold, empty-slot comparisons,
  figure region excluding the line start) and all probes re-run — the piece itself
  was unchanged.

## Files

- index.html — md5 767f3e87bf034446763080b02ae73a67
- thumb.png — md5 4f151f9de6a785f9bca521e167ca6e74; re-rendered twice,
  all three renders byte-identical.
