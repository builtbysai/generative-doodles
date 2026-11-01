# №1245 "Button Pusher" — process

Adán De La Garza study block ADG6, after his *Button Pusher*
(2015–ongoing), the annual autobiographical photo zine. His photos are "the
residue of human experiences and the moods and atmospheres of those
experiences made public"; the camera itself is "a nervous habit or reflex to
moving through any given space. Perhaps even a buffer." This piece is that
habit, procedural: a year's worth of reflex snapshots filling a calendar.

## What it is

A 12 × 30 calendar grid (360 tiles) on zine paper (#E8DFC9). A red month
band (#B04A3A) runs down the left edge with the month numerals 1–12 — the
only text in the piece; numerals are calendar furniture, not captions. The
photos explain nothing, and there are no likes, hearts, or diary touches
anywhere.

Each tile is a tiny flat procedural photograph drawn from nine templates:
doorway, coffee cup's shadow, pigeon, cracked windshield, empty chair,
handrail, window light, floor tiles, stair edge — each in one or two muted
tints from the specced palette (doorway brown #6E5643, cup-shadow grey
#8A8D94, pigeon blue-grey #7A8699, windshield glare #C9CDD3, ink #1B1B1B).
Every tile sits crooked by a hashed ±2°, with a small hashed positional
jitter, and its foreground is offset by a hashed framing error — slightly
wrong framing is the point; these are reflexes, not compositions.

## Fill / archive model

- One year fills in day order over 120 seconds: tile *i* lands at
  (i + 0.5)/3 seconds into its year (3 tiles per second). The half-tile
  offset keeps the fixed first frame (T0 = 47 s) off a landing instant.
- The newest tile lands with a xerox thump — scale 1.06 → 1.0 over 0.15 s —
  and a single-frame paper flash beneath it.
- Time is a line of years: year *k* fills during [120k, 120k + 120). Viewing
  state is a pure function of displayed time. A vertical drag records a
  `scrub` offset (dragging the full grid height ≈ one year) and the display
  shows time − scrub, clamped at zero: drag down to walk back through
  completed years mid-fill, exactly as they were; the present keeps filling
  while you look at the past. One ink dot per archived year appears in the
  bottom margin, counted from the displayed year.
- All interaction is recorded state (scrub offset, tap events, reseed salt),
  never frame-integrated; every frame derives from time + records.

## Interaction

- **Tap a filled tile:** it enlarges ×4 at the centre on a loose paper
  panel, with a zine-page wobble (damped rotation spring, closed form from
  the tap instant) and a quick scale pop. Because the templates are
  procedural at any size, the enlarged photo shows its full detail. Tap
  again to release it.
- **Drag vertically:** scrub through the archive (see above).
- **Double-tap:** reseeds the photo salt — a different year's worth of
  reflexes.

## Determinism

The synchronous first frame is drawn at the fixed phase T0 = 47 s: 141 of
360 tiles filled (39%) — months 1–4 complete, month 5 filled through day 21,
the frontier mid-row, empty paper slots ahead — and the newest tile's thump
already settled (age 0.167 s). The rAF loop, guarded by a `typeof` check, is
anchored as T0 + elapsed-since-load. All variation comes from the seeded
integer hash `ih(seed, k)`; no `Math.random`, no gradients, no `ctx.filter`,
no shadowBlur, no offscreen canvas, no ImageData, no audio. Canvas size comes
from the Visual Viewport API with resize listeners on both visualViewport
and window; the canvas CSS size is pinned in `draw()`; phone detection uses
`window.screen` physical size (min dimension < 700) with the aspect fallback.

## QA

Rendered with the house node-canvas renderer:
- `qa-desktop.png` (1280×800) — paper grid, red band with numerals, crooked
  filled tiles through month 4 plus 21 tiles of month 5, empty slots below.
- `qa-mobile.png` (390×844) — same read at phone size (1 px gaps, 18 px band).
- `thumb.png` (720×720) rendered twice and byte-compared with `cmp`:
  **byte-identical**; the duplicate was deleted.
