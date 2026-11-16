# №1831 Streetwalker 1980 (EF8, PP1078)

Source: TASKS.md prompt block ellen-fullman EF8 (PP1078), cron expansion study #239.
Gallery date: 2007 · 01 · 16 (formula date 2002-01-10 + 1832 days).
Suggested gallery note: "A figure walks a dark street in a skirt strung with guitar strings. Watch her walk, stop, turn, and walk again."

## What was built

A side-tracking night street scene. A dark silhouette figure walks in place
inside a sodium lamp pool while the street scrolls past her: building
silhouettes with lit windows, pavement joints, and a second distant lamp
drift by at parallax. She wears a brushed-metal bell skirt; seven guitar
strings run from the skirt hem down to her shoes as catenary curves whose
sag follows string tension, re-tensioning with each stride phase. Faint
trembling lines are thrown off the strings as she walks. A sodium rim light
traces the lamp side of the skirt, torso edge, and the stride leg.

## Walk cycle timing (28 s, closed-form function of a fixed phase time)

- 0-10 s: walk right, stride pace 1.15 s per full stride, background scrolls
  at 0.020 scene widths per second, eased in and out over 0.6 s at each end.
- 10-13 s: pause, legs settle to standing, background stops.
- 13-15 s: turn, the figure narrows edge-on (horizontal scale follows a
  cosine from +1 to -1) and faces left.
- 15-25 s: walk left, same pace and scroll in reverse.
- 25-28 s: pause, then the cycle repeats.

Frame one is fixed at t = 3.2 s, mid-stride, walking right, inside the lamp
pool, strings tensioned and visible. All motion is a closed-form function
of that phase time. Fixed-seed PRNG (seed 1831) for stars, buildings,
windows, and skirt brushing. No wall clock, no unseeded randomness.

## Sound

Visuals run on a closed-form sound model. Real WebAudio is created lazily
only after the visitor taps the "Sound: off" plate (bottom right), never on
autoplay. When sound is on, each footfall triggers a synthesized metallic
twang (triangle oscillator, pitch 90-250 Hz following string tension, fast
decay) plus a short band-passed noise scrape. Default is off and the piece
is fully legible silent. Reduced-motion visitors get a near-still frame
(the animation loop does not start).

## Deviations from the prompt

- The contact mic and the body-as-instrument idea are represented
  visually (strings, scrape lines) and in the optional sound model, not as
  a literal microphone object; a mic prop would have read as documentary
  clutter against the sculptural brief.
- The figure walks in place in a tracking shot (background scrolls) rather
  than crossing the frame, so she stays inside the lamp pool for the whole
  cycle and the first frame is always the composed shot.
- The turn is rendered as an edge-on narrowing (cosine scale) rather than a
  drawn three-quarter turn; it keeps the silhouette sculptural and the
  motion deterministic.
- No urban-grit overlays: no rain, grain, or signage, per the prompt's
  "keep it sculptural, not documentary".

## QA

Rendered from the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, and 720x720 thumb; all three inspected. Two defects found
and fixed: legs were first drawn from ground level instead of the hip, so
feet and strings ended at hip height; and lit windows were first placed
free in the sky, so they now sit on seeded building silhouettes. Thumb
rendered twice, md5s match (deterministic first frame). No em dashes in
visible copy. Flicker is by construction below 14 Hz; tremble runs at
6-7 Hz and low amplitude.
