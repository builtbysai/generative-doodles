# №1288 "Ghost Prints" (swapnaa-tamhane ST1, PP455)

## Prompt
A long horizontal cloth band with 4-6 rows of faint ghost motifs in paler blue
on deep indigo, exactly like the Achadiya reveal: worn-down ajrakh-style block
impressions (geometric, slightly doubled/mis-registered), revealed as though the
indigo wash just developed them, with a few small mirror glints near the
center. Grounded in Tamhane's Achadiya II, III, IV (2020-2023, National
Gallery of Canada). Watch-only. On each loop the cloth starts un-dyed (pale
ground, no ghosts); a slow indigo wash develops from the edges inward over
~8 seconds, ghost prints fade UP row by row in stamping order, then mirrors
glint once; the loop reseeds. Never click-to-reload.

## Palette (verbatim)
Deep indigo #1E3A5F, developed indigo #2C527A, ghost pale #B9C8DA,
dark indigo shadow #142A45, mirror flash #E8EEF4, unbleached cotton edge
#E7DCC6. No black anywhere (page ground is the dark indigo shadow).

## What was built
- Layout: the cloth band occupies the middle two-thirds of the frame,
  full-width, with raw cotton selvedge strips (plus fray ticks) top and bottom;
  page ground outside the band is dark indigo shadow. Field-like, so it stays
  full-bleed on phones.
- Motif field: 5 rows of ajrakh-style impressions (diamond, diamond rosette
  with dot quartet, square-with-dot), staggered per row, seeded size/rotation
  jitter so the stitching reads hand-stamped. One row carries a clear
  double-stamp (mis-registration) near the left third. Exactly 4 mirror shards
  (irregular pentagons, never circles or squares) near the center.
- Loop (24 s, closed-form over piece time): 0-8 s the indigo wash develops
  from the edges inward as flat alpha layers (top/bottom advance plus a
  thinner side advance, then a low-alpha deep core); ghost rows fade up
  staggered across the wash; 9.5-12 s the mirrors glint once; hold; 20-24 s
  the loop sheds back to pale. Then it reseeds.
- Determinism override (beats the prompt's "never identical" wording): frame
  one draws synchronously at exactly t = 0 via a boot flag, so the thumb is
  the un-dyed pale ground with no ghosts and no mirrors. Loop reseeds use a
  seeded mulberry32 PRNG advancing per loop (seed 1288 + loop * 7919), never
  Math.random, so repeated loads produce the same pattern sequence.

## House adaptations
- Visual Viewport sizing with resize listeners on visualViewport and window;
  canvas pinned in draw() via style width/height in px.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect fallback; checked at 390 wide.
- No gradients, no shadowBlur, no offscreen canvas, no document.createElement,
  no AudioContext, no getUserMedia; rAF behind a typeof guard. Dots drawn as
  paired arcs with moveTo before each arc (node-canvas quirk). No visible
  text except <title>. Silent.

## QA
- Renders inspected at 1280x900, 390x844, 720x720. Frame one at all sizes:
  pale un-dyed cloth band, raw cotton selvedge, no ghosts, no mirrors.
- Forced t = 12 probe (temp copy, discarded): fully developed indigo band,
  5 staggered ghost rows at low alpha, double-stamp visible on row 3 near the
  left third, 4 mirror shards near center.
- Thumb rendered three times at 720x720, cmp byte-identical, re-verified
  after the fix below.

## Fix round
- First renders showed mirror outlines on the pale frame-one ground: the
  mirror fill alpha was scaled by development, but the stroke was drawn after
  resetting globalAlpha to 1. Fixed by scaling the stroke alpha by
  development too; frame one is now clean at all sizes.

## Files
- index.html (md5 f3a1272683cab53aafe392942f9d825a), process.md,
  thumb.png (720x720), qa-desktop.png, qa-mobile.png.
