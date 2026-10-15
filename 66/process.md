# №66 · Folding Mutation - process notes

## Concept
One closed polyline grows by node insertion, spring tension and non-neighbour repulsion, with a curl drift, so it folds into itself instead of spreading. One re-ink point partway round the loop shifts the ink from black to deep teal for the rest of the run.

## Construction
- Single self-contained page, canvas 2D, no libraries. Differential growth core shared across the batch: closed polyline of nodes, neighbour springs toward a target spacing, repulsion from non neighbours within a radius via a spatial bucket grid, curl field drift, and growth by inserting nodes at random edges up to a capped count.
- Motion loop with touch and drag interaction, never click-to-reload. Drag disturbs the growth: the finger acts as a local repellor and the nodes bend away, then settle and resume growing. The loop grows to full density, holds, fades and reseeds as a new mutation.
- Full-bleed on phones, square on desktop; Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. First QA pass caught a weak growth core (rings stayed smooth); the spring and insertion model was rebuilt and the batch re-rendered. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `66/index.html`, `66/thumb.png` (720x720, rendered from the live script), `66/process.md`. Gallery entry added to pieces.json with the formula date.
