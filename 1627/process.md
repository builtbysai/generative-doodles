# №1627 Storm Path Predictions — process notes

YL4, study #214 yi-wen-lin. After his 2026 plotter piece "Storm path
predictions. #Weathernext2". Gallery date 2006 · 06 · 26.

## What it is

Cream paper (#F2EEE4) with a faint latitude/longitude grid (#C9C4B4,
16 columns by 12 rows, every fourth line slightly stronger) and a pale
coastline contour (#8A8574, with a faint echo contour seaward of it).
The coastline is a height function over the field: land above, sea
below. A seed point sits in the lower-right sea. From it, an ensemble
of storm tracks is drawn in dense blue ink (#1F5FC4, shaded per member
toward #174A9E or #3A78D8, alpha 0.55-0.90, width 1.0-2.5 px), one curve
per ensemble member, diverging as they make landfall. The bundle is
thick where the models agree (at the seed) and fans where they split.

## Motion and interaction

Watch-first, forecast mode. The plotter draws the ensemble over about
a minute: 24 members, one every 2.4 s, each drawing in over 2.2 s.
When the set completes it holds for 4 s, then the next forecast cycle
begins with a new cycle seed. The old tracks wash to a ghost trace
(alpha x0.13 for one cycle, x0.05 for the next) and then disappear.

Tap: tapping the sea chooses a new seed point. The old tracks wash to
a ghost trace and a fresh ensemble draws from the new seed. Taps on
land, or outside the field, are ignored. Never click-to-reload, never
click-to-restart.

## Technical approach

Each ensemble member is a path integrated through a seeded 2D value
noise field (mulberry32 + hash-based value noise, seed 1627007).
Per-member perturbation: a jittered start point, a heading bias of
plus or minus 0.15 rad, and its own noise seed. Each member steers
toward its own landfall point on the coast (spread along the coast
from fx 0.12 to 0.70), so the bundle fans as it makes landfall; the
noise field bends each curve off the straight line. Within 90 px of
its landfall point the member holds its aim direction frozen, so the
track runs cleanly onto the coast instead of hooking around the aim
point. Each track stops six steps after crossing the coastline, a
short run inland. Pen wobble is a small sinusoidal perpendicular
offset baked into the stored points. Grid and coastline are static
layers, rebuilt only when the field rect changes.

Frame one is a fixed phase: two members fully drawn, the third half
drawn (t = 5900 ms). All layout comes from the seeded PRNG, never
Math.random, so the thumb re-renders byte-identical.

## Asserted counts

- Ensemble members per cycle: 24, asserted by MEMBERS.
- Grid: 16 columns by 12 rows (15 interior vertical lines, 11 interior
  horizontal lines), major lines every fourth.
- Coastline: one main contour plus one faint echo contour.
- Forecast cycle: 24 x 2.4 s + 4 s hold = 61.6 s.
- Max integration steps per member: 190.

## Deviations from the prompt

- The prompt says tracks are drawn "through a seeded 2D noise field
  with per-member perturbation of the seed". The build adds one
  steering element the prompt does not name: each member aims at its
  own landfall point on the coast. Pure noise steering was tried first
  and failed QA: most members crossed the coast within a few steps of
  the seed (the coast sat too close to the seed) or ran off the left
  edge without ever making landfall. The landfall aim keeps the
  noise-field integration (the curves still bend off the straight
  line) while making the divergence and landfall spread the prompt
  asks for actually readable.
- The coastline was lowered relative to the first draft (it now runs
  from fy 0.10 at the left edge to fy 0.55 at the right edge) so the
  seed has about 0.19 of the field height of open sea before the
  coast, giving the ensemble room to fan.
- A second, fainter echo contour was added seaward of the coastline
  for the chart feel; the prompt names one contour, the echo is a
  subordinate reading aid in the same ink.
- One animation-loop unit bug was caught and fixed during the build:
  the loop added seconds to a millisecond phase, which would have
  frozen the plotter. Time is milliseconds throughout.

## House rules

- Boilerplate adapted from №1625 (sizing, phone detection, hint and
  title rendering). Visual Viewport sizing, resize listened to on
  visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px; phone detection via window.screen
  (min dimension under 700 px) with aspect fallback (h > w*1.15).
- Landscape 4:3 field: fitted and centred on desktop, a centred band
  on phones, never stretched; page ground is the piece's own paper.
- One synchronous frame at load; requestAnimationFrame guarded with a
  typeof check so node-canvas QA works.
- Flicker is nil by construction: tracks are drawn progressively,
  nothing blinks or strobes. Reduced-motion support: the completed
  ensemble is drawn statically.
- No em dashes in visible copy. No AI-signature copy. Title
  "Storm Path Predictions", date "2006 · 06 · 26", hint "Tap the sea
  to re-seed the forecast."

## QA

Rendered from the actual script with node render-piece.js at
1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three
inspected visually. Two fix rounds: the first-draft noise-only
steering never reached the coast properly (fixed with landfall
aiming and a lower coastline); the first landfall-aiming draft
hooked tracks at their landfall points (fixed by freezing the aim
direction within 90 px). A full-cycle render (t = 57600 ms) was
also inspected: the completed ensemble reads as a thick bundle at
the seed fanning to spread landfalls, with no filled cone. Thumb
re-rendered twice after the final edit: byte-identical
(md5 8139733cc9f441e865ba7c5dbbc79b64 both times).
