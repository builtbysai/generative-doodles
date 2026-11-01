# №1265 "Proper Table Setting" (sdk-forsale SF2, PP424)

## Prompt
A round table seen from above holds place settings, each generated unique:
Korean bowls and spoons or American plates, arranged in hanji-white casts. Each
setting carries a one-line guest story. Tap a setting and the story reveals in
hand-lettered text while the setting lifts and turns. The piece opens with one
setting; a guest book lets the visitor add their own. Slow group rotation like
a lazy susan; drag empty space to slowly rotate the table; tap the guest book
to add a setting (cast in over 10 seconds). Never click-to-reload.

Palette (verbatim): hanji white #EDE6D2, celadon #A8B89A, sumi ink #26241F,
tea-stain #C9A86A, chandelier gold #D9A441, table dark #201C16. Square;
circular arrangement, no setting at exact center; stories 1-2 lines max.

## House adaptations
- Guest-book "add your own" becomes a GENERATOR-written setting: tapping the
  guest book appends a new seeded setting with a plain, specific story drawn
  from the piece's own 12-line story bank. A canvas piece takes no typed input,
  so no visitor-typed story is possible. The new setting casts in over exactly
  10 seconds (opacity + paper-grain reveal), capped at 9 settings total per the
  prompt's 6-9 range.
- The table circle itself is drawn in a shade of table dark (#262019) with a
  chandelier-gold rim, so the hanji casts read against it; the page ground is
  table dark #201C16 on all sizes (centered geometric piece rule).
- Story text and the guest-book label are the prompt-specced visible text; the
  small hint line at the bottom follows the house interaction-cue practice.

## Mechanics (all closed-form over recorded events and piece time)
- Lazy-susan rotation: one full turn per 300 s, plus accumulated drag rotation.
  Drags on empty space rotate the table by the pointer's angular delta around
  the center; a drag is distinguished from a tap by movement over 12 scene px
  from the pointerdown position.
- Tap a setting (within 95 scene px of its center): it lifts (scale to 1.25
  over 0.6 s) and turns (up to 0.6 rad) while its story shows in italic serif
  for 5 s, fading over the 6th second. Story text sits radially outward from
  the setting, clamped to the scene.
- Tap the guest book (center, 140 x 110 scene px hit area): appends the next
  seeded setting at the next free angular slot, casting in over 10 s.
- Frame one is a constant phase: group rotation 0, one setting at the top of
  the ring, guest book at center, no story open.

## QA
- Rendered from the actual script with node-canvas at 1280x900 desktop,
  390x844 mobile, 720x720 thumb; all three inspected.
- Frame one: dark round table with gold rim, one hanji cast at top (Korean
  bowl, spoon, chopsticks, seeded grain), guest book at center, hint at bottom.
  Mobile holds the same read, scene whole, page ground in table dark.
- Thumb rendered twice at 720x720, `cmp` byte-identical, re-verified after the
  final edit.
- Mechanics probed through the piece's own pointer handlers (fake-time harness,
  temp copies discarded): tap on the setting revealed "set for the sister who
  never visits" with lift + turn; guest-book tap added a second setting, shown
  at ~50% opacity 5 s into its 10 s cast-in; a drag moved the group angle
  from 0.1466 to 0.7224 rad.
- Token scan clean: no Math.random, no createElement, no offscreen canvas, no
  gradients, no ctx.filter, no shadowBlur, no audio/mic APIs. Only the
  typeof-guarded requestAnimationFrame remains, as required.
- Fix rounds: (1) tap-vs-drag compared against the last move position, so
  every drag also counted as a tap; fixed to compare against the pointerdown
  position. (2) The guest-book label was first drawn in sumi ink on the dark
  table and was invisible; redrawn in hanji.
