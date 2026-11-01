# №1420 "Palm Reader" (thomas-mader TM5, PP643) — process notes

## What it is

An open palm, seen from above, filling the frame, and a hand above it that
stamps letters onto it, twice each: once on an invisible inkpad, once on the
palm — S-T-A-T-E, L-A-W, C-O-N-S-T-I-T-U-T-I-O-N — each stamp landing with a
small ink bloom, each word's stamps forming a column down the palm. Authority
as a double stamp; the palm never wipes clean.

## Frame one (t = 0, boot flag)

Paper ground #e8e2d4. The palm centered, large, fingers spread, thumb on the
left, palm creases crossing the body. Three stamp columns run from the top of
the palm to the wrist: S-T-A-T-E, L-A-W, C-O-N-S-T-I-T-U-T-I-O-N — these are
the pre-seeded previous cycle's stamps, faded, so the palm already carries
history at load. The inkpad is a small dark rectangle at the top-right frame
edge, with the stamping hand above it mid-beat (letter S is on the pad beat).
Red bloom dots sit only on STATE's S and E (see below).

## Mechanics, all closed-form over piece time and recorded events

- **Two-beat cycle:** 20 letters, 1.2 s each, 24 s per full cycle, seamless
  loop. Beat 0: the hand dips at the inkpad. Beat 1: it travels to the palm
  target and the stamp lands at the beat boundary (land time = letter start
  + 0.6 s). Travel uses smoothstep interpolation; the press is a 4 px dip.
- **Columns:** each word gets one column (STATE left, LAW center,
  CONSTITUTION right); each word's letters are spaced evenly from the top of
  the palm to the wrist, so the 12-letter word packs tighter than the 3-letter
  one, exactly as the prompt's columns demand.
- **Pressure varies by seed:** per-word pressure from mulberry32
  (STATE 0.970, LAW 0.927, CONSTITUTION 0.801) drives stamp darkness, size,
  and smear. Red bloom #b01e24 appears sparingly: only the hardest word's
  every-fourth letter (STATE's S and E).
- **Accumulation, never a wipe:** stamps are a stored-history buffer. A
  stamp's alpha holds full strength for 60 s, then decays to a 0.35 floor —
  never to zero. The buffer renders the pre-seeded cycle plus the last six
  live cycles (max ~140 stamps); older cycles drop only once fully overlaid
  by newer ones.
- **Drag re-aims:** pointerdown within 80 px of the stamping hand grabs it;
  while dragged the hand follows the pointer, and any stamp landing during
  the drag lands at the dragged position (clamped to the palm rect), with
  smear scaled by its distance from its column target. On release the hand
  offset decays exponentially (tau 1 s) back to the schedule, and later
  stamps land on-column again. No click-to-reload anywhere.

## Adaptations

- The prompt's "two beats per letter" becomes a closed-form beat schedule;
  there is no simulation and no frame-integrated state — every stamp
  position is a function of (cycle, letter, land time, recorded drags).
- Letters ship as the prompt's own stamp sequences only (individual letter
  sprites, never sentences, never a document) — the explicit text exception
  for this prompt. No other visible text exists besides `<title>`.
- Fully silent: no AudioContext, no getUserMedia, no offscreen canvas, no
  gradients, no shadowBlur, no Path2D, no createElement.
- Node-canvas quirks honored: fading alphas rounded to 4 decimals before
  stringifying; dots as filled rects or own-beginPath arcs; every arc on
  its own beginPath.
- House rules: canvas size from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas pinned in draw();
  phone detection via window.screen physical size (min dimension < 700 px)
  with aspect fallback; centered composition keeps its shape on phones with
  the page ground taking the paper color; frame one = draw(0) via boot flag,
  clock starts only with the rAF loop (plain function declaration behind a
  typeof guard); all randomness from mulberry32 (seed 1420000 + index·7919),
  never Math.random.

## Verification

- Rendered at 1280×900, 390×844, and 720×720; all three inspected. Mobile
  keeps the same centered composition with no clipping.
- Thumb byte-identical across repeated renders, including a final re-verify
  after the last fix.
- Forced-time probe harness (vm-isolated instance, stubbed rAF driving the
  piece's own loop, pointer events to its own listeners):
  - Two fresh instances byte-identical at t = 0 (24 fillText calls: 20
    pre-seeded stamps + 4 smear duplicates).
  - Schedule: S stamps 2 at t = 0.5, 3 at t = 1.0 — the first live stamp
    lands at its 0.6 s beat.
  - Drag: grabbing the hand at the inkpad and dragging to (700, 500) puts
    the E stamp exactly at (700, 500) at t = 6 (plus its smear duplicate at
    706.9) — the mis-aimed stamp lands off-column.
  - Accumulation: 50 fillText calls at t = 30 vs 24 at t = 0 — the palm
    thickens and never wipes.
  - Token scan clean (the single "Math.random" hit is a comment stating it
    is never used).
- Fix rounds (2): (1) red blooms first appeared on all STATE and LAW stamps
  (8 dots) — now restricted to the hardest word's every-fourth letter, so
  only S and E carry one; (2) stamps landing during an active drag first
  used the scheduled position because only completed drags were consulted —
  the in-progress grab is now consulted too, so a stamp landing mid-drag
  lands where the hand actually is. All renders re-done after each fix.
