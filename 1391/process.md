# №1391 "Masked Wanderer" (adam-khalil AK8, PP614)

A small masked figure wanders an endless procedural gallery of glass vitrines
holding glowing ancestor-objects; a fixed surveillance camera follows at a
distance; the wanderer never arrives anywhere.

## Composition

One-point perspective gallery. The vanishing point sits at frame center
(0.46H); ceiling, floor, and side walls are flat-fill triangles meeting there.
Glass vitrines line both walls, placed by a perspective easing (depth^1.7) so
they shrink toward the vanishing point and grow as they approach the camera.
Each vitrine holds one seeded ancestor-object (gem, spiral, ring, vessel, or
shard cluster) in object amber with flat-alpha halos. The wanderer stands
small in frame center, in the aisle, under fixed surveillance corner brackets
that never move.

## Motion (all closed-form functions of piece time and recorded events)

- Gallery scroll: a repeating 9-segment cycle per side, scrolled by a
  closed-form phase. During the wanderer's pauses the scroll slows to 0.15x,
  so the pause reads as stopping at a vitrine.
- Wanderer: 30 s cycle — walk 0–18 s, pause 18–24 s, walk 24–30 s. The walk
  phase is a closed-form function of walk time (piece time minus accumulated
  pause time), so the phase freezes exactly during pauses instead of jumping.
  During a pause the arm on the cycle's side raises toward that vitrine and
  the head tilts toward it; the side alternates per cycle.
- Drag pans the camera: the vanishing point and wall anchors shift by a
  decaying sum over recorded drag samples (tau 3 s, clamped ±60 px). The
  wanderer is never panned and never rescaled — the surveillance distance
  holds.
- Grain: seeded dots keyed by (dot, quantized 2 s index), never per-frame
  random.

## Adaptations

- Gallery as a repeating procedural segment scrolled by a closed-form
  function of piece time (no texture buffer, no frame integration).
- Wanderer walk cycle, pause schedule, and arm raise are closed-form; no
  frame-integrated state anywhere.
- Vitrine objects glow with flat-alpha halos only (no gradients — the QA
  renderer handles gradients unreliably).
- No text at all except `<title>`; no labels, no HUD words. The surveillance
  framing is corner brackets only.
- Fully silent: no AudioContext exists in the piece (the prompt specs no
  audio for this piece).
- No offscreen canvas, shadowBlur, Path2D, createElement, localStorage, or
  getUserMedia. Canvas 2D throughout; all dots are filled rects and every arc
  gets its own beginPath (node-canvas batched-ellipse quirk).
- Viewport from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw(); phone detection via
  window.screen (min dimension < 700 px) with aspect fallback; centered
  composition keeps its shape, page ground is the piece's own floor dark.
- Determinism: frame one = draw(0) via boot flag, clock starts only with the
  rAF loop (plain function declaration behind a typeof guard); all
  randomness from mulberry32 (seed 1391000 + index·7919), never Math.random.

## Verification

- Rendered at 1280×900, 390×844, and 720×720 and inspected all three; thumb
  byte-identical across repeated renders.
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  pointer events to its own listeners, 1280×900): mask bounding box at t=0 is
  26×27 px centered at frame center; t=0 vs t=5 differ in 39,364 px (gallery
  scrolls); t=0 vs t=30 differ in 89,939 px (cycle closes, scroll advanced);
  pause pose confirmed — left-arm raised-zone gray pixels jump 6 → 77 from
  t=5 (walking) to t=20 (paused); mask pixel count identical dragged vs
  undragged at t=6 (526 = 526), while the left wall band differs by 33,521 px
  (camera pans, wanderer stays put).
- One fix round: the wanderer's body was first drawn in near-black and
  vanished against the floor — the figure is now gallery gray, so the small
  centered figure reads at desktop and mobile sizes; all renders re-done
  after the fix.
- Token scan clean except one comment stating Math.random is never used;
  rAF is typeof-guarded in both call sites.
