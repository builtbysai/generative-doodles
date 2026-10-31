# No.527 Fire Circle

EXPANSION #63 giulia-conoscenti, prompt GC7 ("Specter Dance").

## Concept

A nocturnal ritual rendered with blacklight-poster logic: on a near-black ground, eight masked specters in electric blue and violet dance in a ring around a tall orange-pink flame, the brightest thing on the canvas. Their bodies are plain silhouettes; only the masks are picked out, alternating white and orange with smiling features, so the scene reads as festive rite rather than horror. Smoke rises from the flame into the top third, where faint faces form, drift upward, and dissolve.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no audio, no microphone, no interaction and no hint text (watch-only, exactly as specced).
- Palette is flat fills only, exactly as specced: ground `#101014`, electric blue `#3B3BF0`, violet `#7A3BF0`, flame orange `#FF7A1A`, flame pink `#FF4E8A`, mask white `#FFFFFF`. No gradients anywhere (grep-verified zero gradient calls); the fire glow is faked with layered flat translucent ellipses behind the flame and pooled on the ground.
- Square stage fitted from the Visual Viewport API (resize listeners on `visualViewport` and `window`), letterboxed on the near-black page ground; the canvas CSS size is pinned in px inside `draw()` every frame. Phone detection uses `window.screen` min dimension < 700px with the `h > w*1.15` aspect fallback.
- Flame: five stacked translucent teardrop paths (orange, orange, pink, pink, white core) over two crossed violet logs. Each tongue flickers on two sine frequencies (height) plus a slow tip sway, so the column licks upward without a repeating silhouette. Twenty-six seeded sparks rise, wobble, and fade.
- Dancers: eight parametric specters on an ellipse ring (radius 0.335 x 0.105 stage units), alternating blue and violet, sorted back-to-front so the back half renders behind the flame and the front half occludes its base. Each is a bell-robe bezier silhouette with raised dancing arms, a round head, and a pale mask oval (dark eye holes, small mouth curve, accent forehead dot in the opposite mask colour). Bob is an absolute-sine bounce with per-dancer speed and phase; the upper body sways gently.
- Smoke: nine seeded translucent blobs (alternating violet and white) rise up a column above the flame, growing and fading on individual cycles. Three smoke faces ride slower cycles of their own: a violet wisp disc with two white eye dots and one of three mouth variants (smile, small o, calm line), alpha shaped by a sine envelope so each face forms low, rises, and dissolves.
- A faint violet ellipse on the ground marks the dance ring; forty-six dim seeded stars twinkle in the upper sky.
- Grain: 750 precomputed seeded speck strokes (mulberry32, fixed seed 527063) drawn directly each frame; no offscreen canvas is ever created.
- Determinism: frame one is a synchronous `draw(PHASE0)` at the constant phase 3.7s (tongues at fixed flicker offsets, dancers at fixed bob phases, smoke face 0 mid-cycle and faintly present above the flame). The rAF loop (typeof-guarded) is anchored as `PHASE0 + elapsed since first frame callback`; no clock value feeds frame one (grep-verified zero `Date.now`).

## QA log

- Rendered with `render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and `cmp` byte-compared: identical, re-verified after the fix pass below. Second render deleted.
- Desktop/thumb read-back: near-black scene; a ring of eight blue and violet masked specters with raised arms around a tall layered orange-pink flame with a white core; violet logs at the base; one clear smiling smoke face above the flame and a second fainter face dissolving higher; dim stars; the read is festive ritual, not horror.
- Mobile read-back: square stage centred on the near-black ground, whole composition in frame, nothing clipped.
- Fix during QA: the first pass had the firelight halo and ground pool too strong, reading as a muddy brown dome with a bullseye under the flame. Softened the halo alphas (0.07/0.09 to 0.05/0.07) and pool alphas, and widened the outer flame tongue (0.150 to 0.168 stage units) so the fire sits fuller in the ring. Re-rendered all sizes and re-verified determinism after the fix.

## Deviations

- None from the prompt's visual or motion spec. Two implementation notes: the white flame core uses the specced mask white `#FFFFFF` as the hottest layer, staying inside the six-colour palette; and the prompt's blurred smoke blobs are drawn as flat translucent circles (the QA renderer has no blur or offscreen canvas), which keeps the flat blacklight-poster look the prompt asks for.
