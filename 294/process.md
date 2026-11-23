# No.671 "Santamaska"

EXPANSION #81 jose-perez-de-arce, prompt block 7 "Santamaska" (verified verbatim from TASKS.md). His 1997 engraving SANTAMANASKA (Taller Pro Nobis), one face merging Nasca "simplicidad extraordinaria" with Santamaria "locura de las figuras", as a living mask.

## Concept

One strictly symmetric frontal face on plain paper. Its geometry and expression never change; only the line grammar does. A grammar parameter g drifts between two poles on a seamless 40 s loop:

- g = 0, the Nasca pole: the face rendered in its essential bold strokes, thick ink, with a single cinnabar line (the upper lip). Calm, iconic.
- g = 1, the Santamaria pole: the same face filled with fine interlaced charcoal linework, filaments and knot-hooks multiplying inside the same feature bands. Dense, organized, still the same face.

Watch-only. No interaction at all: a mask is beheld.

## Construction

- **Symmetry construction.** Every feature (outline, hairline, brow, eye lids, nose wing, lips, ear, chin mark, cheek mark) is authored once, for the right half, as cubic bezier segments in a square composition field (face spans y 0.205 to 0.788, about 60 percent of height, axis at x = 0.5). The left half is drawn as the exact mirror (x -> 1 - x) of the same point lists, so bilateral symmetry holds by construction. The nose bridge lies on the axis and is drawn once. The iris is a ring feature, mirrored the same way. Even the small seeded jitter applied to the authored control points (mulberry32, seed 671001) is applied before mirroring, so the hand-drawn wobble is symmetric too. Axis points are never jittered in x.
- **Grammar interpolation.** Each feature carries a stroke family: its bold centerline plus 2 to 7 fine filaments, offset copies of the centerline along its per-point normals with a seeded sine wobble, and a few interlace hooks, short bowed connectors stapling neighbouring filaments together (the knot-work). Filament counts: outline 7, hairline 4, lip bands 4 each, most features 3, ear and chin 2, plus two extra iris rings. Across the whole face the fine layer totals about 130 strokes (83 filaments and rings, about 46 hooks, mirrored pairs counted per side). Each fine element has a seeded birth threshold in g; its alpha ramps in over a 0.2 g-window, filaments first (births 0.12 to 0.78), hooks later (0.45 to 0.9), so as g rises the strokes visibly split and multiply rather than jump-cutting. Meanwhile the bold ink fades to a 0.12-alpha ghost (never quite zero, so the Santamaria face stays bound to its skeleton), and the cinnabar accent fades out by g = 0.55, since the accent belongs to the Nasca grammar only. The pupil dot is drawn at constant alpha in both grammars: the gaze is part of the unchanging expression.
- **The loop.** g(t) is a triangle ping-pong over 40 s passed through raw - (0.9 / 2pi) sin(2pi raw), which flattens the ends of the sweep (slope 0.1 at the poles, 1.9 mid-way), so the mask dwells a few seconds near each grammar. g is a pure function of loop time on the anchored clock (performance.now minus a load-time anchor).
- **Determinism.** Frame one is the synchronous draw(0) at load, which is g = 0 exactly, before any clock use. All geometry is precomputed once from the seed; nothing is derived from Date.now() and Math.random is never called. The animation loop runs only when requestAnimationFrame exists (typeof-guarded); QA hooks "seed=tNN" (freeze clock) and "seed=g0/g1" (force a pole) exist for rendering checks and disable the loop.
- **House rules.** Canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas.style.width/height pinned in px inside draw() every frame; phone detection via window.screen (min dimension < 700 px) with the h > w*1.15 aspect fallback. The composition is a centered square field, so on phones the face refits by width and the page ground is the piece's own paper tone. Palette is exactly the four specified tones: paper #EFE7D2, ink #191713, cinnabar #B33A2B, charcoal #2E2A26. No text, no audio, no external assets, no offscreen canvas, no ctx.filter.

## QA log

Renderer: node ~/workspace/tools/render-piece.js (node-canvas), sizes 1280x900, 390x844, 720x720.

- **Determinism:** thumb.png rendered twice and byte-compared with cmp: identical. Second render deleted.
- **Frame one (all three sizes):** the bold Nasca mask on paper: outline, hairline, brows, ringed eyes with pupils, nose bridge and wing, cinnabar upper lip, lower lip, chin and cheek marks, small ears; symmetric, calm, nothing clipped. Mobile refits the face by width, fully in frame.
- **Santamaria pole (state-forced throwaway, ?seed=g1 at 1280x900, read back, then deleted):** the identical face and expression filled with fine wavy interlace: multi-filament bands on every feature, iris rings retained, pupils present, cinnabar gone, bold skeleton ghosting underneath. Ink census: 44,423 ink pixels at g = 1 versus 22,300 at g = 0, roughly double the coverage in the same face region.
- **Symmetry check:** the forced g = 1 render was flipped horizontally and diffed against itself in a node-canvas script: 960 mismatched pixels of 1,152,000 (0.083 percent) at a per-channel tolerance of 16, consistent with antialiasing at stroke edges; no structural asymmetry.
- **Deviations:** one, minor. The prompt's Santamaria count is "about 120 fine strokes"; the built fine layer is about 130 (83 filaments and rings plus about 46 interlace hooks), because the outline and lip bands need their full filament counts to read as continuous interlace at the 720 px thumb size. Recorded here rather than silently trimmed. No other deviations: symmetry, expression, palette, watch-only motion, and the pole dwell all follow the prompt as written.
