# Doodle №8988: Pen Travel (2026-08-20)

**File:** `8988/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
A plotter draws text one stroke at a time, in pen order, lifting between
strokes. This piece typesets your words in real Hershey single-stroke
letterforms (roman simplex, embedded as 95 glyphs of vector data) and draws
the part of the job that is usually invisible: the pen-up travel. Every
lift becomes a dotted red arc, a quadratic bezier from the end of one stroke
to the start of the next, so the empty air between letters is drawn with the
same care as the ink. A small readout totals it up: for the default phrase,
55% of the journey is empty.

## Technique synthesis (from study, not copied)
From the Hershey stroke-font study: JHF is a list of polylines per glyph
with explicit pen-up separators, coordinates relative to 'R'. Kept the
format knowledge and the roman simplex letterforms; the travel-line idea,
the arc rendering, the pen-order animation, and the ink/air accounting are
the piece's own. The study's triplex-R pen-up travel map was the direct
seed: what if the travel map IS the composition.

## Interaction
Type anything (A-Z, 0-9, basic punctuation) and press Draw, or hit Enter.
The pen nib draws every stroke in order, arcing red through the air between
them, then rests on the full composition. A checkbox toggles the travel
lines to compare the text with and without its shadow journey.

## Details
- Word-wrap with unit-scale measurement, then a fit pass scaling to the
  stage. Cap height stays honest at any viewport.
- Travel arcs lift perpendicular to the chord, proportional to distance,
  so long jumps arc high and short hops stay low.
- Stats are computed in the same coordinate space as the drawing, so the
  ink/air ratio is a true property of the typesetting, not an estimate.
