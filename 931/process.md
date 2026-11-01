# No.931 "What Ship Would You Be?"

Study #114 stefpos, PP92 "Ship's Badge" (Stefanie Posavec's National Maritime
Museum residency, 2019). A generative ship's-badge engine: a synthetic visitor
survey rendered as a fleet of Royal Navy style crests, where every mark reads
exactly one variable and the badges themselves are the survey.

## Concept

Each badge is one visitor, drawn in the residency's published "how to read it"
grammar:

- SKY (upper half of the disc): hatch density = neuroticism. A calm visitor
  gets a few horizontal pencil lines; a stormy one gets dense crosshatch.
- SEA (lower half): wave amplitude = conscientiousness, from a flat line to
  heavy swells.
- TOKEN (centre, red): agreeableness in terciles: low = anchor, mid = monkey,
  high = seagull. The ship's wheel is reserved for the very open (see rules).
- RING: weight = openness: thin, medium, thick, or a double ring.
- SCALE: badge radius proportional to sqrt(popularity of the visitor's word)
  across the whole cohort.
- BANNER: a ribbon under the token lettered with the survey word.

The most popular word's badge is the hero, enlarged at the centre. A legend
strip along the bottom, lettered in the same hand as the banners, states the
grammar: SKY = NERVES, SEA = CARE, TOKEN = WARMTH, RING = OPENNESS,
SIZE = POPULARITY. Tapping a badge swaps it into the hero position and prints
its reading above the legend (for example "Dreamer: stormy sky, calm sea,
monkey heart, double ring"). A horizontal swipe reshuffles the fleet by word,
then by neuroticism, then by popularity, cycling. A double-tap synthesises a
fresh cohort and reprints the fleet.

## Construction

Data model. Each cohort is 72 visitor records from a seeded mulberry32 stream
(cohort 0 seed 93100; each reseed adds 7919). A record's word is drawn from a
weighted pool of ten (Dreamer, Rebel, Listener, Perfectionist, Wanderer,
Keeper, Spark, Anchor, Tide, Compass), and its four trait scores are 0.5 plus a
word-flavoured bias plus seeded spread, clamped to 0..1: Perfectionists lean
conscientious and a little neurotic, Listeners lean agreeable, Wanderers and
Dreamers lean open, Anchors lean steady. Popularity is the count of records
sharing a word across all 72, never just the visible subset. The hero is the
first record in a seeded shuffle whose word is the most popular. Token rule as
built: openness above 0.85 gives the wheel regardless of agreeableness;
otherwise agreeableness terciles give anchor, monkey, gull. Ring rule:
openness under 0.30 thin, under 0.60 medium, under 0.85 thick, above that
double.

Print loop. A 78 s cycle: badges print over the first 60 s (hero first, then
grid badges staggered 2.55 s apart, each assembling over 7 s in the order ring,
sea, sky, token, banner; ring and token stamp in with a slight overshoot),
hold complete for 10 s, then fade out over 4 s and reprint. Frame one is the
print clock at 33 s, about 55 percent: the hero is complete and roughly half
the grid badges are assembled. All state is closed-form: positions come from
recorded move segments with smoothstep easing (0.8 s hero swaps, 1.0 s sort
glides), print progress from the print clock, the reading line from the tap
log. Frame one is a synchronous draw at t = 0; no wall-clock value feeds any
drawn state.

Rendering. Single canvas, flat palette only (brass, navy, sea teal, storm
gray, token red, paper, ink). Sky hatch and sea waves are clipped to the
badge's inner disc and to their half of it. Text is set letter by letter in a
Georgia serif stack with small seeded per-letter jitter, so the legend and
banners share one hand. Canvas size comes from the Visual Viewport API with
resize listeners on viewport and window; the canvas style size is pinned in
px inside draw(). Phone detection uses window.screen's smaller dimension
under 700 px, with a tall-aspect fallback: phones get a 3-column grid, a
smaller hero, and the legend wrapped over two lines.

Audio. Born lazily inside the first pointer gesture, typeof-guarded. Rubber
stamp thumps (a falling sine, 130 to 48 Hz) fire as ring and token stamps land
during the print, throttled to four per frame; a two-tone ship's bell (1318.5
and 1975.5 Hz, long decay) rings when a badge is read. The piece renders
complete in silence.

Deviations, with reasons:

1. Of the 72 records, only the hero plus the first gridful are drawn (18 grid
   badges on desktop, 14 on phone); 72 full badges at legible size do not fit
   any target frame. Popularity, hero choice and scale still use all 72.
2. The centre cells of the grid are left empty (two on desktop, straddling
   the fleet centre; one on phone) so the enlarged hero never sits on top of
   a grid badge. First QA pass skipped only one desktop cell and the hero
   occluded the badge behind it; this is the fix.
3. Hero enlargement is 1.7x with a cap of 0.88 of the smaller cell dimension,
   so neighbouring badges stay readable at the tightest phone geometry.
4. A reseed restarts the print clock at zero rather than at frame one's 55
   percent offset, so the visitor watches the new fleet assemble.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png). The piece
  renders cleanly in silence; only resize and pointer listeners register.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. Repeated after the layout fix: identical again.
- Desktop read-back: paper ground; a fleet of circular badges with brass
  rings of visibly different weights (thin, medium, thick, double), gray
  hatched skies of varying density, teal wave seas of varying amplitude, small
  red tokens (monkey, gull and wheel all present in frame one), word banners
  (ANCHOR, KEEPER, SPARK, WANDERER, REBEL, DREAMER); the DREAMER hero complete
  and largest at centre; two badges mid-assembly at the print frontier (ring
  and sea down, sky partial, token and banner still to come); legend strip in
  one line along the bottom. No badge hides behind another.
- Mobile read-back: 3-column fleet, DREAMER hero centred and complete, all
  visible badges' banners and tokens readable, one badge mid-print at the
  bottom, legend wrapped to two lines with nothing clipped.
- Palette check: only the seven specified tones appear. No gradients, no
  shadowBlur, no ctx.filter, no offscreen canvas, no external assets, no
  date strings, no em dashes. Visible text is limited to banner words, the
  legend strip, and the tap reading line.
