# No.524 Lantern Hill

EXPANSION #63 giulia-conoscenti, prompt GC4 ("Night Festa").

## Concept

A night festa on a Sicilian hill: a dark green slope under a black starry sky, a string of glowing red lanterns arcing overhead, a white dome with a red cupola at the hill's left edge, a red tree with green fringe branches in the right foreground, and a crowd of small flat dancers in red and yellow turning through simple dance poses. Dragging stirs a breeze: the dancers lean, the lanterns swing wider, and then everything settles back into the loop.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no audio, no microphone.
- Palette is flat fills only, exactly as specced: sky `#101014`, hill `#1E6E46`, dancer red `#E6392B`, dancer yellow `#F2B705`, lanterns `#FF4E3B`, dome `#F7F2E4`, tree red `#C8352A` (plus a leaf green `#2E9E57` for the fringe and cream for star/hint ink). No gradients anywhere; lantern glow is three layered translucent circles, never the gradient tool.
- Square stage fitted from the Visual Viewport API (resize listeners on `visualViewport` and `window`), letterboxed on the sky-black page ground; the canvas CSS size is pinned in px inside `draw()` every frame. Phone detection uses `window.screen` min dimension < 700px with the `h > w*1.15` aspect fallback.
- Hill surface is an analytic curve (`hillY`), horizon at ~55% height on the left sloping down to the right.
- Dancers: 17 parametric glyphs (torso line, two arm segments, two leg segments, round head), each cycling through 3 pose keyframes (arms-up V, one-arm reach, wide horizontal) with smoothstep interpolation, individual cycle speeds and phase offsets. They are placed in depth rows: back rows sit higher on the hill and render smaller, front rows larger, sorted back-to-front. Colours alternate red/yellow.
- Lanterns: 11 lanterns hang from a shallow catenary-style string across the top third; each sways on its own phase. The breeze is a single global `wind` value fed by pointer-drag velocity (clamped) and decayed every frame; it adds lean to every dancer, widens lantern sway, and stirs the tree fringe, then dies away.
- Dome: white hemisphere with a red cupola, finial, and a small dark doorway, anchored on the hill surface at the left edge.
- Tree: red trunk and two branches drawn as quadratic strokes; the fringe is 48 seeded hanging green strokes regenerated deterministically each frame from a fixed-seed RNG.
- Grain: 620 precomputed seeded speck strokes (mulberry32, fixed seed 524063) drawn directly each frame; no offscreen canvas is ever created. Stars (150, seeded) twinkle by alpha sine.
- Interaction: drag anywhere for the breeze. No click-to-reload anywhere. One subtle lowercase hint, "drag", bottom-left.
- Determinism: frame one is a synchronous `draw(PHASE0)` at the constant phase 2.4s (dancers mid-pose-cycle at fixed phases, lanterns at rest sway, wind zero). The rAF loop (typeof-guarded) is anchored as `PHASE0 + elapsed since first frame callback`; no clock value feeds frame one.

## QA log

- Rendered with `render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and `cmp` byte-compared: identical. Second render deleted.
- Desktop/thumb read-back: black starry sky, 11 red lanterns with layered flat glow arcing across the top third, green sloping hill, white dome with red cupola clear at the left edge, 17 red/yellow dancers in varied poses and scales across the slope, red tree with green fringe bottom-right, "drag" hint bottom-left.
- Mobile read-back: square stage centred on the black ground, whole composition in frame, nothing clipped.
- First QA pass fix: dancer poses read as blobs (arm angles pointed down-left, limbs too thick, one dancer overlapped the dome). Fixed by redefining the pose keyframes around a down=0 / up=PI angle convention, thinning limb strokes, enlarging glyphs and heads slightly, and moving the dancer field right (x 0.17-0.80) so it clears both the dome and the tree. Re-rendered and re-verified deterministic after the fix.

## Deviations

- Dancer count is 17 (prompt range 14-20); recorded here as required.
- One extra leaf green (`#2E9E57`) is used for the tree fringe: the prompt names the fringe green without a hex, and the hill green `#1E6E46` would make the fringe invisible against the hill where they overlap, so a brighter sibling green was chosen. All other colours are exactly the specced palette.
- The breeze decays inside `draw()` with a fixed per-frame factor rather than a dt-integrated decay, so the settle feel is tuned to a nominal 60fps; the first frame is unaffected (wind starts at zero).
