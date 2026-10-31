# No.744 Skyspace Dawn

EXPANSION #91 james-turrell, prompt block 1. After Turrell's Skyspaces:
Twilight Epiphany (Rice, 2012) and Meeting (PS1, 1980-86).

## Concept

A knife-edge ceiling aperture in a dark room, framing a plane of sky that
reads as within reach. No horizon, no clouds, no birds, no readout: the sky
is a near-uniform color field whose slow program is the whole piece. The
program runs on the viewer's real local time: a 40-minute dawn sequence
(pre-dawn rose, then amber low against rose, then pale sky under noon blue)
centered on sunrise, the same sequence in reverse centered on sunset, and
outside those windows the still noon flatness the prompt specifies. The
apparatus, the time math, stays hidden, like Turrell's fixtures. Watch-only;
Turrell demands sustained looking, not input.

## Construction

- Single self-contained index.html, canvas 2D, no external assets, no
  visible text except the title.
- Room: flat dark ground #0A0A0C. Bezel: flat stone #1A1C20 frame. The
  aperture is centered, 70% of frame height, width from its proportion
  (clamped on phones so it never becomes a slit). The knife edge is the
  hard boundary itself, plus a 2 px ground-tone shadow line inside the
  lower and right rims and a faint pale catch on the upper rim, palette
  tones only.
- Sky: no canvas gradients (house rule). The vertical tone blend is 56
  stacked flat horizontal strips interpolating between the keyframe's top
  and bottom anchors. On top of that, three seeded noise bands (mulberry32,
  seed 74409013) drawn as stacks of thin strips with a raised-cosine alpha
  profile peaking at 0.05 to 0.09 in pale sky, block-textured horizontally;
  cloud texture is suppressed, the bands only modulate. A static seeded
  grain (420 specks, alpha 0.012 to 0.032) sits inside the aperture.
- Solar model: day-of-year from the local date; declination
  -23.44 deg times cos(2 pi (doy + 10) / 365); hour angle at a fixed
  40 deg latitude; solar noon at 12:00 local clock time. Sunrise and
  sunset fall out of that; the dawn window is sunrise plus/minus 20
  minutes, the dusk window sunset plus/minus 20 minutes. Keyframes are
  [bottom, top] pairs: rose/rose, amber/rose, pale/noon; the sequence
  lerps rose to amber/rose over the first half of the window and on to
  pale/noon over the second; dusk runs the same path in reverse.
- Minute quantization (house adaptation, required by the brief): the
  program clock is a pure function of (local date, local minute-of-day).
  Date is read only at year, month, day, hour, minute resolution; seconds
  and milliseconds are never consulted. Band drift positions are closed
  forms of the minute. So the frame is identical at every instant inside a
  minute and steps once per minute, which keeps the piece reproducible for
  the determinism gate while it genuinely runs on real local time.
- Canvas sizing follows the house template: Visual Viewport API with
  resize listeners on visualViewport and window, canvas style width and
  height pinned in px inside draw(), phone detection via window.screen
  physical size (min dimension under 700 px) with the aspect fallback.
  The animation loop is typeof-guarded requestAnimationFrame; the first
  frame is drawn synchronously at load.
- QA hook: a ?seed=tH:MM query forces the program minute for state checks.
  It is inert without the parameter and shows nothing on screen.

## QA log

- Rendered with the house renderer (node-canvas) at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png) at
  20:08-20:09 UTC, which the solar model reads as after the dusk window,
  so all three show the held noon state: dark room, stone bezel, stepped
  sky running noon blue at the top to pale at the bottom, faint band
  modulation visible mid-field, no horizon line, no text, nothing clipped
  on mobile; the phone frame keeps the aperture proportion.
- Determinism: thumb.png rendered twice back-to-back inside one minute,
  byte-identical under cmp, run twice (before and after the QA-hook fix
  below); the duplicate renders were deleted.
- Forced dawn checks (throwaway renders, read back, then deleted):
  ?seed=t6:35 (inside the dawn window, progress about 0.07) shows the
  near-uniform pre-dawn rose plane with one faint band; ?seed=t6:55
  (progress about 0.58) shows rose holding high and stepping down through
  peach to amber at the bottom, the stepped bands visible, exactly the
  specced sequence mid-run.
- Fix during QA: the first forced render came back identical to the noon
  thumb because the hook read window.location.search, which the headless
  renderer exposes only as a bare global. The hook now falls back to the
  bare location global; forced renders then produced the dawn states
  above. Normal rendering (no query) is unaffected.

## Deviations

- Minute quantization of the program clock, per the brief: the sky steps
  once per minute instead of easing continuously. At Turrell's time scale
  (a 40-minute sequence) a one-minute step is below the threshold of the
  work, and it is what makes the frame reproducible.
- Flat stepped bands replace the prompt's layered gradients, per the
  house no-gradient rule; the bands and the low-alpha noise modulation
  keep the field reading as one plane, not as stripes, at viewing
  distance.
- The solar model uses a fixed 40 deg latitude and solar noon at 12:00
  local, since the piece has no access to (and must not ask for) the
  viewer's location. Sunrise and sunset are therefore estimates in the
  spirit of the prompt's "simple solar math on the date", off by minutes
  for viewers far from that latitude or deep in a time zone's edge.
- Outside the dawn and dusk windows the sky holds the noon flatness
  through the night as well, exactly as the prompt's program states
  ("otherwise the sky holds a still noon flatness"); the window edges are
  program cuts at a minute tick, not fades.
