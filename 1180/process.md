# №1180 — Windows into the Continuum

Jason Soliday study block SD5 (PP339), after the Radius 30 liner notes:
recordings "sped up, slowed down, chopped, looped, replayed, and
reprocessed through the system in which they were originally generated...
merely windows into an ongoing continuum."

## What it is

A single jagged "screech" line runs the full width of a near-black screen
(`#0C0C0E`, line `#E8E8E8`), occupying the middle band. Below it, the
caption "a window, not the work." and a decorative scrubber on an endless
timeline (fading arrow caps, no start, no end, a "you are here" marker at
`(t mod 997) / 997` — it is a window, not a transport). Watch only; the
piece has no loop point and never repeats.

## The screech

`screech(p)` is a pure function of phase: inharmonic partials
(1, 2.76, 5.4, 9.1 with decreasing amplitudes) plus a three-component
hash-seeded noise whorl (ratios 13.7 / 23.3 / 38.9), normalized by 2.35.
The line is drawn as `screech(Φ(t) + x · 0.05)` — a solid 2px stroke over
a 5px pass at 13% alpha (flat alpha, no shadowBlur).

## The warp: one continuous phase

The rendered line samples a warped phase clock Φ(t), a closed-form pure
function of t built by walking a seeded event stream (master seed 5).
Event j starts after a gap (4–9 s for the first, then previous end +
2–6 s), lasts 3–6 s, and its type is hash-chosen, never the same twice in
a row:

- **sped up ×3 / slowed ×0.25** — Φ advances at rate 3 or 0.25.
- **chopped** — Φ climbs a staircase: holds of 0.18 s separated by jumps
  of exactly 0.18 (average rate 1), and the drawn line is cut by gaps:
  22px cells blanked by `hash(event, slice, cell) < 0.38`, reshuffled
  every slice.
- **looped** — Φ cycles a window of length L (1.5–2.0 phase-seconds) for
  exactly k = 2 or 3 turns (event duration = k·L), then breaks out:
  after the event Φ continues from Φ_start + L, which is exactly where
  the final cycle lands, so the breakout has no jump.
- **reprocessed through itself** — the warp rate feeds back on the phase,
  rate = 1 + 0.7·sin(0.05·Φ), integrated inside the event span only with
  a deterministic 0.05 s-step sum seeded by Φ at the event start.

Each event spawns a label at a seeded x position, alternating above and
below the line — a 10px tint square (sped `#00FFC2`, slowed `#7C5CFF`,
chopped `#FF2B6E`, looped `#FFE14D`, reprocessed `#FF8A00`) plus the
event's name in `#9A9AA5` monospace — fading over 2.5 s in 6 alpha steps.

First frame is synchronous at fixed phase T0 = 21 s, chosen against the
seeded stream: event 2 is "sped up ×3" (20.00–23.53 s), so frame one sits
inside it with its label at fade step 2 of 6 (age 0.996 s). The rAF loop
is `typeof`-guarded and anchored as T0 + elapsed since load.

## Φ continuity, verified in node

The shipped CORE block (event stream + Φ) was extracted verbatim from
index.html and sampled in node:

- **Boundary check:** all 32 start/end boundaries of the first 16 events
  (including two loop breakouts) satisfy |Φ(b+0.001) − Φ(b−0.001)| ≤
  3 · 2 · 0.001; worst observed 4.0e-3, which is just the ×3 rate
  crossing the ±1 ms window — continuous.
- **Census:** sampling [0, 130] s at dt = 0.0005 found exactly 7 interior
  loop wraps (−L, the loop mechanism itself), 73 interior chop slice
  jumps of exactly +0.18, and **0 unexplained steps**. Max continuous
  slope = 3.000, the sped rate. Φ never jumps at a boundary.

## House rules

Canvas sized from the Visual Viewport API with resize listeners on both
`visualViewport` and `window`; `canvas.style.width/height` pinned in px
in `draw()`; phone detection via `window.screen` physical size
(min dimension < 700px) with the `h > w·1.15` aspect fallback (phones get
smaller label/caption fonts and a clamped label x). Seeded hashes only —
no `Math.random`. Silent by design. Grep-verified clean: no gradients,
no `ctx.filter`, no shadowBlur, no `createElement`, no ImageData, no
offscreen canvas, no audio or microphone APIs.

## QA

- `thumb.png` rendered twice at 720×720 and byte-compared (`cmp`
  identical); duplicate deleted.
- Desktop (1280×800) and mobile (390×844) renders read by eye: jagged
  line across the middle band, fading "sped up ×3" label with its cyan
  tint square above the line, caption and scrubber with marker legible
  at both sizes.
