# №1991 Oil Slick Gull — process notes

MC8 / PP1238, study #259 mateo-villanueva-brandt. Watch-only.
Gallery date: 2007 · 06 · 25. Hint: "Watch the sheen find the figure, then lose it."

## Build

- Template: `build-mc5-1988/index.html` structure (Visual Viewport sizing,
  canvas pinned in draw(), phone detection via window.screen with aspect
  fallback, field-like full-bleed on phones / square on desktop, one
  synchronous frame at load, requestAnimationFrame guarded by typeof check).
- One dark mass rising from the lower-left corner: shoulder hump, neck dip,
  turned head, beak pointing right, chest and belly falling back to the
  bottom edge. Body fill is dark violet-black (16,12,28) over absolute
  black ground, with a faint violet lift inside the body and a constant
  low-alpha violet rim so the figure never fully vanishes.
- Five highlights breathe on independent periods (shoulder 64 s, head 83 s,
  beak 47 s, back 110 s, belly 137 s), each alpha multiplied by a slow
  light drift over the 180 s cycle. The sheen creeps: highlight strokes
  slide ~1.2% of the stage on a 90 s sine, and 26 seeded dots drift on
  slow noise inside the body. The figure itself shifts at most 0.15% of
  the stage on 26/31 s sines: effectively still.
- No pointer handlers (watch-only). No audio. No em dashes in visible copy.
- Title/date plate drawn on canvas: "№1991 · Oil Slick Gull" and
  "2007 · 06 · 25" top left, hint bottom center.

## Determinism

- FIRST_T = 23 s, cycle = 180 s.
- At t = 23 the light drift is at full strength (1.000) and highlight
  visibilities are: shoulder 0.850, head 0.720, beak 0.650, back 0.500,
  belly 0.350. The first frame is the found moment: shoulder arc in cold
  white, head profile and beak clear, figure legible, never pure black.
- No wall-clock or random seed at load; all motion is a pure function of t.
- Determinism check: rendering t = 23 twice gives identical md5
  (47304a2432263d55717e1590784ac5f0).

## Probe results (probe-1991.js, desktop 1280x900 renders)

- t = 23 md5 47304a2432263d55717e1590784ac5f0; t = 68 md5
  4fc04a8979b479ec58feeeb15cf56ebf; t = 140 md5 682d1dc521c3baddadc60d5e06ef5b7e.
- Pixel diffs (threshold > 8 per channel, 685,584 px total): t23 vs t68
  17,187 px changed (2.51%); t23 vs t140 16,113 px changed (2.35%).
  At t = 68 the shoulder highlight is nearly gone (vis 0.057, was 0.850),
  the head profile faint (0.170), while the back sheen (0.770) and belly
  sheen (0.991) have come up: the light finds the figure in one place
  and loses it in another, as specced.
- Silhouette stability: body-region pixel counts (luminance 4..45) are
  187,788 at t23, 187,791 at t68, 187,812 at t140 (delta at most 24 px,
  0.01%). The figure stays essentially unmoved; only the sheen and the
  highlights change.

## Fix rounds

1. First gate: the body fill was invisible and the highlights read as
   disconnected floating lines. Cause found by pixel sampling: the body
   path coordinates were written as stage fractions without multiplying
   by W/H, so the body drew as a sub-pixel speck at the origin. Fixed
   bodyPath() to scale every coordinate by W/H. Also lifted the body
   fill (8,6,14 to 16,12,28), the inner lift, the corner wash and the
   constant rim (0.20 to 0.34 alpha) for frame-one legibility.
2. Re-gated fully after the fix: desktop, mobile and thumb re-rendered
   and inspected; probes re-run on the final file. No edits since.

## Deviations from the prompt

- None in content. The prompt says "no body and no oil, only one
  substance with two behaviours": the body is rendered as a near-black
  violet mass rather than literal nothing, because the task requires the
  figure to stay at least faintly legible at frame one. The mass is
  defined almost entirely by its sheen and highlights, per the prompt.
- The date line "2007 · 06 · 25" is drawn under the title as part of the
  title plate (house rule), though the prompt itself carries no date text.

## Known visual warts (honest)

- The head reads as a smooth peaked hood; the turned-head suggestion
  depends on the beak profile highlight, and at moments when the beak
  visibility is low the head can read as a plain hump.
- The constant violet rim outlines the whole body even when every
  highlight has faded, so the figure never fully dissolves into the dark
  the way the prompt's "darkness takes them back" might imply. This is
  deliberate, for legibility, but it caps how dark the piece can get.
- On phones the head stretches taller (portrait stage), so the beak
  angle looks slightly steeper than on desktop.
- The belly sheen arc can read as a stray diagonal line when the back
  sheen is at full strength and the belly sheen is low.
