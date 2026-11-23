# No.415 Neon Shoe — process

## Concept

After Yeti Iglesias's client-maximalism mode (the Vans MX
collab): a giant white sneaker on a black-and-white
checkerboard floor under a hot pink sky, neon green and
black leaves, five giant watching eyes on leaf stems, a
watermelon slice, a pink hand holding a huge black pencil,
and a small black cat in pink headphones perched on the
shoe's toe, phone in paws. Brick-wall line doodles float in
the sky. The scene is a diorama: drag horizontally and the
layers pan at different rates; release and it springs home.
Her hand-lettered "Yeti" signature sits bottom-right as
stroke paths, the set's designed-text exception; there is
no other text.

## Construction

One canvas, design space 1280x900, full-bleed cover fit,
page ground in the sky pink. All layers are data drawn per
frame; there are no offscreen or stacked canvases, no
gradients, no shadowBlur.

Parallax table (drag pan, clamped to ±240 design px):

| Layer | Factor | Contents |
|---|---|---|
| Sky | 0.3x | brick doodle patches (6 clusters of outlined bricks, white line segments at 0.5 alpha), 9 twinkling sparkles |
| Mid | 0.6x | the 5 eye stems and eyes, 9 stemmed leaves, watermelon slice, pencil and hand |
| Front | 1.0x | checkerboard floor, sneaker, cat |

Layers are drawn wider than the field (bricks and leaves
include off-field entries; the floor's lateral lines span
floor-space u = -1820..1820), so the clamped pan reveals
more bricks and leaves at the edges and no layer edge ever
shows. On release a spring (stiffness 90, damping 12, on
fixed 1/60 ticks) eases the pan back and snaps to exactly
zero offset below threshold. Drag velocity is tracked in
piece-clock time and handed to the spring as a fling.

Eye table (exactly 5, asserted at load). Blink slots are
fixed inside the 30s ambient loop, 0.24s each, staggered
so one eye blinks at a time, never two together; a blink
is a vertical squash of the whole eyeball (white, iris,
pupil) by 1 - 0.9 sin(pi p):

| Eye | x, y | Iris | Blink slot |
|---|---|---|---|
| 1 | 150, 305 | pink #FF4FA3 | 3.0s |
| 2 | 330, 205 | teal #1FA3A3 | 7.5s |
| 3 | 640, 148 | pink #FF4FA3 | 12.0s |
| 4 | 1015, 225 | teal #1FA3A3 | 18.5s |
| 5 | 1185, 330 | pink #FF4FA3 | 24.0s |

Checkerboard: exactly 8 perspective rows (asserted).
Row boundary heights follow y = 600 + 300 d^1.7; tile
edges follow lateral floor lines converging toward the
horizon (x = 640 + u (0.55 + 0.45 d^1.15)); black tiles
are drawn as trapezoid quads over a white base.

Phone flicker: the cat's phone screen takes flat alpha
steps from the fixed table [1.0, 0.3, 0.85, 0.45], one
step per 0.45s of loop time, cycling; never random.

Leaves sway on whole cycles of the 30s loop (2 or 3
cycles each, fixed phases); sparkles twinkle on whole
cycles. Grain is exactly 600 fixed speckle dots (seeded
LCG table, asserted), drawn in table order every frame.

Palette is closed: sky #FF1E78, white #FFFFFF, black
#111111, neon #39FF14, iris pink #FF4FA3, teal #1FA3A3,
watermelon #FF3B3B, hand pink #FF9ECF, and the set purple
#9B30FF for the pencil stripes (the prompt names purple
stripes without a hex; the set's purple from No.410 is
used). The signature strokes are laid twice, a white
underlay under the black ink, so the lettering stays
legible across both checkerboard tile colours.

Determinism: frame one is drawn synchronously at the
constant phase T = 12.06s, inside eye 3's blink slot
(lid about 60 percent closed) with the phone on a lit
flicker step (index 2, alpha 0.85). The animation clock
is anchored there and advances in fixed 1/60 ticks from
elapsed time since load, never from a wall clock; rAF
is typeof-guarded. A ?seed=pan=N query probe starts the
piece panned for QA only; default play is unaffected.

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720
  (thumb.png). Thumb rendered twice: byte-identical.
- Pan probe at pan=200 rendered: layers shift at their
  three rates, floor and sky coverage hold at the clamp
  side, extra brick and leaf content enters at the
  edges, no layer edge visible.
- Desktop inspection: shoe, cat with lit phone, five
  eyes (centre eye mid-blink), watermelon, pencil with
  the hand gripping it near the eraser, brick doodles
  and signature all read. First pass fixes: the first
  frame phase sat at the blink's deepest point and the
  centre eye read as a floating sliver, so the phase
  moved to 12.06s where the lid is clearly mid-blink;
  the hand first floated above the pencil and was
  reseated onto its centreline; one black leaf merged
  with the ankle opening and was moved clear; the
  signature first vanished on black tiles and gained
  its white underlay.
- Mobile is the cover-fit centre crop (blinking eye,
  laces, floor), the house behaviour for field pieces.
- Grep checks: no gradients, shadowBlur, offscreen
  canvas, Math.random, Date.now, em dashes or absolute
  URLs; palette limited to the nine hexes above.
