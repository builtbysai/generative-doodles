# No.666 — Chamán-Cóndor

EXPANSION #81 jose-perez-de-arce, prompt block 2 "Chaman-Condor". His 100×70
pencil drawing as a living transformation: a standing figure whose arms become
condor wings, the head human throughout, the eyes on the viewer.

## Concept

A 45 s seamless loop runs human → condor → human on paper, over one pale sky
wash band. The figure is rendered entirely as pencil hatch: longitudinal wavy
strokes plus diagonal cross-hatching on every limb and on the torso, in
graphite ink that deepens to condor brown as the bird arrives. The morph is
eased so the transformation dwells in the ambiguous middle — arms half wings,
feathers half grown — and only visits the pure human and pure condor states
briefly at the ends of each pass. The condor never flaps; grown wings ride a
slow swell, and the feathers carry only a minute phase-staggered ripple.
"Mirándonos": the pupils track the pointer at all times. Dragging left or
right scrubs the morph phase; on release the loop resumes from the scrubbed
phase.

## Construction

Single self-contained `index.html`, canvas 2D, no assets. Palette is strict:
paper #F0EAD9, ink #1C1A17, condor brown #4A3226, sky wash #B9C4C9 at low
alpha. Canvas is sized from the Visual Viewport API with resize listeners on
both visualViewport and window; draw() pins canvas.style.width/height in px.
Phone detection uses window.screen physical size (min dimension < 700 px),
with the h > w*1.15 aspect test as fallback only. All jitter comes from
mulberry32 tables built once at load; nothing is randomized per frame.

The two skeletons (body-local units, x right, y up, ground at y = -0.53,
mirrored joints share one entry per side):

| joint    | HUMAN           | CONDOR          |
|----------|-----------------|-----------------|
| pelvis   | (0, 0.02)       | (0, -0.02)      |
| chest    | (0, 0.32)       | (0, 0.26)       |
| neck     | (0, 0.43)       | (0, 0.37)       |
| headC    | (0, 0.55)       | (0.01, 0.50)    |
| shoulder | (±0.17, 0.395)  | (±0.15, 0.35)   |
| elbow    | (±0.27, 0.19)   | (±0.78, 0.52)   |
| wrist    | (±0.235, -0.01) | (±1.38, 0.35)   |
| hip      | (±0.09, 0.0)    | (±0.085, -0.04) |
| knee     | (±0.105, -0.25) | (±0.10, -0.26)  |
| ankle    | (±0.105, -0.50) | (±0.115, -0.49) |

Joint counts match exactly, so the morph is a plain per-joint interpolation.
The head joint moves least of all: the head is drawn from one parametric face
(brow arcs, almond eyes, nose bridge and base, lip curves, jaw arc, hair
hatch) that is never morphed; only its position follows the neck. Pupils are
offset toward the pointer, clamped to 0.011 body units. Full wingspan at the
condor end is 2 × 1.38 units, scaled to ≈80 % of frame width.

Ambiguity easing: the loop position is a triangle wave tri (0 at the human
ends, 1 at the condor midpoint). The morph amount is m = dwell(tri) =
tri + (0.8 / 2π)·sin(2π·tri). Its slope is 1 + 0.8·cos(2π·tri): 1.8 at the
pure states, 0.2 at the midpoint, so the figure spends roughly five times
longer crossing the ambiguous band than leaving either end. The drag scrub
inverts dwell() with six Newton iterations (derivative never below 0.2, so it
converges everywhere) and remembers which branch of the triangle it grabbed,
so releasing mid-scrub resumes the same direction of travel.

Feathers: 36 per wing, rooted by arc length along the shoulder → elbow →
wrist spine. Length profile 0.13 + 0.40·t^1.35 + 0.05·sin(πt) units (long
primaries at the tip). Each feather's growth is
smooth((m − 0.05 − 0.45·t) / 0.4): body-side coverts sprout first, primaries
complete last, so mid-morph the arms are visibly half-feathered. Feathers are
drawn as bowed leaf shapes in condor brown with a faint ink shaft on the
outer two-thirds of the wing; direction is down and swept back, splaying
outward past t = 0.78. A brown membrane fills shoulder → elbow → wrist →
feather tips → hip once m > 0.2. A seven-leaf tail fan sketches in behind
the pelvis from m > 0.25, the torso gains a brown body mass and brown hatch
overlay from m > 0.15, and the condor's pale ruff appears at the neck from
m > 0.4, stroked in the paper tone (inside the strict palette). Secondary
motion: a 5 s breath bob on the whole figure, a 6.3 s wing ride scaled by m,
a 3.1 s feather ripple — all pure functions of the anchored clock.

Determinism: frame one is the synchronous draw at loop phase 0 (full human)
made at load before any clock reading is used; the loop then runs on
performance.now() anchored at load, with requestAnimationFrame typeof-guarded.
Drag state is inert until a real pointer event arrives, so the headless
renderer and the first paint are unaffected. A `?seed=tNN` hook pins the loop
time for QA only.

## QA log

Renderer: `node ~/workspace/tools/render-piece.js` (node-canvas; no rAF,
no AudioContext, no document.createElement, no offscreen canvas, no
ctx.filter — the piece needs none of them).

- qa-desktop.png (1280×900, frame one): full human. Standing hatched figure
  centered on the sky wash band, arms at sides slightly raised, face front,
  pupils centered, gaze in the upper third, ground line and ticks under the
  feet. No feathers, no brown.
- qa-mobile.png (390×844, frame one): same state refit to the phone frame,
  figure scaled by width, nothing clipped.
- thumb.png (720×720): frame one as above. Rendered twice and byte-compared
  with cmp: identical (second render deleted).
- Forced state, seed t22.5 (loop midpoint, m = 1, full condor; throwaway
  render, read back, deleted): wings spread to ≈80 % of frame width, all 36
  feathers per wing grown, membrane and tail fan in, torso browned, paper
  ruff at the neck, human head unchanged on top. Wings level on their ride,
  no flap pose.
- Forced state, seed t11.25 (m = 0.5, ambiguous; throwaway render, read
  back, deleted): arms half raised and half lengthened, inner feathers grown
  dark, outer feathers still sprouting, membrane ghosting in, torso only
  beginning to brown — neither form can be named, as intended.
- Source scan: no Date.now, no Math.random, no external URLs, no em dashes,
  no visible text besides the <title>.

## Deviations

- The prompt's technical note also lists pointer-tracking pupils; the brief
  for this build specifies the head stays human with pupils tracking the
  pointer, and that is what is implemented (the morph itself remains
  watch-only plus the drag scrub — no other interaction added).
- The condor's white neck ruff is stroked in the paper color #F0EAD9 rather
  than introducing a fifth tone, keeping the palette strict.
- Wing ride and feather ripple are sine functions of the loop clock rather
  than a separate physics step, so every forced QA state is exactly
  reproducible.
