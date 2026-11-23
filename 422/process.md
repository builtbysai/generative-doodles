# №1358 "Champion" (cannupa-hanska-luger CH7, PP581)

## What it is
Two deer — built from ceramic, felt, and rusted steel — antlers locked,
frozen mid-combat on a pale ground, while grass slowly creeps in from the
frame edges and grows over their legs as they decompose into the landscape.
The point is that the fight feeds the ground: no gore, no red blood, no
triumphalism.

## Frame one
Pale ground #cfc8b8, full frame, with faint seeded speckle. The pair is
centered: the left deer mostly bone ceramic #d9d2c2 with a felt-gray saddle
patch, the right deer mostly felt gray #8f8b82 with a bone chest patch.
Both have four braced felt legs with small rust-steel hooves, lowered necks,
and small heads facing each other, muzzles nearly touching. Their rust-steel
antlers cross in an X at the golden point (center x, 0.33H), each antler
carrying two small tines. Grass at frame one is just creeping in: small
seeded blades along all four edges (growth front 16 px at cycle 0), so the
deer stand fully revealed. No visible text except `<title>`.

## Motion and interaction
- **Breathing tremor:** almost imperceptible. Each deer's body and head ride
  a closed-form sine (left 4.7 s period, right 5.3 s, phase-offset), amplitude
  1.1 px. Nothing frame-integrated.
- **Grass growth:** a 60 s loop. The growth front is a closed-form function
  of stored cycle count + piece time: `16 + storedCycles × 5 + cycleProgress
  × 10` px, capped at 30% of the smaller frame dimension so the grass never
  swallows more than the legs. Each seeded blade (position, inward distance,
  length, lean, shade) appears as the front passes it.
- **Accrual (prompt-specced, guarded):** the loop never resets; it accrues.
  The cycle count is read once at load from `localStorage` key
  `champion-cycles` behind a `typeof localStorage` guard with try/catch, and
  incremented + saved each time the 60 s loop wraps (capped at 40 cycles).
  In any context without localStorage — including the QA renderer — the
  count defaults to 0, so the gate thumb is the cycle-0 state and a fresh
  browser matches it exactly. A returning browser sees deeper grass, per the
  prompt; the piece never diverges within a session.
- **Drag to part:** pointer drags record samples (position + piece time).
  Each blade's tip deflects away from nearby samples (Gaussian falloff,
  110 px radius, up to 30 px) and its visible height shrinks near the pointer
  (up to 85%), revealing the bodies beneath. Deflection decays exponentially
  (tau 1.5 s) and samples older than 4 s stop contributing, so on release
  the grass creeps back. Watch-dominant; drag only parts, never reloads.

## Adaptations
- Deer as procedural flat skeletons with antler-lock geometry (ellipses,
  tapered limbs, quadratic antler beams) — no meshes, no shaders, canvas 2D.
- Grass as seeded blades with a growth parameter, drawn per frame on the
  main canvas — no instancing, no buffers.
- No gradients, no shadowBlur, no Path2D, no offscreen canvas, no
  createElement, no AudioContext (silent piece), no getUserMedia.
- Viewport from the Visual Viewport API with window fallback; resize
  listeners on visualViewport and window. Canvas pinned in draw() via
  style width/height in px. Phone detection via window.screen physical size
  (min dimension < 700 px) with aspect fallback; centered composition keeps
  its shape and the page ground is the piece's own ground color.
- Determinism: synchronous first frame at exactly t = 0 via a boot flag;
  the clock starts only with the rAF loop (plain function declaration behind
  a typeof guard). All randomness from mulberry32 (seed 1358000), never
  Math.random. Pair spacing scales with min(W, H) so the two heads stay
  distinct at every aspect ratio.

## Fix rounds
1. First desktop render hid the left deer's head behind the right one's
   (heads 26 px apart at 1280×900). Body centers moved outward and the head
   inward offset reduced, so heads read as two distinct muzzles.
2. The same overlap recurred on phones (head offset scaled with min(W, H)
   while centers scaled with W). Pair spacing now scales with min(W, H) too,
   so heads stay distinct at 390 px wide as well.

## Verification
- Rendered with node-canvas at 1280×900, 390×844, 720×720; all three
  inspected. Thumb byte-identical across repeated renders and matching the
  shipped thumb.
- Probe harness (piece's own pointer listeners, hand-driven rAF clock,
  fake localStorage reporting 30 stored cycles so the grass stands deep):
  drag along the bottom edge at t = 9 changes 3,928 px at t = 10 (2,725
  inside the drag region, the rest within the 110 px deflection radius);
  at t = 30 the dragged run is pixel-identical (0 differing px) to the
  undisturbed run — the parting fully settles. Grass green-pixel count
  rises from t = 0 to t = 59, confirming growth within the cycle.
- Token scan clean: no Math.random, createElement, AudioContext,
  getUserMedia, Path2D, gradients, or shadowBlur.
