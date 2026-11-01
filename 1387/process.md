# №1387 "Genre Chassis" — adam-khalil AK4 (PP610)

A surveillance-thriller drone-feed HUD that lies about what the film is.
The camera tracks three absurd subjects in a wide thermal world: a masked
figure calmly watering plants, a marching band, and a picnic. The interface
— crosshairs, target brackets, classification tags — insists these are
targets. The figures go about their mundane business undisturbed.

## Composition

- Full-frame drone feed on night black `#0b0d08`, thermal green `#9dff57`,
  HUD cyan `#57e6ff`, heat orange `#ff7a18`.
- The world is three viewport-widths wide; subjects sit at 0.5W, 1.5W, 2.5W
  on a thermal ground band. Each subject carries a classification tag box
  above it, rendered in pseudo-script glyphs only.
- HUD chrome at the edges: corner brackets, a center crosshair (abstract
  ring + ticks, no military symbology), top and bottom strips carrying
  pseudo-script rows, and heat-orange brackets around the currently
  tracked subject.

## Motion

- Seamless 36 s camera cycle: 12 s per subject, with a 2 s eased move
  between subjects. The camera pans and re-acquires targets on this timer.
- Watering figure: droplets fall along a closed-form arc from the can.
- Marching band: five figures bob and alternate legs on a shared beat.
- Picnic: blanket checker, basket, food dots, two seated figures, one
  slowly waving arm.
- HUD jitter is a closed-form function of quantized (0.1 s) time.
- Grain is seeded dots keyed by (dot, quantized 0.5 s index).

## Interaction

- Drag scrubs the camera to a new subject: drag samples accumulate into an
  offset that decays exponentially (tau 3 s) back to the timer camera, so
  the loop always resumes. Never click-to-reload; no buttons.

## Adaptations

- Thermal look is a palette remap of a simple shaded scene: flat fills
  only, no gradients (the QA renderer handles gradients unreliably).
- Camera pan, re-acquire, HUD jitter, grain, and drag scrub are all
  closed-form functions of piece time and recorded drags — no
  frame-integrated state, so frame one is reproducible.
- Classification tags, HUD strips, and tag boxes are drawn pseudo-script
  shapes (chevrons, triangles, crosses, dot pairs, arcs, ticks, diamonds,
  hooks). No `fillText`/`strokeText` exists anywhere in the piece, so no
  readable word can leak in.
- Fully silent: no AudioContext, no getUserMedia. No offscreen canvas,
  no shadowBlur, no Path2D, no createElement.

## House rules

- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in `draw()` via
  `canvas.style.width/height` in px.
- Phone detection via `window.screen` physical size (min dimension
  < 700 px) with aspect fallback; field-like composition goes full-bleed
  on phones (verified at 390 wide).
- Determinism: frame one = `draw(0)` via a boot flag; the rAF clock starts
  only with the loop (plain function declaration behind a `typeof` guard).
  All randomness from seeded mulberry32 (seed 1387000 + index·7919) and
  deterministic integer hashes — never `Math.random`.

## Verification

- Rendered with `render-piece.js` at 1280×900, 390×844, and 720×720;
  all three inspected. Thumb byte-identical across repeated renders,
  including a final re-verify after the plant fix.
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  pointer events to its own listeners): t=0 vs t=12 differ in 83,764 px
  and t=0 vs t=24 in 91,864 px (camera re-acquires subjects); two fresh
  instances render byte-identical frame-one images (0 px diff); a 300 px
  leftward drag at t=5 changes 83,382 px at t=6 and decays to exactly
  0 px difference vs undragged by t=30; band motion t=12 vs t=13 differs
  in 79,216 px in the subject band.
- One fix round: plant stems first floated their top leaf above the stem
  (leaf at gy−0.75s, stem top at gy−0.5s); stems now run gy−0.8s to gy
  with leaves attached at gy−0.7s and gy−0.45s. All renders re-done
  after the fix.
- Token scan clean except one comment stating `Math.random` is never used.
