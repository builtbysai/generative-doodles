# No.840 "Ostrich Tuning" (EXPANSION #103 lou-reed, PP1)

## Concept

Lou Reed's 1964/65 Pickwick novelty "The Ostrich" was played on a guitar with
every string tuned to the same note, D: the ostrich tuning, one pitch class
beating against itself. The piece is six horizontal strings across a
near-black field, all at one fundamental, each micro-detuned by a fixed ratio
(1.000, 1.001, 0.999, 1.002, 1.0005, 0.9985). No guitar body, no neck, no
frets, no hands, no second pitch class, no sound, no interaction. Watch-only:
the tuning is the piece, and no gesture bends anything.

Where the six waves interact, their pairwise interference shows as slow
silver shimmer bands sliding along the strings. The 30-second loop runs:
strike (0-3 s), detune drift with traveling bands (3-24 s), settle toward
near-unison (24-28 s), soft fade (28-30 s), then wraps to the strike.

Palette, strict: background #08080A, strings #D8D8DC, interference #E8E8EC.
Frame one is the strike moment, loop t = 0: all six strings at full clean
amplitude, detune strength at zero, shimmer just beginning to form.

## Construction

Single self-contained index.html, canvas 2D only, no external assets.
Canvas size comes from the Visual Viewport API with resize listeners on both
visualViewport and window; draw() pins canvas.style.width/height in px every
frame. Phone detection uses window.screen physical size (min dimension
< 700 px) with the aspect fallback h > w * 1.15 only when screen reports
nothing; phones get a slightly larger vibration amplitude. Strings span the
full width at every size, evenly spaced across a center-weighted band
(19% to 81% of height). Page ground is the background tone.

Each string is drawn as a segmented sine polyline (6 cycles across the
width). Everything is a closed-form function of loop time u = t mod 30;
nothing is integrated frame to frame and frame one never derives from
Date.now(). The synchronous first draw is draw(0); the rAF loop (typeof
guarded) is anchored to performance.now() at load.

Detune model: a strength envelope s(u) shapes the whole loop: smoothstep
ramp 0 to 1 over 0-3 s, held at 1 through the drift, smoothstep ease from 1
down to a 0.15 residual over 24-28 s (the settle toward near-unison), held
through the fade. Each string's temporal phase includes the closed-form
integral D(u) = integral of s over the loop, so detune phase accumulates
exactly and repeatably: phase_i = 2*pi*(F0*u + F0*(ratio_i - 1)*40*D(u)),
with F0 = 0.55 cycles per second.

Interference model: at each sample point, brightness is the mean pairwise
phase alignment of the string against the other five,
align = mean over j of cos^2((phase_i(x) - phase_j(x)) / 2), raised to the
second power and scaled by (0.2 + 0.8 * s(u)); the segment color is the mix
of the two palette greys by that value and alpha rises 0.82 to 1.0 with it.
So the bands are computed from the interference term itself, not decorated.
Amplitude envelope: full from the strike, held, then a smoothstep fade to
0.3 over 28-30 s; the wrap back to u = 0 is the next strike.

Recorded choices and deviations:

- Spatial detune is exaggerated: the spatial phase uses (1 + (ratio-1)*48).
  At the true ratios the pairwise spatial phase difference totals under
  0.08 rad across the whole width, so the "bands" would be one whole-string
  brightness pulse with nothing sliding along the string. The x48 spatial
  factor resolves the same beat math into visible bands along each string
  while the drawn waveform keeps the single shared cycle count, so the
  field still reads as one pitch. The temporal detune that drives the
  bands' travel stays at the prompt's ratios.
- The settle phase eases the detune accumulation rate and the shimmer
  contrast rather than re-tuning each string's ratio along separate
  curves; visually the bands slow, widen, and quiet as the field approaches
  unison, which is the specced behavior.
- The prompt's strike phase (0-3 s) is realized as the shimmer forming at
  full amplitude rather than an amplitude ramp, because the anchor spec for
  this build fixes frame one at full clean amplitude.
- A ?seed=<seconds> query freezes the loop at that time; it exists for QA
  renders only and changes nothing in normal viewing.

No gradients, no shadowBlur, no ctx.filter, no offscreen canvas, no audio,
no microphone, no visible text besides the title.

## QA log

Renderer: node ~/workspace/tools/render-piece.js (node-canvas, no rAF, no
AudioContext). The piece rendered cleanly in silence at all sizes; both
resize listeners registered (vv:resize, win:resize).

- qa-desktop.png (1280x900, t=0): six bright horizontal wavy strings evenly
  spaced on near-black, full width, full clean amplitude, no shimmer yet,
  nothing clipped.
- qa-mobile.png (390x844, t=0): same six strings spanning the full width in
  the tall frame, nothing clipped.
- thumb.png (720x720, t=0): same strike frame at gallery size.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical.
- Mid-drift throwaway (720x720 at loop t=14 via ?seed=14, read back, then
  deleted): strings mid-drift with subtle brighter shimmer patches sitting
  at different positions along different strings; a second throwaway at
  t=20 differed from t=14, confirming the bands travel. A t=29 settle/fade
  throwaway was also rendered during tuning and deleted.
- Tuning pass: the first mid-drift render showed no resolvable bands along
  the strings (whole-string pulse only, the palette greys being just 16
  steps apart). Fixed with the x48 spatial detune factor and a softer
  brightness curve (align^2), then all renders were redone and the
  byte-compare re-run green.
