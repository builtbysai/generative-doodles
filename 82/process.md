# №86 · Ten Print Field - process notes

## Concept
After laurent.malys's 10print study. The classic one-line maze: a grid of diagonal strokes forming a labyrinth that redraws itself in a slow diagonal sweep, one full rewrite per 45s.

## Construction
- Single self-contained page, no libraries. 2D canvas. Grid 24 columns (24 rows on desktop square, more rows full-bleed on phones), seeded PRNG Ten Print Field recorded in the script. Cell values flip as the sweep passes. Drag draws a temporary clear path (horizontal connectors near the finger) that heals after about 2.5s. Palette only: black #111111, white #FFFFFF, stroke weight cell/6, round caps.
- Motion and interaction per the prompt (static posters 89 and 90 use drag-only spin, recorded in BATCH-86-90-SPEC), never click-to-reload. Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `86/index.html`, `86/thumb.png` (720x720, rendered from the live script), `86/process.md`. Gallery entry added to pieces.json with the formula date.
