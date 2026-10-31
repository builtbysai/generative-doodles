# №597 — Microhistorias Geselinas

EXPANSION #72 clara-lagos, prompt block 5 "Un Jardín Sobre el Mar".

## Concept

Her museum thesis as a walk: the small coastal town of Villa Gesell archived
in numbered vignettes, after her 2026 Museo Histórico exhibition "Un jardín
sobre el mar". There is no map and no postcard gloss; the walk IS the map.
One long horizontal band scrolls in three parallax layers: the pine forest
behind (the piece's only green), the sandy street in the middle with the
historic chalet, low houses, a lemon tree, a toad, a street pine and a fenced
garden patch, and in front the garden that "a finales de agosto comienza a
florecer", with the sandy path at the bottom. At the end of the street the
sea glints in soft blue strokes, and then the band loops, because a town you
live in has no end.

Six numbered flags are planted along the street. Each opens one vignette in
her numbered style (big number, one title-word, one plainspoken
micro-moment, a tiny drawing): 1 Limones, 2 Sapo, 3 Carpintero, 4 Chalet,
5 Jardín, 6 Mar. The texts are hers, kept verbatim. As a flag passes the
centre of the view it lifts and its number swells, the visual form of the
soft chime the prompt describes. Dragging walks the town; left idle, the
piece walks itself very slowly.

Palette is strict: ink #1A1A1A, paper #FAF7F0, soft blue #3E6FA8 (the sea
and small flower heads), pine green #4A6741 (the forest only). Flat fills,
no gradients.

## Construction

- Single self-contained canvas piece on the batch's shared boilerplate:
  Visual Viewport sizing with resize listeners on visualViewport and
  window, canvas CSS size pinned in px inside draw() every frame, phone
  detection via window.screen (min dimension < 700px) with the aspect
  fallback, 1000x1000 stage fitted with Math.min(viewW/1000, viewH/1000)
  so the whole band fits a 390px phone width unclipped.
- Three looping segments, all content precomputed at load from mulberry32
  (seed 597072): back segment 1500 wide at parallax 0.30 (two depths of
  filled green pine silhouettes, jittered polygons); mid segment 2600 wide
  at parallax 0.60 (street, seeded stroke data for the lemon tree, houses,
  toad, street pine with woodpecker, chalet, fenced garden patch and the
  blue sea strokes, plus 340 seeded sand-grain dots and 30 short sand
  streaks); front segment 1100 wide at parallax 1.0 (17 seeded flowers,
  scalloped bushes, grass tufts, path grain). Every segment is at least
  1000 wide, so two translated copies always cover the stage and the wrap
  is seamless.
- The mid layer carries a constant phase (1175) chosen so that frame one,
  at walk position 0, shows exactly the specced resting view: the chalet
  centred left (its flag, №4, in front of it), flag №5 at the garden patch
  also visible, the garden in front, the forest behind.
- Flags: pole and paper cloth with the number hand-lettered on it. The
  centre-chime is computed from screen position: proximity to x=500 lifts
  the flag up to 7 units, adds a gentle bob (sin of the piece clock) and
  swells the number up to 1.4x; past 55% proximity two small signal arcs
  appear beside the cloth. Hit testing recomputes flag screen positions
  from the same offset used for drawing.
- The vignette card is a precomputed wobbly notebook rectangle (jittered
  once at load) with a soft ink shadow, the big number, the title-word, a
  wavy divider, the micro-moment wrapped in the hand font, and a small
  dedicated drawing per vignette (two lemons, a toad, the woodpecker on
  its trunk, the chalet, three garden flowers, blue waves). One card at a
  time; any tap closes it.
- Interaction: pointer drag walks (drag distance divided by the mid
  parallax so the street tracks the finger; back and front layers follow
  at their own rates). A tap (under 8 units of movement) on a flag opens
  its card; a tap anywhere with a card open closes it. After 2.5 s without
  interaction, and with no card open, the walk resumes on its own at 7
  units per second.
- Determinism: frame one is the synchronous draw from resize() at
  PHASE0 = 0 and walk = 0; flag bob is sin(0 + n*1.3) scaled by proximity,
  a fixed constant per flag. All animation time is PHASE0 +
  elapsed-since-load via a typeof-guarded requestAnimationFrame loop; no
  Date.now anywhere (grep count 0), no audio, no microphone, no external
  assets, no offscreen canvas, no filters.

## QA log

- Rendered with ~/workspace/tools/render-piece.js (node-canvas):
  qa-desktop.png 1280x900, qa-mobile.png 390x844, thumb.png 720x720.
- Determinism gate: thumb.png rendered twice and cmp-compared
  byte-identical after the final edit; the second render was deleted.
- Desktop read-back: two depths of green pines behind; the chalet
  centre-left with steep roof, round gable window, balcony and door path;
  the fenced garden patch with blue and ink flower heads; house C and the
  blue sea glints at the right; the street pine entering at the left;
  flags 4 and 5 planted on the sandy street, numbers legible; the front
  garden's tall flowers (ink and blue heads) over the sandy path;
  "drag · tap" hint bottom right.
- Mobile read-back: the whole stage fits the 390 width, chalet, fence,
  both flags and the garden legible, nothing clipped; the hint sits below
  the stage on the paper ground.
- Thumb read-back: the composition reads at gallery size: forest, chalet,
  two numbered flags, flower garden in front.
- Card state verified with a throwaway forced-open render (deleted
  after): card №3 Carpintero shows the big number, title-word, wavy
  divider, the micro-moment wrapped over two lines verbatim, and the
  woodpecker miniature; the shipped file opens no card at load.
- Fix during QA: an early pass added pebble ellipses to the street; at
  render size they read as stray glyphs, so they were replaced with short
  sand streaks and denser grain, which read as sandy texture in her ink
  vocabulary. All renders were redone and the determinism gate re-passed.
- Interaction paths are code-verified only (the QA renderer fires no
  pointer events): drag mapping, flag hit zones, card open/close and the
  auto-walk timer all read directly from the shipped script.

## Deviations

- The prompt says markers "chime softly" as they pass. Gallery pieces are
  silent by house rule, so the chime is visual only: a flag near the
  centre lifts, its number swells, and two small signal arcs appear
  beside the cloth. No audio of any kind is produced.
- The front garden runs the full length of the walk (it is the town's
  foreground everywhere), while the numbered Jardín vignette is anchored
  to the fenced garden patch in the mid layer; the prompt's garden is
  both a place on the street and the piece's framing device, and this
  keeps both readings.
- The sea glimpse sits at the segment seam, so on wide letterboxed
  screens a few blue strokes can appear at the right edge at frame one;
  in the loop's geography that is the same end of the street coming
  around, and on square and phone frames it sits off-view until walked
  to.
- The auto-walk pauses while a vignette card is open (and for 2.5 s
  after any interaction) so the micro-moments can actually be read; the
  prompt fixes the idle auto-drift but not its behaviour under an open
  card.
- The vignette miniatures are simplified glyph versions of each scene
  (two lemons, a toad, a bird on a trunk) rather than re-drawings of the
  full street elements, sized to sit under the card's text in her
  notebook manner.
