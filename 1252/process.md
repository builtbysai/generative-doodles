# №1252 — Grey Areas

Jenna Maurice study block JM5 (PP411), after her grey-areas video essay
(2023): "what is the exact moment it is not OK?" — partially-defined
domains where new things emerge. The piece is a field of forms that
never resolve: soft blobs hover between figure and noise, a shape that
is almost a hand, almost a cloud, drifting through thresholds that
move. Nothing ever lands; the piece lives in the unclassified zone.

## What you see

A deep #232323 field with a faint hashed grain and three large,
barely-visible indigo contour rings breathing through it. Four forms
drift slowly, never centered: a hand-like form upper-left (a palm
point, a wrist, and four finger chains — the skeleton suggests a hand,
nothing ever outlines one), a wide flat cloud upper-right, an arc
mound lower-right, and a loose three-armed wisp lower-left. Each form
is rendered as five layered flat-alpha unions of circles sampled along
its skeleton, fog grey #B9B7B2 at the outer layers warming to
figure-mist #D8D4CC at the core — threshold contours, not shading.
When a form approaches figure, a thin indigo #4A4E69 shimmer rides the
innermost layer's rims; it is a shimmer, never a hard outline. When a
form crosses the mid-zone on its way down, a few rust #9C6644 flecks
appear at its edge — the dissolve made visible.

Across the bottom sits the classification bar: an indigo track with a
lighter grey-zone band in its middle third and a single marker showing
where the threshold stands right now. No text, no tick labels, no
names anywhere in the piece.

First frame (fixed phase T0 = 14 s): the threshold stands at 0.372
and the marker sits just left of mid-bar. The hand-like form is at its
sharpest-but-unresolved (d = 0.88, the cap; indigo rim shimmer up),
the mound mid-gathered (d = 0.64), the cloud half-dissolved with rust
flecks (d = 0.48), and the wisp mostly dissolved, a faint three-armed
ghost with flecks (d = 0.28).

## The threshold / layer model

- **Threshold T(t)** is a slow walk of two sine sums,
  `0.5 + 0.26·sin(2πt/43 + 3.9) + 0.12·sin(2πt/19 + 1.3)`, ranging over
  [0.12, 0.88] with a ~43 s dominant period. High T dissolves forms
  toward noise; low T lets them approach figure.
- **Latent figure-ness φ** is fixed per form: hand 0.82, mound 0.48,
  cloud 0.36, wisp 0.20 (reseed jitters φ by ±0.04). A form's
  definition is `d = clamp(0.5 + (φ − T)·1.3, 0.06, 0.88)` — high-φ
  forms sharpen first as T falls, and the 0.88 cap means even the hand
  never fully resolves.
- **Layers:** five union layers with radius scales
  [1.30, 1.12, 0.95, 0.79, 0.64] and base alphas
  [0.10, 0.11, 0.14, 0.19, 0.27]. Each layer's visibility is
  `clamp(d·1.15 + 0.18 − (4−k)·0.17, floor, 1)`: inner layers switch
  on first as d rises. The outermost layer's visibility is floored at
  0.8, giving every form a permanent presence of alpha 0.08 — a form
  never fully vanishes either. The zone between the cap and the floor
  is the piece.
- **Union rendering:** each layer is drawn as a single canvas path of
  circles (a `moveTo` before every `arc`) filled once, so the layer
  takes its alpha exactly instead of stacking per circle. Interiors
  therefore top out around 0.6 effective opacity.
- **Rust flecks** appear while `0.15 < d < 0.72`, count peaking at
  d ≈ 0.45 (max 5), at hashed skeleton-edge positions that re-hash
  every 7 s of piece time.
- All motion is closed-form: centers ride slow lissajous drifts
  (periods 47–93 s), skeletons rotate ±0.16 rad on a 61 s cycle and
  breathe ±5% on 21–30 s cycles. Verified off-phase (temp T0 = 33 s
  copy, discarded): at T = 0.627 the cloud and wisp thin to outer
  layers only, the hand keeps the most body, the mound sheds flecks,
  and the marker stands at 0.63 inside the grey-zone band.

## Interaction

- **Drag vertically** — push the threshold: down toward noise, up
  toward figure (±0.45 of offset, applied live while dragging). The
  drift continues around the pushed value.
- **Tap** — freeze the nearest form mid-resolution for 20 seconds:
  it holds its current sharpness while the others keep drifting.
- **Double-tap** — reseed the forms (new salt: placement, drift
  phases and φ jitter change; the four archetypes remain).

## House notes

- Ships **silent**; no audio of any kind.
- Flat fills only: no gradients, no canvas filters, no shadow blur,
  no offscreen canvas, no image data, no element creation, no
  `Math.random` — every variation comes from a seeded integer hash.
- Determinism: the first frame is drawn synchronously at exactly
  T0 = 14 s; the animation loop is anchored to that phase plus
  elapsed time and guarded by a `typeof requestAnimationFrame`
  check, so the QA renderer's single synchronous pass produces the
  exact shipping frame. The thumb was rendered twice at 720×720 and
  byte-compared: identical.
- Canvas size comes from the Visual Viewport API with resize
  listeners on both the viewport and the window; the canvas CSS size
  is pinned in `resize()` and again in `draw()`; phone detection uses
  `window.screen` physical size (min dimension < 700 px) with an
  aspect-ratio fallback, and forms scale down on phones so all four
  stay separate.
- No visible text beyond the `<title>`: the classification bar is
  deliberately unlabeled — ambiguity is the content.
