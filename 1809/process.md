# No. 1809 "Room as Score" (PH2, PP1056)

A slow drift through a stone chapel strung with long wires. Watch only.

## Build

Canvas 2D. A 2.5D parallax chapel interior: ceiling, side walls, stone floor
with perspective joints, and an apse wall at the far end with a round oculus
window and two tall high windows. Pale daylight shafts fall from the apse
windows to pools on the floor. Seeded dust motes (36, mulberry32 seed 1809)
drift in the shafts and across the room. No people, no furniture, no candles.

## Camera spline

The camera drifts the chapel's long axis and back on a fixed 120 s loop.
Camera position u(t) is a triangle wave: u = 0 at the entrance, u = 1 at the
far apse, out over 0-60 s and back over 60-120 s. The apse wall grows as u
rises, and each wire's endpoints shift by a per-wire parallax factor, so the
room reads as a moving viewpoint, never a cut. The loop repeats exactly.

## Wires and span-derived shimmer

Three wires, each with anchor plates and bolts where it meets stone, and a
small marker plate at its first anchor showing its length in meters:

- 40 m, wall to wall, high across the frame. Sounds at u = 0.25.
- 23 m, column to far apse. Sounds at u = 0.55.
- 9 m, short span across a side niche. Sounds at u = 0.90.

Each wire's shimmer is a closed-form standing wave along the wire. The
shimmer law derives from the span: longer span means slower and wider
(40 m: 1.5 waves, omega 0.6 rad/s, amplitude 6 px; 23 m: 2.5 waves,
omega 1.1, amplitude 4 px; 9 m: 4 waves, omega 2.0, amplitude 2.5 px).
Brightness and a faint warm glow follow a Gaussian envelope in u around
each wire's sounding center, so each wire brightens and releases its
shimmer in turn as the camera passes, deeper and slower for the long spans,
quicker and tighter for the short ones.

## Frame one

Fixed phase at t = 60 s. At t = 60 s the camera is at u = 1, the far end of
the chapel by the apse, at the turn of the out-and-back loop. The 9 m niche
wire is sounding (envelope about 0.5 at u = 1, center 0.90): it shows the
quick, tight shimmer and faint warm glow visible in the gate renders. The
40 m and 23 m wires are quiet, in silver, at their ambient state. The
animation loop continues from t = 60 s, so the first frame and the live
piece agree.

## Deviations from the prompt

- No 3D or WebGL build. The chapel is a rich 2.5D parallax scene in Canvas
  2D, per the spec's adaptation flag, so the node-canvas gate can render
  frame one. Camera position and every wire's shimmer are closed-form
  functions of piece time on the fixed loop, so frame one stays
  byte-comparable.
- The 40 m wire's span was shortened in frame coordinates (endpoints at
  0.06 and 0.92 of the room width instead of 0.02 and 0.98) so both anchor
  plates stay visible at every camera position, including the frame-one
  position at u = 1. The wire still reads as wall to wall.

## House rules

Visual Viewport sizing with resize listened to on visualViewport and
window. Canvas element pinned in draw() via canvas.style.width/height in
px. Phone detection via window.screen (min dimension under 700 px) with
aspect fallback (h > w * 1.15). Field-like composition: full-bleed on
phones, square on desktop. One synchronous frame at load (t = 60 s);
requestAnimationFrame calls guarded with a typeof check. Deterministic
fixed-phase first frame: seeded RNG only, no Date.now or Math.random
affecting frame one. Title, date and hint plates drawn on canvas.
Watch only, never click-to-reload. No em dashes in visible copy.

## QA

Rendered with node ~/workspace/tools/render-piece.js from the actual
script at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three
renders read and inspected.

- Desktop 1280x900: chapel interior reads clearly, apse with oculus and
  tall windows, daylight shafts and floor pools, dust visible, all three
  wires with anchor plates and length markers, 9 m wire glowing warm with
  a tight shimmer, title/date/hint plates legible bottom left.
- Mobile 390x844: full-bleed, all wires and anchors in frame, plates
  legible.
- Thumb 720x720: same composition, all wires and markers clear.

First gate caught the 40 m wire's right anchor running off frame at u = 1;
the wire endpoints were pulled in and all three sizes were re-rendered and
re-inspected. No further issues. thumb.png is the 720x720 render.

## Gallery

- n: 1809
- title: Room as Score
- date: 2006 · 12 · 25
- note: The room is the score; the wires sound in turn. Watch only.

Title checked against live pieces.json (2,008 entries) at build: no
verbatim duplicate of "Room as Score".
