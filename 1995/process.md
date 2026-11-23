# №1995 Leaking Light: process notes

SN4 / PP1242, study #260 syd-nuku. Drag interaction.
Gallery date: 2007 · 06 · 29. Hint: "Drag to pull the light leak across the frame."

## Build

- Driver: a mountain landscape in bare-tree silhouette over red-orange fog,
  with a blown-out light leak eating the left edge. The leak is a soft
  radial mask with a near-opaque white-orange core and a magenta rim,
  drawn last so it eats the trees and ridges where it covers them; nothing
  is drawn inside the blown zone.
- Template: live №1991 index.html structure (Visual Viewport sizing,
  canvas pinned in draw(), phone detection via window.screen with aspect
  fallback, field-like full-bleed on phones / square on desktop, one
  synchronous frame at load, requestAnimationFrame guarded by typeof check).
- Fog: vertical red-orange gradient over the whole stage with three slow
  drifting fog bands. Warm re-tint wash at the leak center, laid under
  the landscape so the fog glows warm around the leak while the trees
  stay black.
- Landscape: three fbm ridges (far rust, mid dark rust, near near-black)
  across the lower half, plus 11 seeded bare trees with recursive branches
  rooted on the mid and near ridges. All ridge and tree geometry is a
  pure function of seeded values, so the landscape never moves.
- Leak: bloom factor 0.75 + 0.25 * sin(2*pi*t/90 - 0.8727), radius
  0.34 * W * bloom. Rest center (0.30, 0.45), the left third.
- Drag: pointerdown/move pulls the leak center to the pointer; the wash
  follows, so the fog re-tints where the leak passes and the trees stay
  black. On release the leak eases back to its rest position over 2 s
  (smoothstep) and resumes the automatic bloom cycle. Never click-to-reload.
- No audio. No em dashes in visible copy. Title/date plate drawn on
  canvas: "№1995 · Leaking Light" and "2007 · 06 · 29" top left, hint
  bottom center.

## Determinism

- FIRST_T = 20 s, cycle = 90 s. At t = 20 the bloom is 0.875, a mid-bloom
  moment with the leak eating the left third but not the whole frame.
- No wall-clock or random seed at load; all motion is a pure function of t
  and the recorded drag/release calls.
- Determinism check: rendering t = 20 twice gives identical md5
  (c639bc6f2fa8360dd521d27d4c8ff223). Thumb is the 720x720 render of the
  final file (576x576 stage, same as live №1991 thumb).

## Probe results (probe-1995.js / probe-1995b.js, 720x720 renders)

- t = 20 md5 c639bc6f2fa8360dd521d27d4c8ff223 (twice, identical); t = 65
  md5 6348a2f0fe0592d55d99d1e15653fcd7. Bloom 0.875 (radius 171.4 px)
  at t = 20 vs 0.625 (radius 122.4 px) at t = 65; pixel diff (threshold
  > 8 per channel) 83,795 px of the 576x576 stage. The leak visibly
  recedes between the two times.
- Drag: dragTo(0.65, 0.50) moves the center to (0.65, 0.50); new core
  pixel (374, 288) reads [255, 251, 247], blown white; old center
  (173, 259) reads [82, 30, 15], dark ridge, leak gone. Pixel diff
  base vs dragged 149,230 px. Fog re-tint follows the leak: sky sample
  (500, 200) goes from [208, 80, 37] to [218, 88, 57]; wash sample
  (528, 288) from [194, 68, 33] to [207, 79, 53].
- Trees unchanged by drag: 0 differing pixels in two tree regions
  (bottom-right corner and right-side ridge trees).
- Release: 1 s after release the center is (0.475, 0.475), exactly
  halfway back; 2 s after release it is (0.30, 0.45), the rest position,
  and the core pixel matches the base frame within 1 per channel.

## Fix rounds

1. First gate: tree branches showed as pale ghosts through the leak's
   mid-zone, and a hard horizontal edge showed where a fog band rect
   ended. Fixed by raising the leak mid-zone alphas (0.42 stop 0.92 to
   0.95, 0.62 stop 0.88, magenta rim moved to 0.78) so the blown zone
   erases the trees, and by filling each fog band over its full gradient
   square instead of a short rect. Also lowered the far ridge (base
   0.56 to 0.48) so the landscape covers the lower half, and made the
   trees bushier (depth 5, shorter branch segments).
2. Re-gated fully after the fix: desktop, mobile and thumb re-rendered
   and inspected; probes re-run on the final file. A final cleanup
   (removing one unused variable) re-rendered byte-identical, md5
   unchanged. No edits since.

## Deviations from the prompt

- None in content. The far ridge sits at about 0.48 of the stage height
  rather than exactly two-thirds down, so the sky keeps room for the
  leak to read against the fog; the landscape still fills the lower half.
- The date line "2007 · 06 · 29" is drawn under the title as part of the
  title plate (house rule), though the prompt itself carries no date text.

## Known visual warts (honest)

- Faint branch ghosts still show in the magenta rim band at the leak's
  edge (0.78-0.90 of the radius), where the leak is semi-transparent.
  This reads as the leak bleeding into the trees, which the prompt
  invites, but at the rim a branch can look briefly pink rather than
  erased.
- The tallest tree near the center grows above the far ridge into the
  open sky, so on phones (tall stage) it reads as a lone sky tree rather
  than a ridge tree.
- On desktop the square stage leaves dark burnt letterbox bars at the
  sides of a wide viewport; the ground color is a dark fog tone rather
  than black, by design.
