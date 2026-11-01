# №1425 "Thirteen Contradictory Songs" (wolfgang-muller WM2, PP648)

## What it is

Thirteen tiles in a loose grid (rows of 5, 4, 4), each one a different world:
own palette, own motion vocabulary, own tempo, hard dark borders, no
blending at the seams. A shared track sequencer moves a gold "current
track" highlight tile to tile (13 tracks x 4 s = 52 s loop). Dragging
across tiles scrubs the track order; on release the order rotates so the
scrubbed-to tile plays first, and the tiles re-sequence without ever
merging styles. The loop never settles into one mood.

Tile registers (each period divides 52 s, so the whole piece loops
seamlessly): funny yellow bounces a dot (2 s); serious slate sweeps a bar
(13 s); banal beige ticks a square across in steps (26 s); cruel red
stabs spikes inward (4 s); soft pink drifts three circles (26 s); noisy
black-white flickers a small checker at a gentle 1 Hz (2 s, small cells
only, never a full-field flash, never above 3 Hz); teal rises bubbles
(13 s); ochre turns three spokes (26 s); violet pulses a ring (4 s);
moss grows five bars out of phase (13 s); rust slides diagonal stripes
(4 s); ice slides a wave's phase (13 s).

## Count adaptation (prompt says thirteen tiles, names twelve fields)

The prompt lists six named worlds plus six further single-hue fields:
twelve fields for thirteen tiles. The thirteenth tile is the absent
track: ground-dark (#1a1712) with a single still dot and no motion.
This is the study-wide rule made literal — the absence stays absent —
rather than an invented thirteenth color that would break the specced
palette. No win state, no flagging; the tile simply never plays.

## House-rule compliance

- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() with style
  width/height in px.
- Phone detection via window.screen physical size (min dimension <
  700 px) with aspect h > w*1.15 fallback; field-like composition goes
  full-bleed on phones (margin 0, gap 6); checked at 390 wide, no
  clipping, all 13 tiles visible.
- Determinism: synchronous first frame at constant phase via boot flag
  (frame one = draw(0), clock anchors on the first rAF call); all
  randomness from seeded mulberry32 (seed 1425000 + index*7919), never
  Math.random; rAF loop is a plain function declaration behind a typeof
  guard. All motion is closed-form over piece time and the recorded
  drag-event log, never frame-integrated.
- No visible text except <title>. Fully silent: no AudioContext, no
  getUserMedia, no offscreen canvas, no gradients, no shadowBlur, no
  Path2D, no createElement. Fading alphas rounded to 4 decimals; dots
  as filled rects or own-beginPath arcs (node-canvas quirks).
- Interaction: drag only, never click-to-reload.

## Verification

- Rendered at 1280x900, 390x844, 720x720; all three inspected.
- Thumb byte-identical across repeated renders.
- Forced-time probe harness (vm-isolated instance, stubbed rAF driving
  the piece's own loop, pointer events to its own listeners):
  - t=0: gold frame on tile 0 only (793 px in its band).
  - Cruel tile ink 0 px at t=0 -> 3559 px at t=2 (spikes grow).
  - t=4: highlight moved to tile 1 (903 px in its band).
  - Drag scrub: pointerdown on tile 5 -> gold on tile 5 (1213 px);
    pointermove to tile 8 -> gold on tile 8 (1214 px), tile 5 back to 0.
  - After release, order rotated: at t=8 the highlight sits on tile 10
    (929 px), the third track of the rotated order [8, 9, 10, ...].
  - Loop closes exactly: fresh instance at t=52 byte-identical to t=0.
  - Two fresh instances byte-identical at t=0.

## Fix rounds

One fix round, both in the same edit: the ice wave first rendered as
broken dashes (horizontal segment rects between sample points) — now a
stroked polyline; the rust stripes first rendered vertical — now true
diagonal parallelograms. All renders re-done after the fix.
