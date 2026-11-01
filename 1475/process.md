# №1475 "Tape and Scissors" (carole-roussopoulos CR4, PP722)

## Prompt
An editing table seen from above: three tape strips laid horizontally, each
holding a short scene (a room, a crowd, a monitor wall). A pair of scissors
rests at the table's edge. Splice lines mark where strips were cut and joined.
The three scenes play simultaneously in small frames above their strips.
Palette: table wood #8a6a48; tape strips cream #e8e0d0, grey #d8d2c4, teal
#2e6f6a; splice lines scarlet #c1272d; scissors steel #9a9a9a with handles
#c1272d; scene frames charcoal #2a2a30. No other color. Motion: watch-first
with drag-to-reorder. Dragging a strip left or right swaps its position with
its neighbor, and the scene frames follow the strips; a fresh scarlet splice
line appears at the join. Tap on the scissors cuts the selected strip into
two halves, which then play in sequence. Drag and tap never restart any scene
and never delete a strip. Avoid: hidden jump cuts, a timeline scrubber UI,
text labels, an "export" or "done" state.

## Build
- Table fills the frame in wood. Three rows, each a charcoal-framed scene
  above its strip, stacked with generous gaps. Scissors lower right (steel
  blades, scarlet handle loops, charcoal pivot dot).
- Scenes, all closed-form over piece time, no frame-integrated state:
  - Room (12 s loop): cream wall, wood floor band, three seated figures
    (charcoal, teal, grey bodies); the speaker cycles every 4 s, head tilts,
    teal zigzag voice-line rises from the speaker.
  - Crowd (8 s loop): seven head-and-shoulder shapes nodding on staggered
    slow sines.
  - Monitor wall (6 s loop): three monitors whose screens cycle cream /
    grey / teal with flickering abstract blocks every 2 s.
- Strips as an order array; scenes as looping sprites bound to strips.
- Interaction: drag a strip horizontally past 80 px swaps it with its
  neighbor (right = the strip below in the stack, left = the strip above);
  the moved strip gains a fresh scarlet splice tick at its right end, and
  the scene frames follow the strips. A tap (no drag) on a strip selects it
  (charcoal outline; default = top strip). A tap on the scissors cuts the
  selected strip: it draws as two halves with a scarlet splice line at the
  cut, and its scene plays two variants in sequence (first half of its loop
  normal, second half variant: reversed speaker order / inverted nod /
  offset monitor pattern). Drag and tap never restart any scene and never
  delete a strip. Never click-to-reload.
- No visible text except `<title>`. Fully silent (no AudioContext at all).
  No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  getUserMedia, or text drawing. Fading alphas: none used (all fills
  opaque). Dots as own-beginPath arcs with moveTo first or filled rects
  (node-canvas quirks).
- Determinism: frame one = draw(0) via a boot flag; the rAF loop (plain
  function declaration behind a typeof guard) starts the clock only after
  load. All decoration from one mulberry32 stream (seed 1475000), never
  Math.random. Canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas style pinned in px;
  phone detection via window.screen physical size (min dimension < 700 px)
  with aspect fallback; field-like composition full-bleed on phones.

## Adaptations
- Room figure heads are charcoal, not the prompt's grey: grey heads
  vanished against the cream wall. Same palette, no new color.
- Crowd ground is wood, not grey: a grey-bodied figure vanished against a
  grey ground (its head floated). Same palette, no new color.
- Drag direction maps to stack neighbors: right swaps with the strip below,
  left with the strip above (strips are stacked vertically, so "left or
  right" has no lateral neighbor); a drag at an end strip with no neighbor
  in that direction does nothing.
- A cut strip's "play in sequence" is implemented as two loop variants:
  the first half of its loop plays normally, the second half plays the
  variant (reversed speaker order / inverted nod / offset monitor
  pattern), so the two halves are visibly distinct halves of one loop.

## Verification (probe harness tmp/probe1475.js, vm-isolated instances,
real node-canvas, piece driven via window.__piece)
- Same-instance redraw at t=0: 0 px diff; fresh instance vs first at t=0:
  0 px diff; thumb byte-identical across repeated renders.
- t=0 vs t=3: 45,868 px diff (scenes alive).
- Right drag on the top strip: order [0,1,2] -> [1,0,2], fresh splice
  recorded; top frame becomes exactly the old middle (crowd) frame.
- Swapped room scene at t=5 matches a fresh instance's room scene at t=5
  exactly (no restart).
- Left drag on the top strip: order unchanged (no neighbor above).
- Tap on the middle strip selects it; tap on the scissors cuts it;
  scarlet pixels in the middle strip rise 256 -> 960 (center cut line).
- Cut crowd scene at t=2 (first half) matches uncut exactly; at t=6
  (second half) differs by 1,592 px (sequence variant live).
- Mobile (390x844) instance draws cleanly; scissors inside the canvas.
- Token scan clean: no fillText/strokeText, Math.random, AudioContext,
  getUserMedia, createElement, Path2D, shadowBlur, or gradients.

## Fix rounds (1)
- First renders: room heads in grey were nearly invisible against the
  cream wall, and the fourth crowd figure's grey body vanished against a
  grey ground. Fixed as documented above (charcoal heads, wood crowd
  ground). All renders re-done after the fix.
