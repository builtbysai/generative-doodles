# №1104 — The Point Body

Daniel Franke study block DF1: the unnamed soundsculpture (2012, with onformative) rebuilt as a
generative-doodles piece. A dancer exists only as a point cloud in a black void; the score, not a
conductor, moves the camera.

## Concept

- ~14,000 white points sampled on the volumes of a procedural articulated figure (limb cylinders,
  torso segments, head and hand spheres). No lines, no mesh — the points are the body, and nothing
  floats free of it.
- The figure dances on a seamless 60 s loop. Every joint angle is a sum of seeded sinusoidal
  curves whose frequencies are whole cycles per loop, so the choreography never holds still and
  never jumps.
- A closed-form loudness score L(t) — two slow gaussian swells (near t≈29.5 s and t≈52 s) over a
  quiet baseline — drives the virtual camera: quiet passages pull the camera close and slow its
  orbit, loud passages swing it wide and fast. While the camera crosses a loud passage, a seeded
  subset of the points takes the teal emphasis tint (#4DD8C8).
- The ground exists only as faint dots: any point that reaches the floor plane leaves a soft
  bounce dot where it lands.

## Interaction

- **Watch** — the dancer performs; the camera follows the score.
- **Tap** — reseed the composition: a new pose seed and camera choreography for the same dancer,
  blended in over one second (the camera never jumps).
- **Drag** — take the camera: while held, the orbit follows the drag; on release it eases back
  into the score over ~1.4 s.
- **Double-tap** — a new dancer: different seeded body proportions, same choreography system.
- Sound (optional): a filtered-noise + low-oscillator drone whose gain and filter follow L(t).
  It starts only inside the first visitor gesture (tap or drag), is typeof-guarded, and never
  autoplays; the piece is complete without it. No microphone input anywhere.

## Implementation notes

- Depth shading: projected depth is bucketed into 8 levels between far #8A93A0 at 0.5 alpha and
  near #FFFFFF; points are batched per bucket for speed, drawn as 1–2 px rects.
- Everything is a closed-form function of loop time plus the recorded event list (reseeds,
  drags): variant parameter sets (pose phases, camera seed, body proportions) are lerped over
  1 s from the event time, so frame one and every interaction stay reproducible.
- Determinism: the first frame is drawn synchronously at the fixed phase t = 21.5 s — a quiet
  passage, camera close, the dancer mid-gesture in a leaning stride. The rAF loop (typeof-guarded)
  continues from that phase. A `?phase=NN` (or `?seed=NN`) query hook renders any loop phase as
  the first frame, for QA.
- House rules: canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window, CSS size pinned in draw(), phone detection via window.screen
  (min dimension < 700) with aspect fallback — phones draw every second point. No offscreen
  canvas, no gradients, no ctx.filter, no shadowBlur, no createElement.

## QA

- Rendered with the house renderer at 1280×800 (desktop), 390×844 (mobile), 720×720 (thumb).
- Frame one reads: pure black ground, centered dancer at ~60 % of frame height made only of
  white/gray depth-shaded dots in a clear dance attitude, faint bounce dots at the floor line.
- Loud-passage check at t = 29.5 s: camera wide, teal emphasis present on the near points.
- Thumb rendered twice at 720×720 and byte-compared with cmp: identical.
