# №1445 "The Contract, Read Aloud" (kathe-kruse KK6, PP676)

## What it is
A plain wooden table fills the lower half of the frame; on it lies a long
paper contract, slightly angled (about -1.5 degrees, handled, not aligned),
its dense lines of small type running down the page. A single stylized hand
rests beside the paper — no figure, no body. The top of the frame is empty
warm gray wall; nothing else is on the table. Line by line, one line of the
contract lifts slightly off the page and glows warm amber, as if being read
aloud, then settles back. At the page's end the reading returns to the top
and begins again: a contract that is never finished being read.

## Palette (verbatim from the prompt)
Table wood #7a5a34, wood grain dark #5a3a1a, paper #f2ead8, type charcoal
#2a2a2a, reading glow warm amber #e8b83a at low alpha, shadow #4a3822,
wall warm gray #cfc8bc. The hand is a plain warm beige (#c9a184), a
stylized resting shape, not a palette color — the prompt specs a hand but
no skin tone.

## Motion and interaction
- Slow continuous loop: the reading line advances one line per ~2 s
  (25 lines on desktop, so a 50 s page cycle), each line lifting ~4 px with
  a soft shadow and an amber glow overlay, then settling.
- Drag down the page advances the reading line under the finger; drag up
  moves it back; releasing re-anchors the slow read at the dragged line
  (the anchor is recomputed from the recorded drag line, never
  frame-integrated). No click-to-reload, no fast scroll, no body in frame.

## Adaptations (briefed, all applied)
- Contract type is pseudo-type only: short charcoal dashes of seeded
  varying length, never legible words, never lorem ipsum.
- The "read aloud" is visualized, not heard: the piece is fully silent
  (no AudioContext at all). The lifting, glowing line is the reading.
- The hand is a simple stylized shape (palm rect, four finger rects,
  thumb rect), resting still, placed beside the paper on wide frames and
  below the paper on narrow frames so nothing overlaps or clips.
- Study rule "let the rule leak": rows carry a seeded ±0.8 px wobble and
  per-dash length jitter, stable every loop, never flickering.

## House rules applied
- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() with style
  width/height in px.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect h > w*1.15 as fallback; centered composition keeps its shape,
  page ground takes the wall color; checked at 390 wide with no clipping.
- Determinism: synchronous first frame at a constant phase via a boot flag
  (frame one = draw(0), clock starts only with the rAF loop); all
  randomness from a seeded mulberry32 PRNG (seed 1445000) plus stable
  per-(line, dash) hashes, never Math.random.
- rAF loop as a plain function declaration behind a typeof guard.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, getUserMedia, or text drawing; fading alphas are literal
  fixed decimals; dots/dashes are filled rects (node-canvas quirks).

## Verification
- Rendered with node ~/workspace/tools/render-piece.js at 1280x900,
  390x844, and 720x720; all three inspected. Desktop: wall above, table
  below, angled paper with dense dash rows, amber reading line on the top
  row at frame one, hand beside the paper. Mobile: same composition,
  paper near full width, hand below the paper, no clipping.
- Thumb byte-identical across repeated renders.
- Forced-time probe harness (vm-isolated instance, stubbed rAF driving the
  piece's own loop, pointer events to its own listeners): t=0 redraw
  pixel-identical; reading-line amber band centroid moves +13 px per 2 s
  step (line 0 at t=0, line 1 at t=2, line 2 at t=4, line 10 at t=20);
  at t=50 the band returns exactly to line 0 (50 s page cycle wraps);
  drag to line 10 then line 15 moves the band to those rows; after release
  the slow read resumes from the dragged line (line 15 at t=6, line 16
  at t=8).
- Token scan clean (the single "Math.random" hit is a comment stating it
  is never used). No fix rounds needed.
