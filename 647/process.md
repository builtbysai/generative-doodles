# No.647 "Tramo Norte" — EXPANSION #78 paulo-cox, prompt block 7 "Folios"

## Concept

Paulo Cox's folio-by-folio reveal mechanic as a portrait series: eight folios,
Tramo Norte to Patagonia, each a single mountain archetype drawn large and
minimal in flat silhouette on near-black, with a snow cap where the archetype
demands it and a small folio tab at the top edge carrying tick marks only.
Dragging turns the folio in either direction, wrapping at the ends; a
double-tap reseeds a fresh sequence of eight. Within a folio, only
micro-motion: snow shimmer, a condor crossing, wind lines at the crest.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets. Strict
  palette: ground #0C0F14; tones ridge blue #2E3A4A, massif gray #3A3F45,
  spire slate #232B36; snow #E8EDF2; accents amber #E8A33D, rose #E89B7D,
  moss #5C7A4D. No text anywhere except the `<title>`; tabs carry tick
  marks, never numerals.
- Every archetype is a top profile (241 seeded samples) filled to the bottom
  edge, so each mountain is anchored to the foot of its folio. Generators:
  twin-eared volcano (cone + crater dip + two ear gaussians), knife ridge
  (dense value-noise crest), broad massif (summed broad gaussians), lone
  spire and double spire (jittered triangles), terraced volcano (cone
  quantized to 9 steps, crater dip applied smooth afterward), long sierra
  (sparse value-noise), horn peak (asymmetric power-curve flanks).
- Snow: contiguous crest runs above the folio's snow line are filled in snow
  and closed back along the snow line with a seeded irregular edge (per-folio
  noise knots), so caps follow the silhouette exactly and never float.
- Sequence: folio 1 is always the twin-eared volcano; the other seven
  archetypes are shuffled in with mulberry32 seeded by sequence index. All
  eight archetypes are distinct, so no two adjacent folios ever share an
  archetype, including across the wrap. Reseeds advance the seed and redraw
  the whole sequence under the same rule.
- One accent per folio, used sparingly, by archetype: a crater mark
  (volcano, terraced), a glow strip on the rock just under the snow line
  (horn, massif, double spire), or a highlight stroke tracing the peak's
  flank below the snow line (knife, sierra, spire).
- Micro-motion channels (two per folio, seeded): snow shimmer (seeded
  sparkle points in the snow band, alpha a pure function of elapsed time),
  condor (one fixed-pose soaring silhouette crossing once per 40 s at a
  seeded offset), wind (two thin arcs drifting at crest height).
- Navigation: pointer drag slides the current and neighbouring folio
  together (wrap modulo 8); release past 70 px settles to the next or
  previous folio on the anchored clock, otherwise it settles back. The folio
  tab parallaxes at 0.35 of the slide. Double-tap (two taps within 0.35 s)
  reseeds. No click-to-reload.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas style width/height pinned
  in px inside draw(); phone detection via window.screen (min dimension
  under 700 px) with aspect fallback; rAF typeof-guarded; no audio, no
  microphone, no offscreen canvas, no filters.
- Determinism: frame one is the synchronous draw of folio 1 at t = 0. All
  folio content derives from mulberry32 seeded by sequence index; all motion
  and transitions are functions of the anchored elapsed clock (rAF
  timestamps) plus recorded drag events. No Date.now anywhere.
- QA hook: `?seed=fN` starts the piece on folio N (the QA renderer passes
  `?seed=<arg>`). Inert without the query string; used only for the forced
  folio renders below.

### The eight folios (launch sequence, seed 647)

1. Twin-eared volcano — ridge blue, amber crater mark, wind + shimmer, 2 ticks
2. Horn peak — massif gray, rose snow-line glow, wind + shimmer, 3 ticks
3. Long sierra — spire slate, moss flank highlight, condor + wind, 4 ticks
4. Terraced volcano — ridge blue, amber crater mark, shimmer + condor, 5 ticks
5. Double spire — massif gray, rose snow-line glow, condor + shimmer, 6 ticks
6. Knife ridge — spire slate, moss flank highlight, wind + condor, 2 ticks
7. Broad massif — ridge blue, amber snow-line glow, wind + condor, 3 ticks
8. Lone spire — massif gray, rose flank highlight, wind + shimmer, 4 ticks

## QA log

- Renders via `node ~/workspace/tools/render-piece.js`: qa-desktop.png
  (1280x900), qa-mobile.png (390x844), thumb.png (720x720).
- Determinism: thumb.png rendered twice and byte-compared with cmp —
  identical; second render deleted. Re-verified after every fix round.
- Frame one (desktop and mobile): folio 1's twin-eared volcano large on the
  near-black ground, snow on the ears and upper cone only, amber crater mark
  seated in the notch, tab with 2 ticks at top-center, one faint wind line.
  Nothing clipped on mobile; the ears read as two snow horns.
- Forced folio checks (throwaway renders in /tmp via the `?seed=fN` hook,
  read back, then deleted): folio 4 (index 3, terraced volcano) — stepped
  cone, snow cap with a shallow crater notch, amber mark in the notch, 5
  ticks, condor mid-crossing; folio 7 (index 6, broad massif) — wide
  multi-peak silhouette, shallow snow band with a natural edge, amber glow
  strip on the rock under the snow line, 3 ticks, condor and wind lines
  present. Both read as distinct places, not palette swaps.
- Fix rounds during QA: (1) snow-line edge first used a high-frequency sine,
  which read as a mechanical scalloped fringe — replaced with per-folio
  seeded noise-knot edges; (2) snow lines raised on the volcano (0.60 to
  0.70+), knife, sierra and massif so caps sit on the high ground instead of
  covering half the mountain; (3) volcano ears strengthened (taller,
  narrower, closer to the crater) and the crater dip deepened so the
  twin-eared read survives the snow; (4) the crest highlight accent moved
  off the snow onto the peak's flank below the snow line, and the glow strip
  moved to just under the snow line on bare rock; (5) terraced crater dip
  halved and applied after quantization so the notch reads as a crater, not
  a cleft through the top step.

## Deviations

- Folio 1 is fixed as the twin-eared volcano (per the brief's frame-one
  requirement); the remaining seven archetypes are shuffled, so the
  no-adjacent-repeat rule holds by construction rather than by rejection
  sampling.
- Each folio carries exactly two micro-motion channels rather than one or
  two at random, so every folio feels equally alive; the channel pairing is
  seeded per folio.
- The condor is drawn in the folio's own silhouette tone (or ridge blue when
  the tone is spire slate) so it stays visible against the near-black sky
  without leaving the palette.
