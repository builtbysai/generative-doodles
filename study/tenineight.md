# TeNinEight: Study Notes (deep, via the Bre Pettis collection)

**Profile:** @TeNinEightNFTs | Tezos generative artist, works in p5.js
**Queue target:** Hic et nunc mint, objkt 278999
**Status:** 2026-09-19, deep study of the artist's body of work. One honest
caveat up front: the specific token page for objkt 278999 could not be
recovered. hicetnunc.art is now a dead parking page, objkt.com/objkt/278999
returns a 404, teia.art/objkt/278999 renders blank, and the fxhash v1 legacy
site is paused. Nothing below claims to describe that specific token. What
follows is TeNinEight's work as held in the Bre Pettis Collection of
Computer Art (bre.art): three projects, five iterations, all visually
inspected, with the artist's own project descriptions read in full.

## Winterland (fxhash, 2021)

Contract KT1KEa8z...3kHaCE, minted November 17, 2021. Three iterations
inspected: #94, #96, #196. The artist's description, verbatim from the
curator page: "A random winter forest landscape. Varies in snow-density,
snowflake-size, wind-strength, skycolor and more. Day/Night cycle based on
your local system-time. Click/Tap for day/night change." Created with p5.js.

What it looks like (all three inspected in night mode): layered ridges of
pine forest receding into snowy hills, the trees drawn as near-black
silhouettes with white snow caps that read as zigzag edges along each
treeline. A thin crescent moon hangs in a starfield with soft blurred
clouds. The ground is broad white drifts; the farthest treeline is small
and sparse, the nearest is tall and dense, which sells the depth. The one
parameter visible across iterations is skycolor: #94 has a rust-red sky,
#96 a deep green one, #196 a warm brown. The palette is flat and
poster-like: one sky tone, one snow white, one near-black for the trees.

Technique (read from the description and the renders): a parameter-driven
landscape generator. Snow density, flake size, and wind strength vary per
mint, so the snowfall is a live particle layer, not baked. The day/night
cycle reads the viewer's local system time, and a click/tap toggles it:
two full palette swaps for the price of one piece. The trees are clearly
procedural spruce shapes (stacked triangle tiers) placed along noise-driven
ridge lines, shrinking with depth.

What makes it sing: it is a postcard generator, and it knows it. The
composition never changes (moon upper right, three treeline bands, snow
below), so the randomness only touches atmosphere: sky color, snow, wind.
That restraint is why every iteration looks finished instead of
experimental. The system-time day/night is the clever bit: the piece is
different at noon and midnight without any user input at all.

## Color Clouds #49 (2022)

Made for #fxhashturnsone, the one-year anniversary of fxhash. The artist's
description: "a result of experimenting with multi-layered flow-field
visualisations in p5.js." Half of all revenue including royalties was
pledged to the Processing Foundation. Live interaction: hit 's' to save the
current frame.

What it looks like: saturated neon-green blobs in overlapping translucent
layers, like looking down at algae blooms or oil on water. No linework, no
particles visible, just soft tonal masses with hard-ish edges where layers
meet. It is the opposite of Winterland: no composition, no horizon, pure
field.

Technique: multi-layered flow-field visualization. The most plausible read
is several flow-field passes at different scales composited with alpha,
each layer tinted a different green, so the eye reads depth where there is
only overlap. The 's'-to-save interaction tells you it is meant to be
paused and kept: the animation is the search, the saved frame is the piece.

## Terrainity #17 (2023)

The artist's description: "the result of experiments with perspective
drawing (and sorting), tracing noise-field contours and circle-pack
algorithms. The base terrain is randomly generated for every (fx)hash,
while some attributes can be configured through (fx)params." Interaction:
move the mouse (or tap and drag) to change perspective; on iOS, gyroscope
via a double-tap opt-in.

What it looks like: an aerial view of alien terrain. Diagonal bands of
blue-gray, each a traced noise-field contour, step down like topographic
stripes. A rust-red ridge (a fault line) cuts diagonally across the bands.
Circle-packed rocks and boulders sit on the surface with correct overlap
sorting, a few sparse pine sprites for scale, and faint wind-blur streaks.
The palette is dusty and desaturated against the red accent.

Technique: this is the most technical of the three. Tracing noise-field
contours means marching-squares-style iso-lines of a 2D noise field, drawn
as filled bands. The circle packing places the rocks without overlap.
"Perspective drawing (and sorting)" plus the mouse-driven viewpoint means
the scene is projected from a movable camera with painter's-algorithm
depth sorting. (fx)params expose some attributes to the minter, which is
the fxhash-native way to let collectors co-author a piece.

What to take from it (study, not copy):
- The Winterland formula: fixed composition, random atmosphere. For a
  doodle series, locking the layout and randomizing only light, weather,
  and palette is a reliable way to get "every seed looks good."
- System time as an input. A day/night or seasonal shift driven by the
  viewer's clock costs almost nothing and makes a static page feel alive.
  Cheap, honest dynamism.
- (fx)params as a design pattern: expose two or three attributes (ridge
  color, rock density, contour count) and let the interaction be
  configuration rather than gameplay.
- Contour-band terrain: filled iso-bands of a noise field read as
  topography with zero shading math. A good primitive for plotter work too,
  since each band is just closed curves.

Avoid-list: no source was read for any of these (the fxhash live views
are down), so the technique notes above are reads from the artist's
descriptions plus the renders, flagged as such. If the live pieces come
back, the Winterland tree-drawing code is worth reading: the snow-cap
zigzag on the treelines is doing a lot of visual work and I would like to
know exactly how it is built.
