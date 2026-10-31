# No.864 "Sound Is the Image" (study #106 lim-giong, PP25 "Stereo Picture")

## Concept

Lim Giong's central mechanism: sound not laid under the image but standing AS the image. The piece has no scenery and no decoration. A low drone is drawn as a terrain of slow ridges; a gong strike throws concentric rings; a whispered voice traces a thin bright thread; a sub-bass bloom swells underneath. The visuals are not an illustration of the audio: both are readings of one shared signal model, so when the audio runs, what you hear is literally what you see.

Interactions: horizontal drag plays the terrain like a record (scrubbing bends the drone's pitch and the ridges redraw from the new pitch); tap strikes a gong at that point, its pitch set by the tap's height; double-tap reseeds the drone's base tone. Sound starts on the first gesture only, never automatically.

## Construction

One closed-form signal state drives image and sound:

- **Drone.** Two detuned sines (ratio 1.03) plus a filtered-noise approximation built as four seeded slow random-phase sinusoid components (spatial cycles across the frame plus slow temporal drift). The terrain is five successive traces of the one waveform across a 7-second trailing window, each trace lagged 0.55 s behind the previous, filled and stroked in the deep teal. The waveform is sampled directly from the model; no AnalyserNode is used anywhere, because the model IS the analysis.
- **Pitch state.** Dragging records pitch control points. The multiplier m(t) is 1 before the first point, linear between points, and decays exponentially back to 1 (tau 2.2 s) after release. The drone phase is the exact integral of m: trapezoids over the linear segments and the closed-form integral of the exponential tail. Reseeds split time into epochs; each epoch has its own visual rate (scaled from its base tone), and the phase integral sums rate times pitch-integral segment by segment across epoch boundaries, so the phase never jumps.
- **Base tones.** Each epoch picks one of A1 55 Hz, G1 49 Hz, B1 61.74 Hz, C2 65.41 Hz from its seed (mulberry32), and derives its noise components, thread wander components, and gong schedule (gaps and strike points) from the same seed.
- **Gongs.** Seeded events on a sparse schedule per epoch, plus tap events. Each gong draws three concentric gold rings expanding over 4.5 s with a brief strike dot, adds a decaying pulse to the sub-bass bloom, and lifts the thread's brightness. Tap gongs are deferred 0.30 s so a double-tap can cancel the pending tap and reseed instead.
- **Voice thread.** A three-component seeded wander in the upper third. Its brightness follows the model's high-frequency energy estimate: the squared fast component of the drone phase (rate times 7.4) plus gong transients. It is computed from the same phase integral as everything else.
- **Sub-bass bloom.** Three layered flat-alpha crimson discs low in the frame, radius and alpha driven by a slow low envelope (two beating sines) plus gong pulses. Drawn over the terrain fills so the crimson reads; no gradients anywhere in the piece.
- **Audio.** Created lazily inside the first pointer gesture, fully typeof-guarded, through a modest master gain and a compressor limiter. Two sine oscillators track the model's pitch state live (base tone times m(t)); a looped brown-noise buffer through a lowpass is the noise body; gongs are decaying sine strikes (fundamental plus a quiet 2.76 partial) fired when the model's gong events arrive. The piece renders complete in total silence where no AudioContext exists.

Determinism: frame one is the synchronous draw at t = 0. Nothing is derived from Date.now; the clock is elapsed time since load, and every drawn quantity is a closed-form function of the seeded epochs, the recorded pitch points, the gong list, and t. A pre-gong seeded at t = -0.8 s at (0.63, 0.40) guarantees frame one already shows a ring expanding. Canvas size comes from the Visual Viewport API with resize listeners on both visualViewport and window; the canvas CSS size is pinned in px inside draw; phone detection uses window.screen physical size with the aspect fallback.

## QA log

- Rendered with the house node-canvas renderer at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png). The piece runs cleanly in silence (the renderer has no AudioContext and no requestAnimationFrame, so only the synchronous first frame draws, exactly as designed).
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. Repeated after the bloom fix below: identical again.
- Read-back, desktop and thumb: black field; five teal ridge traces with fills across the lower two-thirds, amplitude growing toward the front trace; three concentric gold rings expanding around (0.63, 0.40) with the strike already faded; one thin bone-white thread wandering across the upper third; a faint deep-crimson bloom swelling low-center. No text anywhere except the document title.
- Read-back, mobile (390x844): the same composition holds in the tall frame; the thread sits at 17% height on the phone path, the rings stay whole, the terrain fills the lower field edge to edge, nothing clipped.
- Fix during QA: the sub-bass bloom was first drawn behind the terrain, whose five layered fills buried the crimson almost completely. It now draws over the terrain fills at very low alpha (0.06 to 0.12 by envelope), which keeps the "felt more than seen" register while making the crimson actually perceptible. All renders redone and the byte-compare re-run green after the fix.
- Two initialisation bugs were caught and fixed before the first successful render (epoch params passed where raw params were expected, in the terrain sampler and the thread). No behaviour change, only the correction.

## Deviations

- **The collapse test does not hold before the first gesture.** The prompt's acceptance test is literal: mute the audio and the piece must collapse to nothing. A gallery piece cannot do that: it must present a complete first frame in a silent gallery and in the QA renderer, where no AudioContext exists at all. Following the established silent-beat precedent (No.836, whose pulse runs visually before its audio is armed), the piece draws the signal model's body silently from load; the moment the first gesture arms the audio, the same model state drives the oscillators, so from then on the collapse test holds in spirit: the sound and the image are one signal, and stopping the model would stop both. Recorded here rather than hidden.
- **Visual drone rate is a scaled analogue of the audio rate.** The terrain shows the waveform at roughly 0.85 cycles per second (scaled per base tone), not at 55 Hz, which would be an unreadable blur. The scaling is fixed and proportional, so pitch gestures bend the picture and the sound by the same relative amount.
- **Tap gongs are deferred 0.30 s** to let double-tap mean reseed unambiguously; the ring's birth time is the deferred moment, so picture and (armed) sound stay in step.
