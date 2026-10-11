# №9071 · Solstice - process notes

## Concept
A low sun inside the square, and the whole square divided into rays
around it: wedges of varying width, 42 to 84 of them, colored by
direction. Wedges pointing up are warm (bone, wheat, ochre, rust);
wedges pointing down are cool (slate, teal, deep teal); wedges near the
horizons pick from either family by the seed, so the light has a
geography and the boundary between warm and cool is ragged, not a
straight horizon line. The sun is a plain vermilion disc.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 9071. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing per the standing rule.
- Wedges are drawn as triangles from the sun point past the square's
  corners (radius 1.6 times the side) and clipped to the square. Wedge
  color is chosen by the sign of the sine of its mid-angle, with the
  horizon band (absolute sine under 0.25) randomized per wedge.
- Compositional safety: sun position is gated to x 0.30 to 0.70 and
  y 0.50 to 0.76 of the square and wedge count to 42 to 84; a low sun
  is what keeps the warm half larger than the cool half without
  erasing it.

## Differentiation
- vs No.9072 (Well): also radial in effect, but Well is concentric and
  stroked, a shaft seen from above. Solstice is a filled fan from one
  off-center point; its subject is direction, not depth.
- vs No.9063 (Loom): threads on nested rings with two families crossing.
  Solstice has one family only, the wedges themselves, and nothing is
  woven.
- Family name: "direction-colored ray fan".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected at each size before pushing. Mobile letterboxes the square
  correctly; hint legible.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `9071/index.html`, `9071/thumb.png` (720x720, rendered from the live script), `9071/process.md`. Gallery index updated with the №9071 entry.
