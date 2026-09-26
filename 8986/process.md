# Doodle №8986: Chord and Arc (2026-08-21)

**File:** `8986/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
A static diptych about one idea seen two ways. A single anchor pair and a
single sample count are fixed per seed. The left half lays the samples along
the straight chord between the anchors, rendered in sunbleached ambers, like
dust on a dry riverbed. The right half lays the same samples along a fan of
curved arcs between the same anchors, rendered in monsoon blues, like rain
blown sideways. Identical vermilion anchor marks in both halves are the
kinship signal; a faint ghost of the chord under the right half shows the
straight path the arcs are bending away from. Same sky, different weather.

## Method
- Seeded PRNG (mulberry32); `?seed=` in the URL, click the piece for a new
  variation; default seed 898620.
- Model per seed: anchor pair A, B; sample count N (400-559); one shared
  t-distribution over [0,1], a mixture of 3-5 gaussian clusters plus a 22%
  uniform base. The same t values drive both halves, so the clusters sit in
  the same parameter positions left and right.
- Left: point = A + t*(B-A) plus gaussian jitter (sigma 15) perpendicular to
  the chord.
- Right: a one-sided fan of 5-8 quadratic bezier arcs, sagitta from 0.30 to
  1.00 of Bmax, Bmax scaled to chord length and clamped to the room on the
  side the fan leans toward, so arcs never clip an edge. Arc choice per
  sample is weighted by arc length, keeping dot density per unit of curve
  roughly constant. Jitter (sigma 12) is perpendicular to the local tangent.
- Each sample is a soft radial-gradient disc. Local density comes from
  neighbor counts within radius 46, normalized with sqrt compression; denser
  samples get larger radius (5 to ~29) and higher alpha (0.30 to 0.92), and
  their color is interpolated up a 5-stop palette (DRY ambers left, WET blues
  right). Sparse-first draw order so dense cores sit on top.
- Dressing: faint construction hairlines (chord left; ghost chord plus arc
  fan right), center divider rule, hand-letterspaced CHORD / ARC labels, seed
  tag, dark shared ground (#131419) under both weathers.

## What was tried
1. Symmetric arc fan (bulges both sides of the chord). Rendered seeds showed
   a donut void in the middle of the right half whenever the bulge ran
   large, and near-circular loops when the bulge exceeded the chord length.
   Rejected: the void read as an accident, not weather.
2. One-sided fan with bulge up to 0.75 of chord length. Fixed the donut, gave
   a clean crescent, but one seed clipped samples off the bottom edge of the
   half. Fixed structurally with room-aware bulge: the fan leans toward
   whichever side has space, and Bmax is clamped to 0.72 of that room.
3. Uniform arc choice. Deep arcs came out sparse because they are longer
   curves. Fixed with arc-length-proportional weighting; density now reads
   even across the fan.
4. Compared seeds 898601, 898604, 898607, 898612, 898620. 898620 won: the
   chord sits nearly horizontal with the anchors at its ends, the amber band
   reads as one continuous weather system, and the blue fan hangs below the
   ghost chord as a full bow with an even gradient of density.

## Verification
- Zero console errors on load at desktop 1280x800 and mobile 390x844, via
  cdp_exceptions.py (Runtime enabled before navigation, continuous
  collection; exit 0 both viewports).
- No scroll or overflow at either viewport: scrollHeight equals innerHeight
  in both (800 and 844).
- Click regeneration verified via CDP: clicking the stage changed the seed
  tag (898620 to 878993006), updated `?seed=` in the URL, and re-rendered
  without errors.
- Thumb is 1280x800, rendered from the default seed.
