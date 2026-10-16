# №73 · Ringcube - process notes

## Concept
After gabi_mitterer's RINGCUBE / CUBE_6. An open cube suggested only by its twelve edge segments and eight vertex rings, floating on near black. Three flat grey values only: mid grey edges, light grey rings, paper clip dots.

## Construction
- Single self-contained page, canvas 2D, no libraries, no 3D library. Cube vertices live in 3D and are orthographically projected each frame: no perspective, no shading, no solid faces. The edge list is built by pairing vertices that differ in one coordinate, which gives exactly 12 edges and 8 rings.
- Each edge is drawn as a centered dash covering the middle 60 percent, leaving gaps at the rings. One edge at a time detaches a few percent along its normal and reattaches, on a seeded schedule inside the 24 second loop.
- The tumble rotates about two axes at integer ratio speeds over 24s so the loop closes exactly. Motion loop with touch and drag interaction, never click-to-reload: drag rotates the cube directly and the extra rotation eases back into the tumble on release.
- Centered composition on the matching near black ground in both layouts; Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. The draw routine returns the edge and ring counts (12 and 8) for assertion during QA. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `73/index.html`, `73/thumb.png` (720x720, rendered from the live script), `73/process.md`. Gallery entry added to pieces.json with the formula date.
