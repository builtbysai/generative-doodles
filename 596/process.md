# Point Field Score, No.1849

Driver: a hand-drawn star chart that plays itself, white dots drifting over a faint
indigo and umber wash and sounding as plucked pizzicati when they cross a hairline
playhead, while a few red blobs answer with long bowed harmonics, and a drag
scatters the field so the notes find their own new order.

## Build

- Single self-contained index.html, inline CSS/JS, no external assets.
- Field: 220 chalk-white dots and 7 oxide-red blobs, all seeded (mulberry32, seed
  1849) and positioned by analytic drift, so frame one is a pure function of the
  fixed phase t = 60.0 s. No wall clock, no unseeded randomness in frame one.
- Playhead: a 1 px hairline at x = 0.618 of the field width, alpha 0.22, never a
  glowing bar. Dots brighten as they approach it.
- Pitches: just-intonation ratios [1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2] around
  A = 432 Hz. Dots pluck via Karplus-Strong synthesis, blobs bow via a sawtooth
  through a lowpass filter with slow attack and vibrato, one octave below.
- Wash: 26 seeded radial-gradient blobs, muted indigo #3A4066 and umber #6B5233 at
  alpha 0.10 over black ground #0A0A0C. Heat memory: 14 seeded pale spots at load,
  plus one spot added at each playhead crossing, capped at 220 spots.
- Interaction: pointer drag applies a decaying radial scatter impulse to nearby
  agents and lazily creates the AudioContext inside the first gesture. No play
  button, no staff lines, no note heads, no click-to-reload anywhere.
- House rules: Visual Viewport sizing with resize on visualViewport and window,
  canvas pinned in draw() via style.width/height in px, phone detection via
  window.screen (min dimension under 700 px) with aspect fallback, field full-bleed
  on phones and desktop, one synchronous frame at load, requestAnimationFrame
  guarded by a typeof check, reduced-motion respected.
- Palette hand-picked from the prompt's named colors (studies/theresa-wong.md does
  not exist in the repo): ground #0A0A0C, chalk #EDEAE0, oxide #A83C28 with
  highlight #D05A3C, indigo #3A4066, umber #6B5233.
- Title plate: "Point Field Score", date "2007 · 02 · 03". Hint plate: "Drag to
  scatter the field."

## Asserted counts

- Dots: 220 (DOTS.length, probe dotCount).
- Blobs: 7 (BLOBS.length, probe blobCount).
- Playhead position: x = 0.618 of field width (probe playheadX).
- Wash blobs: 26. Seeded heat spots at load: 14.

## Deviations from the prompt

- Wash and heat are drawn directly each frame from seeded arrays instead of an
  offscreen accumulation buffer. Reason: the offscreen canvas is invisible to the
  node-canvas QA harness, so the wash could not be visually verified; direct
  drawing keeps the same look and behavior while making frame one verifiable in
  all three QA renders.
- No sound toggle plate. Reason: the prompt forbids a play button, and audio
  starts lazily inside the first drag gesture instead.

## QA

- Rendered with node render-piece.js at 1280x900 desktop, 390x844 mobile, and
  720x720 thumb. All three inspected: black field with white dots and red blobs,
  faint indigo/umber wash visible, hairline playhead at 0.618, title/date and hint
  plates legible and unclipped on desktop and phone.
- thumb.png re-rendered a second time: md5 identical (deterministic frame one).
- No em dashes in visible copy.
