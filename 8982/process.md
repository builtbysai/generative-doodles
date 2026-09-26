# №8982 · Glow Only: process notes

Date: 2026-08-17 (backfill). Default seed: 898202.

## Concept

FarbVelo's "Show Glow" background promoted to the whole piece. No bands, no
swatches, no geometry with hard edges: just the huge soft radial wash of a
generated Hue-Bingo-style palette on white, slowly crossfading between
palette rolls. A meditative, Rothko-like color field. Clicking anywhere
rolls a fresh palette; the piece also rolls on its own every 55 to 90
seconds with a 16 to 24 second crossfade, so it never sits still and never
repeats.

## Method

Single self-contained page, vanilla JS plus one WebGL fragment shader, no
CDN and no dependencies. The palette roll follows the FarbVelo Hue Bingo
recipe re-implemented in OKLCH from the study notes: a dark anchor stop,
five mid stops with lightness climbing by index on hue slots at least 60
degrees apart, and a quiet desaturated bright end. Chroma is deliberately
calmed (mids 0.07 to 0.15) so the field stays contemplative on white.

Each of the seven stops becomes one enormous soft elliptical bloom,
stacked like a Rothko: anchor low as grounding, bright end wide across the
top, mids in distinct horizontal bands. The shader composites them over
white with a halo plus a tighter luminous core per bloom, a slow
domain-warped fbm wash that keeps every boundary painterly and
non-repeating, fine grain against banding, and a whisper of vignette.

Motion is built to never read as a screensaver: bloom centers drift on
sine pairs with 70 to 250 second periods, intensities breathe over 55 to
135 seconds, a global hue drift of plus or minus 6 degrees runs on a 210
second cycle, and palette crossfades morph both color and bloom geometry
so the field melts from one roll to the next instead of cutting. Nothing
loops on a human timescale. `prefers-reduced-motion` freezes the drift.

## What was tried

Variant A composited seven plain radial gradients with heavy overlap. It
rendered as a formless grayish mist: complementary hues overlapping at low
alpha went muddy, and there was no structure, more dirty wall than Rothko.

Variant B (final) gave each bloom a luminous core plus halo, placed the
mids in distinct stacked zones with wider-than-tall ellipses, and pushed
the anchor mostly below the frame. The same seeds that read as mud in A
read as glowing bands in B. Compared seeds 898202, 1234567, 424242, 90210,
555019, and 777001 headless at 1280x800: every roll held the structure,
with the default seed's lilac, taupe, and green stack the calmest and most
wall-worthy.

## Verification

- Zero console errors or page exceptions on load, on click-roll, and
  across a 100 second run covering a full auto-roll and fade (fail-closed
  exception collector, exit 0).
- Click anywhere rolls a fresh palette: verified via CDP input dispatch,
  mid-fade and completed states screenshotted, no jumps.
- No scroll or overflow at 1280x800 desktop and 390x844 mobile; the
  composition holds in portrait.
- Phone-performant: one fullscreen shader pass, 4-octave fbm, 7 blooms,
  devicePixelRatio capped at 1.5.
