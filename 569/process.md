# No.569 — Una Libreta de Salas de Espera

EXPANSION #69 power-paola, prompt PP1 (AFUERA mode, her waiting-room notebook register).

## Concept

One long horizontal leporello strip of small ink portraits of strangers in waiting rooms, in Power Paola's thin-line notebook economy: single stroke weight, no fill, no shading, faces reduced to two dots and a line. The people are strangers, drawn with respect, never caricature. Each vignette carries one wobbly handwritten annotation underneath, in the register of her "Una libreta de salas de espera" post: a place, a time, or a two-word observation. The strip rests; the viewer drags through it the way you would unfold a leporello notebook.

The seven vignettes, left to right:

1. An old man seated, reading a newspaper.
2. A woman seated, handbag held on her lap.
3. A child asleep, curled on top of a big bag on the floor, a row of chairs behind.
4. A man standing, hands in his pockets.
5. A nurse passing: only her legs and shoes enter the frame, mid-stride, ID badge dangling.
6. A woman seated, holding up her paper ticket to look at it.
7. An old woman seated, eyes closed, cane leaning against her chair.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no audio, no microphone.
- Strict palette: ink `#1A1A1A`, paper cream `#F4EEDC`, grey wash `#B9B4A6` used only for the plastic chairs (backrest, seat, legs). Nothing else.
- Canvas sized from the Visual Viewport API, with resize listeners on both `visualViewport` and `window`; the canvas CSS size is pinned in px inside every `draw()`. Phone detection via `window.screen` physical size (min dimension < 700px), aspect `h > w*1.15` as fallback only; the strip stays full-width on phones and the page ground is the paper cream.
- Each vignette is drawn in a fixed 250x360 design space (parametric seated/standing bodies, shared chair and head helpers with hair and eye variants), scaled to the viewport. Faint fold lines separate the vignettes; top and bottom rules run the full width as the leporello band edges.
- Hand-lettered annotations: canvas text in a cursive font stack, drawn letter by letter with per-letter rotation and offset jitter from a mulberry32 RNG seeded by the text hash and letter index, so the wobble is identical on every frame and every render.
- Interaction: horizontal drag scrolls the strip (content is wider than the stage), with smoothed release velocity and soft-decay inertia in the animation loop; a tap (small movement, short press) on a vignette selects it: the vignette lifts slightly and its annotation appears enlarged on a small paper card under the strip. No auto-play, no click-to-reload.
- Determinism: frame one is drawn synchronously at load, strip at rest offset 0, nothing selected, fully composed. Phase is anchored as a fixed offset plus elapsed time; the loop is `requestAnimationFrame`-guarded with a `typeof` check, and nothing in the drawing path reads the wall clock.

### Annotations (verbatim, as drawn)

1. "Retiro 14:20" (from the prompt)
2. "hospital" (from the prompt)
3. "se durmió" (from the prompt)
4. "espera larga"
5. "zapatos blancos"
6. "turno 47"
7. "ojos cerrados"

Annotations 4–7 were composed for this piece in the same register the prompt specifies (place + time, or a two-word observation). No dialogue was invented for any figure.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with `cmp`: identical. The second render was deleted.
- Read-back, desktop: the band shows the newspaper reader ("Retiro 14:20"), the woman with her bag ("hospital"), the child asleep on the bag in front of two grey chairs ("se durmió"), and the standing man ("espera larga"); the nurse vignette enters at the right edge, cueing the scroll. Grey appears only on chairs; annotations are legible with the intended hand wobble.
- Read-back, mobile: one full vignette spans the width, annotation readable, the next vignette's ground line enters at the right edge; nothing clipped; the "drag · tap" hint sits in the bottom-right corner.
- Read-back, thumb: first three vignettes read at small size; chairs, figures, and annotations all hold up.
- Source checked: no `Date.now`, no external URLs, no `document.createElement`, no `AudioContext` in the file.

## Deviations

- The nurse is cropped at the top of the vignette (legs and shoes only, with a crop line and her ID badge). Reason: the prompt's vignette is specifically "a nurse's shoes passing"; the crop is the notebook way of noting someone who crosses the page without sitting down.
- The annotation card on tap shows the tapped vignette's own annotation enlarged, rather than introducing any new text. Reason: the prompt bans invented dialogue; reusing the annotation keeps every word on the page hers in register.
- No deviation from the palette, the interaction model, or the determinism rule.
