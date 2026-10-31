# No.860 One Platform

Study #105 hsin-chien-huang, PP21 "Build-Your-Route" (the Ekholux track builder). Title suggestion shipped: "One Platform".

## Concept

The Ekholux promise, "BUILD. RIDE. ENJOY. Start with a single platform. Build it into your own insane route," reduced to a closed world in a black void. The piece opens on exactly one neon platform at left-center and one rider disc already riding it. The visitor's taps are the only architecture that ever appears: each tap lays one more fixed-length platform segment, and a small physics rider rolls, launches, and lands its way around whatever route accumulates. There is no game wrapped around it: no menus, no score, no sharing, no starfield. The void stays void; the route is the only light. When a circuit of the route completes, its path lingers as a faint deep-teal ghost under the live ride.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets. Strict five-tone palette: void #030304, platform neon #00E5FF, rider #FFD23F, trail #7A6A20, route ghost #1A3A40. The neon read is built from three layered strokes (wide low-alpha, mid, hairline core), never glow effects, gradients, shadowBlur, or filters. No visible text anywhere except the `<title>`.
- Layout from the Visual Viewport API with resize listeners on both `visualViewport` and `window`; the canvas backing store is DPR-scaled (capped at 2) and its CSS size is pinned in px inside `draw()` every frame. Phone detection uses the `window.screen` physical minimum dimension (< 700px) with the aspect fallback `H > W * 1.15`. A resize rescales the rider into the same relative spot and clears trail, path, and ghost.
- Coordinates: platforms are stored as center fractions of W and H plus an angle, with a fixed length of 0.24 * min(W, H); endpoints are derived per frame, so platforms hold their relative layout at any size.

### Rider physics

- The rider is a point with a radius (max(4px, 0.014 * S)) integrated in the rAF loop with a fixed timestep of 1/120 s and an accumulator (frame delta clamped at 60 ms), so physics speed is refresh-rate independent.
- Gravity is 0.95 * S px/s^2 downward. While the visitor drags, the gravity vector bends 68 percent toward the drag point: steering, not control. The rider is never teleported by a drag.
- Platform collision is circle-versus-segment: closest point on the segment, push-out along the contact normal, the into-surface velocity component removed, and a light rolling friction (0.25/s damping) while in contact. Gravity re-applied each substep gives natural rolling acceleration along tilted platforms and clean launches off their ends.
- Speed is bounded by the loop-back rules below rather than by a clamp, so launches stay physical.

### Loop-back rule (the closed world)

- The rider can never fall forever and never stall forever. It respawns on the last platform it touched, mid-platform, with a gentle entry velocity along the platform's direction, when any of these hold: it falls below the viewport (y > H + 50), leaves the sides by more than 90 px, rises above y < -140, or its speed stays under 0.012 * S for 2.2 s while not dragging.
- Contact memory: the last touched platform index is kept on every contact after air time, and respawn anchors there. On respawn the visited set resets to just the anchor platform.

### Circuit ghost

- Every frame position is recorded into a circuit path (capped at 3600 points). Touching platform 0 again after having visited another platform (or after a real airborne excursion) completes the circuit: the path is frozen as the ghost, drawn in #1A3A40 under the live scene, and a fresh path begins. A full tour of every platform also qualifies. The ghost is a memory of a ridden route, not a decoration; with one platform it takes a genuine launch and return to earn one.

### Interaction

- TAP places a platform: center snapped to a coarse 0.05 grid of W and H, fixed length, tilt drawn from a seeded mulberry32 stream in the range plus/minus 0.28 rad. Placement is capped at 24 platforms; taps past the cap are ignored. Tap detection defers placement by 290 ms so a double-tap can cancel it.
- DRAG (pointer held and moved past 10 px) is the gravity attractor described above.
- DOUBLE-TAP reseeds the whole world back to one platform and one waiting rider, and re-seeds the tilt stream.
- Sound starts only on the first pointer gesture: a lazily created, fully typeof-guarded AudioContext runs one quiet triangle oscillator whose frequency maps to rider speed (50 Hz at rest up to about 280 Hz), plus a soft square tick on hard platform contacts (impact-gated so rolling does not chatter). Everything degrades to silence where WebAudio is missing; the QA harness renders the piece in complete silence.

### Determinism

- Frame one is a hard gate: `layout()`, `resetWorld()`, and a synchronous `draw()` run at load with no rAF involved. The seeded initial state puts the rider at 64 percent along the single platform with velocity along its tangent (0.17 * S px/s toward the b end) and a 26-point trail laid behind it along the surface, so the first frame already shows a ride in progress. No `Date.now()` anywhere; the clock is `performance.now()` elapsed time, and physics advances only through the fixed-timestep loop from the seeded state plus recorded events.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png). The piece rendered cleanly in silence in the harness (no AudioContext, no rAF fired).
- Determinism: thumb.png rendered twice and compared with `cmp`: byte-identical. The duplicate was deleted.
- Read-backs: all three sizes show the black void, one cyan neon platform at left-center with a slight tilt, the yellow rider disc sitting on the platform at roughly two-thirds along it, and a short faint yellow-brown trail behind the rider along the platform surface. Nothing else in the frame, and nothing clipped on the mobile render; the platform sits at mid-height on the phone path with the rider fully visible.
- No fix rounds were needed.

## Deviations

- None from the brief's substance. Two recorded choices: (1) platform placement past the 24 cap is ignored rather than replacing the oldest user platform, so a built route is never silently edited; (2) the completed-circuit ghost keeps only the most recent circuit (a new completion replaces the old ghost), keeping the void readable as routes accumulate.
