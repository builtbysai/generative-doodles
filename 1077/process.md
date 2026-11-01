# Worn by the Tracker

## Concept

No. 1077 renders Momoko Nishimoto's Syn Vicon layer as a pure piece: the tracked body reduced to its data. Twelve retroreflective markers in a plug-in-gait arrangement — HEAD, CHEST, shoulders, hands, hips, knees, feet — are the whole figure. There is no person: only white points, thin teal joint-lines, tiny mono ID tags, the long white trails of recorded motion, and a small red reticle orbiting the torso, the camera watching. It is the debug view as art, and the data is beautiful.

## Construction

- A single self-contained HTML file draws the piece with Canvas 2D. No external assets, no gradients, no offscreen canvas, no filters, no shadow blur.
- The world is a 1000 by 1000 square fitted to the Visual Viewport. Canvas CSS size is pinned in pixels on every draw. Resize listeners are registered on both `visualViewport` and `window`.
- Phone state is determined from the physical `window.screen` minimum dimension when available, with the portrait aspect ratio as fallback. The void is full-bleed at every size: the page ground and the canvas fill are the same flat `#050507`.
- The rig is closed-form forward kinematics: a core with seeded sway and bounce, a leaning torso, single-segment arms swinging in the frontal plane, and two-segment legs with a knee-bend hump per step cycle. Every frequency is an integer cycle count per 60-second loop, so the dance phrase loops seamlessly and nothing is frame-integrated. A sub-unit seeded shimmer stands in for capture noise.
- The latency is structural, not smoothed: everything drawn is evaluated at capture time `t − 0.012` — core, phrase, and markers all report 12 ms behind the live piece time, exactly as the suit reports behind the body. During a drag the core target updates instantly while the marker cloud trails its delayed positions, and the joint-lines stretch across the gap.
- Trails are the marker history: each frame evaluates the same closed form at 48 past capture times (2 seconds at 24 samples per second) and draws the history as white segments fading quadratically to zero — stored-buffer trails with no canvas fading, so frame one already carries the full recorded motion.
- Markers are layered flat-alpha circles (0.16 / 0.32) under a solid white core; joint lines are `#2AFFD5` at 0.5; the reticle is four rotating arc segments with mid ticks in `#FF3B30`, orbiting the chest marker at 5 cycles per loop.
- Drag is being the body: the core eases analytically (0.16 s smoothstep) toward the clamped pointer position while the markers lag their 12 ms behind it. A quick tap freezes the frame: the current marker set is held for exactly 5 seconds with all ID tags at full brightness. A double tap reseeds the phrase — generation-derived arm, step, and lean phases — and returns the body home. Never click-to-reload.
- Audio is created only inside the first pointer gesture and only when an AudioContext constructor exists: a faint 50 Hz carrier hum (the system, listening) plus a soft tick on each beat of the phrase, pitched by which foot the step cycle has down — marker contact, made audible. The QA renderer remains silent, and no microphone API is ever touched.
- Frame one is synchronous at fixed phase `t = 20` seconds. Animation time is then advanced from the `requestAnimationFrame` timestamp when that API exists; the call is type-guarded.

## QA log

Rendered with `node ~/workspace/tools/render-piece.js`:

- Desktop: `qa-desktop.png`, 1280 by 800.
- Mobile: `qa-mobile.png`, 390 by 844.
- Thumbnail: `thumb.png`, 720 by 720.

Visual inspection of all three final renders confirms:

- Exactly 12 white markers and nothing else of the body: no silhouette, no filled form, only points, joint lines, ID tags, trails, and the reticle.
- All twelve ID tags present in tiny gray mono (HEAD and CHEST above their markers, the rest fixed to their marker's side, as a debug view would place them); the red reticle rings the chest marker.
- The figure is caught mid-phrase — one arm low, one extended, legs crossed in a step — with visible fading trail arcs at the hands, knees, and feet.
- Nothing is clipped on mobile; the figure sits centered in the square with void margins matching the page ground.

Determinism check: the 720 by 720 thumbnail was rendered twice and compared with `cmp`; the two files were byte-identical. The duplicate render was deleted.

Deviations: one refinement round enlarged the figure about its core (×1.18, human-scaled — the figure is the world), lengthened and strengthened the trails, and moved the CHEST tag above its marker so the reticle no longer strikes through it. The trails are evaluated analytically from the closed form rather than accumulated frame by frame, which is what keeps frame one fully trailed and byte-deterministic under the QA renderer; in motion the history shown is identical. Audio begins on the first visitor gesture rather than automatically, per the house gesture gate.
