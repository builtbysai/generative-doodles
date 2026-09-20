# Doodle №003: Grain Study (2026-09-20)

**File:** `003-grain-study/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
A letterpress misprint of a rising sun. Two passes of ink build a sun over a
horizon: black laid down first, a rust pass slipped a few pixels beside it like
a shifted press bed. Thousands of short dashes do all the shading; layered
grain, fibers, scuffs, and edge bleed finish the lie so the screen image reads
as a found print, not a digital render.

## Technique synthesis (from study, not copied)
- **Micro-stroke accumulation**, DesLauriers's Meridian method: short dashes
  with per-stroke length/alpha/jitter variation; density IS shading (overlap
  zones go dark). Subject matter is a flat frontal composition, not his
  topographic terrain (per the avoid list).
- **Analogue-media emulation**, DesLauriers: per-stroke imperfection, two-pass
  misregistration, paper grain over everything.
- **Limited duotone palette**, DesLauriers/FOLIO discipline: three seeded
  ink+accent pairings (black+rust, indigo+ochre, green+brick) on one cream paper.
- **Print-object framing**: print area floats on the sheet with plate mark,
  wobbly edge bleed, generous margins.
- **Grain pass + vignette**, carried over from №001's print logic.

## Parameters
- Seeded PRNG (mulberry32), `?seed=` in URL or click for new variation
- Horizon at 56-66% of print area; sun disc seeded in upper region
- ~12k dash cells, two field passes (accent under, ink over)
- 6500 grain dots + blotches + fibers + scuffs + specks

## Verification
- Rendered via headless Chromium CDP at seeds 424242, 777001, 90210, all
  cohesive and distinct; thumbnail from seed 777001 (720x720 canvas crop)
- Mobile 390px viewport: no overflow, composition holds
- Click regeneration verified via CDP (seed updates in URL)
- Zero console errors/log events on load, redraw, and click
