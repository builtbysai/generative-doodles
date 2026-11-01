# No.955 "Every Combination" - process

Study #117 reas, PP116 "Colorform Variations" (after 923 Empty Rooms, 2023).

## Concept

923 Empty Rooms builds a collection out of combination with replacement: every
colorform in the collection is one genuine combination of form parameters, and
the collection as a whole is the full space. This piece puts that space on a
wall and walks it. A 4x4 grid of rounded tiles is a window of 16 consecutive
combinations sliding over the whole enumerated space; every 20 seconds the
oldest tile steps to the next unshown combination, so nothing repeats until
the space is exhausted. A tiny counter keeps the count honest. Every two
minutes the city changes (Tokyo, Berlin, London, New York, Mexico City, LA),
and with it the ground and the two hues; the forms do not change, only the
light they are seen in. Forms change by stepping, never by morphing: a step is
a hard deal of the next combination, softened only by a 0.3 s flip of the tile
that stepped.

## Construction

- Enumeration: a colorform is the tuple (bars 0-4, circle 0-3, arc 0-3,
  rotation 0-7 in 45-degree steps, pairing 0-1), decoded from a single index
  by mixed-radix division. The space is 5 x 4 x 4 x 8 x 2 = 1280 combinations.
  The walk is a seeded Fisher-Yates permutation of all 1280 indices
  (mulberry32, seed 955116); the window deals positions from that permutation,
  so every tile shown is a genuine combination and no combination repeats
  until all 1280 have been dealt. When the frontier passes the end, the walk
  wraps into a freshly shuffled permutation (seed advanced per generation)
  and the counter resets.
- The counter counts combinations consumed ahead of the window's first tile.
  It starts at 147 because the walk began before we arrived: frame one deals
  walk positions 147-162. Each auto-step or tap advance moves the frontier by
  one and increments the counter by one.
- Rendering: the tile ground (the pairing's ground hue) is painted unrotated
  inside the rounded-corner clip, so a tile is always a rounded square; only
  the form elements (bars, circle, quarter-arc ring) rotate by k x 45 degrees
  around the tile center. Flat fills only, exactly two hues per city.
- Cities: six palettes (ground / hue A / hue B). The schedule is offset by
  +30 s so frame one sits mid-Tokyo at full tint; changes land every 120 s of
  piece time and all tiles re-tint over 5 s by RGB crossfade (forms and walk
  untouched). The city name shows in tiny caps at top-left for 2.5 s at each
  change, and in an opening reveal at t = 0 so frame one names Tokyo.
- Timing: all drawn state is a closed form of piece time plus recorded
  events. Auto-steps fire on fixed 20 s boundaries; frame one is the
  synchronous draw at t = 0 (no tile mid-step, Tokyo fresh). Frame one never
  reads the wall clock; the piece clock is performance.now relative to load,
  and the QA renderer's absent requestAnimationFrame leaves the synchronous
  first frame standing.
- Interaction: tap a tile to advance that tile to the next unshown
  combination immediately (counter +1, 0.3 s flip). Drag horizontally to scan:
  28 px of drag scrubs one combination, the window updates live and the
  counter follows the furthest position reached; on release the window
  commits and the 20 s walk resumes from there. Double-tap reseeds the
  vocabulary (new permutation, counter set to 16 with the first window
  dealt).
- Sound: synthesized only after the first pointer gesture, through a lazily
  created, typeof-guarded AudioContext. Each step is a soft wooden tick
  (triangle blip, pitch rising with walk position); each city change plays a
  two-note motif, a different pair per city. The piece renders complete in
  silence.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas style width/height
  pinned in px inside draw(); phone detection from window.screen's physical
  size (min dimension under 700 px) with the h > w x 1.15 aspect fallback;
  page ground is the current city ground at every size; the 4x4 grid fits the
  smaller dimension; no gradients, no shadowBlur, no ctx.filter, no offscreen
  canvas, no external assets, no microphone. Visible text is only the counter
  and the city name, plus the title.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png) and 720x720 (thumb.png); clean, silent renders at all three
  sizes.
- Determinism gate: thumb.png rendered twice and compared with cmp:
  byte-identical. The duplicate was deleted.
- Read-back, desktop and thumb: black Tokyo ground, a 4x4 grid of rounded
  tiles in cyan and hot pink, forms varying across tiles (bar groups, circles,
  quarter arcs, diagonal rotations), "TOKYO" in tiny cyan caps at top-left,
  counter "147 / 1280" in tiny monospace at bottom-right. Two tiles in the
  opening window are the empty combination (bars 0, circle 0, arc 0) and read
  as plain single-hue tiles; that is a genuine member of the space, kept.
- Read-back, mobile: the same window fits the 390-wide frame whole, grid
  centered on the smaller dimension, counter legible, nothing clipped.
- Fix round: the first build rotated the whole tile including its ground
  fill, so rotated tiles showed as octagons with page ground cutting the
  corners. The ground fill moved out of the rotated transform (painted
  axis-aligned under the clip); only the form rotates now. Re-rendered at all
  sizes and re-verified byte-identical after the fix.
- Grep check: no Date API use, no gradient calls, no shadowBlur, no filter,
  no external URLs in index.html.

## Deviations

- 923 becomes 1280: the original collection's count comes from its own
  parameter vocabulary. This piece's vocabulary (5 bar counts x 4 circle
  sizes x 4 arc angles x 8 rotations x 2 pairings) multiplies out to 1280,
  and the counter is honest to the space actually implemented rather than
  borrowing the collection's 923. Recorded here per the brief.
- Counter semantics: the counter reads combinations consumed ahead of the
  window (147 at frame one, while the window itself shows positions
  147-162). That matches the brief's specified opening state exactly. After a
  double-tap reseed the counter is set to 16, the size of the freshly dealt
  first window, as the brief directs; after a natural wrap of the full space
  it resets to 0 and counts up with the new permutation.
- Double-tap: the first tap of a pair lands before the 0.35 s pairing window
  closes, so it may step its tile in the old vocabulary; the reseed then
  redeals the whole window, so the stray step is never visible in the new
  vocabulary. Chosen over delaying every tap by 0.35 s, which would make the
  primary interaction feel lagged.
- Drag scan resolution is 28 px per combination: fine enough to read
  individual forms while scanning, coarse enough to cross the space in a few
  long drags.
- City schedule offset (+30 s): without it, frame one would fall inside the
  opening 5 s tint crossfade from LA; the offset makes frame one a clean,
  fully-tinted Tokyo grid while keeping changes on exact 120 s boundaries of
  piece time.
- The second note of each city motif is scheduled with setTimeout; it is
  sound only and never touches drawn state.
