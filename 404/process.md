# No.404 Morning Book

EXPANSION #43 (nina-clausonet), prompt NINA4. Gallery date 2003 · 02 · 19.

## Concept

Nina Clausonet's faith-cozy self-care mechanism: her white-haired,
closed-eye muse holding a small book while cosmos flowers grow out of
its pages. Her hair balloons into a giant halo-heart field that fills
the left half of the frame; the muse stands right of centre with the
book at her chest. One short line of designed text, "hope is a quiet
morning", appears once at load and fades for good. Tapping the book
opens the flowers another bloom stage and sends a soft pulse of light
out of the book, light only, no sound.

## Construction

One canvas, design space 1280x900, centred fit; the page ground is the
deep magenta, and the letterbox takes the piece's own band colours
(top band above the frame, bottom band below). Flat colour only: no
gradients, no filters, no shadowBlur, no offscreen canvas. The
prompt's magenta-to-fuchsia gradient background takes the house
stepped treatment: seven authored flat bands from #A8005F to #D63384.
Six translucent ray wedges fan up from behind the figure, their alpha
and angle oscillating on whole cycles of the 36s master loop.

The halo is a parametric heart sampled as a 72-point polygon, centred
(420, 400), breathing 0.99-1.01 on a 12s cycle (three whole cycles per
loop). The muse is a fixed recipe: hair mass and pale face in #F5F2EC,
closed-eye arcs, nose and lips in book red #7B1E2B and flower pink
#E56B9B, a purple #9B3D9B dress, sleeves reaching in to hold the book.
The book is a flat dark-red rectangle at (705, 503, 190x130) with a
page block peeking at the right edge and one simple pink cross
#F2A0C0; two white hands rest over its edges.

Exactly 6 flowers (asserted) grow from stem anchors along the book's
top edge and arc left into the halo. Each recipe stores its head,
control point and leaves relative to its anchor and sways as one piece
around the anchor on a whole-cycle period (12, 18 or 36s) with a
staggered phase. Bloom stages are 0 bud, 1 half, 2 full, cycling: the
eight petals of each cosmos head cluster shut pointing up at bud and
unfold and grow with the bloom amount; past full, the stage wraps and
the bloom closes back through half to bud. A tap inside the book
rectangle (hit-tested through the stored fit transform S, OX, OY)
advances the stage with a 0.9s ease and starts the glow: three flat
rings expanding from the book centre in six radius steps at fixed
alpha steps (0.28 / 0.16 / 0.09) over 1s.

Grain is fixed speckle data, per the batch grain rule, never a noise
texture: 520 gray dots (asserted) placed inside the heart's parametric
field at bake time, drawn in heart-local space so they breathe with
the halo, plus 800 paper dots (asserted) scattered over the whole
field in fixed order, alternating book-red and hair-white at low
alpha. All placements come from a fixed-seed LCG consumed in a fixed
order at load.

Caption timing: the caption envelope lives on the piece clock. Alpha
fades in over 0-2s, holds at full presence 2-6s, fades out 6-8s, and
is 0 forever after; it never returns and is not part of the 36s loop.
Determinism: the clock is anchored at the constant T = 4.0s, so the
synchronous first frame is the designed opening, caption at full
presence in its hold window, flowers at bloom stage 1, halo mid-breath
(scale about 1.009). From load the caption holds, fades out by 8s of
piece time, and is gone. The clock advances only in fixed 1/60 ticks
accumulated from rAF timestamps (typeof-guarded); frame one is never
drawn from Date.now() minus an offset. Sizing uses the Visual
Viewport API with resize listeners on visualViewport and window; the
canvas is pinned every frame via style width/height; phone detection
uses window.screen min dimension < 700px with aspect fallback.

Palette, closed: bands #A8005F, #B00965, #B7116B, #BF1A72, #C72278,
#CE2B7E, #D63384; hair #F5F2EC with gray grain #B5AEA2; book #7B1E2B;
cross #F2A0C0; flowers #9B3D9B and #E56B9B; leaves #7A8B4F.

## QA log

Rendered with the house node-canvas renderer:
- qa-desktop.png (1280x900): seven bands read top to bottom, ray
  wedges fan behind the heart, the halo-heart fills the left half,
  the muse's face is serene with closed eyes, the book and pink cross
  sit at her chest, six flower heads arc into the halo at half bloom,
  caption fully present at the bottom.
- qa-mobile.png (390x844): centred fit holds the whole composition;
  letterbox shows the top band above and the bottom band below, no
  black bars; caption legible.
- thumb.png (720x720): rendered twice from the shipped script and
  byte-compared, identical (md5 cfa5f04ab62f10e9b253b2ecc26fc139).

First pass fixes: the letterbox initially rendered unfilled (bands
covered only the design rect and the long rays spilled into it); the
bands now seed the letterbox with the top and bottom band colours and
all remaining drawing is clipped to the design frame. A parametric
density streak down the heart's centre was softened with a small
fixed jitter baked into the grain table. Counts asserted at load:
7 bands, 6 rays, 6 flowers, 520 hair grain dots, 800 paper grain
dots; the script throws if any count breaks.
