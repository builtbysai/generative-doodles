# №574 — Tengo Gripe

EXPANSION #69 power-paola, prompt PP6 "No Estoy Llorando". Title suggestion used verbatim.

## Concept

Her 2022 gouache, restaged as a living page: a woman in a navy turtleneck sits at a yellow table with red radiating stripes, crying heavily in full sunny color, and insists in hand-lettered caption that she is not crying, she has the flu. The grief is never explained and the palette never darkens for it. In front of her, an open sketchbook argues back: a red heart on the left page, two green crying eyes on the right, each weeping at its own rate. A smartphone waits in one hand; a jar with a paintbrush sits on the table; behind her, a window opens onto a sunny balcony with potted plants.

## Construction

- Single self-contained `index.html`, canvas 2D, 1000×1000 stage fitted and centred in the viewport; page ground is the paper colour (`#F5F0E0`).
- Strict palette only: table `#E8B93C`, stripes/heart `#D93A2B`, turtleneck and all linework `#2A3A5A`, tears `#BFD8E8`/`#FFFFFF`, page eyes `#5A9A5A`, skin `#E8B88A`, sun and hair `#F5D90A`, plants `#5A8A4A`, paper `#F5F0E0`. Flat fills throughout; the only blends are alpha washes of palette colours (tear streaks, window light bands, jar) and interpolation between two palette colours for the window's morning-to-dusk shift.
- Paper texture: 320 precomputed seeded speckles drawn directly each frame (no offscreen canvas, no filters, no gradients).
- Tears are phase-aligned emitters: each stream drops teardrops along a fixed quadratic cheek/page path, count, size and speed driven by an intensity value. The face streams run at full intensity; the heart and page-eyes streams share a smoothed `cryMix`.
- Interaction: TAP the sketchbook swaps which page cries harder (heart vs. eyes, eased by `cryMix`). DRAG on the window shifts the balcony light from morning to dusk: the sun disc lowers and warms from `#F5D90A` to `#D93A2B`, the three flat sky bands interpolate (blue/white/white toward navy/red/table yellow), and the light bands cast on the wall follow. Taps anywhere else do nothing. Never click-to-reload.
- Hand-lettered caption "No estoy llorando, tengo gripe." drawn letter by letter with precomputed seeded jitter; small "tap · drag" hint, bottom right.
- House rules: Visual Viewport sizing with resize listeners on `visualViewport` and `window`; canvas pinned in px inside `draw()`; phone detection via `window.screen` (min dimension < 700px) with aspect fallback; frame one is a synchronous draw at the constant phase `PHASE0 = 2.35`, and the rAF loop (typeof-guarded) is anchored as PHASE0 + elapsed. Seeded mulberry32 (seed 574069); every jittered outline is precomputed once at build so the hand line never flickers. No audio, no microphone, no external assets.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280×900 (qa-desktop.png), 390×844 (qa-mobile.png) and 720×720 (thumb.png); all three read back and inspected.
- Determinism: thumb rendered twice and byte-compared with `cmp` — identical; second render deleted. Re-verified after the fix pass below.
- Frame one shows: figure mid-cry with tear chains running from both eyes down onto the turtleneck, heart page crying hard and eyes page crying softly (the opening state), morning sun high in the window, caption fully legible.
- Fix pass 1: the hair sweep originally wrapped the whole head and read as a sun headdress; narrowed to the top arc so it reads as short spiky hair. The window's lowest sky band was flat sun-yellow and read as a yellow slab behind the balcony; changed to white in the morning state so the balcony reads as bright daylight (it warms to table yellow only at dusk).
- Mobile: stage fits the 390px width centred, caption and hint stay inside the frame, nothing clipped.
- Grep checks: zero `Date.now`, zero `document.createElement`, zero external URLs.

## Deviations

- Hair colour: the prompt says "short spiky light hair" without a hex; used the palette's sun yellow `#F5D90A` for the hair so the piece stays inside the strict palette and in full sunny color.
- The dusk end of the window drag interpolates between palette colours only (flat bands, no gradients); no non-palette colour is introduced.
- `ctx.roundRect` was avoided in favour of a manual rounded-rect path for renderer compatibility.
