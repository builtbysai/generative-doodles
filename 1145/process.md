# №1145 — Databend Canvas

Rosa Menkman study block RM2: databending in the lineage of *A Vernacular
of File Formats* (2010), the artifact guide built from "random data
insertion."

## The piece

The source is procedural and rule-based: 64 horizontal scanlines of
varying thickness (2–5 display rows each, 208 display rows in all), every
scanline a flat run pattern — ticks cycling the palette, a solid bar,
blocks, or two-tone dashes — in the five burst colors #FF2E88, #00F0FF,
#B6FF00, #FFD500, #FFFFFF on black #000000. Flat pixels only: every run is
a hard-edged rect, no gradients, no smoothing, no glow.

The file is then decoded wrong, as data. Source and bending alike are
computed per row at draw time from seeded tables — there is no offscreen
canvas, no ImageData buffer, and no real JPEG encoding anywhere in the
piece. A corruption front sweeps top to bottom across the first half of a
seamless 8-second loop. Each row's bend is a pure function of its position
and the loop phase: behind the front the row ramps up, holds at full bend
for about two seconds, then partially recovers to a 0.35 residual and
stays there — never fully — until the last fraction of the loop eases
everything home so the next pass starts from the clean file.

Three bend operations, all band-structured (whole rows, never scattered
noise dots):

- **Smear** — a memcpy-style row shift (seeded per row, up to ±28% of the
  width at full bend) plus a horizontal stretch of the row's runs, so
  ticks pull out into streaks.
- **Channel slide** — the row's colors walk a fixed permutation
  (white→cyan, pink→lime, lime→yellow, yellow→pink, cyan→white) while
  color runs and white runs separate in opposite directions, the way
  slid channels fringe.
- **Injection** — a flat block of impossible color written over the row
  at a seeded offset, growing in as the bend passes half strength.

The first 64 display rows are the file's "header" and obey the header-skip
rule: the sweep may only ever shift them slightly — no smear, no slide, no
injection — so the top of the canvas always reads near-original against
the bent bands below it, and well over 30 percent of the canvas is
near-original at all times.

## Motion and interaction

Watch-only, per the prompt. No pointer handlers, no sound. The 8-second
loop is a closed-form function of phase, identical every pass: front down,
bands corrupt, hold, partial recovery, rewrite.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas CSS size pinned in fit(), which runs
  at the top of every draw(). Full-bleed on all screens.
- Phone detection via window.screen physical size (min dimension
  < 700 px) with aspect fallback (h > w * 1.15); on phones the row count
  drops to 176 (mapped back onto the same canonical 208-row field, so the
  seeded data and the 64-row header are identical) and the bands stay
  chunky.
- Determinism: frame one is drawn synchronously at the fixed phase
  T0 = 2.2 s — header intact at the top, the band just below it smeared
  and channel-slid, the lower half still near-original — and
  requestAnimationFrame is typeof-guarded, anchored to that phase plus
  elapsed time. No Math.random; all variation comes from mulberry32
  streams seeded per scanline and per row.
- No canvas gradients, no ctx.filter, no shadowBlur, no offscreen canvas,
  no createElement, no microphone, no audio. No visible text except the
  <title>.
