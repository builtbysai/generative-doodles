# №1349 "Distorted Mirrors" (eric-gottesman EG6, PP572)

## The piece

A night woods on a near-black green ground (#0E1410): six vertical trunks
(#3A3226 with #241D12 bark streaks) running off the top and bottom of the
frame — no horizon, no sky. Four convex traffic mirrors are bolted to four
different trunks at driving height. Each mirror shows the same woods
funhouse-distorted, and in every mirror a small bright amber dot (#F5C86E):
the viewer's presence, refracted. Mirror glass #9AA8B0, rim #C9D2D8,
bolt #5C5C5C; drifting light #E8D9A0 at low alpha.

Pointer-move / drag IS the presence: the amber dot moves in every mirror
simultaneously, each with its own distortion mapping, and the mirrors
nearest the pointer brighten. There is no tap action. Idle, the dot parks
at its last position and the trunk sway continues.

## Barrel mapping (the funhouse)

Mirror content is drawn procedurally inside each circular clip — no
offscreen scene sampling, per the QA renderer limits. Each mirror holds a
seeded set of vertical trunk streaks. A streak at normalized position u
(-1..1) is drawn at u * (1 - k*u*u), with k = 0.28–0.42 per mirror: points
move inward, more so near the edge, so the center is magnified and the
edges squeezed — the convex-mirror read, strongly distorted, never legible.
The presence dot uses the same mapping: the pointer offset from the mirror
center is normalized, barrel-compressed, and clamped to 0.78 of the radius,
so the dot can never leave a mirror. It exists only as reflection — it is
drawn nowhere outside a mirror.

## Adaptations

- Everything on the main canvas: no offscreen buffers, no gradients, no
  shadowBlur, no Path2D, no createElement, no AudioContext (silent piece).
- Phone: mirror diameter capped at 0.24 * frame width and alternate
  mirrors staggered vertically (rows at 0.44 / 0.58 of height), because
  adjacent mirror trunks sit only ~0.17W apart on a narrow screen and the
  first render overlapped mirrors and clipped the edge pair. Edge mirror
  centers are clamped inside the frame.
- All sizes: a global diameter cap from the closest pair of mirror trunks
  minus twice the max sway plus margin, so no two mirrors can overlap even
  at square aspect (the 720x720 thumb first showed the middle pair touching).
  Resulting diameters stay inside the specced 12–20% of frame height.
- Determinism: synchronous first frame at constant phase via a boot flag
  (frame one = draw(0), clock starts only with the rAF loop, which is a
  plain function declaration behind a typeof guard). All randomness from
  mulberry32 streams (seed 1349000), never Math.random.
- House rules: canvas sized from the Visual Viewport API with window
  fallbacks, pinned in draw() via style width/height in px, phone detection
  via window.screen physical size with the aspect fallback. Field-like
  composition, full-bleed at all sizes. No readable text anywhere except
  <title>, per the study-wide rule.

## QA

Rendered with the QA renderer at 1280x900, 390x844, and 720x720; all three
inspected. Thumb rendered three times, byte-identical each time. A probe
harness driving the piece's own pointermove listener (pointer to 1130,500
on the 1280x900 field, frame advanced to t = 1 s) confirmed: the rightmost
mirror brightens with a warm wash, its dot moves to the corresponding
position, the other three mirrors' dots shift consistently, and no dot
leaves its mirror. Token scan clean except one comment stating Math.random
is never used.
