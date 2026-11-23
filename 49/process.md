# №50 · Neon Drift - process notes

## Concept
Replaces the original Mandelbulb Orbit (2026-10-15). The CPU sphere-traced
Mandelbulb could not achieve acceptable visual quality at interactive frame
rates on phones; even at 150px grid it rendered as coarse blocks. Hans sent
a phone screenshot showing the pixelation and ordered "Improve 50 or replace."

The replacement is a particle flow field: 900 particles ride a curl-noise
vector field on near-black, leaving phosphor trails. One neon hue (#d8ff3e,
kept from the original's rim color) with bone-white hot cores on fast
particles. The field breathes on a slow cycle. Drag stirs the current;
particles near the drag point get pushed outward. No grid, no text, no UI.

## Construction
- Single self-contained page, canvas 2D, no libraries.
- Value-noise curl field (no dependencies), seeded PRNG for particle init.
- Trails via translucent ground-colored fade rect (alpha 0.045).
- Drag sets a stir point; particles within 190px get radial impulse decaying
  over 1.6s. No click-to-reload.
- Visual Viewport sizing; canvas pinned by style; full-bleed on phones.

## QA log
- JS syntax verified with node --check.
- Rendered locally at 1280x900 and 390x844; particles visible and moving.
  Static screenshots cannot show trail buildup (requires motion over time).
- No em dashes, no hint text, no date strings, no absolute URLs.
- Files: `50/index.html`, `50/process.md`. Gallery entry unchanged.
