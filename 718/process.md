# Doodle №9022: Accumulation (2026-09-23)

**File:** `9022/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
Sixteen thousand grains of light dropped one by one until a landscape gathers
out of the dust. Instead of drawing a scene, the piece authors a procedural
density field for a landscape and reveals it through rejection-sampled grains.
The gradual emergence is the medium: first sparse dust, then a moon or a ridge
or a wave condensing out of it. Four possible motifs per click (moon over
water, mountain ridges, a breaking wave, a forest), each with its own density
function, so every visit can land somewhere different.

## Technique synthesis (from study, not copied)
- **Density-field accumulation** (Anders Hoff sandpainting lineage, my own
  fields): thousands of translucent grains placed by rejection sampling
  against an authored field, never by tracing a photograph.
- **Motif fields in virtual units**: moon (disc plus halo plus banded water
  reflection), ridges (three noisy ridge bands with atmospheric fade and a
  foreground mass), wave (arching crest with foam and trough), forest
  (trunk columns with canopy noise). All layout in 1000x1000 virtual units,
  scaled only at draw time.
- **Staggered reveal**: grain-by-grain draw over about five seconds with an
  ease curve, so the landscape visibly condenses. `?t=` freezes any point in
  the accumulation; reduced-motion users get the finished frame.
- **Failure-mode hardening**: every motif got its own tuning pass. Early
  ridge fields were mushy and formless, so ridge bands were narrowed, noise
  scale lowered, and a foreground mass added. A coordinate typo collapsed the
  wave into a blob; fixed at the source. Any motif that did not read clearly
  would have been cut rather than shipped.

## Parameters
- Seeded PRNG (mulberry32), `?seed=` in URL or click for new sky
- Default seed 20260924: moon over water

## Verification
- Rendered via headless Chromium CDP across seeds and all four motifs;
  moon, ridges, wave, and forest each read clearly in at least two seeds
- Partial-reveal frame (`?t=.45`) shows the landscape mid-condensation
- Mobile 390px viewport: no overflow, composition holds
- Click regeneration verified via CDP (seed updates in URL)
- Zero console errors/log events on load and click
