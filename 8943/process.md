# №8943 · Wrong Octave, Right Key — process notes

## Concept
Seed 238: the Pierce pseudo-octave. Pierce stretched the octave by ear until
successive pseudo-octaves sounded right, landing on A=2.44 and 2.6, and his
favorite demo was playing Frère Jacques through the stretched ladder: the
melody's contour survives even as the interval lattice warps. The piece is a
tower of five rails (A^0 through A^4), each rung marked per semitone, with a
comet playing Frère Jacques up the A^0 rail while a full-phrase ribbon traces
the whole melody and ghost echoes of it hang at A^1–A^4. A slider (draggable,
auto-sweeping when untouched) stretches the pseudo-octave A from 2.0 to 2.6.
Below the tower sit the three tonic-chord nodes (root, third, fifth): they
glow and beat in tune while A stays near 2.0, then dim and lose their pulse
as the stretch passes 2.2, with the caption "the tonic will not resolve"
appearing past the point of no return. Tap enables triangle-wave audio that
plays the same stretched melody so you can hear the warp.

## Seeds tried
238001 (shipped). The seeded value only drives comet color accents and ribbon
phase; the composition is structural, so one seed sufficed.

## Revisions
- v1: tower + comet + slider only. Screenshot showed a sparse black field;
  the concept needed the phrase-level view, not just the note level.
- v2: added the full-phrase ribbon, ghost echoes at A^1–A^4, per-semitone
  rail ticks, background dust. Much richer.
- v3: fixed the tonic nodes overlapping the stretch slider (moved the tower
  base up, nodes sit in the freed band). Re-screenshotted to confirm.

## Verification
- Zero console errors via cdp_exceptions.py (exit 0) at 1280x800.
- 390x844 mobile: tower, nodes, and slider all fit; no UI collisions.
- thumb.png is exactly 1280x800.
