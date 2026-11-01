# №1462 "Taiga Line" — ulrike-ottinger UO7 (PP709)

A journey drawn as a single line across a map of rolling land: a small figure
group (travellers, a herd, a yurt) moves along it at a snail's pace. The
landscape crossfades almost imperceptibly: grassland, river, snow, grassland
again. Nothing hurries.

## Composition

Parchment map (#d8cfae) filling the frame. A rust (#a34a24) route line
meanders from lower left to upper right as a fixed Catmull-Rom path with
strictly increasing x, so horizontal drag maps cleanly onto the journey.
Three rolling sine ridges fill the lower frame; seeded grass tufts dot the
map. The travelling group sits on the line: an ivory yurt dome with a rust
door, three small dark travellers ahead of it, five small dark herd shapes
around it. No visible text except `<title>`; no audio (fully silent).

## Motion

Watch-first, extremely slow. The group advances along the route on a
ping-pong triangle wave: 240 s one way, 480 s for the full out-and-back
cycle, so the loop point is a smooth reversal, never a jump or a restart.
Landscape is a function of the same journey parameter s: p = s × 4 gives
four legs (grassland, river, snow, grassland), each crossfading into the
next over a full minute via a cosine ease across the whole leg — the
crossfade is the leg, so it reads as almost imperceptible. Rolling ridges
take the blended landscape colour; a winding river ribbon fades in with
the river weight and a snow wash with the snow weight; grass tufts fade
with the grass weight. Pace is a pure function of piece time, so it is
identical on any device.

Drag along the route scrubs the journey forward or back: a relative drag
(1.2 × journey per frame width) moves s continuously from the grabbed
position, clamped to [0, 1], never jumping, never restarting. On release,
the triangle wave re-anchors at the scrubbed position travelling in the
drag's direction (at the s = 0 / s = 1 ends the wave bounces, as it must).
Never click-to-reload.

## Adaptations

- Route as a fixed path; group position as an arc-length path parameter;
  landscape bands crossfading on a slow timer tied to the same parameter.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, or getUserMedia; fading alphas rounded to 4 decimals, dots
  as own-beginPath arcs or filled rects (node-canvas quirks).
- Frame one = draw(0) via boot flag; rAF loop as a plain function
  declaration behind a typeof guard; all decoration from mulberry32
  (seed 1462000), never Math.random.

## Verification

Rendered at 1280×900, 390×844, and 720×720 and inspected all three; thumb
byte-identical across repeated renders including a final re-verify.
Forced-time probe harness (vm-isolated instance, piece driven via
window.__piece): t = 0 pure grassland (0 white px, 0 blueish px); t = 60
pure river (247,105 blueish px); t = 120 pure snow (184,026 white px);
t = 180 grassland again; t = 240 group at the far end, fully in frame;
t = 480 pixel-identical to t = 0 (cycle closes); t = 0 redraw identical.
Drag probe: +300 px drag scrubs s continuously (0 → 0.2813); release
resumes the slow advance (0.25 of journey per 60 s, as specified);
drag-back scrubs s down and clamps at 0 without jumping. Token scan
clean (the only Math.random / shadowBlur / Path2D hits are comments
stating they are never used).

## Fix rounds (2)

1. First renders clipped the group at the lower-left corner: the yurt and
   travellers ran off the left/bottom edges at frame one. Fixed by moving
   the route's first control point inboard (0.10, 0.86) and tucking the
   yurt up-left of the group anchor instead of behind it along the path.
2. Probe crashed at t = 180: the landscape index ran past the end of the
   leg table (LANDS[4] undefined) on the final grass leg. Fixed so the
   last leg holds grass instead of indexing past the table. All renders
   re-done after each fix; frame one otherwise unchanged.
