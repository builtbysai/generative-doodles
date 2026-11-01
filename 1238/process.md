# №1238 — The Air We Breathe

Christina Battle study block CB7 (PP397), after her FORECAST work: air
pollution as environmental catastrophe and environmental racism, breathing
as political and social potential — inhalation as a shared, unequal
condition.

## What it is

Shared air made visible. A wide skyscape of five horizontal air bands,
each a different air quality. Smell ribbons drift left to right through
the bands, each labeled in small type as it passes. At the center, two
lungs drawn as branching trees breathe on a 12-second cycle that never
changes tempo — the one constant in the piece. On each inhale, the
ribbons passing near the lungs bend inward: the air is drawn in.

## Band / smell mapping — the inequality is the composition

The bands are deliberately unequal. The clear top band is the thinnest
(clean air is scarce); the chemical amber murk at the bottom is the
thickest. Clean smells ride high, pollutants sink:

| Band (top → bottom) | Fill | Smells that ride in it |
|---|---|---|
| Clear pale blue (thinnest, 10%) | #A8C8DC | — (almost nothing gets to be up here) |
| Pale green-grey (16%) | #BCC6BC | sweetgrass |
| Haze (20%) | #C9C2AE | cut grass, rain |
| Amber haze (22%) | #C4A668 | diesel, exhaust |
| Chemical amber murk (thickest, 32%) | #C08A3E | wildfire, smoke |

The politics are in that mapping and in the band heights, not in any
slogan. The only text in the piece is the smell labels.

## House adaptation

The prompt describes the bands as layered gradients. Per house rules the
piece uses no canvas gradients: each band is a flat fill, and each
boundary is softened with two flat intermediate strips in the 50/50 mix
of the neighbouring band colours, drawn at reduced alpha. Band edges
wobble slowly (± a few px on summed sines) and flat murk blobs drift in
the lower bands, so the sky still feels like weather rather than a chart.

## Mechanics

- **Bands.** Five flat fills at edges 0 / .10 / .26 / .46 / .68 / 1.0 of
  the height, plus the intermediate boundary strips and drifting murk.
- **Ribbons.** One full cycle of the seven smells circulates in a
  stream 1.75 canvas-widths long; each smell's stream order comes from a
  seeded shuffle (mulberry32). A ribbon is a tapering flat-filled path
  (22 sampled points, sine wander) with a centre thread and a trail of
  fading particles past its tail. Its height is fixed by its smell (see
  the table) with a small per-instance jitter. Speeds vary per instance
  via a seeded factor. Labels sit at the ribbon's bottom-left in small
  sans (#3A3A38) and are only drawn when on-screen.
- **Lungs.** Two recursive branching trees (4 branch levels, length
  ×0.78 and width ×0.68 per level), mirrored off a central trachea, in
  ink #2E3438. Breathing is a pure function of piece time on a 12 s
  cycle: inhale [0,5) — branch lengths scale to 1.06 and the branch
  spread opens by 0.10 rad, both on a smoothstep; hold [5,6); exhale
  [6,11); rest [11,12). Nothing — no interaction, no reseed — can change
  that tempo.
- **Inhale bend.** A ribbon point's y is pulled toward the lung centre
  by 0.38 × (gaussian proximity to the centre column) × (breath phase),
  so air near the lungs visibly pours inward as they expand.
- **Hold.** Pressing and holding anywhere slows ribbon drift to quarter
  speed — holding the breath of the piece — while the lungs keep their
  12 s tempo regardless. Implemented as a drift clock computed in
  closed form from the recorded press intervals (drift advances at
  1 − 0.75 × held overlap). Breathing never reads the drift clock.
- **Double-tap** reseeds: the seed salt increments and the smell order
  reshuffles.
- **Sound:** none. The piece ships silent.

## Determinism and house rules

The first frame is drawn synchronously at fixed phase T0 = 3.2 s —
mid-inhale (breath phase ≈ 0.68): lungs expanded, the sweetgrass ribbon
bending in at the top, exhaust, smoke and wildfire low in the murk, all
labels legible. The animation loop is anchored at T0 + elapsed and the
rAF call is typeof-guarded. All randomness is seeded (mulberry32 /
integer hash); no unseeded randomness anywhere. Canvas size comes from
the Visual Viewport API with resize listeners on both visualViewport
and window; the canvas CSS size is pinned in draw(); phone detection
uses window.screen's physical size (min dimension < 700) with the
aspect fallback. No gradients, no canvas filters, no shadow blur, no
element creation, no pixel buffers or offscreen canvas, no microphone,
no audio.
