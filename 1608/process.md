# No.1608 — Alley, Third Mint (JL1, study #212 jinyao-lin, PP855)

Driver: a photograph re-grown as etched lines; the mechanism is
tone-as-line-density over a procedural depth map, with the sun as
the one fixed anchor.

## Mechanism

- One-point perspective over a procedural depth map: vanishing point
  at (0.5, 0.44), wall-top edges from (0, 0.16) and (1, 0.16) to the
  vanishing point, ground triangle (0,1)-(1,1)-VP, sky wedge above
  the wall tops.
- Sky: ~55 horizontal hatch lines, spacing tightening from 0.016 to
  0.005 of frame toward the horizon and alpha rising 0.48 to 0.92, so
  tone exists only as line density. Each line is a 26-point wobbled
  path (seeded sine + jitter), never a clean vector line.
- Walls: ~1,100 vertical scribble strokes (seeded, mulberry32 seed
  1608001), short wobbled 5-point segments in wall tone #33312C with
  ~22% ink #191920, accepted with density rising toward the outer
  edges. Four etched perspective edges outline the alley.
- Ground: fan lines from the vanishing point to the bottom edge plus
  horizontal hatch denser near the vanishing point; both start below
  the city band base (y 0.485/0.49) so they never cross the skyline.
- Cityscape: 16 hatched rectangles on the horizon (tops 0.40-0.455,
  base 0.485), each outlined in ink with interior horizontal hatch;
  the two central buildings are kept short (top >= 0.415) so the sun
  clears them.
- Sun: 25 concentric oval rings (rx step 0.0026, ry 0.74 rx) in
  #141416 at alpha 0.95, dense enough to read as a dark disc with no
  fill anywhere in the piece. It is never displaced and never moves.
  A y-scale (rect.w / rect.h about the sun center) keeps it round
  when the frame is not square.
- Motion: watch-first. The sky hatch breathes with a slow 26 s
  density shimmer (alpha +-7%, fixed phase, far below 14 Hz).
  Drag: pointer samples are recorded with piece time; every hatch
  vertex is displaced by a closed-form sum over samples (Gaussian
  spatial falloff sigma 0.11, exponential settle tau 1.8 s, radial
  push with a slight upward lean, capped at 0.05 of frame), so the
  lines lean and part near the pointer and settle back exactly. The
  sun and the perspective edges are never displaced. No other
  interaction; no click-to-reload.
- Determinism: all geometry from mulberry32(SEED 1608001); first
  frame drawn synchronously at fixed PHASE 10.0; rAF guarded by a
  typeof check; prefers-reduced-motion freezes the shimmer.
  Thumb byte-identical across two independent re-renders (md5
  6f48271d500ad1ec7a791c786558c5b3).

## Deviation from the prompt

- The sun is rendered as dense concentric oval rings rather than a
  filled disc, because the prompt forbids fills: tone is line
  density only, and the rings at this spacing read as a solid dark
  oval while keeping the no-fill rule.
- Title and date are drawn in-piece (monospace, ink, top center),
  matching the shipped siblings (No.1597-1601); the interaction hint
  is NOT drawn in-piece, per the BATCH-1607-1611 spec (no in-piece
  hint text). The gallery note carries "Drag to stir the air."

## House rules

- Single self-contained index.html, canvas 2D, no external assets.
  Gallery date 2006 · 06 · 07.
- Visual Viewport sizing, resize listened on visualViewport and
  window; canvas.style.width/height pinned in size() every draw;
  phone detection via window.screen (min dimension < 700px) with
  aspect fallback; field-like composition, full-bleed on phones,
  square on desktop.
- No em dashes in visible copy. No AI-signature copy.

## Fix rounds

1. First render: the sun read as a sparse target (rings too far
   apart, hatch showing through) and ground lines crossed the city
   band. Fixed by tightening sun ring spacing 0.0046 to 0.0026 with
   heavier line weight (0.0022 of frame) and alpha 0.95; ground fan
   lines now start below the city band base and ground hatch starts
   at y 0.49. Also added the sun y-scale so it stays round on the
   tall phone frame instead of stretching into a tall egg.
2. Re-rendered desktop 1280x900, mobile 390x844, thumb 720x720:
   sky hatch, wall scribble, hatched city band, fixed dark sun and
   etched wobble all read on all three sizes. Thumb re-render
   byte-identical.
