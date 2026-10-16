# №87 · Subdivision Study - process notes

## Concept
After laurent.malys's subdivision animation. A white square splits along its longer axis at a golden-ratio point; children split in turn until the square holds a treemap of thin black cells, then the splits release and the square breathes back.

## Construction
- Single self-contained page, no libraries. 2D canvas. Recursive split tree, depth 5 asserted, seeded ratios around the golden ratio with small jitter. Seamless 40s loop: 20s splitting, 20s releasing, eased and staggered by depth. Press holds the breath (phase frozen); drag biases split positions toward the finger. Palette only: black #111111, white #FFFFFF, 1px strokes, no fills.
- Motion and interaction per the prompt (static posters 89 and 90 use drag-only spin, recorded in BATCH-86-90-SPEC), never click-to-reload. Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `87/index.html`, `87/thumb.png` (720x720, rendered from the live script), `87/process.md`. Gallery entry added to pieces.json with the formula date.
