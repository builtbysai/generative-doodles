# №1872 Two Faces of One Photograph (SM1, PP1119, study #245 simone-massaron)

## Spec
A single black-and-white Milan arcade interior in strict one-point
perspective, vanishing point slightly above center. Nothing in the scene
moves. Only the tones invert, on a 40 second cycle: hold the positive for
10 seconds, dissolve over 6 seconds through mid-grey fog, hold the negative
for 10 seconds, return over 6 seconds, hold the positive again. The same
arches stay readable in both states. A hanging sign shows only in the
positive; a figure in a far left doorway shows only in the negative.

## Palette
Positive phase: warm grey stone #CFC8BC, light stone #DCD6CC, floor
#B7AE9E with a lighter center runner #C6BDAE, ceiling #C4BBA9, piers
#A99F8D, shadow #17150F, white sky #F7F5F0. Negative phase: the exact
inversion of those values, produced by a white difference fill, so the
inversion is exact by construction rather than by a second palette.

## Motion and interaction
Watch only. No click, no slider, no control of any kind. The inversion is
driven by a slow triangle wave with dwells at both ends (invAt). The
mid-dissolve needs no separate fog layer: a difference fill at half alpha
collapses the whole image to flat mid-grey on its own, which is the fog
the prompt asks for. The figure fades in only once the negative is well
established, and the sign fades out early in the dissolve, so each detail
belongs to one phase. Cycle is far below any flicker concern.
Prefers-reduced-motion freezes at the fixed first frame. No audio.

## Technical approach
2D canvas. The arcade is drawn procedurally from a one-point perspective
projection (six bays at geometric scales 1, 0.70, 0.49, 0.343, 0.2401,
0.16807, 0.117649), far to near: floor slabs, ceiling slabs, side wall
panels, arched openings on both walls, vault ribs, floor joints converging
on the vanishing point, a white sky opening at the far end, and the first
arch framing the near plane. Per-bay tone variation and stone speckle come
from a mulberry32 RNG seeded with 1872. The inversion is applied with a
white difference composite fill clipped to the field, then the phase-gated
details are drawn on top so they keep their own tone. Deterministic first
frame at FRAME_T = 6.0 s, inside the positive hold. Field-like composition:
full-bleed on phones, centered square on desktop.

## Deviations from the prompt
The prompt asks for details "drawn in near-threshold greys" so that one
phase reveals them. A pure per-pixel inversion cannot do that, since
inversion preserves contrast, so the figure and the sign are instead gated
by the inversion factor itself: the figure is drawn in near-black with an
alpha that rises only in the negative, the sign with an alpha that falls
away in the dissolve. The visible effect is the one the prompt describes:
the negative reveals the figure, the positive hides it, and the sign does
the reverse. The prompt also mentions an offscreen buffer with a per-pixel
lerp; this build uses a difference composite fill instead, which gives the
identical result (exact inversion, flat mid-grey at the midpoint) without
a per-frame pixel loop. The arch crowns were rounded slightly from the
first build so the module reads as a Milanese round arch rather than a
pointed one.

## QA
Rendered the actual script with node render-piece.js at 1280x900,
390x844, and 720x720 and read all three. Desktop: arcade reads clearly,
perspective correct, plates legible and unclipped, hanging sign visible,
figure correctly hidden in the positive. Mobile: full-bleed, plates
legible, no clipping. Thumb: clear at small size. Two extra renders at
fixed phases verified the cycle itself: at t = 21 s the negative holds
with the figure visible in the left doorway and the sign gone; at t = 13 s
the image has almost vanished into flat mid-grey fog. One fix round: the
arch crown profile was rounded (sin to the power 0.6) after the first
render showed pointed arches; re-rendered all three sizes clean.
