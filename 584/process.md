# №584 — La Mano Dibuja Sola

EXPANSION #70 maria-j-luque, prompt block 8 "Mano Poseída" (verified verbatim from TASKS.md).

## Concept

Her doctrine as the interaction itself: "I like it to be intuitive, to feel that my hand is drawing by itself... I never prepare sketches and go straight to paper." The piece opens on a blank sheet of paper. Each tap asks the hand to continue, and the hand draws the next passage of a small crowded room, stroke by stroke, in one committed pass, wobble and all. There is no undo, no eraser, no clear, no restart, and no generate button anywhere in the piece: the only interface is continue, or look (drag pans the sheet slightly). When the eighth passage lands, the world is complete and stays; further taps do nothing.

Palette, strict: ink #141414 on paper #FAF6EA; grey wash #B9B4A6 appears only in the final passage (the under-table shadow and the closing scribble).

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no audio, silent.
- All drawing geometry is precomputed at load from a fixed mulberry32 seed (584070): every stroke is a jittered gesture polyline with its length measured once, so stroke order and pacing are identical in every session. Passages draw with a length-budget line-draw effect; duration per passage scales with its total stroke length (clamped 0.8–2.6 s). Taps during a passage are ignored; the hand does not hurry.
- The eight passages, in order:
  1. The table (tabletop, legs, stretcher, a cup and a bowl on top), at the center.
  2. Tiny figures around the table: two seated figures on chairs, one standing figure behind, serving.
  3. The window, upper right: frame, mullions, curtain waves, a moon, two star ticks, the sill.
  4. The plant, on the floor at right: pot, three bezier stems, five leaves.
  5. The floor line, a tall standing figure at left, a small child right of the table, and a cat asleep mid-floor.
  6. The shelf with books, upper left: board, brackets, seven books (one leaning), a small vase.
  7. Hanging frames and a lamp: a mountain frame, a sea frame, a cord-hung lamp with shade and ray ticks.
  8. Grey wash only: three soft shadow strokes under the table, then the colophon in the bottom-right corner: three lines of pure handwriting gesture (seeded rises, falls and dots) plus an underline flourish. It is deliberately illegible; it renders no date and no letters, because the scribble is a gesture, not data.
- Paper texture is 260 precomputed seeded ink speckles drawn directly each frame (no offscreen canvas, no filters).
- House rules: canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas pinned in draw() via canvas.style.width/height in px; phone detection via window.screen (min dimension < 700px) with the aspect fallback (h > w*1.15); page ground is the paper color, so the sheet fills the frame on phones too.
- Determinism: frame one is drawn synchronously at load (resize → draw) at the fixed phase anchor PHASE0 = 0: the blank sheet, speckles, and the small lowercase "tap" hint in the bottom-right corner. No Date.now anywhere; the rAF loop is typeof-guarded and anchored as PHASE0 + elapsed-since-load, so the node-canvas QA renderer (no rAF) still produces the exact resting frame.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` from the actual script:
  - `qa-desktop.png` (1280×900): blank paper, faint seeded speckle, "tap" hint bottom-right. Nothing else, nothing clipped.
  - `qa-mobile.png` (390×844): same resting sheet, stage centered on the paper ground, hint visible at the right edge, nothing clipped.
  - `thumb.png` (720×720): the blank sheet with the hint, as the gallery will show it before anyone taps.
- Determinism gate: thumb.png rendered twice and byte-compared with cmp: identical. Second render deleted.
- Completed-scene check: a throwaway copy with the internal PRESET_ALL flag flipped true (opens with all eight passages drawn) was rendered at 1280×900 and 390×844, inspected, and deleted; the shipped file keeps PRESET_ALL = false. The completed room reads as one coherent crowded scene: shelf and books upper left, frames and lamp above the table, window with moon upper right, plant at right, figures seated/standing/child, cat asleep center floor, grey-wash shadow under the table and the illegible wash scribble in the bottom-right corner. On mobile the whole scene fits the 390 width with nothing clipped.
- Grep checks: zero `Date.now`, zero `http`, zero external references in index.html.

## Deviations

- Passage 8's "date scribble" is gesture strokes only, with no rendered date string or letterforms. Reason: the house rules forbid date strings in pieces, and the prompt itself frames the scribble as a closing hand gesture; illegible seeded scribble lines honor both.
- The "tap" hint disappears once the first passage starts rather than persisting. Reason: after the hand begins, the hint's job is done, and her sheets carry no standing instructions.
- Drag pans the whole sheet (drawing and speckle together) by up to ±70 stage units and the pan persists. Reason: the prompt's interface is "continue or look"; a persistent slight pan is the look, and the paper color is uniform so no edge ever shows.
- The grey wash is confined to passage 8 exactly as specced, which means the paper speckle is ink-only (some sibling pieces speckle in wash too). Reason: the prompt restricts wash to the final passage; the speckle follows the stricter reading.
- A PRESET_ALL constant (false) exists in the shipped file solely as the QA hook used for the completed-scene check. Reason: the QA renderer cannot tap, so a preset is the only way to visually verify the finished room; the flag ships false and no control in the piece can set it.
