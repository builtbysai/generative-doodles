# №1222 — One Year Project

Clint Enns study block CE7. Grounded in his One Year Project (2004–05), a
photo a day for a year, and in his preservation writing: even a perfect
migration of decaying media leaves artifacts. Here the migration is total —
every photograph is generated — and the artifacts are kept on purpose.

## How it works

- **The year.** 366 cells, one per day of leap-year 2004, in a strict grid
  that always fits the viewport whole: 22 columns × 17 rows on landscape
  screens (374 mounts, the last 8 left empty as the year's tail), 14 × 27 in
  portrait (378 mounts, 12 spare). No scrolling, no slideshow mode — the grid
  is the piece. Chrome is near-black: background #0A0A0C, cell mounts
  #2A2A2E.
- **The photographs.** Each day's picture is a shape list computed once at
  load from a seeded hash of its day index (mulberry32), defined in unit
  coordinates so the identical photograph renders at grid size or full-frame
  size. Six procedural scene types — wall with baseboard, sky over a
  roofline, tabletop edge, street corner, doorway, field with horizon — in a
  muted ten-tone photo palette. Across the shipped year the mix lands at 77
  walls, 58 rooflines, 68 tabletops, 54 street corners, 48 doorways, 61
  fields.
- **The damage.** The uncurated camera-roll feel is applied per photo, by
  hash: 133 photographs sit crooked (horizon tilted up to ±3°, the exposure
  rotated whole and drawn oversize so no corner shows through); 90 carry a
  flash blowout (a hard white polygon star, flat alpha — no gradients); 92
  include a figure, and 44 of those have red-eye, two small red dots burned
  into the head; 37 have a thumb over the lens, a skin-tone mass eating one
  corner. Nothing is cleaned up.
- **The timestamps.** Real date math, no shortcuts: day index walks the
  cumulative month lengths of leap-year 2004 (February has 29), and the
  time of day comes from the day's hash, spread across all 24 hours. Every
  cell carries its stamp burned into its foot in camera-LCD green #33FF66,
  format exactly `2004:03:14 09:41`, fitted across the cell width.
- **The highlight.** One day is bordered in amber #FFC53D. It advances one
  day every ten seconds of piece time: H(t) = (72 + ⌊t/10⌋ + scrubbed days)
  mod 366. At the fixed first-frame phase (T0 = 23 s) the highlight sits on
  day index 74 — day 75 of the year, a field photograph stamped
  `2004:03:15 00:03`, pixel-verified in QA.
- **Interaction.** Press and hold any cell, still, for 400 ms and that day
  opens full-frame — the same generated photograph large, its timestamp
  large beneath it, and a date line (`MARCH 15, 2004 · DAY 75 / 366`).
  Release and the grid returns. Drag sideways instead and the year scrubs:
  the highlight jumps 24 px per day, committed on release. Hold state is
  derived from the recorded press and the clock, never frame-integrated.
- **Determinism.** The synchronous first frame is drawn at the fixed phase
  T0 = 23 s; the rAF loop (typeof-guarded) continues from that anchor plus
  elapsed time. All content derives from seeded hashes. The 720×720 thumb
  was rendered twice and byte-compared: identical. Silent throughout; no
  gradients, no filter, no shadowBlur, no offscreen canvas, no microphone.
