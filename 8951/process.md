# №8951 · Prime Petals - process notes

- **Title:** Prime Petals
- **Seed:** 254 (Prime Partial Palette)
- **Concept:** A still rosette whose only allowed hues are the
  prime-numbered partials 2, 3, 5, 7, 11, 13, 17, 19, octave-folded
  into one wheel (hue = 360 * p/19). Each prime family grows exactly p
  translucent petals in its own whorl. The awkward primes (11, 13, 17,
  19) keep their detune as hue jitter and a thin bright edge, like a
  quartertone approximation that knows it is approximate. A legend
  strip names the eight families. Click reseeds a fresh rosette.
- **Technique:** Vanilla canvas, seeded PRNG. Petals drawn as paired
  quadratic curves with jittered length and angle; radial background
  gradient and vignette.
