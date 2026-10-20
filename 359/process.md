# No.359 Six Colorways — process

## Concept

After Suchita Prakash's colourway merchandising habit
("here are some colourways of my design"): one hero motif
set — a sunflower, a moth and an oak spray — rendered six
times as a 3x2 contact sheet, each cell in a different flat
palette from her caption-grounded list. The sheet is the
merchandising moment: the same drawing, six moods, no
labels. Tapping a cell promotes that colourway to
full-bleed, so the chosen colourway becomes the piece;
double-tapping comes back to the sheet wearing a fresh
hero set.

## Construction

One canvas, design space 1280x900, centred fit; the page
ground is the sheet cream #F5EEDC, and in the full view
the promoted colourway's own ground takes the whole page.
Flat colour only: no gradients, no shadowBlur, no
filters, no offscreen canvas. All marks are path data
drawn directly each frame.

The six palettes are a fixed table, asserted to hold
exactly 6: (1) amber #E8A93D / berry #A61C3C / forest
#2E5B3F on cream #F5EEDC; (2) neon pink #FF2E88 on black
#0D0D12; (3) cobalt #274C9B / white #F7FAFF; (4) beetroot
#6E2B5B / carrot #E07B39; (5) wheat #E3C878 / denim
#7A93A6 / clay #B96A4B; (6) plum #3D2B45 / ink #14141C /
parchment #E8DCC3. Single-ink colourways knock their
details out in the ground colour.

The hero motif set is JS data from a fixed authored
table of 4 sets. Each set fixes the sunflower (centre,
radius, petal count), the moth (centre, size, tilt) and
the oak spray (a quadratic stem with alternating lobed
leaves and hanging acorns); the same set is drawn in
every cell, only the palette changes. The sunflower is
two petal rings around a seed-dotted disc; the moth is
four wing ellipses, a body, curled antennae and two
knocked-out wing spots; each oak leaf is a pointed blade
with flat lobe circles merged into the same fill.

Motion is one shared seamless 24s loop: each cell
breathes in place (scale 1 ± 0.028) on its own phase,
the sunflower sways on one whole cycle per loop and the
moth's wings flap on three, so frame 24s is
pixel-identical to frame 0 at rest. The full view
breathes more gently (±0.02) around the frame centre.

Interaction (per the rethink rule: tap only where a
promotion belongs, double-tap only where a return
belongs, never click-to-reload). TAP a cell promotes
it to full-bleed. DOUBLE-TAP on the full view returns
to the sheet with the next hero set from the table;
DOUBLE-TAP on the sheet itself also advances the hero
set in place. A single tap is held for the full 350ms
double-tap window on the piece clock before it
commits, so a double-tap never half-promotes a cell;
a committed single tap on the full view does nothing.
Taps hit-test through the stored fit transform
(S, OX, OY).

Determinism: the first frame is drawn synchronously at
the constant phase T = 5.7s (the sheet, fully
developed, breathing mid-cycle), never Date.now()
minus an offset; the animation clock is anchored to
that constant and advances in fixed 1/60 ticks, and
every requestAnimationFrame call is typeof-guarded.
Sizing follows the Visual Viewport API with resize
listeners on visualViewport and window; the canvas is
pinned every frame via style width/height in px; phone
detection uses window.screen (min dimension < 700px)
with a tall-aspect fallback.

## QA log

Rendered with the house node-canvas renderer:
1280x900 (qa-desktop.png), 390x844 (qa-mobile.png),
720x720 (thumb.png). The thumb was rendered twice and
compared byte for byte: identical.

- Desktop: the 3x2 sheet sits on cream with thin cream
  gutters; all six colourways read as one drawing in
  six palettes. First pass had the oak leaves drawn as
  pinched scalloped lenses that read as beads strung
  on the stem; the leaf was rebuilt as a pointed blade
  with merged lobe circles and re-rendered — the spray
  now reads as oak foliage with hanging acorns.
- Thumb: all six cells and all three motifs stay
  legible at gallery size.
- Mobile (390 wide): centred fit keeps the whole sheet
  in frame on continuous cream; no distortion.
- State probes (temporary copies, not shipped): the
  promoted full-bleed view (neon colourway) fills the
  frame with the hero set large and the page ground
  switched to the colourway's black; hero sets 2, 3
  and 4 were each rendered as sheets and compose
  cleanly (oak across the top in set 4, oak rising on
  the right in set 3, three acorns in set 2), nothing
  clipped at the cell edges.
