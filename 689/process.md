# Doodle №8991: Off Register (2026-09-25)

**File:** `8991/index.html` (self-contained, plain canvas, no dependencies)

## Concept

A small playable instrument for the keyboard, dressed as a print shop
having a good day. Twelve one-gesture motifs on keys A through L, each
one a thing a press does: a rule swept across the sheet, a halftone
patch blooming, crop marks, a punched column, a brayer laying a band, a
scored crease, a register target, a perforation tearing, a stamp slammed
down, type slugs falling in, a squeegee wash, a mist of specks. Every
motif prints twice, the second pass in a ghost ink offset by a few
pixels, like the sheet slipped between impressions. Tapping works too,
and the motif lands where your finger lands.

The rest state is a composed sheet, not a blank page: paper grain,
quiet corner registration marks, and one faint register ghost baked
from the seed.

## Technique synthesis (from study, not copied)

- **The instrument contract** (study/patatap.md): every motif exposes
  the same shape, start on press, update each frame, clear on
  re-press, rebuild on resize. One shared duration unit (1100 ms)
  times every gesture, so mashing keys feels musical instead of
  chaotic. No motif copies any Patatap animation; the system is the
  part worth keeping.
- **Pose re-rolled per press** (same study): rotation, distance,
  quadrant, lobe count, lead ink, and misregistration offset are all
  re-drawn from the seed stream on every trigger. The motif is fixed,
  the pose is new, so no two presses print alike.
- **Palette roles, not colors** (same study): motifs only ask for
  paper, ink, ghost, and accent. Spacebar re-inks the whole
  instrument across four sets (newsprint, blueprint, rose, night)
  with a 600 ms crossfade while motifs keep playing.
- **Misregistration as identity**: the double print with a seeded
  offset is the piece's signature, applied per motif rather than as
  a post effect, so each gesture misregisters differently.
- Sound is a small synthesized kit (Web Audio, no assets), one quiet
  voice per motif, mutable with M or the on-screen toggle. The piece
  stands on its own silent.

## Parameters

- Seeded PRNG (mulberry32); `?seed=` in URL, default 8991
- `?set=` picks the starting ink set (0-3); `?demo=1` plays a short
  phrase for thumbnails
- Responsive: 1280x800 desktop and 390x844 mobile verified, no
  scroll, no overflow; backdrop is baked to an offscreen canvas and
  only re-baked on resize or during the palette crossfade
