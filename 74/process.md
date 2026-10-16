# №74 · Grey as Difference - process notes

## Concept
After gabi_mitterer's account of grey as identity and difference. Three ground panels in different flat greys each hold tiles drawn in one exact same grey. On different grounds the identical tiles read as different shades: simultaneous contrast made literal. The perception does the work.

## Construction
- Single self-contained page, canvas 2D, no libraries. Six flat greys in the palette family; the tile grey is a single constant, never changed, no alpha tricks, so it stays pixel exact.
- Three panels side by side on desktop, stacked on phones, each holding two tiles with generous spacing, no borders and no labels.
- Slow motion loop of 48 seconds: every eight seconds one tile drifts to the neighbouring panel over two seconds, holds, and returns, so its apparent shade changes while it is away. The drift order cycles all six tiles and the loop closes with every tile home.
- Motion loop with touch and drag interaction, never click-to-reload: drag a tile onto any panel and it swaps into the nearest slot, keeping its true grey.
- Full-bleed on both layouts; Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `74/index.html`, `74/thumb.png` (720x720, rendered from the live script), `74/process.md`. Gallery entry added to pieces.json with the formula date.
