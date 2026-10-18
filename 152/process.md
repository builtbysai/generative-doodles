# No.152 Topkapi Correction

## Concept
Serap Ekizler Sonmez's book method as the artwork itself: a
twelve-petal rosette as an old publication printed it, in faded tan,
with two of its petals a few degrees off true. Her red construction
arrives over it, circles and true spokes, and the petals are pulled
into consistency while the corrected drawing redraws itself in
indigo over the old one. The flaw is presented as the archive gave
it, plainly, with no mockery: the correction is the subject.

## Construction
Canvas 2D, single self-contained page. The rosette is line work
only: outer rings, twelve pointed-leaf petals with midribs, and an
inner {12/5} star whose points ride the same petal angles. Three
curated corrections are stored as data: which two petals are off,
by how many degrees (3.5 to 5.5), and in one panel a petal that is
also short. A scrub parameter s interpolates everything: petal
angles lerp from flawed to true, one stored length error heals, the
stroke colour travels from the flawed tan #B0A58C to the corrected
ink #1F2A44, and the tan original stays underneath as a ghost that
fades as s approaches 1. The red construction #C0392B (dashed
circles at petal base and tip radii, spokes at the true angles, and
a solid arc across each wrong petal's error) gains alpha with s.
Before any touch, s breathes slowly on a 26 second sine so frame
one is mid-correction; a horizontal drag takes the scrub over, and
a double-tap moves to the next curated panel. House rules held:
Visual Viewport sizing with both resize listeners, canvas pinned
in px, window.screen phone check with aspect fallback, synchronous
first frame, typeof-guarded requestAnimationFrame, lowercase hint
on the dark ground.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720 and
inspected all three. Frame one opens at s = 0.55: the working
rosette sits half pulled toward true, the tan ghost of the two
wrong petals visible beside their corrected positions (clearest on
the lower-left and right petals), red arcs marking each error, the
dashed construction already on the page. The panel keeps its shape
and centring on phone, ground stays the near-black #0D0D0F and the
hint flips to paper colour to match. Palette audit: flawed
#B0A58C, corrected #1F2A44, construction #C0392B, paper #F6F1E4,
background #0D0D0F only; intermediate frames mix the first two by
interpolation, as the scrub requires. Interaction: drag scrubs,
double-tap reseeds the panel, never click-to-reload. Gallery entry
ready: 2002 · 06 · 12, "A published rosette with two petals
slightly off, in faded tan, then red construction lines arrive and
pull it true, the corrected pattern drawing itself in indigo over
the old. Drag to scrub the correction."
