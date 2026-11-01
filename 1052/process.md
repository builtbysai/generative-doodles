# No.1052 "Position Is Wire Length"

Study #129 katsuhiko-harada, PP213 "The Wire Grid" (YASKAWA "motion", 2015): cubes flown on wires, position as wire length. The rig is the composition: the wires are never hidden, the cubes hang, and a handoff is a re-anchoring, never a teleport.

## Concept

A dark stage volume seen slightly from above. Along the top edge runs a ceiling rail with six anchor slots. Ten warm-white cubes hang in the volume, each suspended from TWO wires to two different slots, so twenty wires triangulate overhead at all times. The cubes glide between hanging positions on seeded schedules; as a cube moves, its wires visibly lengthen, shorten and angle, because each wire is drawn straight from its anchor to the cube every frame. Every ~13 s one cube is handed off: its second wire's anchor slides along the ceiling rail to a different slot over 2 s while the cube stays nearly still, the wire re-triangulating continuously, marked by a warm pulse at the cube. The piece is the rig thinking.

## Construction

- **Closed-form state.** Everything on screen is a pure function of piece time `t` over a seamless 65 s loop, plus recorded pointer events. Cube positions: each cube owns 4-6 seeded waypoints; its cycle is divided into equal legs, each leg 45% dwell (hanging still) then a smoothstep glide to the next waypoint. Wire 1's anchor slot is fixed per cube. Wire 2's anchor is a keyframed slot-float: a list of (time, slot) keys interpolated with smoothstep, so anchor slides are themselves closed-form.
- **Handoffs.** Five handoffs per loop, starting at t = 5, 18, 31, 44, 57 s, each 2 s long, each assigned to a distinct seeded cube. During a handoff the handed cube's second anchor slides to a new slot (never the fixed wire's slot, never its current slot) while the cube stays on its dwell/glide schedule, which is deliberately slow near those moments. A pulse envelope (sin over the slide, 0.6-amplitude decay for 1.2 s after) marks the cube in #FFE9B8, and the sliding wire takes the pulse tone while it moves. So the loop closes exactly, each handed cube's second anchor also makes one silent return slide at t = 61.5-63.5 s back to its starting slot, with no pulse: visually it reads as one more quiet re-tensioning before the loop restarts, and it guarantees t=0 and t=65 are the identical rig.
- **Wire lengths, honestly derived.** Cube position is primary; each wire's length is computed as the true Euclidean distance from anchor to cube on every draw and recorded. Those recorded lengths drive the audio: after the first visitor gesture, ten quiet sine voices are pitched by their cube's mean wire length (longer wire, lower string), and a soft two-note chime sounds as each handoff begins. Audio is lazily created inside the gesture and typeof-guarded throughout.
- **Frame one** is the synchronous draw at fixed T0 = 19 s: the t=18 handoff is exactly mid-slide (anchor halfway between slots, pulse at its peak), ten cubes hang at varied heights on twenty wires.
- **Interaction, event-sourced.** Dragging records throttled gust samples (time, position, delta); each cube's pendulum offset is the closed-form sum over samples of a decaying 1.7 s-period oscillation weighted by a Gaussian of the sample's distance to the cube, so the wires follow the swing and re-tension as it dies. A tap traces the nearest cube's wires at full brightness for 3 s. A double-tap reseeds the whole rig (new waypoints, anchors and handoff order) from a stepped seed.
- **House rules.** Canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas CSS size pinned in px inside draw(); phone detection via window.screen physical size (min dimension < 700 px) with the h > w*1.15 aspect fallback; no gradients (halos are layered flat-alpha squares), no shadowBlur, no ctx.filter, no offscreen canvas, no microphone, no visible text besides the title.

## QA log

- Rendered with render-piece.js at 1280x900 (desktop), 390x844 (mobile), 720x720 (thumb). Thumb rendered twice and byte-compared for determinism; see the build report for results and the read-backs of all three sizes.

## Deviations

- The silent return slide at 61.5-63.5 s (above) is an addition to the prompt's scheme: without it, each handed cube's second anchor would snap back to its starting slot at the loop wrap, which is exactly the teleport the prompt forbids. It carries no pulse and no chime, so it reads as rig maintenance, not a handoff.
- Wire lengths are derived from cube positions rather than the cubes being solved from wire lengths by inverse kinematics. On screen the two are indistinguishable (wires straight, taut, anchored), and the derived lengths are real: they are measured, recorded, and they tune the audio. Solving positions from lengths would add a constraint solver whose only visible effect would be occasional unsolvable frames.
- Cube glides use a smoothstep ease rather than constant velocity: hanging loads accelerate gently, and the prompt for this piece (unlike the trolley pieces) does not mandate machined constant-velocity motion.
