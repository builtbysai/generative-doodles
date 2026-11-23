# No. 1801 - Worn Down Until It Speaks

EXPANSION #236 robin-rimbaud, code SC2 (PP1048). Gallery date 2006 · 12 · 17.
Gallery note: "One shoreline, looped until it wears into weather. Watch only."

## Scene choice

Shoreline, the first scene the prompt names. A plain fragment filling the
frame: flat muted sky with a pale gold sun, a low headland at the left of
the horizon, muted blue green sea with three slow swell lines, a wet sand
band at the waterline, warm sand with twelve fixed pebbles. Nothing else
on screen. No vignette, no framing effects, no cuts, no camera moves.

## Loop schedule and degrade law

- One loop lasts 8 seconds. The fragment's internal motion (swell drift,
  waterline sway) is seamless across the 8 second loop.
- Loop count drives the degrade parameter: d = min(1, (loop + 0.5 * frac)
  / 14), where frac is the position inside the current loop. Fourteen
  loops carry the scene from clean to fully worn. Wear grows half a
  loop step inside each loop, so the wearing is visible loop by loop
  and slightly within a loop too.
- Degradation operators, all closed-form functions of d:
  - every palette color mixes toward a single warm grey (#8A8378) by d;
  - posterization drifts from 48 steps clean to 6 steps fully worn;
  - contrast stretches by 1 + 0.8 * d around mid grey;
  - edges smear: the sun spreads through concentric rings, the headland
    is drawn in three offset passes, the waterline thickens, swell lines
    gain jitter and fade, pebbles fade;
  - 24 fixed horizontal smear streaks fade in above d = 0.15;
  - an 800 dot seeded grain field accumulates with alpha 0.04 + 0.42 * d^2.
- Texture mode: at d = 0.88 the render starts crossfading into texture
  mode, complete at d = 0.92 (loop 13). Texture mode is a breathing
  monochrome warm grey field (24 second breath) with residual shapes
  (horizon line, sun ghost, shoreline curve, headland ghost), a dense
  grain field, and three faint color ghosts (sea green, sun gold, sand)
  at alpha 0.05 to 0.09 drifting slowly.
- Reset: after 23, 25, 23, 24, 20, 24, 19, 17 loops, then the pattern
  repeats. First resets at t = 184, 384, 568, 760, 920, 1112, 1264,
  1400 seconds. A long, irregular schedule: the viewer cannot summon
  freshness and cannot predict the restart.

## Frame one

Fixed phase at t = 60 s. Loop 7 of the first cycle, intra-loop fraction
0.5, degrade d = 0.52. The shoreline is visibly worn, colors about
halfway toward warm grey, grain and smear streaks present, sun softened
through its halo rings, but the scene is still legible: mid-degrade,
neither clean nor fully gone.

## Adaptation

NO offscreen buffer re-read: the QA harness has no
document.createElement, so the base scene is re-rendered each frame
from fixed authored parameters, and smear, posterization, grain and
contrast are closed-form functions of loop count and piece time.
Texture mode is a seeded grain field with residual shapes from the same
fixed table, so frame one stays byte-comparable.

## Interaction

Watch-only. No pointer or keyboard handlers are registered. The loop is
the whole system; the viewer cannot summon freshness. Never
click-to-reload. No audio; the visuals carry the piece alone.

## House rules

- Visual Viewport sizing; resize listened to on visualViewport and
  window. Canvas element pinned in draw() via style width and height
  in px. Phone detection via window.screen (min dimension under 700px)
  with aspect fallback (h > w * 1.15).
- Full-frame field: full-bleed on phones, square on desktop, page
  ground set to the piece's own sky color.
- One synchronous frame at load; requestAnimationFrame calls guarded
  with a typeof check. Deterministic fixed-phase first frame: seeded
  RNG only (mulberry32), no Date.now or Math.random affecting frame
  one. Reduced-motion respected.
- Title, date and hint plates drawn on canvas, mirroring No. 1799.
- Canvas 2D only.

## QA

Rendered from the actual script with node render-piece.js:

- Desktop 1280x900: square field centered on the sky ground, title
  plate top left, "Watch only." bottom left. Mid-worn shoreline:
  greyed sky, softened sun with halo rings, smeared headland, faint
  smear streaks, grain speckles, pebbles on the sand. Legible.
- Mobile 390x844: full-bleed field, plates fit, no clipping.
- Thumb 720x720: same composition, clean.
- Determinism: desktop rendered twice, identical md5.
- Probed states (FRAME_T changed in temp copies only): t = 104 s
  (loop 13, d = 0.93) shows the breathing monochrome texture with
  residual horizon, sun ghost and shoreline, plus faint sea and sand
  color ghosts; t = 200 s (loop 2 after the t = 184 s reset, d = 0.16)
  shows the scene fresh again in flat muted color with crisp swell
  lines.
- Fix round: first gate showed the headland smear passes bleeding a
  dark strip past the field edge onto the page ground on desktop and
  mobile. Fixed by clipping all field drawing to the field rect in
  drawField. Re-gated all three sizes after the fix; the strip is gone.

## Files

- index.html (md5 to be recorded by the pusher)
- thumb.png (720x720 render, md5 to be recorded by the pusher)
