# No.420 Mahjong Babies

## Concept

After Kitty O'Rourke's "American Mahjong for Babies" board book
(EXPANSION #45, prompt KIT4). Twelve chunky rounded tiles in a
4x3 grid on a flat cream ground, every tile an anthropomorphic
character built on one shared minimal face system (two-dot eyes
plus a smile arc), and a chunky hand-lettered banner across the
top: IT'S TIME TO PLAY! The families cycle beneath the tiles,
each tile carrying its own family's label: DOTS (smiling suns),
CRAKS (abstract character stroke marks with a dragon buddy,
red then green), BAMS (bamboo stalks, then a Bird Bam), FLOWERS
(smiling blooms, pink then purple), WINDS (lettered clouds,
N/E then W/S), JOKERS (toucan characters facing right, then
left). Each family appears exactly twice.

Tap a tile and it answers with a happy authored bounce, one
blink, and exactly three sparkles. Left alone, the grid keeps
itself busy on a 36 second ambient loop: one tile at a time
flips over to its patterned back and back again, and the wind
clouds drift. Board-book flatness throughout: flat colour,
black outlines on every shape (her grammar in this set), flat
offset shadows, no gradients. Kitty O signs nothing, so there
is no signature; all lettering is the piece's own designed
text, drawn as hand-lettered stroke paths, never system fonts.

## Construction

One canvas, design space 1280x900, cover fit (full-bleed
field), canvas pinned every frame, sizing from the Visual
Viewport API with resize listeners on visualViewport and
window, phone detection via window.screen min dimension
under 700px with the aspect fallback. Pointer input converts
client coords to design coords through the stored fit
transform (S, OX, OY).

Tiles: exactly 12, asserted (184x200, about 20 percent of the
short side). Tile = rounded rect, white face, black outline,
flat offset shadow shape drawn as a translucent ink rounded
rect (never shadowBlur). Each character is a small path
recipe drawn clipped inside its tile: sun with eight ray
strokes; crak marks as scattered calligraphic ticks and dots
(abstract only, never a real character) beside a dragon buddy
(horned, back-finned, snouted, face on the body); bamboo as
three jointed stalks with the face on the centre stalk; the
Bird Bam as a white round bird with an orange beak between two
stalks; flowers as six outlined petals around a faced centre
disc on a stem; winds as two rounded three-bump clouds, the
big one carrying its letter high and the shared face low
inside the body, the small one carrying the second letter;
toucans as black bodies with a white throat patch holding the
face and a big orange beak.

Lettering: a stroke-glyph table (polylines on a 4x6 grid,
round caps and joins) renders the banner and the six family
labels. No font text anywhere.

Tap interaction: a press-and-release landing on a tile (under
28 design px of travel, under 0.6s held) starts that tile's
authored 0.55s bounce: scaleY follows a decaying spring sine
with overshoot, scaleX counter-squashes, a small hop lifts the
tile, the shared face blinks once in the first half (eye
height dips to about 0.12), and exactly 3 sparkle stars appear
at authored offsets [(-72,-84), (68,-90), (2,-116)] relative
to the tile centre, growing and fading over 0.5s. Nothing is
reseeded; the tap changes nothing but the bounce.

Flip rotation (fixed and authored): the 36s loop divides into
twelve 3s slots; slot k flips tile FLIP_SEQ[k] =
[4, 9, 1, 7, 11, 0, 6, 3, 10, 2, 8, 5] and no other. Within a
slot, 0 to 0.45s the flip angle eases (smoothstep) from 0 to
pi, the tile drawn with scaleX = cos(angle) and switching to
its back at 90 degrees; the back holds until 2.15s; 2.15 to
2.6s the angle eases back to 0; then the tile rests face-up.
The back is drawn as path data: the family colour fill with a
white diamond lattice (45 degree strokes clipped to the tile)
and a white centre diamond. Wind clouds drift 4px as
4 * sin(2 pi * t / 36), one whole cycle of the loop.

Determinism: frame one is drawn synchronously at the constant
phase T = 2.8s, which sits inside slot 0's rest window, so all
twelve faces are up and the banner is complete; the clock is
anchored there and advances in fixed 1/60 ticks, rAF
typeof-guarded. No wall clock is read for the picture, so the
thumbnail reproduces byte-identically.

## QA log

- Rendered with the house node-canvas renderer at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png).
- Thumb rendered twice from the shipped script:
  byte-identical (md5 85518045815bd8237a04ddaef2ceba5).
- Desktop: banner reads cleanly as hand-lettered caps with
  the red flourish underline; all 12 tiles face-up, each
  label matching its tile's family; suns, bamboo, blooms,
  toucans and the Bird Bam read at a glance.
- Fixes during QA: the first crak mark cluster read as a
  letter-like glyph grid, so both crak tiles were re-scattered
  asymmetrically; the dragon's spikes sat on top like a
  crown, so they became fins off the back rim and the dragon
  grew about 18 percent; the wind clouds first came out
  pointy and the big cloud's face hung below its base, so the
  cloud path was re-rounded and the letter/face stack moved
  fully inside the body; the small wind cloud's peak was
  softened in the same pass.
- Mobile: cover fit centre-crops the field as house field
  pieces do; the centre tiles stay whole and legible.
- Palette grep-closed to the ten specced hexes plus black
  ink; the only off-list paint is the tile shadow, a flat
  translucent wash of the ink colour. No offscreen canvas,
  no shadowBlur, no gradients, no em dashes, no absolute
  URLs.
