# No.1041 — The Balls Know the Route

Study #128 kyohei-mouri, PP202 "Figure-Eight Dispatch" (particles).

## Concept

Sixteen glowing balls run a figure-eight rail in a black void. They are not
particles and not a screensaver: each ball is a dispatched unit with an
assigned speed and its own blink interval, precise on a circuit it never
leaves. Where a ball has just passed, it leaves a stamp of light; the stamps
die over four seconds, so the eight fills with a cloud of fading color, a
space built out of timing. The rail itself is nearly invisible, a rumor of
steel. The balls are the only light.

## Construction

- Rail: lemniscate of Bernoulli, precomputed into a 2048-segment arc-length
  table at load, so every position is an arc-length fraction u in [0,1) and
  balls travel at constant true speed along the curve. Drawn as a thin
  #1A1B1E stroke on the #060607 field.
- Balls: 16, seeded with mulberry32. Each gets a hue from the strict palette
  (#FFFFFF, #FFE9B8, #7FD4FF, #FF6B6B, #9DFF7F), a seeded offset along the
  rail, a speed, and a blink timer (period, duty cycle 0.3–0.75, phase).
  Brightness uses smooth attack/release edges inside each blink; between
  blinks a ball rests at a 0.12 dim floor so the unit never vanishes.
- Loop closure (the honest record): the master loop is 55 s. Speeds are
  whole laps per loop (2–6 laps per 55 s) and blink periods are 55/m seconds
  for integer m (m in 61, 42, 28, 18, 14, 11, 9, giving roughly 0.9 s to
  6.1 s intervals). Because both the lap counts and the blink divisors are
  integers against the same 55 s, positions AND the blink pattern close
  exactly at the loop, not approximately. No irrational speeds are used, so
  no approximation had to be accepted.
- Stamps: each ball stamps its position every 0.4 s of travel; a stamp fades
  linearly from alpha 0.26 (core) over 4 s, so each ball carries exactly 10
  live stamps, 160 total, the capped ring buffer's depth. A stamp's alpha is
  also scaled by the ball's blink level at the stamp's own moment, so the
  cloud records the intervals, not just the paths. Stamps are discrete discs
  at sampled past positions, never a canvas fade or blur.
- Determinism: ball positions and the whole stamp cloud are closed-form in
  piece time t: u(t) = offset + speed * t, and stamp j of a ball is the same
  formula evaluated at t − j*0.4. The ring buffer's contents are derived
  analytically each frame instead of accumulated, which is what lets frame
  one exist without any prior frames. Frame one is the synchronous draw at
  fixed phase t = 16 s; nothing is derived from Date.now(). The rAF loop
  (typeof-guarded) replays t = 16 + elapsed.
- Interaction: drag along the rail gives nearby balls a temporary speed
  surge that integrates into a per-ball phase offset and decays back to the
  dispatched interval; tap on a ball holds its blink steady for 5 s;
  double-tap reseeds speeds and intervals (reseed counter into the same
  seeded generator). All interaction state starts at zero, so the pre-input
  piece is exactly the deterministic one.
- Sound: lazy AudioContext created only inside the first pointer gesture,
  typeof-guarded with webkit fallback. A 55 Hz low-passed shimmer fades in
  under the piece (the cloud), faint clicks fire on blink onsets pitched by
  ball speed (the intervals, ticking), and a soft tone marks a tap hold. No
  microphone, nothing audible or created in the QA renderer.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas.style.width/height pinned
  in px inside draw(); phone detection via window.screen min dimension
  < 700 px with the h > w*1.15 aspect fallback only; the eight is scaled to
  84% of frame width and height-checked so the circuit always completes
  uncropped; page ground is the field tone; glow is layered flat-alpha
  discs (no gradients, no shadowBlur, no ctx.filter, no offscreen canvas);
  no visible text except the title.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png). All render cleanly in silence.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical, before and after the tuning pass. Duplicate deleted.
- Read-back, desktop: black field, faint figure-eight rail, 16 balls spread
  along the circuit in the five hues at clearly varied brightness (several
  hot, several dim between blinks), each trailed by a dotted wake of dying
  stamps following the curve, the wakes overlapping and thickening where
  traffic converges through the crossing.
- Read-back, mobile: the full eight sits complete and uncropped in the
  portrait frame, balls and wakes legible at the smaller scale.
- Read-back, thumb: same composition as desktop at 720x720.
- Tuning pass: first read-back showed the stamp wakes slightly too faint to
  read as a cloud; stamp alphas raised (outer 0.10 to 0.14, core 0.20 to
  0.26, radius up a step). Still discrete stamps, still under the 0.3 cap.
  Re-rendered all sizes and re-verified determinism after the change.
- Grep checks: no Date.now, no shadowBlur, no canvas gradients, no
  getUserMedia, no external references in index.html.

## Deviations

- Stamps are computed analytically from the closed-form position function
  rather than pushed into a literal ring buffer at runtime. Reason: the
  determinism gate requires the full stamp cloud at frame one (t = 16 s)
  without simulating prior frames; the analytic form yields exactly the
  160 stamps the capped buffer would hold, with identical positions and
  ages, and the live loop stays a pure function of t plus recorded input.
- Tap targets the nearest ball within a small radius rather than requiring
  a pixel-exact hit on a moving ball. Reason: the balls are small and in
  motion; the hold still lands only on a ball, never on empty rail.
