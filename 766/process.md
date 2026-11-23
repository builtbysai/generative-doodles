# №9077 · Compass - process notes

## Concept
A field of small needles, one per grid point, each pointing where a
seeded angle field tells it. The field sums three sine terms at
different scales, so whole regions agree while the boundaries between
regions churn. Needle length follows how strongly the two large terms
agree there: long where the field is sure, stubby where it is torn. A
needle is vermilion where the field turns nearly vertical, an accident
the build only counts, never places.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 9077. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style;
  full-bleed on phones via the screen check.
- 34 columns; needle half-length 0.42 of the cell times certainty.
  Vermilion threshold: absolute sine of angle above 0.94.
- Compositional safety: sampled on a 31x31 grid; seeds kept when the
  vermilion share lands between 2 and 9 percent (24 attempts), so the
  accidents stay rare enough to notice.

## Differentiation
- vs No.9062 family flow-line pieces: those draw the paths of moving
  particles. Compass draws no paths, only instantaneous headings at
  fixed posts.
- vs No.9073 (Raster): dots whose size carries the field. Compass
  carries its field in angle and length of a stroke.
- Family name: "angle-field needle grid".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected at each size before pushing. Phone presentation follows the
  current house rules (canvas pin, screen-based detection, full-bleed
  fields / grounded centered pieces). Hans's real-device check is the
  final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `9077/index.html`, `9077/thumb.png` (720x720, rendered from the live script), `9077/process.md`. Gallery index updated with the №9077 entry.
