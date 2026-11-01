# Fly the Camera Move

## Concept

No.1073 takes Momoko Nishimoto's Cold Stares mechanism literally: the drone does not wander, it flies a camera move that was authored in advance. A dark void holds a sparse light-field set of glowing orbs and thin light-bars. One small cam-drone, a dark quad silhouette with a white camera dot and a pale view cone, runs the recorded move with real drone physics: it accelerates, holds, and decelerates, never moving linearly. A neon teal trace draws the path behind it and evaporates over ten seconds. The path is the subject; the drone is the pen.

Frame one is fixed at 5.2 seconds into the first pass of the seeded initial move. The drone sits upper-left of center, cone sweeping right, with the flown arc of the trace curving up from the bottom-center start behind it.

## Construction

The move is a closed Catmull-Rom loop through nine seeded control points, starting at bottom-center, sampled at 160 points per segment and reparameterized by arc length into a lookup table. Position, heading, and speed at any moment are pure functions of elapsed time: a trapezoidal velocity profile (smootherstep ramps over the first and last quarters of a pass, integrated analytically so total distance is exactly the loop length) maps pass progress to arc distance, and the table returns position and tangent. Nothing is frame-integrated.

The flight timeline is a repeating two-pass cycle: record pass, a 0.9 second hold, playback pass, a 1.6 second hold. Pass duration scales with loop length (loop length / 0.16, clamped to 7–13 seconds), so a longer authored move takes proportionally longer to fly. The trace is drawn by sampling the same closed-form position function backwards over the last ten seconds of flight time and stroking the segments with alpha falling quadratically with age, over a wide low-alpha glow pass. No canvas fading is used.

Interaction is gesture-authored, following the prompt:

- Drag draws a path that glows as it is drawn; on release the path becomes the new move (closed into a loop so the two passes join seamlessly) and the flight restarts, freezing the previous flight while the visitor draws.
- Tap repeats the last recorded move from the top.
- Double-tap reseeds the orbs and bars; the move stays.

Taps are disambiguated with the house deferred-tap pattern. The set is generated from a seeded Mulberry32 stream: seven orbs and six bars placed in the lower two-thirds. Orb glow is layered flat-alpha circles; the view cone is two layered flat-alpha sectors. No gradients, filters, shadow blur, offscreen canvases, or element creation anywhere.

The canvas uses Visual Viewport dimensions with resize listeners on both the Visual Viewport and window, pins its CSS pixel size during setup and drawing, detects phones from the physical screen size with an aspect fallback, and guards the animation loop when requestAnimationFrame is unavailable.

Audio is created lazily inside the first pointer gesture and stays silent before it. A low sawtooth rotor tone runs through a low-pass filter, pitched by the drone's analytic speed. A soft tick sounds when an authoring drag begins (record start) and when a tap repeats the move; a soft confirm tone sounds each time the playback pass begins. No microphone is used.

## QA log

Rendered with `node ~/workspace/tools/render-piece.js`:

- Desktop: 1280 x 800, saved as `qa-desktop.png`.
- Mobile: 390 x 844, saved as `qa-mobile.png`.
- Thumbnail: 720 x 720, saved as `thumb.png`.

The desktop frame shows the dark void, seven pale orbs with soft halos and gray light-bars low in the frame, and the cam-drone mid-flight at upper-left: four dark rotor discs, white camera dot, and the pale view cone opening to the right. The teal trace arcs from bottom-center up to the drone and is the brightest element in the frame, as specified. The mobile frame keeps the square composition centered and full-bleed, with the drone slightly enlarged and every element legible. No text is visible in any render.

Determinism was checked by rendering the 720 x 720 frame twice and comparing the files byte for byte. They matched (`cmp` clean). The duplicate was deleted. The synchronous first frame uses a fixed 5.2 second phase offset, so the first frame does not depend on wall-clock or setup time.

Hygiene checks found no date-derived frame state, external assets, absolute URLs, visible text beyond the document title, gradients, shadow blur, canvas filters, offscreen canvas creation, element creation, or microphone access.

## Deviations

- Visitor-authored paths are closed into loops for playback. The prompt's record/playback system repeats moves seamlessly; closing the loop lets the drone decelerate back to its start point and begin the playback pass without a teleport cut, which the prompt explicitly forbids.
- The trace persists across the short holds and the seam between passes, fading purely by age (ten seconds), since both passes fly the same loop and the trace is defined as a function of flight time rather than per-pass state.
- The prompt's sound is gesture gated and created lazily, following browser policy and the house audio rule. The visual piece is complete without sound.
