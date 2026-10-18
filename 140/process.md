# No.140 Seven Corrugation

## Concept
A modular stone-paper surface of repeating 7-pointed stars in low relief,
the |7| ring rosie corrugation built from die-cut pieces with no glue.
Matte cream paper, blue-grey shadow in the valleys, and one edge of the
sheet visible so the modularity reads. Watch-only: over a 30 second loop
a light source orbits once (24s) and the shadows swing through the
corrugation valleys, then the surface holds still (6s). The light does
the folding.

## Construction
Canvas 2D, single self-contained page. Each star is a 7-point outline
with alternating outer and inner vertices, drawn as 7 folded petals of
two flat-shaded triangles. A petal triangle's value is the cosine between
its outward direction and the current light azimuth, mapped between the
valley colour and the paper colour; the second triangle of each petal is
kept slightly darker so the fold ridge reads. Before each star is drawn,
its silhouette is stamped once in valley shadow #5A6B8C at 0.55 alpha,
offset against the light, so stars cast into the valleys. Crease lines in
#D8D0BE trace the outline and the seven petal spines. Stars tile in
offset rows over a sheet whose right and bottom edges show a thin side
face, clipped cleanly at the sheet boundary. No gradients, no 3D: relief
comes from flat shading and shadow only. The clock starts at 6s so frame
one already has the light a quarter through its orbit and the relief is
fully modelled. House rules held: Visual Viewport sizing with both
resize listeners, canvas pinned in px every frame, synchronous first
frame, typeof-guarded requestAnimationFrame. No pointer listeners exist
in the file and there is no hint element.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720 and
inspected all three; the renderer's listener report confirms watch-only
(only the two resize listeners). One palette fix during QA: the sheet
edge colour was off-palette and was replaced with a paper/valley mix.
Final frames: cream star field with blue-grey valleys, top petals in
shadow and lower petals lit at the frame-one light angle, sheet edge
visible on the right and bottom of every frame including the phone
frame. Palette audit: paper #EFE9DA, valley #5A6B8C, crease #D8D0BE,
background #0B0B0D only. Gallery entry ready: 2002 · 05 · 31, "A modular
paper surface of seven pointed stars in low relief while the light
slowly orbits and shadows swing through the valleys. Watch only: the
light does the folding."
