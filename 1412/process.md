# №1412 "Future Base" (christine-sun-kim CS5, PP635)

## The piece

One fixed trajectory — two semicircles arching away from a point, like a hand
signing "future" — drawn twenty times across a paper field, each time landing
somewhere different. All twenty share one origin point at upper left and fan
out across the frame, so the variation reads as variation: one lands in a wine
glass and goes dotted, one dives into a swimming pool, two score a hole-in-one,
one gets paranoid and frays at the edges. The rest land plainly, each with a
small end dot.

- Palette: paper #e8e2d4, trajectory black #1a1a18, wine red #7a1e2a, pool
  blue #2e6f8e, hole-in-one gold #f5c542, paranoid gray #8a8f94, dotted
  line #4a4a44.
- Composition: origin upper left; wine glass lower left, pool center, golf
  green lower right, frayed edge upper right; the other fifteen landings are
  seeded scatter points kept clear of the origin and of each other.
- Motion: seamless 40 s loop. The trajectories redraw in sequence, one every
  ~2 s (each trajectory's cycle is staggered 2 s from the next). Each pass:
  1.4 s progressive draw, 1.0 s landing fate, a long hold, then a 2 s fade-out
  before its next pass — so the field is always populated and never cuts.
- Landing fates: wine-glass line dissolves into 26 dots; pool line ripples
  (three expanding rings, then two faint static rings); golf lines drop into
  the hole (last 15% of the line retracts) with a small gold flag pop; the
  paranoid line frays into three jittered gray strands over its last 30%.
- Interaction: drag a landing zone. Drag the wine glass away and its line
  lands whole; drag the golf hole away and its line overshoots past the hole
  (and the flag stays down). Dragged zones ease back home over ~2 s after
  release (closed-form exponential decay, tau 2 s), so the fates restore
  themselves. The origin never moves.

## Adaptations

- Trajectories are bezier pairs from a fixed origin with per-landing behavior
  modules (dot-dissolve, ripple, hole-drop, fray); landing zones are draggable
  objects; the sequence timer cycles through all twenty. No physics sim: every
  path, fade, ripple, and fray strand is a closed-form function of piece time
  and recorded drag events.
- No visible text anywhere except `<title>`: no text explanations of the
  futures, no labels, no hint text. The trajectories are the subject.
- Fully silent: no AudioContext, no getUserMedia. No offscreen canvas,
  gradients, shadowBlur, Path2D, createElement, or fillText/strokeText.
- Study rules honored: touch/drag, never click-to-reload; seamless loop;
  pseudo-gestures only — the trajectories are abstract arc pairs, never real
  ASL words and never captioned as an English translation; nothing asks the
  viewer to "experience deafness" by muting or muffling. The piece is about
  sound politics and access, not imitation.
- Node-canvas quirks honored: every fading alpha rounded to 4 decimals before
  stringifying (scientific-notation alphas parse as opaque); dots drawn as
  filled rects; every arc/ellipse under its own beginPath (no batched
  subpaths); leaves/curves are never batched ellipses.
- House rules: canvas size from the Visual Viewport API with resize listeners
  on visualViewport and window; canvas pinned in draw() via style width/height
  in px; phone detection via window.screen physical size (min dimension
  < 700 px) with aspect h > w*1.15 as fallback only; centered composition
  keeps its shape on phones with the page ground in the piece's own paper
  color; checked at 390 wide.
- Determinism: synchronous first frame at a constant phase via a boot flag
  (frame one = draw(0), clock starts only with the rAF loop, which is a plain
  function declaration behind a typeof guard); all randomness from a seeded
  mulberry32 PRNG (seed 1412000), never Math.random.

## QA

Rendered with node ~/workspace/tools/render-piece.js at 1280x900, 390x844,
and 720x720; all three inspected. Desktop frame one: origin dot with halo
ring upper left, twenty trajectories fanning out, pool center with a
trajectory diving in and faint ripple rings, golf green lower right with
flag popped, wine glass lower left, frayed edge upper right with gray
jagged marks and the paranoid trajectory's frayed end. Mobile keeps the
same composition with no clipping.

Forced-time probe harness (stubbed rAF driving the piece's own loop, pointer
events to its own listeners, geometry replicated from the same seed):

- Two fresh instances render byte-identical frame-one images; thumb
  byte-identical across repeated renders.
- Wine fate: dark-sample fraction along the wine path's middle is 0.39
  undragged (dotted) vs 1.00 dragged (whole line); wine-red samples confirm
  the glass moves with the drag.
- Golf fate: path-tail samples (last 12% of the path) are 0.00 undragged
  (line drops into the hole) vs 1.00 dragged (full line + overshoot); the
  flag is suppressed while the hole is dragged away.
- Pool ripple: blue-shifted samples on the steep upper arc at radius 47
  around the pool center are 0.00 at t=38.5 (drawing, no rings) vs 0.62 at
  t=39.9 (fate, q=0.5).
- Fray: gray-blend pixel count rises 5509 at t=32 (paranoid not started) to
  7377 at t=35 (hold, frayed strands present).
- Origin dark pixels sit at the same location at t=0 and t=20.
- Token scan clean: no fillText/strokeText, AudioContext, getUserMedia,
  Path2D, createElement, gradient, shadowBlur, Date.now, performance.now,
  or localStorage (the single "Math.random" hit is a comment stating it is
  never used).

No fix rounds needed.
