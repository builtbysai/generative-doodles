# №10 · Drift - process notes

## Concept
A living flow field. 350 capsules ride three slow-orbiting vortex
attractors, laying stitched trails in neon on near-black. The vortices
breathe on Lissajous paths, so the current never repeats exactly.
Click for a new current. Brief concept #1 (vortex capsules), animated.

## Construction
- Single self-contained page, canvas 2D, requestAnimationFrame, no
  libraries. mulberry32 PRNG; default seed 10. `?seed=` shareable;
  click mints a new current. DPR capped at 2; Visual Viewport sizing;
  canvas pinned by style.
- Field: three vortices with seeded base position, orbit radii
  (Lissajous, slow), strength sign, and reach; plus a gentle background
  drift so nothing stalls. Particle velocity follows the field angle.
- Rendering: fade with rgba(ground, 0.055) each frame instead of clear,
  building trails. Each particle is a short round capsule tangent to
  its velocity, 1-2px, alpha 0.85. 90-frame pre-roll so the first
  visible frame already has trails.
- Palette: magenta #ff2e88, gold #ffb020, cyan #38e1ff, warm white
  #f2ead8 on near-black #0d0b14. 350 particles, 60fps on phones.

## Differentiation
- vs No.8925 (Chord Orbits): static string geometry. Drift is a living
  system; its interest is in motion and trails, not fixed webs.
- vs No.8924 (Contour Drift): Contour Drift is static topographic lines
  on paper. Drift is neon particles on black, in motion.
- vs No.9078 (Shimmer): Shimmer vibrates via static dash interference.
  Drift moves for real.
- Family name: "living systems". First animated piece in the series.

## Motion
Continuous evolution, not a loop. Vortices orbit slowly; particles
advect, wrap at edges, leave fading trails. Hypnotic, never chaotic.
