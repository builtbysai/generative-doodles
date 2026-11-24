# №864 Mostly Sky

ZW2 / PP1264, study #263 zach-wolfe. Formula date 2004 · 05 · 24.

The driver, as a felt phenomenon: the sky is the subject and the
tower is only its excuse. Two dark slabs rise from the bottom
edge, shot dead-vertical from their base, and the rest of the
frame is empty sky. Clouds cross that expanse slowly, and the
light on the towers moves through a full day over six minutes.
The emptiness is the piece.

## Build

- First frame: FIRST_T = 120 s into a 360 s cycle. The day cycle
  is 360 s (six minutes, dawn to dawn); clouds cross the frame
  once per cycle; the light breathing on the tower faces is 60 s.
  Every period divides 360, so frame one is deterministic and
  the frame at FIRST_T + 360 equals the frame at FIRST_T. At
  FIRST_T the day phase sits at midday: saturated blue sky,
  bright cool light.
- The load-bearing parameter is the sky-to-subject ratio: the
  taller tower tops out at 0.32H, so 68% of the frame above the
  main mass is sky, inside the spec's 60-70% band. A hairline
  spire on the taller tower reaches to 0.36H, leaving 64% of
  clear sky above even the spire tip. The pair sits left of
  center (x 0.14-0.32 and 0.38-0.56); the right two-fifths of
  the frame is open sky all the way to the ground line. No
  second subject, no tilted-up drama.
- Mechanism, not stage directions: one procedural vertical
  structure generator (two slabs with faint mullion and floor
  lines, a lit left face, a warm lit edge) plus a sky-gradient
  field (saturated blue top to pale horizon), seven seeded
  clouds drifting left to right, and a day cycle keyed dawn /
  midday / dusk that shifts the sky warmth and the light on the
  towers. No sun disc: it would compete with the sky.
- Watch-only; no pointer interaction. The emptiness is the
  piece, and interaction would fill it. Visual-only: no
  WebAudio, no autoplay audio, per the Franke rule.
- Caption plate top left (No.864 - Mostly Sky,
  2004 · 05 · 24) and hint bottom center (Watch the clouds
  cross the sky.), drawn in-canvas in the template's place.
  The hint sits over a thin dark plaza strip the towers stand
  in, across the full width.
- Canvas 2D only. No em dashes in visible copy. Flicker at or
  below 14 Hz by construction: all motion is slow drift on
  periods of 60 s or longer, and reduced-motion renders a still
  first frame.

## QA

- Rendered with node-canvas at 1280x900 desktop (828x828 square
  stage), 390x844 mobile (full-bleed), 720x720 thumb (576x576
  stage, same as the shipped №862 thumb); all three inspected
  visually.
- Time probes: frames at t=120 (FIRST_T) and t=240 differ in
  90.73% of pixels at a >8-per-channel threshold (the whole
  sky gradient shifts with the day cycle and the clouds move);
  sampled lit face shifts cool 115,119,127 at midday to warm
  123,110,94 at dusk. Structure stays anchored: pixel at
  (0.47W, 0.66H) is sky, at (0.47W, 0.70H) is tower, confirming
  the 68% sky ratio.
- Determinism: a fresh render at FIRST_T is byte-identical to
  thumb.png (sha256 b12ed8d7...).
- Seamless loop: frames at t=120 and t=480 (FIRST_T + 360)
  differ in 0.00% of pixels and are byte-identical.
- Fix rounds: 0. The first build passed visual QA at all three
  sizes.

## Deviations

- None from the prompt. Watch-only as specced; twin towers as
  the vertical subject; sky 68% to the tower tops.

## Known warts

- Clouds are flat soft-ellipse clusters; at thumb size they read
  as simple ovals, a little stylized rather than photographic.
- The spire is a hairline and easy to miss at thumb size.
- One cloud sits half off the right edge mid-frame at some cycle
  phases while wrapping; it reads as a cloud entering the frame.
