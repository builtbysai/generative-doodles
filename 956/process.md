# No.956 "Today's Ideology (After)" — process

Study #117 reas, PP117 "Broadcast Collage". The Today's Ideology mechanism —
a day's worth of images algorithmically distorted into a generative collage —
made self-contained: the piece prints its own paper.

## Concept

Twelve synthetic "photographs" (seeded geometric scenes: no real photos, no
faces, no text) fill a 3x4 newsprint grid. The distortion is mechanical, the
way a press distorts: horizontal slice bands slide left and right at their own
speeds, alternating bands split their color channels into registration red and
cyan fringes, and every ~45 s the twelve cells re-cut into a new arrangement
with a 1 s stutter. The paper is dated by its own fictional calendar: the
dateline starts at the first edition ("21 OCT 2026") and advances one day per
3 minutes of piece time; each new day regenerates all twelve scenes. The grid
remembers it was once a paper.

Interactions: tap = a re-cut now; vertical drag = smear (bands stretch and
tear toward the drag, then snap back); horizontal drag = scrub the channel
split wider or narrower; double-tap = tomorrow's paper (day advances, scenes
regenerate). Sound, only after a first gesture: a quiet ~1 Hz press thump,
filtered swishes on scheduled re-cuts, a paper-tear snap on tap re-cuts and
day changes.

## Construction

- **Scenes are data, not images.** Each scene is a ground tone plus a shape
  list (rects, circles, half-discs, triangles, bars), generated from a
  mulberry32 stream seeded per day (`956200 + day*1009`). A horizon band shape
  anchors each composition and later shapes are biased low and large below it,
  so the scenes read as abstracted photographs rather than decoration. Scenes
  are drawn as vector shapes every frame; there is no offscreen canvas
  anywhere in the piece.
- **Slice bands.** Six bands with seeded heights, slide amplitudes
  (10-30 px at unit scale), periods (47-110 s) and phases, all from one press
  stream (`956117`). Each frame, the full grid is drawn once per band inside a
  clip rect, translated by that band's sinusoidal offset (closed-form in piece
  time), with a wrap copy at ±W so the paper never shows a void at the edges.
- **Channel shift (approximation).** A true RGB plane split needs offscreen
  planes, which this house does not use. Instead, in alternating bands the
  scene shapes (not the ground, not the horizon band) are drawn twice extra
  under the main pass: once solid registration red offset by -split, once
  solid cyan offset by +split, each at alpha 0.35. The base split is 3 px at
  unit scale and is scrubbed by horizontal drags. The result is the mechanical
  misregistration fringe of the original mechanism, achieved with flat vector
  passes.
- **Re-cuts and the calendar.** A single transition timeline drives
  everything: scheduled re-cuts every 45 s, scheduled day boundaries every
  180 s (a day boundary is also a re-cut), recorded taps and double-taps. Each
  transition gets a serial number; the cell permutation on either side of it
  comes from `permFor(day, serial)`. During the 1 s stutter after a
  transition, cells jitter ±3 px in 12 Hz steps (hash-seeded) and swap in two
  sub-steps: even cells adopt the new arrangement at phase 0.33, odd cells at
  0.66. The dateline is computed with real calendar math (Date.UTC day
  arithmetic) from the fictional start date; it is never read from the
  visitor's clock.
- **Closed form.** All visual state is a pure function of piece time plus the
  recorded event log (tap list, drag state with exponential snap-back decay).
  Frame one is the synchronous draw at piece time t = 26 s: day 1, initial
  permutation, bands already displaced, no stutter active. No `Date.now()`
  anywhere; the live loop measures elapsed time from rAF timestamps.
- **House rules honored.** Visual Viewport sizing with resize listeners on
  both visualViewport and window; canvas CSS size pinned in draw(); phone
  detection via window.screen min dimension < 700 px with aspect fallback;
  page ground is the paper tone; no gradients, no shadowBlur, no ctx.filter,
  no microphone; AudioContext created lazily inside the first pointer
  gesture and typeof-guarded; rAF typeof-guarded so the QA renderer paints
  the single synchronous frame in silence.

## QA log

- Rendered with `render-piece.js` at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png) and 720x720 (thumb.png). All render cleanly in silence.
- Determinism gate: thumb.png rendered twice and `cmp` byte-compared:
  **identical**. The duplicate was deleted.
- Desktop read-back: newsprint grid of twelve abstract geometric scenes in
  muted print tones (halftone gray, ink, paper, rust, ochre, slate, moss,
  teal grounds); slice offsets clearly displace the bands (cells are cut
  mid-row and shifted, most visibly in the top and bottom rows); faint red
  and cyan fringing at shape edges inside the channel bands; dateline
  "21 OCT 2026" tiny at top-left on its paper plate.
- Thumb read-back: same composition at gallery size; band displacement and
  date legible; nothing clipped.
- Mobile read-back: the grid keeps 3x4, scenes scale to the narrow cells,
  band slices and dateline intact, nothing clipped.
- Greps confirm: no `Date.now`, no `document.createElement`, no gradients,
  no shadowBlur, no ctx.filter, no getUserMedia, no em dashes; `fillText`
  appears exactly once (the dateline).

## Deviations

1. **No offscreen scene rendering.** The prompt's technical sketch renders
   scenes offscreen and slices them with drawImage; the house QA renderer
   has no offscreen canvas, so scenes are shape-list data redrawn as vectors
   per band pass (with per-row culling). Visually and mechanically identical:
   clip + translate per band.
2. **Channel shift is a tinted-shape approximation** (see Construction): two
   flat alpha passes in the accent colors stand in for true RGB plane
   separation, which would require the forbidden offscreen planes.
3. **Dateline plate.** The dateline sits on a small paper-colored plate at
   0.92 alpha in the top-left corner so it stays legible where the grid
   fills the frame; the text, size and position are as specced.
4. **Drag axes act together.** A drag's vertical component smears while its
   horizontal component scrubs, rather than locking the drag to one axis;
   on release both decay exponentially (~0.3 s), which reads as the specced
   snap-back.
5. **Tap upgrade window.** A tap commits immediately (responsive re-cut); a
   second tap within 0.35 s retracts it and commits a double-tap instead, so
   "tomorrow's paper" never also fires a plain re-cut.
