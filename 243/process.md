# No.464 The Path

EXPANSION #55 paul-blow, prompt PB8. His Camino de Santiago two-panel shop series, rebuilt as an endless generative pilgrimage.

## Concept

A diptych: two equal panels, one continuous landscape. A pale path winds through rolling olive and sage hills in panel 1, crosses the seam without breaking, and climbs panel 2 to a small white church with a golden dome. A lone dark figure walks the whole route on a seamless 90 second loop, fading softly at the church door and restarting at the path's beginning. Clouds drift. Nothing else happens, and that is the piece.

Palette, only: sky pale #F5E9C8, hills olive #7A8A4A and sage #A8B87A, path #D9C9A3, church white #FAF6EC, dome #D9A441, figure #2A2320.

## Construction

- Single self-contained index.html, canvas 2D, no assets, no audio, no text beyond the one lowercase hint word "drag".
- Canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas.style.width/height pinned in px inside draw() every frame. Phone detection via window.screen (min dimension under 700px) with the aspect fallback; the diptych stays side-by-side on phones, each panel half width, page ground is the pale sky color.
- Scene generated from a mulberry32 seeded stream (fixed seed 46408): three sine ridges (far / mid / near, alternating sage and olive), four drifting clouds, and the path as a chain of three cubic beziers. The chain is a single continuous curve across the seam, so panel-1 path end equals panel-2 path start by construction. The final anchor is locked to the far ridge surface at the church x, so the church sits on its hill and the path ends exactly at its base.
- Church: white nave and roof, taller tower, golden dome (semicircle) with a thin spire, one small dark door where the path arrives. Silhouette only, no other iconography.
- Walker: minimal dark figure, two legs swinging on a phase tied to distance walked (110 steps over the route), slight bob, one arm counter-swinging. Alpha fades in over the first 3% of the route and out over the last 4.5%, so the loop restart at the church reads as a soft dissolve.
- Interaction: drag scrubs the walker's position along the path by hand (pointer x maps to route position; on release the walk resumes from there). Tap reseeds from the same RNG stream: new winding route, hill colorway swapped, same grammar. Never click-to-reload.
- Determinism: the first frame is drawn synchronously at exactly PHASE0 (33% of the loop, walker a third along in panel 1, clouds at fixed drift offsets). The rAF loop, when present, is anchored as PHASE0 + elapsed since load; rAF is typeof-guarded so the node QA renderer draws the same first frame. An early build derived frame one from PHASE0 plus a few live milliseconds of elapsed time and failed the byte-compare; fixed by drawing frame one at exactly PHASE0 and starting the clock after.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- First pass bug: scene generation ran before fit(), so the church base was computed against a zero height and the path's final anchor went NaN; the church vanished and the path stopped at the seam. Fixed by computing all layout in height fractions and resolving to pixels at draw time.
- Determinism gate: thumb.png rendered twice, cmp byte-identical. Pass.
- Desktop: diptych reads as one landscape, path visibly continuous across the seam, church with golden dome in panel 2, walker on the path in panel 1, nothing clipped.
- Thumb: same read at 720x720; church small but legible, dome gold clear.
- Mobile (390x844): panels stay side-by-side at half width each, church and walker legible, path steeper in portrait but unbroken, hint word clear of the art. Nothing clipped.

## Deviations

- Hill banding uses the two palette greens alternated across three ridges (far sage, mid olive, near sage on the default colorway) so each ridge contour stays visible; tap reseed swaps the order. Same two colors, no additions.
- The seam is drawn as a 2px vertical line in the figure color at 20% alpha; the prompt asks for a diptych and the seam is what makes the two-panel read explicit. No other added marks.
