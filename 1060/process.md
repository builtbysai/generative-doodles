# No.1060 "Omni Chorus"

Study #130 hideaki-tai, HT5 / PP221: the mobility line (distortion 2016, Lexus LEADING WITH LIGHT 2019, Perfume Reframe Tour 2021, multiplex 2021).

## Concept

Twelve omni-wheeled movers, each carrying one sodium-yellow light, draw slow geometric formations on a dark top-down stage: a rosette, a spiral, a grid folding into a circle. The piece is not the formations. It is the trying. Every mover chases its slot with lag and drift, so it is never exactly on path; when its error passes a threshold the feedback loop bites, the light flares magenta for a split second, and the position snaps partway home. Green tire tracks record each formation's history and clear when the next formation starts: the tracks are proof of precise control, corrections and all. A faint dot grid underlays the stage, the motion-capture truth nobody performs for.

## Construction

- World: logical 1000x1000 stage, contain-fit and centered at any viewport; the formation radius is 350 units, so a formation spans about 70% of the frame's short side. Canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas CSS size pinned in draw(). Phone detection via window.screen (min dimension under 700px) with the aspect fallback; phones draw pucks and glows 1.3x for legibility.
- Sim: fixed step 120 Hz (STEP = 1/120), seeded mulberry32 (one stream per mover). Frame one is the synchronous draw after exactly 2880 pre-roll steps (t = 24 s). No state is ever derived from a wall clock; the live loop only advances the same fixed steps from elapsed rAF time, capped.
- Formations (18 s each, 54 s cycle, targets are closed-form functions of sim time):
  1. ROSETTE: polar flower, r = 350 * (0.60 + 0.40 * cos(5a)), a = i * 30 deg + slow rotation (one turn per 110 s).
  2. SPIRAL: angle steps of 75 deg per mover (2.5 turns across the fleet), r = 350 * (0.12 + 0.88 * i/11).
  3. GRID INTO CIRCLE: a 4x3 grid morphs to a circle of r = 322 by a smoothstep over u = 1..15 s of the formation.
  Formation changes crossfade over 6 s (targets blend from the previous formation's end state), and all traces clear at the boundary step.
- Chase and drift: measured += (target - measured) * (1 - exp(-5 * dt)) each step, plus an Ornstein-Uhlenbeck drift velocity (sigma 68 units/s per sqrt(s), mean-reversion tau 0.8 s). There is no steering model and no path following: the lag and the wander are the motion.
- Corrections: when a mover's error exceeds THRESH = 15 units and its cooldown (45 steps) has passed, a correction fires: the event step is recorded, the light goes full magenta for 6 steps (about 3 frames at 60 Hz, per the prompt), then a magenta halo decays over the next 36 steps, and the position snaps 50% of the way to the target.
- Measured behaviour of the shipped math (probe ran the extracted CHORUS MATH block from this file, 60 seeds, two full cycles): fleet correction rate about 2.7/s averaged over a cycle, about 1.4/s inside a settled formation, about 8.6/s during the 6 s re-formation blends when the fleet works hardest; maximum error over two cycles 43 units (12% of the formation radius), reached during blends. Inner movers correct rarely; the outer movers, whose slots move fastest, correct most. Perfection never occurs: with the drift running, every mover's error spends most of its time between 3 and 15 units.
- Traces: each mover's measured position sampled every 3 steps (40 Hz) into a flat data buffer, redrawn as a polyline each frame at #3DDC84, alpha 0.25. No offscreen canvas, no canvas fading.
- Interaction: watch-only by default. Drag grabs the nearest mover (within 80 units): its target becomes the finger, its correction threshold tightens to 6 units and its cooldown to 10 steps, so its flashes fire constantly while held; the other eleven keep formation. Release and it chases its slot again. Double-tap advances to the next formation immediately (traces restart, drift streams reseed). No audio: the prompt specs none.

## QA log

- Renders (node render-piece.js, the piece's own script): qa-desktop.png 1280x900, qa-mobile.png 390x844, thumb.png 720x720. All render cleanly, no audio context exists to guard.
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. The duplicate was deleted.
- Frame one (t = 24 s, end of the blend into SPIRAL, seed 1063375): twelve yellow lights in the freshly formed spiral, green tracks webbed beneath recording the rosette and the 6 s travel into spiral slots; mover 7 (upper center) is at full magenta flash, its correction fired on step 2880 exactly; mover 9 (right side) carries the fading magenta halo of a correction fired 38 steps earlier. The seed's pre-roll records 77 corrections in 24 s. Desktop and thumb show this identically; mobile centers the whole stage in the portrait frame, all twelve movers whole, nothing clipped, the flash and its halo still legible.
- Hygiene: grep-verified zero occurrences of Date.now, gradient constructors, shadowBlur, ctx.filter, createElement, OffscreenCanvas, getUserMedia, AudioContext, absolute URLs, and em dashes. Zero visible text besides the title. Palette is exactly the five specced tones plus a white core drawn only inside a full flash.

## Deviations

1. Seed chosen by probe: the base seed 1063375 was selected from a scanned range because, with the tuned constants, it is one of the seeds whose frame one catches the specced one-to-two magenta flashes (mover 7 live at step 2880, mover 9 in its tail). The sim's statistics are seed-independent; the choice only decides which honest instant the still shows. Same precedent as No.1048's probed seed.
2. Formation changes blend over 6 s instead of switching hard. A hard switch would teleport every target hundreds of units and the correction system would spend the transition saturated, which reads as noise; the blend keeps the re-formation legible as work. Traces still clear at the boundary, as specced.
3. The magenta flash has a 36-step fading halo after its 6 full steps. The prompt's flash is about 3 frames; the full-bright phase honors that, and the decay tail is what lets a just-fired correction read in a still frame and in peripheral vision live.
4. Drift is an Ornstein-Uhlenbeck velocity rather than per-step white noise on position: white position noise jitters the tire tracks into fuzz, while drift velocity keeps the tracks smooth and the errors physical.
