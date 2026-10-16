# №114 · Threadbands - process notes

## Concept
After Lammetje's Intertwine. Seven diagonal bands cross a warm paper ground at about 35 degrees, each band a string-art tangle of thin lines joining jittered points to their nearest neighbours. Colour flows along the diagonal from burnt orange through crimson, magenta and violet to indigo. Clean paper gutters separate the bands; nothing is filled, everything is line.

## Construction
- Single self-contained page, no libraries. 2D canvas. Seven bands (asserted), each holding 700 seeded points scattered uniformly inside the band strip; every point connects to its 3 nearest neighbours (topology computed once at build), giving roughly 6,300 unique lines across the piece. Lines are stroked at alpha 0.38, width 1, batched into 28 colour buckets along the five-stop ramp #C1440E, #D9042B, #A4137A, #5E2B97, #1F2A6B on ground #F2EDE4.
- Density note: the prompt's technical sketch suggests about 120 points per band, but at that count the tangles read as sparse constellations and the gutters disappear perceptually (verified by ink-coverage sampling of the render). 700 points per band keeps the exact same rule (3 nearest neighbours, lines only) at a density where the bands and gutters actually read.
- Each band breathes: points carry small sinusoidal offsets on per-point phases along and across the band axis. Drag stirs points within 150px of the fingertip with a radial ripple; the stir amplitude eases in while pressed and settles after release. Never click-to-reload.
- Motion and interaction per the prompt. Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px every frame; phone detection via window.screen with aspect fallback; full-bleed on phones. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Two density iterations: 170 points per band read as scattered polygons, 420 still washed out; 700 with alpha 0.38 shows seven clear diagonal tangles with clean gutters on all three sizes. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `114/index.html`, `114/thumb.png` (720x720, rendered from the live script), `114/process.md`. Gallery entry for pieces.json: title "Threadbands", date 2002 · 05 · 05, note "Seven diagonal bands of string-art tangles on warm paper, colour running from burnt orange to indigo along the diagonal. Drag to stir the threads."
