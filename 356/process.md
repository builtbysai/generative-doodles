# No.356 Swirl / Potager (EXPANSION #37, betterloveart prompt 4)

## Concept

After Suchita Prakash's 30-day prompt-word challenge streak, where
each day took two arbitrary words (her posts include "Day 23+24:
Swirl" and "Day 21+22: Potager") and grew a finished pattern from
them: word one picks the motif family, word two picks the container
grammar. This piece is that word-to-pattern machine. The words are
never drawn anywhere in the piece; they live in the title and in
the pair table below only.

The machine runs a fixed authored cycle of exactly 6 word pairs.
Each pair maps to one motif family, one container grammar and one
of her three caption-grounded palettes. TAP advances to the next
pair in the cycle. DOUBLE-TAP keeps the pair and advances its
layout within a fixed per-pair layout table (3 layouts per pair:
cell size, motif rotation, a variant flag and a drift phase).
Between interactions the pattern drifts slowly and seamlessly.

## Construction

- One self-contained canvas, design space 1280x900, cover-fit via
  the stored transform (S, OX, OY) computed in frame(); the canvas
  is pinned every frame via style width/height in px. Visual
  Viewport sizing with resize listeners on visualViewport and
  window; phone detection via window.screen physical size (min
  dimension under 700px) with the aspect fallback (h > w*1.15).
- Determinism: frame one is drawn synchronously at the constant
  phase T = 6.3s into the 30s master loop (pair 1, layout 1,
  mid-drift). The animation clock is anchored to that constant and
  advances in fixed 1/60 ticks accumulated from rAF timestamps;
  rAF is typeof-guarded. Frame one is never drawn from Date.now()
  minus an offset.
- Idle motion: a shared drift (DX, DY) of up to 16px / 11px on
  sinusoids that complete whole cycles in the 30s loop, phase
  shifted per layout, so frame 30s is pixel-identical to frame 0
  at rest. All state changes from taps are instant swaps between
  authored table entries; nothing is runtime-random.
- Tap handling runs on the piece clock, not wall timers: a tap is
  a press that moves at most 14 design px. The first tap is held
  (pendingCommit) and only advances the pair once the 350ms
  double-tap window has fully passed inside the tick loop. A
  second tap inside the window cancels the held tap and advances
  the layout instead, so a double-tap never half-advances the
  pair.
- Palettes (exactly 3, as data; each is ground plus three ink
  slots, motifs may also knock out details in the ground colour):
  1. beetroot #6E2B5B ground; carrot #E07B39, leaf #4F7A45,
     cream #F5EEDC.
  2. cobalt #274C9B ground; white #F7FAFF in all three ink slots
     (cobalt/white means cobalt/white: the white does all the
     drawing, the ground does the knocking out).
  3. wheat #E3C878 ground; denim #7A93A6, clay #B96A4B,
     cream #F2E8D5.
- Motif families (two stylised flat motifs each, drawn fresh from
  path data in unit space; no letters, no literal word pictures):
  swirl (spiral, snail), potager (tomato, carrot), orbit (ringed
  planet, eight-point star), reef (scallop shell, coral),
  leonine (lion face, mane rosette).
- Container grammars (layout renderers tiling the field plus a
  margin under the shared drift): damask (mirrored grid, flips on
  both axes, optional cream corner diamonds), lattice (half-drop
  rows on a diagonal trellis), tile (grouted square grid), plaid
  (crossing flat bands, intersections knocked to the accent, motifs
  pinned on the crossings), stripe (wide bands with a thin companion
  stripe, motifs in the ground lanes).
- The pair cycle, with the engine's fixed hash (family, grammar,
  palette), and 3 layouts per pair (cell size / rotation / variant
  flag / drift phase):
  1. Swirl / Potager: family swirl, grammar damask, palette 1.
     Layouts: 1.00x cell with corner diamonds; 0.85x plain;
     1.18x with corner diamonds.
  2. Orbit / Reef: family orbit, grammar lattice, palette 2.
     Layouts: 1.00x, rot +0.10; 1.15x, rot -0.12; 0.88x, rot +0.22.
  3. Potager / Leonine: family potager, grammar tile, palette 3.
     Layouts: 1.00x, rot 0; 0.90x, rot +0.15; 1.12x, rot -0.15.
  4. Reef / Swirl: family reef, grammar stripe, palette 1.
     Layouts: 1.00x, rot +0.08; 1.20x, rot 0; 0.86x, rot -0.20.
  5. Leonine / Orbit: family leonine, grammar plaid, palette 3.
     Layouts: 1.00x, rot 0; 0.92x, rot +0.18; 1.16x, rot -0.08.
  6. Potager / Orbit: family potager, grammar damask, palette 2.
     Layouts: 1.00x with corner diamonds; 1.14x plain; 0.87x with
     corner diamonds.
- In-code assertions: exactly 3 palettes, exactly 6 pairs, exactly
  3 layouts per pair, every pair's family and grammar names valid,
  palette indices in range.

## QA log

- Rendered with the house renderer at 1280x900 (desktop), 390x844
  (mobile) and 720x720 (thumb). All three inspected.
- Thumb rendered twice: byte-identical (md5
  616f068a6c7b279fd08ee18822aa643a both times), so the thumbnail
  reproduces from the shipped script.
- Desktop frame one: pair 1 (Swirl / Potager) as a mirrored swirl
  damask on beetroot: carrot spirals and carrot-shelled snails with
  leaf bodies alternating across the grid, cream corner diamonds
  at the cell corners, drift mid-phase, full-bleed with no margins
  and no text.
- Mobile: cover-fit crops the damask to a taller slice; motifs
  stay whole and legible, ground colour continuous to the edges.
- State probes (temporary copies with only the initial pair or
  layout index changed, rendered at 720x720, not shipped): all six
  pairs render cleanly. Pair 2 reads as a cobalt/white orbit
  lattice of ringed planets and stars; pair 3 as denim-and-clay
  tomatoes and carrots in cream-grouted tiles on wheat; pair 4 as
  shells and coral in beetroot lanes between carrot stripes; pair
  5 as lion faces and mane rosettes pinned on the cream crossings
  of a denim/clay plaid; pair 6 as an all-white potager damask on
  cobalt. Pair 1 at layout 3 shows the same damask at 1.18x cell
  size, confirming the double-tap layout advance changes the
  arrangement and nothing else.
- One softness noted, kept as drawn: in pair 5 the lion's cream
  face sits on a cream plaid crossing, so the face reads through
  its denim mane and features (a flat-on-flat medallion). It stays
  inside the palette and the authored plaid design.
- Static checks: no fillText or drawn words anywhere, no second
  canvas, no createElement, no shadowBlur, no gradients, no em
  dashes, no absolute URLs in the piece file.
