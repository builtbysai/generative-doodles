# Doodle №9004: Tangency (2026-09-05)

**File:** `9004/index.html` (self-contained, vanilla canvas, no dependencies)

Rebuild note: the original №9004 ("Tidepool", a Gray-Scott reaction-diffusion
piece) was rejected by Seth and the folder removed. This piece replaces it with
an entirely different concept family — circle packing — and takes the
"Tangency" title.

## Concept
A space-filling circle-packing study. Discs are placed largest first and each
is grown until it just touches a neighbor, so every circle in the piece is
tangent to something — hence the title. A handful of large discs anchor the
composition; hundreds of smaller ones pack the gaps like grout. Full circles
only, never polygons: select circles carry concentric ring fills, offset
(eccentric) rings, thin arc ticks, or a single bold annular sector. Palette is
restrained to four marks on warm paper: ink, rust, ochre, and a rare slate.
Every circle gets a thin ink outline and the sheet gets a double plotter
hairline frame, paper grain, and a faint vignette.

Deliberate-composition machinery (what keeps it from reading as bubble wrap):
- Dominant discs (3-4) are placed first around a seeded focal point with extra
  spacing between them.
- A radial density field (seeded focal point, wave modulation, 1-2 soft
  "lakes" that stay empty) gates acceptance, and a radius cap tied to the
  field keeps big discs in the dense core while the edges fade to fine grit.
- Dominants get one feature treatment each, shuffled so no two match: ringed,
  annular sector, or (about half the variations) one solid disc with a paper
  ring cut through it.

## Technique synthesis (from study, not copied)
- **Largest-first greedy + advancing front** (generative-artistry lesson 6):
  seeded dominant discs, then band fill on a jittered lattice from large to
  small, then a final pass that grows the largest feasible circle at each
  random probe. Overlap tests run through a spatial hash.
- **Constraint as engine** (matt-deslauriers FOLIO takeaway): 4 colors, one
  mark type (the circle), thin outlines — the limitation is the style.
- Deterministic: everything from mulberry32(seed); `?seed=` in URL, click the
  piece for a new variation. Static still, so no motion handling needed.

## Parameters
- Seeded PRNG (mulberry32), `?seed=` in URL or click for a new variation
- Default seed 90040

## Seeds tried and why the final won
- 90040 (v1, pre-gradient): decent but edges as dense as the core.
- After steepening the density falloff: 90040 / 12345 / 777 — gradient still
  weak; the gap-fill pass kept edges packed. Structural fix: radius cap tied
  to the density field (big discs only core-side).
- After the cap: 90040 / 12345 / 777 / 4242 — gradient reads, but the solid
  feature disc rendered flat and sticker-like after an ink-darkening pass.
  Reverted the darkening and made solids occasional (~55% of variations).
- Final round: 90040 / 777 / 5150 / 90210 — all four cohesive, no duds.
- 90040 won the default: clearest focal hierarchy (large sector disc with a
  rust arc at center, ringed dominants balancing left and lower right),
  gradient reads edge to edge, a quiet patch of breathing room lower left,
  and the rare solid dots land where they punctuate rather than clutter.

## Verification
- Rendered via headless Chromium CDP across three code iterations and six
  seeds; every final-round seed cohesive; failure modes found and fixed
  (uniform bubble wrap, flat solid discs)
- Desktop + 390px mobile viewports: no overflow, composition holds
- Zero console errors on load
- Click regeneration verified (new `?seed=`, composition rebuilds)
- Thumbnail 720x720 from default seed 90040, artwork only, matching gallery
  convention
