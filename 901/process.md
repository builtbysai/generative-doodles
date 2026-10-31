# No.901 — R_u.'n

Study #110 sakrmusic, PP62 "The Redrawing Line".

## Concept

One white line, redrawn forever, on a black field. A single polyline with a
moving head: the head advances and draws, the tail fades from white back
through the echo grey and drops away, so the line is always a few seconds of
its own recent past. It never settles into a knot and never closes into a
coil; it cycles between the two.

Below the field, taking the bottom 28 percent of the frame, sits the machine
that drives it: a dark sequencer strip with sixteen step lights, exactly one
lit amber at a time. The strip is a receipt, not a dashboard. The sequencer
is the piece's single clock: the same step advance that moves the light also
plucks the note, and the note's stereo pan is the head's x position, so what
steps is what draws and what sounds.

Interactions: drag in the upper field to grab the head and steer it (slow
hands coil it, fast hands stretch it; the sequencer keeps stepping
regardless). Tap to reseed: the line snaps to the tap point and redraws from
there. Double-tap to force the knot: maximum coil density for four seconds,
then release.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets. Strict
  palette: ground #060606, line #FFFFFF, line echo #3A3A3C, strip #141416,
  step light #FF9E5C, step dim #3A2E24. No visible text; the title is the
  only text.
- Layout: upper panel is the top 72 percent of the viewport, the sequencer
  strip the bottom 28 percent, at every size. Canvas sized from the Visual
  Viewport API with resize listeners on both `visualViewport` and `window`;
  canvas CSS width/height pinned in px inside `draw()` every frame. Phone
  detection via `window.screen` min dimension < 700 px with the
  `h > w * 1.15` aspect fallback.
- Simulation: fixed timestep, 120 Hz accumulator in the rAF loop (guarded
  with a `typeof requestAnimationFrame` check). The head is steered by a
  blend of two modes. KNOT: a curl-style angle from a seeded 2D value-noise
  fbm field (integer-hash lattice, exact across engines; field scale tied to
  frame size, angle drifted very slowly by sim time). COIL: steering toward
  a slowly wandering center with a tangent-plus-inward-bite angle, producing
  a tightening spiral that never closes because the center keeps moving.
  The blend follows a 40 s closed-form cycle; frame one sits at blend
  ~0.33, rising toward coil. Soft wall steering keeps the head in the panel.
- The sequencer: step phase advances at a base 7 steps/s, nudged by the
  head's smoothed speed (rate factor 0.88 to 1.18), so a rushing head steps
  the machine slightly faster. Step index starts at 5.
- Head/sequencer coupling: one `stepSim()` advances the head and the step
  phase together; when the step index changes, `pluck(step)` fires. There
  is no second clock anywhere in the piece.
- Audio: WebAudio, created lazily inside the first pointerdown and
  typeof-guarded (`AudioContext` / `webkitAudioContext`,
  `createStereoPanner` checked before use). Each pluck is a triangle
  oscillator through a short exponential decay envelope (0.38 s), note from
  a fixed sixteen-step melody over an A-minor pentatonic row, pan =
  head x mapped to -0.8..0.8. Silent until the first gesture; in the QA
  harness there is no audio context and the piece renders complete.
- Gestures: pointer events on the canvas. Tap vs drag decided on release
  (held < 0.3 s and moved < 2 percent of the smaller dimension). A tap is
  held pending for 0.35 s of sim time; a second tap inside the window
  converts it into the double-tap coil force and cancels the reseed,
  otherwise the tap matures into the reseed at the tap point (the house
  disambiguation pattern, as in No.900). Drag steering: beyond a small
  radius the head chases the finger with distance-scaled speed; inside it,
  the desired direction turns tangential so the line coils around the
  finger.

## QA log

- Pre-roll: 660 fixed steps (5.5 s at 120 Hz) run synchronously at init
  before frame one, so the first frame already shows the line mid-formation
  (a loose knot beginning to coil) with the sequencer partway along its row.
  simTime, the trail, and the step phase all derive from these steps and
  the seeded field only; `Date.now()` is never used.
- Determinism gate: `thumb.png` (720x720) rendered twice with
  `node ~/workspace/tools/render-piece.js`; `cmp` reports the two renders
  byte-identical. The duplicate render was deleted.
- Renders read back:
  - qa-desktop.png (1280x900): black upper field, one white line sweeping
    down from a forming loop near the top center, bright at the head and
    fading to echo grey at the tail; dark strip below with fifteen dim
    brown dots and one amber dot lit near the right of the row.
  - qa-mobile.png (390x844, phone path): the line stays inside the tall
    panel with a loop forming at the upper right; strip and dots uncrowded,
    one amber lit; nothing clipped.
  - thumb.png (720x720): the line mid-sweep in the upper panel, one amber
    step lit in the strip.
- Tuning round: the first build's field was too smooth and the head hugged
  the panel's bottom edge (a long flat clamped segment in frame one, and
  the line running off the right edge on mobile). Fixed by tying the field
  scale to frame size with a wider angle range, stronger soft walls, a
  longer pre-roll (660 steps) and a longer trail (560 points). Re-rendered
  all three sizes and re-ran the byte-compare green.
- Deviations: none from the brief. Two recorded choices: (1) the reseed
  point for a tap is the tap point itself, the most literal reading of
  "the line snaps to a fresh start point"; (2) the tap commits after the
  0.35 s double-tap disambiguation window (house pattern), so a double-tap
  can pre-empt it and become the forced knot instead.
