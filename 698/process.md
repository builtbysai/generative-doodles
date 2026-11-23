# Doodle №9002: Kindling (2026-09-03)

**File:** `9002/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
Two fractal flames, built the old way: a chaos game throws millions of points
through a small set of affine transforms bent by nonlinear variations, and
brightness comes only from where the points land. Log-density tone mapping
turns the histogram into light, so bright filament cores dissolve into faint
smoke instead of blowing out. One restrained palette per burn, never the
rainbow default. When both flames finish developing, the piece spends the
rest of its life drifting slowly between the two function sets, a 44 second
crossfade that never quite repeats the same face.

## Technique synthesis (from study, not copied)
- **Density is the only paint.** Points accumulate into a Float32 histogram
  (1024² desktop, 640² mobile) with per-function color averaging in the
  Draves style; color coords map into a single 2–3 hue ramp. Six palettes
  (ember, tidepool, verdigris, ink and saffron, wine, moonlit slate), one
  chosen per seed.
- **Structural guarantees against mud** (found by rendering, fixed in code
  not by seed-picking): noise variations (square, blur, gaussian) are banned
  outright after one rendered as a literal filled rectangle; at most one
  pure-linear function per set and at least two nonlinear ones, so every set
  has filament texture. Each set is scouted on a coarse grid and only kept
  if coverage lands between 6% and 60% with real density contrast, up to 40
  attempts, best kept.
- **Alive without recomputation.** The two finished histograms are blended
  per frame with a ping-pong weight and tone mapped live, so the morph costs
  one typed-array pass, cheap enough for phones.
- **Deterministic seeds:** mulberry32 throughout; `?seed=` overrides,
  `?t=` freezes the drift (thumbnails), `?clean=1` hides the HUD.
  `prefers-reduced-motion` renders one still frame instead of animating.
- **Progressive development** is part of the piece: each flame exposes over
  ~60 batched frames with a "developing…" note, then the drift begins.
  Mobile gets smaller batches and a smaller buffer to stay smooth.

## Parameters
- Default seed 314159: an ember palette; set A is a wide swirling bloom,
  set B a tight bright knot; the blend of the two is the prettiest moment.
- Click anywhere for a new seeded burn (new function sets, new palette).

## Verification
- Rendered via headless Chromium CDP on isolated port 9335 at 7 seeds across
  four code iterations; every render visually inspected. Real bugs found and
  fixed: noise-variation rectangle fill, shared camera shrinking small
  flames, sparse scratchy sets (fixed with the coverage/contrast gate), and
  a mobile HUD overlap at 390px.
- Desktop (1280×900) and 390px mobile: no scroll or overflow, composition holds.
- Zero console errors on load, during generation, during the drift, and after
  click regeneration (verified via CDP: click changes `?seed=`, phase text
  resets, generation restarts).
- Thumb captured at exactly 720×720 from the default seed at t=8.

## Known limits
- Generation takes ~30–40s on this headless box (faster on real hardware);
  the developing phase is deliberate and pleasant to watch, but a visitor on
  a slow phone waits a while for the drift to start.
- The drift is a crossfade, not a true parameter morph; mid-blend moments
  are double exposures. That reads as intentional here.
