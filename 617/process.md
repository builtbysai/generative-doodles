# No.617 — One Body, Many Materials

EXPANSION #75 mariona-cabassa / theinvisiblecircle, prompt block 1 "Transmutability".

## Concept

Her segmented serpent rebuilt as a living organism. One long S-curve body crosses
the frame diagonally on a near-black ground, tail at lower left, small head with a
single calm cream eye at upper right. The body is divided into six uneven bands,
each wearing a different procedural material; the borders between materials are
crisp, cut by thin cream separator lines. The animal breathes: the whole curve
undulates slowly like a swimming ribbon and the textures shimmer in place.

Band sequence (fixed forever, tail to head):

1. Black snakeskin — overlapping scale arcs in near-black tone family.
2. Sunflower-gold feather fan — fine strokes fanning from a central shaft.
3. Coral-pink dot pattern — regular cream dots on coral.
4. Feather-cream plain — fine diagonal hatch over cream.
5. Feather-gold scales — overlapping scale arcs in gold tones.
6. Dark snakeskin at the neck — same scale engine, darker register.

Interactions: drag across a band and that band re-grows its texture from a new
seed (same material, new arrangement). Tap the head and the eye blinks while the
whole body re-segments — new band widths, materials always in the same order.
Nothing is ever cleared; there is no click-to-reload and no text anywhere.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets.
- Sizing from the Visual Viewport API with resize listeners on both
  `visualViewport` and `window`; the canvas CSS size is pinned in px inside
  `draw()` every frame. Phone detection via `window.screen` (min dimension
  < 700px) with the `h > w*1.15` aspect fallback; the S-curve is defined in unit
  space so it refits a portrait frame diagonally.
- Centerline: the brief suggested a Catmull-Rom spline through seeded control
  points. Uniform Catmull-Rom was tried first and overshot catastrophically on
  this zigzag S (sampled length ~11,000px in a 1280x900 frame, with loops
  shooting off-canvas — verified with a debug overlay render). The shipped
  centerline is the same control polygon smoothed by six rounds of Chaikin
  corner-cutting, which cannot overshoot. See Deviations.
- Undulation is a perpendicular sine offset along arc length, phase anchored as
  `PHASE0 + elapsed * 0.55`, where elapsed comes only from rAF timestamps after
  the first frame. Frame one is one synchronous `draw(0)`: phase 0, segmentation
  seed 1, eye open. No `Date.now()` anywhere; rAF is `typeof`-guarded.
- Bands are arc-length fractions of the spine. Band widths come from mulberry32
  seeded by `BASE_SEED + counter`; the initial counter is 1 and each head tap
  advances it, so re-segmentation is a reproducible sequence. Widths are drawn
  from 0.45–1.6 raw weights, normalized — always uneven, never regular.
- Each band is drawn by clipping to its ribbon polygon (spine offset by the
  tapered half-width profile: thin tail, full body, gentle neck taper) and
  running its texture engine on a local grid walk along the spine. Textures are
  pure stroke/fill work — no gradients inside bands, no filters, no offscreen
  canvas. Per-band texture seeds derive from the base seed plus a per-band
  counter that only drag-reseeds advance.
- Head: a small ellipse at the spine's end, oriented to the tangent, filled with
  the snakeskin tone and a few scale arcs; the eye is a cream ellipse whose
  vertical radius follows the blink envelope (open at frame one; a head tap sets
  `blinkStart` on the anchored clock).
- Palette is strict: ground #14100C, snakeskin #1C1A16, sunflower #E8B93B,
  feather gold #C98A2E, coral #E2725B, cream #F0E6D2. The only extra hex values
  are tone-family shades of those same materials (scale edge #2E2A23, gold
  shadow #A87424, coral shadow #C85A45, darker tail register #100E0B), used the
  way a painter uses the same pigment at two strengths.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and `cmp` byte-compared —
  identical. Re-checked after the final geometry fix; identical again. Second
  render deleted.
- First build read-back failed: the Catmull-Rom spine looped wildly and the
  ribbons folded over each other (see Construction). A debug overlay render
  (spine polyline + band-boundary ticks, kept in /tmp, since deleted) isolated
  the cause to spline overshoot, not widths or clipping. Replaced with Chaikin
  sampling, narrowed the body slightly (0.046 → 0.040 of min dimension), and
  swept the feather-fan strokes further along the body so they read as feathers
  rather than lattice.
- Final read-back, all three sizes: one serpent in a clean diagonal S; six
  crisp textured bands in the fixed order (dark snakeskin, sunflower feather
  fan, coral dots, cream hatch, gold scales, dark snakeskin neck); thin cream
  separators; head at upper right with the calm cream eye open; nothing clipped
  on mobile, generous near-black margins on all sides.
- Interaction paths are code-checked (the QA renderer fires no pointer events):
  drag hit-tests bands against the current spine geometry and reseeds only the
  crossed band; head tap requires a quick, near-stationary press inside the
  head radius and triggers blink + re-segmentation together.

## Deviations

- Centerline curve: Chaikin corner-cutting instead of Catmull-Rom. Reason:
  uniform Catmull-Rom through the brief's zigzag control polygon overshoots by
  several frame widths (measured, not aesthetic judgment); the control points,
  S composition, head position, and undulation are unchanged.
- Band 6 snakeskin uses a darker base register than band 1, per the brief's
  "snakeskin again near the tail in a darker register" read at the neck end;
  both bands run the identical scale engine and tone family.
- A handful of tone-family shade hexes accompany the six palette colors (scale
  edges, dot shadows). Reason: the brief's own textures (scale arcs with edges,
  dots with depth) need a light and a dark step of the same pigment; no new hues
  were introduced.
