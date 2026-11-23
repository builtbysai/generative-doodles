# No.738 September Blues

EXPANSION #90 spencer-finch, prompt block 3. After his "Trying to Remember the Color of the Sky on That September Morning" (2014): 2,983 hand-painted blue squares, one for each victim, each a slightly different attempt at the same sky. This piece keeps the register quiet: a full-bleed field of blue tiles on warm paper, nothing else on the canvas, no text, no frame, no decoration.

## Concept

A grid of watercolor tiles, every one blue, every one a little different, the way memory of a single morning's sky comes back in 984 slightly different blues. The field does not perform. Once a minute a slow wet wave crosses it, tiles briefly deepening as if freshly painted, then drying back. A visitor can tap one tile and hold it wet for five seconds, looking at one square of sky a moment longer. That is the whole piece.

## Construction

- Palette is strict: six blues only (cerulean #3A7BD5, sky #7FB2E5, deep #1E4E8F, pale #BFD9F2, steel #5B7A9D, azure #2E86DE) on warm paper #EDE8DC. Paper grain is drawn in two shades of the same paper (#E0D8C4, #F5F1E5), so the grain adds no new hue.
- Tiles are precomputed once from a fixed mulberry32 seed (73800911), in row-major order, 1,152 of them, enough for the largest layout. The grid is fixed for the run's seed, like his; there is no reseed gesture.
- Hand-painted construction: no tile is a clean rect. Each tile is 4 overlapping brush strokes (a fifth on about 30 percent of tiles), each spanning most of the tile box with its edges landing a few percent inside or outside it, so the tile reads solid while its fill stays uneven and its edges show the brush. (An earlier pass let strokes shrink to a third of the box and the field read as confetti; the strokes were widened until the squares held.) Patch geometry is stored as fractions of the tile box, so any cell size redraws the same hand.
- Alpha-jitter approach: tone variation never comes from color math. Each patch is drawn in one of two palette tones assigned to the tile (its base blue and a second blue), at alpha 0.85 to 1.0, layered over the paper and over the neighbouring patches. Where layers stack, the blue deepens; where a patch stops short, paper-thin light shows at the edge. Every visible tone is one of the six blues at some layering, never a computed blend hue.
- Grid layout: full-bleed at every size, tiles kept near-square by choosing the cell side from the frame (desktop: side from sqrt(area / 984), so a wide frame lands near the prompt's 984-tile field; phones: side from width / 16, counts reduce proportionally). Paper gutters are 2 px, shrinking slightly on very small cells so the tiles keep their body.
- Wet wave: a closed-form sweep on a 60 s period. A diagonal front travels from just off the top-left to just off the bottom-right; each tile's wetness is a smoothstep envelope of its distance from the front, so the sweep enters, crosses, leaves, and the loop rests dry at the wrap point with no visible jump. Wet tiles are overlaid with the next deeper palette blue (pale to sky, sky to cerulean, cerulean to azure, steel to azure, azure to deep, deep stays deep) at partial alpha, with the patch pattern redrawn in that tone and a faint pooled edge, so saturation lifts and the hand shows more while wet, then dries back exactly.
- Tap: tapping a tile records the time; that tile holds wet for 5 s (0.4 s in, hold, 0.8 s dry-back). Frame state is a pure function of the fixed seed, the recorded taps, and elapsed time.
- Determinism: frame one is the synchronous draw at t = 0, the full quiet dry grid, sweep not yet arrived. Nothing is derived from a wall clock; elapsed time is only measured from load, and t = 0 is passed literally for the first frame.
- House rules: canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas style width and height pinned in px inside draw(); phone detection via window.screen minimum dimension under 700 px with the aspect fallback; requestAnimationFrame typeof-guarded; no offscreen canvas, no createElement, no audio, no gradients, no shadowBlur. Page ground is the piece's own paper tone.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- thumb.png rendered twice and byte-compared with cmp: identical. Duplicate deleted.
- Read-backs: desktop shows the full-bleed field of varied blue hand-painted tiles, paper gutters, uneven brush edges, subtle paper grain, no text, nothing clipped. Mobile keeps the full-bleed field at a reduced tile count, tiles still near-square, nothing clipped. Thumb shows the same quiet field at gallery size.
- Wet states are closed-form and were checked by the sweep and tap functions' construction (envelope is 0 at t = 0 across the field, so frame one is dry everywhere).

## Deviations

- Tile count: the prompt's 41x24 / 984 field is the desktop target, reached by sizing cells from the frame area; exact counts vary a little with aspect (a square 720 frame lands near 31x31) so tiles stay square rather than stretched. On phones the count reduces proportionally, per the phone house rule. Recorded because the literal 41x24 grid would draw noticeably rectangular tiles on non-41:24 frames.
- Paper grain uses two shades of the paper tone itself. The prompt allows paper-tone variation for grain; the two shades are the same hue family as the ground, introduced so the grain reads at all. No other color enters the piece.
