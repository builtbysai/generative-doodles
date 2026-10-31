# No.695 "Umbilical" — process

## Concept

Cecilia Vicuña's ritual yarn connection (EXPANSION #84 ceciliavicuna, prompt block 7): in her performances she links audience members to each other with strands of yarn, making the audience itself the work. Here the web is built by whoever touches it. Each tap plants a small pale knot-point on a black field; the new point is tied with sagging red yarn to its two nearest neighbours only, so the web grows organically and never collapses into a complete-graph hairball. Dragging a knot stretches its strands, which sag deeper under the strain and settle back elastically. A double-tap dissolves the whole web into loose drifting threads and a fresh field begins. Left alone for thirty seconds, the piece starts planting knots by itself, slowly, until the next touch. The web is the audience; there is no other image, no text, no interface.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets. Strict four-colour palette: yarn red #A83232, yarn deep #6E1B1B, knot points #E8DDC8, background #0B0B0C. The only text is the `<title>`.
- Canvas size comes from the Visual Viewport API, with resize listeners on both `visualViewport` and `window`; `draw()` pins `canvas.style.width/height` in px every frame. Phone detection uses `window.screen` (min dimension < 700px), with the aspect rule (h > w*1.15) as fallback only. The field is full-bleed at every size.
- Seeded initial web (determinism adaptation): the prompt's field starts empty and grows purely by touch, but a gallery frame one must be a developed image. The piece therefore seeds an initial constellation of 8 knot-points at load (mulberry32 stream, minimum-separation rejection sampling inside a 0.13–0.87 field), connected by exactly the same two-nearest rule as touch-planted points, with strand birth times set before t=0 so the web hangs complete and sagging in frame one. Later epochs (after a double-tap) grow their strands in with a short stagger instead.
- Connection rule: every new point, however planted, connects to its two nearest existing points by anchor distance (aspect-corrected). Nothing else ever connects, which is what keeps the web sparse and readable at any population. Population is capped at 90 points.
- Sag-curve model: each strand is a quadratic Bézier whose control point sits below the chord midpoint by a sag proportional to strand length (0.15–0.26 of length, per-strand seeded factor), plus a small slow lateral sway term. Fibre is faked with three near-coincident stroke passes (deep red, yarn red, deep red) at low alpha, each with a slight perpendicular offset and a gentle along-length wobble. There is no integrated verlet state: every strand shape is a closed-form function of endpoint positions, per-strand seeds, and the anchored clock, so no frame, including frame one, can depend on simulation history.
- Points and sway: each knot-point is a pale filled circle with 2–3 partial red wrap arcs around it (the yarn turns). The whole web breathes on a slow global sway field (two long-period sine fields, per-point seeded phases, amplitude ~0.006 of the field).
- Drag and elastic lag: while a point is dragged, its rendered position follows the pointer sampled 0.12 s in the past (timestamped sample buffer), which reads as elastic lag; connected strands deepen their sag in proportion to the endpoint stretch. On release, the offset decays as a damped cosine (exp(-age/0.85) * cos(age*5.2)) back to the anchor. All of this is computed from recorded pointer events with anchored timestamps, never from accumulated state.
- Tap to plant: a press released within 0.3 s without moving plants a knot at the release point; its two strands grow in over ~1 s, the revealed fraction of the Bézier easing the strand into its sag.
- Double-tap reseed: a second tap within 0.35 s near the first dissolves the web: the old web is snapshotted with a seeded drift per point, its strands sag further (up to 3x) and fade over 1.8 s while the points drift apart; a fresh constellation for the next epoch (seed derived from the epoch counter) begins at +1.15 s. State is a function of reseed epoch plus seed throughout.
- Idle auto-planting: interaction timestamps are tracked on the anchored clock. After 30 s without interaction, one point plants itself every ~6 s at seeded wander positions (per-epoch, per-index mulberry32 streams; birth times are the scheduled times, so the behaviour does not depend on frame cadence), each connecting by the two-nearest rule, until the next touch resets the idle clock.
- Determinism: frame one is the synchronous `draw(0)` at load, a pure function of the seed. The animation clock is anchored elapsed time; the loop is driven only when `requestAnimationFrame` exists (typeof-guarded). No `Date.now`, no `Math.random`, no offscreen canvas, no `ctx.filter`, no audio, no microphone.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` (node-canvas harness; no rAF, no AudioContext, no `document.createElement` in that environment, and the piece runs clean there):
  - `qa-desktop.png` (1280x900): black field, 8 pale knot-points with red wrap rings, joined by sagging red yarn strands into a sparse draped web; nothing clipped.
  - `qa-mobile.png` (390x844): same constellation full-bleed on the tall frame, strands and knots legible, nothing clipped; phone rule engaged via `window.screen`.
  - `thumb.png` (720x720): the young web reads clearly at thumbnail size.
- Determinism gate: `thumb.png` rendered twice and compared with `cmp`: byte-identical. The second render was deleted.
- Listener check from the harness output confirms pointer handlers on the canvas and resize listeners on both window and visualViewport are registered, and no errors were thrown in the headless environment.

## Deviations

- Seeded initial constellation (see Construction): frame one shows a young 8-point web instead of the prompt's literally empty starting field, because the gallery requires a developed deterministic first frame. The growth-by-touch behaviour is otherwise exactly as specced, and post-reseed fields do start from nothing and grow in.
- Verlet strand midpoints replaced by closed-form sag curves (see Construction): an integrated rope simulation cannot guarantee a byte-identical frame one across renderers, which is a hard gate in this series. The visible behaviour (permanent sag, deepening under drag, elastic settle) is preserved; only the solver changed.
