# №6 · Scanline - process notes

## Concept
A disc drawn the way a terminal would: horizontal scanlines only, each
line exactly as long as the circle's chord at that height, in one
phosphor green (#39ff6a) on black. Brightness is the only modelling:
rows brighten toward a seeded light band and fall off toward the limb.
No shading, no gradient fill, no outline; chord lengths do the work
(brief concept 6, scanline sun).

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 6. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style.
  Centered composition on the piece's own near-black ground.
- 64 to 83 rows; line width 0.62 of the row pitch so the rows stay
  separate lines, not a fill. Light band gated above center (-0.5 to
  0.1 in disc units) so the falloff reads as a lit ball, not a stripe.

## Differentiation
- vs No.2 (Orb): also a ball from primitives, but Orb is dots placed
  on a 3D lattice with facing-based size and an iridescent ramp.
  Scanline is one color, flat rows, the chord is the atom.
- Family name: "chord-length scanline disc".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `6/index.html`, `6/thumb.png` (720x720, rendered from the live script), `6/process.md`. Gallery entry appended at the end of page3.html with the formula date.
