# №1640: Memories of Digital Data, After the Chain (KT1, PP887)

Study #216 kazuhiro-tanimoto, first piece of the arc. Gallery date
2006 · 07 · 09 (formula 2002-01-10 + 1641 days). Gallery note draft:
"A collapsed chain of nodes stands in a dusk sea while data-clouds
flutter overhead and red marks what can no longer be opened. Tap to
release the wave sound."

## Driver

A collapsed-blockchain world as a living rectangle system. Decay is
visible as position and color dispersion, and red means missing
information only: a seeded subset of cloud rects and block towers
renders diagnostic red, each with a faint bloom that spreads slowly
as memory fails. Everything is rectangles: a dark blocky submerged
city of abandoned chain nodes along the horizon, data-clouds of
glittering rectangles undulating overhead like waves, a water band
below reflecting the wreckage. Depth is rectangle size, distant
small. Blocks lose meaning in stillness while data flutters in
movement.

## The piece

Three rectangle-field layers, each with its own drift rules, on a
seeded field (mulberry32, seed 1640007):

- Sky: 42 horizontal strip rects grading violet-indigo through rose
  to burnt orange at the horizon.
- Clouds: 8 clusters, 77 rects total (asserted count), in burnt
  orange, rose and violet, undulating on slow sine fields; distant
  clusters smaller. 10% seeded missing render red with a bloom halo
  that grows with piece time, capped at 26 px.
- Blocks: 34 towers (asserted count) along the horizon, near-black,
  rising from the water; depth scales size and height. 12% seeded
  missing render red with a capped bloom. A few carry one small lit
  window, the last lights of abandoned nodes. Each block mirrors
  into the water as a low-alpha reflection that wobbles.
- Water: 24 strip rects grading pale blue to deeper blue, plus 26
  seeded shimmer lines drifting on slow sines.
- Deterioration: six vertical regions carry seeded decay rates; a
  global decay parameter rises from 0.25 at frame one toward a 0.9
  cap, driving position jitter and a drift of cloud and block colors
  toward grey.

## Interaction

Watch-first, autonomous decay. Earned interaction only: tap
anywhere releases the wave sound, synthesized noise through a
lowpass filter with a slow gain swell, built lazily inside the
gesture via WebAudio (AudioContext created on first tap, never
before). Motion stays silent before the tap. A tap also sends a
pale band travelling down the water, and the hint plate border
turns red once the sound has been released. No click-to-reload
anywhere.

## Determinism

Frame one is drawn synchronously at a fixed phase, t = 8 s, from
the fixed seed 1640007. The rAF loop is anchored as that phase
plus elapsed time since load, never Date.now(). All randomness
comes from mulberry32 at build time; draw time uses only sines
of piece time. Thumb rendered twice with the QA harness:
byte-identical (md5 c310ac7b491e64d67f271ef0236a999b).

## Acceptance criteria

1. Only rectangles carry the image: sky strips, cloud rects, block
   towers, water strips and shimmer lines. No circles, no pixel art.
2. Horizon at the lower third; block towers rise from the water;
   clouds occupy the upper two thirds.
3. Depth reads as rectangle size: distant clouds and blocks smaller.
4. Red appears only on the seeded missing subset (8 of 119 agents)
   and on their blooms; no decorative red anywhere else.
5. Frame one at t = 8 s already shows the city, the clouds, decay
   and red; the t = 60 s frame shows clouds drifted and blooms
   spread, with the composition intact.
6. Watch-first: no sound, no gesture needed; tap releases the wave
   sound and the travelling water band only.
7. Title, date (2006 · 07 · 09) and hint ("Tap to release the wave
   sound.") legible at desktop, mobile and thumb sizes; title wraps
   to two lines on narrow screens.
8. Flicker safe: all motion is slow sine drift, nothing strobes.
9. Thumb re-renders byte-identical.

## Deviations from the prompt

- The desktop composition is a centred square, not a wide
  landscape frame, per the house rule for field-like pieces (full
  bleed on phones, square on desktop); the horizon still sits at
  the lower third and the clouds still occupy the upper two thirds
  inside the square.
- The wave sound is synthesized filtered noise with a slow swell,
  not a recorded wave: no audio asset is bundled with the piece.
- Lit windows are a small authored addition (a few blocks carry one
  pale window rect) to make the abandoned nodes read as a city
  rather than a bar chart; the prompt does not forbid them and they
  use the palette's pale gold, never red.

## What was avoided

No static pixel art, no decorative red, no pretty sunset without
the wreckage: the block city and its reflections are present in
every frame, and red is confined to the missing-information mask.

## QA

Rendered the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, and 720x720 for thumb.png; all three inspected.
A t = 60 s frame was rendered separately via the __probe.drawAt
hook and inspected: clouds drifted, red blooms spread, blocks
intact.

## Fix rounds

- Round 1: cloud and block rects spilled past the composition
  frame onto the page ground on desktop (a pink rect straddling
  the left edge). Fixed by clipping the whole scene (sky, clouds,
  water, blocks, shimmer, wave band) to the composition rect
  before drawing, then re-rendered all three sizes and re-verified
  the thumb byte-identical.
