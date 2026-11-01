# No.971 — Panoptic Perceptron

Study #119 kyle-mcdonald, PP132 "Terrapattern": query-by-example over a field of
abstract satellite tiles. No real map imagery, no category labels, no results
list — the winners sliding into a mosaic around the query IS the search result.

## Concept

An 8×8 city of 64 miniature "satellite" tiles (blobs, line families, dot grids,
arcs in desaturated infra-greens and grays). One tile is the query, outlined in
pulsing mint, with a 5-bar feature readout along its bottom edge — the
network's "description" of it. Every 20 s the perceptron re-ranks all tiles by
similarity to the query: the top 12 winners slide (2.5 s ease) into the slots
ringing the query at full brightness and assemble into a composite mosaic,
while the losers slide to fill the remaining slots at 0.25 alpha. Thin cyan
distance lines connect the winners to the query during assembly and fade on a
long tail. After the hold, the next query is drawn from the winners and the
pattern re-forms around it. An endless re-seeing of the same city.

Interactions: tap any tile to make it the query (immediate re-rank and
assembly); drag across the grid to paint similarity — crossed tiles get a
distance bias and, if four or more were crossed, the mosaic re-forms around
the bias at once; double-tap reseeds a whole new city. Sound, only after the
first gesture (lazy AudioContext): a very low server hum, a rising arpeggio
on re-rank, a soft chord when the mosaic locks, a shutter snap on a new query.

## Construction

Feature vector → picture mapping. Each tile owns an 8-dim feature vector
`fv` (seeded, mulberry32), and BOTH its picture and its similarity derive from
that vector, so the ranking is honest to what is drawn:

- `fv[0]` — blob count, round(fv[0]·4) ∈ 0..4, blob radii from the tile seed
- `fv[1]` — line family angle, fv[1]·π
- `fv[2]` — line family density, round(fv[2]·5) ∈ 0..5 parallel strokes
- `fv[3]` — dot-grid density, round(fv[3]·3) ∈ 0..3 (an fv[3]×fv[3] pip lattice)
- `fv[4]` — curve count, round(fv[4]·2) ∈ 0..2 arcs
- `fv[5]` — ink lightness: feature ink lerps from the tile's ground tone
  toward #C9CFDB by 0.25 + fv[5]·0.75
- `fv[6]` — ground tone index across the five infra tones
- `fv[7]` — scatter: how far features stray from the tile centre

Similarity is Euclidean distance over all 8 dims (bias from drags subtracted).
Shapes are clipped to each tile's rect so every tile reads as a discrete
miniature. Tile glyph placement within those counts uses a per-tile seeded
stream (seed = hash(citySeed, tile)), stable across re-ranks.

Ranking / layout model. A schedule of 20 s cycles is computed deterministically
from the city seed: cycle state is a pure function of piece time. Each cycle
carries a full assignment (tile → slot). The query keeps the slot it ended the
previous cycle in; winners take the ring slots around it in Chebyshev-ring,
then Euclidean, then angular order, so the mosaic grows outward from the
query; losers fill the rest in distance order. Tiles ease between the previous
and current assignment with a smoothstep over the first 2.5 s of each cycle;
brightness eases from a mid value toward 1.0 (winners, and the query) or 0.25
(losers) over the same window. The next cycle's query is drawn by seeded RNG
from the current winners. Frame one is the synchronous draw at piece t = 50 s
(cycle 2, mid-hold): a formed mosaic, losers dim, distance lines on their fade
tail — fixed offset, never derived from the wall clock; the rAF loop (typeof
guarded) only advances elapsed time from that offset.

Canvas sizing uses the Visual Viewport API with resize listeners on both
visualViewport and window; the canvas style width/height are pinned in px on
every draw. Phone detection uses window.screen's smaller dimension (< 700 px)
with the aspect fallback (h > w·1.15); the square stage fits the smaller
viewport dimension on all sizes. Palette is strict: ground #0A0B0E, tile tones
#2A3328 / #3D4A3A / #565A52 / #6B6F66 / #8A8D84, ink #C9CFDB, query mint
#7DF9C6, distance lines #4FD6FF at 0.2 alpha. No gradients, no shadowBlur, no
ctx.filter, no offscreen canvas, no microphone, no visible text but the title.

## QA log

Rendered with the house node-canvas renderer at 1280×900 (qa-desktop.png),
390×844 (qa-mobile.png) and 720×720 (thumb.png):

- Frame one at all sizes: 8×8 grid of muted green-gray miniatures; query tile
  top-right with pulsing mint outline and 5 mint readout bars; a bright
  cluster of line-and-arc-heavy tiles assembled in the rings around it; the
  rest of the grid dimmed to a quarter; a few faint cyan distance lines still
  fading near the query. Mobile: whole grid fits the 390 px width, centered,
  nothing clipped, readout legible.
- Fix round: the first build let blobs, lines and arcs bleed across tile
  gutters into neighbours, so tiles did not read as discrete images. Features
  are now clipped to the tile rect; re-rendered at all three sizes.
- Determinism: thumb.png rendered twice and byte-compared with cmp —
  identical. The duplicate render was deleted.
- Silence: renders complete with no AudioContext present; all audio is lazy,
  created on the first pointer gesture and typeof-guarded.

## Deviations

- Brightness during the 2.5 s slide eases from a neutral mid value (0.55)
  toward each tile's winner/loser target instead of tracking a full per-tile
  brightness history across cycles; at hold (including frame one) brightness
  is exactly 1.0 / 0.25 as specced. Reason: keeps the cycle state a closed
  form of piece time without storing per-tile brightness keyframes.
- Distance-line fade tail is 14 s after assembly (alpha scaled to 0.6 of the
  assembly value), longer than a strict "during assembly only" read, so that
  frame one (mid-hold) still shows the specced faint lines from the last
  assembly.
- The feature readout strip sits inside the query tile along its bottom edge
  (on a 0.72-alpha ground-tone backing) rather than in a separate under-tile
  strip, because the grid is gapless and an external strip would overlap the
  tile below.
