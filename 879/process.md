# No.879 "9,500 Kilometers"

Study #107 xu-jared, PP40 "Telematic Loop". Two stages in one square answer each
other across a fixed 4 second delay: Taipei on the left, warm, dense and humid;
Switzerland on the right, cold, sparse and thin. Neither side leads and neither
side wins. The piece is the answering.

## Concept

The frame is split by a faint vertical seam. The left half is a field of dense
amber motes drifting like humid night weather over warm dark. The right half is
a sparse set of ice-blue filaments drifting in cold dark. A signal loop runs
between them: a bright white pulse with a halo of its home side's colour leaves
one stage, travels visibly across the seam for exactly 4 seconds, and arrives
changed. Warmth arrives in Switzerland cooled and thinned; cold arrives in
Taipei warmed and densified. The delay is never shortened, because the distance
is the instrument. There is no map, no globe and no readout: the seam and the
4 seconds carry the whole meaning.

The exchange never needs the visitor. An autonomous conversation runs on a slow
seeded cadence, and arrivals usually draw an answer from the far side after a
short dwell, so the loop keeps talking and never closes cleanly. The visitor is
a performer on either stage: drag on a side to play that side's voice into the
loop, tap for one struck pulse, double-tap to hold both stages silent for a
3 second breath while in-flight pulses finish their journeys in the dim.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets.
- Fields are seeded closed-form drift systems (mulberry32): 150 Taipei motes
  with sinusoidal wander and occasional halo discs, 26 Swiss filaments drawn as
  bowed 4-point strokes with slow angle wander. Positions are pure functions of
  piece time, so frame one is a developed frame, not a first instant.
- Pulse model: every pulse is an event record (emission time, origin side,
  origin point, arrival point, seed). Position is a closed-form blend of linear
  and smoothstep easing over the fixed 4.0 s travel; a small sine arc keeps the
  journey from looking mechanical. The pulse brightens what it crosses through
  layered flat-alpha halo discs, lights the seam segment at its crossing
  height, and leaves a short fading trail.
- Transformation model: on arrival, parameters are derived deterministically
  from the pulse's own seed (a fresh mulberry32 stream per pulse). Arrival in
  Switzerland produces a fading ice flare ring plus 2 to 3 new cold filaments
  that grow and drift near the arrival point for about 7 s. Arrival in Taipei
  produces a fading amber flare ring plus a burst of 10 to 14 warm motes on
  decelerating closed-form paths over about 5 s.
- Autonomous schedule: an initial pulse is emitted from Taipei at t = -2.0 s so
  frame one catches it mid-crossing. Further autonomous pulses are precomputed
  at load on a 14 to 22 s cadence, alternating sides, out to one hour. Answers
  are decided when an arrival is crossed in the frame loop: with seeded
  probability 0.62 the far side answers after a 2 to 4.5 s dwell.
- Interaction: drags inject a pulse at most once per 0.8 s while the pointer
  moves; taps are held 0.33 s so a second tap can convert them into the
  double-tap silence instead (recorded deviation: a struck tap sounds and shows
  a third of a second late, the standard cost of telling tap from double-tap
  without a settings surface). During a silence both fields and the seam dim to
  near black over 0.4 s, hold for 3 s, and return over 0.6 s; pulses keep
  travelling at reduced alpha.
- Sizing: canvas size comes from the Visual Viewport API with resize listeners
  on both visualViewport and window, and draw() pins the canvas style width and
  height in px every frame. Phone detection uses window.screen's physical size
  (min dimension under 700px), with aspect h > w*1.15 as fallback only; phones
  get slightly larger motes and thicker filaments.
- Audio: nothing sounds before the first gesture. On the first pointerdown a
  lazy, typeof-guarded AudioContext is built: a looped noise bed lowpassed to
  a warm Taipei murmur, and a real DelayNode set to exactly 4.0 s whose
  feedback path runs through a 950 Hz lowpass at gain 0.34, so signals thin as
  they recirculate, under a compressor acting as a limiter. Cold and warm
  return taps (highpass 2000 Hz, lowpass 480 Hz) feed the two sides back to the
  master. Pulse emissions and arrivals add quiet tones (warm triangle leaving
  Taipei, high sine pings arriving in Switzerland, and the reverse pair), so
  the delay line is played by the same events the eyes see.
- Visual-schedule note (honest record): the visuals run on the piece's own
  pulse event schedule, not on samples read back from the audio delay. The
  renderer's harness has no AudioContext and no analyser, and frame one must
  exist in silence; the audio delay is a real 4.0 s DelayNode built to the same
  constant, so ear and eye agree on the distance even though they are driven in
  parallel rather than one from the other.
- Determinism: frame one is the synchronous draw(0), with the initial pulse
  anchored at t = -2.0 s. No wall clock, no live randomness, no gradients, no
  shadowBlur, no offscreen canvas anywhere; every random-looking value comes
  from a seeded mulberry32 stream.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png). The piece
  rendered complete and clean in total silence, as the harness provides no
  AudioContext and no requestAnimationFrame.
- Determinism gate: thumb.png rendered twice and compared with cmp:
  byte-identical. Verified again after a comment wording change (wording only,
  render unchanged): still byte-identical. Duplicate renders deleted.
- Desktop and thumb read-back: left half warm and dense with amber motes over
  #1A1410, right half cold and sparse with ice filaments over #0E1418, faint
  centre seam, one bright white pulse with amber glow just past the seam at mid
  height, mid-crossing toward Switzerland, trail dots behind it in Taipei, seam
  visibly lit around the pulse. As specced.
- Mobile read-back: phone path taken, seam centred, both fields and the pulse
  intact, nothing clipped.
- Banned-API scan: no wall-clock calls, no unseeded randomness, no gradient,
  shadow or offscreen calls in the file.
