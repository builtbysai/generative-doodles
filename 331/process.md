# No.830 Outside the Dream

EXPANSION #101 tony-conrad, PP7. After Conrad's 1972/73 album with Faust:
violin drones over a relentless steady pulse. The music is interference,
and the picture is the interference measured, not decorated.

## Concept

Four sine oscillators hold near-identical pitches around 110 Hz. Where two
of them differ by a fraction of a hertz, the pair beats: it swells, cancels,
and swells again over seconds. Each of the six pairwise combinations gets
one concentric ring. The ring's radius breathes at that pair's beat rate and
its brightness peaks at the moment of reinforcement, so the standing-wave
arcs are drawn from the actual phase differences of the oscillators, the
same numbers that drive the sounding oscillators in a browser. A thin
metronome bar along the bottom carries Faust's pulse as a brass marker,
present but silent until switched on.

## Construction

Drone state, all closed-form:

- Fundamental 110 Hz; resting offsets OFFS = [0, +0.5, -1.2, +2.0] Hz.
- Six pairs, innermost ring first: (0,1), (1,2), (0,2), (1,3), (0,3), (2,3).
  Resting beat rates |off_i - off_j|: 0.5, 1.7, 1.2, 1.5, 2.0, 3.2 Hz, all
  inside the specced 0.5 to 4 Hz band.
- A SPREAD factor scales all offsets together: 1 at rest, widened by
  horizontal drag, settling back toward 1 on release. Spread is a recorded
  list of piecewise-linear control points {t, s}; the oscillator phase
  phase_i(t) = 110*t + off_i * S(t), where S(t) is the exact trapezoid
  integral of the spread list, is a closed-form function of the recorded
  events and t. Nothing is accumulated frame by frame.
- Pair phase difference dphi = (off_i - off_j) * S(t) cycles. Reinforcement
  = 0.5 + 0.5*cos(2*pi*dphi): brightness = base ring in #D8D8DC at alpha
  0.10 + 0.30*reinforcement, plus a travelling highlight arc in #8A8A90
  (alpha 0.10 + 0.42*reinforcement, angular position advancing once per
  beat cycle, length growing with reinforcement). Radius = base *
  (1 + 0.055*sin(2*pi*dphi)); the sine puts frame one (dphi = 0) exactly at
  the mid radius while brightness sits at reinforcement, as framed in the
  brief.
- Drag: on pointermove, target spread = clamp(0.15 + |dx| / (0.45*W) *
  3.4, 0.15, 3.6), pushed as a control point when it changes by more than
  0.04. On release, the settle is sampled into control points from
  s(tau) = 1 + (s0 - 1) * exp(-tau / 1.6) at tau = 0.3, 0.8, 1.5, 2.5, 4,
  6.5 s, plus an exact return to 1 at +9 s.

Audio gating (the study's global rule: sound starts on first tap only):

- The AudioContext is created lazily inside the first pointerdown,
  typeof-guarded (webkit prefix covered, wrapped in try/catch). The QA
  renderer has no AudioContext; the piece renders and animates there in
  silence, which frame one specifies.
- Four real OscillatorNodes (sine) through one modest gain (0.05) into a
  DynamicsCompressor limiter. Every frame sets each oscillator's frequency
  from the same closed-form state, FUND + off_i * spread(t), so what sounds
  and what is drawn are the one state.
- Tap toggles the Faust pulse. The first tap is also the first gesture, so
  it starts the audio and switches the pulse on together; later taps switch
  the pulse alone. While on, the marker sweeps the bar at 2 Hz and each
  beat boundary fires a filtered click (square osc through a 1400 Hz
  bandpass, 45 ms envelope, peak gain 0.11 into the destination).

House mechanics: canvas sized from the Visual Viewport API with resize
listeners on visualViewport and window; canvas.style width/height pinned
in px inside draw(); phone detection via window.screen minimum dimension
under 700 px, aspect fallback; rAF typeof-guarded after the synchronous
frame one; no gradients, no shadowBlur, no ctx.filter, no offscreen
canvas; palette strict (#0B0B0D, #D8D8DC, #8A8A90, #C9A227); no visible
text beyond the title.

## QA log

- Rendered with render-piece.js at 1280x900, 390x844, 720x720 in the
  silent renderer (no AudioContext): no errors, all pointer and resize
  listeners registered.
- Determinism: thumb.png rendered twice, cmp byte-identical; duplicate
  deleted. Frame one is the synchronous draw(0): rest spread 1, all beat
  phases 0, arcs at mid radii concentric at the center of generous
  darkness, pulse off, brass marker resting at the bar's left end.
- Desktop and thumb read back: six pale concentric rings centered, the
  left-hand highlight arcs (frame one's beat position, offset a quarter
  cycle so they land on the horizontal) reading slightly brighter where
  the arcs reinforce; thin grey metronome bar along the bottom with the
  small brass tick and pointer at its left end. Mobile (first pass, same
  layout code): rings centered and whole in the tall frame, bar and
  marker intact, nothing clipped.
- Deviation: none from the brief. One framing choice, recorded above:
  radius modulation uses sin(2*pi*dphi) so that frame one, at beat phase
  0, shows the arcs at their mid radius exactly as the brief's frame-one
  spec states, while brightness uses the cosine reinforcement and peaks
  at phase 0.
