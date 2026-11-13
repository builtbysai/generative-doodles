# Twenty-Five Woodworms, No. 1748

PP995 / ZM5, study #229 studio-zimoun. Watch-only piece.

Gallery note: "Twenty-five small agents work a dark wood form; the listening ring breathes with their summed activity. Watch only."

## Driver

Twenty-five working dots slowly stippling a wood form, a quiet ring listening.
The felt phenomenon is the work itself: small dark agents moving over a
gnarled bark surface, leaving a stipple of pits behind them, while a single
amber ring set apart in the margin brightens and dims with how much work is
happening. Nothing else is said; the ring is the only sonic reference.

## Build log

Built 2026-11-13 from the TASKS.md prompt verbatim (BATCH-1744-1748-SPEC.md),
with №1743 as the house template.

## Decisions

- Wood form: a gnarled polar blob, radius a seeded sum of 3, 7 and 11 lobe
  sines, centered off-center at (0.38, 0.55) with radius 0.30 of the short
  side. Radial gradient from light bark #5A4128 through #3B2A1A to dark
  #241708, plus 46 seeded bark streaks and 4 knot rings, all clipped to the
  form so no mark ever pokes past the edge.
- Agents: exactly 25 small dark dots (#1A120A), no eyes, no legs, no faces,
  no motors anywhere. Each has a home point inset inside the wood mask and
  a wander amplitude small enough to stay inside it; probe confirms 25/25
  agents inside the mask at t = 0, 60, 120 and 300.
- Foraging: each agent has an authored pause schedule (period 7 to 13 s,
  pause window 18 to 43 percent of the cycle). Position is a closed-form
  function of piece time: the wander phase advances on effective time, the
  integral of the move indicator, so an agent sits still during its pauses
  with no frame-integrated steering.
- Pits: a fixed-capacity record list (cap 900), re-rendered from the list
  each frame. Agent i leaves a pit at its position at every 2 s sample
  time; the list for time t is the prefix of the full list, so pits
  accumulate, persist and never fade.
- Listening ring: muted amber #B98A3E at (0.84, 0.30) in the margin, with a
  soft glow. Brightness is the smoothed activity of the agents, the mean
  moving fraction over a 4 s window, mapped to alpha 0.28 to 0.90. It
  breathes slowly by construction, far under the 14 Hz ceiling.
- Palette, hand-picked from the prompt's named colors (studies/studio-zimoun.md
  does not exist locally): pale ground #EFE8D8, dark bark brown #3B2A1A,
  agents #1A120A, listening ring muted amber #B98A3E.
- Determinism: mulberry32 seed 1748 for every streak, knot and agent
  parameter; frame one fixed at t = 60.0 s with 775 pits already
  accumulated so the stipple reads. No Date.now, Math.random or
  performance.now anywhere in frame one. Frame one re-rendered
  byte-identical in the probe.
- Plates: title, formula date 2006 · 10 · 25 and hint "Watch only." on
  pale plates with dark ink and an amber rule, top-left and bottom-left.
  The form and the ring never sit under a plate on desktop or mobile.
  The centered composition keeps its shape on phones and the page ground
  takes the piece's own pale color.

## Probe results (node probe, 1280x900)

- Agent count: 25 (asserted).
- Agents inside the wood mask: 25/25 at t = 0, 60, 120, 300.
- Pit count grows monotonically: t = 0: 25, t = 10: 150, t = 30: 400,
  t = 60: 775, t = 120: 900 (cap reached).
- Ring brightness tracks smoothed activity: at t = 10, smoothed activity
  0.7689, ring alpha 0.7567; at t = 60, smoothed activity 0.6844, ring
  alpha 0.7044; at t = 120, smoothed activity 0.6800, ring alpha 0.7016.
  Over t = 0 to 600 the ring alpha ranges 0.6382 to 0.9000.
- Frame one drawn twice is byte-identical.

## QA

- Desktop 1280x900: gnarled dark form off-center, stipple pits and agent
  dots legible on it, amber ring with glow in the right margin, plates
  clear, nothing overlapping.
- Mobile 390x844: form keeps its shape, ring clear of the title plate,
  hint plate clear of the form.
- Thumb 720x720: same composition; independent re-render byte-identical
  (md5 6077a3f98040b08066123d42c89681aa).

## Deviations

- Pits are stored as a fixed-capacity JS record list re-rendered each
  frame, not accumulated on an offscreen canvas, per the batch spec
  adaptation flag: the list for time t is the exact prefix for that time,
  so accumulation and persistence are exact and frame one stays
  byte-comparable. The visible behavior is identical to the prompt's
  offscreen-canvas approach.
- Agent paths are closed-form foraging functions of piece time with
  authored pause windows, not frame-integrated wander-and-pause steering,
  per the same adaptation flag. The visible behavior is identical: slow
  foraging paths with small pauses, confined to the wood mask.
