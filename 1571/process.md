# No.1571 "Every Circle Has a Face" — SB4, PP818, #207 senbaku-deconbatch

Gallery date: 2006 · 05 · 01. Interaction cue: "Tap for a new crowd."

## Spec (verbatim prompt, from TASKS.md)

A dense circle-packing field on a muted green-grey ground where every packed
circle has CHARACTER: some carry simple faces (two-dot eyes), some carry
rings, hatching, or dot clusters, a few are squares that refused to be
circles. In the center, a large organic void holds a symmetric fern-like
plant motif drawn in the same line language. Palette: green-grey ground
#7A8B7A; circles in cream #EDE6D0, tan #C9B98F, rust #A05A3A, charcoal
#2E2E2E. Nothing else. Composition: packing fills the frame edge-to-edge;
the central void is ~25% of the frame, the fern centered in it.
Motion/interaction: watch-only with a slow internal shimmer: every ~6
seconds a few circles swap characters (a face becomes hatching, a ring
becomes dots). Tap anywhere: full reseed, a new crowd with new characters
(her rule: tap-to-reseed where a new character set belongs). Technical:
circle packing via rejection sampling; each placed circle assigned a
character type from a seeded PRNG and drawn with its decoration; central
void reserved by masking an organic blob; fern drawn as mirrored recursive
branch strokes. Avoid: perfect uniformity (the charm is the oddballs);
photorealistic faces (two dots is a face, pareidolia, not illustration);
filling the central void. Reference study: senbaku-deconbatch characteristic
circle packing 2021-07.

## Build

- Seeded PRNG (mulberry32, seed 1571 at load). Packing is rejection
  sampling: radii in four bands (small 9-15, medium 16-26, large 27-40,
  extra 41-52, scaled by minDim/900), 2u gap, up to 520 circles, then a
  second filler pass of small circles (4.5-9.5u, up to 340) into the
  leftover gaps. 860 circles placed at both 1280x900 and 390x844.
- Character per circle, assigned at placement: 0 face (two-dot eyes only),
  1 ring, 2 hatching (parallel lines clipped to the circle), 3 dot cluster
  (four dots). Decoration color contrasts the fill: charcoal on cream/tan,
  cream on rust/charcoal. Squares: ~6% of placements (34 desktop, 66
  mobile, where more small circles fit), drawn rotated, carrying the same
  four characters in squared form.
- Central void: organic blob, a union of circles whose total area is 25%
  of the frame (center radius sqrt(0.25*W*H/pi) plus six bumps and two
  satellites). Candidates are rejected if their center falls within the
  blob plus their own radius and the gap, so no circle enters the void at
  any size. Verified by the probe: inVoid 0 at 1280x900 and 390x844.
- Fern: charcoal recursive branch strokes, symmetric by construction. A
  central stem with six mirrored pinnae pairs along it (longest at the
  base, shortest at the tip), each a depth-3 recursive branch, plus twin
  leaders from the tip; branch tips carry small cream dots. No gradients,
  no Path2D, no shadowBlur; every batched arc preceded by moveTo; fading
  alphas rounded to 4 decimals.
- Shimmer and swaps: gentle per-circle alpha breathing (0.93 + 0.07 sin,
  pure function of piece time and seeded phase) plus a swap schedule:
  epoch k starts at swapStart + 6k seconds; epoch 0 swaps nothing, so
  frame one is the original crowd. Each later epoch swaps exactly 6
  circles, indices and new characters chosen by a deterministic hash of
  (seed, epoch, j). Nothing is frame-integrated state.
- Tap: pointerup with under 12 px movement reseeds (seed advanced by the
  LCG step xored with Date.now), restarts the swap clock from the tap
  time, and re-packs a new crowd. A drag over 12 px does not reseed.
- House rules: Visual Viewport sizing with resize listened to on both
  visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px; phone detection via window.screen
  (min dimension under 700 px) with aspect fallback; field-like
  composition full-bleed on phones, square on desktop (the field is
  full-bleed at every size; the caption chip is cream with charcoal text).
  One synchronous frame at load; every requestAnimationFrame call guarded
  by a typeof check. No em dashes in visible copy. No click-to-reload.
  Re-packs on resize so the void stays centered and the field stays
  edge-to-edge; the same seed gives the same crowd for a given viewport
  size.

## QA

Rendered from the actual script with node
~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile,
and 720x720 thumb; all three inspected visually.

- Fix round 1 (density + fern): first desktop render read as scattered
  confetti, not dense packing, with large ground gaps, and the fern was a
  bare two-branch tree, small inside the void. Added the small-circle
  filler pass (gap 3u to 2u, cap 460 to 520 plus 340 fillers) and rebuilt
  the fern as a stem with six mirrored pinnae pairs plus twin leaders.
- Fix round 2 (fern inside the void): the fuller fern's lowest pinnae and
  top leaders poked past the void boundary into the field (branch reach
  is ~2.36x the first segment). Scaled pinnae 0.46R to 0.38R, leaders
  0.30R to 0.18R, stem 1.28R to 1.18R, base 0.68R to 0.62R. Re-rendered:
  the fern now sits fully inside the void at all three sizes.
- Probe (probe-1571.js, hand-driven rAF clock, piece's own pointer
  listeners): frame one deterministic, 0 differing pixels across two
  t=0 draws at both sizes; thumb re-render byte-identical
  (md5 f45233895deab4805bd0cf3e87eb867b); t=0: 860 circles, void radius
  302.8 px desktop / 161.8 px mobile, inVoid 0; epoch advances 0, 1, 2
  at t=0, 6.1, 12.1 s with visible pixel change at each swap; tap
  reseeds (seed 1571 to 4153722588 desktop) with a fully new crowd and
  inVoid still 0; a 100 px drag does not reseed.

## Deviations

None from the prompt. One interpretation note: the prompt's "every ~6
seconds a few circles swap characters" is implemented as exactly 6
circles per 6-second epoch, with epoch 0 swapping nothing so frame one
is the unswapped crowd. The shimmer is the per-circle alpha breathing
plus the swaps; no separate shimmer pass was needed.
