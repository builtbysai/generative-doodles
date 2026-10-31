# No.542 — Four Passes

EXPANSION #65 nadia-hafid, prompt NH6. Her 2019 bar process strip — freehand to ruled line, black fills, flat color, light as shapes — made interactive: one night bar scene the viewer colors by dragging.

## Concept

A single full-bleed bar scene exists in four states at once: (1) clean ruled line art on white, (2) the same drawing with its solid black fills, (3) flat color over that (periwinkle night, skin tones), (4) flat lamp-white light wedges falling from the three hanging lamps. A horizontal drag scrubs continuously through the passes and back; nothing auto-plays and there is no explanatory text, because the scrubbing is the explanation. The only chrome is a four-square stage indicator, bottom-left, tiny, and a lowercase "drag" hint.

The scene: a woman large in the foreground holding a stemmed glass up; behind the bar a bartender and a standing customer, glasses on the counter; three bottle shelves; two empty stools; three hanging lamps. Faces are Hafid symbol-faces — dot eyes, a single line mouth — drawn with the line pass so they survive every stage.

Palette, strictly: periwinkle #5B6BB5, skin #E8B48C, black #161616, white #FFFFFF, lamp-white #F5F2E8. Flat fills only; no gradients anywhere.

## Construction

One shared vector scene, four render passes over it. Every element is registered exactly once in a `shapes` array as a path-tracing function plus a fill class (`peri`, `skin`, `white`, `ink`, or none) and a flag for whether the line pass strokes it. The passes are walks over that single registry, composited in sequence each frame with `globalAlpha` driven by the scrub value (0..3):

- Pass 1 is the ground state: white stage, then every registered outline stroked in ink. It is drawn at every scrub position, so the line never disappears.
- Pass 2 (alpha = clamp(scrub, 0, 1)) fills every `ink`-class shape: floor, lamp shades, shelf boards, hair, the woman's dress, the customer's jacket, the bartender's vest, the bar slab, stools, and every second bottle.
- Pass 3 (alpha = clamp(scrub − 1, 0, 1)) fills the color classes under the same outlines: periwinkle wall, skin faces/necks/limbs, white counter front, shirts, glasses, and the alternate bottles.
- Pass 4 (alpha = clamp(scrub − 2, 0, 1)) fills the light shapes, kept in a separate list since they have no outline: one flat wedge polygon per lamp plus its bulb circle, in lamp-white.

Because all four passes trace the same registered paths, the stages cannot drift out of registration; scrubbing is a true cross-dissolve of one drawing, not four drawings. No offscreen canvas is used — the layers are drawn in sequence onto the visible canvas each frame, per the QA renderer's limits.

Interaction: pointer/touch drag maps the pointer's horizontal position across the stage to scrub 0..3; the displayed scrub eases toward the target in the rAF loop. Frame one is the synchronous first draw at scrub exactly 0 — pass 1 only, clean line art, first indicator square filled. The stage indicator fills the square nearest the current scrub.

House rules: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas CSS size pinned in px inside draw(); phone detection via window.screen physical size (min dimension < 700px) with aspect fallback only — phones take the stage at full width, desktop centers the square. Seeded RNG (mulberry32, fixed seed 542065) varies bottle widths, heights, and spacing on the shelves. rAF is typeof-guarded; frame one never derives from Date.now(). No audio, no microphone, no external assets.

## QA log

Rendered with the node-canvas piece renderer at 1280×900 (qa-desktop.png), 390×844 (qa-mobile.png), and 720×720 (thumb.png).

- Determinism: thumb rendered twice and byte-compared with cmp — identical; the duplicate was deleted. Re-verified after the fix pass below.
- Desktop/thumb readback: clean line-art bar scene — foreground woman raising a glass (symbol-face, hair with a scooped hairline), bartender and customer behind the bar with glasses on the counter, three bottle shelves, three hanging lamps, two stools, counter grooves; stage indicator bottom-left with the first square filled; "drag" hint bottom-right. Nothing clipped.
- Mobile readback: whole square stage fits the 390 width, all elements legible, indicator and hint readable, nothing clipped.
- Fix during QA: the woman's neck was registered as a stroked rectangle and read as a stray box hanging from her chin across the shoulder line. It is now a fill-only shape (the chin and shoulder lines bound it), and her mouth moved up to sit properly in the face. The "drag" hint was white at low alpha — invisible on the white paper of pass 1 — and is now periwinkle at 0.8 alpha, visible on the pass-1 paper and on the black floor of the later passes alike. All three sizes re-rendered and determinism re-verified after the fix.

## Deviations

- The two background figures have no arms: their torsos end at the bar counter, which is where the counter cuts them in the scene's own geometry; adding forearms would have floated hands over the counter front. Recorded rather than fudged.
- The stage indicator's active square is marked with an inner ink square rather than a full fill, so the indicator stays legible over both the white paper of pass 1 and the black floor that pass 2 lays under it.
- The hint word is periwinkle (a palette color) rather than the usual gray, for the same two-ground legibility reason.
- Light wedges carry no outline. In her strips the light is a flat shape laid into the drawing; stroking the wedges would have turned them into objects. The line pass still draws every outlined element over them, so the drawing reads through the light.
