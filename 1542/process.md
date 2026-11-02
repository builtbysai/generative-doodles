# No.1542 "The Standing Cutout" (arthur-jafa AJ7, PP789)

Gallery date: 2006 · 04 · 02 (in process.md only, never drawn in the piece).

## What it is

A dark gallery-like field (#101014) with three flat, abstract silhouette marks
standing on an implied floor line in the lower third: each is a head circle, a
torso line, and two leg lines — no faces, no features, no detail. The
silhouettes never move; the light moves. A slow pool of faint amber light
drifts across the field, pausing on each silhouette; whichever silhouette the
pool touches brightens to full metallic silver with a warm ochre edge, while
the others stay dim muted grey. Occasionally a fourth silhouette fades in at
an edge, stands a while, then fades out — present and absent at once, never
overlapping another fourth's fade.

## Palette and composition

- Field #101014; floor line faint #2a2622 at 0.75 height.
- Dim silhouettes muted grey #4a453c; lit silhouette bright silver #d8d8d8
  with a warm edge #c98f3d; light pool faint amber #5a4526 at low opacity.
- Permanent silhouettes at 0.22, 0.50, 0.78 of the width, standing on the
  floor line; generous dark space above and between. Silhouette height
  0.46 of the height, head radius 0.045 of the height.
- The field is full-frame on all sizes; the page ground matches it (#101014).

## Motion

Watch-first light loop, 120 s, closed-form over loop-local time:

- Pool keyframes: starts at the left edge (0.04), drifts to each silhouette,
  pauses 6 s on it, continues to the right edge (0.96), then returns the same
  way, pausing on each silhouette again, and holds at the left edge to close
  the loop exactly. Drift segments use smoothstep interpolation; holds sit
  exactly on silhouette positions.
- Brightness is a closed-form function of horizontal distance from the pool
  center: full shine inside 0.55 of the pool radius (0.17 of the width),
  fading to dim at the radius edge.
- Fourth silhouette: two seeded appearances per loop (slots starting at 22 s
  and 76 s, opposite edges at 0.12 / 0.88, fade-in 3–5 s, stand 10–14 s,
  fade-out 3–5 s, all durations from the seeded mulberry32 stream,
  seed 1542000). Exactly one fourth at a time, so fades never overlap.

## Drag

- Dragging empty space moves the light pool: it follows the pointer while
  held (silhouettes stay still; only what is lit changes) and cuts back to
  its scheduled path on release. The light is never turned off.
- Dragging a silhouette nudges it a short step sideways: it follows the
  pointer delta, capped at 0.08 of the width from its home, and stays
  standing and still at the nudged spot after release. Later drags start
  from the nudged spot, still capped to home ±0.08.
- Drag never animates a walk, never adds a permanent silhouette, never
  turns the light off. The transient fourth silhouette is not draggable;
  a grab near it counts as a light drag.

## Adaptations (house rules)

- Canvas 2D only; fixed-phase first frame (draw(0)); rAF loop as a plain
  function declaration, anchored as offset plus elapsed-since-load.
- All motion closed-form over loop-local time and recorded drag events;
  every sine on loop-local time; no frame-integrated state.
- No Path2D in the QA renderer: silhouette paths are traced directly on
  ctx (one beginPath per stroke/fill, moveTo before every batched arc).
- The prompt's radial-gradient light pool is rendered as layered
  flat-alpha ellipses, never a gradient.
- Fully silent: no AudioContext at all, no getUserMedia ever.
- Fading alphas rounded to 4 decimals before stringifying.
- Canvas state set explicitly in every draw branch.
- No visible text except <title>; no likenesses, faces, features, or real
  names on screen.

## Readings

- "Dragging a silhouette nudges it a short step sideways (stays standing,
  then still)" is read as: the nudge persists at the nudged spot after
  release (no snap-back, no drift), capped to a short step.
- "Dragging moves the light pool" is read as: the pool follows the pointer
  while held and cuts back to its scheduled path on release.
- The fourth silhouette's exact edge order and fade/stand durations are
  seeded constants, identical every loop, so the loop closes exactly.

## QA

- probe-1542.js: all 32 probes pass (vm-isolated, real node-canvas, driving
  the piece's own rAF loop). Frame one identical across fresh instances;
  loop closure byte-identical at t=120 and t=240; pool schedule verified at
  every keyframe and hold; permanent silhouettes never move without drag;
  lit state exactly the touched silhouette at each pause, all dim at t=0;
  fourth windows form exactly 2 non-overlapping blocks at edges, reaching
  full stand alpha; light drag moves only the pool and resumes the
  scheduled path (t=21 → 0.36) after release; silhouette drag nudges only
  that silhouette, stays still after release, caps at 0.08, never walks;
  identical drag sequences byte-identical.
- Renders inspected personally: desktop (1280×720) and mobile (390 wide)
  both show three dim abstract marks on the floor line with generous dark
  space, no clipping, no faces or features. A mid-loop render at t=13 was
  also inspected: the first silhouette bright silver with a warm ochre
  edge, the pool glow beneath it, the other two dim.
- Thumb byte-compare: two independent 720×720 renders byte-identical to
  the shipped thumb (md5 7f46a637f1f8be9ad29f2c3153865114).
- Forbidden-API grep: 0 hits (Math.random, Date.now, performance.now,
  AudioContext, getUserMedia, Path2D, createElement, localStorage,
  gradients, fillText, strokeText).

## Fix rounds

1 piece fix, caught by the probe suite: the silhouette-drag handler mixed
an offset with an absolute position — it clamped the stored offset
(0 at grab) against absolute home ±0.08 bounds, so a +0.05 drag landed
the silhouette at home −0.08 instead of home +0.05. The handler now
clamps the offset to ±0.08 and adds home. After the fix all 32 probes
pass, including a strengthened no-walk check that also asserts the held
position equals the dragged position. Renders and thumb re-done after
the fix; thumb md5 above is post-fix.
