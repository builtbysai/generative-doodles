# №1715 "Stipple Rosette" (PP962, EXPANSION #225 goodbad-png)

Date: 2006 · 09 · 22. Gallery note: "A stipple rosette turns slowly around a fixed sepia knot. Watch only."

## Build
Template: live №1711 index.html (fetched via fetch-blob, sha f851d5dcf94df927374d9a4d65796f1a365448c8). Canvas 2D only; p5.js-to-2D substitution per the house rules.

- Rosette: 12 petals (seeded mulberry32(1715)), each a closed quadratic petal curve with brick-red outline, rotational jitter up to 0.05 rad and length/width jitter for hand-cut irregularity. Petal base radius 0.085 of stage height, length 0.155, rosette centered small on a large quiet warm off-white ground.
- Stipple fill: seeded dots placed on a grid inside each petal; acceptance probability 0.18 + 0.82 * (1 - u) along the petal axis, so density is the tone, dense at the base and sparse at the tip. Stipple ink alternates brick red / sepia by petal; outlines are all brick red. Exactly two ink colors (sepia #4A3226, brick red #A23B2E) on warm off-white #F5EEE2.
- Knot: five rotated dotted star loops in sepia (650 dots along the loop polylines), drawn fixed at the center.
- Motion: watch-only. The petal ring rotates one full turn per 60 s as a closed-form function of piece time; the knot never rotates, mimicking two pen passes drawn at different times.
- House rules: Visual Viewport sizing with resize on visualViewport and window; canvas pinned in draw() via style.width/height in px; phone detection via window.screen (min dimension < 700 px) with aspect fallback; centered geometric piece, square stage on desktop and phone, page ground set to the piece ground; one synchronous frame at load; requestAnimationFrame guarded with a typeof check; reduced-motion respected; no em dashes in visible copy; no click-to-reload.

## Frame one (fixed phase)
phaseT = 0, so the ring rotation is exactly 0 degrees and the knot is fixed. All geometry and stipple placement come from the seeded RNG only; no Date.now() or Math.random() affects frame one.

## Deviations recorded
- Palette: the spec's f04 "exact" palette codes have no study file to resolve them from (studies/goodbad-png.md does not exist in the repo, per the batch spec). Hexes are hand-picked from the prompt's named colors, as №1704-1711 did for aaron-penne: sepia #4A3226, brick red #A23B2E, warm off-white #F5EEE2. No study file was invented.
- No other deviations. No WebGL-to-2D substitution beyond the spec's own p5.js-to-2D note.

## QA
Rendered with node ~/workspace/tools/render-piece.js and read all three PNGs:
- Desktop 1280x900: rosette centered small on quiet ground; stipple inside every petal outline with the base-to-tip density gradient clearly legible; sepia star knot centered; title plate "Stipple Rosette / 2006 · 09 · 22" and "Watch only." hint legible.
- Mobile 390x844: square stage kept, rosette centered, plates legible, no clipping.
- Thumb 720x720: same composition, legible at small size; thumb.png IS this render.
- Fix round: first gate showed stipple dots spilling outside the petal outlines (stipple lateral extent was up to the full petal width while the quadratic outline peaks at half width). Fixed by scaling stipple lateral placement to 0.45 of petal width max, then re-rendered all three sizes and re-read them; the spill is gone.
