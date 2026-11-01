# Audience, in Reverse

## Concept

No.1070 adapts Yoichi Sakamoto's Syn 2023 record-and-playback mechanism as a two-act interaction. The stage begins empty because the audience is the source material. Act 1 records a visitor's drag as blue light for no more than thirty seconds. Act 2 returns that exact performance in reverse, processed as a pink ghost. The confrontation is temporal: the visitor watches their own gesture withdraw, with dwell-born figures appearing as memories rather than as a replay effect.

The first frame is deliberately an honest ready state. It contains the dark recorder stage, its boundary, and the graphic timeline bar, but no invented trails, figures, or prior performance.

## Construction

- The piece is a single self-contained HTML file using Canvas 2D and the strict palette: stage `#08080A`, live trails `#7FD4FF`, ghost playback `#FFB3C8`, and ghost figures `#1C1E24`.
- Canvas sizing uses the Visual Viewport API, with resize listeners on both `visualViewport` and `window`. Every draw pins the canvas CSS width and height in pixels. Phone detection uses the smaller physical screen dimension under 700 px, with the aspect-ratio fallback only after that check.
- A centered square stage is fitted inside the viewport. A thin timeline track at the bottom of the stage fills in blue during recording and pink during playback.
- Recording starts only when a visitor drags inside the stage. Pointer samples are stored by stroke, with normalized stage coordinates and elapsed recording timestamps. A recording session can contain several strokes, but its total window is capped at thirty seconds.
- While recording, the animation loop adds stationary samples for a held pointer. This lets lingering register as time rather than requiring constant motion.
- Ghost figures are derived from dwell density. Consecutive samples accumulate their time intervals into a coarse spatial grid. A cell must accumulate at least 0.72 seconds before it can form an anchor. Nearby high-dwell cells are separated into distinct anchors, each drawn as a restrained abstract standing silhouette whose size and opacity follow its dwell strength.
- A tap during recording is held briefly so it can be distinguished from a double tap, then it skips to playback. Playback maps elapsed playback time to a reversed source cursor. It draws the recorded strokes from the end toward the beginning, with two lower-opacity lagging echoes behind the leading pink trace. Ghost anchors appear when the reversed cursor reaches their emergence time and are drawn as dark figures with a pink edge.
- At thirty seconds, recording enters playback automatically. When playback reaches the beginning of the recording, the buffer is cleared and the stage returns to the empty ready state. A double tap clears immediately and advances the reseed cycle, which changes the abstract figure variant and tone base without inventing content.
- Audio is created lazily inside the first pointer gesture and is guarded by an `AudioContext` availability check. Each recorded stroke has a soft rising sine tone while it is drawn. For playback, the stored stroke tone metadata is scheduled in reverse stroke order, with pitch falling from the recorded peak toward the base and an envelope shaped as a swell followed by a short cutoff. No audio is created or started in the QA renderer.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 for `qa-desktop.png`, 390x844 for `qa-mobile.png`, and 720x720 for `thumb.png`.
- Rendered the 720x720 thumbnail a second time and compared it byte-for-byte with `cmp`; the two files were identical. The duplicate render was deleted.
- Desktop inspection: a centered, nearly black square stage on the same dark ground, with a fine stage boundary and a thin timeline track at the bottom. No trails, ghost figures, text, or other scene content appear before input.
- Mobile inspection: the square stage fits within the 390 px width and is vertically centered in the 844 px height. The boundary and timeline remain visible, with no clipping.
- Thumbnail inspection: the same empty stage and timeline are legible at 720x720. The intentionally sparse ready state is preserved rather than filled with a synthetic performance.
- Source checks found no `Date.now`, document element creation, gradient use, shadow blur, canvas filter, offscreen canvas, microphone access, visible canvas text, external assets, absolute URLs, date strings, or em dashes.

## Deviations

- No prompt deviation. The empty QA frame is a direct consequence of the prompt rule that the viewer's hand must create Act 1; seeding a demonstration performance would violate that rule.
- A single tap is resolved after a 0.36 second disambiguation interval so that the second half of a double tap can reliably clear and reseed instead of first triggering playback.
