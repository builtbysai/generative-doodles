# №1158 — Basic Waveforms

Antonio Roberts study block AR7, after *Basic Waveforms* (2025), the
artwork and visualisers for Charles Celeste Hutchins's EP — sine,
square and sawtooth taken as glitch-visual material. Three huge flat
waveform traces march across the canvas in lanes that never overlap,
over a near-black field of dim databend bursts, and each trace
corrupts the field it moves over.

## Composition

Square canvas on `#050505`. Top lane: sine in `#00E5FF`. Middle lane:
square in `#FF2E88`. Bottom lane: sawtooth in `#B6FF00`. Every trace
is drawn as two polyline passes — 10px black, then 6px colour — so
each reads as a 6px neon trace with a 2px black outline. The three
lanes use different cycle counts (3, 2, 4 across the width) and
different integer march rates (2, 1, 3 whole cycles per loop), so
the whole pattern repeats seamlessly every 8 seconds.

## The field is a data grid

The burst field lives as a 96×96 grid of cell values (empty / burst
/ accent), seeded once with mulberry32: ~110 small burst clusters of
`#1A1A1A` plus 46 sparse `#FFD500` accent cells. No offscreen canvas,
no ImageData — each frame the field is redrawn from the grid as flat
rects, batched by colour, with the three waveform effects computed
in the data at draw time:

- **Square tear.** The square wave's rising edges sweep right at a
  known speed, so the time since an edge passed any column is
  closed-form. Middle-lane cells in a column the edge crossed within
  the last beat are drawn shifted down by 4, 3, 2, then 1 cells as
  the beat runs out — a tear that heals in steps.
- **Sine smear.** Top-lane cells within ~1 cell of the sine curve
  are not drawn in place; each splits into two ghost cells offset
  ±2 cells sideways, in dark cyan `#0B3540` and dark magenta
  `#3D0A21` — the channels pulled apart under the curve.
- **Saw blocks.** Each sawtooth drop injects a flat block at the saw
  lane, 3 rows tall, trailing the drop for exactly one beat and
  decaying in three hard steps: `#FFD500` → `#8A7300` → `#453A08`.

## The beat

120bpm, so the 8-second loop is exactly 16 beats. Trace brightness
is a pure step function of the beat index: each lane has three
precomputed hard shades of its colour and a 4-beat pattern picking
among them. No smooth pulsing anywhere — brightness changes only on
the beat, like the stepped faders of a live-coded visual set.

## Determinism and house rules

- First frame is drawn synchronously at fixed phase T0 = 2.25s —
  mid-beat, all three traces mid-march, a saw block live at every
  drop, the sine smear hugging the curve, a fresh tear behind the
  square wave's right-hand rising edge. The rAF loop is
  `typeof`-guarded and anchored as T0 + elapsed since load; the
  720×720 thumb was rendered twice and byte-compared identical.
- Canvas size comes from the Visual Viewport API with resize
  listeners on both `visualViewport` and `window`;
  `canvas.style.width/height` are pinned in px inside `draw()`.
  Phone detection via `window.screen` physical size (min dimension
  < 700px) with the `h > w·1.15` aspect fallback; on phones the
  square takes the full width.
- All randomness is the one seeded mulberry32 field build. No
  gradients, no `ctx.filter`, no shadowBlur, no offscreen canvas,
  no audio, no microphone. Watch-only: no interaction at all, and
  the only text is the `<title>`.
