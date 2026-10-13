# №15 · Modules - process notes

## Concept
A Bauhaus block composition on a coarse 6x6 module grid. Most modules
are left empty (about 70 percent negative space target). Each filled
module holds exactly one primitive (quarter disc, semicircle, bar, or
full disc), flat in red, yellow, blue or black on cream, rotated by
seeded quarter turns.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 15. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style.
  Centered composition on cream.
- One seeded stream decides occupancy (30 percent per module), then
  primitive, color and rotation for each filled module.
- Compositional safety: occupancy gated to 16 to 42 percent of the
  grid, with at least 3 filled modules in the bottom half so the
  composition cannot pile into the top (24 derived-seed attempts,
  closest to 29 percent kept). The shipped default keeps generous
  air under the block cluster; that spareness is the design.

## Differentiation
- vs No.9075 (Warp): a full checkerboard, every cell filled and then
  waved. Modules is mostly empty grid; nothing deforms, placement is
  the only event.
- Family name: "sparse module primitives".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `15/index.html`, `15/thumb.png` (720x720, rendered from the live script), `15/process.md`. Gallery entry appended at the end of page3.html with the formula date.
