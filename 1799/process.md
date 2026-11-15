# No.1799 "Wavefields for Sleepers" (LE8, PP1046)

## Source
Prompt block lawrence-english, LE8 (PP1046), EXPANSION #235, TASKS.md
prompt blocks (lawrence-english PP1039-PP1046, TASKS lines 23237-23276),
as transcribed in BATCH-1796-1799-SPEC.md. Completes EXPANSION #235
lawrence-english at No.1799. Gallery date 2006 · 12 · 15 (formula date
2002-01-10 + 1800 days).

## Driver
Patience as structure. The piece is a horizon that breathes over minutes:
two coupled ultra-low-frequency oscillators drive horizon lift (360 s
period, one full breath per cycle) and swell phase (120 s period, fixed
phase offset), plus a rare-event scheduler that fires at most one crow
and one bell-tone ripple per long cycle. Nothing arrives on demand and
nothing the viewer does shortens anything. The mechanism is the two
oscillators plus the scheduler, not a compressed demo.

## What was built
- Horizon exactly at the golden section (0.618034 of the field height),
  breathing with a 360 s lift oscillator; at frame one the lift is
  sin(PI/3) = 0.866 of its small amplitude, a slight lift.
- Vast pale sky (dawn grey fading to pale gold at the horizon) above,
  deep slate water below with three slow swell lines driven by the
  120 s swell oscillator.
- One thin bright ripple ring, always off-center (origin at 0.68 of
  field width), expanding with exponential decay over 45 s, plus a
  fainter trailing second ring.
- One crow per cycle: a single small black mark crossing high in the
  sky (0.16 of field height) over 30 s, with one slow wing beat.
- Duration stated plainly at the start in canvas-drawn text:
  "One cycle lasts six minutes." It fades on a closed-form schedule
  between t = 120 s and t = 180 s. No progress bar, no countdown, no
  reward for waiting.
- Watch-only. No pointer or keyboard handlers are registered at all,
  so input does nothing by design.
- True time: after the fixed first frame, phase is computed from a
  wall-clock start captured at load, so dropped frames never lose time.
- Reduced motion: prefers-reduced-motion renders a still frame.
- House rules: single HTML file, inline JS/CSS, canvas 2D only, no
  document.createElement; Visual Viewport sizing with resize listeners
  on visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px; phone detection via window.screen
  (min dimension under 700px) with aspect fallback; field-like
  composition, full-bleed on phones, square on desktop; one
  synchronous frame at load; all requestAnimationFrame calls guarded
  with a typeof check. Title/date/hint plates drawn on canvas.

## Fixed phase (frame one, t = 60 s)
Deterministic, reproducible every load; no wall clock is read for
frame one. Horizon sits at the golden section with a slight lift,
swell is mid-phase (zero crossing, rising), and the ripple from the
fixed schedule (t0 = 51.0 s) is 9.0 s old, partway across the water
off-center. The crow is absent at frame one: it is rare by design.
Next crow starts at 160.4 s (30 s crossing); next ripple at 406.2 s.
Event schedule (seeded, jitter +/-20 s, at most one of each per cycle):
ripples at -329.7, 51.0, 406.2, 776.1, 1143.9, 1500.4 s;
crows at -228.6, 160.4, 508.8, 871.5, 1229.7, 1593.9 s.

## Deviations from the prompt
- Frame one ripple: the batch spec's frame-one note says "no crow and
  no ripple yet," but the build task for this piece explicitly requires
  one thin ripple ring partway across the water at frame one. The
  ripple is present at frame one (age 9.0 s) per the build task; the
  crow remains absent, as the spec says. No other deviation.

## QA
Rendered the actual script with node ~/workspace/tools/render-piece.js:
- 1280x900 desktop: PASS. Horizon at the golden section of the square
  field, enormous pale negative space above, dark slate water below
  with three swell lines, one thin off-center ripple ring, duration
  line "One cycle lasts six minutes." legible, title/date and "Watch
  only." plates legible, nothing clipped.
- 390x844 mobile: PASS. Full-bleed field, horizon at 0.618 of the
  viewport height, ripple ring visible off-center, duration line and
  plates legible, nothing clipped.
- 720x720 thumb.png: PASS. Same fixed-phase frame as desktop, horizon
  at the golden section, ripple visible, plates legible. Thumb was
  rendered last from the final index.html.
- No post-gate edits were made after the final renders.
