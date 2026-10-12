# №9074 · Hatch - process notes

## Concept
An engraver's sphere, drawn the plotter way: one family of parallel
lines, and the only thing that changes along each line is its weight.
Every line is cut into short segments; a segment is drawn heavy where the
pretend surface turns toward a seeded light, hairline where it turns
away. No outline, no disc fill; the ball exists only because the
hatching swells and thins.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 9074. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style. Centered
  composition: the disc keeps its shape on every screen, the page ground
  is the piece's own bone, and the hint is dark on light.
- 46 rows across the disc, 44 segments per row; width from light
  distance falloff (shade^1.6) times a row envelope (middle rows
  heavier). The whole hatch family is tilted by a seeded angle.
- Compositional safety: the light is gated off-center (disc radius
  0.30 to 0.65 from center); a centered light makes a bullseye, not a
  sphere. Iterated once after review: v1 varied weight mostly between
  rows and read as banding; widened the falloff, strengthened the
  along-line swell, added the row envelope.

## Differentiation
- vs No.9072 (Well): stroked closed squares, line weight constant.
  Hatch is open segments whose weight is the entire shading system.
- vs No.9068 (Meridian): lines bend. Hatch lines never bend; they only
  thicken and thin.
- Family name: "weighted-line engraved disc".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected at each size before pushing. Phone presentation follows the
  current house rules (canvas pin, screen-based detection, full-bleed
  fields / grounded centered pieces). Hans's real-device check is the
  final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `9074/index.html`, `9074/thumb.png` (720x720, rendered from the live script), `9074/process.md`. Gallery index updated with the №9074 entry.
