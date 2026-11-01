# №938 — Incroci: Five Dates Each

Study #115 giorgialupi, PP99 "Crossings" (after Lupi & Shorday's Incroci, Fondazione Merz 2022).

## Concept

Ninety-nine strangers each contribute five significant dates. Every date is one
hand-painted black polyline strung across three rails: the day rail (left,
vertical, 1 at top to 31 at bottom), the month rail (center, horizontal,
January left to December right), and the year rail (right, vertical, earliest
at top to the present at bottom). The lines are all black; the only color is a
faint gold glow where two or more dates land on the same rail anchor, because
the overlaps are the beauty. A hand-style line at the bottom reads
"99 strangers, 5 dates each". The piece paints itself over a minute, holds,
lifts, and repaints. Tap a stranger to read their five dates; drag to smudge
the wet paint; double-tap for ninety-nine new strangers.

## Construction

- **Contributors.** Seeded synthesis (mulberry32; generation seed
  938001 + generation × 7919). Each contributor gets a birth date (year
  1940–2010) plus four later dates placed at seeded fractions of their
  remaining span to 2026 (about 5%, 30%, 55%, 85%), years clamped
  non-decreasing. The four post-birth dates take names in age order from
  per-stage pools: first word / the beginning; left home / the move;
  the wedding / a child; the storm / the loss.
- **Polylines.** Each date is precomputed as 65 points: two quadratic spans
  (day anchor → month anchor → year anchor) with seeded control-point
  offsets, plus a two-sine perpendicular wobble whose envelope is zero at all
  three anchors so every line truly lands on the rails. Line weight is per
  contributor, 1.5–3.5 px. No straight segments anywhere.
- **Paint model.** An 81 s loop: 60 s painting, 15 s hold, 6 s fade. Date j of
  contributor i starts at (i·5 + j)/495 × 58 s and strokes in over 1.4 s by
  revealing a prefix of its point list. Frame one is the synchronous draw at
  the fixed offset t = 33 s, about 55% through the painting; nothing in the
  frame derives from the wall clock.
- **Crossing glow.** Each frame, anchors (day value, month value, year value)
  are counted over fully painted dates only. An anchor shared by two or more
  dates gets a layered gold dot, alpha and radius growing with the count,
  shimmering gently during the hold. Because counts only include painted
  dates, glows genuinely form as the painting proceeds.
- **Interaction, closed-form.** Tap selects the nearest contributor by point
  distance: its five lines draw heavier at full alpha, the rest dim, and a
  caption shows the five dates ("born 14.03.1988 · first word 1990 · …"),
  wrapping to two lines on narrow screens. Drag records smear samples
  (position, delta, piece time); the smudge offset at any point is a decaying
  Gaussian field over those samples, so the paint relaxes back on its own.
  Double-tap increments the generation, reseeds the strangers, clears smears
  and selection, and restarts the painting from zero.
- **Sound.** Lazy, typeof-guarded AudioContext created on the first
  pointerdown only: a looped brown-noise buffer through a bandpass filter
  whose gain follows whether any line is mid-stroke (the brush), and a soft
  sine chime the first time an anchor reaches six sharers in a cycle. The
  piece renders complete in silence; the QA renderer has no AudioContext and
  takes the guard path.
- **House rules.** Canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas CSS size pinned in px
  inside draw() every frame; phone detection via window.screen minimum
  dimension under 700 px with the h > w·1.15 aspect test as fallback only;
  page ground is the canvas tone #F4F0E4 so the piece is full-bleed on phones;
  rails keep their proportional positions at every size. No gradients, no
  shadowBlur, no ctx.filter, no offscreen canvas (glow is layered alpha
  dots), rAF typeof-guarded. Strict palette: paper #F4F0E4, ink #1A1A1A,
  glow #D9A441, rails #8A8578, caption ink #23211C.

## QA log

- Rendered with the house renderer at 1280×900 (qa-desktop.png), 390×844
  (qa-mobile.png), and 720×720 (thumb.png): clean, silent, no errors.
- Determinism gate: thumb.png rendered twice and byte-compared with cmp —
  identical; the duplicate was deleted.
- Read-back, desktop and thumb: pale canvas; gray day rail at left carrying a
  soft gold glow column (every day value is shared by many of the 495 dates,
  so the column is near-continuous, busiest anchors brightest); a dense fan of
  thin black wobbled polylines webbing from the day rail through the central
  month band to the year rail; gold glow dots along the year rail and in the
  month band; bottom line present. Mobile: the web compresses into a tall
  hourglass, all three rails and the bottom line legible, nothing clipped.
- Fix round: the first pass drew the rails under the polylines and the month
  rail was swallowed by the central mass. The rails are now drawn last, over
  the paint, at 0.85 alpha, so all three anchors stay legible; re-rendered
  and determinism re-verified after the change.
- Deviation, recorded: frame one at 55% painting is dense — roughly 270 of
  495 lines down — because 99 strangers × 5 dates is a lot of ink even at
  half strength. This matches the brief's frame-one description (about half
  the contributors' lines drawn, glow at the busiest anchors, bottom line in
  place), so it ships as specced rather than thinning the crowd.
- Deviation, recorded: the year rail scale is fixed at 1938–2028 so anchor
  positions are stable across generations; birth years land inside it and
  the present sits just above the bottom tick.
