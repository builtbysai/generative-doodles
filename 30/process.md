# №30 · Maze - process notes

## Concept
A perfect maze from a recursive backtracker: every cell visited,
walls knocked down only by the carving rule, no loops, exactly one
path between any two cells. Drawn as walls in charcoal on cream,
with the single solution from corner to corner traced underneath in
vermilion. The maze is the rule made visible; the solution is a
fact about it, not a hint.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 30. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style.
  Centered composition on cream.
- 22x22 cells; the solution path is recovered from the carver's own
  parent map, so it is provably the unique route.
- No composition gate is needed: the backtracker guarantees a full
  spanning tree for every seed.

## Differentiation
- vs No.9076 (Quarter Turn): truchet tiles whose arcs imply paths
  that go nowhere. Maze's path is real, unique, and drawn.
- Family name: "backtracker maze with solution".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `30/index.html`, `30/thumb.png` (720x720, rendered from the live script), `30/process.md`. Gallery entry appended at the end of page3.html with the formula date.
