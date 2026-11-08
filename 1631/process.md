# No.1631 "Lumiere" (YL8, PP878 La Nuit) — process notes

Title: Lumiere. Date: 2006 · 06 · 30. Study #214 yi-wen-lin, completing the study.
Gallery note cue: "Drag through the fountain to shift its hue."

## Driver

The piece is a participant-data fountain. The live RGB ratio is the
mechanism, not a decoration: the viewer's own gestures feed it, and the
fountain's hue is its readout. In Yi Wen Lin's installation the ratios
came from 12 hours of participant data; here the ratio comes from the
person dragging through the fountain right now.

## Mechanism

- Particle pool: exactly 2400 grains (low thousands, distinct squares,
  never fog). Fountain emission from the sphere apex: upward velocity,
  gravity, drag, plus a gentle outward push while falling so spent
  grains rain down at the edges. Grains recycle on age, on falling back
  into the sphere, or on drifting past the field edges.
- Live RGB ratio, base vector (0.34, 0.33, 0.33): the documented
  balance, near-equal and faintly warm. Each particle samples its
  channel from the ratio at spawn time (R #E8543F, G #3FA34D,
  B #3F7FE8), so the fountain's hue shifts progressively as new grains
  take the current ratio.
- Direction-to-channel map: a drag sample (dx, dy) is decomposed into
  three orthogonal parts. Horizontal h = |dx| - min(|dx|,|dy|) feeds R.
  Vertical v = |dy| - min(|dx|,|dy|) feeds G. Diagonal
  d = min(|dx|,|dy|) feeds B. Pure horizontal drag feeds only red,
  pure vertical only green, perfect diagonal only blue.
- The ratio is a closed-form sum over recorded drag samples with
  exponential decay to base (time constant 150 s, per-channel feed
  capped at 0.5). It relaxes; it never snaps. No timer resets it.
- Sphere: wireframe, 12 meridians and 5 latitudes, rotating one turn
  per 60 s, breathing scale 1 +/- 0.05 on a 6 s cycle, tilt 0.35 rad.
  Faint circuit texture: 30 seeded orthogonal traces at 0.05 alpha.
- Palette: ground #0C0D10, sphere lines #9ADFE8, the three channel
  colors. No other color. Copy is drawn in the sphere color.

## Acceptance criteria, measured

Probe harness (/tmp/probe-1631.js, node-canvas, script evaled in one
scope, pointer events dispatched, piece time stepped by hand):

- Fountain emits continuously: all 2400 particles moved after 1 s of
  piece time; 2097 of 2400 grains sit above the sphere at frame one
  (fountain already developed).
- Particle count: pool is exactly 2400, distinct grains, no fog.
- Ratio starts at the fixed documented balance: ratioAt(8 s) =
  (0.3400, 0.3300, 0.3300), exactly the base vector.
- Horizontal drag feeds R, vertical feeds G, diagonal feeds B, within
  ~30 s of sustained slow dragging (300 moves, 8 px each, 0.1 s apart):
  after horizontal drag ratio = (0.5257, 0.2372, 0.2372), freshly
  spawned grains 1260 R / 585 G / 555 B out of 2400; after vertical
  drag ratio = (0.2444, 0.5185, 0.2372); after diagonal drag ratio =
  (0.2628, 0.2551, 0.4820). The hue shift is plainly visible.
- Release relaxes slowly, never snaps: 1 s after the diagonal drag
  ends the ratio is (0.2632, 0.2555, 0.4813), essentially unchanged;
  after +150 s it is (0.3069, 0.2978, 0.3953); after +600 s it is
  (0.3382, 0.3282, 0.3336), back at base.
- Sphere breathes and rotates: sphere radius 144.60 px at t = 8 s vs
  135.14 px at t = 9.5 s (1280x900 render).
- Frame one is deterministic: fixed phase t = 8 s, seeded mulberry32
  PRNG (seed 1631007), no Math.random, no wall-clock dependence.
  Thumb re-rendered byte-identical (md5 below, twice). Desktop
  re-render byte-identical. Redrawing the same piece time twice in the
  probe produced identical PNG bytes.
- First probe run caught a real weakness: FEED_K 0.00002 per px moved
  the ratio only 0.34 to 0.3675 after 30 s of dragging, too faint to
  read as a hue shift. FEED_K was raised to 0.00018 per px; the numbers
  above are from the re-run. The piece itself was otherwise untouched.

## Deviations from the prompt

- The prompt names no numeric base ratio ("his documented balance"),
  so the base vector (0.34, 0.33, 0.33) is an authored value, stated
  here and in the code. It is near-equal with a faint warm lean.
- The gesture histogram is a closed-form sum over recorded drag
  samples with exponential decay, per the batch spec's adaptation
  flags, rather than a frame-integrated histogram: the ratio is a pure
  function of piece time and recorded samples, so frame one stays
  deterministic.
- Title and date sit on a solid ground-colored plate so the copy reads
  over the fountain at every size (the first build let fountain grains
  speckle the date). The hint needs no plate; it sits below the sphere.
- The sphere's glow is a flat 0.05-alpha disc behind the wireframe,
  not a gradient or shadowBlur: flat colors only, per house rules.

## QA

- Rendered from the actual script with node render-piece.js:
  1280x900 desktop, 390x844 mobile, 720x720 thumb. All three visually
  inspected: sphere low-center and large, fountain rising through the
  upper two thirds and raining at the edges, distinct grains, faint
  circuit texture, title/date/hint legible at all sizes.
- Gate fix: title/date plate added after the first desktop render
  showed fountain grains over the date; re-rendered and re-inspected.
- Thumb re-render byte-identical: md5 98f8f3c2d9b057c159df25e54a49556e
  (twice). Desktop re-render byte-identical.
- No Math.random, no Date.now, no em dashes in visible copy, no
  click-to-reload, no reset button, no audio, no shadowBlur, no
  gradients. Flicker is by construction slow: 6 s breath, 60 s
  rotation, no blinking. rAF guarded by typeof checks. Visual Viewport
  sizing with resize listeners on visualViewport and window. Phone
  detection via window.screen with aspect fallback. Portrait field:
  full-bleed on phones, centered portrait rect on desktop with the page
  ground set to the piece's own ground color.
