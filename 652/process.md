# No.652 "Monolito"

EXPANSION #79 francisco-gazitua, prompt block 4 "Monolito".

## Concept

Gazitua's subtraction creed as the whole piece: "Un martillo y un cincel,
mil canteras, un millon de rocas." One rough granite block stands alone on
near-black, roughly square, center frame, generous margins, a faint contact
shadow under it. Nothing else exists in the frame. The only verb is removal:
every drag stroke is a chisel blow that bites stone away, throws chips, and
leaves a bright fresh fracture face that darkens back to the raw tone over
about four seconds. A form can only ever emerge from what is taken away.
Tapping does nothing, because stone does not respond to tapping. There is no
undo and no reset, like real stone.

## Construction

- Carve grid: the block lives in a fixed 148 x 148 cell grid in cell space,
  independent of pixel layout, so resizing the window never loses the
  viewer's carving. (The brief suggested e.g. 160 x 160; 148 was chosen so
  the desktop cell lands at about 3.9 px, in the specced 4-5 px class, with
  margin for the run-length renderer.) Each cell is stone or removed, and
  carries a freshAt timestamp: the anchored-clock second when a cut last
  exposed that cell's face.
- Outline: a square boundary radius perturbed by five seeded harmonics plus
  two shallow seeded notches, evaluated per cell angle. The virgin block is
  therefore hand-quarried, never a perfect square, and identical on every
  load (mulberry32, seed 652079).
- Surface: granite mottling from a two-octave seeded value-noise field
  (coarse 9 x 9 plus fine 41 x 41, bilinear, 70/30), quantized to five shade
  levels of the single raw tone #5A5A5E. Rendering is run-length per row,
  grouped by (shade level, freshness bucket), which keeps a full redraw
  cheap and gives the carved, stepped edge the grid implies.
- The strike: pointer drag samples are interpolated at 0.75-cell spacing;
  each sample subtracts a disc of radius max(9 px, 2.8 cells). Stone cells
  in the bite's rim that border empty space are stamped fresh. Freshness is
  rendered in nine 0.5 s buckets across a 4 s window, mixing the cell's raw
  shade toward bright fracture #C9C9CC and back.
- Chips: a sample that removes at least 3 cells records a strike holding
  3-5 chips with fully seeded ballistic parameters (position, velocity,
  spin, size, polygon vertices). Chip pose at any time is a closed-form
  function of the strike record and the anchored clock: gravity 2.1 x grid
  height per second squared, 1.5 s life, fading out, gone below the ground
  line. Nothing about a chip is integrated frame to frame.
- Interaction surface: pointerdown/move/up only. A tap (down and up with no
  drag) removes nothing. There is deliberately no double-tap handler and no
  reseed: the block is the viewer's own work, and per the prompt there is no
  undo in stone. A fresh block comes only from reloading the page, which is
  the browser's business, not a designed control. This is the no-reseed
  decision, made because the piece's subject is irreversible subtraction;
  adding a reset would contradict the prompt's own prohibitions.
- Clock: everything runs on an anchored performance.now() clock; frame one
  is the synchronous draw at t = 0 (virgin block). rAF is typeof-guarded.
  Sizing uses the Visual Viewport API with listeners on visualViewport and
  window; the canvas CSS size is pinned in px inside draw(); phone
  detection uses window.screen min dimension < 700 with the aspect fallback.
- Palette is strict: ground #0A0A0B, raw stone #5A5A5E (five texture shades
  of that one tone), fresh fracture #C9C9CC, chips #8A8A8C, shadow as black
  at 55% alpha. No text anywhere except the document title. No audio.

## QA log

- Rendered with the house renderer at 1280x900, 390x844, and 720x720.
  Frame one at all three sizes: one uncut granite block alone on black,
  quarried notch on the left edge, wavy hand-cut bottom edge, contact
  shadow beneath, generous margins, nothing clipped on mobile.
- Determinism: thumb.png rendered twice and byte-compared with cmp -
  identical. The second render was deleted.
- First pass used a single coarse mottle octave and read as smooth cloud;
  a fine grain octave was blended in (70/30) and all renders redone and
  re-verified, after which the surface reads as granite.
- Carved state verified with a state-forced throwaway render in /tmp via
  the inert ?seed=carved hook (read back, then deleted): four scripted
  chisel channels cut at t = -1.1 s leave a stele-like silhouette emerging
  from the block, every fresh face outlined in bright fracture at the
  correct aged brightness, and three strikes' chips hang mid-fall around
  the upper middle. The hook is inert without the query string; a bare
  numeric ?seed= reseeds the block outline and surface.
- Grep audit: no Date.now, no Math.random, no document.createElement, no
  AudioContext, no ctx.filter, no gradients, no external URLs, no em
  dashes in the file.

## Deviations

- Fracture brightness ages continuously across the ~4 s window (in 0.5 s
  buckets) instead of holding full brightness and switching off at a single
  instant. The window length and both endpoint tones are exactly as
  specced; the continuous age reads as the fresh face weathering, which is
  the prompt's own "older cuts darken" behaviour made gradual.
- Grid resolution is 148 x 148 rather than the prompt's example 160 x 160,
  for the cell-size reason recorded under Construction. No other
  deviations; no prohibitions were bent.
