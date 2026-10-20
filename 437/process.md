# No.437 Picnic From Above

After Angelina Bambina's top-down social tableau
(SweetSummerChallenge24, "Picnic & Flowers"): a
bird's-eye picnic on a red-pink checkered blanket,
laid with melon, baguette, wine and a straw hat, a
dog asleep in the corner, and three friends present
only as arms reaching in from the frame edges.

## Concept

The blanket is the composition: a 12x8 checkerboard
of the cloth pink and the check red, filling the
centre of the frame with a fringed edge. Everything
else is a laid still life on top of it. The three
friends never appear as figures, only as sleeved
arms with hands reaching in from the left, top and
right edges. Oversized tropical leaves and small
flowers bleed in from all four frame edges, so the
blanket sits inside a garden rather than on a page.
The one living motion on the cloth is a butterfly
crossing, twice per loop; the dog never wakes.

## Construction

- Palette closed to the ten specced hexes. The arms
  resolve inside it: skins are the flower orange
  #F5A623, the baguette tan #D9A55B and the dog tan
  #C9A06A; sleeves are the check pink, the leaf green
  and the bottle green; cuffs are the cloth light.
  No colour exists outside the set.
- Items are a FIXED AUTHORED SET of exactly 11
  (asserted): 3 watermelon wedges, a fruit platter,
  a wine bottle, a wine glass, a baguette, sunglasses,
  a straw hat and 2 plates, each a parametric sprite
  drawn from data (melon = rind sector over flesh
  sector with seed dots; bottle = body, neck, cork
  and a striped label; hat = brim, check band, dome).
- Arrangements are a FIXED AUTHORED TABLE of exactly
  3 (asserted), each placing every item on the
  authored 6x5 anchor grid over the blanket (cell
  index plus offset and rotation). Double-tap
  advances the table by one; the dog's blanket corner
  is part of the table (bottom-right, bottom-left,
  top-right). No runtime randomness anywhere.
- The dog is a curled form: round body, tucked head,
  flopped baguette ear, a tail wrapped around the side
  with a light tip, closed eye and nose in bottle
  green. Its breath is a scale on the 6s cycle
  (1 + 0.015 / 1 + 0.042 sine), 10 whole cycles per
  60s loop, the side rising and falling.
- The butterfly crosses on exactly 2 FIXED SLOTS,
  starting at 6s and 31s, exactly 25s apart (the
  prompt's cadence kept inside the loop). Each
  crossing is 8s along a quadratic path, wings
  flapping at 2Hz with a half-cycle phase offset, so
  each crossing holds exactly 16 whole flaps and
  frame one (T = 10s) catches it mid-crossing with
  wings open.
- The 10 edge leaves (asserted) sway on whole cycles
  per loop (3, 4 or 5 each, per-leaf phases); 6 edge
  flowers (asserted) rock on 3 whole cycles. The 3
  arms (asserted) use the shared flat-mitten hand:
  sleeve, cuff, palm, four finger capsules with bare
  notches, side thumb.
- Loop is 60s (asserted). All loop motion divides it
  in whole counts: dog breath 10 cycles, flower rock
  3 cycles, leaf sways 3/4/5 cycles, butterfly slots
  fixed as above.
- One canvas, no offscreen canvas, no filters, no
  gradients, no shadowBlur. Flat colour only; the two
  translucencies are stepped flat alpha (leaf veins
  at 0.30, the dog's curl seam at 0.22).
- Interaction: DRAG pans the whole still life
  (blanket, items and dog translate together, clamped
  to 150px horizontal / 110px vertical in design
  space) and on release a damped spring on fixed
  1/60 ticks returns the pan to exactly zero, snapping
  the last epsilon away; the frame furniture (leaves,
  flowers, arms, butterfly) stays in frame space.
  DOUBLE-TAP (0.34s piece-time window, 60 design px)
  advances the arrangement. Never click-to-reload.
  No text, no hint, no UI anywhere.
- Determinism: frame one is drawn synchronously at
  the constant phase T = 10.0s (dog mid-breath,
  butterfly mid-crossing in its first slot); the
  animation clock anchors there and advances in fixed
  1/60 ticks, never from Date.now() or a wall clock.
  Sizing from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas
  pinned via style width/height every frame; phone
  detection via window.screen min dimension < 700px
  with aspect fallback; design space 1280x900,
  cover-fit; pointer coordinates converted through
  the stored fit transform (S, OX, OY); rAF
  typeof-guarded. A QA hook (?seed=N) starts the
  piece on arrangement N; default play is unaffected.

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and
  720x720 (thumb.png). Thumb rendered twice from the
  shipped script: byte-identical.
- Desktop frame one reads as specced: checkerboard
  blanket with fringe, platter centred, three melon
  wedges, bottle and outlined wine glass, baguette,
  straw hat, two plates, sunglasses, the dog asleep
  at the bottom-right corner, three arms reaching in
  (check-pink sleeve left, leaf-green top, bottle-
  green right), leaves and flowers bleeding from all
  four edges, and the butterfly mid-crossing with
  wings open above the bottle.
- Fixes during QA: the butterfly's flap phase sat at
  zero in frame one, so it rendered as an edge-on
  dash; a half-cycle phase offset (still 16 whole
  flaps per crossing) opens the wings at T = 10s. The
  wine glass was a floating red dot on light check
  cells; the bowl gained a check-pink outline stroke.
  The sunglasses' temples were shortened so the pair
  reads as glasses rather than a barbell. The dog
  gained a low-alpha curl seam so head and body read
  as separate forms.
- Arrangements 1 and 2 rendered via the seed hook:
  both re-lay the full item set on the grid and move
  the dog to its tabled corner; nothing clips the
  blanket edge except the dog, by design.
- Mobile: cover-fit centre crop holds the platter,
  bottle, hat and melons; the dog and side arms crop
  out at this aspect, the house behaviour for field
  pieces.
