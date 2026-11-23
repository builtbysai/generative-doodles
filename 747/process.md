# №9058 · Patch Mountain - process notes

## Concept
Cézanne study seed 420 ("The Patch Is the Picture"): nothing is ever drawn.
A mountain emerges from small parallel modulated patches laid on a reserved
warm dark ground. Each zone's patches share a direction, hue jittered within
a narrow band; ~28% of the ground stays untouched. No outlines anywhere.
Derived from the study's findings, not from any Cézanne painting.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32(seed);
  default seed 9058. ?seed= shareable; click mints a new mountain.
- Ground: warm dark umber fill — a tone in the chord, not a background.
- Ridgeline from seeded value noise (peak + shoulders); zones assigned per
  patch by position vs ridgeline: sky / mountain / foreground / tree.
- Sky: horizontal patches, blue-grey band. Mountain: diagonal patches
  (-19 deg, following the slope), blue-violet band, snow cap above the
  snowline (near-white). Foreground: near-horizontal, olive or warm brown.
  Trees: sparse dark vertical cypress accents.
- Patches: jittered grid, ~72% coverage, each a rotated rect with per-patch
  hue/sat/lightness jitter inside the zone's narrow band.

## Iteration
- v1: mountain too small and right-heavy, lost in sky. Widened the mass
  (massW 0.34→0.52, gentler slope falloff, higher peak). v2: broad mass,
  proper presence.
- Second seed (31337) rendered to verify the construction holds across
  seeds: different mountain, same strength. Default stays 9058.

## Differentiation
Checked against used/retired/paused families. No patch-construction piece
exists in the gallery. Not a creature, not chain-follow. Concept family:
"patch-constructed landscape: directional patches on reserved ground, no
outlines."

## QA log
- cdp_exceptions.py: zero console/page errors at 1280x800.
- Rendered headless via ~/workspace/tools; actual pixels inspected for
  default seed and one reseed.
- Responsive: full-viewport canvas + resize; holds at mobile widths.
- thumb.png: 720x720 center-crop from the live render.
- Visible copy check: no em dashes, no date strings, no absolute URLs.
