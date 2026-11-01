# №1153 — Favourite Songs

Antonio Roberts study block AR2, after *Some of my Favourite Songs*
(2012): sixteen mp3s fed into a custom Pure Data program that converted
their binary data into images, capturing "the noisier and more chaotic
nature of sounds." Sixteen imaginary songs get the same treatment here —
each one a portrait of bytes misread as a picture.

## Composition

A 4×4 grid of sixteen panels on `#0A0A0A`, separated by 2px black
gutters, square and centered (near full-width on phones). Each panel is
a 28×28 field of flat pixels drawn from the fixed palette
`#FF3B00`, `#00E5FF`, `#FFD800`, `#7CFF00`, `#FF2E88`, `#FFFFFF`.
Nothing in any panel is a spectrogram, a waveform, or a bar graph —
the bytes are read as images, never drawn as sound.

## Byte streams: four structural families

Every panel's byte stream is generated once, seeded per panel
(mulberry32), from one of four families, assigned by panel index:

- **Noise fields** — dense chaotic raw bytes, some panels thinned by a
  dark cut-off so quiet bytes fall to the panel ground.
- **Run-length bursts** — long constant runs laid down in sequence,
  with silent runs and sudden "loud" runs of high bytes where the flat
  blocks land. Some panels run horizontally, some vertically.
- **Block plateaus** — constant blocks (4, 7, or 14 cells) in flat
  byte values, grained at the edges with stray single bytes.
- **Scanline repeats** — a handful of row patterns cycling with a
  period and a slight drift, occasionally broken by a loud flat row.

No two panels share a structure, and none is left-right symmetric.

## Reinterpretation at bit depths

A panel's bytes are reinterpreted at a bit depth of 1, 2, 4, or 8 bits
(spread across the grid). The byte is quantized to that depth's levels;
a level maps to a palette color plus an intensity step, and level zero
— the quiet byte — renders as panel ground. Crushing the depth
reshuffles which bytes become which colors, exactly as re-reading a
file through the wrong decoder does.

## Motion: stepped pulses and the remix

- **Stepped brightness only.** Each panel pulses through the fixed
  multipliers 0.55 / 0.75 / 1.0 as a step function of loop time, at
  its own seeded phase and step length (1.3–2.7 s). There are no
  smooth fades anywhere — brightness changes in jumps, like tracks
  playing simultaneously at different volumes.
- **The remix.** The loop is 14 seconds. In each cycle, one panel
  (cycling 0–15 across cycles) re-interprets its byte stream at a
  different bit depth for seconds 9–12, then settles back to its
  home depth.
- Watch-only: no interaction, no audio.

Draw lists are pre-batched per panel: for each (bit depth, brightness
step) pair the cells are grouped by final flat color once and cached,
so a frame is a handful of batched rect fills per panel. The grids are
data — no offscreen canvas, no ImageData.

## Determinism and house rules

- First frame is drawn synchronously at fixed phase T0 = 6.3 s:
  mid-cycle, every panel full and distinct at its current brightness
  step, before the cycle's remix window. The rAF loop is
  `typeof`-guarded and anchored as T0 + elapsed since load.
- Canvas size comes from the Visual Viewport API with resize listeners
  on both `visualViewport` and `window`; `canvas.style.width/height`
  are pinned in px on every draw. Phone detection via `window.screen`
  physical size (min dimension < 700 px) with the `h > w·1.15` aspect
  fallback.
- All randomness is seeded mulberry32; no `Math.random`, no gradients,
  no `ctx.filter`, no shadowBlur, no `createElement`, no microphone.
  The only text in the piece is the `<title>`.
- QA: `thumb.png` rendered twice at 720×720 and byte-compared (`cmp`
  identical); desktop (1280×800) and mobile (390×844) renders read by
  eye — sixteen panels, four families clearly distinct: chaotic noise
  fields, run-burst panels in two orientations, block plateaus at
  three scales, and horizontally banded scanline repeats.
