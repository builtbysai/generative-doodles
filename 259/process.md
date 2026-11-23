# No.520 Città Blocks

EXPANSION #62 giulia-pastorino, prompt GP8. Her abstract CITTÀ track:
pure color architecture, no creatures, no faces.

## Concept

A fauvist geometric city built from big flat blocks in the seven-color
CITTÀ palette (vermilion, sunflower, hot pink, violet, orange, black,
cream mortar), stacked in three skyline layers. Round-arch doorways and
windows are cut into blocks in cream, pattern fills (stripes, dots,
wavy lines) live inside four blocks only, one exact 45-degree bridge
diagonal crosses the middle layer, and two or three rainbow ribbons
run the full width of the canvas over everything. A single tiny black
figure walks a front-block ledge for scale.

## Construction

- Single self-contained index.html, canvas 2D, no external assets,
  no gradients anywhere; every fill is one of the seven palette colors.
- Seeded layout (mulberry32, fixed seed 520062). Each of the three
  layers partitions the stage width exactly into 4 blocks (12 total,
  inside the specced 8-14), so each layer tiles seamlessly as it
  drifts. Adjacent blocks in a layer never share a color.
- Cream mortar: every block is stroked in cream after filling, so a
  cream line separates all blocks, including across layers.
- Arches are always round (semicircle-topped paths): one doorway per
  layer plus two arch windows on taller blocks, filled cream.
- Pattern fills are clipped to the block interior and drawn in cream,
  or black on the sunflower block. Patterns never appear on ribbons.
- Bridge: a 45-degree band (run equals rise by construction) seeded
  from a mid-layer block top, drawn above the block layers with a
  cream under-stroke so the diagonal reads against any block color.
- Ribbons: sine-curve bands crossing the whole canvas, drawn as five
  nested strokes in a rotated rainbow sequence from the palette.
- Motion is watch-only: the three layers drift at 0.00055 / 0.00105 /
  0.00175 stage units per second (about 0.6 / 1.1 / 1.9 px/s at 1080),
  each wrapping modulo its exact tile width, so the loop is seamless.
  The figure walks its ledge on a 30 s each-way cycle with a
  two-phase leg swing and a counter-swinging arm, turning at the ends.
- Double-tap or double-click reseeds: new block layout, new bridge,
  new ribbons, new figure ledge. Never click-to-reload. No hint text,
  per the watch-only spec.
- House rules: canvas size from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas pinned in px inside
  draw(); phone detection via window.screen (min dimension < 700px)
  with aspect fallback; square composition letterboxed on the cream
  page ground at every size.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical, re-verified after the fix pass; second render deleted.
  Frame one is the synchronous draw at constant PHASE0 = 4.2 s; the
  rAF loop (typeof-guarded, absent in the QA renderer) is anchored as
  PHASE0 + elapsed since the first frame callback, so no clock value
  ever feeds frame one.
- First pass fix: layer heights were too low (back 0.40-0.60), leaving
  the top half of the square empty and the bridge diagonal occluded
  behind the front layer and a ribbon. Heights raised (back
  0.52-0.74, mid 0.36-0.58, front 0.18-0.34), the bridge lengthened
  (run 0.20-0.30), thickened, given a cream under-stroke, and drawn
  above all block layers. Re-rendered all three sizes afterwards.
- Final renders read back: stacked fauvist blocks with cream mortar,
  two clear round-arch doorways, pattern fills inside exactly four
  blocks, one black 45-degree bridge diagonal at center, two rainbow
  ribbons crossing the full canvas, exactly one tiny black figure
  mid-stride on the striped violet front block, no faces anywhere,
  nothing clipped on mobile.

## Deviations

- The bridge is drawn above all three block layers rather than
  strictly inside the mid layer's paint order. It is still seeded
  from, positioned on, and drifts with a mid-layer block top; drawing
  it on top is the only way the single required diagonal stays
  legible as the layers parallax past each other. Recorded here per
  the house rule on deviations.
- No other deviations. Palette, block count, arch shape, ribbon
  rules, one-figure rule, and motion spec are as prompted.
