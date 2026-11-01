# №1498 "First Shot, Foundation Stone" (claire-atherton CA3, PP745)

## Prompt
A dark field. One by one, candidate opening images drift in from the edges:
a doorway, a window, a road, a face-shape, a tree. Each hovers, then drifts
away — except one, which sinks slowly to the centre and settles like a stone,
and from it the rest of the scene grows outward in rings. Palette: field deep
charcoal #2a2a30; candidates muted #b8bcc0, #4a5a7a, #6b4a3a, #2e6f6a; chosen
stone cream #e8e0d0 with gold edge #d9a441; growth rings faint cream.
Watch-first, choosing loop. Dragging an arriving candidate toward the centre
makes it the chosen one for this loop; dragging any other candidate away
dismisses it early. Drag never places two stones, never freezes the field,
never labels a candidate. No text, no numbers, no "correct" opening image, no
monument/tombstone stone, no target rings.

## Build
- 120 s loop = two 60 s choosings. Each choosing: five candidates in 8 s slots
  (approach 3 s, hover 3 s, leave 2 s); the scheduled chosen candidate holds at
  its hover spot instead of leaving, sinks to centre over 6 s (40–46 s,
  ease-out, colour morphing to cream with a gold edge), rings grow over 8 s
  (46–54 s, four staggered expanding faint-cream strokes), field clears over
  6 s (54–60 s, stone alpha to 0). Choosing 0 settles the window, choosing 1
  settles the tree, so each choosing ends on a different image and the loop
  still closes exactly.
- Candidates as objects with approach/hover/leave states and a chosen flag;
  settling as ease-out to centre plus expanding ring strokes; drag maps
  pointer position to candidate selection while hovering.
- Frame one is phase-shifted +1.5 s into candidate 0's approach (doorway
  half-entered from the left edge, centre empty) rather than opening on a
  fully empty field; loop closure is unaffected because every state derives
  from the shifted loop-local time.
- Drag model, all closed-form over loop-local time and a recorded event
  list (drags are scoped to the loop instance they occurred in): while
  dragging, the candidate follows the pointer; on release near the centre
  (within 0.16U) it becomes the chosen one for this loop (the previously
  scheduled chosen candidate leaves over 2 s); on release far from its hover
  spot (0.22U or more) it is dismissed early (2 s leave from the release
  point); otherwise it returns to its path with no lasting effect. The stone
  itself is never draggable. Never click-to-reload.
- Rings are transient growth ripples (expanding, fading, staggered), never a
  persistent bullseye, per the prompt's "rings that become a target" avoid.
  The stone keeps the candidate's own flat shape, so it never reads as a
  monument or tombstone.
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing. Fading
  alphas rounded to 4 decimals; dots/arcs as own-beginPath arcs with moveTo
  first (node-canvas quirks). All randomness from mulberry32 (seed 1498000),
  never Math.random. Frame one = draw(0) via boot flag, clock starts only
  with the rAF loop (plain function declaration behind a typeof guard);
  every animation value derives from loop-local time (the №1482 lesson
  applied from the start).

## Verification
- Rendered at 1280×900, 390×844, 720×720 and inspected all three; thumb
  byte-identical across repeated renders including a final re-verify.
- Forced-time probe harness (vm-isolated instance, real node-canvas, piece
  driven via window.__piece, tmp/probe1498.js): t = 0 redraw 0 px; t = 120
  vs t = 0 = 0 px; t = 240 vs t = 0 = 0 px; fresh instance t = 0 identical.
  Frame-one grey 3466 px (doorway entering), centre box cream 0 px, gold
  0 px (centre empty). Settle (choosing 0) gold edge 1465 px at centre;
  rings phase cream 8288 px vs settle 0 px exact-cream (settling stone is
  still mid-morph, exact cream only once settled); choosing 1 settle
  differs from choosing 0 settle by 15995 px (different stone).
  Clear-phase fade measured as max channel deviation from field in the
  centre box: 190 → 164 → 124 → 5 (field effectively clears).
- Drag-choose: dragging candidate 0 (doorway) to the centre makes its stone
  the settle stone (18544 px vs undragged settle, gold edge 1176 px).
  Drag-dismiss: dragging candidate 1 (window) away leaves slate 0 px vs
  4128 px undragged at the same time.
- Token scan clean (the single "Math.random" hit is the code comment
  stating it is never used; no fillText, AudioContext, getUserMedia,
  createElement, Path2D, shadowBlur, or canvas gradients).

## Fix rounds
None needed after QA. One design change during the build (before final
renders): frame one phase-shifted +1.5 s so the thumb shows the doorway
mid-approach instead of a fully empty field; loop closure re-verified after
the change.
