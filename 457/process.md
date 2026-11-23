# №1471 "The Archive of Defiant Muses" (delphine-seyrig DS8, PP718)

## What it is
A wall of wood shelves holding small muted-colour tapes, each with a thin
spine stripe. Tapes accumulate one slot at a time on a slow timer; one shelf
section glows softly amber for the tape currently playing. A charcoal viewer
window fixed at the bottom runs the selected tape's loop in miniature — a
walk, a chore, a drift, a swap, a listening grid, a broadcast, a cutting
room, one of the DS1–DS7 motions at small scale.

## Frame one
Warm off-white wall; four wood shelf boards across the upper two-thirds;
14 vertical tapes already present (10-column by 4-row grid, phase-shifted so
the shelf is part-filled at load), each in muted teal, scarlet, gold, plum,
or slate with a thin wall-coloured spine stripe. The first tape glows amber
— it is the playing tape. The lower shelves stand empty, awaiting
accumulation. The viewer window at the bottom runs the playing tape's loop
(a broadcast miniature at frame one) with a small colour chip of the playing
tape at its corner. No visible text besides `<title>`.

## Motion and interaction
- Accumulation: one new tape appears every 6 s until all 40 slots fill, then
  the shelf stays full. The fill saturates rather than resetting, so no tape
  ever vanishes and the shelf is never restarted.
- Playing glow: the amber glow cycles to a new present tape every 8 s; the
  viewer follows the playing tape's loop.
- Drag a tape out of its slot (past one slot-height from its slot): the tape
  stays where dropped, enlarges slightly while held, and the viewer swaps to
  that tape's loop. Drag it back near its slot and it returns; the viewer
  reverts to the playing tape's loop. Drag never restarts the shelf and
  never deletes a tape. Never click-to-reload.
- Viewer miniatures (loop id per tape, seeded): 0 walk on a rectangular
  circuit, 1 chore at a table with an oscillating arm, 2 drift with two
  fainter lagging reflections, 3 instant costume-colour swap every 3 s,
  4 twelve-face grid with a gold-outlined speaker, 5 broadcast rows on a
  teal studio backdrop with a gold line sweep at the close, 6 cutting room
  with a reader and a tiny TV jump-cutting abstract scenes.

## Adaptations
- Shelf as a slot grid with a fill timer; tapes as sprites with loop ids;
  viewer as a viewport running the selected loop miniature.
- The TV jump-cut flash uses the wall colour, not pure white, to stay inside
  the prompt palette; the broadcast miniature gets a teal studio backdrop so
  its charcoal suited figures stay legible inside the charcoal viewer.
- Spine stripes only — never readable labels, never real names.
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing; fading
  alphas are literal fixed decimals via globalAlpha (0.35 glow, 0.5/0.25
  reflections), dots as own-beginPath arcs with moveTo first or filled
  rects (node-canvas quirks).
- Determinism: frame one = draw(0) via boot flag, clock starts only with
  the rAF loop (plain function declaration behind a typeof guard); all
  tape colours and loop ids from one mulberry32 stream (seed 1471000),
  never Math.random. Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned in draw(); phone detection via
  window.screen (min dimension < 700 px) with aspect fallback; field-like
  composition full-bleed on phones.

## Verification
Rendered at 1280×900, 390×844, and 720×720 and inspected all three; thumb
byte-identical across repeated renders including a final re-verify.
Forced-time probe harness (vm-isolated instance, real node-canvas, piece
driven via window.__piece, tmp/probe1471.js): t = 0 redraw diff 0 px;
presentCount 14 at t = 0, 15 at t = 6, 24 at t = 60, 40 at t = 156 and t = 200
(saturates); shelf tape pixels 94,873 → 162,681 → 271,192 across t = 0/60/200
(accumulation live); playingIndex cycles 0/1/2 at t = 0/8/16; dragging tape 1
(gold, loop 4) out sets pulled = true, viewer loop 4, viewer chip gold;
dragging it back sets pulled = false, viewer loop back to the playing
loop 5; shelf tape pixels after both drags identical to t = 0 (no reset,
no deletion). Token scans clean: no fillText/strokeText, no Math.random,
AudioContext, getUserMedia, createElement, Path2D, shadowBlur, or gradient
calls (comments only, where present).

## Fix rounds (2)
1. First renders showed squat near-square tapes and an invisible grid
   miniature (face grounds drawn in viewer colour on a viewer ground).
   Grid widened to 10 columns (40 slots, 14 tapes at frame one), tapes now
   vertical rectangles; grid faces redrawn as wall-coloured discs with
   viewer-coloured brow/mouth lines; walk-circuit line and broadcast
   backdrop fixed for legibility the same way.
2. Probe caught a drag bug: pointerDown set held = true before measuring
   the grab rect, so currentRect returned the fresh tape's (0, 0) px/py
   position and every drag started from the top-left corner; the pull
   still registered (distance from the corner is large) but the return
   drag could never land near the slot. Fixed by measuring the grab rect
   before setting held. A second probe-side fix (counting tape pixels in
   the shelf region only) removed viewer-miniature colours from the
   accumulation count. All renders re-done after each fix; frame one
   unchanged by the drag fix.
