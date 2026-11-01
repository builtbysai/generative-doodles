# №1479 "The Last Three Tapes" — carole-roussopoulos CR8 (PP726)

## Prompt
A quiet domestic interior, seen straight on: a window, a table, a chair, a shelf
with three tape boxes. Light moves slowly across the room through the day:
morning gold, midday white, evening amber, night blue-grey. Objects do not move;
only the light and the shadows change. On the shelf, one tape box at a time glows
faintly, in turn.

Palette (exact, no other color): walls warm off-white #e8e0d0; window light gold
#e0b26a, white #f5f0e2, amber #d99a4a, night #5a6a7a; table wood #8a6a48; tape
boxes #4a5a7a, #6b4a3a, #2f4636; glow #d9a441.

Composition: room centered, window left, table and chair right, shelf above the
table; tape boxes in a row on the shelf; nothing else in the room.

Motion: watch-first, day loop. The light cycles through the four times of day
over a slow loop; shadows lengthen and shorten with the light angle. Dragging
across the window scrubs the time of day (forward or back); releasing resumes
the cycle from that time. The glowing tape box advances one box per completed
day. Drag never restarts the day and never opens a tape box.

## Build
- Room as flat polygons; light as a translucent overlay whose color and angle
  follow a day parameter; shadows as skewed dark polygons whose length follows
  the light angle; tape glow as an index advanced per completed day cycle.
- Day loop is 96 s (24 s per phase). Light color, overlay alpha, and sun angle
  are piecewise-linear interpolations over five day keyframes (morning gold,
  midday white, evening amber, night blue-grey, back to morning gold), so the
  loop closes exactly.
- Day state is closed-form over piece time and recorded drag events: an anchor
  (total fractional days + anchor time); dragging across the window sets a
  scrubbed day value, and release re-anchors at that value so the cycle resumes
  from there. Drag outside the window is ignored. Drag never restarts the day,
  never opens a tape box, never moves any object.
- Shadows use the prompt's night blue-grey #5a6a7a at low alpha (0.22, 0.10 at
  night) rather than introducing a new shadow color; the floor light patch is
  the current light color at 0.28 alpha, skewed by the light angle.
- The glowing box gets two nested translucent gold halos plus a 2 px gold
  outline — faint, never a label, never text.
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing; no visible
  text except `<title>`. No person, no illness or death shown, no camera move,
  no sentimental ending. Nothing in the piece is random, so no PRNG is needed
  and no Math.random appears anywhere.
- House rules: canvas size from the Visual Viewport API with resize listeners
  on visualViewport and window; canvas pinned in draw(); phone detection via
  window.screen physical size (min dimension < 700 px) with aspect fallback;
  centered composition keeps its shape on phones with the page ground in the
  piece's own wall color. Frame one is draw(0) via a boot flag; the rAF loop is
  a plain function declaration behind a typeof guard. Fading alphas are literal
  fixed decimals (no scientific-notation strings); dots/shapes use own-beginPath
  arcs or rects (node-canvas quirks).

## Verification (forced-time probe harness, vm-isolated, real node-canvas)
- t = 0 redraw 0 px; fresh instance vs first at t = 0 = 0 px.
- t = 288 (three full days) vs t = 0 = 0 px — the loop closes exactly, glow
  back to box 0.
- Pane-quadrant color at t = 0/24/48/72: morning gold (224,179,105), midday
  white (245,241,226), evening amber (217,154,73), night blue-grey
  (89,106,122) — all four times of day read distinctly.
- Shadows: morning shadows fall left from the table/chair legs, evening
  shadows fall right (visible in the desktop render); shadow length follows
  the light angle.
- Glow advances one box per completed day: halo marker on box 0 at t = 0,
  box 1 at t = 96, box 2 at t = 192 (gold px 686/784/784).
- Drag across the window scrubs the time of day (window pixel changes during
  the drag and holds after release, differing from the no-drag instance);
  drag outside the window leaves the frame byte-identical to no-drag.
- Renders inspected at 1280x900, 390x844, 720x720: window left with gold panes
  and floor light patch, shelf with three boxes (first glowing), table and
  chair right, nothing else; mobile keeps the same centered composition with
  no clipping. Thumb byte-identical across repeated renders.

## Fix rounds
None needed.
