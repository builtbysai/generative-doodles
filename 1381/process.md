# №1381 "Vertigo Re-read" (adam-piron AP6, PP604)

A logarithmic spiral field in a hostile teal-and-rust palette: particle traces
spiral inward forever around a dark pit, while mission-era glyph marks accrete
in rings from the outer edge inward, like graffiti on a monument.

## Frame one

Near-black field (#101a18). A spiral field centered on the frame: four faint
logarithmic guide arms (teal, rust, cream) sweep around a dark pit at center
(#0a0f0d with a thin rust ring). 150 seeded particle traces in mission teal,
mission rust, and cream flow along the spiral toward the pit, each with a short
tail. Glyph marks — chevrons, triangles, crosses, arcs, dot pairs, ticks,
diamonds, hooks in rust and cream — sit in rings from the outer edge inward.
No visible text except `<title>`. Mobile keeps the same centered composition
with no clipping.

## Motion

- Particles spiral inward at a constant rate: each particle's phase advances
  linearly with piece time over its own seeded period (9–20 s); radius follows
  a closed-form exponential decay from the outer field to just outside the pit,
  then wraps back out. The spiral never stops.
- Glyphs appear and fade in waves on a 40 s cycle: 6 s fade-in, 20 s hold,
  6 s fade-out. Rings accrete outer → inward via a 4 s per-ring phase delay,
  so the outer ring's graffiti appears first.
- The spiral scale is fixed: no zoom, no nausea tricks. The pit never moves
  or changes size.
- Drag changes spiral handedness and tightness: horizontal drag samples are
  summed with exponential decay (tau 4 s). A strong leftward drag (offset
  below −80 px) flips handedness; the offset also scales tightness
  (clamped −50% / +80%). Negligible residue below 2 px snaps to zero, so the
  loop resumes its base spiral exactly after the drag decays.

## Adaptations

- Particle advection is closed-form spiral positions of piece time, not a
  frame-integrated particle system; trails are short closed-form segments,
  never canvas-fade.
- Glyph accretion is closed-form alpha envelopes over piece time.
- Drag is a closed-form sum over recorded drag samples with exponential
  decay; no frame-integrated state.
- No WebGL (canvas 2D throughout), no AudioContext (the piece ships silent;
  the prompt specs no sound for this piece), no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, localStorage, or getUserMedia.
- Glyphs are drawn shapes, never text: no fillText/strokeText anywhere, so
  no readable words can leak in. No reference to any Vertigo film imagery;
  the spiral and glyphs are purely procedural.
- Determinism: frame one = draw(0) via a boot flag; the rAF loop is a plain
  function declaration behind a typeof guard, and its clock starts only with
  the first rAF timestamp. All randomness comes from mulberry32
  (seed 1381000), never Math.random.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas pinned in draw() via
  style.width/height; phone detection via window.screen physical size
  (min dimension < 700 px) with aspect h > w*1.15 as fallback; page ground
  takes the piece's own background color. Dots are drawn one beginPath per
  dot (paired arcs) per the node-canvas batching quirk.

## Verification

- Rendered at 1280×900, 390×844, and 720×720 and inspected all three;
  thumb byte-identical across repeated renders, including a final re-verify
  after the last code change.
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  pointer events to its own listeners): two fresh instances render
  byte-identical frame-one images (0 px diff); pit pixel count identical at
  t=0 and t=10 (7,368 px) and the center pixel stays pit color at t=0 and
  t=20 (no zoom, pit never moves); t=0 vs t=5 differ in 44,455 px (particles
  move); t=0 vs t=20 differ in 45,436 px (glyph waves fade/appear); a
  300 px leftward drag at t=5 changes 49,371 px at t=6 (handedness flips,
  tightness shifts) and dragged vs undragged at t=30 differ in exactly 0 px
  (drag fully decayed, base spiral resumed).
- Token scan clean: the only forbidden-token match is a comment stating
  Math.random is never used.
- Fix rounds (2): the first guide arms were too faint to read as a spiral
  (teal at 0.16 alpha on near-black) — now four arms in teal/rust/cream at
  0.15–0.30 alpha, and particle trails shortened from 0.03 to 0.015 of phase
  so traces read as flow instead of scratchy chords; the drag decay left a
  sub-pixel residue that kept renders from matching after release — offsets
  below 2 px now snap to zero, so the loop resumes exactly. All renders
  re-done after each fix.
