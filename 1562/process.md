# №1562 - Every Cell Is Watching

- Title: Every Cell Is Watching
- Prompt code: TW3 / PP809, EXPANSION #206 (shunsuke-takawo)
- Formula date: 2006 · 04 · 22
- Gallery note: "A black-and-white op-art checkerboard where every black cell stares back with two white-dot eyes, pupils wandering and blinking in waves. Watch the field blink."

## Felt driver

Pareidolia: a plain checkerboard that turns out to be a field of faces, and
the faces are watching you. The unease is the point, so the piece never
answers a pointer. It only watches.

## Mechanism

12x12 checkerboard, edge-to-edge, each cell drawn as a wobbled quad so the
grid breathes: corner offsets are slow sines of piece time and grid position
(amplitude 0.03 of a cell). Every black cell carries two white dots, eyes
only, no mouths, no noses. Each cell's pair wanders within the cell on a
slow Lissajous path (per-cell seeded phase offsets, frequencies 0.19 to
0.40 rad/s, amplitude 0.16 of a cell), so pupils drift independently from
cell to cell. A blink wave sweeps diagonally across the grid once every 9
seconds: blink amount is a Gaussian around a wavefront that travels from
the top-left diagonal to the bottom-right, and pupils near the front
collapse vertically to slits (scaleY down to 0.06). All motion is a
closed-form function of piece time, so a probe at any t is deterministic.

## Palette

Pure black #0A0A0A and warm white #F5F1E6, nothing else. No color of any
kind. The page ground is the piece's own black.

## Interaction

WATCH-ONLY. No pointer interaction of any kind. The dots move as pupils,
the field blinks, the piece watches you. The page carries only the title,
the formula date, and the hint line "Watch the field blink."

## Determinism note

One synchronous frame is drawn at load from a fixed phase (piece time
t=0). All layout randomness comes from mulberry32 seeded per cell by a
hash of (1562, cell index); no Math.random, no wall clock at draw time.
requestAnimationFrame is guarded with a typeof check so node-canvas QA
works. Blink wave and pupil wander are closed-form functions of t.

## House rules

- Visual Viewport sizing with resize listeners on visualViewport and
  window; canvas element pinned in draw() via canvas.style.width/height
  in px.
- Phone detection via window.screen (min dimension under 700 px) with
  aspect fallback (h > w * 1.15). Field-like composition: full-bleed on
  phones, square centered on desktop with the black ground.
- No em dashes in visible copy, no AI-signature language. No audio.
  Blink wave is slow (9 s cycle), never strobing.
- Each dot drawn with its own beginPath and a moveTo before the ellipse,
  per the node-canvas batched-arc quirk.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js at
1280x900 desktop, 390x844 mobile, and 720x720 (thumb.png). All three
inspected visually: 12x12 grid reads on all sizes, eyes visible in every
black cell, no clipping on mobile, no color anywhere. Desktop shows the
square centered on the black ground; mobile is full-bleed with tall cells
and the eyes still reading clearly.

Probe harness /tmp/probe-1562.js, all checks passed:
- Two fresh 720x720 renders at t=0 byte-identical
  (md5 23d73b0bf0da917708825a0fbc3eea61).
- t=3 differs from t=0 in 11.3% of pixels (pupil wander plus grid breathing);
  t=4.5 differs in 13.1% (blink wave mid-sweep); t=9 differs in 16.7%
  (blink pattern repeats on its 9 s period, wander differs).
- Color check: 0 pixels outside the black/white blend range at t=0.
- White pixel fraction 51.68% at t=0, as expected for a half-white board
  plus eyes.
- A t=4.5 render inspected visually: a diagonal band of slit eyes sweeps
  the grid while the remaining eyes stay round, confirming the blink wave.

## Fix rounds

None. First build passed visual inspection and all probes.
