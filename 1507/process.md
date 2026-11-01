# №1507 "Vita: Two Centuries, One Line" (sonia-wieder-atherton SW4, PP754)

Gallery date: 2006 · 02 · 26 (formula date; recorded here only, never drawn in the piece).

## What it is

A single melodic line drawn across a deep charcoal field (#2a2a30), spanning
0.08W to 0.92W in the middle band, with generous empty field above and below.
In its first half the line is a smooth, ornamented vocal-style curve in warm
cream (#e8e0d0); without any break it gradually becomes a shimmering,
micro-stepped line in cool teal (#2e6f6a), full of tiny trembling steps; then,
still without breaking, it returns to the smooth curve. One line, two
centuries, no seam. The morph zone sits at the centre, unmarked: the only
gold (#d9a441) is a faint (alpha 0.15) under-stroke wash across the morph
zone, never a vertical seam mark. Small grey (#b8bcc0) dots mark the line's
start and its moving draw head. No other color, no visible text except
`<title>`.

## Parameters

- Loop: 24 s. Draw progress p = (lt/24 + 0.55) mod 1, so frame one is
  phase-shifted to show the line drawn 55% across: smooth cream at left,
  morph zone at centre, stepped teal just begun at right. The line completes
  at lt = 10.8 s, clears, and redraws; the loop closes exactly.
- Morph weight w(u): a smooth bump over line position u, rising
  0.22 -> 0.5 and falling 0.5 -> 0.78 (smoothstep edges), peaking at the
  centre. Both the line's shape and its color (cream <-> teal) interpolate
  on this same weight, so shape and color morph together with no seam.
- Smooth character: seeded low-frequency curve (1.0 and 2.0 cycles across
  the line, amplitudes 0.05H and 0.025H) plus a small 5-cycle ornament
  (0.008H).
- Stepped character: the same low-frequency curve quantized to 0.018H
  steps, plus a tremble of 0.0035H at 3 cycles per loop with a seeded
  per-step phase. 3 cycles per loop keeps the tremble exactly periodic.
- Seeds: mulberry32(1507000) for curve phases only; no Math.random
  anywhere, no per-loop reseeding (the morph schedule is fixed, so frame
  one and every loop are reproducible).
- Drag: drags starting in the line's middle band (|y - 0.5H| < 0.25H) map
  pointer x to a morph shift, clamp(dx/W * 0.6, -0.35, 0.35), which slides
  the morph bump along the line: right scrubs the morph later, left
  earlier. On release the shift decays exponentially (tau 1.5 s) as a
  closed-form function of the recorded drag list and t, so the automatic
  morph resumes with no jump. Drag never cuts the line, never adds a
  second line, never marks the century change. Off-band drags are ignored.
- Fully silent: no AudioContext at all. No offscreen canvas, gradients,
  shadowBlur, Path2D, document.createElement, WebGL, getUserMedia, or
  localStorage. Viewport from the Visual Viewport API with canvas pinned
  in draw(); phone detection via window.screen with aspect fallback.
  rAF loop is a plain function declaration with typeof guards; first
  frame is a synchronous draw(0). Fading alphas rounded to 4 decimals;
  dots are filled rects (no arcs are used at all).

## Probe results (forced-time harness, real node-canvas, all passing)

- Loop closure: PNG at t = 24 and t = 48 byte-identical to t = 0.
- Draw progress: p = 0.550 / 0.800 / 0.988 / 0.050 at t = 0 / 6 / 10.5 /
  12; rightmost line x 696 / 965 / 1166 / 158, matching the 0.08W-0.92W
  span exactly (line width 1075 px at 1280).
- Morph colours at full draw (t = 10.5): left band (u 0.10-0.30) 617
  cream / 0 teal; centre band (u 0.40-0.60) 0 cream / 739 teal; right
  band (u 0.70-0.90) 624 cream / 0 teal.
- Continuity at full draw: 1065/1065 columns carry line content
  (frac 1.0). Note: the first probe run used strict cream/teal/gold
  classes and reported 0.934; diagnosis showed every class-missed column
  still deviated 118-166 from the charcoal background (antialiased edge
  pixels of steep risers), so the probe now tests deviation from
  background (> 40) and the line is continuous.
- No seam: max gold pixels in any single column is 1 (a wash, not a
  seam line).
- Steppedness (analytic): fraction of centre-band samples (u 0.42-0.58)
  lying within 4 px of the 0.018H step grid is 1.000; left-band samples
  score 0.613, which is exactly the chance level for a smooth curve
  against a 12.96 px grid at +/-4 px tolerance (8/12.96 = 0.617) — the
  contrast confirms the centre is truly quantized.
- Drag scrub: +300 px drag at full draw moves the teal centroid from
  x = 638.6 to x = 780.4, shift 0.141 (predicted 300/1280*0.6 = 0.141).
  After release, t = 30 vs a fresh undragged instance at t = 30 differs
  in 0 px (decay exp(-19.5/1.5) is negligible).
- Off-band drag (y = 50): shift stays 0.000.
- Forbidden-API grep clean: no AudioContext, getUserMedia, Path2D,
  createElement, localStorage, gradients, shadowBlur, fillText,
  Math.random, Date.now, or performance.now.
- Renders inspected: desktop 1280x720 (smooth cream left, gold-tinged
  morph at centre, stepped teal just begun at right, grey start/head
  dots, no text, no seam) and mobile 390x844 (same composition,
  full-bleed, no clipping). Thumb 720x720 re-rendered twice after the
  final file state: all three renders byte-identical.

## Fix rounds

None to the piece. One probe-harness correction only: the continuity
classifier was loosened from strict color classes to background
deviation after diagnosis proved the missed columns were antialiased
riser edges, not breaks; the piece file was not changed for it.

## Deviations from the prompt

None, apart from the documented house-rule adaptations above (canvas 2D
throughout, closed-form drag state, fixed-phase first frame with a
+0.55 draw-phase shift so frame one shows the line through the morph
zone, fully silent). The prompt's "background grey" tone is used only
for the two small endpoint/head dots.
