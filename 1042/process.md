# No.1042 "The Rigid Body"

Study #128 kyohei-mouri, PP203 "What the Cameras See" (discrete figures 2022, IR tracking).

## Concept

One scene, two audiences. A row of tall aluminum frames stands on a dark stage while a low cart ferries a fifth frame across the front lane. The frame is split vertically. On the left, the human view: matte gray bars, plain unlit white domes, calm to the point of boredom. On the right, the machine view: the same frames read as rigid bodies, seven white-hot IR domes per frame laced together by red wireframe lines, the cart a burning constellation in transit above the tinted band of its path. Nothing is labeled. The brightness says which side is the machine. Dragging across the machine view hides domes under the finger and the affected wireframe wobbles until it re-locks; tapping any frame, from either half, flares its constellation; a double tap reseeds the row.

## Construction

- Single self-contained index.html, canvas 2D, no external assets. Strict palette: stage #070708, human bars #3A3D44, human domes #D8DADE, machine domes #FFFFFF, wireframes #FF2E2E at 0.8, cart path #1A2E4A, split and floor lines #16171B. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas; dome glow is layered flat-alpha discs. Zero visible text besides the title element.
- Sync guarantee: each frame computes ONE scene state (an array of frame rects plus dome sets) from piece time via sceneAt(t), then draws that same array twice, once per clipped half. The two views share the transform state by construction and cannot drift. The only machine-side-only offset is the occlusion wobble, applied at draw time after the shared state, exactly as specced (the human view never wobbles).
- Scene: four standing frames (seeded centers 0.17 / 0.39 / 0.61 / 0.83, width about 0.13, height about 0.52, base on the floor line at world y 0.80, small seeded jitter in position, size and dome placement) plus one cart frame (width 0.115, height 0.42) riding a low platform in the front lane (base y 0.878, lane floor 0.90). Standing frames do not move; the stage's only motion is the ferry.
- Cart motion: a triangle wave over the 48 s loop, world x from 0.16 to 0.84 and back, constant velocity with hard reversals (no easing), one full out-and-back cycle per loop so the loop closes seamlessly. Closed form in piece time, plus a 6 s phase offset: at frame one (t = 13 s) the cart sits at world x = 0.698, mid-transit on the outbound leg, right of center and fully inside one side of each view rather than straddling a center line.
- Domes: seven per frame at fixed local positions (four corners, both side midpoints, top center) with small seeded jitter. The machine wireframe is the perimeter loop through those seven points; segments touching a hidden dome are not drawn, so occlusion visibly breaks the rigid body.
- Interaction: pointer drag on the right half occludes domes within 0.085 world units of the finger; a frame that loses more than half its domes wobbles (small sinusoidal draw offset) until the finger passes. Drag on the left half does nothing. Tap (either half; both halves map to the same shared scene coordinates) records a flare event on the nearest frame: its domes swell under a squared-sine envelope for 0.7 s. Double tap advances the seed by an LCG step and rebuilds the inventory, clearing recorded flares.
- Audio: lazy, typeof-guarded AudioContext created only inside a first pointer gesture. A faint detuned room tone (the human side's near-silence), a low triangle glide for the cart whose pitch steps with the cart's direction at each reversal, soft square locking ticks cycling every 2.4 s, and a two-note chime on a tap flare. Silent and complete in the headless QA renderer, which has no AudioContext.
- House rules: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas style width and height pinned in px inside draw(); phone detection via window.screen physical size (min dimension under 700 px) with aspect fallback h > w * 1.15 only; the split stays vertical and centered on phones and the scene fit-scales down (nothing is cropped). Frame one is the synchronous draw at fixed phase T0 = 13 s; the rAF loop, guarded by a typeof check, replays closed-form state as T0 plus elapsed since load. No Date.now anywhere, no microphone APIs.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png). All render cleanly in silence.
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. The duplicate render was deleted.
- Desktop read-back: left half shows four tall matte frames with plain white domes on the floor line and the smaller cart frame in front of the row's right end, riding its platform in the lower lane; right half shows the identical layout as red wireframe loops through burning domes, the cart constellation in transit, and the blue path band along its lane. Positions match across the split.
- Mobile read-back: split centered, all five frames whole in both halves, cart and path band legible, nothing clipped.
- Grep-verified clean: no Date.now, no gradient constructors, no shadowBlur, no ctx.filter, no offscreen canvas, no getUserMedia, no em dashes in either file.

## Deviations

1. Each half shows the whole scene fit into that half (the dual-register mapping established by No.1039) instead of one wide scene clipped at the split. This keeps the two audiences literally the same scene at the same positions, makes tap-to-frame work identically from either half, and keeps every frame's constellation fully readable on phones. Recorded here because the brief's frame-one note about the cart straddling the split assumes the clipped mapping; under the shared mapping the equivalent legibility rule was applied instead: at t = 13 s the cart is at world x = 0.698, fully clear of the center of each view.
2. In the machine view the cart's platform is drawn as a single wire line under its frame rather than a full platform outline, so the constellation stays the subject on that side. The human view draws the full platform bar and wheels.
3. Flares are tap-driven only. The brief specs no scheduled flare for this piece (unlike PP200), so none was added; the machine view's life comes from the ferrying cart and the occlusion wobble.
