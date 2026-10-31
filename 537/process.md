# No.537 "Gray Outsider"

EXPANSION #65 nadia-hafid, prompt NH1 (from the Mal olor cover mechanism: the giant gray protagonist head over the pink corporate mass).

## Concept

One enormous flat-gray head fills the top half of a square canvas, cropped by the top edge, chin near mid-canvas, looming down over a miniature open-plan office. Below it, 3 rows of 4 small desks in simple perspective, each with an identical pink-clad worker, face blank, hands on the desk, typing in sync. The head is the only gray figure; everything else is pink ground, thin black outlines, and flat black shadow pools under each desk. The head carries Hafid's symbol-face only: two dot eyes and a single-line mouth. Dragging moves the giant gaze slowly; the workers never look up.

## Construction

- Single self-contained `index.html`, 2D canvas, no external assets, no audio, no microphone. Flat fills only; no gradients anywhere; the only shadows are solid black ellipse pools under the desks.
- Strict palette: pink ground #F2B3C0, ink black #161616, protagonist gray #CFCFCF, desk gray #D8D8D8, white #FFFFFF. Hair cap is ink black; the hoop earring is a thick white arc with a thin ink edge so it stays inside the palette and still reads against the pink.
- Stage is a 1080x1080 design square, letterboxed and centered; page ground outside the stage is the same pink. Thin black panel border inset inside the stage. Canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; draw() pins canvas.style.width/height in px every frame. Phone detection via window.screen min dimension < 700px, aspect fallback h > w*1.15; the composition keeps its square shape on phones.
- Head: layered flat shapes (bezier mask face, hair cap mass, ear ellipse, earring as a torus arc). The whole head group rotates around a low pivot by a clamped angle (max about 3 degrees) toward the drag point; pupils translate inside the face, mouth follows at a reduced factor.
- Workers: one parametric figure function (bowed blank white head, pink torso, two forelimbs on the desk) tiled 12 times. All twelve share one typing phase, so the bob is in perfect sync as specced; desks are drawn back row first with decreasing scale and spread for simple two-point perspective. Each desk carries one white paper sheet whose offset and rotation come from a seeded mulberry32 RNG (fixed seed 537065), so details are stable across renders.
- Interaction: drag (pointer or touch). Gaze target is the drag point normalized to the stage; pupils and head tilt ease toward it each frame. On release the gaze drifts back to center over about 4 seconds with an ease-out decay. No click-to-reload. Hint is the single lowercase word "drag" at low alpha in the bottom-right corner; no other text or UI.
- Determinism: the first frame is drawn synchronously at load at the constant phase PHASE0 = 1.35 (gaze centered, workers mid-bob). The rAF loop, typeof-guarded, is anchored as PHASE0 + elapsed since load. Frame one never derives from Date.now().

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp: identical. Second render deleted.
- Desktop/thumb read-back: giant gray head cropped by the top edge with black hair cap, ear and white hoop earring on the right side, dot eyes and single-line mouth only; 12 blank-faced pink workers in 3 rows of 4 at gray desks with white papers, each desk on a flat black shadow pool; thin black border; subtle "drag" hint bottom-right. Pass.
- Mobile read-back: square stage centered on the pink ground, composition shape kept, head, all 12 desks and the hint legible, nothing clipped. Pass.

## Deviations

- Worker heads are white rather than pink: the palette's only pink is the ground color itself, so pink heads would vanish against the ground; white keeps the faces blank and readable while the torsos and arms carry the pink uniform. Palette unchanged.
- The earring hoop is white with a thin ink outline instead of solid gray: at the ear's position the hoop hangs against the pink ground, where protagonist gray read as a smudge; white keeps it inside the specced palette and legible.
- Prompt's technical note mentions phase-offset typing; the visual description says the workers type "in perfect sync", so all workers share one phase (sync wins). Per-desk variation is limited to the seeded paper placement.
