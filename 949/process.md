# No.949 "Seventy Heartbeats, One Painting"

Study #116 refikanadol, PP110 "Collective Heartbeat" (Sanctuary / Inner Portrait line).

## Concept

A living data painting grown from heartbeats, and the heartbeats belong to a crowd,
never to one chest. Seventeen simulated visitors beat at their own seeded rates
(58-92 bpm) from fixed points in a dark field. Every beat sends a thin red ring
expanding outward; a field of about two thousand ember particles ignites wherever
ring fronts pass, and burns brightest where two fronts cross, so the painting is
literally painted by interference between hearts. The visitors are not metronomes:
each one's next interval is re-jittered after every beat, and their phases slowly
couple and uncouple on a two-minute cycle, so the collective drifts between
scattered and nearly one heart, and the whole field flares when they align. A thin
strip at the bottom counts the hearts and names the current state, and it never
claims more than that: the visitors are simulated, and the strip says so by only
ever counting them.

Tap in a steady rhythm four or more times and the piece adopts your tempo as a
new visitor, your heart joining the painting at the point you tapped. Drag and
hold, and the room holds its breath: time itself slows until you let go.

## Construction

- **Sim core.** Fixed-timestep simulation at 120 Hz (`STEP = 1/120`). At load the
  sim runs exactly 2400 steps (20 s) synchronously; frame one is the draw after
  that pre-roll. Nothing in the drawn state is derived from `Date.now()` or any
  wall clock; the rAF loop (typeof-guarded) only advances the same fixed steps.
- **Visitors.** Each visitor: `{x, y, bpm, phase, scale, rng, fade, addedSeq,
  yours}`. Centers are rejection-sampled (best of 40 candidates, widest minimum
  separation) inside the field margins, in an aspect-corrected S-space where
  S = min(viewport w, h). Phase advances at the visitor's own rate multiplied by
  a per-beat jitter scale (0.97-1.03, redrawn from the visitor's own mulberry32
  stream on each beat), plus a Kuramoto pull toward the circular mean phase.
- **Synchrony model.** Coupling strength K(t) = 1.6 + 1.3*sin(2*pi*t/120 - pi/2),
  oscillating on a ~120 s cycle. Phase coherence R is measured every step from
  the active crowd; a 1200-step ring buffer of R gives the 3 s trend. The strip
  phrase is computed from R and trend only: R >= 0.85 "in unison"; falling with
  R >= 0.35 "drifting apart"; R >= 0.60 "nearly one heart"; R >= 0.35 "drifting
  toward unison"; else "scattered". Phase bands, no scripting of the mood.
- **Rings.** On each phase wrap a ring is born at the visitor's center. Radius
  follows an ease-out over 2.5 s to RING_MAX = 0.19 S units (about 137 px at
  S = 720, the specced ~140 px at gallery size); alpha fades linearly. Rings are
  stored in their own list, so they outlive a fading visitor.
- **Particles and ignition.** 2,000 particles on desktop, 1,400 on phones
  (screen-based detection, aspect fallback), laid on a jittered grid. At draw
  time each particle's ignition I is the sum over active rings of
  (1 - |dist - ringRadius| / 0.035) weighted by ring age. Colour walks a
  precomputed 33-level table: rest maroon #2A0A12, ember #FF7A3D at mid ignition,
  ignited #FFD9A0, warm white #FFE8D6 at high ignition (overlapping fronts).
  Rings stroke in pulse red #FF2244; visitor centers are small dots whose pulse
  spikes just after their beat (yours is warm white, the crowd ember).
- **Events.** Pointer handlers record events stamped with the current sim step;
  the sim consumes them in step order at the head of `stepSim`. Canvas size comes
  from the Visual Viewport API with resize listeners on both visualViewport and
  window; `draw()` pins `canvas.style.width/height` in px every frame.
- **Tap classifier.** Quick, unmoved presses are collected as pending taps
  (a small catch-dot pulses at the latest tap point while a sequence is open):
  (a) **Your heart** — 4 or more taps whose last three intervals each fall in
  300-1200 ms and within 45% of their mean: bpm = 60000/mean interval (clamped
  40-180) joins as a new visitor at the last tap point, and the strip flashes
  "N hearts · welcome" for 4 s. Cap 24 hearts: beyond it, the oldest added
  (non-original) visitor fades out.
  (b) **Double-tap** — exactly 2 taps under 300 ms apart with no third tap
  within 700 ms: the old crowd fades one by one over ~6 s while a freshly seeded
  crowd fades in behind it. No cut.
  (c) Anything else ages out after 1300 ms: catch-dot only, no state change.
  A press that moves more than ~12 px is not a tap at all; it is the breath.
- **Drag = hold a breath.** While a moved press is held, the frame layer eases
  the global time scale toward 0.3 (approach rate 4/s); on release it eases back
  at 1.4/s, about 2 s to full speed. Pulses slow and the field dims because
  ignition decays with ring age while fewer new rings are born.
- **Sound.** Lazily created on the first pointerdown, typeof-guarded. Beats the
  sim reports are drained per frame; your heart always sounds, plus at most the
  six crowd beats nearest the field center, as quiet 56 Hz sine thumps. Master
  gain tracks coherence (0.40 + 0.35*R). Visual renders complete in silence.
- **Palette discipline.** Field #0A0508, rings #FF2244, ember #FF7A3D, ignited
  #FFD9A0, warm white #FFE8D6, rest maroon #2A0A12. Nothing else. No gradients,
  no shadowBlur, no ctx.filter, no offscreen canvas, no microphone. The only
  visible text is the bottom strip and the `<title>`.

## QA log

- Renderer: `node ~/workspace/tools/render-piece.js` (node-canvas). Renders at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png), all
  clean and silent; each finishes in well under a second.
- Determinism: thumb.png rendered twice and `cmp` byte-compared **identical**,
  before and after the fix round; the duplicate render was deleted.
- Frame one (after the 2400-step pre-roll): near-black maroon ember field;
  dozens of thin red rings at many radii from the 17 centers; warm cream-gold
  ignition speckling concentrated along ring fronts and where fronts cross;
  a few ember center dots caught mid-pulse. Strip: desktop "17 hearts ·
  drifting toward unison", thumb "17 hearts · drifting toward unison", mobile
  "17 hearts · scattered" — the phrase differs by viewport because aspect
  changes center placement and therefore the coherence trajectory; each is the
  true measured state of its own sim, as specced.
- Fix round: the first mobile render under-read — at S = 390 the particle dots
  scaled to sub-pixel size and the rest field nearly vanished, and visitor
  centers stopped short of the lower field. Dot size floor raised (size scale
  clamped to >= 0.85), base dot size 1.4 -> 1.7 px, rest alpha 0.5 -> 0.6, and
  the placement ranges widened (x 8-92%, y 10-90% of the field). Re-rendered at
  all three sizes; the mobile frame now carries rings and embers to the bottom
  edge with the strip legible and nothing clipped.
- Grep checks: no `Date.now`, no `getUserMedia`, no em dash characters, no
  external URLs in index.html.

## Deviations

- **Particle count on phones is 1,400** (from ~2,000), per the brief's allowance;
  recorded here and in the code. Ignition cost is particles x active rings and
  the smaller field keeps phone frame times safe.
- **Ring radius is specced in S units** (0.19 of the smaller viewport side), so
  it is ~140 px at the 720 gallery size and proportionally smaller on a phone
  screen, rather than a fixed 140 device pixels everywhere.
- **Synchrony phrase at frame one is emergent**, not staged: with K starting at
  the bottom of its cycle the crowd is still loose at 20 s, so frame one reads
  "scattered" or "drifting toward unison" depending on viewport. The brief
  allows the true state; forcing a phrase would falsify the meter.
