# No.525 Saints and Suns

EXPANSION #63 giulia-conoscenti, prompt GC5 (Rosalia Quilt). Sicilian cart-painting grammar, pop-bright.

## Concept

A quilt of diamond medallions fills the square stage. Each of the nine diamonds holds a simple saint portrait (halo, face, shoulders) drawn on a checkerboard ground that alternates red-and-white and blue-and-white from cell to cell, every diamond edged in gold. Big flat blue sun discs with triangular ray petals sit in the gaps between the diamonds: four full suns in the interior gaps and quarter suns clipped at the four corners. The whole quilt breathes on a very slow scale oscillation, one seeded sun pulses, and a tap reseeds the quilt (portraits swap variants, the checker phase flips) under a quick cream fade.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets. Stage is a centered square in stage units (1 = full stage), so the composition keeps its shape at any aspect.
- Palette only, flat fills, no gradients: red #E6392B, blue #2B4FE0, white #FFFFFF, teal #39B8A5, gold #F5B301, cream ground #F7F2E4.
- Grid: 3x3 diamonds inscribed in their cells (vertex radius = half a cell), so neighbouring diamonds touch at points and leave clean gaps for the suns. Each cell clips a diamond path, fills an 8x8 checkerboard, draws the portrait, restores, then strokes the diamond edge in gold. Small gold dots mark the diamond touch points along the stage edges.
- Saint portrait, 6 shapes: halo (gold disc, gold ring, or gold ring with short rays), white face with a thin gold outline, two eyes (dots, closed arcs, or one of each, in the cell's checker color), a small gold mouth arc, a trapezoid shoulder block (seeded color, never the same as the cell's checker color), and an optional chest mark (gold cross or gold dot).
- Suns: 12 blue triangle ray petals with gold outlines around a blue disc with a gold ring and gold centre dot. One seeded sun pulses (scale 1 +/- 0.13, 3.6 s period). The quilt breathes at scale 1 +/- 0.008 on a 16 s period about the stage centre.
- Grain: 750 precomputed seeded specks (short strokes in palette rgba at low alpha) drawn directly each frame over the quilt, per the house adaptation (the QA renderer has no offscreen canvas).
- Interaction: tap (pointer or touch, under 12 px movement and 500 ms) or double-click reseeds via an LCG step on the layout seed; the reseed rebuilds all portrait variants and the checker phase and starts a 0.6 s cream fade veil. No hint text in the piece.
- House rules: canvas size from the Visual Viewport API with resize listeners on visualViewport and window; canvas CSS size pinned in px inside draw(); phone detection via window.screen (min dimension < 700 px) with aspect fallback (h > w * 1.15); page ground is the palette cream, matching the letterbox on phones.
- Determinism: frame one is drawn synchronously at the constant phase PHASE0 = 1.9 (breath and pulse at fixed phase, no fade veil). The animation loop is anchored as PHASE0 + elapsed since the first rAF timestamp, rAF is typeof-guarded, and no clock value feeds frame one. Seeded RNG is mulberry32 (layout seed 525063, grain seed 525999).

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. The duplicate render was deleted.
- Desktop read-back: 3x3 gold-edged diamond quilt centred on cream; a haloed saint in every diamond on alternating red/blue checkerboards; halo, eye, shoulder and chest-mark variants all present; blue rayed suns in the four interior gaps, quarter suns at the corners, gold dots at the edge touch points.
- Thumb read-back: full quilt edge to edge, all nine saints and four interior suns legible at 720 px.
- Mobile read-back: the whole square composition letterboxes on the cream page ground, shape kept, nothing clipped.
- Palette audit by eye on all three renders: only the six palette colors appear; flat fills throughout; no gradients; no text.

## Deviations

- None from the prompt. Implementation notes only: the corner suns are drawn as full discs clipped by the stage edge (quarter suns in the corner gaps), and the reseed fade is a decaying cream veil rather than a crossfade, because the renderer has no offscreen canvas to hold the previous frame.
