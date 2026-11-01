# №1192 — Snowrainbow Television

joncates study block JC1 (PP351), after SNOWRAINBOW TELEVISION
(2023): starry rainbow static issued as a collectible edition of a
dead channel. This piece is that channel, left on. The snow is not
white noise and the rainbow is not a picture behind it — the static
itself resolves into colour, and a western broadcast leaks through
the bottom of the frame without ever quite arriving.

## The snow

The field is a coarse tile grid (26 tiles across on desktop, 22 on
phones; rows follow the aspect), never per-pixel — coarse tiles are
what make it read as 1983 rather than 2023. Every tile's shade is a
seeded integer hash of (tileX, tileY, step) with step = floor(t·9),
recomputed from scratch each frame: there is no stored noise buffer,
no accumulation, nothing integrated. A tile's colour is the snow
base #E8E8E8 scaled by its hash luminance, mixed toward the rainbow
band colour at its height. About 2% of tiles per step flip to a
phosphor-green #33FF66 fleck, and about 1% throw a 2 px white
sparkle — the starry part of the snow.

## The bands

Six bands — #FF003C, #FF7A00, #FFE600, #00E676, #00B0FF, #7C4DFF —
tile the field in 13 rows (each ≈7.7% of the height) and drift
vertically: one full sequence cycle per 75-second loop, plus a
±0.02-cycle sine wobble that is zero at both ends of the loop. The
drift over one loop is exactly 13 band rows, an integer, so the
pattern lands on itself at the seam and the loop is seamless by
construction. The mix strength breathes on a slow sine of height
and time (0.34–0.64, further modulated per tile), so the bands
swell through the snow and sink back instead of sitting on it like
stripes.

## The horizon

A rider on a horse (left, never centred), five fence posts with two
rails, and a water tower (right) stand on a ground line at 72% of
the height, drawn as flat #0A0A0C cutouts at 35% alpha after the
snow pass — then a second, sparse snow pass re-buries everything
below the horizon at 25% alpha. They are meant to be half-seen: a
broadcast leaking through, never sharp. One fix round during the
build: the first rider glyph collapsed into dark slabs (far legs and
rider leg drawn as blocks), so the horse was redrawn as a single
profile polygon with slim far legs, a tail, a saddle, and a smaller
rider whose leg hangs along the barrel.

## The tear

Tear-line events are scheduled per loop from a mulberry32 stream
(seed + loopIndex·7919): gaps of 9–14 s, never regular. Each lasts
0.45 s with a sine envelope; rows above the hashed tear line shift
+14 px, rows below −10 px, and the silhouette layer draws two extra
copies offset ±5 px in red and blue — the channels separating.
Verified by extracting the schedule function from the shipped file:
loop 0 tears at 12.78 / 26.34 / 37.12 / 50.65 / 62.99 / 73.13 s, so
frame one at T0 = 12 s sits just before the first tear, untorn.

## The antenna

Dragging records samples (position + piece time, capped at 40). A
resolution field — max over samples of exp(−dist/90)·exp(−age/1.8) —
drives the ghost: where resolution passes a smoothstep between 0.35
and 0.8, tiles flatten toward a resolved sky/ground tone and the
silhouette layer redraws clipped to a disc around the sample at up
to 55% extra alpha, while the bury pass backs off by the same
field. The horizon tunes in under the finger and collapses back
into snow as the samples decay. The viewer tunes, never controls:
no frame, no channel digits, no buttons, nothing to reload.

## Determinism and house rules

First frame is synchronous at fixed phase T0 = 12 s: full-frame
banded snow with the silhouettes ghosting in the bottom third. The
rAF loop is typeof-guarded and anchored at T0 + elapsed; all
randomness is seeded hashes or one mulberry32 stream (seed
1192001). Thumb rendered twice at 720×720 and byte-compared:
identical. Canvas size comes from the Visual Viewport API with
resize listeners on visualViewport and window; the CSS size is
pinned in fit()/draw(). Phone detection via window.screen (min
dimension < 700 px) with the aspect fallback; the field is
full-bleed on phones. No gradients, no ctx.filter, no shadowBlur,
no createElement, no ImageData, no offscreen canvas, no audio, no
microphone. Silent — the channel is dead.
