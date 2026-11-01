# №1390 "The Bite Spreads" (adam-khalil AK7, PP613)

A dark field of connected nodes like a night map. Touching the field plants a
glowing "bite" that spreads vampirism along the network edges; each bitten
node flares red, then settles into a new undead amber state, then fades back
over a long cycle, and the field re-seeds. Dragging draws new bite trails.
The system never rests.

## Palette

Node gray #5a5e66, edge dim #2e3138, bite red #ff2a2a, undead amber
#e0962a, field near-black #0c0d10.

## Composition

The network fills the frame organically: 64 nodes from a seeded scatter with
a minimum separation, edges to the 3 nearest neighbours within range. No
grid, no labels, no text except `<title>`. Field-like composition, full-bleed
on phones and desktop alike.

## Motion and interaction

- Touch plants a bite at the nearest node. Drag plants further bites every
  36 px of travel, drawing a bite trail.
- Infection is a closed-form function of (piece time minus bite time, graph
  hops from the bite source): the wave arrives at 0.45 s per hop, flares red
  for 1.4 s, settles amber undead for 26 s, fades back over 8 s.
- Edge pulses are travelling red highlights, computed closed-form from bite
  time and hop distance, visible only while the wavefront crosses the edge.
- Every 150 s the field re-seeds: a new seeded layout (seed 1390000 +
  cycle × 7919), old bites cleared, the network uninfected again.
- Nodes breathe via a closed-form sine pulse. No frame-integrated
  simulation anywhere; every state is a pure function of piece time and the
  recorded bite list.

## Adaptations

- The prompt's infection state machine is implemented closed-form (bite time
  + BFS hop distance), never frame-integrated, so frame one and every later
  frame are reproducible.
- Glow is flat-alpha halos only; no gradients, no shadowBlur, no Path2D, no
  offscreen canvas, no createElement, no AudioContext, no getUserMedia.
  The piece ships fully silent; the prompt specs no audio for this piece.
- No fillText/strokeText anywhere, so no readable text can leak in.

## House rules

- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect h > w*1.15 as fallback.
- Determinism: synchronous first frame at a constant phase via a boot flag
  (frame one = draw(0), clock starts only with the rAF loop, plain function
  declaration behind a typeof guard). All randomness from mulberry32 (seed
  1390000 + index × 7919), never Math.random. Frame one shows the uninfected
  network only, since the QA renderer has no pointer.

## Verification

Rendered at 1280×900, 390×844, and 720×720 and inspected all three; thumb
byte-identical across repeated renders including a final re-verify after
this file was written. Forced-time probe harness (stubbed rAF driving the
piece's own loop, pointer events to its own listeners): frame one 0 red /
0 amber px (uninfected); a center touch flares 2,042 red px at t=1 s,
spreading to 5,725 red px at t=3 s; at t=10 s, 6,856 amber-range px (nodes
settled undead); at t=45 s, 0 amber (faded back); a drag trail at t=50–51 s
flares 3,960 red px; at t=151 s the field shows a visibly different
re-seeded network with 0 red / 0 amber. Token scan clean except one comment
stating Math.random is never used. No fix rounds needed.
