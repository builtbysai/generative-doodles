# Doodle №9016: Interference (2026-09-17)

**File:** `9016-interference/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
Two or three wheels of fine lines turn at different speeds on paper, and where
they cross, moiré patterns bloom, crawl, and dissolve. The gallery's first
animated piece. Lineage: John Whitney's differential motion studies (the TGAM
study's analog-computing thread) — patterns that only exist in the overlap,
never in either wheel alone. One wheel is occasionally rust instead of ink;
the accent stays rare so it reads as a signal, not decoration.

## Technique synthesis (from study, not copied)
- **Differential rotation as the compositional engine**: each wheel gets its
  own line count, speed, and phase. Counter-rotation is common but not forced;
  any speed difference keeps the interference alive.
- **Structural guarantees against dead variations** (found by rendering):
  wheel 0 is always radial (rotating concentric rings are rotationally
  symmetric, so a rings-only piece would look frozen — caught this in review);
  the second wheel drifts off-center and stays closer in so it reads as its
  own inner system; an optional third wheel is a far off-center intruder that
  collides with the main system. Line-count bands differ per wheel so beats
  always form.
- **Deterministic animation**: composition from mulberry32(seed); motion is a
  pure function of (seed, t). `?t=` freezes a frame (thumbnails render at
  t=7); `prefers-reduced-motion` renders one still frame instead of animating.
- **Analog finish**: one static grain field built per seed and stamped each
  frame (cheap), plus a faint vignette.

## Parameters
- Seeded PRNG (mulberry32), `?seed=` in URL or click for a new variation
- Default seed 90210: off-center rust rings colliding with the ink radial field

## Verification
- Rendered via headless Chromium CDP at 8 seeds across three code iterations;
  every seed cohesive; failure modes found and fixed (oversized radial hub
  reading as a glitch, all-rings frozen pieces, vinyl-record uniformity)
- Desktop + 390px mobile viewports: no overflow, composition holds
- Zero console errors on load and during animation
- Click regeneration verified (new `?seed=`, composition rebuilds)
- Thumbnail 720x720 from seed 90210 at t=7
