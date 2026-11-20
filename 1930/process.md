# №1930 Human Error: process notes

Driver: each tap adds one permanent accident to a sleeping figure in double
exposure, so the portrait only ever gets older.

FIRST_T = 0. The sleeper breathes on a 6 s cycle and dust motes drift on a
40 s cycle; at t = 0 the breath is at rest and the figure is fully visible.
Frame one is byte-reproducible: every shape, scratch and dust speck is a
pure function of t and the seeded PRNG (mulberry32, seed 1930).

Palette, hand-picked from the prompt's named colors: muted grey #6b6f73 /
#8a8f94, blue #3d4a63 / #5a6b8a, ochre #b98a3e / #c9a35c, bone-white
scratches #e8e2d4, dark paper beneath tears #1c1712, dim interior ground
#23262b. The study file studies/chris-hyson.md does not exist in the repo,
so no hexes could be taken from it.

Mechanism: a base double-exposure image composited from two layered
sprites, a solid sleeper under a blue blanket and a fainter ochre ghost
offset up and left. Five pre-existing accidents sit at the edges at load,
so the figure is already a little worn. Each tap spawns one damage sprite
at the tap point onto a persistent damage layer: a bone-white scratch
polyline, a tear polygon revealing dark paper with a lifted flap, or a dust
particle burst. The damage layer never clears and no tap heals anything.
Damage RNG is seeded from the piece number plus the tap index, so the same
tap sequence always produces the same accidents. Damage is capped only at
400 accidents, a bound a render probe never hits.

Visual only, no audio. Tap is the only interaction; there is no
click-to-reload. Hint: "Tap to add one accident. It never heals."

QA hook: ?tap=x,y (repeatable, normalized coordinates) replays taps at
load, and ?seed= varies the base seed. Tap probes at 720x720:
default 40a5bfaf36cc15564718c4f5ee6bef9b (identical to thumb.png, and
byte-identical across two renders), one tap at (0.5, 0.45)
6f18a65f05fd65b90a6ab34f8d797c9b, three taps
8a50ca6055c94186365b05fd06407e00. The one-tap frame shows a bone-white
scratch across the torso at the tap point and the count reading
"6 accidents".

Fix log (3 rounds):
1. First render: pillow drew as a large grey diamond spiking left of the
   head, the pre-wear tear overlapped the count plate, scratches ran off
   the top edge, and the figure sat small in the frame. Shrunk scratch
   length, tear radius and dust spread; moved pre-wear points away from
   the plates; enlarged the figure.
2. Second render: pillow still read as a big disc beside the head and the
   bed floated far below the figure on phones. Replaced the pillow with a
   flat ellipse mound and anchored the bed to the figure position.
3. Third render: figure overflowed the phone frame horizontally. Reduced
   the phone figure scale to 1.35 so the whole sleeper fits.

Deviations from the prompt: none in mechanism. The ghost exposure is a
second drawn sprite rather than a photographic double exposure, which is
the only way to keep the piece self-contained and deterministic.

Known warts: on phones the tall portrait frame leaves dark space above and
below the figure; the pre-wear tear at the right edge reads a little like
a dark eye on the blanket foot. The ghost figure's legs extend past the
bed edge on the right, which is part of the double-exposure read.
