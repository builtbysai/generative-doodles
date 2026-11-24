# №857 Process Commentary

CK3 / PP1257, study #262 colton-kempf. Formula date 2004 · 05 · 17.

The driver, as a felt phenomenon: a frame builds itself one
narrated pass at a time and the narration never gets mixed out.
First only a hum, then the dusk gradient, then the contrail, then
the figure, each arriving with its own spoken line, and every line
stays on screen at the bottom while the next one lands.

## Build

- First frame: FIRST_T = 12 s into a 90 s cycle. Gradient shimmer,
  contrail drift and the hum pulse are closed-form functions of t,
  so frame one is deterministic. A tap starts a pass transition
  whose progress is a closed-form function of t and the tap time,
  so a fixed tap sequence is reproducible too.
- Four passes, TAP advances one pass and wraps 3 back to 0. Each
  pass transition is a 2.5 s slow fade or draw, never a cut.
  Pass 0: empty warm-dark frame with one faint hum line and the
  caption "The hum starts here." Pass 1: dusk gradient, rose to
  deep blue with a slow shimmer, plus its line. Pass 2: a single
  white contrail that draws itself along a slow arc, plus its
  line. Pass 3: one dark silhouette standing on the horizon,
  abstract with no face, plus its line.
- The caption track never leaves: every spoken line stays stacked
  at the bottom, the current line brightest at 0.95 alpha, earlier
  lines dimmer at 0.55 but legible.
- The contrail breathes along its path over the cycle, drawn
  length between 55% and 100% of the arc, and drifts a little
  with the shimmer. The figure sways almost imperceptibly and
  casts a long soft shadow on the ground.
- Audio is visual only in this gallery: there is no real WebAudio
  here, the caption lines ARE the voice, per the Franke audio
  rule. No clean finished reveal: the frame starts empty and the
  making-of stays in the final mix.
- Caption plate top left (№857 · Process Commentary, 2004 · 05 · 17)
  and hint bottom center (Tap to add the next pass.), drawn
  in-canvas in the template's place.
- Canvas 2D only. No click-to-reload. No em dashes in visible copy.

## QA

- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile,
  720x720 thumb; all three inspected. Desktop and mobile both
  show the empty pass-0 frame with the faint hum line, caption
  plate and hint in place.
- Time probes (node harness, /tmp/probe857.js): shimmer 0.500 at
  t=12, 0.976 at t=30, 0.500 at t=57; contrail length 0.899 at
  t=20, 0.592 at t=42. Pixel diff within pass 0 between t=12 and
  t=30: 0.44%; within pass 3 between t=24 and t=48: 0.36%.
- Tap probes: taps walk passes 0-1-2-3-0, each tap adding exactly
  one element and one caption line (line counts 1, 2, 3, 4, then
  back to 1 on wrap). Mid-transition progress reads 0.50 at
  half the 2.5 s transition and 0.35 at 1 s in. Pixel diffs:
  pass 0 to 1 is 63.98% (the gradient arrives), pass 1 to 2 is
  1.18% (one thin contrail), pass 2 to 3 is 1.11% (one small
  figure), pass 3 back to wrapped pass 0 is 63.97%.
- Determinism: two draws at t=12 differ in 0 pixels.
- Fix rounds: two. First, the hum pulse was too faint for the
  time probe to register (0.00% pixel diff between frames in
  pass 0), so the pulse amplitude was raised and the hum line
  given a slow vertical drift over the cycle. Second, the pulse
  amplitude was raised again so the t=12 to t=57 pair also
  registers (0.09%) instead of reading identical.

## Known warts

- The thumb at FIRST_T is pass 0, an almost empty dark frame with
  one faint line. That is the honest first frame: the piece starts
  empty and only builds when the visitor taps. The gallery thumb
  will read as nearly blank until tapped.
- In passes 1 to 3 the hum line is washed out by the gradient and
  effectively invisible; it only reads in the empty pass-0 frame.
