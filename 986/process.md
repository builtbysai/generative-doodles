# No.986 "They Have No Sense of Time"

Study #121 motoi-ishibashi, PP147 "Robot Dance Class" (the Yaskawa mechanism).

## Concept

Three industrial robot arms stand in a row on a dark stage, taking a dance class. In front of each robot a small warm-white dancer-dot performs a seeded phrase of slides and hops. Each robot replays its dancer's phrase with a fixed lag (300 / 450 / 600 ms), but its joints move at constant capped angular velocity with no easing, so quick phrase passages are physically uncatchable. A beat grid ticks along the bottom at 100 BPM. At each beat, if a robot's claw is within tolerance of its lagged target, a mint tick locks into that robot's ledger above it; every miss leaves the slot empty, so the failure stays visible as data. When two neighbouring robots lock on the same beat, the left one hands its amber cube through the air to the other, and received cubes pile up beside the receiver's base.

## Construction

- Sim: fixed timestep at 120 Hz, seeded with mulberry32. Frame one is the synchronous draw after exactly 3600 pre-roll steps (30 s of class). No wall clock feeds any drawn state; interaction timing is measured in sim steps.
- Dancer phrase: closed form. Slide is a two-harmonic sine composite clamped to [-1, 1]; hop is a squared positive sine half-wave. Each dancer has seeded slide/hop periods, phases and slide amplitude.
- Replay model: the claw target is the dancer's phrase evaluated at (t - lag), mapped into the arm workspace (phrase x to claw x across the reach, hop height to claw height). The wrist target subtracts the claw segment at a fixed desired claw angle (1.15 rad, mostly downward).
- IK: analytic 2-bone. Target distance is clamped to the reachable annulus; the elbow configuration is chosen deterministically as the one with the higher elbow. Shoulder, elbow and wrist angles then move toward the solution at capped constant rates (2.0 / 2.6 / 3.2 rad per second) with shortest-arc wrapping. There is no easing anywhere: the caps plus the lag are what produce the misses.
- Beat and ledger: a beat phase accumulates at 100 BPM (scaled by the conduct factor). On each beat boundary, claw-tip distance to the current lagged target is tested against a 30-unit tolerance; the result is written into a 32-slot ledger per robot (two rows of 16 above each robot), which clears every 32 beats. Locked slots get a mint tick; missed slots stay empty outlines; unplayed slots are dimmer.
- Cubes: each robot carries one amber cube at its claw. On a shared lock between neighbours, the left cube launches on a 0.8 s arc (96 steps) to the right robot's live claw position; on landing the receiver's pile grows and the giver's claw reloads with a fresh cube after 2 s.
- Interaction: tap counts in a new robot (up to 6; the row respaces and the lags keep cycling 300/450/600 ms with a small increment per row repeat). A tap is confirmed only after 42 steps pass without a second tap. Dragging horizontally across the beat grid conducts: it stretches or compresses the tempo (factor 0.55 to 1.6) for 10 s of sim time. Double-tap starts a new class: reseeded phrases and back to three robots, with the 30 s pre-roll re-run so the new class also opens mid-lesson.
- Audio: lazy AudioContext created only inside the first pointer gesture, typeof-guarded. A square-wave metronome tick on each beat (the only reliable thing), a sine note at each dancer's hop apex from a pentatonic set, the robot's replay of that note at half frequency scheduled late by exactly that robot's lag when it locks, and a two-part low clunk-thunk on cube launch and landing. The piece is visually complete in silence, which is how it renders in QA.
- View: canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas CSS width/height pinned in px on every draw. Phone detection via window.screen physical size (min dimension < 700 px), aspect fallback only when screen is unavailable. On phones the square stage letterboxes on the floor tone and the dancer dots grow slightly. Palette is flat and strict: floor #07080C, arms #E8632A, joints and grid #3A3D46, dancers #F5F2EA, mint #7DF9C6, cubes #FFC44F. No gradients, no shadowBlur, no filter, no offscreen canvas, no visible text.

## QA log

- Rendered with the house node-canvas renderer, which provides no rAF and no AudioContext; the piece draws frame one synchronously after the pre-roll and stays silent.
- qa-desktop.png (1280x900): three orange jointed arms at clearly different reaches, grey joint discs with orange rings, an amber cube riding at each claw, one received cube already piled beside the third robot's base. Ledgers above the robots show 18 played slots in the current cycle: mint ticks mixed with obvious empty gaps (robot 1 is the worst student so far, robot 3 the best). Three white dancer-dots sit at floor level in front of the pedestals, each with its faint spin speck. Beat grid along the bottom with the second cell lit and pulsing.
- qa-mobile.png (390x844): stage letterboxed and centred on the floor tone; arms, ledgers, dancers and beat grid all inside the stage, nothing clipped.
- thumb.png (720x720): same composition as desktop at square format.
- Determinism: thumb.png rendered twice and compared with cmp: byte-identical. The duplicate render was deleted.
- Hygiene grep on index.html: no Date.now, no Math.random, no gradients, no shadowBlur, no ctx.filter, no document.createElement, no offscreen canvas, no fillText, no external URLs, no em dashes.

## Deviations

- The cube pile is drawn as a simple two-column stack of small squares beside the receiver's base, capped at 14 drawn cubes, rather than a numbered counter: there is no visible text anywhere in the piece, so the count is shown as accumulation, not digits.
- The dancer's spin is rendered as a small speck orbiting the dot rather than rotating the dot itself, since a plain dot has no visible rotation; the speck keeps the spin readable at thumbnail size.
- Robot replay notes are scheduled late by the robot's lag but not additionally snapped to the beat grid in the audio path; the visible ledger already carries the beat-quantized judgement, and double-quantizing the audio made the lateness harder to hear, not easier.
