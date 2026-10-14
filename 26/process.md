# №26 · Fan - process notes

## Concept
All lines share one origin at a corner of the field. Their far ends
land on the two far edges, spaced by a seeded easing curve, so the
fan crowds toward one edge and opens toward the other. Each fan line
is cut at two seeded fractions of its own length; the cut points,
joined across the fan, trace two smaller corner frames in gold, and
the fan resolves into nested homothetic bands rushing toward the
bright corner.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 26. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style; field
  full-bleed on phones via the screen check, square on desktop.
- 90 to 130 fan lines; origin corner, easing exponent (0.55 to 1.45)
  and band fractions all seeded.

## Differentiation
- vs No.14 (Burst): rays from an interior origin, length varying by
  angle, reaching outward unevenly. Fan's origin is the corner
  itself, every line ends on the boundary, and the structure is the
  bands, not the lengths.
- Family name: "corner fan with homothetic bands".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `26/index.html`, `26/thumb.png` (720x720, rendered from the live script), `26/process.md`. Gallery entry appended at the end of page3.html with the formula date.
