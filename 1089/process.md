# №1089 "Illusion of Interactivity" — Marco Tempest study block MT2

The SIGGRAPH reveal as a pure piece: the trick is shown, not hidden. From
above, a pale carpet carries three glowing cyan guide-line routes; twelve
skeletal drones replay those routes at constant speed, completing laps
whether or not anyone conducts. At center a tiny dark conductor gestures
on cue — and nothing he does reaches a single drone. The lines, the
routes, the cues, and the figure's irrelevance are the whole drawing.
Watch-only by default; drag re-authors a route. No audio (none specced).

## How it works

- **Routes are closed Catmull-Rom loops** through seeded waypoints (three
  routes: a central loop, a crossing weave, an outer rounded rectangle).
  Each route is sampled (48 points per segment) into an arc-length table
  rebuilt every frame from the effective waypoints, so drone motion is
  constant-speed along the line and exact under edits. Four drones per
  route, twelve total, each with a seeded phase offset. When a drone
  crosses its route start, the guide-line flashes once — a closed-form
  decaying pulse from the analytically known wrap time, plus a small
  ring at the start point.
- **The cue clock is structurally independent.** Cues fire at 3, 9.5, 16,
  22.5, 29, 35.5 and 42 s of a 45 s loop. Each cue lights its amber
  diamond marker and sets the conductor's pose (left arm, right arm, or
  both, on a seeded pattern) with a 2.8 s raise–hold–lower envelope. The
  cue system reads only cue time; the drone system reads only route
  time. There is no shared state, so no gesture can visibly cause a
  course change — the disconnect is in the architecture, not faked.
- **Drag = re-authoring, not steering.** Grabbing the nearest waypoint
  (within 0.05 of frame) bakes every waypoint's current effective
  position as a blend origin; the dragged waypoint's target follows the
  pointer (clamped to the carpet) and every waypoint re-fits over 3 s
  with a smootherstep blend. Because Catmull-Rom is linear in its
  control points, the curve through the blended waypoints is exactly
  the blend of the old and new curves at every arc parameter — drones
  ease onto the bent line over the same 3 s window.
- **Drones** are drawn as small skeletal ticks: an X frame with four
  rotor rings in #E8E8E6, oriented to the route tangent, with a blue
  orb dot (flat-alpha #35E0FF halo, #BFE3FF core — the study's orb
  color). The conductor is a #101014 silhouette inside a faint
  #5C6B80 stage ring. Labels are the specced mono only: ROUTE A / B / C
  at the corners and the live cue counter (CUE 03 at frame one).

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on
  both visualViewport and window; canvas CSS size pinned in draw();
  phone detection via window.screen physical size (min < 700) with
  aspect fallback. Centered square stage on a page ground of the same
  #0C0E12; the carpet composition and corner labels hold at 390 wide,
  labels bump slightly on phones.
- Determinism: the first frame is drawn synchronously at the fixed
  phase t = 18 s — drones spread along all three routes, one lap-flash
  ring still fading at a route start, CUE 03 (fired at 16 s) holding
  the conductor mid-gesture with both arms raised and its amber marker
  lit. The rAF loop is guarded by a typeof check and anchored as
  phase + elapsed. Everything animated is a closed-form function of
  t and the recorded drag events; no frame-integrated state.
- No audio, no gradients, no offscreen canvas, no ctx.filter, no
  shadowBlur, no createElement, no microphone. Visible text limited to
  the specced labels and the <title>.

## QA

- Rendered with the house renderer at 1280×800, 390×844, and 720×720.
- Thumb rendered twice at 720×720 and byte-compared with cmp:
  identical; duplicate deleted.
- Frame one: near-black stage; the pale carpet rectangle (~80% of
  frame) with its faint grid and three glowing cyan guide-line routes
  crossing in slow curves; exactly twelve pale skeletal drones with
  blue orb dots spread along the routes; seven amber cue diamonds
  around the carpet, the CUE 03 marker lit with its halo at
  lower-right; the tiny dark conductor at center inside his stage
  ring, both arms raised in the cue pose (verified at native
  resolution); muted #5C6B80 mono labels at the corners — ROUTE A,
  ROUTE B, ROUTE C, CUE 03. Mobile holds the same square composition,
  nothing clipped.
