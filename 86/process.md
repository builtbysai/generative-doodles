# №90 · Crater Study - process notes

## Concept
After maxdrekker's Crater poster. A static square poster: vivid blue ground, concentric rings of alternating black and white bars radiating from a solid black core, reading as a deep crater.

## Construction
- Single self-contained page, no libraries. 2D canvas, static poster per the artist's practice, with drag-only spin as the interaction (no automatic motion). Exactly 6 rings by 36 bars (216, asserted); black core 12 percent of frame; white bars upper, black bars lower, half-width transitional bars at the sides. Palette only: blue #1B4FE0, black #0D0D0D, white #FFFFFF.
- Motion and interaction per the prompt (static posters 89 and 90 use drag-only spin, recorded in BATCH-86-90-SPEC), never click-to-reload. Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `90/index.html`, `90/thumb.png` (720x720, rendered from the live script), `90/process.md`. Gallery entry added to pieces.json with the formula date.
