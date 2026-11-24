# №862 Format Grain Archive

CK8 / PP1262, study #262 colton-kempf. Formula date 2004 · 05 · 22.

The driver, as a felt phenomenon: the same tidal-flat figure walking,
rendered three ways at once, super-8 red and cream, VHS pink-orange
bloom, camcorder grey-green, with a faint electronic hum holding the
black between the panels and a brief black-screen hum before the
image arrives each cycle. No format is best; the tap only changes
which era is live.

## Build

- First frame: FIRST_T = 12 s into a 60 s cycle. The walk stride is
  2 s, the VHS tracking band 30 s, the hum wobble 10 s, grain
  breathing 6 s; every period divides 60, so frame one is
  deterministic and the frame at FIRST_T + 60 equals the frame at
  FIRST_T.
- One base scene, three post-process passes: a tidal flat with a low
  sun, wet sand, still pools catching the sky, sand shine streaks,
  and one walking figure with a faint reflection in the wet sand.
  The figure crosses the flat once per cycle, already a third of
  the way in at FIRST_T, legs in mid-stride.
- Super-8: red and cream palette, a red light leak from the top
  right corner with a vertical leak streak, tree silhouettes at both
  cropped edges, warm vignette, heavy grain.
- VHS: pink-orange palette with a bloom wash, scanlines across the
  panel, a chromatic pink ghost of the figure offset a few pixels,
  a pale tracking band drifting down the panel once per 30 s,
  degraded lifted color.
- Camcorder: grey-green palette, cool desaturating wash, coarse
  interlace lines, and the date stamp "24 8 18" bottom right in
  monospace.
- Composition vs interaction reconciled as briefed: the three format
  panels are stacked and all three eras stay present; TAP advances
  which panel is live, the active panel full and vivid with a LIVE
  tag, the other two dimmed under black and quiet.
- The hum never leaves: a thin cream line with a fainter harmonic
  wobbles slowly in each black band between the panels. The hum
  opener is a fixed-phase beat of the loop, keyed to absolute cycle
  phase: the image fades out to black over the last 3 s of each
  cycle and fades back in over the first 3 s. At FIRST_T the image
  is fully present.
- Tap only; no click-to-reload, no reseed button. Audio is
  visual-only in this gallery: the hum is a drawn line, no real
  WebAudio, per the Franke rule. No clean digital reference frame.
- Caption plate top left (№862 · Format Grain Archive,
  2004 · 05 · 22) and hint bottom center (Tap to change format.),
  drawn in-canvas in the template's place. Format labels sit top
  left inside each panel, clear of the super-8 tree.
- Canvas 2D only. No em dashes in visible copy. Flicker at or below
  14 Hz by construction: all motion is slow drift and breathing on
  periods of 2 s or longer, and the stride itself is a 0.5 Hz sway.

## QA

- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile,
  720x720 thumb; all three inspected visually, plus one 720x720
  frame per format and a frame at t=42.
- Time probes (node harness, /tmp/probe862.js): figureX 0.305 /
  0.630 / 0.955 / -0.020 at t=12 / 27 / 42 / 57, so the figure
  walks the flat once per cycle; legSwing 0.891 / 0.454 / -0.891 /
  -0.454 at t=12 / 12.5 / 13 / 13.5, the stride swinging; opener
  alpha 0 / 0.5 / 1 at t=0 / 1.5 / 3 and 0.5 / 0 at t=58.5 / 60.
  Pixel diff between t=12 and t=42 frames: 1.54% (the small figure
  moving across a large frame); between the t=1 opener frame and
  t=12: 71.99%.
- Format probes: ?format=0/1/2 each settle with the right panel
  live and the other two dimmed; frame pairs differ in 47.78% of
  pixels, the two panels that swap live and dimmed. Inspected
  visually: super-8 shows the red leak and tree silhouettes, VHS
  shows scanlines and pink-orange bloom, camcorder shows the
  grey-green grade and the "24 8 18" stamp.
- Tap probe: advanceFormat moves the live panel 0 to 1 to 2.
- Determinism: two draws at t=12 differ in 0 pixels.
- Seamless loop: frames at t=12 and t=72 (FIRST_T + 60) differ in
  0 pixels.
- Fix rounds: 2. Round 1: the first frame rendered almost entirely
  black, because the hum opener was keyed to cycle phase measured
  from FIRST_T, so u=0 at FIRST_T sat inside the opener. The
  opener is now keyed to absolute cycle phase (t mod 60), so
  FIRST_T is never inside it. Round 2: the first frame's figure
  read as a lamppost, legs together at the stride's passing pose
  and too thin, and the format label touched the super-8 tree.
  The stride now carries a phase offset so FIRST_T is mid-stride,
  limbs are thicker with a solid torso stroke, and the left tree
  hugs the cropped edge with the label clear of it.

## Deviations

- None from the prompt. The composition and interaction lines were
  reconciled as briefed: stacked panels with TAP advancing the
  live one, rather than a single panel that swaps formats.

## Known warts

- On the 390x844 mobile frame the hint sits over a wide black band
  below the panels; it stays readable in cream on black.
- The wet-sand reflection of the figure is faint, a flattened V
  under the feet, and reads as a shimmer rather than a mirror.
- The VHS chromatic ghost is subtle, a pink head and rim offset by
  two pixels, and is easy to miss at thumb size.
