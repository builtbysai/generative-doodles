# №9046 · The Copy Relay, process notes

From the Sol LeWitt deep study (2026-10-02), seed 373: Wall Drawings
#123 and #797, where each drafter copies the previous drafter's line
without touching it, down the wall. Nobody may correct back toward the
original, so features wander and mistakes are faithfully inherited.

## Concept

One line is the score, drawn once in red. Thirty-nine drafters copy it
in turn, each tracing the last with a trembling hand. The drift is the
content: generation 40 is unrecognizable from generation 1, yet every
step looks like a faithful copy. The red is the idea, the graphite is
what happened. The wall label states the instruction the way a museum
label states a Wall Drawing's.

## Technique

- Generation 1: nine control points forming one opinionated zigzag.
- Each generation: per-point gaussian jitter plus a persistent drift
  vector that random-walks with memory (0.93 retention), so the bundle
  wanders instead of just fuzzing.
- The hand tires: stroke alpha falls 0.5 to 0.05 and width 2.1 to 0.9
  across the forty generations; later copies press lighter.
- Smooth quadratic-midpoint tracing, warm white wall with a whisper of
  grain, museum-style sans/serif wall label.
- Seeded mulberry32, ?seed= shareable, click for another relay.

## QA (2026-10-02, Bug direct)

- node --check on extracted JS: clean (caught and fixed a paren typo in
  the RNG before first render). No em dashes anywhere.
- CDP fail-closed exception probe (isolated Chrome :9333): zero
  exceptions, zero console errors.
- Rendered at 3 seeds (373001, 90210, 555), all inspected: distinct
  drift characters per seed, red score legible in each, no clipping.
- Mobile 390x844 inspected: wall centers, relay legible, label and
  caption hold.
- Default seed 373001: strongest mid-bundle wander, the clearest
  telling of the concept.
