# №859 One Track, Many Rooms

CK5 / PP1259, study #262 colton-kempf. Formula date 2004 · 05 · 19.

The driver, as a felt phenomenon: many rooms of performance dissolve
into one unbroken red surface held together by a single line of music,
the red stage light melting into warm lamplight while the track never
breaks, and near the end of each cycle many faces drift in as the
credits, then dissolve so the ending feels like a beginning.

## Build

- First frame: FIRST_T = 15 s into a 90 s cycle. Every layer drifts
  on its own closed-form path; each layer period (90, 45, 30, 22.5,
  18 s) divides the 90 s cycle, so frame one is deterministic and
  the frame at FIRST_T + 90 equals the frame at FIRST_T.
- Six translucent performance glimpses, layered with no hard frame
  edges: red stage beam with a mic stand silhouette; hands on a
  turntable; a crowd of soft dark heads with red rim light; a guitar
  neck diagonal with gold strings; a warm lamp glow; a drum kit edge
  with cymbal and shell. Glow layers use "lighter" compositing,
  the rest draw at low alpha.
- The single unbroken track: one thin gold line weaving across the
  whole frame, a sum of sines whose periods all divide 90 s, with
  a soft glow pass under it. Its waveform gently pulses on the loop.
- Credits: twelve small abstract head-and-shoulders silhouettes
  drift in from the four edges late in the cycle (fade in from
  u = 0.70, full by 0.85) and dissolve by the loop restart, so the
  ending feels like a beginning.
- Watch-only. Audio is visual-only in this gallery: the gold line
  IS the track, no real WebAudio, per the Franke rule. No hard cuts,
  no performer-versus-audience framing, no closing title.
- Caption plate top left (№859 · One Track, Many Rooms,
  2004 · 05 · 19) and hint bottom center (Watch the rooms drift
  through the blend.), drawn in-canvas in the template's place.
- Canvas 2D only. No click-to-reload. No em dashes in visible copy.
  Flicker at or below 14 Hz by construction: all motion is slow
  drift on periods of 18 s or longer.

## QA

- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile,
  720x720 thumb; all three inspected, plus a 720x720 frame at
  t=90 to check the credits arrival.
- Time probes (node harness, /tmp/probe859.js): layer offsets move
  on their own periods, e.g. stage layer x 0.005 / 0.030 / -0.005 /
  -0.030 at t=15 / 37.5 / 60 / 82.5; trackY at xf=0.5 is 0.600 /
  0.672 / 0.623 / 0.600 / 0.577 / 0.528 at t=15 / 30 / 45 / 60 /
  75 / 90 and back to 0.600 at t=105; credits alpha 0 at t=15,
  0.966 at t=90, 0 at t=105. Pixel diff between t=15 and t=60
  frames: 8.74% of pixels; between t=15 and t=90 (credits in):
  21.55%.
- Determinism: two draws at t=15 differ in 0 pixels.
- Seamless loop: frames at t=15 and t=105 (FIRST_T + 90) differ
  in 0 pixels.
- Fix round: the layer y-drift first used a half-frequency cosine
  whose period doubled the layer period, breaking the loop
  (t=15 vs t=105 differed in 1.89% of pixels). The y term now
  rides the second harmonic, so its period (period/2) still
  divides the 90 s cycle, and the loop closes at 0 pixels.

## Deviations

- None from the brief. The hands on the turntable are abstract
  rounded shapes with fingertip caps, not detailed hands, per the
  piece's soft-transparency treatment.

## Known warts

- On the 390x844 mobile frame the hint sits over the crowd heads;
  it stays readable in cream on the dark band.
- In the credits frame two silhouettes overlap near the lamp and
  one overlaps the cymbal; they are translucent and read as part
  of the blend.
