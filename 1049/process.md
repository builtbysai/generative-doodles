# No.1049 - The Camera Move, Flown

Study #129 katsuhiko-harada, PP210 "Reality Renders the Camera Path" (Cold Stares).

## Concept

A camera path is authored the way it is authored in CG: a calm spline with
keyframe nodes on a dark editor screen. Then reality flies it. Three camera
drones pursue points on that same spline with inertia, damping and a little
sag, and they do not succeed: they cut corners, overshoot, and trail behind
on the bends. A thin red connector joins each drone to the point it was
supposed to occupy, so the gap between the authored move and the flown move
is drawn, honestly, at every instant. The piece crossfades between the two
registers on a slow cycle: authoring (the plan, exact) and execution (the
flight, approximate). The lag is the content.

## Construction

- World: 160 x 100 units, contain-fit and centered on any viewport; the
  spline spans the full width. Phone detection via window.screen (min
  dimension under 700 px) with the aspect fallback; drones draw 1.4x larger
  on phones. Viewport sizing from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas CSS size pinned in
  draw() every frame.
- Path: a closed Catmull-Rom spline through 9 keyframe points, sampled at
  90 points per segment (810 samples) with an arc-length table, so the
  author marker travels it at constant speed. One traversal takes 55 s;
  the shipped path measures 333.0 units (about 6.05 units/s). The base
  keyframe layout is a designed camera move (long top sweep, tight right
  hook, dipping bottom run) with seeded jitter of up to plus/minus 3.5
  units per point; a reseed also picks one of four mirror variants, so a
  new path is recognizably new but always composed.
- Pursuit model: each drone is a spring-damper chasing a target point on
  the spline, integrated with semi-implicit Euler at a fixed 120 Hz step:
  a = k(target - pos) + c(targetVel - vel) + sag, c = 2 * zeta * sqrt(k).
  Drone A: k = 0.55, zeta = 0.80, target 0.016 of phase behind the author
  marker, no sag. Drone B: k = 0.20, zeta = 0.60, stagger 0.036, sag 0.10.
  Drone C: k = 0.085, zeta = 0.45, stagger 0.060, sag 0.20 units/s^2
  downward. The soft springs are the point: with velocity feedforward a
  stiff pursuer tracks almost perfectly and there is nothing to look at.
- Measured error (offline probe running the shipped code): frame one
  errors are 1.2 / 3.7 / 4.9 units for drones A / B / C. Over a settled
  full loop the mean error across drones is about 5.3 units (3.3 percent
  of the world width) and the maximum is about 17.1 units, reached by
  drone C on the tightest hook. On straights all three settle close to
  the line; the connectors lengthen exactly where the curve bends hardest.
- Registers: a 32 s cycle (execution 14 s, 2 s crossfade, authoring 14 s,
  2 s crossfade), offset so that frame one (T = 20 s) falls in solid
  execution view. Authoring shows the spline at full brightness with a
  glow pass, white keyframe node dots, and the author marker riding the
  curve exactly.
- Frame one: the sim runs exactly 2400 fixed steps (20 s) synchronously
  at load and draws; the live loop continues from that state with the
  same fixed step. A phase offset is computed from the path's own
  curvature table at build time so the author marker sits just past the
  sharpest bend at frame one, with the drone echelon strung out along
  that bend. Nothing in the frame derives from Date.now().
- Interaction: drag moves the nearest keyframe point (within 34 units)
  and the table rebuilds live, so the drones immediately pursue the new
  path with lag. Tap toggles registers (the toggle is deferred 0.35 s of
  piece time so a double tap can overrule it; the forced register holds
  for 14 s, then the cycle resumes). Double tap reseeds the path.
- Sound (first gesture only, lazily created and typeof-guarded): a sine
  glide tone whose pitch follows the normalized curvature at the author
  marker (the plan), a lowpassed sawtooth whir tracking mean drone speed
  (the reality), and two detuned sines whose gain follows total error
  (the gap, audible). No microphone. Silent in QA.

## QA log

- Rendered with render-piece.js at 1280x900, 390x844 and 720x720.
  thumb.png rendered twice and compared with cmp: byte-identical.
  Determinism re-verified after every tuning change.
- Desktop and thumb, frame one: execution register. The dim spline loop
  fills the frame (long top sweep, dipping bottom run); the three drones
  sit in a loose echelon along the bottom-left bend, warm payload glows
  on, bodies visibly displaced from the curve toward the inside of the
  bend, each joined to its small cyan target dot by a red connector of a
  different length (short, medium, long). Nothing clipped.
- Mobile: the whole world fits the 390 px width, centered vertically;
  drones and connectors stay legible at the bend; nothing clipped.
- Palette is strict: authoring #0B0C0E, execution #060607, spline
  #7FD4FF, nodes #FFFFFF, drone bodies #2A2C30, payload #FFE9B8, error
  connectors #FF6B6B at 0.4. Zero visible text besides the title. No
  gradients (drone glow is three layered flat alpha discs), no
  shadowBlur, no ctx.filter, no offscreen canvas, no Date.now-derived
  state (grep-verified).

## Deviations

- The spline is also drawn dim (alpha 0.20) inside the execution view,
  as a ghost. Without it the error connectors point at invisible targets
  and the gap cannot be read; the authored curve haunting the execution
  is also the piece's thesis. Recorded per the brief's QA instruction.
- Keyframe positions start from a designed base layout with seeded
  jitter rather than fully random points: a camera move is authored, not
  dealt, and the composition (a real sweep, a real hook) has to survive
  every reseed. The seed still fully determines each path.
- The tap toggle's 0.35 s deferral (above) slightly delays the register
  switch after a lone tap; it is what lets tap and double tap coexist on
  the same surface.
- Register crossfade blends the two background tones as well as the two
  layers, so the square never flashes between #060607 and #0B0C0E.
