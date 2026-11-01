# №1286 "Madhur's Phulkari" (jagdeep-raina JR7, PP445)

## Prompt
A dark film frame: rudimentary hand-drawn figures (a couple weeping black
tears, small marching figures) in thin chalk lines on near-black, while a
phulkari pattern of glowing stitch cells slowly darkens and encroaches;
periodically aggressive black scrawls sweep across and swallow figures.
Grounded in Raina's Madhur's Phulkari (2021): the phulkari textile tradition
as access to displacement, "a requiem for a craft industry extinguished
following India's Partition."

## Palette (verbatim)
Film black #0E0C0A; chalk gray #8E887C; phulkari ember #C96A3B; dying
ember #5A3A2E; tear black #000000; scrawl void #050404; ground #0A0806.

## Composition
Cinematic 16:9 film frame (1600x900 design space), centered and kept whole
at all sizes, page ground in the piece's own #0A0806. Six chalk figures,
small and off-center: the weeping couple left of center (black teardrops
with chalk outlines, so they read on near-black), three small marchers
right, one lone bowed figure far right. A seeded grid of 190 phulkari
stitch cells (diamond outlines, X dashes, plus dashes, squares with dots)
covers the frame.

## Motion (all closed-form over piece time and recorded events)
Seamless 48-second dark loop:
- 0-40 s: phulkari cells dim from the edges inward (wave front travels
  from the frame edge to center; bright ember #C96A3B falls back to dying
  ember #5A3A2E).
- 40-44 s: four diagonal scrawl sweeps (seeded noisy paths through the
  couple, the marchers, the lone figure, and a bottom-left flourish) draw
  progressively across the frame in scrawl void, swallowing the figures.
- 44-48 s: scrawls fade, cells restore brightness, and the figures draw
  themselves back in stroke by stroke. At t = 48 the state equals t = 0.
Stop-motion jitter: figures displace 1-2 px per 8 fps step, the step a
quantized function of piece time, so frame one is reproducible.
Drag: pointer drags stir the scrawls — short diagonal void strokes appear
at the drag point and fade with exp decay (tau 1.5 s). Watch-only by
default. Never click-to-reload. No horror jump scares; the dread is slow
and mournful. No sound; canvas only.

## House adaptations
- Visual Viewport sizing; canvas pinned in draw() via style width/height.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect fallback; the 16:9 frame stays whole on phones with the page
  ground in the piece's background color.
- Determinism (boot-flag rule): the synchronous first frame draws at
  exactly t = 0; the performance.now() clock starts only with the rAF
  loop (plain function declaration, no named-function-expression trap).
- Node-canvas limits respected: no gradients (glow is layered flat alpha),
  no shadowBlur, no filter, no offscreen canvas, no createElement, no
  AudioContext, no getUserMedia. Dots drawn as paired arcs with moveTo
  before every batched arc. Seeded PRNG only; no Math.random.
- No visible text except <title>.

## QA
- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  desktop, 390x844 mobile, 720x720 thumb; all three inspected.
- Frame-one read: dark film frame, ember cell field fully lit, the
  weeping couple left of center with black tear drops, marchers right,
  lone figure far right. Mobile holds the same read, frame whole.
- Thumb rendered three times at 720x720, cmp byte-identical.
- Forced-time probes (temp copies, discarded): t = 0 ember 3465 px,
  chalk 440 px; t = 20 ember 1686 px (dim wave halfway in), figures
  intact; t = 42 ember 0 px, void 10316 px (scrawl sweep covering);
  t = 46 chalk 138 px (figures half redrawn), scrawl fading.
- Fix rounds: none required; first renders passed at all three sizes.

## Files
- index.html (md5 fa41677e1b7a729bd61018bc3793b084)
- thumb.png (720x720, rendered from the final index.html)
- qa-desktop.png (1280x900), qa-mobile.png (390x844)
