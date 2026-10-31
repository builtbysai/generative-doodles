# No.721 Ribbon Weather

EXPANSION #88 okazzsp, prompt block 2 "Ribbon Weather" (verified verbatim from TASKS.md).

## Concept

Twenty-six circular nodes drift on black, joined to their nearest neighbours by thin translucent curved ribbons. The ribbons are filled bands, not lines: they bow sideways as they travel, swell and relax as their endpoints close and separate, and where they cross, the translucent palette tones stack into soft bright overlaps. Now and then the drifting web knots itself into a loose numeral-like or letter-like tangle, holds it for a moment, and dissolves back into weather. The web is the whole piece; there is no grid, no text, no faces on the nodes.

Interaction follows Hans's rethink rule: this piece is a system to disturb. Dragging pulls the nearest nodes toward the pointer and stretches their ribbons; release and the web settles back into its drift. A tap reseeds the node positions into a fresh epoch of wander phases. Nothing reloads.

## Construction

Single self-contained `index.html`, canvas 2D only, no external assets. Strict palette: background #050507; ribbons and nodes cycle through #FF4757, #FFC312, #12CBC4, #FDA7DF, #FFFFFF.

- Design space is 1000x1000 units, mapped full-bleed to the viewport with independent x/y scales, so the field fills phones edge to edge with nothing clipped.
- Canvas size comes from the Visual Viewport API with resize listeners on both visualViewport and window; draw() pins canvas.style.width/height in px every frame. Phone detection uses window.screen physical size (min dimension < 700px) with the aspect fallback h > w*1.15.
- Neighbours: each frame, every node's 3 nearest neighbours are computed from current positions; pairs are deduped and drawn in fixed index order so alpha stacking is stable.
- Ribbons: each pair is a quadratic bezier whose control point is offset perpendicular to the chord by sin(t * 0.55 + pair phase) * 0.16 * distance. The band is built by sampling the curve at 14 points and offsetting along the local perpendicular, with width tapering toward the ends. Full width runs about 6-14 design units: it scales up as the pair's distance shrinks and breathes slowly per pair. Ribbon alpha oscillates inside the specced 0.18-0.35 band. Nodes are drawn last, as small filled circles.

### Closed-form wander adaptation (deviation, with reason)

The prompt's technical approach is particle physics: velocity, mild attraction to centre, pairwise soft repulsion, integrated per frame. Integrated state cannot satisfy the series' determinism gate (frame one must be a synchronous draw at phase 0, and any frame must be recomputable without history). The physics is therefore realised as closed-form wander: each node's position is a pure function of local time, built from a seeded anchor, a slow linear drift (5-14 units/s), and two sine wobbles per axis (periods roughly 9-51 s). The visible behaviour (ceaseless drift, webs forming and dissolving, nodes roaming the whole field) is unchanged; only the mechanism differs.

Two sub-decisions inside that adaptation:

- Soft edge wrap is implemented as soft reflection: the raw wander coordinate is folded into [34, 966] with a triangle wave, so a node turns around at the edge instead of wrapping. A true wrap would teleport a node across the field for one frame and streak its ribbons across the whole canvas; reflection keeps every ribbon continuous. Nodes still roam the full field over time.
- Drag influence is not a force but a sum of recorded samples. Each pointer sample freezes the vector from the node's position at sample time to the pointer; at draw time the vector is weighted by a distance falloff (radius 300 units, squared) and an exponential decay (tau 1.5 s). A drag therefore leaves a wake of displacements that melts back into the drift, exactly the pull-and-settle the prompt asks for, while remaining a pure function of (samples, t).

### Node alpha (deviation, with reason)

Ribbons stay inside the specced alpha 0.18-0.35. Nodes are drawn at alpha 0.9, stronger than the ribbon band: at 0.35 the endpoints vanish under their own ribbons and the web loses its joints. The brief for this piece explicitly allowed stronger nodes for legibility; the deviation is confined to the node dots.

## QA log

Renderer: `node ~/workspace/tools/render-piece.js` (node-canvas; no rAF, no AudioContext, no document.createElement, no offscreen canvas, no ctx.filter, all guarded or absent in the code).

- qa-desktop.png (1280x900): 26 nodes spread edge to edge on #050507; curved translucent ribbons in all five tones; crossings stack brighter, most visibly the teal overlap at the central hub. No straight lines, no text.
- qa-mobile.png (390x844): field full-bleed in the tall frame, web intact, nothing clipped; corner nodes sit inside the frame thanks to the edge reflection margin.
- thumb.png (720x720): same composition at gallery size.
- Determinism: thumb rendered twice and compared with cmp: byte-identical. The second render was deleted. Frame one is the synchronous draw at wander phase 0 inside resize(); no Date.now anywhere (elapsed time comes from performance.now relative to load, and frame one never reads it).
- Static audit: grep over index.html finds no Date.now, no Math.random, no createElement, no gradients, no shadowBlur, no AudioContext, no external URLs, no em dashes. All randomness derives from mulberry32 seeded per epoch.
