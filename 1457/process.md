# №1457 "Pirate Junk Orlando" (ulrike-ottinger UO2, PP704)

## What it is
An all-women pirate crew on a Chinese junk at sea, held as a tableau. The
junk sits centered with full battened sails; the sea fills the lower third.
Six sailors in identical navy-and-white striped uniforms stand in a row on
deck; at the right, the captain stands raised on a crate in an absurdly
oversized gold-trimmed coat. The crew performs the same hierarchy they fled:
the captain gives an order with a raised arm, and the sailors repeat the
gesture one after another down the row, like a wave.

## Palette (prompt only, no other colour)
Sea deep teal #14555a; sky pale #d8e2dc; junk wood #6b4a2f; sails
off-white #efe6d0; uniforms navy #1e2a3a with white #f2f2f2 stripes;
captain gold #d9a441. Heads use the off-white sail colour (a palette
colour), so no colour outside the prompt appears. No visible text except
`<title>`.

## Motion
- Watch-first, gentle sea motion. Sails billow on a slow 8 s cycle; the sea
  carries two slow sine bands; the hull bobs on a 7 s cycle.
- Gesture wave: the captain's arm raise runs on a 6 s cycle; each sailor
  repeats it with a 0.5 s phase delay down the row (phase offset 1/12 of
  the cycle per figure), so the order visibly travels down the line.
- Dragging shifts the wind: sails belly one way or the other and the
  gesture wave speeds or slows. Drag never restarts the scene.

## Interaction
Horizontal drag maps to a wind parameter in [-1, 1]. Sail belly adds a
wind-proportional offset; the gesture wave's effective time is
`t + 0.5 * windIntegral(t)`, so the wave speeds up with a following wind
and slows against it. On release the wind decays exponentially (tau 3 s)
back to calm.

## Adaptations
- Sails as flat filled shapes with a belly offset (a quadratic edge whose
  control point follows wind + slow billow), never a bezier surface with
  gradients; battens as thin wood lines.
- Gesture wave as phase offsets down the row, not animated sprites.
- Sea as layered flat-alpha sine strokes in a palette colour, never a
  gradient or realistic water.
- Wind state is closed-form over recorded events, never frame-integrated:
  a drag session records its start time and wind value; on release, the
  drag segment's wind integral is folded into a base offset and the
  released session decays exponentially. `windAt(t)` and
  `windIntegral(t)` are pure functions of the event list and t, so frame
  one and every later frame are reproducible.
- Fully silent (no AudioContext at all); no offscreen canvas, shadowBlur,
  Path2D, createElement, getUserMedia, or text drawing; fading alphas
  rounded to 4 decimals, dots as filled rects or own-beginPath arcs
  (node-canvas quirks).
- Determinism: frame one is draw(0) via a boot flag; the clock starts only
  with the rAF loop (plain function declaration behind a typeof guard);
  all randomness from mulberry32 (seed 1457000), never Math.random.
- Viewport: Visual Viewport API with resize listeners on visualViewport
  and window; canvas pinned in px. Field-like composition goes full-bleed
  on phones; on narrow frames the hull widens to 92% of frame width so the
  crew row breathes and the captain's arm stays inside the frame.

## Verification (forced-time probe harness, vm-isolated instance, stubbed rAF
driving the piece's own loop, pointer events to its own listeners)
- Two fresh instances byte-identical at t = 0; thumb byte-identical across
  repeated renders.
- Frame-one colours all present (sky, sea, sail, navy, gold, wood).
- t = 0 vs t = 3 differs by 38,593 px (motion live).
- Drag vs no-drag at the same t = 4 differs by 3,298 px (wind shifts the
  sails); windAt during drag reads 0.5 for a 320 px drag on a 1280 px
  frame, as specified.
- windAt 1 s after release reads 0.3583 = 0.5 * exp(-1/3) (tau 3 s decay);
  windIntegral at t = 7 reads 1.448 = drag segment 0.5 + release decay
  integral, exactly as specified.
- Token scan clean (the single "Math.random" hit is a comment stating it
  is never used).

## Fix rounds (2)
1. First render: the captain's head floated above the coat (head centre
   0.92 body-heights above the feet vs a coat top at 0.72), the sail top
   edge scooped too deep, and the crew row crowded on phones. Fixed: head
   centre moved to 0.84 body-heights so it overlaps the coat top; sail
   scoop softened; phones use a 92%-width hull and a wider-spaced row.
2. Second render: the captain's gold arm ran off the right edge on phones
   and the coat overlapped the last sailor. Fixed: captain moved inboard
   (0.40 to 0.36 of hull width) and the row's right end pulled back
   (0.22 to 0.18), clearing both. All renders re-done after each fix.
3. Probe round: the probe caught a wind-integral bug — on release, the
   drag segment's integral was dropped (windIntegral read 0.948 instead of
   1.448). Fixed by folding the drag session into the base offset on
   release. Frame one re-rendered after the fix and re-inspected at both
   sizes; thumb still byte-identical on re-render.
