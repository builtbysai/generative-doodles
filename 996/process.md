# No.996 "Hold the Light" (study #122 satoshi-horii, PP157 "phosphere")

## Concept

The audience holds a luminous ball, and eight beam projectors at the edges of a
dark room draw geometry out of where the ball has been. The ball's recent
positions become the vertices of a slowly rotating mint wireframe volume: the
beams do not just light the ball, they stitch its path into a constellation.
Three warm dancer dots drift through the room and flare amber when a beam
passes over them. The volume grows, holds, and exhales: the oldest vertices
release and drift off. Untouched, the ball drifts a seeded lissajous path and
builds the volume on its own; a visitor can drag the ball (it follows with
weight and lag), tap to send a pulse wave out along all eight beams, or
double-tap to release the whole constellation and begin a new one.

## Construction

- Ball: closed-form seeded lissajous idle path (two-axis layered sines),
  evaluated as a pure function of piece time t. Frame one is the synchronous
  draw at t = 12 s; nothing is derived from Date.now() or any wall clock.
- Drag: pointer samples set a target; the ball chases it through a damped
  spring (stiffness 90, damping 13) integrated in fixed 1/120 substeps, so it
  visibly lags and overshoots slightly instead of behaving like a cursor. On
  release the ball does not snap back: the offset between the ball and the
  idle path is captured and decays exponentially (tau 1.15 s) on top of the
  idle path, so the room takes the ball back smoothly.
- Wireframe volume: ball positions are sampled every 0.35 s into a history
  (prefilled at load by evaluating the idle path backwards from t = 12 s, so
  frame one already holds 26 vertices). Each vertex carries a pseudo-depth
  from its rank in the history (newest front, oldest back); the whole set is
  rotated about the history centroid (Y rotation 0.13 rad/s, gentle sinusoidal
  X tilt) and projected with a weak perspective divide. Edges connect
  consecutive vertices plus skip-3, skip-5 and skip-9 cross-links, so the path
  reads as a woven volume rather than a single strand.
- Exhale: vertices older than 9.45 s fade over their last 1.05 s of life and
  are dropped; a double-tap marks every live vertex released, and released
  vertices drift away from the centroid while fading over 1.5 s.
- Beams: eight fixed sources (two per side) each draw a thin cyan line to the
  ball; per-source brightness shimmers on a seeded phase so alignment varies.
  A tap records a pulse: a bright segment travels outward along every beam
  over 0.45 s and the wireframe edges flash with an exponential decay. Dancer
  flare is computed honestly: point-to-segment distance from each dancer to
  each live beam, flaring amber under a threshold.
- Trail: a 46-point buffer of recent ball positions, prefilled from the idle
  path at load, drawn as a single white polyline at 0.15 alpha.
- Sound (first pointer gesture only, lazily created, typeof-guarded): a warm
  two-oscillator hum whose pitch follows ball height and whose stereo pan
  follows ball x; thin triangle blips on pulse; a soft sine strike when a
  dancer enters flare; a filtered noise release on exhale. The piece is fully
  visual in silence.
- House adaptations: the prompt's radial-gradient glow is banned by house
  rules, so the halo is three concentric flat-alpha circles (0.16 / 0.09 /
  0.05) around a solid core; all geometry is seeded (mulberry32) or closed
  form; canvas sizing uses the Visual Viewport API with resize listeners on
  both visualViewport and window, canvas CSS size pinned in draw(), phone
  detection via window.screen with aspect fallback.

## QA log

- Rendered with ~/workspace/tools/render-piece.js (node-canvas, silent, no
  rAF): qa-desktop.png 1280x900, qa-mobile.png 390x844, thumb.png 720x720.
  All render cleanly with no audio and no interaction.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. The duplicate was deleted.
- Read-back, desktop: dark room; white ball right of center at about
  (0.60, 0.44) with layered halo and a short fading trail; eight thin cyan
  beams from edge dots converging on the ball; mint wireframe constellation
  of 26 vertices with chain and cross-link edges occupying the middle; three
  warm dancer dots, the lowest one flaring amber where a beam crosses it.
- Read-back, mobile (390x844, phone path): beams and sources stay at the
  edges, ball and constellation scale to the narrow frame, nothing clipped.
- Fix round: the first build's constellation read as a single ribbon strand;
  depth amplitude was raised (0.52 to 0.62 of min dimension), rotation
  quickened slightly, and skip-5 / skip-9 cross-links were added so the
  volume reads as a woven mesh. Re-rendered all sizes and re-verified
  determinism after the fix.
- Hygiene: grep confirms no gradients, no shadowBlur, no ctx.filter, no
  offscreen canvas, no Date.now, no external URLs, no em dashes; the only
  text in the piece is the <title>.

## Deviations

- Halo: radial gradient replaced by layered flat-alpha circles, per house
  rules (see Construction). Visually equivalent at this scale.
- Release behaviour: after a drag, the idle drift resumes via a decaying
  offset rather than an instantaneous return to the lissajous, to preserve
  the ball's sense of weight; the offset reaches zero smoothly and the path
  is fully closed-form again within a few seconds.
- During a drag, wireframe sample times are stamped at spring substep
  boundaries (within 1/120 s of the true crossing), a negligible pairing
  offset that keeps sampling inside the fixed-step integrator.
