# No.893 Low End Brightness

Study #109 klsr.av, PP54 "The Breathing Arc", klsr.av's own statement of the method.

## Concept

One value, P, rendered three ways. The couplings are fixed and named: the low
end drives brightness, the snare drives the smear, quiet opens the piece and
noise culminates it. A single dim horizontal line breathes over a three-minute
arc: it thickens into filaments, the filaments bloom into a pale-violet smear,
and near the top of the arc the field saturates into white noise specks before
exhaling back to the line. Nothing here listens and improvises; the arc is a
score, and the visitor conducts it. Dragging right rushes P forward, dragging
left pulls it back toward the whisper. A tap is the snare: one sharp bloom. A
double-tap holds P frozen mid-breath for six seconds. A thin progression arc
with a marker at the bottom is the only furniture; there is no text.

Sound follows the same stance. The prompt is audio-first: a sub-bass drone
whose gain is literally the brightness value P, plus a noise band whose gain is
the smear. The visuals are computed from the same closed-form state that drives
the sound, never from an AnalyserNode readback, and the gallery version takes
no microphone input. Audio starts only on the first visitor gesture, from a
lazily created, typeof-guarded AudioContext.

## Construction

Single self-contained index.html, canvas 2D only, no external assets.

The P model is closed-form throughout. Base progression is a 180 s cosine
breath, P_base(u) = 0.5 - 0.5*cos(PHASE0 + 2*pi*u/180), with PHASE0 = acos(0.72)
chosen so frame one sits at exactly P = 0.14. Effective time u is real time
minus the seconds consumed by double-tap holds, so a hold freezes the arc
exactly where it caught it. Conducting is a sum of exponential kernels over the
recorded drag history: each pointermove contributes dx * 0.0016 *
exp(-age/4.0), so a fast rightward drag surges P and the surge decays with a
4 s time constant; no frame ever integrates state. Taps are recorded events
with an exp(-3.5*dt) envelope (about 0.8 s to near zero) driving the snare
flash and the smear spike. A second tap within 0.35 s converts the pending
snare into a 6 s hold instead.

Rendering is a pure function of P and t. Filament count is 1 + round(25 *
P^0.8) (26 at the top), vertical spread grows as P^1.2, core line width is
1 + 9P. The feedback bloom is analytic: three stretched ghost copies of the
filament set drawn behind in pale violet, stretch and alpha driven by the
smear value (P^2.2 plus tap spikes), with no canvas feedback, no offscreen
canvas, no gradients, no shadowBlur, no ctx.filter. Noise saturation is 1,100
seeded specks (mulberry32), each with its own appearance threshold between
0.68 and 1.0, so the field fills in gradually as P culminates. All randomness
is seeded at init; frame one is the synchronous draw(0), and no drawn state
derives from Date.now().

Sizing follows the house rules: Visual Viewport API with resize listeners on
visualViewport and window, canvas style width/height pinned in px inside
draw(), phone detection via window.screen physical size (min dimension under
700 px) with the h > w*1.15 aspect fallback only. On phones the composition
goes full-bleed (zero side margin); on desktop the band is inset. Page ground
is the piece's own #050505.

Palette is strict: ground #050505, line #E8E8E0, filament #8A8A86, bloom
#B8A9FF, noise #FFFFFF. No visible text except the title element.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js (node-canvas harness:
  no requestAnimationFrame, no AudioContext, no Date-dependent state). The
  piece draws frame one synchronously and renders cleanly in silence.
- qa-desktop.png (1280x900): near-black field, pale dim core line at centre
  already thickening into a handful of grey filaments with a faint violet
  bloom halo, thin progression arc low in the frame with its marker about
  14 percent along. Nothing clipped.
- qa-mobile.png (390x844): phone path taken, composition full-bleed, line and
  filaments centred, arc and marker inside the frame. Nothing clipped.
- thumb.png (720x720) rendered twice and byte-compared with cmp: identical.
  Duplicate render deleted.
- One tuning round after the first read-back: the opening frame was too dim
  and the filaments indistinguishable, so filament count/spread curves were
  steepened at low P, base brightness raised, and the bloom ghosts given a
  small always-on halo floor. Re-rendered all three sizes; determinism
  byte-compare re-run and identical.

## Deviations

- Sibling note: No.885 (PP46, bnsh_av's study) implements the same KLSR arc
  method from another artist's absorption of it. This piece is built from
  PP54's own text only. The load-bearing difference is honoured literally:
  PP54 has no autonomous snare schedule, so snare blooms here come only from
  visitor taps; No.885's scheduled accents are not carried over.
- The prompt's audio-first method names live audio as the source. In the
  gallery, pieces carry no microphone input (house rule), so the arc runs
  from the same closed-form state that drives the optional WebAudio drone and
  noise band; the coupling (one value, three renderings, gain equals
  brightness) is preserved exactly, only the signal source is the score
  itself rather than a mic feed.
- The smear is analytic stretched ghosts rather than literal framebuffer
  feedback, per the renderer limits (no readback, determinism gate).
