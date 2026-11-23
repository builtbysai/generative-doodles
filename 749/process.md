# №9060 · Hundred - process notes

## Concept
After Hobbs's long-form thinking: the edition is the work. A good algorithm
should produce a wide range of outputs that each hold, so this piece is a
fixed edition of exactly one hundred prints, not an open-ended randomizer.
Click walks the edition in order (wraps at 100); ?seed=N jumps to print N;
the counter shows where you are. The grammar is strict on purpose: one
anchor shape on a jittered third-point, two to five satellites placed with
collision checks and real margins, one probabilistic four-color palette
(ink, vermilion, ochre, slate) on paper, filled and outlined shapes, rare
traits the way a trait table has rare rows (a vermilion thread-line at 10%,
a single dot at 8%).

## Construction
- Single self-contained page, canvas 2D, no libraries. Edition n uses
  mulberry32(9060000 + n), so the edition is fixed and reproducible.
  Default print: №1.
- Shapes: disc, thick quarter-arc, rounded bar, half-disc. Anchor is large
  (S*0.15-0.225); satellites come in three shrinking tiers (S*0.13, 0.095,
  0.062) with 60 placement tries each, so every print composes.
- Collision: bounding circles with S*0.022 padding. Bounding radius
  accounts for stroke extent (arcs reach 1.32r with their thick stroke),
  which fixed an early bug where arc strokes visually overlapped neighbors
  their circle-test had cleared.
- Palette weights: ink 0.34, vermilion 0.24, ochre 0.22, slate 0.20.
  Anchors filled 72% of the time, satellites 60%; the rest are outlines.
- Paper ground #ece3cf, 2500 grain speckles, 9% margins all around.

## Iteration
- v1: contact sheet of prints 1, 17, 37, 60, 83. Two prints showed arc
  strokes overlapping neighboring shapes. Root cause: bounding circle used
  the arc radius, not the stroke extent. Added per-kind bounding radii.
- v2: re-rendered 17 and 37 clean; no overlaps anywhere in the sheet.
- Default print chosen from the sheet: №1 (two bold discs, three
  satellites, balanced) reads best at thumbnail size.

## Differentiation
Checked against built pieces. No geometric print-edition piece exists in
the gallery; nothing uses the fixed-edition walk mechanic or the
anchor-plus-satellites grammar. Concept family: "fixed geometric edition,
probabilistic palette, rare traits." The mechanic itself (the series as
the piece) is the Hobbs homage, not any visual quote.

## QA log
- console-doodles.js: zero console/page errors at 1280x900 and 640x900,
  six prints sampled.
- Rendered headless; actual pixels inspected for prints 1, 17, 37, 60, 83
  and re-renders of 17/37 after the collision fix.
- Click-to-advance and ?seed= jump verified; counter updates; wraps
  100 to 1.
- Responsive: full-viewport canvas + resize; holds at mobile widths.
- thumb.png: 720x720 crop of the square from the live render.
- Visible copy check: no em dashes, no date strings, no absolute URLs.
