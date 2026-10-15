# №68 · Six Dishes - process notes

## Concept
Six rectangular dishes each hold one differential growth instance at a different density and curl strength, from sparse to nearly solid, each in exactly one ink from a flat set of three.

## Construction
- Single self-contained page, canvas 2D, no libraries. Differential growth core shared across the batch: closed polyline of nodes, neighbour springs toward a target spacing, repulsion from non neighbours within a radius via a spatial bucket grid, curl field drift, and growth by inserting nodes at random edges up to a capped count.
- Motion loop with touch and drag interaction, never click-to-reload. Dishes take turns growing on a round robin while the rest hold their mature state. Drag on a dish wakes it at once.
- Full-bleed on phones, square on desktop; Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. First QA pass caught a weak growth core (rings stayed smooth); the spring and insertion model was rebuilt and the batch re-rendered. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `68/index.html`, `68/thumb.png` (720x720, rendered from the live script), `68/process.md`. Gallery entry added to pieces.json with the formula date.
