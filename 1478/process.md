# №1478 "The Watch Occupied" (carole-roussopoulos CR7, PP725)

## Prompt essence
A watch factory floor seen as a flat plan: long benches, and on each bench a row
of watch movements (gears and hands) in various states of assembly. Hands — many
pairs, no bodies shown — work the benches: placing gears, turning screws,
passing movements along. The line never stops, but no overseer's desk appears
anywhere; the benches run themselves.

## What was built
Three horizontal bench bands across a pale #d8cfc0 floor. Each bench carries
four movements travelling slowly left to right, each gaining one part per
station: bare plate → gold gear → spring rings → watch hands → gold case
(finished watch). After the fourth station the movement loops back to the start
as a bare movement, and a finished watch is set aside in a small tray at the
bench's right end (one per completed pass, capped at five). At every station,
slate aprons sit at the bench's top edge and pairs of skin-tone hands reach in
from the top and bottom edges of the band, bobbing gently — hands only, no
bodies, no overseer anywhere.

## Interaction
Drag along a bench to speed or slow that bench's line only: drag right faster
(up to 3x), drag left slower (down to 0.25x). Releasing eases the bench back to
standard pace (exponential ease, tau 1.5 s). Drag never stops a line and never
restarts the factory; drags outside a bench band are ignored. Never
click-to-reload.

## Adaptations
- Each bench is a conveyor with station states; movements are sprites with a
  completion value advanced per station; bench speed is a per-bench multiplier
  from the drag parameter, eased back to 1.0 on release.
- Movement position is the closed-form integral of bench speed over recorded
  drag/release segments (exponential ease-back integrates analytically), so
  every frame is reproducible and drags never jump the line.
- Travel range is inset by one movement radius at each end so movements stay
  fully on the bench (first build clipped the leftmost movement off-canvas on
  phones and half off the bench edge on desktop).
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing (no visible
  text except `<title>`); all fills opaque; dots as own-beginPath arcs with
  moveTo first or filled rects (node-canvas quirks).
- Determinism: frame one = draw(0) via boot flag, clock starts only with the
  rAF loop (plain function declaration behind a typeof guard); all decoration
  from mulberry32 (seed 1478000), never Math.random (the single "Math.random"
  hit in a token scan is the code comment "never Math.random").

## Verification
Rendered at 1280x900, 390x844, and 720x720 and inspected all three; thumb
byte-identical across repeated renders including a final re-verify.
Forced-time probe harness (vm-isolated instance, real node-canvas, piece driven
via window.__piece, tmp/probe1478.js): t = 0 redraw 0 px; bench0 mv0 x =
98.0/233.5/369.0/640.0 at t = 0/6/12/24 with stations 0/0/1/2 (gaining one part
per station); t = 48 wraps to station 0 with completed = 1; t = 0 vs t = 6
differs by 92,422 px (line alive); drag right (+200 px) sets bench0 mult 2.00
while bench1 stays 1.00; movement x continuous across the drag (154.5 → 177.0,
no jump back); mult eases 2.00 → 1.135 three seconds after release; dragged
bench ahead of undragged at t = 10 (368.7 vs 323.8); left drag sets mult 0.25;
off-bench drag leaves mult at 1.00.

## Fix rounds (1)
First renders clipped the leftmost movement: travel ran the full bench length,
so a movement at fraction 0 sat centered on the bench's left edge. Travel is
now inset by one movement radius at each end; all renders re-done after the
fix. Frame-one composition unchanged apart from the inset.
