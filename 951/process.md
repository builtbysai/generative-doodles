# No.951 - Sixteen Forests, One Canopy

Study #116 refikanadol, PP112 "Rainforest Model" (Large Nature Model). Title suggestion shipped verbatim: "Sixteen Forests, One Canopy".

## Concept

Sixteen tropical forests distilled into one living canopy, driven end to end by synthetic sensor data. Three global channels - humidity, light, temperature - are the engine, not decoration: humidity pulls leaves into clusters (wet air clumps), light sets each leaf's brightness through a moving sun-fleck mask (the highest values flash sun-fleck gold), and temperature sets how fast each leaf drifts. The canopy breathes on a slow vertical wave, thermal columns lift and swirl leaves, and on a seeded schedule storms roll through: humidity spikes, light drops, a churn force rises, the whole field darkens, then it clears. A pale mist layer drifts above the canopy. A thin strip at the bottom reads the live sensor weather in hand-style caps. Tap opens a clearing (a local light spike), drag is wind, double-tap re-tunes the piece to a new forest regime over 30 s.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets. Strict palette: leaf #2DFF8F, deep leaf #0FCB6A, floor #06140B, mist #BFFFD9 (low alpha), sun flecks #FFD166, storm tone #0A2A1A. Visible text is only the sensor strip and the <title>.
- Simulation: fixed timestep at 120 Hz; frame one is the synchronous draw after exactly 3000 pre-roll steps (25 s of weather). The rAF loop (typeof-guarded) advances the same fixed steps, capped per frame. All state is seeded (mulberry32, seed 951112) and weather is a pure function of sim time; no Date.now anywhere in drawn state.
- Weather model: each channel is a seeded 1D value-noise over time (humidity period ~75 s lattice, light ~58 s, temperature ~105 s, each with a regime phase and bias). Storm schedule is generated at build from the same stream: first storm 110-160 s in, then every 150-220 s; each storm ramps humidity toward 1 over 8 s (STORM BUILDING), then passes over ~40 s (STORM PASSING), followed by a CLEARING window, else CALM. During a storm, light is scaled down, a per-leaf seeded churn kick is applied, mist thins and swirls, and the storm tone overlays the field at alpha proportional to the envelope.
- Leaves: 3,200 on desktop, 2,200 on phones (screen-min-dimension phone detection, aspect fallback). Each leaf carries seeded sensor offsets {h, l, t}; effective values are global channel x (0.7 + 0.6 x offset). Per step: velocity relaxes toward a noise-flow drift whose speed scales with the leaf's temperature; a humidity-weighted spring pulls it to its anchor (anchors laid with a noise-ragged top edge so the canopy has no horizon line); a 40 s breathing wave adds vertical motion; 3-4 seeded thermal columns add updraft and swirl inside their radius. Brightness at draw = leaf light x sun-fleck mask (slow 2D value noise drifting over space), mapped through a 27-stop deep-leaf to leaf to gold palette; size also swells slightly with brightness.
- Mist: 300 particles desktop, 200 phone, drifting in the upper third, pushed hard by gusts (tearing gaps) and thinned/swirled by storm churn.
- Interaction, all recorded against sim time: TAP = clearing (8 s local light spike with a sine envelope plus a gentle outward scatter of nearby leaves); DRAG = gust (directional force on leaves and mist within a radius, exponential settle over ~8 s); DOUBLE-TAP = new forest (weather params and every leaf's sensor offsets crossfade to a fresh seeded regime over 30 s; nothing cuts).
- Sound, lazy and typeof-guarded behind the first pointer gesture, silent in QA: a looped filtered-noise bed whose gain and cutoff follow humidity, a 46 Hz rumble whose gain follows storm churn, and sparse FM bird chirps whose rate follows light.
- Sizing: Visual Viewport API with resize listeners on visualViewport and window; canvas style width/height pinned in px inside draw() every frame; page ground is the floor tone; a rebuild on resize re-seeds and re-rolls the same 3000 steps, so each size is deterministic.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). Renders cleanly in silence (no AudioContext, no rAF in the harness; frame one is drawn synchronously).
- Determinism: thumb.png rendered twice and cmp byte-compared identical; the duplicate was deleted.
- Read-back, final renders: dark green-black floor; a dense canopy of small leaf dots filling the lower two-thirds with a ragged, noise-varied top edge (no straight horizon); layered greens with brighter clusters and pale-gold flecks where the sun-fleck mask peaks (desktop frame one reads HUMIDITY 0.42, LIGHT 0.79, TEMP 0.47, CALM); pale mist specks drifting across the upper third; strip legible and unclipped on desktop, thumb and mobile.
- Fix round: the first build's anchors started at a fixed 0.36 height fraction, which drew a straight horizon line across the canopy top, against the brief ("the forest has no edge"). Anchor tops now vary per column by value noise (0.295-0.425 of height). The same round widened the brightness mapping (0.20 + 1.25 x fleck, was 0.30 + 1.05) so deep shadow leaves and true gold peaks both appear, and raised mist alpha (0.16 to 0.21) and size (2.1 to 2.4 px) so the mist layer reads. All sizes re-rendered and determinism re-verified after the fix.

## Deviations

- Leaf count is 3,200 desktop / 2,200 phone and mist 300 / 200, against the prompt's ~4,000 leaves: the fixed-step sim plus a synchronous 3000-step pre-roll must stay fast in the QA renderer and on phones; 3,200 leaves still fill the canopy densely at all three QA sizes.
- The strip values differ between the desktop and phone renders (desktop CALM at 0.42/0.79/0.47; phone CALM at 0.64/0.41/0.55). The seeded stream is consumed by the size-dependent particle build before the weather parameters are drawn, so each size gets its own weather draw. Each size is fully deterministic; this is recorded rather than hidden.
- Storm darkening is a flat alpha fill of the specced storm tone, per the house no-gradients rule, instead of a vignette.
- Audio chirp timing and pitch use Math.random. Sound only; no drawn state ever touches it.
- The strip uses a hand-style font stack ("Segoe Print", "Bradley Hand", fallbacks). The node-canvas QA harness has none of those faces and falls back to its default sans; browsers with either face installed get the hand-lettered reading.
