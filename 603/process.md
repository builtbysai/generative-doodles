# No.603 — Walk Into the Garden

EXPANSION #73 paz-tamburrini, prompt block 3 "Túnel de Papel". Her tunnel book as a dolly shot: six nested cut-paper frames of the Los Hugos garden, and looking through the tunnel is the piece.

## Concept

A tunnel book is a built object: a fixed stack of cut-paper layers that you peer through. The piece keeps that contract exactly. There are six layers, in a fixed order, and they never rearrange. Depth is honest — separation comes only from scale and from the soft contact shadow each frame throws onto the layers behind it. No fog, no blur, no infinite zoom: drag up and you walk in until the walk ends at the perforated moon on the back wall.

Interaction follows her paper-engineering primitives. A vertical drag is the dolly (up = in, down = back out), settling lands on stepped stops in her stopmotion grammar, and tapping any frame lifts that sheet toward you for a beat before it settles back into the stack. Left alone, the dolly breathes slowly in its first third, as if the book were being held by someone patient.

## Construction

Single self-contained `index.html`, canvas 2D, no external assets. A 1000-unit square stage is fitted to the Visual Viewport (listeners on both `visualViewport` and `window`); the canvas CSS size is pinned in px inside `draw()` every frame. Phone detection uses `window.screen` (min dimension < 700px) with the `h > w*1.15` aspect fallback; the stage spans the phone's full width and the page ground outside it is the paper gray.

The six layers, nearest to deepest, each drawn as an even-odd frame path (outer sheet minus a rounded window) in its own center-anchored scale transform, back wall first:

1. **Foreground ferns** — sage sheet; ink fern fronds anchored along the side and bottom band reach into the opening, sage fronds behind them.
2. **Tall ferns and curling stems** — peach sheet; taller sage fronds and ink spiral curls at the corners.
3. **Seed pods** — paper-gray sheet; four peach pods hang from the top window edge, perforated with navy dot patterns and one punched gray hole each, swaying gently. They flank the moon rather than covering it.
4. **Leafy arch** — sage sheet; a row of ink leaves arcs along the top window edge, with two smaller peach pods at the corners.
5. **The elephants** — paper-gray sheet with small navy stars on its band; inside its window stand the black elephant and its smaller pale-blue companion (the only blue in the piece), flat silhouettes with a gray ear cut as the single detail, soft contact shadows underfoot.
6. **Back wall** — solid paper-gray sheet: a sage ground strip the elephants stand on, scattered navy and peach stars, and the perforated moon — a peach disc with a navy rim and punched gray holes.

Dolly: a parameter `d` in [0,1]. Each layer scales by `1 + d * p` with `p` falling with depth (0.85 nearest to 0.18 for the back wall), so near sheets grow and slide outward faster than deep ones — true parallax with no rearrangement. At `d = 1` the near frames have left the stage entirely and the walk ends at the moon. Frame one is drawn synchronously at the fixed shallow `d = 0.18`. While a settle animation runs, the displayed `d` is quantized to 1/24 steps; otherwise to 1/72, giving motion a faint held-frame step. All speckle, star, perforation, and frond detail is precomputed at load from a mulberry32 seeded RNG (seed 603073); nothing random is generated during `draw()`. The animation loop is anchored as fixed offset + elapsed-since-load and `requestAnimationFrame` is `typeof`-guarded. Shadows are flat translucent shapes; no `ctx.filter`, no offscreen canvas, no `document.createElement`, no `Date.now` anywhere.

Palette is strict: sage `#A8B89A`, peach `#E8C4A8`, paper gray `#D8D5CC`, ink `#1A1A1A`, pale blue `#A8C4D4` (companion only), navy `#2B4A6F` (pod perforations, band stars, moon rim). The only text is the small lowercase "drag · tap" hint at bottom center.

## QA log

Renderer: `node ~/workspace/tools/render-piece.js index.html <W> <H> <out.png>` (node-canvas shim; no rAF, no pointer events, so interaction paths were verified by code inspection and the resting frame by render).

- Pass 1 renders (1280x900, 390x844, 720x720): tunnel read well and the elephants and moon were clear, but the nearest sage frame was scaled almost entirely off-stage at the resting dolly, the layer-3 pods hung down over the moon's face, and the frames painted over the letterbox because their outer sheets exceed the stage.
- Fixes: parallax factors rebalanced (0.85 → 0.18 across the stack) and window sizes re-nested so all six frames show a band at rest; pods shortened, reduced to four, and moved to flank the moon; the layer-4 arch leaves shrunk and its center pod removed in favor of two corner pods; fern leaflets widened so they read as leaves rather than thorns; the stage is now clipped to its square so the ground outside stays paper gray; the hint moved to bottom center, clear of the corner fronds.
- Pass 2 renders re-inspected at all three sizes: six receding frames readable at rest, elephant pair standing on the sage ground deep inside, perforated moon clear behind them, pods and arch framing the top, nothing clipped on mobile.
- Determinism gate: `thumb.png` rendered twice at 720x720 and `cmp` byte-compared — identical (verified after each fix round; the duplicate render was deleted). Frame one is the synchronous `draw(0)` at fixed `d = 0.18` with zero lifts and zero sway phase.

## Deviations

- **Gentler parallax than a literal dolly.** True photographic dolly factors pushed the nearest frame off-stage at rest, contradicting the brief's own frame-one requirement that all six layers read. Factors were rebalanced so the stack reads at rest and the walk still ends at the moon. Recorded here per house rule.
- **Moon perforations are filled dots, not holes.** A canvas layer cannot punch through to anything behind the back wall, so the perforations are drawn as paper-gray dots on the peach disc — the flat read of punched paper.
- **Elephant ears in wall gray.** The silhouettes are otherwise unbroken flat color; the gray ear is the one detail cut, needed for the pair to read as elephants at tunnel depth rather than blobs.
- **Hint placement.** "drag · tap" sits at bottom center instead of a corner, because her foreground ferns occupy all four corners at rest.
