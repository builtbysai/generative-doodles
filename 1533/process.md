# №1533 "Coins With the Wrong King" (mohamed-bourouissa MB6, PP780)

Gallery date 2006 · 03 · 24 (recorded here only, never drawn in the piece).

## What it is

Dark plum-black field (#17141c) with a pale table line across the lower
quarter. Twelve small discs fall like leaves from the top, land on the line,
flip, and stack in a neat row never taller than two discs. A falling disc is
gold (#c9a86a) carrying a simple abstract face-glyph (a circle with two ink
dots, #26221e, no likeness, no features). On landing it flips to silver
(#d8d8d8) with a star-burst mark. Occasionally a disc lands face-down and
stays dark (#2a2530) until another disc lands on it in the same column,
flipping them both. When the row fills, the oldest flipped disc lifts off
and rejoins the fall.

## The slot model (how the loop closes exactly)

180 s loop, three 60 s clusters per loop. Twelve slots: 6 columns x 2 rows.
Slot j < 6 is the bottom row, column j; slot j >= 6 is the top row, column
j - 6. Every slot lands once per cluster: loop-local landings at 10 + 1.5j
+ 60k seconds (k = 0, 1, 2), so landings inside a cluster run bottom row
first, then top row. Each landed disc stays stacked exactly 30 s, then lifts
and rises back to the top in time for its next cluster fall. Because every
stacked duration is equal, lift order always follows landing order: when
the row is full (12 stacked, about 13 s per cluster), the first disc to
lift is the oldest stacked disc, and it rejoins the fall at the next
cluster. Frame one is phase-shifted 20 s into the loop (loop-local 20 s):
the bottom row is complete, the first top disc has landed, the remaining
discs are still falling.

Face-down: per bottom-slot landing, a seeded bit (mulberry32, seed
1533000, about 25%) makes the disc land dark. It stays dark until the top
disc in the same column lands 9 s later, which flips them both (the bottom
disc turns silver/starburst; the top disc lands flipped as usual). Top-row
landings are never face-down: nothing lands on them.

Falling discs sway like leaves: horizontal sway is a seeded sine with a
whole number of cycles per loop, fading to zero at landing so the disc
meets its slot exactly, and growing again as it rises.

## Interaction (all closed-form over piece time and recorded events)

- Dragging on a falling disc speeds or slows its fall: while the pointer
  is down on a falling disc, vertical pointer movement sets a rate
  multiplier (down to 2.5x, up to 0.25x, never zero, so the fall never
  stops). Fall progress is the closed-form integral of the recorded move
  events; on release the disc continues at base rate from its progress.
  If a slowed landing leaves too little return time, the disc skips one
  scheduled fall and rejoins at the following one. Dragging affects only
  that disc.
- Dragging a stacked disc lifts it back into the fall, unflipped: on a
  drag (movement over 5 px, or release) the disc leaves its slot, rises
  quickly to the top, and falls again gold with the face-glyph, landing in
  its own slot and flipping again. The lift is recorded as an event; the
  extra trip rejoins the schedule at the next fall start with enough
  return time, skipping one scheduled fall if needed. Other stacked discs
  are untouched, so a drag never clears the row.
- Drag never stops the fall, never empties the row, never adds a disc.
  Pointerdown tests falling discs before stacked discs where they overlap.
- No audio of any kind. No visible text except the title element.

## House-rule adaptations

Canvas 2D only; fixed-phase first frame; rAF loop as a plain function
declaration; every animation sine on loop-local time; seeded mulberry32
only, never Math.random; flat colors only, never gradients; fading alphas
rounded to 4 decimals; dots as filled rects; disc bodies as single arcs in
their own beginPath; starbursts as lines with an explicit moveTo each;
canvas state (fillStyle, strokeStyle, lineWidth, lineCap) set explicitly
before every draw op, since state persists across draw() calls; viewport
from the Visual Viewport API with the canvas pinned in draw(); phone
detection via window.screen with aspect fallback; field-like layout, so
full-bleed on phones and a centered square on desktop over the same
ground color. Probe-only hook window.__t33 exposes disc states, the field
rect, the table line, and the radius; it draws nothing.

## Title note

This title matches gallery piece №9113 at the newest end by the other
agent. It ships verbatim as specced; neither piece is renamed.

## QA (probe-1533.js, vm-isolated, real node-canvas, all pass)

- Frame one identical across fresh instances; loop closure at t=180 and
  t=360 byte-identical to t=0.
- States valid at every 0.5 s sample over [0, 180]: 12 discs, finite
  positions, phases only fall/stacked/return/rise.
- Slot 11 falling gold at t=0, lands at t=6.5, stacked silver after, with
  silver pixels at the slot and the disc on the top row.
- Row fills to exactly 12, never more; every stacked disc sits on one of
  the two rows.
- Full-row test: with all 12 landings tracked, the first lift after the
  row fills is the oldest stacked disc.
- Face-down test: a dark stacked bottom disc flips to silver, and a top
  landing in the same column falls between the dark start and the flip.
- Falling-disc drag: a down-drag lands earlier than control by over 1 s,
  an up-drag lands later by over 1 s, another falling disc's landing is
  unchanged in both cases, and an up-dragged disc keeps moving (never
  stops).
- Stacked-disc drag: the dragged disc leaves the row gold (rise/fall
  phase), the previously stacked discs stay stacked, and it re-lands in
  its slot flipped silver again.
- Determinism: identical drag sequences byte-identical at t=10 and t=30.
- Thumb byte-compare: two independent 720x720 renders byte-identical to
  the shipped thumb. Forbidden-API grep: 0 hits. Fully silent.

## Fix rounds (2 piece fixes, both caught by probes)

1. Truncated-trip stale return: after a drag-lift truncated a stacked
   trip, the trip's old return window still matched times after the lift,
   so the lifted disc read as "return" instead of "rise" at t=0.5. Fix:
   truncation now also sets returnEnd to the lift time, leaving an empty
   return interval.
2. Delayed-landing phase boundary: a slowed disc whose progress was under
   1.0 at the base landing time was reported stacked at exactly that
   time, because the trip still carried the base landing. Fix: the fall
   phase test now also holds while the computed progress is under 1.0, so
   a drag-delayed disc stays falling until its true landing. (Proved by
   an independent harness check: a slowed disc's y lagged control by
   about 105 px at t=59.5 and landed at about 63.5 instead of 60.5.)

Probe-side corrections (not piece changes): the fall-start detector now
finds the true return-to-fall transition instead of the first falling
sample after t=55, and the stacked-lift check now asserts the previously
stacked discs stay stacked rather than an exact count (a new disc can
legitimately land in the same sample window).
