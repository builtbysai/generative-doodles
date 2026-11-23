# №1682 "One Structure, Eleven Palettes" (KG3) - process notes

Third piece of EXPANSION #221 kjetil-golid, prompt PP929 Chromatome.
Built 2026-11-10 from TASKS.md lines 16345-16353. Formula date
2006 · 08 · 20. Live №1672 "Flow Field, Thick Blocks" used as the
code template.

## What it is

The palette is the mechanism. One subdivision city is built once from
a seeded recursive binary split (mulberry32(1682)), frozen mid-build
at a dense state, and held absolutely still while eleven palettes cut
through it one at a time, each holding four seconds. The geometry
never moves a pixel between swaps: same tree, same 180 leaves, same
per-leaf heights and color slots. Only the dressing changes, so the
viewer feels the SAME object become a different place eleven times.
The swaps are instant cuts, not fades: the shock of the swap is the
point.

Each leaf is a shallow isometric block, flat fills only: front face in
the palette color, top face lightened, right face darkened, no
gradients. Painter order is back to front by x + y, so a nearer
block's extrusion paints over the block behind it. Ground gaps between
blocks take the active palette's ground color.

The eleven palettes, in cycle order, with the label the piece shows
for each:

1. Mustard and Red, hand-built: mustard #D9A021, red #B33A2B, cream.
2. Rose and Maroon, hand-built: rose #D97B7B, maroon #7A2A35, pale pink.
3. Purple and Yellow, hand-built: purple #6B4E8E, yellow #E8B425,
   blue #2B4A8C, on a turquoise #5BB8B0 ground.
4. Monaco colorway, hand-built: teal, green, plum, dark teal.
5. Block Work, hand-built: black, white, grey on paper.
6. Pastel 3D, hand-built: pastel pink, blue, mint, lilac, yellow.
7. Blueprint, hand-built: blueprint blue, dusty pink, orange, maroon
   on a technical ground.
8. Dark Plum, hand-built: plum shades on a dark plum ground, with red
   clusters: leaves whose seeded spatial-noise value passes 0.62 turn
   red, so the red gathers in patches instead of scattering.
9. Arctic, hand-built: ice blue, white, slate, deep blue.
10. Vermilion Field, hand-built: vermilion, ochre, teal, near-black.
11. Random Noise, random: five unrelated hues generated procedurally,
    landing last in each cycle as the contrast beat that shows why
    Golid keeps color away from randomness.

A small plate names each set and whether it is hand-built or random,
with its position in the cycle ("4 · Monaco colorway",
"hand-built · palette 4 of 11").

## Deviations from the prompt

- The random-noise palette is generated once from a fixed seed
  (mulberry32(168210)) instead of re-rolling per load. It is random in
  character, five unrelated hues with no curation, but deterministic in
  fact, so the piece keeps its fixed-phase first frame and the thumb
  re-renders byte-identical. The contrast the prompt asks for is in
  the palette itself, not in re-rolling it.
- The three rarer sets are Arctic, Vermilion Field, and Random Noise;
  the random set counts as one of the three rarer sets, so the eleven
  are the eight named sets plus two hand-built rarer sets plus the one
  random set.
- Palette hold is four seconds each, a 44 second full cycle.
- Frame one is palette 1 of 11, Mustard and Red.

## Asserted counts

- Eleven palettes, verified by probe: drawAt(t) for t = 0, 4, ... 40
  returns indices 0 through 10 in order, then wraps to 0 at t = 44.
- Exactly one random palette (index 10, Random Noise); the other ten
  are hand-built literal sets.
- 180 leaves in the frozen structure, counted by probe.
- Geometry identical across palettes: the Dark Plum, Monaco, and
  Random Noise renders were compared visually against the Mustard and
  Red frame; leaf positions, sizes, and heights match exactly.

## House rules

- Visual Viewport sizing; resize listened to on visualViewport and
  window. Canvas element pinned in draw() via canvas.style.width/height
  in px. Phone detection via window.screen (min dimension under 700px)
  with aspect fallback (h > w*1.15). Field-like composition, full-bleed
  on phones, square on desktop; the page ground is the active
  palette's ground color.
- One synchronous frame at load; requestAnimationFrame calls guarded by
  a typeof check so node-canvas QA works.
- Deterministic fixed-phase first frame: seeded RNG only
  (mulberry32(1682) for the tree, mulberry32(168207) for the cluster
  noise, mulberry32(168210) for the random palette), no Date.now() or
  Math.random() anywhere. Two renders of the thumb produce identical
  md5s.
- No em dashes in visible copy; no AI-signature copy; watch-only, no
  click-to-reload and no other interaction. Title/date/palette/hint
  plates drawn on canvas: "One Structure, Eleven Palettes",
  "2006 · 08 · 20", the palette name plate, "Watch only."

## QA results

Rendered with node ~/workspace/tools/render-piece.js from the actual
script and visually inspected all three:

- Desktop 1280x900: dense mustard/red/cream city, square field
  centered on its own ground, iso blocks with clear face shading,
  plates legible.
- Mobile 390x844: same structure stretched full-bleed, tall cells,
  plates legible.
- Thumb 720x720 (thumb.png IS this render): reads clearly at small
  size, same city.
- Palette spot checks rendered at 720x720 and inspected: t=12 Monaco
  (teal/green/plum, legible), t=28 Dark Plum (red clusters gathered
  in patches, plates legible on the dark ground), t=40 Random Noise
  (clashing magenta/mint/blue/tan, labeled random, geometry identical
  to the other frames).
- Determinism: thumb rendered twice, identical md5
  8ad99515f124dbb858e9b8d59b55397e.

## Files

- index.html (md5 496327cc1a294cf0f35176e05dd5c985)
- thumb.png (md5 8ad99515f124dbb858e9b8d59b55397e, the 720x720 render)
- process.md (this file)

Gallery note: "One frozen subdivision city, eleven palettes cutting
through it, same structure every time. Watch only."
