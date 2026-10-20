# No.390 F is for Fox — process

## Concept

After Maryna Lagereva's (@maryna.lagereva) ABC book,
built in public through #the100dayproject: one
picture-book page as a generative card. A huge coral
serif letter fills the left of a deckle-edged page,
the animal bursts across it, and her signature
funny-fact line is lettered beneath. The deck is a
fixed authored table of eight cards, never a runtime
pick, and the piece opens on the fox card, the
title card: "F is for fox - and for fascinating,
furry, and fast!" Double-tap turns the page through
the alphabet menagerie and wraps from H back to A.

The letter and the fact lines are the artwork under
the batch's designed-text exception, drawn on the
canvas in a serif face; they are the only text in
the piece.

The card table (fixed, in the prompt's observed
order; the fox line is the prompt's verbatim, the
other seven follow her exact pattern):

- A, axolotl: "A is for axolotl - and for adorable,
  aquatic, and ancient!"
- B, beaver: "B is for beaver - and for busy,
  buck-toothed, and building!"
- C, caterpillar: "C is for caterpillar - and for
  creeping, chewing, and changing!"
- D, dolphin: "D is for dolphin - and for diving,
  dancing, and daydreaming!"
- E, echidna: "E is for echidna - and for spiky,
  shy, and surprising!"
- F, fox: "F is for fox - and for fascinating,
  furry, and fast!"
- G, gazelle: "G is for gazelle - and for graceful,
  gliding, and gone in a flash!"
- H, hamster: "H is for hamster - and for hoarding,
  hurrying, and hungry!"

Palette, closed, per card: paper #FBF6EC, letter
coral #E8836B, animal orange #D98E32 with cream
#F7F1E3 and ink #3A2E2A, accents mustard #F2C14E
and teal #4FA3A3. Flat colour only; the letter's
darker watercolor edge is the ink at 0.3 alpha, the
deckle edge is the ink at 0.16 and 0.08 alpha, and
the ground shadow is the ink at 0.07 alpha.

## Construction

- One canvas, design space 1280x900, centred fit,
  page ground in the paper tone so the card keeps
  its shape at any aspect. Sizing comes from the
  Visual Viewport API with resize listeners on both
  visualViewport and window; the canvas element is
  pinned by style width/height every frame; phone
  detection uses the window.screen physical size
  with the tall-aspect fallback.
- The page: a rounded rect inset (58,48) to
  (1222,852), sampled into points and jittered from
  the fixed seed, stroked as a deckle edge with a
  fainter inner twin.
- The letter: 700-weight serif at 740px (about 60
  percent of the canvas height), centred at
  (336,402), coral fill with a thin ink edge stroke.
  It wobbles one degree on the 12s ambient loop.
- The animals: a library of eight draw functions,
  each 3-5 flat bezier blobs plus ink detail in a
  local box about 600x460, anchored at (782,462)
  over a soft ink ground shadow, breathing
  0.98-1.02 on the same 12s whole cycle as the
  letter wobble. Axolotl: coral body and tail fin,
  feathery gill curves, cream belly. Beaver: orange
  body and head, cream belly and muzzle, two ink-
  outlined teeth, and a flat ink tail crosshatched
  in pale lines clipped to its ellipse. Caterpillar:
  five teal segments with mustard spots, ink legs,
  antennae with mustard tips, coral cheeks. Dolphin:
  teal arched body and flukes, cream underside,
  dorsal and pectoral fins. Echidna: orange dome,
  cream belly and long cream snout, and exactly 30
  ink spines baked at load from the fixed seed
  (asserted; baked, never drawn from the seed at
  frame time, so they sit still while the animal
  breathes). Fox: pouncing diagonal body, tail
  streaming back with a cream tip, cream chest and
  muzzle, ink-tipped ears, one closed happy eye.
  Gazelle: mustard body with the cream underside
  breaking its lower outline, long neck, two curved
  ink horns, leaping legs with ink hooves. Hamster:
  round mustard body, cream cheek pouches, coral
  ear inners, whiskers, cream paws and feet.
- Page turn: a double-tap (two taps, each a press
  and release within 28 design px and 0.8s of the
  piece clock, the pair within 0.4s, client coords
  converted through the stored centred-fit
  transform) advances the card index modulo 8. The
  turn is a wipe on fixed ticks over 0.7s with an
  easeInOut curve: the old card holds while the new
  card is revealed behind a travelling page edge
  (a pale ink band and a fine line) sweeping right
  to left; never an instant swap. A single tap does
  nothing.
- Typing: when the wipe completes, the new card's
  fact line types itself in at 26 characters per
  second in fixed ticks, drawn as a substring of
  the full line, auto-shrunk to fit the card width.
  Frame one shows the fox line fully typed.
- Loop: 12 seconds ambient per card, seamless: one
  whole breathing cycle and one whole letter wobble.
- Determinism: the first frame is drawn
  synchronously at the constant phase T = 4.7s
  (breathing and wobble mid-swing), fox card up,
  fact line fully typed, no wipe running. The
  animation clock advances from that anchor in
  fixed 1/60 ticks accumulated from rAF timestamps;
  rAF is typeof-guarded. Frame one never reads a
  wall clock. All jitter and spine data comes from
  a fixed-seed LCG baked at load.

## QA log

- Rendered with the house node-canvas renderer at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png)
  and 720x720 (thumb.png). The renderer confirms the
  pointerdown and pointerup listeners register
  alongside the resize listeners.
- Every card in the table was also rendered
  individually (temporary copies with the opening
  index changed) and inspected: all eight animals
  read at picture-book size, each letter fills its
  side of the page, and every fact line fits on one
  line.
- Desktop (fox card): huge coral F at left, the fox
  mid-pounce across it with its tail streaming back,
  fact line fully lettered beneath, deckle edge
  quiet around the page.
- First pass fixes: the fox's tail first swept up
  too steeply and read as a leaf, so it was redrawn
  streaming back horizontally with the cream tip at
  its end, and the ears were enlarged so their ink
  tips sit on the head. The echidna's spines were
  first drawn from the seed at frame time, which
  would have made them crawl between frames; they
  are now baked at load. The gazelle first read as
  a flat disc on stilts: the body was made rounder,
  the cream underside moved to break the body's
  lower outline, the legs re-anchored inside the
  silhouette, and the nose dot set on the head's
  edge. All renders redone after the fixes.
- Thumb: letter, fox and fact line all read at
  gallery size on the continuous paper ground.
- Mobile: centred fit keeps the whole page in
  frame, fact line legible, ground continuous above
  and below.
- Thumb rendered twice from the shipped script:
  byte-identical.
- Grep-verified in the piece script: no gradients,
  no shadowBlur, no offscreen canvas, no
  Math.random, no Date.now, no em dashes, no
  absolute URLs. The palette holds only the seven
  specced hexes, each used flat or at flat alpha
  steps.
