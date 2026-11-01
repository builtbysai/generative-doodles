# №1323 "Good People" — process notes

## Source
Sadie Barnette SB4 (PP490), from *Good People (Decaptych)* (2026): ash and
poplar wood letters, ~11 ft, ~1,200 lbs, arranged in a ring around an open
center as a communal structure. The prompt's one hack: a single small pink
heart engraved on the flank of one letter.

## What was built
- The words "good people" as ten wooden monolith letters on an 11-slot ring
  (slot 4 is the word gap), centered at 70% of a square field, tilted in
  slight perspective (squashed ellipse, back letters smaller, drawn
  back-to-front). Warm gallery wall above, warm floor across the lower
  third, long soft shadows falling on the floor only.
- Each letter: grain-dark extrusion offset down-right (the monolith side),
  ash face in a per-letter seeded tone, light bevel stroke, and seeded
  wavy grain lines laid over the ink with a clip plus source-atop composite,
  so grain never spills onto wall or floor. No gradients, no shadowBlur,
  no offscreen canvas anywhere.
- Exactly one pink heart, on a seeded letter, drawn only while that letter
  rides the front of the ring (sin of its ring angle above 0.3), so it is
  visible only at certain rotation angles.
- Motion, all closed-form over piece time and recorded events: the ring
  rotates one full turn per 90 seconds; drag orbits the viewpoint (recorded
  drag sessions decay back with tau 2.5 s on release, easing back to the
  slow turn); a double-tap reseeds which letter carries the heart from a
  mulberry32 stream (seed 1323000 + reseed index x 7919). A single tap
  never reloads. No audio of any kind.
- Frame one is exactly t = 0 via a boot flag; the clock starts only with
  the rAF loop. No Math.random anywhere (the one grep hit is a comment
  stating exactly that). The rAF loop is a plain function declaration
  behind a typeof guard, and one synchronous developed frame is drawn at
  load, so the node-canvas QA renderer sees the finished frame.

## Adaptations
- Cooper Black is not available to canvas, so letters use a heavy rounded
  sans (900 weight Arial Black / Liberation Sans / DejaVu Sans stack)
  approximating Cooper-Black-style, with procedural wood grain and beveled
  edges to keep the monolith read.
- Background and floor shadows are painted last with destination-over
  composite: letters and grain are drawn first on a transparent canvas so
  the source-atop grain can only land on letter ink; shadows are clipped
  to the floor rectangle so they never float on the wall behind back
  letters.

## QA
- Renders inspected at 1280x900 desktop, 390x844 mobile, 720x720 thumb.
  Desktop and mobile both read as a ring of wooden letters around an open
  center, floor lower third, one pink heart on the front letter's flank.
- Forced-time probe (temp copy, discarded): t = 45 differs from frame one,
  confirming rotation runs. Reseed probe: a seeded double-tap moves the
  heart to a back letter, where it correctly hides until that letter
  rotates to the front. Drag probe: a recorded 300 px drag session shifts
  the ring's orbit angle.
- Thumb rendered three times, cmp byte-identical, matching the finished
  index.html (md5 e567d160ac70c0f4999ed7eb61eb52ab).

## Fix rounds
- One fix before QA: shadows were first drawn unclipped and would have
  floated on the wall behind back letters; they are now clipped to the
  floor rectangle.
