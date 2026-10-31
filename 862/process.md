# No.862 — Folded From Pixels

Study #105 hsin-chien-huang, PP23 "Thousand Cranes". After Huang's *A Thousand Cranes*: cranes folded not from paper but from pixels, carrying the same hope. Kept abstract and geometric on purpose — flat polygons with glowing crease patterns, no paper texture, no dove-of-peace iconography, and the cranes never land.

## Concept

A dark night sky, one flat pale moon disc upper-right, and a murmuration of about sixty origami cranes occupying the middle band. Each crane is a fixed crease-pattern polygon set (body diamond, neck and head, tail fan, two wings) filled near-black with neon teal crease-lines; roughly one crane in twenty carries a gold wing-tip. The flock banks and turns as one body. Every ~40 seconds a fold-pulse ripples through the flock: cranes fold themselves flat one after another and unfold again — the fold is the heartbeat of the piece.

Interactions: watch-only by default. Tap releases a new crane at the tap point, which unfolds into being and joins the flock. Drag is a wind gust the flock bends around, then settles. Double-tap reseeds the flock. Sound, only after the first gesture: a filtered-noise wing-rush whose swell tracks the flock's turn rate, and one soft paper-click when each fold-pulse begins.

## Construction

- **Crane model.** Local-space polygons drawn under translate/rotate to the crane's heading. A per-crane fold parameter f in [0,1] drives wing projection: wing tips sit at perpendicular offset proportional to spread, where spread = (0.22 + 0.78·wingbeat)·(1 − 0.92·f). f = 0 is wings spread in flight; f = 1 is folded flat against the body. Banking (from heading change rate) asymmetrically lifts the near/far wings. The gold wing-tip is a small gold polygon at the near wing tip, drawn only while that wing is reasonably spread.
- **Flock model.** Boids-lite at a fixed 1/60 s timestep in the rAF loop: cohesion, alignment and separation over neighbors within 0.16·U, plus a pull toward a shared banking target whose position is a closed-form sum of sines in simulation time (middle band only), soft frame bounds, and speed clamping. Initial state is seeded (mulberry32) as a coherent arc of cranes mid-bank with tangent velocities, so frame one already reads as one turning body. Frame one is the synchronous draw at t = 0 from that seeded state; nothing in the drawn state derives from a wall clock.
- **Fold-pulse model.** Pulses start at t = 14 s and every 40 s after. A seeded permutation fixed at seed time gives the visiting order; each crane's fold bump is a sin² envelope delayed by its rank (0.085 s per crane) over 2.4 s, fold → flat → open. Tap-born cranes also start folded (f = 1) and unfold over 1.4 s. Fold sources combine by max.
- **Gust model.** A drag records a gust point with a 0.45 s lifetime; cranes within 0.30·U are pushed radially away and slightly down, so the flock bends around the path and settles back through the normal flock forces.
- **Audio model.** Lazy AudioContext created inside the first pointerdown, all use typeof-guarded: a looped white-noise buffer through a bandpass whose gain and frequency follow the smoothed flock turn rate (the wing-rush), plus a 70 ms high-passed noise burst at 0.12 gain for the paper-click at each pulse start. Silent where no AudioContext exists (QA harness included).
- **House rules.** Visual Viewport sizing with resize listeners on visualViewport and window; canvas CSS size pinned in px inside draw(); phone detection via window.screen physical size (min dimension < 700 px) with aspect fallback; cranes scale up 1.25× on phones. Palette is exactly the five specced tones. No gradients, shadowBlur, ctx.filter, offscreen canvas, or visible text besides the title.

## QA log

- Rendered with `render-piece.js` at 1280×900 (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png). The harness has no rAF/AudioContext, so each render is exactly frame one, in silence.
- Determinism: thumb.png rendered twice and byte-compared with cmp — identical both times, including after the fix round below (duplicate deleted).
- Read-back: desktop and thumb show the pale moon disc upper-right and a loose flock of ~60 dark origami cranes with teal crease-lines banking as one turning body across the middle band; individual cranes at the flock's edge read clearly as folded birds, two gold wing-tips show on the right side, lower third is empty sky, nothing clipped. Mobile (390×844, phone path) holds the whole flock and moon in the tall frame, nothing clipped.
- Fix round: the first render packed the seeded arc too tightly (cranes merged into a spiky knot and clipped the right edge at 720 px) and the wing polygons were thin spikes. Rebuilt the wings as broad swept-back triangles, lengthened the body, shrank crane scale (0.0016 → 0.00105 of U), widened and clamped the initial arc; all renders redone and the byte-compare re-run green.

## Deviations

- The pulse visiting order is a seeded permutation of the flock rather than a spatial nearest-neighbor wave; it reads identically as a ripple through the body and stays a pure function of seed and sim time.
- Tap/double-tap disambiguation uses a 260 ms deferred tap: a single tap's crane appears a beat after the finger lifts, so a double-tap can reseed instead of releasing a crane first.
- Wing-rush audio gain is mapped from smoothed turn rate rather than raw per-frame banking, to keep the swell slow and barely-there like the prompt's "soft wing-rush".
