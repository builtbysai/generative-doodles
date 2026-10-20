# No.430 Golden City

## Concept

After Yael Hofri's "Golden City - Warsaw" travel-poster puzzle
(EXPANSION #46, prompt YAE6): a city square at spring noon,
flat and warm as a postcard. A tall column stands centre-left
at full height, its statue silhouette holding a cross; red
tiled roofs and green domes layer across the horizon behind
it; one big yellow sun hangs top-right; and six tiny strollers
amble across the plaza in front, one woman carrying a teddy
bear, one couple with a camera raised. No text or signage
anywhere, per the prompt. Dragging shifts the square's depth
bands against each other; otherwise the piece simply lives on
its slow beats: the sun breathing, a camera flashing now and
then, birds crossing.

## Construction

One canvas, design space 1280x900, full-bleed cover fit.
Flat colour only, palette closed to the prompt's set (sky,
sun, roof red, dome green, two facades, column stone, skin,
three coat colours, street cream). The camera flash takes
the pale facade cream so it reads as a white pop without
leaving the palette; bird silhouettes take the darkest coat
brown. Layers are data drawn per frame at parallax offsets,
never separate canvases.

Master loop: 180s, chosen so every prompt beat lands on a
whole count:

| beat | period | count per loop |
|------|--------|----------------|
| sun glow (scale 1.0-1.03) | 12s | 15 |
| camera flash slots | 9s | 20 |
| bird flock crossings | 30s | 6 |
| clouds (wrap widths per loop) | 180s / k | k = 1, 2, 1, 2 |
| stroller strides | 180s / cyc | 78-96 per figure |
| stroller amble | 180s / stroll | 1-3 per figure |

- Sun: one flat disc (r 118) at top-right with two stepped
  flat-alpha halo discs (0.07 / 0.15), the whole group
  scaled by the glow pulse about the sun's centre.
- Clouds: 4 cream puffs, each drifting a whole number of
  wrap widths (design width plus margins) per loop, so each
  is exactly home at the seam; two of them cross the sun.
- Birds: 6 authored slots, one crossing in the first 14s of
  each 30s slot, direction alternating, a flock of 3 gull
  marks with a 3-per-second wing flap (540 whole flaps per
  loop). The prompt's 25s cadence is resolved to fixed 30s
  slots so the loop seam is exact.
- Buildings: 11 authored houses along the horizon baseline,
  spanning x -280 to 1580 so the mid band never shows an
  edge: gables with red triangle roofs, domes (semicircle
  plus finial on a drum), two domed towers, flat red slab
  roofs; windows are sky-blue panes on a fixed per-building
  skip pattern.
- Column (near band): stacked rects - ground step, slab,
  pedestal block, base flare, one tapered shaft polygon,
  capital flare and slab - topped by the statue: head
  circle, capsule body (thick round-capped line), one arm
  raised to a cross of two bars, all in the column stone.
- Strollers: exactly 6 authored figures (asserted), about
  112 tall, capsule torsos in the three coat colours with
  contrasting scarf bands and flutter tails, brown stride
  legs alternating on each figure's whole-cycle phase,
  vertical bob from the stride's absolute sine, and a slow
  whole-cycle lateral amble. Figure 1 holds a tiny teddy
  bear (brown body, head, ears, pale muzzle); figures 2-3
  are the camera couple, figure 2 holding a small brown
  camera box at his face; two men wear brimmed hats.
- Flash: at each 9s slot the first 0.35s pops three stepped
  cream discs (alpha 0.20 / 0.45 / 0.95, radii 26 / 15 / 6.5)
  at the camera's front corner, fading linearly.

Interaction: drag horizontally. The pan is clamped to
plus or minus 150 design px; the sky band (sun, clouds,
birds) shifts at 0.2x, the building band at 0.5x, the
street, column and figures at 1.0x. All bands are drawn
wider than the clamp range on both sides, so no edge ever
shows. While dragging, the pan eases toward the target;
on release a damped spring in the fixed-tick step drives
it back and snaps to exactly zero.

Determinism: frame one is drawn synchronously at the
constant phase T = 71.15s into the loop (sun glowing
mid-cycle, the third bird flock mid-crossing, every
stroller mid-stride); the clock is anchored there and
advances in fixed 1/60 ticks from the rAF timestamp,
typeof-guarded. Frame one never comes from a wall clock
and the pan starts at exactly zero, so the thumbnail
reproduces byte-identically.

House rules: Visual Viewport sizing with resize listeners
on visualViewport and window; canvas pinned via style
width/height in px every frame; phone detection via
window.screen (min dimension under 700px, aspect
fallback). Fixed data only, no runtime randomness at draw
time, no offscreen canvas, no gradients, no shadowBlur,
no em dashes, no absolute URLs.

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png). Thumb rendered twice from the shipped
  script: byte-identical (md5 recorded at the gate).
- Desktop: postcard read is immediate - huge flat sun
  with stepped halos top-right, clouds across it, a bird
  flock mid-crossing, the column full height centre-left
  with its cross-holding statue, red roofs and green
  domes along the horizon, six strollers on the cream
  plaza, the teddy bear and the camera couple both
  readable at figure scale.
- Mobile: cover fit centre-crops the square; the column,
  sun and the middle strollers stay in frame, the house
  behaviour for full-bleed field pieces.
- Palette verified closed against the spec: sky, sun,
  roof, dome, both facades, column, skin, three coats,
  street - nothing else. No banned terms in code outside
  the absence-noting header comment.
