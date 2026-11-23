# №1325 "How to Fly (ombré)" — sadie-barnette SB6 (PP492)

## Prompt
A mural-scale composition of floating photo-rects at varying scales —
family-archive stand-ins (birthday-cake glyph, book glyph with "JAZZ" on the
spine, car glyph, plant fronds) — drifting slowly over a smooth ombré rainbow
backdrop (top warm pink, middle gold, bottom teal). Rhinestone glints and gold
glitter drift between the rects. Rects carry soft white borders like prints,
slight rotations, slow vertical bob. Grounded in Barnette's *How to Fly*
(2025-27, CAAM atrium). Palette: pink #F27BA7, gold #F4C95D, teal #3FA7A0,
print white #FAF6EC, glyph ink #2A2A28, rhinestone #F5D76E, glitter
white-gold #F8E9B8. Portrait; 7-9 photo-rects at three scale tiers (large
25%, medium 12%, small 6%), generous air, glyphs as clean outlines, never
photographic. Watch-only slow drift; drag gently pans the whole mural.
Never click-to-reload. No real photographs or faces; no flat collage without
the drift; the backdrop must never band.

## Build
- Self-contained single HTML file, silent, no external assets.
- Ombré as 90 layered flat-alpha horizontal bands (pink to gold across the
  top half, gold to teal across the bottom half). No gradients anywhere, per
  the QA renderer constraint; the 90-band layering reads smooth, no banding.
- 8 photo-rects, seeded layout: 2 large (cake, car), 3 medium (book, plant,
  cake), 3 small (plant, book, car). White print borders, slight seeded
  rotations, faint 0.16-alpha tint wash inside each print. Small tier widened
  from 6% to 11% of field width on narrow fields so glyphs stay legible.
- Glyphs drawn as clean outlines: cake (stacked rects plus candles), book
  (rect plus spine label "JAZZ", the prompt-specced text, verbatim), car
  (side-profile polyline with filled wheels), plant (five bezier fronds).
- Rhinestones: 46 seeded four-point glints, intensity on a slow traveling
  sine wave. Glitter: 90 gold dots drifting upward on a closed-form wrap.
- Motion, all closed-form over piece time: rects bob on independent phases
  (9-16 s periods, 6-16 px amplitude); glitter rises and wraps; rhinestones
  glint on the wave. Drag pans the whole mural: recorded drag segments decay
  with tau 2.5 s, clamped to plus/minus 40 px horizontal and 30 px vertical;
  rects keep their relative drift under the pan.
- Determinism: frame one is exactly t = 0 via a boot flag, drawn
  synchronously at load; the clock starts only with the rAF loop. All
  randomness from mulberry32 (seed 1325000), never Math.random. rAF loop is
  a plain function declaration behind a typeof guard.
- House rules: Visual Viewport sizing with resize listeners on visualViewport
  and window; canvas pinned in draw() via style width/height; phone detection
  via window.screen physical size (min dimension under 700 px) with aspect
  fallback; field-like composition full-bleed on phones, checked at 390 wide.
  No gradients, no shadowBlur, no filters, no offscreen canvas, no
  AudioContext, no getUserMedia. Dots drawn as paired arcs with moveTo before
  every batched arc. No visible text except the title tag and the
  prompt-specced "JAZZ" spine labels. No em dashes in visible copy.

## QA
- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop,
  390x844 mobile, 720x720 thumb; all three inspected.
- Frame one: ombré pink to gold to teal filling the field, 8 white-bordered
  prints at three tiers with generous air, cake/car/plant/book glyphs legible,
  "JAZZ" readable on both book spines, rhinestone glints and gold glitter
  scattered between the rects. Mobile holds the same read full-bleed.
- Fix round: the first render showed all rects at the small tier size —
  the tier field was dropped when building the rect objects, so every rect
  fell back to the 6% size. Fixed by carrying tier through; re-rendered and
  re-inspected at all three sizes. Large prints now read mural-scale.
- Thumb rendered three times plus a final re-verification after this file
  was written; all byte-identical (cmp).
- Token scan clean of Math.random, createElement, AudioContext,
  getUserMedia, gradients, shadowBlur, filters, offscreen canvas.
