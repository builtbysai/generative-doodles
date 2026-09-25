# Doodle №8998: Abyssal (2026-08-30) — REPLACEMENT 2

**File:** `8998/index.html` (self-contained, vanilla canvas, no dependencies)

Replaces "Tennis Ball" (tiny raytraced room, retired 2026-09-24) and
"Palette Walk" (palette-journey map, retired 2026-09-24 after Hans found
it diagrammatic rather than worth looking at). Both concept families
stay RETIRED and must never be built again.

## Concept
A living creature in dark water. A bioluminescent organism drifts on its
own: a spring-softened harmonic membrane breathing around a seeded harmonic
rest shape, glowing organelles with bright nuclei drifting inside on slow
orbits, faint current lines between them, trailing tentacles with lit
tips, marine snow in the water column. Prod it and it flinches: nearby
membrane nodes are knocked off their home positions, a wave of light
travels the membrane from the prod point, and the home-springs pull
everything back to equilibrium over seconds. Click empty water for a new
seeded creature.

## Technique synthesis (from study, not copied)
- **Behavior first, appearance second** (Golan Levin, Cytographia lineage,
  study/golan-levin.md): the equilibrium-restoring interaction is the
  piece. Every node carries a home position; displacement is a spring
  problem, so the settle is structural, not scripted.
- **Custom linework** (Levin's headline craft lesson): the membrane is a
  hand-built triangle-strip ribbon with per-vertex width shaped by
  curvature pressure and the flash wave, never a default stroke.
- **Bioluminescence grammar** from the deep visual pass: additive glow
  sprites, restrained palette (cyan/teal membrane, violet/amber/teal
  organelles, one warm nucleus), near-black blue ground with faint
  depth rays and vignette. What reads alive: translucency, internal
  glow, trailing filaments, slow drift. Avoid-list: full-bleed noise,
  rainbow churn, cursor-following "interactivity."
- Per-seed body character: elongation and tilt of the rest shape plus
  five harmonic terms, so no two creatures share a silhouette.

## Parameters
- Seeded PRNG (mulberry32); `?seed=` in URL or click empty water
- Default seed 899804: tilted oval body, five organelles, tentacles
  trailing right. Chosen over 899801/07/08 for the strongest silhouette.

## Verification
- Zero console errors on load (desktop + 390px mobile); no overflow
- CDP interaction tests: pointerdown on the creature fires the flash
  wave (flashT 2600) and updates the caption; drag stirs gently;
  click on empty water builds a new creature and rewrites ?seed=
- Rendered 7 seeds headless and inspected each; all coherent, all distinct
