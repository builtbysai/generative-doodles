# №1397 "Telephone Game" (zack-khalil ZK6, PP620)

## Prompt

A single clear motif (a geometric bird, a maypole, a circle) at frame left,
re-drawn by an invisible chain of copiers across the frame to the right —
each copy lossier, stranger, more misheard than the last, until the final
copy is unrecognizable. Palette: original ink #1a1a18, copy-shift blue
#3d5a80, copy-shift red #b01e24, copy-shift green #4a7c3a, paper #e4dfd2.
The chain runs left to right across the middle band, 7–9 copies, each labeled
only by a pseudo-script index glyph, on quiet paper. The chain re-seeds
periodically and the degradation plays out again with a new error pattern;
dragging scrubs backward through the chain's history to recover earlier,
clearer copies; touching a copy "mishears" it on the spot, injecting a fresh
error that propagates rightward. Avoid: readable text in the motif,
photorealism, decorative gradients, click-to-reload.

## What was built

- Motif: a geometric bird as a parametric vector drawing (body outline, wing,
  beak, fanning tail, leg, eye dot) in unit space, drawn as stroked polylines.
- Chain: 8 copies across the middle band on quiet paper. Each copy applies a
  seeded transform stack that grows with copy index: rotation jitter, segment
  dropout, stroke wobble, and color drift from original ink toward its
  copy-shift color (blue/red/green cycling).
- Cycle: 48 s. Degradation plays out over the cycle (copies appear staggered,
  3 s apart, and degrade over 18 s each); at cycle end the chain re-seeds
  with a new error pattern. Frame one is phase-shifted +36 s so the full
  chain is already visible.
- Drag: horizontal drags accumulate a scrub offset (0.05 s per px, tau-4 s
  exponential decay, clamped to −40 s) that shifts the effective cycle time
  backward, recovering earlier, clearer copies; the piece always relaxes back
  to live time. Never click-to-reload.
- Tap: a tap (pointerdown/up with under 14 px of movement) on a copy injects
  a mishearing at that copy; the error propagates rightward with 0.5 s per
  hop delay and a 1.5 s ramp, persisting until the cycle re-seeds. Copies
  left of the tap are untouched.
- Index glyphs: each copy carries one drawn pseudo-script glyph below it
  (chevron, arc, cross, hook, or dot pair) — never a letter or digit.
- No visible text except `<title>`; no fillText/strokeText anywhere.

## Adaptations (briefed, all applied)

- Transform stacks are seeded per (cycle, copy) via mulberry32, never
  Math.random, so every cycle and every copy is reproducible.
- Error injection is recorded touch events; each copy's state is a
  closed-form function of events and piece time — no frame-integrated state.
- History scrub is a closed-form decaying sum over recorded drag samples.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, or getUserMedia. Fully silent.
- Fading alphas are rounded to 4 decimals before stringifying (node-canvas
  misparses scientific-notation alphas like 2.5e-15 as opaque).
- Dots are filled rects; every batched arc is preceded by a moveTo
  (node-canvas subpath quirk).
- Copy scale is capped so motif half-width stays under half the copy
  spacing, so neighbours never overlap even at 390 wide (one fix round:
  the first build clipped the leftmost copy's tail and overlapped neighbours
  on desktop; scale is now min(min(W,H)*0.085, W*0.042) with the chain
  spanning 0.09W–0.93W).

## House rules

- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect fallback; centered composition keeps its shape, page ground
  takes the paper color.
- Determinism: frame one is draw(0) via a boot flag; the rAF loop is a plain
  function declaration behind a typeof guard and the clock starts with it.
- Interaction: drag scrubs history, tap mishears a copy — never
  click-to-reload.

## Verification

- Rendered at 1280×900, 390×844, 720×720 and inspected all three; desktop
  shows the full chain degrading left to right with no clipping or overlap;
  mobile keeps the same chain with no clipping.
- Thumb byte-identical across repeated renders.
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  pointer events to its own listeners, 1280×900): frame one shows all 8
  copies with degradation increasing left to right; t=10 vs t=58 (same
  shifted cycle time, adjacent cycles) differ in 12,077 px (re-seed works);
  a 300 px leftward drag at t=20 clears copy 2 entirely by t=21 (1075 → 0 px,
  scrubbed back before it appeared); a tap on copy 2 at t=20 leaves copy 0
  identical at t=23 (1307 = 1307 px) while copy 3 collapses from 1293 to
  348 px (error propagated rightward); two fresh instances at t=0 render
  byte-identical frames.
- Token scan clean: no fillText, strokeText, createElement, Path2D,
  shadowBlur, AudioContext, getUserMedia, or Math.random.
