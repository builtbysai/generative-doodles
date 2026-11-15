# №1785 PP1032 (SR2) "Seven Notes, Six Notes", 2006 · 12 · 01

## Build
- Spec: `BATCH-1784-1785-SPEC.md`, section №1785. Template: live №1780
  (`1780/index.html`, repo sha 25d1dece420383d659236bed0e50d05878444cf6), fetched
  fresh at build; the live page itself would not text-extract, so the repo copy
  of the same file was used.
- Self-contained `index.html`, Canvas 2D only (no WebGL). White paper ground
  `#ffffff`. Grid tilted -0.026 rad (about -1.5 degrees), like a sheet held by
  hand. Title/date/hint plates drawn on canvas, unrotated.
- Title check: live `pieces.json` fetched via the git blob API
  (sha 85bbecb984c3775bda3b131de4ea8b6f7183d80a, 1,257,930 bytes, 1,981 entries;
  the Contents API returns 0 bytes over the 1 MB limit). No entry titled
  "Seven Notes, Six Notes" exists: no collision, ship verbatim. №1785 does
  not exist in the live repo tree (fly's highest live number is №1780).
- Gallery note: "A felt-tip grid plays itself row by row; crossed cells
  bloom. Drag to conduct."

## Grid table
18 rows, 7 columns; the middle band (rows 6-11, "6 notes") has 6 columns,
centred with a half-cell offset. Fixed authored table from seed 1785
(mulberry32): per cell, in row-major order, one stream value picks the
palette colour, then eight values jitter the four corners (-1..1, scaled to
plus or minus 4.5% of cell width/height).

Palette: R red #E23B2E, O orange #F07A1E, Y yellow #F2C200, G green #3D9E4D,
B blue #2F6FD0, P purple #7B4BA6, K pink #E85D9E.

```
row 00: Y G G B K B B
row 01: O O O P P P P
row 02: B Y B G Y R B
row 03: G K B Y P O P
row 04: B G B P O O B
row 05: R K R R P K G
row 06: R G P B B R
row 07: Y Y O K Y Y
row 08: P G P B R Y
row 09: K O K K B P
row 10: G G Y Y O G
row 11: R G R R R G
row 12: R P O G R Y K
row 13: P Y Y O B P B
row 14: R P P K R K R
row 15: P Y O B G G P
row 16: Y O R G O Y P
row 17: R O B R K Y Y
```

Each cell carries a small dot at its centre in a darkened shade of its own
colour (shade 0.45 toward black). Arrow wobbles continue the same seeded
stream after the grid: -0.301, 0.138, 0.142, -0.340, 0.107, -0.074, 0.419,
0.397, -0.543, 0.964, -0.555, -0.779.

## Phase and playhead schedule
- Fixed phase: frame one at t = 60 s. Playhead position in row units is a
  closed form of piece time: frac(t) = (t / ROW_DUR + 0.62 + dragOff) mod 18,
  ROW_DUR = 20/3 s (about 6.667 s per row), full pass 120 s.
- At t = 60 s, drag 0: frac = 9.62, so the band sits 0.62 down row 9,
  mid-grid. Band height 1.9 rows, warm highlight #FFB042 as a vertical
  gradient, alpha 0 at the edges rising to 0.34 at the centre.
- Drag vertically nudges the playhead: dragOff in rows, clamped to plus or
  minus 3, eased back to 0 over about 8 s after release. Frame one is
  pre-drag (dragOff = 0).
- Row label arrows: graphite, hand-drawn with a quadratic wobble, reading
  "7 notes" (rows 0-5), "6 notes" (rows 6-11), "7 notes" (rows 12-17). The
  band being read jiggles plus or minus 1.6 px at 2.5 Hz; at t = 60 s that is
  the "6 notes" band (row 9), offset about +1.6 px. "Top" arrow sits above
  the grid, pointing down.

## Bloom timers
- For row r, dt = seconds since the playhead centre last crossed the centre
  of row r (closed form from frac).
- Dot pulse: rises over 0.3 s, decays to 0 by 2.0 s; dot radius scales by
  (1 + 0.9 * pulse).
- Colour deepen: linear 1 to 0 over 15 s; the fill mixes 55% toward the
  darkened shade.
- At t = 60 s: row 9 dt = 0.8 s (pulse 0.71, deepen 0.95); row 8 dt = 7.47 s
  (deepen 0.50); row 7 dt = 14.13 s (deepen 0.06); every other row 0.
  Verified by pixel sampling after the fix (see QA).

## Motion and interaction
- Watch-first. The playhead loops down the rows at a calm pace; crossed
  cells bloom once. Drag vertically to conduct. No click-to-reload.
- Deterministic first frame: seeded RNG only, no Math.random() or Date.now()
  affecting frame one; drag and audio act only after a visitor gesture.
- Audio (optional, muted by default): one soft sine pluck on pointerdown,
  pitch from the current row; never autoplay. The visuals carry the piece.

## Deviations and adaptations
- "Top" arrow moved from grid centre to 85% of grid width: on 390 px phones
  the title plate (ending near x 251) would otherwise cover the centred Top
  label (grid centre near x 207). It still sits above the grid and points
  down at it.
- Top margin raised 6.2% to 7.5% of field height and bottom margin 2% to
  4.5%, so the title plate never overlaps row 0 and the hint plate never
  overlaps row 17 on phones.
- Bug found in QA and fixed (not a spec deviation): `shade()` first returned
  an `rgb(...)` string, which `mix()` then mis-parsed, producing NaN; the
  canvas ignored the invalid fill, so bloomed cells silently kept the
  previous cell's dot colour. `shade()` now returns a hex string. Caught by
  pixel sampling, fixed, and re-gated.

## QA
- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900
  desktop, 390x844 mobile, 720x720 thumb; all three PNGs read and inspected.
- Desktop: bright felt-tip grid at a slight tilt, labels and Top arrow clear,
  warm band across row 9 with enlarged pulsing dots, row 8 visibly deepened,
  plates clear of the grid.
- Mobile: grid full-bleed, Top arrow clear of the title plate, band and bloom
  read well, hint plate clear of the last row.
- Thumb (720x720): the 720 render itself; grid, band, bloom and plates all
  legible at small size.
- Pixel check after the fix: row 7 yellow at (239,191,0) (deepen 0.06),
  row 8 purple at (108,66,145) (deepen 0.50, exact), all other rows at exact
  palette values; band gradient visible across rows 9-10.
- Re-gated after every edit; the final renders above are from the shipped
  file. No em dashes in visible copy. No AI-signature copy.
