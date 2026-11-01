# №1109 — Gedankenscherz

Daniel Franke study block DF6: *Gedankenscherz* (2013, with Martin Backes). A dark cabinet of curiosities: five worlds in one horizontal panorama, and the visitor's gesture is the camera that travels between them. Each world translates the same movement into its own language.

## The cabinet

Five panels of 880 units sit side by side in a 4400-unit world-space, narrower than the 1000-unit stage, so a centred world always leaves its neighbours peeking at the seams. The seams themselves are drawn as a soft white glow band under a hairline at 0.3 alpha; ink blobs and letterforms near a panel edge cross it freely — the worlds bleed.

- **World 1 — star-map.** 200 points in `#DFF2FF` on three parallax depths, drifting at layer speeds with seeded twinkle; the nearest layer carries sparse cross glints.
- **World 2 — solids.** Six seeded gold (`#C9962E`) polyhedra — cube, octahedron, tetrahedron, triangular prism — rotated in true 3D, faces flat-shaded by their rotated normal and painter-sorted, edges stroked. One prism is anchored near the panel's right edge so it peeks into world 3 at frame one.
- **World 3 — ink field.** Fourteen seeded blobs of `#3E6E8E`: domain-warped contour rings (3- and 5-fold sine warp over the circle) around a drifting Lissajous centre, a flat low-alpha fill and a bright core dot. Layered flat shapes only — no gradients.
- **World 4 — typographic storm.** Sixty single serif letterforms in `#EDE8DA` swirling on three seeded vortices, each glyph tangent-rotated on its orbit. Fourteen glyphs ride the leftmost vortex so the storm peeks into world 3 at frame one. These glyphs are the only text in the piece.
- **World 5 — menagerie.** Three point-cloud creatures (bird, quadruped, fish) built from seeded outline samples — ellipse outlines, leg/tail line samples, arc outlines — drawn as teal `#4DD8C8` dots only, bobbing and shimmering.

## The camera and the gesture

The camera is a closed-form function of time and the recorded drag events. Unattended it drifts on a slow sine (110 s period) across the middle three worlds. A horizontal drag grabs the panorama — content follows the pointer — and on release the offset decays exponentially (τ ≈ 6 s) back onto the idle path. Drag speed feeds an **energy** parameter that decays in about a second and scales each world's internal motion in its own terms: solids spin faster, ink drifts harder, glyphs orbit quicker, the menagerie jitters, the stars brighten.

- **Drag horizontally** — travel the cabinet.
- **Tap** — dwell: the world under the camera centre deepens for 8 s (densities and alphas swell, then release).
- **Double-tap** — a new cabinet: all five worlds reseeded.
- Never click-to-reload.

## Sound

Five lazy WebAudio beds (740 Hz sine, 196 Hz triangle, 98 Hz sine, 330 Hz sine, 523 Hz triangle) start only inside the first pointer gesture, typeof-guarded, never autoplay. Each frame the beds' gains are crossfaded by the camera's proximity to their world, lifted slightly by the gesture energy. The visuals never read the audio — the piece is complete and identical with the sound off.

## House rules / determinism

- Canvas sized from the Visual Viewport API with resize listeners on `visualViewport` and `window`; `canvas.style.width/height` pinned in px on every draw; phone detection via `window.screen` (min dimension < 700) with a `h > w * 1.15` aspect fallback.
- First frame is drawn synchronously at a fixed phase (t = 27.5 s, where the idle drift centres exactly on the ink world): ink contours in the middle, the gold prism and solids peeking at the left seam, letterforms swirling in at the right seam, both seam lines visible. The rAF loop, guarded by a `typeof` check, continues from phase + elapsed.
- No offscreen canvas, no gradients, no `ctx.filter`, no `shadowBlur`, no `createElement`, no microphone, no visible text beyond world 4's letterforms and the `<title>`.

## QA

Rendered with the house renderer at 1280×800, 390×844 and 720×720. Frame one (desktop inspected): layered blue ink contours centred, flat-shaded gold solids at the left, pale serif letterforms at the right, thin seam lines at both edges of the centre world; mobile and thumb hold the same composition. Thumb rendered twice at 720×720 and compared with `cmp`: **byte-identical**.
