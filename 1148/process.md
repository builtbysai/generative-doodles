# №1148 — Impossible Rainbow

Rosa Menkman study block RM5, after IM/POSSIBLE RAINBOWS (2023-): a generative
model confuses symbolic "rainbow-like" imagery with actual atmospheric
phenomena, and the depiction comes back wrong in small, specific ways.

## The piece

Six hard-edged spectral bands arc across a black field (#050505): #FF003C,
#FF7A00, #FFD800, #00E53C, #00C8FF, #7A00FF, each a flat stroke with a 2 px
black gap to its neighbours. No gradients anywhere. The arc spans 80% of the
canvas width, springs from near the bottom corners, and crowns high.

The bands flicker like a failing neon fairy light — but only as brightness
steps: a precomputed pseudo-random table (seeded mulberry32) holds one alpha
value per band per 0.5 s step, 32 steps making exactly the 16 s loop, values
between 0.86 and 1.00. Steps, never strobe.

Twice per loop the rainbow is misremembered, on a fixed schedule, never more
than one anomaly at a time:

- **4–7 s:** band 3 (the yellow) drops out to the "unnamed" gray #555555,
  with a slight seeded vertical jitter (±2 px, changing every 0.25 s).
- **10–12 s:** bands 2 and 5 (orange and cyan) swap places, hard cut in
  and out.

Watch-only, seamless 16 s loop, no interaction.

## Implementation

- Ellipse geometry: band paths are 160-step polylines on concentric ellipses
  (radii offset per band), which keeps stroke width uniform around the arc —
  plain ctx.arc ellipses would fatten at the crown under a y-stretch.
  Outer radius x is set so rx·cos(18°) = 0.40·W (the 80% span); radius y =
  1.114·H puts the crown at 0.16·H and the spring points at ~0.93·H on any
  aspect. Band thickness is 4.5% of the smaller dimension (5% on phones),
  stroke width = thickness − 2 px, so the black separators show through.
- Flicker table built once from the seed; the frame-one step (t = 1.6 s) is
  pinned so exactly one band (the cyan) sits a step dimmer at 0.83 alpha and
  the rest are ≥ 0.95 — a calm opening with the mechanism already visible.
- Anomaly colours are resolved per band per frame from loop time; dropout
  jitter comes from a second seeded table of 12 quarter-second slots.
- Everything is a closed-form function of loop time; no state accumulates.

## House rules

- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; style width/height pinned in px inside draw();
  phone detection via window.screen (min dimension < 700) with the
  h > w·1.15 aspect fallback.
- Determinism: synchronous first frame at the fixed phase t = 1.6 s (full
  correct rainbow, cyan a step dimmer, no anomaly); rAF loop guarded by a
  typeof check, anchored at T0 + elapsed. Thumb re-rendered twice and
  byte-compared identical.
- Clean by construction: no gradients, no ctx.filter, no shadowBlur, no
  createElement, no offscreen canvas, no audio, no microphone, no pointer
  handlers — watch-only. The only text is the <title>.

## QA

- Desktop 1280×800, mobile 390×844, thumb 720×720 rendered from the live
  script; thumb byte-identical across two renders.
- Anomaly probes (temp copies with the phase constant moved, deleted after):
  t = 5 s shows the yellow band unnamed gray and all others correct;
  t = 11 s shows orange and cyan exchanged. One anomaly at a time, as specced.
