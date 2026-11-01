# №1098 — Sound Sculpture

Onformative study block OF3: the *unnamed soundsculpture* (2012, onformative with Daniel Franke) — a dancer recorded as a point cloud, regenerated from a random seed. This piece rebuilds that idea procedurally: the dancer is data, the body is dots, the seed is the composition.

## What it is

A full-height human figure drawn **only** as points — 2,600 samples in the pool, ~1,950 drawn at frame one — against black (`#030305`). Near points are white `#FFFFFF`; far points cool to `#BFD8E6` at lower alpha, so depth reads as shading. No skeleton lines, no mesh, no text, no sound.

## How it works

- **Body as data.** An articulated figure (pelvis → spine → chest → neck → head; two arms, two legs) exists only as segment endpoints and joint-angle poses. Segments are never drawn — they are sampling spines. Points sit in thin tubes around each segment and in small spheres at the joints and head, each with a fixed body-local offset from a seeded RNG.
- **Choreography.** Eight keyframed poses (reach, arabesque, crouch, extension, spiral, leap, floor, bow), one per 10 s slot in a 60 s loop, eased between with a hold in the middle of each slot. The pose *sequence and timing never change* — it is always the same dancer.
- **Seeds as compositions.** A variant is a seeded package: a permutation of the pose order, a camera radius (3.1–4.0 m), and a point density (62–100 % of the pool, thinned evenly by a seeded shuffle so the whole body thins together). Unattended, a new variant takes over every 20 s; **each tap advances the seed immediately**. Variant changes blend over 1 s (camera and density ease; the pose mix crossfades), so the camera never jumps — one continuous take.
- **Camera.** One slow full orbit per 60 s loop with a gentle height breathing, perspective projection, depth-sorted shading. Closed-form in t throughout: pose, camera, and variant state are pure functions of time and the recorded tap list — no frame-integrated state.
- **Determinism.** The first frame is drawn synchronously at a fixed phase (t = 24 s: the *reach* pose held, camera at a three-quarter angle). The rAF loop, where present, is anchored as phase + elapsed since load.

## House rules honoured

Canvas sized from the Visual Viewport API with resize listeners on both `visualViewport` and `window`; canvas CSS size pinned in `draw()`; phone detection via `window.screen` (min dimension < 700) with aspect fallback; full-bleed black including the page ground. No gradients, no offscreen canvas, no `ctx.filter`, no shadowBlur, no `createElement`, no audio, no microphone. The only text is the `<title>`.

## QA

Rendered with the house node-canvas renderer: `qa-desktop.png` (1280×800), `qa-mobile.png` (390×844), `thumb.png` (720×720). Frame one shows the dancer mid-*reach*: head clear of the raised arm, torso, lowered second arm and both legs all readable as point density alone. Thumb rendered twice and byte-compared with `cmp` — identical.
