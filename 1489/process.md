# №1489 "Chapter Cards That Heckle" (nadja-ringart NR2, PP735–PP742 study #197)

## Prompt
A broadcast panel of suited figures loops in the background. Over it, homemade
chapter cards slide in one at a time from the right edge: a scarlet card with a
disc, a gold card with a bar, a teal card with a triangle. Each card sticks to
the panel edge for a beat, then slides off, and the scene it interrupted resumes
slightly changed in color. Dragging a card up or down while it is on screen swaps
it with the next card in the queue, and the scene's resumed color follows the
new card's color.

## Build
- Broadcast ground grey #b8bcc0, full frame, with a cream #e8e0d0 panel frame.
  Two rows of five charcoal #2a2a30 suited figures (torso rect, head disc, grey
  mouth line). Each figure's mouth opens and closes on a seeded beat; every
  mouth period (2, 2.4, 3, 4, 6 s) divides the 24 s loop, and mouth widths are
  quantized to integer pixels, so the loop closes exactly.
- Cards as a queue array [scarlet/disc, gold/bar, teal/triangle]. 24 s loop, 3
  slots of 8 s: 1 s slide-in from the right edge, 5 s stuck overlapping the
  panel's right third, 1 s slide-out, 1 s gap. During the gap the scene resumes
  under a 0.15-alpha wash of the departed card's color — the "slightly changed"
  resumed scene. Only one card is on screen at a time.
- Frame one is phase-shifted +3 s into the loop, so it opens with the scarlet
  card arrived and settled over the right third, not on an empty panel.
- Drag: a pointerdown inside the on-screen card starts a drag; on release with
  |dy| >= 40 px, the card swaps with the next card in the queue (queue positions
  slot and slot+1 exchange). The swapped-in card shows immediately, and the gap
  tint after slide-off follows the new card's color. Swaps are recorded as
  {time, slot} events and the queue is recomputed closed-form from the event
  list, so drag state is a function of time and recorded events, never
  frame-integrated. Drag never removes a card, never stops the broadcast, never
  adds text to a card. Never click-to-reload.

## Adaptations
- Cards as a queue array with slide-in/out animation; scene tint as a function
  of the most recent card's color; drag maps pointer y to queue order; card
  shapes drawn as primitives only (disc, bar, triangle in panel-frame cream).
- Distinct from the prior study's margin-card piece (№1483, IW4): there the
  cards were a static margin stack bound to scene indices; here the cards
  interrupt a looping broadcast and retint the scene they interrupted. The
  revisit is by the prompt's own design, not a copy.
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing. No visible
  text except <title>. No fading alphas except the single literal 0.15 tint
  wash (no computed alpha strings, so the node-canvas scientific-notation
  quirk cannot bite). Dots as own-beginPath arcs with moveTo first.
- Determinism: frame one = draw(0) via boot flag, clock starts only with the
  rAF loop (plain function declaration behind a typeof guard); all decoration
  from mulberry32 (seed 1489000 + index x 7919), never Math.random; every
  animation value derives from loop-local time (t mod 24), so the loop closes
  exactly — the №1482 lesson applied from the start.

## Verification (probe harness tmp/probe1489.js, 1280x900)
- t=0 redraw 0 px; t=24 vs t=0 = 0 px; t=48 vs t=0 = 0 px (loop closes exactly).
- Frame one: scarlet card stuck, 108,175 scarlet px, 0 gold, 0 teal.
- t=0 vs t=1 differs by 180 px (mouths live).
- Card cycle: t=8 gold card stuck (118,636 gold px, 0 scarlet); t=16 teal card
  stuck (113,904 teal px, 0 scarlet); one card on screen at a time.
- Gap: t=4.5 scarlet card fully off (0 scarlet px); panel sample at (100,100)
  reads (186,165,169), the scarlet-tinted grey, as expected.
- Drag reorder: down on the card at (1088,450), up at (1088,250) swaps the
  queue [0,1,2] to [1,0,2]; at t=2 the swapped-in gold card shows (118,636 gold
  px, 0 scarlet); the gap tint at t=4.5 then follows gold (sample (189,184,172)).
- Broadcast stays live after drag (t=5 vs t=5.5 differs, card slide + mouths).
- Renders inspected at 1280x900, 390x844, 720x720: desktop shows grey panel,
  cream frame, two rows of five suited figures, scarlet card with cream disc
  overlapping the right third; mobile keeps the same full-bleed composition
  with no clipping. Thumb byte-identical across repeated renders.
- Token scan clean (the single "Math.random" hit is the code comment stating
  it is never used).

## Fix rounds
None needed.
