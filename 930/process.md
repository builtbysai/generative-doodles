# No.930 "The Hidden Beauty of Long Multiplication"

Study #114 stefpos, PP91 "Eleven Times".

## Concept

Schoolbook long multiplication as generative ornament, after Stefanie
Posavec's '11 x' series. The entire working is the composition: two large
factors at the top, a cascade of partial products, the carried tens marked
as small violet arcs, and the final product boxed in a heavy hand-drawn
double rule. Every numeral is hand-drawn, stroked in by an invisible pen in
true working order over a 90 second loop: factors, rule, partial rows digit
by digit (right to left, the order they are computed), the addition with its
carries arcing in, the product, the box. Then the finished working holds,
the page gently fades, and it works itself again.

Palette, strict: paper #F7F3E8, black digits #1A1A1A, red multiplier #C0392B,
blue partials #2471A3, violet carry arcs #7D3C98, gold-brown box #B9770E.
No typeset numerals anywhere (zero fillText calls; every digit is a stroked
vector glyph). No decorative math symbols: only factors, rows, carries,
product.

Interactions: tap for a new seeded pair of factors and a fresh working;
drag to smudge the rows (graphite smear that relaxes back); double-tap to
isolate the carry arcs and their tiny digits for 6 seconds. Sound, on first
gesture only: a pencil scratch tick per digit (pitch rising with the row),
a soft stamp thump when the box closes.

## Construction

Single self-contained index.html, canvas 2D, no external assets, no absolute
URLs, no date strings, no em dashes.

Sizing: canvas size comes from the Visual Viewport API with resize listeners
on visualViewport and on window; draw() pins canvas.style.width and height
in px every frame. Phone detection uses window.screen physical size (min
dimension under 700 px) with the aspect fallback h > w * 1.15. The tower is
laid out from the live size on every frame: digit height s is the smaller of
the width fit (product columns at 0.74 s advance) and the height fit (the
full row stack), so the working is always complete and never clipped; on
phones the digits simply shrink.

Arithmetic, honest and exact: each generation g draws its factors from
mulberry32(93000 + g * 7919): multiplicand of 5 or 6 digits, multiplier of
3 or 4 digits, product at most about 1e10, exactly representable. Partial
products are A times each multiplier digit; the product is then recomputed
by explicit column addition of the partials, which yields each column's
carry-out. The drawn product digits and the carry arcs come from that column
addition, not from the closed-form product, so the working on the page is
the computation itself. Multiplier digits are drawn from 1 to 9 so every
multiplier digit writes a genuine partial row (a zero digit would write a
row of zeros and teach nothing).

Generation 0, verbatim, for checking:
452823 x 983 = 445125009
Partial rows, top to bottom: 1358469 (x3), 3622584 (x8), 4075407 (x9).
Column carry-outs, units column first: 0, 1, 2, 1, 1, 1, 1, 0, 0.
The arcs land above columns 2 to 7 carrying 1, 2, 1, 1, 1, 1.

Digits: a vector stroke set for 0 to 9 in a unit box (x in [0, 0.62], y in
[0, 1]), Catmull-Rom smoothed, with per-instance seeded jitter, rotation
(about ±2 degrees) and scale (0.95 to 1.05) baked at build time. Each row
also carries a seeded skew (rotation about ±0.46 degrees plus a small shift)
so columns breathe instead of locking to a grid. Rules and the box are
wobbly polylines baked from the same seeded stream.

Determinism: frame one is the synchronous draw(0). The loop clock is offset
by a fixed 33 s, so frame one opens mid-working. Everything drawn is a
closed-form function of the loop time and the recorded event list (taps,
double-tap windows, smudge stamps). The stroke-in reveal walks baked
cumulative path lengths; smudge offsets are sums of decaying exponentials
over recorded pointer stamps; the carries-alone window fades plain elements
to 5 percent alpha with closed-form ramps. No Date.now anywhere; the only
clock is elapsed time since load, and frame one never reads it. No
gradients, no shadowBlur, no ctx.filter, no offscreen canvas. AudioContext
is created lazily inside the first pointerdown and typeof-guarded; the
piece renders complete in silence.

Loop structure: 90 s total. Work events are scheduled by scaling raw
durations (digit 1.0, carry 0.85, rule 1.5, box 2.4, gap 0.14) so the
working completes at 78 s, holds complete to 86 s, then fades out over the
last 4 s and reworks the same factors. A tap starts the next generation.

## QA log

Renderer: node ~/workspace/tools/render-piece.js (node-canvas), which
evaluates the piece's own script. Piece renders cleanly in silence.

- qa-desktop.png (1280x900), thumb.png (720x720), qa-mobile.png (390x844):
  frame one shows warm paper, black 452823, red 983 right-aligned under it,
  the hand rule, blue 1358469 complete, and the second partial row mid-draw
  (584 written, the next 2 half-stroked), rows visibly skewed by a degree
  or so. Mobile: the whole tower fits the width, digits smaller, nothing
  clipped.
- Determinism: thumb.png rendered twice and cmp byte-compared: identical.
  Second render deleted.
- Math check, run in node against the values above: 452823 x 983 =
  445125009, and the partials recompute to 1358469, 3622584, 4075407.
  PASS. Generations 1 and 2 of the same generator were also spot-checked
  in the prototype (473468 x 272 = 128783296; 631129 x 527 = 332604983).
- Completed-state probe (temporary copy with the clock offset moved into
  the hold phase, deleted after): all three partial rows complete and
  correctly staggered, second rule drawn, six violet carry arcs with their
  tiny carried digits above the product (the carried 2 above the 5 is
  visible), product 445125009 boxed in the gold double rule.
- Fade probe (offset moved to 88 s): the whole working at half alpha,
  fading as specced.
- Grep checks on index.html: zero fillText, zero Date.now, zero gradient /
  shadowBlur / ctx.filter / offscreen-canvas usage.

Deviations:

1. No multiplication sign is drawn before the multiplier. The brief lists
   the working as factors, rows, carries, product, and excludes decorative
   symbols; the stacked right-aligned factors over a rule read unambiguously
   without one.
2. Inside a carry event the arc is budgeted a fixed share of the event's
   path length (1.6 units) before the carried digit strokes in. Purely an
   internal pacing device; on the page the arc draws, then the digit.
3. Frame one lands at 33 s of 78 s of work (about 42 percent): the first
   partial row is complete and the second is roughly two thirds written,
   inside the brief's "about 40 percent, first two partial rows" envelope.
