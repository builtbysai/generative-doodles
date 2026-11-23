# №97 · Gyre Lines - process notes

## Concept
After mattiazucchelli_'s plotter gyres. A static triptych: three circular webs of hairlines, each built from vertices around a circle joined to the centre, the outline pushed into a smooth organic wobble. One pixel black lines on kraft, delicate and quiet.

## Construction
- Single self-contained page, no libraries. 2D canvas. Seeded PRNG "Gyre Lines" (mulberry32 over an FNV hash of the name, in a code comment). Each gyre has exactly 72 vertices (asserted, 216 total). Every vertex is joined to its gyre centre by a spoke hairline, and the perimeter is drawn as the chain of edges between neighbouring spokes, the triangle-strip boundary. Vertex radii are displaced by four seeded sine harmonics, so each of the three gyres wobbles differently while the outline stays smooth.
- Palette only: kraft ground #A98B5F, ink #1A1512. Uniform 1px lines, no fills. Each gyre occupies a third of the frame with generous kraft margins.
- Static decision, recorded per the spec default (same pattern as №89/90 and №92): the poster has no automatic motion. The interaction is drag-only rotation: dragging turns the gyre nearest the fingertip around its own centre, following the pointer angle, and it stays where it is left. Never click-to-reload.
- Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback; full-bleed on phones, centred square on desktop with the page ground in the piece's kraft. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before shipping. The three gyres read as three distinct organic outlines at thumbnail size, clearly a different piece from №98's warped grid and №99's pixel field despite the shared kraft family. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `97/index.html`, `97/thumb.png` (720x720, rendered from the live script), `97/process.md`. Gallery entry added to pieces.json with the formula date.
