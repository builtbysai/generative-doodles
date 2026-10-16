# №94 · Dot Tide - process notes

## Concept
After cristiania's dot wave study. A dense grid of flat indigo dots on warm white, each pulsing in a traveling wave that rolls diagonally corner to corner, swelling to three times rest size at the crest and shrinking to pinpoints in the trough.

## Construction
- Single self-contained page, no libraries. 2D canvas. Grid 28 by 48 (1344 dots, asserted), rest dot radius one fifth of cell size, dots as filled circles with no stroke. Seamless 8 second loop; radius follows a diagonal traveling sine with a pinpoint trough. Palette only: ground #F5EFE0, dots #2B3A8F. Dragging raises a second wave source at the fingertip and the two waves interfere while pressed.
- Motion and interaction per the prompt, never click-to-reload. Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `94/index.html`, `94/thumb.png` (720x720, rendered from the live script), `94/process.md`. Gallery entry added to pieces.json with the formula date.
