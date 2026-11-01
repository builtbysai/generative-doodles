# No.969 — Eyes Shut

Study #119 kyle-mcdonald, PP130 "Blind Self Portrait" (after Kyle McDonald & Matt Mets, 2012).

## Concept

The constraint is the interface. A hand draws a continuous single-line portrait on a
lit sheet of paper in a dark gallery, but it may only move while the eye floating
above the table stays closed. The eye is a mint circle with a single lash line: no
pupil, no iris, ever — blindness is the portrait. The hand chases a seeded set of
face landmarks (jaw oval, brow, two eye loops, nose, mouth) with heavy smooth
drift and a per-landmark miss offset, so it snaps toward features and wobbles past
them: the classic blind-contour line. Finished portraits peel off the table and
join a wall ledger along the right edge, each tagged only with its duration. The
wall is a record, not a score — nothing in the piece measures or judges accuracy.
Tapping peeks: the eye opens for exactly two seconds and the hand freezes
mid-line, absolutely. Dragging guides the hand and briefly cheats the blindness;
a double-tap calls a new sitter and the unfinished portrait joins the wall with
its elapsed tag.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets.
- Fixed-timestep simulation at 120 Hz (`DT = 1/120`). Frame one is the
  synchronous draw after exactly 4200 pre-roll steps (35 s), so the first frame
  lands mid-portrait with two finished attempts already on the wall.
- All randomness comes from mulberry32 streams seeded per sitter
  (`BASE_SEED = 969130`, sitter k uses `BASE_SEED + k*7919`). No `Date.now()` or
  wall-clock input reaches any drawn state; frame one never depends on it.
- Portrait model: 35 waypoints in paper-local space (10 jaw-oval points, brow
  arc, two 6-point eye loops, nose line with hook, mouth arc). Each waypoint
  carries a seeded miss offset (±0.05). The hand seeks the current waypoint at
  0.52 paper-units/s; a two-sine seeded drift (amplitude 0.055) bends the target
  continuously. Waypoints loop until the sitting's planned time elapses, so the
  line is one unbroken polyline that retraces and re-misses the face. The
  stroke is rendered with midpoint-quadratic smoothing over the stored polyline
  so it reads as a drawn line; the stored data stays exact.
- Sitting length is 90 s of drawing time (frozen peek time does not count),
  standing in for the original 3–6 minute sittings; each portrait's wall tag is
  a seeded duration in 3:00–6:00. A portrait cut short by a double-tap is
  tagged with the elapsed fraction of its full duration.
- History: at load, two finished portraits are generated with the same
  generator (seeds `BASE_SEED − k*104729`) run fast at 30 Hz steps, and placed
  on the wall before the live sitting starts.
- Phases: draw → peel (240 steps; sheet eases toward the newest wall slot,
  line riding on it) → enter (72 steps; fresh sheet slides in) → draw. The wall
  holds the last 12 portraits; older ones are dropped (the exhibition clears).
- Eye state: peek sets a 240-step open timer consumed by the sim. While the
  timer runs, `stepPortrait` is called frozen: no hand motion, no line growth,
  no elapsed time. Openness is drawn as a lifted lash arc plus a flat mint fill
  at 0.28 alpha — never a pupil.
- Interaction: pointer events record press/drag state; taps and double-taps set
  pending flags that the sim consumes on its own step clock (peek / new
  sitter). A drag (press + move beyond 6 px) feeds the pointer position, in
  paper-local space, to the hand: drift amplitude drops 65% and the target
  blends 55% toward the pointer. On release the guidance strength decays over
  ~2 s of sim time and the blindness returns.
- Sound is lazy WebAudio, created only on the first pointer gesture and fully
  typeof-guarded: a band-passed noise loop is the paper scratch, gained up only
  while the hand is actually drawing; a soft triangle tick marks each landmark
  snap; the peel sweeps the scratch filter down and bursts it. When the eye
  opens the scratch gain targets zero — silence is the punishment for peeking.
  Without audio (QA renderer), the piece is simply silent.
- Layout: canvas sized from the Visual Viewport API with resize listeners on
  both `visualViewport` and `window`; `canvas.style.width/height` are pinned in
  px on every draw. Phone detection uses `window.screen` min dimension < 700 px
  with the `h > w*1.15` aspect fallback. Desktop keeps the wall as a right-edge
  column; on phones the wall moves to a horizontal strip along the bottom.
- Palette is exactly the specced set: ground #0B0C10, paper #EDE8DA, line
  #1A1B1F, ring light #FFD88A, eye mint #7DF9C6, lash #F5F2EA, wall papers
  #EDE8DA at 0.85 alpha. The table uses two dark flat tones (#14161D / #1D2029)
  as the perspective hint. The ring light's glow pool is two layered flat-alpha
  ellipses (0.05 / 0.04) — no gradients, no shadowBlur, no ctx.filter, no
  offscreen canvas anywhere.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` (node-canvas, no
  rAF / AudioContext present — the piece drew its first frame synchronously and
  stayed silent, as required):
  - `qa-desktop.png` (1280×900): dark room; mint closed eye with downward lash
    at top-center, no pupil; warm ring light with halo over a large paper; a
    wobbly continuous-line face mid-draw (oval, feature clusters, drifting
    nose/mouth zigzags) with the white hand dot on the line; two finished
    portraits on the right wall tagged 3:21 and 5:23.
  - `thumb.png` (720×720): same composition at gallery size.
  - `qa-mobile.png` (390×844): phone layout engages; wall becomes a bottom
    strip with both tagged portraits visible; eye, ring, and paper uncut.
- Determinism: `thumb.png` rendered twice and compared with `cmp` —
  byte-identical. The duplicate was deleted.
- Fix round: the first render's glow ellipse pooled too wide and read as a
  brown disc behind the table; radii reduced (0.62/0.60 → 0.56/0.54 and
  0.45/0.42 → 0.40/0.38) and the line stroke given midpoint-quadratic smoothing
  so the contour reads hand-drawn rather than polygonal. Re-rendered all three
  sizes and re-verified determinism after the change.

## Deviations

- Wall on phones is a bottom strip instead of the right-edge column (house
  phone rule); recorded here per the brief.
- Eye openness is signalled by lash position plus a flat mint fill, never a
  pupil dot — blindness stays the portrait even while peeking.
- The table is a minimal two-tone slab (a darker body and a 5 px lighter front
  edge) rather than a perspective drawing; the brief asks only for a flat
  perspective hint, and the paper must stay the visual center.
- Portrait "peel" is rendered as the sheet easing (position + scale) into the
  newest wall slot over 2 s rather than a literal page-curl; canvas 2D has no
  cheap curl, and the slide keeps the line legible the whole way to the wall.
