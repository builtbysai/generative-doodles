# №9072 · Well - process notes

## Concept
Nested squares, 30 to 39 of them, each smaller and turned a little
further than the one outside it, so the eye falls down a twisting shaft.
The twist per step is constant for a seed; the total twist across the
stack is the measured property. Squares are stroked in ink on bone; one
square in the middle third of the stack is vermilion and drawn heavier.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 9072. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing per the standing rule.
- Sizes shrink geometrically (factor 0.90 to 0.935 per step) from a
  half-side of 0.44 of the square; the center drifts at most 0.01.
- Compositional safety: total twist is gated to 25 to 70 degrees,
  signed either way, because below 25 the shaft reads as a stack of
  frames and above 70 it dissolves into a star.

## Differentiation
- vs No.9066 (Undertow): wobbled rings, filled with interference bands,
  in teal on bone. Well is straight-edged, stroked only, and its motion
  is a constant rotation, not a field.
- vs No.9068 (Quarry): filled irregular decagons, mineral palette, one
  irregular center. Well repeats one exact square; its only variation
  is size and angle, plus the single vermilion level.
- Family name: "constant-twist square shaft".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected at each size before pushing. Mobile letterboxes the square
  correctly; hint legible.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `9072/index.html`, `9072/thumb.png` (720x720, rendered from the live script), `9072/process.md`. Gallery index updated with the №9072 entry.
