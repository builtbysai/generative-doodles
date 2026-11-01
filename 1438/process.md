# №1438 "Never Posted" (nikolaus-utermoehlen NU7, PP661)

## What it is

A black-and-white photograph of a rocky landscape — tall stones rising by a
lake, trees, shade — with one impossible addition collaged into it: a small
stylized figure, smiling, chin between outstretched arms, crouching on a
glowing green island in the middle of the lake, under a carmine twilight sky.
A tiny scrap of paper is stuck to the sky. The card is never sent, never
stamped, never addressed.

## Frame one (t = 0, verified at 1280x900, 390x844, 720x720)

Carmine twilight sky with a flat-alpha twilight disc; tall grey stone slabs
left and right; dark trees; a dark lake with barely-moving shimmer lines.
At the lake's centre, small but luminous: the glowing green island with its
hard white cut edge, and the figure crouching on it, arms outstretched, head
between them, smiling. The scrap is a tiny paper speck in the sky, upper
right — no text visible at rest. No other visible text besides `<title>`.

## Mechanics (all closed-form over piece time and recorded events)

- **Almost still.** The lake shimmer runs on a 60 s periodic sine, so the
  ambient loop closes exactly. The sky holds its twilight; the figure holds
  its smile and never moves or performs.
- **Scrap near-word generator.** The scrap's writing rewrites letter by
  letter, one letter every 2 s, approaching the prompt's own near-word
  "N OFENDE" but never landing on it: exactly one letter is always mutated
  (seeded per tick), so the string approaches the target and drifts away.
  The haze lines beneath it are single seeded letters separated by spaces —
  a haze, never a word. Verified over t = 0–120 s: the string equalled the
  target 0 times.
- **Scrap zoom (drag only).** Dragging toward the scrap enlarges it until
  the haze of words is visible (text draws only at zoom >= 2.5); dragging
  away shrinks it back to a speck. Zoom is computed closed-form from the
  recorded pointer-move list as net approach toward the scrap centre
  (clamped 1–7), never frame-integrated state. Probe: scrap paper pixels
  143 at rest → 5992 after an approach-drag → 255 after a retreat-drag.
- **The card is never completed.** No stamp, no address, no enter state, no
  send action exists anywhere in the piece.

## Adaptations

- Black-and-white landscape render with a coloured collage layer (figure +
  island + sky) composited with a hard visible cut edge: the island and the
  figure are stroked in photograph-white, never blended into the
  black-and-white world. Cut edge verified: 278 light pixels ringing the
  island at frame one.
- The figure is a small, stylized, non-sexualized collage figure in repose
  (crouching, smiling, chin between outstretched arms) — the register of a
  classical painting figure, never eroticized.
- Scrap text is the prompt's own specced exception (drifting near-word
  haze); it is the only visible text besides `<title>`.
- Fully silent: no AudioContext, no getUserMedia, no offscreen canvas, no
  gradients, no shadowBlur, no Path2D, no createElement. Fading alphas
  rounded to 4 decimals; dots as filled rects or own-beginPath arcs
  (node-canvas quirks). The single "Math.random" and "shadowBlur" hits in a
  token scan are comments stating they are never used.
- Island scale fix round (1): the island first rendered at 0.16 of the
  frame's min dimension, dominating the lake — shrunk to 0.06 so the island
  and figure read as small but luminous at the lake's centre, per the
  prompt. All renders re-done after the fix.

## Determinism

Frame one = draw(0) via boot flag; the clock starts only with the rAF loop
(plain function declaration behind a typeof guard). All randomness from a
seeded mulberry32 PRNG (seed 1438000 + index*7919), never Math.random.
Thumb byte-identical across repeated renders; two fresh probe instances
byte-identical at t = 0.

## House rules

Canvas sized from the Visual Viewport API with resize listeners on
visualViewport and window; canvas pinned in draw() via style width/height
in px; phone detection via window.screen physical size (min dimension <
700px) with aspect h > w*1.15 as fallback; field-like composition goes
full-bleed on phones (verified at 390 wide, no clipping). Interaction is
drag only, never click-to-reload.
