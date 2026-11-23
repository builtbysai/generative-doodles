# №1636 "Contrapuntos" (MSR5, PP883, study #215 marcelo-soria-rodriguez)

## Build
- Built 2026-11-08 from the live prompt (PP883 Counterpoint Voices) via
  BATCH-1636-1639-SPEC.md. Self-contained index.html, canvas 2D only, no
  external assets.
- Four ink voices (indigo #2C3E6B, oxblood #6E1F24, forest #2F5233,
  gold #A67C1A) on warm paper #F4EDDC. Each voice is a closed-form
  oscillator in phase space: its own period (11.3, 14.7, 18.9, 23.1 s),
  phase, orbit size and drift period, all coupled weakly through one
  shared 48 s harmonic envelope that swells the orbits toward the four
  edges and draws them back toward the centre. The forest voice runs
  counter to the other three, which guarantees crossings without any
  mirroring of paths.
- Trails: 12 s of each voice's past positions, drawn directly from the
  closed-form positions (no frame integration), fading from alpha 0.9
  at the head to near zero at the tail.
- Coincidence knots: for each pair of voices, the latest local minimum
  of their separation below 32 px within the last 4 s measure is drawn
  as a mixed-ink disc with a ring in the second voice's ink and four
  diagonal ticks, fading over the measure. Knot detection is a pure
  function of piece time, so knots are deterministic and freeze exactly
  while paused. A scan of t = 0 to 120 s found a live knot in 73.2% of
  frames.
- Frame one is at fixed phase t = 12 s: voices mid-phrase and spread
  across the field (minimum pairwise head distance 180 px at 1280x900),
  with two live knots (alphas 0.70 and 0.17). The phase was chosen by
  scanning the closed-form orbits, not by hand.
- Title "Contrapuntos" and date "2006 · 07 · 05" drawn on canvas in a
  paper plate; hint plate reads "Tap to pause." (or "Paused. Tap to
  resume." while paused).
- House rules: Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px; phone detection via window.screen
  (min dimension under 700 px) with aspect fallback; wide field-like
  composition, full-bleed on phones, centred wide band on desktop with
  the page ground the piece's own paper; one synchronous frame at load;
  requestAnimationFrame guarded by a typeof check; reduced-motion
  renders the fixed frame only; no em dashes in visible copy; all
  fading alphas rounded to 4 decimals; dots drawn as single arcs with
  a moveTo first.

## Interaction
- Watch-first, autonomous. The only interaction is pause: tap or click
  toggles a frozen state. Pausing stops the closed-form clock, so the
  frozen frame is pixel-identical while paused and resume continues the
  same phrase. Never click-to-restart, never a reload.

## Deviations from the prompt
- Voice agents are closed-form oscillators (fixed frequencies and step
  sizes per voice, weak coupling through the shared envelope as a pure
  function of piece time), never frame-integrated agents, per the batch
  spec adaptation flags. Trails are JS arrays of closed-form positions
  drawn directly.
- Knot glyphs are derived from a scan of the past measure's closed-form
  trajectories rather than spawned by a runtime event queue; the
  visible result is identical (a knot blooms where two voices met and
  fades over one measure), and it keeps frame one and the paused state
  exactly reproducible.
- Drift off the shared law is a small fixed authored imperfection per
  voice (envelope phase offsets of 0, +0.05, -0.04, +0.03), never noise.

## QA
- Rendered the actual script with node ~/workspace/tools/render-piece.js
  at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three visually
  inspected. First render caught the voices bunched on one side with
  short stub trails; fixed by retuning the voice phases so the heads
  spread across the field at frame one and lengthening trails from 3.7 s
  to 12 s. Second render: four voices spread, trails weaving across the
  field, knots visible, title/date/hint legible at all three sizes.
- Determinism: thumb.png rendered twice, md5 identical both times
  (20102fbed33e9f219e85559cccdebc1a).
- Pause: probe check confirmed the toggle flips paused state, the clock
  freezes at t = 12, two paused draws are byte-identical, and the
  resumed frame at t = 12 matches the thumb md5.
- Not pushed; pieces.json untouched, per the build brief.

## Gallery
- Date: 2006 · 07 · 05. Note draft: "Four ink voices weave a fugue on
  warm paper, blooming into knots where they meet. Tap to pause."
