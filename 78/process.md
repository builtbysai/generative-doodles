# №78 · Quadrant Weave - process notes

## Concept
After stevefortier_art's Quadrant Curves series. An 8x8 grid of quadrant-arc Truchet tiles on flat colour fields (64 tiles, asserted by construction), arcs connecting into long interlocking curves across the whole grid.

## Construction
- Single self-contained page, canvas 2D, no libraries. Shared batch palette only: ground #F3EDE1, ink #141414, cobalt #1F4ED8, emerald #2E9E5B, vermilion #E03A1F, ochre #D9A02B. Flat hard-edge work throughout, no gradients, no alpha blending, no texture, no numerals.
- An 18 second loop sends a wave of 90 degree tile rotations diagonally across the grid and back, so the weave rewrites itself and returns exactly. Tapping or dragging a tile turns that tile 90 degrees. No gaps between tiles, no gradients, no alpha, arc stroke about 6 percent of cell size scaled up slightly for legibility.
- Motion loop with touch and drag interaction, never click-to-reload. Full-bleed on phones and a centred square composition on desktop per the spec; Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `78/index.html`, `78/thumb.png` (720x720, rendered from the live script), `78/process.md`. Gallery entry added to pieces.json with the formula date.
