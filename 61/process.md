# №61 · Momentary Composition - process notes

## Concept
Layered flat primitives after ovecarlson: circles, squares and rounded rectangles overlap on near black so their transparent colors mix optically, then the whole arrangement crossfades into a new one.

## Construction
- Single self-contained page, canvas 2D, no libraries. One deterministic render function per seed places 26 to 40 shapes, biggest first, sized 8% to 60% of the shorter edge, per-shape alpha 0.35 to 0.9, positions sampled with a 4% minimum gap.
- Palette is only the seven prompt colors on ground #070707. No gradients, outlines or text on the piece.
- Every 9s the composition crossfades over 1.2s into the next seeded composition. Horizontal drag scrubs the fade; drag down fades in a brand-new composition at once.
- Full-bleed on both form factors; Visual Viewport sizing; canvas pinned by style; phone detection via window.screen with aspect fallback.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `61/index.html`, `61/thumb.png` (720x720, rendered from the live script), `61/process.md`. Gallery entry added to pieces.json with the formula date.
