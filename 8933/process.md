# №8933 · Spiral Zap — process notes

## Seed
273 "Spiral Zap" — backfill piece dated 2026-06-26 (day 8933 since 2002-01-10).
From FUTURE_PIECES seed 34, pro-color-harmonies lineage (study: `study/pro-color-harmonies.md`).
Study-informed, not copied: the zap (spiral) modifier and the triadic chroma
narrative were re-implemented from the study notes in plain canvas with my own
OKLCH to sRGB conversion and gamut clamping.

## Concept
A color-theory parameter sweep as the composition itself. One quiet seeded
6-color triadic palette (OKLCH, base chroma 0.10 with the triadic chroma
narrative [0.7, 1.0, 0.85, 1.0, 0.75, 0.6], named-mud-zone halving for muted
colors, slight seeded arm wobble) is drawn as the same nested-disc stack in ten
panels. Panel i applies the zap (spiral) modifier at intensity m = i/9: position
along the palette becomes an angle (tightness 0.2 + |m|), radius is sqrt-scaled,
hue shift = cos(angle) * radius * 150 * m, and lightness plus chroma take the
sine component. Geometry never changes; only the palette is zapped, so the row
walks from one calm triadic stack to one feral stack and the tipping panel
(typically m .56 to .67, where the outer discs fold into foreign hue families
and one ring drains toward neutral) shows itself without any label. Palette
index 5 sits on the broad outer disc and index 0 at the calm core, so the big
areas take the hit while the pivot color anchors every panel. Each panel gets a
slim intensity track (0 to 1) as the only annotation, an axis label, not a tell.
Click or tap re-rolls the base triadic palette; ?seed= is supported, default 273.

## Family
spiral (zap) hue-rotation parameter sweep across ten identical nested-disc
panels over a quiet seeded 6-color triadic base — the palette, not the
geometry, is the subject.

## Differentiation
Nothing in the gallery treats a palette transform as the composition. Nearby
pieces keep color fixed and move something else: №8978 Mud Map diagrams mud
zones on a hue wheel, №8962 Reverse Lookup ranks a palette by rule, №8951
Prime Petals spends hues on a rosette, №9017 Strata Break dissolves geometry
in rings. Here the geometry is deliberately frozen so the only event is a
triadic palette losing its harmony under a spiral modifier, one honest step
at a time. It never reads as a rainbow demo because the base stays quiet and
triadic and the spiral, not a hue cycle, does the damage.

## Iteration
First render kept palette index 0 on the outer disc, so the zappy indices
landed on small inner rings and the sweep read as gentle drift with no visible
tip. I reversed the mapping (index 5 outer, index 0 core), raised the hue
factor from 90 to 150 and the chroma/lightness sine weights, and lifted the
lightness ladder so panel 0 stays quiet without going murky. Verified the
calm-to-feral arc and the .56/.67 tipping zone across five base palettes:
seeds 273, 101, 42, 7, plus a random click re-roll. All held: calm through
.44, an obvious identity break mid-row, a feral final panel, no rainbow read.

## Verification
Zero console/page exceptions via cdp_exceptions.py at 1280x800 and 390x844
(isolated Chrome, port 9341), and zero console entries in every screenshot run.
Responsive: ten panels in one row on desktop, a 2x5 stack under 720px wide,
no scroll or overflow at 1280x800 or 390x844. Click re-roll tested live via
CDP input dispatch: the palette changes, no errors.

## Gallery note suggestion
*One quiet palette, zapped harder panel by panel until it goes feral.*
