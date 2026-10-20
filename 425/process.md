# No.425 Long Lunch — yaelhofri (EXPANSION #46, YAE1)

## Concept

After Yael Hofri's definitive mechanism, "a table full of colors, flowers,
good food and a little wine": an outdoor table still life on a red-and-pink
checkered tablecloth. A bottle labeled VINO stands centre-back with two
glasses of red wine flanking it, a vase of pink, orange and yellow flowers
at the right third, a bowl of green salad with tomatoes front-left, lemon
halves and papaya halves up front, one lit candle at the left, a wooden
chair edge at the frame's left, and a leafy-green backdrop across the top
third. Warm saturated flat fills throughout; the piece is a long, happy,
unhurried lunch, so the ambient loop just breathes: the candle flame
flickers, the flower heads sway, and one leaf drifts across the backdrop.
Her signed corner mark sits bottom right.

## Construction

One canvas, design space 1280x900, full-bleed cover fit (Visual Viewport
sizing, resize listeners on visualViewport and window, canvas pinned in
px every frame, phone detection via window.screen min dimension < 700px
with aspect fallback). Palette closed to the prompt's eleven colours;
no gradients, no shadowBlur, no offscreen canvas. The flame glow is three
stepped flat-alpha discs, per the house flat rule.

Loop and determinism: the ambient loop is exactly 20s. The synchronous
first frame is drawn at the constant phase T = 6.35s (arrangement 1
complete, flame mid-flicker, drifting leaf mid-backdrop); the clock is
anchored there and advances in fixed 1/60 ticks, with requestAnimationFrame
typeof-guarded. Nothing reads a wall clock, so the thumbnail reproduces
byte-identically from the shipped script.

Motion, all on whole cycles of the 20s loop:
- Candle flame: 2-phase sine flicker (3 and 7 cycles per loop, scaleY
  1 +/- ~0.13 combined), inner flame in the lighter yellow.
- Flower heads: five 8-petal fans on stems from the vase, each head
  rotating plus or minus 2 degrees on 1 or 2 whole cycles with a fixed
  per-head phase.
- Drifting leaf: exactly one leaf per loop crosses the backdrop
  (-70 to DW+70), two sine waves of height and two full tumbles per
  crossing, off-frame at both ends so the wrap is seamless.
- Static texture is fixed-seed data drawn directly: 15 backdrop leaf
  clusters and 11 fallen petals on the cloth (mulberry32, seed 425).

Text rule: the only text is the VINO label, drawn as hand-lettered stroke
paths from a tiny glyph table (V, I, N, O) on a cloth-pink label. The
prompt's "signed corner mark" ships as a small hand-drawn flower glyph
(five pink petals, orange centre, green stem) in ink path data at bottom
right; the prompt does not describe the mark's form, so this is fly's
replaceable resolution.

Interaction (Hans's RETHINK rule — watch-only ambient, one authored
gesture): DOUBLE-TAP advances the table to the next of exactly 3 authored
arrangements — never a runtime reseed. The six movable items (bottle,
glassL, glassR, vase, lemons, papaya) are re-laid on the anchor grid;
cloth, backdrop, chair, salad bowl and candle are scene furniture and do
not move. Tap detection uses the piece clock (down/up within 28 design
px and 0.8s; two taps within 0.45s and 90px count as a double-tap).
A switch snapshots the current interpolated positions, then each item
lifts (16px sine arc) and settles into its new slot over 0.55s of smooth
fixed-tick easing.

The arrangement table (base points x, baseY in design px):
- Arrangement 1 (frame one): bottle (640,505), glassL (455,520),
  glassR (825,520), vase (1060,575), lemons (630,730), papaya (945,715).
  Per the spec: bottle centre-back, glasses flanking, flowers right-third.
- Arrangement 2: bottle (300,500), glassL (478,520), glassR (615,514),
  vase (1015,580), lemons (862,728), papaya (560,712).
- Arrangement 3: bottle (975,498), glassL (798,518), glassR (1138,524),
  vase (335,585), lemons (620,748), papaya (880,700).
- Fixed in all three: salad bowl (320,705), candle (195,565), chair at
  the left edge, corner mark at (1218,838).
Every arrangement is asserted complete (3 tables x 6 items) at load;
QA probes ?seed=arr2 and ?seed=arr3 render-check arrangements 2 and 3.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Thumb rendered twice from the shipped script: byte-identical
  (md5 f4e8982593845a4ce04153a4acea1716).
- Desktop: the full grammar reads at a glance — VINO bottle centre-back
  with the label legible, glasses flanking, flower vase right-third
  with five distinct heads, candle glow stepped and visible at left,
  salad bowl with tomatoes and olives, lemon and papaya halves up
  front, chair back at the left edge, corner mark bottom right, the
  orange drifting leaf mid-backdrop at frame one's phase.
- Arrangements 2 and 3 probed at desktop size: no item collisions
  (vase flowers clear the candle glow in arrangement 3; glasses clear
  the bottle in arrangement 2); only the six specced items move.
- Mobile: cover-fit centre crop keeps the bottle, label, lemons and
  both glass rims in frame on continuous cloth — the house behaviour
  for full-bleed field pieces.
- Fixes during build: the VINO word at letter height 28 measured
  ~92px against a 74px label and would have spilled onto the bottle;
  label widened to 82px and letter height set to 22. The salad bowl's
  flat shadow was raised to sit under the bowl's foot.
- Deviations: none from the spec or its adaptation flags. The corner
  mark's flower-glyph form is the spec's own recorded resolution.
