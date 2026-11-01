# №1249 — Held Empty Frame

Jenna Maurice study block JM2 (PP408), after her *Concerning the Landscape: A Study in Relationships* (2012–14), where the camera holds a still golden-hour scene for 30+ seconds before she enters it. The title follows the prompt's Title suggestion line, "Held Empty Frame".

## The piece

A golden-hour landscape that mostly does nothing. Blush sky, a low amber sun with flat halo rings at the right, two hill bands (an indigo wash ridge behind an olive ridge), and a field in three flat olive bands with hashed grass texture and grass clumps, each throwing a long indigo shadow to the left. One tree stands at the right third, its shadow stretching a third of the frame. For forty seconds the only motion is a heat shimmer that shifts three mid-field bands by a single pixel, and one marked blade of grass in the foreground that bends for 0.3 s every ~7 s. Then a single small figure (5% of frame height) enters from the left edge, walks to the tree in 14 s, leans into the trunk for 6 s, walks back out in 14 s, and the hold resumes. The figure is an event in the landscape, never its focus.

Cycle: hold 40 s → walk-in 14 s → lean 6 s → walk-out 14 s = 74 s, repeating.

## House adaptation

The prompt's painterly value-noise washes are rendered as flat layered shapes instead: solid hill-band polygons with hashed ridge lines, flat field bands, flat ellipse canopy blobs and clumps, shadows as translucent indigo polygons. No canvas gradients, no pixel buffers, no offscreen canvas — everything is drawn as seeded flat shapes each frame, which also keeps the synchronous first frame exact.

## Determinism and restraint

- First frame is drawn synchronously at fixed phase T0 = 20 s — mid-hold. Frame one is the emptiness itself: no figure anywhere, and the twitching blade is at rest then ((20 − 2.3) mod 7 = 3.7 s into its 7 s period, well past its 0.3 s bend window).
- The animation loop is anchored at T0 + elapsed-since-load and only runs where `requestAnimationFrame` exists; the QA renderer draws the same synchronous first frame.
- All texture (grass strokes, clumps, hill ridges) comes from a seeded integer hash of the piece number — no `Math.random`, no audio, no external assets.
- During the hold, nothing moves except the ±1 px shimmer bands and the one twitching blade. No birds, no drifting clouds, no camera movement; the restraint is deliberate and is the QA criterion.

## Interaction

- **Tap** during the hold skips straight to the entry moment (a phase offset accumulates; taps at other phases do nothing).
- **Drag** while the figure is out scrubs its position along the walk path (a recorded pixel offset, clamped to the path); the walk resumes from there. The landscape itself never scrubs.
- The walk cycle is stepped at 6 fps; the lean settles into the trunk over the first quarter of its 6 s and releases at the end.

## Verification

Rendered with the house node-canvas renderer at 1280×800, 390×844, and 720×720. Frame one at all three sizes: empty landscape, tree at right third, low sun, long shadows, no figure. Off-phase temp copies (discarded) confirmed the walk at T0 = 47 s (figure mid-field, legs in stride, shadow trailing left) and the lean at T0 = 57 s (figure at the trunk base, body tilted into it). Thumb rendered twice at 720×720 and byte-compared: identical.
