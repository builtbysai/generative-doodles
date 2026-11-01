# №1162 — Dear Apple

Nick Briz study block NB3, after *Apple Computers* (2013) — his open-letter
video remixing Phil Morton's 1976 *General Motors* across forty years, built
on "that impossible reconciliation between my tech dependencies && my
politix." A letter typed live, a field quietly falling apart behind it: the
longer the letter runs, the more complicated the relationship gets, and the
codec damage is the meter.

## Composition

Near-black `#050505`. Centered, a monospace letter column (~58 characters,
~42 on phones) in `#D8D8D8`, with two or three key phrases per letter lit in
`#FFE14D` and a `#33FF66` block cursor. Full-bleed behind it, a faint
geometric field at 25 % opacity — concentric rectangles, two ringed circle
centres, a diagonal lattice, a horizon rule. Across the very top, a 3 px
complication strip whose width is the letter's progress and whose color
steps green → yellow → red by thirds.

## The letters

Three prewritten variants rotate, one per 55-second cycle. All lowercase,
plain and direct, no other company named. First lines:

1. "dear apple, we need to talk about us." — the tools are loved, the deal
   is not: *"i love these tools."* / *"let me open the machine i paid
   for."* / *"what used to be normal."* (109 words)
2. "dear apple, everything i make passes through your hands first." —
   dependence as an unsigned contract: *"dependence is a kind of
   contract"* / *"if i bought it, it is mine"* / *"loyalty that survives
   being optional."* (107 words)
3. "dear apple, this is the impossible part, so i will say it plainly." —
   the politics and the phone in different pockets: *"my politics live in
   one pocket and my phone lives in the other"* / *"a sealed box asks for
   trust. an openable one earns it."* / *"ships with a way in."* (103 words)

## Typing and complication

Typing is closed-form. Each letter's reveal times are precomputed from a
raw cadence — 11 chars/s with a +0.35 s pause after every period and
+0.18 s after every comma — then scaled so the last character lands
exactly at 45 s. Ten seconds of hold follow, the full letter sitting in
its own wreckage, then the next letter starts clean. The block cursor
blinks in half-second steps at the next character position, or at the
line end during the hold.

Complication `p` is simply the fraction of the letter typed, and it drives
the field's degradation: the field is drawn in 24 px horizontal bands,
each band offset by a seeded amount scaled by `p` (a few deep bands slip
an extra block-width past `p` = 0.6, like a lost sync); thirty seeded
artifact blocks in `#FF2B6E` and `#00FFC2` surface past their thresholds
and grow; past `p` = 0.4 a white macroblock grid fades in over everything.
Nothing is random at draw time — every offset, block, and threshold is a
seeded function, and the damage is the same on every visit.

Drag horizontally to scrub through the letter: the typed fraction follows
the pointer, typing pauses, and on release the cycle clock re-anchors so
typing resumes from exactly the scrubbed position. The field and the
strip follow the scrub, since both are functions of `p` alone.

## Determinism and house rules

- First frame is drawn synchronously at a fixed phase: letter 1 at ~55 %
  typed (the exact reveal step is chosen so the cursor's blink is on),
  the field degraded to match. The rAF loop is `typeof`-guarded and
  anchored as T0 + elapsed since load.
- Canvas size comes from the Visual Viewport API with resize listeners on
  both `visualViewport` and `window`; `canvas.style.width/height` are
  pinned in px on every draw. Phone detection via `window.screen`
  physical size (min dimension < 700 px) with the `h > w·1.15` aspect
  fallback.
- The field is drawn from functions with per-band clipping — no offscreen
  canvas, no ImageData, no gradients, no `ctx.filter`, no shadowBlur, no
  `createElement`, no microphone. Seeded mulberry32 only; no
  `Math.random`.
- Silent by design — no audio at all. The only text in the piece is the
  letters themselves (and the `<title>`).
- QA: `thumb.png` rendered twice at 720×720 and byte-compared (`cmp`);
  desktop (1280×800) and mobile (390×844) renders read by eye — letter 1
  mid-typing, a highlighted phrase on screen, cursor lit, field smeared
  at matching depth, strip partway across the top.
