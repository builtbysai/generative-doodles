# №85 · Perfect Zoom - process notes

## Concept
After laurent.malys's Genuary perfect-loop zoom. Black thin-line squares nested inside squares, each scaled by the golden ratio and rotated a few degrees, on white; the nest dives inward forever in a seamless zoom.

## Construction
- Single self-contained page, no libraries. 2D canvas. 24 nested levels (asserted), scale 1/phi per level, rotation plus 8 degrees per level. Global scale animates from 1 to phi over a seamless 30s loop with the boundary levels alpha-faded at the wrap. Palette only: black #111111, white #FFFFFF, 1px lines, no fill. Vertical drag scrubs the zoom; release resumes the dive. Seeded PRNG name Perfect Zoom recorded in the script comment.
- Motion loop with touch and drag interaction, never click-to-reload. Full-bleed field on phones (square nest centred for No.85 with white ground edge to edge), Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `85/index.html`, `85/thumb.png` (720x720, rendered from the live script), `85/process.md`. Gallery entry added to pieces.json with the formula date.
