# FarbVelo: Study Notes

**Site:** farbvelo.elastiq.ch | **Repo:** github.com/meodai/farbvelo (CC-BY-SA-4.0)
| **Doorway:** meodai's RampenSau descends from FarbVelo; both meodai and
Zenkov notes point at Elastiq's color tools.

**Depth: deep.** README engine spec read, the live page's shipped bundle
(main.a666729c.js, 148 KB) read for the real generation code (the README is
accurate but the bundle has more generators than documented), two full random
palettes visually inspected live via headless Chrome, and the "Hue Bingo"
recipe re-implemented fresh in plain canvas (no chroma.js, OKLCH instead of
chroma Lab) and visually inspected: dark anchor, ascending mids, bright end,
plus the radial-glow background effect.

## What it is

FarbVelo, Swiss-German for "color bicycle", is meodai's playful random palette
generator. Hit regenerate (or just reload) and it rolls a new harmonious
palette, shows it as full-bleed horizontal bands with hex codes and real
color names (via his color-names API, 4959 names), and offers a long settings
panel: generation method, quantization, color count, mix padding, lightness
ramp, color mode, interpolation model, color stops, min hue angle, contrasting
colors, black and white, background, glow, color bleed, text visibility,
high contrast, light mode, URL-tracked settings. The GIF export applies the
palette to a GIF by quantization, a nice touch: the palette is not just
swatches, it is a live recoloring engine.

## The engine (from the actual bundle, not just the README)

`generateRandomColors({generatorFunction, random, currentSeed, colorMode,
amount=6, parts=4, randomOrder, colorArrangement="default",
minHueDiffAngle=60})`. Five generator functions:

- **Hue Bingo** (default): pick a base hue, build slots at `minHueDiffAngle`
  around the wheel (capped at 360/parts). Stop 1 is the dark anchor: hue of
  slot 0, saturation random 5 to 40, lightness random 0 to 20 times 0.25 to
  0.75, so genuinely dark. Then `parts-2` mid stops: each takes a random
  remaining hue slot, saturation 50 to 100, and lightness that rises with the
  stop index: `baseLightness + rand(0,10) + (rangeLightness/(parts-1))*i`,
  capped at 95. Final stop reuses the first remaining slot at base
  saturation and lightness `rangeLightness + 10`, the desaturated bright end.
- **Legacy**: like an older CodePen version; the dark anchor is repeated in
  a pow(t,1.5) ramp for the first chunk, then random mid hues.
- **Full Random**: pure noise, included as the control group.
- **Simplex Noise**: hue from 2D simplex noise sampled along the stop index,
  saturation and lightness as ranges. The psychedelic one.
- **RandomColor.js**: wraps the randomcolor library with dark/seed/light
  bookends, same dark-to-light sandwich idea as Hue Bingo.

After the stops are picked, two structural moves:

1. **Color arrangement**: "default" keeps the dark-to-light order, but
   "darkCenter" sorts stops by lightness and folds them so the darkest sits
   in the middle, "lightCenter" does the inverse. A tiny, cheap trick that
   completely changes the read of the same palette.
2. **Interpolation**: `chroma.scale(stops).padding(0.175).mode('lab')
   .colors(amount)`. The 0.175 padding keeps the extreme ends from clipping
   into mud. Interpolation happens in CIE Lab by default, perceptually even.

Hue picking uses HSLuv, the deliberate choice: HSL's hue spacing
over-represents greens and blues, HSLuv distributes hue stops perceptually
evenly, so a 60-degree minimum angle actually means 60 degrees of perceived
difference.

## The two rolls I watched

Roll 1: an analogous blue-to-teal ramp, dark indigo #36376a "Galaxea" at top
through #545cbe "Savoy Blue", #5f76c4 "Flood", #5f8bb3 "Heavenly Sky",
#67a3aa "Atlas Cedar", to pale #9ac3c3 "Pastel Turquoise". Roll 2: forest
#3a7152 "Parsley Sprig" through #5ece92 "Vegetation", #85d6b9 "Cabbage",
#a1c4d7 "Airborne", #b8bbef "Purple Illusion", to #d5d5f4 "Foggy Plateau".
Both rolls obey the sandwich: dark anchor, saturated mids climbing in
lightness, quiet bright end. The "Show Glow" background renders a huge soft
radial wash of the palette behind the bands, barely visible, just enough to
tint the whitespace. Color names do real work: "Parsley Sprig" and "Foggy
Plateau" make you feel the palette instead of reading hex.

## The re-render study

Rebuilt Hue Bingo in plain canvas with a fixed seed: slots came out
194/314/14/254 degrees, bands ran #000101, #203d94, #c941d0, #eb4183,
#ce89d0, #c5cacf, with the radial glow wash behind. Confirmed the recipe's
character: even with 60-degree slot spacing, rolls often land analogous,
because the mids pick adjacent slots and Lab/OKLCH interpolation smooths
between them. The min hue angle is a diversity floor, not a diversity
guarantee. Also confirmed the dark anchor does the heavy lifting: without a
near-black first stop, the whole palette floats and loses its footing.

## What sings

- The sandwich structure is the whole trick. Random hue plus random
  saturation is noise; random hue pinned to dark anchor, rising mids,
  quiet bright end is a palette. Structure before randomness.
- Interpolation in a perceptual space with end padding. RGB interpolation
  between stops would gray out the mids; Lab keeps them alive, and the
  padding keeps the endpoints honest.
- Color names as interface. A palette you can name is a palette you
  remember, and "Galaxea" vs "#36376a" is the difference between a tool
  and a toy.
- The arrangement fold (darkCenter/lightCenter) shows that order is a
  first-class parameter of a palette, not an afterthought.

## What is overdone / avoid-list

- Simplex Noise mode is the cautionary exhibit: unconstrained noise through
  the same pipeline reads as cheap rainbow churn. The constraint is the
  product, not the randomness.
- Analogous-by-accident rolls (both of my rolls, and much of the default
  output) can feel samey across sessions. If every roll is blue-to-teal,
  the tool is a mood, not a generator. The min hue angle slider exists for
  a reason; lower values are not braver, they are muddier.
- Full-cycle hue ramps echo meodai's own avoid-list from the poline study:
  rainbow gradients are the fastest way to make generative color look cheap.

## Doorways for future passes

- Elastiq's Albers (albers.elastiq.ch), David Aerne's Josef Albers homage,
  the other Elastiq color piece in this family.
- okpalette.color.pizza, the production palette tool using the same
  colorsort-js stack meodai's skill notes cite.
- Okazz on OpenProcessing, whose stamps sketch meodai forked for the
  RampenSau p5 example: the OpenProcessing stamps/scene culture, still
  unstudied.
