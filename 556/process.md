# No.556 — El Piropo del Siglo XXI

EXPANSION #67 roberta-vazquez, prompt RV4 ("The 21st-Century Compliment").

## Concept

Two flat-orange monkeys sit side by side on a black branch in a dense grey
hatched jungle and trade compliments so backhanded they barely qualify. The
left monkey has a dark grey face, the right one a cream face; both are
completely deadpan, with dot eyes under straight lids and one flat mouth
line. Neither ever smiles and neither ever leaves the branch. A big wobbly
white speech bubble across the top delivers the current compliment, and a
tan caption banner along the bottom names the piece: "EL PIROPO DEL S. XXI".
Watch-only: the monkeys breathe, the leaves sway, and every eight seconds
the bubble re-letters itself with the next compliment.

## Construction

- Single self-contained canvas piece, 1080x1080 design space, flat fills
  only, no gradients, no external assets, no interaction of any kind.
- Strict palette: monkey orange #E07B2E, face grey #6A6A6A, face cream
  #F2E4C8, jungle hatch grey #8A8A8A, branch black #1A1A1A, bubble white
  #FFFFFF, banner tan #EAC97E. The face grey doubles as the jungle tone
  (hatch strokes and leaf silhouettes), so the jungle carries no colour of
  its own.
- Jungle: a precomputed seeded hatch field (mulberry32, seed 556021;
  1,500 short diagonal strokes) plus 30 leaf silhouettes, all drawn
  directly every frame (the QA renderer has no offscreen canvas). Leaves
  sway on one shared sine phase. Leaves that would land on a monkey's head
  are nudged away at build time.
- Monkeys: parametric seated figures (tail curl, body ellipse, resting
  arms, feet on the branch, round ears, face patch). Breathing is a
  stepped 2-frame bob (3 design units), phase-shifted between the two.
- Speech bubble: a fixed wobbly outline (seeded jittered rectangle, seed
  556099) with a tail pointing at the grey-faced monkey. Its position and
  shape never change; only the text swaps. Lettering is per-character
  with small seeded rotation/offset jitter, re-seeded per compliment, so
  each compliment is lettered fresh when it swaps in and then stays put.
- Text swap: compliment index = floor(t / 8) mod 5 on the shared clock.
- Sizing follows the house rules: Visual Viewport API with resize
  listeners on visualViewport and window, canvas pinned in px inside
  draw, phone detection via window.screen (min dimension < 700px) with
  the aspect fallback. The page ground is the hatch grey, so the phone
  letterbox is invisible.
- Determinism: the first frame is drawn synchronously at the constant
  phase PHASE0 = 1.6s (first compliment, mid-breath, not at a swap
  boundary); the rAF loop is typeof-guarded and anchored as
  PHASE0 + elapsed. Frame one is never derived from Date.now().

Compliment bank (fixed order):

1. "Pues yo creo que estás super bien de la cabeza…"
2. "qué guapo estás hoy… para lo que hay"
3. "Tienes una cara muy… fácil de recordar."
4. "Sin ti esto sería insoportable. Contigo, solo es pesado."
5. "Me encanta tu camisa. Se nota que no te importa nada."

Lines 1 and 2 are the prompt's own; lines 3-5 were written for this piece
in the same deadpan, backhanded voice.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and cmp-compared,
  byte-identical; the second render was deleted.
- Read back all three renders: both monkeys deadpan on the branch (grey
  face left, cream face right), grey hatch jungle with leaf silhouettes,
  wobbly white bubble showing compliment 1 in full, tan banner legible.
  On mobile the square stage spans the full width and nothing is clipped.

## Deviations

- The face grey #6A6A6A is reused as the jungle's tone (hatch strokes and
  leaf fills) against the #8A8A8A ground. Reason: the strict palette has
  only one jungle colour, and a hatched jungle needs two tones to read as
  hatching; reusing an existing palette colour adds nothing new.
- Compliments 3-5 are new lines written for the piece. Reason: the prompt
  fixes the first two compliments and calls for a fixed bank of further
  deadpan compliments ("etc."); the additions keep the same voice and are
  listed in full above.
- The bubble's outline is one fixed wobbly path rather than regenerated
  per swap. Reason: the prompt states the bubble text changes only, never
  its position; the fresh-lettering effect is carried by the re-seeded
  per-character jitter on each swap.
