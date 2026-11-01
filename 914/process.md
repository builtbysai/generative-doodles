# No.914 "The Future" — process

Study #112 duncan_geere, PP75 "The Green Disc" (Ekistics, "The Future", 2020).

## Concept

A utopia drawn as a planting plan: one large disc on paper that fills
edge to edge with tiny ink tree glyphs, and two hub circles embedded in
the green — civilization as two clearings inside a forest. The glyphs
are the green; there is no landscape shading and no green ink anywhere
in the resting state. The single accent green exists only inside the
hubs during the double-tap survey, next to the tiny census line, so the
one living color is spent on the census itself.

The forest plants itself: glyphs stamp in one by one along a spiral
sweep outward from whichever hub is nearer, the full disc holds, fades,
and replants. A tap replants a new random forest, a drag blows a gust
through the glyphs, and a double-tap runs the survey.

## Construction

- Sites: a jittered grid (seeded, mulberry32) clipped to the disc and
  kept out of the two hub circles. Two glyph kinds only: canopy (a
  wobbled hand-drawn circle on a trunk line, ~70%) and tuft (3–4 short
  grass strokes fanning from a base, ~30%). Every glyph's wobble, tilt,
  canopy radius and tuft fan are precomputed from the seeded stream.
- Exact site counts (generation 0, computed from the actual build):
  desktop/thumb path 954 trees; phone path 612 trees. The census line
  prints the live count of whatever generation and size path is on
  screen, formatted like "954 trees, 2 hubs".
- Hubs: hub A (r = 0.16 disc radii) sits in the upper half with three
  filled propeller blades and a center dot inside a paper knockout;
  hub B (r = 0.24) sits in the lower half with 5–6 small building-block
  rects. Hub positions and interiors re-roll with each generation.
- Planting model: each site gets a spiral key = distance to its nearer
  hub + 0.085 × its angle (in turns) around that hub. Sites sorted by
  key appear evenly across 30 s; the cycle is 30 s plant + 5 s hold +
  2.5 s fade = 37.5 s, looping. The clock starts at a phase offset of
  16.5 s, so frame one is ~55% planted: dense around both hubs, the
  equatorial rim and the far field still paper.
- Interaction, all closed-form over recorded pointer events: quick taps
  are held 0.35 s; a lone tap then matures into a reseed (generation
  index = number of matured reseeds, each generation generated from its
  own seeded stream). A second tap inside the window cancels the
  reseed and starts a 6 s survey instead: hub interiors pulse with the
  accent green and the census line fades in under the disc. Drag
  samples are recorded with velocities in disc units; a glyph's lean
  and shiver are a decaying Gaussian-weighted sum over recent samples,
  so the wind is a pure function of the event list.
- Sound (first gesture only, lazy AudioContext, typeof-guarded):
  paper-stamp ticks as trees plant, thinned to at most ~8 per second,
  playback rate lower for canopies and higher for tufts; a looped brown
  noise through a bandpass whose gain follows recent drag energy (the
  wind); one deep 98 Hz sine for the census. Silent in the QA harness.
- House rules: Visual Viewport sizing with resize listeners on both
  visualViewport and window; canvas style width/height pinned in px in
  draw() every frame; phone detection via window.screen (min dimension
  < 700 px) with the h > w × 1.15 aspect fallback; on phones the target
  count drops to ~650 (612 actual) and the disc takes its margin from
  the smaller dimension. Strict palette: paper #FAFAF8, ink #111111,
  accent green #1F6F43 (survey hub interiors only).

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280×900
  (qa-desktop.png), 390×844 (qa-mobile.png) and 720×720 (thumb.png).
  The piece renders complete in silence; no AudioContext exists in the
  harness and no sound path is touched.
- Determinism: thumb.png rendered twice and byte-compared with cmp —
  identical. Frame one is the synchronous draw(0); no Date.now or wall
  clock feeds any drawn state (the rAF loop clock starts after frame
  one and only advances the same closed-form state).
- Desktop read-back: paper ground, thin disc outline, glyphs dense in
  two spiral-grown clusters around the hubs (about 55% of sites at
  frame one), propeller hub upper, block hub lower, both hubs paper
  knockout with ink interiors, equatorial rim still unplanted paper,
  no green anywhere, no text.
- Mobile read-back: same composition on the phone path (612 sites),
  disc centered with paper margins in the tall frame, hubs and glyphs
  intact, nothing clipped.

## Deviations

- Hub radii are 0.16 and 0.24 disc radii (i.e. ~8% and ~12% of the disc
  diameter), reading the prompt's "r 8% / 12% of disc" against the
  reference image, where the hubs are small clearings, not continents.
- The planting order is a spiral sweep around the nearer hub rather
  than separate spirals grown independently per hub; with two hubs the
  nearest-hub rule keeps one continuous planting front per cluster and
  the same outward growth.
- The generation-0 counts came out at 954 (desktop) and 612 (phone)
  rather than exactly 1,000 / 650: the jittered grid is adjusted toward
  the target within an 8% band and the honest count is what the census
  prints, which the prompt's own census format ("1,024 trees") treats
  as a counted fact, not a quota.
