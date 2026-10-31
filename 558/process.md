# №558 — Un Poco de Costumbrismo

EXPANSION #67 roberta-vazquez, prompt RV6. A 10-panel grid (2 columns × 5 rows) of millennial domestic rituals, each panel a self-contained vignette with a hand-lettered caption strip, in her wobbly-panel page architecture.

## Concept

One portrait page of small comforts and small despairs, all of them happening indoors, most of them involving a screen or something steaming:

1. **Khaleesi** — a bathtub of scalding teal water under a hand-lettered "200°C" tag, steam rising, rubber duck on the rim.
2. **babe are you ok?** — a half-eaten cake decorated as Tanjiro (green/black checker band, forehead-mark dot), wedge cut out showing the strata, icing drip, fork, crumbs.
3. **fake scenario** — a red soda can wearing the words as its label, fizz bubbles rising on both sides.
4. **PLANAZO** — nachos under cheese next to a TV whose cartoon cat changes expression every second.
5. **¿QUÉ ESTOY HACIENDO CON MI VIDA?** — a woman in a pink DOJA hoodie and a face mask, heavy-lidded, blinking slowly.
6. **combo tía frívola** — a glowing laptop mid-show plus a salad bowl with a bobbing fork.
7. **sin leer desde 2019** — a manga stack ("Marmalade Boy", "Tokyo Revengers" on the spines), bookmark ribbon swaying.
8. **llorando con Rosalía** — someone in bed, tears falling on a loop, phone in hand, music notes drifting off it, tissue box at the ready.
9. **cena de campeones** — Evangelion on a laptop (mecha-head silhouette, "EVA" tag) above steaming fries and two fried eggs.
10. **terapia de plantas** — watering a monstera while the cat supervises (panel 10 invention, see Deviations).

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no audio, no microphone. Flat fills only, no gradients anywhere.
- Portrait design space 1080×1440 on the banner-tan page ground (#EAC97E); the page is a wobbly-bordered cream sheet, panels are jittered-rect frames (seeded per panel) over warm cream grounds, divided by hand-drawn gutter lines, caption strip in banner tan under each scene.
- All lettering is canvas text with precomputed per-letter jitter (rotation/offset from fixed seeds), so the hand-lettered wobble never shimmers between frames.
- Motion is watch-only micro-loops on one shared clock with integer-ratio periods: bath steam (2.4s rise), icing drip and cheese drip (2-frame growth), TV face swap (1s), hoodie blink (3.2s period), laptop glow flicker (2-frame), salad fork bob, bookmark sway, tear drops (1.1s), music notes (2.2s), fry steam, watering-can drops. Steam/tears/bubbles/notes are precomputed seeded data arrays drawn directly each frame (the QA renderer has no offscreen canvas, so no paint layers).
- Interaction: TAP a panel and it expands to fill the page width with its caption large (flat fade/scale over ~0.35s); tap again to return to the grid. Panels never change content; never click-to-reload. A subtle lowercase "tap" sits in the page's bottom-right corner.
- House rules: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas CSS size pinned in px inside draw() every frame; phone detection via window.screen physical size (min dimension < 700px), aspect fallback only; on phones the portrait page spans the full width, centered on the tan ground.
- Determinism: frame one is the synchronous draw at constant PHASE0 = 2.3 (grid view, nothing expanded, micro-loops mid-cycle at fixed phases). The rAF loop is typeof-guarded and anchored as PHASE0 + elapsed since load; no Date.now anywhere. Seeded RNG is mulberry32, fixed seed 558067.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280×900 (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png).
- thumb.png rendered twice and byte-compared with cmp: identical (determinism gate passed).
- Read-back of all three renders: all ten captioned vignettes present and legible in the 2×5 grid; nothing clipped on mobile.

## Deviations

- **Panel 10 invented, per the brief:** a plant-watering ritual ("terapia de plantas") — a figure in a teal sweater watering a monstera from a terracotta-colored can, water drops cycling, a black cat supervising. Same flat domestic spirit as the specced nine.
- **Captions for panels 7, 8, 9 written in her voice:** the prompt fixes those panels' content (manga titles on spines; crying to Rosalía; Evangelion + fries + eggs) but no caption-strip text, and the page architecture captions every panel. Strips read "sin leer desde 2019", "llorando con Rosalía", "cena de campeones". The specced in-panel texts (spine titles, the "EVA" tag) are all present as specced.
- **Supporting domestic tones added:** the prompt's hexes are all used as specced (bathwater teal, nacho cheese, DOJA pink, laptop glow blue, manga red/black/white, egg yellow, fry gold, banner tan, ink). Skin, hair brown, terracotta, leaf green, mask pale, blanket rose, and cake cream are flat supporting tones needed to draw the scenes at all; no specced color was changed.
- The soda can's specced label "fake scenario" doubles as its panel caption (also lettered on the can itself), since the prompt gives that panel no separate caption.
