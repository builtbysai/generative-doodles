# No.953 — 100 Agents, Straight Lines

Study #117 reas, PP114 "The Score". The score is performed, never displayed:
no text anywhere except the `<title>`.

## Concept

One hundred software agents are released onto a near-black toroidal square.
Each walks in a perfectly straight line — no flocking, no wandering, no
noise. The only event in an agent's life is a crossing: when its walked step
intersects another agent's recorded trail, both agents turn by the score's
current angle. The younger of the pair (later birth order) turns left, the
older turns right. A 1 px white bloom flashes at each crossing and fades over
2 s. Trails are the walked paths themselves, fading over 30 s, so the ground
accumulates a temporary city: dense right-angle intersections where agents
keep interrupting each other, long boulevards where one ran undisturbed.

The score advances every 180 s of piece time:

- Stage 1 — turn 90°, cool palette (chalk, slate, ochre)
- Stage 2 — turn 60°, warm palette (ochre, rust, chalk)
- Stage 3 — turn 90° plus trail avoidance, warm-dark palette (rust, ochre, slate)
- then the cycle repeats, with all headings given one seeded global rotation

Interaction reads as interruptions of the performance, not controls: a tap
freezes the three nearest agents for 4 s (their trails brighten while held);
a drag lays a temporary wall that agents reflect off for 20 s before it
dissolves; a double-tap starts a new performance (fresh seeded agents, rule
cycle restarted, old traces washing out over 2 s instead of cutting).

## Construction

- Fixed-timestep simulation at 120 Hz in a 1000×1000 virtual world mapped
  onto the viewport (independent x/y scale, full-bleed). At load exactly
  3,600 steps (30 s) are pre-rolled synchronously, so frame one is already a
  city of traces; the rAF loop is typeof-guarded and advances the same sim
  in fixed steps, capped per frame.
- Agents: 100 on desktop, 70 on phones (screen min dimension < 700 px, aspect
  fallback). Spawned at seeded points along the edges, headings biased deep
  inward, 65% snapped to compass/diagonal bearings for the axis variety.
  Speeds 22–30 units/s. Positions wrap toroidally; the trail breaks at the
  seam (no segment is drawn across the wrap).
- Trails: each agent records a segment every 8 steps (15/s) into a global
  birth-ordered list plus a spatial hash (24-unit cells). Segments carry
  their birth color; palette changes lerp each agent's live color over 10 s,
  so segments born during a transition take intermediate colors while older
  segments keep theirs (recorded choice, per the brief). Culling is amortized
  from the head of the list; hash entries are removed with their segment.
- Crossings: each step, an agent's movement segment is tested against other
  agents' hashed trail segments in the surrounding 3×3 cells (excluding its
  own trail and segments younger than 0.25 s, i.e. the one at the other
  agent's head). On a hit, both agents turn immediately (younger left, older
  right, by the stage angle) and a bloom is spawned at the intersection.
- Turn cooldown: after turning, an agent cannot turn again for 3.2 s
  (~83 units of straight run). This sets the city-block scale, produces the
  long boulevards, and lets agents escape tight trail pockets instead of
  pacing tiny rectangles. Found by QA: at 0.75 s the frame collapsed into
  dozens of small closed rectangles; at 3.2 s it reads as a city plan.
- Stage 3 avoidance: agents sample other agents' segments younger than 6 s
  within 30 units and blend a repulsion into their heading, turn-rate limited
  to 2.2 rad/s — a slight steer, never a curve in their walk.
- Walls: drag points (every ~8 units) become a segment list stamped as an
  event; consumption happens in step order. Collision reflects the heading
  across the wall segment and nudges the agent out along the normal.
- Events (tap freeze, wall, reseed) are recorded with the step count at
  pointer time and consumed by the sim in step order. A tap waits out a
  42-step (0.35 s) double-tap window before the freeze fires; a second tap
  inside the window cancels it and queues the reseed instead.
- Sound: lazily created AudioContext on the first pointer gesture, all use
  guarded. Crossings tick (sine blip, pitch from the turning agent's heading,
  re-tuned per stage, hard-throttled to 8 per sim-second). A stage advance
  strikes a low triangle tone. The piece renders complete in silence.
- Rendering: trails are bucketed by quantized color and alpha (0.05 steps)
  and stroked as batched paths — no per-segment state changes, no gradients,
  no shadowBlur, no filters, no offscreen canvas. Canvas size comes from the
  Visual Viewport API with resize listeners on both visualViewport and
  window; the canvas style width/height are pinned in px on every draw.
  Determinism: frame one is the synchronous draw after exactly 3,600 seeded
  steps (mulberry32); no clock feeds any drawn state.

## QA log

- Rendered with `render-piece.js` at 1280×900 (qa-desktop.png), 390×844
  (qa-mobile.png), 720×720 (thumb.png). All render cleanly in silence
  (no AudioContext in the harness; the piece is visual-first).
- Determinism: thumb.png rendered twice, `cmp` byte-identical. Duplicate
  render deleted.
- Fix round 1: first pass (0.75 s turn cooldown) read as scattered small
  closed rectangles with a hollow center — agents were turning every ~20
  units and pacing blocks near the edges. Cooldown raised to 3.2 s and spawn
  headings biased deeper inward (jitter ±0.9 rad → ±0.5 rad, snap rate 65%).
  Re-rendered: long boulevards now cross the whole frame, blocks are
  city-scale, traces fill the center, brighter agent heads and occasional
  white bloom specks visible; mobile keeps the full field with nothing
  clipped.
- Frame one (after pre-roll): near-black ground webbed with straight chalk,
  slate and ochre segments meeting mostly at right angles, density varying
  between downtown clusters and open blocks, small bright agent heads at
  trail ends.

## Deviations

- Crossing detection runs against recorded trails, not against other agents'
  same-step movement segments: two 0.22-unit step segments almost never
  geometrically intersect in the same step, while path-vs-trail crossing is
  the readable event (and matches "when two agents' paths cross"). The turn
  rule, seniority and bloom are exactly as specced.
- A 3.2 s post-turn cooldown is added (see Construction). Without it the
  score degenerates into rectangle-pacing and the boulevards never form;
  the rule itself is unchanged — both agents still turn at every registered
  crossing.
- Segments born during a 10 s palette crossfade take the agent's current
  (interpolating) color rather than snapping; pre-existing segments keep
  their birth color, as the brief directs.
- The stage-3 avoidance samples segment midpoints from the same spatial hash
  (the brief's suggested approximation) rather than true segment distance.
