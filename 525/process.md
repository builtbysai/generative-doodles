# №1651 — The Phase Experience, Episode 1 (HF4, #217 HAL09999, PP898)

Driver: a local order parameter decays on its own and the pointer injects entropy that the field absorbs and relaxes away.

## Build
- 560 point agents on a 28 x 20 seeded lattice (mulberry32, fixed seed 1651001).
  Each agent carries a fixed-hash equilibrium order eq in [0.35, 0.80], a
  prismatic color (magenta / cyan / yellow / green), and a drift phase.
- Ordered agents (o >= 0.45) draw as prismatic voxels with a white-gold glow
  and a bright core dot; neighbors with o >= 0.55 are joined by faint
  gold crystal bonds. Chaotic agents draw as rust-orange cores with a
  dotted white orbital ring (6 dots, radius grows as order falls).
  Displacement from the lattice site grows as (1 - o), so chaotic agents
  drift on slow orbits while ordered ones sit still.
- Dynamics per second: order decays toward a 0.06 chaos floor at 0.020/s
  and relaxes toward its fixed-hash equilibrium at 0.010/s, giving a
  low-order simmering steady state near 0.23 with no interaction.
- Interaction: drag right/down injects positive entropy (order falls at the
  pointer, Gaussian falloff radius 3.4 spacings); drag left/up injects
  negative entropy (order crystallizes locally). A pointer held still for
  700 ms switches the field to settling mode, relaxing toward equilibrium
  at 0.25/s. No score, no win state, no reset control, no audio.
- Frame one is drawn synchronously at fixed phase t = 6 s; the rAF loop is
  anchored as offset + elapsed-since-load. No Math.random, no wall clock
  in frame one. Title/date/hint plates follow the house template from
  №1647 (dark plate, light ink, on the black ground).

## Acceptance criteria (measured by probe, node harness)
- 560 agents; frame-one mean order 0.4394 (developed mixed field, part
  crystal, part rust).
- Watch-only decay: mean order 0.4394 -> 0.3151 after 30 s.
- Positive entropy injection at frame center: center agent 0.3466 -> 0.02
  (floor), field mean 0.3151 -> 0.2778.
- Negative entropy injection at the same point: center agent 0.02 -> 0.5086.
- Relaxation: after 30 s watch-only the mean settles at 0.2451, matching
  the designed decay/relax equilibrium (~0.23).
- Long-press settle: 10 s of settling lifts the mean 0.2451 -> 0.5331,
  toward the mean equilibrium 0.575.
- Thumb rendered twice at 720 x 720: byte-identical (md5 match, see below).

## What was probed / measured
- Probe script /tmp/probe-1651.js (same canvas shim as render-piece.js):
  drove __probe.drawAt in 0.1 s steps and read orderMean / orderAt /
  injectAt / setSettle. Numbers above are its output.
- Renders inspected: desktop 1280 x 900, mobile 390 x 844, thumb 720 x 720.
  All three show the mixed field (prismatic voxels with gold glow, rust
  cores with dotted white orbitals, faint bonds), legible title/date/hint
  plates, no clipping, no blank areas.

## Deviations
- Plates: the spec says "no UI, no buttons, no instructions", but the
  house template from the reference piece №1647 (cited in the task) is
  title/date/hint plates, and the gallery note carries the same cue, so
  the standard plates are included. No other UI, no buttons, no score.
- Probe stepping: the first probe run used 1/60 s steps and was killed
  after ~2 min (too slow: ~4560 full-field draws); re-run at 0.1 s steps
  (dt clamp is 0.1, rates are <= 0.25/s, integration error negligible).

## Fix rounds
- Round 1: probe crashed at first draw: drawOrbital and several drawField
  call sites passed pre-stringified alphas (.toFixed(4) strings) into
  rgba(), which calls a.toFixed again. Fixed all six call sites to pass
  numbers; rgba() still rounds to 4 decimals (node-canvas quirk guard).
- Round 2: no visual fixes needed after the crash fix; renders inspected
  clean on first pass.
