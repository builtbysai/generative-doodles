# No.1067 Cold Camera

Study #131 yoichi-sakamoto, YS4 / PP228: the Cold Stares morphing system made visible. One recorded camera move plays through one abstract scene, and the view cross-dissolves continuously between the real space and its virtual wireframe twin. The camera move is the composition; the morph never cuts.

## Concept

- One scene, two renders, one camera. Nine abstract figures (standing silhouettes, a leaning silhouette, stacked blocks, an arch) stand on a ground plane at depths from 0.10 to 0.98. Both renders share the same viewpoint transform every frame: a slow lateral drift plus a gentle push-in on a seamless 50 s loop.
- Real render: space #0B0C0E, figures filled #1C1E24, a camera-light pool of layered #E8EAEE ellipses on the ground at the camera's focus point; figures near the focus catch a pale fill over their dark bodies.
- Virtual render: space #05070C, the same figures as #7FD4FF wireframe at 0.6 (polygon edges, spine and diagonal structure lines, joint nodes at the vertices), over a perspective ground grid drawn from the same projection.
- The morph parameter m is a slow sine of path progress across the loop, so the spaces cross-dissolve as the camera moves. Frame one is fixed at t = 20 s, where the phase constant makes m exactly 0.5: every figure is half solid dark, half cyan wireframe, and the grid is emerging through the real floor. There is no split-screen and no cut anywhere in the piece.

## Construction

- Two-render morph model: the background is the two space colors pre-blended by m. Each element is then drawn twice from the same projected geometry: the real layer at alpha (1 - m) and the virtual layer at alpha proportional to m (wireframe 0.6 * m, grid 0.33 * m, horizon 0.42 * m). Because both layers use one projection and one figure set, the mid-state is a single impossible space rather than two pictures.
- Projection: a figure at depth d is scaled and placed through the visible half-span V(d) = 2.3 - 1.25 d, divided by the camera zoom; feet sit at horizon + d^1.6 * groundSpan; height is unit * 0.58 * zoom / V(d). Figure x positions are generated inside a per-depth limit derived from the maximum camera drift and zoom, so every figure stays inside the frame at every phase and every size. Standing and leaning figures sway by a small seeded angle; the set is sorted far to near and re-projected live each frame (no offscreen canvas).
- Camera path: seeded sum-of-sines drift (fundamental plus second harmonic for lateral motion, zoom, and a 37 s focus drift), chosen over a Catmull-Rom spline because it is closed-form and closes the 50 s loop exactly.
- Interaction, all recorded as piece-time events and resolved as pure functions of t: drag across the frame overrides m with the pointer's horizontal fraction while dragging, then eases back to the path-driven value over 2.5 s on release. Tap flips which space leads: the morph phase offset eases between 0 and pi over 1.5 s (a flip never cuts). Double-tap reseeds the scene and camera.
- Audio: created lazily inside the first pointer gesture, typeof-guarded, never autoplays. A lowpassed noise room tone gains 0.045 * (1 - m); two high sine oscillators (1567 Hz, 2093 Hz) form the virtual shimmer at 0.014 * m with a slow tremolo, so the sound crossfades with the same m the visitor sees. Silent and complete in the QA renderer.
- Sizing: canvas from the Visual Viewport API with resize listeners on both visualViewport and window; canvas style width and height pinned in px inside draw(). Phone detection via window.screen min dimension < 700 px with aspect fallback; on tall frames the scene occupies a vertically centered band 1.5 units tall so the composition holds at 390 wide.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). Clean renders, no errors, silent.
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. The duplicate was deleted.
- Desktop read-back: one dark scene of nine figures spread left, center, and right in depth, caught mid-morph: translucent dark fills with cyan wireframe outlines and joint nodes over them, the perspective ground grid running wall to wall, the pale camera-light pool under the central group. No split line anywhere.
- Thumb read-back: same composition at 720x720; the mid-morph figures, grid, and pool all read at thumbnail size.
- Mobile read-back: the scene band sits centered in the portrait frame, all nine figures whole, grid and pool legible at 390 wide, nothing clipped.
- Grep checks: no Date.now, no gradients, no shadowBlur, no ctx.filter, no createElement, no offscreen canvas, no getUserMedia, no em dashes. Zero visible text besides the title.

## Deviations

- The camera path is a seeded sum-of-sines drift rather than a literal spline, for exact closed-form loop closure; it still reads as one unrepeatable recorded move because the lateral, zoom, and focus components run at incommensurate periods.
- The camera-light rim on figures near the focus is rendered as a pale fill overlay rather than an edge stroke; at these figure sizes the fill is what survives to thumbnail scale, and it keeps the strict palette.
