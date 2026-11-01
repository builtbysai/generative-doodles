# No.976 "Played" — process

Study #120 daito-manabe, PP137 "Electric Stimulus to Face": the EMS inversion,
output devices used as inputs to flesh. Clinical and musical throughout: a
wireframe diagram of a face, played like an instrument. No photoreal face, no
horror framing.

## Concept

A large wireframe face fills the frame and is cropped by it. Nine muscle
regions (brow L/R, eye corner L/R, cheek L/R, mouth corner L/R, jaw) sit on
the contours as faint warm electrode pads, each with a thin wire-trace lead
running out to the frame edge. A seeded 24-second pulse-train etude performs
forever: a cyan spark travels a trace, and on arrival the muscle contracts,
the contour lines scrunch locally, an amber flash answers, and the region's
tone fires. Electricity first, flesh a beat later; that lag is the piece. A
mint myoelectric hand-sensor dot at bottom-right twitches on every launch:
the hand commands, the face obeys. A tick timeline along the bottom shows
upcoming pulses scrolling toward a playhead.

## Construction

- Face: a parametric front-view model (oval, brow arcs, almond eye outlines,
  nose bridge and base, mouth outline, inner jaw contour) sampled as point
  polylines, with a small seeded jitter per generation so each face is its
  own sitter. Stroked thin in #3A3F4B on #0A0B0E.
- Pulse/contraction model, fully closed-form in pattern time t:
  - Etude: a seeded event list (launch time, region) looping with period
    24 s. The generator performs a two-hand pattern: the hands mostly
    alternate, and each hand event is cross-wired to a muscle on the
    opposite side of the face (right hand to left eye, left hand to right
    eye, as in the original work); the jaw is midline and answers either
    hand. Occasional same-time chords pair both sides.
  - Spark: for an event launched at L, the spark sits on its region's
    wire-trace at arc-length fraction (t - L) / 0.35 for t in [L, L + 0.35],
    drawn as a bright cyan head with a short fading trail.
  - Contraction: arrival A = L + 0.35. Strength is an analytic spring
    envelope: linear attack over 60 ms, then exp decay with an 0.11 s time
    constant (gone by ~0.9 s). Every contour point within the region radius
    is pulled toward the region centre by 0.35 * strength * smoothstep
    falloff. The amber flash disc alpha follows the same envelope, so spark,
    scrunch, flash, and tone can never disagree: every spark contracts and
    sounds.
  - Sensor twitch: sum of exp(-(t - L) / 0.16) over recent launches,
    displacing the dot and fading a ring around it.
  - Timeline: for each event, its next arrival is placed at
    playhead + (arrival - t) / 8 s across the strip; ticks turn cyan inside
    the travel window.
- Frame one is the synchronous draw at pattern time exactly 9 s. Two anchor
  events are planted in every etude: a jaw launch at 8.60 (arrival 8.95, so
  the jaw is caught near peak contraction, chin scrunched, amber lit) and a
  browL launch at 8.825 (spark at half travel on its trace at t = 9, sensor
  still twitching from it). Random events are filtered out of the anchor
  window so the composition is guaranteed, not seed luck.
- Sound, lazy and gesture-gated (first pointerdown creates the
  AudioContext; everything typeof-guarded): a rising square tick sweeps
  480 to 1320 Hz during each spark's travel; on contraction the region's
  voice attacks: brows high sines 880 / 932 Hz, eye corners triangle plucks
  440 / 523 Hz, cheeks 349 / 415 Hz, mouth corners 392 / 330 Hz, jaw a
  98 Hz sine thump sliding to 55 Hz. Arrival and launch crossings are
  detected against the previous frame's pattern time, so audio follows the
  same closed-form schedule as the visuals. The piece is complete in
  silence: contractions are drawn whether or not sound exists.
- Interaction: tap a region to fire a spark down its trace now (travel,
  contraction, tone). Drag across the face lays a pulse-train: regions
  whose pads the path crosses fire in path order, 120 ms apart, then the
  etude resumes. Double-tap reseeds contour jitter and etude (a new face).
  Visitor events are stored in pattern time and sampled through the same
  spark/contraction functions as the etude.
- House mechanics: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas style width/height pinned
  in px on every draw; stage is the centred square of the smaller
  dimension, page ground is the piece ground; phone detection via
  window.screen min dimension under 700 px with a tall-aspect fallback.
  No gradients, shadowBlur, ctx.filter, or offscreen canvas anywhere; rAF
  is typeof-guarded and frame one never touches a wall clock.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png). Silent render, no errors.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. Duplicate deleted.
- Read-back, all three sizes: large thin wireframe face (oval cropped by
  the frame edges, brow arcs, almond eyes, nose, mouth, inner jaw arc);
  nine small rust electrode pads at the muscle points; thin traces running
  outward to the edges; one cyan spark with a fading trail mid-travel on
  the upper-left brow trace; the jaw region caught mid-contraction, chin
  contour pulled into an amber glow at bottom centre; mint hand-sensor dot
  bottom-right with its twitch ring; tick timeline along the bottom with a
  cyan playhead. Mobile: the face fits the smaller dimension, sensor and
  timeline inside the frame, nothing clipped beyond the intended face crop.
- Fix rounds during QA: the first pass drew the region washes and the
  contraction flash at 0.6 times the influence radius, which read as huge
  opaque balloons swallowing the contours (and a giant amber ball at the
  jaw). Wash discs now draw at 0.34 times the influence radius (still the
  specced #8A4A3A at 0.5 alpha: electrode pads, not balloons) and the flash
  at 0.30 times radius with alpha 0.38 times the envelope. Timeline ticks
  and playhead were also lengthened so the strip reads at thumbnail size.

## Deviations

- Nine regions, not eight: the prompt's own list (brow x2, eye corner x2,
  cheek x2, mouth corner x2, jaw) enumerates nine; all nine are built.
- Trace origins sit at the frame edges rather than literally converging on
  the hand-sensor dot: nine leads crossing the whole face to one corner
  would bury the contours. The sensor still twitches on every launch,
  keeping the hand-commands-face causality visible; the lower-right traces
  pass near it.
- The contraction spring is an analytic attack/exp-decay envelope rather
  than an integrated spring simulation, so frame one and every loop are
  exact functions of pattern time (determinism gate).
- Double-tap reseeding uses Math.random for the new seed. It is the only
  nondeterministic call in the file, it runs only on that gesture, and it
  cannot affect frame one.
