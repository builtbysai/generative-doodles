# No.783 Desert Draft

EXPANSION #95 doug-wheeler, prompt block PP8 "Desert Draft".
Wheeler's 1971 red-line study drawings for the Synthetic Desert
light environments, turned into a generator: a warm-paper sheet
drafts itself in thin red lines, one unbuilt chamber per study,
holds, fades, and starts a new one. Tap re-drafts a fresh study.

## Concept

The drawing is the piece. On warm paper over a faint grid sit four
views of one unbuilt light environment, laid out like the real
1971 sheet: plan bottom-left (chamber outline with an entrance
gap, inner cove line, a grid of pyramid marks), side elevation
top-left (the coved ceiling profile), front elevation top-right
(the wall and its glowing aperture), aerial perspective large
center-right (the pyramid field converging on a far light wall).
A title cartouche sits bottom-center. Ink annotations, leaders and
squiggle clusters, are marks only: nothing on the sheet is legible,
because his annotations here are a gesture, not words.

Each study is seeded: pyramid row counts (8-16 in both the plan
and the aerial), chamber aspect, cove radius, aperture proportions,
entrance position and viewpoint all vary study to study. The sheet
draws itself stroke by stroke, about 8 seconds per view, holds the
completed sheet, fades it away, and drafts the next study.

Palette, strict and complete: paper #F4EFE6, redline #C0392B,
faint grid #D9CFBF, annotation ink #3A3630. No blue anywhere; this
is redline on warm paper, as his.

## Construction

Single self-contained index.html, canvas 2D, no external assets,
no visible text except the title, and no letterforms anywhere:
every notation mark is a procedural squiggle (two sine components
plus seeded jitter), which reads as handwriting without resolving
into letters.

- Sheet: the design lives in a 1.24-aspect unit space mapped onto
  a sheet rect fitted inside the viewport (94 percent), centered,
  on a page ground of the paper tone. Grid is 24 by 19 faint lines;
  a thin red border and four ink crop ticks finish the sheet.
- Strokes: every view is a list of polylines in design space with
  precomputed arc lengths. Long straights are subdivided with a
  small seeded perpendicular jitter so the lines feel hand-drawn;
  endpoints stay exact so corners meet. Reveal is progressive by
  length: at any instant each stroke is traced up to the fraction
  its reveal interval allows, and a small red pen dot rides the
  stroke currently being drawn.
- View generators (all geometry precomputed per seed from one
  mulberry32 stream):
  - Plan: chamber outline with a seeded entrance gap and threshold
    line, inner chamber rect, pyramid plus-marks row by row (rows
    8-16, columns from the aspect), a center diamond marker, and
    an ink leader plus squiggles below.
  - Side: the cove profile as two arcs and straights, floor slab
    line, an inner cove echo at reduced scale, the glowing end
    wall seen edge-on, datum ticks, leader and squiggles.
  - Front: wall rect, aperture rect with inner inset (proportions
    seeded), cove arcs tucked into the top corners, floor and slab
    lines, leader and squiggles below.
  - Aerial: horizon line broken by the far wall, far wall rect
    with glow inset, converging field boundary lines, pyramid
    chevron rows far-to-near with spacing bunched toward the
    horizon (depth raised to 1.7), chevron size limited by both
    cell width and row gap, viewpoint circle with sight lines to
    the far wall, leader and squiggles.
  - Cartouche: red rect, small red square, three ink squiggle
    rows, one short red rule. Drawn inside the aerial's window.
- Reveal windows inside the 32 s draw phase: plan 0-8, side 8-16,
  front 16-24, aerial 24-32, cartouche 29.5-32. Within a window,
  intervals are proportional to stroke length plus a small
  per-stroke floor, so the hundreds of tiny marks stream in
  sequence instead of popping in together.
- Cycle machine: 48 s per study, 32 draw + 10 hold + 6 fade
  (smoothstep alpha on the view strokes only; paper, grid and
  border never fade). The machine is closed-form: an epoch list
  (start time, seed) plus cycle arithmetic. Cycle rollovers step
  the seed chain (LCG) once per cycle. A tap starts a new epoch
  at the tap time with the next seed, effective immediately, from
  whatever phase the old sheet was in; tap listeners (pointerdown,
  mousedown, touchstart) are deduplicated within 0.35 s so one tap
  re-drafts exactly one study. Frame one: epoch 0 starts at
  t = -4.5 s, so the synchronous first draw lands 4.5 s into the
  plan view (see Deviations).
- Canvas size comes from the Visual Viewport API with resize
  listeners on both visualViewport and window; draw() pins
  canvas.style.width and height in px every frame. Phone
  detection uses window.screen physical size (min dimension under
  700 px) with the aspect fallback; the landscape sheet simply
  scales to fit the narrower frame. The animation loop is guarded
  by a typeof check on requestAnimationFrame; the QA renderer has
  none, so only the synchronous first frame draws there. No
  Date.now anywhere (grep count 0), no audio.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720
  (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with
  cmp: identical. The duplicate render was deleted.
- Completed-sheet check: a throwaway render forced to the hold
  phase through the piece's inert QA hook (seed=done via the
  renderer, active only when requestAnimationFrame is absent) was
  read back, then deleted. It shows all four views complete: coved
  side profile with echo and datum ticks, front wall with inset
  aperture and corner coves, plan with full pyramid plus-grid and
  center diamond, aerial chevron field converging on the far wall
  with sight lines and viewpoint circle, cartouche bottom-center,
  and four ink annotation clusters with leaders. No legible marks
  anywhere; squiggles read as notation only.
- Read-back, frame one (all three sizes): warm paper, faint grid,
  red border, ink crop ticks, and the plan view under way:
  chamber outline, entrance gap and threshold line, inner rect,
  two-plus rows of pyramid plus-marks drawn and the pen mid-row.
  Not blank paper; the draft is visibly in progress.
- Mobile (390x844): the landscape sheet fits the width and centers
  vertically on the paper ground; nothing is clipped.
- Grep audit clean: no Date.now, no external URLs, no
  createElement, no AudioContext, no em dashes.

## Deviations

- Frame one phase offset: the brief asks for a fresh sheet at draw
  phase 0 but also asks that the thumb not be blank paper. Epoch 0
  therefore starts at t = -4.5 s, so frame one is the cycle at
  4.5 s: the plan outline and inner rect down and the pyramid grid
  filling, roughly half the plan view drawn. Every subsequent
  cycle and every tap starts at true phase 0. Reason: the two
  requirements conflict at exactly t = 0; the offset honors the
  legibility requirement with the smallest possible shift, and the
  cycle logic itself is untouched.
- Cycle length is 48 s (32 draw + 10 hold + 6 fade) against the
  brief's approximate 50 s. Reason: the four 8 s view windows plus
  the specced hold and fade sum to 48; rounding to whole view
  windows keeps every phase boundary exact.
- An inert QA seed hook (seed=done / seed=tN, read only when
  requestAnimationFrame is absent) exists so the completed sheet
  can be rendered headlessly for the QA read-back. It is
  unreachable in a browser and changes no shipped behavior.
  Reason: the completed state otherwise exists only 32 s into a
  live session, past what the headless renderer can observe.
