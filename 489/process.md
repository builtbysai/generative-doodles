# No.1566 "Two Grids Arguing"

- Title: Two Grids Arguing
- Prompt code: TW7 / PP813, EXPANSION #206 shunsuke-takawo
- Formula date: 2006 · 04 · 26
- Gallery note: "Two rotated black-and-white grids overlap into slow diamond moire, pausing every 45 seconds at perfect alignment. Watch the grids argue."
- Interaction cue: Watch the grids argue.

## Felt driver

Two stubborn grids, one checker and one radial, laid over each other and left
to disagree. Nothing moves fast and nothing is asked of the viewer: the
argument is the slow crawl of the diamond moire as one grid turns against the
other, and the held chord every 45 seconds when the turning stops and the
pattern locks into perfect alignment for five seconds.

## Mechanism

- Grid A: a fine checker drawn directly on the main canvas, full-bleed,
  integer-aligned cells (cell = floor(minDim / 40), 18 px at 720x720),
  alternating black #111 and white #FAFAF7.
- Grid B: concentric arcs plus 60 radial spokes, drawn on the same canvas
  inside a save / translate-to-center / rotate / restore block, stroked black
  at about 2 px. Arc spacing equals the checker cell size, so the two grids
  beat against each other at the same frequency and the diamond moire is free
  from the overlap. The 60 spokes converge into a dense black disc at the
  center, the argument's focal point.
- Adaptation per the build brief: no offscreen canvases (the QA renderer has
  none). Both grids are drawn directly on the main canvas; the moire comes
  from the overlap itself.
- Rotation is a closed-form function of piece time: angle(t) = 0.5 deg/s of
  accumulated motion, where motion is 45 s per 50 s cycle and freezes during
  the 5 s pause. Holds land at 22.5, 45, 67.5 ... degrees: exact,
  reproducible alignments, constant speed, no easing, no narrative.
- Caption: title, formula date, and watch-only hint drawn on the canvas in a
  small white chip at the bottom left, black text only. No other text.
- Watch-only: no pointer listeners of any kind, only resize listeners on
  visualViewport and window. No audio. No color anywhere: no gradients, no
  blur, no easing.

## Palette

- Black #111111 and white #FAFAF7 only. Nothing else.

## Composition

- Full-bleed on every viewport: the checker covers the whole canvas and the
  radial grid is centered on the viewport center with circles reaching past
  the corners. On phones the same composition renders with smaller cells and
  no clipping.

## Interaction

- None. Watch-only by spec. The top grid rotates at 0.5 degrees per second
  against the static checker; every 45 seconds the rotation pauses for 5
  seconds at a perfect alignment, then resumes.

## Determinism note

- One synchronous frame is drawn at load from a fixed phase (piece time
  t = 0, rotation angle 0). The rotation angle is a closed-form function of
  piece time, never accumulated across frames, so the first frame is
  reproducible. No randomness is used anywhere in the piece (pure geometry
  from the viewport size), so no PRNG is needed. requestAnimationFrame calls
  are typeof-guarded.

## Render results

- Desktop 1280x900: full-bleed checker with concentric arcs and spokes over
  it, strong diamond moire across the field, both grids legible, caption
  readable bottom left, strictly monochrome.
- Mobile 390x844: same composition, smaller cells, no clipping, caption fits
  on one line.
- Thumb 720x720: final render, moire diamonds read clearly at gallery size.
- One fix round: the first angle formula (0.5 * (t - 5 * floor(t / 50)))
  kept rotating through the pause, so t = 46 read 23 degrees instead of
  holding at 22.5. The pixel probe caught it (t = 46 vs t = 49 differed).
  Fixed to motion = 45 * cycle + min(inCycle, 45); all probes pass after the
  fix. The t = 0 frame is unchanged by the fix (thumb md5
  43db585817457433fc2c1d239e2f9c83 before and after).

## Probe results (probe-1566.js, 18/18 passed)

- Frame-one determinism: two fresh 720x720 renders byte-identical (md5
  43db585817457433fc2c1d239e2f9c83); a second thumb re-render matches the
  shipped thumb byte-identically.
- Rotation timing: angle 0 at t = 0, 5 at t = 10, 22.5 at t = 45, 22.5 at
  t = 46 and t = 50 (frozen through the pause), 23.0 at t = 51 (resumed),
  45 at t = 95 and t = 100 (second hold). Paused flag true at t = 47, false
  at t = 51.
- Geometry: checker cell 18 px at 720x720, 60 spokes, grids centered at
  (360, 360).
- Monochrome: worst per-pixel channel spread 3 (antialiasing only); black
  55.0%, white 37.9% of pixels, remainder antialiased gray.
- Motion: t = 0 vs t = 10 pixels differ (grid rotates); t = 46 vs t = 49
  pixels identical (held chord).
- Caption chip present at bottom left (7,143 white pixels in the bottom strip).
