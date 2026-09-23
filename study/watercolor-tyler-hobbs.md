# Tyler Hobbs — Watercolor simulation: Study Notes

**Source:** tylerxhobbs.com "A Guide to Simulating Watercolor Paint with
Generative Art" (read 2026-09-23, full text), plus the Curtis et al.
"Computer-Generated Watercolor" paper trail (Kubelka-Munk glazing, edge
darkening, granulation) and Licia He's plotter-brush work (Outland review)
for the wet/dry material contrast.

## The core technique (Hobbs)

1. **Stacked translucent glazes.** The whole illusion is lots of
   nearly-transparent polygon layers on top of each other. 40-60+ layers,
   each barely visible alone, accumulate into natural density variation.
2. **Recursive polygon deformation.** The engine: for each edge A->C, take
   midpoint B, sample B' from a Gaussian centered on B, replace the edge
   with A->B'->B'->C, recurse. Gaussian sigma and recursion depth are the
   two knobs. Jagged, detailed edges at high variation; near-exact
   boundaries at low variation.
3. **Variation maps to wetness.** High edge variation = soft watercolor
   fade (wet-in-wet). Low variation = sharp masked boundary. One wash can
   mix both by varying sigma per region.
4. **What the physics papers add:** real watercolor's signature effects
   are edge darkening (pigment migrates to the drying boundary), granulation
   (pigment clumps on paper texture), and backruns. The Curtis model does
   this with shallow-water simulation + Kubelka-Munk compositing; for a
   doodle, Hobbs's layered polygons plus a darker boundary pass and a
   speckle pass get 90% of the look for 5% of the code.

## Palette discipline (from the studied examples)

Watercolor pieces that work keep the pigment count low: 2-4 pigments,
transparent primaries that make clean secondary mixes where they overlap.
Classic triads: indigo/ochre/madder, ultramarine/burnt sienna, teal/rust.
Paper is warm cotton, never pure white. Geometry underneath is ink-thin and
exact — the precision-vs-bleed tension IS the subject (matches the TGAM
"Watercolor Geometry" seed exactly).

## Implementation decisions for №9014 "Bloom"

- Base polygon per wash: circle or rounded polygon; deform via midpoint
  displacement with per-wash sigma (wet washes high sigma, dry washes low).
- 40-70 layers per wash at alpha ~4-8/255; hue jitter +-6 per layer so the
  wash breathes instead of banding.
- Edge darkening: after the glaze stack, stroke the mean boundary with a
  darker pigment at low alpha, width ~3-5px — one deliberate pass, not a
  filter.
- Granulation: 1500-3000 one-pixel speckles in the pigment hue at alpha
  0.03-0.08, denser where the wash is densest (sample from the same density
  field).
- Paper: warm cotton #f3eee1 with pre-rendered fiber grain (long faint
  strokes) + fine noise; vignette none — paper stays flat and bright.
- Composition: exact ink geometry first (Bauhaus vocabulary: one large
  circle, arcs, 2-3 bars, a triangle), then 3-5 washes bloom from anchor
  points ON the geometry. Animated: geometry sweeps in, then each wash
  grows layer-by-layer, staggered. The animation is the wetness — pigment
  spreading — not decoration.
- 2-3 pigments per piece + one ink. Never more.

## New seeds banked (not for №9014)

1. **Backrun Bloom** — wet-in-wet cauliflower backruns as the SUBJECT:
   trigger backrun rings deliberately at wash boundaries, document the
   parameters that make them appear. A study of one accident.
2. **Pigment Ledger** — the same wash painted in 12 historical pigments
   (lapis, madder, gamboge, indigo...) each labeled in asemic script; a
   color-chart as artwork.
3. **Riso Watercolor** — the Hobbs glaze stack limited to 3 spot colors
   with misregistration offsets, marrying №9019's letterpress logic to wet
   media.
4. **Drybrush Field** — inverse piece: dry-brush streaks (low sigma, long
   thin deformed polygons) over a wet wash, texture inversion.
