# No.757 Excursus Square

EXPANSION #92 robert-irwin, prompt block 6 "Excursus Square". Irwin's Homage to the Square cubed (Dia, 1998-99): nested squares after Albers, rebuilt as a time piece, where the bands between squares are perceptual instruments and only color moves.

## Concept

Four nested squares, truly centered, the outermost bleeding past the frame edges as a full-frame fill. Nothing outlines, rotates, scales, or casts a shadow: the chromatic edge between bands is the only border there is. Over a six-minute master cycle each band's hue drifts plus or minus 8 degrees on its own independent period, so the relationships between the squares keep reorganizing themselves: a band that receded starts to advance, the center warms or cools against the cream around it, and the same four squares never sit in quite the same balance twice in a row. Double-tap reseeds to a new palette stack, crossfading over four seconds.

## Construction

- Stack 0 is the prompt's exact stack: outer #C9B896, band #A85B3F, inner #E5D6B8, center #2E3A4A. Colors are stored as HSL (converted once from the hexes) so drift moves hue directly.
- Stack generation family: reseeded stacks come from a mulberry32 stream seeded per stack index (757031 + index times 7919), each band drawn from its own muted anchor range: outer = warm neutrals (hue 34-48, saturation 22-38%, lightness 56-70%); band = rusts and terracottas (hue 11-26, saturation 34-50%, lightness 37-49%); inner = creams (hue 37-50, saturation 29-45%, lightness 73-83%); center = deep slate (hue 203-224, saturation 16-30%, lightness 19-28%) or deep brown (hue 19-31, saturation 24-38%, lightness 17-25%), chosen by the stream. The value ladder (light outer, mid band, lightest inner, dark center) is preserved by construction, so no generated stack can turn neon or collapse into mud.
- Drift model: master cycle 360 s. Hue offset per band = 8 degrees times sin(2 pi t / period) with periods 360, 288, 240, 360 s per band; saturation breathes plus or minus 2 points on periods 216, 360, 180, 270 s. Lightness never moves, holding the value relationships stable. All sines have phase 0, so at t = 0 every offset is exactly 0 and frame one is the pure specced stack.
- Reseed: two pointerdowns within 350 ms count as a double-tap. The reseed is recorded as an event (time, from-index, to-index); base colors crossfade between the two stacks over 4 s (smoothstep, shortest-path hue lerp), and drift applies on top of the faded base. Event times come from the frame clock, so all state is a function of (recorded events, t).
- Geometry: squares sized on the smaller frame dimension: band square 0.76, inner 0.52, center 0.30 of min(W, H), truly centered. No strokes anywhere.
- House rules: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas style width/height pinned in px inside draw(); phone detection via window.screen (min dimension < 700 px) with aspect fallback; page ground set to the outer band's current tone each frame (guarded, since the QA renderer has no document.body); rAF typeof-guarded; no audio, no external assets, no text except the title.
- Inert QA hook, house convention: ?seed=tNN draws at loop time NN seconds.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). All three read back: four nested flat squares, cream outer, rust band, pale cream inner, deep slate center, no outlines, no text, nothing clipped on mobile; the nesting stays centered and square on the tall phone frame with the outer tone filling the rest.
- Pixel samples on thumb.png: outer rgb(201,184,150) = #C9B896; band rgb(168,91,63) = #A85B3F; inner rgb(229,214,184) = #E5D6B8; center rgb(46,58,74) = #2E3A4A. Frame one is the exact specced stack.
- Determinism: thumb.png rendered twice back to back and cmp byte-compared identical; duplicate deleted. Frame one is the synchronous draw at t = 0; no Date.now, no Math.random anywhere (grep audited; the only requestAnimationFrame occurrences are inside the typeof guard).
- Forced drift check via ?seed=t90 (throwaway render, sampled, then deleted): all four bands shifted slightly within family (outer toward 202,191,149; band rust warmer at 170,103,61; center slate at 45,54,75), composition unchanged, confirming the drift path runs and frame one is the un-drifted anchor.

## Deviations

- One recorded simplification in the reseed crossfade: if a second double-tap lands mid-fade, the new fade starts from the previous target stack's base colors rather than from the exact mid-fade blend on screen. Fades are four seconds and double-taps are deliberate, so the difference is a few percent of one band for a few seconds; the simplification keeps the state a clean function of (events, t) with no per-frame history.
- The prompt's Albers-style downward offset of the inner squares was not used: the prompt's own composition line says centered, so the squares are truly centered.
