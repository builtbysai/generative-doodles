# №9073 · Raster - process notes

## Concept
Dots as atoms on a strict grid, one rule for their size: each dot measures
two interference fields, rings spreading from two unseen centers, and
grows where the fields agree. Where they cancel, the dot shrinks to a
pinprick. The grid never moves; only the radii change, and the picture is
the interference itself.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 9073. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas element pinned by style
  width/height in draw() (the high-DPR phone fix); phone layout detected
  via window.screen with aspect fallback, field goes full-bleed on
  phones and stays square on desktop, recomposed per aspect.
- Dot field: f = 0.5 + 0.5*sin(d1*f1) + 0.5*sin(d2*f2 + ph), clamped;
  radius scales with f^0.8, dots under 0.4px skipped.
- Compositional safety: sampled on a 25x25 grid; a seed needs at least
  15 percent of samples near full size (f > 0.78) and 15 percent near
  pinprick (f < 0.22), 16 derived-seed attempts.

## Differentiation
- vs No.9064 (Grainfield): loose dots in a flow field, position is the
  variable. Raster's grid is fixed; only radius varies, and the field is
  ring interference, not a current.
- vs No.9066 (Undertow): rings drawn as lines. Raster never draws the
  rings; they exist only as dot sizes.
- Family name: "dual-ring halftone interference".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected at each size before pushing. Phone presentation follows the
  current house rules (canvas pin, screen-based detection, full-bleed
  fields / grounded centered pieces). Hans's real-device check is the
  final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `9073/index.html`, `9073/thumb.png` (720x720, rendered from the live script), `9073/process.md`. Gallery index updated with the №9073 entry.
