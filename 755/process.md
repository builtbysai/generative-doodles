# No.755 Dawn to Dusk

EXPANSION #92 robert-irwin, prompt block 4. After Irwin's untitled
(dawn to dusk) at Chinati, Marfa (2001-16): a room bisected by scrims,
one half engulfed in light, the other held in dark, the boundary
tracking the sun inside a former hospital wing.

## Concept

Two fields and a scrim, nothing else: no sun disc, no landscape, no
clock readout, no controls. The piece is a clock that never tells time.
Its program runs on the viewer's real local time. In the morning the
light field stands left of the scrim and the dark field right; the
boundary sweeps across the frame as the sun's azimuth advances; across
solar noon the arrangement mirrors, so by dusk the light field stands
right of the scrim and narrows as the sun goes down, the boundary
glowing amber whenever the sun rides near the horizon. At night the
room holds the dusk arrangement, both halves deep, the scrim a faint
seam, until dawn starts the sweep again. Watch-only: Irwin charges
sustained looking, not input.

## Construction

- Single self-contained index.html, canvas 2D, no external assets, no
  visible text except the title. Strict six-anchor palette: light half
  #F2E8D8, dark half #1A1C22, scrim plane #E8E8E4, sun-boundary amber
  #E8A33D, noon white #FBF8F0, midnight #0E0F12. Every tone in the piece
  is an interpolation between these anchors.
- Solar model (same family as the Turrell siblings Nos.744 and 750):
  day-of-year from the local date; declination -23.44 deg times
  cos(2 pi (doy + 10) / 365); hour angle at a fixed 40 deg latitude;
  solar noon at 12:00 local clock time. Sunrise and sunset fall out of
  the half-day hour angle; sun elevation for any minute comes from the
  standard hour-angle formula. For 2026-10-31 the model gives sunrise
  06:53, sunset 17:07.
- Boundary mapping: solar azimuth advances monotonically through the
  day, so the boundary is a function of day progress
  q = (minute - sunrise) / (sunset - sunrise). It sweeps from 0.14 of
  the frame width at sunrise to 0.50 at solar noon to 0.86 at sunset.
  The mirror is a smoothstep crossfade (sideMix, q from 0.44 to 0.56)
  blending each field between its light-field and dark-field tones, so
  the arrangement turns inside out across noon without a cut. At night
  (q undefined) the boundary rests at 0.86 in the evening arrangement.
- Luminance from elevation: dayness = clamp((sinAlt + 0.06) / 0.22)
  ramps the light field from a faint warm remnant (midnight mixed 16
  percent toward the light tone) up to the warm light-half tone, then a
  flare term mixes it up to 80 percent toward noon white as sinAlt
  passes 0.30. The dark field runs midnight at night to the held dark
  tone by day, with a 7 percent lift toward the light tone near noon so
  the dark half is never absolute at midday. The amber glow factor
  g = clamp(1 - |altDeg - 1| / 12) peaks with the sun about a degree
  above the horizon and dies under a high sun or a deep night.
- Fields: no canvas gradients (house rule). Each field is drawn as flat
  stepped vertical strips about 9 px wide. A strip's tone is set by its
  distance t from the boundary, normalized by the field's own width:
  the light field warms toward amber at the scrim (0.38 g + 0.05) and
  deepens 12 percent toward the dark anchor at the far wall; the dark
  field lifts at the scrim (10 percent toward the scrim tone, 0.30 g
  toward amber) and sinks 35 percent toward midnight at its far wall.
  A seeded per-strip jitter (mulberry32, seed 755021, plus/minus 1.2
  percent luminance) keeps the fields reading as plaster, not print.
- Amber boundary glow: thirteen stepped strips over a band about 8.5
  percent of the frame width, raised-cosine alpha profile, peak alpha
  0.30 g, drawn over the fields under the scrim.
- Scrim: eleven stepped strips over a band about 3.2 percent of the
  frame width (minimum 10 px half-width), raised-cosine alpha profile
  peaking at 0.34, plus a 1 px tension edge at the boundary at alpha
  0.45. The scrim tint mixes between a cool cast (scrim tone 30 percent
  toward the dark anchor) and a warm cast (32 percent toward amber) by
  a warmth factor combining the lit share of the frame and the glow g,
  so the plane leans warm when the light side dominates or the boundary
  glows, cool when the dark side dominates.
- Minute quantization (house adaptation, required by the brief): the
  program clock is a pure function of (local date, local minute-of-day).
  Date is read only at year, month, day, hour, minute resolution;
  seconds and milliseconds are never consulted. The frame is therefore
  identical at every instant inside a minute and steps once per minute,
  which keeps the piece reproducible for the determinism gate while it
  genuinely runs on real local time. This stands in for the prompt's
  30-second tick: a 30-second state could change between two QA renders
  in the same minute, a minute state cannot.
- Canvas sizing follows the house template: Visual Viewport API with
  resize listeners on visualViewport and window, canvas style width and
  height pinned in px inside draw(), phone detection via window.screen
  physical size (min dimension under 700 px) with the aspect fallback.
  The bisection stays vertical on phones; the page ground is the
  midnight anchor. The animation loop is typeof-guarded
  requestAnimationFrame; the first frame is drawn synchronously at load.
- QA hook: a ?seed=tH:MM query forces the program minute for state
  checks. It is inert without the parameter and shows nothing on screen.

## QA log

- Rendered with the house renderer (node-canvas) at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png), with
  the renderer clock set to the user's timezone (America/New_York) so
  frame one is the viewer's actual state: 16:19 EDT on 2026-10-31,
  day progress about 0.92, sun about 9 degrees up. All three sizes show
  the dusk mirror in effect: the dark field holds the left four fifths
  of the frame, deepening toward the left wall and lifting warmly as it
  nears the scrim; the scrim band sits at about 0.82 of the width with
  a visible amber-warm core; the light field survives as a narrowing
  warm band on the right, amber at the scrim, settling to the warm
  light tone at the right edge. No text, no UI, nothing clipped on
  mobile; the phone frame keeps the vertical bisection.
- Determinism: thumb.png rendered twice back-to-back inside one minute
  and byte-identical under cmp; the duplicate was deleted.
- Forced night check (?seed=t1:00, throwaway render, read back, then
  deleted): both halves deep, the room holding the dusk arrangement
  with the boundary at 0.86; the scrim reads as a faint pale seam and
  the right field, the light field's remnant, sits a touch warmer than
  the left midnight field; no amber glow. As specced.
- Forced dawn check (?seed=t7:30, throwaway, deleted): the morning
  arrangement: a young warm light field on the left, the amber boundary
  at full glow along the scrim at about 0.19 of the width, the dark
  field filling the rest and deepening to the right wall.
- Forced noon check (?seed=t12:30, throwaway, deleted): the boundary
  essentially at center with the mirror crossfade nearly complete, the
  light field on the right flaring near noon white, the dark field on
  the left visibly lifted, the boundary quiet under a high sun.

## Deviations

- Minute quantization of the program clock, per the brief, replacing
  the prompt's 30-second tick (see Construction): the state steps once
  per minute rather than twice. At the scale of a day-long sweep a
  one-minute step is below the threshold of the work, and it is what
  makes the frame reproducible.
- Flat stepped strips replace the prompt's vertical gradients, per the
  house no-gradient rule; at 9 px per strip the steps sit below normal
  viewing distance and the fields read as continuous rooms of light.
- The dusk mirror is realized as a crossfade of field tones across
  solar noon rather than a hard swap of the two halves, so the room
  turns inside out over about an hour of real time instead of cutting.
  The boundary position itself never jumps.
- The solar model uses a fixed 40 deg latitude and solar noon at 12:00
  local, since the piece has no access to (and must not ask for) the
  viewer's location. Sunrise and sunset are estimates in the spirit of
  the prompt's "simple solar math", off by minutes for viewers far from
  that latitude or deep in a time zone's edge.
- Frame one was rendered with the QA clock in the user's timezone
  (America/New_York). On the build VM (UTC) the same minute reads as
  night; the piece itself always uses the viewer's own local time.
