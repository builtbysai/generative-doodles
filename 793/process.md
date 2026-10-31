# No.793 The Triangle

EXPANSION #97 niele-toroni, prompt block PP2 "The Triangle". From Toroni's Swiss Institute New York installation: the regular imprint lattice, clipped by architecture into a triangle above a doorway.

## Concept

A white gallery wall. Centered in the lower half, a dark rectangular doorway. Above it, black imprints of the No. 50 brush arranged in a triangle of rows 1-2-3-4-5-6-7 (28 imprints): the artist's fixed-interval lattice, cut to a triangle by the architecture it measures. Inside the doorway, three nested canvases carry orange imprints in a dim interior. The triangle stamps in apex-first, holds, fades, and restarts on a seamless 24 s loop, while the light inside the doorway slowly rises and falls on an independent cycle, as if someone were passing in the room beyond. Watch only. The grid is the constant; the building is the composition.

Palette (strict, from the prompt): wall #F4F4F2, doorway dark #232323, imprints black #1A1A1A, interior canvas ground #EFEDE6, interior imprints orange #E06A1B. Nothing else, no text except the title.

## Construction

Single self-contained index.html, canvas 2D, no external assets. Canvas size comes from the Visual Viewport API with resize listeners on visualViewport and window; the canvas style width and height are pinned in px inside draw(). Phone detection uses window.screen physical size (min dimension under 700 px) with the aspect fallback h > w * 1.15; the layout is fully proportional to the frame, so it holds at every size.

Triangle lattice: the doorway width is 0.40 of the frame's smaller dimension, its top edge at 0.54 of the height, running to 0.985 of the height. The triangle's apex sits at 0.055 of the height and its base row at 0.485, just above the doorway. Rows are evenly spaced between those limits; horizontal spacing is 0.215 of the doorway width; each row r holds r imprints centered on the frame axis, so the lattice is a true regular grid clipped to the triangle, not a decorative arrangement.

Each imprint is a seeded dab (mulberry32, fixed seed): a squarish rounded rect with 31 to 41 precomputed vertical bristle hairlines, denser and stronger in the top third where the brush first pressed, plus a few dry gap strokes where the ground shows through. Rotation, base alpha, streak lengths and alphas are per-imprint seeded data, fixed at layout time.

Motion is closed-form in loop time. Stamping: imprint k (row-major from the apex) starts at k * 0.3 s and presses over 0.2 s (alpha 0 to 1, scale 1.06 to 1.0). All 28 are down by 8.3 s; the field holds until 16.3 s (about 8 s), fades out over 3 s, and rests empty until the 24 s loop wraps. Interior canvases are drawn at full strength and then veiled with doorway dark at an alpha driven by a 12 s cosine breath (bright between 0.5 and 1.0), so the dimming reads as light changing in the room beyond rather than the canvases themselves fading. Each canvas carries a thin edge stroke in the doorway tone so the nesting stays legible in the dim interior.

Frame-one phase: the loop is offset by PHASE = 2.4 s, so the first frame already shows the apex and the first three rows fully stamped plus two imprints of row four mid-field, with the doorway and its canvases lit. Without the offset the opening frame would be a nearly blank wall with a dark slot, a poor thumbnail and a poor first impression; the offset places the viewer mid-gesture, the triangle visibly in the act of being measured out. Frame one is the synchronous draw at t = 0 of this offset loop, never derived from a clock.

Determinism: all randomness is seeded and consumed once at layout; every animated quantity is a closed-form function of elapsed time from load (the rAF timestamp), with frame one drawn synchronously before any animation. No Date.now(), no gradients, no shadowBlur, no filter, no offscreen canvas. The rAF loop is typeof-guarded for renderers without it.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). All three read back and inspected.
- Determinism: thumb.png rendered twice, cmp byte-compare identical. Second render deleted.
- Desktop and thumb: white wall, black bristle-textured dabs in the opening rows of the triangle above a dark doorway; inside, three nested outlined canvases with orange dabs in a dim taupe interior. Mobile: same composition in the tall frame, doorway elongated, nothing clipped.
- Hold-phase check: a throwaway copy with PHASE raised to 12 s rendered the complete 28-imprint triangle (rows 1 through 7, clean triangular silhouette) and was deleted after inspection.
- Fix round 1: the first interior build drew the canvases at the breath alpha directly, which washed their grounds into the doorway dark and made the nesting illegible. Rebuilt as full-strength canvases dimmed by a doorway-dark veil, plus a thin canvas edge stroke; re-rendered all sizes and re-verified the byte-compare.
- Deviations from the prompt: none of substance. The prompt's subtle inner glow in the doorway is realized as a faint canvas-ground wash behind the nested canvases (gradients are unavailable under the house renderer rules), and the interior brighten-and-dim is applied as a dark veil rather than a light source, for the legibility reason above.
