# Marcello Herreshoff: "Triple Nested Loop, #genuary 2021-01-01" (WNGRJKg)

**Pen:** https://codepen.io/mherreshoff/pen/WNGRJKg
**Author:** Marcello Herreshoff (CodePen PRO)
**Status:** 2026-09-21, deep. Source read in full from the live pen
(authored JS; CodePen's injected infinite-loop guard calls omitted),
re-rendered in plain canvas, pixels inspected.

Facts: created 2020-12-13, 7 views, no description, no tags. Built with
the p5.js 1.0.0 CDN. Made for Genuary 2021, day 1, prompt "triple nested
loop". No interaction; windowResized keeps the canvas full window.

## Technique

The prompt is the construction, taken literally. One big ring; inside it 5
rings; inside each of those 3 rings; inside each of those 4 rings. That is
1 + 5 + 15 + 60 = 81 rings total, each drawn as a thick stroked circle
(strokeWeight = outerR - innerR) with a transparent fill, so every ring is a
flat band of color with no fill management.

Positions are computed with cos/sin at each nesting level, and each level
orbits its parent at its own angular rate and direction: the green cluster
rotates at time/5, the red triplets at -time/4 relative to their green
parent, the orange rings at time/5 relative to their red parent. The
result moves like nested gyroscopes, counter-rotating bands inside bands.
Delta time is clamped at 0.1 so a background tab does not make the piece
jump.

The coordinate system does the heavy lifting: scale(min(w,h)/2),
translate(1,1), and then everything is written in unit math. The piece is
viewport-independent without a single pixel constant in the draw code.

## Palette and composition

Flat medium gray ground (background(200)), with periwinkle #7777ff, lime
#77ff77, red, and orange bands. Loud primary-ish accents on a neutral
ground; the orange rings are small enough to read as dotted accents tracing
inside the red rings. One composition note: on very wide viewports the unit
scaling centers the arrangement in the square region, so it sits left of
center with empty gray to the right.

## What makes it sing

A 30-line piece where the concept and the code are the same sentence.
Three counter-rotating rates on a recursive orbit structure produce real
hypnotic motion, and the stroke-as-band ring trick is a clean way to draw
flat colored rings without touching path winding or fills.

## Avoid-list notes

Nothing overdone. The loud default-ish palette (red, orange, lime on gray)
works here because the structure is strong, but it would not survive a
weaker layout. The empty-right composition on wide screens is a weakness;
for a Genuary day-1 sketch it is acceptable, for a gallery piece it would
want centering in the actual viewport.

## Cross-links

Genuary day-1 2021 prompt, see the genuary study notes. Same prompt-driven
discipline as scorch's GENUARY2022 pens. The thick-band ring idiom is worth
keeping in the sketchbook.
