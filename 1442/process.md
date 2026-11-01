# №1442 "Instruments in Leather" (kathe-kruse KK3, PP673)

## What it is

A drum kit and a row of hand instruments — a trumpet, a small keyboard, a
violin — standing on a bare floor, every one wrapped tight in stitched brown
leather. Silhouettes stay perfectly readable; details are muffled under the
skin; seams and stitching show. Nothing plays at first. Then, one by one, a
wrapped drumhead dents inward as if struck from inside, a wrapped trumpet bell
shudders, and a low muffled thump sounds through the leather — visualized as a
dent plus a ripple travelling across the wrapping.

## Composition

Wall warm white (#efe9dc) above, floor pale gray (#cfc8bc) below, generous
empty floor around the row. Kit centered-left: bass drum with pale leather
drumhead, tom above it, snare to its right, cymbal on a stand. Hand
instruments in a loose row to the right: trumpet (tube, three valves, bell
flare), small keyboard (key divisions muffled under the wrapping), violin
(two-lobed body, neck, scroll). No audience, no stage dressing, no visible
text besides `<title>`. On phones the same centered composition holds with no
clipping; the page ground takes the wall colour.

## Motion and interaction

- Slow loop. Ambient strikes cycle one instrument every ~4 s in fixed order
  (bass, snare, tom, cymbal, trumpet, keys, violin, then repeats); the first
  ambient strike lands at t = 4 s, so frame one is still and silent.
- A strike is a dent disc that darkens and rebounds plus three ripple rings
  that travel outward and fade over 2.5 s. All closed-form over piece time
  and the recorded strike list — never frame-integrated state.
- Drag across an instrument strikes it under the finger (dent + ripple);
  dragging across several plays a muffled phrase in touch order. One strike
  per instrument per drag. Never click-to-reload, never an unwrapped
  instrument, never a drum-machine pattern.

## The hand in the work (study rule)

Every leather shape is drawn as a wobbly blob — a 26-point polygon with
seeded radius jitter — so no outline is machine-perfect. Speckle, stitch
dashes, and key divisions are seeded per instrument and stable across loops:
the errors stay visible and never flicker.

## Sound adaptation (house rule)

Thumps are visualized by default and the piece completes silent. Any real
sound is a low sine burst through a fast low-pass filter (muffled by design),
created only inside a visitor gesture via a lazily created, typeof-guarded
AudioContext — never autoplay. No getUserMedia/microphone anywhere.

## Technical notes

- Self-contained `index.html`, no external assets. Canvas sized from the
  Visual Viewport API with resize listeners on visualViewport and window;
  canvas pinned in draw() via style width/height in px.
- Phone detection via `window.screen` physical size (min dimension < 700 px)
  with aspect h > w*1.15 as fallback.
- Determinism: synchronous first frame at constant phase via a boot flag
  (frame one = draw(0), clock starts only with the rAF loop, written as a
  plain function declaration behind a typeof guard). All randomness from a
  seeded mulberry32 PRNG (seed 1442000 + index*7919), never Math.random.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement, or
  fillText/strokeText. Fading alphas rounded to 4 decimals before
  stringifying; dots drawn as filled rects or own-beginPath arcs (node-canvas
  quirks: batched arcs connect, scientific-notation alphas parse as opaque).
- A non-visible `window.__piece` probe hook (draw / strike / instruments)
  exists for QA only; it draws nothing.

## Verification

- Rendered with `~/workspace/tools/render-piece.js` at 1280x900, 390x844,
  and 720x720; all three inspected. Desktop: kit left, trumpet, keyboard,
  violin right, all leather-wrapped with visible stitching, no text.
  Mobile: same centered composition, no clipping.
- Thumb byte-identical across repeated renders.
- Forced-time probe harness (vm-isolated instance, `__piece.draw(t)` driving
  the piece's own draw, strikes via `__piece.strike`): t=0 vs re-draw = 0 px
  diff; t=0 vs t=3.9 = 0 px (nothing plays at first); t=0 vs t=4.5 = 4,192 px
  (first ambient strike at t=4, ripple live); t=0 vs t=10.5 = 0 px (ambient
  ripple aged out); t=10.5 clean vs t=10.5 after a drag-strike on trumpet =
  4,005 px (drag strikes work); all 7 instruments addressable.
- Token scan: the single "Math.random" hit is a comment stating it is never
  used. No getUserMedia, createElement, Path2D, shadowBlur, or gradients.

## Fix rounds

None needed.
