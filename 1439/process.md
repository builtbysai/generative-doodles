# №1439 "The Driverless Car Sings" (nikolaus-utermoehlen NU8, PP662)

## What it is
An unroadworthy old car, center-frame, with three women sitting inside it
singing their way through a country with no driver. The road unspools ahead
empty; the landscape passes in found-photograph fragments (fields, autobahn
signs, petrol stations) in film-frame strips above and below the car; above
it all, a row of 27 numbered cassette labels (yellow, red, white) lights up
as its tapes play.

## Composition
- Cassette row across the top: all 27 labels, numbered, cycling
  yellow/red/white. The playing tape's label is fully opaque with a cream
  frame; the secondary deck's label is dim-lit; the rest sit dark.
- Landscape strips above and below the car, drawn as film frames: field
  (green with grass ticks), autobahn sign (blue/white blocks), petrol
  station (cream with red stripe and grey pump block). The strips scroll
  past continuously; the car never moves.
- Road: a receding grey trapezoid, empty, with centre dashes that grow as
  they approach.
- Car: a static center sprite, cream body with rust patches, two wheels,
  three passenger windows each holding a singing figure (head, mouth
  opening on a per-figure sine, coloured shoulders). The driver seat is an
  empty window outline — no figure, no driver, ever.

## Motion and interaction
- Tape sequencer: 27 tapes, 6 s per slot, two decks alternating — deck A
  plays tape k at full gain (fading in/out at slot edges), deck B plays
  tape k+1 softly. The cycle wraps exactly every 162 s.
- The landscape strips scroll at 22 px/s; the strip offset also shifts with
  the active tape, so each tape has its own fragment neighbourhood.
- Drag a cassette label: that tape plays louder for 12 s (override) and the
  strip shifts to its fragment. Drag the car: a small vertical sway only
  (closed-form over the recorded drag list, exponential decay) — the car
  never steers, never moves forward, never gains a driver.
- Seamless loop: the tape cycle wraps exactly; the strips scroll
  continuously; the car stays centered; the singing mouths run on
  per-figure sines.

## Adaptations
- Car as a static center sprite with three singing figures (mouth and sway
  only); landscape as two scrolling fragment strips driven by the tape
  sequencer; 27-tape sequencer with per-tape gain/fade rules and label
  lighting; drag on a label = gain + fragment control, drag on the car =
  sway only, never steering.
- Silent by design: the singing is visualized (mouths, sway), not heard.
  No AudioContext, no getUserMedia.
- Text: the 27 cassette numbers are the prompt's own specced labels — the
  single fillText call. The autobahn-sign fragment is flat colour blocks
  only, deliberately letter-free, so no other text appears besides
  `<title>`.
- No offscreen canvas, gradients, shadowBlur, Path2D, or createElement.
  Fading alphas rounded to 4 decimals; dots as filled rects or
  own-beginPath arcs (node-canvas quirks).
- Determinism: frame one = draw(0) via boot flag, clock starts only with
  the rAF loop (plain function declaration behind a typeof guard); all
  randomness from mulberry32 (seed 1439000 + index·7919), never
  Math.random.

## Verification (forced-time probe harness, vm-isolated instance, stubbed
rAF driving the piece's own loop, pointer events to its own listeners)
- Two fresh instances pixel-identical at t = 0.
- Sequencer: label 1 lit at t = 0 (ring brightness 162 vs 56 for label 2);
  label 2 lit at t = 7 (149 vs 86); label 1 lit again at t = 162 (162 vs
  56) — the 27-tape cycle wraps exactly.
- Car static: car-zone cream pixels identical at t = 0 and t = 10 (48,108).
- Strips scroll: top strip differs by 77,889 px between t = 0 and t = 5.
- No driver: 0 skin-tone pixels in the driver window at t = 0, vs 1,250
  in a passenger window.
- Label drag: dragging label 20 makes it lit afterwards (140 vs 86 for
  label 1) — the override plays it louder.
- Car drag: car-zone cream centroid x unchanged (338.1 before and after)
  — sway only, no steering.
- Renders inspected at 1280×900, 390×844, and 720×720; thumb byte-identical
  across repeated renders. No fix rounds needed.
