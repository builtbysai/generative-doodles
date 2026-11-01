# №1199 — Glitch School Lesson

joncates study block JC8 (PP358), grounded in glitch.school: every class is
one technique plus one aphorism, and the technique teaches itself. The piece
is silent; the board is watched, and the only handwriting the visitor is
allowed is immediately eaten by the lesson in progress.

## The piece

A chalkboard-dark field (#0C0C0E). Lessons run back to back forever: lesson
*k* holds the board for 45 s, then a 1.5 s chalk-dust wipe clears it and the
next lesson begins (period 46.5 s; lesson type = *k* mod 3, cycling 1-2-3).
At the top, an amber "LESSON n" tag sits at the left of the aphorism line,
and the aphorism itself types in chalk-white (#EDEDED), letter by letter
over 3 s — the typing clock starts during the preceding wipe, so the first
letters are already appearing as the dust settles. Each letter carries a
small hash-fixed vertical jitter, the chalk hand; a faint block cursor
blinks at the typing head. The aphorisms ship verbatim:

1. "Glitch Art is the Art of Surprise"
2. "Technology is a source of questions, not answers"
3. "Value unexpected outcomes"

The demonstration fills the lower 70% of the board. One lesson at a time;
no syllabus, no menu, no classroom furniture.

**Lesson 1 — pixel-sort horizon.** A dusk horizon drawn as flat bands
(deep blue #152A44, teal #1E5A55, an amber #FFB000 strip, a pale #E9DFC4
horizon line, dark ground) with a two-tone sun disc sitting on the horizon.
Pixel-sort waves roll across it as data, not pixels: ~220 columns, each
with a sort depth driven by a traveling sine wave gated by a seeded hash,
redrawn in 0.15 s steps. From each band boundary, vertical streaks hang
downward — blue into teal, teal into the amber, amber and pale dragged
deepest into the ground — their lengths set by the column's depth, a bright
inner run over a fainter full streak.

**Lesson 2 — the circle that refuses to close.** A chalk circle is redrawn
every 2.5 s, and every attempt is wrong: the endpoint error is hashed per
attempt into [−40°, +25°], so the arc either stops short, leaving a gap, or
overshoots its own start. The endpoint is marked with an amber dot and a
red (#FF2B2B) tick; the true close point stays faintly dotted beside it.
Up to five previous attempts remain on the board at 12% alpha — the board
remembers the failures for the length of the lesson.

**Lesson 3 — the moth.** A chalk-outline moth (the Grace Hopper moth) with
amber wing spots flutters across the demo area on a Lissajous path, wings
completing one full flap per wingbeat (0.55 s). Every wingbeat spawns an
artifact at the moth's position, its type hashed per beat: a filled block,
a tear line, an RGB-split rectangle, a static burst square (re-hashed six
times a second), or a stray glyph. Artifacts live 3 s and fade in five
alpha steps; at most a handful are ever alive at once. Value unexpected
outcomes — the outcomes are the point, so they are left lying on the board
until they fade.

**The wipe.** Between lessons, 110 dust points seeded across the board
(dust gray #4A4A4E, every fourth one chalk) burst outward from their seeds
and fade in four alpha steps over 1.5 s, over a few horizontal smudge
streaks of the old lesson dissolving. Nothing of the old demo survives it.

## Interaction

Drag is chalk. Pointer points are recorded in piece time (cap 120) and
drawn as a rough chalk polyline — per-segment hash jitter gives the line
its grain — fading over 4 s in four alpha steps. The current lesson
corrupts the line as it is drawn, one honest transform per lesson:

- Lesson 1: points inside the horizon sprout vertical sort streaks,
  length set by the sort depth of the column they landed in.
- Lesson 2: points near the circle are pulled toward the current
  attempt's gap/endpoint, weighted by their distance from the ring.
- Lesson 3: segments passing near a live artifact get offset ghost copies
  in cyan (#00E5FF) and magenta.

The visitor's notes are temporary and the lesson always wins; there is no
way to keep anything on the board.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on both
  `visualViewport` and `window`; CSS size pinned in `fit()` and re-pinned
  in `draw()`.
- Phone detection via `window.screen` (min dimension < 700) with aspect
  fallback; the layout is fractional throughout, and the aphorism font
  shrinks to fit the 84% measure when the line would overflow (lesson 2's
  48 characters at 390 wide).
- Determinism: the first frame is drawn synchronously at fixed phase
  T0 = 20 s — lesson 1 mid-demo, the aphorism long since typed, sort waves
  rolling across the horizon beneath it. The rAF loop (typeof-guarded) is
  anchored as T0 + elapsed-since-load.
- Seeded hashes only; no `Math.random`, no gradients, no `ctx.filter`, no
  shadowBlur, no `createElement`, no ImageData/offscreen canvas, no audio,
  no microphone. Arcs follow the house convention (`moveTo` to the arc's
  start point before every `arc()`), and the moth's body is a computed
  polygon rather than `ctx.ellipse`, whose batched subpaths misrender in
  the QA renderer.
- Silent by design.

## QA

Rendered with the house renderer at 1280×800 (desktop), 390×844 (mobile)
and 720×720 (thumb). Frame one verified at all three sizes: chalkboard
field, the amber LESSON 1 tag and the fully typed "Glitch Art is the Art
of Surprise" at the top, and beneath it the banded horizon with the sun
disc and dense vertical pixel-sort streaks hanging from every band
boundary. The thumb was rendered twice and byte-compared with `cmp` —
identical; the duplicate was deleted.
