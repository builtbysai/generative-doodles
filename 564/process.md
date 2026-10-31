# No.564 — ¿Para Qué Quiere Los Dientes?

EXPANSION #68 teresa-ferreiro, prompt TF4 ("Es Un Diez Pero").

## Concept

The "es un diez pero" card game re-staged as ONE party-table scene (not a
carousel): four players sit around a cream-clothed table on party indigo,
each holding a blank cream card to their forehead. The audience never sees
the cards either — they stay blank on both sides, forever; that is the gag.
A duck-headed woman (orange bill, stern) runs the game; Carmen, in a red
dress, plays enthusiastically and is never softened. A footer caption bar
across the bottom carries her caption-zero mechanism: "¿Para qué quiere los
dientes, de todas formas?"

## Construction

- Single self-contained canvas 2D piece, 1080×1080 design space. Canvas
  sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in px inside draw(); phone
  detection via window.screen (min dimension < 700px) with the
  h > w*1.15 aspect fallback only; on phones the scene spans the full
  width and keeps its shape, page ground = party indigo.
- Players are parametric seated figures (torso, resting arm, head, holding
  arm, card). The holding arm is drawn before the head so the head overlaps
  the arm and the hand lands on the card's lower corner. The card flip is a
  2D scaleX cosine skew over 0.45s; the card's back is a slightly darker
  cream tone, equally blank.
- Speech bubble: one wobbly hand-lettered bubble (per-letter jitter from a
  stable string hash), its tail re-aimed at whichever player is speaking.
  Text stays Spanish throughout; no TikTok UI anywhere.
- Party dressing is precomputed seeded data drawn directly each frame
  (confetti field, bunting strings with flags and twinkling bulbs,
  stubble dots), since the QA renderer has no offscreen canvas.

### The clue bank (scripted escalation, fixed order, drag advances it)

0. Duck host: "Es un diez pero... Carta a la frente, sin mirar. Vosotros adivináis el número."
1. Duck host: "Es un diez pero es el del festival que dijo que le daba asco comer coños."
2. Man one: "¡JODER! ¿¡Ese soy yo!?"
3. Duck host: "Es un diez pero es politoxicómana. De las organizadas, ¿eh?"
4. Man one: "Es un diez pero no tiene dientes. Ni uno solo."
5. Man two: "Un ocho. Y me he enamorado."

### Footer variants (tap the footer bar to cycle; the specced one is first and returns)

0. "¿Para qué quiere los dientes, de todas formas?" (specced default)
1. "Un ocho, con la boca cerrada."
2. "El amor no necesita dentadura."
3. "La carta sigue en blanco. Ese es el juego."

### Interaction

- TAP a player: their forehead card flips (and lands blank again).
- TAP the footer bar: cycles the footer through the zingers above.
- DRAG: deals a fresh blank card to a random player (seeded runtime
  stream) and escalates the clue bubble to the next bank entry.
- Hint: small lowercase "tap · drag", bottom right above the footer.

### Determinism

Frame one is the synchronous draw at constant PHASE0 = 1.7: cards up,
opening clue bubble (bank entry 0) shown, no flip mid-flight (all
flipStart values begin at -10). rAF is typeof-guarded and anchored as
PHASE0 + elapsed since load; frame one is never derived from Date.now()
(no Date.now anywhere in the file). Seeds: mulberry32(564068) for layout,
mulberry32(987123) for runtime deal picks, plus fixed sub-seeds for the
confetti and stubble fields.

## QA log

- Rendered with ~/workspace/tools/render-piece.js at 1280×900
  (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png).
- Determinism gate: thumb.png rendered twice and cmp byte-compared —
  identical; second render deleted and the gate re-run after every fix.
- Read-back fixes: (1) the holding arms originally crossed the players'
  faces — arm moved behind the head, grip re-aimed at the card's lower
  corner; (2) the snack bowl was drawn as a lower half-disc and the
  tabletop band swallowed it — flipped to an upper half-disc so it sits
  on the table line like the bottles; (3) bottles repositioned so none
  crowd each other.
- Final read-back: four players with blank forehead cards whole, duck
  host stern with orange bill, Carmen in red beaming, two men (stubble,
  beard), clue bubble and footer caption legible, nothing clipped on
  mobile.

## Deviations

- Clue 1 renders the prompt's festival-guy clue as the Spanish line "es
  el del festival que dijo que le daba asco comer coños" (the prompt
  describes that clue in English); recorded here as instructed by the
  brief.
- The prompt's palette names five colors; flat supporting tones were
  added only where bodies need them: skin #E8B88A, duck white #FFFFFF,
  hair #241D18 / #3A2A1C, shirts #4E7A5A and #B98A3E, and a card-back
  cream tone #E9DFC6. Every specced hex is used unchanged.
- The prompt's 4-panel composition was resolved by the brief into one
  party-table scene; the footer caption bar still closes every state of
  the scene, preserving her caption-zero mechanism.
- Bank entries 0, 2, 3 and 5 and footer variants 1–3 are composed in her
  voice around the brief's fixed points (the concept line, the festival
  clue, the polydrug clue, the no-teeth escalation, "¡JODER!", and the
  eight-and-in-love verdict); entries 1 and 4 and footer 0 are the fixed
  points themselves.
