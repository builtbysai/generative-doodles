# №1901 Pipes (OS6, PP1148, study #248 olga-siemienczuk)

## Driver

Two people blow into a bundle of white pipes on a dark stage, and the sound
comes out where you can see it. Each breath turns into a slow chord of rings
blooming out of the pipe mouths, one ring per overtone, the low notes making
the biggest circles. The players take turns, and when they blow together the
two ring fields run into each other and merge into warm interference patterns.
Nothing moves except the breath and the rings. The restraint is the spectacle.

## Mechanism

2D canvas, visual only, no WebAudio. Two breath-cycle schedulers drive an
overtone series of integer partials 1 to 6 from a low fundamental. The cycle
is 16 seconds: player A blows 0 to 4 s, player B blows 4 to 8 s, both blow
together 8 to 12 s, the stage rests 12 to 16 s, then the cycle repeats.
Within a blow, partial p is born (p - 1) x 0.45 s after the blow starts, so
the chord blooms partial by partial instead of all at once.

## Partial to ring mapping

Each partial leaves from one pipe mouth: partials 1 to 3 from the left half
of the bundle (player A), partials 4 to 6 from the right half (player B), so
the two fields meet at midline. Rings are stroked open circles, never filled
dots. A ring expands at a rate tied to its partial number: speed is 0.16 x
min(W, H) per second divided by p^0.45, so lower partials expand faster and
reach clearly larger radii, higher partials stay smaller and tighter. At
frame one the partial 1 ring born at 8 s is about 436 px in radius on desktop
(more than twice the bundle width), partial 2 about 278 px, partial 3 about
197 px, so two or three large open circles read unmistakably above the pipe
mouths. Rings live 6 seconds, fading in fast and fading out gently (fade
exponent 0.8, base alpha 0.70) as pale cyan turning to grey, so a large older
ring stays plainly visible instead of shrinking to a faint dot. Stroke width
runs from 3.6 px for partial 1 down to 1.7 px for partial 6, times the
composition scale. All rings draw additively, so overlapping fields brighten
where they cross, and where a ring from A intersects a ring from B the
crossing points are marked in warm white with a soft warm glow at midline
while both players blow. A crossing is marked only when both rings crossing
there are themselves visibly drawn (the dimmer ring at alpha 0.12 or more),
and the mark alpha tracks the rings, so no stray dot appears far from the
bundle with no visible ring through it.

## Frame one

FIRST_T = 11.5 s. Phase 11.5 sits late inside the both-blow window: the
rings born at 8 s have had 3.5 s to grow, so the lowest partials are already
large open circles well wider than the pipe bundle (partial 1 about 436 px
radius on desktop, partial 2 about 278 px, partial 3 about 197 px), fresh
rings from both players are still leaving the mouths, and a collision field
is forming at midline. Every ring is a pure function of t, so frame one is
deterministic and byte-reproducible.

## Interaction

Watch only. There are no pointer handlers and no audio. The mechanism is
the turn-taking of the breath. Never click-to-reload. A small breath lamp
beside each player's head brightens while that player blows, so the turn
taking reads even when the rings are faint.

## Palette

Hand-picked from the named colors in the prompt. Near-black stage #0a0a0c
deepening to #050506, floor #101013. Matte white pipes #e8e6e0 shaded with #b9b6ad and #8f8c84, tape bands #6e6c66. Overtone rings pale cyan #a9d6de
fading to grey #8f8f8f. Collision fields warm white #f5efe4. Players
#17171a with rim #33333a, barely out of the dark.

## Composition

The pipe bundle is centered, six pipes with staggered mouth heights, taped
together at two bands, standing on a floor line at 80 percent of frame
height. The two players are cropped at the left and right frame edges, head
and shoulders only, in the lower third. Rings are allowed to leave the frame.
Title plate top-left, hint centered at the bottom, both clear of the bundle
and the figures on desktop and phone.

## Motion

All motion runs near 1 Hz, well under the 14 Hz ceiling. Ring expansion is
smooth and continuous. Prefers-reduced-motion shows the static first frame.

## Deviations

None from the prompt's mechanism. The breath lamps beside the players are an
addition, kept to a single small dot each, so the turn-taking is legible when
the rings are faint.

## Parent fix round (2026-11-19, after the builder's ring-sizing fix)
The re-gate still showed no ring strokes. Root cause: ringsAt stores the ring color via hexLerp, which returns an 'rgb(r,g,b)' string, but hexA sliced its input as '#rrggbb', producing 'rgba(NaN,NaN,NaN,...)' and node-canvas dropped those strokes (only the collision marks drew). Fixed hexA to accept both '#rrggbb' and 'rgb(r,g,b)'. Re-rendered at desktop, mobile, and thumb: the rings now draw as large expanding circles (p1 r about 436 px on the desktop stage) with collision marks where the two fields meet. Thumbs re-rendered byte-identical twice.
