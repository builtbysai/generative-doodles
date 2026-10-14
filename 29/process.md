# №29 · Eclipse - process notes

## Concept
Concentric rings drawn from a center that will not sit still: as
the radius grows, the ring centers drift along a short seeded
segment, so the rings bunch on one side and stretch on the other,
like ripples from a moving source. Same rings, same single charcoal
ink on cream: the drift is the only deviation from a target.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 29. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style.
  Centered composition on cream.
- 30 to 40 rings; drift 10 to 20 percent of the radius span along a
  seeded direction, applied in proportion to ring size so the heart
  stays coherent.

## Differentiation
- vs No.9066 (Undertow): ring edges wobble under a flow field there.
  Eclipse rings are perfect circles; only their centers move.
- Family name: "drifting-center rings".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `29/index.html`, `29/thumb.png` (720x720, rendered from the live script), `29/process.md`. Gallery entry appended at the end of page3.html with the formula date.
