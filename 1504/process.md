# №1504 "The Note Held As Long As She Wants" (sonia-wieder-atherton SW1, PP751)

Gallery date: 2006 · 02 · 23 (formula date; not drawn in the piece).
Study: sonia-wieder-atherton, expansion #199, network chain from claire-atherton #198.
Core engine: THE NOTE HELD AS LONG AS SHE WANTS IT, AND NEVER HEARD ALONE.

## What it is

Deep charcoal field, full-bleed. A single horizontal gold line crosses the
middle third at full width; four fainter ghost lines (slate, grey, slate,
grey) stack above and below it at wide spacing (±0.13H, ±0.26H). Generous
empty field above and below. No visible text except `<title>`. Fully silent.

## Timing (24 s sustain loop, loop-local time throughout)

Loop-local time lt runs 0–24 s; frame one is phase-shifted +6 s, so it opens
mid-sustain on the full thick line rather than on an empty field:

- Enter 0–4 s: line extends left to right on a smoothstep, full thickness.
- Sustain 4–12 s: full width, full thickness (Tmax = max(6 px, 0.02 × min(W,H))).
- Thin 12–16 s: thickness eases to 0.22 × Tmax.
- Tremble 16–20 s: thin line trembles on a 3-cycle sine inside an envelope
  that is zero at both window edges, plus a thin cream hairline riding the
  tremble at 0.5 × envelope alpha.
- Fade 20–24 s: alpha eases 1 → 0, never a sharp cut; a new line enters at
  the loop boundary.

Ghosts are the previous cycles' lines: fixed seeded geometry (lengths
0.72–0.92 W, thickness 0.35–0.60 × Tmax, mulberry32 seed 1504000) with alpha
0.06 + 0.38 × (1 − lt/24), decaying across the loop and renewed at the
boundary. Ghost alpha is a pure function of loop-local time rather than
accumulated history, so the loop closes exactly (accumulating real history
across loops would break t = 24 vs t = 0).

## Interaction

Watch-first. Dragging horizontally along the line band (|y − midline| <
0.12H) slows the sustain meter: drag rate = clamp(1 − |dx|/300, 0.25, 1),
integrated closed-form over recorded drag sub-segments, so a drag holds the
line at full thickness longer (the tremble waits) and release resumes the
schedule from the slowed position. The rate floor 0.25 means a drag never
freezes the line; it never changes the line's color or maximum thickness
and never adds a second main line. Drags starting off the line band are
ignored. Never click-to-reload, never click-to-restart.

## House-rule compliance

Canvas 2D only; viewport from the Visual Viewport API with canvas pinned in
draw(); phone detection via window.screen with aspect fallback; full-bleed
field composition on phones. Fixed-phase first frame (draw(0), clock starts
with the rAF loop); every animation sine on loop-local time; event state
closed-form over recorded events and t, never frame-integrated; no
Math.random for anything visible (seeded mulberry32 only). rAF loop as a
plain function declaration with typeof guards. No AudioContext, no offscreen
canvas, no Path2D, no ctx.filter, no gradients (flat-alpha strokes only),
no shadowBlur, no document.createElement, no WebGL, no getUserMedia, no
localStorage. Fading alphas rounded to 4 decimals; dots/lines drawn as
strokes and filled rects (no batched arcs in this piece). Forbidden-API
grep clean (AudioContext, getUserMedia, Path2D, createElement, localStorage,
Math.random, Date.now, gradients, shadowBlur, fillText all absent).

## Probes (probe-1504.js, vm-isolated, real node-canvas — all pass)

- Loop closure: t = 24 vs t = 0 = 0 px; t = 48 vs t = 0 = 0 px.
- Sustain phases, gold column count at mid-width (wall t → lt = t + 6):
  t = 2 (sustain) 14 px; t = 8 (thinning) 8 px; t = 12 (tremble) 3 px;
  t = 16 (fading) 0 px near-pure gold; t = 18 (enter start) 0 px.
- lineState spot checks: sustain thickness 1 and alpha 1; tremble envelope
  1.0 at mid-tremble.
- Ghost decay: near-color slate/grey pixels 7,446 at t = 0 vs 0 at t = 17
  (by the strict near-color count the ghosts have blended back to charcoal
  by lt = 23, as the decay curve intends).
- Drag hold: drag 360 → 660 px on the line from t = 2 holds effT(8) = 5
  (sustain), gold column 14 px vs 8 px undragged at t = 8; after release,
  t = 12 gold column falls to 4 px, so the schedule resumes, never frozen.
- Off-line drag (y = 100): frame at t = 8 byte-identical (0 px) to the
  undragged frame.

## Renders

- qa-desktop.png (1280×720): thick gold line mid-frame, four ghosts stacked
  above and below, generous empty field. Inspected personally.
- qa-mobile.png (390×844): same composition, full-bleed, no clipping.
  Inspected personally.
- thumb.png (720×720): rendered from the live script; re-rendered twice,
  all three byte-identical (md5 c319714224cba5e11f10278f67c871bf).
- index.html md5: 632f60993f1477a7c273682edee2a02c.

## Fix rounds

None. First build passed all probes and renders.

## Deviations from the prompt

None, apart from documented house-rule adaptations: ghost alpha as a
closed-form function of loop-local time (above) instead of literally stored
history, frame-one phase shift +6 s into sustain, and canvas 2D throughout.
No audio (the piece is fully silent by the house lazy-audio rule; the
prompt specs no sound).
