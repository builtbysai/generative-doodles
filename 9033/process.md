# №9033 · Gather: process

Built 2026-10-01 from seed 335 in FUTURE_PIECES.md, after the j2rgb
(Jonathan Shrake) study. His 2021 physarum performances are the
instrument; this piece takes his gather gesture and makes it the
whole interaction.

## The piece

A slime-mold agent field (chemotaxis steering: sense ahead/left/right,
turn toward the strongest trail, deposit, diffuse and decay) runs
continuously on warm paper in one ink family. The only interaction is
press-and-hold: the swarm streams toward your finger and collapses
into a solid flat ink disc. Release, and the agents stream back out
along self-avoiding trails while the network rebuilds around the
disc, which stays as a stamped mark. The composition is the history
of your gathers.

## Decisions

- One ink family (warm umber), four values, warm paper ground. No
  glow, no black background, no gradients on the field. The palette
  restraint is what makes the wildness read as a print.
- The disc is drawn as a truly flat solid with a faint halo ring,
  like ink soaking into paper. Settled agents pack into it on a
  golden-angle spiral; on release they stream outward from the disc
  center with staggered wake times.
- One automatic gather fires shortly after load so the first
  composition already holds a disc; after that the piece is yours.
- No click-to-reseed: the press gesture owns the pointer. `?seed=`
  makes a machine shareable. Default seed 20261001.

## QA (2026-10-01)

- Zero console exceptions over 20s.
- Gather interaction verified with synthetic pointer events:
  press at (950,550) collapses the swarm into a disc, release
  streams it back out, stamp count increments, old discs persist.
- Trail balance tuned after the first pass washed the paper brown
  (decay 0.97, deposits 0.7/1.0/0.5): paper stays paper, trails read
  as dark branching networks, discs stay solid.
- Desktop 1280x800 and mobile 390x844 inspected; caption unclipped,
  no overflow.
- Animation alive (frame diffs), agents conserved across gathers
  (settled agents wake and rejoin; no population leak).

Held for Hans's verdict before any public push (shipping hold).
