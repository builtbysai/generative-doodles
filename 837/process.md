# No.837 "Gothic Hypnosis"

EXPANSION #102 john-cale, PP6 "Marble Index". Shipped title is the prompt's
Title suggestion. Cale's production of Nico's Marble Index: her harmonium
drone as the ground, his orchestrations built over it not to support but to
contrast, coaxing, soothing, and fighting the drone by turns.

## Concept

A low, wide drone band (the harmonium) fills the lower third and never
stops. Above a thin divider line, three counter-figures hold the upper
field: a viola arc (a long bowed curve), a piano shard (an angular
polygon), and an organ haze (a stack of soft layered ellipses). Their
relationship to the drone is governed by one continuous attitude
parameter: COAX (figures hug the divider and sway with the drone's
breathing), SOOTHE (figures rise and widen into slow violet curves),
CONTRAST (figures rotate into diagonal cuts, flush ember, and stab toward
the band in short pulses). The attitude drifts on its own over a 90-second
cycle; a horizontal drag grabs it; a double-tap reseeds the figures'
shapes. The figures are attitudes, never melodies. Nothing is pretty:
the palette is wood, violet, grey, ember, and black.

## Construction

- Palette strict: ground #0C0A08, harmonium wood #4A3226, funereal violet
  #3E2A4A, eulogy grey #7A746A, contrast ember #B3452B. Every other tone
  is a mix of these. The mix helper parses both hex and rgb() strings, so
  mixes of mixes are safe (see QA log).
- Attitude model: a = attitudeAt(t), a closed-form function of a recorded
  segment list. Free segments are a triangle wave over 90 s
  (a = 2*tri((t-t0)/90 + phase)); the initial segment has phase 0.15, so
  frame one sits at a = 0.6, rising, between coax and soothe. A drag
  records a segment of (dt, a) samples with a mapped from pointer x
  (x/W*2, clamped 0..2); on release a new free segment is anchored with
  the phase that reproduces the released value on the drift direction the
  piece had when grabbed, so the drift resumes seamlessly. Weights
  w0 = clamp(1-a), w2 = clamp(a-1), w1 = 1-w0-w2 drive every figure rule.
- Drone band: wood base, ten strata darkening downward with a slow
  13 s shimmer, a 19 s light travelling across 26 vertical slices, and a
  7 s breathing wash (dp). The divider is a 2 px grey-wood line; under
  contrast it takes an ember glint pulsing with the stab clock.
- Viola arc: a quadratic bezier sampled at 28 points, drawn as a wide
  low-alpha under-stroke plus a main stroke. Coax: sways on the drone's
  7 s phase. Soothe: widens (span and bow x1.3), rises, sways on an 11 s
  phase, violet deepens. Contrast: rotates -0.38 rad, color mixes 75%
  toward ember, and every second sampled segment is redrawn as an ember
  dash offset toward the band by a cubic stab pulse (2.2 Hz attack clock).
- Piano shard: a seeded 5-6 point polygon. Soothe adds a soft violet
  underlay at 1.18x scale. Contrast elongates it (scale 1.5 x 0.75 in its
  rotated frame), rotates it, mixes its fill 80% toward ember, and drops
  three short ember stab strokes from its underside toward the band.
- Organ haze: seven seeded ellipses, layered flat alpha. Coax squashes it
  to 0.55 height against the divider; soothe grows it 1.35x and deepens
  the violet; contrast stretches it diagonally (scale 1.4 x 0.7, rotated
  0.5 rad), tints the top two blobs toward ember, and quantizes its alpha
  with a stepped 3 Hz flicker hash.
- Figure shapes come from mulberry32(837001 + generation*104729);
  a double-tap (two downs within 320 ms and 44 px) increments the
  generation and rebuilds them. Poses are pure functions of (a, t, shape).
- Sound, first tap only: the AudioContext is created lazily inside the
  first pointer gesture, typeof-guarded (webkit prefix covered, failure
  safe). Drone: two sawtooth oscillators at 55 Hz and 55 Hz x1.0145
  through a 300 Hz lowpass at gain 0.045, always on once started, through
  a compressor limiter. Figure tones are scheduled from a seeded interval
  stream (2.5-6 s apart): attitude under 0.7 plays the drone pitch
  (triangle, soft); under 1.5 plays a soft sine interval (1, 5/4, or 3/2
  over 110 Hz); above that, a 0.13 s tritone sawtooth stab. The QA
  renderer has no AudioContext, so the piece runs and renders in silence.
- Sizing: Visual Viewport API with resize listeners on visualViewport
  and window; canvas style pinned to W x H px in draw(); phone detection
  via window.screen (min dimension < 700) with aspect fallback. The band
  stays at the lower third at every size.

## QA log

- Renders: qa-desktop.png 1280x900, qa-mobile.png 390x844, thumb.png
  720x720, all from node ~/workspace/tools/render-piece.js.
- Determinism: thumb.png rendered twice and cmp byte-compared identical;
  the duplicate was deleted. Frame one is the synchronous draw(0) at
  attitude 0.6; no Date.now anywhere, no Math.random.
- First read-back caught a real defect: the viola arc was entirely
  missing from the frame (pixel scan of its zone: max red channel 29,
  i.e. only the violet wash). Root cause: mix() was fed the rgb() string
  output of an inner mix() and parsed it as hex, producing rgb(NaN,NaN,NaN);
  the invalid strokeStyle assignment was silently ignored and the arc
  stroked in the leftover default black. The same defect touched the
  shard fill and the haze ember tint. Fix: the color parser now accepts
  both "#RRGGBB" and "rgb(r,g,b)". A forced-red debug render confirmed
  the arc geometry was correct before the fix; after the fix the arc
  zone measures 4,172 pixels above the threshold and all renders were
  redone.
- Haze legibility: blob alpha raised from 0.055+0.02*dp to 0.075+0.03*dp
  so the organ haze reads as a distinct third figure beside the arc and
  shard without leaving the palette.
- Final read-backs: desktop and thumb show the wood drone band across
  the lower third with its divider line, the long grey-violet viola arc
  sweeping the upper field, the violet organ haze stacked center-right,
  and the violet piano shard at the right; nothing clipped. Mobile holds
  the same composition in the tall frame, the arc's left endpoint just
  inside the edge.
- Contrast throwaway (patched copy with drift phase 0.5, attitude exactly
  2 at t=0; rendered, read, deleted): the arc becomes a diagonal ember
  slash with ember stab dashes along it, the shard elongates ember-red
  with three stab strokes reaching the divider, the haze stretches
  diagonally with ember-tinted top blobs, and the divider glints ember.
  The band is drawn after the figures, so stabs that overshoot the
  divider are covered by the wood: the figures stab at the band, never
  into it.
- Audio cannot be exercised in the QA renderer (no AudioContext); the
  guard paths render the full piece in silence at all three sizes.

## Deviations

- None from the prompt's substance. Two recorded choices: the attitude
  drift is a symmetric triangle wave (coax to contrast and back over
  90 s) rather than a one-way cycle, so no attitude is ever a climax the
  piece parks on; and the drag maps pointer x absolutely across the
  attitude range (left edge coax, right edge contrast) instead of a
  relative scrub, so the grabbed attitude is always where the hand is.
