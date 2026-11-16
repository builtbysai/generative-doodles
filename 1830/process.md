# №1830 Rosin Craft

## Spec
TASKS.md prompt block ellen-fullman EF7 (PP1077), cron expansion study #239.
Title: Rosin Craft. Gallery date: 2007 · 01 · 15 (formula date 2002-01-10 + 1831 days).

## What the piece shows
A workbench in warm lamp light. Center: a glass jar of amber rosin liquid, a hand
stirring it with a wooden stick, swirl arcs turning in the liquid. Left: a mortar
of crushed rosin powder with its pestle, and a second hand resting on the bench.
Right: a bottle of isopropyl alcohol and, below it, a pale soundboard with its
bridge pressed down by three bent go-bars in a small deck frame. Scattered rosin
crumbs and wood grain across the planks. No performance, only preparation.

## Process cycle (fixed 300 s, closed form of phase time)
- Crush, 0-40 s: pestle bobs over the mortar, powder puffs rise, right hand works
  the pestle.
- Pour, 40-70 s: bottle tilts toward the jar, a stream of drops arcs in, liquid
  level rises, right hand holds the bottle.
- Stir, 70-130 s: stick turns in the jar, three swirl arcs rotate, surface ripple.
  Frame one is t = 100 s, mid-stir.
- Clamp, 130-220 s: go-bars flex gently over the bridge, glue bead glistens,
  right hand rests by the soundboard.
- Wait, 220-300 s: everything still except the slow lamp breathing. The glue-up
  holds its long still beat.

## Interaction
Watch-only. No input except a small sound plate, bottom right, reading
"Sound: off" (tap to turn on). Sound is a closed-form model: filtered brown
noise whose gain follows the current phase activity. Real WebAudio is created
lazily inside the first tap only, never autoplay. The piece is fully legible
silent.

## House rules
- Single self-contained index.html, one inline script, one synchronous frame at
  load, every requestAnimationFrame call guarded by a typeof check.
- Visual Viewport sizing, resize listened on both visualViewport and window,
  canvas pinned in draw() via canvas.style.width/height in px.
- Phone detection via window.screen (min dimension under 700 px) with aspect
  fallback. Full-frame bench scene: full-bleed on phones, square on desktop.
- Determinism: fixed-seed mulberry32 PRNG (seed 1830), no Date.now, no wall
  clock, no unseeded Math.random in drawing. Frame one is fixed phase t = 100 s.
  Verified: 720x720 thumb rendered twice, md5 identical; 1280x900 desktop
  rendered twice, md5 identical.
- Flicker at or below 14 Hz by construction (slowest motion is the 0.5 Hz
  clamp flex; lamp breathes at about 0.11 rad/s). prefers-reduced-motion
  freezes the phase at frame one.
- Title/date plate drawn on canvas, top left; hint plate "Watch only." bottom
  left. No em dashes in visible copy. No voiceover or instruction text.

## Deviations from the prompt
- None substantive. The prompt asks for "quiet workshop foley (glass, wood,
  liquid) under near-silence": implemented as a single filtered-noise bed whose
  gain follows phase activity, default off, rather than sampled foley, since
  the piece is self-contained with no audio assets.
- The prompt names the glue-up holding "for a long still beat": the wait phase
  runs 80 s of the 300 s cycle, the longest single phase.
- Hands are deliberately stylized (palm, four fingers, thumb, cuffed sleeve)
  rather than realistic, to stay legible at thumbnail size and to keep the
  first frame deterministic.
