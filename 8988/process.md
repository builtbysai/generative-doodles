# №8988 · Orbit Portraits

Replaced the earlier typographic piece at this number with something completely
different: color, motion-by-math, no letters anywhere.

## The idea

Strange attractors (Hopalong, De Jong, Svensson) density-rendered in the style
of flame fractals. Hundreds of thousands of orbit iterations fall into a
histogram, and the log of the density picks a color from a hand-built
black → indigo → magenta → amber → pale ramp. The densest threads glow gold.

## The laciness test

Not every parameter roll makes a picture. Each orbit is checked before it is
shown: escaped to infinity, collapsed lattice (under 2% coverage), or
featureless wash (over 85%) all fail. Duds are not hidden. Up to three get
hung on the reject wall with the reason stamped under them, then a keeper is
shown. If three duds roll in a row the last one is kept anyway, with a note
that it has character.

## Controls

- NEW ORBIT rolls fresh parameters.
- The dropdown pins one attractor family or leaves it to chance.
- A strip of the last ten portraits keeps the keepers and the duds side by
  side, which is the actual point of the piece: learning what "good" means
  by seeing what it is not.

## Notes

700k iterations on a 560x560 histogram renders in well under a second.
No libraries. Seed 100 from the private sketchbook (the Hopalong dud problem
turned into a gallery).
