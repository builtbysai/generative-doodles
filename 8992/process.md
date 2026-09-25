# Doodle №8992: Confluence (2026-09-25)

**File:** `8992/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
A smoke field you read by color instead of arrows. Hundreds of soft
particles drift across a slow noise flow field on black, and each one is
tinted by the exact direction of the flow underneath it: hue is the
compass. Where the field converges, the drifting smoke piles up and the
additive glow blooms toward white, so the bright pools on screen are
literally the places the wind gathers. Seeded vortices stir the field
into slow circulation, and a gentle sink gives the glow somewhere to
settle. Click anywhere for a new seeded field.

## Technique synthesis (from study, not copied)
- **Particle system lifecycle** (Shiffman, Nature of Code ch. 4): an
  emitter-managed pool, lifespan counting down from 255 and doubling as
  alpha, so a dead particle has faded away; the field re-emits it, mostly
  near emitters, sometimes anywhere, keeping full-frame coverage.
- **Procedural smoke texture** (NoC ch. 4): radial-gradient sprites baked
  once in code, pre-tinted in 24 hue buckets so per-frame tinting costs
  nothing; sized for the largest draw, never resized per frame.
- **Additive blending on black** (NoC ch. 4, after Hodgin's Magnetosphere):
  `lighter` compositing, so dense regions bloom white while thin drift
  stays faint; a faint per-frame black fade keeps the field evolving
  instead of saturating.
- **Flow-field following** (NoC ch. 5): grid lookup with bilinear sampling,
  steering force as desired-minus-velocity with limits, noise angles
  mapped 0 to 4PI to flatten the distribution bias, plus a slow third
  noise dimension so the field breathes.
- **Hue as direction**: each particle's bucket comes from the field angle
  under it each frame, so color shifts as the flow turns, no arrows drawn.

## Parameters
- Seeded PRNG (mulberry32), `?seed=` in URL or click for a new variation
- Default seed 899204: full-frame magenta/violet drift with olive-gold
  streams and a bright convergence pool right of center; chosen over
  899201/899202/899205/899206 for the most composed full-frame read
- 800-2000 particles by viewport area, soft sprites 14-32px growing with
  age, fade 0.026-0.034 per frame, 170-frame warmup so the first visible
  frame is already a composed field

## Verification
- Rendered via headless Chromium CDP at seeds 899201/02/03/04/05/06;
  all cohesive and distinct; thumbnail from default seed 899204
  (720x720 center crop of the 1280x800 render)
- Desktop 1280x800 and mobile 390x844: no scroll, no overflow, nothing
  clipped; composition holds at both
- Click regeneration verified (rebuilds with a new seed, rewrites ?seed=)
- Zero console errors and zero page exceptions on load (desktop),
  resize handler re-seeds the field without errors
