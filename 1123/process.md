# №1123 — Reflective Kinematronic

Joachim Sauter study block JS4. Sauter's Mobility (Shanghai 2010) — a wall
of motorised mirrors throwing one light source around a room — abstracted
to its mechanism: the mirrors, the light, and nothing else. No prosthetic
hands, no drawn architecture; the room exists only where the spots land.

## Construction

- **Mirrors**: a 10 × 10 grid in the middle of a near-black frame
  (#05060A). Each mirror has a seeded base phase and its own slow speed
  (0.05–0.27 rad/s; about two in five counter-rotate). Its drawn width
  narrows with |cos θ| as it turns on its vertical axis, the face
  brightens from #181B21 toward #2E323C, and one edge glints #E8EDF5 as it
  comes square to the light.
- **Spots**: one per mirror. The source sits off-frame left; a mirror at
  angle θ reflects it to direction φ = φ₀ + 2θ, and the spot lands along
  that ray from the stage centre at the mirror's seeded radius, spread
  across the full viewport. Brightness falls with the angle between the
  reflected ray and the light's main axis. Each spot is three layered
  alpha circles of #FFF6DE drawn with 'lighter' compositing, so crossings
  add toward white — no gradients anywhere; the softness is just alpha.
  A landing that would fall on the grid itself is pushed out along its
  own ray to just beyond the mirrors.
- **The alignment**: a 45 s scheduler. At 37 s the mirrors ease together
  over ~2.5 s (smoothstep) toward one common angle; the hundred spots
  converge into a single blazing field of near-white in the room at the
  grid's upper left, hold for one second, then release over the next
  2.5 s and scatter. The build is slow enough never to read as a strobe.
- **Interaction**: dragging across the grid records stir impulses; each
  lends the mirrors near it a temporary extra angle — a closed-form bump
  (dt/τ)·exp(1−dt/τ), τ = 1.1 s — so a stirred mirror spins faster and
  settles back to its own speed within ~5 s. Double-tap reseeds speeds
  and phases. A single tap does nothing. Sound: none; a room of mirrors
  makes no noise worth inventing.

## Determinism

Everything unattended is a closed-form function of piece time *t*: mirror
angles are phase + speed·t plus the stir bumps, spot positions and the
alignment weight are pure functions of *t*. Frame one is a fixed phase at
*t* = 12 s — mid-scatter, grid centred and glinting, dozens of warm spots
across the dark with a few clusters already adding toward white — drawn
synchronously at load, with the rAF loop (typeof-guarded) anchored to
that phase. The thumb re-renders byte-identical. The shipped seed is the
build default; the alignment moment was additionally verified at build
time by rendering a phase-patched copy at *t* = 40 s (field fully merged,
beside the grid, not on it).
