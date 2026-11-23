# No.720 — Unknown Script

EXPANSION #88 okazzsp, prompt block 1 "Unknown Script" (verified verbatim from TASKS.md).
Grounded in okazzsp's glyph-engine works (CT4KzmSlKOR, 2021; Crayon drop CXnp-8zlgRw, 2021):
an 8x8 field of invented signs on black that slowly rewrites itself.

## Concept

Sixty-four glyphs, one per cell of an 8x8 grid, all assembled from a single
eight-part kit, read as one coherent unknown alphabet. Nothing in the field is
a letter, a digit, or a known symbol. Over a 40-second watch-only loop a slow
wave travels the grid and each visited glyph swaps exactly one part, so the
script appears to rewrite itself stroke by stroke, dot by dot, never jumping.
A tap reseeds a fresh field of 64.

## Construction

- **Part kit / mask design.** A glyph is an 8-bit mask over one fixed kit:
  bits 0-3 are the rounded-rectangle strokes along the four edges of the glyph
  box (top, right, bottom, left, drawn as thick round-capped lines), bits 4-7
  are circular dots at the four corners. The glyph box is centered in its cell
  at 62% of cell size. Each cell carries one seeded tone from the six-tone
  palette (#FF3B30, #FF9500, #FFD60A, #2DD4BF, #22D3EE, #F5F5F0) on #0A0A0C.
- **Uniqueness rule.** The initial field is rejection-sampled from
  mulberry32(seed) until 64 distinct admissible masks exist. The mutation
  simulation maintains a live set of masks present in the field: a flip is
  accepted only if the resulting mask is admissible and not already present
  anywhere in the field, so no two cells ever share a glyph, at any moment.
- **Abstraction guard (admissibility).** A mask is admissible only if it
  cannot resolve into a character: 2-6 parts; never all four strokes (a closed
  frame reads as O/0, dots or not); never exactly three strokes (the open
  boxes read as U/C and kin); a bare parallel stroke pair with no dots is
  rejected (reads as an equals sign); a dots-only sign needs at least three
  dots so it stays a cluster. This guard applies identically to the initial
  field and to every mutation target.
- **Mutation schedule.** Precomputed per cycle by simulation: cells are
  visited in diagonal sweep order (row + col, seeded jitter), three passes,
  and each visit flips the first bit (seeded order) that lands on an
  admissible, unused mask. Events are spread across the cycle as
  (time, cell, bit) triples and applied in draw() as step functions; the one
  flipped part eases in or out over 0.35 s so a change registers as a swap,
  not a pop. At the cycle boundary the index advances and the next seed's
  field takes over, closing the loop.
- **Determinism.** Frame one is the synchronous draw at cycle t=0 from the
  fixed base seed; no Date.now() anywhere. Cycle parameters are a pure
  function of (baseSeed + cycleIndex); taps and rollovers only re-anchor the
  epoch. rAF is typeof-guarded; sizing uses the Visual Viewport API with
  resize listeners on both visualViewport and window, canvas pinned in px
  inside draw(), phone detection via window.screen min dimension < 700px
  with aspect fallback. The `?seed=tNN` location hook is an inert QA device
  for forcing a mid-cycle state.

## QA log

- Rendered with the series node-canvas renderer:
  qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png (720x720).
- Determinism: thumb.png rendered twice and byte-compared with cmp —
  identical; the duplicate was deleted.
- Read-back, frame one (all three sizes): a colorful 8x8 field of abstract
  bone-and-dot signs on black, evenly margined, nothing clipped on mobile.
- First pass failed the abstraction gate: with only the bare frame excluded,
  four-stroke glyphs carrying dots still closed into boxes that read as 0/O,
  and three-stroke glyphs read as U/C. The admissibility guard was widened
  (see above) and all renders redone; the final field is corners, single
  bones, and dot clusters only.
- Mid-cycle check: a forced t=20 render (throwaway, since deleted) showed
  roughly half the field rewritten through single-bit swaps, one part caught
  mid-fade, the field still fully abstract and unique.
- Palette audit: only the six specced tones plus the background appear;
  no gradients, no glow, no text besides the document title.
