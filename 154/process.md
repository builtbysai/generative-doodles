# No.154 Surmadan Twelve

## Concept
The 12-fold Surmadan unit cell from the Niksar Grand Mosque stone
carving, taught the way Serap Ekizler Sonmez teaches it: not as a
finished pattern but as sixteen construction steps walked in
order. A root-3:2 rectangle is divided, a circle struck, the
twelve-fold division opened spoke by spoke, and only then do the
carved lines arrive: dodecagon, star, inner ring, the ring of small
circles, the spokes extended to the stone's edge. The pedagogy is
the piece; no step is skipped.

## Construction
Canvas 2D, single self-contained page. The construction lives on a
flat stone slab #CBBFA4 (a subtle carved-shadow offset grounds it
on the near-black), and all sixteen steps are precomputed drawing
stages: rectangle, diagonals, midlines, circumcircle, three
diameters, all diameters, two inner construction circles, then the
carved motif in #4A4238 (dodecagon, {12/5} star, rotated inner
dodecagon, twelve small circles), spoke extensions with corner
arcs, a carving pass that lays a shadow underlay under the motif,
and finally the finished cell ghosted at the eight neighbouring
positions so the tiling reads at the edges. Construction stages
draw in #7A2E2E and stay at reduced alpha once passed; the current
stage is emphasised at full alpha and heavier weight. A drag
scrubs the stage parameter continuously from 0 to 16 (horizontal
drag forward, vertical drag adds), so the drawing can be walked
backwards as well as forwards; before any touch it drifts slowly
between steps 10.4 and 15.6. Double-tap reseeds the division:
canonical twelve-fold, a ten-fold variant ({10/3} star), and a
twelve-fold ring variant with a second ring of small circles.
House rules held: Visual Viewport sizing with both resize
listeners, canvas pinned in px, window.screen phone check with
aspect fallback, synchronous first frame, typeof-guarded
requestAnimationFrame, lowercase hint in stone colour on the dark
ground.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720 and
inspected all three. Frame one opens at step 13: rectangle,
diagonals, spokes and both construction circles in red under the
carved star, dodecagon and circle ring, extensions running to the
slab edges, corner arcs seated. First pass let the step-13 spoke
extensions overshoot the slab onto the black ground; the whole
construction is now clipped to the slab rectangle and the
extensions stop at the stone's edge, verified in the re-render.
Palette audit: stone #CBBFA4, carved shadow #4A4238, construction
#7A2E2E, background #0D0D0F only. Interaction: drag scrubs the
sixteen steps, double-tap reseeds the variant. Gallery entry
ready: 2002 · 06 · 14, "The twelve fold Surmadan unit cell from
the Niksar stone carving, built in sixteen construction steps from
a divided rectangle to the full tiled field. Drag to walk the
steps."
