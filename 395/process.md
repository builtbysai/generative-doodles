# No.395 September Briefs

EXPANSION #42 (galitskaya-illustration, Anna Galitskaya), prompt GAL3.

## Concept

Her monthly ART CHALLENGES calendar as a living grid: a 4x3 month where
each cell is a tiny finished composition drawn from that day's prompt
word. Twelve prompt words, twelve vignettes: cozy cats, autumn wreath,
fall outfit, mushrooms, golden sun, self-care, collecting leaves,
magnolia, theater, puzzle, fox, winter forest. Each vignette is a small
scene in flat strokes (a mushroom-cap cat's worth of storytelling per
cell), ink plus one accent per cell rotating coral / teal / mustard by
cell position. The calendar quietly re-inks itself cell by cell, and a
double-tap reseeds the whole month to a second authored arrangement.
No text, no dates, no calendar chrome anywhere.

## Construction

- One canvas, design space 1280x900, centred fit; page ground is the
  ground tone #F5EFE0 throughout. Sizing from the Visual Viewport API
  with resize listeners on visualViewport and window; the canvas is
  pinned every frame via style width/height in px; phone detection via
  window.screen min dimension < 700px with the aspect fallback.
- The 12 vignette recipes are pure stroke data baked at load: polylines,
  arcs, ellipse arcs, leaf outlines, a zigzag pine builder. A stroke is
  {ink or accent, width, segments} with arc lengths precomputed, so the
  reveal can walk strokes and segments by length with round caps.
  Stroke counts per recipe, all inside the specced 8-15 and asserted at
  load: cozy cats 12, autumn wreath 10, fall outfit 10, mushrooms 9,
  golden sun 8, self-care 10, collecting leaves 9, magnolia 10,
  theater 10, puzzle 8, fox 10, winter forest 8 (114 strokes total).
- Palette is closed: ground #F5EFE0, ink #2B2620, accents #E4572E
  (coral), #2E8B8B (teal), #E8A93D (mustard). The accent belongs to the
  cell slot (index mod 3), not the prompt, so a reseeded month re-colours
  as it rearranges. All colour flat; no gradients, filters, shadowBlur
  or offscreen canvas anywhere.
- Grid: 4 columns x 3 rows from (64, 66), cells 288x256. Dividers and
  the outer border are sampled polylines jittered a fixed +/-1px from a
  fixed-seed LCG baked at load, so the wobble is identical every frame
  and every render.
- Motion: a 72s loop in 12 slots of 6s. In each slot, that cell alone
  re-inks: a 5s stroke reveal by arc length, then 1s at rest. Finished
  cells breathe at opacity 0.92-1 (0.96 + 0.04 sine on whole-cycle
  frequencies of the loop, phase-staggered per cell). The cell currently
  re-inking draws at full opacity.
- Interaction: watch-only plus the reseed. A double-tap (two taps
  within 0.4s of the piece clock, each a press/release within 28 design
  px and 0.8s) toggles between the two authored assignments: cells wipe
  to blank over 0.5s, then refill in order, cell i revealing over 0.6s
  starting at 0.35s staggers. Nothing reloads; a single tap does
  nothing.
- The two authored assignments (row-major; both asserted at load to be
  permutations of the 12 recipes, and B is a derangement of A, so no
  prompt keeps its cell across a reseed):
  - Assignment A: cozy cats, autumn wreath, fall outfit, mushrooms /
    golden sun, self-care, collecting leaves, magnolia / theater,
    puzzle, fox, winter forest.
  - Assignment B: winter forest, fox, golden sun, cozy cats /
    magnolia, mushrooms, theater, collecting leaves / fall outfit,
    self-care, autumn wreath, puzzle.
- Determinism: frame one is drawn synchronously at the constant phase
  T = 32.5s (inside slot 5, self-care under assignment A, at reveal
  progress 0.5; every other cell complete). The rAF loop is
  typeof-guarded and advances T from that anchor in fixed 1/60 ticks.
  Frame one never reads Date.now() or any wall clock.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png) and 720x720 (thumb.png).
- Thumb rendered twice from the shipped script: byte-identical.
- Desktop: month complete and legible; cell 5 (self-care) sits
  mid-reveal at frame one as specced, tub and rim inked, bubbles just
  starting. All twelve vignettes read as tiny scenes; accents rotate
  coral / teal / mustard across the rows; divider wobble is subtle.
- Mobile: centred fit keeps the whole month in frame on the continuous
  ground tone, no letterboxing colour break.
- Probe (temporary copy, not shipped): assignment B rendered at desktop
  size to verify the reseeded month. All twelve cells populate in the B
  order with accents following cell position, and self-care appears
  complete there (bather, bubbles, candle, steam, towel), confirming
  the frame-one partial cell is the redraw cycle, not a drawing bug.
- Grep audit of the shipped script: no gradient, shadowBlur,
  createElement, Math.random, Date.now, em dash or absolute URL.
