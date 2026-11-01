# №1167 — Glitch-Alike Lab

Nick Briz study block NB8 (PP326), after the *How To Glitch AI* series: the
difference between a real break and a glitch-alike. One flat geometric source —
pink disc, cyan cross-bars, yellow triangle and square on near-black — is run
through four corruption methods in a 2×2 grid, and each panel carries its
verdict: only the two methods that actually break the data are REAL BREAK.

## The four panels

- **PROMPTED — GLITCH-ALIKE.** The source drawn smoothed: every cell is a
  weighted blend of its neighbourhood, so edges melt and colours bleed into
  quantized ramps, over a slight scale/offset breathing. Nothing broke; it
  just went through a filter. The blend is computed in the data (the house
  renderer has no `ctx.filter`, and none is needed).
- **DATABEND — REAL BREAK.** Per-row tear offsets that re-step every 0.4 s,
  R/B channels sampled ±2 cells apart, and seeded flat burst blocks past
  half corruption. Channel mixing across the palette produces the pure
  red/green/blue fringes.
- **TOKEN SWAP — REAL BREAK.** The source re-rendered through a scrambled
  palette lookup (pink→blue, cyan→pink, yellow→cyan, background→dark violet).
  The panel is divided into 6×6-cell token blocks; as corruption grows, blocks
  flip to the scrambled generation, and some flip again to a second wrong
  generation — visible at frame one as the yellow block sitting inside the
  blue disc.
- **UPSCALED — GLITCH-ALIKE.** The source sampled at ¼ resolution and drawn
  back blocky-nearest, with pale halo edges precomputed wherever a low-res
  block borders a different colour. Downsample factor steps 1→2→3→4 with the
  envelope.

## Timing

16 s loop. Panels begin corrupting in sequence (0 s, 2 s, 4 s, 6 s) and ramp
in five hard steps, the last reaching full corruption at 9 s — the fixed
first-frame phase, where all four languages read at full strength. They hold,
then a white wipe bar sweeps the grid at 14.5–15.5 s and resets every panel
to clean. A source thumbnail strip runs across the top so the before-state is
always on screen next to the verdicts.

## Interaction

Tap a panel to isolate it full-screen (its corruption keeps animating); tap
again to return to the grid. Never click-to-reload. Silent by design.

## House adaptations

- Everything is sampled from the source *function* into cell data and drawn
  as flat rects — no offscreen canvas, no ImageData, no real encoders.
- Corruption state is a closed-form function of (panel, loop time) from
  seeded hashes (mulberry32 + integer hash); the synchronous first frame is
  drawn at T0 = 9 s and the rAF loop is anchored as T0 + elapsed.
- Visual Viewport sizing with resize listeners on both `visualViewport` and
  `window`; canvas CSS size pinned in `draw()`; phone detection via
  `window.screen` (min dimension < 700 px) with the aspect fallback — portrait
  phones stack the four panels in one column.
- No gradients, no `ctx.filter`, no shadowBlur, no audio. The only text is
  the specced labelling: panel titles, verdict strips, and the lab header.
