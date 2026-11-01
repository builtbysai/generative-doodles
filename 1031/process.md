# No.1031 — Time Is the Instrument

Study #126 tomoaki-yanagisawa, PP192 "Interval Clock" — the blink-interval sequencer as an instrument.

## Concept

Twelve clocks, each ticking at its own interval, conduct a score made of light. Above, a row of twelve warm nodes, each ringed by a thin dial that fills with its period and empties at the tick. Below, twelve horizontal tracks, one per clock: each tick flares its track, and the flare decays, so the score is the accumulated density of recent ticks. The intervals mix simple ratios with irrationals, so the clocks phase, drift, and near-miss; when three or more land inside a 90 ms window, the moment is a downbeat — those tracks flare together in a deeper gold and a shimmer column rises at the left of the score. The downbeats are earned by the arithmetic, never scheduled as decoration: the rational family (ratios 1, 3/2, 2, 3 against the base) shares a true common tick every 14.4 s, their least common multiple, and the irrational clocks wander in and out of the window on their own. Time, not space, is the compositional axis.

## Construction

- **Clock model.** Fixed-step simulation at 120 Hz. Each clock is a phase oscillator: phase advances by STEP / (period × bend) per step and ticks on wrap. All state is seeded (mulberry32, seed 1031192) or closed-form; nothing is derived from the wall clock. Frame one is the synchronous draw after exactly 2400 fixed steps (20 s of pre-roll).
- **The twelve periods** (base 2.4 s × ratio):

  | # | ratio | period |
  |---|-------|--------|
  | 1 | 1 | 2.400 s |
  | 2 | 4/3 | 3.200 s |
  | 3 | 3/2 | 3.600 s |
  | 4 | √2 | 3.394 s |
  | 5 | 2 | 4.800 s |
  | 6 | φ | 3.883 s |
  | 7 | 5/3 | 4.000 s |
  | 8 | π/2 | 3.770 s |
  | 9 | √3 | 4.157 s |
  | 10 | 3 | 7.200 s |
  | 11 | 2√2 | 6.788 s |
  | 12 | 5/2 | 6.000 s |

- **Earned downbeats.** Clocks 1, 3, 5, 10 (ratios 1, 3/2, 2, 3) are phase-set to share a common tick at t = 19.7 s (and so at 5.3 s, 34.1 s, … every 14.4 s). Clock 4 (√2) is set to tick at 19.76 s, a straggler inside the same window. The other seven phases are seeded random. Detection is honest: at any tick, the sim counts clocks whose last tick step falls within 11 steps (91.7 ms); 3+ makes a downbeat, boosts those tracks' energy, and fires the shimmer envelope.
- **Tracks.** Each track's brightness is an envelope, not a playhead: an idle line at 0.15 alpha, an energy layer (each tick adds 1, downbeat membership adds 0.7 more, decay τ ≈ 0.45 s), and a white flash layer (τ ≈ 0.30 s). Tracks whose clock joined a downbeat within the last 1.1 s render their energy in the downbeat gold #FFD97A instead of the idle warm.
- **Interaction.** Drag across the clock row bends every swept clock's period (multiplier clamped 0.55–1.8 from drag distance) with a fast attack, and on release all bends spring back to their seeded periods with a ~2 s time constant (back within ~6 s). Tap a clock to nudge its phase 15% earlier. Double-tap reseeds the whole clockwork (new LCG seed, phases rebuilt, a fresh family alignment a few seconds ahead).
- **Sound.** Lazily created, typeof-guarded WebAudio, only ever inside a visitor gesture. Each tick is a soft sine pitched by its clock's (bent) period — 523.25 × (2.4 / period)^0.8 Hz, so long periods sound low: a twelve-voice gamelan. Downbeats add the members' tones plus a sub-octave root. Dragging sustains one glissando voice that follows the most recently swept clock's bent pitch.
- **House rules.** Canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas style width/height pinned in px in draw(); phone detection via window.screen (min dimension < 700) with aspect fallback; the twelve clocks stay in one row on phones (nodes and rings shrink), tracks stay full width. Glow is layered flat alpha circles — no gradients, no shadowBlur, no ctx.filter, no offscreen canvas. No visible text anywhere except the document title.

## QA log

- Rendered with `render-piece.js` at 1280×900 (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png). All render cleanly in silence — the QA environment has no AudioContext and the piece never touches one outside a gesture.
- Determinism: thumb.png rendered twice and byte-compared with `cmp` — identical. The duplicate was deleted.
- Frame one (t = 20 s, after the 2400-step pre-roll): the twelve rings sit at varied fill stages; tracks 1, 3, 4, 5 and 10 burn bright — the rational family and the √2 straggler ticked together at 19.7–19.76 s, 0.3 s before frame one, so the downbeat cluster is still glowing and the gold shimmer column stands at the left of the score at ~0.7 strength. Slow clocks (5/2, 3, 2√2) sit near idle. Mobile keeps all twelve nodes in one row and all tracks full width; nothing is clipped at any size.

## Deviations

- **Track flare shape.** The brief offered a traveling pulse or a right-edge tick mark, then named the simpler option itself: a brightness envelope over recent ticks. The envelope is what shipped — it is also the truer player-piano reading, since overlapping ticks visibly accumulate as light density.
- **One glissando voice.** During a drag, a single sustained tone follows the most recently swept clock's bent pitch rather than one glissando per bent clock; twelve simultaneous glissandi turned to mud in testing the design on paper, and one voice keeps the tempo-bend audible as an instrument.
- **Tap nudge wrap.** A phase nudge that crosses the wrap point wraps silently (the sim only registers ticks inside step()), so a nudge across the boundary moves the next tick earlier by slightly less than the full 15%. The visual and rhythmic effect is otherwise exact.
