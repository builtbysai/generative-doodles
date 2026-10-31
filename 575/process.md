# No.575 — La Sociedad del Cansancio, Leída por Cato

EXPANSION #69 power-paola, prompt PP7. Built 2026-10-31 (build + QA only, not pushed).

## Concept

A four-panel carousel adapting Byung-Chul Han's *La Sociedad del Cansancio* the way
Power Paola adapted it in her Cato y su Cola strip. Cato, her white cat-like creature,
is deadpan and tired throughout, never a cute mascot. The tail is a separate character:
an articulated chain with its own head, ears, eyes and eyeline in every panel, wagging
on its own phase whether Cato moves or not.

- Panel 1: Cato asleep in a long loaf on the pink surface, an open book beside his paws.
  Header, verbatim: "LEÍDO POR: CATO Y SU COLA". The tail stands upright behind him,
  awake, watching the room while Cato sleeps.
- Panel 2: a black bird flies across the panel, drawn after the frame stroke so it
  crosses and breaks the panel border, in a 3-frame wing flap. Its shout sits in a
  starburst overlapping the top border, verbatim: "LA VIOLENCIA DE LA DESTRUCCIÓN SUAVE".
  Below, Cato looks up, unimpressed; the tail looks up too.
- Panel 3: Cato upright on a pink cushion, wide-eyed, clutching a glowing smartphone.
  The tail rises beside him and watches the phone with pink eyes.
- Panel 4: Cato sunk flat on the floor, half-lidded, under a thought cloud, verbatim:
  "PREFERIRÍA NO HACERLO..." Yellow "BEEP BEEP BEEP!" notifications spawn and pile up
  around him; the tail lies flat on the floor with its eyes shut. Dragging down piles
  more notifications and sinks Cato further, and the pile stays on release.

Tap advances the carousel (4 wraps to 1). Subtle lowercase hint in the corner:
"tap" on panels 1–3, "drag" on panel 4; small "n / 4" counter opposite.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets, no audio, no mic.
- Strict PP7 palette only: Cato white #F5F2EA, ink #1A1A1A, pink surface #F2A7C3,
  bird black #1A1A1A, phone glow #7AB8D9, notification yellow #F5D90A, paper #F5F0E0.
  Flat fills throughout, no gradients. (Pure #FFFFFF is used only for eye whites and
  the thought/shout bubble grounds, as paper-white inside the palette's range.)
- Stage is a fixed 1000×1000 square, letterboxed; the panel keeps its shape on phones
  and the page ground is the piece's paper colour.
- All outlines pass through a deterministic position-hash wobble, so the ink line is
  hand-drawn wobbly yet identical every frame and every render.
- The tail is a 5-point articulated chain, drawn as tapered double strokes (ink edge,
  white core), ending in its own head. Its sway is a sine on the loop clock; in panel 3
  its eyes are filled pink with ink pupils aimed at the phone; in panel 4 it lies low
  with closed eyes.
- Canvas size comes from the Visual Viewport API with resize listeners on both
  visualViewport and window; `canvas.style.width/height` are pinned in px inside
  `draw()` every frame. Phone detection via `window.screen` (min dimension < 700px)
  with the h > w*1.15 aspect fallback.
- Panel 4 notifications use a fixed seeded spot table (mulberry32); spawn count grows
  with panel time and with the accumulated drag pile (`pileBase`, clamped 0..1), and
  Cato's sink is a function of the visible count plus pile, so release keeps the state.
- Paper texture is 200 precomputed seeded speckles drawn directly each frame; no
  offscreen canvas, no `ctx.filter`, no `document.createElement`.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280×900
  (qa-desktop.png), 390×844 (qa-mobile.png) and 720×720 (thumb.png).
- Determinism: thumb.png rendered twice and `cmp` byte-compared — identical; the
  second render was deleted. Frame one is the synchronous draw at constant PHASE0 = 0
  showing panel 1 fully composed (Cato asleep, tail at fixed wag phase 0). The rAF
  loop is `typeof`-guarded and anchored as PHASE0 + elapsed since first frame; the
  code contains no `Date.now`, no `AudioContext`, no external URLs.
- Read-back of desktop/mobile/thumb: panel 1 shows Cato asleep on the pink surface
  with the book, the header verbatim, the tail upright as its own character with its
  own face; counter "1 / 4" and "tap" hint legible; on mobile the whole square stage
  is visible, nothing clipped.
- Panels 2–4 were also inspected via temporary copies with the start panel preset
  (copies deleted after): panel 2's bird overlaps the left frame border and the shout
  burst overlaps the top border, text verbatim; panel 3's wide eyes read as staring
  down into the phone glow and the tail's pink eyes read clearly; panel 4's thought
  cloud holds "PREFERIRÍA NO / HACERLO..." without stray strokes, chips stay inside
  the frame, and the sunk Cato plus flat, eyes-shut tail read as exhausted, not cute.
- Fixes during QA: sleep "z"s moved so the largest no longer crosses the pink
  surface's edge; ears on panels 2–4 moved inward so they sit on the head instead of
  floating; the thought cloud rebuilt (fill, stroke, smaller refill) to remove inner
  crossing arcs; notification spots pulled in from the frame edges; the bird's flight
  phase offset so it is already inside the panel when panel 2 opens.

## Deviations

- The shout text is set in a starburst bubble rather than as loose lettering, to keep
  the long verbatim line legible at thumbnail size; wording is unchanged.
- Panel 4's thought text is split over two lines ("PREFERIRÍA NO" / "HACERLO...")
  inside the cloud; the concatenated text is verbatim.
- The tail's head carries tiny ears and a flat mouth of its own, the minimum needed
  for it to read as a character with an eyeline rather than an accessory, per the
  prompt's instruction.
- Book in panel 1 is drawn open with text lines but no title lettering, since PP7
  names no title text for the book itself beyond the header credit.
