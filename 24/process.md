# №24 · Spiral - process notes

## Concept
One Archimedean spiral walked from the center outward, with a
capsule laid tangent at every step. Capsules are placed by arc
length, not by angle, so their spacing stays even along the whole
coil while their length grows with the radius: tight stitching at
the heart, long strokes at the rim. Warm white on near-black; the
final capsule of the walk is gold.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 24. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style.
  Centered composition on near-black.
- 7 to 10 turns, direction seeded. Tangent direction computed from
  the spiral's derivative at each step.
- Iterated twice: fixed angular steps tore the outer arms into
  dashed rings (v1), and arc-length steps with long capsules merged
  into a plain line (v2). Spacing now sits just above capsule length
  at every radius.

## Differentiation
- vs No.1 (Vortex): capsules there are steps of particles in a
  multi-vortex field. Spiral's capsules all belong to one path with
  constant arm spacing.
- Family name: "arc-length capsule spiral".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `24/index.html`, `24/thumb.png` (720x720, rendered from the live script), `24/process.md`. Gallery entry appended at the end of page3.html with the formula date.
