# No.764 — Vapor Drawing

EXPANSION #93 larry-bell, prompt block 5. Thin-film coating on paper:
paper does not transmit, it only reflects and absorbs, so this is the
dark, sooty, flatter member of the Bell set — torn Mylar shards and
laminating-film bands over a black-brown ground, one amber-to-white
column, one white paper shard that reads as a hole cut in the dark.

## Concept

A portrait composition held in a thin black float frame. The ground is
soot (#2E2C29) with seeded film grain. A vertical column at center
steps from amber at its base to paper white at its top in nine flat
bands — a film strip laid on the ground, its side edges slightly
jittered. Seven torn shards cluster center-right: blue-gray film
strips, warm gray pieces, two pale ones, with short gold interference
ticks burning along a few edges. Lower-left, a single large white
paper shard sits flat and opaque, the brightest thing in the piece.

Nothing moves except heat: a slow 20-second shimmer drifts the layers
against each other by less than two pixels, the way air shimmers over
a warm surface. Pressing on a shard lifts it a few pixels on a soft
layered shadow while the finger holds; releasing lets it settle back.
No drag, no reseed, no click-to-reload.

## Construction

Single self-contained `index.html`, canvas 2D, no external assets.
Canvas size comes from the Visual Viewport API with resize listeners
on both `visualViewport` and `window`; `draw()` pins
`canvas.style.width/height` in px every frame. Phone detection uses
`window.screen` physical size (min dimension < 700px) with the
aspect fallback `h > w*1.15`. The composition lives in a 600x800
unit portrait space: on portrait viewports it fills the frame inset;
on landscape desktops it is centred as a portrait column with soot
margins, the page ground being the soot tone itself.

Palette is strict: soot #2E2C29, film gray #7A7E83, amber #E8A33D,
paper white #F5F2EA, blue film #5F7E94, gold tick #D8B46A. The column
bands are flat mixes stepped between the two specced anchors (amber
to paper white) — no smooth gradients anywhere, per house rule. The
float frame is near-black #0D0D0C as specced ("thin black float
frame"); shard underlays and the lift shadow use a darker soot shade
at low alpha, layered in steps instead of shadowBlur.

Torn edges: each shard is a 16–21 vertex polygon whose radius is
modulated by two low-frequency sine octaves with seeded phases
(amplitudes ~0.16 and ~0.09, at 2θ and 3θ) plus fine per-vertex
jitter, with one or two vertices bitten inward at 0.45–0.65× radius.
Low frequency is the point: the outline wanders and bites like torn
film rather than wobbling like a blob or repeating like a gear. All
geometry and the 2,600-point grain field are precomputed once from
mulberry32 streams (fixed seeds); nothing at draw time is random.

Shimmer: whole-layer offsets, not per-pixel distortion (the QA
renderer has no per-pixel sampling path, and at under 2 px the
read is identical). Each of the three element layers gets a fixed
direction vector scaled by one shared sine gate over the 20 s cycle,
so all offsets are exactly zero at t = 0 and the layers drift against
each other mid-cycle.

Lift: pointerdown hit-tests the shards (topmost first, even-odd
point-in-polygon in unit space) and records the event with the piece
clock; pointerup/cancel/leave records the release. Lift amount is a
closed-form function of the shard's recorded event list and t
(smoothstep over 0.28 s toward the current target), so any frame is
reproducible from (events, t). A lifted shard translates ~3 px and
casts three layered shade copies at increasing offsets and
decreasing alpha.

Determinism: frame one is the synchronous draw at t = 0 — shimmer
phase 0, no events, lift 0. `Date.now()` is never used; the loop, when
`requestAnimationFrame` exists, is anchored at elapsed-since-load.
An inert `?seed=tNN` hook (house convention) lets QA draw a later
loop time; it is inert in normal viewing.

## QA log

Renderer: `node ~/workspace/tools/render-piece.js` (node-canvas; no
rAF, no AudioContext, no createElement — the piece guards rAF with a
typeof check and needs none of the others).

- qa-desktop.png (1280×900): soot field in a thin black frame,
  portrait column centred with soot margins; stepped amber-to-white
  column at center; seven torn blue/gray/pale shards center-right
  with gold ticks visible on several edges; large white paper shard
  lower-left. Pass.
- qa-mobile.png (390×844): composition fills the tall frame, column
  and shard cluster legible, nothing clipped. Pass after the fix
  below.
- thumb.png (720×720): rendered twice, `cmp` byte-compare identical.
  Determinism gate pass.

Fix round: in the first mobile render the white paper shard's left
tip crossed the float frame (its modulated radius reached past the
unit-space left edge). The shard was re-centred (194, 600) and
narrowed (rx 118) so its full torn extent stays inside the
composition; all three sizes re-rendered and the thumb byte-compare
re-run green.

Deviations: none from the prompt's substance. Two construction
choices, recorded here: (1) the heat-haze shimmer is whole-layer
offsets rather than per-pixel displacement — renderer-safe, same
sub-2px read; (2) the tap-hold lift the prompt marks optional is
implemented, with the soft shadow built from layered shade shapes
rather than shadowBlur, per house rule.
