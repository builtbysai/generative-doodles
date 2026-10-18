# No.151 Five Is Forbidden

## Concept
Her crystallographic lesson as a diptych in time. Six-fold tiles
perfectly by translation, with a true unit cell outlined once. Five
cannot: the same translation applied to pentagons shears, collides
and fails, and the field has to relax into quasiperiodic order
instead. The places where translation failed hardest are marked in
dim violet. Nothing explains itself in words; the failure is the
lesson.

## Construction
Canvas 2D, single self-contained page, watch-only. Phase one is an
honest hexagonal tiling: flat-top hexagons on their lattice (centre
spacing root-3 R vertically, 1.5R per column), tile outlines pulled
in slightly so the mortar shows, and the primitive rhombus cell
through four lattice centres outlined while it holds. The five-fold
attempt is also honest: each pentagon starts where translation puts
it, the same lattice plus an error that accumulates with the column,
all pentagons at one orientation. Because the translated spacing
(about 1.73R) is less than the pentagons need (1.92R), they collide,
and a relaxation pass (90 iterations of pairwise push-apart against
a weak anchor) shoves them into a non-overlapping quasiperiodic
arrangement. Nothing is faked with a rectangular repeat. Shape morph
is done by arc-length sampling both polygons to 50 points and
interpolating; pentagon orientations resolve to the five directions
(multiples of 36 degrees) by a seeded hash as the morph completes.
Mismatch marks sit at the attempt positions of the copies displaced
most (over 0.30R, in-frame, the worst 24), drawn as a dim violet
point with a soft halo. The 30 second loop runs: six-fold with the
unit cell (10s), the morph and the visibly failing translation
(6s), the relaxation into quasiperiodic order with the marks fading
in (8s), fade (6s). The clock is offset 21 seconds so the first
frame is the drift well under way, marks showing. House rules held:
Visual Viewport sizing with both resize listeners, canvas pinned in
px, window.screen phone check with aspect fallback, full-bleed on
phones, synchronous first frame, typeof-guarded
requestAnimationFrame. No pointer listeners and no hint element
exist in the page.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720 and
inspected all three. The pentagon field itself was right on the
first pass: varied orientations, no overlaps, clear quasiperiodic
drift. The mismatch marks took three attempts to get honest. First
rule (copies displaced most from the attempt) returned zero marks,
because a strong anchor kept every pentagon glued to its translated
position and nothing measurably moved; the "failure" was not real.
Second rule (old lattice vertices stranded in holes) marked only
frame-edge artefacts, since the affine shear kept the bulk covered.
The fix was to make the attempt genuinely collide: pentagon spacing
requirement raised to 1.92R against the 1.73R lattice and the anchor
weakened, so relaxation displaces copies non-uniformly across the
whole field (28 in-frame copies move over 0.30R at desktop size).
The displacement rule then marks real failures, distributed across
the field. Final frames: cream pentagons in five orientations on the
dark mortar, dim violet marks showing in the upper and middle field
at the opening offset, stronger as the loop's relax phase completes.
Palette audit: tile #EDE6D3, mortar #2A2D33, mismatch #8A6FA8,
background #0C0C0E only. Watch-only: no interaction, no hint.
Gallery entry ready: 2002 · 06 · 11, "A six fold field tiles
perfectly with its unit cell outlined once, then a five fold attempt
fails to repeat and relaxes into quasiperiodic order, the mismatch
points glowing dim violet. Watch only: the failure is the lesson."
