# №92 · Flourish Field - process notes

## Concept
After maxdrekker's Flourish poster. A loose burst of sixty four tapered black bars radiating from an off-centre white disc on teal, bar lengths shaped by seeded smoothed noise so the burst reads as a flourish of ink. A single coral bar at the golden angle position is the only accent.

## Construction
- Single self-contained page, no libraries. 2D canvas, static poster with drag-only spin around the disc centre. Exactly 64 bars (asserted); white disc at 38 percent from left and 44 percent from top; lengths seeded at 40 to 100 percent of max from the seeded PRNG Flourish Field, smoothed over angle. Palette only: teal #0E7C7B, black #0D0D0D, white #FFFFFF, coral #FF6B4A for one bar only. Static decision follows the No.89 and 90 precedent: no automatic motion, drag-only spin.
- Motion and interaction per the prompt, never click-to-reload. Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `92/index.html`, `92/thumb.png` (720x720, rendered from the live script), `92/process.md`. Gallery entry added to pieces.json with the formula date.
