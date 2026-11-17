# №1839 Revolving Harps (KS8, PP1086, #240 konrad-sprenger)

Gallery date: 2007 · 01 · 24. Interaction cue: Watch only.

## Driver

A machine that will never hurry. Three harps turn like carousel sculptures
in a dim gallery, and small iron pluckers fixed at their edges catch the
passing strings, so the room fills with a slow arpeggio nobody is playing.
A huge room hurdy-gurdy looms dark at the back, its crank turning by
itself. The felt phenomenon is patience made audible: the timing comes
entirely from the rotation, and the rotation drifts almost imperceptibly.

## Mechanism

2D canvas. Each harp is a flat wooden frame (pillar, curved neck,
slanted soundboard) carrying a fan of strings, projected by a closed-form
rotation angle: angle(t) = th0 + w0 * t + 0.15 * sin(0.02 * t + ph), with
one harp turning near 0.045 rad/s, one near 0.055, one near 0.040, so the
three never line up twice. The apparent width of each harp is its true
width times cos(angle); harps seen from the back render in darker wood.
Three harps are arranged in depth, largest in front, each on its own
floor shadow and pedestal. A fixed iron plucker on a floor stand sits at
the edge of each harp's string field; when a string's projected position
passes within a threshold of the plucker, a pale yellow glint flares at
the crossing point. The hurdy-gurdy is a dark silhouette at the back with
a key row, a six-spoked wheel and a crank, both turning at 0.02 rad/s.
Sound is off by default and never autoplays: a Sound toggle plate opens
WebAudio lazily on tap, and each string-plucker crossing then plays one
triangle-wave note from a slow eight-note chord cycle
(C3 E3 G3 B3 D4 E4 G4 A4). The piece is watch only; the toggle is the
only interaction.

## Deviations from the prompt

- The rotation drift is a closed-form slow sine of t, not an accumulating
  random walk, so frame one is reproducible for the byte gate.
- The pluckers stand on thin iron floor stands with a small foot rather
  than floating at the harp edge, so they read as fixed objects in the
  room.
- The hurdy-gurdy is drawn as a dark looming silhouette with keys,
  wheel and crank rather than a detailed instrument, keeping it clearly
  background to the three harps.

## Fixed frame-one phase

t = 40.0 s. At that phase the front harp is at angle 0.67 rad (facing,
cos 0.79), the middle harp at 3.44 rad (from the back, cos -0.96) and the
rear harp at 5.35 rad (facing, cos 0.60), so all three read at different
turns and two pluckers are lit by a passing string. All angles, speckle
(seed 1839) and glints are closed-form functions of t; no wall clock,
Date.now or unseeded random is used at frame one.

## QA

Rendered the actual script with node-canvas at 1280x900 desktop,
390x844 mobile and 720x720 thumb; inspected all three. Fixed after the
first pass: harps all facing the same way (varied the fixed phases),
the hurdy-gurdy colliding with the harp necks (shrunk and lifted it
clear), floating pluckers (gave them floor stands with feet) and no
visible glint at frame one (moved the pluckers into the string field).
Re-rendered thumb and desktop twice; md5 identical both times.
