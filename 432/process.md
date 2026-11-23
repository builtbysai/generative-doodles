# №1393 "Vertical Montage" (zack-khalil ZK2, PP616)

## Prompt
Three stacked horizontal bands, each a complete scene at a different scale —
top: a star field; middle: a forest canopy; bottom: a neuron/vein network —
all drawn from the SAME noise seed so the three scales rhyme. The frame is
split into three unequal horizontal strata; each band loops its own slow
drift; where the bands meet, the edges bleed into each other through soft
masks so stars fall into leaves, leaves into veins. Each band drifts at its
own rate (stars slowest, veins fastest); dragging vertically compresses or
expands the strata, forcing one scale to dominate; the noise seed never
changes. A slow "short-circuit" moment every ~40 seconds where all three
bands momentarily synchronize then drift apart. Palette: star white #e8e6dc,
deep space #0d0f14, canopy green #2f6b3a, bark brown #4a3826, neuron amber
#e0962a, blood dark #5a1414. Avoid: literal labels naming the scales,
photorealism, decorative gradients, click-to-reload.

## What was built
- Full-viewport canvas from the Visual Viewport API, pinned in draw().
  Field-like composition goes full-bleed on phones (checked at 390 wide).
- One seeded value-noise field (256x256 lattice from mulberry32, seed
  1393000 + index*7919; smooth value-noise interpolation + fractal sum),
  sampled at different octaves/scales per band, so the three scenes rhyme:
  stars keyed to noise thresholds, canopy leaf blobs keyed to noise, vein
  nodes keyed to a noise band.
- Strata fractions 0.30 / 0.42 / 0.28 at rest. Vertical drag re-weights
  them (drag down expands the top band) via a closed-form sum over recorded
  drags with 3 s exponential decay; the shift is clamped to ±0.12.
- Drift rates: stars 6, canopy 18, veins 42 (px-equivalent phase per
  second). Short-circuit every 40 s: the sync modulates drift RATE, not
  position — effective drift is the closed-form integral of the rate, so
  positions stay continuous while all bands converge to the shared rate
  12 during the ~2.4 s window, then drift apart again.
- Cross-band bleed: each band's elements extend into a bleed zone past the
  seam with distance-faded flat alpha, plus a seeded dither of neighboring
  colors scattered across each seam — flat alpha only, never gradients.
- Vein band: nodes on a grid keyed by the shared noise field; passing
  nodes connect to passing right/down neighbors, so the band reads as a
  network, not a scatter.
- No visible text except `<title>`. Fully silent. No offscreen canvas,
  gradients, shadowBlur, Path2D, createElement, AudioContext, localStorage,
  or getUserMedia. Every arc has its own beginPath (node-canvas quirk).

## Adaptations
- Prompt's "soft masks" / "vertical gradient masks" become seeded
  flat-alpha dither bands, since the QA renderer handles gradients
  unreliably; the masks stay functional (bleed), not decorative.
- Prompt's "seeded simplex-noise field" becomes a hand-rolled seeded
  value-noise field (no external library in a self-contained page).
- First implementation of the short-circuit lerped drift POSITIONS, which
  would have swept the stars backward across the cycle boundary. Reworked
  to rate modulation with a closed-form integral — continuous by
  construction.
- First vein implementation drew isolated dashes; reworked to a connected
  grid network (passing nodes link to passing neighbors).

## Determinism
Frame one = draw(0) via boot flag; the clock starts only with the rAF loop
(plain function declaration behind a typeof guard). All randomness from
mulberry32, never Math.random. Thumb renders byte-identical across
repeated renders.

## Verification (forced-time probe harness, stubbed rAF + pointer events)
- t=0 vs t=0: 0 px diff (deterministic frame one).
- t=0 to t=5: star band 5,910 px diff, canopy 45,257 px, vein 19,467 px —
  all three bands drift, at different rates (stars slowest in position
  shift, veins fastest: 1 s steps 5,738 vs 13,173 px).
- Drag down 200 px at t=10: canopy top row moves 270 → 353 by t=12 —
  the top band expands as specced, decaying back afterward.
- Sync window: 1 s steps across t=38–41 stay smooth (~6,000 px for stars,
  veins slowing 13,173 → 11,315 px toward the shared rate) — no snap, no
  backward sweep; the bands converge, then drift apart.
- Renders inspected at 1280x900, 390x844, and 720x720. Mobile keeps the
  same full-bleed composition with no clipping.
