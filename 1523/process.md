# No.1523 "The Turned Gaze" (bintou-dembele BD4, PP770)

Gallery date: 2006 · 03 · 14 (recorded here only, never drawn in the piece).
Expansion study #201 (bintou-dembele), network chain from clement-cogitore #200.

## Spec (verbatim prompt)

A field of small abstract eye-marks — simple arcs with a dot — arranged in
rows, all looking in one direction at a single standing dancer-mark in the
center. On a slow pulse, the center mark turns its head-arc (a small arc
above its torso line) to look back at the rows; wherever its gaze lands, the
eye-marks in that row briefly look away (their dots slide aside) and then
return. The center mark never leaves; the rows never stop looking.

Palette: field warm grey #d8d2c4; eye-marks ink #26221e; center mark deep
red #8f2d22; gaze line faint gold #c9a86a; shadow #8a8272. No other color.

Composition: center mark small against a wide field of eye-rows; gaze line
thin, drawn only during the look-back; generous empty margins.

Motion: watch-first, gaze loop. Rows stare; every long interval the center
mark looks back at one row, that row looks away for a beat, then resumes.
Dragging on the center mark turns its gaze toward the pointer's row (the
look-back follows the pointer, then resumes its own schedule when
released). Drag never moves the center mark, never removes the rows, never
freezes a look-away.

Technical: canvas 2D. Eye-marks as a grid of arc+dot glyphs with a look
direction; center mark as an articulated glyph with a head-arc angle; gaze
as a line from the center mark to the target row with a radius of
influence; drag maps pointer position to gaze target.

Avoid: realistic eyes, faces, a cage or vitrine drawn around the center
mark, text, a spotlight effect.

Study guard: abstract marks only, no likenesses, no real names, no readable
text anywhere; this piece is about Dembele's mechanism of who looks and who
is looked at, abstract marks only, no literal exhibition.

## Build

- Four horizontal rows of eye-marks (arc + dot glyphs), two above and two
  below the centre mark, left and right of a centre gap the mark stands in.
  On desktop the field is a centred square; on phones it goes full-bleed.
- 60 s gaze loop. Look-back windows start at loop-local 8, 26, and 44 s,
  each 6 s: 1 s turn-in, 3 s hold, 2 s turn-out. The target row for each
  window comes from a mulberry32 stream seeded by the loop index
  (seed 1523000 + loop * 7919), so every loop index is reproducible and
  the frame at loop-local 0 never depends on the loop index.
- By default every dot is offset toward the centre mark (staring at it).
  While a row is looked back at, its dots slide to the opposite side of
  their stare direction — the row looks away — and return as the envelope
  falls.
- The gaze line is a thin faint-gold line from the head's edge to the
  target row's centreline, drawn only while a look-back envelope is above
  zero. The head-arc tilts with the gaze (see Deviations).
- Drag: pressing within 70 * scale px of the centre mark starts a hold;
  while held, the gaze follows the row nearest the pointer's y; for 1 s
  after release the gaze decays, then the schedule resumes. All drag state
  is closed-form over recorded sessions and piece time, never
  frame-integrated, and a session's effect never recurs at a later loop
  wrap.
- Frame one = draw(0): rows staring, no gaze line, head-arc level.
- Fully silent. No visible text except the title.

## Deviations / reconciliations

- Head-arc turn convention (the prompt does not specify the turn geometry):
  the head-arc is an arc above the torso line whose midpoint angle tilts
  by up to 0.5 rad, tipped one way for a row above the centre and the other
  way for a row below, scaled by the gaze envelope. The gaze line and the
  row look-away carry the mechanic; the tilt marks it on the head.
- Drag row convention (the prompt says the gaze follows the pointer's
  row): the target row is the row nearest the pointer's y at each recorded
  pointer position.
- Look-away geometry (the prompt says dots slide aside): the dot slides to
  the opposite side of its stare direction, i.e. away from the centre mark,
  which is the natural reading of a row looking away from the mark it was
  staring at.
- Radius of influence: the whole target row looks away, per the prompt's
  "the eye-marks in that row briefly look away".
- No other deviations. Canvas 2D throughout; closed-form motion only;
  flat-alpha-free solid colours (the gaze line uses a rounded 4-decimal
  alpha ramp, no gradients); dots as filled rects; arcs each in their own
  path with a moveTo to the arc start.

## QA (probe-1523.js, vm-style harness driving the piece's own rAF loop)

All probes pass: frame one identical across fresh instances; loop closure
at t=60 and t=120 vs t=0 byte-identical; frame-one dots at stare positions
with nothing at away positions and no gaze line; scheduled hold shows the
gaze line, the target row's dots at away positions, other rows still
staring; after the window the gaze line is gone and dots return; centre
mark present and unmoved at t=30 with eye ink preserved (1720 -> 1714
exact pixels); drag turns the gaze to the pointer's row without moving the
centre mark, release clears the gaze and returns the dots, and the schedule
resumes at the next window; the same drag sequence is byte-identical
across fresh instances. Thumb re-rendered twice, both byte-identical to
the shipped thumb. Forbidden-API grep clean (0 hits).

Fix rounds: none to the piece. One probe-side correction only: dot-box
thresholds adjusted after pixel inspection showed the 4 px dot's exact core
is 3x3 and sits ~1 px off the computed centre, so a 7x7 box around the away
centre clipped the stare dot's edge; boxes narrowed to 5x5 with
present >= 6 / absent <= 3 thresholds. The piece was untouched.
