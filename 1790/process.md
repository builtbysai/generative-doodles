# №1790 "A Song From Under the Floor Boards" (SR7, PP1037)

The driver is the accordion strip itself: twelve rigid collage panels hinged at vertical creases, breathing through a slow fold wave while a horizontal drag pulls the reading position along it.

## Prompt source

TASKS.md, EXPANSION #234 steve-roden, PP1037 (SR7), prompt block as transcribed in BATCH-1786-1790-SPEC.md (TASKS lines 23277-23358 for the PP1031-PP1038 block, read 2026-11-15 02:47 EST). Gallery date 2006 · 12 · 06, formula date for №1790. Gallery note: "An accordion collage breathes through its folds. Drag to read along it."

## Build

Canvas 2D only. The strip is a chain of 12 panels, each drawn as a parallelogram between two creases. Crease j carries offset o(j, t) = sign(j) * Amax * (0.55 + 0.45 * sin(TAU * t / 48 - j * 0.62)), with signs alternating so panels lean against each other and folds bend only at the creases. Panel collage is drawn in local coordinates through an affine map onto each panel quad, so fragments align and misalign at the folds as the panels turn. Light follows the lean: each panel gets a white overlay up to 0.18 alpha when turning toward the light and a black overlay up to 0.16 when turning away. A soft gradient shadow sits under the strip and a narrow dark gradient marks each fold, clipped to the strip interior so no streaks fall on the ground.

Panel table: fixed authored compositions from mulberry32 seed 1790. Panel types left to right: 0 architecture, 2 plants, 3 orange patch, 1 legs, 2 plants, 3 orange patch, 0 architecture, 2 plants, 3 orange patch, 4 mixed, 0 architecture, 2 plants. Type 0 is grey columns and window squares, type 1 is two dark leg forms on a pale ground, type 2 is stems with grey leaves, type 3 is an orange-red (#C4502E) painted patch on tan (#C9A86A), type 4 is a grey photo fragment with an orange stripe and a tan block. Palette: warm white paper, black-and-white photo greys, orange-red #C4502E, tan #C9A86A, soft shadow grey, clean neutral ground #ECE6D9.

Motion: watch-first. The fold wave runs on its own with a 48 second cycle. Horizontal drag shifts the reading offset, bounded to plus or minus 1.5 panels, and adds a bounded fold impulse that propagates along the creases and decays over about 2 seconds after release. The reading offset eases back to center when released so the strip never strands off frame. No click-to-reload anywhere. No audio: the prompt offers none and the piece is visual only.

Frame one: fixed phase t = 60 s, mid fold cycle, reading position 6.0 (strip center), read offset 0, drag impulse 0. Crease offsets at t = 60 s in px at 1280x900: [34.06, -31.20, 23.71, -14.36, 6.64, -3.42, 5.90, -13.15, 22.49, -30.42, 34.00, -31.90, 24.90]. Several panels sit mid-turn catching light: panels 0, 2, 8 and 10 lean bright, panels 1, 3, 9 and 11 lean into shadow.

## Deviations from the prompt

- No photo files are used. Per the spec adaptation flag, the black-and-white photographs are canvas-drawn grey compositions (architecture, legs, plants) with no image assets.
- The prompt gives no panel count. Twelve panels were chosen so the strip spans the field at the house proportions.
- Drag eases the strip back to center after release and the fold impulse decays, so the reading position is always recoverable. The prompt asks drag to push the reading position; the bounded return keeps the strip in frame.
- Pure Canvas 2D throughout. No WebGL was needed, so no substitution was required.

## QA

Rendered with node ~/workspace/tools/render-piece.js from the actual script and inspected all three PNGs visually.

- Desktop 1280x900: zigzag strip centered in the square field, twelve panels legible, orange patches and tan grounds alternating with grey photo panels, fold shadows visible at the creases, soft shadow under the strip, title plate top left and hint plate bottom left clear of the composition.
- Mobile 390x844: strip full-bleed across the width, panels tall and legible, plates clear, no clipping.
- Thumb 720x720: same composition as desktop, title and hint plates legible at small size. thumb.png is this render.

First gate found faint vertical streaks on the ground above the strip from the fold-shadow bands extending past the strip silhouette. Fixed by clipping the fold shadows to the strip interior, then re-rendered all three sizes and re-inspected them. All three pass. No post-gate edits after the re-gate.

- index.html md5: 16e53215b5c6673023f28a63e153e18d
- thumb.png md5: c03a50bfc69cb2ef36fe4db390c5cb78
