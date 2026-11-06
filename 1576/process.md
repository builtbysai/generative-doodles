# №1576 "Sine, Quad, Cubic, Quint, Expo" (ayumu-nagamatsu AN1, PP823, expansion #208)

## Build
- Self-contained `index.html` (canvas 2D only, no external assets, no audio),
  built from the №1575 template shell: Visual Viewport sizing with resize
  listeners on visualViewport and window, canvas pinned in `draw()` via
  `canvas.style.width/height` in px, phone detection via `window.screen`
  (min dimension < 700px) with aspect fallback, seeded RNG mulberry32
  (seed 1576), one synchronous frame at load, `requestAnimationFrame`
  guarded by a typeof check.
- Five glass cubes in a shallow arc across ~85% of frame width, generous
  dark margins, ground #0B0B0E. Each cube: faint-white back face offset
  up-right, connecting edges, ribbon inside the front face, faint glass
  veil, bright front edges. Ribbons are swept quad bands along
  y = easing(x), sampled at 48 points: Sine easeInOut, Quad easeIn,
  Cubic easeOut, Quint easeIn, Expo easeIn. Warm white #F2EDE4; the Expo
  ribbon is the single amber #D9A441 accent.
- Each cube wears a labeled swatch bar below it (ribbon-color chip +
  name and variant: SINE IN-OUT, QUAD IN, CUBIC OUT, QUINT IN,
  EXPO IN), drawn with fillText in a generic sans-serif, auto-shrunk to
  fit the bar.
- Motion: watch-only base. Each ribbon carries a bright white pulse band
  with a head dot whose position along the curve is the easing function
  of a shared 9 s loop phase (staggered 0.13 per cube, so pulses are not
  synchronized). The camera drifts horizontally on a linear triangle
  wave (36 s period, no easing anywhere in the camera). Drag
  horizontally anywhere scrubs the shared pulse phase of all ribbons
  simultaneously. No click-to-reload.
- Caption chip bottom-left: title, formula date 2006 · 05 · 06, ending
  with the interaction cue "Drag to scrub the pulses."
- Deterministic first frame: fixed phase at t = 0, no Math.random, no
  Date.now() in the draw path. Loop is anchored as fixed offset +
  elapsed-since-load.

## Deviations from the prompt
- Labels: the parent task brief directs fillText with a generic
  sans-serif (falling back to vector letterforms only if blank); the
  draft BATCH-1576-1580-SPEC.md suggested constructed stroke-path
  letterforms instead. Followed the parent brief: fillText labels render
  legibly in all three QA sizes (verified visually), so no fallback was
  needed.
- Caption chip: the batch spec says no in-piece hint text except the
  labels the prompt requires, but the parent brief mandates hint text
  ending with the interaction cue, and the №1575 template carries the
  same caption chip. Kept the chip (title, date, drag cue).
- Variant assignment: the prompt says each swatch bar carries a name +
  in/in-out/out but does not assign variants per function; assigned
  Sine in-out, Quad in, Cubic out, Quint in, Expo in.

## QA
- Rendered the actual script with node ~/workspace/tools/render-piece.js:
  1280x900 desktop, 390x844 mobile, 720x720 thumb. All three inspected
  visually: five distinct easing ribbons in glass cubes, arc reads,
  all five labels legible (including on mobile), caption chip legible
  with the date and drag cue, palette exact (black ground, warm-white
  ribbons, one amber Expo ribbon), no clipping.
- Thumb byte-identical across two consecutive renders of the same
  script (md5 d0bddf138fe06a48c2e84e54716b31d2 both times).
- Motion check: an extra render at t = 4.5 s inspected visually.
  Pulses had traveled along their curves at their own easing rates
  (Cubic near the top, Expo still near the start, as easeIn dictates)
  and the row had drifted linearly left. No errors.

## Gallery
- Date: 2006 · 05 · 06 (formula 2002-01-10 + (N+1) days).
- Note: "Five easing functions extruded as ribbons in glass cubes. Drag to scrub the pulses."
- NOT pushed (staging only, per task). Files staged at
  ~/workspace/goals/generative-doodles-backfill-from-9067/hidden_files/build-an1/1576/
