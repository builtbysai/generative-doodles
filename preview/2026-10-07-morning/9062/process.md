# The Enthronement — process

FUTURE_PIECES.md seed 482, from the Villa Lenbach / Villa Stuck
Gesamtkunstwerk study: the shrine grammar (central niche, one loaded
figure, flanking verticals, patterned border; frame load-bearing, not a
container). Warm marble/bronze/ink register — the period villa was dark,
never pale. Study-informed, never copied.

Assigned №9062 by the build coordinator on 2026-10-07 (9061 was already occupied by "Wrong Sky", IN PREVIEW in pending batch 2026-10-07). The HTML title and document.title carry №9062.

## Concept

One focal object — a flame enthroned in a bronze brazier — inside a deep
arched niche with legible bronze molding and gold keystone; flanking
fluted pilasters with capitals and bases; a load-bearing patterned border
(procedural Greek key, gold hairlines, corner lozenges); an inscription
tablet with procedural glyphs plus star roundels in the entablature;
a star-motif checkerboard tile floor; dark grained wood panel ground.
The flame breathes (gentle sway/flicker loop, cheap 2D canvas). Exactly one
focal object; a second would break the symmetry. Click anywhere reseeds;
`?seed=` is shareable.

## Variants tried (all rendered headless and inspected at 1440×900)

- **v1 — amphora urn with flame** (rejected): urn read as a golden blob/onion,
  the niche arch was invisible behind it, and the mouth bar was awkward.
- **v2 — brazier bowl + tall flame** (winner): one clear loaded object, arch
  molding legible, ray halo works, flame rhymes with the pointed arch.
- **v3 — tall urn with ember core + sun disc** (rejected): urn read like a
  lightbulb, the ember ellipse like a glowing spot, and the wave/scroll border
  read as a weak chain of C's next to the meander.

Refinements after the variant round: legible double-stroke arch molding
(bronze + gold inner line) with inner edge shadow for niche depth; bowl
redrawn with back rim / coal bed / front rim so it has volume; flame
re-layered slimmer with a bright core tongue; flame height capped so the
tip never touches the inscription tablet.

Seeded variation (bounded, shrine grammar never breaks): 3 warm palettes,
round vs pointed arch, meander vs diamond border (meander weighted),
rays vs concentric-arch halo, flame/bowl proportions, inscription glyphs.

## Default seed: 20261007

Rendered seeds 7, 42, 1234, 20261007 at desktop. Seed 20261007 won by eye:
meander border, pointed arch, ray halo, bright-gold palette, flame tall and
elegant, tip clear of the tablet. Four seeds inspected total; no reseed
needed beyond that.

## QA

- `cdp_exceptions.py` on port 9331 (isolated Chrome, not the shared 9222):
  exit 0 — zero console errors/exceptions over a 12s animated run.
- Desktop 1440×900: no scroll/overflow; composition contained.
- Mobile 390×844: no scroll/overflow; full shrine visible, scaled.
- Thumb: 1200×1500 PNG rendered from the default seed.
- No chain-follow / trailing-body elements anywhere (paused family untouched).
