# №88 · Sphere Tiling - process notes

## Concept
After laurent.malys's polyhedron and spherical tiling work. A slowly rotating wireframe sphere tiled by latitude and longitude lines plus an icosahedron's edges, projected orthographically.

## Construction
- Single self-contained page, no libraries. 2D canvas. Graticule every 15 degrees asserted, plus computed icosahedron edges. One full turn per 60s at constant speed; back lines at 30 percent alpha. Drag rotates the sphere on both axes (trackball); release keeps the automatic rotation. Palette only: black #111111, white #FFFFFF, 1px strokes.
- Motion and interaction per the prompt (static posters 89 and 90 use drag-only spin, recorded in BATCH-86-90-SPEC), never click-to-reload. Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `88/index.html`, `88/thumb.png` (720x720, rendered from the live script), `88/process.md`. Gallery entry added to pieces.json with the formula date.
