# No.654 - Forma y Color

EXPANSION #79 francisco-gazitua, prompt block 6 "Forma y Color". The
collaboration grammar "Forma F Gazitua / Color Angela Leible" as a
two-pass piece: his stacked-stone monolith in pure grayscale, her three
flat colors blooming across its surface.

## Concept

One monolith, two authors, two independent passes. The form pass is a
cairn-totem of five flat stones stacked in contact, widths narrowing
upward, each stone a flat gray band (dark base #3A3A3D rising to light
top #C9C9CC) with darker fracture facet wedges. It never moves and
never changes. The color pass is a stain: iron red #A34A2A, condor
gold #D9A441 and sky #7FB3C8 bloom from three seed points and spread
across the silhouette only, following the stone's own grid topology,
each seed growing one color's territory with crisp boundaries where
territories meet. The bloom takes about 15 seconds to cover most of
the form, then rests complete. Nothing outside the silhouette is ever
colored; the ground #0A0A0B stays clean.

Interaction: TAP on the form seeds one extra bloom at that point, in
the next color of the three-color cycle. DOUBLE-TAP reseeds only the
color pass (new seed points, new spread, form untouched). Otherwise
the piece is watch-only.

## Construction

Single self-contained index.html, canvas 2D, no external assets.

Two-pass independence: the form is generated once from the constant
FORM_SEED (654001) - stone polygons, five-step gray band assignment,
facet wedges, and the per-cell facet tiers all derive from that seed
or from a stream keyed by it. The color pass has its own seed
(COLOR_SEED0 654101, advanced by a counter on each double-tap:
seed + counter x 104729) and its own state (cost field, sources,
arrival field, color anchor time). The double-tap handler regenerates
only color state; no code path after the initial build writes to the
form data, so the monolith is bit-identical across color reseeds,
taps and resizes.

Grid model: the form silhouette is rasterized to a 96 x 127 grid
(9,070 mask cells). Each mask cell precomputes its fill style for the
gray state and for each stain color, with a seeded facet tier
(darker / base / lighter shading of the same hue) and wedge cells
forced to the darker facet, so the stone facets read through the
stain like watercolor over grain.

Diffusion: multi-source Dijkstra over the mask (8-neighborhood) with
a per-cell cost jitter (1 + rng x 0.85) from the color seed. Three
sources are placed one each in the bottom, middle and top stones and
take the three colors in a seeded rotation. Arrival times are
normalized by their own quantiles: display time = (arrival - a05) x
k, with k set so a98 lands at 15 s. A cell renders colored when its
display time is at or before the color-elapsed clock, so coverage is
a pure function of anchored elapsed time: exactly 5 percent at
elapsed 0, about 66 percent at 5 s, 98 percent at 15 s, complete by
about 20 s. A tap adds a source whose raw start time is back-computed
from the current color-elapsed time through the same normalization,
then the field is recomputed.

Clock and determinism: frame one is the synchronous first draw with
an explicit time argument (0, or the QA hook time), never a
wall-clock reading, so the first frame is a pure function of the two
seeds. Later frames run on a performance.now anchor; rAF is
typeof-guarded and absent under the QA renderer, which therefore
renders exactly frame one. The renderer seed hook (location.search
"seed=tNN" or "seed=late") freezes the clock for state-forced
verification renders.

Layout: canvas sized from the Visual Viewport API with resize
listeners on visualViewport and window; canvas style width and
height are pinned in px inside draw(). Phone detection via
window.screen (min dimension under 700 px), aspect fallback
h over w x 1.15. The monolith refits the phone frame; page ground
takes the ground tone.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- thumb.png rendered twice and cmp byte-compared: identical.
- Frame one read back at all three sizes: grayscale five-stone
  monolith, bands dark at base to light at top, facet wedges visible,
  three seed stains just begun (sky on the top stone, gold low on the
  middle stones, iron red on the base), about 5 percent coverage,
  ground clean, nothing clipped on mobile.
- Late bloom verified with a state-forced throwaway render
  (seed=t20, written to /tmp, read back, then deleted): form fully
  colored in three crisp territories (sky top, gold middle, red
  base), facet wedges reading through as darker facets, no color
  anywhere on the ground.
- Coverage measured from the arrival field directly: 5.0 percent at
  0 s, 66 percent at 5 s, 98 percent at 15 s, 100 percent by 20 s.
- Grep confirms zero Date.now, Math.random, createElement,
  AudioContext, gradient constructors, external URLs and em dashes.

Deviations and fixes worth recording:

1. First build bug (fixed): the Dijkstra left about 5 percent of
   mask cells unreached (arrival infinite). Jittered slanted stone
   edges in contact can meet in a band thinner than the grid pitch,
   leaving pockets no 8-neighbor path reaches. The infinite arrivals
   also poisoned the a98 quantile and collapsed the display-time
   normalization, so frame one rendered almost fully colored with
   gray pockets scattered inside the territories. Fix: a flood
   repair pass inside the diffusion (unreached cells adopt their
   cheapest reached neighbor's arrival plus their own cost, owner
   copied, repeated until none remain), and quantiles computed over
   finite arrivals only, with a fallback if a98 does not exceed a05.
2. Second build bug (fixed): with the normalization repaired, the
   two determinism renders still differed. The synchronous first draw
   read the live clock, and a few cells sit within milliseconds of
   display time 0 by construction (the 5 percent boundary), so
   process timing flipped them between runs. Fix: the first draw
   takes an explicit time argument (0, or the QA hook time); the
   live clock only drives subsequent animation frames.
3. No deviation from the prompt's prohibitions: no photorealism, no
   gradients (all shading is flat per-cell fill styles), no color
   outside the form, no text anywhere except the document title.
