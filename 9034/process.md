# №9034 · Silk Study: process

Built 2026-10-01 from seed 339 in FUTURE_PIECES.md, after the
lammetje_nl study. His dark red luminous flow piece is the
reference; this one takes the dotted-trail idea and makes the dots
carry the information.

## The piece

Long-exposure dotted trails follow a smooth curl-noise flow field
(true curl of seeded value-noise fbm, divergence-free) on
near-black. Dots, not lines: each particle stamps a dot every other
step, so the flow reads as textile grain rather than wire. Dot
color maps to curvature: white-hot where the flow bends hardest,
deep red on the straights. Trails accumulate on an offscreen layer
with a very slow fade, so the composition breathes over about a
minute. Click for a new flow (reseeds the field, updates `?seed=`).

## Decisions

- Curvature from per-step heading change with exponential smoothing;
  the white-hot bends are the payoff and they only appear where the
  field genuinely curls.
- ~930 particles at desktop, spawn biased to edges so threads enter
  the frame. Dots sized slightly by curvature.
- No interaction beyond reseed: the piece is observational, a
  counterweight to 9033 Gather (which is all gesture).

## QA (2026-10-01)

- Zero console exceptions over 15s.
- Headless CDP screenshots came back stale twice (sparse dots);
  probed the live sim (particles advecting at 60fps, accumulation
  layer dense) and captured the true frame via canvas.toDataURL:
  the piece is correct and the threads are rich. Lesson
  re-learned: trust the compositor screenshot only after the
  AGENTS.md stale-frame check.
- Desktop 1280x800 inspected via live capture; caption unclipped,
  no overflow. Mobile uses the same relative layout.

Held for Hans's verdict before any public push (shipping hold).
