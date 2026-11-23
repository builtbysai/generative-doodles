# №1437 "The Copy Shop" (nikolaus-utermoehlen NU6, PP660)

A copy-shop counter in miniature. A found motif enters left, passes three
small plain machine boxes, and marches right as a row of ten pinned copies —
each copy slightly larger and more distorted than the last, recoloured by a
mathematical permutation, until the tenth is unrecognizable as the first.
The set of ten copies, pinned in a row, is the picture.

## Frame one (t = 0, boot flag)

Counter-dark ground. Top-left: the source motif panel (postcard landscape,
unpermuted). Next to it, three small plain grey machine boxes with arrows
between them and three small dial circles above (tick marks only, no words).
Below: ten tall pinned copy cards in a row, each holding a landscape print
recoloured and distorted by its position in the chain — permutation colours
cycling identity, red push, blue push, inversion, channel swap, gold push,
violet push; tilt and scale growing left to right. Bottom strip: the
pinboard, holding the last three retired copies as small faded prints.
No visible text besides `<title>`. Nothing is full-size; the smallness of
the counter is the subject.

## Mechanics (all closed-form over piece time and recorded events)

- Chain schedule: one new copy every 8 s. The row is a queue of the last
  ten outputs (serials N−9…N). When a new copy drops in, the row shuffles
  (older cards animate one step left over 0.8 s) and the oldest copy fades
  to the pinboard strip, which holds the last three retired copies at 0.28
  alpha. The initial segment is phase-shifted (t0 = −4) so frame one sits
  mid-slot, settled, never mid-animation.
- Per-copy parameters are seeded (mulberry32, seed 1437000 + serial·7919):
  permutation mode (serial mod 7), rotation, jitter, vertical squash. The
  permutation parameters drift as the serials advance: one pass pushes red,
  the next pushes blue, the next inverts, and so on. No copy is only a
  worse version of the original — each is a distinct permutation.
- Drag a copy into the machine zone (top strip): the chain re-feeds from
  that copy with new parameters — a new chain segment starts at that time,
  with the dragged copy's motif and a fresh seed base. The row regenerates
  from the re-fed copy.
- Drag the source motif panel (moved > 20 px): the chain swaps in a
  different found source — motif cycles landscape → plate → toy ball →
  magazine cut — and restarts from the new motif.
- The whole never resolves: no single finished copy is presented as the
  work, no panel explains the set, no corrected or blended state exists.

## Adaptations

- Motif library (landscape, plate, toy ball, magazine cut) drawn from a
  palette object, so each copy's colour permutation is a pure function over
  the palette — no offscreen canvas, no hidden filter, no slider panel.
- Permutation dials are marks (circles with one tick), never labels.
- Fully silent (no AudioContext, no getUserMedia); no gradients, shadowBlur,
  Path2D, createElement, fillText/strokeText.
- Node-canvas quirks: fading alphas rounded to 4 decimals before
  stringifying; dots as filled rects or own-beginPath arcs.
- Phone: the row wraps to 2 rows × 5 columns, full-bleed, no clipping;
  canvas sized from the Visual Viewport API, pinned in draw(), phone
  detection via window.screen with aspect fallback.
- Determinism: frame one = draw(0) via boot flag; the rAF clock anchors on
  the first callback (plain function declaration behind a typeof guard);
  all randomness from mulberry32, never Math.random.

## Verification (forced-time probe harness, stubbed rAF + pointer events)

- Two fresh instances byte-identical at t = 0 (0 px diff).
- t = 0 vs t = 3.9: 0 px diff (settled within a slot, no unintended motion).
- t = 0 vs t = 5: 160,151 px differ (row advanced past the t = 4 slot
  boundary; shuffle + new copy visible).
- Pinboard strip holds faded copies (93,584 non-background px at t = 0).
- 10/10 row cards carry motif pixels at their centre columns; phone layout
  5 × 2 with 10/10 cards carrying motif pixels, no clipping at 390 wide.
- Refeed: dragging a row copy into the machine zone adds a second chain
  segment; at t = 20 the frame differs from control by 162,334 px.
- Source swap: dragging the source panel adds a second segment with motif
  1 (plate); at t = 20 the frame differs from control by 178,917 px.
- Thumb byte-identical across repeated renders, including a final re-verify
  after the last fix.

## Fix rounds (2, both composition)

1. Motif first drawn stretched to the full card height with large rotations
   (up to ~34°), reading as flags rather than prints. Rebuilt as a centred
   tall print with rotation capped (~8.5° max) and scale growth 0.88→1.06.
2. Motif first drawn as a small square lost in the tall card. Resized to a
   tall print (0.84 card widths × up to 1.7× that in height), filling the
   card while staying inside it. All renders re-done after each fix.
