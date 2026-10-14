# №23 · Wedge - process notes

## Concept
Stippling by rejection: points are thrown uniformly at the page and
kept with a probability given by one diagonal gradient, so the dots
thin to nothing at one corner and pack solid at the opposite one, a
wedge of tone with no drawn edge anywhere. Kept dots grow slightly
as the gradient rises. Charcoal on cream.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 23. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style; field
  full-bleed on phones via the screen check, square on desktop.
- 26,000 throws per render; gradient direction is any seeded angle,
  steepness 1.5 to 2.0.
- Compositional safety: the kept share is measured on 3,000 sample
  throws and gated to 24 to 50 percent, and a probe of the empty
  corner must find zero gradient there, else derived-seed retry.

## Differentiation
- vs No.2 (Orb): dots there sit on a lattice with facing sizes.
  Wedge's dots are thrown and rejected; position is chance, density
  is the drawing.
- Family name: "rejection stipple gradient".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `23/index.html`, `23/thumb.png` (720x720, rendered from the live script), `23/process.md`. Gallery entry appended at the end of page3.html with the formula date.
