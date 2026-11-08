# №1628 Fold of Mountains (YL5, study #214 yi-wen-lin)

## What it is
Black paper (#0A0A0B). A single mountain ridge drawn as 48 stacked white
(#E8E6DF) contour lines: the ridge is a 4-octave fBm-displaced polyline, and
each contour below it echoes the silhouette with noise-modulated spacing, so
the stack reads as a topographic fold. The ridge crosses the middle third;
generous black sky above, contours filling the lower half. Portrait field.

## Motion and interaction
Watch-first: the drawing is the animation. A virtual pen starts at the left
edge and draws each contour in sequence, left to right, one contour every
2.0 s at plotter speed, with a slight mechanical wobble (sin, ~1.75 Hz) at
the pen tip, shown as a small white dot. The full drawing takes 96.5 s.
The noise seed drifts on a long timescale (octave phase drift 0.004 to
0.017 rad/s), so a second viewing shows a different fold.
Drag: pointer down and drag pushes or pulls the ridge locally. Each drag
stores a Gaussian displacement (sigma 0.07 of field width, amplitude
clamped to plus or minus 0.09 of field height) that persists; because every
contour is computed from the ridge each frame, the whole stack re-folds
around the gesture. Contours bend, they never break. No click-to-reload,
no click-to-restart, no moon, no birds.

## Asserted counts
- Contours: 48 (ridge plus 47 echoes). Verified in code: CONTOURS = 48.
- Ridge octaves: 4 (frequencies 1.5, 3.2, 6.5, 12 cycles across the field).
- Contour alpha by depth: 0.92 at the ridge, falling 0.013 per contour to a
  floor of 0.30 at the deepest contour.
- Frame one (fixed phase, t = 21 s): contours 0 to 9 fully drawn, contour 10
  half drawn, pen dot visible at its head. The mountain reads from frame one;
  it is never a blank black sheet.

## Deviations from the prompt
- One deliberate addition: contours not yet reached by the pen are drawn as
  a very faint ghost (alpha 0.05) instead of being invisible. The slow draw
  is unchanged, the pen is still the only bright work in progress, but the
  full fold reads faintly from frame one, as in the №1625 template's queued
  cells. Nothing else was added; no moon, no birds, no extra color.

## Technical notes
- Boilerplate adapted from №1625 (fetched live from the repo; no local
  copy existed): Visual Viewport sizing with resize on visualViewport and
  window; canvas pinned in draw() via style width/height in px; phone
  detection via window.screen (min dimension under 700 px) with the aspect
  fallback (h > w * 1.15); portrait field centred on desktop, full-bleed on
  phones; one synchronous frame at load; requestAnimationFrame guarded with
  a typeof check; reduced-motion draws the completed mountain once.
- Determinism: all randomness comes from mulberry32(SEED 1628007) at load;
  ridge phases and spacing-noise phases are seeded once; drift is a pure
  function of t. Frame one is a fixed phase, so the thumb is byte-identical
  across re-renders (verified: three renders, same md5
  01e8ded9f46558a4167b4032fad56651).
- Flicker: none by construction; the only oscillation is the pen wobble at
  about 1.75 Hz, well under the 14 Hz limit.
- Title "Fold of Mountains", date "2006 · 06 · 27", hint "Drag to bend the
  ridge." rendered on dark plates as in the template. No em dashes in any
  visible copy.

## QA
Rendered from the actual script with node ~/workspace/tools/render-piece.js
at 1280x900 desktop, 390x844 mobile, and 720x720 thumb. All three inspected
visually: ridge reads as a mountain silhouette with two main peaks, contours
stacked below it, black sky above, pen dot visible mid-draw on the eleventh
contour, title and hint plates legible at both sizes. Thumb re-rendered
twice more after inspection; all three copies byte-identical.
