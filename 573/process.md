# No.573 — Inventario de Mi Vida

EXPANSION #69 power-paola, prompt PP5 ("Inventario"). Title from the prompt's Title suggestion, verbatim: "Inventario de Mi Vida".

## Concept

Her inventory method as the piece itself. A room assembles from separately drawn inventory items, each one drawn stroke-by-stroke and labeled in her handwriting as it appears, while a handwritten checklist in the left margin ticks itself off. Nothing auto-plays: she draws deliberately, so does the piece. When the inventory completes, the room is a place, and it gently animates (the curtain moves, the cat's tail flicks). From her Remezcla quote in the prompt: "It was like an inventory of my life... I drew mountains, trees, extras, floors, architecture, objects, all kinds of things."

Inventory order (per the prompt: first the floor, then the walls, then each object): el piso, las paredes, la cama, la mesa, la planta, la ventana, el gato, mi ropa, mis zapatos.

Palette (PP5, verbatim, nothing else): ink black #1A1A1A, paper #F5F0E0, grey wash #A8A49A for shadows; one object in her pink #E86A9A.

Fixed points honored:
- Every item appears as its outline draws itself, stroke-by-stroke; no item appears without its handwritten label (labels quoted from PP5: "la cama", "la planta", "mis zapatos"; the rest in the same hand and register).
- Inventory list handwritten along the left margin, checking off as items appear.
- TAP = draw the next inventory item; when the inventory is complete, TAP toggles the gentle animation (curtain sway, cat tail flick). DRAG an item = move it slightly. Never click-to-reload.
- Centered room, isometric-ish flat (back wall, left wall sliver, floor in one-point falloff). No 3D, no photorealism.
- The gentle animation is only the two motions PP5 names: curtain moves, cat tail flicks.

## Construction

Single self-contained index.html, canvas 2D only, no external assets, no audio, no microphone.

- Each item is a set of precomputed polylines (seeded mulberry32 jitter, seed 573069, so the hand-drawn wobble is identical on every load). A tap starts the next item; its strokes reveal by path length over 0.55–1.5 s, its grey-wash shadow fades in first, its handwritten label fades in over the last fifth, and the margin checkbox ticks itself (0.3 s) on completion.
- The curtain is a paper-filled closed path whose points sway with a per-point weight (still at the rod, loose at the hem); the cat's tail is a polyline rotated around its base. Both are driven by an ambient phase that eases in/out with the completion toggle, so the room settles instead of snapping.
- Dragging: pointer down on a drawn furnishing picks it up; its offset is clamped to ±46 stage units so the room stays coherent. A press that does not move is a tap.
- Paper texture is 240 precomputed seeded speckles drawn directly each frame (no offscreen canvas, no filters).
- Canvas size comes from the Visual Viewport API with resize listeners on visualViewport and window; the canvas style width/height are pinned in px inside draw(). Phone detection via window.screen (min dimension < 700 px) with aspect fallback; the composition is centered, so it keeps its shape on phones and the page ground is the piece's own paper color.
- Determinism: the first frame is drawn synchronously at load at a constant phase (PHASE0 = 1.3, ambient amount 0). Nothing in frame one derives from Date.now() or elapsed time. The rAF loop is typeof-guarded and anchored to its first timestamp.

Deviations, with reasons:
1. First frame: PP5 forbids auto-play ("Do not auto-play the inventory; she draws deliberately, so does the piece"), so the piece opens on the unwritten page: the handwritten title and the full checklist with nothing checked and the room not yet drawn. That resting state is the fully composed synchronous first frame.
2. The one pink object: PP5 says "one object in her pink" without naming which. Her clothes on the chair (the dress) is the pink object, the most personal item in the inventory. Everything else stays ink, paper, and grey wash.
3. "mis zapatos" is the ninth inventory item: PP5 quotes it among her handwritten labels even though the object list in the visual description does not enumerate the shoes separately.
4. The floor and the walls (inventory items 1 and 2) cannot be dragged. They are the room's shell; dragging them would tear the room apart. PP5's "drag an item = move it slightly (the room is hers to arrange)" is honored for every furnishing: bed, table, plant, window, cat, clothes on the chair, shoes.
5. Handwriting: external fonts are not allowed in gallery pieces, so the hand is a cursive stack ("Segoe Print", "Bradley Hand", "Comic Sans MS", "Chalkboard SE", cursive) set italic, with a slight per-label rotation; labels are lowercase as quoted in PP5.
6. The framed drawing of mountains hanging on the back wall is part of the "las paredes" item, from the mountains in her Remezcla quote.
7. Sound: PP5 implies no sound or microphone input; the piece is completely silent. Nothing was omitted.
8. A small "tap · drag" hint sits in the lower margin, the gallery convention for interactive pieces.

## QA log

Renderer: ~/workspace/tools/render-piece.js (node-canvas; no rAF, no AudioContext, no document.createElement, no offscreen canvas).

- qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png (720x720): the first frame. Paper page, handwritten title "inventario de mi vida" with its underline squiggle, the full nine-item checklist unchecked in the left margin, subtle "tap · drag" hint. Nothing clipped on mobile; the square stage centers on the paper ground.
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. Second render deleted.
- Completed state verified with a throwaway patched copy (inventory pre-completed, ambient on, check start forced): all nine items drawn and labeled, all nine boxes checked, curtain hanging paper-filled over the left panes, the pink dress on the chair, no label collisions. Test copy kept out of the piece folder (in /tmp) and not shipped.
- Fixes during QA: the bed's headboard first read as a thin door panel, so it was widened and given two slats; the table overlapped the bed's right edge and was shifted right; the shoe profile was re-cut with an ankle dip so the pair reads as shoes; the checklist check state was refactored from a numeric sentinel to a null start time after a test patch exposed the ambiguity.
