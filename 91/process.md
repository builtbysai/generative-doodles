# №91 · Rotorelief Loop - process notes

## Concept
After maxdrekker's Rotorelief study, building on the Optics construction. A rigid plate of forty eight tapered black bars around a white centre on bright orange, turning at a constant rate, one revolution per twenty four seconds, so the eye catches apparent reversals in the taper.

## Construction
- Single self-contained page, no libraries. 2D canvas. Exactly 48 bars (asserted), taper per bar fixed to the plate as 1 minus 0.45 times (0.5 plus 0.5 cos of angle minus taper direction); bars occupy the ring from 30 percent to 92 percent of frame radius; white centre diameter 22 percent of frame. Palette only: orange #FF5A1F, black #0D0D0D, white #FFFFFF. Drag spins the plate directly and the throw eases back to the automatic rotation on release.
- Motion and interaction per the prompt, never click-to-reload. Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `91/index.html`, `91/thumb.png` (720x720, rendered from the live script), `91/process.md`. Gallery entry added to pieces.json with the formula date.
