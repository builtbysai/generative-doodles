# No.519 Letter Garden

EXPANSION #62 giulia-pastorino, prompt GP7.

## Concept

Pastorino's decorative multicolor lettering turned into a garden you can
rearrange. Nine giant hand-drawn letters stand scattered on a cream ground
like plants, each in its own flat warm colour with crayon grain on its body.
Green sprout motifs (dot clusters, asterisk stars, spirals, tiny leaves) fill
the gaps between them. One tiny creature in her two-dot face grammar (two
dots, one bent-line mouth, nothing more) sits on top of whichever letter
currently reaches highest.

## Construction

- Single self-contained canvas piece, 1080x1080 design stage, flat fills
  only, no gradients. Palette: cream #F7F2E4 ground; letters from #E6392B,
  #F0A02B, #2AA6A0, #F0608E, #8A5FB0, #2B4FB0, #E8722A; sprouts and creature
  in #1A5A3A.
- Letters are hand-drawn glyph paths (stroke polylines in a 100-unit box,
  per-instance seeded wobble) drawn as two slightly offset thick-stroke
  passes. Crayon grain is a precomputed seeded speck array per letter,
  masked onto the strokes by a point-to-segment distance test, drawn
  directly each frame (the QA renderer has no offscreen canvas).
- Layout is seeded rejection sampling: bounding circles are placed with a
  guaranteed gap, so letters never overlap; letter heights run 148-214
  stage px (about 14-20 percent of canvas height), baselines uneven,
  rotations within about +/-7 degrees. Colours are assigned greedily so no
  two adjacent letters share a colour.
- Sprouts sit on a jittered grid and are kept at least a letter radius plus
  30px from every letter centre, so they fill gaps without touching a
  letter at any home position.
- Motion: letters bob gently on a slow sequential wave (phase steps of 0.7
  per letter). Drag a letter and it follows the pointer while the others
  shuffle aside through iterative collision resolution; on release the
  drop point becomes its new home and displaced letters spring back to
  theirs. The creature's host is recomputed every frame as the letter
  whose top edge is highest, so it rides along when the garden changes.
  A tap (press and release without dragging) reseeds the whole garden
  through an LCG seed step.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas pinned to pixel
  width/height inside draw(); phone detection via window.screen with the
  aspect fallback; the square stage letterboxes on phones over the cream
  ground. First frame is drawn synchronously at the constant phase
  PHASE0 = 2.35s; the rAF loop (typeof-guarded, absent in the QA
  renderer) anchors elapsed time to that phase. No audio, no microphone,
  no external assets.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png) and 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with cmp,
  identical both times (verified again after the letter-set fix below);
  the duplicate render was deleted.
- Desktop and thumb: nine chunky multicolor letters (K orange, R amber,
  O blue, V teal, P violet, F pink, M red, B orange, T red), no overlaps,
  no adjacent pair sharing a colour (the two orange letters K and B and
  the two red letters M and T are far apart), green sprouts throughout
  the gaps, the tiny green creature perched on the K, the tallest letter.
- Mobile: the whole stage letterboxes centred on the cream ground;
  nothing clipped.
- Letter arrangement, checked by inspection: rows read R K / O / V P /
  F / M / B T by height bands, and no row, column or neighbouring pair
  spells a real word or name. The pool deliberately carries a single
  vowel (O) so scattered pairs cannot form words.
- Fix during QA: the first pool put a U directly left of the P at the
  same height, reading as the word "UP"; the U was swapped for a V and
  all renders redone and re-verified.

## Deviations

- The shipped seed places 9 of the 10 pooled letters: the tenth
  placement fails the no-overlap rejection test for this seed and is
  skipped. 9 sits inside the prompt's 8-12 range, so the seed was kept.
- "Tallest letter" is read as the letter whose top edge sits highest on
  the stage (position, not glyph size), because the prompt has the
  creature's perch recomputed after rearranges, and only position
  changes when letters are dragged.
- Sprout clearance is guaranteed against letter home positions; a letter
  being dragged can pass over a sprout mid-gesture, which is inherent to
  drag-to-rearrange.
- Crayon texture is drawn from precomputed seeded speck data each frame
  instead of a pre-rendered grain canvas, per the renderer constraint.
