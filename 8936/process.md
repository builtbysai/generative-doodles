# №8936 · Hue Bingo Canvas

Dated to day 8936 of the gallery calendar. Default seed 270.

## Concept

Every load and every click rolls a real Hue Bingo palette (the FarbVelo
recipe, re-derived in OKLCH rather than copied from the original tool): a
seeded base hue, hue slots every 60 degrees around the wheel, one genuinely
dark anchor stop, three vivid mid stops whose lightness climbs with the
index, and a quiet desaturated bright end. The five stops are interpolated
perceptually in OKLab and sampled into ten to thirteen bands. The piece
then paints exactly one composition from that roll: concentric irregular
rings on a warm paper ground, each ring taking the next band color in
order, so the dark anchor sits at the center and the quiet bright end
drifts out toward the paper. The palette is the seed and the rings are
the score. Nothing else is drawn: no wheel, no swatch chart, no palette
strip at the margin. Flat color, one committed palette per seed.

## Concept family

Palette-rolls as composition (FarbVelo Hue Bingo lineage, study-informed).
Explicitly filed separately from №8978 Mud Map (a labeled OKLCH hue wheel
diagram with mud zones and escape arcs) and from №8951 Prime Petals (a
prime-partial rosette); this is neither a diagram nor a rosette, just a
rolled palette painted as one flat color field. The study note behind the
palette recipe lives at study/farbvelo.md.

## Build notes

- Single self-contained page, 2D canvas at 1280x800, no libraries.
- OKLCH is converted natively (OKLCH to OKLab to linear sRGB) with a
  chroma pull-back loop so vivid mids stay in sRGB gamut instead of
  clipping; interpolation happens in OKLab between the five stops.
- Ring geometry: widths come from a seeded thin/mid/fat mixture, fitted
  (with floors and caps) so the medallion always lands at 0.86 to 0.95 of
  the nearest frame edge, on an off-center, slightly tilted, slightly
  squashed center.
- Wobble: one radius-aware three-harmonic field sampled by every edge,
  with small per-edge phase drift and jitter. Edges breathe together
  instead of wandering independently, so thin rings never pinch away to
  nothing.
- Click, tap, Space, or Enter rolls a fresh seed; ?seed= in the URL pins
  a roll for sharing. The URL is never rewritten in session.
- Flat paper ground with light grain; the artwork itself is pure color.

## Iteration

Three passes, each judged from headless renders of individual seeds:

1. Independent per-edge wobble made the pale bright rim pinch out on one
   side of some seeds, so the roll read as two offset circles rather than
   one composition. Replaced with the shared radius-aware wobble field.
2. Paper gap rings were tried and rejected: a skipped ring read as a
   defect, a hole in the roll rather than a breath. The paper now speaks
   only at the margins.
3. Width fitting gained floors and caps after hairlines stacked into a
   dense dark knot around the anchor on some seeds; the anchor disc was
   also given more presence (radius 36 to 70).

Seeds 270 through 278 were rendered and inspected one by one; every roll
held together as one composition without curation, so no seed needed to
be fenced out. Default seed 270 (base hue 322 degrees: deep plum anchor
climbing through teal and olive to a blue mid and a pale sage end) won
because its dark center is rich rather than muddy and its final bright
band reads as a deliberate halo against the paper.

## Gallery note suggestion

*one roll of the Hue Bingo, painted as rings: dark anchor in the middle, quiet bright end out by the paper*
