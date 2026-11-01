# №1262 "Ghillie Suit Parade" (esther-hz EH7, PP421)

White-gallery runway, lower third. Ghillie figures in burlap (#A68B5B) covered
in procedural leaf layers (greens #5E6B3F / #7A8A4A / #4A5A33) parade
left to right, one at a time, on a 30-second slot (22 s crossing, 8 s gap).
Each figure is seeded: 62-83 base leaves, its own height, gait, and leaf
phases, so no two crossings are the same suit.

## Mechanics

- Walk: closed-form leg/arm swing from parade time; body bob from the
  walk phase. No frame-integrated state anywhere.
- Leaves: each base leaf cycles attached (rustling, 60%) / drifting
  (falls down-left and fades, 20%) / regrowing (scales 0 to 1, 20%),
  all closed-form from t and the leaf's seeded period and offset.
- Tap a figure: adds exactly 20 leaf sprites, generated from the tap
  index, growing in over 0.8 s. The audience completes the suits.
- Drag a figure: the parade clock pauses (parade time subtracts total
  paused duration from the drag list), the figure blends into a pose
  over 0.4 s (arms raised, one leg bent, slight lean), and held posing
  shakes leaves loose at 2 per second. Shed leaves regrow 8 s after
  the drag ends at 4 per second. A figure at zero visible leaves
  draws as a naked outline only (thin stroked silhouette, no fill).
- Frame one is a fixed phase: parade time starts at 0.45 of the slot,
  so the first figure is mid-runway, mid-stride, at every size.

## House adaptations

- No visible text except the title; the gallery note carries the cue.
- Leaves are one ellipse per beginPath (node-canvas batched-arc quirk).
- No gradients, filters, shadow blur, offscreen canvas, audio, or
  unseeded randomness. Single seeded PRNG (mulberry32) for all figures
  and tap-added leaves.

## QA

- Rendered with node-canvas at 1280x900, 390x844, and 720x720; all
  three inspected. Thumb rendered twice, byte-identical.
- Fix rounds: (1) the QA harness declares its own W/H globals, so the
  piece's size variables were renamed VW/VH; (2) the first mobile
  render clipped the figure's right foot, so the crossing path now
  uses fixed 120 px margins and the phone figure height is capped at
  0.40 of viewport height; (3) the pose freeze now stores the walk
  phase at drag start instead of recomputing it.
- Harness-verified through the piece's own pointer handlers:
  walking legs change between draws; after the 0.4 s pose blend a
  dragged figure's legs are byte-frozen across draws; one tap adds
  exactly 20 leaf ellipses.
- index.html md5: 5caf7eff752b47f91303a1db3ab6bbe9
