# №14 · Burst - process notes

## Concept
Radial hairlines from a single off-center origin on near-black.
Every ray's length is set by one angular function (two layered sines
plus seeded jitter), so the burst swells and pinches around the
circle instead of exploding evenly. Warm white throughout, except the
contiguous sector where the function peaks, which is gold.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 14. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style; field
  full-bleed on phones via the screen check, square on desktop.
- 330 rays; length reaches the farthest corner of the field so long
  rays can bleed off the edges on the swollen side.
- Compositional safety: the function's peak must exceed 0.88 and the
  gold half-band stays under 0.34 radians, so the gold reads as a
  wedge, not a flood. The peak angle is found by sampling 720 angles
  per candidate seed.

## Differentiation
- vs No.9077 (Compass): needles of fixed length on a grid, rotated by
  an angle field. Burst's marks all share one origin and vary in
  length, not angle; the origin is the composition.
- Family name: "angular-function radial burst".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `14/index.html`, `14/thumb.png` (720x720, rendered from the live script), `14/process.md`. Gallery entry appended at the end of page3.html with the formula date.
