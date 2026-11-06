# No.1572 "The Weather Changes the Rules" — SB5, PP819, #207 senbaku-deconbatch

Gallery date: 2006 · 05 · 02. Interaction cue: "Watch the weather change the rules."

## Spec (verbatim prompt, from TASKS.md)

Grid of cells on deep blue-purple ground, each cell a small rounded square
or circle whose size and brightness encode continuous "health" (0-100, not
binary). A global environmental factor sweeps visibly across the board over
time — cells swell and merge with corner-rounded joins when generous, shrink
to isolated dots when harsh. Palette: deep blue-purple ground #2A2350
shifting hue with the environment; cells warm white #F2EDE4 with dark cores
#1A1A2E. Nothing else. Composition: full grid, edge-to-edge, cells ~18px.
Motion/interaction: watch-only loop (~20s). The envFactor sweep 0.1→0.8 is
the protagonist — the sweep must read as weather, not flicker. Never any
pointer interaction. Technical: cellular automaton with continuous health;
neighbor influence counted relative to each cell's own health (not a fixed
threshold); global envFactor scales birth/death each frame; render
full-health cells as rounded rects with corner radius set by neighbor
health (the join mechanism). Avoid: classic binary Game of Life; subtle
environmental effects (make the weather unmistakable); pointer interaction.

## Build

- Seeded PRNG (mulberry32, seed 1572) plus a deterministic hash for the
  per-step wobble. Initial health is a smooth value-noise field (25..90)
  from a 9x7 seeded coarse grid, bilinearly interpolated.
- Grid: cell 18px scaled by minDim/900; 72x50 cells at 1280x900, 50x108 at
  390x844. Full-bleed field at every size.
- envFactor(t) = 0.45 + 0.35*sin(TAU*t/20 - PI/2): 0.1 at t=0, 0.8 at t=10,
  back to 0.1 at t=20, one full sine cycle per loop. The ground lerps
  between #221C44 (harsh) and #372A6E (generous) by envFactor.
- CA step (fixed DT 1/30 s): each cell drifts toward its neighbours' mean
  health; the target blends neighbour influence with a weather baseline,
  target = avg*(0.55 + 0.45*env) + (env - 0.45)*60, clamped 0..100, plus a
  tiny deterministic wobble. No fixed threshold anywhere. Simulation
  advances in fixed steps and rebuilds from the seeded field on rewind,
  so frame one is always identical.
- Render: cell size = cell*(0.22 + 0.85*h/100), so generous cells swell
  past their slot and merge; corner radius = s*(0.15 + 0.35*neighbour/100)
  is the join mechanism. Alpha 0.30 + 0.70*h/100, warm white; dark core
  dot sized by health when h > 40. No gradients, no Path2D, no shadowBlur;
  every batched arc preceded by moveTo; fading alphas rounded to 4 decimals.
- House rules: Visual Viewport sizing with resize listened to on both
  visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px; phone detection via window.screen
  (min dimension under 700 px) with aspect fallback; field-like composition
  full-bleed on phones and desktop. One synchronous frame at load; every
  requestAnimationFrame call guarded by a typeof check. No em dashes in
  visible copy. No pointer interaction of any kind. No click-to-reload.

## QA

Rendered from the actual script with node
~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile,
and 720x720 thumb; all three inspected visually.

- Fix round 1 (weather direction): the first CA rule used a purely
  multiplicative target (neighbour mean times 0.55 + 0.9*env). The probe
  showed mean health falling 54 -> 23 at generous t=10 and to 9.8 at
  t=20: a starved field could never regrow because the target scaled
  with the already-decayed neighbours. Added the additive weather
  baseline (env - 0.45)*60 to the target. Re-probed: mean health 54 at
  t=0, 87 at generous t=10 (all 3600 cells full, merged field), 0.29 at
  harsh t=20 (isolated dots). The sweep now reads as weather.
- Probe (probe-1572-1575.js, hand-driven rAF clock): frame one
  deterministic, 0 differing bytes across two t=0 draws at 1280x900;
  env 0.1 at t=0, 0.8 at t=10, 0.1 at t=20; 3,392,930 bytes changed
  t=0 -> t=10 and 3,395,412 t=10 -> t=20; thumb re-render byte-identical
  (md5 dd4a53c19c425d9beb9ec312b53136e3).

## Deviations

None from the prompt. One interpretation note: the ground hue shift is
implemented as a lerp between two deep blue-purple grounds (#221C44 harsh
to #372A6E generous) driven by envFactor, staying inside the specified
blue-purple family around #2A2350.
