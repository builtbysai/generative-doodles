# No.1609 — A Field of Scales (JL2, study #212 jinyao-lin, PP856)

Driver: one unchanging unit, palette as the mint-time parameter; the mechanism
is a breathing cross-hatched scale field that re-tiles into a new single
palette on tap.

## Mechanism

- One unit, everywhere: an arched scale (domed top, gently sagging bottom
  edge), filled with the mint's cloud color, outlined in its line color, and
  cross-hatched inside with two sets of fine lines clipped to the arch
  (spacing one sixth of the scale width, second set rotated about 65 degrees).
  No other motif appears in any mint.
- Tiling: offset rows (alternate rows shifted half a step), row spacing about
  half a scale height so rows overlap like roof tiles, drawn top to bottom.
  Scale size is about 4% of the frame's larger dimension, and drifts by a
  low-frequency value-noise field (seeded 6x6 grid, bilinearly interpolated)
  combined with a radial term: factor 0.72 at center rising to about 1.30 at
  the corners, clamped to 0.65-1.40. Smaller, sparser scales at center let
  the ground show through as a soft density gradient.
- Palettes, one per mint, exactly as specified: slate day (ground #5B7A8C,
  cloud #DCE6EC, line #2F4858), ivory dawn (ground #F2EAD8, cloud #FFFDF6,
  line #8A6F3E), ember night (ground #0C0605, cloud #E84A1E, line #7A1408).
  Nothing else. Frame one is slate day.
- Breath: each scale's hatch angle oscillates slowly, out of phase with its
  neighbors (per-cell phase from the seeded RNG, 26s period, plus or minus
  0.32 rad), so the field shimmers like water. Frequency is about 0.04 Hz,
  far below the 14 Hz flicker limit.
- Tap: new mint. The palette cycles slate, ivory, ember, slate, and each tap
  takes the next seed from the fixed sequence 1609001, 1609017, 1609043,
  1609079, 1609121, 1609183 (wrapping). The old field crossfades into the
  new one over 2s (smoothstep), ground included. No other interaction.
- Vignette: a radial gradient darkens the corners by up to 30% black over
  the finished field.

## Deviation from the prompt

- Scale size is 4% of the frame's larger dimension rather than strictly 4%
  of frame width: on a portrait phone 4% of width would make scales about
  16px and nearly 4,000 of them, which would choke the animation loop. On
  desktop the larger dimension is the width, so the specified size holds
  exactly there; on phones the field stays dense but renderable.
- Text color is the palette's line color, not its cloud color: the title,
  date, and hint sit on top of the cloud-colored scales, where cloud-colored
  text was invisible in the first render. Line color reads against the
  cloud fill in all three mints. The text sits on solid backing plates in
  the mint's cloud color (see fix round 2): a ground-colored plate was tried
  first and left dark line text on mid-slate ground too faint in slate day,
  while the cloud plate keeps dark-on-light contrast in all three mints.

## House rules

- Visual Viewport sizing, resize listened to on visualViewport and window;
  canvas pinned in draw() via style.width/height in px; phone detection via
  window.screen (min dimension under 700px) with aspect fallback; field-like
  composition full-bleed on phones and desktop.
- One synchronous frame at load; requestAnimationFrame guarded by typeof
  check; deterministic fixed-phase first frame (PHASE 0.0, mulberry32 seeds
  only, no Math.random, no Date). Reduced-motion visitors get the single
  frame, and a tap swaps mints instantly instead of animating the fade.
- No em dashes in visible copy. Gallery date 2006 · 06 · 08. Hint:
  "Tap for a new mint."

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js at
1280x900 desktop, 390x844 mobile, and 720x720 for thumb.png; inspected all
three. A forced-time harness (via the exposed window.__scales1609 hook)
verified: t=6.5 breathes (hatch angles shifted from t=0); tap at t=0
mid-fade at t=1.0 shows the ivory field crossfading in; t=2.0 is fully
ivory dawn; a second tap gives fully molten ember night at t=4.0; a third
tap returns to slate with a new seed at t=6.0. All five probe frames have
distinct md5s, as expected.

Fix rounds: 1. Round 1: title, date, and hint were drawn in the cloud color
and vanished against the cloud-colored scales; switched all text to the
palette line color (see deviation above). No other fix round needed.
2. Round 2 (gate fix, 2026-11-07): the gate found the scale field good but
the title, date, and hint nearly illegible on desktop, drawn in line color
directly over the busy field. First attempt put them on solid
ground-colored backing plates, but that left dark line text on mid-slate
ground too faint in slate day, so the plates were changed to the mint's
solid cloud color with the text at full opacity (title 1.0, date 0.9, hint
0.95), sized from measured text width plus padding, one plate for
title+date at top center and one for the hint at bottom center. Field,
palettes, tap-to-mint behavior, and fixed-phase first frame unchanged.
Re-rendered and inspected at 1280x900, 390x844, and 720x720: title, date,
and hint now read clearly at all three sizes.

Determinism check: two separate 720x720 thumb renders are byte-identical
(md5 a2164af44666dc862118453a2872b070); two separate 1280x900 desktop renders
are byte-identical (md5 ad2bf0114b67d53ff8e6190f3282ecfe). After fix round 2:
three separate 720x720 thumb renders are byte-identical
(md5 5c2ad7c9069484875d66b304030adb91); two separate 1280x900 desktop renders
are byte-identical (md5 285642554ba133f30264211b411ab9cc).
