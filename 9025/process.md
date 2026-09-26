# Doodle №9025: Shardscape (2026-09-26)

**File:** `9025/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
A fixed set of about 390 identical equilateral triangles tiles the stage
as a low-poly mosaic. Four seeded landscapes (Peaks, Swell, Timber,
Nightfall) are each a complete pose assignment for every triangle:
position, rotation, scale, color. The piece holds each scene, then
shatters it and rebuilds the next one. The morph is pure motion, never a
crossfade: no triangle ever changes opacity. Each triangle flies its own
staggered path with an arc lift perpendicular to travel, an occasional
full extra spin mid-flight, and a scale dip that reads as tumbling, while
its color lerps quickly underneath. The cascade direction alternates
every transition (left to right, right to left, top to bottom, bottom to
top), so each morph sweeps differently. Clicking anywhere deals a new
seeded hand: new peak layouts, new tree lines, new star fields.

## Technique synthesis (from study, not copied)
Studied the Species in Pieces notes (deep read of the shipped CSS/JS):
the portable ideas are the fixed triangle budget as the whole technique,
the staggered per-shard delay as the difference between a transition and
a performance, the alternating cascade direction, and bold flat color
fields doing the illustration work. Kept: fixed triangle count, stagger,
alternating cascade, per-scene palettes, faceted shading (up triangles
catch light, down triangles go darker). Changed everything else: no
animals, no DOM/CSS clip-path, no hand-traced polygons. The subjects are
procedural geometric landscapes, the renderer is canvas 2D, poses are
generated from seeded region functions (gaussian ridges, wave crest
curves, conifer fields, hill silhouettes), and the transit adds arc lift,
spin, and scale dip that the original's straight vertex lerp does not
have. Small accents (stars, fireflies, spray, birds) are stamped over a
full-size sublayer in the region color, so they never open gaps onto the
page background.

## Parameters
- Seeded PRNG (mulberry32), `?seed=` in URL; default seed 902501
- `?demo=1` opens mid-shatter (used for the thumbnail)
- Hold 3400 ms, per-triangle transit 1150 ms, stagger spread 1300 ms
- Triangle side 78 px in a 1200x800 design space

## Verification
- Zero console/page errors over a full 26 s cycle covering all four
  scenes and all four morph directions (fail-closed exception collector,
  exit 0)
- Rendered all four scene holds plus mid-morph frames for three seeds;
  default seed 902501 kept for the strongest Peaks composition
- Three real bugs fixed during iteration: negative lattice rows produced
  a -1 color band index (fixed with a clamped band helper); small accent
  triangles opened black gaps onto the page background (fixed with the
  full-size sublayer); seed-sensitive flat ridges read as stripes
  (fixed with three guaranteed-spread peaks per ridge)
- Click reseed verified live via CDP (seed label changes, timeline
  restarts, no errors)
- No scroll or overflow at 1280x800 or 390x844 (scrollWidth equals
  clientWidth on both); rest state shows a complete scene, never blank
