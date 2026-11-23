# No.357 Prairie Plaid Bloom (betterloveart 5)

## Concept

After Suchita Prakash's "Prairie wildflower plaid" and
her madras plaid entries: a woven plaid ground of uneven
hand-drawn bands in sun-bleached country tones (wheat,
faded denim, clay over cream), with flat wildflowers
overflowing the plaid lines: prairie blooms, coneflowers,
seed heads and grasses, stems crossing the bands, heads
nodding in a slow wind wave. TAP advances the plaid to
the next band-colour arrangement.

## Construction

- Palette, flat only: wheat #E3C878, faded denim
  #7A93A6, clay #B96A4B, cream #F2E8D5, meadow green
  #6B8E5A. Nothing else.
- Plaid is JS data, never an offscreen layer: exactly
  11 vertical and 9 horizontal bands (asserted in code),
  two widths each way (wide and narrow), positions,
  widths and colour slots from fixed tables built from
  one fixed seed at load. Every band edge is a polyline
  sampled every 120 design px with fixed offsets of a
  few px, so the weave reads hand-drawn, never perfect
  vector plaid.
- Overlap darkening is flat stepped colour: bands are
  drawn as flat fills at fixed alpha (wide 0.52, narrow
  0.66), horizontal under vertical, so a crossing reads
  exactly one step darker than a single band over the
  cream ground. No gradients, no shadowBlur, no
  multiply compositing.
- Exactly 4 band-colour arrangements (asserted), each
  mapping the bands' three colour slots to the three
  band inks (wheat, denim, clay) for the vertical and
  horizontal sets separately. TAP advances to the next
  arrangement in the fixed table; never runtime random,
  never a reload. The tap is position independent, so
  no hit-test is needed.
- Florals are parametric sprigs from fixed tables:
  exactly 30 (asserted: 12 rosette blooms, 6
  coneflowers, 6 seed heads, 6 grass clumps), one per
  cell of a 6 x 5 scatter grid, jittered inside the
  cell. Stems are quadratic curves in meadow green with
  a small leaf; heads are parametric petal rosettes, a
  droop-petalled coneflower with a centre dome, a wheat
  seed head with cream ticks and awns, and grass blades.
  Drawn flat and opaque over the weave, so they overflow
  the plaid lines, painter order back to front by base.
- Motion is one 30-second seamless master loop. Sway is
  a single wind wave field: phase set by x position
  (3 whole spatial cycles across the 1280 design width)
  and time (2 whole temporal cycles per loop), so flower
  heads nod in a wave travelling across the field and
  frame 30s is pixel-identical to frame 0.
- Determinism: frame one is drawn synchronously at the
  constant phase T_OFFSET = 9s (plaid woven, florals
  mid-sway); the typeof-guarded rAF loop anchors at that
  offset plus elapsed time since load. Frame one is
  never drawn from Date.now() minus an offset.
- House rules: Visual Viewport sizing with resize
  listeners on visualViewport and window; canvas pinned
  every frame via style width and height in px; phone
  detection via window.screen min dimension under 700px
  with aspect fallback; design space 1280x900, cover-fit
  full-bleed on every screen with page ground in the
  piece's own cream; one canvas, no shadowBlur, no
  filters, no gradients; fixed seeds; no text or UI.

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png). Thumb rendered twice: byte-identical,
  so the shipped thumbnail reproduces exactly from the
  shipped script.
- Desktop: the plaid reads as hand-woven cloth, wavy
  band edges, stepped crossings (single band, then a
  deeper step where two bands cross, deepest where
  wide bands meet); all four floral kinds read at once:
  rosette blooms, seed heads with awns and cream ticks,
  grass clumps, and coneflowers. Stems cross bands all
  over the field, several sprigs overflow the top edge.
- First pass fix, re-rendered and re-inspected: the
  coneflower heads read as small bells (droop petals
  too short, fan hugging the dome); petals lengthened
  and the fan widened so the petals hang well below the
  dome, the coneflower silhouette.
- Mobile: cover-fit crop fills the phone frame with an
  undistorted plaid crop, blooms and grass large; the
  square thumb keeps the full plaid rhythm and every
  floral kind legible at gallery size.
- Palette audit: the file contains exactly the five
  specced hexes and no others.
- Assertions pass at load: 11 vertical and 9 horizontal
  bands, exactly 4 arrangements, exactly 30 sprigs in
  the 12/6/6/6 split.
