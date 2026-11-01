# №1204 — Null Sets

Evan Meaney study block EV5 (PP363), after Null_Sets (Meaney + Amy Szczepanski):
text broken to binary, rebuilt as image — "the difference between how computers
interpret data versus how we as humans interpret data."

## Staging

Three horizontal zones, always proportional: TEXT (top 40%), DATA (middle 20%),
IMAGE (bottom 40%), each with a small dim staging label at its left edge. The
field is #05060A throughout. No addresses, no hex, no debugger furniture — the
binary reads as weather, not as a tool.

## The poem

Walt Whitman, verbatim, public domain. Four stanzas cycled in order:

1. "I celebrate myself, and sing myself, / And what I assume you shall assume, /
   For every atom belonging to me as good belongs to you."
2. "I loafe and invite my soul, / I lean and loafe at my ease observing a spear
   of summer grass."
3. "When I heard the learn'd astronomer, / When the proofs, the figures, were
   ranged in columns before me,"
4. "Look'd up in perfect silence at the stars."

## Mechanism

- One stanza per 45 s; a four-stanza session arc is 180 s.
- Inside a stanza, line *j* finishes typing at `42·(j+1)/(nL+1)` seconds and
  starts 1.2 s after the previous line compiled (first line at 1.0 s). A block
  cursor rides the typing head. Letters are revealed on that schedule, so the
  typing pace breathes with line length instead of running at a flat rate.
- When a line completes it is *compiled*: a one-frame white flash (0.045 s),
  the text vanishes, and every character becomes its actual 8-bit char code.
  Each bit is a falling green `0`/`1` glyph (80% alpha) launched from its
  character's position, with a hash-staggered delay (0–2.2 s) and a 2.5 s
  smoothstep fall into the image zone, where it is absorbed. The bits are the
  poem's real bytes — the data is honest even though the reading of it is not.
- Between launches the DATA zone carries a slow ambient drizzle of hash-stepped
  bits, so the stream never fully empties.
- The IMAGE is a fixed composed scene — blue ghost-field (#12308A family),
  horizon line, darker ground, a standing figure — divided into a 12×8 cell
  grid. Each cell carries a seeded rank; cells unlock in rank order as the
  reveal fraction grows. Each compiled stanza contributes exactly one quarter
  of the image, advanced line by line, so four stanzas complete the picture.
  Unrevealed cells sit near-black with faint settled bit dust.
- The figure is half-erased structurally: it is drawn in seven horizontal
  slice bands, each offset by a seeded amount, one band at 30% opacity, with a
  magenta (#FF2B8D) fringe copy offset behind its right edge.
- At each stanza boundary the image takes one hard glitch (0.8 s of
  hash-driven horizontal band shear over the image zone, decaying) while the
  text zone clears. At the end of a 180 s arc the reveal resets to zero under
  that same boundary glitch and the next arc rebuilds from stanza 1.
- The translation loses the poem by design: the image is never text-shaped,
  and nothing of the wording survives into the picture except its bit count.

## Interaction

Drag across the DATA zone to scramble bits. Each drag lays mistranslation
marks (deduplicated per small x-step) keyed to the current absolute stanza;
revealed image cells near those x positions re-render *wrong* for the rest of
the stanza — green-shifted field, blue figure, extra slice offset. The poem
itself can never be touched; only the compilation can be corrupted.

## Determinism and house rules

- Synchronous first frame at fixed phase T0 = 62 s: stanza 2, its first line
  already compiled and still raining bits, its second line mid-typing
  ("I lean a…"), the image exactly 3/8 built with the figure emerging.
- All randomness is seeded integer hashing (no `Math.random`); every animated
  quantity is a closed-form function of piece time plus the recorded scramble
  list. rAF is typeof-guarded; the first frame draws without it.
- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; CSS size pinned in fit() and in draw(); phone
  detection via `window.screen` (min dimension < 700) with the
  `h > w·1.15` aspect fallback.
- No gradients, no `ctx.filter`, no shadowBlur, no `document.createElement`,
  no ImageData, no offscreen canvas, no audio or microphone APIs. Silent.
