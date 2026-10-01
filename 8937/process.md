# №8937 · Gesture Atlas

## Concept

An interactive gesture-matching instrument. You draw any stroke on a dark slate, and the piece answers: it smooths and resamples your line to 64 points, centers and scales it, then searches a stored corpus of 24 seeded gestures using the closed-form optimal-rotation cosine distance, checking both the direction you drew and its reverse. The closest stored shape then rotates under your hand and lands on your stroke, fitted with an endpoint-weighted similarity transform where the ends carry about 100x the weight of the middle, plus a smooth endpoint lock so both ends finish exactly on your line. A readout names the match, gives its distance, and shows two runner-ups. Every stroke you draw joins the corpus as one of "yours," drawn in brass in the atlas strip, and can answer later drawings.

## Concept family

Gesture-matching instrument: corpus search over resampled polylines by closed-form optimal-rotation cosine distance, bidirectional direction search, endpoint-weighted similarity snap with a smooth endpoint lock, session strokes accumulate into the corpus.

## Differentiation from №8981 "Own Lines"

Own Lines is a static calligraphic line study: hand-built triangle strips, one coherent subject per seed, ink on warm paper. Gesture Atlas is none of that. It is a dark slate instrument the viewer plays by drawing. Its plain stroked lines exist to be searched and snapped, not studied; the subject is the search itself, the rotating match, and the growing corpus.

## Seed

269 (default; `?seed=` overrides, and the "new corpus" button steps to the next seed).

## What was iterated

- The corpus was tuned against the matcher itself. A pairwise distance matrix over all 24 templates exposed near-duplicate families (a soft zigzag that any drawn wave fell into, a bell nearly identical to the peak, a staircase nearly identical to a straight line). Confusable entries were cut or reshaped until a self-match test, drawing every template rotated, scaled, and noised, resolved 24 out of 24 to the right cell: the soft zigzag was removed, peak and valley were given different widths and flank shapes, the staircase got three chunkier steps, and the bell dome was widened.
- A pure similarity fit left the ends of the match up to about 20px off the stroke on shapes whose proportions differed from the template. A smooth endpoint lock was added on top of the 100x endpoint-weighted fit, so the ends land exactly while the weighted fit still owns the middle. Endpoint error after landing is effectively zero; the pre-lock residual for a clean spiral measured 2.7px.
- Mobile header collisions were found by rendering at 390 x 844 and fixed: the subtitle wraps clear of the buttons, and the readout starts below the title block.
- Scripted stroke tests through synthetic pointer events verified the whole loop: a spiral matched "spiral in" at distance 0.041, the same spiral drawn backwards matched at 0.040 with the reversed flag set, a vertical (90 degree rotated) zigzag matched "sharp zigzag" at 0.065, a check mark matched at 0.048, and a touch wave on mobile matched "wave" and joined the corpus.

## Gallery note suggestion

*Draw any gesture and the atlas searches its stored shapes, then lays the closest one over your stroke, ends first.*
