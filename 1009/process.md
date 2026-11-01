# No.1009 - The Stage Explodes, Quietly

Study #124 futa-kera, PP170 "Box Storm" (Perfume at Coachella 2019): three blue
wireframe performers on a black stage, stacked white wireframe ellipse rings
above and below them, and a storm of hard white rectangles and triangles that
the dancers' own movement detonates outward. Brutalist palette, strictly:
black #000000, white #FFFFFF, one blue #2E6BFF, plus the specced limb-flash
#9DBCFF. No visible text anywhere except the document title.

## Concept

The figures are small and the storm is the subject. Three articulated
wireframe figures (joint dots and bone lines, no faces) work through a slow
seeded choreography of reaches, a turn, and a fold at center stage. Their
movement is not decoration: it is the storm's only cause. Every limb tip sheds
boxes continuously in proportion to its speed, and every sharp movement (the
phrase is built with short 0.7 s "snap" transitions, an arm whip, a turn, a
fold drop) detonates a burst of 24-44 boxes from that limb, marked for a
fraction of a second by a pale limb-flash star. Seven white wireframe ellipse
rings stack vertically through the center, rotating (a brightness wave travels
around each ring's segments) and breathing (slow scale pulse). The composition
is radial: everything flies from the bodies, and generous black is left
between bursts so the storm can be felt.

Interactions: drag across the stage detonates bursts from the pointer; tap a
figure to solo it for 10 s (the others dim to 0.22 alpha, its emission and
bursts double); double-tap reseeds the choreography and clears the storm.
Sound, only after a first gesture and lazily created: a deep 52 Hz stage bed,
a soft triangle breathing tone whose pitch follows the rings' breathing
scale, and velocity-mapped granular noise clicks for bursts.

## Construction

Single self-contained index.html, canvas 2D only, no external assets.

- Deterministic core: mulberry32 seeded RNG (seed 100917), fixed-step
  simulation at 120 Hz. Choreography is closed-form: a 16 s keyframed pose
  loop (12 keyframes, smoothstep-eased joint angles, torso lean, body yaw,
  crouch) evaluated analytically per figure with per-figure phase, tempo, and
  mirroring. Limb-tip speeds are analytic too, taken from the difference of
  the rig at t and t - dt, so emission is a pure function of the phrase.
- Emission model: each of the 12 limb tips (wrists and ankles of 3 figures)
  carries an accumulator fed at (0.9 + max(0, speed - 0.02) * 150) boxes per
  second, speed in units of the frame's short side per second; a limb whose
  speed crosses 0.16 U/s upward, with a 0.5 s per-limb cooldown, detonates a
  burst. Burst spawn points are jittered by up to 0.022 U so a fresh burst
  reads as hard shards, not a blob.
- Storm pool: 640 boxes (rectangles and triangles, filled or outlined), each
  integrated per step with velocity, tumble, and gentle air drag (0.72 per
  second). Boxes never fade by alpha: they shrink linearly to nothing over a
  2.6-5.2 s life, keeping the geometry hard to the last frame. Spawn speeds
  scale with the frame's short side, so the storm reaches all four edges at
  every size, phones included.
- Frame one: at load the sim pre-rolls exactly 1800 fixed steps (15 s) and
  draws synchronously, mid-storm, with a fresh burst at a wrist. No wall clock
  feeds any drawn state; the rAF loop afterwards is anchored to elapsed time
  and steps the same fixed-step sim (capped at 40 steps per frame).
- Viewport: canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pixel size is pinned via style.width and
  style.height in px on every draw. Phone detection uses window.screen's
  physical size (min dimension < 700 px) with the aspect fallback
  h > w * 1.15; on phones the rings contract slightly and the figures stay
  centered and whole.
- Audio: AudioContext is created lazily inside the first pointer gesture and
  every use is typeof-guarded and try/catch wrapped; burst clicks go through
  a bandpass whose frequency is randomized with Math.random, which touches
  audio only and never any drawn state. No microphone, no autoplay.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png). All
  three render cleanly in silence (no AudioContext in the harness).
- Determinism: thumb.png rendered twice and compared with cmp: byte-identical.
  The duplicate render was deleted.
- Source greps clean for Date.now, document.createElement, shadowBlur,
  canvas gradients, OffscreenCanvas, and em dashes.
- Fix rounds during build: (1) the first choreography was too slow for its
  own emission thresholds (peak wrist speed about 0.13 U/s against a 0.55 U/s
  burst threshold), so frame one was nearly empty; the phrase was rebuilt
  with snap transitions, the burst threshold set to 0.16 U/s, and continuous
  emission re-gained. (2) Spawn directions were biased up-right by the radial
  rule; the angular spread was widened to plus/minus 1.7 rad around the
  radial direction, after which shards reach all four edges with black
  between bursts.
- Final read-back: pure black stage; three small blue wireframe figures
  center in distinct poses; a fresh burst with its pale flash at the left
  figure's outstretched wrist; hundreds of hard white rectangles and
  triangles radiating to every edge; seven breathing ellipse rings stacked
  through the center. Mobile keeps figures and rings whole, nothing clipped.

## Deviations

- Ring count is 7 (the spec allows 6-8) and ring rotation is implied by a
  brightness wave traveling around segmented ellipse strokes rather than
  dash offsets, because the QA renderer and canvas dash metrics do not agree
  reliably; the read (slow rotation) is the same.
- During a solo, non-solo figures dim rather than the piece spotlighting with
  light; there is no light in this piece by design, so alpha dimming is the
  honest equivalent, and the specced effect (solo figure's bursts double) is
  implemented exactly.
- Double-tap reseed pre-rolls 900 steps instead of 1800 so the new phrase
  answers the gesture promptly; the storm is still fully developed within
  about two seconds of live stepping.
