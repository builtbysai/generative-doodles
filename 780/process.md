# No.780 "Rotational Horizon"

EXPANSION #95 doug-wheeler, prompt block PP5 "Rotational Horizon" (LC 71 NY DZ 13 DW, 2014).
The world turns; the horizon doesn't.

## Concept

A domed blue room. The floor is gently convex, a disembodied analog of the earth, and a ring of small LED points follows the floor's curve at the horizon, shifting color slowly in a traveling wave. One small dark figure stands at the center, on the high point of the floor. Dragging orbits the viewpoint: the dome's light and the LED ring wheel around, but the horizon curve and the figure stay exactly where they are. Release the drag and the rotation glides to rest.

## Construction

- Palette is strict: dome #8FB3D9 (center) to #6E97C4 (edges), floor #E8EEF4, LED anchors #FFD9A0 / #A0C8FF / #FFB3B3, figure #1A1D22. Every drawn pixel is one of these colors or an alpha of one.
- Dome: 14 layered concentric ellipse bands stepping from the edge blue at the rim to the center blue at the middle (house rule: flat bands, no smooth gradients). Over them sits a soft shading lobe, the dome's light center, built from 5 low-alpha center-blue ellipses.
- Horizon: y(x) = 0.70H + 0.045H * (2x/W - 1)^2, a parabola peaking at center, so the floor band below it reads convex. The floor is flat #E8EEF4 with one low-alpha edge-blue wash across its lowest tenth for depth.
- LED ring: 140 points (prompt range 120-160) placed on the horizon curve, each drawn as a halo disc (alpha 0.28, radius 2.6r) under a solid core. Color is a three-anchor cycle warm -> cool -> rose -> warm driven by phase p = frac(u - t/48s), where u is the point's ring parameter. One full wave lives around the ring, so the colors are out of phase point to point and the wave travels as t advances.
- Orbit and wraparound: orbit is measured in full turns and is a closed-form function of the recorded drag samples and t. While dragging, orbit = oStart + (xCur - xStart)/W. On release, the release velocity (from the last two recorded samples, clamped to half a turn per second) decays exponentially: orbit(t) = o0 + (v0/K)(1 - exp(-K(t - t0))), K = 1.8. LED screen positions are frac(u + orbit) * W, so points wrap seamlessly. The dome's shading lobe is tiled with period W (drawn at cx-W, cx, cx+W with cx = W * frac(0.5 - orbit)), so the shading center also wraps continuously with no jump. The floor curve and the figure are never transformed by orbit: that is the prompt's conceit, kept exact.
- Figure: a single tapered silhouette path plus a head circle, #1A1D22, height 8.5% of frame (10% on phones), feet planted at horizonY(center).
- Sizing from the Visual Viewport API with resize listeners on visualViewport and window; canvas CSS size pinned in px inside draw() every frame. Phone detection via window.screen (min dimension < 700px) with the h > w*1.15 aspect fallback. Page ground is the edge blue #6E97C4. rAF is typeof-guarded; no audio, no Date.now, no external assets, no text besides the title.

## Frame one

Orbit offset 0, wave at phase 0: phase equals the ring parameter u, so the ring grades warm at the left edge, through cool just left of center, to rose right of center, and back toward warm at the far right edge where the cycle closes. Frame one is the synchronous draw(0) at load; the animation loop is anchored as offset + elapsed-since-load, never derived from a wall clock.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice, cmp byte-compare identical; the duplicate was deleted.
- Desktop read-back: stepped blue dome with lighter center, pale convex floor in the lower third, LED ring hugging the curve in the phase-0 grading, tiny dark figure at center on the high point. Nothing clipped.
- Mobile read-back: same composition in the tall frame; dome bands run vertically elongated, ring and figure intact, nothing clipped.
- Thumb read-back: same read at square size.

## Deviations

- None from the prompt's substance. Two construction notes: (1) the prompt's dome and floor gradients are rendered as layered flat bands and a tiled low-alpha lobe, per the house no-gradient rule; the step banding is deliberate and matches the "clean stepped dome" read. (2) The release glide uses a closed-form exponential velocity decay rather than frame-integrated easing, so orbit stays a pure function of the recorded drag samples and t (determinism gate).
