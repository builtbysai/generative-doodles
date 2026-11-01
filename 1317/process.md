# №1317 "Folded Like Paper" — leslie-hewitt LH6 (PP484)

Grounded in Hewitt's Where Paths Meet, Turn Away, Then Align Again (2012,
Menil): five large powder-coated white steel sculptures on a gallery floor,
industrial material performing ephemerality.

## Frame one

Gallery wall above, floor below, horizon high so every form sits on the
floor. Five folded steel forms scattered across the middle ground, each
rotated off-axis (never 0/90 degrees): two photo-corners with a folded
triangle flap, two dog-eared pages with a folded corner, one halved sheet
with a centre seam. Each form carries a slab-thickness band along its
bottom edge so the steel reads heavy, never paper-thin, and casts one long
flat-alpha shadow falling consistently down-right. A small walnut bench
stands at the left edge as the human-scale reference. Two tiny square
photolithographs sit low near the centre, dwarfed by the steel: stacked
arcs (a shoulder's curve) and a broken-arc spiral (a swirl of hair),
both dissolving into seeded static speckle — surveillance imagery tipped
into abstraction, no photorealistic people anywhere.

## Motion (watch-only)

A slow orbital drift of viewpoint over a 2-minute loop: forms shift
horizontally on a sine with per-form parallax factors, as if the viewer
were walking around the sculptures. Light rakes across the folds over the
same loop, so fold-shadow alpha breathes and dog-ears read alternately as
paper and as steel. Drag scrubs the orbit angle (closed-form over recorded
drag segments, decaying with tau 2.5 s after release). Never
click-to-reload.

## Determinism

Frame one is drawn synchronously at exactly t = 0 via a boot flag; the
clock starts only with the rAF loop. All speckle, grain, and layout jitter
come from a seeded mulberry32 stream (seed 1317000), never Math.random.
Loop reseeds advance per loop index. The rAF loop is a plain function
declaration behind a typeof guard.

## House rules applied

Visual Viewport sizing with resize listeners on visualViewport and
window; canvas pinned in draw() via style width/height in px; phone
detection via window.screen physical size with aspect fallback; field-like
composition full-bleed on phones (portrait phones get their own scatter so
the five forms stay distinct, photolithographs tucked to a lower-left
clear gap). No gradients, no shadowBlur, no ctx.filter, no offscreen
canvas, no AudioContext; shadows and fold shading are layered flat alpha
shapes. Dots drawn as paired arcs/rects with moveTo before batched arcs.
No visible text except `<title>`. Silent; no getUserMedia.

## QA

Rendered with node-canvas at 1280x900 desktop, 390x844 mobile, 720x720
thumb; all three inspected. Thumb rendered three times, byte-identical,
and matching the shipped thumb. Forced-time probes (temp copies,
discarded): t = 30 differs from frame one in 69,280 bytes (orbit at peak,
forms shifted); t = 60 differs in 4,469 bytes (orbit at zero crossing,
fold-shadow alpha changed) — motion confirmed.

Fix round: the first render piled all five forms into one overlapping mass
with shadows pointing in different directions and a stray crease line.
Fixed by respacing the scatter (separate portrait layout), drawing all
shadows in one consistent down-right direction before the body, adding
slab-thickness bands, removing the dogear crease line, and moving the
bench and photolithographs to clear gaps. Re-rendered and re-inspected
at all three sizes after the fix.
