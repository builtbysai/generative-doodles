# №1557 Hexagon Ripple

kiyoshinakauchi JK6, PP804, cron expansion study #205. Gallery date: 2006 · 04 · 17.

## Palette

- Ground near-black #0d0d0d; hexagons dim grey #4a4a4a at rest, bright white
  #F2F2F2 at the wavefront; nothing else.
- Stroked outlines only, never filled; lineWidth max(1, 0.045 * R), swelling
  to about 2.2x at the wavefront.

## Composition

Full-bleed flat-top hexagonal wireframe lattice, no margins, no center object.
Hex radius R = max(14, 0.032 * minDim) (28.8 px at 1280x900, 14 px at
390x844, 23 px at 720x720); columns spaced 1.5R, rows sqrt(3)R with odd
columns offset half a row, covering the viewport edge to edge. No visible
text except the page title.

## Motion

Watch-first ripple loop. One auto ripple at a time: an expanding ring whose
radius grows at constant speed 0.30 * maxDim px/s from a center; per-hex
brightness and size follow a Gaussian of (distance - wavefront) with
sigma 1.6R, so hexagons swell up to 1.30x and brighten to white as the front
passes, then settle back to thin dim outlines. When a ripple dies at the
edges (front 3R past the farthest corner) plus a 0.5 s gap, the next begins
from a new center drawn from a seeded 48-center sequence
(mulberry32(1557000), centers inside the central 20%-80% of the frame), so
centers drift between cycles. All state is a closed-form function of piece
time; fixed-phase first frame (first ripple starts at t=0 from center 0),
no wall clock, no per-frame randomness.

## Interaction

Pressing the pointer drops a new ripple: pointerdown records a wavefront
origin at the pointer and launches it at the same speed; the auto ripple
continues untouched. Only one drag ripple exists at a time: a second press
replaces the first. Drag never freezes the lattice and never fills hexagons.
No click-to-reload, no sound: fully silent, no AudioContext anywhere.

## Determinism

Centers from mulberry32(1557000); cycle boundaries computed iteratively from
t=0 (life = (maxDist + 3R) / SPEED, plus GAP); drag ripples are recorded
events {t0, cx, cy}. Every draw is a pure function of piece time plus those
recorded events, so re-renders at the same timestamp are byte-identical.

## Probes (node probe-1557.js, stubbed rAF driving the piece's own loop)

- Frame-one determinism: two fresh 1280x900 renders byte-identical
  (md5 c656dbd27caf30e5c56e66a4158ddaea both).
- t=0 vs t=2 differ; auto radius grows exactly at SPEED (384.00 to 768.00
  over 1 s, SPEED 384 px/s); auto ripple active at t=2.
- Bright pixels grow as the ring expands: 756 at t=0, 8,973 at t=2.
- Drag: pointerdown at (300, 700) launches a drag ripple centered there
  with t0 = 2.5 s; a second press at (900, 200) replaces it (still one
  drag ripple, center now 900, 200).
- Auto ripple continues through drags: cycle 0 ends and cycle 1 begins
  (k 0 to 1), radius growing 340.04 to 532.04 over 0.5 s, i.e. at SPEED.
- Drag ripple brightens the lattice: bright pixels 23,167 before a press
  at (640, 450) to 48,954 at t=1.5 after.
- All 10 probe checks passed (one check was corrected mid-run: it assumed
  the same auto cycle would still be expanding at t=4, but cycle 0 had
  completed at about t=2.8 and cycle 1 had begun; the check now accepts
  either same-cycle growth or a new cycle growing at SPEED).

## Render inspection

- Desktop 1280x900: full-bleed dim hex lattice edge to edge; a small bright
  white cluster of swollen hexagons at the first ripple origin, slightly
  below center; no clipping, no margins, no text.
- Mobile 390x844: same full-bleed lattice, smaller hexes, ripple cluster
  centered; no clipping.
- Thumb 720x720: same composition; ripple cluster visible at the origin.
- Mid-ripple frame at t=1.5 (1280x900, probe-saved): a clean bright white
  ring of swollen hexagons arcing across the frame, interior settled back
  to thin dim outlines, exterior still dim; reads exactly as a wavefront
  crossing the lattice.
- Forbidden-token grep clean: no AudioContext, gradients, shadowBlur,
  Path2D, createElement, localStorage, getUserMedia, fillText/strokeText,
  Math.random, Date, or em dashes.

## Fix rounds

None to the piece. One probe-check correction only (see Probes); the
shipped file was not changed after its renders, and thumb.png is the final
720x720 render of the shipped file.

## Gallery note

A full-bleed hexagonal wireframe lattice on black, crossed by a bright
ripple that swells and lights each hexagon as the wavefront passes. Press
anywhere to drop a new ripple from your finger.
