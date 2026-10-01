# №9035 · Erosion Field: process

Built 2026-10-01 from seed 338 in FUTURE_PIECES.md, after the
lammetje_nl study. His black disc-field experiment is the starting
point; this piece makes the erosion parameter the subject.

## The piece

A solid irregular mass of stamped black discs (380-540 overlapping
discs, edge wobbled by noise) sits on white ground. A noise field
erodes the mass: on a jittered lattice, cells whose noise exceeds
the threshold get punched out as holes, revealing a saturated color
layer beneath (three-hue soft-banded field, one of three curated
sets: ultramarine/crimson/amber, teal/vermilion/gold, or
violet/magenta/orange). The threshold breathes on a 48s cycle, from
barely-touched mass to lace and back. Click for a new field
(reseeds everything, updates `?seed=`).

## Decisions

- The color layer is clipped to the blob's footprint
  (destination-in with the pristine mass): color only ever appears
  inside the mass, revealed by holes. The first pass leaked color
  across the whole ground and read as a different piece entirely.
- Holes are punched per frame from a precomputed noise lattice;
  the pristine mass is kept on its own layer so the per-frame cost
  is one blit plus the hole punches.
- Erosion holes grow with (noise - threshold), so the dissolve has
  a halftone gradient rather than binary knockouts.

## QA (2026-10-01)

- Zero console exceptions over 12s.
- Both ends of the erosion cycle inspected: at minimum threshold
  the mass holds together as lace with color blazing through; at
  maximum it reads as a solid stamped mass with a few color
  pinholes. Neither end destroys the composition.
- Desktop 1280x800 inspected; caption unclipped, no overflow.

Held for Hans's verdict before any public push (shipping hold).
