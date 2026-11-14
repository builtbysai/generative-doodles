# No. 1761: The Resonating Wire

Spec: TASKS.md PP1008 (study #231 simon-scott, SS2). Gallery date: 2006 · 11 · 07.
Interaction cue: "Watch only."

## Felt driver

A bare wire held taut between two posts, humming only when the wind
touches it. The felt driver is the wait between gusts: the sky is vast
and empty, the wire nearly still, and then a pressure band crosses and
the wire sings for a few seconds before going quiet again. The piece
is about that arrival and passing, not about a constant vibration.

## Mechanism

Canvas 2D. The wire is a 180-segment line spanning the full width of
the frame at 52 percent height, pinned at two dark posts near the
margins. Each segment carries a standing-wave displacement (3 and 7
half-wave modes at 2.2 Hz) whose amplitude is the sum of a low constant
sympathetic tremor and a Gaussian bump centred on each active gust,
times a sin(pi u) envelope so the wire stays pinned at the posts.
Gusts run on a fixed 90 second cycle (t = 14, 48, 74 s; strengths
0.55, 0.95, 0.70) and move left to right as translucent white bands
with sine-noise shaped fronts and faint pressure streaks. A soft amber
shimmer is drawn per segment under the steel wire, its alpha and width
tied to the local amplitude, so the glow appears only where the wire
is excited and fades as the gust passes.

## Palette

Fen-sky pale grey ground #D8DDDB; wire and posts in dark steel
#33393D / #2B3134; gusts as translucent white bands; vibration shown
as a soft amber shimmer rgb(216, 164, 65) around the wire. Title and
hint plates in pale #E9EDEB with dark ink.

## Periods

Gust cycle 90 s; standing-wave oscillation 2.2 Hz (well under the
14 Hz flicker ceiling by construction). No other periods.

## Frame-one phase

Fixed phase t = 60.0 s. The second (strongest) gust is mid-crossing,
its centre near 54 percent of the frame width, so the wire hums with
visible amber shimmer around the middle in the first frame and the
thumbnail. All timing is a pure function of phase; no Date, no
unseeded random, no performance clock in the visuals.

## Deviations from the prompt

None material. The posts carry a small cap and foot so they read as
held fixtures rather than floating bars; the sky is kept entirely
empty otherwise, per the prompt. Desktop renders the composition as a
centred square within the pale ground (house rule for field-like
compositions); phones are full-bleed.
