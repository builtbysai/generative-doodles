# No.417 Scooter Girl

After Kitty O'Rourke (@kittyo.illustration), EXPANSION #45 prompt KIT1.

## Concept

Her earliest piece (2021-08-15): a woman mid-push on a kick-scooter over a
flat mustard ground, a spotted dachshund trotting beside the front wheel.
Orange-tinted sunglasses, an orange tee with a white daisy, purple pants
with a pink abstract pattern, and a mesh net bag stuffed with bright
flowers hanging from the handlebar, its spill trailing across the lower
third. Black outlines on every shape, her grammar in this set. No text
anywhere: KIT1 notes she does not sign these, and there is no signature.

Interaction is the roll. Drag horizontally and the scene rolls with the
hand; release and it settles gently back to rest and into the ambient
loop. Never click-to-reload.

## Construction

One canvas, flat colour only, no offscreen canvas, no gradients, no
shadowBlur. Design space 1280x900, cover fit (full-bleed field); sizing
from the Visual Viewport API with resize listeners on visualViewport and
window; the canvas is pinned every frame via style width/height in px;
phone detection via window.screen (min dimension < 700px) with the aspect
fallback. Pointer coordinates convert through the stored fit transform
(S, OX, OY from frame()).

The roll is one number. dragX follows the pointer while dragging
(clamped to +/-480 design px); on release a damped spring integrated in
fixed 1/60 ticks returns it to exactly zero, snapping at the end. The
ground travel is ground = 0.5 * dragX, and everything reads that same
number, so the parts can never disagree: the speckle field scrolls by
ground (the 0.5 parallax), each wheel's spoke angle is ground / radius,
and the dog's leg phase is ground * 0.045 plus a constant offset. Her
hair streams with a smoothed, clamped reading of the roll speed.

The speckle field is exactly 500 fixed dots, asserted at load, baked
from a fixed-seed LCG over the whole design field; scrolling wraps each
dot modulo the field width, so the scroll is seamless. All other tables
(the 16-head spill trail, its leaves, the five bag flowers) are fixed
authored data.

The woman is a fixed recipe in profile: hair mass streaming behind the
head, cream face with a smile, orange sunglasses (one full lens, a
sliver of the far lens, temple arm), orange tee, arms to the grip. The
pants are tapered segments drawn along each leg's own direction, the
pink abstract pattern (blobs and dashes) drawn inside a clip of each
segment shape in segment-local coords, so the pattern stays glued to
the leg. The daisy on the chest is eight white petals around a yellow
centre, swaying on 3 whole cycles per loop. The bag hangs from the
handlebar on two straps; its mesh is a speckle-brown crosshatch clipped
inside the cream sack, and the five flowers at its mouth bob with the
bag on 2 whole cycles per loop, each with its own constant phase.

The dachshund is a long tan capsule with three brown spots clipped
inside it, a brown floppy ear, a long snout, and the red collar at the
neck. Its four legs cycle from the ground travel, diagonal pairs in
opposite phases (near legs tan, far legs brown), and the constant phase
offset leaves it standing mid-trot at rest. The tail wags on 6 whole
cycles per loop.

Ambient loop is 24s and every ambient frequency divides it: tail wag 6
cycles, daisy sway 3, bag bob 2, hair sway 2, so the seam is exact.

Palette is closed at the fourteen specced hexes. Two resolutions where
the prompt names no colour, recorded here: skin takes the palette cream
#FCE8D5, and the hair and scooter take the outline black #1A1A1A. The
speckle dots carry no outline; they are the ground's own texture, the
one exception to the outline rule.

Determinism: frame one is drawn synchronously at the constant phase
T = 5.0s (tail at full wag, daisy mid-sway, bag flowers lifted, dog
mid-trot at rest roll). The animation clock is anchored there and
advances in fixed 1/60 ticks; frame one is never drawn from a wall
clock. requestAnimationFrame is typeof-guarded.

## QA log

Rendered with node ~/workspace/tools/render-piece.js at 1280x900
(qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).

- Desktop: the full composition reads at once - woman leaning into the
  push, daisy tee, patterned pants, bag of flowers at the bar, spotted
  dachshund trotting at the front wheel, spill trail across the lower
  third, speckle subtle over the mustard.
- Thumb: whole scene holds inside the square crop; rendered twice from
  the shipped script, byte-identical both times.
- Mobile: cover fit crops to the centre band (woman, bag, front wheel,
  dog body), the house behaviour for field pieces; the page ground is
  the piece's mustard, so the crop sits on continuous colour.
- First-pass fixes: the pushing shoe floated below the deck with a gap
  at the shin; reseated onto the toe point so it connects and reads as
  a toe on the ground. The tail lay flat behind the body and was lost
  against the bag; redrawn as a steeper up-arc and the bag shifted 16px
  left on its straps, so the tail reads clear at the dog's rear.
- Palette grep-verified closed at the fourteen specced hexes; the only
  hits for banned terms are the absence-noting comments, as in sibling
  pieces. Speckle count asserted at exactly 500 in code.
