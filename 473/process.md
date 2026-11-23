# №1548 "Fifty-Two Weeks" (elissa-blount-moorhead EM5, PP795)

Gallery date: 2006 · 04 · 08. Study: elissa-blount-moorhead #204, network chain from arthur-jafa #203. Core engine: THE HOUSE THAT REMEMBERS.

## What it is

A grid of 52 small tiles (13 columns by 4 rows), each holding one tiny scene: a dot, a bar pair, a ring, a zigzag, or a pulse (scene per tile assigned once from a seeded stream, seed 1548000). Tiles fill with color one at a time, week by week, left to right, top to bottom; a filled tile keeps its scene but glows softly. When all 52 fill, the grid holds for a beat, then empties in reverse order, one tile at a time, and the year starts again. Colors shift slightly warmer as the year fills, cooler as it empties.

Palette (no other color): grid ground near-black #141210; empty tiles dark grey #26221e; filled tiles warm bone #d8cdb4, ochre #c98f3d, brick #a34a2e, gold #c9a86a rotating by tile index; emptying tiles fade to cool grey #4a4a52. Grid centered, even margins, tiles small and uniform; no tile larger than another. No numbers on tiles, no text anywhere except <title>.

## Loop (closed-form, 322 s)

- Fill: one tile every 3 s, each completing over 1.5 s (tile i completes at 3i + 1.5 s), 0–156 s.
- Hold: full grid holds 10 s, 156–166 s, tiles glowing softly (glow alpha oscillates on a 14 s sine; 14 divides 322, so the loop closes continuously).
- Empty: reverse order, one tile every 3 s over 1.5 s, 166–322 s (tile 51 empties first, tile 0 last).
- Warmth: each filled tile's color lerps toward a warmer variant by 0.35 × (filled count / 52), so the grid warms as it fills and cools as it empties.
- All state is a closed-form function of loop-local time and recorded drag events; frame one is draw(0).

## Interaction

- Dragging on an empty tile fills it early; the scheduled sequence continues in order from where it was, skipping the early-filled tile when it reaches it, so the order is never scrambled and all 52 still fill. (Reading: "the count continues from there" is realized as the count continuing to grow from the new total, not as a jump that would orphan earlier tiles.)
- Dragging on a filled tile dims it until released; it refills after release (if still in its filled period).
- Drag never fills the whole grid, never scrambles the order, never adds a tile.

## House adaptations

Canvas 2D only; fixed-phase first frame; rAF loop as a plain function declaration; Visual Viewport sizing with canvas pinned in draw(); phone detection via window.screen with aspect fallback (grid keeps its shape, page ground is the piece's own #141210); fully silent, no AudioContext; fading alphas rounded to 4 decimals; dots as single arcs / filled rects with moveTo before batched arcs; canvas state set explicitly in every draw branch; no gradients, no Path2D, no document.createElement, no localStorage, no offscreen canvas, no ctx.filter, no shadowBlur.

## QA

- Renders inspected personally: desktop 1280x720 and mobile 390 wide both show the exact 13x4 grid of small uniform tiles with even margins, one tiny scene per tile, no numbers, no text, no clipping. Mobile shows the grid centered on the tall screen with the piece's own near-black ground filling the frame.
- probe-1548.js: 27/27 pass (vm-isolated, real node-canvas, driving the piece's own rAF loop with a dummy anchor call). Frame one identical across fresh instances; loop closure byte-identical at t=322 and t=644; layout exactly 13x4, 52 tiles, uniform side 45 px at 720, even 7 px gaps; fill order strictly ascending 0–51 with each tile completing in its own 3 s window; hold full at t=160 and t=165.9; empty order strictly descending 51–0, all empty at t=321.9; filled tile keeps its dark scene glyph (176 dark scene pixels in tile 0) and glows into the gap; palette R rises 202 → 207 as fill count grows and falls 222 → 217 as the year empties; early drag fills tile 30 at once with the schedule continuing in order (count 8 at t=20, not 52); filled-tile drag dims to empty grey and refills on release; identical drag sequences byte-identical.
- Thumb byte-compare: two independent 720x720 renders byte-identical to the shipped thumb.
- Forbidden-API grep: 0 hits.

## Fix rounds

1. Piece fix (render harness collision): the first render failed because render-piece.js declares top-level `W`/`H` and the script's globals collided in the eval scope. The piece's globals were renamed to VW/VH; no behavior change.
2. Piece fix (scene visibility): the first scene pass drew the scene in the face color on top of the face, making it invisible. Scenes are now drawn in a contrasting tone chosen from face luminance: dark #141210 on light faces, the tile's own color at 0.9 alpha on dark faces, 0.3 alpha while dimmed.
3. Probe-side correction only: the scene check first sampled the exact tile center, which misses bar-pair and zigzag glyphs; it now counts dark scene pixels inside the tile rect. No piece change.

## Deviations from the prompt

None beyond the documented house-rule adaptations and the two readings recorded above (early-fill count continuation; scene tone chosen from face luminance so the glyph stays visible in every state).
