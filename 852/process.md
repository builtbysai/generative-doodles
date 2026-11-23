# №852 The Miniature Bedroom

Driver: picking up a dollhouse and tipping it in your hands, watching the loose toys slide while the little figures hold their ground.

IA6 / PP1252, study #261 iso-attrill. A dollhouse-scale child's bedroom, visibly handmade: rumpled tiny bed, nightstand with a toy alarm clock, 90s toys scattered, a band of small figures that barely fit inside. Palette is muted, near-monochrome grey-blue with one warm practical light, the bedside lamp. The room fills the frame; the camera stays outside looking in.

## Motion and interaction

DRAG tilts the room. The whole set rotates as one rigid miniature (roll up to 0.09 rad, pitch up to 0.06 rad) while six loose toys, a striped ball, a toy car, three letter blocks, a rag doll, slide downhill with gravity, each with its own spring lag so heavier things trail. The five peg figures along the back wall shift a third as far and lean into the tilt but never leave the wall. A paper star-and-moon mobile swings against the tilt like a pendulum. On release the tilt springs back to the loop path: a slow 72 s sway, zero at FIRST_T. The lamp glow breathes on a 9 s cycle.

FIRST_T = 12 s into a 72 s cycle. Frame one is deterministic: all springs snap to their loop-tilt equilibrium at load, all tables are seeded (mulberry32, seed 852), no Math.random anywhere.

## What to avoid

Photorealism, a room at true scale, horror. Materials read as cardboard and fabric: flat fills, visible seams, hand-drawn poster and bunting.

## House rules

Visual Viewport sizing with resize on visualViewport and window; canvas pinned in draw() via canvas.style.width/height in px; phone detection via window.screen (min dimension under 700 px) with aspect fallback (h > w * 1.15); field-like composition, full-bleed on phones, square on desktop. One synchronous frame at load; every requestAnimationFrame call guarded by a typeof check. Canvas 2D only. No click-to-reload; drag only. No em dashes in visible copy.

## QA

Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three inspected. Caption (№852, 2004 · 05 · 12) top left and hint (Drag to tilt the room.) bottom center, no overlap or clipping at any size. Determinism check: two renders at t=12 byte-identical (md5 4443de57c59a9d68313473c71277e4a2), t=30 differs.

Drag probe (/tmp/probe852.js, node-canvas harness driving the pointer handlers): a 200 px right / 60 px down drag moved tilt roll to 0.089 rad, slid the ball 30 px, and changed 16.8% of pixels; after release the frame converged to within 0.7% of a loop-only frame at the same clock. All three checks PASS.

## Warts

The pillow reads as a plain white oval against the headboard slats at small sizes; acceptable, it is a pillow propped at the head end. On tall phones the window runs long and narrow, which suits a dollhouse window. The mobile star hangs in front of the window's top pane by design; the window moon was moved to the lower-left pane so the two never collide.
