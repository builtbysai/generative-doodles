# No.571 "La Amarilla"

EXPANSION #69 power-paola, prompt PP3 ("Todas las Bicicletas"). Object-anchored
memory chapters from *Todas las bicicletas que tuve* (2022): seven chapters,
each named after a bike she owned or borrowed. The object carries each chapter;
no memory is explained in text anywhere in the piece.

## Concept

A bicycle drawn large, with loving mechanical detail, is the whole stage. Tap
and the chapter dissolves through layered grey ink-wash strokes into the next
bike. The chapters do not arrive in chronological order: memory drifts, so the
visiting order drifts too. Between chapters, three small framed drift panels
pass like the book's non-linear interludes: a childhood street, a distant
figure in a red sweater, a bike floating over rooftops in a dream.

Chapter visiting order (titles keep their book numbers):
1. "1. La amarilla" — the yellow bike, the only colored bicycle.
2. drift panel: a childhood street (house outlines, a tree, a faraway tiny bike).
3. "3. La prestada" — the borrowed one: step-through frame, fenders, a plain
   paper tag tied to the handlebar.
4. "2. La robada" — the stolen one: the bike is only a pale wash ghost; on the
   ground beneath it, a cut lock and loose chain links are all that is left.
5. drift panel: a street corner, a small distant figure in the red sweater,
   a bike resting nearby.
6. "5. La del sweater rojo" — drop bars; the same small figure in the red
   sweater stands beside the bike, seen from behind.
7. "4. La de la infancia" — a smaller bike with a training wheel and a bell,
   one house and one tree behind it.
8. drift panel: the dream — a bike floating over ink rooftops, crescent moon.
9. "7. La última" — the most detailed bike: rear rack, frame pump, fenders,
   28 spokes, a worn patch on the saddle, leaning very slightly.
10. "6. La del sueño" — the bike floats, tilted, over a rooftop skyline,
    among seeded stars and a crescent moon, bobbing gently.

## Construction

- Single self-contained index.html, canvas 2D, no external assets, no audio,
  no microphone. Square design space 1200x1200.
- Canvas sized from the Visual Viewport API, with resize listeners on
  visualViewport and window; canvas.style width/height pinned in px inside
  draw() every frame. Phone detection via window.screen (min dimension
  < 700px) with aspect fallback only; on phones the square stage spans the
  full width and the page ground is the paper color.
- Strict palette, flat fills, no gradients: ink #141414, grey wash #9A9A98,
  paper #F2EDE0. The only colors in the piece are the yellow bike #F2C230
  (chapter 1) and the red sweater #C23B2E (chapter 5 and its drift panel).
- The bicycle is one parametric drawing: diamond or step-through frame,
  flat / drop / swept handlebars, wheels with instanced spokes (18-28 per
  chapter), chainring, chain runs, rear cog, cranks and pedals. B/W chapters
  carry seeded rust specks scattered along the frame tubes (mulberry32).
  The yellow frame is ink-edged: each tube stroked in ink first, then yellow.
- Chapter titles are hand-lettered: per-letter seeded jitter, fixed seeds, so
  the lettering is identical on every frame and every load.
- Backgrounds and the transition are precomputed seeded wash strokes (broad
  round-cap lines in translucent grey), drawn directly each frame; no
  offscreen canvas, no filters.
- Interaction (per Hans's RETHINK INTERACTION rule, decided for this piece):
  TAP advances to the next spread through a slow ink-wash dissolve (1.4 s;
  wash density peaks mid-dissolve and the spread switches under it). DRAG on
  a chapter's bike rotates it around its center for inspection, clamped to
  ±0.55 rad; the angle STAYS after release (a deliberate choice, so a reader
  can leave a bike tilted and move on). Dragging never advances. The last
  spread wraps to the first. Footer carries only a subtle "tap" hint and,
  on chapter spreads, a small "capítulo N / 7" counter where N is the count
  of chapters visited so far, since the visiting order is not the book order.
- Determinism: the first frame is drawn synchronously at load at the constant
  phase PHASE0 = 1.3, showing chapter 1 fully composed with no dissolve in
  flight. The animation loop, when present, is anchored as PHASE0 + elapsed
  and guarded by a typeof check on requestAnimationFrame; frame one is never
  derived from Date.now(). The only ambient motion is the dream bike's slow
  bob, a sine of the anchored phase.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js (node-canvas):
  qa-desktop.png 1280x900, qa-mobile.png 390x844, thumb.png 720x720.
- thumb.png rendered twice and byte-compared with cmp: identical. The second
  render was deleted.
- Read back all three renders: chapter 1 shows the yellow bike large and
  detailed (spokes, chain, chainring, rust specks minimal on the yellow
  frame), hand-lettered title "1. La amarilla" above it, grey wash strokes
  behind, ground line under the wheels, "tap" bottom-left and
  "capítulo 1 / 7" bottom-right. On mobile the square stage spans the full
  390px width, vertically centered, nothing clipped.
- Additionally rendered every other spread via throwaway preset copies
  (deleted after): the street, sweater and dream drift panels; the
  step-through prestada with its tag; the robada ghost bike with the cut
  lock and chain links; the infancia bike with training wheel against its
  house and tree; the sweater-rojo figure standing small beside the bike;
  the última with rack and pump; the sueño bike floating over rooftops.
  All execute without errors and read as intended.

## Deviations

- Drag rotation stays after release rather than easing back: recorded choice
  above, made so inspection feels like turning the object in your hands.
- The stolen chapter renders the bike as a translucent wash ghost with the
  cut lock left on the ground. The prompt fixes no visual for "La robada";
  this is object-only storytelling (absence as the chapter's fact) and adds
  no text, honoring the rule that the object carries the chapter.
- The borrowed bike's handlebar tag is left blank (two faint wash lines)
  rather than lettered, for the same reason: no invented text.
- Drift panels are full-stage framed spreads rather than small insets, so
  they stay legible at gallery and phone sizes; they remain visually
  distinct from chapters (wobbly frame, no title, no counter).
- Beyond the dissolve, chapters rest still; only the two dream spreads bob.
  The prompt's motion is the chapter drift itself, and stillness suits the
  inventory register of the book.
