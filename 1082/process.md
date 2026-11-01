# №1082 — The Monolith Flock

Tatsuya Ishii study block TI3 (Syn's moving-trolley monoliths). Watch-only; no interaction, no audio, no text.

## What it is

Eight tall white monoliths (2:4 slabs) drift across a warm paper-white gallery in slow formation, replaying a route preprogrammed in an invisible CG viewport. White on white, held architectural by edge-shaded side faces, thin outline strokes, and flat floor shadows. One monolith (rank 4) carries the IR camera's mark: a single faint cyan scan-line at 0.15 alpha.

## How it works

- **Route, not simulation.** A closed Catmull-Rom spline through eight fixed waypoints is precomputed once at load into a dense sample table with cumulative arc lengths. Every monolith position is a closed-form function of loop time: the leader walks the route at constant speed (full circuit per 60 s loop); each follower samples the route at the leader's distance minus its own trail offset — follow-the-leader, never free wandering, no boids randomness anywhere.
- **Formations.** Three configurations — column (tight trail, scale receding 1.22 → 0.62), arc (wide perpendicular fan, middle ranks lagging, scale peaking at center), staggered (alternating ±0.075 perpendicular offsets). Each 20 s block holds one configuration and blends to the next with a smoothstep over its final 3 s, so reconfigurations are eased and the 60 s loop is seamless (configuration cycle and route cycle close together).
- **Rendering.** Each monolith is drawn as a front face (#F7F6F2, thin #C9C7C1 outline), a side face in edge tone (#D9D7D1) whose width and side follow the route heading, a slight heading lean, and a skewed flat floor shadow (#D4D2CC at 0.4) that scales with its height. Painter order is by scale, far to near. No gradients, no shadowBlur, no filters, no offscreen canvas — flat shapes only.
- **House rules.** Canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas CSS size pinned in draw; phone detection via window.screen minimum dimension < 700 px with the aspect fallback; ground full-bleed including the page background, with a small scale boost on phones. First frame is drawn synchronously at the fixed phase t = 45 s (staggered configuration, the file spread diagonally with the scan-line visible); the rAF loop, guarded by a typeof check, continues from that phase plus elapsed time.

## QA

- Rendered with the house node-canvas renderer at 1280×800, 390×844, and 720×720.
- thumb.png rendered twice and compared with cmp: byte-identical.
- Frame one: warm paper-white ground; eight white monoliths with visible edge shading and floor shadows in a loose receding diagonal file; the faint cyan scan-line on one center-right monolith; generous pale negative space; nothing clipped at any size.
