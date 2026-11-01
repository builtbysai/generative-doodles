# No.1034 "The Room, Moved"

Study #127 toshitaka-mochizuki, PP195 "Walls That Ferry" (the Syn Moving Trolley System).

## Concept

The room is the machine. In a dark gallery, five tall white monolithic walls glide
horizontally on invisible ceiling rails (the mechanism is never drawn). Each wall
ferries on its own route with machined manners: constant velocity, a hard stop,
a dwell, a return at the same speed. There is no easing anywhere in the piece;
the precision is the craft. Blue and violet light washes are locked to the slabs
in wall-local coordinates, so the light belongs to the walls and travels with
them, spilling a little into the gaps beside their faces. Between the front walls,
narrow vertical gaps open and close. Through them crosses the only body in the
room: one tiny dark dancer silhouette, a scale reference, dwarfed by the
architecture. The dancer is drawn in front of the back row and behind the front
row, so front walls occlude it exactly where the gaps close.

Watch-only core (65 s seamless loop). Drag along a wall to command it: it runs
at route speed to the end you dragged toward, dwells, and rejoins its route.
Tap a gap to hold every wall still for a breath (3 s) while the dancer keeps
walking. Double-tap for a new room. Sound, once a gesture enables it: a low
rumble pitched by total wall speed, a soft metallic thunk at each hard stop,
faint footfalls on the dancer's step cycle.

## Construction

- Routes, closed form. Each wall is a triangle wave with dwells over period P:
  travel one way in Tt seconds at constant speed, dwell Td = (P - 2*Tt)/2, return,
  dwell. Every P divides the 65 s loop (16.25, 65/3, 13, 32.5, 65), so the whole
  room is periodic with the loop and position/velocity are pure functions of
  route time. No integration, no accumulated state; frame one is the synchronous
  draw at the fixed phase t = 18 s, never from Date.now().
- The score. Five walls in two rows over a 100-unit stage. Front row (drawn last,
  occludes): widths 13/14/12, left-edge lanes [2,18], [38,54], [74,86]. Back row:
  widths 15/13, lanes [6,22], [56,72]. Lanes are separated so front walls never
  overlap each other (probe-verified over the full loop, max overlap 0.000).
- Interactions as recorded epochs. A drag command appends an epoch to the wall:
  from its position at the command's route time it runs at route speed to the
  commanded end, then rejoins the base route with a phase shift that starts the
  dwell at that end. Position stays continuous; the state at any time is still a
  closed-form lookup over the epoch list. Tap-holds are recorded intervals;
  walls run on route time = piece time minus hold time swallowed, so a hold
  freezes every wall while the dancer (on piece time) walks on.
- The dancer. One crossing per 32.5 s (two per loop, alternating direction),
  constant speed from off-stage to off-stage. The step phase is a function of
  distance walked, with a +1.4 rad offset so frame one lands mid-stride. Drawn
  as head dot plus stroked torso, arms and legs in #0B0C0E.
- Washes and spill. Each wall face carries three flat-alpha bands of its wash
  color at wall-local x fractions [0.06,0.34], [0.34,0.50], [0.50,0.60] (alphas
  0.50/0.30/0.16, back row scaled by 0.55), drawn under the wall's translation.
  Spill strips (1.1 and 2.2 units, alphas 0.16/0.10) fall into the gaps from both
  faces. Layered flat alpha throughout: no gradients, no shadowBlur, no
  ctx.filter, no offscreen canvas.
- Audio. Lazy AudioContext created inside the first pointerdown, all calls
  typeof-guarded and wrapped. A sawtooth rumble through a 140 Hz lowpass has
  its gain and pitch set from the summed wall speeds each frame; hard stops are
  detected as velocity snapping to zero between frames and answer with a short
  72 to 38 Hz sine thunk; footfalls are quiet triangle ticks on step-index
  changes. Silent until a visitor gestures; the QA renderer never creates it.
- Viewport. Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas.style.width/height pinned in px in draw().
  Phone detection via window.screen (min dimension under 700) with the
  h > w*1.15 aspect fallback only.

## QA log

- Frame-one dancer check (probe: SCORE extracted from the shipped index.html,
  route math replicated, evaluated at t = 18 s, route time = piece time):
  front spans [17.00, 30.00] vel +2.56, [42.00, 56.00] vel +2.00,
  [80.00, 92.00] vel -2.40 (all three front walls mid-ferry); back spans
  [10.00, 25.00] and [59.00, 72.00]. Front gaps: [0, 17], [30, 42], [56, 80],
  [92, 100] - four clear gaps, two of them wide. Dancer x = 62.69, inside gap
  [56, 80] with margins 6.69 (left) and 17.31 (right), standing against the back
  wall at [59, 72]. Loop closure at t + 65: max position delta 0.
- Renders (render-piece.js, the piece's own script): qa-desktop.png 1280x900,
  qa-mobile.png 390x844, thumb.png 720x720, all read back by eye. Desktop and
  thumb: dark gallery, large flat-white slabs with violet and blue wash bands,
  clean black vertical gaps, no rails anywhere, the tiny dancer mid-stride in
  the wide front gap, dark against the back wall's pale blue wash. Mobile
  (phone path via screen size): all five walls in frame at full height, slabs
  stay large, dancer legible in the same gap.
- Determinism: thumb.png rendered twice and cmp byte-compared identical; the
  duplicate was deleted. Frame one derives only from the fixed phase T0 = 18.
- Source checks: no Date.now, no gradients, no shadowBlur, no ctx.filter, no
  document.createElement, no microphone calls, no visible text besides the
  title element, no em dashes.

## Deviations

1. Both rows run the full wall height (y 0.04 to 0.96 of the frame). The brief
   left the back row's height open; full height is what lets the dancer read
   as a dark silhouette against a back wall through a front gap, instead of
   vanishing into the near-black gap color (#0B0C0E on #0A0A0C). Depth is
   carried by wash alpha (back row at 0.55) and by occlusion order.
2. A commanded wall sets its new constant velocity instantly rather than
   ramping up over a fraction of a second. Any ramp would be an ease curve,
   and the prompt forbids ease in this piece; the instant set is the machined
   limiting case and keeps the command response closed-form.
3. On phones all five walls stay in frame (the 100-unit stage scales to the
   viewport) rather than cropping to fewer, larger slabs; the slabs still read
   large at 390 px wide, and the choreography stays whole. The dancer is drawn
   slightly larger on phones (0.085 of height vs 0.075) for legibility.
4. The tap that lands on a wall does nothing (the brief only specs tap-a-gap);
   tap detection also requires a press under 0.5 s with under 10 px of travel,
   so slow drags that fail to reach the command threshold do not fire holds.
