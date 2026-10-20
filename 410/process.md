# No.410 Coffee Cats — process

EXPANSION #44 (yeti-iglesias), prompt YETI2. Gallery
date 2003 · 02 · 25 (formula 2002-01-10 + (N+1) days).

## Concept

After Yeti Iglesias's animal-in-vessel mechanism (her
Black coffee cat composition): a giant coffee cup on
a cream ground, black cats with yellow eyes emerging
from the black coffee surface, steam wisps curling
up, floating orbs and sparkles in the negative space.
Her hand-lettered "Yeti" signature sits bottom right,
drawn as stroke paths only — the set's designed-text
exception; it is the only lettering in the piece.

Her signature hue-shifted 2-stop gradients take the
set's gradient rule: two flat tones with a hard
diagonal edge inside each shape. The cup is orange
over hot pink across one diagonal, the steam runs
purple below its midpoint and white above, each orb
is half pink, half purple, each leaf half orange,
half pink. No smooth gradients anywhere.

## Construction

One canvas, design space 1280x900, centred fit, page
ground in the cream. Visual Viewport sizing with
resize listeners on visualViewport and window;
canvas pinned every frame via style width/height in
px; phone detection via window.screen min dimension
< 700px with aspect fallback (h > w*1.15).

- Cats: exactly 4, asserted. One fixed recipe (body
  capsule, triangle ears, head, yellow eyes with
  black slit pupils, pink nose, cream whiskers) at
  four fixed stations along the rim (x = 425, 560,
  715, 865). Bodies tuck below the coffee line and
  the coffee ellipse is drawn over their feet; an
  orange front-lip arc along the coffee's edge sells
  the emergence. Two cats drape a tail over the cup's
  front. Each cat bobs on its own whole-cycle period
  of the 36s loop (k = 3, 4, 2, 6) and blinks at
  fixed ambient slots (0.22s each at loop times 5.0,
  11.0, 17.0, 23.0, 29.0, 33.5).
- The tap tables (authored, deterministic). The
  prompt's "tap = reseed the cat heights" and "one
  random cat blinks" resolve to fixed tables indexed
  by tap count, so every tap sequence is reproducible
  and nothing is random at runtime:
  - HEIGHT_SETS (emergence heights in design px,
    cats 0-3): set 0 = [150, 105, 175, 125];
    set 1 = [120, 170, 110, 160];
    set 2 = [180, 130, 150, 100];
    set 3 = [105, 150, 190, 140]. Frame one uses
    set 0; each tap advances one set, wrapping.
  - BLINK_ORDER = [1, 3, 0, 2]: the cat that blinks
    during the dip triggered by the tap landing on
    each set index.
  - TAP the cup (press and release close together,
    landing on the cup): the cats dip up to 58px on a
    sine envelope with a damped wobble tilt, heights
    lerp from the old set to the new set under the
    dip, and three cream ripple ellipses spread
    across the coffee from the blinking cat's station,
    staggered at 0.18s intervals — all on fixed 1/60
    ticks over 1.2s. The piece never reloads.
- Ambient 36s loop: exactly 3 steam strokes (asserted),
  each a sine curve drawn in 26 segments, its wave
  phase travelling upward on whole cycles (k = 2, 3,
  2); exactly 6 orbs, one drifting a full small circle
  per loop; 4 floating two-tone leaves bobbing on a
  whole cycle; 14 sparkles (asserted) twinkling by
  alpha sine on whole cycles.
- Cup: trapezoid filled hot pink, the orange tone
  laid across a hard diagonal under a clip, then the
  bold floral pattern pass (cream 5-petal flowers
  with alternating purple/orange centres, two-tone
  leaves) drawn as data and clipped to the same
  trapezoid. Two-tone handle (orange arc, pink lower
  half) behind the body; two-tone saucer beneath.
- Grain: exactly 500 fixed speckle dots (asserted),
  fixed-seed LCG, drawn in table order every frame.
  All tables are baked from fixed seeds at load; no
  Math.random, no Date.now anywhere.
- Determinism: the synchronous first frame is drawn
  at the constant phase T = 14.0s into the loop
  (cats at set 0 heights, steam mid-rise, no blink
  slot active); the rAF loop is anchored there and
  advances in fixed 1/60 ticks, typeof-guarded.
  QA probe hook: ?seed=taps=N applies N taps at load
  and pins the dip at 0.55s (used for one probe
  render only; default play is unaffected).

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720
  (thumb.png).
- Thumb rendered twice from the shipped script:
  byte-identical (md5 ba0d0bdd70113ad579904690b87efd39).
- Desktop inspected: four cats at varied heights
  with yellow eyes and whiskers, steam two-tone and
  mid-rise, two-tone cup with readable floral
  pattern, handle and saucer two-tone, orbs/leaves/
  sparkles filling the negative space, signature
  legible bottom right.
- First pass fixes: the signature "e" first read as
  a schwa; redrawn as a small loop with its crossbar
  through it, now reads "Yeti". One orb sat inside
  the handle's hole and read as a stray dot; moved
  up so it floats clear behind the handle's tip.
- Tap probe (?seed=taps=1, dip pinned at 0.55s):
  cats sunk mid-splash with wobble, ripple ellipses
  spreading from cat 3's station (BLINK_ORDER[1] = 3),
  heights mid-lerp from set 0 to set 1. Correct.
- Mobile inspected: centred fit holds the whole
  composition on continuous cream; cats, pattern and
  signature all legible.
- Palette grep-verified closed at the nine specced
  hexes; no gradients, shadowBlur, offscreen canvas,
  font text, em dashes or absolute URLs.
