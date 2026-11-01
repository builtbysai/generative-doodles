# №1483 "The Margin Talks Back" (ioana-wieder IW4, PP727–PP734 study #196)

## Prompt
A broadcast panel fills the upper frame: rows of suited abstract figures making
pronouncements (mouth lines opening and closing). From the right margin, small
annotation cards slide in, one at a time, and stick to the edge of the broadcast
panel: a scarlet card, a gold card, a teal card. Each card carries only a simple
shape (a disc, a bar, a triangle), never text. Broadcast panel left two-thirds,
margin strip right one-third; cards stack vertically in the margin in arrival
order; each card overlaps the broadcast edge slightly, like a footnote pinned to
a page. Watch-first with drag-to-reorder: the broadcast loops; cards arrive on a
timer; dragging a card up or down reorders the margin stack, and the card's shape
pulses once when it settles. If the broadcast's scenes are reordered (drag a
scene, as in IW2), each card stays stuck to its own scene. Drag never removes a
card and never silences the broadcast.

Palette (exact, no other color): broadcast grey #b8bcc0, suits charcoal #2a2a30,
backdrop teal #2e6f6a, cards scarlet #c1272d, gold #d9a441, teal #2e6f6a, margin
cream #e8e0d0. Card shapes are drawn in margin cream, a palette color.

## Build
- Broadcast: teal backdrop with a grey floor band, two rows of five charcoal
  suited figures (head circle + torso rect + grey mouth line). Each figure's
  mouth opens and closes on its own seeded beat.
- Margin: cream strip, right one-third. Three cards (scarlet/disc, gold/bar,
  teal/triangle), each overlapping the broadcast edge by 14% of the margin width.
- Card cycle: 30 s. Cards slide in at cycle times 4 s, 10 s, 16 s (1 s ease each)
  and slide back out together at 28–30 s, so the loop closes exactly. Frame one
  is phase-shifted +20 s of the cycle, so it opens with all three cards arrived
  and settled rather than on an empty margin.
- Cards as objects bound to scene indices, not screen positions: scarlet/disc is
  bound to scene 0, gold/bar to scene 1, teal/triangle to scene 2. The margin
  stack order is a render order only; reordering never changes a card's scene
  binding. The broadcast scene order array is fixed in this piece (IW4 specs no
  scene drag; IW2's scene drag is a conditional reference), so the binding is
  structural: a reorder of scenes would carry the cards with their scenes.
- Drag: pointer down on an arrived card grabs it; dragging past a neighbouring
  slot's centre swaps it in the stack order; release animates it to its slot
  over 0.4 s, then its shape pulses once (scale 1 + 0.35·sin over 0.6 s). Drag
  never removes a card, never silences the broadcast, never restarts anything.
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing. No visible
  text except `<title>`. All fills opaque; dots as own-beginPath arcs with
  moveTo first (node-canvas quirks).
- Determinism: frame one = draw(0) via boot flag, clock starts only with the
  rAF loop (plain function declaration behind a typeof guard). All figure beats
  from mulberry32 (seed 1483000), never Math.random. Mouth periods are 30/k for
  k in {10, 12, 15, 18, 20}, so every mouth period divides the 30 s cycle and
  the whole frame closes exactly; mouth widths are quantized to integer pixels
  so float noise at the cycle boundary cannot flip a pixel.

## Fix rounds
1. Loop-closure fix: the first build used free mouth periods (1.6–2.4 s), so
   t = 30 differed from t = 0 by 396 px. Mouth periods now divide the 30 s cycle
   and widths are quantized; the probe confirms t = 30 vs t = 0 = 0 px.
2. Mobile figure size: the first 390×844 render showed undersized figures
   (unit from min dimension alone). The figure unit is now
   min(W×0.085, H×0.06), so phones stay legible without changing desktop.
   All renders re-done after each fix.

## Verification (forced-time probe harness, vm-isolated instance, real
node-canvas, piece driven via window.__piece; harness at tmp/probe1483.js)
- t = 0 redraw 0 px; t = 30 vs t = 0 = 0 px (loop closes exactly).
- Frame one: scarlet 44,896 px, gold 48,084 px, teal 637,990 px (cards present,
  broadcast live); t = 0 vs t = 1 differs by 412 px (mouths live).
- Card arrivals: t = 13 (cycle 3, all slid out) scarlet 0 px; t = 16 (cycle 6,
  card 0 arrived) scarlet 44,896 px, gold 0 px (card 1 still out).
- Drag reorder: order [0,1,2] → [1,0,2] after dragging card 0 to the middle
  slot; scene binding of card 0 stays 0 after the reorder; settle→pulse frame
  diff 4,678 px (shape pulses once); post-drag mouth motion still live
  (428 px across 0.5 s), so the broadcast is never silenced.
- Token scan clean (the single "Math.random" hit is the code comment
  "never Math.random"; no fillText/strokeText, AudioContext, getUserMedia,
  createElement, Path2D, shadowBlur, or gradient calls).
- Renders inspected at 1280×900, 390×844, and 720×720; thumb byte-identical
  across repeated renders including a final re-verify after the fixes.
