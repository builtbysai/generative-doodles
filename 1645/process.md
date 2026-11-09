# Rain Blooms — №1645 (KT6, PP892)

A war that never ends. Stand at one border of a living field for a
minute and watch territory change hands three times; nothing
settles, nothing dissolves, the instability itself is the bloom.
Five colonies war across a dark field, and the field is the piece:
no center, no edge narrative, just a window onto a larger world
that keeps fighting whether anyone watches or not.

## Mechanism

A five-species cellular automaton on a coarse grid (160 columns on
desktop, 90 on phones, rows set by aspect), drawn full-bleed. The
species are magenta, cyan, lime, amber, and violet on a near-black
ground (#0d0d14). Each cell carries a species and a vitality from
0 to 1. Color comes from species plus vitality: low-vitality cells
sink toward the dark ground, high-vitality cells glow toward
white. Cells that change species flash white at the contact border
and fade over four generations.

Each species has its own neighborhood, a fixed offset table:
magenta sees the Moore ring, cyan leaps on knight moves, lime
reaches along a radius-2 cross with diagonals, amber works the
diagonals at radius 1 and 2, violet uses four orthogonal neighbors
plus two seeded diagonals and two seeded knight leaps. The
neighborhoods shape how a colony grows into open ground: an empty
cell is colonized by the best-represented neighbor, with counts
normalized by neighborhood size and a Moore-adjacent cell of the
colonizer required, so a far-reaching neighborhood cannot jump a
border to colonize behind it.

Combat runs on shared Moore counts, so every species fights on
the same footing, and follows a strict five-cycle: magenta hunts
violet and assimilates cyan; cyan hunts magenta and assimilates
lime; lime hunts cyan and assimilates amber; amber hunts lime and
assimilates violet; violet hunts amber and assimilates magenta.
Each species has exactly one predator and one prey, so the cycle
has no top and no winner. Attack and assimilation are stochastic
single-neighbor predation: one predator neighbor can flip a cell,
with a probability that falls as the victim's vitality rises, so
vitality genuinely decides outcomes and a small foothold can punch
back. Assimilation converts and shares vitality, averaging victim
and converter. Rivals that merely ignore each other still grind:
any enemy contact wears vitality down slowly, so no border can
freeze. The simulation runs at five generations per second.

Two things keep the ground dark and the war alive. First, a
seeded fertility mask (coarse value noise, about 54% of the grid):
infertile cells stay dark forever, so the dark ground is terrain
the war plays across rather than ground the colonies failed to
reach. Second, rain blooms: every 40 generations a 3x3 foothold
of one random species bursts through wherever it lands, so no
species can go extinct for long and the war always has a fresh
front.

Frame one is generation 120, pre-run from a fixed seed
(mulberry32, no Math.random anywhere). The deterministic first
frame is the spec's acceptance state: a developed, contested
field, not a bare seed.

Measured with the QA probe at desktop size: shares at frame one
are empty 49.2%, magenta 5.2%, cyan 26.3%, lime 10.5%, amber
1.3%, violet 7.5%. Territory changed hands in every window
measured: 2,011 cells in the first 60 s, 1,547 in the next 60 s,
3,623 across 120 to 300 s, out of 18,080 cells. Shares rotate
rather than settle: cyan falls from 26.3% to 4.0% by 300 s while
lime rises from 10.5% to 35.1%. Nothing settles; the war turns.

## Interaction

Watch only. There is no control: no click to reseed, no drag,
no tap. The piece is the war itself.

## Deviations from the spec

- PP892 names shape absorption as the arc's earned gesture, but
  absorption is KT7's subject; KT6 ships watch-only so the war
  itself is the piece, as the spec note directs.
- The spec's technical paragraph sketches per-species
  attack/assimilate/ignore rules and non-standard neighborhoods
  without fixing thresholds. The shipped rules were tuned by
  measurement, and two early designs were rejected on probe
  evidence: a local-majority flip rule (three or more converters
  around a victim) let the biggest colony steamroll, because a
  small species can never muster three converters around an enemy
  cell, and the field froze with zero cells changing hands over
  60 s; and a version without the fertility mask paved the whole
  field (0.1% empty at generation 120), leaving no dark ground.
  The shipped design answers both: stochastic single-neighbor
  predation on shared Moore combat counts, and the fertility
  mask. All five species survive every measured window, and the
  field never freezes.
- Frame one is generation 120 as specified. The gallery note is
  "Five colonies war across a dark field, territory changing
  hands at every border. Watch only."
