# №8940 · Master Frequency Only — process notes

## Concept
Seed 241: the AMY spectral recipe. The chip analyzed an input sound once,
froze twelve harmonic amplitudes, and from then on only a single master
frequency knob moved the whole recipe; the timbre never changed, only its
position. The piece is an amber-CRT instrument panel: a frozen "spectral
recipe" card of 12 partial bars (tap the card to re-analyze a fresh recipe),
a log-frequency axis strip showing the recipe's ghost at its analysis pitch
(110 Hz) while the live recipe slides along the axis as the master moves,
and a large MASTER wheel (draggable, auto-demo-sweeping when untouched)
sweeping 55–440 Hz with a digital readout. Scanlines and phosphor glow sell
the CRT. Tap enables a sawtooth-based additive drone tracking the master, so
the ear confirms what the eye sees: the shape never changes, only the
position.

## Seeds tried
241001 (shipped). The recipe is reseeded by tapping the card.

## Revisions
- v1 mobile: the hint line wrapped into the seed line on 390px. Shortened
  the hint and moved the "tap card to re-analyze" affordance into the card
  header itself, where it reads on both viewports.

## Verification
- Zero console errors via cdp_exceptions.py (exit 0).
- 390x844 mobile: card, axis strip, and wheel fit; no UI collisions after
  the hint fix (re-screenshotted).
- thumb.png is exactly 1280x800.
