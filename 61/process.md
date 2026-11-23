# №62 · Pinwheel Field - process notes

## Concept
A rigid kaleidoscope grid after ovecarlson: every cell holds an 8-triangle pinwheel diamond whose flat colors come from its row palette family, and neighbours counter-rotate so the field shimmers.

## Construction
- Single self-contained page, canvas 2D, no libraries. Grid is 7x7 on desktop and 6x6 on phones, zero gutters; each cell draws 8 triangles from its center to points on a rotating ring, clipped to the cell.
- Row families use the full prompt palettes: blues, greens, oranges, pinks, reds and yellows, four tones each. No outlines, center dots or gradients.
- Pinwheels turn once in about 14s with a per-cell phase offset and alternating direction. Every 20s the row families reshuffle with a 1s color crossfade.
- Drag on a cell spins that pinwheel toward the drag angle; on release it springs back over about a second.
- Square on desktop, full-bleed on phones; Visual Viewport sizing; canvas pinned by style; phone detection via window.screen with aspect fallback.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `62/index.html`, `62/thumb.png` (720x720, rendered from the live script), `62/process.md`. Gallery entry added to pieces.json with the formula date.
