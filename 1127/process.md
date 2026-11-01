# №1127 — Timescope

Joachim Sauter study block JS8 (Timescope, 1995). Built 2026-11-01. Build + QA only; not pushed.

## The piece

Sauter's low-tech augmented-reality device: a quiet grayscale city fills the
frame — two seeded skyline rows with rooftop boxes and antennas, drifting
cloud blobs, a few birds, and a river band in the lower third with slow flow
dashes. A circular brass viewfinder lens (diameter 25% of the smaller frame
dimension) floats over the city on a slow Lissajous tour. Through the lens,
the *same* seeded city is drawn again in its augmented register: buildings
extruded 1.45× taller in teal `#1E8FA3` with cyan `#35E0FF` edge lines, amber
`#FFB84D` route polylines sagging between rooftop nodes with cyan data dots
travelling along them, and the river lit `#6FD8FF`. Outside the lens: the
monochrome past (`#1A1C20` / `#2E3238` / `#101216`). Inside: the augmented
present. A faint etched crosshair and center dot sit in the glass; a 1.05×
scaled pass in the rim annulus (outside 0.93R) gives the subtle glass
distortion at the edge.

## Adaptation choices

- **No offscreen canvas** (house rule): the city is one parameterized
  function `drawCity(aug, t)` drawn three times per frame — mono full-frame,
  augmented scaled inside the full lens clip, augmented true inside the
  0.93R clip. Same geometry both registers; only palette, extrusion factor,
  and the route/river-light layers differ.
- **Lens motion is closed-form.** Pointer input is recorded as timestamped
  samples; the lens position is evaluated from that list each frame as an
  exponential chase (τ = 0.22s) from sample to sample — the optical lag of a
  real device, with no frame-integrated state. After 6s without a pointer,
  the idle tour resumes by decaying the resting offset into the Lissajous
  path (τ = 1.4s). Double-tap reseeds the city (new layout, same device);
  nothing ever reloads.
- **Determinism.** Frame one is drawn synchronously at the fixed phase
  t = 14s; the rAF loop (typeof-guarded) anchors elapsed time to that phase.
  Idle-tour phase offsets were tuned against the actual seeded route map
  (verified by dumping the generator's route list for seed 1127) so the
  lens rests at (0.64, 0.36) of the frame at t = 14, where routes 3 and 4
  cross — frame one shows amber lines inside the brass at every size.
- **House rules throughout:** Visual Viewport sizing with resize listeners
  on both visualViewport and window, canvas CSS size pinned in draw(),
  phone detection via `window.screen` min dimension < 700px (aspect
  fallback), DPR capped at 2, seeded mulberry32 only. No gradients, no
  `ctx.filter`, no shadowBlur, no offscreen canvas, no `createElement`,
  no audio, no microphone. Only text is the `<title>`.

## QA

Rendered with `~/workspace/tools/render-piece.js` (node-canvas):

- `qa-desktop.png` 1280×800 — gray city with clouds, birds, river dashes;
  brass lens right-of-center over the rooftops, teal extrusions and an
  amber route inside it, crosshair etched.
- `qa-mobile.png` 390×844 — same composition; lens legible over the
  rooftops, amber route visible at the top of the glass.
- `thumb.png` 720×720 — rendered twice and `cmp`-compared:
  **byte-identical**; the duplicate was deleted.

Interaction summary: move/drag the pointer and the lens follows with lag;
leave it alone for 6s and it resumes its slow tour; double-tap deals a new
city. Silent by design.
