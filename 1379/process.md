# №1379 "El Aliso Burns" — adam-piron AP4 (PP602)

Black-and-white 16mm scene of a straw effigy figure on a waterfront,
consumed by particle fire on a loop while a torch-bearing figure gestures
from the water's edge. The whole scene is built from one bark-like noise
material sampled at three scales.

## Composition

- Near-black field (#1a1a1a) above; a light-gray water band (0.42H–0.78H)
  behind the figures, drawn with coarse bark noise as horizontal streaks;
  a mid-gray shore band below with medium-scale noise speckles.
- Effigy center-left (x = 0.32W, feet at 0.80H, height 0.52H): a dark
  silhouette underlay (so it reads against the light water) covered in
  straw strands in light gray / paper white, with a charred mid-gray band
  just above the burn line.
- Torch figure at the right edge: dark silhouette with a light outline,
  raised arm, torch stick, and a flickering white flame.
- No visible text anywhere except `<title>`. No buttons, no reload.

## Motion (seamless 24-second ceremonial loop)

- Burn fraction: 0 → 1 across 0–16 s (the effigy burns from the feet up,
  strands below the burn line are consumed, ember clusters gather at the
  line), ember-only hold 16–20 s, reconstitution 20–24 s.
- Flames: stored-history tongues rising from the burn line, height and
  count scaled by flame intensity; flicker from a hash of (flame,
  quantized 0.125 s time), never per-frame random.
- Torch figure: enters 2–6 s, gestures (arm swaying on a slow sine)
  6–18 s, exits 18–22 s, absent otherwise.
- Gate-weave: a small closed-form sinusoidal offset of the whole scene.
- 16mm grain: seeded dots keyed by (dot, quantized 0.25 s time index).
- Drag vertically: dragging up raises flame intensity, dragging down
  lowers it. Intensity is a closed-form sum over recorded drags with a
  10 s exponential decay toward neutral, clamped to [0.3, 2.2].

## Adaptations (QA renderer paints one frame)

- The shared bark-noise material is a seeded value-noise function
  (lattice hash + smooth interpolation) sampled at three scales: coarse
  for water streaks, medium for ground speckles, fine for effigy strand
  shading. No texture buffer, no offscreen canvas.
- Fire is stored-history fading flame segments, never canvas-fade and
  never additive blend. Flames are flat-alpha triangles.
- No gradients (vignette edges are flat-alpha rects), no shadowBlur,
  no Path2D, no createElement, no AudioContext at all (the piece ships
  fully silent), no getUserMedia, no unseeded randomness.
- Viewport from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style
  width/height in px; phone detection via window.screen physical size
  (min dimension < 700 px) with aspect fallback; centered composition
  keeps its shape on phones with the page ground in the piece's own
  near-black.
- Determinism: frame one is draw(0) via a boot flag; the clock starts
  only with the rAF loop, which is a plain function declaration behind a
  typeof guard. All randomness comes from a mulberry32 stream seeded
  1379000 plus deterministic lattice hashes.
- One fix round during QA: the first flame pass merged into a solid
  white skirt at the effigy's feet (30 wide, high-alpha tongues). Flames
  are now 22 narrower tongues at lower alpha, reading as individual
  licks of fire. All renders were re-done after the fix.

## Verification

- Rendered at 1280×900, 390×844, and 720×720; all three inspected.
  Desktop frame one: straw-bundle effigy center-left against the water
  band, individual flame tongues at its feet, shore band below, torch
  figure absent (it enters at 2 s). Mobile keeps the same centered
  composition with no clipping.
- Thumb byte-identical across repeated renders.
- Forced-time probe harness (stubbed rAF driving the piece's own loop,
  piece's own pointer listeners): effigy-column light pixels against the
  dark sky fall to 87 at t = 18 s (ember-only phase, effigy gone) from
  734 at t = 0 and return to 975 at t = 22 s (reconstituted); torch-zone
  dark pixels jump from a ~24,800 baseline to ~34,800 at t = 12 s and
  t = 18 s (figure present, gesturing) and return to baseline at t = 22 s
  (exited); a 200 px upward drag at t = 5 s raises flame-zone light
  pixels at t = 6 s from 12,281 (undragged) to 15,399 (+25%).
- Token scan clean: no fillText/strokeText, gradients, shadowBlur,
  Path2D, createElement, AudioContext, getUserMedia, or unseeded random.
