# No.1612 "Alone Beside the River" (JL5, jinyao-lin #212, PP859)

Driver: the emptiness is the subject. A flat blue-grey sky holds two
thirds of the frame; a tiny row of glass-white pagodas sits on the
horizon and is doubled, barely rippled, in still water below.

## What was built

- Sky #8FA0B0 fills the top 65%, water #A8B8C4 below, separated by a
  faint ink horizon line. Both fields carry a very subtle vertical
  luminance variation as flat-alpha horizontal bands only (12 sky
  bands, 8 water bands, alpha 0.003-0.021), never a canvas gradient.
- The subject: five glass-white #F2F5F7 pagodas from a fixed authored
  table, the row spanning 36% of frame width, centred, base on the
  horizon at 68% height. Each pagoda is three stacked tiers (body
  rect under an upturned-eave roof trapezoid) plus a spire triangle
  and finial dot, with faint etched edge lines in ink at 0.28 alpha.
  A low stippled treeline of tiny glass triangles (seeded, alpha 0.55)
  runs behind the pagodas along the horizon, the second half of the
  prompt's "pagoda forms or stippled treeline".
- The reflection mirrors the pagodas below the horizon at 0.92
  vertical scale in water-pulled glass #C4D1DA at 0.62 alpha with
  0.16-alpha edge lines. Each tier is displaced horizontally by a
  closed-form sine ripple (3 px amplitude, 26 px wavelength, phase
  drifting on a 36 s period), small enough that the doubling stays
  legible. Twelve faint shimmer lines drift across the water at
  0.004-0.046 alpha.
- Grain: 1,400 seeded stipple dots at 0.03 opacity over the whole
  frame, each drifting a few pixels on slow closed-form sine paths
  (53 s / 71 s periods), like dust.
- Watch-only: no pointer interaction at all, no tap, drag, or reload.
  The only motion is the near-imperceptible water shimmer and the
  drifting grain. Title, formula date "2006 · 06 · 11", and hint
  "Watch only." are drawn in ink directly on the flat fields.

House rules: self-contained index.html; Visual Viewport sizing with
resize on visualViewport and window; canvas pinned in draw() via
style width/height in px; phone detection via window.screen (min
dimension under 700px) with aspect fallback; field-like composition
full-bleed on phones and desktop; one synchronous frame at load;
requestAnimationFrame guarded by a typeof check; seeded mulberry32
RNG only (seed 1612007), no Math.random, no Date.now; fixed-phase
first frame (PHASE 2.0); prefers-reduced-motion honoured. Gallery
date is 2006-06-11, displayed as "2006 · 06 · 11". Palette uses
only the four specified colours.

## Fix rounds

1. First render: pagoda roofs were too narrow and thin, so the forms
   read as stacked blocks or chess pawns; the sky banding showed
   visible step edges; on portrait phones the pagodas were 4.4x
   taller than wide. Widened the roof trapezoids (0.84/0.70/0.54 of
   pagoda width) and raised roof height to 0.46 of a tier; smoothed
   the banding to 12 sky / 8 water bands at roughly half the alpha;
   pagoda heights now scale on min(VW*1.4, VH) instead of VH, so the
   tallest pagoda is about 2.8x taller than wide on phones instead
   of 4.4x.
2. Second render (all three sizes): pagodas read clearly as tiered
   pagodas with visible eaves on desktop, mobile, and thumb; sky
   banding is a faint luminance drift; the reflection stays a legible
   mirror; labels readable everywhere; no clipping. Accepted.

## Verification

- Rendered 1280x900, 390x844, and 720x720 from the actual script;
  all three inspected visually.
- Determinism: thumb rendered twice, md5 identical
  (627502132afcbf9636b15c463b20088a).
- Forbidden-API check: no Math.random, no Date.now, no gradients,
  no shadowBlur, no reload, no createElement. The only listeners
  are the two required resize listeners.

## Deviations from the prompt

- Horizon placement: the prompt asks for sky over the top 65% and
  the subject on the horizon line at about 70% height. The sky/water
  boundary is at 65% and the pagoda bases sit at 68% height, just
  below the horizon line at the water's edge, so the row reads as
  standing on the far shore rather than floating in the sky.
- The prompt offers pagoda forms OR a stippled treeline; the piece
  uses both, pagodas in front with a faint treeline strip behind
  them, since the treeline reads as the far shore the pagodas stand
  on and stays inside the same glass-white.
- Pagoda heights scale on min(VW*1.4, VH) rather than pure VH, so
  the forms keep pagoda proportions on portrait phones instead of
  stretching into towers.
