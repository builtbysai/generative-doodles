# No.1050 "Measure, Correct, Move"

Study #129 katsuhiko-harada, prompt PP211 "The Feedback Loop" (border 2015 control system).

## Concept

Waypoint, measure, correct, move. Six glowing nodes travel waypoint circuits on a dark field. Every circuit is drawn twice: the intended path as a faint blue-gray ghost spline (the plan), and the node's actual traced path as a bright white line (the truth). The node never follows the plan exactly. Between correction ticks it drifts off the ghost; at each tick the feedback bites, the heading snaps back to the plan, and the bright trace kinks. The composition is the accumulation of those kinks: a field of ghosts and truths, and the small warm pulses where the machine admitted error and fixed it. Precision as beauty.

Interactions: drag injects noise (nearby nodes drift harder and their corrections fire bigger), tap flashes all ghost paths bright for 3 seconds (the plan revealed), double-tap reseeds the waypoints (a new plan). Sound, enabled only by a first gesture: faint clicks at corrections pitched by the size of the error being corrected, over a low field tone.

## Construction

- Fixed-step simulation at 120 Hz, seeded with mulberry32 (base seed 1050211; per-node sub-seeds for drift). Frame one is the synchronous draw after exactly 3,000 pre-roll steps (25 s). No state is ever derived from Date.now(); the animation loop is offset-plus-elapsed from that fixed first frame.
- Intended path: closed Catmull-Rom spline through 5 to 7 seeded waypoints per node (waypoints clamped to a 0.07 to 0.93 field margin), densely sampled with an arc-length table so the plan point advances at constant speed. Lap durations are 40 to 58 s.
- Error model: each node carries a drift velocity, re-rolled from its seeded stream at every correction tick, with magnitude 0.38 to 0.80 of the node's plan speed in a random direction. Between ticks the node's velocity eases (time constant about 0.9 s) toward plan velocity plus drift, so the error grows roughly linearly through the interval. The actual position is integrated from that velocity, never placed on the spline.
- Correction model: ticks are step-scheduled, every 96 steps (0.8 s), phase-staggered per node (first tick at step 24 + 13 per node index). At a tick the sim measures the true error (distance from the plan point), pulls the position 30 percent of the way back toward the plan, snaps the velocity exactly onto the plan heading, records a warm pulse at the node whose radius and brightness scale with the measured error, and re-rolls the drift. The position pull plus the heading snap is what makes the recorded trace kink sharply at every tick; nothing in the trace is smoothed (line joins only round the rendering of the corner, the vertices are the raw recorded positions).
- The truth record: actual positions are stored every 3 steps (40 Hz) into a per-node polyline, pruned to the last 50 s. Drawing buckets segments into 10 age steps, alpha from 0.9 down, so the record visibly renews over the 50 s loop.
- Tick scheduling by step count (not by accumulated float time) matters: node 0 ticks at steps 24 + 96k, so step 3,000 is exactly a tick. Frame one therefore always catches a fresh correction pulse at full brightness; the other nodes' staggered ticks mean several pulses at various ages are normally visible in any frame.
- Drag disturbance is a recorded pointer position with a sim-time expiry; nodes within 0.28 of it get drift factor 2.4, and a tick fired while disturbed draws its pulse at 1.7 times size. Tap is a pointer-up with under 0.015 of travel; double-tap is two taps within 42 steps.
- Palette is strict: field #07080A, ghosts #3A4A5A at 0.25 (0.83 at the peak of the tap reveal), truths #FFFFFF at up to 0.9, pulses #FFE9B8, waypoints #7FD4FF. Glow is layered flat alpha only: no canvas gradients, no shadowBlur, no ctx.filter, no offscreen canvas. Audio is lazy and typeof-guarded; the piece is complete and silent without it. No microphone is ever touched.
- Canvas sizing uses the Visual Viewport API with resize listeners on both visualViewport and window, and draw() pins canvas.style.width and height in px every frame. Phone detection uses window.screen physical size (min dimension under 700 px) with the h greater than w times 1.15 aspect test as fallback only. Coordinates are normalized to the field, so the piece is full-bleed at every size and a resize never disturbs the sim.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png). All three render cleanly in silence (no AudioContext, no requestAnimationFrame in the harness; the guarded code paths hold).
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. The duplicate render was deleted. Re-verified after the kink refinement below.
- Frame-one pulse check: pulses are visible in the shipped frame one: a fresh ring on the node at top center (the step-3,000 tick), plus rings at the center, right-edge and lower-left nodes and a fading one at bottom center, all from the staggered tick schedule.
- First build read-back: the traces wandered around their ghosts but the corrections read as soft waviness rather than kinks, and excursions ran wide. Refinement round: at each tick the position is now pulled 30 percent toward the plan (a real discrete correction in the record), and drift magnitude rose from 0.30 to 0.65 of plan speed to 0.38 to 0.80. After the change the traces hug their ghosts and read as chains of short straight runs with visible direction changes at tick spacing; re-rendered all sizes and re-verified determinism.
- Grep checks on index.html: no Date.now, no createElement, no gradient calls, no shadowBlur, no filter, no offscreen canvas, no getUserMedia, no external URLs, no em dashes. The only visible text in the piece is the document title.

## Deviations

- Trace record is capped at 50 s and pre-roll is 25 s, so frame one shows a half-developed record (25 s of truth per node). This is the brief's own frame-one spec (pre-roll 3,000 steps); the record reaches its full 50 s depth half a minute into viewing and renews from there.
- The correction also pulls position by 30 percent of the error, not heading only. Reason: with heading-only correction the recorded path bends too gently to read as a kink at gallery sizes; the discrete position step is what the real feedback record would show, and it keeps the truth visibly chained to the plan. Recorded here per the kink refinement in the QA log.
- On phones the field stretches with the viewport (normalized coordinates scale independently per axis), so circuits read taller. The alternative, letterboxing, would shrink the record; the house full-bleed rule for field compositions wins.
