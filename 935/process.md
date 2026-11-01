# No.935 — Four Inks, One Poster

Study #114 stefpos, PP96 "See in CMYK" (Stefanie Posavec, "See in CMYK", 2026,
Google Arts & Culture × Exploratorium).

## Concept

A poster printed live, forever, in the four process inks and nothing else.
The headline "DATA IS A HUMAN MATERIAL" is set in big hand-jittered caps in
the black ink. Below it, one halftone field carries four data streams at
once, one per plate: cyan is temperature, magenta is visitor counts, yellow
is word frequencies, black is time-of-day. On every plate, dot size IS the
data value at that cell; there are no decorative dots. The plates are drawn
with the canvas 'multiply' composite, so every other hue on the page (the
deep blues, the greens, the red fringes) is made by the inks mixing
optically, the way a real press sheet works. Each plate sits a few pixels
out of register with the others, deliberately: the misregistration is the
analogue charm, and it is never perfect.

The press runs on an 85-second loop. The plates print in sequence, C then
M then Y then K, each rolling in behind a horizontal press band that sweeps
down the field over 15 seconds (60 seconds of printing). The finished
poster holds for 15 seconds, then the plates lift off in reverse order
over 10 seconds and the loop reprints.

Interactions teach the separations. A tap isolates one plate (cycle C, M,
Y, K, all): the other plates drop to alpha 0.08 so a single stream can be
read alone. Dragging shoves every plate's registration by the drag delta
(clamped to ±14 px); on release the offsets ease back to their base
misregistration on a closed-form exponential. A double-tap reseeds all
four streams and reprints from cyan. Sound, started only by the first
gesture, is the press itself: a low filtered-noise rumble while any plate
is mid-pass, and a low clunk each time a plate lands.

## Construction

Single self-contained index.html, canvas 2D, no external assets.

- **Streams (seeded, per generation).** All four streams are functions of
  the cell's normalised position (u, v) plus a mulberry32 stream seeded
  with 935000 + generation × 7919:
  - C, temperature: a smooth gradient wave,
    0.44 + 0.38·sin(2.7u + 1.2 + φ)·cos(2.1v − 0.5) + 0.15·sin(4.6u + 2.8v + 1.7φ),
    with ±0.04 seeded jitter per cell; φ advances per generation.
  - M, visitors: three Gaussian clusters (a broad central peak at
    (0.48, 0.44), a tighter one at (0.74, 0.66), a small one at (0.20, 0.70)),
    scaled by 0.92, with ±0.06 seeded noise.
  - Y, words: sparse. Most cells sit near zero (value = r × 0.16 for
    r < 0.80 of the seeded draw); the rest jump to 0.5–1.0, the few big
    yellow dots.
  - K, time-of-day: a diagonal rhythm, bands along (u + 1.35v) at 10.5 rad,
    amplitude modulated across u; φ advances per generation.
  Values clamp to 0..1 and map to dot radius 0..0.46 × cell size.
- **Grid.** 26 columns on desktop, 15 on phones (phone detection via
  window.screen minimum dimension < 700 px, aspect fallback h > w × 1.15
  only when screen is unavailable). Rows are fitted to the field so cells
  stay square (11 rows at 1280×900, 16 at 720×720, 20 at 390×844).
- **Plates and registration.** Base misregistration offsets are C (+3, −2),
  M (−3, +2), Y (+2, +3), K (−2, −3) px: all different, all in the specced
  2–4 px range. Plates draw in C, M, Y, K order under
  globalCompositeOperation 'multiply'; headline and legend draw after,
  in source-over, in the K ink.
- **Print / hold / lift.** Loop time lt runs 0..85 s. Plate p prints
  during [15p, 15p + 15): a press band travels from above the field to
  below it, and each dot scales in as the band crosses its row. lt in
  [60, 75) is the full-poster hold. From 75 s the plates lift in reverse
  (K first, C last), each over 2.5 s, fading while rising 1.8 cell
  heights. Frame one is the synchronous draw at t = 0 with a fixed loop
  phase offset of 38.5 s, so C and M are fully printed, Y is mid-pass
  with its band just over halfway down the field, and K has not yet
  printed.
- **Interaction state is closed-form over recorded events.** Taps and
  drags are stored as timestamped event lists; each frame re-derives
  generation, isolate state and drag offset from those lists and t alone.
  Two taps within 0.32 s pair into a double-tap (reseed, loop restarts);
  unpaired taps mature after 0.32 s and advance the isolate cycle. The
  post-drag registration recovery is extra × exp(−dt / 0.55).
- **House rules.** Canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas.style.width/height
  pinned in px inside draw() every frame; page ground is the paper tone
  (light-ground phone rule: the poster simply scales, grid columns drop
  on phones, the headline wraps to two lines, nothing clips). No
  gradients, no shadowBlur, no ctx.filter, no offscreen canvas. rAF is
  typeof-guarded; all AudioContext use is lazy (created on the first
  pointerdown), typeof-guarded and wrapped in try/catch. Frame one is
  drawn synchronously at a constant phase; Date.now() is never used for
  drawn state (elapsed time comes from performance.now relative to load).

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280×900
  (qa-desktop.png), 390×844 (qa-mobile.png) and 720×720 (thumb.png).
  All three render cleanly in silence (no AudioContext in the harness).
- **Determinism:** thumb.png rendered twice and cmp byte-compared:
  identical. Repeated after the balance fix below; identical again.
  The duplicate render was deleted.
- **Multiply verification:** in all three renders the overlaps mix as
  required under node-canvas 'multiply': C over M gives the deep blue
  cores in the visitor peaks, C over Y gives green dots, M over Y gives
  red-orange fringes, and triple overlaps go near-black. No fallback to
  sequential alpha drawing was needed.
- **Read-back, desktop (frame one):** paper ground; the headline on one
  line in jittered black caps, unclipped; below it the halftone field,
  cyan temperature dots large on the left and easing right, magenta
  visitor clusters deepening to blue where they cross the cyan, sparse
  yellow word dots (pure yellow on the right, green where they sit on
  cyan) printed down to just past mid-field where the Y press band
  currently stands; fine colour fringing at dot edges from the
  misregistration; the legend "C = temperature · M = visitors · Y = words
  · K = time" centred at the bottom. K has not printed yet at this phase,
  as specced.
- **Read-back, thumb (720×720):** same composition, one-line headline,
  16 field rows; mixing and fringing intact.
- **Read-back, mobile (390×844):** headline wraps to two lines ("DATA IS
  A HUMAN" / "MATERIAL"), fully legible, nothing clipped; 15-column
  field with 20 rows; legend fits on one line at the bottom; the poster
  keeps its margins on the paper ground.
- **Balance fix (one round):** the first pass ran the temperature mean
  at 0.52, which flooded the left of the field with near-solid cyan and
  crushed the visitor peaks to black. Temperature mean lowered to 0.44
  (amplitude 0.38 / 0.15) and the visitor cluster sum scaled by 0.92;
  re-rendered all sizes and re-verified byte-determinism. The wave and
  the peaks now read as separate streams that mix, rather than a flood.

## Deviations

- **Radius mapping.** "Dot radius = value" is realised as radius up to
  0.46 × cell size at value 1 (diameter up to 0.92 × cell), the standard
  halftone reading: full-value dots nearly touch without swallowing
  their neighbours, so the four plates stay individually legible inside
  the mix.
- **K at frame one.** The black plate is a real fourth stream (diagonal
  time-of-day bands), but at the specced frame-one phase it has not
  printed yet; the dark cores visible in frame one are C×M multiply,
  not K. K arrives with its own pass at 45–60 s of the loop.
- No other deviations. Palette is exactly the four process inks on the
  paper tone; the only visible text is the headline, the printer's
  legend and the document title.
