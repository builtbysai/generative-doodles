# No.945 - A Memory, Plotted

Study #116 refikanadol, PP106 "Data Is Memory".

## Concept

Anadol's Quantum Memories thesis - data is not just numbers, data is a memory -
built as a living archive. 600 synthetic memories, each a real record (year,
intensity, family, name), are embedded into 2D as a point constellation on
black. The four families (ember, gold, ice, violet) form glowing archipelagos,
each wrapped in a contour ribbon. The constellation breathes on a 90-second
cycle; a few memories per cycle migrate between families, travelling the whole
way and changing colour en route, because memory does not cut. There are no
axes anywhere: the ribbons carry the structure. A hand-style legend strip at
the bottom names the four families with the year bands the data actually owns.

## Construction

- Archive: seeded mulberry32 (seed 945106). Four families with fixed year
  bands - ember 1962-1975, gold 1976-1989, ice 1990-2003, violet 2004-2017 -
  and a pool of 10 memory names each, written in the register of the study
  ("the summer of the storm", "grandmother's kitchen", "the northern lights",
  "the dream journal"). Each memory draws a year inside its family band, an
  intensity (0.15-1.0, low-weighted), a name, and a gaussian offset from its
  family blob centre (sigma 0.065-0.080 by family). Families receive 150
  points each, 600 total.
- Embedding: blob anchors sit at seeded-jittered quadrant positions. A point's
  home is its blob centre plus its offset; blob centres orbit their anchors
  slowly and the whole constellation rotates 2 degrees per 90 s cycle. Points
  chase their homes through a damped spring (K = 6, C = 2.4), so the embedding
  lags elastically and resists disturbance instead of snapping.
- Contours: per family, per frame - convex hull (Andrew monotone chain) of the
  member points' current positions, expanded 1.10 from the family centroid,
  then two Chaikin smoothing passes. Stroked in the family colour at 0.35
  alpha with a 0.05 alpha fill to seat the cluster. Membership follows the
  migration blend, so a travelling point changes which ribbon contains it at
  the halfway point of its journey.
- Migration: planned per breath cycle from a per-cycle seeded RNG, so the
  schedule is deterministic at any sim time. 2-3 points per cycle travel over
  20 s with a smoothstep ease; home position and colour both interpolate
  between the old and new family; the record's family (and the shadow plan)
  updates on arrival while the year stays. Cycle 0 fires at t = 3, 9, 15 s so
  the pre-rolled frame one already has journeys under way.
- Sim: fixed timestep, 120 Hz. Boot pre-rolls exactly 2400 steps (20 s)
  synchronously, then draws frame one. The rAF loop (typeof-guarded) advances
  the same sim in capped fixed steps. All state derives from the seed and the
  step count; frame one never touches Date.now.
- Interaction, all consumed by the sim in timestamp order: tap finds the
  nearest point, flares it, and shows its record line ("1979 · the summer of
  the storm · intensity 0.83") above the legend for 4 s. Drag applies a radial pull force to nearby points while held; they
  trail and spring back on release. Double-tap synthesises a fresh archive
  (seed advanced) and every point adopts the same-index new record and travels
  to its new home over 20 s, blending colour en route.
- Sound: lazy, typeof-guarded, first pointer gesture only. Four detuned drone
  voices (sine + triangle pairs at 110 / 138.59 / 164.81 / 196 Hz), gains set
  by family share; a soft sine chime on each migration start, pitch mapped
  from the migrating memory's intensity.
- View: Visual Viewport sizing with resize listeners on visualViewport and
  window; canvas CSS size pinned in draw() every frame; phone detection via
  window.screen (min dimension < 700) with aspect fallback; page ground is the
  field colour, constellation scales to the field rect, legend shrinks and
  wraps to two lines on phones.

## QA log

- Rendered with node render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png). All render cleanly in silence (no
  AudioContext, no rAF in the harness).
- Determinism: thumb.png rendered twice and byte-compared with cmp -
  identical. Duplicate render deleted.
- Desktop and thumb reads: black field; four archipelagos (ember upper left,
  gold upper right, ice lower left, violet lower right) of white-cored glowing
  points inside smooth colour contour ribbons; migrating points visible in
  transit (ember-toned points inside the ice territory, colour mid-blend);
  legend strip along the bottom in family colours: "EMBER 1962-1975 · GOLD
  1976-1989 · ICE 1990-2003 · VIOLET 2004-2017".
- Mobile read: constellation scales and centres on the tall frame; legend
  wraps to two lines, nothing clipped.

## Deviations and choices

- Family counts are exactly even (150 each) rather than seeded-uneven, so the
  legend's year bands and the drone gains stay stable and readable; the brief
  fixes the total at about 600 and this build uses exactly 600.
- The contour ribbon adds a faint 0.05 alpha fill inside the 0.35 alpha
  stroke; the brief specifies the ribbon at 0.35 alpha, and the fill is kept
  an order of magnitude under it purely to seat each cluster on the black.
- Double-tap new archive uses same-index record adoption (each point takes
  the new archive's same-index record and travels), the simpler of the two
  options the brief allows, instead of nearest-home matching.
- Legend year bands are set with hyphen-minus characters rather than en
  dashes; no em dashes appear anywhere in the piece.
- Drag disturbance is visual only; the brief's audio scope for this piece is
  the four drone voices plus migration chimes, both implemented.
