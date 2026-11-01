# №1163 — Tactical Misuse Kit

Nick Briz study block NB4, after TACTICAL MISUSE .net (2022): browser hacks
that undermine the dark patterns of surveillance capitalism. Five small toys
on one canvas page, each subverting one familiar web pattern. A single
manifesto sentence runs across the top: "every interface is an argument;
misuse is a reading."

## The five toys

1. **FEED** — three mini-cards cycle through twelve poisoned recommendations
   ("because you paused: insurance", "people unlike you bought: fog", "your
   ex watched this: static"). Drag vertically or use the wheel to scroll;
   the offset eases toward its target and wraps, so the feed never ends.
2. **CONSENT** — a cookie banner ("we value your privacy (all of it).")
   with ACCEPT and DECLINE buttons. Every decline grows the banner ~14px
   (capped at the card), shrinks the decline label ("decline" → "no" → "·"),
   and increments a red decline counter. Accept collapses it to a thin blue
   "noted." strip.
3. **LIKE** — a heart button next to "your score: 100". Each tap deducts 7
   from YOUR score, flashes the heart acid #B6FF00, and cycles a warning
   ("the count was yours", "engagement is extraction"). At zero the button
   reads "enough".
4. **SEARCH** — a box holding the preset query "cheap flights tuesday".
   Tapping SEARCH returns the query's own metadata in steps instead of
   results: characters: 21 / words: 3 / intent: harvested / results: 0.
5. **PROGRESS** — a bar that fills at ~4%/s only while nothing has been
   touched for 1.5s anywhere on the page. Any interaction pauses it; the
   caption flips to red "paused — you did something".

Every card has a "view the hack" toggle: a black source strip (#33FF66
monospace) naming the dark pattern each toy subverts. After 20 seconds with
no interaction anywhere, all five toys reset to their initial state.

## Construction

- Canvas-drawn UI throughout: white cards on #F0F0F0, UI blue #1877F2
  corrupting to acid #B6FF00 on interaction, warning text #FF2B2B, source
  panels #0A0A0A with green text. Monospace type everywhere.
- All toy state is a closed-form function of recorded interaction events
  and time t: the progress fill is computed by summing idle segments
  (each interaction suspends filling for 1.5s) across the epoch's event
  list; the 20s idle reset swaps in a fresh state anchored at that moment.
  The only frame-integrated value is the feed's eased scroll offset, a
  view-smoothing detail.
- Determinism: the first frame is drawn synchronously at fixed phase
  T0 = 8s with a virtual anchor interaction at T0 − 6s, so the progress
  bar sits at exactly 18% and every toy is at its initial state. The rAF
  loop is typeof-guarded and anchored as T0 + elapsed since load.
- House rules: canvas size from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas.style.width/height
  pinned in px inside draw(); phone detection via window.screen physical
  size (min dimension < 700px) with an aspect fallback; seeded mulberry32
  only; no gradients, no ctx.filter, no shadowBlur, no offscreen canvas,
  no ImageData, no createElement, no audio, no microphone, no network.
- QA: rendered with the house node-canvas renderer at 1280×800,
  390×844 and 720×720; the 720×720 thumb rendered twice and byte-compared
  (cmp identical).
