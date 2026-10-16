# №110 · Grid Rule - process notes

## Concept
From Bug's ig-artist-study batch 0, prompt 30, after nathanmoore. A static piece. A 20 by 20 grid; each cell holds one mark, and the mark is a pure function of its indices. The field resolves into a moire bloom at the centre: order producing surprise. The discipline is total.

## Construction
- Single self-contained page, no libraries. 2D canvas. Nested loops only. Each mark is a short line whose angle is (i*3 + j*5) mod 180 degrees, i the column and j the row, and whose length grows with distance from the bloom centre. There is no PRNG, no seed comment and no chance anywhere in the file; the rule is the seed.
- Exactly 20 by 20 = 400 marks (asserted by count), one per cell, no more, no fewer; grid centred with wide margins; marks thin, uniform weight. Palette only: paper #F7F4EC, ink #1A1A18.
- Static decision (recorded), rule-preserving: while pressed, the bloom centre (the point length is measured from) follows the fingertip and the marks recompute by the same pure function; release restores the frame-centre bloom. No chance is introduced at any point.
- Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px; phone detection via window.screen with aspect fallback; the grid keeps its shape on phones with the page ground in the piece's own paper colour. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before shipping. Hans's real-device check is the final gate.
- Source audit: the file was grepped for chance and sound-field terms and helper names and is clean; the mark count is asserted at 400 in the draw code.
- Distinctness check against No.109 Single Curve: same paper and ink, but 110 is a strict 20 by 20 grid of short marks with a centre bloom where 109 is one wandering line.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `110/index.html`, `110/thumb.png` (720x720, rendered from the live script), `110/process.md`. Gallery entry prepared for pieces.json with the formula date.
