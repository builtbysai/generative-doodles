# Doodle №9010: Tone Mosaic (2026-09-11)

**File:** `9010/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
Voronoi as a tone renderer, after the Kwok Skyline press-still stage: a
procedurally generated driver image is importance-sampled for seeds
(acceptance probability proportional to darkness^0.75, as in the Kwok
study), the voronoi diagram is computed by jump flooding on a pixel grid,
and each cell is stroked thin black on white with a single ink-dot nucleus
sized by local tone. Cell size encodes tone, so the picture reads as an
etching: dense small cells with heavy nuclei where the driver runs dark,
huge empty cells across the pale ground. Strict black and white throughout.
A hairline plate mark frames the print. Each click composes a new plate:
new seed, new driver image, new sampling.

## Technique synthesis (from study, not copied)
- **Voronoi tone rendering** (Kwok Skyline #1 press stills, study A):
  importance-sampled seeds, cell size as tone, nuclei drawn as ink dots.
- **Jump-flooding voronoi** instead of Bowyer-Watson: raster, robust, no
  supertriangle edge cases; ~1.2s for 1050 seeds at 840x840, fast enough
  that the "composing" state barely flashes.
- **Procedural driver per seed**: an amphora still life (body, handles,
  foot, cast shadow, table tone, glaze highlight) composed from bezier
  silhouettes on a 160px offscreen canvas, blurred, read back as a
  darkness field. Every click re-composes the vessel's proportions and
  placement from the seed.
- **Etching discipline**: uniform 1px cell strokes, nuclei radius bound by
  both local tone and cell area so dots stay inside their cells, no color,
  no texture.

## Seeds / variants tried
Four driver families were built in a dev harness
(`hidden_files/tm-dev.html`) and rendered at several seeds each:
- **A vessel** (amphora still life) - won. Legible at every seed tried
  (90210, 424242, 777001): the silhouette, handles, foot and table shadow
  all read purely through cell density.
- **B landscape** (sun + hills + tree) - the sun read beautifully as a
  dense dark disc and the ground band was clear, but the horizon sat in a
  muddy mid-density zone; less crisp than the vessel.
- **C discs** (overlapping dark discs on a gradient) - abstract, read as
  blobs; no legibility story.
- **D face-like** (dark masses: hair, eyes, nose, mouth) - surprisingly
  good and closest to Kwok's press still 2, but the vessel was more
  reliable across seeds and carried a fuller composition (object + shadow
  + table).

An early vessel pass was rejected: too small and too low-contrast, it
read as a dark blob. The winner is bigger (body ~24% of frame width),
darker (up to 0.92 tone), on a paler ground, with a glaze highlight stripe
so the body keeps its roundness. Sampling floor lowered to 0.03 so the
white ground gets genuinely large cells.

## Why the final variant won
The amphora was the only driver that was unmistakable at every seed:
silhouette, handles, foot, cast shadow, and table line all survive the
translation into cell density. It reads as a print, not a diagram, and it
sits furthest from the other voronoi-adjacent pieces (№9020 is contour
lines, №9011 is animated agents; this one is a still tone print).

## Parameters
- Seeded PRNG (mulberry32); `?seed=` in URL; click for a new variation
- Default seed 777001 (strong vessel, clear handles)
- 1050 seeds, 840x840 render, 160px driver, acceptance = 0.03 + 0.97 * t^0.75

## Verification
- Headless Chromium CDP (isolated port 9444, fresh tab per shot):
  desktop 900x1080 and mobile 390x844, no overflow, composition holds
- Click regeneration verified: seed in URL changes, new plate renders,
  "composing" overlay appears during generation
- Zoomed crops confirm: 1px disciplined edges, heavy nuclei in dark
  cells, tiny specks in large ground cells, plate-mark frame intact
- Zero console errors on load and click (one intentional info log:
  seed + generation ms)
- Generation ~1.2s at 840px, inside the 1-3s budget

## Local final screenshots
- `/tmp/tm-final-desktop.png` - full page, desktop, seed 777001
- `/tmp/tm-final-mobile.png` - full page, 390px mobile
- `/tmp/tm-zoom-vessel.png` - 2x crop, vessel region (edge/nuclei quality)
- `/tmp/tm-zoom-ground.png` - 2x crop, pale ground region
- `/tmp/tm-click-composing.png`, `/tmp/tm-click-after.png` - click test
- `/tmp/tm-a-424242.png`, `/tmp/tm-a-777001.png`, `/tmp/tm-d-424242.png` -
  driver comparison renders
