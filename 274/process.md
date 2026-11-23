# No.582 — Más Íntimo Que la Ropa Interior

EXPANSION #70 maria-j-luque, prompt block 6 "La Biblioteca Íntima".

## Concept

Her bookshelf portraiture: looking through someone's personal library is
more intimate than rifling through their underwear drawer, so the shelf
itself is the portrait. A tall wooden bookcase fills the frame, five rows
deep, and every single spine on it is an invented book — no real titles, no
author names, nothing sampled. The books stand in her color-band way:
reds together, blues together, yellows, greens, and a bottom shelf of
paper-cream and ink neutrals with a few family strays. The array of color
is the person; you read the owner off the bands.

Interaction follows the prompt exactly. Drag a book and it slides out
toward you, opening from spine to full cover (the same generative design,
read at full width, page edges showing). Let go early and it slips back;
pull it most of the way, or simply tap it, and it stays out for a closer
look. Tap it again and it reshelves. Only one book is ever out at a time,
as specced. Tapping the bare wall puts everything away.

## Construction

Single self-contained `index.html`, canvas 2D, no external assets. Stage
is 1000x1000, letterboxed and centered; canvas size comes from the Visual
Viewport API with resize listeners on both `visualViewport` and `window`,
and `draw()` pins `canvas.style.width/height` in px every frame. Phone
detection uses `window.screen` physical size (min dimension < 700), with
the aspect-ratio test held as fallback only for a missing screen; on
phones the case widens toward the edges. Page ground is the wall color
#EFE7D8, which is also the HTML background.

Palette is strict: shelf wood #8A6A4A (with two mixes toward ink and one
toward cream for board light/shadow), wall #EFE7D8, spine families reds
#C0392B / #C93A72, blues #2C5FA8 / #4A7AB8, yellows #E8B93C, greens
#5A8A4A, plus paper-cream #F4EEDC and ink #1A1A1A spines inside the bands.
All fills are flat; there are no gradients anywhere. Case geometry is
frontal with a slightly narrower crown and a flared plinth, the prompt's
slight perspective.

### Spine-generator design

Each book gets its own mulberry32 stream seeded from its library index
(582000 + idx * 7919), so a book's design is fixed forever and independent
of draw order. A recipe is rolled from:

- **Base**: a family color; inside the four color rows about one book in
  seven is instead a paper-cream or ink guest (the prompt's "plus
  paper-cream and ink spines inside families"), and the neutral row
  occasionally admits a family stray. The base may be tinted toward cream
  or ink at 0 / 0.22 / 0.45.
- **Design grammar** (one of nine): plain bands; horizontal stripes; a
  single centered motif under a top rule; a dot grid; a vertical two-tone
  split; an inset frame with a motif; a diagonal sash with a dot; title
  dashes (three or four short illegible dash-marks, never letters) over a
  motif; a checker block.
- **Motif** (one of nine): circle, ring, diamond, triangle, four-point
  sparkle, plus, half-disc, eye, crescent.
- **Accent**: a contrast (cream on dark bases, ink on light ones), a
  sibling color from the same family, or occasionally another family's
  color.

Uniqueness is enforced, not hoped for: every recipe's signature
(base | design | motif | accent | count | placement) is checked against a
set, and a collision deterministically re-rolls the same stream with a
salted seed until the book is unlike every other. One recipe drives two
readings through `drawDesign`: clipped to the narrow spine on the shelf,
and expanded to the full cover when the book is pulled, so what you pull
out is recognizably the book you saw shelved.

Books are laid out per row from a row-seeded stream: widths 30–54, heights
116–148, small irregular gaps; one book in some rows leans; had a row ever
ended with 46+ units spare, the remainder would have become a small flat
stack of further invented books (in both shipping layouts the rows fill
before that, so no stack occurs). Pull animation is an exponential ease in
`tick` toward a 0/1 target; drag sets the pull directly from pointer
distance, and release commits it out only past 55% (or back in below 30%
for a held book), matching the drag/tap contract.

Determinism: the first frame is one synchronous draw at rest — full
shelf, all books in, nothing mid-flight. All generation happens at load
from fixed seeds; the render loop never touches an RNG, and there is no
`Date.now` anywhere. rAF is typeof-guarded and anchored as elapsed time
since the first timestamp. No audio, no microphone.

## QA log

Rendered with `node ~/workspace/tools/render-piece.js` from the actual
script:

- `qa-desktop.png` (1280x900): the case fills the frame; five clean family
  bands (reds, blues, yellows, greens, neutrals); every spine visibly
  distinct — checkers, eyes, rings, triangles, dashes, diagonals, dot
  grids all present; one pink book leans at the top right, one yellow
  checker leans on the third shelf; hint "drag · tap" bottom right.
  Nothing clipped.
- `qa-mobile.png` (390x844): the phone layout (wider case from the
  `window.screen` detection); the shelf spans the full width, every row
  legible, no clipping, hint present.
- `thumb.png` (720x720): square gallery frame, bands and motif variety
  read clearly at thumbnail size.
- Determinism gate: `thumb.png` rendered twice and byte-compared with
  `cmp` — identical; the second render was deleted. Re-run after the
  stack-top fix below: still identical, and the desktop PNG hash was
  unchanged by the fix.
- Probing (throwaway instrumented copy, deleted after): 81 books in the
  desktop layout, 88 in the phone layout, no two recipes alike by
  construction; leftover-stack branch unused in both layouts.

Fix during QA: `drawSpine` positioned any horizontal (stack) book from
the row base instead of its stack offset. The branch never fires in
either shipping layout (rows fill first, verified by probe), but the
top was corrected to the stack offset so the code says what it means.

## Deviations

- **No literal titles anywhere.** The prompt bans real titles and text
  walls; its "at most tiny illegible dash-marks" allowance is used by the
  dash design only. There is no other lettering in the piece besides the
  small "drag · tap" hint.
- **The neutral row carries occasional family strays** (about one book in
  five). The prompt fixes the banded organization and names cream/ink as
  in-family guests for the color rows; a portrait shelf with a perfectly
  pure bottom row read as a gradient block in early layout tests, and the
  strays keep it a person's shelf rather than a color chart. The bands
  themselves are never blended into a rainbow.
- **Cream hex.** The prompt names "paper-cream" spines without a hex;
  #F4EEDC is the paper cream used across this study's companion pieces
  (the №573/№581 family), chosen for consistency inside the set.
- **Drag commits past a threshold.** The prompt says release slides a
  dragged book back, and separately that a tap holds a pulled book out.
  Release past 55% pull is treated as the hold gesture (it stays out);
  below that it slides back, exactly as written. A tap on the bare wall
  reshelves, which the prompt does not forbid and the one-book-out rule
  makes natural.
