# No.980 "Before You Move" (PP141 Zero Latency, daito-manabe)

## Concept

The myoelectric insight: a muscle's electrical signal fires *before* the
movement it causes, so a system listening to the signal can act before the
body moves. Twelve pairs of lines braid across a dark field. In each pair
the thin cyan SIGNAL line leads and the thicker warm-white MOVEMENT line
traces the identical path exactly one lead-time (120 ms) later. The gap is
the subject: cause visibly arriving before effect, held constant forever.
Amber muscle-nodes ride the signal lines; when a signal spike passes a
node, the node flares (an expanding mint ring) and, with sound on, sings.
Light and sound are triggered by the signal, never by the movement. The
only text is the tiny readout in the corner: "lead: 120ms". The system is
proud of its head start.

## Construction

- **Closed-form river.** Each pair's signal is an analytic function of an
  s-space position `s = wrap(x - v*t)` over a period L = 1600 px: a wander
  of two sine harmonics (integer cycle counts per L, so the shape is
  perfectly periodic) plus a seeded spike train of 5-8 gaussians. Flow
  speeds are seeded per pair (46-90 px/s, rightward), phases differ per
  pair, so the twelve pairs braid without synchronizing.
- **The lead/gap.** The movement line is the *same* function sampled at
  `t - lead`, with a 3-tap smoothing ((a + 2b + c)/4). Because the pattern
  flows, a time delay reads as a constant spatial offset of `v * lead`
  px (roughly 6-11 px at 120 ms): on every spike the white echo is
  measurably behind the cyan original. The lead is never compensated,
  never synced; it is stored as generation state and shown in the readout.
- **Nodes and flares.** Each pair carries 2-3 nodes at seeded screen
  positions, drawn riding the signal line. A spike's alignment time with
  a node is solved exactly: `t_a = (x_node - s_spike)/v + k*L/v`; the
  flare envelope is `exp(-(t - t_a)/0.38)` and the drawn ring expands
  over the first second. Spikes below the node's seeded threshold do not
  fire it. The audio voice (sine, 220-880 Hz by spike height) triggers on
  the envelope's rising edge, i.e. on the signal's schedule.
- **Interaction.** Tap = flex: a visitor spike (height 1.0) is injected
  into the nearest pair's signal at the tap point and flows with the
  river; the movement line traces it one lead later and nodes flare as
  it passes. Drag = draw the signal: pointer stamps pull the nearest
  pair's signal toward the drawn path; the overlay is a function of
  absolute time, so the movement line (sampling it at `t - lead`)
  literally chases the drawing 120 ms behind. Double-tap = rewire:
  reseeds all pairs and randomizes the lead to an integer 60-200 ms,
  shown in the readout.
- **Sound.** Lazy, typeof-guarded WebAudio behind the first gesture.
  Node flares are the voices; a looped-noise lowpass wash follows the
  movement lines' total slope energy at very low gain. Signals themselves
  are silent, per the mechanism.
- **House rules.** Canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas style width/height
  pinned in px inside draw(); phone detection via window.screen physical
  size (min dimension < 700 px) with aspect fallback, page ground = field
  tone, band amplitude compressed on phones; no gradients, shadowBlur,
  ctx.filter, offscreen canvas, microphone, or wall-clock state in any
  drawn value. Frame one is the synchronous draw at T0 = 7 s.

## QA log

- Rendered with the house node-canvas renderer at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png), all in
  silence. thumb.png rendered twice and `cmp` byte-compared identical;
  duplicate deleted, and re-verified after the fix round below.
- Desktop/thumb: twelve braided pairs fill the field; every spike shape
  appears twice, cyan leading and white following a few px behind;
  amber nodes sit on the lines; several mint flare rings are caught
  mid-expansion on their nodes; readout "lead: 120ms" bottom-right.
- Mobile: all twelve pairs compress into the tall frame, nodes and
  readout legible, nothing clipped.
- Fix round: the first flare rings kept expanding to ~50 px at low alpha
  and read as stray ghost bubbles detached from their nodes. Ring growth
  is now capped (radius 5 + 20*age, drawn only for age < 1 s, alpha
  `exp(-age/0.30)`), so a flare reads as a ring hugging its node.
  Re-rendered at all sizes; determinism re-verified.
- Hygiene grep clean: no gradients, shadowBlur, filters, offscreen
  canvas, Date/Math.random in drawn state, external references, or em
  dashes. Only visible text is the readout and the <title>.

## Deviations

- Spike polarity: seeded spikes are mostly downward deflections
  (positive canvas y). The prompt does not fix a polarity; downward
  spikes make the traces read as physiological EMG/ECG-like signals,
  which suits the myoelectric mechanism.
- The prompt's readout is drawn in 11 px monospace in the specced gray;
  it updates only on a rewire, exactly as specced.
- Drag overlay stamps expire over ~3 s rather than persisting until
  release-plus-decay as a single path object; the effect (draw, chase,
  relax back to the seeded river) is the same and keeps every drawn
  value a closed-form function of time and the recorded events.
