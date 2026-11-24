# №865 The Scale Mark

ZW3 / PP1265, study #263 zach-wolfe. Formula date 2004 · 05 · 25.

The driver, as a felt phenomenon: one tiny dark mark gives an
otherwise featureless white its size. Without the figure the frame
is a snow-walled corridor dissolving into fog, nothing to measure
against; with it, the white has a scale. Drag the mark to a new
spot and the whole world re-measures from it: the corridor is
generated around a movable scale anchor, so the vanishing point,
the ridge spacing and the measuring ticks all rebuild from
wherever the figure stands. Release and it resumes its slow walk
out and back along the corridor.

## Build

- First frame: FIRST_T = 6 s into a 48 s cycle. The walk is 48 s,
  the stride 2 s, the fog swell 48 s with a phase offset so the
  frame at the walk's midpoint differs from the first frame;
  every period divides 48, so frame one is deterministic and the
  frame at FIRST_T + 48 equals the frame at FIRST_T.
- The corridor is generated around a movable scale anchor. The
  anchor has a depth u (0 near, 1 at the vanishing point) and a
  lateral offset; the vanishing point, the floor ridges and the
  measuring ticks all derive from it. Ridge depths are placed
  relative to the anchor: seven in front of it (viewer to anchor)
  and five behind it (anchor to vanishing point), so moving the
  anchor moves every ridge and the whole floor re-measures.
  Depth maps to the screen with a 1.6 power so equal depth steps
  bunch toward the vanishing point.
- The figure walks the corridor's centre line in depth, out and
  back: u = 0.62 + 0.33 sin over the 48 s cycle, so it ranges from
  0.29 (near, larger) to 0.95 (far, a small annotation in the
  fog). Its height scales with (1 - u): 27.9 px at FIRST_T, 13.4 px
  at the far end, 39.6 px at the near end (720 render stage).
  Legs swing on a 2 s stride, mid-stride at FIRST_T, and the
  figure faces the way it walks, turning at the far end.
- Drag earned: pointer down within a grab radius of the figure
  (30 px or twice its height) takes the anchor; the vanishing
  point, ridges and ticks rebuild live as it moves. Release
  re-phases the walk so it continues from the dragged spot in
  the same direction, and the lateral offset eases back to the
  centre line over 4 s. A tap elsewhere does nothing; there is
  no click-to-reload.
- Environment: near-white only. Pale sky, two snow walls a hair
  apart in tone, a pale floor, faint wall strata, faint floor
  ridges, faint ticks along both base edges with a stronger pair
  at the anchor's own depth, faint snow speckles, and fog
  densest at the vanishing point so the far end dissolves. The
  figure is the only dark mark in the frame. No second figure,
  never large, never centred.
- Caption plate top left (№865 · The Scale Mark, 2004 · 05 · 25)
  and hint bottom center (Drag the figure to re-measure the
  white.), drawn in-canvas in dark slate on the near-white
  ground. No em dashes in visible copy.
- Canvas 2D only. Visual-only: no WebAudio, no autoplay audio,
  per the Franke rule. Flicker at or below 14 Hz by construction:
  all motion is slow drift and breathing on periods of 2 s or
  longer, and prefers-reduced-motion renders a still first frame.

## QA

- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile,
  720x720 thumb; all three inspected visually.
- Time probes (node harness, /tmp/probe865.js): walkU 0.620 /
  0.950 / 0.620 / 0.290 at t=6 / 18 / 30 / 42, so the figure walks
  out to the far end and back; legSwing 0.783 / 0.622 / -0.783 /
  -0.622 at t=6 / 6.5 / 7 / 7.5, the stride swinging; figure
  screen height 27.9 px at t=6, 13.4 px at t=18 (far), 39.6 px
  at t=42 (near); fogAlpha 0.589 / 0.596 / 0.511 / 0.504 at t=6 /
  18 / 30 / 42, the white breathing over the cycle; the figure
  faces outward at t=6 and back toward the viewer at t=30.
  Pixel diff between t=6 and t=30 frames: 70.46% of pixels differ
  at all, but only 0.03% by more than 8 levels, the fog wash
  shifting a few levels across the white; between t=6 and t=18:
  6.45% (2.12% by more than 8 levels), the figure moving far and
  shrinking.
- Drag probes: ?ax=0.72&ay=0.50&hold=1 moves the anchor to
  u=0.911, lat=0.280, the vanishing point shifting right and the
  ridge field rebuilding; the frame differs from baseline in
  92.63% of pixels at any level, again dominated by near-white
  gradient shifts, with the corridor geometry visibly rebuilt.
  ?ax=0.72&ay=0.50&resume=1 releases at FIRST_T with the walk
  passing through u=0.911 and continuing outward (walkU 0.911 /
  0.936 / 0.775 at t=6 / 12 / 18), and the lateral offset
  decaying (lat 0.280 at t=6, 0.140 at t=8, 0.000 at t=10).
  Pointer-event probe: pointerdown on the figure starts a drag,
  pointermove re-anchors (u=0.911, lat=0.280), pointerup releases
  and the walk resumes (walkU at t=6 is 0.911).
- Determinism: two draws at t=6 differ in 0 pixels.
- Seamless loop: frames at t=6 and t=54 (FIRST_T + 48) differ in
  0 pixels.
- Fix rounds: 1. Round 1: the first build's t=6 and t=30 frames
  were pixel-identical, the walk symmetric around its midpoint
  with no other time variation, and the figure faced one way
  through the whole walk. A 48 s fog swell with a phase offset
  was added, and the figure now faces the way it walks and turns
  at the far end, so the midpoint frame differs from the first.

## Deviations

- None from the prompt. The corridor's vanishing point sits at
  the figure's lateral offset while dragged and eases back to
  centre on release, which is the re-measure mechanism as
  briefed.

## Known warts

- On the 390x844 mobile frame the corridor is tall and narrow,
  so the walls read as a thin slot; the figure is still legible
  as the one dark mark.
- The measuring ticks are faint by design and easy to miss at
  thumb size; the anchor pair is the stronger of them.
- At the far end of the walk the figure is about 21 px tall and
  mostly a dark dash in the fog, which is the point of the piece,
  but its stride is hard to see there.
