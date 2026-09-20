# Interactive Classics, Batch 2: Study Notes

**Pieces:** Jennifer Dewalt (Analog Clock, Word Clock), Tim Holman abstract clocks
(5), jayesh15111988 Innovative/Binary Clock (10 clocks), Qlocktwo |
**Sites/repos:** jenniferdewalt.com, github.com/tholman/abstract-clocks,
github.com/jayesh15111988/BinaryClock, storede.qlocktwo.com

**Depth:** deep on Dewalt (full JS recovered, analog clock re-rendered in canvas
and visually inspected at current time), Holman (all 5 index.js recovered in full,
re-rendered in CSS and visually inspected), BinaryClock (README + timeLogic.js read,
BCD and color clocks re-rendered and visually inspected); Qlocktwo preliminary
(store page fetch failed this session, study is the documented letter-matrix
concept with a local re-render visually inspected).

Batch 1 was about making the web page fun to touch. Batch 2 is the cousin
question: how many ways can you show the time before it stops being a clock
and becomes the art? The answers range from jQuery and ten-line CSS tricks to a
product people pay hundreds of dollars for. None of them need more than a dozen
lines of real logic.

## Jennifer Dewalt: Analog Clock

Dewalt's 180-websites-in-180-days project (2013). The analog clock is in
`js/analog_clock.js`, plain jQuery, full source recovered. It is NOT a clock
with hands. It is three concentric orbit rings:

- A seconds dot orbits a ring of radius 100, a minutes dot radius 180, an
  hours dot radius 250. Dot sizes scale with ring (5, 10, 20 px).
- Each ring carries 60 tiny gray tick dots, and the outer ring carries the
  numbers 1 through 12.
- Every unit is fractionally interpolated: minutes include seconds/60, hours
  include minutes/60 and seconds/3600, so all three dots glide instead of
  ticking. Redraw on a 500ms interval.
- Palette: near-black page, gray ticks (#A8A7B0), teal dots (#28ca9c).

This is directly in the orbit-diagram family: physical dots sliding on
concentric circles, smooth fractional motion, no hands. The read is instant
even without labels because three nested orbits map naturally to
seconds/minutes/hours. One rendering note worth stealing: she draws the ticks
with 60 tiny filled circles rather than strokes, which gives the rings a
dotted, instrument-like feel.

### What is overdone (avoid list)

- Dots-on-rings is now the default "designer clock" look. A doodle using
  orbit dots needs a new mapping (not time) or a twist in the motion itself,
  like Hans's requirement that dots physically slide mid-gesture.

## Jennifer Dewalt: Word Clock

The page is `word_clock/page` (Rails-era, the JS lives in a bundled asset
file; the DOM structure was recovered from the HTML). Hours sit in three
rows of four ("one two three four" / "five six seven eight" /
"nine ten eleven twelve"); minutes sit in seven columns of shrinking counts
(20/30/40, 50/zero/one...four, 5-9, 10-12, 13-15, 16-17, 18-19), with am/pm
toggles below. The active hour word and active minute word light up while the
rest sit near-black. The design is pure typography: big display type
(Passion One / Finger Paint / Rye), glow on the lit word, everything else
dead.

Compared to Qlocktwo (below), Dewalt's is the blunt version: literal word
lists, one active item per row, no sentences. It reads faster but has none
of the poetry. The lesson is that "highlight the right word in a wall of
words" is a whole genre with a one-axis difficulty slider between list and
prose.

## Tim Holman: Abstract Clocks (5)

All five clocks live in github.com/tholman/abstract-clocks, each clock a
single tiny `index.js` plus CSS. Full sources recovered. The genius here is
how little code each one needs: every clock is time-percentage mapped onto
a single CSS property, updated every 10 seconds.

- **1, Daily Rotation:** body background is a linear-gradient from deep blue
  (#003973) to pink (#ff6e7f) rotated by the fraction of the day times 360;
  an inner circle carries the same gradient rotated minus 180 degrees. Two
  lines of real logic.
- **2, Hourly Rotation:** same trick twice, inner circle driven by the hour
  fraction, page driven by the minute fraction.
- **3, Rise and Fall:** a tall orange gradient div sits behind a mask and
  translates vertically with the day's fraction folded into a triangle wave
  (rise to noon, fall to midnight). The outer gradient mirrors the inner.
  Pure `style.top` animation.
- **4, Hourly Rise and Fall:** the inner gradient rises and falls every hour
  (minutes drive it), the outer rises and falls across the day.
- **5, Rainbow:** a color-wheel div (two layered wheels, one scaled 1.4)
  rotated by the 12-hour fraction. You read the hour by which color sits
  where.

What makes them sing: each one commits to exactly one transformation of one
property. No hands, no numbers, no labels. They are ambient: you glance and
feel the time rather than read it, which is why Electric Objects sold them
as wall art. The construction lesson for doodles is that mapping a slow
continuous value (time, scroll, audio level) onto a single big visual
parameter is a reliable recipe for "alive" without interactivity.

### What is overdone (avoid list)

- Gradient-rotation-as-clock is a solved genre now; Holman's five cover the
  space. Reuse the one-property mapping trick, but map a different slow
  value (scroll depth, inactivity time, ambient sound).

## jayesh15111988: Innovative (Binary) Clock

A 2015 jQuery project that started as a binary clock and accreted 10 clock
types. The README documents all of them with screenshots; timeLogic.js read
for the core. The interesting ones:

- **Binary (BCD) clock:** six columns (HH MM SS digits), four dots per
  column, white = 0, black = 1, lower dot = low bit. Reads 1100 as 12. The
  code only redraws the columns whose digit changed, tracking old vs new
  parts. Re-rendered and inspected: the grid reads instantly as binary once
  you know the bit order.
- **Color clock:** HHMMSS mapped directly to #RRGGBB as the page background.
  Time becomes color, no digits anywhere. Ten lines.
- **Bar chart / pie chart clocks:** hours, minutes, seconds as three bars or
  three pie slices (via canvasjs). Data-viz clocks.
- **Percentages clock:** percent of day passed, remaining, and progress to
  noon.
- **Periodic elements clock:** 118 elements mapped across 720 minutes of a
  12-hour window; the current element's metadata (atomic number, density,
  melting/boiling point) displays as the clock. A study-aid clock.
- **Coin tosses clock:** flips a coin every second and plots heads vs tails,
  which visibly converge toward 50/50 over time. The clock as a probability
  demo.
- **Color gradient clock:** overlapping clock-hand discs in RGB or CMY space,
  new color from the overlap. Additive color mixing driven by time.
- **Bezier curve clock:** time drives the control points of a bezier curve
  (via jsxgraph), so the curve continuously reshapes as minutes pass. The
  clock as a parametric drawing.

What makes it sing: the project is a catalog of the idea that any function
f(time) is a clock. The periodic-elements and coin-toss clocks are the
keepers: they smuggle education and statistics into a glanceable object. The
technique pattern is always the same (get time, split into digits, map to
the visual's parameters, redraw only what changed), which means the genre is
limited only by what you map the time onto.

### What is overdone (avoid list)

- HHMMSS-to-hex color clocks and BCD dot grids are everywhere now; both read
  as tutorials rather than pieces. The coin-toss convergence and bezier
  control-point ideas are the underused ones.

## Qlocktwo

Biegert and Funk's product (2009): a square face with a matrix of letters
(10 rows by 11 in English), behind which LEDs light the exact letters that
spell the current time in words: "IT IS HALF PAST TEN". Four corner dots add
minutes 1-4 for exactness. The English matrix is designed so every word
shares letters where possible ("ITLISASTIME" / "ACQUARTERDC" /
"TWENTYFIVEX" / "HALFSTENFTO" / "PASTERUNINE" / "ONESIXTHREE" /
"FOURFIVETWO" / "EIGHTELEVEN" / "SEVENTWELVE" / "TENSEOCLOCK").

The craft is in the matrix layout: words overlap and interlock so the grid
looks like noise until the right letters glow, and the whole face is a
typographic object even when off. The store page was unreachable this
session, so this stays preliminary; the re-render confirmed the composition
works at any size and the glow-on-dark treatment carries the whole piece.
It is the polished end of Dewalt's word-clock axis: where she made a list,
they made a sentence, and the sentence is why people buy it.

## Shared takeaways for the doodle sketchbook

- Every clock here is `map(time) onto one visual parameter`. Pick any slow
  continuous value and any big visual property and you have a doodle: time to
  gradient rotation (Holman), time to color (color clock), time to words
  (Qlocktwo), time to bezier control points, time to coin-flip statistics.
- Fractional interpolation is what separates the good ones from the ticking
  ones. Dewalt's orbit dots and Holman's gradients all glide because every
  unit carries its smaller unit as a fraction.
- The genre runs on a single slider: how much you ask the viewer to decode.
  Orbit dots ask nothing, Qlocktwo asks for a sentence, BCD asks for mental
  math. Harder decode is not better; the sweet spot is "reads in one glance,
  rewards a second look."
- Redraw-only-what-changed (the binary clock's old/new digit tracking) is a
  good habit for any continuously updating canvas piece.
