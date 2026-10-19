# No.300 Honeyeater Perch

After Ali Fisher's native-bird flash. A New Holland Honeyeater in white linework on deep navy, perched on a thin diagonal branch with a vermilion bottlebrush at the branch tip, and a smaller silvereye study on Geraldton wax in the lower right.

Palette is held to five colours only: deep navy ground #1B2A4A, linework white #F5F5F0, bottlebrush vermilion #C73E1D, wax-flower cream #F0E6D2, and honeyeater yellow #E8B93C for the cheek tuft. Nothing else.

The honeyeater is built as a parametric silhouette: a filled navy body stroked in white so it cuts cleanly against the ground, a long tail behind it, a round head, and a long curved beak drawn as a solid white sweep ending in a fine point. The yellow cheek tuft is a spiky filled patch under the eye and is never omitted. Feather detail is fine parallel strokes clipped to the body path, following its curves, with a wing outline set inside the hatching. Flat linework only, no gradients and no shading.

The bottlebrush is a radial filament field along a short rachis at the branch tip: 84 seeded filaments, each with its own length, side, tilt and sway phase, stroked in vermilion with a dot at the tip. The silvereye repeats the same drawing language at a smaller scale, with its bold white eye ring, a short fine beak, and cream Geraldton wax flowers made of five flat petals each at the end of its own short branch.

Motion is watch-only on a 20 second seamless loop. The honeyeater blinks slowly twice per loop, its tail tip rides a soft sine with three cycles per loop, and the bottlebrush filaments sway on seeded sine phases whose periods divide the loop. Exactly one vermilion petal is drawn per loop: it sits at the bottlebrush edge until 12 seconds, then detaches, falls in an arc while turning, and is fully faded by 19 seconds, so the seam at 20 seconds is clean. The first frame is offset to 5 seconds so the tail is already off centre and the filaments are mid-sway. All phases are seeded and no randomness is used at runtime.

The canvas uses Visual Viewport sizing with resize listeners on both visualViewport and window, is pinned every frame through its style width and height in pixels, and detects phones from window.screen with an aspect fallback. The design space is 1280 by 900 with a centred fit, and the page ground is the piece's own navy. The first frame is drawn synchronously and every requestAnimationFrame call is guarded, so the piece renders under node-canvas for QA.
