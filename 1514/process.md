# №1514 "The Barrier and the Island" (clement-cogitore CC3, PP759–PP766 block PP761)

Gallery date: 2006 · 03 · 05 (formula date 2002-01-10 + (N+1) days; recorded here only, never drawn in the piece).

## What it is

A wide field split by one hard vertical barrier line down the middle. Left and
right sides each hold their own slow-moving cluster of abstract shapes in
their own color, never crossing the line. In the middle of the field, where a
river-band runs horizontally across the lower third, sits a small island where
shapes mix freely in a third color — faster, wilder, unpredictable. The
barrier stays; the island ignores it (the barrier is drawn before the island,
so the island landmass overlaps the barrier segment at the river band).

## Palette (exactly as specced, no other color)

- Field deep forest-dark #14201a
- Barrier line pale wood #d8cdb4
- Left cluster rust #a3552f
- Right cluster slate blue #3f5a78
- Island shapes bright moss #7fae5a (landmass: same moss at 0.55 alpha over
  the river band, with a full-moss outline; island shapes carry a field-color
  stroke so they read against the landmass)
- River band dark teal #1d3a3a (drift streaks inside it are field color at
  0.35 alpha)

## Composition

- Barrier vertical at center by default (0.5W), full height, 3–5 px pale wood.
- River band horizontal across the lower third (0.66H–0.82H).
- Island centered on the river band at (0.5W, 0.74H), radius 0.085 ×
  min(W, H), as a 12-vertex blobby polygon with a slow loop-local morph.
- Side clusters: 10 shapes per side (triangles, squares, circle-dots),
  y in the upper 8%–60% of the frame, anchored by fraction within their half.
- Field-like composition: full-bleed on phones as on desktop; no layout
  change, everything sized from viewport/min dimension.

## Motion and zone rules (all closed-form, 48 s loop)

- Loop length 48 s. Every animation sine runs on loop-local time
  (t modulo 48), never absolute piece time, so t=48 and t=96 equal t=0.
- Side clusters: each shape's position is its half-anchor fraction times the
  current half width plus small sines with periods 48/24/16/12 s (all divide
  48), clamped inside its half by shape size — so no side shape can ever
  cross the barrier, whatever the barrier position.
- Island shapes: 8 moss shapes on closed-form orbits (radii 0.30–0.95 R,
  periods 12/8/6/16/24 s, all divide 48) with spin rotation (periods
  12/8/6/16 s), base angles evenly spaced around the circle with small
  seeded jitter.
- River drift: 10 horizontal streaks whose x positions are
  (seed offset + (W/48) × speed × lt) modulo (W+240), speeds 1 or 2 widths
  per loop — periodic by construction.
- Island morph: polygon radii vary as 1 + 0.14 × sin(2π·lt/48 + vertex phase).
- No per-loop variation is needed (the prompt asks for none here); the
  seeded layout (mulberry32, seed 1514000) is built once and never
  re-randomized, so every loop index re-renders identically.

## Interaction (drag only, never click-to-reload)

- Barrier drag: pointerdown within 30 px of the barrier line (and outside the
  island zone) grabs the barrier; horizontal drag moves it, clamped to
  [0.22W, 0.78W]; release settles it there. Side clusters re-sort
  automatically because their positions are fractions of their half widths;
  the island is untouched (its center is fixed at 0.5W).
- Island drag: pointerdown within 1.6 × island radius of the island center
  scatters the island shapes — one impulse per press, plus further impulses
  at most every 0.5 s of piece time while dragging on the island. Each
  impulse gives every island shape a seeded direction and magnitude
  (0.5–1.0 × 1.4 R) decaying as exp(−(t−t0)/6), so shapes regroup on their
  own (91% decayed by 40 s, fully regrouped by 60 s).
- Drag priority: island zone wins over the barrier zone where they overlap
  (the barrier passes through the island center at default position), so
  the barrier is grabbed along the rest of its length.
- Drag never removes the barrier, never lets a side cluster onto the
  island's rules, never merges the sides, never pins a scattered shape.

## House-rule compliance

- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height
  in px. Phone detection via window.screen physical size (min dimension
  < 700 px) with aspect h > w×1.15 fallback; checked at 390 wide.
- Synchronous first frame at a constant phase: frame one = draw(0); the rAF
  loop (plain function declaration) anchors its clock on its first call.
  rAF and localStorage use are typeof-guarded; in the QA renderer (no rAF)
  the piece draws frame one once and stops.
- Fully silent: no AudioContext at all. No offscreen canvas, no Path2D, no
  ctx.filter, no gradients (flat-alpha layers only), no shadowBlur, no
  document.createElement, no WebGL, no getUserMedia, no localStorage, no
  Math.random, no Date.now, no performance.now (rAF timestamp parameter
  only). No visible text except <title>.
- node-canvas quirks: dots are filled rects or own-beginPath arcs with a
  moveTo first; fading alphas rounded to 4 decimals before stringifying.
- Study guard: abstract shapes and lights only; no people, no houses, no
  children depicted, no likenesses, no real names, no readable text, no
  depiction of soldiers or any identifiable event or ritual. The barrier
  never disappears and the island is never conquered (both probed).

## Probe results (probe-1514.js, vm-isolated instance, real node-canvas)

All 14 probes pass:

- Frame one identical across instances.
- Loop closure: t=48 vs t=0 and t=96 vs t=0 byte-identical.
- Side clusters never cross the barrier at t=0/12/24/36/47 (0 rust pixels
  right of barrier+5, 0 slate pixels left of barrier−5).
- Island shapes stay near the island and present at t=0/12/24/36 (moss
  bounded within 1.6 R + 30 px of the island center).
- Barrier line present at t=0/24/47 (wood pixels > 100).
- Barrier drag: pointerdown (360,100) at t=1, move to x=500, up at t=3 →
  barrierX(10) = 500.0 exactly; side clusters re-sorted (0 crossings);
  island center unchanged (360, 532.8); moss centroid 7.4 px from island
  center (island not conquered).
- Island drag: pointerdown at island center at t=2 → frame at t=4 differs
  from an undragged instance by 7,810 px (scattered); at t=42 the
  difference is 701 px (under 15% of the scatter difference, regrouping);
  at t=62 only 5 px differ (fully regrouped).
- Same drag sequence in two fresh instances: byte-identical buffers.

## Fix rounds

1. Island orbit base angles: first build used fully random angles and the
   eight island shapes read as one clump at frame one. Changed to evenly
   spaced base angles (i × 45°) with small seeded jitter (±0.25 rad), so
   the shapes spread across the island at frame one while keeping seeded
   variety in radii, speeds, and spin. All renders and probes re-done
   after the fix.
2. Probe-harness correction (not a piece change): the regroup probe first
   used a max-distance metric, but the island's full-moss outline ring also
   counts as moss and drowned the signal; the probe now uses
   frame-difference (7,810 px scattered → 701 px at t=42 → 5 px at t=62).

## Files

- index.html — md5 7441108181aefae9c065c159f1f6ef3a
- thumb.png (720×720) — md5 40160f432221bdc2be7a03f95e3e134b; fly
  re-rendered twice, both byte-identical to the shipped thumb
- qa-desktop.png (1280×720), qa-mobile.png (390×844) — both inspected
  personally, no clipping
- probe-1514.js — the harness above
