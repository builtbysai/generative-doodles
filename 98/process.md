# №98 · Simple Grid Study - process notes

## Concept
After mattiazucchelli_'s plotted grid studies. A regular grid of hairlines on kraft, flat and even at the corners, deeply warped at the centre as if a thumb were pressed into the sheet. Black micro-line only, no dots, no fills.

## Construction
- Single self-contained page, no libraries. 2D canvas. Seeded PRNG "Simple Grid Study" (in a code comment). Grid exactly 24 rows by 32 columns, 768 points (asserted). Points are connected to their neighbours by horizontal and vertical polylines through the displaced positions; no markers at the vertices.
- Displacement is layered: two octaves of seeded value noise plus crossed sine and cosine terms, with a radial pinch toward the warp centre. Amplitude is masked by distance from the warp centre with a smooth falloff, zero at the edges, deepest at the centre.
- Palette only: kraft ground #A98B5F, ink #1A1512. Hairlines at uniform 1px. The grid fills the frame inside a small kraft margin.
- Static decision, recorded per the spec default: the poster has no automatic motion. While pressed, the warp centre follows the fingertip at the same masked amplitude, so the press can be moved around the sheet; on release it eases back to the curated centre warp. Never click-to-reload.
- QA iteration: the first render's warp read as a gentle overall waviness; amplitude was raised and the radial pinch added so the centre gathers like a real press while the corners stay flat.
- Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback; full-bleed on phones, centred square on desktop with the page ground in the piece's kraft. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before shipping. Centre compression and flat corners verified visually at all three sizes; the piece reads as a warped sheet, distinct from №97's gyre triptych at thumbnail size. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `98/index.html`, `98/thumb.png` (720x720, rendered from the live script), `98/process.md`. Gallery entry added to pieces.json with the formula date.
