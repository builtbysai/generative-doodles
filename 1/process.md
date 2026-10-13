# №1 · Vortex - process notes

## Concept
A flow field with three to five vortex attractors, drawn in short
rounded capsules instead of lines: each capsule is one step of a
particle along the field, tangent to the flow, colored from a neon
ramp (violet, magenta, gold, cream) by the speed it was moving. Where
the field bends hard, small cream dots are stippled along the turn.
The capsules read as stitched thread on near-black (brief concept 1,
from Hans's saved genart-024).

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 1. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style; phone
  layout via window.screen with aspect fallback; field full-bleed on
  phones, square on desktop.
- Velocity: tangential flow around each vortex with Gaussian falloff,
  plus a weak global swirl so no region is dead still. Capsule length
  and ramp position both scale with speed (gamma 0.6 on the ramp so
  gold and cream appear in the fast channels, not only at the cores).
- Compositional safety: speed sampled at 400 random points; a seed
  needs mean speed above 0.10 and over 5 percent of samples fast.
  Iterated twice in review: v1 colors collapsed to violet (ramp never
  climbed) and far-field capsules were culled into empty patches.

## Differentiation
- vs No.9068 (Meridian): continuous lines bent by vortices. Vortex is
  discrete capsules, one step each, with color by speed.
- Family name: "vortex capsule flow".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected before pushing. Phone presentation follows the current
  house rules. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `1/index.html`, `1/thumb.png` (720x720, rendered from the live script), `1/process.md`. Gallery entry appended at the end of page3.html with the formula date.
