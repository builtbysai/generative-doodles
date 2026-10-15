# №65 · Pascal's Field - process notes

## Concept
A diamond-pinwheel field whose colors are data, not decoration: each cell's eight triangles sample binomial coefficients from Pascal's triangle, reduced by a cycling modulus and mapped to seven flat residue hues.

## Construction
- Single self-contained page, canvas 2D, no libraries. Pascal rows 0 to 16 are precomputed exactly; each triangle's residue is C(n,k) mod m for its binomial neighbourhood cell, with k mirrored past the triangle's edge.
- Grid is 9x9 with 1px pale separators in ground #f4f1ea. Residue hues: 0 pale, 1 red, 2 orange, 3 yellow, 4 green, 5 cyan, 6 violet.
- The modulus cycles 5, 6, 7, 9 on a 24s loop (6s each) with a 1.2s color crossfade, recoloring the whole field under the new residue system. Drag raises the modulus locally under the finger and the recoloring settles after release.
- No numerals or labels on the piece. Square on desktop, full-bleed on phones; Visual Viewport sizing; canvas pinned by style; phone detection via window.screen with aspect fallback.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before pushing. Hans's real-device check is the final gate.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `65/index.html`, `65/thumb.png` (720x720, rendered from the live script), `65/process.md`. Gallery entry added to pieces.json with the formula date.
