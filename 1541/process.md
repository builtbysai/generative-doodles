# №1541 — The Wheel in Chains (arthur-jafa AJ6, PP788)

Gallery date: 2006 · 04 · 01 (in pieces.json only, never drawn in the piece).

## What it is

A single huge ring, a tire, dominating the frame: a thick dark circle with a
heavy tread pattern of short diagonal bars around its edge, and a chain of
small repeating link glyphs (overlapping ovals) following the circumference
in a contrasting metal tone. Ground near-black #0d0c10; ring dark warm grey
#26221e with tread bars #3a352e; chain links pale silver #b8b8b8 with
shadow links #5a5348; one link signal red #b33324, always the same link,
marking the rotation. The ring is centered, nearly filling the frame, with a
thin dark margin; links are evenly spaced.

## Motion

Watch-first rotation loop, 68 s: the ring rotates at a slow steady rate for
60 s (one revolution), then pauses for a long 8 s beat, then resumes. The
pause is part of the rhythm. All motion is closed-form over piece time and
recorded drag events; the ring angle at time t is the scheduled angle plus,
only while a ring drag is held, a direction-set offset. Frame one is
draw(0) at a constant phase; the rAF loop is a plain function declaration
anchored as offset plus elapsed-since-load.

## Interaction

- Dragging on the ring speeds (rightward) or slows (leftward) its rotation,
  only while dragged; the direction is set by the first qualifying
  horizontal move of the session. On release the ring cuts back to its
  scheduled angle and rate.
- Dragging on the red link stops the ring with that link at the top while
  pressed; on release it resumes its scheduled angle.
- Drag never reverses the ring permanently, never breaks the chain, never
  unwraps it.

## Readings and adaptations

- "Shadow links" are read as the alternating link tone: even links pale
  silver, odd links shadow, with link 0 always signal red.
- The release rule follows the Worried Note precedent: a held drag's offset
  is dropped on release so the 68 s loop still closes exactly.
- Canvas 2D only. Sun-halo-style gradients do not occur here; all fills are
  flat. No Path2D, no offscreen canvas, no gradients, no text drawn in the
  piece. Fully silent: no AudioContext at all, no microphone use.
- Fading alphas are rounded to 4 decimals before stringifying; dots and
  link glyphs are drawn as individual beginPath ellipses (never batched
  subpaths). Canvas state is set explicitly in every draw branch.
- Viewport comes from the Visual Viewport API with canvas pinned in draw();
  phone detection via window.screen physical size with the aspect fallback.
  This is a centered geometric piece: the ring keeps its shape on every
  screen and the page ground takes the piece's own background color.
- Seeded mulberry32 stream, seed 1541000, supplies only the small tread
  jitter; rotation timing itself is fixed, never Math.random.

## Probes (probe-1541.js, vm-isolated, real node-canvas, 28/28 pass)

- Frame one identical across fresh instances; loop closure byte-identical
  at t=68 and t=136.
- Steady rate: angle(10) = TAU/6; angle non-decreasing over 0–60 s, reaching
  TAU at t=60; pause holds angle at TAU at t=62, 66, 67.9; angle wraps to 0
  at t=68.
- 36 links; link 0 outline red, link 1 shadow, link 2 silver; total red
  pixels consistent with exactly one link at t=0 and t=30; red link at angle
  pi (left side) at t=30.
- Rightward ring drag faster than control while held, leftward slower;
  both snap back to the schedule after release; identical drag sequences
  byte-identical.
- Red-link drag holds angle at -pi/2 with the red link at the top while
  pressed, holds through t=15, resumes the schedule after release; chain
  unbroken during the hold.
- Thumb byte-compare: two independent 720×720 renders byte-identical to
  the shipped thumb. Forbidden-API grep: 0 hits.

## Fix rounds

None. All probes passed on the first run; desktop (1280×720) and mobile
(390 wide) renders were inspected personally with no clipping: one huge
ring nearly filling the frame, tread bars around the outer edge, evenly
spaced chain links, exactly one red link, thin dark margin.
