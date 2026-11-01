# No.1036 "The Shelf, Loaded"

Study #127 toshitaka-mochizuki, PP197 "Unlit, Waiting" (Stereo Light units).

## Concept

A dark workbench holds a row of twelve identical black flashlight-form
devices, mid-production inventory rather than a product shot: knurled bezel
rings, domed lenses, ribbed bodies, visible screws, a few units resting on
bubble wrap, a few faint scuffs. The units are unlit except one. A single
warm light passes down the row unit by unit, deliberately, with pauses, the
row testing itself. One unit is faulty: when its turn comes it stays dark,
the row waits a little longer, and the pass continues past it. Nobody
comments. The inventory is the ritual.

## Construction

- Viewpoint: flat top-down-ish bench (no 3/4 tilt). Chosen because the row,
  the wrap sheets and the downward cone all read most clearly in plan, and
  the cone spills down the page from the lit lens.
- Inventory (seeded, mulberry32, seed 1036197): 12 units. Each unit rolls
  for bubble wrap (about half have it) and carries 0-2 seeded scuff strokes.
  Unit detail is drawn per unit: bezel band with knurl ticks top and bottom,
  domed lens (dark glass with a metal rim arc when unlit, white-hot with a
  layered warm halo when lit), rib lines along the body, tail cap, two
  screw dots.
- The pass (closed form in piece time t, plus recorded pointer events):
  each good unit owns a 4.0 s dwell slot; brightness ramps in and out over
  0.7 s at the slot edges with a smoothstep, so the handoff breathes rather
  than chases. Full-bright plateau is about 2.6 s per unit.
- The faulty unit is index 4 (the 5th of 12, later in the row than the
  frame-one unit). Its slot runs 6.0 s (the normal 4.0 s plus a 2.0 s extra
  wait) and its brightness is always 0; its body is drawn a step darker
  (#0C0D0F). Full cycle length: 11 x 4.0 + 6.0 = 50.0 s, then the pass
  returns to the first unit.
- Frame one is the synchronous draw at fixed phase t = 10 s, which lands in
  the third unit's slot (8-12 s): unit index 2 lit, cone spilling down,
  every other unit dark. In the browser the rAF loop (typeof-guarded)
  replays the same closed form anchored at load, so frame one is never
  derived from Date.now().
- The cone is three nested flat-alpha trapezoids of #FFE9B8 plus a soft
  landing pool ellipse, scaled by the unit's brightness; no gradients, no
  shadowBlur, no offscreen canvas anywhere in the piece.
- Interaction: drag across the row lights each unit under the finger while
  the drag lasts (a bench test), then the units return to the pass. Tap a
  good unit to hold its light for 10 s while the pass continues around it;
  tap it again to release early. The faulty unit does not answer taps.
  Double-tap reseeds the inventory (count, wrap, scuffs and faulty position
  all re-rolled from the next seed).
- Sound, only after the first visitor gesture (lazy, typeof-guarded
  AudioContext): a soft 1900 Hz click, 35 ms, at each pass step; a faint
  96 Hz hum whose gain follows the brightest unit; during the faulty slot
  no unit is lit, so the hum falls to silence for the wait.
- Sizing follows the Visual Viewport API with resize listeners on both
  visualViewport and window; the canvas CSS size is pinned in px on every
  draw. Phone detection uses window.screen (min dimension under 700 px)
  with the aspect fallback. On phones the row wraps into two rows of six
  so each unit stays legible; the page ground is the bench tone.
- Palette is exactly the specced set: bench #0F1013, units #17181C, bezels
  #2A2D36 with #9AA0AE knurl and screw detail, bubble wrap #23262B at 0.5,
  cone #FFE9B8, hot lens #FFFFFF, faulty body #0C0D0F. Warm light only.
  Zero visible text besides the title element.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png) and 720x720 (thumb.png). All three render cleanly in
  silence (no audio, no rAF in the harness).
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. The duplicate was deleted.
- Desktop read-back: deep charcoal bench, one horizontal row of 12 detailed
  black devices across about 84 percent of the width, bubble-wrap sheets
  (faint bubble grids) under roughly half of them, exactly one unit lit
  (the third) with a white-hot lens, warm halo and a layered cone spilling
  down to a landing pool; the other eleven dark.
- Thumb read-back: same composition at 720x720, the lit third unit and its
  cone clearly readable at thumbnail size.
- Mobile read-back: phone path taken (two rows of six at 94 percent width),
  units legible with bezels, ribs and wrap intact, the lit unit in the top
  row with its cone spilling into the gap between rows, nothing clipped.
- Source checked clean of Date.now, canvas gradients, shadowBlur,
  ctx.filter, offscreen canvas, external URLs and em dashes.

## Deviations

- Dwell is 4.0 s per unit rather than about 3 s, and the full cycle is
  50.0 s rather than about 45 s. Reason: with 0.7 s handoff ramps at both
  edges, a 3 s dwell left barely a second of full light per unit and the
  pass read as a chase; 4.0 s keeps the deliberate, testing pace the prompt
  asks for while the lit plateau stays near the specced 2.5 s.
- The pass index and brightness are computed as a closed form of piece
  time rather than by a step integrator. Reason: the determinism gate.
  Frame one must be reproducible exactly, and a closed form makes every
  later frame a pure function of (t, recorded events).
