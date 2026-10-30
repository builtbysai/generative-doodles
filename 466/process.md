# Expectations

## Concept

EXPANSION #56 (andrea-ucini), prompt UC2. After Andrea Ucini's juicer
piece: a man in profile, dark sweater and trousers, stands centered on a
plain beige field holding a manual citrus juicer in one hand and a tall
glass with a finger of orange juice in the other. At his feet, a seeded
scatter-mountain of squeezed orange halves and peels with small green
leaves. The ratio is the drawing: vast pile, tiny pour. Dragging squeezes
one more orange per stroke; the glass stays nearly empty no matter how
long the drag goes.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets.
- Palette is exactly the prompt set: ground #E8DCC8, sweater #2A2A30,
  trousers #3A3A40, skin #E8B88A, oranges #E8912D, peel #D97E1F, leaves
  #5A7A3A, glass #F5F2EA at 0.6 alpha, juice #F2A93B. The juicer is drawn
  in the glass cream #F5F2EA (full alpha) with peel-colour ribs, and the
  eye and hair use the sweater colour; nothing outside the set.
- Figure centered in profile facing right, full height 70% of frame;
  flat beige field, no props beyond the juicer and glass. The pile is
  drawn in two depth bands split at the feet line, so back rows tuck
  behind his legs and front rows lap over his shoes. On phones the
  composition keeps its shape and the page ground is the piece's beige.
- The pile is pure JS data, redrawn every frame: each half stores a
  normalized position on a gaussian mound profile, radius, type (cut
  face with radial segments and a squeezed dent, or peel dome), rotation,
  and a leaf flag, all from a seeded mulberry32 stream (seed 46602).
  Cut halves are squashed ellipses with a peel rim, flesh disc, six
  segment lines and a dent crescent; leaves are small green ellipses on
  about a third of the halves. Draw order is back-to-front by depth.
  Portrait frames seed a denser pile (118 halves vs 92) because the same
  mound occupies more pixels there.
- Interaction: a drag stroke (pointer travel of 10 px or more) squeezes
  one orange on release: a cut half falls from the juicer with gravity
  ease-in, lands on the mound surface with one soft bounce and squash,
  joins the pile data, and the juice level rises by half a percent of
  the glass. Juice starts at 7% (one finger) and is hard-capped at 12%
  of glass height, so the glass never fills and never overflows. Tap,
  double-tap or double-click reseeds the pile arrangement from the next
  seed in sequence; the squeezed extras and the juice level persist.
  Gesture randomness runs on its own seeded stream (46677), advanced
  only by gestures. In-piece hint is the single lowercase word "drag" in
  the top-left corner, peel colour at 65% alpha (the pile owns the
  bottom edge). Nothing else is written on the piece.
- Determinism: frame one is drawn synchronously at load from the fixed
  seeds only: pile fully scattered, glass at its initial one-finger
  level, figure at rest, no falling half in flight. No clock is read for
  the first frame; the animation loop, where available, only advances
  an elapsed counter for the falling-half animation and is guarded by a
  typeof check on requestAnimationFrame.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with
  cmp; identical. The second render was deleted.
- Visual check: figure reads clearly in profile at all three sizes,
  glass small at chest height with a visible finger of juice, juicer
  (bowl, ribbed cone, squeezed half riding it) in the far hand at waist
  height, pile a real mountain across the lower third lapping at the
  feet, nothing clipped on mobile.
- First pass fix: the initial pile (56 halves) read as sparse scatter
  with bare ground between clusters; count, radius and mound depth were
  raised and the vertical distribution tightened toward the mound
  surface before the final renders.

## Deviations

- The prompt's hint placement says "a corner"; the bottom corners sit
  inside the pile, so the word "drag" lives in the top-left corner
  instead, where the flat field keeps it legible.
- The prompt names no juicer colour; the juicer takes the palette's
  glass cream so no colour outside the set is introduced.
- The prompt says tap/double-tap reseeds; a single tap only arms the
  double-tap detector (a second tap within 0.35 s reseeds), so an
  accidental touch cannot wipe the pile. Double-click reseeds directly.
