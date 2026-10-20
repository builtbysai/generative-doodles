# No.352 Colorway Machine

## Concept

After Emi Bee's coordinate-family machine (the Wildflower Goose
post is the spec: one design, many grounds and colourways). One
hero motif, a simple twisty floral sprig, is rendered twelve
times in a 4 x 3 grid. Each cell is a different colourway: its
own ground plus a 3-colour palette. The machine is the grid
itself; dragging sideways scrubs new colourway arrangements
through it, the way her shop re-issues one design across
grounds and palettes.

## Construction

- Exactly 12 cells in a 4 x 3 grid, asserted in code, full-bleed
  cover-fit over the 1280x900 design space, 8px gutters showing
  the page ground (#0D0B08).
- Exactly 6 curated palettes, held as data. Each palette is one
  of the four specced grounds (#0D0B08, #14121E, #0D0F0C, paper
  #F4EFE3) plus exactly 3 colours (stem, petal, accent), all
  drawn from Emi Bee's own palette vocabulary: moss, bone,
  ember, slate, dusty rose, moon gold, teal, cream, star yellow,
  yarn tan, deep green, blood red. Never random RGB. Assertions
  check the palette count, the 3-colour shape, and that every
  ground comes from the specced four.
- The sprig is parametric path data (stem bezier, tendril arc,
  three leaves, two bud stems with buds, six-petal rosette with
  an accent heart) and is redrawn directly in every cell in that
  cell's palette. The prompt's offscreen-canvas tint pass is not
  used; the house one-canvas rule replaces it, so there is
  exactly one canvas, no offscreen element, no shadowBlur, no
  filters, no gradients. Flat colour only.
- Colourway arrangements are a fixed authored table of 6
  arrangements of 12 palette indices. Constraints asserted at
  load: every palette appears at least once in each arrangement,
  and the paper palette (index 3) appears exactly once per
  arrangement, the spec's single paper cell.
- Breathing: each cell scales at 1 + 0.035 * sin of the master
  cycle plus its own fixed phase (12 phases held as data). The
  master loop is 24 seconds; every cell completes whole sine
  cycles inside it, so frame 24s is pixel-identical to frame 0.
- Drag: horizontal pointer movement scrubs a float position
  through the arrangement table (one arrangement per 160 design
  px, pointer coords converted through the stored cover
  transform S, OX, OY). While scrubbing, cell colours blend in
  RGB between the two neighbouring authored arrangements. On
  release the position eases onto the nearest arrangement and
  snaps exactly, so at rest every colour on screen is a curated
  palette colour and the breathing seam is never disturbed.
  Drag changes colourway state only; nothing reloads.
- Determinism: the first frame is drawn synchronously at the
  constant phase T = 7.4 seconds into the loop, a full authored
  arrangement already breathing. The animation advances from
  that anchor in fixed 1/60 ticks (accumulator, capped), never
  Date.now() minus an offset. rAF is typeof-guarded.
- House rules: Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned every frame via
  style width/height in px; phone detection via window.screen
  min dimension under 700px with aspect fallback (h > w*1.15);
  fixed seeds throughout (no Math.random anywhere); no text,
  no labels, no UI chrome.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png) and 720x720 (thumb.png), and inspected
  all three.
- Desktop: the full 4 x 3 grid reads at once; all six palettes
  present in arrangement 0; exactly one paper cell (bottom row,
  third from left, deep green stem and blood-red petals on
  paper). The sprig reads as one design in every cell: twisty
  stem, tendril curl, three leaves, two buds, six-petal bloom.
- Thumb (720x720 cover crop): centre columns of the grid, paper
  cell visible lower centre; the repeated-sprig-in-colourways
  idea reads at gallery size.
- Mobile (390x844): full-bleed centre crop, sprigs large and
  legible across two columns, paper cell in frame, gutters
  consistent to the edges, no letterboxing.
- Determinism: thumb.png rendered twice, byte-identical (same
  md5 a5922ae0...); qa-desktop.png also re-rendered and
  byte-identical. The first frame is a developed, mid-breath
  arrangement, not a blank or starting state.
- Palette audit: the only colours the script can produce at
  rest are the 6 palette grounds and their 18 palette colours,
  plus the #0D0B08 gutter ground; blends occur only transiently
  between two curated palettes during a drag scrub.
- Scans: no em dashes, no absolute URLs, no Math.random, no
  createElement, no shadowBlur, no gradient calls in the file.
- Deviations: none from the spec or its adaptation flag.
