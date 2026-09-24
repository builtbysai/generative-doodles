# meodai (David Aerne): Study Notes

**Site:** github.com/meodai (profile README), meodai.github.io/poline,
meodai.github.io/rampensau | **Key works:** Poline, RampenSau, ray-color,
RYBitten, dittoTones, Color Router, Harmony Clock (fxhash u/meodai, studied in
fxhash-slugs.md)

**Depth: deep.** Full poline source read via its published module bundle
(unpkg), both interactive demo pages opened and visually inspected at full
page (1400x900 viewport, whole page captured), and the core journey algorithm
re-implemented from scratch in plain canvas and visually inspected. The
re-implementation was written fresh from understanding, not copied: own names,
own structure. ray-color / RYBitten / dittoTones read from their READMEs and
profile writeup (text-deep, demos not rendered this pass).

## The thesis: relationships, not choices

His profile README states the whole program: "impatient with repetition and
fascinated by surprise." Every tool he builds treats a palette as a system of
relationships (anchors, lights, perceptual curves, formulas) instead of a list
of picked colors. Change one input, the system re-resolves coherently. This is
the same move as Harmony Clock: the form is fixed and legible (a clock), the
entire novelty budget goes into the generative color engine. Design decisions
made once, by math, instead of per-output by hand.

## Poline: palettes as eased journeys through color space

The core mechanic, read from the source:

- An anchor color [h, s, l] becomes a point [x, y, z] in a cylinder:
  angle = hue, radius = lightness / 2, z = saturation. So the 2D wheel the demo
  draws is hue-around, lightness-out (center black, edge white); saturation
  lives on the hidden depth axis.
- A palette is the path between consecutive anchors, sampled point by point.
  Each axis (x, y, z) is interpolated with its own position function
  (easing): linear, exponential, quadratic, cubic, quartic, sinusoidal
  (default), asinusoidal, arc, smoothStep. Because interpolation happens in
  XYZ space, hue automatically takes the sensible route through the wheel
  with no 0/360 wrap problem.
- Odd segments invert the easing (ease applied to 1-t), so neighboring
  segments mirror each other's density rhythm.
- Different easings per axis bend the path: the demo's "ARCS" section shows
  sinusoidal on x, quadratic on y, linear on z, which curves the journey
  through the wheel instead of drawing straight chords. Dense sample
  clustering (arc easing) vs even spacing (linear) is the visible
  difference between palettes that linger in one mood vs palettes that
  march.
- Extras: closedLoop (last anchor joins first, with the 2-anchor special
  case handled), shiftHue(n) for animating a whole palette by rotating every
  anchor's hue, getColorAt(t) sampling any point along the full journey,
  invertedLightness (radius becomes 1 - lightness), clampToCircle for the
  wheel boundary, closest-anchor query used by the playground UI.
- Default summoning: two random anchors, hues 60 to 240 degrees apart,
  saturation and lightness drawn from split bands. Just enough separation
  for the journey to have somewhere to go.
- Ships as a web component, plus Token Beam export straight into Figma /
  Adobe XD. It won a Swiss Design Award 2026 in Interaction and Media Design.
  Credited inspiration: Anatoly Zenkov's idea (doorway, not yet followed).

Re-render confirmed the feel: with default sinusoidal easing the journey is a
straight chord with samples easing in and out at the ends; with arc easing
the samples bunch mid-path; with mixed per-axis easings the path visibly
curves through the wheel and the resulting strip has a gradient that
hesitates and rushes. The path itself is prettier than most palettes.

## RampenSau: hue cycling with easings

The older, simpler sibling. generateColorRamp takes total, hStart, hCycles
(fractional wheel turns, negative reverses direction), hStartCenter (where in
the ramp the start hue sits, default 0.5 so ramps open in the middle of the
wheel), per-channel easing for h/s/l, and a transformFn hook for post
adjustments. It also ships colorHarmonies (complementary, splitComplementary,
triadic, tetradic, pentadic, hexadic, monochromatic, doubleComplementary,
compound, analogous) and uniqueRandomHues with a minimum angular gap, plus
generateColorRampWithCurve with curve methods (lame, arc, pow, powX, powY)
that he recommends running in HSV because "lightness and saturation are both
100% at the upper right corner of the HSV slice."

The outputs are "HXX" triplets, deliberately model-agnostic: same numbers
read as HSL, HSV, LCH, or OKLCH. His stance is that the polar structure is
the palette; the color space is just the rendering.

The demo page is a full interactive doc on a dark green editorial layout:
ramp bars labeled with their HSL triplets, a 7x4 grid of random palette
chips, click-and-hold regenerating quad squares, a continuous gradient bar,
and named color cards ("Lindworm Green", "Flesh and Blood", "Girl Power")
with contrast ratios. It reads as a design tool first, library second.

## ray-color, RYBitten, dittoTones, Color Router (text-deep)

- ray-color: "edit the conditions, not the colors." A tennis ball under
  Philips Hue room lights kept becoming new palettes that always fit
  together, because they were the same light in the same room. So he
  simulated the room: one sphere, a five-sided box, up to three colored
  lights, and the palette is sampled off the sphere's surface. Coherence by
  construction, from physics instead of theory.
- RYBitten: RGB to RYB conversion emulating Johannes Itten's chromatic
  circle with trilinear interpolation, so digital mixing behaves more like
  paint. v1.0, 215 tests, 95% branch coverage. He treats the subtractive
  wheel as a real tool, not a nostalgia prop.
- dittoTones: extracts the perceptual DNA (Lightness and Chroma curves in
  Oklch) of Tailwind / Radix ramps and maps a new hue onto those curves, so
  a custom palette inherits the reference system's contrast behavior.
- Color Router: palettes as formulas ("darken primary by 15%", "choose
  highest-contrast brand color") so one variable change re-resolves
  everywhere.

## What sings

- The cylinder mapping is the insight: putting lightness on the radius and
  saturation on the z-axis makes a palette literally a walkable path, and
  easings become compositional controls. Anyone can lerp HSL; almost nobody
  thinks about the distribution of samples along the walk.
- Harmony Clock proves the strategy scales to art: fixed legible structure
  plus a generative color engine means every output is coherent by
  construction, and the 0.05% rarity variation (palette as background) costs
  almost nothing to implement.
- The writeups are part of the work: each repo teaches the technique as it
  ships the tool. The demos are documentation you can play with.

## What is overdone / avoid-list

- Full-cycle hue ramps (hCycles = 1 or more) default to rainbow churn; his
  own defaults keep cycles fractional and center the hue mid-ramp. Rainbow
  gradients are the fastest way to make generative color look cheap.
- HSL-only output banding: his newer work pushes everything through Oklch /
  LCH for the wide gamut. Treat HSL as the sketch space, not the final
  space.
- The esoteric branding ("mystical witchcraft", "sorcerer") is charming on
  his pages but it is packaging, not technique. Do not imitate the voice,
  imitate the systems thinking.

## Doorways for future passes

- Anatoly Zenkov, credited as poline's inspiration. Search was unavailable
  this session (tool 401), so this is the next hop: his circular-harmonic
  work is presumably where the anchor-on-a-wheel idea came from.
- Farbvelo (farbvelo.elastiq.ch), the project RampenSau is based on,
  same studio (Elastiq).
- Okazz on OpenProcessing, whose stamps sketch meodai forked for the
  RampenSau p5 example: a hop into the OpenProcessing stamps/scene culture.
- His fxhash profile (fxhash.xyz/u/meodai) for the artist network around
  Harmony Clock.
