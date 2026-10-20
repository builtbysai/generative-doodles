# No.423 Science of Bliss — kittyo.illustration (EXPANSION #45, KIT7)

Gallery date: 2003 · 03 · 10 (formula date, 2002-01-10 + (423+1) days).

## Concept

After Kitty O'Rourke's #intentionallyillustrated
editorial frame: a woman meditating cross-legged at
the centre of a soft lavender field, eyes closed and
serene, while the artifacts of digital clutter orbit
her head. THE SCIENCE OF BLISS is hand-lettered in
pink across the top; a dopamine molecule diagram
floats in the right third with tiny smiley faces for
nodes; decorative florals and one butterfly frame
the bottom. Dragging sends a calm wave through the
field and the clutter it touches dissolves, which is
the piece's whole point: the drag clears the noise.
Per the set's text rule there is no signature; the
title and the BUY ME! button word are the only text,
both hand-lettered stroke paths on the one canvas,
never system fonts. All icons are generic, no brand
logos.

## Construction

One canvas, flat colour only, palette closed at the
specced hexes (lavender ground, skin, hair brown,
sage outfit, clutter white, badge red, gray-blue,
molecule yellow, lettering pink, floral pink and
green, butterfly orange) plus the set's ink #1A1A1A
outline on every shape. Design space 1280x900,
full-bleed cover-fit.

The clutter table (fixed authored, exactly 10 items,
in authored order): 0 white mail envelope with red
count badge, 1 to-do paper scrap, 2 BUY ME! pill
button (pink pill, white hand-lettered word), 3
gray-blue bell app icon, 4 white chat bubble with
red count badge, 5 clipboard to-do scrap, 6 white
heart app icon, 7 gray-blue mail envelope with red
count badge, 8 white star app icon, 9 gray-blue
music-note app icon. Each item rides a fixed orbit
slot: an authored base angle on an ellipse centred
over the meditator's head (centre 548,338, radii
348x158, so the ring lives in the upper two-thirds),
drifting one full revolution per 40s loop, with a
small authored resting tilt plus a 2-cycle tilt sway.
Asserted counts in code: 10 items, 6 sparkles per
dissolve burst, 10 molecule nodes, 10 molecule links,
13 floral stems.

Interaction (the adaptation flag, exactly): DRAG
anywhere spawns calm-wave rings at the pointer, one
every 0.12s on fixed ticks, each expanding at 300
design px/s and living 0.9s (white ring with a pink
inner ring, flat alpha fade). In step(), any orbiting
item whose centre the expanding wavefront has passed
(dist <= radius + 36) starts dissolving: over 0.55s
on fixed ticks it shrinks by a smoothstep scale to
nothing while six authored sparkles ride outward and
fade. After release, dissolved items re-accumulate
ONE EVERY 4s in authored table order, growing back
over 0.5s; the 4s clock only runs while not dragging
and resets on pointerdown. While dragging, the
meditator's breathing deepens: a depth value eases
toward 1 over about 1.4s, lengthening the breath
period from 4s to 7s and growing the amplitude from
0.016 to 0.046 scale; the breath phase itself is
integrated per tick at the eased period, so the
period change never makes the breath jump, and on
release the depth eases back to the resting breath.

The meditator is a fixed seated recipe: crossed-legs
sage base with skin feet, a sage torso with outlined
arms running to hands resting in the lap, dark-brown
hair mass with shoulder falls, fringe and a top bun,
and a serene closed face (shallow lash curves, brows,
small smile, soft blush at flat alpha). The breath
scale applies to the torso, arms and head about a
pivot at the lap. The molecule is an authored
node-link diagram (six-node ring, two branches off
the top node, a two-node chain off the lower-right
ring node); it bobs once per loop and each node
pulses in scale on 4 whole cycles with a per-node
phase, every node a yellow disc with a smiley face.
The bottom border is 13 authored stems with leaves
and five-petal heads in pink or white, swaying on 2
whole cycles, plus one orange butterfly whose wings
flap on whole cycles at the bottom right.

Ambient 40s loop, everything on whole cycles: ring
drift 1 revolution, molecule bob 1, node pulses 4,
item tilts 2, floral sway 2, butterfly flap 6.

Determinism: frame one is drawn synchronously at the
constant phase T = 11.0s with all 10 clutter items
present, mid-orbit, the molecule mid-bob and the
breath caught mid-rise (initial phase 0.22); the
animation clock is anchored there and advances in
fixed 1/60 ticks from rAF timestamps, never from a
wall clock. No Math.random anywhere; every table is
authored data. House rules hold: Visual Viewport
sizing with resize listeners on visualViewport and
window, canvas pinned every frame via style
width/height in px, phone detection via
window.screen min dimension < 700px with the aspect
fallback, pointer coordinates converted through the
stored fit transform, rAF typeof-guarded. QA hooks
via ?seed=: gone=1,4,7 starts with those items
dissolved away, wave draws one frozen calm-wave
ring, deep=1 starts the breath at its deep state.

## QA log

- Rendered with the house node-canvas renderer at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png)
  and 720x720 (thumb.png). The thumb was rendered
  twice from the shipped script and compared byte for
  byte: identical.
- Desktop: title legible across the top with its ink
  shadow; all 10 clutter items present and distinct
  around her head (two badged envelopes, two to-do
  scraps, the BUY ME! pill, chat bubble and four app
  icons); meditator large and centred, serene, hands
  in lap; molecule complete in the right third with
  all 10 smiley nodes readable; floral border and
  butterfly along the bottom.
- Probes: ?seed=wave shows the frozen calm-wave ring
  (white ring, pink inner ring) over the field as
  designed; ?seed=gone=1,4,7 removes exactly the
  to-do scrap, chat bubble and gray-blue envelope,
  confirming the dissolved state path.
- Mobile: cover-fit centre crop holds the meditator
  and the inner ring; the title crops at the edges as
  full-bleed field pieces do, ground continuous.
- First-pass fix: the hair bun first sat inside the
  hair silhouette and read as a dark ring drawn on the
  hair; it was moved up (centre 548,270, r 24) so it
  rides on top of the head and reads as a bun.
