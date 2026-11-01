# No.975 — Emergency Level

Study #119 (kyle-mcdonald), PP136 "Apocalypse Early Warning System": baseline deviation as oracle.

## Concept

A dark radar scope watches a generic world: five abstract city dots, eight historical flight routes drawn as faint arcs, and seven amber jets flying them. The system has only one sense: how far each jet currently sits from its own historical baseline. When a jet's path drifts beyond threshold, its trail flares red and a tick is logged in a ledger beside the gauge. The gauge — a vertical 1–5 meter at the right edge, read purely by needle position against five tick zones, no digits, no text — is the protagonist and the whole message. A smoothed mass of recent deviations drives it, so it breathes: climbing as deviations cluster, relaxing as traffic normalizes. Sustained level 5 pulses the scope rim red and puts every trail on alert. The oracle never explains; it only reports the number.

## Construction

- **Sim**: fixed-timestep 120 Hz. Jet positions are closed-form: each jet ping-pongs along its route's quadratic arc with a seeded one-way duration (34–64 s) and phase. Deviation episodes are seeded per jet (start, duration 6–14 s, amplitude 0.05–0.105 scope units, sign) with a sin² envelope, applied perpendicular to the arc tangent. Threshold is 0.04 scope units.
- **Gauge model**: each step, mass += (sum over jets of excess deviation beyond threshold) × GAIN × dt, then mass decays with tau = 9 s. Level = 1 + 4 × clamp(mass, 0, 1). Rising-edge crossings over threshold log a ledger tick (fades over 60 s). Level ≥ 4.85 sustained for 1.2 s triggers a 4 s alert (red rim pulse, brighter trails).
- **World gen**: mulberry32 streams. Five cities rejection-sampled inside radius 0.8 with min separation 0.45; eight ordered routes chosen from city pairs farther than 0.55 apart, each with a seeded perpendicular control-point offset. Frame-one seed is the specced 975136 — no seed scan was needed: with GAUGE_GAIN tuned to 2.0, frame one lands at level ≈ 3.0 (needle just above the level-3 tick), mid-watch with one jet deviating, nine ledger ticks logged.
- **Determinism**: frame one is the synchronous draw after exactly 3600 pre-roll steps from seed 975136. Events (taps, drags, reseeds) are timestamped with sim time and consumed in step order inside the step loop.
- **Scope/sweep**: five range rings, sweep rotating at 12 s/revolution; the wedge is 16 layered flat-alpha sectors behind the line (no gradients anywhere). At t = 30 s the sweep rests at the 9 o'clock position in frame one.
- **Interaction**: tap a jet (26 px hit test) flags it suspect — red trail for 30 s and a mass nudge of +0.12. Drag finds the route whose arc is nearest the drag path and replaces its baseline with a quadratic through the route endpoints and the drag midpoint (control point solved so the curve passes through the midpoint) for 60 s; jets on that route stop contributing mass and ticks while the override lasts — the goalposts move. Double-tap reseeds the watch (LCG-advanced seed), gauge reset.
- **Audio**: lazy, typeof-guarded WebAudio started on first pointerdown. A very low 52 Hz bed; a soft 920 Hz ping when the sweep crosses a city's angle; a triangle blip pitched by deviation size when a tick is logged; a rising tone when the needle crosses into a higher zone; a three-pulse low klaxon at alert. Silent in QA renders.
- **House rules**: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas.style.width/height pinned in px every draw; phone detection via window.screen min dimension < 700 px with aspect fallback; on phones the scope centers in the area left of the gauge, which stays at the right edge. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas, no visible text except the title.

## QA log

- Rendered with render-piece.js at 1280×900 (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png). All render cleanly in silence.
- Determinism: thumb.png rendered twice, `cmp` byte-identical; duplicate deleted. Re-verified after the tuning fix round below.
- Desktop frame one: dark scope, five rings plus rim, cyan sweep line pointing left with the faint wedge trailing below it, five city dots with halo rings, eight faint baseline arcs, seven amber triangles with short fading trails (one flaring red at right-middle, a second small red hook near center), nine red ledger ticks, gauge needle at level ≈ 3.0 with the red top zone visible and the amber fill column below the needle.
- Mobile frame one: scope fits the 390 px width whole, gauge/ledger/needle legible at the right edge, nothing clipped.
- Fix round 1: (a) the red level-5 wash was drawn before the gauge track and got covered — reordered so the wash sits over the track; (b) GAUGE_GAIN raised 1.2 → 2.0 after the first render showed the needle at ≈ 2.15, below the specced 2.5–3.5 breathing band — now ≈ 3.0; (c) trails lengthened (sample every 2 steps, 150 samples ≈ 2.5 s) and jet one-way durations shortened (34–64 s) so trails read as short streaks rather than stubs; (d) sweep wedge alpha raised (peak 0.028 → 0.055) so the wedge reads against the near-black ground.

## Deviations

- **Gauge fill column**: the track below the needle is filled amber at 0.26 alpha so the needle's height reads at a glance; the prompt specifies the needle and zones only, and the fill is the same amber at low alpha, no new element or color.
- **Alert trail treatment**: at level 5 the trails do not change hue (amber is already the jets' alert-adjacent color); instead trail line width increases and the scope rim pulses red, which carries the alarm without inventing a new trail color.
- **Drag baseline simplification**: per the brief's own allowance, the visitor's arc is reduced to a quadratic through the route's endpoints and the drag path's midpoint, not a freehand polyline.
