# No.622 "Every Place, Its Colors"

EXPANSION #75 mariona-cabassa / theinvisiblecircle, prompt block 6 "Paleta de Viaje".

## Concept

Her travel palette journals as a place engine. A living sketchbook spread on paper: a column of rough-edged palette chips on the left, and four small studies (fox, bird, mushroom cluster, leaf sprig) on the right, painted in the current place's palette. No place is ever named in text; the colors say where you are. Places cycle in fixed order (New Orleans, high summer garden, early autumn, indigo night) and wrap around.

Interactions: double-tap travels to the next place behind a stepped wash of the incoming key color; dragging across the studies remixes them into a shuffled subset of the current palette slots; tapping a chip makes the studies lean into that color (their emphasis parts take it on and the chip swells slightly). Watch-only life: chips glisten on staggered phases, studies sway gently. The piece never reloads.

## Construction

Single self-contained canvas 2D page, no assets, no text anywhere (title only). Sizes come from the Visual Viewport API with resize listeners on both visualViewport and window; draw() pins canvas.style.width/height in px every frame. Phone detection via window.screen (min dimension < 700px) with the aspect fallback (h > w*1.15) only: on phones the spread stacks, chips as a horizontal row on top, studies in a 2x2 below.

Studies are fixed shape programs: every part carries a logical palette slot (0..4), and a per-place permutation maps slots onto that place's colors, so the same drawings re-skin per place. Remix shuffles the slot map with mulberry32 seeded by BASE_SEED + remix counter; lean is state, not randomness. All chip blob shapes, satellite dabs and details are precomputed from fixed mulberry32 seeds at load; nothing is derived from Date.now() or Math.random(). The rAF loop is typeof-guarded and anchored as elapsed-since-first-frame; frame one is the synchronous draw(0): New Orleans skin, sway phase 0.

Place data (exact palettes from the prompt):
1. New Orleans: #E87B9C / #6A9A5B / #C98A2E / #F2C14E / #12315E (perm 0,1,2,3,4)
2. Garden: #7A4E8C / #5C8A4D / #F2C14E / #E2725B / #F5F1E8 (perm 2,0,3,1,4)
3. Autumn: #8A5A33 / #C98A2E / #A63A2E / #5C6B3C / #F0E6D2 (perm 1,2,0,4,3)
4. Indigo night: #2B3A67 / #1A2440 / #4A5A8A / #F5F1E8, 4 chips (perm 0,2,1,3,3)

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). Desktop: five-chip column (pink, green, brass, yellow, deep blue) and the four studies in the New Orleans skin, paper margins all around, no text. Mobile: chips as a top row, studies stacked below, nothing clipped.
- Determinism: thumb.png rendered twice and cmp byte-compared, identical; second render deleted. Grep confirms zero Date.now / Math.random / createElement / AudioContext / ctx.filter.
- Fix round: the fox tail first sat detached from the body and read as a separate green blob; moved in to tuck behind the body. Mushroom stems moved from slot 4 to slot 2 after checking every slot against every place permutation: slot 4 resolves to the paper tone in the garden skin, which would have left the caps floating.
- Interactions are code-verified only (the QA renderer fires no pointer events): double-tap detection within 0.35s and 40px, wash swap at the sweep midpoint, drag remix fires once per drag inside the studies area, chip tap sets the lean.

## Deviations

- The prompt names four studies as "3-5 small sprigs/creatures (fox, bird, mushroom, leaf)"; built exactly those four in a loose 2x2.
- Indigo night carries 4 colors, so the chip column/row shows 4 chips there; the slot map wraps modulo the palette length so all five logical slots still resolve.
- No other deviations.
