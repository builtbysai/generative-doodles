# №1297 "Umi" (karen-kraven KK2, PP464)

## Prompt

Kraven's *Umi (Purple, Sand)*, 2022: 83% linen tubes with Montreal
slow-fashion offcuts, "costume becomes shroud becomes ceremonial remnant".
Two or three long fabric tubes hanging from an unseen line, textured purple
and sand linen, irregular offcut flaps stitched along their edges like
barnacles. Slow tide sway; flaps flutter slightly out of phase. Horizontal
drag is a wind gust; decay back to tide rhythm. Never click-to-reload.

## What was built

- Three tubes at frame one (seeded loop-0 count; 2 or 3 per loop), hanging
  from the top edge across the central span: deep eggplant purple #4A2E4F,
  sand linen #D9C7A8, purple again. Flat fold-shading bands, raw edge lines,
  dashed stitch ticks where flaps attach.
- Flaps: irregular 5-vertex barnacle polygons in raw edge #B9A582 or the
  tube's own color, seeded along both edges, gravity-sorted (denser toward
  the bottoms), each with its own flutter period/phase.
- Background near-black #16121a with a faint horizontal tide line at 55%
  height behind the tubes.
- No people, no hands, no dressing-room references. No bright purple, no
  gloss: flat alpha shapes only.

## Motion (all closed-form over piece time and recorded events)

- Tide sway: each tube is a pendulum about its top edge, angle =
  amp * sin(2πt/period + phase), own period (7-12 s) and phase per tube,
  lean growing down the tube length.
- Flap flutter: per-flap sine on its own period (1.6-3.8 s), out of phase
  with the tube and with each other.
- Gust: horizontal drag records gust events (strength from drag distance,
  capped); sway amplitude multiplies by (1 + gustBoost), gustBoost =
  sum of impulses decaying exp(-dt/2.5), capped at 2. Flap flutter scales
  with the same boost.
- Loop reseed: 60 s loop; tube count, flap positions, and sway periods
  regenerate from a seeded mulberry32 sequence (seed 1297 + loop x 7919),
  never Math.random.

## House adaptations

- Frame one draws synchronously at exactly t = 0 via a boot flag; the
  performance clock starts only with the rAF loop (plain function
  declaration, armed from the real scheduler, typeof-guarded).
- Visual Viewport sizing with resize listeners on visualViewport and
  window; canvas pinned in draw() via style width/height in px; phone
  detection via window.screen physical size with aspect fallback; page
  ground is the piece's own near-black.
- node-canvas limits respected: no rAF/AudioContext/createElement/WebGL/
  offscreen canvas/filter/shadowBlur/gradients. Dots drawn as arcs with a
  moveTo before each batched arc.

## QA

- Rendered with node render-piece.js at 1280x900, 390x844, 720x720;
  desktop and mobile reads inspected personally.
- Frame one: three tubes (purple, sand, purple) hanging from the top edge
  across the central span, flaps barnacle-like along the edges and denser
  toward the bottoms, faint tide line behind, near-black ground. Mobile
  holds the same read full-bleed.
- Thumb rendered three times at 720x720, cmp byte-identical, and matched
  against the shipped thumb.
- Gust probe (node harness through the piece's own pointer handlers):
  a +200 px drag changes 83,108 pixels at t = 2 (tubes swinging wider);
  by t = 30 the same drag's effect has decayed to 15 differing pixels,
  confirming the exp(-dt/2.5) return to tide rhythm.

## Fix rounds

1. Tube body path first traced the right side bottom-to-top after starting
   at top-right, crossing the shape. Rebuilt as top edge, right side top
   to bottom, left side bottom to top (same fix applied to the fold bands).
2. Desktop span widened from min(W x 0.52, 520) to min(W x 0.60, 620) so
   the tubes occupy the central two-thirds the prompt specs.
