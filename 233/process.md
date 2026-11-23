# No.438 Five Women, One Pink Ground

After Angelina Bambina's inclusive semicircle
portraits (PowerfulWomenWeek2026): five women of
varied ethnicities in a half-ring on a soft-pink
flowered ground, each in her own distinct patterned
garment, swaying gently while a beaded necklace
swings. The source piece's Women's Day cursive is
excluded by the prompt: there is no text of any
kind in the piece.

## Concept

The ring is the composition: five busts on authored
semicircle slots, the centre slot lowest and largest
(centred-forward), the sides stepping up and
shrinking away. Each woman is a fixed authored
identity - skin, jaw, eyes, hair, garment pattern
and accessory are hers alone and never reassigned.
Tap turns the ring by exactly one position and her
identity travels with her; five taps restore frame
one's order. Faces are deliberately varied (wide,
narrow, oval, heart and square jaws; closed eyes,
dot eyes, lashes and glasses) so the five read as
five people, dignified, never a repeated template.

## Construction

- Palette closed to the specced hexes. One
  resolution: the prompt's red hair takes the set's
  only red-family hex, the floral pink #F06A8A; the
  crown woman's freckles take the authored skin tone
  #C97B4A. No colour exists outside the set.
- Exactly 5 women (asserted), each parametric from
  data: yellow headscarf (dome riding the forehead,
  side flaps, knot under the chin with two tails)
  over an orange top with a green diamond lattice;
  black bob (back panel plus straight fringe) over a
  blue shirt with light-blue polka dots; black curly
  puffs and round glasses over a black top with pink
  florals; long pink-red hair and a seven-bloom
  flower crown over a light-blue top with blue oval
  outlines; black side hair and a tilted beret over
  a black top with ground-pink dots and the beaded
  necklace (exactly 9 beads, asserted, in a fixed
  orange / pink / blue cycle on a quadratic string).
- Exactly 5 authored arc slots (asserted) and
  exactly 26 ground flowers (asserted) in a fixed
  table scattered behind the ring; the pink negative
  space above the ring is left empty.
- Loop is 66s (asserted), the LCM resolution of the
  prompt's three cadences: per-woman sway is a
  gentle 2-degree rock about the bust base on a 6s
  period, 11 whole cycles per loop, with per-woman
  phase offsets the only difference between women;
  the crown's petals flutter on a 3s period, 22
  whole cycles; the necklace swing is ONE event
  every 11s, 6 per loop: two oscillations under a
  decaying envelope that is zero at each slot
  boundary, so the swing starts cleanly at every
  11s mark.
- Rotation: TAP applies a fixed index offset to the
  five authored slots; the move itself animates over
  39 fixed ticks (0.65s) with a smoothstep
  interpolation of each woman's slot position and
  scale, landing exactly on the authored slot
  params. Draw order runs by target slot, sides
  first and centre last. No runtime randomness.
- One canvas, no offscreen canvas, no filters, no
  gradients, no shadowBlur. Flat colour only, no
  translucency anywhere in this piece.
- Determinism: frame one is drawn synchronously at
  the constant phase T = 12.4s - mid-sway, the
  necklace mid-swing (1.4s into an 11s slot, swing
  offset about 13px), the headscarf woman
  centred-forward; the animation clock anchors there
  and advances in fixed 1/60 ticks, never from
  Date.now() or a wall clock. Sizing from the Visual
  Viewport API with resize listeners on
  visualViewport and window; canvas pinned via style
  width/height every frame; phone detection via
  window.screen min dimension < 700px with aspect
  fallback; design space 1280x900, CENTRED fit with
  the page ground in the ground pink; pointer
  coordinates converted through the stored fit
  transform (S, OX, OY); rAF typeof-guarded. A QA
  hook (?seed=N) starts the piece settled at
  rotation N; default play is unaffected.

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and
  720x720 (thumb.png). Thumb rendered twice from the
  shipped script: byte-identical.
- Desktop frame one reads as specced: five distinct
  busts in a half-ring on the flowered pink ground,
  the headscarf woman centred-forward with her face
  open (closed eyes, blush, knot under the chin), the
  necklace hanging mid-swing on the beret woman's
  chest, generous empty pink above the ring.
- Fixes during QA: the draw loop passed a woman
  index where the bust builder expects the woman
  object, so the first render drew five copies of
  the fall-through garment and jaw; corrected to
  pass the authored object. The headscarf dome
  originally bottomed at the chin and hid the centre
  woman's whole face; the dome now rides the
  forehead with side flaps and the knot moved under
  the chin, leaving her face fully visible.
- Rotation verified via the seed hook (?seed=1):
  the ring sits one position turned, the glasses
  woman centred-forward, every pattern, skin and
  accessory still on its own woman.
- Mobile: centred fit holds the whole ring centred
  on the ground pink with matching page ground above
  and below, the house behaviour for shaped pieces.
