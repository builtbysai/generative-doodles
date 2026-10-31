# No.887 "The Board Is Listening"

Study #108 bnsh_av, PP48 "Signal to Light". His artist statement made literal: a transducer that turns signals into light. One particle field, three nervous systems, and a panel that shows the actual control signals becoming the light.

## Concept

The top 70 percent of the frame is a single field of about 400 pale particles. The bottom 30 percent is the board: three labeled trace strips, STICK (ice #7FD8E8), BRAIN (magenta #FF2E88), SOUND (amber #FFB000), each drawing a scrolling trace of its input's live control value. Exactly one input is active at a time (or all three at once after a double-tap), and the field's character is that input's character:

- STICK steers: particles converge smoothly toward a control point with inertia.
- BRAIN bursts: the field stutters and blooms in erratic impulse pulses around a wandering bloom center.
- SOUND pulses: the field breathes radially on a beat envelope.

There is no brain imagery anywhere. The erratic magenta trace is the brain; the board is listening, and the traces never lie, because they are drawn from the same control values that move the field and set the audio gains.

## Construction

One source of truth: `controlAt(t)` returns the full control state (input weights, stick point, brain envelope, sound envelope) as a closed-form function of t and the recorded event lists. The field forces, the trace sampler and the audio updater all read it; nothing has a private copy of the signal.

- Weights: taps on a strip append a morph segment; `weightsAt(t)` eases between recorded from/to weight triples over 2 s with a smootherstep, so switching inputs is a crossfade of forces, not a cut. Initial state: STICK at weight 1.
- STICK control: an autonomous wander, two detuned sine pairs per axis. A drag while STICK is engaged records a path segment; the control point interpolates the samples during the drag, then blends back to the wander over 1.6 s after release. Field force: each particle is pulled toward the point with a gaussian falloff scaled by the STICK weight.
- BRAIN control: a burst-train envelope. Each burst is a short cluster of decaying spikes whose count, spacing and weights come from a mulberry32 stream seeded by the burst itself, so the envelope is a pure function of the burst list. Bursts come from two sources: autonomous bursts on a seeded schedule (about every 2.2 to 5 s), which only sound while BRAIN is engaged (weight above 0.4 at the burst's start), and drag-injected bursts while BRAIN is engaged, with amplitude from drag speed and a seed hashed from burst count, speed and direction, so fast zigzag drags make wilder trains. Field force: a radial bloom around a slowly wandering center, scaled by weight times envelope, plus a high-frequency alpha shimmer so the field visibly stutters.
- SOUND control: a beat envelope of decaying exponentials. Beats come from an autonomous tempo (one beat every 0.857 s, starting when a SOUND-engaging morph completes) and from drag-detected beats while SOUND is engaged: direction changes over about 57 degrees or sharp speed peaks, with a 0.26 s refractory, amplitude from drag speed. Field force: a radial sine displacement from the field center scaled by weight times envelope, plus an amber pulse ring whose radius follows the envelope.
- Traces: sampled from `controlAt` at 15 Hz into a 12 s scrolling window and pre-rolled deterministically at init (t from -12 to 0), so frame one already shows developed traces. STICK plots the steering point's x, BRAIN the burst envelope, SOUND the beat envelope.
- Particles: seeded homes (mulberry32, seed 887048) with closed-form drift around them; drawn as short streaks between positions at t and t-0.12. Tint is the particle white mixed up to 28 percent toward the dominant input's color.
- Audio: created lazily inside the first pointer gesture, typeof-guarded, never required by the visuals. Three voices crossfaded by the same weights each frame: STICK a sawtooth through a lowpass whose frequency follows the control point; BRAIN a bandpassed noise bed whose gain follows the burst envelope; SOUND a 52 Hz square thump plus a highpassed noise hat whose gains follow the beat envelope and its cube.

House rules applied: Visual Viewport sizing with resize listeners on visualViewport and window; canvas style pinned in px inside draw; phone detection via window.screen min dimension under 700 px with the h > w*1.15 aspect fallback; phone path draws 240 particles instead of 400; strict five-tone palette; no gradients, shadowBlur, ctx.filter or offscreen canvas; no text beyond the title and the three specced strip labels.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png). The piece renders complete in total silence; the harness has no AudioContext and no requestAnimationFrame, so frame one is the synchronous draw(0) and audio simply never arms.
- Determinism: thumb.png rendered twice and cmp byte-compared identical, before and after the tuning round; the duplicate was deleted both times. No Date.now anywhere; the only clock is the rAF loop's elapsed time, which never feeds frame one.
- Read-back, frame one: panel black field of pale, faintly ice-tinted particle streaks converging gently on the ice control-point marker at upper-left-of-center (wander position at t=0 is x 0.407, y 0.314); the bottom panel shows the STICK strip lit and glowing with a smooth live curve, BRAIN and SOUND strips dim with flat baseline traces and dim labels, as specced for inactive inputs. Mobile (390x844, phone path): same composition, panel intact at the bottom 30 percent, nothing clipped.
- Tuning round: the first read-back had a nearly straight STICK trace (the wander's x frequencies were too slow for a 12 s window) and dot-like particles. The wander x pair was quickened (0.09 and 0.21 rad/s), particle drift amplitudes and the streak tail (0.07 to 0.12 s) were raised, the stick pull falloff widened, and base particle alpha lifted. Re-rendered and re-verified; the trace now sags in a visible smooth curve and the field reads as short flowing streaks.

## Deviations

- Trace gating: a strip plots its input's control value only while that input is engaged (weight above 0.4); a disengaged input rests at its baseline (STICK flat at center 0.5, BRAIN and SOUND at 0). This is the brief's own idle rule (inactive inputs sit at a genuinely near-zero baseline) applied to the panel; the underlying controls keep running, so re-engaging an input finds it mid-wander.
- SOUND tempo: drag beats are recorded into the envelope alongside the autonomous tempo rather than re-clocking it, so a steady circular drag reinforces the pulse and a wild drag argues with it; the envelope the trace draws is still the exact value driving the field.
- Audio mirrors the control state (gains and filter read the same weights and envelopes) instead of analyzing a played signal; no AnalyserNode is used, per house rules, and the panel's honesty is preserved because the traces and the sound are both computed from the one control state.
- Particle motion is closed-form around seeded homes rather than an integrated fluid simulation; this keeps frame one exact and reproducible for the byte gate while the three force systems still blend continuously.
