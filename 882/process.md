# No.882 "Oscilloscope Music"
Study #108 bnsh_av, PP43 "N-Spheres" (after Jerobeam Fenderson's oscilloscope music: the audio's left and right channels drawn as X and Y, so the sound IS the picture).

## Concept
Seven white spheres orbit a common center on a black scope. Sphere i sits at
(sin(phi1 + off_i), sin(phi2 + off_i * 1.618)), with off_i spread evenly over
the circle. The two phases come from two oscillators whose frequency ratio
drifts slowly among simple harmonics (3:2 at the open, then 5:4, 4:3, 2:1 and
neighbours), so the spheres bunch and spread and draw Lissajous rosettes and
knots that never quite repeat. Each sphere trails its last 240 positions over
8 seconds, a grey phosphor persistence. A small readout at the bottom edge
shows the current ratio: the number is the honesty, it tells you what you are
hearing. There is nothing else on the scope: no background, no decoration, no
color.

## Construction
- One source of truth. A single ratio function ratio(t) and a single phase
  state drive both senses. phi1(t) = 2*pi*VF1*t plus tap jumps; phi2(t) =
  2*pi*VF1 * (integral of ratio) plus the drag phase offset and the same tap
  jumps. The picture samples these phases directly; the two audio
  OscillatorNodes are set to AF1 and AF1 * ratio(t) every frame. What moves
  is what sounds; there is no second, decoupled visual system.
- Rate scaling (recorded honestly, the No.864 approach). The audio base is
  55 Hz (A1). No eye can watch a 55 Hz Lissajous, so the visual phase
  advances at the fixed proportional rate VF1 = 0.30 Hz, a scale factor of
  55 / 0.30 applied to the same ratio and the same phase events. The ratio,
  the detune gestures, the locks and the strikes are identical in both
  domains; only the clock rate differs, by a constant.
- Analytic ratio timeline. ratio(t) is built from segments, each with a
  closed-form value and integral: holds at a harmonic, 6 s smoothstep eases
  between harmonics, drag segments (piecewise linear over recorded pointer
  samples), 4 s relax eases back to the nearest harmonic after a release, and
  10 s lock segments. A slow two-sine wander (periods 47 s and 23.3 s,
  combined amplitude 0.055, zero at t = 0) rides on holds and eases so the
  figure never exactly repeats; it is suppressed inside drag and lock
  segments so the hand's value and the locked value are exact. The
  autonomous schedule (which harmonic next, how long to hold) is hashed from
  (epoch, step) counters, so the whole timeline is a pure function of the
  recorded event list. Phases for any t, past or present, integrate the
  segments analytically; trails simply evaluate the same position function
  at t - k * (8/239) for k = 0..239, which is why frame one opens with the
  trails already developed. No canvas feedback, no stored frame history.
- Interaction. Drag horizontally detunes: x maps exponentially to a ratio
  of 0.5..4.0; drag vertically sets the y phase offset (rosettes rotate and
  knot), recorded as breakpoints and interpolated. Release relaxes the ratio
  to the nearest simple harmonic over about 4 s. Tap is a strike: both
  phases jump by a golden-angle step (a new shared phase) and a short ping
  sounds at twice the current second channel. Double-tap locks the ratio
  exactly where it is for 10 s (wander suppressed, readout steady), then the
  drift resumes. Taps are held up to 0.32 s so a second tap can convert them
  into the double-tap lock; the strike's phase jump is timestamped at the
  tap itself, so the picture stays honest even though the confirmation waits
  a beat (the established house disambiguation cost).
- Audio. Lazy and typeof-guarded, created on the first pointerdown, never
  automatic. Two sine oscillators at 55 Hz and 55 * ratio(t), panned left
  and right, through a slow 0.07 Hz amplitude LFO and a DynamicsCompressor
  used as a modest limiter, master gain 0.16. One recorded asymmetry: the
  vertical drag's phase offset is applied to the visual y-phase only. A
  free-running WebAudio oscillator's absolute phase cannot be set, so the
  offset has no direct audible counterpart; the audible coupling is the
  ratio itself, which is shared exactly. Rather than fake a phase control,
  the offset stays visual and the limitation is written down here.
- House rules. Canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas pinned in px inside draw();
  phone detection via window.screen (min dimension < 700 px) with the
  h > w * 1.15 aspect fallback, scope radius widening slightly on phones;
  seeded mulberry32; no gradients, no shadowBlur, no ctx.filter, no
  offscreen canvas, no Date.now anywhere; frame one is the synchronous
  draw(0), ratio exactly 3:2 because the wander is zero at t = 0. The only
  visible text is the ratio readout and the title. The connecting lines join
  consecutive spheres and close the ring (sphere 7 back to sphere 1), which
  is how the n-sphere figures read as one body.

## QA log
- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). The piece
  rendered complete and silent in the harness: no AudioContext exists there,
  and no drawn state depends on one.
- Determinism gate: thumb.png rendered twice and cmp byte-compared
  IDENTICAL; the duplicate was deleted.
- Read-back, desktop and thumb: pure black scope; seven white spheres
  spread through a woven 3:2 Lissajous figure, joined by the white ring;
  grey trails layered into the rosette's weave, densest where the paths
  cross; readout "3:2" in small grey monospace at the bottom center.
- Read-back, mobile (390 wide, phone path): the same figure centered in the
  tall frame at the widened radius, spheres and trails whole, readout
  visible at the bottom, nothing clipped.
- Deviations from the prompt text, all recorded above: the visual clock
  runs at a fixed proportional rate to the audio clock (55 Hz cannot be
  watched); the trail is evaluated closed-form at past times rather than
  stored in a literal ring buffer (same 240 positions, same 8 s span, and
  it is what lets frame one open developed); the phase offset is visual-only
  (oscillator phase is not settable); taps confirm up to 0.32 s late for
  double-tap disambiguation while keeping the tap's own timestamp.
