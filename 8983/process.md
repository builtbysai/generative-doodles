# Doodle №8983: Idle Day (2026-08-18)

**File:** `8983/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
A workday that never happened, drawn the way IOGraph would have drawn it if
it had been watching. The input is synthetic: a seeded simulation of cursor
behavior across an invented eight-hour day, morning email triage, a long
doc-writing stretch, chat bursts, a meeting with a long stillness, lunch away
from the desk, the afternoon scroll, diagonal scanning bursts, end-of-day
tidy. Reading pauses let the cursor hover while the idle radius accumulates,
scanning bursts throw fast diagonal sweeps, the afternoon scroll lays down
long vertical drifts with rhythmic reading pauses. Dots mark attention like
a heat map, hairline trails mark travel.

## Method (from study, not copied)
Anatoly Zenkov's IOGraph recipe, re-implemented from the study notes on his
v2.0.2 source, with his exact constants where they matter:
- Movement becomes 0.45px hairline segments between consecutive samples,
  antialiased, nothing else. Segments are batched by quantized hue (64
  buckets) so 100k+ segments render in seconds.
- Stillness: while the cursor stays inside a 20px drift box, idle radius
  accumulates at 0.9 per tick at 10 ticks/sec, the same 9px/sec as his
  0.3 per tick at 30 ticks/sec. On leaving the box with radius over 20,
  stamp three things: a soft halo of diameter 2r, a stroked ring, and a
  solid dot of diameter 2*sqrt(radius). The square root is kept exactly:
  a lunch away does not become a planet, it becomes the day's biggest
  honest mark.
- Direction to hue, but a restrained two-ink loop instead of his CMY:
  movement angle maps once around the compass, lerped gently between a
  muted iron-gall sepia and a muted slate indigo on warm archival paper.
  Dots take the ink of the direction the hand was moving when it left.
- The behavior grammar is the piece: seeded attention zones (mail column,
  doc column, chat dock, toolbar strip, app dock) with clear aisles so
  travel lines stay legible, and a scene script (boot, email, work, chat,
  meet, email, lunch, scroll, scan, work, wrap) normalized to about eight
  hours. All simulation happens in fixed 1600x1000 virtual units, so a seed
  draws the identical day at every viewport size.

## Parameters
- Seeded PRNG (mulberry32), `?seed=` in URL or click the piece for a new
  simulated workday.
- Default seed: 20260818 (the piece's date). Compared against 777, 424242,
  90210, and a click-generated 334084702: all five read as believable but
  distinct workdays. 20260818 won for balance, three well-separated
  attention columns, a legible mail-to-doc travel fan, and the lunch dot
  landing mid-column like a real walked-away mark. 424242 exposed a real
  flaw (below) and was re-rendered after the fix; it is fine now but the
  least interesting of the set.

## What was tried
- v1: halos at 0.30 alpha and idle trails drawn every 4th tick. The
  attention zones merged into dark washes and the day came out at 5.8
  hours on some seeds. Rebuilt: scene durations normalized to ~8h,
  halos cut to 0.07 alpha and clamped, idle trails thinned to every 8th
  tick, zone aisles widened so travel lines read.
- Direction mapping started as sin(angle) (north/south split the inks);
  switched to a full once-around-the-compass loop so every direction gets
  its own mix and the scanning diagonals show the gradient.
- The lunch dot (the day's longest stillness) dominated v1/v2 at ~275px.
  Lunch shortened to 22-32 minutes and big-dot fill lowered to 0.38, so
  it stays the day's biggest mark without eating the composition.
- Seed 424242 parked the lunch pause near the screen edge and the big dot
  clipped against the border, reading as a rendering artifact. Fixed
  structurally: the lunch scene now settles toward the zone interior
  (150px margin) before the long stillness, a plausible final move before
  walking away.

## Verification
- Rendered headless via Chromium CDP (isolated port 9355) at 5 seeds
  (20260818, 777, 424242, 90210, click-generated 334084702): every seed a
  coherent, distinct workday, no clipped mega-dots, no muddy zones.
- Viewport invariance: identical dot/trail pattern at 1280px desktop and
  390px mobile (same virtual-coordinate simulation, pixel-verified).
- Mobile 390x844: no scroll or overflow, header/footer/stamp all legible.
- Click regeneration verified via CDP: seed changes, `?seed=` updates in
  the URL, fresh day renders, no console errors.
- cdp_exceptions.py (Runtime enabled before navigation, continuous
  collection): exit 0, zero console errors on load.
- Copy check: no em dashes in UI copy or process.md.
