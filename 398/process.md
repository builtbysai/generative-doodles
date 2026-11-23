# №1217 — "Windshield Baby"

Clint Enns study block CE2 (PP376). Grounded in his 2009 Gameboy Camera piece
(windshield baby gameboy movie) and his stated aim: to demonstrate "the
inherently dehumanized nature of video game images." An ordinary street,
recorded by a camera that cannot see people — only blocks.

## What happens

A street scene plays as simulated Gameboy Camera footage: a 160×144 logical
pixel view into a 320-wide street. Buildings with hashed lit and unlit windows,
a zebra crosswalk, a cycling traffic light, two cars crossing in opposite
lanes at different speeds, three pedestrians (two crossing on the crosswalk,
one walking the sidewalk). Nothing happens. No crash, no event, no narrative —
the ordinariness is the dehumanization. Faces are 4-pixel dark smears; cars
are green blocks with darker windows.

The footage steps at 4 frames per second, and about 12% of frames are dropped
(the previous frame repeats), the way the little camera stuttered. Every 6–10
seconds the camera re-exposes: a hard brightness snap shifts every shade by
one step for two frames, then settles — one snap in four hunts the other way.
A tiny frame counter ("F" + effective frame) sits in the bottom-right corner,
drawn in a 3×5 pixel font.

Dragging pans the camera, but never smoothly: the view jumps in hard 8-logical-
pixel chunks and wraps at the street's edge. There is no click-to-reload.

## Palette discipline

Four greens only, everywhere, including the counter text and the page ground:
#0F380F (shade 0), #306230 (shade 1), #8BAC0F (shade 2), #9BBC0F (shade 3).
Verified from the code: every canvas fill in the piece is assigned from the
single PAL array, and the only hex color literals in the file are those four.
The exposure snap works by shifting shade indices (clamped 0–3), so even the
"wrong" exposure stays inside the palette.

## How it is built

The scene is a pure function of the effective frame index. A seeded splitmix
hash (no Math.random) drives the building layout, window lighting, frame
drops, and snap schedule. Dropped frames are accounted by a cumulative count:
the effective index is the number of non-dropped frames so far, so the scene
clock and the counter always agree. Each effective frame is stamped into a
320×144 shade grid (sky dither, buildings, sidewalk, road, crosswalk, light,
cars, pedestrians in painter's order), then the 160-wide view window is drawn
to the main canvas as run-length-encoded rects at integer cell scale — no
offscreen canvas, no image smoothing, pixels stay pixels.

## Determinism and house rules

The first frame is drawn synchronously at a fixed phase, T0 = 9.3 s: raw
frame 37, two frames dropped so far, effective frame 35 — car A mid-frame at
the crosswalk's right edge, both crossing pedestrians on the zebra stripes,
the sidewalk walker at the traffic light, counter reading F35. The rAF loop
(typeof-guarded) is anchored as T0 + elapsed and redraws only when the frame,
camera offset, or size changes. Sizing from the Visual Viewport API with
resize listeners on both the viewport and the window; the canvas CSS size is
pinned in draw(). Phone detection via window.screen physical size (min
dimension < 700 px) with aspect fallback; the view fits by integer cell size
either way. No gradients, no ctx.filter, no shadowBlur, no createElement, no
ImageData/offscreen canvas, no microphone, no sound. Silent.
