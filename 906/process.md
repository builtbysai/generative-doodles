# No.906 — little flowfeilds

Study #111 simondavidryden, PP67 "The Little Field". Title ships verbatim, including the original misspelling of "flowfeilds".

## Concept

The opposite of the big vortex piece: ONE tiny flow field, small on purpose. A single disc, 25% of the smaller frame dimension, sits dead-center on a vast flat cream ground. Inside the disc, about 600 short streak agents circulate through a miniature seeded flow field, like a fingerprint or a tiny weather map. Each streak is colored by its local flow direction, mapped in three angle bands to indigo, mustard, and maroon, the only colors allowed. The smallness is the statement; the cream emptiness around the disc is the frame.

Interactions, kept quiet to match the piece:

- TAP reseeds the weather: the field cross-blends to a new seeded configuration over 2 s while a third of the agents redistribute, so the pattern dissolves and regrows rather than cutting.
- DRAG nudges the disc: it drifts a little toward the finger (capped at 4% of the frame) on a spring and settles back to center on release. It is shy.
- DOUBLE-TAP calls a second, smaller field (60% size) beside the first, upper-right, with its own agent pool and weather, for 8 s; it then shrinks and fades back into the main disc.

Sound starts only on the first gesture: a near-silent high shimmer (5.2 kHz sine, gain about 0.012 with a slow breathing LFO) and one soft glass tick on reseed, through a lazily created, typeof-guarded AudioContext. The piece renders complete in silence.

## Construction

- Single self-contained `index.html`, canvas 2D only. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas, no external assets, no visible text except `<title>`.
- Canvas size comes from the Visual Viewport API with resize listeners on both visualViewport and window; `draw()` pins `canvas.style.width/height` in px every frame. Phone detection uses `window.screen` (min dimension < 700px) with the `h > w*1.15` aspect fallback; phones run 420 main agents / 200 satellite agents instead of 600 / 300. Page ground is the cream palette tone at all sizes.
- Agent model: each disc holds agents in unit disc space. Velocity is built from two parts, both analytic: a unit tangential circulation around the disc center, and the curl of a stream function made of four summed sine terms with seeded frequencies, phases, and amplitudes (velocity = (dpsi/dy, -dpsi/dx), evaluated in closed form). The stream-function part is divergence-free, which keeps the agents spread across the disc instead of collapsing into the middle; the combined vector is normalized, so every agent moves at the same slow speed (0.22 disc-radii/s, with a gentle per-agent shimmer). Agents that cross the rim (or the singular center) respawn at a seeded uniform-random point inside the disc.
- The sim runs on a fixed timestep (1/60 s) from an rAF accumulator; all randomness comes from mulberry32 streams seeded per disc and per field. The disc rim is a flat disc of the edge tone at low alpha plus a thin rim stroke; streaks are clipped to the disc circle and drawn as short segments (half-length 0.03 disc radii) along each agent's current velocity, batched by color band.
- Reseed blends fields by vector-lerping the two fields' velocities over 2 s of sim time, with a mid-blend alpha dip on the streaks.
- The nudge offset is integrated in the fixed step as an exponential spring toward the drag target (zero when not dragging), capped at 4% of the smaller frame dimension.
- The satellite disc runs the same step/draw code with its own field and agent pool; its lifecycle (grow 0.6 s, hold 8 s, shrink 1 s) is timed on the sim clock, and its center rides the same nudge offset as the main disc.

## QA log

- Renderer: `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). Renders cleanly in silence (no AudioContext, no rAF in the harness; frame one is drawn synchronously).
- Determinism: pre-roll is 360 fixed steps (6 s of sim) run at init from the seeded streams; frame one is the synchronous draw of that pre-rolled state at sim time 0. No `Date.now()` anywhere; the only clock is the rAF accumulator after frame one. thumb.png rendered twice and `cmp` byte-compared identical; the duplicate was deleted. Re-verified after every fix round below.
- Fix round 1: the first build drew streaks as step-displacement segments, which read as scattered dots, and agents clumped mid-disc. Streaks were changed to fixed-length segments along the velocity direction.
- Fix round 2: the angle-offset field still pulled agents into a tight central spiral. The field was rebuilt as tangential circulation plus a stream-function curl (divergence-free), with uniform respawn across the whole disc; the final renders show fine circular streaks spread across the disc in all three colors, like a fingerprint weather map.
- Read-back: desktop and thumb show a vast cream ground with one small centered disc of indigo/mustard/maroon circular streaks and generous emptiness; mobile shows the same composition centered in the tall frame, disc intact, nothing clipped.

## Deviations

- Disc size is measured against the smaller frame dimension (diameter = 25% of min(w, h)) per the house light-ground/centered-piece rule, rather than 25% of frame width; on landscape frames the two coincide closely, and on portrait phones this keeps the disc whole and centered.
- The reseed's "dissolve and regrow" is a velocity-field cross-blend with an alpha dip plus partial agent redistribution, rather than a literal per-agent fade-out trail; the renderer has no offscreen buffer, and this reads the same at the disc's scale.
- No other deviations. Palette is exactly the five specced tones; no UI, no text beyond the title.
