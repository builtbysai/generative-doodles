# Doodle №9020: Contour Fields (2026-09-21)

**File:** `9020-contour-fields/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
Imaginary terrain traced one contour at a time. A domain-warped noise field
with a few gaussian hills is contoured via marching squares in strict
monochrome ink; line density does the tonal work, crowding around the steep
ground. Every contour gets a positional hand wobble (deterministic, so shared
vertices stay joined), occasional ink skips, and per-stroke alpha variation so
it reads as hand inked, not plotted. Every fifth contour is an index line,
slightly darker, like a real topo sheet.

## Technique synthesis (from study, not copied)
- **Marching squares** (Gorillasun technique): per-level segment extraction
  with linear interpolation and a center-average saddle decider; batched into
  three alpha buckets per level for fast canvas draws.
- **Monochrome ink discipline** (Hoff): one ink on one paper, density as tone.
- **Hand-drawn perturbation**: positional noise wobble plus random ink skips,
  the same print-object grain/vignette finish carried over from №9019.
- **Quiet framing**: a single wobbly hairline frame, generous margins.

## Parameters
- Seeded PRNG (mulberry32), `?seed=` in URL or click for new variation
- 132x132 field grid, 15-19 iso levels, 2-4 hills (one dominant, occasional
  depression), domain-warped fbm base
- Default seed 424242: single dominant cone, quiet surroundings

## Verification
- Rendered via headless Chromium CDP at seeds 20260921, 424242, 777001, 90210;
  all cohesive and distinct; thumbnail from seed 424242 (720x720 canvas crop)
- Mobile 390px viewport: no overflow, composition holds
- Click regeneration verified via CDP (seed updates in URL)
- Zero console errors/log events on load and click
