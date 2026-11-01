# №1383 "Carlisle Letter" (adam-piron AP8, PP606)

## Prompt
Parchment fragments carrying hieroglyphic cipher script assemble into a letter
and fall apart again; a hunter's-moon red wash tints the fragments as they
scatter. Palette: parchment #d9c9a3, ink brown #4a2f1a, seal red #8f1f1f,
hunter red #a81414. Fragments drift in a loose field; when they align they
form a single letter sheet; a red seal dot anchors the bottom corner.
Seamless loop; fragments gather into the letter, hold, then scatter on
irregular beats; drag pulls nearby fragments toward the touch point. Avoid:
no readable handwriting, no real languages, no paper-texture photos, no
buttons.

## What was built
18 parchment fragments (3 columns x 6 rows when assembled), each carrying 2-4
generated cipher glyphs drawn as shapes only (chevrons, arcs, crosses, hooks,
zigzags, dot trails) — never text, never `fillText`/`strokeText`. The loop is
36 s: drift 0-8 s, gather 8-18 s (eased interpolation), hold 18-24 s, scatter
24-32 s, drift 32-36 s. The red seal dot fades in at the sheet's bottom corner
once assembled. A flat-alpha hunter-red wash (peak 0.35) ramps up during the
scatter phase and decays through the second drift. Drag records touch points;
fragments within 260 px are pulled toward the touch by a closed-form decaying
sum (tau 2.5 s), so the pull settles after release. The ground is a darkened
ink-brown (#241a10) so the parchment reads against it.

## Adaptations (QA-renderer constraints)
- Assembly as closed-form eased interpolation toward target positions on a
  timer with seeded irregular intervals (scatter targets re-seeded per cycle);
  no frame-integrated physics anywhere.
- Drag attraction as a closed-form pull over recorded drags with exponential
  decay; no persistent simulated state.
- Red wash as a flat-alpha tint envelope tied to the scatter phase (no
  gradients anywhere in the piece).
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, localStorage, or getUserMedia. The piece is fully silent (the
  prompt specs no audio).
- Determinism: frame one = `draw(0)` via a boot flag; the rAF loop is a plain
  function declaration behind a `typeof` guard (the QA renderer defines no
  rAF); all randomness from mulberry32 (seed 1383000 + index*7919) and
  deterministic lattice hashes, never `Math.random`.
- Viewport from the Visual Viewport API with canvas pinned in `draw()`;
  phone detection via `window.screen` physical size (min dimension < 700 px)
  with aspect fallback; centered composition keeps its shape, page ground
  takes the piece's own background color; checked at 390 wide.

## Verification
- Rendered at 1280x900, 390x844, 720x720 and inspected all three. Frame one:
  loose field of rotated parchment fragments with cipher glyphs on dark
  ground, no clipping on mobile.
- Thumb byte-identical across repeated renders.
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  pointer events to its own listeners): t=0 parchment 238,577 px (loose field);
  t=21 (hold) parchment 301,073 px, all inside the sheet region, with 550
  seal-red px all in the sheet's bottom-right corner region; t=28 (scatter)
  wash-tint px 914,665 across the frame; boundary diff t=35.9 vs t=36.1 only
  27,048 px (drift motion only, no jump — scatter targets are shared across
  the cycle boundary by construction) against 450,225 px for the full
  gather reconfiguration; a drag at t=10 changes 167,484 px at t=10.5 versus
  undragged (pull works).
- Token scan clean except one comment stating `Math.random` is never used.
