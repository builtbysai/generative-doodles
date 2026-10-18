# No.142 Precipice

## Concept
The Wieringa Surface as a field of congruent golden rhombs at five discrete
flat heights, a 5D quasicrystal projection in white modular boxes. Mostly
smooth, but where the slow height field jumps more than one level between
neighbours, a dark cliff face cuts through the field. One dramatic cliff
line, a steep diagonal step in the field, crosses the frame. Watch only:
it is a crystal thinking.

## Construction
Canvas 2D, single self-contained page. The tiling is the 5-generator
zonogon patch (rhomb pairs spanned by five unit vectors at 36 degree
steps, giving exactly the Penrose fat and thin golden rhombs), halved
three times for 640 tiles. Heights come from a slow layered sine field
plus a tanh diagonal step, stretched and quantised to integer levels
0 to 4, so tiles rise and sink one level at a time as the phase travels.
Top faces take five discrete shades between the shadowed top and the top
colour. An edge map pairs neighbouring tiles; wherever heights differ by
more than one, a flat dark polygon is laid into the lower tile with width
proportional to the difference. Seamless 28s loop: 18s travelling wave,
6s settled hold, 4s soft fade to blank. The view is scaled by the patch
apothem so the field fills the frame and bleeds off every edge. No
interaction, no hint. House rules held: Visual Viewport sizing with
resize listeners on visualViewport and window, canvas pinned in px every
frame, window.screen phone check with aspect fallback, synchronous first
frame (loop clock offset to mid-wave so frame one is developed),
typeof-guarded requestAnimationFrame.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720 and
inspected all three. First pass: the decagon patch left black corners
(scaled by apothem to fill the frame) and the height field was too smooth,
so almost no cliffs formed; raised the spatial frequency and stretched the
quantiser until all five levels populate and dark faces appear, including
the diagonal cliff band. Final frames: full-bleed golden rhomb field,
flat shaded tops, sudden dark cliffs, no other colours. Palette audit:
tops #D9D2C0 to #F2EEE2 in five steps, cliffs #2E2A24, background #0C0C0E
only. Watch-only verified: no pointer listeners, no hint element.
Gallery entry ready: 2002 · 06 · 02, "A quasicrystal field of golden
rhombs at five flat heights, sudden dark cliffs where the levels
displace, rising and sinking in a slow travelling wave. Watch only: it
is a crystal thinking."
