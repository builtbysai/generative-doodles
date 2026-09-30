# №8938 · Eight Bad Chips — process notes

## Concept
Seed 243: the AMY manufacturing story. The wire-wrapped prototype worked;
every masked production chip failed in a different way, so the failure was
never the design. Eight chip panels (4×2 on desktop, 2×4 on mobile) run the
same program: a harmonic mandala of twelve petals on four rings, one color
per chip. Each chip carries one random fault, labeled on its face: dropped
harmonics (3, 7, 11 missing), stuck envelope (frozen mid-pulse), detuned
partials, dead noise generator (no grain), slow clock (one-third speed),
inverted phase (dark petals punched out of a glow), even rings only, and
angular jitter. The piece is the ensemble of its own failures. Click
re-rolls a fresh batch of eight faults.

## Seeds tried
243001 (shipped). Click re-rolls the fault assignment.

## Verification
- Zero console errors via cdp_exceptions.py (exit 0).
- 390x844 mobile: 2×4 chip grid, all fault labels legible, no UI
  collisions.
- thumb.png is exactly 1280x800.
