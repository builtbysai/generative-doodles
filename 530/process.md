# No.530 The Bewitched Witch

EXPANSION #64 naida-mazzenga, prompt NM2 ("Witch on the Mushroom", 'La Bruixa Embruixada').

## Concept

A kind folk witch sits side-saddle on a giant red-capped mushroom in a flat
night forest, ringed by her four hand-sized friends: a bird perched on the
cap rim, a rabbit, a hedgehog and a fox on the ground. Her hollow-pumpkin
house glows at the mushroom's base, fireflies drift in the top third, and a
field-guide catalog strip of six different mushrooms runs across the bottom
eighth. Watch-only seamless loop, no interaction, no hint text.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets.
- Palette exactly as specced, flat fills only: mushroom red #C0392B, cream
  #F5E9C8, forest green #2E6B34, night blue #1F3A5F, firefly yellow #FFD400,
  hat black #1A1A1A. No gradients anywhere; the pumpkin window glow and the
  firefly halos are layered flat translucent circles.
- Giant mushroom: stem as a bezier shape in cream with a skirt ring; cap as
  a bezier dome filled red with seven cream spots clipped to the cap path.
- Witch: folk shapes only, no rendered face (plain cream head circle).
  Green bell dress, cream collar, black arm line, side-saddle legs in black
  dangling over the cap's front slope with boot ellipses. The hat is a black
  cone path whose tip control points sway on a slow sine; wide brim ellipse.
- Friends are minimal glyphs at hand scale, each bobbing on its own seeded
  phase: bird (cream body, red wing, yellow beak) perched on the cap rim;
  rabbit (cream, long ears); hedgehog (black spiked dome, cream face); fox
  (red, cream muzzle and tail tip).
- Pumpkin house bottom-right at the stem base: layered red ellipses with
  ink rib strokes, green stem, black arch door, round window whose glow
  layers pulse on a 0.9 rad/s sine (glow and dim loop).
- Forest: a seeded far pine row at 45% alpha along the horizon, a green
  ground hill, and full-alpha near pines framing both edges.
- Catalog strip: cream band across the bottom eighth, six equal cells with
  dividers, one mushroom variant per cell (red spotted, tall navy, wide
  green, red with skirt ring, cream with red spots, tall green spotted),
  drawn by one parametric glyph function.
- Fireflies: 44 seeded dots confined to the top third, drifting on paired
  sine paths with pulsing alpha; about a third carry a faint halo circle.
- Grain: 700 precomputed seeded specks drawn directly each frame (the QA
  renderer has no offscreen canvas, so no pre-rendered grain layer).
- House rules: Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas CSS size pinned in px inside draw();
  phone detection via window.screen (min dimension < 700px) with the
  h > w*1.15 aspect fallback; square stage letterboxed on the night-blue
  page ground so the composition keeps its shape on phones.
- Determinism: first frame drawn synchronously at the constant loop phase
  PHASE0 = 2.2; the rAF loop is typeof-guarded and anchored as
  PHASE0 + elapsed; no Date.now anywhere; mulberry32 fixed seed 530064.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png) and 720x720 (thumb.png).
- thumb.png rendered twice and cmp byte-compared: identical, re-verified
  after the fix below; the second render was deleted.
- First pass defect: in the catalog strip the cream stems (and the cream
  cap of variant 5) were invisible against the cream strip ground, so the
  six entries read as floating caps and dots. Fixed by stroking each mini
  mushroom's stem and cap with a thin field-guide ink outline
  (rgba(26,26,26,0.55)); all three sizes re-rendered and read back.
- Read-back after fix: witch reads kind and faceless with the bent hat tip
  mid-sway; bird on the cap rim; rabbit, hedgehog and fox legible at glyph
  scale; pumpkin window glowing with red cross mullions; fireflies across
  the top third; six distinct catalog mushrooms with visible stems. Mobile
  render keeps the whole square in frame on the night-blue ground, nothing
  clipped.
- Grep checks: zero gradient calls, zero URLs, zero Date.now, zero
  createElement in index.html.

## Deviations

- Catalog strip: the prompt does not name a strip ground; a cream paper
  band was chosen to read as a field-guide plate, which required the thin
  ink outline on the mini mushrooms (recorded above) so cream parts stay
  visible. The six variants otherwise follow the prompt's catalog idea.
- The bird friend perches on the cap rim rather than floating in the ring;
  it keeps all four friends in one loose ring around the witch at middle
  ground, as specced.
- Grain is a precomputed seeded speck array drawn directly each frame
  instead of a pre-rendered grain canvas, per the renderer's limits; the
  static texture read is the same.
