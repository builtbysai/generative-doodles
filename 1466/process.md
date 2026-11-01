# №1466 "India Song Ballroom" (delphine-seyrig DS3, PP713)

## What it is

A mirrored ballroom in tropical heat: tall windows, a chandelier, a polished
floor that doubles everything. One figure drifts slowly across the room,
dancing alone. Her reflection lags half a beat behind her, and a second
reflection, fainter, lags a full beat. No mouth ever moves; the "voices" are
shown as slow ripples crossing the floor.

## Palette (only these colors)

- Ballroom cream #e8dcc4, mirror silver #c8d0cc, heat haze amber #e0b26a,
  figure dress white #f5f0e2, skin #f2ead8, floor shadow plum #5b2a4a.

## Composition

Ballroom wide, figure left-of-center at frame one drifting right; mirrors as
tall rectangles along the back wall; windows at the far edges; chandelier
centered above; floor band below 62% of frame height with a silver sheen
line, plum floor shadows, mirrored figures, and expanding ripple ellipses.

## Motion

- Slow drift loop: one full out-and-back crossing per 72 s at base heat.
  The figure crosses the room, turns, and drifts back.
- Reflections: the figure is drawn three times with opacity 1.0 / 0.5 /
  0.25, sampled at the current time, half a beat (2 s) back, and a full
  beat (4 s) back. Frame one is phase-shifted +0.15 of the cycle so it
  opens mid-crossing, moving right, with both reflections trailing behind
  her to the left.
- Floor ripples: four plum ellipses expanding across the floor on a 12 s
  clock, staggered 3 s apart, fading as they grow.
- Heat haze: flat-alpha amber bands plus a full-room amber veil whose
  alpha follows the heat parameter.
- Dragging changes the heat: drag right thickens the haze and slows the
  drift; drag left clears it and quickens the drift. Drag never restarts
  the dance and never jumps the figure: the drift phase is the analytic
  integral of speed over recorded heat-change segments (closed-form over
  piece time and recorded events, never frame-integrated state).

## Interaction

Drag horizontally to change the heat (right = thicker haze, slower drift;
left = clearer, quicker drift). Never click-to-reload, never a restart.

## Adaptations

- The prompt's "delayed history buffer" is implemented as closed-form
  sampling: reflection positions are the same drift function evaluated at
  t minus the lag. This keeps frame one reproducible in the QA renderer,
  which paints a single synchronous frame and cannot accumulate a buffer.
- Ripples are expanding ellipse strokes, never canvas gradients; haze is
  flat-alpha amber rectangles, never gradients.
- The figure has eyes only and no mouth, so no mouth ever moves and there
  is no lip-sync and no dialogue text.
- Fully silent (no AudioContext at all); no offscreen canvas, shadowBlur,
  Path2D, createElement, or getUserMedia; fading alphas rounded to 4
  decimals; dots as filled rects or own-beginPath arcs (node-canvas
  quirks: batched ellipse subpaths render as polygons, so every ellipse
  gets its own beginPath; scientific-notation alphas parse as opaque).

## House rules

- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px.
- Phone detection via window.screen physical size (min dimension < 700px)
  with aspect h > w*1.15 as fallback; field-like composition goes
  full-bleed on phones; checked at 390 wide with no clipping.
- Determinism: synchronous first frame at a constant phase via a boot
  flag (frame one = draw(0), clock starts only with the rAF loop, which
  is a plain function declaration behind a typeof guard). All randomness
  from a seeded mulberry32 PRNG (seed 1466000), never Math.random.

## QA

Rendered with node ~/workspace/tools/render-piece.js at 1280x900,
390x844, and 720x720; all three inspected. Thumb byte-identical across
repeated renders.

Forced-time probe harness (tmp/probe1466.js, vm-isolated instance,
stubbed rAF driving the piece's own loop, pointer events to its own
listeners):

- Two fresh instances byte-identical at t = 0; same-instance redraw
  identical; t = 72 vs t = 0 identical (loop closes exactly).
- figureX at t = 0 / 10 / 20 / 36 / 40: 414.7 / 656.5 / 898.3 / 762.9 /
  666.2 — drifts right, then turns and drifts back.
- Reflection x at -2 s / -4 s vs main: 366.4 / 318.0 / 414.7 — both
  reflections trail to the left at frame one.
- Right drag (+200 px at t = 5): heat 0.35 -> 0.75, no jump at the drag
  time (figureX(5) unchanged), drift slower at t = 20, amber pixel count
  at t = 10 higher than base (582 vs 571).
- Left drag (-200 px at t = 5): heat 0.35 -> 0.0, drift quicker at
  t = 20, amber pixel count at t = 10 lower than base (570 vs 571; the
  delta is small because the constant chandelier dots dominate the
  amber count — the heat value and drift direction confirm the effect).
- Dress-white pixels above the floor at t = 0: 19,974; bright pixels in
  the floor band (reflections): 31,536.
- Floor-band pixels differing between t = 0 and t = 6: 69,014 (ripples
  expanding, reflections moving).
- Token scan clean: no non-comment hits for Math.random, createElement,
  Path2D, shadowBlur, AudioContext, getUserMedia, or gradients.

## Fix rounds

1. First frame one opened at the loop's turn point, so the delayed
   reflections wrapped to the figure's right (ahead of her) instead of
   trailing behind. Fixed by phase-shifting the drift +0.15 of the cycle:
   frame one now opens mid-crossing, moving right, reflections trailing
   left. All renders re-done after the fix.
2. First probe's plum-ripple check counted pixels near pure plum, but
   ripples are drawn at low flat alpha over cream, so the blended color
   never lands near plum. Probe fixed to count differing floor-band
   pixels between two times instead; the piece was unchanged.
