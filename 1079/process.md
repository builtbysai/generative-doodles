# REC / PLAY

## Concept

No.1079 takes the Cold Stares behind-the-scenes test pattern literally: on this test range, every gesture is a recording. A dark void holds a sparse set of pale orbs and thin bars. A small cam-drone, a dark quad silhouette with a white camera dot and a pale view cone, is only the playback head. The take is the subject, and the piece says so in tiny mono type at the top-left: PLAY or REC, the take number, and a running timecode. The readout is not UI chrome; it is the system's honesty, and it is never hidden.

Three takes stack as three fading path traces, one color per take (teal, amber, violet), the older tests kept underneath the current one at lower alpha. The piece ships with one seeded take in slot 1, so PLAY is already running when the frame opens.

Frame one is fixed at 3.2 seconds into the playback of the seeded take 1. The drone sits just left of center, cone sweeping up, the part of the teal trace already flown burning at full strength behind it, the rest of the take waiting at stack alpha ahead. The readout shows PLAY, TAKE 1, and the timecode for that exact phase.

## Construction

A take is a stored polyline smoothed with an open Catmull-Rom curve (endpoints duplicated, never closed into a loop), sampled and reparameterized by arc length into a lookup table. Playback is a pure function of elapsed time: a repeating cycle of fly, hold, rewind, hold. During the flight the head follows a trapezoidal velocity profile (smootherstep ramps over the first and last quarters, integrated analytically so total distance is exactly the path length), so the drone accelerates, holds, and decelerates with drone physics and never moves linearly or teleports. The rewind flies the same profile backwards along the path, like a playback head returning to the top of the take; the timecode follows the media position, running down as the head rewinds. Flight duration scales with path length (length / 0.17, clamped to 4–11 seconds); rewind takes about a third of that. Nothing is frame-integrated.

Interaction follows the prompt's grammar:

- Drag records into the current take slot. Once the pointer moves past a small threshold the readout flips to REC, the timecode starts counting, and the path draws in the slot's neon color with the drone riding the pen tip. On release the take is stored, the readout flips to PLAY, and the drone flies it back.
- Tap selects the next take, arming slot 2, then slot 3, so the next drag records there. Three takes is the grammar: at take 3, taps stay put.
- Double-tap clears all takes and returns to a fresh, empty take 1. Choice, stated plainly: the seeded take is not restored. After a clear, the drone parks at rest at the bottom-center of the range, the readout shows PLAY / TAKE 1 / 00:00:00, and nothing moves until the visitor records a new take 1.
- Between gestures the current take loops on its own. The repeatable feedback is the point.

Taps are disambiguated with the house deferred-tap pattern. The set is generated from a seeded Mulberry32 stream: six orbs and five bars placed in the middle band of the range. Orb glow and the view cone are layered flat-alpha shapes. The already-flown portion of the current take is redrawn from the stored samples each frame; no canvas fading is used. No gradients, filters, shadow blur, offscreen canvases, or element creation anywhere.

The canvas uses Visual Viewport dimensions with resize listeners on both the Visual Viewport and window, pins its CSS pixel size during setup and drawing, detects phones from the physical screen size with an aspect fallback, and guards the animation loop when requestAnimationFrame is unavailable.

Audio is created lazily inside the first pointer gesture and stays silent before it. A low sawtooth rotor tone runs through a low-pass filter, pitched by the head's analytic speed during flight and rewind. A short click sounds when REC arms, a confirm tone when a recorded take starts playing and at each loop's flight start, and a soft blip at the end of each take. No microphone is used.

## QA log

Rendered with `node ~/workspace/tools/render-piece.js`:

- Desktop: 1280 x 800, saved as `qa-desktop.png`.
- Mobile: 390 x 844, saved as `qa-mobile.png`.
- Thumbnail: 720 x 720, saved as `thumb.png`.

The desktop frame shows the dark void, six pale orbs with soft halos and dark gray bars across the middle of the range, and the teal take-1 trace sweeping from lower-left up over the set and down to the right. The cam-drone is mid-flight left of center with its pale cone open upward, and the flown half of the trace is visibly brighter than the unflown half. The readout at top-left shows PLAY in teal, TAKE 1 and the timecode 00:02:23 in gray mono, with the take pips beneath: slot 1 filled teal, slots 2 and 3 hollow. The mobile frame keeps the square composition centered and full-bleed, the drone slightly enlarged, the readout still legible. The only visible text in any render is the specced readout.

Determinism was checked by rendering the 720 x 720 frame twice and comparing the files byte for byte. They matched (`cmp` clean). The duplicate was deleted. The synchronous first frame uses a fixed 3.2 second phase offset into take 1's playback, so the first frame, including its timecode, does not depend on wall-clock or setup time.

Hygiene checks found no date-derived frame state, external assets, absolute URLs, visible text beyond the document title and the specced readout, gradients, shadow blur, canvas filters, offscreen canvas creation, element creation, or microphone access.

## Deviations

- Visitor paths are flown as open takes, not closed loops. The prompt's takes are tests with a beginning and an end; the playback head rewinds along the path between loops instead of cutting back to the start, which the prompt's no-teleport physics rule requires.
- Tapping selects the next take slot rather than immediately recording; the recording itself is the drag, as the prompt's drag-equals-record rule states. The tap's job is to say which test comes next.
- After a double-tap clear, the seeded take is not restored (see Construction). The piece returns to the honest empty state the BTS grammar implies: take 1, nothing on it yet.
- The prompt's sound is gesture gated and created lazily, following browser policy and the house audio rule. The visual piece is complete without sound.
