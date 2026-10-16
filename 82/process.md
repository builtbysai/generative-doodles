# №82 · Recursive Fold - process notes

## Concept
After marioecg's Roctagonia and Sekai loops. A field tiled by a recursive folding pattern, each fold containing a smaller rotated copy of itself, in smooth tonal bands of indigo, cyan and warm white.

## Construction
- Single self-contained page, no libraries. Canvas 2D software shader for the same QA reason as No.81. Five fold levels (asserted), each level counter-rotating on wrapped sine phases, radius of the folded point driving a cosine palette with a per-level shift. Palette only: indigo #1A1440, cyan #35D0E0, warm white #FFF3E0, shadow #0B0A20. Seamless 16s loop; drag sets the master fold angle directly and release returns to the automatic cycle.
- Motion loop with touch and drag interaction, never click-to-reload. Full-bleed field on phones (square nest centred for No.85 with white ground edge to edge), Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `82/index.html`, `82/thumb.png` (720x720, rendered from the live script), `82/process.md`. Gallery entry added to pieces.json with the formula date.
