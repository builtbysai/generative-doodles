# No.902 — m_is.'s/u

Study #110 sakrmusic, PP63 "The Fibrous Vortex".

## Concept

The still piece of the set: a monochrome fibrous vortex treated as a museum specimen, not a storm. It never spins. Three views are presented one at a time, each centered full-frame on near-black:

1. **Tight rings** — some sixty concentric torn rings around a dark void at the heart, drawn fibrous in whites and greys, like an engraving or a charcoal fingerprint.
2. **Oval void** — a large oval swirl with a black oval void at its center, a second partial swirl cut off at the right edge, the two separated by a narrow vertical dark bar.
3. **Streaming arcs** — thirty white brushstroke arcs streaming over a black void field.

The only motion is an extremely slow breathing of the ring radii, plus or minus about 2.5 px over a 20 s cycle: barely perceptible, the specimen alive but at rest. A tap turns the page (0.8 s crossfade to the next view). A double-tap is the close-up: a slow six-second push-in to about 1.6x, a held breath, then a four-second drift back. No frames, no captions, no page dots, no other UI. Sound is near-silence: a faint room tone at the edge of hearing, and one soft paper whisper when a page turns.

## Construction

- **Seeded geometry, precomputed once.** All randomness comes from a single mulberry32 stream at load. Each ring is defined by 90 angular samples whose radius multipliers are the sum of three seeded sine harmonics (frequencies 2-5, 6-11, 12-19) plus per-sample tear jitter, so every ring is a torn closed polyline rather than a clean ellipse. A ring is rendered as 22-38 short overlapping arc strokes (3-9 samples each) with seeded radial offsets, widths (0.5-2.4 px at S = 720), tones and alphas, so the surface reads as fiber and engraved line. The streaming arcs are tapered filled polygons sampled along quadratic curves in polar space, width profiled by a sine power curve so each stroke swells and dies like a brush mark.
- **Breath model.** Each ring's drawn radius is its base radius plus `2.5 * sin(2 * pi * t / 20 + phase)` px, a pure function of t with a slight per-ring phase. Frame one is drawn synchronously at t = 0, so the byte gate sees a fixed phase. Nothing in the drawing path reads the wall clock; the animation clock is elapsed rAF time only.
- **Page and zoom as closed form.** Pointer taps are recorded as an event list of times. A single tap commits as a page turn 0.35 s after the tap (the disambiguation window); a second tap inside that window converts the gesture into the double-tap close-up instead. `computeState(t)` folds the whole event list into the current view pair, crossfade progress, and zoom factor purely from t, so any frame can be redrawn exactly from the list. Zoom easing is a smoothstep profile: 6 s in, 1.5 s hold, 4 s out.
- **Palette discipline.** Strictly the six specced tones: ground #080808, ring white #EDEDEA, ring mid #8E8E88, void #000000, brush white #FFFFFF, fiber grey #555552. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas anywhere.
- **Sizing.** Canvas size comes from the Visual Viewport API with resize listeners on both visualViewport and window; draw() pins canvas.style.width/height in px every frame. Phone detection uses window.screen physical size (min dimension < 700 px) with the aspect fallback, and only caps the device pixel ratio (1.5 on phones, 2 elsewhere); the specimen is always centered on the smaller dimension.
- **Audio.** Lazily created on the first pointerdown only, typeof-guarded (`window.AudioContext || window.webkitAudioContext`), so the piece renders complete in total silence. Room tone is a looped two-second brown-noise buffer through a 320 Hz lowpass at gain 0.016. The paper whisper is a 0.28 s shaped noise puff through a 1400 Hz bandpass, fired from the frame loop when a new crossfade start is observed in the computed state.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png). All three show view 1 as specced: near-black field, fibrous torn-ring vortex in whites and greys, coarse engraved texture, dark void at the heart, nothing clipped; on mobile the specimen sits centered on the 390 px width with black above and below.
- Determinism: thumb.png rendered twice and compared with `cmp`: byte-identical. The duplicate was deleted.
- Silence: the QA harness provides no AudioContext and fires no pointer events; the piece rendered complete with no errors, confirming frame one needs no audio and no gesture.
- Deviations: none from the brief's substance. Two implementation notes: (1) a double-tap's first press does not turn the page, since the pending tap resolves into the close-up inside the 0.35 s window, which is the standard house disambiguation and keeps a page turn from flashing mid-zoom; (2) in view 2 the separating bar is drawn in specimen space, so it scales with the close-up zoom along with the swirls it divides.
