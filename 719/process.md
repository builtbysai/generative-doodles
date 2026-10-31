# No.719 Paper Dance

EXPANSION #87 janine-antoni, prompt block 8 "Paper Dance" (verified verbatim from TASKS.md).

## Concept

Paper Dance restages Antoni's retrospective-as-performance as a small autonomous choreography on a dark gallery floor. Six to nine closed crates sit on a loose floor grid. A small abstract capsule figure, no human likeness, crosses the floor from crate to crate trailing a long ribbon of brown paper that wraps and tangles behind it. At each crate the figure pauses, the lid lifts over about a second, and a small glowing abstract work is revealed inside: a few seeded shapes in one of three muted primaries. When every crate has opened, the figure walks home, the works hold for a few seconds, then the lids close; across three cycles the works shuffle to different crates, so the same dance keeps revealing a different exhibition. The visitor gets light agency only: drag nudges the figure's path, tap opens the nearest closed crate early, double-tap reseeds the crate layout. Nothing reloads.

## Construction

Single self-contained index.html, canvas 2D only, palette restricted to the prompt's tones: floor #1B1B1F, crates #4A4238, figure #2A2A30, paper #C9BFAE, works in #B0463C, #3C6E8F, #C9A13C. No text anywhere except the document title.

Choreography as a precomputed schedule (the core adaptation): on each epoch seed (mulberry32), the piece generates a jittered 3x3 floor grid, keeps 6-9 cells as crates with a subtle perspective scale (crates higher on the floor are slightly smaller), computes a greedy nearest-neighbour visit order from the figure's home point, and builds a waypoint segment list: eased travel legs (smootherstep interpolation, duration from distance at a fixed pace), a 1.9 s pause in front of each crate during which its lid opens, a return leg home, a 3.2 s hold, and a 2.2 s closing phase. Figure position, heading, lid angles, glow strength and cycle phase are all pure functions of cycle time derived from that schedule. Works are seeded mini-compositions (3-4 shapes: circle, triangle, bar, diamond) whose crate assignment is a seeded permutation per cycle phase (0, 1, 2), which is what makes the works move between crates across the three cycles while the dance itself repeats.

Ribbon as a path window (in place of verlet): the prompt's trailing verlet strip is replaced by the path function itself. The ribbon at time t is the figure's scheduled path sampled over a trailing window (up to 34 s, reset at each cycle boundary), drawn as a segmented polyline whose width tapers from about 13 design units at the figure to 6.5 at the tail, with a thin floor-tone crease line down its centre. Because the path is a closed-form function of time, the ribbon is exactly reproducible at any instant, wraps and self-crosses naturally as the route doubles back between crates, and needs no integrated physics state. A 3.2 s approach segment before the home point gives frame one its short starter strip behind the resting figure.

Interaction as recorded events: drags are stored as {time, dx, dy} events; the figure and every ribbon point are displaced by an offset function evaluated at that point's own time (live drag applies in full, released drags decay exponentially over about 4.5 s), so a nudge bends the upcoming path and the paper trail together without breaking determinism. Taps are evaluated against the crate-open function at tap time and record an override {cycle, start time} for the nearest still-closed crate; overrides only apply inside their own cycle. A second tap within 0.4 s reseeds: epoch increments, epochT0 anchors at the tap, and layout, schedule, works and permutations regenerate. Lid state folds schedule, overrides and the closing phase into one crateOpen(crate, time) function used by both drawing and tap logic.

House rules honoured: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas.style.width/height pinned in px inside draw(); phone detection via window.screen physical size (min dimension < 700px) with the h > w*1.15 aspect fallback; rAF typeof-guarded; no audio; no Date.now or Math.random anywhere; no gradients, no shadowBlur, no offscreen canvas. The figure capsule gets a faint paper-tone rim at low alpha so the near-black body stays legible on the floor; the hue is from the specced palette.

Deviations: (1) the verlet ribbon is a path-window polyline, per the determinism gate, reasons above; (2) the figure's steering toward the nearest closed crate is resolved once per epoch into the seeded nearest-neighbour schedule rather than re-decided per frame, which is the same visible behaviour made deterministic; (3) crate lids are drawn as flat quads hinged on the back-top edge rather than true 3D rotation, keeping the piece in the series' flat projection.

## QA log

Rendered with node ~/workspace/tools/render-piece.js (node-canvas, no rAF, no AudioContext, no createElement):

- qa-desktop.png (1280x900): dark floor, nine closed crates on a loose 3x3 grid with lid quads and lid lines, capsule figure at bottom centre, short paper ribbon trailing to its lower left. Nothing clipped.
- qa-mobile.png (390x844): phone rule engaged via window.screen (390 < 700); the square composition letterboxes centred in the tall frame on the floor tone, all nine crates and the figure inside, nothing clipped.
- thumb.png (720x720): same frame-one composition at square size.
- Determinism: thumb rendered twice and cmp byte-compared identical; the duplicate was deleted. Frame one is the synchronous draw at cycle t=0 from the boot resize; the clock is anchored to performance.now only inside the rAF loop.
- Forced-state check via the piece's inert ?seed=tNN hook (scratch render in /tmp, read back, then deleted): at t=40 seven crates stand open with lids lifted and glowing red, gold and blue works revealed, two crates still closed, the ribbon wound across the floor between crates passing behind the boxes, and the figure mid-travel at the right edge.
- Grep audit of index.html: no Date.now, Math.random, createElement, gradient constructors, AudioContext, shadowBlur, external URLs, or em dashes.
