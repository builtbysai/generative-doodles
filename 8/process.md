# №8 · Rain - process notes

## Concept
Short vertical capsules falling in columns on cream, from the
paper-ground camp of Hans's saves. Two seeded fields govern the fall:
one sets each capsule's length, the other picks its color from three
inks (indigo, charcoal, ochre). Where the length field runs high the
rain stretches; where it sags, capsules shrink to dashes and gaps
widen (brief concept 8, capsule rain).

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 8. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style; field
  full-bleed on phones via the screen check, square on desktop.
- 92 columns; each column walks downward capsule by capsule, the gap
  after each capsule shrinking as the length field rises, so dense
  weather and sparse weather both emerge from one rule.
- Compositional safety: the length field's sampled range must exceed
  0.55 (16 derived-seed attempts), so the weather always varies.

## Differentiation
- vs No.1 (Vortex): capsules there are flow steps, tangent to a
  vortex field on black. Rain's capsules are strictly vertical, on
  paper, and the field sets length and ink, not direction.
- Family name: "field-governed capsule rain".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `8/index.html`, `8/thumb.png` (720x720, rendered from the live script), `8/process.md`. Gallery entry appended at the end of page3.html with the formula date.
