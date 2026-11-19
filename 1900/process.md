# №1900 Seventeen Meters

OS5, PP1147, study #248 olga-siemienczuk. Gallery date 2007 · 03 · 26 (formula date).

## What it is

A performer in a flowing white dress hangs suspended on wires against a black void. Dragging moves her through the vertical space: at the top she is a high coloratura streak in ice blue, at the bottom a low, heavy ribbon in deep ember. Register follows height continuously. Two rope lines run from her shoulders to the top edge and go slack or taut with the motion. Letting go leaves her hanging where you put her.

## Palette (hand-picked from the named colors)

- Black void: #000000, #050505
- White dress: #f4f6f8, shaded #c9d2de
- Rope lines: dim grey #5a5f66, at rest #33373c
- Ice blue (high register): #a8d8ff, deep #6fb3f2
- Deep ember (low register): #ff6a2a, deep #b23c0e
- Plate text: #e8e8e8, dim #8a8f96

## Interaction

DRAG EARNED. Pointer or touch drag moves the singer vertically; horizontal drag feeds a slight swing that decays like a pendulum. No click to reload, no preset height buttons, no snapping to register detents. Release holds her height. A generated soprano line (sine oscillator with 5.5 Hz vibrato) starts lazily inside the first drag gesture only, never autoplay, gliding from about 1175 Hz at the top to about 220 Hz at the bottom. If WebAudio is unavailable the piece is visual only.

## Technical notes

- 2D canvas. A suspension model positions the performer; pitch maps continuously to normalized height; drag velocity feeds rope slack and swing.
- Dress shape interpolates with height: narrow streak at the top, wide ribbon with a second fold below y 0.55 at the bottom.
- Seventeen faint meter ticks run down the right edge, one per meter of the title. A thin register rail at the right edge carries a marker dot at her height.
- Shimmer: slow sparkles near 1 to 2 Hz, well under the 14 Hz ceiling. prefers-reduced-motion draws the single frame only.
- Visual Viewport sizing, resize listened to on visualViewport and window. Canvas pinned in draw() via style width and height in px. Phone detection via window.screen (min dimension under 700 px) with aspect fallback. Full-bleed portrait on phones, tall centered format on desktop.
- Frame one is deterministic: t = 6 s, performer hanging at y = 0.45 mid-descent, ropes taut, swing at rest. Two node-canvas renders of frame one are byte-identical (md5 3ff79d602200ede8213cfbfad54a2619).
- Drag travel is clamped to y 0.03 to 0.85 so the full gown stays in frame at the lowest height. A ?y= value (or ?seed=, as render-piece passes it) sets the height for QA; values are clamped to the same range.

## Gate

Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, 720x720 thumb. All three inspected: no clipping, no plate overlap, performer fully in frame at both sizes. Drag-equivalent states verified: ?y=0.08 renders a narrow ice-blue streak (md5 172eb3cd410920d9b79b216c9019b09c), ?y=0.85 renders a wide ember ribbon (md5 41c750dca22bbabdfc6555ae2782a48c), and the two frames differ.

One fix round: the first build let the drag reach y 0.97, where the gown hem ran off the bottom edge and crossed the hint line. Travel was clamped to 0.85 and re-rendered clean.

## Deviations

None from the spec. The study file studies/olga-siemienczuk.md does not exist in the repo, so hexes were hand-picked from the named colors as instructed.
