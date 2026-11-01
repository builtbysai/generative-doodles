# №1281 "The Red Ghost" (jagdeep-raina JR2, PP440)

## Prompt
Black-and-white archival-style drawing of farmworkers laboring in a field,
crossed diagonally by one fiery-red ghost figure, semi-transparent, glowing
against the monochrome. Grounded in Raina's Ghosts in the Fields (Surrey Art
Gallery, 2024): the red figure symbolizes violence, exploitation, trauma, and
loss, drawn from 1980s archival photographs and interviews with Canadian
Farmworkers Union organizers. Wide horizontal, the grayscale scene slightly
tilted ("a little askew"); the ghost larger than the grayscale figures, no
text. Stop-motion jitter at ~8fps, ghost pulse breathing, drag the ghost and
it resists with ember streaks before snapping back. Never click-to-reload.

## Build
- Self-contained single HTML file, silent, no external assets.
- Palette exactly as specced: paper #DCD6C8, archival grays #B9B4AC /
  #7A766E / #3A3835, ground ink #141210, ghost fire red #E63B1F, ember
  orange #E87E1F. No extra colors: grayscale plus the single red.
- Scene: seeded loose graphite washes (flat alpha ellipses), 90 agitated
  hatch marks, 9 crop rows with tufts, 5 bent grayscale workers, whole
  photograph rotated -0.021 rad.
- Ghost: striding figure at 1.35x worker scale on a 40 s diagonal loop,
  lower-left to upper-right, with a slow stride bob. Glow is layered flat
  alpha silhouettes, never a gradient (QA renderer has no gradients).
- Jitter: quantized piece time, step = floor(t*8), 1-2 px displacement from
  a deterministic per-step hash, so the stop-motion step is visible and
  frame one is reproducible.
- Pulse: red intensity breathes as 0.72 + 0.28*sin(2*pi*t/5).
- Drag: pointerdown within 110*scale px of the ghost starts a drag; the
  ghost follows at 0.35 resistance and trails 5 ember streaks along the drag
  vector; release returns elastically with exp(-dt/0.9) decay. All state is
  closed-form over recorded events and t, never frame-integrated.

## House adaptations
- Visual Viewport sizing; canvas pinned in draw(); phone detection via
  window.screen with aspect fallback. Field composition is full-bleed on
  phones, with one framing fix: portrait viewports anchor the frame so the
  ghost's frame-one position sits at 22% width, since cover scaling would
  otherwise crop the ghost off the left edge entirely.
- Determinism (boot flag, the №1275 lesson): the synchronous first frame
  draws at exactly t=0; the rAF clock starts with the loop (first timestamp
  anchors t). No performance.now()/Date.now() value reaches frame one.
- QA renderer limits respected: no rAF unguarded, no AudioContext, no
  createElement, no WebGL, no offscreen canvas, no ctx.filter, no
  shadowBlur, no gradients; dots drawn as paired arcs with moveTo first.

## QA
- Renders inspected at 1280x900 desktop, 390x844 mobile, 720x720 thumb.
  Frame one: archival paper field, five bent grayscale workers over crop
  rows, loose washes and hatch marks, the red ghost fully in frame at lower
  left, striding diagonally, glowing against the monochrome. Mobile holds
  the same read full-bleed.
- Thumb rendered three times at 720x720, cmp byte-identical.
- Drag probe through the piece's own pointer handlers (node-canvas
  harness, driven rAF): undragged red bbox x105-247; after a +100 px drag,
  x150-290 (resisted shift, ~0.35 of the drag); 3 s after release the ghost
  is back on its path (bbox x267-297 at t=4, matching the path position
  269 px within jitter), confirming elastic return.
- Token scan clean: no Math.random, createElement, AudioContext,
  getUserMedia, gradients, shadowBlur, filters.

## Fix rounds
1. First renders cropped the ghost off the left edge on desktop (path start
   x=90 under cover scaling) and off-frame entirely on mobile. Fixed by
   moving the path start to x=200 and anchoring portrait framing on the
   ghost's frame-one position. Re-rendered and re-inspected at all sizes.
2. No other fixes required; first-pass workers, washes, and jitter read
   as specced.

## Files
- index.html (md5 a83777da7731fb5cd80295a79a64e0aa)
- thumb.png (720x720, rendered from the finished script)
- qa-desktop.png (1280x900), qa-mobile.png (390x844)
