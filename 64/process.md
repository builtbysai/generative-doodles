# №64 · Transparency Drift - process notes

## Concept
The sparse, monumental companion to Momentary Composition: only a handful of very large translucent shapes on near black, anchored so their overlaps meet at the center and mix into colors that exist nowhere else.

## Construction
- Single self-contained page, canvas 2D, no libraries. Nine to twelve shapes (circles, squares, wide rounded rectangles), 25% to 70% of the shorter edge, drawn biggest first, alphas 0.25 to 0.6, colors picked from the seven prompt colors on ground #050505.
- Nothing moves positionally. Each shape's alpha breathes on its own 8 to 14s phase so the overlap colors drift. Every 25s one shape is replaced with a 2s crossfade.
- Drag over a shape raises its alpha toward its true flat color; release sinks it back into the breathing cycle.
- Full-bleed on both form factors; Visual Viewport sizing; canvas pinned by style; phone detection via window.screen with aspect fallback.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `64/index.html`, `64/thumb.png` (720x720, rendered from the live script), `64/process.md`. Gallery entry added to pieces.json with the formula date.
