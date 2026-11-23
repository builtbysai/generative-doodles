# Ten Sines, №1845 (PS6, PP1092)

EXPANSION #241 phillip-sollmann. Gallery date 2007 · 01 · 30.
Gallery note: "Ten towers, one tone each; the beating drifts like weather. Watch only."

## What it is

Ten tall white sculptural towers stand in a bare gallery with a concrete
ceiling and a black cable snaking between them across the floor. The towers
sit in a loose geometric formation receding in perspective; the viewer stands
at eye height (1.6 m) among them. Each tower holds one pure sine tone. The
tones sit close enough in pitch that slow beating drifts through the room
like weather, and the beating shows only as a faint warm shimmer in the air
between towers, never as drawn waveforms. Watch only. No labels on the
towers, no decoration, no waveform, no spectrum analyzer.

## Build

Canvas 2D, single self-contained index.html built from the live №1841
template (page structure, plates, Visual Viewport sizing, phone rules).
Perspective is a closed-form pinhole projection: focal length scales with
scene height and aspect, horizon at eye level, ceiling plane at 4.5 m, far
wall at 24 m. Towers are drawn far to near so nearer towers occlude farther
ones. Each tower is a front face in gallery white with one inner side face
in grey, the face toward the centre of view, plus a soft contact shadow at
its base. The cable is a black polyline through the tower bases in the order
0, 2, 5, 7, 9, 8, 6, 4, 1, 3, with one seeded lateral sag per segment.
Plates are drawn on canvas: title "Ten Sines", date "2007 · 01 · 30",
hint "Watch only."

House rules kept: one synchronous frame at load; requestAnimationFrame
guarded by a typeof check; canvas pinned in draw() via
canvas.style.width/height in px; resize listened to on visualViewport and
window; phone detection via window.screen (min dimension under 700 px)
with aspect fallback (h > w * 1.15); field-like composition full-bleed on
phones and square on desktop; deterministic fixed-phase first frame at
t = 60 s from seeded mulberry32(1845) only, no Date.now or Math.random in
the frame path; no em dashes in visible copy; never click-to-reload.

## The ten pitches

One sine per tower, clustered within 0.71 Hz around A3 so the beating is
slow weather, not tremolo. Adjacent differences run 0.06 to 0.09 Hz, giving
adjacent beat periods of 11.11 to 16.67 s.

| Tower | x (m) | z (m) | Height (m) | Width (m) | Depth (m) | Pitch (Hz) |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | -1.3 | 4.5 | 3.4 | 0.62 | 0.50 | 220.00 |
| 1 | 1.5 | 4.8 | 3.1 | 0.55 | 0.46 | 220.07 |
| 2 | -2.9 | 7.2 | 3.6 | 0.70 | 0.54 | 220.13 |
| 3 | 0.1 | 7.0 | 2.9 | 0.50 | 0.44 | 220.22 |
| 4 | 3.1 | 7.5 | 3.3 | 0.60 | 0.48 | 220.28 |
| 5 | -1.2 | 10.2 | 3.5 | 0.66 | 0.52 | 220.37 |
| 6 | 1.9 | 10.5 | 3.0 | 0.52 | 0.44 | 220.45 |
| 7 | -2.5 | 13.8 | 3.2 | 0.58 | 0.46 | 220.54 |
| 8 | 1.2 | 13.5 | 3.6 | 0.68 | 0.54 | 220.62 |
| 9 | -0.9 | 17.5 | 3.0 | 0.60 | 0.48 | 220.71 |

## Beat periods and the shimmer law

Thirteen shimmer zones sit between spatially neighbouring tower pairs. For
a pair with beat period P = 1 / |f1 - f2| seconds and seeded phase ph, the
pair brightness is b(t) = 0.5 + 0.5 * cos(2 * pi * t / P + ph), and the veil
alpha is 0.03 + 0.13 * b(t). Each veil is a soft vertical ellipse of warm
sand (226, 214, 196) centred at the pair midpoint at 1.9 m height, drifting
laterally by 0.14 * sin(2 * pi * t / 53 + ph2). The veil colour is warm
sand rather than white so it reads against the gallery-white wall; the
alpha stays faint by design.

| Pair | Beat period (s) | Brightness at t = 60 s | Veil alpha at t = 60 s |
| --- | --- | --- | --- |
| 0-2 | 7.69 | 0.0269 | 0.0335 |
| 0-3 | 4.55 | 0.1306 | 0.0470 |
| 1-3 | 6.67 | 0.9814 | 0.1576 |
| 1-4 | 4.76 | 0.5549 | 0.1021 |
| 2-5 | 4.17 | 0.1588 | 0.0506 |
| 3-5 | 6.67 | 0.9923 | 0.1590 |
| 3-6 | 4.35 | 0.6621 | 0.1161 |
| 4-6 | 5.88 | 0.9977 | 0.1597 |
| 5-7 | 5.88 | 0.4150 | 0.0840 |
| 5-8 | 4.00 | 0.0975 | 0.0427 |
| 6-8 | 5.88 | 0.0434 | 0.0356 |
| 7-9 | 5.88 | 0.1474 | 0.0492 |
| 8-9 | 11.11 | 0.6821 | 0.1187 |

## Frame one state (t = 60 s)

The brightest shimmer is the pair of towers 4 and 6, in the right-mid
field: brightness 0.9977, veil alpha 0.1597, beat period 5.88 s. The
runners-up are nearly as bright: towers 3 and 5 at 0.9923, and towers 1
and 3 at 0.9814. The dimmest zone is towers 0 and 2 at 0.0269. All ten
towers are visible at frame one on desktop, mobile, and thumb sizes.

## Audio

Described here only; there is no audio in the page and no sound toggle.
The ten sines are the pitches in the table above, each a pure sine
oscillator with slow phase drift; the beating between neighbouring tones
is what the shimmer pictures. In a live room the tones would start only
on a visitor gesture, never autoplay, and the visuals carry the piece
alone. This follows the task brief, not the template's sound plate.

## Deviations from the prompt and spec

1. Canvas 2D instead of WebGL. The spec's adaptation flag calls for this:
   node-canvas has no WebGL, so the shimmer is a closed-form 2D veil
   (radial gradient, function of piece time only). No 3D engine is used.
2. No audio in the page, per the task brief: tones are documented here
   only, with no WebAudio code and no sound toggle plate.
3. Top faces are not drawn. Every tower is taller than the 1.6 m eye
   height, so from standing height no top face is visible; the first
   gate round showed the drawn top face as a false grey sliver at the
   tower tops, and it was removed.
4. Layout staggered for legibility. In the first draft towers 2, 4, 8,
   and 9 were almost fully hidden behind nearer towers; their x
   positions were moved (2 to -2.9, 4 to 3.1, 8 to 1.2, 9 to -0.9) so
   all ten read on every size.
5. Phones narrow the formation laterally by 0.75 in the projection, so
   all ten towers stay in frame on a portrait phone instead of the two
   outermost towers falling off the edges.
6. Shimmer gradient order fixed in gate round 3: the gradient is now
   created inside the transformed state, centred on the ellipse. The
   first build created it before the scale transform, which displaced
   the veil from its tower pair.

## QA

Rendered from the actual script with node ~/workspace/tools/render-piece.js
at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three PNGs
read visually, and the thumb is the 720x720 render.

- Round 1: defects found. False grey slivers at the front tower tops
  (the top-face bug); towers 2, 4, 8, and 9 nearly invisible behind
  nearer towers; shimmer too faint to verify.
- Round 2: top faces removed, layout staggered, veil colour changed to
  warm sand with a stronger alpha law. All ten towers confirmed present
  by a horizontal pixel scan at y = 382 on the desktop render: ten
  distinct tower-front runs. Shimmer verified by pixel sampling: wall
  gaps between towers read about (235, 230, 222) against bare wall
  (239, 237, 232), a faint warm haze as intended.
- Round 3 (final, after the gradient-order fix): all three sizes
  re-rendered and read clean. Desktop: bare gallery, concrete ceiling
  band, white wall, grey floor, ten white towers receding in perspective
  with the black cable snaking between them, faint warm shimmer in the
  mid-field gaps, plates legible with no overlap. Mobile: all ten towers
  in frame, cable visible, composition holds full-bleed. Thumb: same
  square composition, clean at small size.
