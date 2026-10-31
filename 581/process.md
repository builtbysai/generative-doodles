# №581 — Qué Desorden

EXPANSION #70 maria-j-luque, prompt block 5 "La Mesa Llena" (TASKS.md codes the #70 blocks PP1–PP8 again; this is block 5).

## Concept

Her clutter doctrine as the piece itself: "Hay gente que ve una mesa llena de cosas y piensa 'qué desorden'. María Luque lo usa de inspiración." An empty tabletop seen from slightly above, and down the left margin her handwritten inventory with empty checkboxes. Nothing is on the table until the viewer asks, one tap at a time; each thing is drawn stroke by stroke in her thin-line economy, gets its grey-wash shadow and its handwritten label, and ticks its box in the margin. The clutter is never tidied into a grid: items sit at hand-placed, slightly overlapping spots, and once drawn they can be nudged around the tabletop, labels traveling with them. When all nine things are drawn, the table simply sits there, quietly complete; further taps do nothing.

The inventory, in draw order (labels verbatim, also the margin list):

1. la taza
2. los libros
3. la naranja
4. las tijeras
5. la planta
6. las llaves
7. el cuaderno
8. el lápiz
9. las gafas

## Construction

Single self-contained `index.html`, canvas 2D, no external assets. Stage is 1000×1000, scaled with `Math.min(viewW/1000, viewH/1000)` and centered; canvas sized from the Visual Viewport API with resize listeners on both `visualViewport` and `window`, and `canvas.style.width/height` pinned in px inside `draw()` every frame. Phone detection via `window.screen` (min dimension < 700px) with the aspect fallback (`h > w*1.15`); the square stage spans the full phone width and the page ground is the paper cream.

Palette, strict: ink #1A1A1A, paper cream #F4EEDC, grey wash #B9B4A6 (shadows, one book cover, the orange's shading arc), and exactly one accent, the mug red #C23B2E (la taza's body fill). Flat fills only, no gradients.

Each item is a list of seeded-jitter polylines (mulberry32, fixed seed 581070) with precomputed lengths. A tap off any drawn item starts the next item: strokes draw on by length budget over 0.55–1.5s, the wash shadow fades in first, fills (red mug, wash book) fade in past 72%, the handwritten label fades in past 80%, and on completion the margin checkbox ticks with a short stroke animation. Taps during a drawing stroke are ignored (her deliberate pace). A tap landing on an already-drawn item does nothing (it is reserved for dragging); dragging a drawn item nudges it, clamped to ±46 stage units, and its label and shadow travel with it. Paper texture is 240 precomputed seeded speckles drawn directly each frame (no offscreen canvas, no filters).

Determinism: frame one is the synchronous draw at load — the empty tabletop with the full handwritten checklist, all boxes unticked (the resting state; no auto-fill). No `Date.now()` anywhere; the rAF loop is `typeof`-guarded and anchored to elapsed time since load, so the node-canvas QA renderer (no rAF, no AudioContext, no `document.createElement`) draws the identical first frame.

Hint text: small lowercase "tap · drag", bottom-right, 45% alpha. No other in-piece text beyond the inventory labels.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280×900 (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png); all three read back and inspected.
- Desktop/thumb (resting state): empty trapezoid tabletop with apron edge filling the right of the frame; nine handwritten margin entries with unticked boxes, all legible; hint bottom-right.
- Mobile: the square stage spans the full 390px width; checklist and tabletop both fully visible, nothing clipped.
- Completed state verified with a throwaway all-items preset copy (state override appended, rendered 1280×900, deleted after): all nine items drawn at their cluttered spots with labels — red mug upper-left of the table, stack of three books (middle one wash-filled) top-center, orange with leaf and wash shading arc right, open scissors center, potted plant right, key ring with two keys bottom-right, spiral notebook bottom-center, pencil diagonal lower-left with its tip near the scissors, glasses bottom-left overlapping toward the notebook; all nine margin boxes ticked.
- Determinism gate: thumb.png rendered twice and `cmp` byte-compared — identical; second render deleted.

## Deviations

- No in-frame title: the prompt block fixes the scene as tabletop plus margin inventory, so "Qué Desorden" lives in the `<title>` and gallery entry only, keeping every word on the page hers (the nine labels) plus the hint. Reason: the block names no in-piece title text, unlike №573's prompt.
- The tabletop outline and its front apron line are part of the resting first frame rather than an inventory item. Reason: the brief's resting state is "the empty tabletop with the full handwritten checklist" — the table must already be there before the first tap.
- A tap on an already-drawn item does nothing instead of drawing the next item. Reason: the brief reserves item contact for dragging ("DRAG a drawn item = nudge it"); the tap-to-draw zone is everywhere else.
- Item spots, the orange's wash shading arc, and the books' wash cover are construction choices within the specced palette: the block names the items (mug, book stack, orange, scissors, plant, keys) and the register; the notebook, pencil, and glasses round out the nine from the brief's fixed item list. No item appears without its handwritten label, per the block's rule.
