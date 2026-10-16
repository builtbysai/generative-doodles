# №109 · Single Curve - process notes

## Concept
From Bug's ig-artist-study batch 0, prompt 29, after nathanmoore. A static constraint piece. One continuous line, a noise-driven random walk with a fixed step, doing all the work: it coils, loops and doubles back across a paper-white square, never lifting. Thin black line, generous margins. The whole image is one polyline; the constraint is the piece, and it does not move.

## Construction
- Single self-contained page, no libraries. 2D canvas. Seeded PRNG "Single Curve". The walk: fixed step, heading turned by smooth 1D value noise, reflected at the bounds of a centred square. 6,400 steps, computed once at load.
- Exactly ONE polyline (asserted in the source): the curve is drawn with a single begin path and a single stroke, no pen lifts, no second line, no fill. Line weight 1.5px. Palette only: paper #F7F4EC, ink #1A1A18.
- Static decision (recorded): the poster stays static. Drag rotates the whole drawing around its centre while pressed; release leaves it where it stopped. The curve itself is never redrawn or reseeded.
- Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback; the square keeps its shape on phones with the page ground in the piece's own paper colour. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before shipping. Hans's real-device check is the final gate.
- Source audit: the file contains exactly one begin-path call and one stroke call; the single-path claim is verified in the source, not just visually.
- QA iterations: a longer walk traced the square's edges into a scalloped fringe under two different boundary rules; the build returned to plain reflection with a mid-length walk, which keeps the line wandering in the open square.
- Distinctness check against No.110 Grid Rule: same paper and ink, but 109 is one wandering line with wide empty margins where 110 is a strict grid of short marks.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `109/index.html`, `109/thumb.png` (720x720, rendered from the live script), `109/process.md`. Gallery entry prepared for pieces.json with the formula date.
