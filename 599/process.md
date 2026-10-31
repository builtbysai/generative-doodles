# No.599 — Acá Están

EXPANSION #72 clara-lagos, prompt block 7 "Desde el Cielo". Her tenderness with one quiet barb: three panels of warmth, one quiet turn that reframes everything without breaking the tone. Restraint is the technique.

## Concept

A 2×2 notebook strip. A mother sends her child to find four things: a crayon, a leaf, a stone, a belt buckle. The child searches (under the table, behind the plant, in the drawer), comes back proudly holding a small potted plant instead, and the mother crows "¡ACÁ ESTÁN!" In the fourth panel, slightly larger, the father smiles and says the things will be sent "from heaven", and the reader understands he is gone. Nothing else is said. No grey wash, no rain, no visual sad cues, no text explaining the twist.

Dialogue kept verbatim from the prompt block:
- Panel 1, mother: "Buscá: un crayón, una hoja, una piedra y la hebilla del cinturón."
- Panel 3, child: "¡Mirá lo que encontré!" / mother: "¡ACÁ ESTÁN!"
- Panel 4, father: "Te las mando desde el cielo."

Palette strict: ink #1A1A1A, paper #FAF7F0, soft blue #3E6FA8 on the father's shirt only, the one blue spend in the piece, placed where it hurts. In the pencil-ghost state his shirt fills with ink at ghost alpha, so the blue exists nowhere until his panel inks in.

## Construction

Single self-contained index.html, canvas 2D, built on the same architecture as No.594 (the other tap-to-ink Clara Lagos strip): all geometry is precomputed at load from a seeded mulberry32 stream (seed 599072) as jittered stroke point-sets with lengths; the inking animation spends a length budget across each panel's stroke list in order, so panels draw themselves stroke by stroke. Paper speckle and notebook ruled lines are precomputed seeded data drawn directly each frame (no offscreen canvas, no filters). Canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas.style.width/height pinned in px inside draw(); phone detection via window.screen (min dimension < 700px) with aspect fallback.

State machine:
- Panel 1 arrives inked; panels 2–4 wait as pencil ghosts (alpha 0.15).
- TAP (pointerup without drag) inks the next panel over 1.2 s, at the viewer's pace; no autoplay, no auto-advance. Taps during an inking are ignored.
- When panel 4 finishes inking, a 1.5 s beat holds, then the father's bubble (outline and text together) fades in over 0.7 s. His line is deliberately NOT part of the panel's ink strokes: it is an arrival, not a drawing step.
- After his line has landed, tapping the presented plant in panel 3 makes one leaf tremble once (0.9 s decaying oscillation). A leafDone flag makes it unrepeatable; after that, taps do nothing. There is no replay control anywhere. Never click-to-reload.
- Watch-only life: figures breathe with a small slow bob; the plant sways very slightly (rotation ±0.012 rad, 6 s period) around its pot base.

Determinism: frame one is the synchronous draw at fixed PHASE0 = 0 (panel 1 inked, 2–4 ghosts, father's shirt blue-free); the rAF loop is typeof-guarded and anchored as PHASE0 + elapsed-since-load. Zero Date.now, zero document.createElement, zero AudioContext, zero external assets, zero em dashes in visible copy.

## QA log

- Rendered with ~/workspace/tools/render-piece.js (node-canvas): qa-desktop.png 1280×900, qa-mobile.png 390×844, thumb.png 720×720. All read back: the 2×2 grid with hand-ruled wobbly borders; panel 1 inked with the long list bubble fully legible; panels 2–4 as readable pencil ghosts (search vignettes, the presentation with both bubbles, the father smiling with ink-filled shirt, no blue anywhere); panel 4 visibly larger, lower right; the square stage fits the 390-wide phone frame with nothing clipped and the "tap" hint present.
- Determinism gate: thumb.png rendered twice and cmp byte-compared, identical; second render deleted.
- Completed state verified with a throwaway preset copy (inkP all 1, father's beat elapsed; deleted after): panel 2's three search vignettes read cleanly, panel 3's crowing mother and presented plant land, panel 4's father wears the soft-blue shirt (the piece's only blue) with his bubble above him.
- One fix during build: several arm strokes were first written as 3-point curves against the cubic bez() helper, which threw at load; a quadratic qbez() helper was added and those seven calls converted. Re-rendered and re-verified after the fix.
- Interaction is code-verified only: the QA renderer fires no pointer events, so tap-to-ink, the 1.5 s beat, and the one-time leaf tremble were checked by reading the state machine, not by simulated taps.

## Deviations

- Panel 4's composition is deliberately sparse: the father, a ground line, and (after the beat) his bubble. The prompt fixes his panel as larger with a simple smile and no melodrama; adding set dressing would work against the restraint the block demands. Recorded here so the emptiness reads as a decision, not an omission.
- The father's bubble outline fades in together with its text after the beat, rather than inking with the panel and waiting empty. An empty bubble hanging over him for 1.5 s would announce the line before it lands; the prompt asks for a beat before his line appears, and the whole speech act arriving at once is the quieter read.
- The leaf that trembles is the presented plant's top leaf in panel 3 (the only plant the strip establishes). The prompt's "on the fourth panel, TAP the plant" is read as: once the fourth panel has landed, the plant becomes tappable. The hitbox is generous (the whole plant: pot, stem, leaves).
- Panel inking takes 1.2 s per panel, a touch slower than No.594's 0.9 s, per the block's "advance the four panels slowly".
