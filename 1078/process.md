# №1078 — Six Hundred Kilos

Momoko Nishimoto study block MN7: Syn's backstage made into a piece. A 600 kg
projection wall (7.6 × 4 m) hangs from industrial ceiling rails and slides at
no more than 500 mm/s. The wall is not light — it is mass. The rail is not
decoration — it is the grammar the mass is allowed to move in.

## Frame one

A dark hall (#07080A). Across the top quarter runs the steel rail (#3A3E45)
on ceiling supports, with four roller blocks (#555B63) and hanger straps that
ride with the wall. Below it the wall (#101218) hangs full-width and roughly
two-thirds of the stage tall, its surface carrying slow, soft CG light-forms
in #9FC4E8 and #F2E9D8. Beneath the wall, a black shadow-field at 0.6 alpha
stretches and skews with the wall's velocity — the weight, drawn. Beside the
rail, the one piece of permanent type the prompt allows: "MAX 500mm/s" in
tiny amber mono (#D8A24A at 0.7).

## Motion and interaction

- **Watch-only core.** A seeded program of waypoints (five targets, one per
  12 s segment of a 60 s loop) hauls the wall along the rail through a heavy
  spring. It is always on its way somewhere and never quite arrives.
- **Drag = force.** Grabbing the wall and hauling sideways applies a capped
  push. The wall accelerates reluctantly, and on release it keeps its
  velocity and glides — viscous friction only — for seconds before the
  program quietly takes over again.
- **Tap = the spec.** A tap flashes the live speed readout ("v = NNN mm/s")
  in the same amber type beside the rail for about two seconds.
- **Double-tap = new program.** The waypoint schedule and the CG light-forms
  are reseeded. Nothing ever reloads.

## Physics

Sanctioned simulation piece: fixed timestep (dt = 1/120 s) integrated from a
seeded deterministic initial state. At load, 12 simulated seconds are
pre-rolled synchronously (1,440 steps) so frame one — and therefore the
thumbnail — is exactly reproducible. Motion modes: autonomous spring
(acceleration capped at 95 mm/s²), drag spring (capped at 130 mm/s²), and a
free glide with viscous-plus-whisper-Coulomb friction. Rail travel is limited
to ±0.165 wall-widths (±1,254 mm); at a limit the wall stops dead and, if
audio is live, clacks.

## The speed cap, verified numerically

Piece scale: the simulation runs in wall-width units.

- 1 unit = the wall = 7,600 mm.
- Wall pixel width = 0.84 × stage. On the 720 px thumbnail stage that is
  604.8 px, so 1 px = 7600 / 604.8 ≈ 12.566 mm, and the cap of 500 mm/s is
  39.79 px/s at that size.
- In simulation units the cap is 500 / 7600 = 0.0657895 units/s.

Why it cannot be exceeded: velocity is state, and after **every** integration
step, in **every** mode, the step function executes
`v = clamp(v, -CAP, CAP)` before the position update `x += v*dt`. Dragging
never writes velocity or position directly — it only moves a spring target,
and the spring's output passes through an acceleration cap and then the same
velocity clamp. The endpoints zero the velocity. Since the initial velocity
is 0, |v| ≤ CAP is an invariant of the system, not a tuning hope.

Empirical check: the shipped script was driven headlessly with an adversarial
pointer (grab, slam to ±5,000 px, hold, release into glide — 3,357 simulation
steps including pre-roll) with the post-clamp velocity instrumented. Maximum
observed |v| = 0.06578947 units/s = **500.000 mm/s, reached but never
exceeded**. Separately, the tap readout sampled during a hard glide peaked at
385 mm/s.

## Imagery

The CG forms on the wall are stored seeded data — eight soft forms, each
drawn as three concentric flat-alpha ellipses (no gradients, no offscreen
canvas, no filters, no shadow blur), clipped to the wall rectangle, drifting
a few millimetres of phase per minute. The shadow-field is a skewed black
trapezoid whose skew is proportional to signed velocity.

## Audio

Prompt-specced, house-ruled: nothing exists until the first visitor gesture
creates the AudioContext (typeof-guarded, wrapped in try/catch; no microphone
API anywhere). A low sine rumble through a lowpass filter tracks speed
(40–70 Hz, gain with speed), a faint triangle whir sounds only while
dragging, and a short square-wave clack fires when the wall meets a rail end
stop.

## House rules applied

Canvas sized from the Visual Viewport API with resize listeners on both
visualViewport and window; canvas CSS size pinned in draw(); phone detection
via window.screen physical minimum (< 700) with a tall-aspect fallback; the
square stage centres in the hall colour on any screen, wall full-width on
phones. Visible text is limited to the specced "MAX 500mm/s", the tap-flashed
speed readout, and the document title.

## QA

- `render-piece.js` at 1280×800, 390×844, and 720×720: frame one shows the
  rail, rollers and hangers across the top, the glowing wall, the
  shadow-field beneath, and the amber spec type, as specified. Mobile keeps
  the full square stage unclipped.
- Thumbnail rendered twice and compared with `cmp`: **byte-identical**.
  The duplicate was deleted.
- Speed cap: instrumented adversarial run, max 500.000 mm/s (see above).
