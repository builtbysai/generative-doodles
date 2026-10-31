# No.681 "Mapocho Course"

EXPANSION #83 lachimuchina, prompt block 1 "Mapocho Course" (verified verbatim from TASKS.md).

## Concept

La Chimuchina's river-course composition: in the ensemble's "Mapocho" the music is scored along the geography, source to mouth, and everything changes with position along the water. This piece binds every visual parameter to one course parameter t in [0,1] along a diagonal river that runs from the high Andes (upper-left corner) to the city and the sea (lower-right corner).

At the headwaters only a handful of bright, quick, crystalline agents move: short darting line segments in snow water and headwater blue. Mid-course they become stone-toned arcs that clump and turn. By the mouth the channel is crowded with heavy, dark, slow swirling disks in estuary slate. The banks change with the same parameter: snow-blue cliffs with pale snow ticks at the source, ochre urban blocks in a haze band mid-course, flat slate at the estuary. No agent is larger, brighter, or more important than any other in its zone; there is no hero, no boat, no label, no text.

The piece is watch-only at base. Dragging across the water is a stone dropped in the river: a vortex forms where the gesture lands, swirls the nearby agents around its center, and travels downstream as it decays, with a thin expanding ring marking the disturbance.

## Construction

Single self-contained `index.html`, canvas 2D, no external assets, no audio, no microphone. Strict seven-color palette: snow water #DCEBF2, headwater blue #5B8FA6, mid-river stone #8A7F6A, urban block #B0682E, city haze #6E6E66, estuary slate #2B3538, night channel #10181A (also the page ground).

Course parameterization. The river spine is a Catmull-Rom spline through nine authored waypoints, resampled uniformly by arc length into a 601-point table; the table fraction is the course parameter t, and each sample carries a tangent and a left normal. Channel half-width grows downstream (0.016 to 0.054 composition units). Banks are three bands per side drawn as per-segment quads between ridge levels; level 0 is the channel edge itself, levels 1-3 carry seeded sine-noise ridges that flatten out in the estuary. Zone colors are weighted mixes over t (headwater weights fade out over t 0.28-0.44, estuary fades in over 0.72-0.88), computed in [r,g,b] array space. Urban texture is 54 seeded rectangles on the mid-course banks; headwater cliffs carry 44 seeded snow ticks. The water is two nested quad strips (a night-tinted full width and a 62% core in the course water color), plus 24 phase-driven surface streaks that run 1.5x faster than the agents.

Flow and agent morphs. Agent course speed is v(s) = 0.008 + 0.05(1-s)^2, fast at the source, slow at the mouth. A travel-time table TAU(s) = integral of ds/v(s) (full traverse about 59.5 s) converts each agent's uniform travel phase into a course position, so the steady-state density is proportional to 1/v by construction: sparse at the source, crowded at the mouth, already true in frame one. Ninety agents carry seeded lateral berths, mid-course lanes, spins, and sizes. The glyph crossfades with s: a darting segment (weight 1 below s 0.30, out by 0.44) with a bright head dot and a quick tangential jitter; a rotating stone arc (the middle weight) whose lateral berth is pulled 55% toward one of three seeded lanes, which is what makes the mid-course read as clumping; a filled slate disk (in from s 0.64-0.80) with a slow orbital swirl and a faint stone rim arc. Agents fade in at the source and out at the mouth. A global breath (48 s sine) modulates agent alpha between 0.80 and 1.00.

Interaction. Pointer down/move records vortices with the anchored elapsed time of the gesture (throttled to one per 0.10 s, capped at 24). A vortex sits at the pointer's projected course position, advances downstream at 0.028 course units per second, and lives 4 s. Agent displacement is a rotation of the agent's offset from the vortex center, with angle peaked at mid-life and falling with distance (radius 0.10): a pure function of time and the recorded gesture history. A thin snow-water ring expands at each active vortex. There is no click or tap action and nothing reloads.

House rules. Canvas size comes from the Visual Viewport API with resize listeners on visualViewport and window; canvas.style.width/height are pinned in px inside draw(). Phone detection uses window.screen physical size (min dimension < 700px) with the aspect fallback; the square composition letterboxes on the night-channel ground and the diagonal refits the phone frame. Seeded RNG only (mulberry32, base seed 681001). The animation loop is typeof-guarded on requestAnimationFrame.

Determinism. Frame one is an explicit synchronous draw at t = 0. Agent and streak positions are pure functions of the anchored elapsed time (performance.now minus a load anchor), so frame one never depends on a wall clock; no Date call appears anywhere in the logic.

Deviations. (1) The flow is evaluated as a pure function of time via the travel-time table rather than integrated with a fixed-dt simulator. Reason: it makes every frame, including headless forced-time renders (?seed=tN QA hook), exactly reproducible, keeps frame one identical by construction, and the density gradient is exact instead of emergent. Drag disturbance enters through timestamped records evaluated inside the same function, so interactivity stays deterministic too. (2) The seamless loop is per-agent: each agent cycles the full course on the shared 59.5 s travel period with staggered phases, and the field is statistically steady, so there is no global cut point; the "master phase" of the prompt is realized as this shared travel clock plus the 48 s breath.

## QA log

Rendered with node ~/workspace/tools/render-piece.js (node-canvas harness, no rAF, no audio):

- qa-desktop.png (1280x900): diagonal S river from the upper-left to the lower-right corner; snow-blue cliff banks and a bright blue channel at the source with a handful of pale dart ticks and streak dots; stone mid-channel; ochre urban banks with block texture either side; slate estuary; dark disk crowd thickening all the way into the lower-right corner. Nothing clipped.
- thumb.png (720x720): same composition at gallery size; zone sequence reads clearly; banks meet the water with no gaps.
- qa-mobile.png (390x844): composition letterboxed on the night ground, phone detection engaged via window.screen; the full diagonal, all zones, and the mouth crowd are in frame, nothing clipped.
- Determinism: thumb.png rendered twice and compared with cmp: byte-identical. Second render deleted.
- Forced-time check: a ?seed=t30 render (deleted after inspection) shows the flow developed at 30 s, agent crowd redistributed downstream, banks unchanged, confirming the pure-function flow animates as designed.
- Fix rounds during QA: (a) the ridge table initially had no level-3 entry per side and threw; table extended to four levels per side. (b) Zone colors were first mixed by re-parsing rgb() strings as hex, which produced invalid fills and invisible banks and water; all chained mixes now happen in [r,g,b] array space. (c) The first authored course hooked back on itself at the source and its wide banks folded and sat off-center; the course was re-authored as a gentler diagonal S and the band width narrowed from 0.042 to 0.034. (d) Ridge noise on the innermost bank level opened night-colored gaps between bank and water on bends; level 0 is now exactly the channel edge and noise lives only on outer levels.
- Compliance sweep: no Date.now or Math.random calls (one prose comment names the determinism rule), no createElement, no AudioContext, no external URLs, no em dashes, no visible text besides the title.
