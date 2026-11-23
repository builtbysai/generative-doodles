# №1118 — Scanlines

Markus Kison study block MK7. A lathe-turned vessel that is not anything —
a profile of stacked bulges, a foot, a lip — turning slowly on a disc in
the dark, while a red laser line makes its patient way down the form. The
piece is about the difference between being measured and not yet being
measured: above the line the surface is resolved and lit, below it the same
surface lets go and drifts away as points.

## Construction

- **Profile**: radius as a function of height — a foot flare, a gentle
  taper, a lip bead, and three or four seeded gaussian bulges summed. The
  seed sets the silhouette; double-tap reseeds it.
- **Surface**: 60 rings × 56 points, projected with a squashed pseudo-3D
  rotation (the turntable turns once per 90 s). Shading is a flat warm
  gray (#CFC8BC) modulated by a fixed light direction and a per-point
  seeded variation. Resolved rings are drawn as short dashes along the
  ring; a ring just above the line gets a small brightness lift, the
  active band where the measurement is happening.
- **The scan**: one pass every 20 s, top to bottom. Ahead of the line,
  each point's drift is a closed-form function of its distance below the
  line — down and outward, seeded per point — scaled by a pass envelope
  (sin^0.7 of the pass phase) so the dissolve is strongest mid-pass and
  the loop closes gently instead of snapping at the wrap.
- **The line itself**: a 2 px core of #FF3A30 over two stacked translucent
  skirts. No gradients anywhere in the piece; the softness is just alpha.
- **Decals**: five per pass, seeded from the pass number — crosshairs and
  ticks at fixed surface heights and angles. Each fades in as the line
  reaches its height and out over the following ten seconds, riding the
  turntable as it fades. The shipped seed was scanned at build time so
  that three of the first pass's decals are on the front of the vessel at
  frame one.
- **Interaction**: drag orbits — the offset is held while dragging and
  eases back to the turntable with a ~3.5 s time constant. Double-tap
  reseeds the profile. A single tap does nothing. Sound: none, by choice;
  a servo tick would only hurry the scan.

## Determinism

Everything unattended is a closed-form function of piece time *t*. Frame
one is a fixed phase at *t* = 10 s — mid-pass, line across the vessel's
middle, upper form resolved with decals showing, lower form dissolving —
drawn synchronously at load, with the rAF loop (typeof-guarded) anchored
to that phase. The thumb re-renders byte-identical.
