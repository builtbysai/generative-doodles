# №1446 "How Are You Now, In Wood and Oil" (kathe-kruse KK7, PP677)

## Prompt
The words HOW ARE YOU NOW? and the answer IT'S ALL GOOD NOW are built large
across the frame, but not as type: the question is assembled from rough wood
planks and torn paper shapes, the answer from thick oil-paint strokes —
letters as materials, with wood grain, torn edges and brush ridges visible.
The two phrases face each other across the frame, question left, answer right.
Letters ~15% of frame height; a narrow gap between them, like two rooms.
Materials assemble and reassemble themselves — planks slide a few pixels,
paper edges flutter, oil strokes thicken and relax — but the words never
dissolve into abstraction and never change; every ~12 s one material swaps
(a wood letter briefly becomes paper, then returns). Dragging across a letter
disturbs its material (planks rattle, paper lifts at a corner, paint ripples)
and it settles back. Never click-to-reload, never clean typography, never a
changing message.

## Build
Letters are drawn as a 3x5 block font, one material-filled cell at a time —
never canvas text, so nothing here is clean typography. Each cell carries
seeded corner jitter, so the hand stays visible and the errors are stable
across loops rather than flickering.

- Question (left room): letters alternate wood and paper per letter.
  Wood = plank brown #8a5a2a with darker grain lines and a lighter streak.
  Paper = #f2ead8 as a jagged torn-edge polygon over a #d8c8a8 shadow.
- Answer (right room): letters cycle the five oil colours (black, white,
  ochre, red, teal) with dark/light ridge lines along each stroke.
- Layout: desktop keeps the two rooms side by side with a thin vertical seam
  between them; phones stack the question above the answer with a horizontal
  seam. Lines are HOW ARE / YOU NOW? and IT'S ALL / GOOD NOW. Letter height
  is ~16% of frame height on desktop (tall cells, 1.35x vertical stretch, so
  the 7–8 character lines still fit their half of the frame).
- Motion: per-letter sinusoidal micro-motion (±1.5 px slide, oil thickness
  oscillation). Material swap every 12 s: one letter crossfades to its
  alternate material over 1 s, holds, and crossfades back over 1 s.
- Interaction: drag across a letter records a disturb time for that letter;
  the disturbance (extra jitter, paper corner lift) decays exponentially
  from the recorded event — closed-form, never frame-integrated state.
  Release settles back to the base motion. No click-to-reload anywhere.
- Sound: none. The piece is silent by design (no AudioContext at all).

## Adaptations
- Paper legibility fix (1 round): the prompt's paper tone #f2ead8 is nearly
  identical to the wall tone #efe9dc, so the first render's paper letters
  almost vanished. The paper shadow offset was widened and a darker torn
  edge (#c8b898) was added along the lower and right sides of each paper
  cell. Palette tones unchanged; the letters now read via their shadows
  while still reading as torn paper.
- No other prompt deviations. The two phrases are the prompt's own specced
  text exception and the only visible text besides `<title>`.

## House-rule compliance
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height.
- Phone detection via window.screen physical size (min dimension < 700 px),
  aspect fallback only; checked at 390 wide with no clipping.
- Determinism: frame one = draw(0) via a boot flag; the rAF loop (plain
  function declaration behind a typeof guard) only starts the clock on its
  first callback. All randomness from mulberry32 (seed 1446000), never
  Math.random. No offscreen canvas, gradients, shadowBlur, Path2D,
  createElement, AudioContext, getUserMedia, or text drawing. Fading alphas
  rounded to 4 decimals; dots drawn as filled rects (node-canvas quirks).

## Verification
- Rendered with node ~/workspace/tools/render-piece.js at 1280x900,
  390x844, and 720x720; all three inspected. Thumb byte-identical across
  repeated renders, including a final re-verify after the paper fix.
- Forced-time probe harness (vm-isolated instance, real node-canvas,
  draw(t) driven directly): 27 letters / 27 boxes; two fresh instances
  0 px different at t = 0; t = 0 vs t = 6 differs (micro-motion live);
  returning to t = 0 reproduces frame one exactly; t = 13 and t = 24 differ
  (swap windows active); a drag disturb on a letter changes 5,081 px at the
  same t = 20 and decays to subpixel edge shimmer by t = 23.5; the letter
  count and phrase structure never change.
- Token scan clean (the single "Math.random" hit is a comment stating it is
  never used).
