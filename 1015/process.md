# No.1015 "The Body, Between Poses"

Study #124 futa-kera, PP176 "Morph Cut" (Perfume Coachella 2019 morphing mechanism).

## Concept

A single white wireframe figure on a black void, caught permanently mid-morph. It
never arrives at a pose: keyframe poses (crouch, reach, twist, fall, rise, and
seven more) are chained so each transition begins before the previous one ends,
and every joint runs on its own slight phase lag, so the body as a whole is
always traveling. The travel is the render: each joint carries a short gray
motion vector showing its velocity, and joints moving fast tint toward cyan,
dots and bones alike. Every 12.4 or 14.4 seconds the phrase is hard-cut to a
new seeded pose sequence, marked by a single frame of white at 0.15 alpha. The
edit is part of the choreography.

Interactions: tap slows the morph to 0.1x for ten seconds (study the vertices
traveling); drag pulls the nearest limb chain toward the pointer (the
transition reroutes through the hand, then decays back on release); double-tap
cuts immediately to a new phrase. Sound, enabled by the first gesture only: a
gliding tone whose pitch follows total joint velocity, a soft click on each
cut, faint ticks when the whole body surges.

## Construction

- Rig: 16 joints (pelvis, chest, neck, head, two 3-joint arms, two 3-joint
  legs) placed by forward kinematics from a 12-component pose vector: ten
  absolute segment direction angles plus pelvis rootX/rootY offsets. Bones are
  line segments; the head is a stroked circle. No footage, no mocap: every
  frame is computed from the pose functions.
- Pose library: 12 hand-authored keyframes (neutral, crouch, reach, twist,
  fall, rise, lunge, bow, kick, curl, arch, stride).
- Morph model (the core): within a phrase, a component's value is a chained
  blend: start at the first keyframe, then each subsequent keyframe eases in
  with a smootherstep over 2.4 s, with blends starting every 2.0 s. Because the
  blend window (2.4 s) is longer than the step (2.0 s), at least one blend is
  mid-flight at every instant; combined with per-component seeded phase lags
  of up to plus or minus 0.30 s, no pose is ever held, even momentarily, by
  the whole figure. This is the honest no-dwell mechanism: dwell is impossible
  by construction, not by adding noise.
- Phrases and cuts: a phrase is 6 or 7 keyframes chosen by a mulberry32 stream
  (no immediate repeats), lasting 12.4 s or 14.4 s, inside the specced 11-16 s
  cut interval. Phrase boundaries are hard cuts: the pose function switches
  phrase instantly and the renderer lays one frame of white at 0.15 alpha.
  The timeline is precomputed closed-form over piece time (about 1,000 s), so
  any instant, including frame one and the trail prefill, is a pure function
  of t and the seed.
- Frame one: piece time starts at a fixed offset of 7.0 s. Phrase 0 is
  authored as neutral, stride, bow, crouch, reach, fall, so at t = 7 s the
  chain sits inside the fourth blend: legs still in the deep crouch, one arm
  swinging across the body, the other reaching up. Deterministic: the first
  frame is the synchronous draw at t = 7.0, never derived from a wall clock.
- Velocities are numeric: joint positions at t minus positions at t - 0.06 s.
  Vector length is speed times 0.11, capped at 0.17 figure units. Heat for the
  cyan tint is clamp((speed - 0.30) / 1.45). Vertex trails are the last 0.4 s
  of joint positions at 0.11 alpha (prefilled closed-form at load, then fed by
  the live loop).
- Drag pull is applied after kinematics as a weighted offset along the grabbed
  chain (end joint 1.0, mid 0.55, base 0.28), so bones stay connected and the
  velocity field, vectors, and tints all respond to the hand. On release the
  final offset decays over 0.45 s instead of snapping.
- Audio: one triangle oscillator gliding with total speed, short square blips
  for cuts (140 Hz) and speed surges (1700 Hz, throttled). Created lazily
  inside the first pointerdown, typeof-guarded throughout; the piece is
  complete and silent without it.
- Viewport: canvas sized from the Visual Viewport API with resize listeners on
  both visualViewport and window, CSS size pinned in pixels on every draw,
  phone detection via window.screen physical size with the tall-aspect
  fallback. The figure scales by min(0.88 H, 0.96 W) so it stays whole and
  centered at every size.

## QA log

- Rendered with render-piece.js at 1280x900 (desktop), 390x844 (mobile),
  720x720 (thumb). Thumb rendered twice and byte-compared with cmp:
  identical. The duplicate was deleted.
- Desktop/thumb frame one: large white wireframe figure mid-transition on
  black, legs in the crouch zigzag, right arm reaching up, left forearm fully
  cyan with the wrist dot cyan and the shoulder segment tinting, short gray
  velocity vectors at head, wrists, and knees, faint vertex-trail arcs behind
  the fast limbs. Nothing clipped.
- Mobile frame one: same pose, figure whole and centered in the tall frame,
  cyan forearm and vectors still legible, nothing clipped.
- One fix round: the first render's vertex trails read as long stray arcs
  dominating the right of the frame; trail alpha lowered from 0.15 to 0.11 so
  they sit behind the figure as travel marks. Re-rendered and re-verified
  byte-identical afterwards.
- Source checked clean: no Date.now, no Math.random (the double-tap reseed
  uses a deterministic counter-based seed), no gradients, no shadowBlur, no
  ctx.filter, no offscreen canvas, no external references, no em dashes, no
  visible text besides the title.

## Deviations

- Vertex trails: the prompt allows them as an optional reinforcement ("may");
  they are included at reduced alpha (0.11 rather than the nominal 0.15)
  because at full strength the 0.4 s wrist arcs read as stray scratches
  against the void. Length and honesty of the trails are unchanged.
- Cut flash timing: the flash is drawn while piece time is within 55 ms after
  a phrase boundary, which at normal frame rates is one frame, occasionally
  two on a slow display. The 0.15 alpha is exact.
- Tap handling: a single tap is confirmed after a 300 ms double-tap window
  before slow motion starts, the standard cost of distinguishing the two
  gestures the prompt specifies. The double-tap cut itself is instant.
