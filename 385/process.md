# №1121 — Terravision

Joachim Sauter study block JS2. His 1994 pre-Google-Earth globe, rebuilt
as a canvas 2D cell planet: one big physical ball you spin and dive into.

## The piece

The planet is a lat/long grid (92 × 46 cells, 72 × 36 on phones). Each
cell sits on the unit sphere and samples two seeded 3D value-noise
fields — sampling in 3D, on the sphere itself, is what keeps the
continents seamless at the longitude wrap and sane at the poles. A
five-octave fBm field decides land and sea against a threshold; a second
ridged field pushes mountain altitude into the land that clears it.

Colour is the prompt's palette and nothing else: ocean runs from a
shallow shelf blue down to deep #0A2A5E, land climbs from #3E6B35
lowland to #C9B48A highland by elevation. A fixed light from the upper
left shades every cell by its rotated normal, with a gentle limb
falloff, and a deep-ocean disc is painted under the cells so the gaps at
the limb read as sea, never as space. The whole globe is carried at
Earth's exact axial tilt, 23.5 degrees.

Thirty seeded cities sit on low-to-mid land. They are invisible from
orbit; only the deepest layer of the dive fades in their warm white
#FFE9B8 street grids, each rotated with its city.

Around the limb, the atmosphere is four concentric stroked circles of
#4DA3FF at falling alpha — no gradients anywhere. Behind everything,
130 stars from their own fixed seed: sparse, dim, static, unmoved even
when the planet is reseeded.

## Interaction

The interface is the ball itself.

- **Drag** spins it. Release with speed and the fling is kept as a
  momentum velocity that decays exponentially (rate 0.55/s) on top of a
  very slow idle turn, so the ball keeps rotating after your hand leaves
  and slowly settles. Vertical drag tilts the view, which then eases
  back to level.
- **Wheel or pinch** dives a zoom parameter from 0 to 2. The dive is
  three crossfading data layers: continents at orbit, relief shading
  (from the heightfield's gradients) strengthening through the middle,
  and the city grids fading in at the bottom of the dive.
- The only UI is a thin zoom-depth arc in the top-right corner, filled
  in rim blue to the fraction z/2. No numbers, no labels, no pins.
- **Double-tap** reseeds the planet: new noise offsets, new continents,
  new cities, same mechanism. Never click-to-reload.
- Silent. No sound at all.

## House rules

Canvas sized from the Visual Viewport API with resize listeners on both
the viewport and the window; CSS size pinned in `fit()` on every draw;
phone detection via `window.screen` (min dimension < 700) with a
reduced cell grid on phones. The first frame is drawn synchronously at
a fixed phase — orbit layer, continents up, zoom arc empty — and the
loop is anchored to elapsed time since load behind a
`typeof requestAnimationFrame` guard. Seeded RNG only; no
`Math.random`, no gradients, no `ctx.filter`, no shadowBlur, no
offscreen canvas, no `createElement`, no microphone. The only text is
the `<title>`.

## QA

Rendered with the house node-canvas renderer at 1280×800, 390×844 and
720×720. Frame one shows the tilted globe: a large mottled continent,
green rising to tan, on deep blue ocean, a second continent entering at
the right limb, the pale rim, sparse dim stars, the empty zoom arc.
Thumb rendered twice and byte-compared identical. Mid- and deep-zoom
layers were verified from patched scratch copies (never shipped):
relief shading strengthens at z = 1, and at z = 2 the city street grids
stand over the lowlands with the zoom arc full.
