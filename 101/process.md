# №107 · Tessellate - process notes

## Concept
From Bug's ig-artist-study batch 0, prompt 27, made.up.lifeforms section, after mulf. A step back to simplicity: a seamless loop of voronoi tessellation, cells drifting slowly as their seed points wander. Cells stroked thin in bone on deep water green, a few cells filled with rust when they grow large. A movement study, light and calm between the heavier biome pieces.

## Construction
- Single self-contained page, no libraries. 2D canvas, CPU voronoi: each cell polygon is the frame rectangle clipped by the bisector half-planes of all other seeds, so strokes are true 1px vector edges and cell areas are exact.
- Exactly 40 seed points (asserted), wandering on small Lissajous paths with integer cycle counts on a 14 second loop, so the loop closes seamlessly. Cells fill the frame edge to edge.
- Fill rule: only cells above the 80th percentile of area are filled, in rust; all others stay unfilled. Palette only: deep water #0E2A24, bone #D8CBB2, rust #8A4A2E.
- Drag: the fingertip becomes a 41st seed point while pressed, pushing cells aside; release removes it. Never click-to-reload.
- Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback; field full-bleed on phones and desktop. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before shipping. Hans's real-device check is the final gate.
- Distinctness check against shipped No.46 Voronoi Drift: this piece reads as thin bone strokes on deep water green with only the largest cells rust-filled, a flat movement study, not a coloured cell field.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `107/index.html`, `107/thumb.png` (720x720, rendered from the live script), `107/process.md`. Gallery entry prepared for pieces.json with the formula date.
