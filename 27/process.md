# №27 · Moons - process notes

## Concept
A grid of moons, one per cell, each a full disc cut by an offset
shadow disc in the page's own black, so only a crescent or gibbous
sliver survives. The phase advances across each row; rows are offset
by a seeded amount, so the grid runs the full cycle several times.
The shadow always comes from the same side: one sun for the whole
sky. Cream on near-black.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 27. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style.
  Centered composition on near-black.
- 9x9 moons; shadow offset follows |2phase - 1| and flips side at
  the cycle's midpoint, giving true waxing and waning halves.

## Differentiation
- vs No.13 (Pack): flat discs placed by collision rules. Moons are a
  fixed grid; the figure is what the shadow removes.
- Family name: "phase grid moons".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `27/index.html`, `27/thumb.png` (720x720, rendered from the live script), `27/process.md`. Gallery entry appended at the end of page3.html with the formula date.
