# №8954 · Trough Walk - process notes

- **Title:** Trough Walk
- **Seed:** 251 (Trough Walk - tuning-tolerance envelope)
- **Concept:** One octave of pitch as a washboard of parabolic tuning
  valleys. The 5-limit consonances (1/1, 5/4, 4/3, 3/2, 5/3, 2/1) are
  wide indigo troughs; awkward ratios (7/6, 11/8, 9/5, 45/32...) are
  narrow rust slots. A probe needle slides along, snaps into the nearest
  trough within tolerance, and names the ratio in cents.
- **Technique:** Vanilla canvas. A tolerance slider (0.25x-2x) scales
  every trough's catchment width, so widening it visibly eats the narrow
  valleys. WebAudio oscillator plays the caught ratio when sound is on
  (user-gated, off by default). Moving the pointer walks the octave.
