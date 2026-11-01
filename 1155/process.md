# №1155 — Vernacular Triptych

Antonio Roberts study block AR4 (What is your glitch?, 2011 — his
PCX/PPM/PIX vernacular, after Menkman's Vernacular of File Formats).

## The piece

Three portrait panels side by side show the same procedural source —
diagonal bars cycling magenta/cyan/yellow behind concentric rings, flat
palette on near-black — rendered through three neglected-format
pipelines. A flat color strip at the top of each panel (magenta, cyan,
yellow) is the only identification; no text labels anywhere. One seeded
error rectangle, at the same normalized position in all three panels,
is injected into each pipeline, and each shows it differently:

- Left, PCX-like: coarse 3 px cells with every channel snapped to a
  multiple of 85 (256-color-style clamping — magenta goes salmon, cyan
  deepens, yellow turns orange, near-black crushes to black). Rows are
  then merged RLE-style: any run at or below a length threshold is
  absorbed into the previous run, which stretches over it. Inside the
  error rectangle the threshold rises sharply with depth and surviving
  runs stretch further, stealing cells from the next run — visible as
  horizontal smear tails on the rings inside the rectangle.
- Center, PPM-like: fine 2 px cells, exact palette colors, planar and
  crisp — except that cells inside the error rectangle sample from a
  displaced source row. The displacement is a per-row seeded value,
  its scope scaled by depth and clamped to the region, so the
  rectangle's scanlines arrive shuffled while everything outside
  stays in order.
- Right, PIX-like: the source's structure is sampled at full rate (a
  cell lights only where the source lights), but its color is read
  from coarse chroma blocks — the red channel from the block a stride
  to the right, green from the cell's own block, blue from a stride
  to the left. Edges stay put while color blocks and fringes. Depth
  grows the block size and the stride; inside the error rectangle
  both grow further, and the ring breaks into green/purple/white
  channel-split fragments.

There is no offscreen canvas, no ImageData, and no real format encoder
in the piece: the source is a pure function of panel coordinates and
every pipeline is arithmetic over samples of it. Mechanically distinct
from №1147 (Menkman's RM4, same title): different source (bars and
rings vs. stacked motif), different pipelines (RLE/clamp, scanline
shuffle, channel strides vs. block-mean, posterize, Bayer dither), and
the drag scrubs corruption depth rather than moving an error band.

## Motion and interaction

- Idle: corruption depth drifts as 0.5 + 0.35·sin on a 20 s loop
  (range 0.15–0.85).
- Drag horizontally: once the press becomes a drag, depth is the
  pointer's position across the triptych, 0 at the left edge, 1 at
  the right. On release the idle drift resumes from that exact depth
  — the anchor phase is re-solved from the released value, so there
  is never a jump.
- Double-tap: reseeds the source geometry (ring center, bar angle and
  frequency, color rotation) and the error rectangle.
- Never click-to-reload. Silent by design.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on
  both visualViewport and window; canvas CSS size pinned in fit(),
  which runs on every draw.
- Phone detection via window.screen physical size (min dimension
  < 700 px), aspect fallback (h > w * 1.15); the 3:4 triptych goes
  near full-bleed on phones, centered with the page ground #111111
  elsewhere.
- Determinism: seeded mulberry32 and an integer hash only, no
  Math.random; frame one is drawn synchronously at the fixed phase
  t = 0, where the idle anchor puts the depth at 0.55 — left panel
  run-smeared inside the error rectangle, center rows shuffled there,
  right chroma blocked and fringed there, chips on top.
  requestAnimationFrame is guarded by a typeof check and anchored to
  that fixed phase. The QA thumb re-rendered byte-identical.
- Palette closed to the brief: ground #111111, working colors #FF2D78,
  #00D0FF, #FFC400, #101010, 2 px black gutters; other tones appear
  only where a pipeline itself produces them (the PCX clamp, PIX
  channel recombinations). No gradients, filters, shadow blur,
  offscreen canvas, or audio.
