# Six and Sixty-Four

## Concept

No.1075 adapts the Cold Stares reconstruction grammar from Momoko Nishimoto's study block MN4: one scene, witnessed many times. Six drone cameras shot the real world and sixty-four cameras built the delusion world, and the reconstructed image is dense because it is many sharp viewpoints composited, not one view blurred. The piece holds a single luminous subject, an orb-cluster with light-bars, at the center of a dark void, and surrounds it with faint blue copies of itself, one per virtual camera. The baseline is six ghosts, the real cameras. Everything the visitor does adds witnesses, and the count is always on the frame, because the number is the subject as much as the image is.

## Construction

- The piece is a single self-contained HTML file using Canvas 2D and the strict palette: void `#060608`, true subject `#FFFFFF`, ghost copies `#9FC4E8` at 0.06 to 0.12 each, composite halo `#DCE8FF`.
- Canvas sizing uses the Visual Viewport API, with resize listeners on both `visualViewport` and `window`. Every draw pins the canvas CSS width and height in pixels. Phone detection uses the smaller physical screen dimension under 700 px, with the aspect-ratio fallback only after that check; the composition is full-bleed with the subject at the viewport center.
- The subject is stored once as seeded data: a hub orb, a ring of five orbs, two outer orbs, and five light-bars joining them, all in local units. The seventy viewpoints are stored too, each with an orbit radius, phase and direction, a small sinusoidal jitter, a rotation offset, a scale factor, an alpha in the specced range, and an audio detune.
- Every viewpoint position is a closed-form function of the piece time t: a slow orbit around the drifting subject center plus its own jitter. All periods divide the 60 second loop (orbits run one or two cycles per loop, the center drifts on 60 and 30 second periods), so the watch-only core is a seamless loop with no state carried between frames.
- Each ghost is the stored subject redrawn whole at its viewpoint transform. There are no trails, no smearing, and no blur anywhere in the piece; the composite halo is layered flat-alpha discs under the ghosts, peaking at about 0.27 near the core, with a fainter halo echo under each ghost.
- The ghost count is a closed-form function of recorded events, never frame-integrated state. Dragging converts pointer travel into cameras (one per 5 percent of the frame's smaller side, at least 18 px) recorded as a boost with a timestamp; after the last adding event the extra cameras decay exponentially with a 6 second time constant back toward the baseline of six. A tap (held 0.36 seconds so a double tap can pre-empt it) flashes the full 70-ghost composite for exactly 3 seconds, after which the 64 extras decay by the same law. A double tap reseeds the subject geometry and all seventy viewpoints and clears every recorded boost.
- The count is drawn in tiny monospace type at the bottom left, in ghost blue at 0.55 alpha, as `CAM n/70`. It is the only visible text besides the document title, and it is prompt-specced: the grammar of the study is that the number of cameras is shown.
- Audio follows the prompt's rule of one detuned sine per ten ghosts. Seven fixed sine voices (F3 up to C5) each carry a seeded detune from their viewpoint; a voice fades in when the count crosses its decade, so more cameras literally thicken the chord. The AudioContext is created lazily inside the first pointer gesture and guarded by availability checks; the piece is silent before any gesture. No microphone is used anywhere.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x800 for `qa-desktop.png`, 390x844 for `qa-mobile.png`, and 720x720 for `thumb.png`.
- Rendered the 720x720 thumbnail a second time and compared it byte-for-byte with `cmp`; the two files were identical. The duplicate render was deleted.
- Desktop inspection: a near-black void, one bright white orb-cluster with its light-bars dead center inside a tight pale halo, and faint blue copies of the same structure offset around it as separate sharp echoes. The `CAM 6/70` count sits small at the bottom left. Nothing else is on the frame.
- Mobile inspection: the subject and halo sit at the center of the 390x844 frame at the slightly larger phone scale, with the count legible at the bottom left and nothing clipped.
- Functional test with a recording 2D-context stub, a controllable clock, and a scripted rAF: frame one draws exactly 66 arcs (4 halo discs, plus 6 ghosts and the subject at 9 arcs each) and the text `CAM 6/70`. A scripted drag raised the count to 33; after 40 idle seconds it returned to 6. A tap produced `CAM 70/70` during the flash, 60 one second after the flash ended (the 64 extras decaying), and 6 after a long idle. A double tap reseeded and fired no flash. Arc totals matched 12 + 9n in every state, confirming each ghost is a complete copy of the subject.
- Source checks found no `Date.now`, document element creation, gradient use, shadow blur, canvas filter, offscreen canvas, microphone access, external assets, or absolute URLs. The single `fillText` call in the source is the specced camera count.

## Deviations

- No prompt deviation. Two interpretation notes: a drag stroke adds cameras in proportion to its travel rather than exactly one per stroke, so the composite can be built within a few strokes while short strokes still add one at a time; and after a tap flash ends, the composite decays back to six by the same analytic law as drag-added cameras, rather than cutting back, since a cut would contradict the piece's rule that viewpoints fade when unwatched.
