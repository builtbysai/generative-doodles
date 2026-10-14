# №16 · Phyllotaxis - process notes

## Concept
The sunflower rule drawn plainly: point i sits at angle i times the
golden angle (137.508 degrees) and radius proportional to sqrt(i),
so dots pack evenly from center to rim with no spokes and no rings,
only the spirals the eye invents. Dot size grows slowly with radius;
two inks (warm white and gold) alternate by radius band on
near-black. A seeded jitter of a fraction of a degree on the angle
decides whether the spiral families read crisply or dissolve toward
grain.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 16. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style.
  Centered composition on near-black.
- 1400 to 1900 points, drawn rim-first so the center stays clean.

## Differentiation
- vs No.2 (Orb): dots on a 3D sphere, sized by facing. Phyllotaxis is
  flat and its order is the golden angle; nothing is projected.
- Family name: "golden-angle seed head".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `16/index.html`, `16/thumb.png` (720x720, rendered from the live script), `16/process.md`. Gallery entry appended at the end of page3.html with the formula date.
