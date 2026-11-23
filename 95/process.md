# №99 · Blurr Field - process notes

## Concept
After mattiazucchelli_'s monochrome pixel studies. A field of grayscale pixels, a noise field blurred until it reads as soft topography, then thresholded in bands so the tones step like contour lines made of squares. Hard pixel edges, no smoothing: the digital counterpart to his plotted lines.

## Construction
- Single self-contained page, no libraries. 2D canvas. Seeded PRNG "Blurr Field" (in a code comment). Field exactly 48 rows by 64 columns, 3,072 cells (asserted). The field is built from two octaves of periodic value noise at cell resolution, box-blurred for 2 passes, normalised, then quantized.
- Tonal steps fixed at exactly 7 levels (spec choice inside the prompt's 6 to 8), evenly spaced between white #F2EFE8 and black #141210. Monochrome only. Cells are drawn as square rects; the 64 by 48 block of square pixels is centred on every screen rather than stretched, so the pixels stay square on tall phones, with the page ground in the field's own white.
- Static decision, recorded per the spec default: the poster has no automatic motion. Dragging translates the sampled offset over the same periodic blurred field and the bands re-threshold from it, no new seed; on release the offset eases back to the curated zero. Never click-to-reload.
- Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before shipping. The 7 grey steps and the soft blobby topography read clearly at all sizes, with hard square edges throughout; at thumbnail size the piece is unmistakably a pixel field, not one of the kraft line studies beside it. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `99/index.html`, `99/thumb.png` (720x720, rendered from the live script), `99/process.md`. Gallery entry added to pieces.json with the formula date.
