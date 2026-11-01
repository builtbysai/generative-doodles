# №1303 "Bloemenlust" — process notes

Karen Kraven, KK8 (PP470). Grounded in Bloemenlust (2025, Oakville Galleries):
"the long unwinding spiral of rot and fertility", and the white flower that
"blooms like a white flower across the brain scans".

## What it is

A dark soil bed. Across the middle band runs a long unwinding spiral ribbon
of 96 petals, three turns, stretched horizontally. The piece cycles through
75 seconds, watch-only, and reseeds per loop from a seeded sequence:

- Growth (0-18 s): petals unfurl in spiral order, inner turns first, from
  buds into living pink (#C76B8A).
- Downpour (18-33 s): grey vertical rain streaks cross the whole frame;
  petals bow downward under the rain. No splashes, no cartoon rain.
- Rot (33-51 s): petals brown from the spiral tail inward, living pink to
  rot brown (#6B4A33) to compost (#3A2E22). The center is last to rot.
- Drought (51-66 s): amber heat-shimmer lines drift across the bed; the
  petals lie still. No sway is added anywhere in this phase.
- White bloom (66-72 s): a fullscreen white flower blooms suddenly, drawn
  in horizontal bands with per-band jitter over a faint scan-green grid,
  so it reads like a scan image, then dissolves. Neurological, not
  decorative.
- Reseed (72-75 s): the field sheds to bare soil and the next loop's
  layout is drawn from the next seed.

Drag stirs petals locally (wind) without breaking the cycle: drag events
are recorded and applied as distance-falloff, exponentially decaying
displacements, closed form over recorded events and time.

## Determinism

Frame one is exactly t = 0 via a boot flag; the performance clock starts
only with the rAF loop. Loop layouts (petal sizes, wobbles, rain streaks)
come from mulberry32(1303 + loop x 7919), never Math.random. The rAF loop
is a plain function declaration behind a typeof guard.

## Adaptations and fixes

- Petal radius uses pow(u, 0.8) rather than linear u, so the inner turns
  spread outward instead of collapsing into a blob at the spiral center.
- Bud dots enlarged slightly after the first render read too faint at
  thumb scale.
- No gradients, shadowBlur, filters, offscreen canvas, or audio anywhere;
  rain, shimmer, and bloom are flat alpha shapes and streaks. No visible
  text except the title element.

## QA

Rendered with node-canvas at 1280x900 desktop, 390x844 mobile, 720x720
thumb. Thumb rendered three times, byte-identical. Forced-time probes
(temp copies, discarded): t = 10 shows inner turns unfurled and outer
turns still buds; t = 25 shows full-frame rain with bowed petals; t = 42
shows the outer spiral rotted and the inner turns still pink; t = 58
shows the fully composted spiral under amber shimmer; t = 69 shows the
white scan-flower at peak over the composted spiral.
