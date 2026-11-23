# No.532 Forest Census

EXPANSION #64 naida-mazzenga, prompt NM4 ("The Mushroom Census").

## Concept

A field-guide plate of the forest floor: a 3x4 catalog grid of twelve different mushrooms on white paper, each in its own framed cell with a plate number. Nine are flat-color riso-style portraits in Mazzenga's "Las setas del bosc" manner; every fourth cell (4, 8, 12) breaks the rhythm as a black-and-white ink study of its species, hatched and sketch-observed, with an invented pseudo-Latin label, the way her color spreads are interleaved with B&W sketchbook studies. A thin footer band carries the plate title "LAS SETAS DEL BOSC". The motion is barely-there natural history: spores drift up very slowly from three of the color mushrooms, and once in a long while one of the ink studies quietly re-inks itself, hatch line by hatch line, then holds.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no audio, no microphone, no interaction and no hint text (watch-only, exactly as specced).
- Palette is flat fills only, exactly as specced: cap reds `#C0392B` and `#E07B39`, stem cream `#F5E9C8`, gill blue `#7EC8E3`, moss green `#4E9A3D`, ink `#1A1A1A`, paper white `#FFFFFF`. No gradients anywhere (grep-verified zero gradient calls).
- Square stage fitted from the Visual Viewport API (resize listeners on `visualViewport` and `window`), letterboxed on the paper-white page ground; the canvas CSS size is pinned in px inside `draw()` every frame. Phone detection uses `window.screen` min dimension < 700px with the `h > w*1.15` aspect fallback (composition keeps its shape on phones; the plate is a field, so at phone aspect it centres on the same white ground).
- Grid: 3 columns x 4 rows with even gutters over the top 94% of the stage; footer band in the bottom 6% with a rule line, the title in Georgia small caps (the specced text is already uppercase), and two ink dot ornaments. Every cell gets a thin ink plate frame (study cells framed slightly stronger) and a "FIG. n" plate number top-left.
- Color mushrooms are drawn from cap+stem+gill primitives (`stemPath`, `domePath`) driven by a per-species parameter table (cap shape/width/height, stem height/width/curve, spots, ring, frills, moss, pores). The twelve species, each with one distinguishing feature:
  1. Classic agaric: red dome, nine white spots, white skirt ring under the cap.
  2. Funnel: orange flared funnel cap with a wavy rim, throat shadow and under-ridge lines.
  3. Blue-gill: shallow orange cap lifted so a fan of blue `#7EC8E3` gills shows beneath.
  4. INK STUDY: conical honeycomb-ridged cap, ridge-and-tick hatching. Label "Conica textilis".
  5. The giant: oversized orange dome on a thick stem, moss-green patches at the base.
  6. Frilled stem: red dome on a tall stem carrying three scalloped frill rings.
  7. Cluster: three small mushrooms (orange, red, orange) sharing one plate.
  8. INK STUDY: round puffball ringed with spines, curved hatch shading. Label "Globus spinulosa".
  9. Bracket shelves: three stacked moss-green shelf arcs with cream growth bands on a short stub.
  10. Tall bell: small spotted red bell cap on the tallest, thinnest stem in the grid.
  11. Stout pore-cap: squat orange dome, fat stem, dotted pore band under the rim.
  12. INK STUDY: veiled mushroom with gill lines, ring skirt and volva cup, diagonal + cross hatching. Label "Velata umbrina".
- Ink studies: outlines are double-stroked with a slight offset for a hand-drawn, observed feel (puffball spines are contour strokes, always drawn). All shading is precomputed hatch line sets (mulberry32, fixed sub-seeds) clipped by count: each study runs a 34s cycle (offsets 9/18/27s) in which its hatching redraws over 5s and then holds for the remaining 29s. At the first-frame phase all three are fully inked.
- Spores: 21 precomputed seeded particles (7 each from cells 1, 6 and 10), each on a fixed 7-12s cycle: rising slowly from just above its cap, drifting on a small sine, fading in and out on a sine envelope, clipped to its own cell so the catalog order is never disturbed.
- Grain: 520 precomputed seeded speck strokes (mulberry32, fixed seed 532064) drawn directly each frame over the plate; no offscreen canvas is ever created.
- Determinism: frame one is a synchronous `draw(PHASE0)` at the constant phase 2.0s (spores mid-drift at fixed positions, all studies fully inked). The rAF loop (typeof-guarded) is anchored as `PHASE0 + elapsed since first frame callback`; no clock value feeds frame one (grep-verified zero `Date.now`).

## QA log

- Rendered with `render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and `cmp` byte-compared: identical, re-verified after the fix pass below. Second render deleted.
- Desktop/thumb read-back: 3x4 plate grid with FIG. 1-12 numbers on every cell; twelve visibly distinct mushrooms; cells 4, 8, 12 read as hatched black-and-white observed studies (ridged cone, spined puffball, veiled mushroom) with italic pseudo-Latin labels; footer reads "LAS SETAS DEL BOSC"; pale blue spores visible above the Fig. 1 cap.
- Mobile read-back: whole square plate letterboxed centred on the white ground, all twelve cells, labels and footer legible, nothing clipped.
- Fixes during QA: (1) first pass the agaric's spots merged into cloud-like blobs: spot size cut roughly in half and spread rebalanced; (2) the agaric ring was invisible (cream on cream behind the gill band): it is now drawn after the cap in paper white with a stronger ink outline and reads as a skirt; (3) the bracket shelves read as thin floating leaves: shelf depth raised (0.085 to 0.118 of cell height) and the cream growth band deepened to match; (4) spore radius and peak alpha raised slightly so the drift registers at thumbnail size. All sizes re-rendered and determinism re-verified after the fixes.

## Deviations

- None from the prompt's visual or motion spec. Three implementation notes: the B&W study labels use invented pseudo-Latin ("Conica textilis", "Globus spinulosa", "Velata umbrina") as the brief prefers, rather than real species names; plate numbers use the field-guide form "FIG. n"; and the study cells sit on a slightly raised baseline (0.76 vs 0.84 of cell height) to leave room for their labels inside the frame, matching how the source spread captions its studies.
