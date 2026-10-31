# No.885 "How the Music Looks"

Study #108 bnsh_av, PP46 "The KLSR Line". The KLSR method performed live: audio first, visuals that look how the music sounds, under fixed coupling rules (low end drives brightness, the snare controls feedback), progressing from a subtle opening to a culmination of noise.

## Concept

One parameter P (0 to 1) is the whole composition. At P near 0 a single dim pale line breathes at the center of a quiet black field. As P rises the line separates into grey filaments, the filaments bloom into a field tinted pale violet near the culmination, and at P near 1 the field saturates into white noise grain. Untouched, the piece breathes through one slow autonomous arc (about 90 s up, about 90 s down) but never plays a fixed timeline: a horizontal drag conducts the arc, with inertia, so a flick rushes the piece toward noise or pulls it back to the whispering line. A tap strikes the snare and spikes the feedback, ghosting echoes of the strands for about two seconds. A double-tap holds the breath, freezing P exactly for six seconds. A thin unlabeled arc at the bottom carries a marker at P; there are no words anywhere. The quiet line is given the same care as the noise: the arc needs both ends.

## Construction

P model (all closed-form in recorded events and t; frame one is the synchronous draw at t = 0):

- Autonomous arc: P_auto(t) = 0.5 * (1 - cos(2 pi (t + 22) / 180)), a 180 s cosine cycle phase-set so P(0) = 0.14 with the piece already in its build.
- Conductor offset: a list of approach segments {t0, o0, target, tau}; offsetAt(t) evaluates the latest segment analytically as target + (o0 - target) * exp(-(t - t0)/tau). During a drag each move pushes a segment aiming the total P at the grab point plus drag distance over 60 percent of the width. On release the flick velocity becomes an approach segment toward its asymptote (tau 1.6 s), followed by a precomputed segment that eases the offset back to 0 over about 22 s so the piece resumes its own arc. P is clamped to [0,1].
- Holds: a double-tap records {t0, t1 = t0 + 6, value}; P returns the frozen value inside the window and blends back to the underlying value over 1 s after it.
- Feedback F(t): the sum of decaying exponentials (tau 0.8 s) over recorded tap events plus an autonomous snare schedule (first at 6 s, then every 9 s with seeded jitter, amplitude scaled by P). The audio plays its snare bursts on exactly this schedule, so the snare that spikes the visual feedback is the snare you hear (the KLSR rule, kept literal). F drives analytic ghost copies of the strand field at vertical offsets, never canvas self-feedback.
- Low end L(t) = clamp01((0.30 + 0.70 P) * (0.78 + 0.22 sin(2 pi t / 7.3))): one shared envelope. It sets the global visual brightness multiplier and, in the browser, the drone gain node, so brightness and low end are the same signal in both senses.

Rendering: 44 seeded strands (30 on phones), each a horizontal wave with its own spatial frequency, rate, phase, amplitude, and a center-bunched offset; strand i separates from the line as P passes its activation threshold i/44 * 0.92 with a smooth ramp, and the field spread grows as H * (0.02 + 0.38 * P^0.8). Filament color mixes grey toward bloom violet between P 0.65 and 0.95 and toward white at saturation; the main strand mixes from line pale toward white. Grain appears above P 0.62, seeded per frame index (mulberry32 keyed to floor(t * 24)) so it shimmers deterministically. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas. Canvas sized from the Visual Viewport API with resize listeners on visualViewport and window, style pinned in px inside draw(), phone detection from window.screen physical size with aspect fallback only.

Audio (browser only, lazy, typeof-guarded, started on the first pointer gesture): two detuned 54 Hz sines through a lowpass feed a gain driven by L(t); a looped seeded-noise buffer through a bandpass is the granular shimmer, gain following P squared plus F; snare bursts (bandpassed noise) fire on the shared schedule and from taps, routed into a delay feedback loop whose feedback gain follows F(t); everything passes a compressor limiter, so the quiet opening is genuinely quiet and the culmination is full but capped. The piece renders complete in total silence in the QA harness.

Interaction summary: drag horizontally conducts P (right toward noise, left toward quiet) with inertia; tap (deferred 0.32 s for double-tap disambiguation, the house pattern) strikes the snare; double-tap freezes P for 6 s. Never click-to-reload.

QA hook: the renderer passes ?seed=<value>; a value in (0,1] forces a constant P for still renders only. The live page is never given this parameter. It exists so the culmination can be verified in a still frame, the same route used by earlier pieces in this study run.

## QA log

- Renders via node ~/workspace/tools/render-piece.js: qa-desktop.png 1280x900, qa-mobile.png 390x844, thumb.png 720x720. Script runs cleanly in the harness (no AudioContext, no requestAnimationFrame) in total silence.
- Determinism: thumb.png rendered twice and cmp byte-compared identical; re-verified after the fix round below. No Date.now or Math.random anywhere; grep scan clean for shadowBlur, gradients, ctx.filter, offscreen canvas, and em dashes.
- Frame one read-back (all three sizes): quiet black #050505 field; the pale main line breathing at center with the first few grey filaments separated and weaving around it; the thin grey progression arc along the bottom with its marker just off the quiet end; nothing clipped on mobile (phone path, 30 strands).
- Culmination check: a throwaway still at forced P = 0.9 showed the full violet filament field blooming across the middle band, the main strand whitened, white grain over the whole frame, and the arc marker near the noise end. Pixel scan confirmed 45,306 violet-dominant pixels. Throwaway deleted after the check.
- Fix round during QA: the first renders showed only the main line at both low and high P. Root cause: the color mixer returned a CSS string, and the nested mix for filaments indexed that string as if it were an [r,g,b] array, producing rgb(NaN,NaN,NaN), which the canvas silently ignored. The mixer now returns arrays end to end with a single stringify step at assignment. In the same round the low-P spread was widened (H * (0.02 + 0.38 * P^0.8)) and filament base alpha raised, so frame one shows the line with filaments visibly separating rather than merged into it. All renders redone and the byte-compare re-run green.

## Deviations

- None from the prompt's substance. Two recorded choices: the double-tap hold starts 0.32 s after the tap (the disambiguation deferral) and P blends back over 1 s when the hold releases, rather than stepping, so the resume does not cut; and the ?seed= QA hook described above, which only affects still verification renders and is never present on the live page.
