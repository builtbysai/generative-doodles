# Accumulation motifs — procedural density fields: Study Notes

**Sources re-read:** anders-hoff.md (sandpaint rendering), scorch.md
("Another noise field": 6000 flow-field points accumulating into a
petal/flower), youtube-weidi-zhang-image-data.md (sample image data, map to
marks; AVOID the plain photo-redrawn-as-dots hello-world — change the walk
or the marks), donkarlssonsan.md (particle-as-segment, text as targets).

## The synthesis (my own, not a copy)

Hoff's sandpaint: MILLIONS of translucent points build tonal density; flat,
dusty, monochrome; density carries the image. Weidi Zhang: sample a source
image's brightness and let it drive the marks — but the note's own avoid
list says a plain photo-dot redraw is a filter, not a piece, and the
interesting work changes the walk or feeds output back as input.

My move: **replace the photo with a procedural density field.** The
"photograph" is a small program that returns tonal mass for a motif — a
moon disc, ridge lines, a wave — and the marks are sandpaint dots dropped
by rejection sampling. The composition is held by the density program the
way a photo holds a beginner's piece, but every mass is authored, and the
walk changes: dots don't all land at once, they **accumulate live**, the
image emerging from dust over seconds. The animation is the medium's own
process made visible.

## Density-field recipe (re-rendered locally 2026-09-23)

Each motif is `density(x, y) -> 0..1` on the unit square, built from:
- Signed-distance shapes (disc for moon, thickened curves for ridges/wave)
  with smooth falloff: `d = clamp(1 - sdist/w, 0, 1)` then `pow(d, 0.7)`.
- fbm value noise for terrain/texture modulation (ridgelines get
  `ridge = 1 - abs(fbm)` crease lines).
- Sparse background: uniform 0.02 + star field (hash-thresholded points at
  density 1.0, tiny radius).

Rejection sampling: pick random point, keep if `rnd() < density(x,y)`.
~9000 kept dots, each drawn as a 0.6-1.8px dot in warm bone with alpha
0.05-0.12 (alpha scaled by local density so dark masses glow). Revealed in
batches of ~150/frame over ~5s onto a persistent canvas (no clear).
Reduced motion / `?t=1`: draw all at once.

Motifs authored (each legible in the grayscale density preview):
1. **Moon over water** — bright disc upper third; below, horizontal
   reflection streaks (density bands with sinusoidal x-wobble); sparse
   stars above. The money motif: reads at thumbnail size.
2. **Ridges** — three overlapping fbm ridgelines, density above each line,
   atmospheric fade with distance (far ridges lighter). Deep-space feel.
3. **Wave** — one large curling crest: density along a spiral-thickened arc
   with foam speckle at the lip. Hardest; keep as rare variant, verify per
   seed or drop.
4. **Forest** — vertical trunk columns (density in narrow x-bands with
   bark wobble) under canopy blobs (soft discs). Quiet variant.

Guardrails learned from the preview renders: motifs need ONE dominant mass
(Hoff's discipline — density carries tone, not detail); keep the
background below 0.05 density or the piece reads as noise; dot alpha must
scale with density or bright areas blow out to flat white.

## New seeds banked

1. **Accumulation Portrait** — the density field IS a previous doodle
   (render №9020's contours to an offscreen canvas, sample it): the
   sketchbook eating itself, one piece redrawn in another's medium.
2. **Sand Hour** — accumulation runs in reverse: a finished dense image
   erodes grain by grain over a minute, then rebuilds. A memento-mori
   loop.
3. **Crowd Field** — density field from a real dataset (census dots):
   stippled data portrait, each dot a person, masses are cities.
4. **Lichen** — Hoff differential-mesh growth rendered ONLY as sandpaint
   dots (no lines): growth + accumulation, two studies fused.
