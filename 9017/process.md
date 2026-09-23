# Doodle №9017: Strata Break (2026-09-18)

**File:** `doodles/001-strata-break.html` (self-contained, vanilla canvas, no dependencies)

## Concept
Concentric strata that dissolve from perfect order at the core into broken,
turbulent fragments at the rim, a radial gradient of disorder. One rare ring
is drawn in deep red: a single breath of color in a monochrome world.

## Technique synthesis (from study, not copied)
- **Radial ring structure**, Gorillasun's tree-ring construction method
- **Disorder gradient mapped to radius**, Generative Artistry's Cubic Disarray idea (gradient of disorder), applied radially instead of vertically
- **Micro-segment accumulation**, DesLauriers's stroke-buildup: rings drawn as short overlapping segments, not continuous paths
- **Monochrome discipline, density as tone**, Hoff's ink-on-paper logic
- **Random ring breaks/rejoins**, Gorillasun's disconnect trick, probability scaled by disorder
- **Grain pass + vignette**, Gorillasun's texture lesson; subtle corner darkening holds the composition

## Parameters
- 64 rings, seeded PRNG (mulberry32), `?seed=` in URL or click for new variation
- Value-noise displacement field, amplitude ∝ disorder^1.6
- Accent ring: 75% chance of exactly one, drawn bolder to read as deliberate

## Verification
- Rendered via headless Chromium CDP at seeds 424242 and 777001, both cohesive, both distinct
- Accent ring reads clearly in both; rim turbulence varies naturally per seed
- No console errors; DPR-aware rendering
