# №9003 · Lichtenberg — process

Date: 2026-09-04. Diffusion-limited aggregation, rendered as silver
filaments on a deep indigo night. The name comes from Lichtenberg
figures, the lightning-tree patterns an electric discharge burns into
an insulator. This piece grows the same shape from the opposite
direction: thousands of sparks drifting in out of the dark, each one
freezing the instant it touches the growing crystal.

## Algorithm (own implementation)

One seed at the center. 48 walkers spawn on a ring just outside the
cluster's current reach and random-walk; the first walker to come
within sticking distance of the cluster freezes where it stands and
becomes part of it. A coarse 200x200 collision grid makes the neighbor
checks cheap, and walkers far from the cluster take long safe jumps
(they can never cross the cluster's bounding disc in one leap), so the
whole 24,000-spark growth runs in under a second when it needs to.

Two judgment calls shaped the look. First, a weak inward drift: about
one step in eight leans toward the center instead of wandering. Pure
DLA spends most of its walkers meandering in the empty moat between
the launch ring and the branches, which made the early builds take
minutes; the drift keeps the lightning character while making growth
fast enough to watch. Second, each new spark paints a short filament
from its parent rather than a dot, in three passes: a wide faint halo,
a mid glow, and a bright core. Trunk segments (shallow branch depth)
draw bolder than the fine outer twigs, so the main discharge channels
read like lightning leaders and the tips stay delicate. Color runs
from cool silver at the trunk to near-white at the tips.

Growth is paced at about 320 sparks per second, so the full crystal
accretes over roughly 75 seconds. A second canvas layered on top shows
the live walkers as faint drifting sparks; the finished crystal lives
on the canvas beneath. Clicking the piece picks a fresh random seed
and grows a new crystal; the seed is kept in the URL.

## What the iteration taught

The first build grew only 10,000 sparks and stopped small in the
frame, so I raised the budget and watched the growth stall instead:
walkers were burning thousands of steps wandering the moat, and the
collision grid was scanning whole dense cells on every step. Two
structural fixes, not parameter fiddling, unlocked it: early exit on
the first neighbor inside sticking distance (the exact parent does not
matter visually), and the inward drift. Together they took the full
growth from several minutes to under a second, a roughly 300x speedup.

Comparing drift strengths on the same seed settled the aesthetic: a
strong drift grows a dense, even, almost coral-like disc; a weak one
keeps the long pioneer branches and open lace of classic DLA. The weak
setting won. I compared four finished seeds and kept 20260904, the
piece's date, for the default: an even rosette with varied branch
lengths and no blobby clumps.

`?t=` freezes a fraction of the 24,000-spark budget; `?t=1` grows the
full crystal synchronously and matches the animated end state.
`prefers-reduced-motion` renders the finished crystal once, with no
animation.

Default seed 20260904. Click for a new crystal; the seed is kept in
the URL.
