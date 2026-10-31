# No.861 — Gritty and Drippy

Study #105 hsin-chien-huang, PP22 "Chalk Flight" (the Chalkroom mechanism, with Laurie Anderson): flying through hand-drawn marks that are gritty and drippy, never brittle and bright. Per the standing no-text filter, the Chalkroom words become abstract glyph-strokes — handwriting-adjacent mark shapes that never resolve into letters.

## Concept

A black void filled with chalk glyph-strokes drifting at three depths. The strokes cluster into loose "pages" — short lines of scribbled glyphs stacked like handwriting on a sheet — so the field reads as writing you fly through, not as a starfield. The center-left is kept sparser so a flight path reads through the field.

Interaction is flight itself:

- **Drag** flies: the whole field parallaxes against the drag vector, near layers moving most. Release and the flight settles exponentially.
- **Fast drags shed drips**: strokes near the flight path drop chalk tears that fall and fade — paint that cannot hold its form at speed. The drips are the signature of the piece.
- **Tap** is a pressure wave: nearby strokes tremble and a burst of grit particles sprays from the tap point.
- **Double-tap** reseeds the glyph field (new epoch, new pages).
- **Sound** (first gesture only): an airy rush of filtered noise whose cutoff tracks flight speed, plus a short chalk-scratch burst on each pressure wave. No tones, no melody.

## Construction

Single self-contained `index.html`, canvas 2D only, strict four-colour palette: void black `#060607`, chalk white `#ECE8DC`, drip grey `#9A958A`, deep shadow blue `#101418` (one flat offset sheet behind the field — depth without a gradient; no gradients, shadowBlur, filters, or offscreen canvas anywhere).

**Glyph generator.** Each glyph is a cursive-adjacent scribble built from 3–7 quadratic Bézier segments sampled into a polyline (5 samples per segment), in local units where body height is 1 and y = 0 is the baseline. Segment endpoint heights random-walk from the previous endpoint (cursive flow rather than independent zigzag), scaled by a per-glyph "temperament" (0.55–1.15), with rare seeded ascender swings and descender dips; about one glyph in six closes a small loop mid-stroke, and about one in three carries a stray flick stroke. Endpoints and control points are unconstrained, so marks suggest handwriting without ever forming letters. Each glyph is drawn with a rough chalk brush: three pre-seeded jitter passes (a wide low-alpha dust pass, then two body passes of increasing weight and alpha), round caps and joins.

**Field layout.** Three depth layers (parallax 0.30 / 0.60 / 1.00; glyph heights 0.021 / 0.036 / 0.060 of min dimension, ×1.18 on phones; layer alphas 0.34 / 0.55 / 0.85). Each layer holds 5 / 4 / 3 pages; a page is 2–4 lines of 3–7 glyphs along a slightly sloped baseline. Page anchors are rejection-sampled (up to 10 candidates, best minimum distance ≥ ~0.27 within the layer) so pages read as separate sheets instead of one stacked pile. A center-left elliptical zone (centre 0.36, 0.50; radii 0.30 × 0.32) rejects ~75% of clusters seeded into it, keeping the flight path sparse.

**Motion model (closed form).** A cluster's position is a pure function of time and the recorded drag segments: idle drift (slow leftward, layer-scaled) plus a gentle per-cluster vertical bob, plus the flight offset scaled by layer parallax, wrapped over an extended range so marks stream through the edges. The flight offset itself is evaluated analytically from the recorded segments: direct pointer follow during a drag, exponential settle (τ = 3 s) after release. Taps are recorded events; tremble is a decaying sine (38 rad/s, τ ≈ 0.33 s) applied to clusters within 0.24·S of the tap, summed over the last four taps.

**Drip model.** Drips are recorded particle events with closed-form trajectories: spawned while the smoothed flight speed exceeds 0.85·S px/s and the pointer is down, from glyph sample points of clusters within 0.20·S of the pointer (max 2 per frame, pool capped at 240). A drip falls under 0.55·S px/s² gravity for 1.7 s, stretching as it falls and fading linearly. Grit from a tap is likewise closed-form: 14–22 dots with seeded velocities, light gravity, 0.95 s life. Nothing is frame-integrated; any frame can be recomputed from the event lists alone.

**Audio.** Created lazily inside the first pointerdown, all `AudioContext` use typeof-guarded and wrapped in try/catch. A looped seeded white-noise buffer runs through a lowpass filter; in the rAF loop the cutoff (300 Hz → 2.7 kHz) and gain track the smoothed flight speed. A tap fires a 0.28 s bandpassed noise burst (1.9 kHz) as the chalk scratch. The piece renders and runs completely silent where no AudioContext exists.

**House rules.** Canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas CSS size pinned in px inside `draw()` every frame; phone detection via `window.screen` (min dimension < 700) with aspect fallback. rAF is typeof-guarded. Seeded RNG is mulberry32 throughout (field seed 861022 + epoch × 7919).

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280×900 (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png). All render cleanly in silence (the harness has no AudioContext and no rAF; only the synchronous frame-one draw runs).
- **Determinism:** thumb.png rendered twice and `cmp` byte-compared — identical, re-verified after each tuning round. Frame one is the synchronous `draw(0)`; no `Date.now` or wall-clock value feeds any drawn state (time is elapsed-since-load, and frame one is t = 0).
- Read-back, round 1: field structure correct (page clusters, three depths, sparse center-left), but near glyphs read as seismograph/ECG traces — segment endpoints were independent, producing uniform zigzag. Fixed: endpoint heights now random-walk, control-point swing halved, occasional closed loops added, chalk pass jitter widened and core alpha lowered.
- Read-back, round 2: cursive character fixed, but same-layer pages piled onto the right side in one dense stack. Fixed: rejection-sampled page anchors with a minimum separation, and near-layer pages reduced to 2 lines (sometimes 3).
- Read-back, round 3 (final): pages read as separate sheets at three depths across all three sizes; marks are flowing, looped, chalk-rough scribbles — handwriting-adjacent, no letters or words anywhere; center-left stays sparse; mobile holds the composition with nothing clipped wrongly (edge marks are mid-flight by design). No further changes.

## Deviations

- None from the brief's substance. Two recorded choices: (1) drips and grit are closed-form functions of recorded events rather than a fixed-timestep particle simulation — a stricter determinism than the house minimum, with identical visuals; drip *spawning* still happens in the live loop from measured flight speed, which cannot affect frame one. (2) The deep shadow-blue wash is drawn as a single flat offset sheet instead of a full-frame tint, so the void stays black at the edges while the depth still reads.
