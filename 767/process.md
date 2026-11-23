# №9078 · Shimmer - process notes

## Concept
Concentric rings drawn as broken circles. Each ring is cut into
dashes; the dash duty cycle alternates from ring to ring while the
phase steps by a fixed turn, so neighbouring rings interfere and the
field appears to move when it does not. One ring, somewhere in the
middle third, is vermilion and a touch heavier: the single warm note
the eye keeps returning to. Ring radii carry a small seeded jitter,
enough to feel machined by hand rather than plotted by default.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32 PRNG;
  default seed 9078. `?seed=` shareable; click mints a new build. DPR
  capped at 2; Visual Viewport sizing; canvas pinned by style;
  centered piece, ground is the page color.
- 26 to 33 rings (seeded); dash count per ring grows with radius so
  dash arc-length stays roughly constant; duty cycles 0.52-0.64 on
  even rings, 0.30-0.42 on odd rings; phase step 0.35-0.80 turns.
- Vermilion ring at 0.38-0.62 of the radius, drawn 1.5-2.4x heavier.
- Bone ground #efe9da, charcoal ink #201d17, vermilion #c65a34.

## Differentiation
- vs No.9077 (Compass): Compass carries a field in needle angle and
  length on a grid. Shimmer is radial, carries its interest in dash
  interference between adjacent rings.
- vs No.9073 (Raster): Raster is a dot field. Shimmer is line-only.
- Family name: "dashed ring interference".

## QA log
- Default seed rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size, and
  inspected at each size before pushing. Phone presentation follows the
  current house rules (canvas pin, screen-based detection, centered
  piece takes its ground as the page color). Hans's real-device check
  is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs;
  hint is lowercase and short.
- Files: `9078/index.html`, `9078/thumb.png` (720x720, rendered from the live script), `9078/process.md`. Gallery index updated with the №9078 entry.
