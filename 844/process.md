# №844 Running Out of Time: process notes

SN6 / PP1244, study #260 syd-nuku. Watch-only.
Gallery date: 2004 · 05 · 04. Hint: "Watch only."
Renumbered from №1997 to №844 on 2026-11-23 by Hans's gallery
renumber (continuous 1-843); the piece itself is unchanged apart
from the number and the formula date.

## The driver, as a felt phenomenon

Sitting with someone old while the afternoon light comes in. Nothing
happens, and that is the whole of it. The chest rises and falls, a
hand turns over on the armrest the way hands do when they have
nowhere to be, and then, once, a laugh arrives out of nowhere and
leaves again, and the room goes back to being quiet. The light does
not change. The window does not change. Presence is the mechanism,
so the piece is built to be watched, never driven.

## Build

- Template: live №1996 `index.html` structure (Visual Viewport sizing,
  canvas pinned in draw(), phone detection via window.screen with aspect
  fallback, field-like composition full-bleed on phones and square on
  desktop, one synchronous frame at load, requestAnimationFrame guarded
  by typeof check).
- Room: warm grey wall, lighter toward the window, a soft radial glow
  washing right from the window, dark floor boards with a light pool
  spilling from the window. The window is four pale panes in a dark
  frame on the left wall. Fourteen dust motes, placed by a fixed seed,
  breathe faintly in the light.
- Figure: seated off-center right, in three-quarter view facing the
  window. White grey hair swept back over the crown, one warm skin
  tone, a muted blue grey sweater, dark trousers, a plain wooden chair
  mostly hidden behind the figure. The face is quiet at rest: a closed
  eye curve, a faint brow, a short nose line, a still mouth line.
- No pointer handlers (watch-only). No audio. No em dashes in visible copy.
- Title/date plate drawn on canvas: "№844 · Running Out of Time" and
  "2004 · 05 · 04" top left, hint "Watch only." bottom center.

## Determinism

- FIRST_T = 12 s, cycle = 120 s.
- Breath: 4.5 s period, the chest and shoulders lift about 1.8 px on
  the in-breath, the head following at 40 percent. Hand: one slow turn
  every 40 s, rotating about 0.45 rad each way. Weight shift: one slow
  sway every 60 s, about 1.6 px. Laugh envelope: 0 at rest, ramping
  smoothly 70-74, holding with a gentle 5 Hz shake 74-84, easing away
  84-88. During the laugh the head tilts back about 0.10 rad, the
  shoulders lift, the eye curve deepens, laugh lines appear at the eye
  corner, and the mouth opens into a small dark shape.
- At t = 12 the figure is mid-breath, the hand is mid-turn, and the
  face is at rest.
- No wall-clock or random seed at load; all motion is a pure function
  of t. The dust motes are placed once by mulberry32 with fixed seed 844.

## Probe results

- Determinism: rendering t = 12 twice gives identical md5
  (211719153f982c875011c3f7684bba83).
- t = 12 md5 211719153f982c875011c3f7684bba83; t = 79 md5
  ebf93e398e99848bc7b97b1d56ae9842; t = 14.25 md5
  1c6cd6a9a936ec2c45d8a25cb99fad2c.
- Pixel diffs (threshold > 8 per channel summed, 518,400 px total):
  t12 vs t79 (mid-laugh) 1,790 px changed (0.54%), bounding box
  x[222,438] y[97,357], the figure and the dust motes only. t12 vs
  t14.25 (breath flipped from out-breath to in-breath) 1,333 px
  changed (0.40%), same region. The room, window, chair and floor
  hold still in both probes.
- The t = 79 render shows the laugh plainly: head tilted back, mouth
  open, laugh lines at the eye corner, shoulders lifted. The t = 12
  render shows the face at rest with the mouth a quiet line.

## Fix rounds

1. First gate: the hair read as a white headband across the forehead,
   the wall glow read as a hard-edged pale panel, and the chair back
   read as a wide dark monolith. Fixed the hair into a cap over the
   crown, replaced the glow rectangle with a radial wash centered on
   the window, narrowed the chair back and fainted its slats, widened
   the neck so the head meets the torso, and pulled the resting arm
   in to hug the torso. Re-gated fully after the fix: desktop, mobile
   and thumb re-rendered and inspected; probes re-run on the final
   file. No edits since.

## Deviations from the prompt

- None in content. The prompt asks for breath, a hand turning and one
  laugh per long cycle, with the window-light gradient static and no
  camera motion; the build adds only a slow weight sway (about 1.6 px
  per 60 s) and faint dust motes in the light, both inside "almost
  nothing" and both static in the room itself.
- The date line "2004 · 05 · 04" is drawn under the title as part of
  the title plate (house rule), though the prompt itself carries no date text.

## Known visual warts (honest)

- The figure is stylized flat illustration, not a portrait: the face
  is a few curves, and at thumb size the closed eye and mouth are a
  couple of pixels. It reads as a seated figure in window light, not
  as a likeness.
- On phones the stage is full-bleed portrait, so the window and chair
  stretch tall and the figure is small (about 90 px tall). It still
  reads, but the face is minimal at that size.
- The left arm resting in the lap is a dark shape against the sweater
  and reads more as a shadowed fold than as a distinct arm.
- The open mouth during the laugh is a plain dark oval; it reads as a
  laugh with the tilted head and laugh lines, but on its own it is
  just a dark shape.
- The chair back still shows as a dark slab behind the shoulders,
  though narrower than in the first gate; it is the plain chair the
  prompt allows.
