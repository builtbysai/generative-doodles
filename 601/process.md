# Terrazzo, №1878 (SM7, PP1125, study #245 simone-massaron)

## Spec
A field of interlocking irregular stone chips in cream cement, orange
and black aggregate, with the occasional bottle-green chip, fills the
frame edge to edge. Slowly the chips drift: each chip nudges a few
pixels, the cement seams stretch, and every three minutes the whole
field re-locks into a new interlocking arrangement. Between re-locks
the pattern breathes, never quite settling, never breaking apart.
Full-bleed tessellation; no border, no center, no focal point.
Reference: simone-massaron study (frame f09 metro terrazzo mosaic,
Noorda homage; "Terrazzo tessellation" mechanism).

## Palette
Cement cream #E3D9BE (ground and seams). Chip creams #EFE6D2,
#E6DCC4, #DDD2B8, #F2EBDA, #D9CDB2 (about 55 percent of chips).
Aggregate orange #D96A2B, #C75B21, #E07B3A (about 22 percent).
Carbon black #1E1C1A, #2A2724 (about 15 percent). Bottle green
#1F4D3A, #2A5C46 (about 8 percent). Hexes hand-picked from the
prompt's named colors; studies/simone-massaron.md does not exist in
the muse-soul repo, so no study palette was available to draw from.
Plate ink #1E1C1A with title #F2EAD8 and hint #D8CDB4.

## Motion and interaction
Watch only. Each chip centroid drifts along a small Lissajous path
(3 to 8 px amplitude, 0.006 to 0.016 Hz), so the field breathes
slowly and never settles. Every 180 seconds the field re-locks: the
seed set swaps to a freshly relaxed tessellation for the next cycle.
No click, no drag, no reload. Reduced motion freezes at the fixed
first frame.

## Technical approach
2D canvas. A Voronoi-derived chip field: a jittered 12 by 12 seed
grid in unit space, relaxed with two Lloyd iterations (polygon
centroids from the clipped Voronoi cells), then mapped to the field
rect each frame. Cells are clipped by perpendicular-bisector
half-planes against their 16 nearest neighbours and drawn inset by
about 3 px toward each cell centroid, so the cement ground shows
through as seams. Drift offsets are a pure function of time and the
seeded per-chip Lissajous parameters. Frame one is deterministic:
fixed phase t = 12.0 s, cycle 0, seeded RNG only, no Date.now or
Math.random.

## Deviations from the prompt
One: the prompt's soft filtered-noise click on each re-lock is
omitted. A watch-only piece cannot autoplay audio, so there is no
WebAudio anywhere in the piece; the re-lock is visual only. No
other deviation.

## QA
Rendered the actual script with node render-piece.js at 1280x900,
390x844, and 720x720 and inspected all three. Desktop: centered
square field of interlocking chips, cream seams visible, plates
legible on the cement ground outside the square. Mobile: full-bleed
field, plates and hint legible and unclipped. Thumb: clear at small
size, pattern and plates read. Thumb byte-identical to a fresh
independent re-render (md5 1e4bb54837d007e9f019db30803c20be, both
copies). No fix rounds needed.
