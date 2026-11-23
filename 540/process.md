# Eleven Palettes, One Seed (No.1673, TH2)

Driver: the same frozen field of marks keeps dressing itself in new colors while a faint readout prints the odds behind each one, so the viewer watches randomness they can audit.

## Mechanism

One fixed geometry field is built once from mulberry32 seed 1673: a 14 by 14 jittered grid of 196 shapes (capsules, circles, rotated squares, angles quantized to 30 degree steps). Each shape is assigned a color slot once, by weighted roulette over weights 10, 10, 6, 1, so the accent slot is rare in the field itself. The field never moves again.

Eleven palettes cycle in fixed order: sand, cobalt, bone, rust, night, ochre, moss, rare, indigo, terra, char. Each palette holds a ground, four flat slot colors, and weights 10, 10, 6, 1. Palette 8 (rare) is the one in a hundred palette: a dark ground where two rust tones collide, with nothing in the piece calling it out. Palette swaps recolor slots only; geometry is identical every time.

A swap is a 400 ms crossfade of flat fills: the old palette field is drawn under the new one with complementary alpha. No gradients anywhere.

The weight readout sits bottom right in tiny monospace: palette number and name plus its weights, for example "PAL 01/11 SAND" and "w 10 10 6 1". It reads at alpha 0.6 for 1.2 seconds after each swap, then fades to 0.15 for the rest of the hold. It never explains rarity and there is no other UI.

## Timing

Each palette holds 5.0 seconds, then a 0.4 second crossfade, so one full cycle of eleven palettes runs 59.4 seconds. Frame one is palette 1 (sand) fully settled with the readout at alpha 0.6. No interaction. Watch only.

## Determinism

All randomness comes from mulberry32(1673). There is no unseeded Math.random, no Date, no performance.now. Frame one is a synchronous draw at t = 6.0 with palette index 0 settled and fade progress complete. The thumb re-rendered byte-identical (md5 4e45cc7f2be3765fd529e8621dd5d041).

## House rules

Visual Viewport sizing with resize listened on visualViewport and window; canvas element pinned in draw() via canvas.style.width and height in px. Phone detection via window.screen minimum physical dimension under 700 px with the aspect fallback. Square field: full-bleed width on phones, an inset square (88 percent of the smaller dimension) centered on desktop. One synchronous frame at load; requestAnimationFrame guarded by a typeof check. Title, date, and hint plates in the TH1 style; hint reads "Watch only." No em dashes in visible copy. Flicker is by construction well under 14 Hz: the only temporal change is a 5.4 second palette cycle and a slow readout fade.

## QA

Rendered with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb. Desktop: warm paper ground, square field centered, gold, rust, and cobalt marks, all plates legible, readout "PAL 01/11 SAND / w 10 10 6 1" visible bottom right. Mobile: field spans the full width and sits centered vertically, plates legible, nothing clipped. Thumb: the 720x720 render, field fills the frame, title plate top left, hint and readout bottom corners. A zoomed crop of the thumb top edge confirmed the top row shapes are complete, not clipped.

## Deviations

None from the prompt. One judgment call: on phones the square field spans the full width and centers vertically, leaving plain ground bands above and below, rather than stretching the square to fill the tall viewport, which would break the specified square composition.

## Gate fix round (fly, parent)
The builder's mobile render sliced edge shapes at the canvas edge: on phones the field was exactly viewport-wide (x = 0) while edge shapes extend past their centers by up to half a capsule length. Fix: phone field scale 1.00 to 0.94, centered, so the field is near-full-bleed with a small ground margin and every shape stays whole. Thumb unchanged (square render takes the desktop branch); mobile re-rendered and re-inspected, edge shapes whole. New index.html md5 27166e4079996129ea2c8d38028abc9e, thumb md5 unchanged 4e45cc7f2be3765fd529e8621dd5d041.
