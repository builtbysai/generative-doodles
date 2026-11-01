# №1372 "Skytyped" — sky-hopinka SH5 (PP595)

## What it is

A flat grid-landscape (detention-facility geometry rendered abstract:
repeated low blocks, fences as thin lines) under a huge pale sky. Messages
are skywritten across the sky in pseudo-script vapor trails — written once,
then dissipating over ~90 seconds. Each message is different; the piece
never repeats a message. Touch anywhere releases a gust: the vapor scatters
faster, but the message is never saved or replayable. Ephemeral by design.

## Frame one

Pale sky `#C9D4D8` filling the frame. The grid occupies the lower third:
low blocks in block-grey `#5A5E63` with ~8% warning-ochre `#B4762A`
accents, fence verticals and two horizontals in fence-line `#2A2C2E`,
a horizon line at 0.667H. One skywriter trace arcs across the upper
field in vapor-white `#F2F2EE`: pseudo-script marks (dashes, dot pairs,
chevrons, arcs, ticks, crosses, circle outlines, zigzags) laid along a
seeded arc. Frame one is phase-shifted +12 s into the 90 s cycle, so the
trace reads ~40% drawn — a message mid-writing, not an empty sky. No
readable text anywhere except `<title>`.

## Cycle (90 s, closed-form over piece time)

- Draw 0–30 s: marks reveal left to right along the arc.
- Hold 30–50 s: full trace, steady.
- Dissolve 50–90 s: alpha fades linearly while each mark scatters along
  a seeded direction and drifts upward; at cycle end the field is exactly
  blank again, and the next message begins.
- Message index = floor((t + 12) / 90); each message is generated from
  mulberry32(1372000 + messageIndex × 7919), so successive messages
  genuinely differ and never repeat within a session.

## Interaction

Touch (pointerdown) anywhere records a gust: a closed-form sum over
recorded gusts with exponential decay (τ 2.5 s) adds scatter offsets and
extra dissolve to every mark. The gust changes nothing else — no replay,
no save, no reload, no history. Its effect decays to exactly zero (probe:
gust vs no-gust renders at t = 40 are pixel-identical).

## Adaptations

- Vapor trails are stored-history fading segments: each mark's alpha and
  scatter offset are pure functions of cycle phase and recorded gusts.
  Never canvas-fade (the QA renderer paints one frame).
- No audio at all. The prompt specs no audio for this piece.
- Grid and messages are seeded functions on the main canvas. No
  pre-rendered textures, no offscreen canvas, no gradients, no
  shadowBlur, no Path2D, no createElement, no getUserMedia.
- Study-wide rule honored: no readable English anywhere. Skytyped marks
  are invented pseudo-script only, never letterforms, never words.
- Viewport from the Visual Viewport API with window fallback; canvas
  pinned in draw() (style width/height in px); phone detection via
  window.screen physical size with aspect fallback; field-like
  composition goes full-bleed on phones with no clipping.
- Determinism: frame one = draw(0) via boot flag, clock starts only with
  the rAF loop (plain function declaration behind a typeof guard); all
  randomness from mulberry32, never Math.random. Thumb renders
  byte-identical across repeated renders.

## Verification

- Rendered at 1280×900, 390×844, 720×720; all three inspected. Desktop
  and mobile both show the pale sky, partial vapor trace, and full grid
  with no clipping.
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  pointer events to its own listener): frame-one vapor 1,660 px (partial
  trace); full trace 4,837 px at t = 18 s; hold at t = 30 s identical
  (4,837 px); dissolve confirmed by image diffs (hold vs mid-dissolve
  12,222 px; hold vs late-dissolve 7,366 px; late-dissolve vs blank
  0 px — the cycle closes exactly); message 0 full vs message 1 full
  differ by 12,063 px; gust vs no-gust at t = 21 differ by 12,472 px,
  decaying to 0 px by t = 40.
- Token scan clean except one comment stating Math.random is never used.
- One harness bug found during probing (first rAF call anchors the
  clock, so a single-call drive always draws t = 0); fixed in the
  harness, not the piece.
