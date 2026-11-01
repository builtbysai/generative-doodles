# №1409 "All Day All Night" (christine-sun-kim CS2, PP632)

## The piece

Two great arcs drawn across a pale field — one black, one red — each the path
of an arm: the black arc sweeps over a fixed horizontal horizon line, the red
arc swings underneath it, and together they close into a slow circle, the
sun's path drawn as a gesture. No literal sun illustration, no clock face, no
readable text, no real ASL vocabulary beyond the abstract arc trajectories.

- Field paper #e8e2d4; horizon line #8a8f94 across the middle third; black
  arc #1a1a18 above, red arc #b01e24 below; gold #f5c542 draw-heads;
  charcoal smudge #4a4a44.
- The two arcs meet at the left and right edges, closing the circle. The
  field stays otherwise empty so the trajectories carry.

## Motion (all closed-form over piece time and recorded events)

- One full day-night cycle per ~40 s: the cycle duration is seeded
  (40 × (0.8 + 0.45 × rand), i.e. 32–50 s), so a fast cycle reads as a short
  day and a slow one as a long day, exactly as Kim varies the sign's speed
  to express duration.
- Each arc redraws continuously: a gold draw-head travels its semicircle,
  leaving a live stroke behind it. A faint ghost of the full circle
  (alpha 0.12) is always drawn underneath, so the circle never breaks —
  not even at a cycle wrap, when a head jumps back to its start.
- Frame one is a constant phase (both arcs 30% drawn) via a boot flag:
  frame one = draw(0), clock starts only with the rAF loop.
- Drag along an arc re-times that half of the cycle: the drag delta is
  projected onto the travel tangent at the pointer's angle; moving with
  travel speeds that arc up, moving against it slows it down (clamped
  0.35–2.5×). The multiplier decays back to 1 with tau 6 s after release.
  The two halves re-time independently; the circle never breaks, only
  changes tempo.
- Seeded charcoal smudges sit statically around the circle at flat alpha.

## Adaptations

- Arcs as parametric curves with a speed parameter driving the draw-head;
  drag adjusts that curve's speed parameter; the cycle loops without a cut.
- No audio of any kind — the trajectories are the subject, and nothing in
  the piece asks the viewer to "experience deafness" by muting or muffling.
  No gesture is captioned as an English translation.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, or getUserMedia. rAF behind a typeof guard; the piece draws
  one synchronous frame at load.
- node-canvas quirks honored: every fading alpha rounded to 4 decimals
  before stringifying; dots as filled rects; every arc/ellipse on its own
  beginPath.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas pinned in draw();
  phone detection via window.screen physical size (min dimension < 700 px)
  with aspect fallback; centered composition keeps its shape and the page
  ground takes the piece's own paper color on every device.
- No visible text anywhere except `<title>` (no hint text — the prompt
  forbids readable text).

## Verification (forced-time probe harness, stubbed rAF driving the piece's own loop)

- Two fresh instances render byte-identical frame-one images.
- Ghost circle confirmed: an undrawn upper-right arc point reads
  (208, 202, 189) against paper (232, 226, 212) at t = 0.
- Horizon line spans the full width at the middle third.
- Black ink in the upper half grows 1436 px (t = 0) → 2938 px (t = 10 s):
  the arcs redraw continuously.
- Drag re-times: black ink at t = 10 s is 2938 px undragged, 4159 px after
  dragging with travel along the top of the circle, 2253 px after dragging
  against travel.
- Gold draw-heads present on both arcs at t = 0 (512 gold px).
- Token scan clean: no AudioContext, getUserMedia, createElement, Path2D,
  shadowBlur, gradient, fillText, or strokeText; no Math.random (seeded
  mulberry32, seed 1409000, throughout).
- Renders inspected at 1280×900, 390×844, and 720×720; thumb byte-identical
  across repeated renders, including after the final code edit.
- One fix during the build: the piece first guarded `document.body` but
  not `document.body.style`; hardened to guard both so alternate shims
  cannot throw. All renders re-done after the fix.
