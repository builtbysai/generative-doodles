# Doodle №8980: Wind Bent (2026-08-26)

**File:** `8980/index.html` (self-contained, vanilla canvas 2D, no dependencies)

## Concept

Seed 16, "Modulate Study": hydra's modulate-as-displacement-map idea as a
seeded still. Concentric rings are drawn point by point, and each ring's
sampling coordinates are pushed by a per-pixel modulator field (mx, my)
remapped to [-1, 1], so pushes swing in ALL directions instead of piling
left-up. On top of the turbulence, a prevailing wind direction is gated by a
patchy gust field, so the rings read as wind-bent: smooth coherent bends with
occasional gusts. Geometry is the only signal; one hue family per seed (four
inks on paper, three phosphors on dark). Ring line width and alpha follow the
local displacement magnitude, so the push field is legible through the
geometry itself. Click the plate for a fresh seed and modulator field;
`?seed=` makes any gust shareable.

## Method

- Value-noise lattice (seeded permutation) with fBm; modulator uses
  domain-warped 3-octave fBm at low frequency (feature size 280-420px) for
  smooth coherent bends, plus a 2-octave gust mask thresholded into patches.
- Displacement capped at 3x ring spacing: rings bend but never tear into noise.
  Bend amplitude grows slightly with radius (tighter core, looser edge).
- 7 one-hue palettes, picked per seed: indigo/umber/forest/rust ink on warm
  paper (with fiber grain + vignette), phosphor mint/amber/ice on near-black
  (with underglow double-pass strokes + faint grain + vignette).
- 1280x800 canvas; layout fits desktop and 390px mobile with no scroll.

## Default seed

`2718` — phosphor ice, 103 rings, wind 174°: a full-plate gust sweep that
compresses the rings on one side like wind hitting a tree crown. Strongest
instant read of the set.

## What was tried

1. First render pass (seed 8980): phosphor ice with a big gust lobe at lower
   left; bends smooth, no tearing. Good baseline.
2. Compared seeds 1207 (indigo on paper, strong right-side gust), 5511
   (indigo, nearly perfect circles), 7742 (forest, gentle wobble). 5511 and
   7742 failed the wind-bent read: the gust patches could miss the ring area
   entirely, leaving calm concentric circles.
3. Reworked the modulator instead of cherry-picking seeds: turbulence 9-19px
   to 13-24px, gust 15-31px to 22-36px, feature size tightened to 280-420px,
   gust coverage threshold lowered from 0.55 to 0.46. Re-rendered 5511, 7742
   plus new seeds 2718, 4419: every seed now reads wind-bent with legible
   gust structure, none tearing into noise.
4. Mobile 390px caught a real overflow bug: header `max-width: 700px` exceeded
   the viewport and pushed the layout sideways. Fixed to
   `max-width: min(700px, 92vw)`; verified clean at 390x844 with no scroll.

## Why the final variant won

Seed 2718 won the default for the strongest instant read: the gust field
sweeps the whole plate, rings pile and stretch along the 174° wind, and the
ice-phosphor hue with underglow keeps every bent line legible against the
dark. The runner-ups (8980, 1207) were kept as evidence that the family holds
across both paper and dark treatments.
