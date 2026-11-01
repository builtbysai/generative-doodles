# №1355 "TIPI Reskin" (cannupa-hanska-luger CH4, PP578)

A single tipi skeleton — lodge poles in a cone — skinned in shifting salvaged
fabrics, under a full moon on a dark prairie night. The tipi is a machine,
not a costume: no camp scenes, no smoke signals, no drums, no western set
dressing.

## Frame one (t = 0, boot-flagged draw(0))

Night sky #0e1420 full-bleed with seeded stars; a large moon upper-left
(#e8e2d4 disc with two flat-alpha halo rings); a flat dark ground band from
0.86H. The tipi sits centered slightly right (apex x 0.56W, apex above the
top edge so the lodge poles lean past the frame top), base at 0.84H, nine
triangular panels with visible seams and poles drawn from base points through
the apex and extended 1.25x past it. Skin at frame one is the first cycle
skin: deadstock fabric — hide base #d8cfc0 with seeded diamond motifs in
rust #b4552d, denim #3a4a63, and olive #8a7a5a, plus two faint horizontal
rules. No readable text anywhere except `<title>`.

## Skin cycle (50 s, closed-form function of piece time)

Four skins x 12.5 s, in order fabric → mirror → hide → denim, with a 2 s
crossfade at each slot boundary (previous skin full, current skin ramping
0 → 1 alpha). The first cycle's first slot plays without a crossfade-in, so
frame one is fully the fabric skin.

- Fabric: hide base + seeded diamond pattern per panel (14 diamonds, seeded
  positions/sizes, three-color rotation) + two faint rules.
- Mirror: silver base #c8ccd2 with flat-alpha mirrored sky bands (dark
  sky band, pale moon band, dark lower band) whose vertical offset slides
  with rotation (tilt parallax), plus three silver glint dots per panel.
- Hide: plain #d8cfc0 with per-panel tone variation (seeded: darker warm
  wash or lighter wash) and two flat darker blotches.
- Denim: #3a4a63 base with a faded patch, plus stitch dashes (five seeded
  rows of short dashes in #7a8aa5).

## Interaction

- Drag the cone: rotation angle = angle at drag start + horizontal drag
  delta x 0.004. Panel base points shift proportionally to rotation (edges
  move most) and skins ripple (sine ripple scaled by |rotation|).
- Release: the cone settles back to rest — angle decays exponentially,
  `angle * exp(-(t - releaseT) / 1.2)`, so it is ~98% settled after 5 s.
- No tap actions. Never click-to-reload. Silent: no audio of any kind.

## Adaptations (prompt vs. build)

- Cone as canvas 2D triangular panels, never shader geometry (QA renderer
  has no WebGL).
- Mirror pass: the prompt offers "front camera shimmer or an abstract sky".
  The camera option is refused — no getUserMedia in any piece, ever. The
  mirror skin is flat-alpha mirrored sky bands + tilt parallax, i.e. the
  abstract-sky option.
- No gradients, no shadowBlur, no Path2D, no offscreen canvas, no
  createElement, no AudioContext. Moon halo and glow are layered flat-alpha
  discs (one arc per path). Panel skins are painted inside a clip path on
  the main canvas.
- No device-clock sky: the prompt's "sky reflections of whatever time of
  day the device reports" is not implemented as a clock read, because a
  clock-driven sky would break frame-one reproducibility for the byte gate.
  The mirror bands are a fixed seeded composition whose offset moves only
  with rotation.

## Determinism

Synchronous first frame at exactly t = 0 via a boot flag; the rAF clock
starts only with the loop (plain function declaration behind a typeof
guard). All randomness comes from mulberry32 streams (seed 1355000, panel
streams 1355000 + index x 7919), never Math.random. Rotation is a
closed-form function of recorded pointer events and piece time — no
frame-integrated state, no Date.now / performance.now anywhere.

## Verification

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900,
  390x844, and 720x720; all three inspected. Desktop: moon, stars, cone,
  poles, ground band all legible. Mobile (390x844): same landscape
  composition as a tall centered cone; moon upper-left; no clipping.
- Thumb byte-identical across three renders.
- Forced-time probe harness (custom, driving the piece's own pointer
  listeners through its rAF loop): t=6 fabric (213,413 hide-base px, 0
  silver); t=18 mirror (153,268 silver px, 219 hide); t=31 hide (85,273
  hide px at strict tolerance — the darker-toned panels fall outside the
  tolerance by design, silver 0); t=40 denim (198,553 denim px).
- Drag probe at identical timestamps: t=40 with a 200 px drag differs from
  t=40 without drag (denim area 260,344 vs 198,553 px — rotation widens
  the cone's projection); after release, t=45 settles back to 199,513
  denim px, ~the no-drag value, confirming exponential settle.
- Token scan clean: no Math.random, createElement, AudioContext,
  getUserMedia, Path2D, gradients, shadowBlur, Date.now, or
  performance.now.
