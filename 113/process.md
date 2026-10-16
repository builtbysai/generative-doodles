# №113 · Cellfield - process notes

## Concept
After Continuum, Lammetje's Art Blocks piece. A polar grid of 9 rings divided into 48 sectors forms a luminous mosaic disc. Each cell's colour is mixed from two overlapping radial fields, one warm (ember through gold) and one cool (deep blue through cyan), whose centres orbit each other on a 75 second period, so the colours churn like weather over a grid that never moves. Hairline gaps separate the cells and a fine film grain sits over everything.

## Construction
- Single self-contained page, no libraries. 2D canvas. Exactly 432 cells (9 by 48, asserted), geometry precomputed per size; ring radii follow an r to the 0.8 curve, disc radius 42 percent of the smaller frame dimension, centred. Each cell is filled per frame: warm and cool intensities fall off with distance to their centres, each field colour lerps along its own gradient, and the two mix by relative strength.
- Grain: 1600 random 1px rects per frame in white at alpha 0.05, drawn as one batched path (no pre-rendered tile, no glow filters).
- Palette only: warm #E4572E to #F2A03D, cool #1B3A6B to #3FA7D6, ground #101014. Drag pulls the warm field centre toward the fingertip; on release the offset decays and the centre rejoins its orbit. Never click-to-reload.
- Motion and interaction per the prompt. Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px every frame; phone detection via window.screen with aspect fallback; the centred disc keeps its shape on phones and the page ground is the piece ground colour. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. All three show the mosaic disc with hairline gaps, warm and cool halves blended through the middle, grain visible on the ground. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `113/index.html`, `113/thumb.png` (720x720, rendered from the live script), `113/process.md`. Gallery entry for pieces.json: title "Cellfield", date 2002 · 05 · 04, note "A polar mosaic of nine rings and forty eight sectors, coloured by two slow-orbiting fields, one warm and one cool. Drag to pull the warm field."
