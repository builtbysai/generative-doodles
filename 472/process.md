# No.472 Chosen Picture

EXPANSION #56 andrea-ucini, prompt UC8. The one personal image against the imposed pattern.

## Concept

A wall papered in a repeating pattern of tiny blue cars on pale yellow. A wooden chair stands below. On the wall hangs one small framed picture: a blue bicycle on green grass under a yellow sun. The picture is the visitor's to move. Drag it anywhere and the car pattern bends gently away from it, then settles and springs back when the picture moves on: the chosen image disturbing the imposed pattern, quietly. Tap and the picture changes: a small boat, then a cat, then the bicycle again. Everything else stays exactly as it was.

## Construction

Single self-contained index.html, canvas 2D, no external assets, no audio.

- Palette, the eight prompt colors only: wall #EFD9A0, cars #4A7FB5, frame #6B4A2E, paper #F5F2EA, bicycle #2B5FE3, grass #7CB342, sun #F2C14E, chair #8A6A45. The frame's soft shadow is the frame brown at low alpha, so no ninth color appears.
- Canvas sizing follows the Visual Viewport API with resize listeners on visualViewport and window; draw() pins canvas.style.width/height in px every frame. Phone detection uses window.screen (min dimension < 700), aspect h > w*1.15 as fallback only. The wall is full-bleed at every size; the page ground is the wall yellow.
- Wallpaper: a staggered tile grid of car glyphs stored as JS data and redrawn each frame. Each car is a rounded body slab, a cabin with a pale window notch punched out in the wall color, and two wheel discs on the body's lower edge. Tiles carry a fixed seeded print jitter (mulberry32, seed 472) so the paper feels printed, not stamped.
- Warp: every tile eases its offset toward a repulsion target computed from the frame center, smoothstep falloff to zero at radius 0.44 of the short side, maximum offset 0.017 of the short side. Deliberately weak: the pattern resists, it does not flee. Tiles under the frame are skipped, so the pattern is interrupted where the picture hangs.
- The frame hangs at a home position (centered, 34% down) sized at 36% of the short side (52% on phones). The three motifs (bicycle, boat, cat) are drawn as line-and-fill pictograms clipped to the paper area; each keeps the same sun and ground so only the subject changes.
- The chair is a plain front pictogram in the chair brown: two uprights, two back slats, a seat slab wider than the uprights, one low stretcher.
- Interaction: pointerdown on or near the frame starts a drag; the frame eases toward the pointer, clamped so it always stays fully on the wall. A tap (press and release within 350 ms, under 9 px of travel) advances the motif. No click-to-reload anywhere; no other controls. The only text is a quiet lowercase "drag" in the lower-left corner, frame brown at 0.55 alpha.
- Determinism: the first frame is drawn synchronously at load in a constant state: frame at home, bicycle in it, tile offsets pre-settled around the home position (settleOffsets runs at build time, not from the clock). Animation is plain per-frame easing toward rest, anchored to no wall clock. requestAnimationFrame is typeof-guarded; the piece renders fully with no rAF, no AudioContext, no document.createElement, no offscreen canvas.

## QA log

Rendered with node ~/workspace/tools/render-piece.js (node-canvas) at three sizes:

- qa-desktop.png (1280x900): car pattern reads unmistakably as tiny cars tiled across the whole wall, each with body, cabin, window notch and wheels. Framed bicycle legible at hanging height, sun and grass band clear. Chair reads as a chair lower-center, seat slab distinct. Hint "drag" subtle in the corner. Nothing clipped.
- thumb.png (720x720): same read at thumbnail size; cars still cars, bicycle still a bicycle. Rendered twice and byte-compared with cmp: identical. Second render deleted.
- qa-mobile.png (390x844): portrait layout holds; frame larger relative to the wall, cars still legible at the smaller pitch, chair fully in frame near the bottom, hint visible, nothing clipped.

Iterations: one. The first chair build read slightly ladder-like, so the seat slab was made wider (1.02 of chair width) and thicker (0.12) to anchor the chair read; all renders regenerated and determinism re-verified after the change.

Deviations from the prompt, recorded:

- The reseeded cat is drawn in the frame brown #6B4A2E rather than true black. The prompt names a "black cat" motif but its palette lists no black and says nothing else; the frame brown is the darkest palette tone and reads as a dark cat silhouette against the paper.
- Tap reseed is a single tap handler: a quick tap anywhere (on or off the frame) advances the picture. There is no separate double-tap path; a double-tap is two taps and advances twice. The picture still only ever changes by tap, and nothing ever reloads.
- The frame casts a soft shadow in its own brown at 0.28 alpha to lift it off the wallpaper; same hue, no added color.
