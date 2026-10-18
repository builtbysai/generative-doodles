# No.157 Seven and Fourteen

## Concept
Jay Bonner's 7/14-fold system with Marc Pelletier, in the register
of the Kaaba Minbar panels: a field of 7-pointed and 14-pointed
stars inlaid in Persian turquoise on a marble ground, one great
14-star at the centre and 7-stars orbiting it. Watch-only. The
piece is a slow inflation-zoom: over 30 seconds the camera drifts
inward by exactly one substitution factor while the field
subdivides around it, and the frame at the end matches the frame
at the start.

## Construction
Canvas 2D, single self-contained page, watch-only. The stars are
placed by a substitution rule, never by a rectangular repeat:
three hand-placed parents (the central 14-star, a ring of seven
7-stars, a second ring of seven 14-stars) each wear a corona of
seven satellites of the other kind, sitting in the parent's point
gaps at 1.22 of its radius and smaller by the inflation factor
2.6; coronas nest two levels deep, 855 stars in all. Outlines use
the true {n/k} inner radius cos(k pi / n) / cos((k-1) pi / n), so
{7/2} and {14/5} both land near 0.69 and the two families read as
one system. Each star carries its construction with it: a faint
ink circle through its vertices and a smaller ink star inside,
just visible, the way the sub-grid stays in Bonner's worksheets.
The zoom is a plain scale about the centre; each star's alpha is
windowed by its screen radius, fading in as substitution detail
becomes legible and out before it can swallow the frame. In the
last 3.5 seconds the same field at zoom/LAM (identical to the
first frame when the zoom reaches LAM) crossfades over the
swollen field, so the level-of-detail swap at the seam has
nothing to pop. House rules held: Visual Viewport sizing with
both resize listeners, canvas pinned in px, window.screen phone
check with aspect fallback, synchronous first frame,
typeof-guarded requestAnimationFrame. No pointer listeners and
no hint element exist in the page.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720
and inspected all three. Two construction faults were caught and
fixed during QA. First, the children were placed inside their
parents (centre child plus an interior ring), which carpeted
every star's face with the next generation and reduced the field
to green mush; the substitution was rebuilt as an exterior
corona, so each star's face stays clean inlay and the detail
lives in the interstices. Second, the parents sat too close and
merged into one mass; the rings were spread (2.35 and 3.6 world
units) until marble showed between every parent. Frame one: the
great 14-star centred and legible, its inner construction star
drawn, 7-stars orbiting with corona satellites in the gaps, the
second ring bleeding off the corners. The phone frame is the
tightest composition: hero star, full orbit ring, marble
breathing room. Palette audit: marble #EDE8DC, Persian turquoise
#3AB7A6, ink #1A1A1A only. Watch-only: no interaction, no hint.
Gallery entry ready: 2002 · 06 · 17, "A seven and fourteen fold
star field in marble and Persian turquoise, one great fourteen
pointed star at the centre, sevens orbiting, subdividing outward
forever without ever repeating. Watch only: it zooms into
itself."
