# №89 · Optics Engine - process notes

## Concept
After maxdrekker's Optics poster. A static square poster: bright orange ground, white centre circle, and 48 thick black radial bars tapering toward one side so the flat design reads as a spinning tunnel.

## Construction
- Single self-contained page, no libraries. 2D canvas, static poster per the artist's practice, with drag-only spin as the interaction (no automatic motion). Exactly 48 bars asserted; white circle diameter 22 percent of frame; bars occupy the ring from 30 to 92 percent of frame radius with the taper formula from the prompt. Palette only: orange #FF5A1F, black #0D0D0D, white #FFFFFF.
- Motion and interaction per the prompt (static posters 89 and 90 use drag-only spin, recorded in BATCH-86-90-SPEC), never click-to-reload. Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `89/index.html`, `89/thumb.png` (720x720, rendered from the live script), `89/process.md`. Gallery entry added to pieces.json with the formula date.
