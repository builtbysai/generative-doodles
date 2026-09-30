# №8942 · Lattice Choir — process notes

## Concept
Seed 239: the quarter-octave partial lattice. In AMY's design the 300-cent
spacing meant harmonics of most fundamentals landed near other lattice
points, so nearly every chord was consonant by construction, in a scale
nobody could name. The piece draws the 13×13 lattice as dim red dots (with a
second, dimmer sublattice offset by 150 cents). Every few seconds a chord
blooms at a random lattice root: its partials (chosen on the lattice with a
150-cent minimum clearance rule, echoing the seed's consonance logic) ignite
as warm glowing dots with soft halos and lattice-coordinate labels, then
decay. A cyan wash marks "the gap": the lattice point farthest from any
sounding partial, the one silence in the chord. Top-right readout names the
current chord root and partial count. Tap left half toggles a soft
sine-drone of the current chord (crossfading masters, in the spirit of the
seed's multi-master mixing); tap right half reseeds a fresh choir.

## Seeds tried
239001 (shipped). Chord roots and clearances are reseeded live by tapping,
so the opening seed only sets the first bloom.

## Revisions
- v1: bloom halos too large (radius and 5 glow layers), decay too slow
  (0.9985/frame); chords piled into a muddy brown mass. Cut halo radius and
  layers, decay 0.996, cap of 24 live partials.
- v2: mobile layout verified via fresh navigation; an early mobile capture
  showed a stale-layout artifact (page had laid out at desktop size), so all
  mobile QA was redone with per-capture navigation.
- QA fix (2026-09-30): the "the gap" label was clipped at the right edge on
  390px mobile when the gap point fell on a border lattice cell. Clamped the
  label to (56, W-56) x (96, H-24). Re-verified.
- v3 densification pass (2026-09-30): HOLD diagnosis was "too sparse; the
  bloom doesn't carry the frame". Changes, all in index.html:
  * 3 simultaneous chord voices instead of 1 (5-8 partials each, up to ~24
    live; cap 72), staggered opening spawns at frames 2/22/44, weakest
    voices replaced on a 4.5s timer. New roots are kept >=4.2 cells from
    other active voices so the choir covers the frame.
  * The lattice itself is now drawn: faint connecting lines between main
    lattice points plus a dimmer 150-cent offset sublattice drifting on its
    own phase (parallax depth), 15x15 field (SPAN 7).
  * The 150-cent rule is visible: every sounding partial wears its
    exclusion ring (radius = half a 300-cent step), and candidates the rule
    rejects flash a brief struck x mark. Seedline legend reads "150 cent
    rings: minimum separation".
  * Richer bloom: per-voice pooled radial glow under each chord, 5 glow
    layers per partial, per-voice hues (gold / rose / pale amber), exclusion
    ring alpha cut to 34 for legibility.
  * Chordline now reports voice and partial counts ("choir · 3 voices").
    Audio drone path unchanged in structure (rebuildDrone now iterates all
    live partials across voices).
  Opening seed unchanged: 239001 (roots reseed live on right-half tap).

## Verification
- Zero console errors via cdp_exceptions.py on isolated Chrome port 9373
  (exit 0), 12s sweep at 1280x800.
- 1280x800 desktop: 3 voices / 21 partials spread across the frame,
  lattice lines + sublattice + rings + pooled glows all legible.
- 390x844 mobile: lattice centered, blooms distinct, gap label clamped,
  no UI collisions (seedline wraps to two lines, no overlap).
- thumb.png refreshed at exactly 1280x720 from a 3-voice/21-partial moment.
