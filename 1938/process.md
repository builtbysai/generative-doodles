# №1938 52 Studies for Right Hand

- Number: №1938
- Title: 52 Studies for Right Hand
- Study: #253 kit-downes (KD3, PP1185)
- Gallery date (formula): 2007 · 05 · 03
- Interaction cue: Tap to commission the next study.
- FIRST_T: 1 (simulated seconds at the first frame)

## Driver, as a felt phenomenon

A wall that fills one study at a time. Each tap is a commission: a single
right-hand line, inked once across the right half of the next empty panel
and never revisited. The left half of every panel stays bare forever, so
the constraint is visible in the composition before a single gesture is
drawn. The next empty panel waits slightly enlarged, its border darker,
and when commissioned it swells briefly and shrinks into place as its
gesture is inked. After 52 the wall is a complete, bounded body of work,
and the piece stops asking. The bound is the piece.

## Mechanism

A wall of 52 panels in a 13 by 4 grid. Each panel holds one gesture,
generated at load from a seeded PRNG (mulberry32, seed per panel), in one
of three kinds: a flowing curve, an angular zigzag, or a small curl with
a falling exit line. Gesture points are normalized panel coordinates with
u in [0.58, 0.94], so no gesture can enter a panel's left half. A faint
midline in every panel makes the constraint visible.

State: `completed` counts finished studies, `active` is the gesture being
drawn (1.2 s), `pending` queues taps that arrive mid-draw, so every tap
commissions exactly one study. A commissioned panel scales from 1.22 to
1.0 over 0.9 s while its gesture draws; the next empty panel rests at
1.05 scale with a darker border. Finished studies get a faint ochre wash
that fades in over 0.5 s. After 52, taps do nothing and the hint changes
to "The wall is complete."

Pre-existing studies at frame one: 5. Panels 0 to 4 are already inked
with their wash fully in, so the first frame reads as a wall with a
visible constraint at a glance. Panel 5 is the next empty panel, shown
slightly enlarged with a darker border.

## Tap probe

Run with node /tmp/probe-1938.js against the actual script (same shim as
render-piece.js, driving the piece through window.__probe1938):

- Initial state: completed 5, active none, pending 0, next empty 5,
  left-half violations 0.
- One tap, then 1.6 s of simulated time: completed 6, next empty 6.
- Three rapid taps (queued while a gesture draws), then 6 s: completed 9,
  pending 0, next empty 9. Each tap advanced the count by exactly one.
- Sixty taps, then 80 s: completed 52, next empty none. Two further taps
  past the cap: completed still 52.
- Left-half violations across all 52 generated gestures: 0.

## Deviations

- Audio: visual-only. No WebAudio is built and nothing autoplays, per
  the Franke rule for visual pieces. The prompt's technical approach
  describes a gesture agent, not sound, so nothing is lost.
- Wash placement: the faint ochre wash covers only the right half of a
  finished panel, not the whole panel. The prompt says the left half
  stays empty forever, and a full-panel wash would tint it; restricting
  the wash keeps the left half bare cream and makes the constraint read
  at a glance.
- Taps during a gesture's 1.2 s draw are queued, not dropped, so rapid
  taps still commission one study each, in order.

## House rules check

- Single self-contained index.html, inline script. Visual Viewport
  sizing with resize listened to on visualViewport and window. Canvas
  element pinned in draw() via canvas.style.width/height in px. Phone
  detection via window.screen (min dimension under 700 px) with aspect
  fallback. Field-like composition: full-bleed on phones, square on
  desktop. One synchronous frame at load; requestAnimationFrame guarded
  with a typeof check. Deterministic first frame: fixed-phase FIRST_T 1,
  all gestures seeded, no wall clock, no unseeded random. Flicker well
  under 14 Hz by construction (slowest motion is a 0.9 s scale and a
  1.2 s draw). Reduced motion renders a still frame and completes
  studies instantly on tap. No em dashes in visible copy. No
  click-to-reload anywhere; taps commission studies and never reload or
  reseed.

## Renders inspected

- Desktop 1280x900: header, counter (5 / 52 studies), and hint legible;
  13 by 4 grid fills the frame; five inked studies with ochre wash on
  their right halves; the sixth panel emphasized; midlines visible.
- Mobile 390x844: full-bleed, title and counter fit, gestures readable
  in the narrow panels, hint legible, no overlap or clipping.
- Thumb 720x720 viewport (576x576 PNG, same as the recent builds):
  grid and five studies read at small size; title legible. Byte-identical
  across two renders of the same script
  (md5 6d9a5668cc092b71f087969342f6e920).

## Known warts

- Curl gestures read small in the tall panels: the loop sits in the top
  half of the panel with a short exit line. It still reads as a quick
  inked gesture, and the variety across the three kinds is worth keeping.
- At phone width the panels are narrow (about 25 px), so gestures are
  thin single lines; they remain visible, but the loop kind is the
  hardest to read there.
