# No.383 Palm Springs Fever — jenkbdoodles 7

## Concept

After Jen K's Palm Springs fever dream (EXPANSION #40,
jenkbdoodles): her MCM "happy accident" as a composition
rule. A clean streamlined desert base, flat banded sunset
sky, a low sun, a distant mountain ridge, two dune bands
and one palm silhouette, with two translucent textured
motif strata drifting over the whole scene at increasing
scale. Dopamine sunset colours, 90s-upholstery energy.
Watch only; the fever dream slides and you behold it.

## Construction

- One canvas, design space 1280x900, cover-fit. Flat
  colour only: no gradients, no filters, no shadowBlur,
  no offscreen canvas anywhere. All marks are JS data
  drawn directly each frame.
- Sky: five flat bands, authored hex steps interpolated
  between the specced endpoints #F4A259 and #E86A6A
  (#F4A259, #F1945D, #EE8662, #EB7866, #E86A6A), 80px
  each over the top 400px; the lowest band is carried
  down as a horizon undercoat so no gap can open
  between the ridge and the dunes.
- Base: the sun (#FFD166, r 96 at (428, 352)) pulses on
  2 whole cycles per loop at +-2 percent radius, almost
  imperceptible; a mountain ridge polygon in dune-dark
  #7A4E2E; a light back dune (#A9713F) and a dark front
  dune (#7A4E2E) as bezier bands; one palm silhouette
  (#1E1E1E) whose tapered trunk follows a quadratic
  spine and whose eight fronds are tapered filled
  shapes sampled along quadratic spines, with two
  coconuts at the crown.
- Strata are tileable motif DATA drawn at wrapped
  offsets on the single canvas (the prompt's 2x-wide
  stratum canvases, house-adapted). Mid stratum: a
  640-wide tile holding exactly 19 motifs (8 saguaro
  cacti drawn as round-capped strokes, 11 four-point
  stars) in #5BA3C4 at 0.5 alpha, one full pass per
  24s. Top stratum: a 1280-wide tile holding exactly
  7 motifs (4 paisleys with curled tips, inner outline
  and dot; 3 sunburst fragments with alternating
  triangular rays) in #B565A7 at 0.3 alpha, one full
  pass per 48s. Both strata stay translucent and never
  opaque. Counts asserted at load.
- Loop: 48s master loop (LOOP). Both drift periods
  divide it exactly, so the wrap is seamless and frame
  48s is pixel-identical to frame 0. Watch-only: no
  pointer handlers at all.
- Determinism: frame one is drawn synchronously at the
  constant phase T = 13.7s (strata mid-drift, sun
  mid-pulse), never Date.now() minus an offset; the
  rAF loop (typeof-guarded) is anchored there and
  advances in fixed 1/60 ticks. Fixed seed
  (mulberry32, 0x383F). House sizing: Visual Viewport
  with resize listeners on visualViewport and window,
  canvas pinned via style width/height every frame,
  phone detection via window.screen min dimension
  under 700px with aspect fallback.

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png). Thumb rendered twice from the shipped
  script: byte-identical.
- First pass fixes: (1) a bright page-colour gap showed
  between the mountain ridge's straight bottom edge
  and the back dune's sagging curve; the lowest sky
  band is now carried down as a horizon undercoat, so
  the gap reads as a flat coral sunset plain.
  (2) The palm fronds tapered too fast and read as
  bare twigs; the width profile was softened
  (pow 1.3 falloff, width 12) so they read as leaves.
- Desktop: banded sky, low sun half behind the ridge,
  palm crown clear of the ridge line, strata
  translucent over sky and dunes alike, paisleys and
  sunbursts legible but never opaque. Mobile: cover
  crop keeps sun, ridge, palm and both strata in
  frame. Thumb: the full scene reads at gallery size.
- Deviations: none from the spec or its adaptation
  flags.
