# №1469 "Maso and Miso Go Boating" (delphine-seyrig DS6, PP716)

A television screen inside the frame plays a pompous broadcast: rows of
identical suited figures making pronouncements, shown as abstract shapes,
not people. Below it, an editing table. As the broadcast plays, ironic
chapter cards slide over it; at the close, the suited figures' mouths shut
and a single rising gold line crosses the screen.

## Composition

- TV screen, upper two-thirds; editing table as a strip below; chapter
  cards centered over the screen; gold line sweeping left to right at the
  close.
- Palette only: broadcast grey #b8bcc0, suits charcoal #2a2a30, studio
  backdrop teal #2e6f6a, chapter cards ivory #f2ead8 with black #1c1c22
  text, gold line #d9a441. No other color.
- Broadcast: three segment sprites in an order array. Segment 0: two rows
  of five small figures, "ALL AT SEA ONCE AGAIN". Segment 1: one row of
  four large figures, "HIDING BEHIND THE HOST". Segment 2: two rows of
  four figures with arms raised, "APPLAUSE, ON CUE" (the third phrase, in
  the same ironic register as the two specced phrases).
- 30 s broadcast loop, 10 s per segment. Frame one is phase-shifted +2 s
  so it opens on a held card, not mid-slide.

## Motion and interaction

- Watch-first with drag-to-recut: dragging across the editing strip
  (over 60 px) rotates the segment order one step in the drag direction;
  the chapter cards follow the new order because cards are bound to
  segments. The broadcast clock is never reset: segment time is a pure
  function of piece time, so a recut changes what plays, never when.
- Tap on a chapter card applauds it: a brief ripple of eight small hand
  shapes around the card, expanding and fading over 1.5 s.
- Close beat: in the last 4 s of the loop the mouths close and a rising
  gold polyline sweeps left to right across the screen.
- Never click-to-reload, never a broadcast restart.

## Adaptations

- Broadcast as three segment sprites with a segment order array; chapter
  cards as text sprites bound to segments; applause as a short burst of
  hand shapes; drag maps to a segment-order permutation.
- Mouth oscillation periods (1.5 s / 2 s / 1 s) all divide the 30 s loop,
  so the loop closes exactly.
- Text is used only for the chapter phrases (one fillText call), the
  prompt's own text mechanism; no other visible text besides <title>.
- Fully silent (no AudioContext at all): the "song replaced" beat is
  visual only — mouths close, gold line crosses.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement, or
  getUserMedia. Fading alphas rounded to 4 decimals; dots as filled rects
  or own-beginPath arcs (node-canvas quirks). rAF loop as a plain function
  declaration behind a typeof guard; frame one = draw(0) via boot flag;
  all decoration from mulberry32 (seed 1469000), never Math.random.

## Verification

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900,
  390x844, and 720x720; all three inspected. Thumb byte-identical across
  repeated renders.
- Forced-time probe harness (vm-isolated instance, piece driven via
  window.__piece, pointer events to its own listeners):
  - t=0 redraw 0 px; t=30 vs t=0 = 0 px (loop closes exactly).
  - Frame one: card ivory 99,789 px; screen gold 0 px (no voice-line yet).
  - t=12: segment 1 playing, frame differs by 356,869 px.
  - t=27 (close beat): 1,269 gold px inside the screen rect.
  - Strip drag (+250 px): recut recorded, order [1,2,0], segment at t=5
    changes 0 to 1, frame differs by 527,933 px; segAt(15) = segment 2,
    local 7 — the broadcast clock kept running, never restarted.
  - Card tap: applause recorded; frame at t=2.6 differs from a fresh
    instance by 1,422 px (hand shapes visible).
- Token scan clean: the only requestAnimationFrame hits are the
  typeof-guarded loop; the only fillText is the chapter phrase.
- No fix rounds needed.
