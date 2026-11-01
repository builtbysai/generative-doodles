# №1285 "The Great Divide" — jagdeep-raina JR6 (PP444)

## Prompt
A tall narrow vertical scroll, after Raina's *The Great Divide* (2022, 76"x27",
Yale Center for British Art): an embroidered river runs the scroll's full
length, splitting the composition, its banks edged with phulkari border bands;
tiny archive-drawn figures cross back and forth on each bank; prayer-verse
fields in sewn dashes at top and bottom. The phulkari border is both frame and
divide — "the violent drawing of borders around lands and people."

## What was built
- A single self-contained `index.html`, silent, no external assets.
- The scroll keeps the original's 27:76 proportion, centered on ink ground
  #141210, with a thin red stitch frame around its edge.
- River: deep #2E4A5E, center slightly off-center with a gentle sine meander,
  widening toward the bottom; light #7FA8B8 flow streaks run down it.
- Banks: muslin #E0D3B8 with flat-alpha wash blobs; red #A6343C phulkari
  dash bands run along both river banks.
- Figures: 14 seeded bank marchers (ink #3A3330) walking up/down their bank,
  scale growing from tiny at top to larger at bottom (depth by scale), plus
  4 crossers traversing the river horizontally. All loop with wrap.
- Verse bands: four rows of sewn-dash stitch lines at top and bottom, in
  verse gray #6B645A. Deliberately no legible wording and no fabricated
  Gurmukhi — the prompt specs verse fields but gives no verse text, so the
  fields read as stitch rows only.
- No literal map lines, no national borders: the divide is the river.

## Motion / interaction (all closed-form over recorded events and piece time)
- River flow: continuous downward scroll, seamless wrap over a 46 px pattern.
  Flow phase is a piecewise closed-form function of drag segments and the
  release event — never frame-integrated state.
- Drag upstream (drag upward): flow slows, factor 1 − 0.002 px per px dragged
  upward, clamped to 0.25; bank figures lean harder against the slowed flow
  (up to +0.45 rad). Release: flow resumes on an exp decay (tau 1.2 s) and
  the lean eases with it. Figures march on the flow phase, so their loop
  rate follows the flow too.
- Never click-to-reload.

## House adaptations
- Visual Viewport sizing with resize listeners on visualViewport and window;
  canvas pinned in draw() via style width/height in px; phone detection via
  window.screen physical size (min dimension < 700 px) with aspect fallback.
  On phones the scroll fills the height and stays whole, page ground in ink.
- Determinism (№1275 lesson): the synchronous first frame draws at exactly
  t = 0 via a boot flag; the performance.now() clock starts only with the
  rAF loop. Thumb rendered three times at 720×720, byte-identical.
- Node-canvas safe: no rAF unguarded, no AudioContext, no createElement, no
  WebGL, no offscreen canvas, no gradients, no shadowBlur, no filter. All
  marks are flat alpha shapes; dots use paired arcs with a moveTo before
  every arc. Seeded mulberry32 RNG; no Math.random.
- No visible text except `<title>`.

## QA
- Desktop 1280×900, mobile 390×844, thumb 720×720 all inspected: the scroll
  reads whole at all sizes, river widening toward the bottom, verse dash
  rows top and bottom, figures on both banks, one crosser visible on the
  river at frame one.
- Controlled-clock harness through the piece's own pointer handlers:
  no-drag flow advances (3,248 px differ between t=5 and t=10); a 200 px
  upward drag at t=2 changes the t=10 frame (5,434 px differ); release at
  t=6 resumes flow versus a held drag at t=30 (6,121 px differ).
- Token scan clean (the single grep hit is a comment stating no Math.random
  is used).

## Files
- `index.html` — md5 5388a333280dc9d7ffb9dde5751915f7
- `thumb.png` — 720×720, rendered from the finished file, byte-compared
- `qa-desktop.png`, `qa-mobile.png` — QA renders
