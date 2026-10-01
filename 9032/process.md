# №9032 · Tiny Machines: process

Commissioned 2026-10-01 by Hans: study wustep's "contraptions"
(a generator for grids of tiny animated machines, TypeScript + p5,
seeded and shareable, MIT licensed), then fork/clone the piece.

Study notes (from the repo and the live Explorations page):
- Every machine is a `setup(rng, color)` + `draw(p, state, {size, u})`
  pair, where `u` is the normalized loop phase. Each machine loops
  seamlessly, on its own period and phase, so the field never repeats.
- Machines are size-disciplined: amplitudes are chosen so no part ever
  crosses its cell boundary (the pendulum source even carries a comment
  about a bob that once leaked a tenth of a cell into the neighbor).
- Rotations are limited to multiples of 90 degrees; gears rotate by
  whole tooth pitches per loop so the cycle closes.
- One accent color per machine, thin ink linework on paper, generous
  whitespace between cells, no visible grid.

Clone approach: same spirit, all new code. Single self-contained
`index.html`, plain canvas 2D, no libraries. 18 machine archetypes
drawn from scratch: gear pair, pendulum, Newton's cradle, seesaw,
pulley, pinwheel, belt drive, orbit, metronome, spring, conveyor,
abacus, drip, hammer, elevator, fan, radar sweep, bell.

Decisions:
- Paper `#f5f2ea`, ink `#2b2a26`, one line weight; five quiet accents,
  each machine gets at most one (about a fifth stay uncolored).
- No cell borders, like the reference's Classic mode.
- Click/tap re-seeds with a quick fade; `?seed=` makes any frame
  shareable. Neighbor cells never repeat a machine type.
- Subtle hover halo on the machine under the cursor.

QA: desktop + mobile renders inspected; animation verified alive
(canvas pixel diff 3.9% across 1.2s on the active tab; note: headless
CDP screenshots go stale and background tabs throttle rAF, so motion
was verified via `canvas.toDataURL` on the activated tab); reseed
interaction verified; zero console exceptions.

Held for Hans's verdict before any public push (shipping hold).
