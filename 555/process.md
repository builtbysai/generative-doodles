# №555 — Sin Mi Ayuda Estarías Perdido

EXPANSION #67 roberta-vazquez, prompt RV3 (Señor Sabenada).

## Concept

A 2×2 carousel of four wobbly-framed panels starring Señor Sabenada, Roberta
Vázquez's simple yellow know-it-all: permanent smug smile, raised brow, pink
blush, never a flicker of doubt. All in-piece text is Spanish, hand-lettered.

- Panel 1 (white): he waves. Bubbles: "¡HOLA!" and the confession
  "nunca entendí / a qué te dedicas".
- Panel 2 (hatched jungle green): he raises one finger and dispenses advice
  from the bank below.
- Panel 3 (tan): he winks, makes an OK hand. Bubble: "SIN MI AYUDA /
  ESTARÍAS PERDIDO, / BEBÉ…".
- Panel 4 (white): he waves goodbye. Bubble: "¡SALUDOS!".

Interaction: DRAG and his pointing hand and eyes follow you, finger wagging;
release and he snaps back to the smug pose with a fresh piece of unsolicited
advice in panel 2. TAP and the four panels rotate positions by one (carousel
advance). Never click-to-reload. Hint: "drag · tap", bottom right.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets, no
  gradients, flat fills only. Strict palette: Sabenada yellow #F2C230, jungle
  green #3E7A3E, bubble white #FFFFFF, banner tan #EAC97E (page ground and
  panel 3 ground), ink #1A1A1A, blush #F08A8A. Nothing else.
- Design space 1080×1080. Canvas sized from the Visual Viewport API with
  resize listeners on visualViewport and window; canvas style width/height
  pinned in px inside draw(). Phone detection via window.screen physical
  size (min dimension < 700px), aspect h > w*1.15 as fallback only; on
  phones the square stage spans the full width on the tan ground.
- Panel frames are seeded jittered-rect paths (one wobble seed family per
  slot), so the borders are hand-drawn, never straight vector rectangles.
- The jungle is a precomputed seeded hatch field (210 ink strokes plus 26
  leaf ellipses, mulberry32 seed 4242), drawn as data each frame; the QA
  renderer has no offscreen canvas.
- Hand lettering: bold rounded system font stack with per-letter rotation
  and baseline jitter driven by a stable hash of the string, so the lettering
  wobbles identically on every frame and no font asset is loaded.
- Sabenada is one parametric figure function with four poses (wave left,
  point, wink + OK hand, wave right). The face rig only ever draws the smug
  set: half-lidded eyes, one raised brow, arc smile; the wink pose closes one
  eye and keeps the smile.
- Drag-follow: while dragging, panel 2's figure (wherever the carousel has
  rotated it) aims its pupils and pointing hand at the pointer and the finger
  wags on the shared clock; the gaze eases home on release. Frame one is the
  synchronous draw at constant PHASE0 = 0.9 with the canonical panel order;
  the rAF loop (typeof-guarded) is anchored as PHASE0 + elapsed. No
  Date.now anywhere. Seeded RNG: mulberry32, seed 555067.

### The advice bank (12 fixed lines, panel 2)

1. El truco del trabajo es parecer ocupado. De nada.
2. Si tu jefe no te valora, renuncia. Yo te consigo otro. Bueno, casi.
3. En el amor, hazte el difícil. Funciona siempre. Casi siempre.
4. ¿Problemas de pareja? Compra flores. O un coche. Yo qué sé.
5. Para la salud: duerme mucho y no leas noticias. Problema resuelto.
6. El dolor de espalda se cura ignorándolo. Confía en mí.
7. El dinero se multiplica solo si no lo miras. Es física.
8. Invierte en lo que suba. Si baja, es que no era eso.
9. La dieta perfecta: come de todo, pero con confianza.
10. Si discutes, sube el volumen. Así se ganan los debates.
11. Tu currículum está perfecto. Solo falta que lo lean.
12. El amor verdadero llega cuando dejas de buscarlo. O no.

Panel 2's initial bubble is the fixed seed pick: line 9, "La dieta perfecta:
come de todo, pero con confianza." On drag release the bubble advances to
the next bank line (+1, wrapping), so every release brings a line he has not
just said while staying inside the seeded, deterministic discipline.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280×900
  (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png).
- Determinism gate: thumb.png rendered twice and `cmp` byte-compared,
  identical; second render deleted. Re-verified after the fix pass.
- First pass failed visual read-back: bubble tails were drawn from the
  bubble's top edge and crossed the text as long diagonal strokes, and
  panel 1's confession bubble overlapped the figure's head. Fixed: tails are
  now short triangles hanging from the bottom edge with the seam erased, and
  panel 1's two bubbles sit side by side along the top, clear of the head.
  The OK hand was also redrawn larger so the ring and fingers read at
  gallery size. All sizes re-rendered and re-checked.
- Final read-back: desktop and thumb show four panels (wave + confession,
  jungle advice with raised finger, wink + OK hand, farewell wave), all
  Spanish bubbles legible, smug faces throughout; mobile shows the whole
  square stage centred on the tan ground, nothing clipped.

## Deviations

- The confession wording "nunca entendí a qué te dedicas" is the
  construction choice for the confession the prompt describes (the prompt
  paraphrases it rather than quoting it), as directed in the build brief.
- Drag release advances the advice bubble to the next bank line in fixed
  order instead of a fresh random pick: guarantees a new line per release
  and keeps all state changes inside the seeded RNG discipline.
- Lettering uses a system rounded-bold font stack with seeded per-letter
  jitter rather than drawn letter paths: no external font assets are
  permitted, and the jitter keeps the hand-lettered wobble the prompt asks
  for.
