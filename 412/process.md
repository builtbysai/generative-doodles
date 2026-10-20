# No.412 Eat Your Colors

EXPANSION #44 (yeti-iglesias), prompt YETI4. Gallery date 2003 · 02 · 27.

## Concept

Yeti Iglesias's juicy mode: six giant vegetables scattered on a flat
orange ground, each filled with one of her signature hue-shifted
2-stop gradients: eggplant (magenta to purple), carrot (orange to
purple), garlic bulb (pink to white), red pepper (red to magenta),
zucchini (green to yellow), celery stalks (dark green to light
green). White 4-point sparkles and dots season the negative space,
grain sits over the produce, and her hand-lettered "Yeti" signature
rests bottom right. Watch only: the arrangement breathes slowly
while one vegetable at a time does a small wiggle.

## Construction

- One canvas, design space 1280x900, cover-fit (full-bleed field),
  Visual Viewport sizing with resize listeners on visualViewport
  and window, canvas pinned every frame via style width/height in
  px, phone detection via window.screen min dimension < 700px with
  aspect fallback. Flat colour only; no offscreen canvas, no
  filters, no shadowBlur, no smooth gradients.
- Gradient rule: every 2-stop gradient renders as two flat tones
  with a hard diagonal edge. Each vegetable's outline is a sampled
  polygon (bezier teardrop for the eggplant, tapered bent body for
  the carrot, lobed polar outlines for the garlic and pepper, a
  stadium capsule for the zucchini, three fanned stalk polygons for
  the celery). The body fills with the second tone, then the first
  tone is filled over the half-plane on one side of an authored
  diagonal line, clipped to the shape.
- Exactly 6 vegetables, asserted at load, drawn back to front:
  celery, pepper, carrot, zucchini, garlic, eggplant. The eggplant
  is dominant (scale 1.15) and left of centre.
- Dressing: eggplant calyx and stem in purple; carrot fronds in
  purple and black contour ribs (4 arcs, alpha 0.75) clipped to the
  body; garlic tip in pink and black contour ribs (4 arcs, alpha
  0.6) clipped to the bulb; pepper stem and calyx in magenta;
  zucchini end nubs in dark green; celery leafy tops in light green
  and a binding band at the base.
- Grain: exactly 250 speckle dots per vegetable (1500 total,
  asserted), rejection-sampled from a fixed-seed LCG inside each
  vegetable's own outline, baked once at load, drawn clipped to the
  shape at 0.06 alpha in black or white. Grain lives on the produce
  only.
- Sparkles: 12 white 4-point stars, alpha twinkling on whole
  cycles of the 30s loop (1, 2 or 3 cycles each, fixed phases),
  plus 14 authored white dots in the arrangement's gaps.
- Signature: "Yeti" as hand-lettered stroke paths with round caps
  in ink black, plus a flourish underline. No font text anywhere.
- Motion, 30s seamless loop, watch-only, no pointer handlers:
  - Breathing: the whole arrangement scales 0.99 to 1.01 about the
    design centre on 12s cycles.
  - Wiggle schedule (fixed): each vegetable in turn rotates
    through one full sine swing of 5 degrees over a 4s window.
    Windows open at 0s (eggplant), 5s (carrot), 10s (garlic),
    15s (pepper), 20s (zucchini), 25s (celery). Outside its window
    a vegetable's wiggle angle is exactly 0.
  - Sparkle twinkle phases are whole-cycle, so the loop wraps
    seamlessly.
- Determinism: frame one is drawn synchronously at the constant
  phase T = 11.0s (garlic at full +5 degree wiggle, breathing at
  0.995, sparkles staggered mid-twinkle). The animation clock is
  anchored at that constant and advances in fixed 1/60 ticks;
  frame one is never derived from Date.now(). requestAnimationFrame
  is typeof-guarded.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Thumb rendered twice from the shipped script: byte-identical.
- Desktop: all six vegetables read instantly, each split into its
  two clashing tones along a hard diagonal; eggplant dominant at
  left of centre; ribs visible on garlic and carrot; sparkles and
  dots sit in the negative space; signature legible bottom right.
  The carrot's orange tip half is the ground colour, and reads
  against the ground by its black ribs, its grain and the purple
  body above it.
- Thumb: all six vegetables and the signature survive the square
  crop (design x 190 to 1090); celery and pepper bleed slightly at
  the edges, as a frame-filling field should.
- Mobile: cover-fit centre slice keeps the eggplant's magenta
  half, the carrot and the zucchini large and legible on the
  continuous orange ground.
- Assertions in code: exactly 6 vegetables, exactly 250 grain dots
  per vegetable, 1500 total, loop constant 30s.
