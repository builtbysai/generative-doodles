# №1332 "Stacked Steel" — process

Rashid Johnson RJ5 (PP499). A tall black-steel scaffold totem, canvas pseudo-3D only.

## Frame one (t = 0, boot flag)

Dark empty ground. Six stacked cagelike boxes rise in a loose tower, each
slightly offset horizontally, never perfectly aligned. From the top:

- Box 5 (near the top): ONLY the shea-butter bust — glowing yellow cranium
  with brow ridge and nose hint, deliberately featureless otherwise, on a
  base block, with layered flat-alpha glow.
- Box 4: clay pot with a cascading plant, plus dark-cloth books.
- Box 3: two glowing yellow shea-butter blocks with thumb-print dents and a
  drip frozen mid-run.
- Box 2: dark-cloth books plus a small radio (dials, speaker dots, antenna).
- Box 1: clay pot with a cascading plant, plus books.
- Box 0 (bottom): a full row of dark-cloth books.

Thin watering lines run vertically through the tower; one drip sits at the
top of its fall at frame one. A soft ground shadow anchors the totem. Plants
spill from exactly two boxes (1 and 4). Book spines are color and pattern
only, never readable text. No people, no fire, no smoke.

## Motion (all closed-form over piece time and recorded events)

- Plants grow in a slow endless 60 s loop per leaf: unfurl over 20 s, hold,
  droop after 40 s, replaced at 60 s. Each leaf has a seeded phase offset,
  so the plant always shows young, full, and drooping leaves at once.
- A watering drip falls through the tower every 40 s (closed-form phase).
- Drag rotates the totem on its vertical axis (horizontal drag, clamped,
  decaying with tau 2.5 s); drag up/down climbs the camera (clamped
  ±90 px, same decay).
- Touch a shea block or the bust: it slumps (shorter, wider) on a 4 s
  sine bump, then re-forms — "the healing substance yields."

## Adaptations

- Canvas pseudo-3D only: no WebGL, no three.js. Rotation is expressed as
  per-box horizontal shifts and a thin side-face hint, not true 3D.
- Shea glow is layered flat-alpha ellipses, never gradients. No shadowBlur,
  no ctx.filter, no offscreen canvas, no AudioContext, no getUserMedia.
- No gradients anywhere; vignette and glow are flat alpha shapes.
- Dots drawn as paired arcs with a moveTo before each batched arc
  (node-canvas ellipse/arc quirk).
- Frame one is drawn synchronously at exactly t = 0 via a boot flag; the
  clock starts only with the rAF loop (plain function declaration behind a
  typeof guard). All variation comes from seeded mulberry32 streams, never
  unseeded randomness.

## House rules applied

- Visual Viewport sizing (visualViewport width/height plus resize
  listeners on visualViewport and window, never window.innerWidth/Height
  alone); canvas pinned in draw() via canvas.style.width/height in px.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect h > w*1.15 as fallback; tower keyed from min(W, H); checked
  at 390 wide (centered tower on the piece's own dark ground).
- No visible text except <title>.

## QA

- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile, 720x720
  thumb; all three inspected. Desktop and mobile both read as a lone
  scaffold totem on a dark empty ground.
- Thumb rendered three times plus a final re-verification: all
  cmp byte-identical, matching the finished index.html.
- Forced-time probe (temp copy, discarded): t = 0 vs t = 20 differ in
  7,007 of 518,400 pixels, confirming the drip descent and leaf
  growth/droop loop run.
- Token scan clean: no unseeded randomness, no createElement, no
  AudioContext, no getUserMedia, no shadowBlur, no gradients, no
  offscreen canvas, no WebGL.
- No fix rounds required; first renders at all three sizes read correctly.

## Files

- index.html — md5 704e05e309234635cb422538cac6c024
- process.md (this file)
- thumb.png (720x720), qa-desktop.png (1280x900), qa-mobile.png (390x844)
