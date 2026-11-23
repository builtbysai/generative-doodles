# №63 · Bar Weave - process notes

## Concept
A woven bar mosaic after ovecarlson: every square cell is packed edge to edge with flat bars, and the packing direction alternates in a checker pattern so the weave reads at a distance.

## Construction
- Single self-contained page, canvas 2D, no libraries. Grid is 8x8 on desktop and 7x7 on phones, full-bleed with no ground showing, no outlines, gutters or rounded corners.
- Each cell holds 5 to 11 bars of varied widths summing exactly to the cell size. Colors run about 70% dusty pastels and 30% saturated accents from the prompt palette.
- Rows regenerate top to bottom on a 30s loop, each row dissolving over 0.8s. Horizontal drag across a row re-packs it at once; vertical drag flips the checker phase.
- Visual Viewport sizing; canvas pinned by style; phone detection via window.screen with aspect fallback.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `63/index.html`, `63/thumb.png` (720x720, rendered from the live script), `63/process.md`. Gallery entry added to pieces.json with the formula date.
