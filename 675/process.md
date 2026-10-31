# No.675 Huaco Silbador

EXPANSION #82 clemente-mckay, prompt block 3 "Huaco Silbador". A whistling vessel: pour the water and the air has nowhere to go but out through the whistle.

## Concept

Clemente McKay's sounding ceramics rest on a hydraulic fact: a stirrup-spout vessel is two chambers and a whistle. Tilt it, water moves from one chamber to the other, and the displaced air is forced out through the whistle bridge, so the vessel sings with its own breath. This piece makes that mechanism the whole subject. A burnished clay vessel with a stirrup spout stands on a dark ground; the only interaction is the pour gesture itself. Drag to tilt the vessel and it whistles, breathy and slightly unstable, pitch rising as the pour completes. Release and it settles home to silence. Cutaway gauges in the body wall show the water moving between the chambers, so the cause of the sound is visible, not hidden. No particle water physics, no cheerful flute tone, no autoplay: the instrument sounds only while air is actually flowing.

## Construction

Single self-contained index.html, canvas 2D, no external assets. Strict palette: burnished clay #8A4A2B, engobe cream #E4D3B8, water #2E5F6B, ground #14100D, whistle-mist #CFE4E4.

The vessel is drawn in a local space (y up, origin at the base pivot) under the transform translate(pivot), rotate(tilt), scale(s, -s). The globular body is a parametric profile (smoothed half-width points, mirrored), filled with clay, given a flat ground-tone shade and a low-alpha engobe burnish, then engobe bands clipped to the silhouette: rising triangles, vertical ticks, diamonds, and a foot line, each band carrying its motif cut in clay. The stirrup is one filled form (two risers joined by a horizontal bridge) with cream banding; the whistle horn leaves the right riser's top as an outlined clay stroke ending in a dark mouth ellipse facing upper right.

Two-reservoir model. The body holds chamber A (left) and chamber B (right, under the whistle riser). Levels are fractions of chamber capacity, each resting at 0.575, summing to a conserved total of 1.15. The equilibrium difference diff = levelB - levelA is driven by tilt: diffTarget = clamp(2.0 * tilt, -0.79, 0.79). diff chases its target through a second-order slosh (accel = (diffTarget - diff) * 16 - diffVel * 5.0), so the water overshoots slightly and settles, and the gauges lag the tilt the way real water does. Airflow is |d(levelB)/dt| = |diffVel| / 2: water entering chamber B pushes its air out through the whistle.

Pitch mapping. While airflow exceeds the onset threshold (0.055 of capacity per second), the whistle sounds. Pitch follows the displaced-air volume: disp = |levelB - 0.575| / 0.425 clamped to 0..1, frequency = 300 + 400 * disp Hz, so the tone sits near 300 Hz at rest and rises toward 700 Hz as the pour completes. Gain follows airflow (clamped 0..0.5, split between a sine and band-passed noise at 1.8x the fundamental), and a slosh vibrato (up to 1.2 percent, scaled by |diffVel|) keeps the tone breathy and unstable rather than flute-clean. Silence returns when the levels equalize.

Audio is created lazily inside the first pointer press (ensureAudio, called only from the pointer-down handler), builds one persistent voice (sine oscillator + looped seeded noise buffer through a bandpass, both gained at zero), and is parameter-smoothed from the draw loop. Every access is typeof-guarded and try/caught: with no WebAudio the piece renders, tilts, pours and puffs in silence.

Interaction and determinism. Drag maps the drag vector to a tilt target (horizontal dominant, vertical at 0.35 weight, 0.0038 rad per px), clamped to about +/-35 degrees (0.61 rad); the vessel's tilt is a weighty spring (stiffness 34, damping 10) toward the target, pivoting at its base, and on release the target returns to 0 so the same spring settles it upright in about 1.5 s. The simulation integrates at fixed dt = 1/120 from an anchored performance.now clock; pointer gestures are recorded as events with anchored times and consumed by the step loop, so state is a pure function of the event timeline. Frame one is the synchronous draw at tilt 0, levels at rest, and is never derived from Date.now(). At each tone onset (plus every 1.6 s of sustained flow) a mist puff spawns at the whistle mouth: five layered low-alpha discs in world space, jittered by mulberry32 seeded per puff, expanding and fading over about a second. Canvas size comes from the Visual Viewport API with resize listeners on both visualViewport and window; the canvas is pinned in px inside draw; phone detection uses window.screen's smaller dimension under 700 px with the aspect ratio only as fallback. requestAnimationFrame is typeof-guarded, so the headless QA renderer (no rAF, no AudioContext, no document.createElement, no offscreen canvas, no ctx.filter) draws frame one without throwing.

Deviations. (1) The cutaway gauge is built as two narrow windows instead of one strip, one over each chamber, because the piece's subject is the transfer between chambers; a single window would hide the receiving chamber's rise, which is what drives the pitch. Each window still shows exactly what the brief asks: a vertical strip, a water fill, and a meniscus line responding to tilt. (2) The whistle also sounds, more softly, while the levels equalize after release, since air genuinely flows then; it falls silent the moment the water levels, as specified. (3) Sustained pours re-puff every 1.6 s rather than only at the first onset, so a long pour keeps breathing mist; onsets after a pause behave exactly as specified.

## QA log

Renderer: node ~/workspace/tools/render-piece.js (node-canvas, no rAF, no AudioContext).

- qa-desktop.png (1280x900): globular burnished vessel centered on the dark ground, stirrup bridge across the top, whistle horn with dark mouth at upper right, three engobe bands (triangles, ticks, diamonds) reading cleanly, two gauge windows with teal water standing at the shared resting level and the cream meniscus lines aligned. Nothing clipped.
- qa-mobile.png (390x844): same vessel refit by width (phone rule), gauges and bands intact, generous dark margin above and below, nothing clipped.
- thumb.png (720x720): the vessel large and legible at thumbnail size; bands and gauges still read.
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. The second render was deleted.
- Source checks: no Date.now, no Math.random, no document.createElement, no external URLs, no em dashes in the file. AudioContext appears only inside typeof guards in the lazy audio path.
- Audio path is untestable in the headless renderer by design; it is exercised only in a live browser, where the first press creates the context inside the gesture.
