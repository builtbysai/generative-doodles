# №1111 — Four Particles Lost

Daniel Franke study block DF8: *Four Particles Lost* (2015). A dark tank of
high-viscous fluid; four luminous particles drift through it trailing long,
slow ribbons that fold and persist. The particles are plain instruments —
the trails are the piece.

## Construction

- **Fluid**: a coarse 44×44 velocity grid. Every fixed step (dt = 1/60)
  runs three diffusion passes at a strong pull toward the neighbour mean —
  that stacking is the viscosity — followed by a slow global decay
  (×0.9985/step). Disturbances therefore spread wide and die slowly, like
  a wake in honey.
- **Particles**: four tracers, each bound to a seeded Lissajous guide whose
  frequencies are whole cycles of the 75 s loop, so unattended motion
  closes seamlessly. A particle's velocity is the guide velocity plus the
  bilinearly sampled grid velocity plus a faint analytic breathing
  current; a soft spring keeps it near its guide, so a drag can push it
  off course and the course slowly reclaims it. Each particle also stirs
  the grid slightly as it passes, so the ribbons genuinely record the
  fluid's history.
- **Ribbons**: each particle records its position every second step into
  an 840-point buffer — 28 s of history. Segments are stroked individually
  with alpha and colour interpolated along age: #4DD8C8 at 0.5 near the
  core fading to #1E4A44 at the tail. No canvas fading, no gradients.
- **Determinism**: all parameters come from one seeded mulberry32 stream;
  no `Math.random`, no wall clock in the sim. Frame one is the state
  after a fixed synchronous pre-roll of **30 simulated seconds**
  (1,800 steps), so the thumb renders byte-identical on repeat runs.

## Interaction

- **Drag** injects the pointer's velocity into the grid along its path
  (Gaussian falloff, speed-clamped). Ribbon segments passing near a fresh
  disturbance take an amber #E8A020 bloom that decays over ~4 s. The wake
  lingers in the grid for the better part of a minute before the
  viscosity folds it back to stillness.
- **Tap a particle** and its ribbon brightens ×1.8 for 5 s of sim time —
  its personal history, lit. (Taps are resolved after a 350 ms window so
  a double-tap is never misread.)
- **Double-tap** stills the tank: the grid is cut to 12% and decays hard
  for 2.5 s; the particles then resume on their guides.
- **Sound**: a deep liquid drone (46 Hz + 92.7 Hz sines and low-passed
  brown noise through a 240 Hz master filter) whose gain follows the
  grid's mean field energy. It is created lazily inside the first pointer
  gesture, fully typeof-guarded, never autoplays; the piece is complete
  with the sound off.

## House rules honoured

Canvas sized from the Visual Viewport API with resize listeners on both
visualViewport and window; CSS size pinned in `fit()` and re-pinned in
`draw()`; phone detection via `window.screen` min dimension < 700 with
the `h > w*1.15` aspect fallback; rAF guarded by a typeof check (the QA
renderer draws the synchronous first frame only); no offscreen canvas, no
canvas gradients, no `ctx.filter`, no shadowBlur, no `createElement`, no
microphone. The only text is the `<title>`.
