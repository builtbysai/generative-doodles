# No.333 At Nature's Mercy

## Concept

After Arunima Dazess Wangchuk's 2023 paint-on-net work: a tall
sheer grey curtain hangs nearly empty in a dark room, and a
single small mountain in heavy black and white impasto sits
low on the fabric, tiny against the void. Scale as humility:
mountains reduced to a stain. The curtain breathes almost
imperceptibly on a forty-second cycle, and the painted
mountain moves with the cloth exactly, drifting slightly out
of plane with the room but never relative to the fabric.
Watch only; there is no interaction at all.

## Construction

One canvas, 2D, design space 1280x900, centred fit with the
page ground in the room colour #121110. Palette only: curtain
grey #9A958C, impasto black #1A1815, impasto white #EDE8DC,
room dark #121110.

The curtain is 176 layered translucent vertical strokes
(asserted in code) in curtain grey across three layers:
16 broad sheer body bands wide enough to overlap into one
continuous veil, 120 fold threads whose alpha is gathered
by a fixed fold function of x, and 40 crest lights whose
alpha concentrates at fold crests. Each stroke carries a
static seeded sway and is drawn as a polyline displaced by
a low-amplitude sine field (about 10px horizontal, 5px
vertical at most). The broad bands inset their endpoints by
half their stroke width so their round caps terminate inside
the sheet rather than scalloping the top and hem.

The mountain is exactly one (asserted). Its ridge is an
authored polyline in the lower sixth (y 754 to 836), small
(about 240px wide) and off-centre (centred near x 470 of
1280). The black mass is built from three jittered ridge
passes plus three body rows lerped from the ridge toward
the base line, with ten short texture dabs inside. Three
white catch strokes sit offset up and to the left of the
lit slope as layered translucency. No shadowBlur, no
gradients, no offscreen canvas anywhere.

Both curtain and mountain are displaced through the same
field function, sampled point by point at each vertex's own
position, so the mountain is locked to the fabric. Every
time term in the field is a whole number of cycles per 40s
loop (one and two cycles), so frame 40s is pixel-identical
to frame 0. The loop clock starts at 13s, so the first frame
is already mid-breath with the mountain in place. Fixed
seed table throughout; no runtime randomness. House rules
applied: Visual Viewport sizing with resize listeners on
visualViewport and window, canvas pinned every frame via
style width/height in px, phone detection via window.screen
min dimension under 700px with the aspect fallback, every
requestAnimationFrame typeof-guarded, synchronous first
frame.

## QA log

Rendered with node ~/workspace/tools/render-piece.js at
1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and
720x720 (thumb.png), all from the shipped script, and
inspected all three.

First pass defects, both fixed before final render:
(1) the broad body bands were too weak and too narrow, so
the curtain read as sparse hairlines on black and the
bands' round caps scalloped the top and hem edges; fixed
by widening the bands to overlap into a veil, raising layer
alphas, and insetting band endpoints by half width.
(2) the mountain's two body rows left gaps, so the mass
read as a thin ridge line instead of a solid heap; fixed
with a third body row and wider row strokes.

Final renders: desktop shows a continuous sheer grey veil
with soft vertical folds filling the frame, dark room
margins at the sides, and one small solid black mountain
low and left of centre in the lower sixth with two white
catch strokes on its slopes; the rest is void. Thumb shows
the same composition legibly at 720px. Mobile shows the
centred piece on the matching room-dark ground with the
curtain and mountain readable. No text, no UI, no colours
outside the palette, no broken edges.
