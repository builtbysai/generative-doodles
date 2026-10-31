# No.842 "The Feedback Machine" (EXPANSION #103 lou-reed, PP3)

## Concept

Metal Machine Music as a machine that plays itself: two guitar-and-amp systems
facing each other across a black field, feeding each other until harmonics
bloom where they meet. Nobody performs it and nobody touches it. The left and
right systems run genuinely different patterns (the stereo split is the
signature), a static performer emblem in dark glasses watches from a side
panel with a red rim edge, and the small print underneath is a fake equipment
list in the deadpan of the MMM liner notes. Watch-only: no interaction, no
hint text, no melody, no ambience.

## Construction

- One seamless 64 s loop stands in for the 16:01 sides. Loop time is
  tau = (12 + elapsed) mod 64, so frame one sits at loop t = 12 s, mid-surge
  with the gain still rising toward the 14 s peak (chosen after test renders
  at anchors 10, 12 and 55; 12 showed the strongest collision structure).
- Left system: 6 lines, a closed-form sum of 3 seeded sine components
  (spatial frequencies 1.5 / 2.7 / 4.3 cycles across the field, slow temporal
  rates) plus a small per-line texture term. Right system: 5 lines from 4
  components at higher frequencies (2.2 / 3.9 / 5.6 / 7.4) with different
  rates and signs. Each side's displacement tapers toward the center via an
  amplitude envelope. All phases come from mulberry32 seed 842003.
- Collision zone (center 40-60% of the field width): the two fundamentals are
  summed from the same component sets that draw the lines, so the collision
  is computed, not decorated. The sum is drawn as a bright chrome curve, the
  band between the sum and its mirror is filled at low alpha as a collision
  envelope, and harmonic blooms (halo + core + short peak tick) are placed
  only at local maxima of |sum| above a threshold, so peaks stay sparse.
- Coupling schedule: the feedback between the systems is a scripted gain
  function of loop time, not simulated physics (recorded choice: a real
  feedback simulation would not be closed-form or deterministic). Gain
  keyframes (loop seconds): 0:0.62, 6:0.85, 10:1.12, 14:1.30, 19:1.18,
  24:0.95, 30:0.82, 36:0.66, 44:0.55, 50:0.52, 54:0.85, 57:1.08, 60:0.88,
  64:0.62, cosine-interpolated; first and last keys match so the loop wraps
  seamlessly. Both sides' amplitudes are this gain times their dropout factor.
- Dropout windows (loop seconds, smoothstep bump with 0.4 s edges):
  right side empties to 5% and its temporal rates halve (register drops an
  octave) during 15.0-18.0; left side empties to 8% during 31.0-34.0; both
  sides sag to 50% together during 56.0-58.5. No window crosses the loop
  boundary, preserving the seamless wrap.
- Panel: fully static (no time dependence). Pale chrome face plane, two black
  lens rectangles with bridge and temple arms, a red rim line down the
  panel's left edge, a red rim-light on the face's right edge, a shoulder
  block and a red underline. It shrinks on phones but never disappears.
- Caption (the only visible text besides the title, prompt-specced): an
  invented equipment list, three lines of small chrome monospace, auto-shrunk
  to fit the viewport width:
  "EQUIPMENT: TWO ELECTRIC GUITARS, FOUR AMPLIFIERS, ONE REEL-TO-REEL TAPE RECORDER /
  NO VOCALS. NO MELODY. NO OVERDUBS. NO APPLAUSE. /
  RECORDED 5 A.M., GARMENT DISTRICT. DO NOT ADJUST YOUR SET."
- Palette strict: black #0A0A0A, chrome #C9CCD1 (all wave/panel tones are
  alpha variations of it), red rim #B3202C. No gradients, no shadowBlur, no
  ctx.filter, no offscreen canvas.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas.style.width/height pinned in
  px inside draw(); phone detection via window.screen (min dimension < 700)
  with aspect fallback; frame one is the synchronous draw(0); time in the
  loop comes from performance.now elapsed, never Date.now; rAF typeof-guarded
  so the piece renders complete in silence where no rAF exists.

## Deviations

- No sound. The prompt marks WebAudio optional and gallery pieces are silent;
  the omission is recorded here per the brief.
- The coupling is a scripted gain schedule rather than simulated feedback
  physics, so every frame is a closed-form function of loop time and the
  determinism gate can hold.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png); the piece
  runs clean in the silent QA harness (no rAF, no AudioContext).
- Determinism: thumb.png rendered twice and cmp byte-compared identical
  after every fix round; duplicate renders deleted.
- Fix round 1: the first build placed a bloom at every sample above
  threshold, which read as a dense feather/comb at the collision point, and
  the sum curve's scale was so large it read as a stray swoosh. Blooms were
  restricted to local maxima of |sum|, the sum scale reduced, and a
  low-alpha collision envelope added between the sum and its mirror.
- Fix round 2: frame-one anchor moved from loop t = 10 to t = 12 after
  comparing test thumbs at 10 / 12 / 55; at 12 the collision shows two clear
  bloom knots (one full-strength with halo and peak tick, one smaller) on the
  bright summed curve while the gain is still rising.
- Final read-back: desktop and thumb show the slow left line family and the
  denser right family colliding at center with the blooms on the summed
  curve, the glasses panel at right with its red rim edge, and the three-line
  equipment caption beneath; mobile holds the same composition with a
  narrower panel and the caption intact. Nothing clipped at any size.
