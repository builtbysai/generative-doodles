# No.462 — Summit Loop

EXPANSION #55 paul-blow, prompt PB6. After his AllTrails "Sorry for Interrupting" campaign style: a seamless golden-hour nature loop.

## Concept

A watch-only 60-second seamless loop. Four layered mountain bands drift past at parallax speeds under a gradient golden-hour sky. A sun pulses gently. A bird crosses the sky every 20 seconds on a bezier path, wings flapping. Low on the front band, a pale trail rises diagonally from lower-left to the right, carrying two tiny silhouetted hikers. No interaction, no hint text, no UI. The piece is quiet and exact: everything in it is periodic, so the loop boundary is invisible.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no audio.
- Palette held to the prompt: sky gradient #FF9E5E to #E85D75, sun #FFD166, hikers and bird #1A1218, bands far-to-near from #5A3A5E through #3A2A4E to #241B38.
- Each band is a seeded ridge polyline: the ridge height is a sum of two sines whose cycles per tile are integers, so the ridge is periodic in the tile width (1600 design px) by construction and wraps exactly at any viewport width. Each band travels a whole number of tiles per 60 s loop (1, 2, 3, 4 far to near), so the parallax drift is seamless across the loop boundary as well as across the screen edge.
- Sun brightness pulses plus/minus 3 percent on a 15 s period, which divides the 60 s loop.
- Bird: one crossing every 20 s (three per loop), 9 s per crossing on a quadratic bezier across the upper sky, drawn as a two-triangle flapping sprite around a slim body triangle; wing beat at 2.2 Hz. Between crossings the sky rests empty.
- Loop-boundary crossfade over the last 0.5 s, as the prompt's technical note specifies: the opening phase is blended in over the closing phase. Because every element is already periodic, the crossfade is a guarantee rather than a patch.
- Trail: a quadratic curve across the front band, stroked in the sun color at 50 percent alpha (no trail color exists in the palette; the sun gold at low alpha reads as light catching the path). The two hikers are small stroked silhouettes (head, torso, mid-stride legs, arm, backpack) standing on the curve at fixed parameters.
- House rules: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas CSS size pinned in px every frame; phone detection via window.screen physical size (min dimension under 700 px) with aspect fallback, recorded but layout is full-bleed on all sizes; page ground is the sky's top color #FF9E5E.
- Determinism: all load-time layout comes from a mulberry32 RNG with a fixed seed. The synchronous first frame is drawn at a constant pre-roll phase of 24 s: bands mid-drift and a bird mid-crossing (24 mod 20 = 4 s into a 9 s crossing). The animation loop is anchored as pre-roll plus elapsed-since-load; frame one never derives from a wall clock. requestAnimationFrame is typeof-guarded so the node QA renderer draws the full first frame synchronously.

## QA log

- Rendered with node-canvas from the actual script at 1280x900 (desktop), 390x844 (mobile), and 720x720 (thumb).
- First render pass: the bird read as a single dark wedge; the two triangles were asymmetric around the direction of travel and one wing nearly vanished. Rebuilt the sprite as two symmetric triangles beating together around a slim body, enlarged the half-span, and damped the path rotation. Second pass: the bird reads clearly as a flapping silhouette at all three sizes.
- Also nudged the hiker backpack (smaller, lower) so it stops crowding the head.
- Desktop: gradient sky, sun with soft halo upper right, four distinct bands, trail rising diagonally with both hikers on it, bird mid-sky. Thumb: same composition, all elements legible. Mobile: full-bleed portrait, nothing clipped, hikers and trail intact at the lower left, bird and sun in the upper sky.
- Determinism gate: thumb.png rendered twice and byte-compared with cmp; identical.
- Deviations from the prompt letter, recorded: (1) the prompt lists three band colors for four bands; the second band uses #4A3256, the exact midpoint blend of the far (#5A3A5E) and mid (#3A2A4E) palette colors, so the light-to-dark progression stays even without importing a new color. (2) The trail is stroked in the palette's sun gold at 50 percent alpha, the palette's only light tone, rather than left uncolored. (3) The hikers are still, as the prompt's motion spec assigns movement only to the bands, bird, and sun.
