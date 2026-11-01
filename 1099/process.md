# №1099 "Watson's Halo" — onformative study block OF4 (PP260)

onformative's IBM Watson identity as a piece. A sterile white corridor,
a dotted coral ring floating at its centre — the halo — and around it
the avatar's body: a living swarm of soft coral, teal and peach dots.
It is an identity, never a character: no face, no eyes, no speech. The
only word on the piece is its name, set quiet in coral mono under the
ring, the observed artifact's functional label.

## How it works

- **The swarm is the sanctioned fixed-timestep sim.** 180 dots, each a
  spring-damper agent integrated at a fixed dt of 1/60s. Every dot has
  a seeded home anchor inside or just around the ring (radius biased
  by a power curve, depth weight 0.6–1.35 setting its size), and its
  home wanders on slow seeded sine drift — sums of sines standing in
  for curl — so at rest the body is calm, scattered, and always
  slightly astir. A breath of seeded jitter keeps it unmachined.
- **Attention.** The pointer is the attention point. While it is down,
  an attention parameter ramps in over 0.9s; dots within 460 world
  units blend their spring target from home toward a seeded offset
  point near the pointer and stiffen (k 5.5 → 13), so the body gathers
  toward the visitor the way the real identity sensed attention. On
  release the parameter decays more slowly than it rose, and the
  swarm relaxes back into ambient drift.
- **The ring.** 72 individual coral dots on a circumference whose
  radius breathes closed-form in t (9s period, ±2.8%) — diameter 45%
  of frame. A pointer-down fires exactly one pulse: a dotted echo ring
  expands outward and fades over 1.15s while the halo dots swell; the
  swell also follows the attention parameter.
- **Soft dots without gradients.** Each dot is three layered
  flat-alpha circles (0.10 / 0.20 / 0.88) — halo, shoulder, core —
  coloured from the palette; white dots get a whisper of warm-grey
  halo so they still read against the white ground. Drawn far-to-near
  by depth weight.
- **The corridor.** Three nested frames converging on the centre plus
  radiants to the corners and edge midpoints, stroked in #EDEBE8 at
  low alpha — perspective that is barely there, as specced.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on
  both visualViewport and window; canvas CSS size pinned in draw();
  phone detection via window.screen physical size with aspect
  fallback; the white ground is the page ground everywhere and the
  square composition holds centred at 390 wide.
- Determinism: frame one is the sim state after a FIXED synchronous
  pre-roll of 720 steps (12 simulated seconds) from the seeded
  initial state; the rAF loop, typeof-guarded, continues stepping the
  same fixed dt from there. No Date, no Math.random — all randomness
  is mulberry32 seeded with the piece number.
- No gradients, no offscreen canvas, no ctx.filter, no shadowBlur, no
  createElement, no audio (none specced), no microphone, no external
  assets. Visible text is limited to the specced "Watson" label and
  the title.

## QA

- Rendered with the house renderer at 1280x800 (qa-desktop.png),
  390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Frame one: white ground with the faintest corridor frames and
  radiants; the dotted coral ring at centre; ~180 soft dots in coral,
  teal and peach drifting inside and around it (white dots reading as
  pale ghosts); the small coral "Watson" label under the ring. Mobile
  keeps the whole square composition centred and unclipped.
- Interaction: drag gathers the swarm toward the pointer with spring
  physics and fires one ring pulse on pointer-down; release relaxes
  the body back to its homes. Watch-only default is the breathing
  ring and the wandering drift.
- thumb.png rendered twice and compared with cmp: byte-identical.
  Duplicate deleted.
