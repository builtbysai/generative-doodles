# №855 The Separated Reel

CK1 / PP1255, study #262 colton-kempf. Formula date 2004 · 05 · 15.

The driver, as a felt phenomenon: the picture stays put while its
sound visibly comes loose and can be swapped. A washed-out garden
birthday plays untouched, handheld wobble and all, while the
soundtrack drifts beneath the frame as a loose grey ribbon, and a
tap swaps in a different soundtrack for the same unchanging footage.

## Build

- First frame: FIRST_T = 15 s into a 90 s cycle. Wobble, bunting
  sway, candle flames, balloon bob, tree sway and the ribbon drift
  are closed-form functions of t, so frame one is deterministic.
- Footage: procedural garden birthday, full frame to 0.80 of the
  stage. Warm dusk sky with a low hazy sun, two swaying trees,
  bunting across the top, two drifting balloons, a lawn with faint
  mowing bands, a draped table with a five-candle cake, five
  abstract figures around it (rounded bodies, hair caps, no faces,
  no detail). A pale veil and film grain wash the color out; a soft
  vignette keeps it from going HDR.
- Handheld wobble: a slow closed-form sway (two incommensurate
  sines, under 0.4 Hz) plus a tiny rotation, applied to the footage
  layer only and clipped to the footage band, so the strip below
  stays fixed and the separation reads.
- The detached strip: dark warm grey band below the footage with a
  thin divider line. The waveform ribbon is a loose grey silhouette
  drifting slowly left, with the stem label at the left and three
  stem dots at the right.
- Interaction: tap anywhere cycles 0-1-2-0. Stem 0 Family audio is
  a jagged lively waveform from a fixed 48-segment table. Stem 1
  Composed score is a smooth regular sine swell. Stem 2 Maker
  narrating is speech-burst clusters with near silence between.
  The ribbon crossfades over 0.8 s, closed-form in (t - tapT), and
  the label crossfades with it. The footage never changes.
- Audio is visual-only in this gallery: no real WebAudio, the
  ribbon and the stem label ARE the sound, per the Franke audio
  rule.
- Caption plate top left (№855 · The Separated Reel, 2004 · 05 · 15)
  and hint bottom center (Tap to change the soundtrack.), drawn
  in-canvas in the template's place.
- Canvas 2D only. No click-to-reload. No em dashes in visible copy.
  Fastest motion is the 1.4 Hz candle flicker, well under 14 Hz.

## QA

- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile,
  720x720 thumb; all three inspected. Note: the desktop stage is
  square (828x828 buffer) per the template's desktop rule, same as
  №854; the thumb is a 576x576 buffer from the 720x720 viewport.
- Time probes (node harness, /tmp/probe855d.js): wobble x -0.81 /
  1.13 / 3.02 px at t=15 / 45 / 75; ribbon amplitude at u=0.5
  0.243 / 0.710 / 0.459 for stem 0, 0.464 / 0.418 / 0.171 for
  stem 1, 0.211 / 0.185 / 0.170 for stem 2. Pixel diff between
  t=15 and t=75 frames: 27.81% of pixels.
- Tap probes: tap cycles 0 Family audio, 1 Composed score,
  2 Maker narrating, back to 0. Morph is 0.000 at the tap,
  0.500 at +0.4 s, 1.000 at +0.8 s. Ribbon at u=0.5 after the
  crossfade equals the pure stem 1 value exactly (0.385).
- Footage invariance: footage region of a stem 0 frame versus a
  stem 1 frame at the same virtual time differs in 0.00% of
  pixels; the strip differs in 10.15%.
- Determinism: two draws at t=15 differ in 0 pixels, desktop and
  mobile.
- Fix round: bunting lowered on phones (base 0.115, sag 0.035)
  after the first mobile render showed the string crossing the
  caption date; re-rendered and re-gated.
- Fix round: the first tap probe compared frames at different
  virtual times and read 17.88% footage diff; that was the probe,
  not the piece. Rebuilt the probe to compare two fresh instances
  at the same virtual time, which reads 0.00%.

## Deviations

- None from the prompt. The two rear figures stand partly behind
  the table by design, heads above the table edge, which reads as
  standing behind it.
- Minor wart: on phones the left balloon sits in front of the left
  tree canopy; it reads as a balloon in front of a tree, so it was
  left alone.
