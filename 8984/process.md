# Doodle №8984: Threshold Menagerie (2026-08-19)

**File:** `8984/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept

Seed 67, "Threshold Menagerie": take only the discard-by-threshold optimization
as a construction method. A procedural source field is grown, cut at a brightness
threshold on a regular grid, and each surviving cell gets exactly one glyph chosen
by brightness band: dot (dim), dash, ring, triangle (brightest, in vermilion).
Cells below the cut stay empty. The source field is composed as
creature mask times texture, so the animal emerges from the glyphs.

Three source fields, three animals, one control:
- flow-field density -> **Swift** (*Apus apus*), dashes stream along the flow
- reaction-diffusion -> **Koi** (*Cyprinus rubrofuscus*), vermilion RD spots on the body
- ridged fBm noise -> **Tabby** (*Felis catus*), mottled red core with a dotted halo

The three-button control swaps the field and the creature changes; clicking the
plate reseeds a new specimen. Keys 1/2/3 also switch fields. `?seed=` and `?src=`
URL params make any specimen shareable.

Differentiation from №9010 Tone Mosaic: regular grid (not voronoi), glyph SHAPE
encodes the brightness band (not cell size encodes tone), a mixed glyph vocabulary,
and creature subjects instead of a still life.

## Method

- Field resolution 128x128. Each creature mask is painted white-on-black at 256px
  with canvas paths and seeded pose parameters (wing sweep, tail spread, ear tilt,
  overall scale), then downsampled to 128 with two box-blur passes for the soft
  dotted contour.
- Flow: 2300 particles x 30 steps advected through a seeded noise-angle field;
  density blurred once, percentile-stretched. Dashes orient along the flow angle.
- Reaction-diffusion: Gray-Scott (F=0.035, k=0.065) in the stable 5-point form
  (Du=0.16, Dv=0.08), 80 iterations, 26 seeded blobs concentrated in the fish's
  central region, percentile-stretched. Dashes follow the field gradient, which
  reads as contour hatching around the spots.
- Noise: 4-octave ridged fBm value noise, max-normalized.
- Combine: mask x (base + amp x texture). Threshold = tmax x (0.09 to 0.14, with
  seeded jitter). Band edges are tuned per source so each animal keeps all four
  glyphs in play.
- Render: 1080px canvas, 54x54 grid, ink #26211a, vermilion #b23a24 triangles on
  paper #f5f0e2, faint vignette, plate caption with name, latin, specimen seed,
  and method.

## Default seed

`src=cloud` (Tabby), `seed=8984`. Chosen as the strongest instant read; all three
animals were verified legible at this seed.

## What was tried

1. The first RD attempt used Du=1.0, Dv=0.5, dt=1.0 with the 5-point stencil.
   That scheme is numerically unstable: a node harness showed 5587 NaNs out of
   16384 cells, and NaN values fall through every band test into the triangle
   branch, painting the whole grid red. Fixed with the stable Pearson scaling
   (Du=0.16, Dv=0.08) and verified zero NaNs in node before re-rendering.
2. RD tuning: 15 blobs x 44 iterations oversaturated into a solid red blob;
   32 blobs competed with each other and dimmed the spots. Settled on 26 blobs
   concentrated in the fish's region x 80 iterations: a readable spotted koi
   with a few vermilion spots per seed.
3. The bird mask went through three designs. Filled shapes (good), then thin
   stroked wings and tail (read as an abstract asterisk, rejected), then back to
   filled with a bolder scythe wing, sleeker body, and forked tail. Scale bumped
   (k 1.12 to 1.24) so it fills the square plate.
4. The fish mask was redrawn slimmer; the first version was a round blob. Tail
   fork and fins were reduced to read at glyph resolution.
5. Band edges started global (0.36/0.62/0.87), but the koi needed a lower
   triangle cut (0.80) to show its RD spots while the swift needed 0.85 to avoid
   a saturated red core. Moved to per-source band tables.
6. The cat briefly oversaturated after a base/amp tweak; reverted to the
   original values, verified byte-identical to the good render.
7. One scare: a zoomed crop of seed 7742 looked blank, but pixel statistics and
   a fresh render confirmed the cat draws fine; the blank crop was a viewer
   artifact, not a render bug.

## Why the final variant won

Compared across seeds (8984, 1207, 3351, 5511, 7742): every seed reads as its
animal, the three sources are visually distinct families (streaky flow-aligned
dashes on the swift, sparse vermilion RD spots on the koi, mottled red core with
a dotted halo on the tabby), and the threshold cut does real work, since the
empty cells shape the silhouettes. The Tabby at seed 8984 won the default for
instant legibility: ears, head, and seated body read at a glance.
