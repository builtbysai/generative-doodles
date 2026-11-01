# No.936 — Dear Someone: A Weekly Correspondence

Study #115 giorgialupi, PP97 "Fifty-Two Questions". Giorgia Lupi's Dear Data
(2014-15) as a generative weekly-ritual engine: each week the postcard asks
one small question of daily life, gathers a small synthetic dataset, and
invents a custom visual code for it. The legend is part of the artwork and is
hand-lettered in the same wobble pipeline as the data.

## Concept

- A warm-paper postcard fills the frame (thin ink border; the page ground is
  the same paper). A coral postage stamp with perforated edge sits top-right,
  overlapped by a stamp-red double-circle postmark with wavy cancellation
  lines running left.
- The data drawing fills the upper two-thirds. Below a thin wobbled rule, the
  legend band: the week's question hand-lettered as a bold title, then the
  grammar's two key lines, each with a small drawn glyph sample.
- Four invented grammars rotate week by week, one code per week, never
  standard chart types:
  - (a) Spiral stems: one indigo stem per day, coral spiral turns wrapped
    around it; turns = count. Keys: "one stem = one day" / "spiral turns =
    count".
  - (b) Circle clusters: one cluster per day; each observation is a circle
    whose size = its value, colored indigo (low), coral (mid), mustard
    (high). Keys: "one cluster = one day" / "bigger circle = more".
  - (c) Looped threads: one coral thread per day with loops along it; loops =
    count. Keys: "one thread = one day" / "loops = count".
  - (d) Day arcs: concentric indigo arcs, one per day, with mustard ticks;
    ticks = count. Keys: "one arc = one day" / "ticks = count".
- Twelve questions cycle in pool order ("times I checked the clock", "smiles
  at strangers", "complaints, kept and sent", ...). Datasets hold 12-40
  observations (stems 7-42 turns, clusters 14-35 observations, threads 7-49
  loops, arcs 14-63 ticks; stems/threads totals can exceed 40 because the
  unit counted per day is the day-value itself, the observation being the
  day).

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no
  absolute URLs, no date strings, no em dashes. Visible text is only the
  question, the key lines, the back-side legend, the sign-off "read me
  slowly", and the `<title>`.
- Weeks are seeded data: a master mulberry32 stream (seed 936001) is consumed
  strictly in week order to draw each week's seed; each week's dataset is
  generated from its own mulberry32 stream. Week index, grammar (rotate
  a,b,c,d) and question (pool order) are pure functions of the week index.
- Piece clock: frame one is the synchronous draw at elapsed 0 mapped to piece
  time 26 s (PHASE0), i.e. week 1 at 65% collected with the legend mid-write.
  No `Date.now()` anywhere; all drawn state is a closed-form function of
  (piece time, recorded tap/skip events). Per-element wobble and per-letter
  jitter come from FNV-1a-keyed mulberry32 streams keyed by content, so every
  frame is reproducible.
- Week loop (50 s): the week collects itself over 40 s (observations draw in
  glyph by glyph, days in order, frontier measured in data units); the legend
  writes itself across seconds 18-30; hold to 48 s; a postal wipe (paper
  front with wavy edge plus stamp-red cancellation waves) sweeps across
  seconds 48-50 and clears to the next week.
- Hand-lettered text: a plain font stack ("Segoe Print", "Bradley Hand",
  "Comic Sans MS", cursive) drawn letter by letter with seeded rotation and
  baseline jitter; writing reveal is a width budget consumed in sequence
  (question first, then key lines), identical pipeline on front and back.
- Interaction:
  - Tap flips the postcard (scaleX through 0 over 0.6 s with a soft ink
    shade at the midpoint). The back shows the legend writ large: question
    big, key lines with large glyph samples, the sign-off "read me slowly",
    postmark faint. Tap again to return.
  - Drag tilts the card (skew/shift transform) and moves a low-alpha white
    sheen wedge across it; on release the tilt settles with an exponential
    decay recorded as a release event.
  - Double-tap skips to the next week immediately; skips are recorded events
    and virtual time is computed by replaying them, so the clock stays
    closed-form.
  - Tap vs double-tap is resolved with a 340 ms pending-flip window.
- Sound (first pointer gesture only): lazy, typeof-guarded AudioContext;
  pencil ticks as observations tally in (tracked from the drawn unit count),
  a filtered-noise swish on flip, a low stamp-thump at each new week and on
  double-tap skip. The piece renders complete in silence.
- Viewport: canvas sized from the Visual Viewport API with resize listeners
  on both visualViewport and window; canvas style width/height pinned in px
  inside draw(). Phone detection via window.screen (min dimension < 700 px),
  aspect fallback only. On phones the rule sits higher (0.60 of card height),
  type shrinks, and the question wraps inside the legend band.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). All three
  render cleanly in silence (no AudioContext, no requestAnimationFrame in
  the harness; rAF is typeof-guarded).
- Determinism: thumb.png rendered twice and `cmp` byte-compared: identical.
  The duplicate render was deleted.
- Desktop read-back: warm paper postcard with ink border; stamp and postmark
  top-right; week 1 (spiral stems, "times I checked the clock") at frame
  one: stems for days 1-5 up, days 1-3 fully wrapped in coral spirals, day 4
  mid-wrap (its single broad turn), day 5 stem only, days 6-7 not yet
  collected; legend band below the rule with the question fully written and
  the first key line mid-write ("one stem = one" with its glyph sample),
  exactly the specced frame one.
- Mobile read-back: same composition fitted to 390 wide; question on one
  line, key line legible, stamp/postmark clear of the drawing, nothing
  clipped.
- Thumb read-back: same frame at 720x720 with the desktop layout (720 px
  screen min is not a phone by the screen rule), nothing clipped.

## Deviations

- Legend timing overlaps the collect phase: the brief's loop lists collect
  (40 s), then legend (10 s), then hold, but its frame one requires data at
  ~65% collected with the legend already partially written. The legend
  therefore writes across seconds 18-30 (12 s) while the week finishes
  collecting; at the frame-one offset (26 s) the question is complete and
  the first key line is mid-write. Hold is correspondingly longer (to 48 s)
  and the wipe closes the 50 s week.
- The sheen wedge uses white at alpha 0.10 (the brief describes a
  "paper-white" flat polygon); every other color is strictly from the
  six-color palette.
- The stamp face carries a tiny spiral-stem motif and a mustard sun dot
  instead of a portrait; no text appears on the stamp or postmark, keeping
  visible text to the specced question, keys and sign-off.
