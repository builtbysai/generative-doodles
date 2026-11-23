# No.724 Detach

EXPANSION #88 okazzsp, prompt block 5 "Detach" (verified verbatim from TASKS.md).

## Concept

One amorphous black mass on white, built from thousands of tiny square
pixels. Edge pixels keep detaching, drifting outward, pausing, and flying
home; the mass slowly breathes between near-circle and oval. Around it,
loose colored squares float in the outer field, sometimes drawn toward the
mass, sometimes repelled, flipping mood on a slow timer. Now and then a
small white plus flashes inside the mass with a thin rounded black square
frame blinking around it. Every mark in the piece is an axis-aligned
square; there are no circles, no gradients, no shadow, no text.

## Construction

Single self-contained `index.html`, canvas 2D only, no external assets.
Palette is exactly the prompt's: background #FFFFFF, mass #0D0D0D, loose
particles #FF6B9D / #FFD93D / #4ECDC4 / #C44DFF, flash marks #0D0D0D and
white.

- **Pixel homes.** 3,000 pixels (1,500 on phones) sampled once from a
  seeded mulberry32 stream inside a disc of radius 0.225 x min(w, h), so
  the mass spans ~45% of the frame's smaller dimension. Homes are stored
  in design units and never change.
- **Oval oscillation.** The whole field is scaled by (1 + 0.15o,
  1 - 0.10o) where o = sin(2 pi t / 36 + phase): near-circle at loop
  t = 0, oval at the quarter loop, back again at 36 s.
- **Closed-form detach model.** Pixels with radial fraction > 0.80 are
  edge pixels. Each carries 1-2 seeded detach windows per 36 s loop
  (start in [2, 31] s, duration 3.0-4.8 s, so no window is ever active
  at t = 0 and frame one shows the mass whole). Inside a window the
  pixel's offset is direction x distance x envelope(p), where the seeded
  direction points outward with angular jitter, the distance is
  0.030-0.115 design units, and the envelope is out (easeOutCubic,
  p < 0.32), pause (p < 0.62), fly home (easeInOutCubic, p < 1), plus a
  small perpendicular sinusoidal wobble. Position is a pure function of
  loop time: nothing is integrated, so any frame can be drawn from t
  alone.
- **Mood flip.** Loose particles (90, homes rejection-sampled into the
  outer field, kept at least 0.315 design units from center) drift on
  slow seeded sinusoids and take a signed attraction offset toward the
  center: mood(t) = tanh(2.2 sin(2 pi t / 18)), which eases through zero
  and flips sign every ~9 s. Offset per particle is mood x its seeded
  amplitude (0.020-0.070).
- **Flash events.** Four seeded events per loop: a white plus (two
  rectangles) inside the mass at radial fraction 0.30-0.75, alpha peaking
  mid-event over 0.55 s, with a thin rounded square frame stroked around
  it in the mass tone. Frame position is seeded into the outer half of
  the mass so the black frame can cross the mass edge and read against
  the white ground.
- **Drag and tap.** Pointer samples are recorded with the piece clock.
  Each frame, points within 0.11 design units of a sample younger than
  1.6 s receive a radial push that decays with distance and age: pixels
  near the path are knocked loose, loose particles are pushed harder
  (x1.6). Because the push is evaluated from recorded samples at draw
  time, it is still a function, not state. A clean tap (under 300 ms,
  under 0.012 design units of travel) advances the epoch: the detach
  schedule, flash events, loose particle colors/positions, and the oval
  phase are regenerated from seed + epoch, and drag samples are cleared.
  Pixel homes stay fixed. Never a reload.
- **Direct-draw adaptation (renderer limit).** The prompt's technical
  note suggests rendering the pixel count to an offscreen buffer; the
  QA renderer has no `document.createElement` and no offscreen canvas,
  so the squares are drawn directly every frame instead, batched into a
  single path per tone (one for the mass, one per particle color). At
  3,000 rects this is cheap and visually identical.
- **Determinism.** Frame one is the synchronous draw at loop t = 0,
  pinned in `draw()`: the canvas style width/height are set in px from
  the Visual Viewport size on every frame, sizing listens to both
  visualViewport and window resize, phone detection uses
  `window.screen` (min dimension < 700) with the h > w x 1.15 aspect
  fallback, and the rAF loop is typeof-guarded and anchored to a
  `performance.now()` stamp taken after the first draw. No `Date.now()`
  anywhere.

## QA log

Rendered with `node ~/workspace/tools/render-piece.js`:

- `qa-desktop.png` (1280x900): black square-pixel disc centered at ~45%
  of the frame height, colored squares (pink, yellow, teal, violet)
  scattered through the outer field only. Mass reads as one amorphous
  blob with visible pixel grain; all marks are squares.
- `qa-mobile.png` (390x844): phone rule engaged via aspect fallback;
  1,500-pixel mass centered and whole, particles fill the tall outer
  field, nothing clipped.
- `thumb.png` (720x720): same composition at gallery size.
- Determinism: thumb rendered a second time to /tmp and compared with
  `cmp`: byte-identical. Second render deleted.
- Frame one state check: at t = 0 the oval factor is 0 (near-circle),
  no detach window is active (earliest start is 2 s), no flash is
  active (earliest start is 3 s), so all three read-backs show the
  whole mass and resting particles, as specced.

## Deviations

1. The prompt describes per-pixel agents with a state machine
   (attached / detached / returning) and loose particles with velocity.
   Both are realized as closed-form functions of loop time (seeded
   windows and envelopes; seeded drift plus a signed mood term), because
   the series' determinism gate forbids integrated state. Visible
   behavior (detach, pause, return, attract/repel flips) is unchanged.
2. Offscreen-buffer rendering replaced by direct batched drawing, per
   the renderer limit noted in Construction.
3. Flash positions are seeded at radial fraction 0.30-0.75 rather than
   anywhere inside the mass, so the black frame sometimes crosses the
   mass edge and stays visible; the prompt does not fix flash position.
