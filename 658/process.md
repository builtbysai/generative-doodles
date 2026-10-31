# No.658 "Hanan Pacha" — EXPANSION #80 angela-leible, block 2

## Concept

Leible's celestial Andean sky (Hanan Pacha, the upper world of Inca
cosmology): three flat strata of deep blue — cosmic black at the top
edge, deep indigo, lapis below — with a generous empty underworld
margin beneath. Gold dust drifts in the strata. High right sits one
small cinnabar disc, the only cinnabar in the piece. Across the sky a
condor PRESENCE crosses: not an illustrated bird but a wingspan read
as a lighter mass against the dark, a stain-field that happens to be
shaped like a gliding condor, with individual feather barbs fanning
from each wing spine. Watch-only; the sky is to behold.

## Construction

- Palette (strict): cosmic #070912, indigo #1A1F3D, lapis #2B3A7A,
  condor mass #E8E2D0 at low alpha, gold dust #D9A441, cinnabar
  #C0392B (disc only). No gradients: strata are flat fills and all
  raggedness lives in the boundary geometry.
- Strata boundaries are ridge lines: sums of sine waves over x/W
  whose phases advance by whole cycles per 48 s loop
  (y = base + A·sin(2π(k·x/W − m·p) + φ), m integer), so each
  boundary drifts sideways at its own slow rate and phase 1 is
  exactly phase 0.
- Gold dust: 84 seeded specks, each swaying sinusoidally with a
  whole number of cycles per loop (1 or 2), so the field is
  loop-identical. Dust is the slowest motion in the piece.
- The presence: 96 seeded blotches (40 per wing, 16 body) with
  9-point irregular outlines, drawn in two passes (full radius, then
  a 0.6-radius core) so pale density gathers softly; a very faint
  silhouette wash (alpha 0.075) lies underneath. Wings follow a
  shallow gull dihedral (lift 0.075H, tip droop in the last 15%),
  chord tapering 0.62 across the span; the body is a compact mass
  hanging just below the wing line at center. Wingspan = 0.70W.
- Feathers: 52 bezier barbs total (26 per wing), rooted along the
  trailing side of each wing spine. Angle runs 74° at the root to
  44° at the tip minus a cubic fan term, so the primaries spread
  hard at the tips; length grows with u^1.6. Each barb's angle
  ripples ±1.8° on a 3 s cycle, phase-staggered by −5·u along the
  wing (a slow ripple travels the feathers; nothing flaps) plus a
  0.7 rad offset between wings. 3 s divides the 48 s loop exactly.
- Loop: the presence crosses on centerX(p) = W·(−0.16 + 1.34p),
  entering at the left edge in frame one. Its alpha envelope peaks
  mid-crossing and dissolves to zero by p = 0.95; from p = 0.90 a
  second instance of the same seeded presence fades in at the left
  edge (centerX(p−1)), reaching frame one's exact state at p = 1,
  so the glide never cuts.
- Center height bobs ±0.01H on 2 whole cycles per loop.
- House rules: canvas sized from the Visual Viewport API with
  resize listeners on visualViewport and window; canvas pinned in
  px inside draw(); phone detection via window.screen (min
  dimension < 700px) with the h > w·1.15 aspect fallback only;
  rAF typeof-guarded; frame one is the synchronous draw at t = 0
  with all positions pure functions of the anchored clock; seeded
  RNG (mulberry32, seed 658001) for strata, dust, blotches, barbs.
  No audio, no text, no interaction handlers at all (watch-only).

## QA log

- Renders: qa-desktop.png (1280×900), qa-mobile.png (390×844),
  thumb.png (720×720) via ~/workspace/tools/render-piece.js.
- Determinism: thumb.png rendered twice, cmp byte-identical
  (second render deleted).
- Forced presence check: rendered at t = 21.6 s (phase 0.45) via
  the piece's inert ?seed=t<seconds> hook to /tmp, read back, then
  deleted. It shows the full wingspan in frame: dense body mass at
  center, dihedral wings tapering to both tips, barbs fanning
  beneath with primaries spread, strata and cinnabar disc in place.
- Frame one read-back: layered indigo strata with ragged drifting
  boundaries, gold dust throughout, the pale wing mass entering at
  the left edge, cinnabar disc high right, dark underworld margin
  below. Mobile refits (wingspan scales with width); nothing
  clipped.
- Fix rounds during QA: (1) the QA hook's first regex missed the
  renderer's ?seed= prefix and the forced render silently repeated
  frame one; the parser now accepts both ?t= and ?seed=t forms.
  (2) The first presence read as a faint smudge with detached
  hair-like strokes: blotch alphas and radii raised, outlines
  smoothed from 7 to 9 jag points, silhouette wash strengthened,
  barbs shortened. (3) At full presence the mass read as a uniform
  cloud band: dihedral deepened to 0.075H, chord taper strengthened,
  body rebuilt as a compact mass hanging below the wing line, barb
  fan made cubic so primaries spread at the tips. Re-rendered and
  byte-compared after each round.

## Deviations

- Strata drift is implemented as whole-cycle phase advance of the
  ridge waves rather than literal 1/8 and 1/16 speed ratios against
  the condor: any non-integer-cycle drift would break the seamless
  48 s wrap. The three boundaries still drift at visibly different
  slow rates, and the dust drifts slowest of all.
- The dissolve at the right edge is paired with the next presence
  condensing at the left during the last tenth of the loop (see
  Construction), which is what makes phase 1 identical to phase 0;
  frame one still shows a single presence just entering, as specced.
