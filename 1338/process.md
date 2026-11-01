# №1338 "The Gesture" (hank-willis-thomas HT3, PP513)

## Source
Hank Willis Thomas, "The Embrace" (2023, 22 ft bronze on Boston Common) and
the Punctum sculptures ("Raise Up" 2017): rather than recreate the entire
scene, Thomas isolated the points of contact, leaving space for visitors to
stand within. The piece is faceless by design: no faces, no full bodies, only
the intertwined forearms.

## Frame one
A crowded archival street scene in muted tones, flat and painterly: building
silhouettes above, asphalt below, 120 seeded simplified figures in muted coat
tones (brown, slate blue, oxblood, umber, charcoal) with plain head dots and
no facial features. At center, two intertwined forearms in warm bronze form
the embrace, resting inside the crowd at natural scale. Pearl bracelet dots
ride one forearm; a small gold wedding band rides the other, after the pearl
bracelet and wedding band of the Kings. Frame one is the fully composed scene,
loop phase 0, before the highlight sweep.

## Loop (30 s, closed-form over piece time)
- 0-4 s: scene. The crowd and the gesture hold still.
- 4-7 s: highlight sweep. A flat-alpha bronze light band travels across the
  gesture bbox while the bronze glow ramps up: the glow finds the arms.
- 7-13 s: isolation. A 6 s smooth scale-up with the crop expanding from the
  gesture's bounding box to the full frame; the crowd fades out as the
  gesture grows. At full scale the bronze curves touch or cross all four
  frame edges (verified by pixel probe: bronze present in all four edge
  strips at t=18).
- 13-23 s: monumental hold, 10 s. The bronze breathes with a slow 6 s
  metallic shimmer on the highlight pass. The source scene returns as a
  small cream-bordered stamp at the bottom-right corner, labeled only by
  its position, never by text.
- 23-27 s: collapse back to the scene. 27-30 s: scene hold, then the loop
  restarts. No hard cuts anywhere.

## Interaction
Drag pans across the monumental gesture: it is a landscape to explore. Pan
is a closed-form sum of recorded drag deltas with exponential decay
(tau 2.5 s) after release, clamped so the gesture never leaves the frame
entirely. A drag during the scene phase has no visible effect until the
gesture is monumental. Never click-to-reload; no tap action.

## Adaptations
- Bronze shading is layered flat-alpha tones (#6B4A2E, #A67B4F, #D9B380,
  highlight #F0D9AE), never gradients. The QA renderer cannot run gradients.
- Isolation uses canvas clip-free scale interpolation of the gesture's
  center and unit, not a clip-path.
- The crowd is a seeded particle-field of simplified figures (coat
  trapezoids, head dots, occasional hat bars), never photorealism.
- Small details (pearl bracelet, wedding band) fade out as the gesture
  scales to monumental size, so they never read as stray giant shapes
  behind the stamp.
- No visible text except the HTML title. No audio of any kind.

## Determinism
Frame one draws synchronously at exactly t=0 via a boot flag; the clock
starts only with the rAF loop. All layout, figures, and phases come from
seeded mulberry32 streams (seeds 1338000/1338001), never Math.random.
Resize redraws at the current piece time, never restarting. The rAF loop
is a plain function declaration behind a typeof guard.

## QA
Rendered at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three
inspected. Thumb rendered three times plus a final re-verification after
process.md was written, all cmp byte-identical. Forced-time probes on
discarded temp copies confirmed every phase: t=5.5 highlight sweep,
t=10 mid-isolation (bronze 378,283 px vs 45,062 px at frame one),
t=18 monumental hold (bronze in all four edge strips, stamp present with
cream border), t=25 collapse. Token scan clean: no Math.random,
createElement, AudioContext, getUserMedia, shadowBlur, gradients, or
offscreen canvas.
