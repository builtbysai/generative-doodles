# №1172 — Radio Buttons

Jon Satrom study block JS5 (PP331), after the radio-button GIF vocabulary of
the Prepared Laptop performances: the operating system's smallest widgets,
taken off duty and drilled like a demoscene.

## The grid

A full-screen grid of chunky old-OS interface glyphs at ~28px in 40px cells
(36px on phones): radio buttons, checkboxes, scrollbar segments, resize
handles, close boxes. Glyph type is assigned per cell from a seeded
mulberry32 table; the unselected stroke tone comes from a 4×4 Bayer matrix,
so the paper-white glyphs carry a 1-bit dither instead of a flat fill.
Selected glyphs flip to flat cyan #00FFC2. Every glyph is a vector path —
no emoji, no images.

## The four patterns (24s loop, fixed order, 6s each)

Every cell's state is a pure function of (column, row, pattern, pattern-time):

- **SWEEP** — a diagonal wavefront crosses the grid twice (3s cycle).
  Cells behind the front are selected; cells within a narrow band of the
  front sit on a translucent #FFE14D glow. The cycle is phase-offset so the
  first frame (pt = 3.2s) catches the front mid-grid.
- **FUGUE** — checkerboard strobing: cells toggle on (col + row + tick)
  parity, the tick flipping every 0.75s, with each row delayed 0.1875s so
  the fugue enters in canon down the grid. Rhythmic, never chaotic.
- **CANON** — each column runs a triangle-wave phase delayed 0.12s per
  column; scrollbar thumbs ride the phase, and radios/checkboxes select as
  their column's thumb head passes their row.
- **SELECT_ALL** — at pt = 1s the whole grid selects at once with a 0.1s
  two-step shudder (±2px), holds under a slow breathing glow, and deselects
  with the same shudder at pt = 4s.

A status strip along the bottom names the current pattern in monospace
("PATTERN: SWEEP"), with a 1/4 position readout and a progress segment for
the pattern phase.

## Interaction

Watch-only, except: drag horizontally to scrub the 24s timeline — the
animation freezes on the scrubbed time while dragging, and on release the
clock re-anchors and resumes from exactly that position. Never
click-to-reload. Silent by design.

## House rules

Canvas sized from the Visual Viewport API with resize listeners on both
`visualViewport` and `window`; CSS size pinned in `draw()`. Phone detection
via `window.screen` (min dimension < 700px) with the aspect-ratio fallback.
First frame drawn synchronously at the fixed phase T0 = 3.2s; the rAF loop
is `typeof`-guarded and anchored as phase + elapsed. No gradients, no
`ctx.filter`, no shadowBlur, no `createElement`, no ImageData or offscreen
canvas, no microphone. The only visible text is the status strip.

## QA

Rendered at 1280×800 (qa-desktop.png), 390×844 (qa-mobile.png) and 720×720
(thumb.png). The thumb was rendered twice and compared with `cmp`:
byte-identical. Frame one shows the SWEEP front mid-grid — cyan selected
glyphs behind it, the yellow glow band on the front, unselected dithered
glyphs ahead of it, and the status strip reading PATTERN: SWEEP.
