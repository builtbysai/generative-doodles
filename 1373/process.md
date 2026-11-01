# №1373 "The Island Weights" (sky-hopinka SH6, PP596)

## What it is
A slow orbital journey to four cardinal water-spirits. The screen is a
compass field on deep water: north, east, south, and west each hold a
distinct water-weight — a dark anchor-form standing in a pool of animated
water. The viewpoint orbits the compass over a 180-second revolution,
visiting each weight in turn; when a weight is "faced" (nearest the top of
the screen), a short pseudo-script verse surfaces in its water and sinks
again as the orbit moves on.

## Frame one (t = 0, boot flag)
Deep water ground. A faint orbit ring with a cardinal-gold center dot.
Four pools at the cardinal points, each with a foam rim, animated rings,
seeded foam speckles, and an upright anchor (ring, shank, stock, flukes,
a moss patch, a gold accent). The north weight is faced, so its verse —
seven invented glyphs — is surfaced in the water below its anchor. The
other three pools show no verse. No readable text except `<title>`.

## Mechanics (all closed-form over piece time and recorded events)
- **Orbit:** 180 s per revolution. A weight's screen position is its base
  angle plus the orbit angle; nothing is frame-integrated.
- **Facing:** a weight is faced when its screen angle is nearest the top.
  Verse opacity is a smooth envelope of angular distance (full within
  0.35 rad, gone beyond 0.9 rad), and the verse sinks (moves down) as the
  envelope closes. The faced order is N → W → S → E, one weight per 45 s.
- **Drag rotates the compass:** horizontal drag adds a rotational offset
  (0.004 rad/px). On release the offset decays exponentially (tau 3 s),
  so the orbit always resumes; a new drag folds the decayed offset in
  first, so there is never a jump.
- **Touch ripples a pool:** a tap (movement under 12 px) on a pool records
  a ripple — expanding flat-alpha rings over 3 s — and deepens that
  pool's verse (0.8 → 1.0 while faced). Touch never summons a verse on an
  unfaced weight. No tap action, never click-to-reload.

## Adaptations
- Water pools as closed-form expanding flat-alpha rings from recorded
  touches (no heightfield buffer — the QA renderer paints one frame).
- Verses as seeded pseudo-script glyph functions surfacing/sinking on
  closed-form envelopes, never readable words. No compass letters (N/E/S/W)
  anywhere on screen.
- Orbit as a closed-form rotation of piece time; drag adds a decaying
  rotational offset the orbit reabsorbs.
- Canvas 2D throughout: no offscreen canvas, gradients, shadowBlur,
  Path2D, createElement, AudioContext, or getUserMedia. The prompt specs
  no audio for this piece; it is fully silent.
- Viewport from the Visual Viewport API with canvas pinned in draw();
  phone detection via window.screen with aspect fallback. Centered
  composition keeps its shape; page ground is the piece's own deep water.

## Determinism
Frame one = draw(0) via boot flag; the clock starts only with the rAF
loop (plain function declaration behind a typeof guard). All randomness
from mulberry32 (seed 1373000 + index·7919), never Math.random.

## Verification
- Rendered at 1280×900, 390×844, 720×720 and inspected all three;
  thumb byte-identical across repeated renders, including a final
  re-verify after this file was written.
- Probe harness (stubbed rAF driving the piece's own loop, piece's own
  pointer listeners): verse-band bright-pixel counts at t = 0/45/90/135
  show exactly one faced verse each time (N 176, then W 207, S 221,
  E 178, against 10–29 baselines from rim/speckles in unfaced pools).
- Drag probe: a 200 px drag at t = 10 changes 23,817 px at t = 11;
  dragged vs undragged at t = 60 differs by 0 px — the orbit fully
  resumes.
- Tap probe: tapping the faced pool at t = 5 changes 1,667 px at t = 6
  (ripple rings plus verse deepening); the verse band brightens 219 →
  268 px.
- Fix rounds (2): the verse row first overlapped the anchor, so it moved
  below the anchor into the lower water; the verse alpha first had a 0.2
  floor that showed ghost verses on unfaced pools, so it is now purely
  the facing envelope (touch deepens, never summons). Token scan clean
  except one comment stating Math.random is never used.
