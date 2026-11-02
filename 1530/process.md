# No.1530 "The Costume Changes the Bearer" (mohamed-bourouissa MB3, PP777)

Gallery date: 2006 · 03 · 21 (recorded here only, never drawn in the piece).

## What it is

Dark field #121014 with six plain abstract marks (torso-line glyphs, muted
grey #7a7568) wandering slowly, and six bright costume pieces scattered
across the field (discs, rosettes, streamer-bundles in signal red #c23b2a,
gold #c9a86a, silver #d8d8d8). When a wandering mark touches a costume
piece it picks it up and wears it, and instantly its behavior changes: it
turns bone #e0d6c0 and walks a proud, slow, high-stepping circle instead
of wandering, while other marks give it a wide berth. When two decorated
marks meet on the circle they exchange one costume piece. Decorations are
never removed, only exchanged. The shared circle centres on the first
pickup point, so it forms where the first gathering happens, never at a
fixed stage spot.

Loop: 180 s. The arc replays each loop: wander, pickup, circle, exchange.
Within one loop a decoration is never removed, only exchanged; the loop
boundary is the film-loop restart, exactly like every other loop piece.
This is the honest reading of "behavior-change loop" combined with the
byte-closure rule: a decorated count can only stay constant or grow
inside one period, so a fully continuous arc that also returns to its
start state is impossible without removing a decoration, which the prompt
forbids. The restart is exact (frame t=180 and t=360 byte-identical to
frame t=0), so the loop replays cleanly.

## How it is built (closed-form throughout)

- Seed: mulberry32(1530000). No unseeded randomness anywhere.
- Wandering is closed-form: sums of sines with whole cycles per 180 s
  loop, seeded homes, amplitudes and phases, so every path is exactly
  periodic. No random walk, no accumulated state.
- Pickups are a seeded timetable (mark i picks up piece i at 19, 36, 55,
  67, 89, 104 s). A raised-cosine approach bump (10 s window) pulls each
  mark's path so it sits exactly on its piece at its pickup time; the
  probe verifies the touch to within 2 px. This is deterministic
  choreography, not proximity detection, which is what makes the schedule
  exact and the loop closure provable.
- After pickup a mark blends over 6 s (smoothstep) from the piece onto
  the shared circle (centre = piece 0's home, radius 0.16 of the short
  field side plus i x 0.0125), then circles at 1 or 3 revolutions per
  loop with a high-stepping gait (alternating leg lifts, small bob).
- Wide berth: undecorated marks are pushed away from decorated marks
  (90 px radius at reference 720 field, strength up to 70 px, capped at
  85 px), with the push fading out exactly as the approach bump takes
  over so the pickup touch stays exact. Probe minimum over 40 samples:
  41.7 px centre distance.
- Exchanges: precomputed at load by sampling the natural choreography
  (reference 720 field, 0.25 s steps, 30 px contact range, 20 s cooldown
  per pair). Nine exchanges in the loop, first at 64.25 s (marks 0 and 1).
  Ownership is a permutation of the six pieces over the six marks; the
  probe verifies an exchange swaps exactly the two marks' pieces and
  that all six pieces are conserved at every sample.
- Drag: pointerdown grabs the nearest unclaimed piece (within 26 px) or
  decorated mark (within 30 px). Dragging a piece to a wandering mark
  (within 45 px on release) dresses that mark immediately: it blends
  onto the circle from its natural position and keeps the piece.
  Dropping a piece elsewhere springs it home over 1.2 s. Dragging a
  decorated mark pulls it out of its circle; it walks plainly while
  dragged (bone colour and piece kept), then blends back to its circle
  over 3 s on release, still decorated. Drag never strips a costume,
  never adds a mark, never stops the wandering. Dragging an undecorated
  mark or dropping a piece on a decorated mark has no effect.
- Drag-dressed marks keep their piece permanently (absolute event time);
  the no-drag loop stays exactly periodic. With dresses present, worn
  state is computed by a full absolute replay of schedule events
  (expanded per cycle) plus dress events, in order; without dresses it
  is exactly the periodic schedule state. Same event log always gives
  the same frames.
- Field-like layout: full-bleed on phones, centred square on desktop
  over the same ground colour. Canvas from the Visual Viewport API,
  pinned in draw(); phone detection via window.screen with aspect
  fallback. Fully silent; no audio of any kind.
- Ground shadows are flat #241f28 rects under marks and pieces. All
  glyphs are flat colours, one beginPath per element, dots as single
  arcs (never batched), fading alphas are literal decimals.

## Fix rounds (2)

1. Line-cap state leak (caught by the thumb byte-compare probe): the
   marks set round line caps, and canvas cap state persists across
   draw() calls, so the streamer tips rendered with butt caps on the
   first frame and round caps on every later frame — 91 pixels differed
   between the load frame and the loop frame, although the hook state
   was identical. Fix: the streamer branch now sets its cap explicitly
   to butt. After the fix the load frame, loop frames and shipped thumb
   are all identical, and the thumb md5 is unchanged.
2. Berth threshold: the first build's minimum undecorated-to-decorated
   distance was 39.7 px against a 40 px probe threshold (pushes from
   several decorated marks partially cancelling). Fix: repulsion
   strength 55 to 70 px and cap 70 to 85 px. Re-measured minimum: 41.7 px.

## QA (probe-1530.js, vm-isolated, real node-canvas, all pass)

- Frame one identical across fresh instances; 6 marks, 6 unclaimed
  pieces; circle centre equals piece 0's home.
- Loop closure t=180 and t=360 byte-identical to t=0.
- Pickup: mark 0 grey wandering before pickup, touches its piece
  exactly at pickup time, bone circling on its ring radius after.
- Wide berth: min 41.7 px over 40 samples, threshold 40 px.
- Exchange: 9 scheduled; the first isolated exchange swaps exactly the
  two marks' pieces; all 6 pieces conserved.
- Costume drag dresses the mark; decorated-mark drag follows the
  pointer with plain gait, keeps its piece, and resumes circling on its
  ring after release; both drag paths conserve pieces.
- 6 marks and all 6 pieces conserved at every 10 s sample 0..180.
- Every mark moves between t=10 and t=12.
- Thumb byte-compare: two fresh 720 renders match the shipped thumb
  pixels exactly; two render-piece renders byte-identical to the thumb.
- Forbidden-API grep: 0 hits (no unseeded randomness, wall-clock
  timers, audio, microphone, gradients, or drawn text).

## Deviations from the prompt

None beyond documented house-rule adaptations (canvas 2D, closed-form
motion, flat colours, fully silent, seeded PRNG) plus the readings
above: the loop replays its arc each period (see "Loop" note); pickups
are a seeded timetable with a guaranteed-touch approach bump rather
than proximity detection (the rendered touch is exact); exchanges are
scheduled from the natural circle choreography (on non-square phone
viewports a swap may occur with the two marks a few px further apart
than the 30 px reference range, since angles, not distances, carry the
schedule); the shared circle centres on the first pickup point.
