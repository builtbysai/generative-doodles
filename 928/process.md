# No.928 "A Week of Checking the Time"

Study #114 stefpos, PP89 "A Week of Clocks" (Dear Data Week 01).

## Concept

A mailed postcard, not a rendered chart. The front carries one week of
time-checks as hand-drawn wobbly arrows in seven day columns; the back
carries the legend in the same pencil, squeezed next to a stamp, a
postmark, mail scuffs and a coffee ring. The card sits at a 1.5 degree
tilt on a dark postal sleeve. The week draws itself day by day; nothing
appears all at once.

Encoding, exactly as specced:

- Arrow length = the hour of the check (hour 0-23 mapped to a length range).
- Arrow direction = why: up = appointment, right = boredom,
  down-left = anxiety about being late ("running late" in the legend).
- Arrow color = device: red tablet, blue laptop, violet phone.

## Construction

- Single canvas, card-local coordinate system. Each frame: fill the
  sleeve, translate to center, rotate 1.5 degrees, apply the flip
  scaleX, draw the card base (stock fill, pencil edge wear), then the
  shown side.
- The log is synthesized per generation by mulberry32 (seed
  92889 + gen * 7919): 7 days of 5-14 checks each. Hours come from a
  weighted table with a morning hump (peak near 8:30) and extra weight
  on pre-meeting slots (9, 11, 13, 15, 17); device mix phone 60 /
  laptop 25 / tablet 15; why mix appointment 35 / boredom 45 /
  anxiety 20. Each week also picks two (day, daypart) gaps that are
  left honestly empty. Checks are sorted by hour inside their day and
  stacked in 14 row slots per column.
- Arrows are 5-point wobbly polylines: perpendicular jitter comes from
  per-check seeded values stored in the log, so the same week always
  wobbles the same way. A second stroke pass at 0.6 px offset and 35
  percent alpha gives the graphite grain. Arrowheads are two short
  strokes at the tip.
- Stay-on-card rule: an arrow first shifts its origin so the full
  encoded length fits inside the card and below the header band;
  length is clamped only as a backstop. (First QA pass had Monday
  down-left arrows escaping the card's left edge; fixed by the shift,
  then verified on all three renders.)
- Draw-in: a 69 s loop (60 s draw, 8 s hold, 1 s gentle clear fade).
  Day d owns a 60/7 s window; each arrow strokes in over 0.4 s in log
  order. The cycle clock starts at an offset of 21 s, so frame one
  opens with Monday and Tuesday complete and Wednesday about half
  drawn (21 / (60/7) = 2.45 days).
- Flip: tap matures after a 0.35 s window (so a second tap can become
  the double-tap). During the 0.6 s flip, scaleX follows cos(pi * p)
  and the shown side swaps at the edge-on moment, with a slight skew
  for the paper bend. Never a fade.
- Smudge: drag segments are stored in card-local coordinates with
  timestamps; arrows near a segment are pushed along its direction
  with a Gaussian falloff and a decay of about 3 s. Closed-form over
  the recorded segments.
- Double-tap: generation increments, the card returns to the front,
  and the draw clock restarts at cycle time 0, so the new week draws
  from scratch.
- Sound (first pointer gesture only, lazy AudioContext, all uses
  typeof-guarded): a short bandpassed noise tick as each arrow
  completes its stroke-in, and a longer noise swish on flip. The
  piece renders complete in silence.
- Text: "Week 01", the day initials M T W T F S S, and the back-side
  legend labels only. Letters are drawn one by one with seeded
  per-letter offsets and rotations (hand-lettered feel) in a plain
  cursive-leaning font stack.
- House rules kept: Visual Viewport sizing with resize listeners on
  visualViewport and window, canvas CSS size pinned in draw() every
  frame, phone detection via window.screen with the aspect fallback,
  no gradients, no shadowBlur, no ctx.filter, no offscreen canvas,
  no Date.now for drawn state; frame one is the synchronous draw(0).

## QA log

- Rendered with render-piece.js at 1280x900, 390x844 and 720x720.
- thumb.png rendered twice and compared with cmp: byte-identical
  (determinism gate passed; duplicate deleted). Re-verified after
  the stay-on-card fix.
- Desktop and thumb, frame one: cream postcard tilted on the dark
  sleeve, "Week 01" header, seven day columns, first 2.5 days filled
  with wobbly red, blue and violet arrows of varying lengths pointing
  up, right and down-left. Nothing crosses the card edge.
- Mobile: whole card visible in the tall frame, columns and arrows
  legible, header intact, nothing clipped.
- Back side checked via a temporary side=1 copy (deleted after):
  legend glyphs and labels in pencil, device arrows in their colors,
  "length = the hour" rule, orange stamp with wavy lines, gray
  postmark ring overlapping it, coffee ring bottom-right, faint
  scuffs. All on-card.

## Deviations

- Sleeve tone: the brief left the page ground open between pencil
  variants; the build uses #1A1A1A, the pencil ink's dark sibling,
  recorded here and in the code. It is the only color beyond the
  specced palette.
- Legend wording uses the brief's own short label "running late" for
  the anxiety direction.
- A completed week holds 8 s, then clears with a 1 s fade into the
  redraw, rather than an instant clear, to keep the loop gentle.
