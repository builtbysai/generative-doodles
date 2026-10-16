# №71 · Missing Pixels - process notes

## Concept
After gabi_mitterer's GEMINING. A field of horizontal grey stripe bands in nine stepped flat greys. Six dark apertures punch through the field as missing pixels, the zero points of the composition. No smooth gradients anywhere: her interpolated gradients translate as stepped bands.

## Construction
- Single self-contained page, canvas 2D, no libraries. Fourteen horizontal bands, each a flat grey from a nine step ramp from near black to light grey, ordered down and back.
- Apertures are filled superellipse blobs with seeded lobes, hard edges, flat near black. Each breathes on its own seeded phase and drifts slowly along its band, crossing band boundaries once per 20 second loop; all periods divide 20s so the loop closes.
- Motion loop with touch and drag interaction, never click-to-reload. Drag opens a new aperture at the touch point, which persists about six seconds after release and then closes; dragging a live aperture moves it.
- Full-bleed on phones, square on desktop on the matching paper ground; Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `71/index.html`, `71/thumb.png` (720x720, rendered from the live script), `71/process.md`. Gallery entry added to pieces.json with the formula date.
