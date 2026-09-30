# №8939 · Pairs Only — process notes

## Concept
Seed 242: the AMY oscillator-pair budget. Sixty-four oscillators were all
the chip had, and harmonics could only be assigned in pairs, so an odd-only
voice burned sixteen oscillators to use eight; rich voices starved their
neighbors, and you could hear the budget being spent. The piece is the
budget made visible: an 8×8 grid of 64 oscillator cells and four voices
(brass, glass, reed, stone) that claim cells in pairs to sing notes,
climbing a pentatonic. The counter top-right drains as cells are claimed.
When a voice can't afford its note it steals pairs from the richest other
voice, drawn as red theft arcs; when nothing can be afforded the note dies
unplayed as a hollow ring. A greed ramp makes voices claim more pairs as
the piece runs, so the economy visibly heats until the 64th oscillator is
gone: a white flash, "the 64th oscillator is gone", and a new economy
begins on a fresh seed. Tap enables audio where each claimed pair adds a
harmonic to its voice. Click starts a new economy.

## Seeds tried
242001 (shipped; the seed advances on every rebirth).

## Revisions
- v1: claims too large and notes too long; the budget hit zero in ~9s and
  the white flash (alpha 220) blinded the frame. Softened the flash into a
  brief bloom plus a dark "the 64th oscillator is gone" card.
- v2: pair bridges spanned the whole grid (pairs were adjacent in a
  shuffled claim list, not in space). Rewrote claiming as nearest-neighbor
  cluster growth; bridges are short now. Also fixed a real bug this
  exposed: stolen cells weren't removed from the victim's pair list, and
  expired notes released cells they no longer owned.
- v3: added the greed ramp (pairs grow 1–2 early to up to 6 late) so the
  drain plays out over a minute rather than seconds.

## Verification
- Zero console errors via cdp_exceptions.py (exit 0); the steal/release
  bug was caught by the exception collector during development.
- 390x844 mobile: grid, voices, and budget counter fit; title sub hidden on
  small screens to avoid colliding with the counter (re-screenshotted).
- thumb.png is exactly 1280x800.
