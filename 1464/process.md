# №1464 "Marienbad Garden" (delphine-seyrig DS1, PP711)

## Prompt
A baroque garden drawn as flat geometry: gravel paths in straight lines and
right angles, hedges clipped into corridor walls, statues frozen mid-gesture.
One elegant figure walks the same path again and again; each loop she passes
the same statue, and each time the statue's pose has shifted by one small
increment. Watch-first, seamless loop; dragging sideways scrubs her along the
circuit (forward or back); releasing holds her position. Drag never restarts
the walk and never changes the circuit.

## Palette (prompt only)
Gravel pale #d8cfc0, hedge green #2f4636, statue stone #b8b2a4, sky flat
#c9d4d2, figure black dress #1c1c22, figure skin ivory #f2ead8.

## Composition
Slightly raised garden plan view. Flat sky ground; a gravel garden rect
(inset on desktop, full-bleed on phones) holding a hedge parterre: one central
hedge mass split into four panels by gravel cross paths, so the border path
and the cross paths read as a grid. Four corner hedge blocks sit outside the
circuit corners. Four stone statues stand at the circuit corners. The figure
is small, center-left at frame one, walking a fixed rectangular circuit.

## Motion
- 48 s per circuit, slow even pace, endless. Frame one is the left-edge
  midpoint of the circuit (center-left), walking up toward the top-left
  corner, then right along the top, down the right edge, left along the
  bottom, and back up.
- Figure as a flat silhouette with a two-frame walk (legs alternate by
  distance walked).
- Statues: pedestal, stone body, stone head, one arm. Pose = arm angle in
  25-degree steps measured from straight up (pose 0 = vertical, pose 3 =
  tilted 75 degrees toward horizontal). The pose
  index advances one step per completed circuit, plus each statue's fixed
  seeded offset, so the four statues never all share one pose.
- Drag: sideways scrub. Walk state is closed-form over recorded events:
  an anchor (time, unwrapped circuit count) plus the active drag segment;
  on release the anchor re-bases at the scrubbed position and the slow walk
  resumes from there. Never a restart, never a circuit change, never
  click-to-reload.

## Adaptations
- Garden as flat polygons; circuit as a fixed rectangular path parameter;
  statue pose index advancing one step per completed circuit; drag scrubs
  the path parameter, release holds it.
- No text anywhere except `<title>` (per the prompt). No hint text on the
  canvas; the gallery note carries the drag cue.
- Fully silent (no AudioContext at all). No offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing. All fills
  are opaque prompt colours, so no fading-alpha strings exist at all.
- Determinism: frame one = draw(0) via a boot flag; the rAF clock starts
  only with the loop (plain function declaration behind a typeof guard).
  All randomness is a seeded mulberry32 stream (seed 1464000) used once for
  the four statues' fixed pose offsets; never Math.random.
- Viewport: size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height.
  Phone detection via window.screen physical size (min dimension < 700px)
  with aspect h > w*1.15 as fallback; field-like composition goes full-bleed
  on phones.

## Verification
- Rendered with node ~/workspace/tools/render-piece.js at 1280x900,
  390x844, and 720x720; all three inspected. Desktop: flat sky, gravel
  garden, hedge parterre panels split by gravel cross paths, four statues
  at the circuit corners with visibly different arm poses, small black-dress
  figure center-left. Mobile: same full-bleed composition, no clipping.
- Thumb byte-identical across repeated renders.
- Forced-time probe harness (tmp/probe1464.js; vm-isolated instance, real
  node-canvas, piece driven via window.__piece.draw(t), pointer events to
  its own listeners): t=0 black-dress pixels 3,059 in the left-mid figure
  zone and 0 near the right edge; t=24 the figure is at the right edge
  (3,070 px) and absent at left; t=48 figure back at the start (3,059 px)
  with a 3,074 px full-frame diff from t=0 (statue poses advanced); t=0
  redraw 0 px; drag right at t=10 advances u from 0.2083 to 0.4358 and
  release at t=20 holds ahead of the no-drag instance (0.6441 vs 0.4167);
  drag back moves u below the no-drag value (-0.0191 vs 0.2083); statue arm
  tip moves from one probe box at t=0 (48 px) to the next at t=48 (50 px),
  confirming one pose step per circuit.
- Token scan clean (no Math.random, gradient, shadowBlur, Path2D,
  createElement, AudioContext, getUserMedia, or text drawing).
- No fix rounds needed.
