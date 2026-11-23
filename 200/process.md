# No.381 Witchy Woman

EXPANSION #40 (jenkbdoodles), prompt 5. Gallery date 2003 · 01 · 27.

## Concept

After Jen K's Witchy Woman, her 99th consecutive weekly challenge
entry: a boho-1970s maximalist floral toss on a near-black plum
ground. Rich jewel-tone florals (poppies, daisies, chrysanthemums)
woven through with tiny moons, stars, evil-eye dots and crystal
shards in antique gold, at maximalist density. The piece is a
50-second ambient loop to watch, with one gesture: dragging
carries a moonlight through the field, and whatever it touches
steps one shade brighter, then fades behind it.

## Construction

- One self-contained canvas, design space 1280x900, cover-fit so
  the field fills every screen edge to edge. Visual Viewport
  sizing with resize listeners on visualViewport and window;
  canvas pinned every frame via style width/height in px; phone
  detection via window.screen min dimension < 700px with aspect
  fallback. Flat colour only: no gradients, no filters, no
  shadowBlur, no offscreen or stacked canvases. All marks are JS
  data drawn directly each frame.
- Palette, closed: ground #1C1220; florals #7A2E4A (oxblood),
  #B565A7 (purple), #3F6FA3 (blue), #D97E36 (amber); leaves
  #4E7A4E; luxe details #C9A24B (antique gold). Nothing else.
- Counts fixed and asserted at load: exactly 14 hero blooms,
  exactly 28 mid buds, exactly 40 leaves, exactly 120 micro gold
  details. Placement is rejection scatter from a fixed mulberry32
  seed: heroes first (min spacing 218px, radius 96-122px, about
  1/4 of canvas height), buds kept out of hero discs, micros kept
  out of hero discs and off bud heads, so each register owns its
  space and the gaps belong to the gold.
- Species by index: poppy (6 or 7 wide petals, ground centre
  ringed with gold stamen dots), daisy (11 or 12 narrow petals,
  gold centre with ground dots), chrysanthemum (12 outer petals
  plus an inner ring of 8 shorter, gold centre). Petal counts
  stay inside the specced 6-12 by species. Buds are closed
  teardrops on two green sepal points, in the four floral colours.
- Micro detail library: five-point stars, four-point sparkles,
  dot clusters, crescent moons (two-arc path), evil eyes (gold
  ring, blue iris, ground pupil), crystal shards (flat diamond
  with ground facet lines).
- Loop: 50s master loop. Hero petals pulse between 0.90 and 1.00
  scale on 5 or 10 whole cycles per loop, staggered by seeded
  phase. Buds breathe 0.96-1.00 and sway on whole cycles. Gold
  details shimmer between 0.55 and 1.0 alpha on 5 or 10 whole
  cycles. Every motion completes whole cycles, so frame 50s is
  pixel-identical to frame 0 at rest.
- Moonlight (the prompt's radial-gradient glow, stepped per the
  batch flag): three concentric flat discs of translucent gold
  at stepped alphas 0.05 / 0.08 / 0.12, radii 220 / 150 / 95,
  centred on the pointer while it is down, easing after it. No
  gradient and no 'lighter' composite. Each element carries a
  lit value: inside the inner disc it rises to 1, outside it
  decays slowly, so brightness trails behind the moving light
  like a short comet tail. At lit >= 0.5 the element is drawn in
  its one-step-brighter authored hex: #7A2E4A to #A03A5E,
  #B565A7 to #CD83BE, #3F6FA3 to #5E8FBE, #D97E36 to #E89A54,
  leaf #4E7A4E to #679A67, gold #C9A24B to #DEC06E. Pointer
  coords convert through the stored cover transform (S, OX, OY).
- Determinism: frame one is drawn synchronously at the constant
  phase T = 18.7s (pulses and shimmers mid-wave, pointer absent,
  no moonlight), never Date.now() minus an offset. The clock
  anchors there and advances in fixed 1/60 ticks inside a
  typeof-guarded requestAnimationFrame loop.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png). Thumb rendered twice: byte-identical both times.
- Desktop: full-bleed toss, all three species legible, oxblood /
  purple / blue / amber balanced across the field, gold moons,
  eyes, shards and stars reading in the gaps, ground continuous
  to every edge.
- Thumb: heroes and gold details still read at gallery size; the
  dark plum ground keeps the jewel tones rich, no pastel creep.
- Mobile: cover crop keeps whole blooms in frame, field
  full-bleed with no letterboxing.
- Assertions hold at load (14 / 28 / 40 / 120); no console
  errors; listeners registered for resize and pointer only.
