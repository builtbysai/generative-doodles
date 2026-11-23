# No.513 Island of Small Things

EXPANSION #62 giulia-pastorino, prompt GP1. Her "Ehi laggiu, basta cosi"
cover mechanism as a generative composition: one giant black silhouette
stuffed with tiny colored things, cream creatures riding its top, and a
hand-lettered invented phrase over a loud flat ground.

## Concept

- Hot pink ground #F2285E with crayon grain; deep blue sea strip #2033B0
  along the bottom; the black silhouette #161616 sits on the strip.
- The silhouette is one of three seeded families (island, whale,
  mountain), built as a blobby union of 8-9 overlapping circles. The
  shipped seed rolls the mountain: a stacked peak with a creature on
  the summit.
- Interior: 54 tiny motifs from one themed set (the shipped seed rolls
  "table things": bottles, cups, forks, stars), each 18-38px at the
  1080 design scale, in the six flat motif colors, no two adjacent
  motifs sharing a color. Motifs drift a few pixels on slow sine
  phases, like things floating inside the mass.
- Three cream creatures perch on the silhouette's top contour, drawn
  in her two-dot face grammar: two dot eyes and one bent-line mouth,
  nothing more. They bob gently.
- The phrase is invented, three words ("OMI LAGGIU BASTU" on the
  shipped seed), hand-lettered in yellow #F5C81C stroke glyphs in the
  upper third, never touching the silhouette. No real words anywhere.
- Watch-only ambient loop. Double-tap reseeds: new silhouette family,
  new motif set, new phrase. Never click-to-reload.
- Flat fills only. No gradients anywhere.

## Construction

- Single self-contained index.html, canvas 2D, no external assets.
- Canvas size from the Visual Viewport API, resize listeners on
  visualViewport and window; canvas.style.width/height pinned in px
  inside draw() every frame. Phone detection via window.screen
  (min dimension < 700px) with the h > w*1.15 aspect fallback; the
  square stage is fit and centered so the composition keeps its shape
  on phones, page ground = the hot pink.
- Seeded RNG (mulberry32, fixed seed 513062; ?seed= override supported
  for QA). Everything in the scene is built once per seed: silhouette
  circles, letters, motifs, creatures, texture specks.
- Motifs are placed on a jittered 84px grid, kept only when the point
  sits inside the circle union with margin, with the color rule
  checked against the left and above grid neighbours; a top-up scatter
  (minimum spacing 50px, color different from the nearest neighbour)
  raises the count until the density holds. Drawn under a clip built
  from the same circle union, so nothing ever spills outside.
- Letters are stroke polylines from a hand-drawn unit-box glyph table,
  drawn twice (a soft offset underpass plus the main stroke) for a
  crayon body, with per-letter rotation, baseline jitter and specks.
  The phrase auto-fits to a 940px measure.
- Creatures are placed on the highest bumps: for each candidate x the
  top contour is solved from the circle union, so they sit exactly on
  the silhouette edge at any seed.

## Deviations

- Crayon texture is a precomputed seeded array of short speck strokes
  drawn directly each frame (three arrays: ground, silhouette grain,
  sea strip). The QA renderer has no offscreen canvas or
  document.createElement, so a pre-rendered grain canvas is not
  possible; the speck arrays give the same static pastel texture.
- The silhouette's bottom is clipped to a straight base line where it
  meets the sea strip, so the mass rests on the strip with a clean
  edge instead of the lowest circle bottoms dipping into the blue.
- The shipped seed rolls the mountain variant of the silhouette
  family and the "table things" motif set; island and whale variants
  and the sea, garden and mixed sets appear on reseeds.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js (node-canvas):
  qa-desktop.png 1280x900, qa-mobile.png 390x844, thumb.png 720x720.
- Determinism gate: thumb.png rendered twice and cmp byte-compared,
  identical (re-verified after the density pass). The first frame is
  the synchronous draw at the constant loop phase PHASE0 = 1.7s; the
  rAF loop is typeof-guarded and anchored as PHASE0 + elapsed since
  load; no clock value feeds frame one.
- Scene stats logged from a debug copy of the file (not shipped):
  type=mountain, theme=table things, motifs=54, creatures=3,
  phrase=OMI LAGGIU BASTU.
- Visual read-back of all three renders: pink field with crayon
  specks; yellow hand-lettered phrase in the upper third, clear of
  the silhouette; black mountain mass filling the lower center,
  densely packed with 54 colored bottle, cup, fork and star motifs,
  none spilling outside the edge; three cream two-dot-face creatures
  perched on the peak, the left bump and the right slope; deep blue
  strip along the bottom. Mobile letterboxes the square stage on the
  pink ground, nothing clipped.
- Density pass during QA: the first build held 44 motifs with thin
  patches near the silhouette edges; containment margin and top-up
  spacing were tightened, bringing the count to 54 with even coverage.
- No audio, no microphone, no external requests.
