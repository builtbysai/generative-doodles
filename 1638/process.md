# №1638 — The Ineffable Moment (MSR7, PP885, study #215 marcelo-soria-rodriguez)

## What it is
A tribute to his daughters' drawings, rebuilt as a living system: on a coral
ground, a crayon hand draws rainbow arcs, hearts, starbursts and streaks in
deliberately naive marks, one composition per minute. Each minute the ground
clears and the hand draws a new discovery: a bigger rainbow, a field of
hearts, a single huge starburst. The watchable behavior is the drawing of a
child's drawing by a machine that has decided to be a child.

## How it works
- A seeded composition planner (`mulberry32(1638000 + minute * 104729)`)
  picks one dominant motif per minute: rainbow (kind 0), hearts field
  (kind 1), or huge starburst (kind 2), plus 10-14 scattered small marks
  (hearts, starbursts, white streaks, small arcs). Minute 0 is forced to the
  rainbow so the first frame is the rainbow partway drawn.
- Every mark has a staggered draw start and duration inside its minute, so
  marks appear in sequence; bands sweep their arc, bursts grow ray by ray,
  hearts and streaks fade/scale in. In the last 3 seconds of a minute all
  marks fade out and the next minute starts on a cleared ground.
- Crayon hand: each band is a 48-segment wobbly polyline stroked three
  times at slight offsets and alphas for uneven pressure, with a thin black
  outline; hearts use wobbled bezier control points with black outlines;
  bursts use jittered ray lengths.
- Interaction: tap/click toggles a hold (pause). While held the frame is
  drawn from the frozen clock, so it is pixel-identical; the hint changes to
  "Held · tap to resume". Resuming continues the clock from where it stopped
  (the resume re-bases the animation start time). Never click-to-reload.
- Determinism: no wall clock, no unseeded randomness. The first frame is
  rendered as if 21 seconds into minute 0 (fixed phase), so the rainbow is
  partway drawn and the thumb is reproducible byte-for-byte. Verified:
  two independent 720x720 renders of thumb.png have identical md5.

## Deviations from the prompt
None material. The composition centers one large arc motif per the brief
(the rainbow in minute 0; later minutes center a big heart or a huge
starburst, as the prompt's own "bigger rainbow / field of hearts / single
huge starburst" rotation describes). The portrait rect is full-bleed on
phones and centered with a thin darker-coral frame on desktop.

## Fixes during QA
- First renders showed a long violet wedge spiking out of the rainbow's left
  foot, plus jagged spikes on the inner bands. Root cause: the default miter
  line join on wobbly polylines whose points sit ~0.6 px apart — miter
  length explodes at the zigzag joins. Fixed by setting
  `lineJoin = 'round'` on all wobbly polyline strokes (bands, arcs,
  streaks, band outline). Also fixed an off-by-one: wobble arrays are now
  sized to the inclusive loop bound (49/25/7 entries) so no `undefined`
  wobble value can reach a point.
- Fixed a pause/resume bug found by inspection: resuming reset the
  animation clock to zero. Resume now re-bases the start time so the clock
  continues from the held moment.

## QA
Rendered the actual script with node-canvas at 1280x900 desktop, 390x844
mobile, and 720x720 thumb; visually inspected all three. Desktop: portrait
rect centered on coral ground, title/date/hint legible. Mobile: full-bleed
portrait, all marks and text legible. Thumb: byte-identical across two
independent re-renders (md5 ce3965e1c10a0a3b5dcf91c442a05f56).

## Gallery
- Date: 2006 · 07 · 07
- Note: "A crayon hand draws a new childlike discovery every minute on coral ground. Tap to hold a composition."
