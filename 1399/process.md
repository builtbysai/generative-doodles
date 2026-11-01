# №1399 "Visiting Camera" (zack-khalil ZK8, PP622)

A slow procedural lakeshore at dusk — procedural pines, low water, an ember
sun — rendered in flat Woodland-School-inflected shapes (bold outlines,
segmented color fields), visited by a camera that lingers instead of cutting.

## Palette

Dusk indigo #2a2f4a, pine green #2f6b3a, water steel #4a6b7c, trunk brown
#4a3826, sun ember #e0962a, outline black #141210.

## Composition

The scene fills the frame: indigo sky, an ember sun disc with a bold outline
and a segmented reflection column breathing on the water, a trunk-brown shore
band, steel water with drifting ripple lines, and fourteen seeded pines along
the shore, each three stacked triangles with bold outlines. No visible text
except `<title>` (study-wide rule: pseudo-script only, never readable real
words; this piece needs no text at all).

## Motion

Continuous, never a cut. The camera runs a 60-second closed-form keyframe
cycle: wide hold 12 s, eased push 12 s to one detail, hold 12 s, eased release
12 s back to wide, wide hold 12 s. Every segment is at least 8 seconds. The
detail cycles per 60-second cycle: a pine, a ripple, the sun's reflection.
The water ripples and pine sway keep their own slow closed-form loops
regardless of the camera. Dragging lets the visitor look around (a decaying
sum over recorded drags, tau 3 s, clamped to ±80 px) but cannot hurry the
camera — the offset decays and the camera returns to its own pace.

## Interaction

Drag to look around; the camera always returns to its own pace. No buttons,
never click-to-reload.

## Adaptations

- Camera as a closed-form transform (scale + focus) on the layer stack with
  eased, unhurried keyframes — no frame-integrated state, no cuts.
- Drag look-around as a closed-form decaying offset over recorded drags.
- Grain overlay as seeded dots keyed by quantized time (0.5 s quantum).
- Fully silent: no AudioContext, no getUserMedia. No offscreen canvas, no
  gradients, no shadowBlur, no Path2D, no createElement.
- Node-canvas quirks honored: every fading alpha rounded to 4 decimals before
  stringifying (scientific-notation alphas parse as opaque in node-canvas);
  dots drawn as filled rects; every arc preceded by a moveTo.

## House rules

- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect h > w*1.15 as fallback; field-like composition goes full-bleed
  on phones; checked at 390 wide.
- Determinism: synchronous first frame at a constant phase via a boot flag
  (frame one = draw(0), clock starts only with the rAF loop); all randomness
  from a seeded mulberry32 PRNG (seed 1399000 + index·7919), never
  Math.random. rAF loop as a plain function declaration behind a typeof guard.

## Verification

Rendered at 1280×900, 390×844, and 720×720 and inspected all three; thumb
byte-identical across repeated renders. Forced-time probe harness (stubbed
rAF driving the piece's own loop, pointer events to its own listeners):
frame-one repeat identical; camera scale 1.00 wide at t=0 and t=6, 1.60
pushing at t=18, 2.20 holding the pine detail at t=30, 1.60 releasing at
t=42, 1.00 wide again at t=54 (push/release focus paths symmetric, no cuts);
drag offset 60 px at t=5 decays to 22.07 px at t=8 (exactly 60/e) and 0.40 px
at t=20; water band differs 8,814 px between t=0 and t=5 (own slow loop,
independent of the camera).

## Fix rounds

1. The script ended with `});` instead of `})();`, so the IIFE never ran and
   both QA renders came out black. Fixed to `})();`; all renders re-done
   after the fix.
2. The sun's reflection bars were drawn before the water fill, so the water
   painted over them. Moved the reflection pass after the water fill; the
   ember column now reads on the water. All renders re-done after the fix.
