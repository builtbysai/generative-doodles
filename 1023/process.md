# No.1023 — The Blade, Sensed

Study #125 yuta-asai, PP184 "Piste" (Fencing Visualized hardware engineering, All Japan Championships 2018–19). The bout as data: the fight, instrumented — not a broadcast.

## Concept

A dark piste floats in a black void. Two white wireframe fencers duel on it, but the athletes are not the subject: the sensing is. Every blade tip is tracked by a white detection bracket that rides where the tip was a fraction of a second ago, and leaves a cyan sensor trail — the tip's true recorded path for the last three seconds, crossed by small data ticks. When a touch lands, the hit is digitized as a burst of cyan/red macroblocks, and the score grows as amber bar segments along the top of the frame. The score is never a digit. At the ends of the strip, dark sensor rigs blink their green lights: the iron that sees.

## Construction

- **Sim.** Fixed-step 120 Hz simulation; frame one is the synchronous draw after exactly 1,560 pre-roll steps (13 s), so the bout is already mid-exchange with trails laid down and the score at 2–4. All state is seeded (mulberry32); no wall clock feeds any drawn state.
- **Bout director.** A seeded state machine cycles fence → lunge → recover. In fence, both fencers bounce around their home marks with arm and lean eased to en-garde. A lunge drives the attacker toward the opponent with arm extension and lean as eased functions of phase progress. Roots integrate with damping, a minimum-separation push keeps the pair apart, and positions clamp to the strip.
- **Poses.** Each fencer is an analytic skeleton (hip, neck, head, knees, feet, shoulder, elbow, hand, blade tip, rear arm) computed from root position, crouch, lean, and arm extension. Facing is `-side`, so blades always point at the opponent.
- **Sensing model.** The tip position is pushed into a 360-sample ring buffer (3 s at 120 Hz) every step. The trail renders that buffer as an age-faded polyline with a vertical data tick every 12 samples. The detection bracket is drawn at the tip position from 16 steps earlier — the lag is the recorded history, not a cosmetic offset. A touch is detected in-sim during the lunge (tip reach against the opponent's guard zone, with a seeded fall-back so exchanges resolve) and calls `registerTouch`, which increments the scorer's segment count, flashes the victim's guard ring, spawns a seeded macroblock burst at the tip, and queues the hit/score audio cues.
- **Score bars.** Fencer A's segments grow from the top-left, fencer B's from the top-right; segments are plain rectangles. No text or digits are drawn anywhere in the piece.
- **Rigs.** Two dark boxes at the strip ends, each with three lights blinking on seeded sine phases.
- **Interaction.** Dragging records timestamped disturbance samples; trail points near a sample in space and time are offset by a Gaussian falloff when drawn — the stored history is never mutated, so the disturbance is a closed-form function of the recorded drag and the trails re-form as samples age out. A clean tap forces a touch for the fencer nearer the tap (burst, guard flash, bar segment). A double-tap reseeds a new bout. Pointer handlers use pointer events on the canvas.
- **Audio.** All WebAudio is created lazily inside the first pointer gesture and typeof-guarded: a 52 Hz data hum under the trails, a thin tick on each lunge, a falling sawtooth crack on a hit, and a rising sine as a bar grows. Events are generated inside the sim and consumed by the render loop; the pre-roll's events are discarded so frame one is silent.
- **House rules.** Canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas CSS width/height pinned in px inside draw() every frame; phone detection via `window.screen` min dimension < 700 with aspect fallback; page ground black; no gradients, no shadowBlur, no ctx.filter, no offscreen canvas; rAF typeof-guarded with fixed-step accumulation capped at 40 steps.

## QA log

- Rendered with `render-piece.js` at 1280×900 (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png). Renders cleanly in silence; listeners reported: vv:resize, win:resize, canvas pointerdown/move/up.
- Determinism: thumb.png rendered twice and byte-compared with `cmp` — identical. The duplicate was deleted.
- First pass defect: the pose function used `side` as the facing direction, so both blades pointed away from the opponent and the trails streamed off the frame edges. Fixed to facing = `-side`; blades now cross at center and the brackets ride the tips between the fencers.
- Second pass: trail data ticks were computed in world units and rendered sub-pixel; changed to fixed screen-space ticks (±3.5 px), after which the ticked cyan trails read clearly at all three sizes.
- Frame-one read-back (final): a dark edge-lit piste strip across the middle of black with a centre line; two white wireframe fencers facing each other at the thirds, feet on the ground line; cyan sensor trails with visible data ticks behind both blade tips; white corner brackets on both tips (offset by the honest lag); amber score bars at top, 2 segments left vs 4 right; dark rig boxes with green lights at both strip ends; generous black above and below. Mobile: same composition, fencers whole and on the strip, nothing clipped.

## Deviations

- Touch detection falls back to a seeded probability when the geometric reach test fails, so exchanges reliably produce touches and the bars grow at a bout-like rate; the geometry test runs first and governs most lunges.
- The guard flash ring on a touched fencer is drawn in the burst red #FF2E4D (already in the specced palette) as part of the hit registration, rather than an additional UI element.
- No deviation on palette, text (none but the title), or determinism rules.
