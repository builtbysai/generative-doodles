# No.398 Five Hundred Pieces — process

## Concept

After Anna Galitskaya's (@galitskaya.illustration)
digital-to-product puzzle pipeline, her Ravensburger
"Circle of Colours" register: one flat illustration,
an ice-cream sundae garden, pre-cut into jigsaw
pieces that start scattered and click home over
twenty seconds. The illustration: a smiling sun and
scallop-shaded clouds over a three-band rainbow, a
three-scoop sundae (teal, coral, mustard, sprinkles,
a cherry, two splayed wafer sticks) in a cream bowl,
two standing cones, flower beds, a teal grass band
with mini flowers and ink tufts, and a cream cat
asleep on a mustard waffle. The composition is
puzzle-readable: high local contrast evenly spread,
sprinkle, petal and tuft texture in every region so
no cell of the cut is a large flat area.

Palette, closed: paper #F2EAD6, piece-edge ink
#2B2620, image fills teal #2E8B8B, coral #E4572E,
mustard #E8A93D, cream #F7EFD9. Flat colour only, no
text, no win state, no counter.

## Construction

- One canvas, design space 1280x900, cover-fit (the
  spec's full-bleed field composition), page ground
  in the paper tone. Sizing comes from the Visual
  Viewport API with resize listeners on both
  visualViewport and window; the canvas element is
  pinned by style width/height every frame; phone
  detection uses the window.screen physical size
  with the tall-aspect fallback.
- The prompt's offscreen-canvas sprite slicing is
  not used (house QA rule). The illustration is JS
  DATA: a flat list of shape records (ellipses,
  polygons, segments, quadratic strokes, arcs,
  rects, half-discs), each with a flat colour and a
  bounding box, registered once at load in z-order.
  Drawing a piece means clipping to the piece path
  and replaying, in registration order, only the
  records whose box overlaps the piece's home rect
  expanded by the tab depth.
- The cut: exactly 70 pieces, asserted at load. In
  landscape the grid is 10x7, in portrait 7x10, the
  same 70 cells transposed; the grid follows the
  viewport aspect at resize and piece state survives
  the transpose. Each interior edge gets ONE sign,
  baked from the fixed seed: +1 on a horizontal
  boundary means the tab belongs to the piece above,
  +1 on a vertical boundary to the piece on the
  left. A piece path walks its four edges clockwise,
  each interior edge drawn as a symmetric knob
  (neck at 0.36/0.64 of the edge, tip at the middle,
  depth 0.21 of the smaller cell dimension), so a
  tab on one piece is exactly the blank on its
  neighbour and the outlines coincide at home.
- Scatter table: the scatter is a FIXED AUTHORED
  TABLE of 70 entries (offset, rotation, a unit
  scatter direction and a rotation sign), baked from
  a fixed-seed LCG at load, never a runtime pick.
  At grid build each entry is clamped so the piece's
  scattered centre stays within 30px of the field,
  and every piece still shows on the field in frame
  one. Double-tap re-scatters to this table.
- Assembly: frame one is the authored scatter at
  phase 0. Each piece flies from its captured offset
  to home on fixed ticks once the ripple reaches it:
  its delay is its home centre's distance from the
  image centre, scaled over 15 seconds, and the
  flight itself takes 5 seconds eased in-out, so
  the centre piece starts at once and the corner
  pieces land at exactly 20s. After that the image
  sits complete and still.
- Cut lines: each piece's outline is stroked in ink
  at up to 0.5 alpha, scaled by how far the piece is
  from home, so the lines are full at the scatter
  and fade out as pieces click in. At home only the
  faint tonal seam of the abutting clips remains,
  the assembled puzzle reading as a puzzle.
- Interaction: DRAG bursts the pieces near the
  pointer: pieces within 210 design px take a
  velocity impulse away from the pointer and along
  its motion (capped), plus a slight rotation in
  their tabled scatter direction, all on spring
  offsets that damp back to exactly zero. On release
  every piece's current total offset is captured as
  its new start and the 20s centre ripple restarts.
  DOUBLE-TAP re-scatters to the authored table. A
  tap alone does nothing. Pointer coordinates are
  converted through the stored cover-fit transform
  (S, OX, OY from frame()).
- Determinism: the first frame is drawn
  synchronously at the constant phase T = 0 (the
  assembly clock at 0, the authored scatter at phase
  0). The clocks advance from that anchor in fixed
  1/60 ticks accumulated from rAF timestamps; rAF is
  typeof-guarded. Frame one never reads a wall
  clock. All scatter, sprinkle and edge data is
  baked from fixed-seed LCGs at load.

## QA log

- Rendered with the house node-canvas renderer at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png)
  and 720x720 (thumb.png). The renderer confirms the
  pointer listeners and both resize listeners
  register, and the 70-piece assert passes.
- Desktop (frame one): the authored scatter fills
  the field, every piece on-canvas, tabs and blanks
  crisp, fragments of rainbow, scoops, cones, the
  cat's face and the waffle grid legible across the
  pieces, paper showing in the gaps.
- Mobile: the cut transposes to 7x10 and cover-fit
  crops the field to its centre band; pieces read
  large, the cat's head and the waffle at the bottom
  of the crop.
- Thumb: the scatter reads instantly at gallery
  size, the sundae and rainbow fragments carrying
  the centre.
- Probe renders (temporary copies with the assembly
  clock pinned, not shipped): at 25s the full
  illustration reads assembled and complete: sun,
  clouds, rainbow, the three-scoop sundae with its
  cherry and wafer sticks in the banded bowl, both
  cones, the flower beds, the grass texture and the
  cat asleep on the waffle, neighbouring outlines
  coinciding along every shared edge. At 8s the
  centre pieces are already home around the sundae
  while the rim is still flying, the centre-out
  ripple as specced.
- First-pass fixes: the clouds' single underside
  ink arc floated detached under each cluster and
  read as a stray smile; each cloud bump now
  carries its own shallow shading arc hugging its
  underside. The wafer sticks stood near-vertical
  behind the top scoop and read as ears; they now
  splay outward with their ink stripes following.
  All renders redone after the fixes.
- Thumb rendered twice from the shipped script:
  byte-identical.
- Grep-verified in the piece script: no gradients,
  no shadowBlur use (the word appears once, in a
  comment noting its absence), no offscreen canvas,
  no Math.random, no Date.now, no em dashes, no
  absolute URLs. The palette holds only the six
  specced hexes, each used flat.
