# №1671 "Art from Code" (JV8), process

EXPANSION #219 jos-vromans, completing the study. Built from
BATCH-1668-1672-SPEC.md, section №1671 JV8, following the house rules
at the top of that spec. Template: live №1667 (Golden Eye).

## What the piece does

The piece opens on a black screen showing its own real algorithm as a
legible white monospace code listing: `rosette`, `petal`, `mirror`,
and the tiling loops, plus a `border(star, 24)` call. After an 8
second hold, the listing dissolves character by character in reading
order over 78 seconds. Each cell is replaced by the motif its code
line describes: rosette lines become 8-petal rosettes, mirror lines
become reflected rosettes, petal lines become 2-petal pairs, loop
lines become 4-petal rosettes, the border line becomes 4-point star
spikes, and blank cells fill in as 6-petal rosettes, so the field
completes edge to edge. Motifs tile in mirror symmetry: odd columns
are reflected across the vertical axis. The finished pattern holds
for 20 seconds with a spiky star border on all four edges, then fades
back to the code listing over 8 seconds and the 114 second loop
repeats. White on pure black only, no other color at any stage.
Watch only, no interaction, no click-to-reload.

## How it is built

- The listing ships as a `CODE` string constant, one entry per line
  with a kind tag (`rosette`, `petal`, `mirror`, `loop`, `border`,
  `code`, `blank`). The live `rosette()`, `petal()`, `mirror()`, and
  `starSpike()` functions are the same algorithm the listing
  describes, so the code on screen is the code that runs.
- One character grid spans the whole frame. Cell size comes from the
  measured monospace char width, so the grid and the listing are the
  same thing. Dissolve order is listing cells in reading order first,
  then blank cells in reading order.
- Deterministic fixed-phase first frame: `FIRST_T = 0` shows the full
  listing. All variation comes from a seeded `mulberry32(1671)`
  jitter table. No `Date.now()` or `Math.random()` anywhere.
- House rules: Visual Viewport sizing with resize listened to on
  `visualViewport` and `window`; canvas pinned in `draw()` via
  `canvas.style.width/height`; phone detection via `window.screen`
  with the aspect fallback; one synchronous frame at load;
  `requestAnimationFrame` guarded by a `typeof` check;
  `prefers-reduced-motion` shows the static listing.
- Title/date/hint plates drawn on canvas, white on black:
  "Art from Code", "2006 · 08 · 09", "Watch only."

## Deviations from the prompt

None in behavior. Two small presentation choices: the listing is
centered in the frame rather than starting at the top-left corner,
so it reads as a terminal page and stays clear of the title plate;
and the dissolve fills blank cells after the listing cells, so the
rosette field reaches the frame edges instead of stopping at the
listing block. Both follow the spec's own composition note that the
rosette field inherits the code frame, tiled edge to edge.

## QA

Rendered with `node ~/workspace/tools/render-piece.js` from the
actual script and visually inspected:

- Desktop 1280x900 at t=0: full 22-line listing, white monospace on
  pure black, every line legible, plates clear of the text. Pass.
- Mobile 390x844 at t=0: listing centered and legible at 13px
  monospace, plates clear. Pass.
- Thumb 720x720 at t=0 (this file): first gate caught the title
  plate overlapping the first line, `// art from code`. Fixed by
  clamping the listing origin below the plate and above the hint
  plate, then re-gated all three sizes. The listing is now fully
  clear of both plates. Pass.
- Desktop 1280x900 at t=50 (mid-dissolve, temp copy): dissolve front
  visible sweeping through the listing in reading order, converted
  cells showing rosettes, circles, and crosses by line kind, a
  fading front of growing motifs. Pass.
- Desktop 1280x900 at t=100 (pattern hold, temp copy, re-gated
  after the plate fix): full white rosette field edge to edge with
  the spiky star border on all four sides and the structural
  variety from the line kinds still visible. Pass.

## Files

- `index.html`, md5 b76e5b913639523d4cfc27c58ecbc4bc
- `thumb.png`, md5 1d16c1448e829297954a59c26654a8ad (720x720 render)
- `process.md`, this file

Not pushed; parent pushes.
