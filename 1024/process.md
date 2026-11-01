# No.1024 "What the Blink Leaves"

Study #126 tomoaki-yanagisawa, PP185 "Afterimage Field" (particles, 2011).

## Concept

Dozens of small warm-white balls drift slowly through a black void on invisible
tracks. The balls are not the composition; their blink intervals are. Each ball
blinks on its own seeded clock, and every blink leaves a fading ghost behind it,
so the shapes in the dark are drawn by afterimages: a tight cluster of balls on
short intervals leaves a dense bright knot, one slow ball leaves a faint
ghost-arc, and now and then the intervals phase-align and the whole field
flares once before falling back to its private rhythms. Warm white only,
candlelight, never neon. The rails are never drawn; the mechanism stays
invisible.

## Construction

- **Balls.** 40 balls on desktop, 28 on phones (see Deviations). Each ball's
  position is a closed-form Lissajous (per-ball seeded center, amplitudes,
  frequencies, phases), so tracks are smooth, slow, and never rendered. Three
  seeded groups: a knot of 11 balls clustered off-center (around x 0.64-0.70,
  y 0.34-0.40) with tiny amplitudes and short periods (0.7-1.5 s); two wide,
  slow balls (period 3.6-4.2 s, large amplitudes) whose sparse ghosts trace
  faint arcs; the rest scattered with periods 1.2-4.4 s.
- **Blink clocks.** Each ball has a seeded period (0.7-5 s across the field)
  and phase. Brightness is a sharp pulse occupying 15% of the period
  (sin^1.6 envelope), over a faint base glow so a ball between blinks is an
  ember, not a hole.
- **Ghosts.** The afterimage is an event store, not a feedback buffer: in the
  fixed-step simulation, when a ball's blink phase crosses the pulse peak, a
  ghost is recorded at the ball's current position. Ghosts render as layered
  warm dots (#FFE9B8) with alpha decaying over 2.5 s. The store is capped at
  600 events. Because ghosts are data, the QA renderer's single synchronous
  frame shows the full afterimage field exactly as a live frame would.
- **Simulation.** Fixed step 120 Hz. Frame one is the synchronous draw after a
  1,800-step pre-roll (15 s of piece time), which seeds the ghost store with
  the knot and the arcs before anything is painted. No wall clock touches the
  first frame; the live rAF loop (typeof-guarded) advances the same fixed
  steps from an accumulator, capped per frame.
- **Flares.** Global alignments are seeded moments (first at 33-42 s, then
  every 35-50 s): over 1.4 s all balls rise to full brightness, a warm white
  wash lifts the field, and at the peak every ball records a ghost, so the
  flare also blooms in the afterimage. A tap forces a local alignment: balls
  near the tap pulse together and leave ghosts at the peak.
- **Interaction.** Drag disturbs the blink clocks under the finger: affected
  balls accumulate a clock offset (deterministic jitter), which then decays
  exponentially (time constant 1.6 s, settled in about 5 s) back to the seeded
  interval. Tap is a local flare. Double-tap reseeds the whole field and
  re-runs the pre-roll. No click-to-reload.
- **Audio.** All sound is lazy and gesture-gated: the AudioContext is created
  on the first pointerdown, typeof-guarded, and the piece is fully silent in
  QA. A soft tick sounds at each blink peak, pitched by the ball's period
  (short interval, higher tick), throttled to at most four ticks per 90 ms so
  only the strongest moments speak. Flares and tap-alignments play a warm
  three-note chord swell. Dragging raises a band-passed granular shimmer bed.
- **House rules.** Canvas size comes from the Visual Viewport API with resize
  listeners on both visualViewport and window; the canvas CSS size is pinned
  in px inside draw() every frame. Phone detection uses window.screen's
  physical minimum dimension (< 700 px), with the aspect ratio (h > w*1.15)
  as fallback only. Glows are layered flat-alpha circles: no gradients, no
  shadowBlur, no ctx.filter, no offscreen canvas. Palette is strict: void
  #08080A, balls #FFF6E0, ghosts #FFE9B8, flare #FFFFFF. The only text in the
  piece is its <title>.

## QA log

- Rendered with the house renderer (node-canvas) at 1280x900, 390x844, and
  720x720; all three paint cleanly in silence.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical (frame one depends only on the seed and the fixed pre-roll).
- Read-back: warm black field, small warm-white glowing balls, fading amber
  ghosts forming a dense knot off-center (upper right), short ghost trails
  behind individual balls and one ball caught at full blink near the bottom,
  generous dark margins, no rails or lines anywhere. Phone render: 28 balls,
  marks scaled up 1.3x, knot legible, nothing clipped.
- One retune round: ghost marks were at first hard to tell from ball halos;
  ghost alpha and radius were raised, ghost color left more amber than the
  balls, and the two arc balls' periods set to 3.6-4.2 s so a previous blink's
  ghost still lives when the next lands. Re-rendered and re-verified.

## Deviations

- **Ball count on phones:** 28 balls instead of 40 (knot of 8 instead of 11),
  so the phone frame keeps its dark margins and the knot does not crowd the
  narrow field. Recorded per the brief's allowance.
- **Afterimage implementation:** the prompt's feedback-fade buffer is realized
  as a recorded ghost-event store, because the QA renderer paints a single
  synchronous frame and has no previous frame to decay. The visual result is
  the same mechanism (each blink deposits a fading mark); the marks are data.
- **Flare trigger:** global alignments are seeded schedule moments rather than
  a live statistical detection of clock coincidence; the brief allows either,
  and the schedule keeps frame timing deterministic per seed.
