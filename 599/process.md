# The Pedalboard Mass, No. 1875

SM4, PP1122, study #245 simone-massaron. Gallery date 2007 · 03 · 01.

## Spec
A dark stage floor seen from above. Each tap lays down a loop: a luminous ring
that starts small at the tap point, expands to a fixed radius over about 8
seconds, then holds, pulsing faintly with its own period. Rings overlap, stack
and decay over about 3 minutes, so the floor becomes a sediment of glowing
circles, some bright and young, some ghostly and old. A ring that fully decays
leaves a faint chalk outline that never quite disappears.

## Palette
Stage black ground (#070708) with a faint radial sheen. Ring colors cycle
through pedal-LED hues: blue #4da3ff (Chase Bliss), red #ff5252, green
#4dff88, amber #ffb84d, white #f2f2f2. Chalk outlines are near-white at low
alpha. Title and hint plates are light text on a translucent black chip.

## Motion and interaction
Tap anywhere to lay a loop, the footswitch gesture. Taps add, never clear or
reset; there is no reload gesture and no clear control. Drag does nothing.
Each ring is a looped phrase voice: a short plucked motif (three Karplus-Strong
notes from a minor pentatonic, staggered 0.22 s apart) with its own gain
envelope. Active voices are capped at 16; the oldest rings fade first and
their chalk outlines are kept. Ring pulse periods run 2.6 to 4.2 seconds,
well under the flicker limit. Reduced motion freezes pulses at the fixed
first frame; taps still add rings, already fully expanded.

## Deviations from the prompt
None material. The motif is three plucks rather than a sustained phrase, so a
single tap stays a short loop voice and voices cannot pile up into noise.
Chalk outlines are capped at 24 kept outlines so the floor cannot grow
without bound.

## QA note
Rendered the actual script with node-canvas at 1280x900, 390x844 and 720x720.
All three renders are clean on the first round, no fix rounds needed. The
seeded first frame shows three rings at distinct ages: a bright white young
ring with a soft glow, a green mid-age ring, and a ghostly grey near-chalk
ring, all clearly ring-like and overlapping. Title plate "The Pedalboard Mass"
and date "2007 · 03 · 01" are legible and unclipped on desktop and phone, and
the "Tap to lay a loop." hint is legible at the bottom on both sizes. The
720x720 thumb reads clearly at small size. First frame is deterministic:
seeded with mulberry32(1875), fixed-phase time, no Date.now or Math.random in
frame one. Audio is WebAudio only, created lazily inside the first tap
gesture, never on load.
