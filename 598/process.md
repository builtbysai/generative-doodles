# №598 — Sábados a la Mañana

EXPANSION #72 clara-lagos, prompt block 6 "El Juego de Ramón" (verified verbatim from TASKS.md).

## Concept

Clara Lagos's Club de historietas, the Saturday-morning comics workshop she ran for years: she brings the skeleton images, the kids invent the games, and nobody's drawing gets erased. The piece is the workshop table itself, seen from above. A round table, five game cards fanned around its rim, one shared sheet in the middle. The viewer picks a game, the game's starter drawing appears on the sheet, and from then on the viewer's own finger draws on the sheet in kid-yellow, the kids' color, which the piece itself never uses for its own ink. A small "ver" card at the table's edge plays the whole sheet back, stroke by stroke, in the order the marks were made. Nothing is scored, nothing is won, nothing clears. The workshop accumulates for the session, exactly like a real Saturday morning table at noon.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets, no audio, no microphone. Logical stage 1000×1000, letterboxed on the paper ground; the table is a circle in stage space, so it stays round at every aspect.
- Palette, strict: ink `#1A1A1A`, paper `#FAF7F0`, soft blue `#3E6FA8`, warm yellow `#E8B93E`. Blue is spent exactly twice: card 3's border and her pencil lying on the table. Yellow is spent only by the viewer's own strokes; every starter drawing is ink.
- Every visible line is a precomputed wobbly polyline from seeded mulberry32 streams, so the hand never changes its mind between frames; animation only reveals strokes by fraction of their length. Lettering is drawn letter by letter with seeded rotation and lift.
- The game deck (her plainspoken voice; the full prompt letters itself under the title when a card is tapped, the card gets a small check mark once played):
  1. "El juego de Ramón: dibujá el sábado del esqueleto." Starter: a small skeleton waving (skull, jaw, spine, three ribs, pelvis, one arm raised).
  2. "Inventá lo que vio la pelota arriba de la medianera." Starter: a ball over a slatted fence, with its flight dots.
  3. "Dibujá tu casa como la ve el gato." Starter: a wide-based house from ground level, cat ears peeking at the bottom edge. This card carries the blue border.
  4. "Completá la cara que falta." Starter: a head outline with one eye, a brow, two hair tufts, and the rest deliberately missing.
  5. "Un monstruo bueno que ayuda." Starter: a round one-eyed monster with horns and a kind smile, holding out a steaming cup.
- Interaction: tap a card to start its game (prompt + starter, which draws itself in ~2 seconds of staggered strokes). Once any game has started, dragging on the sheet draws in yellow; strokes are stored in sheet-local coordinates and clipped to the sheet. Tap "ver" to replay all accumulated strokes in order, starters in ink, the viewer's in yellow. There is no erase, no undo, no clear, no score, anywhere in the piece. A hand-lettered "sin borrar" sits beside the sheet as the house rule.
- Frame one is one synchronous draw at PHASE0: title lettered, table set, cards fanned, sheet blank, no game started, "ver" waiting. The rAF loop is `typeof`-guarded and anchored as PHASE0 + elapsed since load; `performance.now` measures elapsed only. Canvas size comes from the Visual Viewport API with resize listeners on both visualViewport and window; the canvas CSS size is pinned in px inside `draw()` every frame. Phone detection uses `window.screen` (min dimension < 700px), aspect fallback only. Zero `Date.now`, zero `document.createElement`, zero offscreen canvas, zero `ctx.filter`.

## QA log

- Rendered with `~/workspace/tools/render-piece.js` (node-canvas) at 1280×900 (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png). Read back all three: title line lettered across the top; the round table centered with its double ink rim; five numbered cards fanned on the rim with short labels, card 3 in the blue border; the blank shared sheet slightly rotated in the middle; "sin borrar" legible below the sheet; the blue pencil on the table's left; the "ver" card at the bottom rim; the "tap · draw" hint in the corner. On mobile the whole stage fits the 390 width, table round, all labels legible, nothing clipped.
- Determinism gate: thumb.png rendered twice and `cmp` byte-compared, identical; second render deleted. Re-run and re-passed after every fix round.
- Interaction-layer check: a throwaway copy in /tmp with a test hook (all five games pre-started, two fake yellow strokes added) was rendered and read back, then deleted. It showed the prompt line lettering correctly under the title, check marks on played cards, all five starters reading on the sheet (skeleton, ball and fence, house with cat ears, unfinished face, monster with cup), and viewer strokes rendering in yellow over the ink. The shipped file contains no test hook.
- Fix rounds during QA: (1) the blue pencil's first two placements were covered by the sheet and then by card 4; it now lies on the open table at the left, fully visible. (2) "sin borrar" was clipped by card 4; moved below the sheet, fully legible. (3) Game 4's hair tufts were centered wrong and floated above the head as stray arcs; re-centered on the head's own circle so they sit on the outline.

## Deviations

- The brief's title line contains an em dash ("Sábados a la mañana — Club de historietas"). Per the standing scrub rule for user-facing copy, it is lettered with a comma instead: "Sábados a la mañana, Club de historietas". Recorded here, as with earlier pieces.
- Card faces show short labels ("El juego de Ramón", "Lo que vio la pelota", "La casa del gato", "La cara que falta", "Un monstruo bueno") rather than the full prompt sentences, which would not fit a card at this size; the full prompt letters itself under the title when the card is played, so no wording is lost.
- The starter drawings sit in fixed zones of the sheet (skeleton top-left, ball and fence top-right, house bottom-left, face center, monster bottom-right), a construction choice so up to five starters can share one sheet legibly; the viewer's own marks are placed by the viewer's hand, unarranged, as the brief requires.
- A small check mark appears on a card once its game has been played, so a returning viewer can see which games the table has already run. It carries no score and no ranking.
