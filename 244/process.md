# No.474 Roofwalker

EXPANSION #57 julandthefox (Giulia Neri), prompt GN2.

## Concept

Her scale-inversion signature as a quiet, watch-only scene. The recurring
woman (mustard dress, white peter-pan collar, dark bob, closed eyes, bare
feet) stands on the red roof ridge of a doll-scale house, roughly four
times the house's height, under an enormous dusty-blue sky of soft
volumetric clouds. The mood is departure without drama: she simply looks
out. The disproportion between the woman and the house is the whole
drawing, so the sky stays mostly empty and nothing else enters the frame.
No people leaving the house, no birds, no text, no hint, no camera
movement.

## Construction

- Single self-contained index.html, canvas 2D, exact prompt palette:
  sky gradient from dusty blue #7FA8B8 at the horizon deepening to
  #5B8CB0 at the top, clouds #F2EDE0, roof #C62F33, walls #EFE3C8,
  dress #D9A03F, collar #FFFFFF, hair #3B2A24, skin #EBC9A8 (the skin
  tone from the study palette).
- Composition: sky 72%, house and ground band 28%. The woman is 40% of
  frame height, right of center, bare feet planted on the roof ridge,
  each foot following the roof slope at its own x; the house is exactly
  one quarter of her height, with a tiny door and window at doll scale.
  The scene unit is the frame height on every device, so the
  composition keeps its shape on phones and the disproportion is
  identical at every aspect.
- Clouds are five seeded groups of flattened radial-gradient blobs
  (drawn on the main canvas, vertically squashed to soft ellipses) on
  slow seeded drift paths. Each blob's alpha is low (0.10 to 0.25) and
  overlap builds the volume, up to about 0.7 in the densest cores; each
  group's scale breathes on its own morph phase, so the clouds drift
  and reform rather than translate rigidly.
- The woman is simplified in the series style: closed eyes as two short
  strokes, no nose, no mouth, hair as a chin-length bob with a cap over
  the crown, arms relaxed at her sides clear of the dress silhouette.
- Motion is a seamless 45s watch-only loop with no interaction at all:
  cloud drift (periods 45s, 22.5s, 15s), cloud morph (15s, 22.5s,
  11.25s, 9s), a breeze that lifts the trailing side of the dress hem
  (15s), and a hair sway that is almost imperceptible (22.5s). Every
  period divides 45, so the loop boundary is exact.
- Grain: 1200 precomputed seeded dots (mulberry32, fixed seed) in light
  and dark tones at low alpha, redrawn identically every frame over the
  whole scene. No Math.random anywhere after load.
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas.style.width/height pinned in draw()
  every frame. Phone detection via window.screen (min dimension under
  700px) with the h > w*1.15 aspect fallback only. Page ground is the
  sky's top blue #5B8CB0.
- Determinism: the first frame is drawn synchronously at a constant
  pre-roll phase (t = 15s: clouds mid-drift and part-reformed, hem
  exactly mid-breeze). The animation loop, when running, is anchored as
  that fixed offset plus elapsed time since load, and
  requestAnimationFrame is typeof-guarded so the node QA renderer (no
  rAF, no AudioContext, no createElement, no offscreen canvas) draws
  the same frame. No frame is ever derived from Date.now().

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb rendered twice and byte-compared with cmp,
  identical, re-run after the final figure fix. Second render deleted
  after the check.
- Desktop and thumb: the woman stands at about 40% of frame height,
  clearly about four times the house's height, bare feet on the red
  roof ridge; the sky is enormous with soft, gentle flattened clouds
  and large negative space; door and window read at doll scale.
- Mobile: the composition keeps its shape in portrait, the woman keeps
  her full 40%-of-frame height, woman and house are fully in frame and
  nothing is clipped; page ground matches the sky top.
- Fixes during QA: an earlier draft in this folder used the cloud cream
  for skin, drew the legs and arms in that same cream so they read as
  white pillars with sky showing through the dress, let the clouds
  stack into bright glowing orbs, and shrank the woman on phones by
  deriving the scene unit from the smaller dimension. The build was
  reworked: skin is the study-palette #EBC9A8 throughout, the figure
  follows the series' proven woman construction with arms angled clear
  of the dress, cloud blobs are flattened with low per-blob alpha, and
  the scene unit is the frame height on all devices. A second pass
  shrank the collar to two small peter-pan leaves (at full size it read
  as a bow) and narrowed the hair bob. All renders were regenerated and
  the determinism gate re-passed after each fix.
- Deviations from the prompt letter:
  1. The breeze cycle is 15s instead of 12s, because 12 does not divide
     the 45s loop; 45 = 3 x 15 keeps the loop seamless while staying
     close to the specified rhythm. At the constant first frame the hem
     sits exactly mid-lift, as a 12s cycle at a mid phase would show.
  2. The palette names no ground color; the ground band is a deepened
     shade of the sky's top blue #5B8CB0, staying inside the palette
     family.
