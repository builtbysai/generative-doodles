# No.1058 "Lightsaber Study"

Study #130 hideaki-tai, HT3 / PP219, after his Perfume lightsaber works
(Perfume Fes!! 2017, inspired-by-Perfume 2020, Challenger PV).

## Concept

One beam of light, held by a dancer who is never shown. The beam carves
choreographed gestures through pure black: sharp cuts, held poses, slow
sweeps. Its recent paths persist as ghost writing, so the frame holds the
last several gestures as fading calligraphy. Invisibility is the rule:
no figure, no hilt, no branding. The choreography is the subject.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets, no
  audio (the prompt specs none), no visible text besides `<title>`.
- Palette (strict): field `#000000`; beam core `#FFFFFF`; beam edge
  `#6BD5FF`; trail ghost `#4A90B8`; held-pose shimmer `#FFB347` (holds only).
- Choreography: a seeded schedule of phrases, each 6-9 gestures, generated
  sequentially from a mulberry32 stream, so beam state at any time t is a
  pure function of (seed, t). Gesture grammar:
  - CUT: 0.35-0.53 s, 60-137 degree arc, ease-in-out.
  - SWEEP: 1.8-2.4 s, 40-100 degree arc, ease-in-out.
  - HOLD: 1.25-1.8 s, near-still; the beam vibrates 0.5 degrees at ~8 Hz
    and a warm `#FFB347` layer warms the halo on a sine envelope.
  - REST: 0.85-1.4 s; beam shortens to ~55% and dims to ~38% (lowered).
  - Sequencing guards: never two RESTs or two HOLDs in a row; directions
    are drawn per gesture, so the dancer improvises and never mirrors.
- Grip point: off-center base (seeded, x 0.40-0.50, y 0.56-0.66 of the
  world square) wandering on two slow sine pairs per axis (the dancer
  walks). World space is a centered square of side min(W,H), so the
  composition is identical in shape at every aspect ratio.
- Beam: length 0.80 x min(W,H) at full extension. Drawn as stacked
  strokes: four `#6BD5FF` halo layers (width 1.5-5.2% of frame, alpha
  0.05-0.22) under a white core (0.75% and 0.32% widths), round caps.
- Trail: ghost stamps are sampled analytically from the schedule's past
  6 seconds at 0.045 s cadence and redrawn each frame from that data
  (no offscreen canvas, no accumulation buffer). Each stamp's alpha is
  weighted by how far the tip actually moved since the previous stamp,
  so held poses lay almost no ghost and moving gestures lay even
  calligraphy; alpha also decays quadratically with age. Trail coverage
  stays well under 60% of the frame.
- Interaction: watch-only. Double-tap (dblclick, or two pointer taps
  within 0.35 s of piece time) reseeds the choreography immediately.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas style width/height
  pinned in px in draw(); phone detection via window.screen (min
  dimension < 700px) with aspect fallback; rAF typeof-guarded, so the
  synchronous first frame at the fixed phase T0 = 33 s is the frame one
  everywhere.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and `cmp` byte-compared:
  identical. Frame one is the synchronous draw at fixed T0 = 33 s from
  the seeded schedule; nothing is derived from Date.now().
- Frame one read-back: pure black field; one bright beam (white core,
  pale blue layered halo) angled steeply up-right from an off-center
  grip below center, tip inside the frame; several distinct fading blue
  ghost gestures behind it (a diagonal sweep to the upper left, near-
  vertical traces, the current gesture's own fresh stamps). Ghost
  coverage is a small fraction of the frame. No figure, no hilt object.
  Mobile: same composition in the centered square, nothing clipped.
- Phase selection: initial T0 = 26 s landed on a near-horizontal beam
  whose tip exited the frame; T0 was probed at 21 / 23.5 / 26 / 29 / 33 s
  and 33 s chosen because the beam sits diagonal mid-gesture with its
  tip in frame and the preceding gestures read as separate ghosts.
- Grep-verified clean: no gradients, no shadowBlur, no ctx.filter, no
  offscreen canvas, no Date.now, no AudioContext, no getUserMedia,
  no external URLs, no em dashes.

## Deviations

- Gradient override (per brief): the source prompt allows a radial-
  gradient halo for the beam. House gate forbids canvas gradients, so
  the halo is built from layered strokes of decreasing alpha and
  increasing width. It reads as the same light tube and passes the gate.
- Trail weighting (construction choice, recorded): ghost stamps are
  weighted by tip movement. Without it, a held pose stamps the same
  segment ~130 times and stacks to a second bright beam, which breaks
  the "one beam" reading and the coverage rule. The prompt's trail
  intent (fade over ~6 s, last several gestures as ghost writing) is
  preserved.
- REST rendering: "lowered" is expressed as shortened + dimmed rather
  than forced to a downward angle, because gesture end angles are the
  choreography's continuity; snapping to a fixed down angle would read
  as a teleport between phrases' poses.
