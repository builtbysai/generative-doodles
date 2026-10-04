# №8932 · Budget Ink — process notes

## Concept statement
Shading as an ink budget. A quiet still life (vessels, bowls, a sphere, folded
cloth on a table) is built ONLY from wandering strokes: no outlines, no fills,
no washes. The scene is first reduced to an analytic tone field; the field is
cut into 7 tone bands; each band receives a path-length budget strictly
proportional to darkness times area (sum of tone over the band). One wandering
stroke per band spends that budget: it meanders with organic curvature, hugs
tone contours where the gradient is strong, steers toward undrawn cells, avoids
re-inking saturated spots, and lifts its pen (teleports) when stuck so a single
stroke can serve a disjoint region. An internal coverage model then finds
sub-areas that stayed undrawn and authorizes a second, shorter pass confined to
those clusters only. Tone below the paper threshold gets no budget at all, so
the lights stay untouched paper. Ink saturates gracefully: once a spot holds
well past its expected share, the stroke lays less ink there, so dense regions
stay textured instead of blobbing into black holes.

## Seed mechanics
- `mulberry32` from `?seed=` (shareable) or the default seed; click/tap mints a
  new random seed, updates the URL via `history.replaceState`, and re-renders.
- One seeded RNG drives everything in fixed order: paper grain noise, scene
  composition (horizon, cloth-fold creases, 2-4 objects from vase/jar/bottle/
  bowl/sphere with positions and sizes), then all stroke wandering. Same seed
  renders byte-identical output (verified).
- Render is a static print-voice still: warm paper, warm-black ink in multiply,
  grain, vignette, plate rule, honest caption naming the rule.

## What I tried and rejected
- First pass had the table at mid tone with long straight strokes crossing the
  whole plate: read as scribble, not cloth. Rejected; table dropped to near
  paper white, folds became short local creases, threshold raised.
- Small very dark regions (sphere cores, bowl mouths) rendered as solid black
  discs because contour-following made the stroke orbit them. Rejected the
  blob: added ink saturation (alpha falls as local coverage exceeds its
  expected share) plus an over-coverage steering penalty. Darks stay darkest
  but textured.
- Strokes escaping thin regions (vessel necks) drew scratchy spikes. Fixed by
  drawing out-of-region segments pen-up and strengthening the stay-inside
  steering weight.
- Infinite fold lines read as stray marks at the plate edges. Rejected; folds
  are now finite segments that fade at their ends.
- Real bug found in QA: `render()` on window resize reused the advanced RNG,
  so resizing (or emulator metric changes) silently re-rolled the scene and
  broke `?seed=` shareability. Fixed by reseeding from the seed at the top of
  every render; verified byte-identical across loads.

## How it differs from used families
- №8970 Greedy Squiggle: a pen hunts the darkest remaining pixel and erases
  the buffer, one continuous line over an abstract field. Budget Ink never
  hunts: each tone region is granted a fixed path-length budget up front, and
  the subject is a composed shaded still life, not a tone field.
- №8990 Tone Rows: polargraph tick raster (boustrophedon rows of vertical
  ticks). Budget Ink uses free wandering strokes, one per region, with
  contour-following and coverage steering.
- №9022 Accumulation: grain-by-grain sandpainting reveal. Budget Ink is
  stroke-based, single static plate, no animation.
- №9000 Interruptions: dense field of equal-length dashes with erasure voids.
  Budget Ink has variable-length budget strokes and no erasure; the figure is
  a still life, not a void.
- №8996 Still Life: flat shaded vessel scenes (filled profiles, long
  shadows). Budget Ink draws no profiles or fills at all; form emerges purely
  from stroke density governed by the budget rule.
- №8961 Five Methods: includes hatch/stipple panels, but as a five-panel
  method comparison, not a unified budget-driven scene.

## Default seed
7 — bowl, jar, bottle, bowl in a calm row; the most varied and best-composed
of the seeds inspected (138, 777, 4242, 90210, 555555, 20260625, 31, 7, 42,
100, 909). All seeds inspected headless at 900px+ before choosing.

## QA log
- Headless Chromium (isolated port 9362, xvfb) via CDP on every iteration;
  every render visually inspected.
- `cdp_exceptions.py` (Runtime enabled before navigation, 15s collection):
  exit 0 on default seed and on `?seed=4242`; zero console/page errors.
- Desktop 1280x800: scrollWidth/Height equal viewport, no scroll, no overflow;
  caption sits below the plate, no overlap.
- Mobile 390x844: same, no scroll; plate 359px wide, caption wraps cleanly.
- Click regeneration verified via CDP: seed line changed (7 → 530748766) and
  a new still life rendered.
- Determinism: two fresh loads of `?seed=909` are byte-identical (mean abs
  diff 0.0).
- `thumb.png`: 720x720, clipped from the real canvas and downscaled with
  Lanczos; visually checked.
- Page copy: human voice, no em dashes, no date strings, no absolute URLs;
  viewport meta present.
