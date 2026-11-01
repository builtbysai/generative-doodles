# №1228 — Ways + Means (Pedal-Powered City)

Leslie Supnet study block LS5, after her 2015 16mm Toronto goodbye letter
*Ways + Means*. A hand-drawn city symphony in ink on film: layered blocks,
streetcars, bicycles, construction cranes. No landmarks, no photorealism,
no smooth camera moves — the projection speed is the viewer's body.

## The piece

- Palette exactly as specced: film base `#101010`, ink `#E8E2D4`, streetcar
  red `#B03030`, construction yellow `#D8A020`, rain blue `#4A6A8A`, and an
  Ektachrome warmth wash `#C07830` over everything.
- A sprocket-hole strip runs along the top edge and scrolls with the film.
  Below it: drawn scallop clouds and a line sun, then three parallax ink
  layers — far blocks (×0.3), mid blocks and cranes (×0.6), street level
  (×1.0) with storefronts, trees, lamps, pedestrians, bicycles, a hydrant,
  and one red streetcar per strip period. Rails and a scrolling dashed
  centre line sit under the streetcar; pavement scribbles drift below.
- Gate weave shudders the whole frame every step; each item's strokes
  re-jitter per step from its own seed (ink boil). Film grain is hashed
  speckle, re-rolled per step. Nothing is smooth, ever.
- Rain: every 55 s a 10 s rain-blue passage (sine envelope) lays diagonal
  streaks over the city, pedalled or not. Weather happens.

## Pedal / distance model

The only driver is horizontal drag velocity.

- Pointer samples: on each `pointermove`, instantaneous velocity is computed
  from the recorded sample (time, clientX), converted to logical px/s, and
  smoothed: `v = 0.6·v + 0.4·vInst`, clamped to ±2800 logical px/s.
- Distance `D` is **not** frame-integrated ad hoc: the rAF loop runs a
  fixed-timestep accumulator (h = 1/240 s, dt clamped to 0.25 s) and each
  step does `D += v·h`. After release, `v` decays exponentially with a
  2.5 s time constant inside the same fixed steps, easing the film back to
  a trembling standstill; a finger held still (>0.12 s without a move)
  decays `v` fast (τ = 0.3 s) — holding the film still stops it.
- The drawn distance is quantized (`Dq`, steps of 0.004·U), so the city
  advances in discrete film frames, never glides. The boil/step rate rises
  with speed: `6 + min(18, |v|/55)` steps per second.

## Speed effects

- `|v| > 240`: multiple exposure — mid and near layers are drawn twice
  more at offsets `∓ clamp(v·0.05)` with alpha 0.30.
- `|v| > 600`: pixellation burst — the mid layer switches to precomputed
  block silhouettes (one filled column per 0.02U per building, tops
  jittered from the building's seed; cranes collapse to mast/jib/hook
  blocks). Data-driven; no offscreen or low-res render anywhere.
- Ektachrome warmth alpha rises from 0.07 at rest by up to +0.09 with speed.

## Determinism

- All layout comes from seeded mulberry32 generators (one per layer) and
  an integer ihash; no `Math.random`, no gradients, no `ctx.filter`, no
  shadowBlur, no offscreen canvas, no audio.
- The synchronous first frame is drawn at elapsed 0, at rest, with
  `D = D0 = 1.04·U` — a fixed scenic offset chosen so the red streetcar
  (world x 1.72·U, near layer) and a yellow crane (world x 1.02·U, mid
  layer ×0.6) share the frame on both desktop and phone layouts.
- Canvas is sized from the Visual Viewport API with resize listeners on
  both visualViewport and window; CSS size is pinned in `draw()`; phone
  detection uses `window.screen` min dimension < 700 with an aspect
  fallback (`h > w·1.15`), switching the logical width to 900.

## QA

- Rendered with the house node-canvas renderer at 1280×800 (desktop),
  390×844 (mobile), 720×720 (thumb).
- Frame one verified by eye at all three sizes: sprocket strip, clouds,
  ink city band, yellow crane clear of the red streetcar, street-level
  figures, rails and dashes, warm cast. (First pass had the crane standing
  directly behind the streetcar and the streetcar clipped on phones; both
  fixed by replanting the two anchor items, then re-rendered.)
- Thumb rendered twice at 720×720: `cmp` byte-identical.
- Forbidden-token grep clean: no gradients, filter, shadowBlur,
  createElement, ImageData, offscreen canvas, getUserMedia, Math.random,
  AudioContext. Silent; the only text in the piece is the `<title>`.
