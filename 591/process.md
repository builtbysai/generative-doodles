# №591 — ¿Dónde Estar?

EXPANSION #71 julia-barata, prompt block 7 "La Duda del Inmigrante".

## Concept

The migrant's doubt as a pendulum. Two cities in her ink line face each other
across the widest part of the page: Lisbon on the left (tiled facades, a tower,
the red tram under its wire), Buenos Aires on the right (a café with a scalloped
awning, a jacaranda, a tall balconied building, the wide avenue converging
below). Between them, on a sagging tightrope line, stands her small clumsy
self-avatar with the red suitcase. The between-space is the largest area of the
piece and is filled with a faint blue-grey wash: doubt has the most room.

The figure is pulled between the cities and never arrives. Dragging it toward
a city leans it that way and brings that city to full strength while the other
fades to about 35 percent; releasing always lets the pendulum swing it back to
centre. There is no home state, no arrival, no choice to make: settling is
impossible by design. Tapping a city raises her own words above it for a few
seconds: Lisbon gets "¡Que sé yo qué estoy haciendo!", Buenos Aires gets
"¡Estoy viviendo!". Watch-only, the avatar sways slowly on the rope forever.

Palette is strict: ink #1A1A1A, paper #FAF7F0, flat red #D42B1E spent only on
the tram and the suitcase, blue-grey #8A9AA8 only as the between-space wash.

## Construction

- Single self-contained canvas piece, built on the batch's shared boilerplate:
  Visual Viewport sizing with resize listeners on visualViewport and window,
  canvas CSS size pinned in px inside draw() every frame, phone detection via
  window.screen (min dimension < 700px) with the aspect fallback, 1000x1000
  stage fitted with Math.min(viewW/1000, viewH/1000) so both vignettes and the
  avatar fit a 390px phone width unclipped.
- All linework is precomputed seeded stroke data (mulberry32, seed 591071):
  jittered polylines for the two city vignettes, the avatar, and the rope
  posts. The wash is 20 precomputed translucent ellipses drawn directly; no
  gradients, no filters, no offscreen canvas. Paper speckle is seeded data
  drawn as tiny rects. Filled shapes (tram body and windows, suitcase and its
  paper sticker) are plain path fills inside the same seeded drawing pass.
- The rope is a quadratic curve (control point 104 units below the anchors);
  the avatar's feet sit on ropeY(x) computed from the same curve, so it rides
  the sag as it moves.
- Pendulum: displacement disp in [-1, 1]; while not dragging, a damped spring
  (k = 2.6, damping 0.5, period about 3.9 s) integrates in tick() with dt
  clamped to 50 ms; rest position is exactly centre. On top of that, an idle
  sway (0.045 rad, 7.3 s period) keeps the figure moving even once the spring
  settles. City strengths are derived from disp: the far city drops to 35
  percent at full displacement, the near city stays full; at rest both are
  equal and full.
- Interaction: pointerdown near the avatar starts a drag (displacement follows
  the pointer at 220 stage units per full swing, clamped); pointermove redraws
  immediately; pointerup releases into the spring. A tap (pointerup with under
  8 units of movement, not on the avatar) in the left third raises the Lisbon
  fragment, in the right third the Buenos Aires fragment, in the middle clears
  it. Fragments fade in over 0.35 s and out over the last 0.9 s of a 4.6 s life,
  timed on the piece's elapsed clock.
- Determinism: frame one is the synchronous draw from resize() at PHASE0 = 0:
  disp = 0, sway = sin(0) = 0, avatar dead centre, both cities at full equal
  strength. All animation time is PHASE0 + elapsed-since-load via a
  typeof-guarded requestAnimationFrame loop; no Date.now anywhere (grep
  count 0), no audio, no microphone, no external assets.

## QA log

- Rendered with ~/workspace/tools/render-piece.js (node-canvas):
  qa-desktop.png 1280x900, qa-mobile.png 390x844, thumb.png 720x720.
- Determinism gate: thumb.png rendered twice and cmp-compared byte-identical;
  the second render was deleted.
- Desktop read-back: Lisbon left with tiled facades, merloned tower and the
  red tram with paper windows under its wire; Buenos Aires right with café
  awning, hanging sign, table, jacaranda canopy and tall building; avatar
  centred on the sagging rope, red suitcase in hand with a paper sticker;
  blue-grey wash pooled in the between-space above and around the figure;
  LISBOA and BUENOS AIRES hand-lettered under the vignettes; "drag · tap"
  hint bottom right. Red appears only on the tram and the suitcase.
- Mobile read-back: the whole stage fits the 390 width, both vignettes, the
  avatar, the wash and both names legible, nothing clipped; the hint sits
  below the stage on the paper ground.
- Thumb read-back: composition still reads at gallery size; the two red
  accents (tram, suitcase) carry the eye to the two poles of the doubt.
- Interaction paths are code-verified only (the QA renderer fires no pointer
  events): drag mapping, spring return, tap zones and fragment envelope all
  read directly from the shipped script.

## Deviations

- The jacaranda is drawn in ink only. Her palette has no violet, so the tree
  is identified by its scribble canopy, falling dots and placement beside the
  café rather than by blossom colour; adding a fifth colour would break the
  strict palette.
- The tram wire runs the full width of the Lisbon vignette at pantograph
  height, crossing the facades, so the pantograph visibly meets it. It reads
  as the street's overhead wire, which Lisbon's trams in fact run under.
- Tap fragments are plain hand-lettered text with no bubble outline, matching
  the unboxed hand-lettering used elsewhere in this study's pieces; the
  brief's two fragment texts are split one per city (Lisbon: "¡Que sé yo qué
  estoy haciendo!", Buenos Aires: "¡Estoy viviendo!"), as specified.
- The avenue is drawn inside the Buenos Aires vignette's lower area and the
  city names sit just below it; on the shared 1000-unit stage this keeps the
  names clear of the rope on narrow screens.
- A small paper luggage sticker on the suitcase uses the palette's paper
  colour; it is a detail of the specced suitcase, not a new element, and the
  red budget is unchanged (tram + suitcase only).
