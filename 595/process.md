# No.595 — Dibujo para Atesorar

EXPANSION #72 clara-lagos, prompt block 3 "Mientras Espero". Her notebook doctrine as a piece: *"Dibujo mientras espero. Dibujo para atesorar."*

## Concept

A spiral-bound notebook lies open on a wooden table, slightly angled, the wire binding drawn in along the left edge of the spread. On the page is a half-finished 2x2 comic strip: panel 1 is complete (a mother wearing the soft-blue apron — the only blue anywhere in the piece — holding a cup, a window and a small table behind her), panel 2 is mostly drawn (Emi holding a bundle of feathers over an open box lettered "para guardar", a cat beside her), panel 3 has only just begun (a head, one back curve, a ground line that stops halfway), and panel 4 is blank. Her waiting-notes live in the margins — "sala de espera", "plaza", "café" — and her caption is lettered under the strip: "Dibujo mientras espero. Dibujo para atesorar."

The drawing is never finished, and that is the point. On a 66-second waiting cycle, new lines arrive in bursts separated by long pauses — the rhythm of drawing between other things in waiting rooms and cafés. Panel 3 slowly gains a body line, a hem, an arm, a second small head, a feather, a sun arc; margin doodles (cup, cat, leaf, star) appear one by one in the empty margins. Even at the cycle's fullest, panel 3's first figure has no face and the second figure has no body, so the strip can never complete. Tapping the page starts a new small waiting-sketch in the next free margin slot; dragging tips the notebook a few degrees, as if to turn a page that isn't there, and it settles back.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no audio, no microphone.
- Strict four-color palette: ink `#1A1A1A`, notebook paper `#F5F0E6`, soft blue `#3E6FA8` (the apron only), wood `#8A6B4F` (the table only, which fills the frame edge to edge with seeded grain lines and knots).
- Every visible line is a precomputed wobbly polyline generated once at load from mulberry32 seeded streams (seed family 595071), so the hand's wobble is identical on every frame and every load. Animation only *reveals* strokes: each arriving stroke carries a start time and duration within the waiting cycle and is drawn as a growing fraction of its own length.
- The waiting cycle (66 s) schedules six panel-3 strokes and four margin doodles in four bursts (about t=6–11, 22–26, 40–45, 52 s) with pauses of 11–16 s between them. At the wrap, the page returns to its frame-one state, as a new wait begins.
- Deliberate incompletions, drawn statically so they persist all cycle: panel 2's second shoe is rendered at 60% of its line, and the panel-2 cat has only one ear; panel 3's ground line is rendered at 55%.
- Margin doodles are stroke sets (cup, cat face, leaf, star) placed in eight fixed margin slots. The cycle fills the first four; taps fill slots 5–8 in order, each drawing in over roughly two seconds from the tap moment. Once all slots are full, taps do nothing further — the page is full of waiting.
- Drag uses horizontal pointer travel to tip the notebook up to ±3.5°, eased in `draw()`; on release the target returns to zero and it settles back. Tap vs. drag is decided by a 7 px movement threshold. There is exactly one page; nothing reloads, nothing erases.
- Canvas size comes from the Visual Viewport API with resize listeners on both `visualViewport` and `window`; `draw()` pins `canvas.style.width/height` in px on every frame. Phone detection uses `window.screen` (min dimension < 700 px), falling back to the `h > w*1.15` aspect test only when no screen size exists. On phones the notebook scales to full frame width and keeps its shape, with the wood table as the page ground above and below.
- Determinism: frame one is drawn synchronously during the initial `resize()` at PHASE0 (panels 1–2 drawn, panel 3 begun, notes and caption in place, waiting cycle at its start, tip at zero) before `requestAnimationFrame` is ever requested. The rAF loop is `typeof`-guarded and anchored to PHASE0 + elapsed-since-load measured with `performance.now()`; `Date.now` never appears. No `document.createElement`, no offscreen canvas, no `ctx.filter` — the table grain, page speckles, and fold shading are precomputed seeded data and low-alpha fills drawn directly.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png); all three read back and inspected.
- Desktop/thumb: spiral notebook on the wood table, binding rings looping through their holes along the left edge; panel 1 complete with the blue apron as the single color accent; panel 2 with Emi, the feather bundle, the one-eared cat, and the "para guardar" box; panel 3 begun (head, back curve, partial ground line); panel 4 blank; margin notes and caption legible; hint "tap · drag" small on the table at bottom right.
- Mobile (390x844): the notebook scales to frame width and sits centered on the wood ground, fully visible, nothing clipped.
- Fix round during QA: the first render's feather bundle was held too high and read as a dark scribble over Emi's face. The grip point was lowered to her waist, the fan shortened and widened, and her arms re-aimed, so the plumes sit against her body and her face stays clear. The window's curtain swag (initially a jagged diagonal that read as a crack) was redrawn as a shallow hanging arc, and the center-fold shading was lightened so it suggests a fold instead of a grey column. Re-rendered all sizes and re-inspected after the fix.
- Determinism gate: thumb.png rendered twice and compared with `cmp` — byte-identical. The second render was deleted.
- `grep` confirms zero `Date.now` in the file.

## Deviations

- The prompt's waiting rhythm is specified in seconds (draw bursts of 3–8 s, pauses of 5–15 s). The shipped cycle runs 66 s with bursts of roughly 2–7 s of active drawing and pauses of 11–16 s — slightly longer pauses, chosen so a viewer who opens the piece mid-wait actually sees a line arrive, while keeping the interrupted, between-other-things feel. Recorded here rather than silently.
- The prompt names the margin notes and the small waiting-sketches but does not fix their positions; the notes sit in the top margins and along the right edge (rotated), and doodles occupy eight fixed margin slots. A construction choice, not a content change.
- The prompt says the strip's child is "a child named Emi"; the name is lettered small in panel 2's corner, as she labels figures in her notebooks. The feather bundle's box carries her words "para guardar" from the prompt.
- No hand or pencil is drawn. The prompt implies the drawing hand ("as if someone is drawing it right now") without requiring it be visible; the arriving lines carry the presence, and a drawn hand would fight the notebook's flat page. 
