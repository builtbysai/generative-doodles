# No.960 "Happiness Hat"

Study #118 lauren-lee-mccarthy, PP121 "The Happiness Hat" (after Tools For Improved Social Interactions).

## Concept

A diagram of discipline, not a portrait. Forty-eight wearers, each nothing but a pale ring and a single arc, sit on a dark lattice. The arc is a smile, parameterized by one curvature value. A thin mint line runs through every row at the height a correct smile must reach: the law, made visible. Left alone, every smile slackens toward its own seeded resting value. A sensor sweep reads the wearers one at a time; when a read smile deviates from the target by more than the threshold, a red spike extends from behind the wearer and the arc snaps back to the line with a twitch. Mint is the law, red is the punishment, amber is the eye that checks. The grid breathes because the cycle never completes: slacken, detect, correct, slacken again.

The visitor can move the law (tap sets a new target curvature from the tap height, and every sensor re-aims), commit the crime (drag pokes wearers into slackness, and the sensors punish it on their rounds), or replace the population (double-tap reseeds the cohort's drift rates, resting values and spike lengths).

## Construction

- Single self-contained index.html, canvas 2D, no external assets, no visible text except the title.
- Fixed-timestep simulation at 120 Hz. Frame one is the synchronous draw after exactly 2400 pre-roll steps (20 s of discipline), so the first thing seen is mid-cycle: smiles at varied slackness, spikes mid-fire and mid-retract, the sensor dot at work. Nothing in frame one derives from the wall clock; the sim clock is the step counter.
- Wearer state: smile curvature s, seeded resting value (0.05 to 0.43, always below the law), seeded drift rate (0.030 to 0.095 per second), seeded spike length (0.75 to 1.70 body radii), seeded spike lean. In drift mode the smile approaches its resting value exponentially: s += (rest - s) * (1 - exp(-drift * dt)).
- Sensor: a seeded permutation of the 48 wearers is scanned in order, one visit every 48 steps (0.4 s), a full sweep every 19.2 s. A visit to a drifting wearer whose |smile - target| exceeds 0.18 fires the spike: 24 steps extending (ease-out), then 180 steps retracting while a damped spring (k = 200, c = 20) drives the smile to the target with a slight overshoot twitch. During retract the spike's length and alpha both decay.
- The smile is drawn as a quadratic curve across a chord in the circle's lower half; its sag is s * 0.50 R, and the row's target line sits exactly at the sag a target smile would reach, so a corrected smile visibly touches the law.
- Spikes are tapered filled triangles drawn before the bodies, so they read as extending from behind the wearer, tipping up and back.
- Interaction events are recorded with sim-step timestamps and consumed in step order. A tap waits out a 42-step window: a second tap inside it cancels the recalibration and reseeds the cohort instead. Drag pokes are deduplicated per wearer per drag pass.
- Sound is lazy and guarded: AudioContext is created only on the first pointer gesture. Spike fire is a short metallic square tick, correction a higher sine ping, pokes a quiet descending tone, plus a very soft sensor-bed ping every 4 s of sim time. The QA renderer has no audio and the piece renders in silence.
- Layout: canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas CSS size is pinned in px inside draw() every frame. Phone detection via window.screen physical size (min dimension under 700 px) with the aspect-ratio fallback; on phones the grid takes 96% of the width and the margins shrink.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png). All render cleanly in silence.
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. The duplicate was deleted.
- Desktop read-back: 6 by 8 grid of pale rings on near-black, mint target line through each of the 8 rows, smile arcs at clearly varied depths (several nearly flat, most deep, corrected ones touching the line), three red spikes in frame (one bright mid-fire at row 6, one small at row 2, one faint and retracting at row 6), the amber sensor dot glowing beside the wearer currently being read, and the faint amber fire-flash ring just expired.
- Mobile read-back: the same grid fits the 390 px width whole, margins shrunk, nothing clipped, spikes and sensor dot still legible.
- Hygiene greps: no Date.now, no gradient, shadowBlur, filter or offscreen canvas calls, no fillText, no external URLs, no em dashes. AudioContext and requestAnimationFrame are typeof-guarded everywhere.

## Deviations

- Wearer bodies are drawn as stroked rings in the body color (#C9CFDB) rather than filled discs, with the smile arc stroked over them in the specced arc color (#F5F2EA). Reason: the specced arc color is lighter than the specced body color, so a filled disc would swallow the arc almost completely; the ring keeps both specced colors and keeps the smile, the whole subject of the piece, legible as a diagram.
- The sensor's amber dot rides at the upper right of the wearer being read rather than on the wearer, so it never covers the smile it is judging.
